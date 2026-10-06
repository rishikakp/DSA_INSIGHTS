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
FROM eclipse-temurin:17-jdk
RUN apt-get update && apt-get install -y --no-install-recommends \
        ca-certificates nodejs npm python3 g++ \
    && npm install -g tsx \
    && rm -rf /var/lib/apt/lists/* \
    && node --version && npm --version && python3 --version && g++ --version | head -1
WORKDIR /app
COPY --from=backend /build/backend/target/dsa-insights-backend-0.1.0.jar app.jar
EXPOSE 3001
ENV JAVA_OPTS="-XX:MaxRAMPercentage=70.0 -XX:+UseContainerSupport"
CMD ["sh", "-c", "exec java $JAVA_OPTS -jar app.jar"]
