FROM openjdk:8-jdk-alpine

LABEL maintainer="umxinli"

ENV APP_HOME=/app \
    JAVA_OPTS="-Xms512m -Xmx1024m"

WORKDIR $APP_HOME

COPY target/umxinli-backend-1.0.0.jar app.jar

EXPOSE 8080

ENTRYPOINT ["sh", "-c", "java $JAVA_OPTS -jar app.jar"]
