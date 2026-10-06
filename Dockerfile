# ---- Stage 1: build the React frontend into backend static resources ----
FROM node:20-alpine AS frontend
WORKDIR /build
COPY package.json package-lock.json ./
RUN npm ci
COPY index.html vite.config.js ./
COPY src/ src/
ARG VITE_CLERK_PUBLISHABLE_KEY=
ENV VITE_CLERK_PUBLISHABLE_KEY=$VITE_CLERK_PUBLISHABLE_KEY
RUN npm run build \
    && test -f backend/src/main/resources/static/index.html \
    && test -d backend/src/main/resources/static/assets

# ---- Stage 2: build the Spring Boot fat jar (frontend included) ----
FROM maven:3.9-eclipse-temurin-17 AS backend
WORKDIR /build
COPY backend/pom.xml backend/
COPY backend/src backend/src
# Overwrite whatever static assets came from the build context with the
# freshly built frontend from stage 1.
COPY --from=frontend /build/backend/src/main/resources/static/ backend/src/main/resources/static/
RUN mvn -f backend/pom.xml clean package -DskipTests \
    && ls -la backend/target/*.jar

# ---- Stage 3: runtime (JDK + runtimes for code execution) ----
# Node comes from the official tarball, not Debian's nodejs/npm: the distro
# packages pull ~341 node-* debs (~160 MB) and Koyeb's free tier only has 2 GB
# of disk, so every megabyte here matters.
FROM eclipse-temurin:17-jdk AS runtime
ARG NODE_VERSION=20.18.0
RUN apt-get update && apt-get install -y --no-install-recommends \
        ca-certificates curl python3 g++ xz-utils \
    && curl -fsSL "https://nodejs.org/dist/v${NODE_VERSION}/node-v${NODE_VERSION}-linux-x64.tar.xz" \
        | tar -xJ -C /usr/local --strip-components=1 \
    && rm -rf /usr/local/include \
    && npm install -g tsx \
    && apt-get purge -y --auto-remove curl xz-utils \
    && rm -rf /var/lib/apt/lists/* /usr/share/doc/* /usr/share/man/* /usr/share/locale/* \
    && node --version && npm --version && npx --version \
    && python3 --version && g++ --version | head -1
WORKDIR /app
COPY --from=backend /build/backend/target/dsa-insights-backend-0.1.0.jar app.jar
EXPOSE 3001
# Tuned for a 512 MB container (Koyeb/Render free tier): 70% heap left too little
# for metaspace, thread stacks and the node/python/g++/javac child processes the
# code runner spawns. Override JAVA_OPTS at runtime if you give it more memory.
ENV JAVA_OPTS="-XX:MaxRAMPercentage=45.0 -XX:MaxMetaspaceSize=128m -XX:ReservedCodeCacheSize=64m -XX:+UseContainerSupport -XX:+ExitOnOutOfMemoryError"
CMD ["sh", "-c", "exec java $JAVA_OPTS -jar app.jar"]
