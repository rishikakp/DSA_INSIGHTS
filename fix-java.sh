#!/bin/bash
JAVA_HOME=/tmp/jdk_extract/usr/lib/jvm/java-17-openjdk-amd64
if [ ! -f "$JAVA_HOME/bin/javac" ]; then
  rm -rf /tmp/jdk_extract
  mkdir -p /tmp/jdk_extract
  dpkg-deb -x /home/ranjith/Downloads/Full_Stack/openjdk-17-jre-headless_17.0.19+10-1~24.04.2_amd64.deb /tmp/jdk_extract
  dpkg-deb -x /home/ranjith/Downloads/Full_Stack/openjdk-17-jdk-headless_17.0.19+10-1~24.04.2_amd64.deb /tmp/jdk_extract
fi
# Fix broken symlinks - copy actual files from extracted etc
SEC_DIR=$JAVA_HOME/conf/security
ETC_SEC=/tmp/jdk_extract/etc/java-17-openjdk/security
for f in java.security java.policy nss.cfg; do
  if [ -L "$SEC_DIR/$f" ]; then
    rm "$SEC_DIR/$f"
    [ -f "$ETC_SEC/$f" ] && cp "$ETC_SEC/$f" "$SEC_DIR/$f"
  fi
done
if [ -L "$SEC_DIR/policy" ]; then
  rm "$SEC_DIR/policy"
  [ -d "$ETC_SEC/policy" ] && cp -r "$ETC_SEC/policy" "$SEC_DIR/policy"
fi
echo "$JAVA_HOME"
