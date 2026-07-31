import {generatePortfolioFeedback} from "@/lib/gemini";

export async function POST(req){
    try{
        const {messages} = await req.json();
        if(!messages || !Array.isArray(messages) || messages.length === 0){
            return new Response(JSON.stringify({error: "No messages provided"}), {status: 400});
        }
        const prompt = `
You are an expert technical interviewer and career coach.

Analyze the following interview transcript between an interviewer and a candidate.

Your task is to provide detailed, actionable feedback on the candidate's performance.

Evaluate the candidate on these parameters:

1. Communication Skills:
- Clarity of speech
- Confidence and fluency
- Ability to explain thoughts clearly
- Use of filler words and unnecessary pauses

2. Technical Knowledge:
- Accuracy of technical answers
- Depth of understanding
- Ability to explain concepts with examples
- Problem-solving approach

3. Project Explanation:
- How well the candidate explains their projects
- Understanding of architecture, technologies, and decisions
- Ability to justify technical choices

4. Interview Presence:
- Confidence level
- Engagement with the interviewer
- Professionalism
- Enthusiasm

5. Areas of Improvement:
- Identify specific weaknesses
- Provide practical suggestions to improve

6. Overall Assessment:
- Give an overall rating out of 10
- Mention strengths
- Mention the most important things the candidate should improve before real interviews

Return the response in this JSON format:

{
  "overallRating": "",
  "strengths": [],
  "communicationFeedback": "",
  "technicalFeedback": "",
  "projectExplanationFeedback": "",
  "improvementAreas": [],
  "actionPlan": []
}

Be honest, specific, and constructive. Avoid generic advice.

Interview Transcript:
`;
        const feedback = await generatePortfolioFeedback(prompt,messages);
        let parsedFeedback = feedback;
        try {
            let cleaned = feedback.trim();
            if (cleaned.startsWith("```")) {
                cleaned = cleaned.replace(/^```json\s*/i, "").replace(/```$/, "").trim();
            }
            parsedFeedback = JSON.parse(cleaned);
        } catch (e) {
            console.error("Failed to parse Gemini response as JSON", e);
        }
        
        return new Response(JSON.stringify({ feedback: parsedFeedback }), {
            status: 200,
            headers: { "Content-Type": "application/json" }
        });
    }catch(error){
        console.error("Error in getFeedback API:", error);
        return new Response(JSON.stringify({error: error.message || "Failed to generate feedback"}), {
            status: 500,
            headers: { "Content-Type": "application/json" }
        });
    }
}