import { NextResponse } from "next/server";
import { generatePortfolio } from "@/lib/gemini";
import { auth } from "@clerk/nextjs/server";
import { supabase } from "@/lib/supabase/server";

export async function POST(req) {
  const { userId } = await auth();

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { portfolioId, template, desc, data } = await req.json();
  if (!portfolioId || !template || !data) {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }
  const prompt = `
You are a PROFESSIONAL portfolio content refiner.

Your job is to IMPROVE and ELABORATE the given portfolio data
while keeping the DATA STRUCTURE EXACTLY THE SAME.

This refined data will be directly consumed by a React portfolio template,
so STRUCTURAL ACCURACY IS CRITICAL.

=====================
STRICT OUTPUT RULES
=====================
- OUTPUT ONLY VALID JSON
- NO markdown
- NO explanations
- NO comments
- NO extra text before or after JSON
- JSON must be directly parsable

=====================
STRUCTURE RULES (VERY IMPORTANT)
=====================
- Keep ALL keys exactly the same as input
- Do NOT add new keys
- Do NOT remove existing keys
- Do NOT rename any key
- Preserve object nesting exactly
- Preserve array structure exactly
- Maintain key-value format identical to input
- If a field exists in input, it MUST exist in output

=====================
CONTENT REFINEMENT RULES
=====================
YOU ARE EXPECTED TO:
- Rewrite casual or broken English into professional language
- Elaborate short phrases into clear, portfolio-ready descriptions
- Improve grammar, clarity, and sentence flow
- Normalize capitalization (e.g., Google, AWS, React, Supabase)
- Convert abbreviations to full forms (e.g., "sde" → "Software Development Engineer")
- Improve bios, work descriptions, and project descriptions
- Keep tone professional, confident, and concise

=====================
STRICT FACT SAFETY RULES
=====================
YOU MUST NOT:
- Add new skills, jobs, projects, or achievements
- Invent responsibilities or experience
- Exaggerate claims or impact
- Change dates, numbers, companies, links, or locations
- Change the meaning of any statement
- Remove empty fields (keep them as empty if present)

=====================
ELABORATION GUIDELINES
=====================
- Elaboration means: clearer + more descriptive wording
- Elaboration does NOT mean exaggeration
- Use ONLY information implied by the original text
- Do NOT use marketing buzzwords or fake metrics

EXAMPLE:
Input:  "am a full stack developer"
Output: "A full stack developer experienced in building and maintaining modern web applications."

=====================
IMPORTANT
=====================
- Refinement MUST be clearly visible
- Output MUST match the original data format exactly
- The refined JSON will be passed directly as \`data\` prop to a template

=====================
INPUT DATA
=====================
${JSON.stringify(data)}
`;



  const aiReply = await generatePortfolio(prompt);
  const { error } = await supabase
    .from("Portfolios")
    .insert({
      id: portfolioId,
      clerk_user_id: userId,
      form_data: data,
      ai_data: aiReply.trim(),
      template: data.title,
    });
  if (error) {

    return NextResponse.json({ error: "Failed to Save Portfolio" }, { status: 500 });
  }
  return NextResponse.json({
    portfolioId
  }, { status: 200 });
}
