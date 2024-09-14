FROM maven:3.9-eclipse-temurin-17 AS build

COPY src /app/src
COPY pom.xml /app

WORKDIR /app


RUN mvn clean package

FROM openjdk:17-jdk-alpine

COPY --from=build /app/target/cinema.jar /app/cinema.jar

ENTRYPOINT ["java", "-jar", "/app/cinema.jar"]
