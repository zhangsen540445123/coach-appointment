# Single-stage build for Spring Boot application with JDK 21
# Assumes JAR file is already built locally in target directory

FROM eclipse-temurin:21-jre-alpine
WORKDIR /app

# Install curl for health checks
RUN apk add --no-cache curl

# Create non-root user for security
RUN addgroup -g 1001 -S goalmanage && \
    adduser -u 1001 -S goalmanage -G goalmanage

# Create upload directory and set proper ownership
RUN mkdir /upload && \
    chown goalmanage:goalmanage /upload && \
    chmod 755 /upload

# Copy the pre-built jar from local target directory
COPY target/*.jar app.jar

# Change ownership to non-root user
RUN chown goalmanage:goalmanage app.jar

# Switch to non-root user
USER goalmanage

# Expose port
EXPOSE 8080

# Set JVM options for production
ENV JAVA_OPTS="-Xms512m -Xmx1024m -XX:+UseG1GC -XX:+UseContainerSupport"

# Run the application
ENTRYPOINT ["sh", "-c", "java $JAVA_OPTS -jar app.jar"]
