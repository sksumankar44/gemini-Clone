/// <reference types="vite/client" />
import { GoogleGenerativeAI } from "@google/generative-ai";

// Function that takes a prompt and returns a Gemini-generated response
const runChat = async (prompt: string): Promise<string> => {
  // if (!prompt || prompt.trim() === "") {
  //   return "Prompt cannot be empty.";
  // }

  try {
    const ai = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);
    const model = ai.getGenerativeModel({ model: "gemini-2.0-flash" });

    const result = await model.generateContent({
      contents: [
        {
          role: "user",
          parts: [{ text: prompt }],
        },
      ],
    });

    const response = result.response;
    const text = response.text();
    console.log("Gemini response:", text);
    return text;
  } catch (error) {
    console.error("Error from Gemini API:", error);
    return "Something went wrong.";
  }
};

export default runChat;
