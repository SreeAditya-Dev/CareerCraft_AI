"use server";

import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export async function generateQuiz() {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const user = await db.user.findUnique({
    where: { clerkUserId: userId },
    select: {
      industry: true,
      skills: true,
    },
  });

  if (!user) throw new Error("User not found");

  const prompt = `
    Generate **10 real-world interview questions** for a ${user.industry
    } professional${user.skills?.length ? ` with expertise in ${user.skills.join(", ")}` : ""
    }.
    
     **Requirements:**  
        1. Identify the user’s industry from the following:  
          - **Software & IT** (Software Engineering, Data Science, Cybersecurity, DevOps, Cloud, AI)  
          - **Business & Management** (Product Management, Project Management, Business Analysis)  
          - **Marketing & Sales** (Digital Marketing, SEO, Sales Funnels, Customer Retention)  
          - **Finance & Accounting** (Financial Analysis, Investment, Risk Management, Accounting)  
          - **Healthcare & Medicine** (Doctors, Nurses, Pharmacists, Medical Research)  
          - **Law & Legal** (Corporate Law, Criminal Law, Intellectual Property)  
          - **Engineering (Mechanical, Electrical, Civil, Aerospace)** (Core Engineering Topics)  
          - **Education & Research** (Teaching, Academic Research, Pedagogy)  
          - **Creative & Design** (Graphic Design, UI/UX, Game Design, Video Editing)  
          - **Media & Entertainment** (Journalism, Content Writing, Video Production)  
          - **Government & Public Sector** (Civil Services, Military, Governance)  
          - **Human Resources (HR)** (Recruitment, Employee Engagement, Labor Laws)  
          - **Logistics & Supply Chain** (Procurement, Inventory, Demand Forecasting)  

        2. Consider the candidate’s **years of experience** using the parameter ${ user.experience }:  
          - **0-2 years (Entry-Level)** → Focus on **fundamentals**, tools, and **basic problem-solving**.  
          - **3-5 years (Mid-Level)** → Emphasize **practical experience**, common **industry challenges**, and best practices.  
          - **6+ years (Senior-Level)** → Cover **strategic decision-making, optimization, and leadership** within the field.  

        3. Generate **role-specific questions** that match the **user’s field and experience level**.  
        4. Each question should be **multiple choice (MCQ)** with exactly **4 answer options**.  
        5. Ensure **only one correct answer** per question.  
        6. Provide a **detailed explanation** for the correct answer.  
        7. Questions should focus on **real-world job scenarios** and **industry best practices**.  
        8. Maintain **a mix of fundamental and advanced questions** for a well-rounded experience.  

        **Industry-Specific Topics to Cover:**  
        ✅ **Software & IT:**  
          - **0-2 yrs:** Data Structures, Basic Algorithms, SQL Queries, REST APIs  
          - **3-5 yrs:** System Design, Scalability, CI/CD, Security Best Practices  
          - **6+ yrs:** Architectural Decisions, Performance Optimization, Cloud Cost Efficiency,Data Structures  

        ✅ **Marketing & Sales:**  
          - **0-2 yrs:** SEO, Google Ads, Social Media Analytics  
          - **3-5 yrs:** Marketing Automation, CRM, Conversion Funnels  
          - **6+ yrs:** Growth Hacking, Brand Strategy, Competitive Positioning  

        ✅ **Finance & Accounting:**  
          - **0-2 yrs:** Balance Sheets, Tax Basics, Cost Accounting  
          - **3-5 yrs:** Portfolio Management, Budget Forecasting, Financial Risk Analysis  
          - **6+ yrs:** Mergers & Acquisitions, Corporate Finance, Global Markets  

        ✅ **Engineering (Mechanical, Electrical, Civil, Aerospace):**  
          - **0-2 yrs:** Basic Material Properties, Circuit Design, CAD Software  
          - **3-5 yrs:** Failure Analysis, Design Optimization, Quality Control  
          - **6+ yrs:** Industry 4.0, Advanced Manufacturing, Large-Scale Infrastructure  

        ✅ **HR & Talent Management:**  
          - **0-2 yrs:** Hiring Process, Resume Screening, Interview Techniques  
          - **3-5 yrs:** Employee Engagement, Performance Reviews, HR Analytics  
          - **6+ yrs:** Organizational Development, Labor Law Strategy, HR Policy-Making  

        ✅ **Healthcare & Medicine:**  
          - **0-2 yrs:** Medical Terminology, Patient Care Basics, Pharmacology  
          - **3-5 yrs:** Disease Diagnosis, Treatment Planning, Hospital Management  
          - **6+ yrs:** Healthcare Policy, Advanced Research, Medical Ethics  

        ✅ **Education & Research:**  
          - **0-2 yrs:** Teaching Techniques, Learning Theories, Student Engagement  
          - **3-5 yrs:** Academic Research, Paper Publishing, Grant Writing  
          - **6+ yrs:** Education Policy, University Administration, Curriculum Development  



    
    Return the response in this JSON format only, no additional text:
    {
      "questions": [
        {
          "question": "string",
          "options": ["string", "string", "string", "string"],
          "correctAnswer": "string",
          "explanation": "string"
        }
      ]
    }
  `;

  try {
    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = response.text();
    const cleanedText = text.replace(/```(?:json)?\n?/g, "").trim();
    const quiz = JSON.parse(cleanedText);

    return quiz.questions;
  } catch (error) {
    console.error("Error generating quiz:", error);
    throw new Error("Failed to generate quiz questions");
  }
}

export async function saveQuizResult(questions, answers, score) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const user = await db.user.findUnique({
    where: { clerkUserId: userId },
  });

  if (!user) throw new Error("User not found");

  const questionResults = questions.map((q, index) => ({
    question: q.question,
    answer: q.correctAnswer,
    userAnswer: answers[index],
    isCorrect: q.correctAnswer === answers[index],
    explanation: q.explanation,
  }));

  // Get wrong answers
  const wrongAnswers = questionResults.filter((q) => !q.isCorrect);

  // Only generate improvement tips if there are wrong answers
  let improvementTip = null;
  if (wrongAnswers.length > 0) {
    const wrongQuestionsText = wrongAnswers
      .map(
        (q) =>
          `Question: "${q.question}"\nCorrect Answer: "${q.answer}"\nUser Answer: "${q.userAnswer}"`
      )
      .join("\n\n");

    const improvementPrompt = `
      The user got the following ${user.industry} technical interview questions wrong:

      ${wrongQuestionsText}

      Based on these mistakes, provide a concise, specific improvement tip.
      Focus on the knowledge gaps revealed by these wrong answers.
      Keep the response under 2 sentences and make it encouraging.
      Don't explicitly mention the mistakes, instead focus on what to learn/practice.
    `;

    try {
      const tipResult = await model.generateContent(improvementPrompt);

      improvementTip = tipResult.response.text().trim();
      console.log(improvementTip);
    } catch (error) {
      console.error("Error generating improvement tip:", error);
      // Continue without improvement tip if generation fails
    }
  }

  try {
    const assessment = await db.assessment.create({
      data: {
        userId: user.id,
        quizScore: score,
        questions: questionResults,
        category: "Technical",
        improvementTip,
      },
    });

    return assessment;
  } catch (error) {
    console.error("Error saving quiz result:", error);
    throw new Error("Failed to save quiz result");
  }
}

export async function getAssessments() {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const user = await db.user.findUnique({
    where: { clerkUserId: userId },
  });

  if (!user) throw new Error("User not found");

  try {
    const assessments = await db.assessment.findMany({
      where: {
        userId: user.id,
      },
      orderBy: {
        createdAt: "asc",
      },
    });

    return assessments;
  } catch (error) {
    console.error("Error fetching assessments:", error);
    throw new Error("Failed to fetch assessments");
  }
}
