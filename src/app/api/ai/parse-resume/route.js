import { NextResponse } from "next/server";
import { generatePortfolio } from "@/lib/gemini";
import { auth } from "@clerk/nextjs/server";

export async function POST(req) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { text } = await req.json();

    if (!text) {
      return NextResponse.json({ error: "No resume text provided" }, { status: 400 });
    }

    const prompt = `
You are a professional resume parser. Extract information from the candidate's resume text and return it in a structured JSON format exactly matching the schema below.

Resume Text:
"""
${text}
"""

Return JSON in this EXACT structure:
{
  "fullName": string,
  "professionalTitle": string,
  "location": string,
  "email": string,
  "phone": string,
  "website": string,
  "bio": string,
  "links": [
    {
      "platform": string,
      "url": string
    }
  ],
  "skills": [
    {
      "id": number,
      "name": string,
      "level": "Beginner" | "Intermediate" | "Proficient" | "Expert",
      "score": number
    }
  ],
  "work": [
    {
      "id": number,
      "jobTitle": string,
      "company": string,
      "location": string,
      "startDate": string,
      "endDate": string,
      "current": boolean,
      "description": string,
      "achievements": [string]
    }
  ],
  "projects": [
    {
      "title": string,
      "description": string,
      "demoLink": string,
      "gitHubLink": string,
      "technologiesUsed": [string]
    }
  ]
}

Strict Rules:
- Return ONLY valid JSON.
- Do NOT include markdown blocks. If you must use code blocks, ensure they are easily strippable.
- Do NOT invent fake projects or work experience if not present in the resume.
`;

    const aiReply = await generatePortfolio(prompt);
    let parsed = aiReply;
    try {
      let cleaned = aiReply.trim();
      if (cleaned.startsWith("```")) {
        cleaned = cleaned.replace(/^```json\s*/i, "").replace(/```$/, "").trim();
      }
      parsed = JSON.parse(cleaned);
    } catch (e) {
      console.error("Failed to parse Gemini response as JSON", e);
      return NextResponse.json({ error: "Failed to parse AI response" }, { status: 500 });
    }

    return NextResponse.json({ result: parsed }, { status: 200 });

  } catch (err) {
    console.error("Error in parse-resume API:", err);
    return NextResponse.json(
      { error: err?.message || "Failed to parse resume" },
      { status: 500 }
    );
  }
}
