# **CareerCraft AI - AI-Powered Career Coach** 🚀

## **📌 Project Overview**

CareerCraft AI is a **smart career assistant** that helps job seekers create **professional resumes**, generate **custom cover letters**, and gain **AI-powered career insights**. It analyzes **job market trends**, **tracks career growth**, and offers **personalized recommendations** to enhance your career journey.

---
## **🌐 Live Demo**

Try out CareerCraft AI here: https://careercraftai-sage.vercel.app


## **🛠️ Features & Functionality**

### ✅ **Resume & Cover Letter Generator**

- Create, edit, and save **professional resumes**.
- AI-enhanced resume with **powerful industry-specific wording**.
- Generate a **customized cover letter** based on job descriptions.
- Give **roadmap for the career** the user search.
- Provide the **Resources** for the Preparation.

### 📊 **AI-Driven Career Insights**

- Get real-time **job market trends, salary analysis, and in-demand skills**.
- AI-powered **visual insights** to track job growth across industries.

### 🔑 **Secure Authentication & User Data Management**

- Users authenticate via **Clerk API** for secure access.
- **Supabase (PostgreSQL)** stores user data securely.

### 📌 **Future Enhancements** 🚀

- **Community Features** – Users can share job experiences & insights.
- **LinkedIn API Integration** – Search and track job opportunities.
- **Career Growth Tracker** – AI-based **daily career improvement tracking**.
- **Assignment Tracking** – AI-powered tools to help users manage job-related tasks.

## **🖥️ Technology Stack**

| Category                 | Technology Used                             |
| ------------------------ | ------------------------------------------- |
| **Frontend**             | Next.js (React Framework)                   |
| **Backend**              | Node.js (API & Business Logic)              |
| **Database**             | PostgreSQL (Prisma Cloud Storage)         |
| **AI Processing**        | Google Gemini AI (Resume & Career Analysis) |
| **Authentication**       | Clerk (Secure Login System)                 |
| **Hosting & Deployment** | Vercel (For Frontend & Backend)             |

---

## **🔄 How CareerCraft AI Works**

1️⃣ **User Logs In** – Secure authentication via Clerk API.
2️⃣ **Build Resume** – AI helps improve content using **powerful language**.
3️⃣ **Generate Cover Letter** – AI tailors a cover letter **specific to the job**.
4️⃣ **Market Insights Analysis** – AI provides **real-time job market trends**.
5️⃣ **Save & Retrieve Data** – Resumes and insights are stored securely in Supabase.
6️⃣ **AI-Powered Dashboard** – Users can track career growth **visually**.

---

## **📂 System Architecture Overview**

CareerCraft AI follows a **modular & scalable architecture**:

```
               Frontend (Next.js - UI)
                   🔽  - User Interface for Resume Building & Job Insights

               Backend (Node.js - API)
                   🔽  - Connects AI, Database, and Frontend

  Database (PostgreSQL - Supabase) & AI (Google Gemini)
                   🔽  - Stores resumes & enhances content

               Hosting (Vercel - Deployment)
                   🔽  - Makes the app accessible globally
```

---

## **🛠️ How to Set Up & Run the Project**

### **1️⃣ Prerequisites**

- Install **Node.js** & **npm**
- Set up a **Supabase** & **Clerk** account
- Obtain **Google Gemini API Key**

### **2️⃣ Installation Steps**

```bash
# Clone the repository
git clone <repository-url>
cd careercraft-ai
```

```bash
# Install dependencies
npm install
```

```bash
# Set up environment variables in `.env` file
GEMINI_API_KEY=your-google-api-key
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-key
NEXT_PUBLIC_CLERK_FRONTEND_API=your-clerk-key
```

```bash
# Run the development server
npm run dev
```

**Access the application at** `http://localhost:3000`

---

## **🚀 Deployment**

- **Frontend & Backend:** Deployed on **Vercel** for auto-deployment.
- **Database:** Managed on **Supabase** (PostgreSQL).
- **Authentication:** Secured with **Clerk API**.

---

## **📊 API Endpoints & Database Schema**

### **API Endpoints (Next.js API Routes)**

- `POST /saveResume` – Saves user resume.
- `GET /getResume` – Retrieves saved resume.
- `POST /improveWithAI` – Enhances resume with AI.
- `POST /generateCoverLetter` – Generates AI-based cover letters.
- `GET /getIndustryInsights` – Fetches job market data.

### **Database Schema (PostgreSQL - Supabase)**

#### **User Table**

| Column      | Type   | Description             |
| ----------- | ------ | ----------------------- |
| id          | UUID   | Unique user ID          |
| clerkUserId | String | Clerk authentication ID |
| industry    | String | User-selected industry  |
| experience  | Int    | Years of experience     |
| skills      | JSON   | User's skill set        |
| bio         | Text   | User profile summary    |

#### **Resume Table**

| Column  | Type | Description         |
| ------- | ---- | ------------------- |
| id      | UUID | Unique resume ID    |
| userId  | UUID | Linked user ID      |
| content | Text | Resume text content |

#### **Cover Letter Table**

| Column         | Type   | Description            |
| -------------- | ------ | ---------------------- |
| id             | UUID   | Unique cover letter ID |
| userId         | UUID   | Linked user ID         |
| content        | Text   | Cover letter text      |
| jobTitle       | String | Target job title       |
| companyName    | String | Target company         |
| jobDescription | Text   | Job description        |

---

## **📌 Conclusion**

CareerCraft AI is a **game-changer for job seekers**, using AI-powered **resume enhancement**, **cover letter generation**, and **career tracking** to simplify job applications. With its **secure authentication, cloud deployment, and AI-driven insights**, this project is an essential tool for career growth!


