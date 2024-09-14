# Utiliza una imagen oficial de Maven y OpenJDK para compilar el proyecto
FROM maven:3.9.2-eclipse-temurin-17 AS build

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia el archivo pom.xml y descarga las dependencias
COPY pom.xml .
RUN mvn dependency:go-offline -B

# Copia todo el código fuente del proyecto
COPY src ./src

# Compila el proyecto y empaqueta en un archivo JAR
RUN mvn clean package -DskipTests

# Usa una imagen ligera de JDK para ejecutar el JAR
FROM eclipse-temurin:17-jdk-jammy

# Establece el directorio de trabajo
WORKDIR /app

# Copia el JAR generado desde el contenedor de construcción
COPY --from=build /app/target/cinema-0.0.1-SNAPSHOT.jar /app/cinema.jar

# Exponer el puerto 8080
EXPOSE 8080

# Comando para ejecutar el JAR
ENTRYPOINT ["java", "-jar", "/app/cinema.jar"]
