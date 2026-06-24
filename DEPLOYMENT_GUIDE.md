# Deployment Guide: Vercel (Frontend) & Render (Backend)

## 🚀 Frontend Deployment on Vercel

### Prerequisites
- GitHub account with your frontend repo pushed
- Vercel account (free tier available)

### Step-by-Step Vercel Setup

#### 1. **Connect GitHub & Import Project**
- Go to [vercel.com](https://vercel.com)
- Sign up/Login with GitHub
- Click "Add New..." → "Project"
- Select your frontend repository
- Click "Import"

#### 2. **Configure Build Settings**
- **Framework Preset**: React (Vite)
- **Build Command**: `npm run build` ✅ (auto-detected)
- **Output Directory**: `dist` ✅ (auto-detected)
- **Install Command**: `npm install` ✅ (auto-detected)

#### 3. **Set Environment Variables**
In the Vercel dashboard:
1. Go to **Settings** → **Environment Variables**
2. Add the following variables:

| Variable | Development | Production |
|----------|-------------|-----------|
| `VITE_API_BASE_URL` | `http://localhost:8080` | `https://your-backend.onrender.com` |

**For Preview/Staging**:
- Add separate environment variable for preview deployments pointing to staging backend

#### 4. **Configure Routes (SPA Fallback)**
This is handled by `vercel.json` in the repo root:
```json
"rewrites": [
  {
    "source": "/(.*)",
    "destination": "/index.html"
  }
]
```
✅ **Already configured** - React Router will handle client-side routing

#### 5. **Deploy**
- Click "Deploy"
- Wait for build to complete (~2-3 minutes)
- Your frontend will be live at: `https://your-project.vercel.app`

### Vercel Features (Included)
- ✅ Automatic HTTPS
- ✅ CDN with global edge functions
- ✅ Automatic preview deployments on PRs
- ✅ Automatic production deployments on main branch pushes
- ✅ Environment variable management
- ✅ Rollback capability

### Troubleshooting Vercel
- **"Cannot find module"**: Ensure `npm install` completes. Check `package-lock.json` is committed.
- **Blank page**: Check browser console for API errors. Verify `VITE_API_BASE_URL` is correctly set.
- **API calls fail**: Backend URL must be publicly accessible (not localhost). Update `VITE_API_BASE_URL` to Render URL.

---

## 🚀 Backend Deployment on Render

### Prerequisites
- GitHub repo with backend code (Java Spring Boot)
- Render account (free tier available)
- Database setup (if applicable)

### Step-by-Step Render Setup (Without Docker)

#### 1. **Prepare Backend Repository**

For **Java Spring Boot**, ensure your repo contains:
- `pom.xml` (Maven) or `build.gradle` (Gradle)
- `src/` folder with code
- **Maven Wrapper** (`.mvn/` folder with `mvnw` scripts) - Render will use this

If you don't have Maven Wrapper:
```bash
cd your-backend-repo
mvn wrapper:wrapper
git add .mvn mvnw mvnw.cmd
git commit -m "Add Maven wrapper"
git push
```

#### 2. **Connect GitHub to Render**
- Go to [render.com](https://render.com)
- Sign up/Login with GitHub
- Click "New +" → "Web Service"
- Select your backend repository
- Authorize Render to access GitHub

#### 3. **Configure Service**
- **Name**: `jee-college-prediction-api` (or your choice)
- **Environment**: `Java` (native, not Docker)
- **Build Command**: `./mvnw clean package -DskipTests`
- **Start Command**: `java -jar target/app.jar`
- **Instance Type**: `Free` (or `Starter` for persistent uptime)

**Alternative if using Gradle**:
- **Build Command**: `./gradlew clean build -x test`
- **Start Command**: `java -jar build/libs/app.jar`

#### 4. **Set Environment Variables**
In Render dashboard → Service Settings → Environment:

```
# Database (if using PostgreSQL on Render)
DB_HOST=your-db.render.internal
DB_PORT=5432
DB_NAME=college_prediction
DB_USER=postgres
DB_PASSWORD=your-secure-password

# Application
SPRING_PROFILES_ACTIVE=production
SERVER_PORT=8080
CORS_ALLOWED_ORIGINS=https://your-project.vercel.app

# API Settings
JWT_SECRET=your-secret-key
JWT_EXPIRATION=86400000
```

**Important**: Render automatically detects Java Spring Boot and sets essential vars. You only need to add custom environment variables.

#### 5. **Deploy Database (Optional)**
If your app needs a database:
1. Click "New +" → "PostgreSQL"
2. Configure and deploy
3. Database connection string will be auto-provided
4. Add connection details to backend environment variables

#### 6. **Configure Maven (pom.xml)**

Ensure your `pom.xml` has the `maven-jar-plugin` configured to produce a runnable JAR:

```xml
<build>
    <plugins>
        <plugin>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-maven-plugin</artifactId>
        </plugin>
        <plugin>
            <groupId>org.apache.maven.plugins</groupId>
            <artifactId>maven-jar-plugin</artifactId>
            <configuration>
                <archive>
                    <manifest>
                        <mainClass>com.example.Application</mainClass>
                    </manifest>
                </archive>
                <finalName>app</finalName>
            </configuration>
        </plugin>
    </plugins>
</build>
```

This ensures the compiled JAR is named `app.jar` and can be executed with `java -jar target/app.jar`

#### 7. **Deploy**
- Click "Deploy"
- Watch deployment logs in real-time
- Render will run build command → compile JAR → start app
- Service will be live at: `https://your-backend.onrender.com`

### Common Render Issues
- **Free tier spins down after 15 mins inactivity**: Upgrade to Starter for $7/month for persistent uptime
- **"JAR file not found"**: Ensure `pom.xml` has `<finalName>app</finalName>` in `<build>` section, or build command produces correctly named JAR
- **Build timeout**: Maven builds can take 2-3 mins. Render allows up to 30 mins. If it times out, consider upgrading instance type.
- **Out of memory**: Set JVM heap size in start command: `java -Xmx512m -jar target/app.jar`
- **SLF4J warnings**: Add logging dependency to `pom.xml` to suppress warnings:
  ```xml
  <dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-logging</artifactId>
  </dependency>
  ```

### Render Features (Free Tier)
- ✅ Automatic HTTPS
- ✅ GitHub integration with auto-deploy
- ✅ Environment variable management
- ✅ Persistent disk storage (if configured)
- ❌ Spins down after 15 mins inactivity (free tier)
- ❌ 100 hours/month limit (free tier)

---

## 🔗 Integration: Frontend ↔ Backend

### Update API Endpoints

After both are deployed, update Frontend env var:

**Frontend `.env` (Local Development)**:
```env
VITE_API_BASE_URL=http://localhost:8080
```

**Vercel Environment Variables (Production)**:
```env
VITE_API_BASE_URL=https://your-backend.onrender.com
```

### Test Integration

1. Deploy frontend to Vercel
2. Deploy backend to Render
3. In Vercel dashboard, update `VITE_API_BASE_URL` to Render URL
4. Trigger redeploy
5. Test API calls in browser DevTools → Network tab

### CORS Configuration

Ensure backend allows Vercel domain:

**Spring Boot** (`application.properties` or `application.yml`):
```properties
cors.allowed-origins=https://your-project.vercel.app,http://localhost:3000
cors.allowed-methods=GET,POST,PUT,DELETE,OPTIONS
cors.allowed-headers=*
cors.max-age=3600
```

Or in Java code:
```java
@Configuration
public class CorsConfig {
    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/api/**")
                    .allowedOrigins("https://your-project.vercel.app", "http://localhost:3000")
                    .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                    .maxAge(3600);
            }
        };
    }
}
```

---

## 📋 Pre-Deployment Checklist

### Frontend
- [ ] `vercel.json` with rewrites configured
- [ ] `.vercelignore` configured
- [ ] `package.json` has `build` script
- [ ] `.env.example` created with required vars
- [ ] No hardcoded API URLs (use `VITE_API_BASE_URL`)
- [ ] Routes use React Router (not absolute paths)
- [ ] GitHub repo pushed with latest code

### Backend (Java - No Docker)
- [ ] `pom.xml` present with `spring-boot-maven-plugin`
- [ ] `pom.xml` has `finalName>app</finalName>` in build section
- [ ] Maven Wrapper present (`.mvn/` folder with `mvnw` script)
  - If missing: Run `mvn wrapper:wrapper` and commit
- [ ] `src/main/resources/application.properties` (or `.yml`) configured
- [ ] Server port set to `8080` or uses `SERVER_PORT` env var
- [ ] CORS configured for Vercel URL
- [ ] Database migrations handled (if needed)
- [ ] Health check endpoint available (e.g., `/actuator/health`)
- [ ] `.gitignore` excludes: `target/`, `.idea/`, `.vscode/`, `.env.local`
- [ ] GitHub repo pushed with latest code
- [ ] Local build works: `./mvnw clean package` produces `target/app.jar`

---

## 🔄 Post-Deployment

### Monitor Deployments
- **Vercel**: Analytics → Performance, Errors
- **Render**: Logs → Real-time logs, Deploy events

### Update Domain
- Add custom domains on both platforms (Premium features)
- Update frontend `VITE_API_BASE_URL` if backend domain changes

### Continuous Deployment
Both platforms auto-deploy on main branch push. To disable:
- Vercel: Settings → Git → Auto-deploy toggle
- Render: Settings → Auto Deploy toggle

### Rollback
- **Vercel**: Deployments → Select previous → Promote to Production
- **Render**: Deploy History → Select previous → Deploy

---

## 💰 Cost Summary

| Platform | Tier | Price | Limits |
|----------|------|-------|--------|
| Vercel | Free | $0 | 100 GB bandwidth/month |
| Render | Free | $0 | Sleeps after 15 mins |
| Render | Starter | $7/mo | Persistent uptime, 0.5GB RAM |
| Database | Render Free | $0 | 90-day data retention |
