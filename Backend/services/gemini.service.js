import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

export const generateInterviewQuestion = async (resumeText, previousQA = []) => {
  try {
   let conversationHistory = "";

  previousQA.forEach((item, index) => {
    conversationHistory += `Q${index + 1}: ${item.question}\n`;
    conversationHistory += `A${index + 1}: ${item.answer}\n`;
  });

  const prompt = `
You are a professional technical interviewer.

Candidate Resume:
${resumeText}

Previous Interview Conversation:
${conversationHistory || "None"}

Instructions:
- Ask ONLY ONE interview question
- Question must be based on the resume
- If previous answer exists, ask a follow-up cross question
- Be realistic and professional

Return ONLY the question.
`;

  const result = await ai.models.generateContent({
    model: "gemini-3-flash-preview", 
    contents: prompt,               
  });

  return result.text; 
  } catch (error) {
    console.log(error,'line44gemini');
  }

  
};
