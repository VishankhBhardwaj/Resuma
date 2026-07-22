import vapi from "@vapi-ai/web";

export async function POST(req) {
  const vapi = new Vapi(process.env.NEXT_PUBLIC_VAPI_API_KEY);
  await vapi.start(process.env.NEXT_PUBLIC_VAPI_MODEL_ID);
  
}
