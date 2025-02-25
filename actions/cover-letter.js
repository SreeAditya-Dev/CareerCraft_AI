"use server";

import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export async function generateCoverLetter(data) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const user = await db.user.findUnique({
    where: { clerkUserId: userId },
  });

  if (!user) throw new Error("User not found");

  const prompt = `  
  You are a professional career coach and expert cover letter writer.  
  Write a **compelling, ATS-optimized cover letter** for a **${
    data.jobTitle
  }** position at **${
    data.companyName
  }** that effectively showcases the candidate's strengths.  

  ### About the Candidate  
  - **Industry:** ${user.industry}  
  - **Years of Experience:** ${user.experience}  
  - **Key Skills:** ${user.skills?.join(", ")}  
  - **Professional Background:** ${user.bio}  

  ### Job Description  
  ${data.jobDescription}  

  ### Cover Letter Requirements  
  - Use a **confident, engaging, and professional** tone.  
  - Start with a **strong opening** that grabs attention.  
  - Clearly articulate **why the candidate is a great fit** for the role.  
  - Showcase **specific achievements** with quantifiable results where possible.  
  - Demonstrate **knowledge of the company’s values, goals, and challenges**.  
  - Keep it **concise (under 400 words)** while making a strong impact.  
  - Use **proper business letter formatting** in Markdown.  
  - Close with a **call to action**, expressing enthusiasm for the opportunity.  

  **Format the response as a well-structured markdown cover letter without any additional explanations.**  
`;

  try {
    const result = await model.generateContent(prompt);
    const content = result.response.text().trim();

    const coverLetter = await db.coverLetter.create({
      data: {
        content,
        jobDescription: data.jobDescription,
        companyName: data.companyName,
        jobTitle: data.jobTitle,
        status: "completed",
        userId: user.id,
      },
    });

    return coverLetter;
  } catch (error) {
    console.error("Error generating cover letter:", error.message);
    throw new Error("Failed to generate cover letter");
  }
}

export async function getCoverLetters() {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const user = await db.user.findUnique({
    where: { clerkUserId: userId },
  });

  if (!user) throw new Error("User not found");

  return await db.coverLetter.findMany({
    where: {
      userId: user.id,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}

export async function getCoverLetter(id) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const user = await db.user.findUnique({
    where: { clerkUserId: userId },
  });

  if (!user) throw new Error("User not found");

  return await db.coverLetter.findUnique({
    where: {
      id,
      userId: user.id,
    },
  });
}

export async function deleteCoverLetter(id) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const user = await db.user.findUnique({
    where: { clerkUserId: userId },
  });

  if (!user) throw new Error("User not found");

  return await db.coverLetter.delete({
    where: {
      id,
      userId: user.id,
    },
  });
}
