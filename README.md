# 🎓 Smart College Recommendation System

A full-stack web application that helps **JEE aspirants discover colleges based on their rank, category, gender, state, region, and counseling preferences** using historical JoSAA cutoff data.

---

## 🚀 Live Demo

### Frontend

🔗 (https://jee-2403-z6co.vercel.app)[https://jee-2403-z6co.vercel.app]

### Backend API

🔗 https://jee-2403-production.up.railway.app

---

## 📌 Project Overview

The Smart College Recommendation System analyzes historical JoSAA counseling data and predicts colleges where a student has admission chances based on:

* JEE Rank
* Category
* Gender
* State
* Region
* Counseling Round
* Year
* Institution Type

The system provides personalized college recommendations with eligibility analysis and admission insights.

---

## ✨ Features

### Student Prediction System

* Rank-based college prediction
* Category-wise cutoff analysis
* Gender-specific seat analysis
* State and region filtering
* Round-wise cutoff comparison
* Year-wise trend analysis

### College Recommendation Engine

* Match percentage calculation
* Eligible college identification
* College ranking and sorting
* Detailed college information

### User Experience

* Responsive UI
* Modern React interface
* Fast search and filtering
* Real-time prediction results
* Mobile-friendly design

---

# 🏗️ Architecture

## Frontend

* React 18
* Vite
* React Router DOM
* Context API
* CSS3
* Fetch API

## Backend

* Java 21
* Spring Boot 3
* Maven
* REST APIs
* CSV Data Processing

## Deployment

### Frontend

* Vercel

### Backend

* Railway

---

# 📂 Project Structure

```text
JEE-2403/
│
├── backend/
│   ├── src/
│   ├── pom.xml
│   └── application.properties
│
├── frontend/
│   ├── src/
│   ├── package.json
│   ├── vite.config.js
│   └── index.html
│
├── .gitignore
├── DEPLOYMENT_GUIDE.md
├── MAVEN_RENDER_CONFIG.md
└── README.md
```

---

# ⚙️ Backend Setup

## Prerequisites

* Java 21+
* Maven

## Run Backend

```bash
cd backend

mvn clean install

mvn spring-boot:run
```

Backend runs at:

```text
http://localhost:8080
```

---

# ⚙️ Frontend Setup

## Prerequisites

* Node.js 18+
* npm

## Install Dependencies

```bash
cd frontend

npm install
```

## Start Development Server

```bash
npm run dev
```

Frontend runs at:

```text
http://localhost:5173
```

---

# 🔗 Environment Variables

Create a `.env` file inside the frontend directory:

```env
VITE_API_BASE_URL=https://jee-2403-production.up.railway.app
```

---

# 📡 API Endpoints

## Predict Colleges

```http
POST /api/predict
```

### Sample Request

```json
{
  "rank": 25000,
  "category": "OPEN",
  "gender": "Gender-Neutral",
  "state": "Andhra Pradesh",
  "region": "South",
  "year": 2024,
  "round": 6
}
```

### Sample Response

```json
[
  {
    "collegeName": "NIT Warangal",
    "branch": "Computer Science Engineering",
    "closingRank": 26500,
    "matchPercentage": 92
  }
]
```

---

# 📊 Dataset

The backend uses historical JoSAA counseling data:

* 2022 Cutoff Data
* 2023 Cutoff Data
* 2024 Cutoff Data

Stored inside:

```text
backend/src/main/resources/data/
```

---

# 🎯 Future Enhancements

* User Authentication
* Saved Predictions
* College Comparison Dashboard
* Cutoff Trend Visualization
* AI-Powered Recommendations
* PostgreSQL Database Integration
* Docker Support
* Scholarship Recommendations
* College Review System

---

# 👨‍💻 Author

### Edupalli Likhitha Sai

B.Tech Computer Science Engineering

🔗 GitHub: https://github.com/Lali182k5

🔗 Portfolio: https://likhitha-sai.vercel.app/

---

# 🏆 Key Skills Demonstrated

* Full Stack Development
* Java Spring Boot
* REST API Development
* React.js
* State Management
* Data Processing
* Responsive UI Design
* Git & GitHub
* Railway Deployment
* Vercel Deployment

---

# 📜 License

This project is developed for educational and portfolio purposes.

---

## ⭐ Support

If you found this project useful, please consider giving the repository a ⭐ on GitHub.

---

**Made with ❤️ for JEE Aspirants**
