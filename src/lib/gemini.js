import { GoogleGenAI } from "@google/genai";

// The client gets the API key from the environment variable `GEMINI_API_KEY`.
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

export async function generatePortfolio(prompt, retries = 3) {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });
    return response.text;
  } catch (error) {
    if(error?.status ==503 && retries>0){
      console.log(`Gemini busy, retrying... (${retries} left)`);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      return generatePortfolio(prompt, retries - 1);
    }
    throw error
  }
}

export async function generatePortfolioFeedback(prompt, messages) {
  const transcriptString = messages
    .map((msg) => `${msg.role === "user" ? "Candidate" : "Interviewer"}: ${msg.content}`)
    .join("\n");
  const fullPrompt = `${prompt}\n\nTranscript:\n${transcriptString}`;
  return generatePortfolio(fullPrompt);
}


