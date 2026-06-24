# Backend Maven Configuration for Render Deployment (No Docker)

## Required pom.xml Configuration

For your Java Spring Boot backend to deploy correctly on Render **without Docker**, ensure your `pom.xml` includes:

### 1. **Spring Boot Maven Plugin** (Required)

```xml
<build>
    <plugins>
        <!-- Spring Boot Maven Plugin - Creates executable JAR -->
        <plugin>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-maven-plugin</artifactId>
            <version>3.0.0</version> <!-- Match your Spring Boot version -->
            <executions>
                <execution>
                    <goals>
                        <goal>repackage</goal>
                    </goals>
                </execution>
            </executions>
        </plugin>
    </plugins>
    
    <!-- JAR Output Name -->
    <finalName>app</finalName>
</build>
```

This configuration:
- ✅ Creates a fat JAR (includes all dependencies)
- ✅ Names it `app.jar` so Render can find it at `target/app.jar`
- ✅ Makes it directly executable: `java -jar target/app.jar`

### 2. **Maven Wrapper** (Recommended)

Render uses Maven Wrapper (`mvnw`) to build. If missing from your repo:

```bash
# In your backend repo root:
mvn wrapper:wrapper

# Commit and push:
git add .mvn mvnw mvnw.cmd
git commit -m "Add Maven wrapper"
git push
```

This creates:
- `.mvn/wrapper/maven-wrapper.jar` - Maven executable
- `.mvn/wrapper/maven-wrapper.properties` - Maven version config
- `mvnw` - Linux/Mac wrapper script
- `mvnw.cmd` - Windows wrapper script

### 3. **Complete pom.xml Example**

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 
         http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>

    <parent>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-parent</artifactId>
        <version>3.0.0</version> <!-- Use your version -->
        <relativePath/>
    </parent>

    <groupId>com.jee</groupId>
    <artifactId>college-prediction-api</artifactId>
    <version>1.0.0</version>
    <name>College Prediction API</name>
    <description>JEE College Recommendation Backend</description>

    <properties>
        <java.version>17</java.version>
        <maven.compiler.source>17</maven.compiler.source>
        <maven.compiler.target>17</maven.compiler.target>
    </properties>

    <dependencies>
        <!-- Spring Boot Web -->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
        </dependency>

        <!-- Spring Boot JPA (if using database) -->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-data-jpa</artifactId>
        </dependency>

        <!-- PostgreSQL Driver (if using PostgreSQL) -->
        <dependency>
            <groupId>org.postgresql</groupId>
            <artifactId>postgresql</artifactId>
            <scope>runtime</scope>
        </dependency>

        <!-- Spring Boot Actuator (health checks) -->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-actuator</artifactId>
        </dependency>

        <!-- Logging -->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-logging</artifactId>
        </dependency>

        <!-- Lombok (optional, for @Getter/@Setter) -->
        <dependency>
            <groupId>org.projectlombok</groupId>
            <artifactId>lombok</artifactId>
            <optional>true</optional>
        </dependency>

        <!-- Testing -->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-test</artifactId>
            <scope>test</scope>
        </dependency>
    </dependencies>

    <build>
        <finalName>app</finalName>
        
        <plugins>
            <!-- Spring Boot Maven Plugin (REQUIRED) -->
            <plugin>
                <groupId>org.springframework.boot</groupId>
                <artifactId>spring-boot-maven-plugin</artifactId>
                <configuration>
                    <excludes>
                        <exclude>
                            <groupId>org.projectlombok</groupId>
                            <artifactId>lombok</artifactId>
                        </exclude>
                    </excludes>
                </configuration>
            </plugin>

            <!-- Maven Compiler Plugin -->
            <plugin>
                <groupId>org.apache.maven.plugins</groupId>
                <artifactId>maven-compiler-plugin</artifactId>
                <configuration>
                    <source>17</source>
                    <target>17</target>
                </configuration>
            </plugin>
        </plugins>
    </build>
</project>
```

## Application Configuration

### application.properties (src/main/resources/)

```properties
# Server
server.port=8080
server.servlet.context-path=/

# Database (if using PostgreSQL on Render)
spring.datasource.url=jdbc:postgresql://${DB_HOST}:${DB_PORT}/${DB_NAME}
spring.datasource.username=${DB_USER}
spring.datasource.password=${DB_PASSWORD}
spring.datasource.driver-class-name=org.postgresql.Driver

