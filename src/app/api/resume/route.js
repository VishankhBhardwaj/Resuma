import { NextResponse } from "next/server";
import { generatePortfolio } from "@/lib/gemini";
import { auth } from "@clerk/nextjs/server";


export async function POST(req) {
    try {
        const { userId } = await auth();

        if (!userId) {
            return NextResponse.json(
                { error: "Unauthorized" },
                { status: 401 }
            );
        }

        const { text, jobTitle, jobDesc, requiredSkills } = await req.json();

        if (!text || !jobTitle || !jobDesc) {
            return NextResponse.json(
                { error: "Missing required fields" },
                { status: 400 }
            );
        }

        const prompt = `
You are an expert ATS resume reviewer, professional resume writer, and technical recruiter.

Analyze the candidate's CURRENT RESUME against the provided JOB TITLE, JOB DESCRIPTION, and REQUIRED SKILLS.

Rules:
- Do NOT invent fake experience, skills, or achievements.
- Improve clarity, impact, and alignment with the job.
- Use concise bullet points.
- Return ONLY valid JSON.

CURRENT RESUME:
"""
${text}
"""

JOB TITLE:
"""
${jobTitle}
"""

JOB DESCRIPTION:
"""
${jobDesc}
"""

REQUIRED SKILLS:
"""
${requiredSkills || ""}
"""

Return JSON in the following EXACT structure:

{
  "analysis": {
    "overallScore": number,
    "atsCompatibility": "High | Medium | Low",
    "missingKeywords": [string],
    "strengths": [string],
    "weaknesses": [string],
    "formattingIssues": [string],
    "recommendations": [string]
  },
  "newResume": {
    "headline": string,
    "professionalSummary": string,
    "skills": [string],
    "experience": [
      {
        "role": string,
        "company": string,
        "duration": string,
        "points": [string]
      }
    ],
    "projects": [
      {
        "name": string,
        "description": string
      }
    ],
    "education": [
      {
        "degree": string,
        "institution": string,
        "year": string
      }
    ]
  }
}
`;

        const aiReply = await generatePortfolio(prompt);
        const parsed = (aiReply);
        return NextResponse.json(
            { result: parsed },
            { status: 200 }
        );

    } catch (err) {
        console.error(err);
        return NextResponse.json(
            { error: "Failed to analyze resume" },
            { status: 500 }
        );
    }
}