# JPA/Hibernate
spring.jpa.database-platform=org.hibernate.dialect.PostgreSQLDialect
spring.jpa.hibernate.ddl-auto=validate
spring.jpa.show-sql=false

# Logging
logging.level.root=INFO
logging.level.com.jee=DEBUG

# Actuator (Health checks)
management.endpoints.web.exposure.include=health,info
management.endpoint.health.show-details=when_authorized

# CORS
cors.allowedOrigins=https://your-project.vercel.app,http://localhost:3000
cors.allowedMethods=GET,POST,PUT,DELETE,OPTIONS
cors.allowedHeaders=*
cors.maxAge=3600
```

### application.yml (Alternative YAML format)

```yaml
server:
  port: 8080
  servlet:
    context-path: /

spring:
  datasource:
    url: jdbc:postgresql://${DB_HOST}:${DB_PORT}/${DB_NAME}
    username: ${DB_USER}
    password: ${DB_PASSWORD}
    driver-class-name: org.postgresql.Driver
  jpa:
    database-platform: org.hibernate.dialect.PostgreSQLDialect
    hibernate:
      ddl-auto: validate
    show-sql: false

logging:
  level:
    root: INFO
    com.jee: DEBUG

management:
  endpoints:
    web:
      exposure:
        include: health,info
  endpoint:
    health:
      show-details: when_authorized

cors:
  allowedOrigins: https://your-project.vercel.app,http://localhost:3000
  allowedMethods: GET,POST,PUT,DELETE,OPTIONS
  allowedHeaders: "*"
  maxAge: 3600
```

## Render Deployment Configuration

### Step 1: Connect Backend to Render

1. Go to [render.com](https://render.com)
2. Click "New +" → "Web Service"
3. Select your backend GitHub repository

### Step 2: Configure Service

| Setting | Value |
|---------|-------|
| **Name** | `jee-college-prediction-api` |
| **Environment** | `Java` |
| **Build Command** | `./mvnw clean package -DskipTests` |
| **Start Command** | `java -jar target/app.jar` |
| **Instance Type** | Free (or Starter for $7/mo) |

### Step 3: Environment Variables

Add in Render Dashboard → Service → Environment:

```
DB_HOST=your-db.c.render.com
DB_PORT=5432
DB_NAME=college_prediction_db
DB_USER=dbuser
DB_PASSWORD=your_secure_password_here
SPRING_PROFILES_ACTIVE=production
```

### Step 4: Deploy

- Click "Create Web Service"
- Watch logs in real-time
- Service goes live at `https://your-api.onrender.com`

## Troubleshooting

### 1. "JAR file not found" Error
```
ERROR: JAR not found after build
```
**Solution**: Ensure `finalName>app</finalName>` is in `pom.xml` build section. Render looks for `target/app.jar`.

### 2. Build Takes Too Long
```
Build timeout after 30 minutes
```
**Solutions**:
- Add to build command: `-DskipTests` (already included)
- Exclude unused dependencies from `pom.xml`
- Upgrade to Starter instance for faster hardware

### 3. "OutOfMemoryError" at Runtime
```
java.lang.OutOfMemoryError: Java heap space
```
**Solution**: Update Render start command:
```
java -Xmx256m -jar target/app.jar
```

### 4. SLF4J Logger Warnings
```
SLF4J: Failed to find logger factory implementation
```
**Solution**: Ensure logging dependency in `pom.xml`:
```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-logging</artifactId>
</dependency>
```

### 5. Port Already in Use
```
Address already in use: bind
```
**Solution**: Server port must be configurable via env var. Update `application.properties`:
```properties
server.port=${SERVER_PORT:8080}
```

## Testing Locally

Before deploying to Render:

```bash
# Clean and build
./mvnw clean package -DskipTests

# Run jar locally (should listen on port 8080)
java -jar target/app.jar

# Test health endpoint
curl http://localhost:8080/actuator/health

# Test your API
curl http://localhost:8080/api/predict
```

## See Also

- [Spring Boot Maven Documentation](https://docs.spring.io/spring-boot/docs/current/maven-plugin/)
- [Render Java Deployment Docs](https://render.com/docs/deploy-java)
- [Main Deployment Guide](./DEPLOYMENT_GUIDE.md)
