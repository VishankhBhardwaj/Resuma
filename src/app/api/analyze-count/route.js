import { supabase } from "@/lib/supabase/server";
import { auth } from "@clerk/nextjs/server";

export async function POST(req) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
    }

    // Fetch the current count
    const { data, error: fetchError } = await supabase
      .from("users")
      .select("analyze_count")
      .eq("clerk_user_id", userId)
      .maybeSingle();

    if (fetchError) {
      console.error("Error fetching user count:", fetchError);
      return new Response(JSON.stringify({ error: fetchError.message }), { status: 500 });
    }

    const currentCount = data?.analyze_count || 0;

    // Upsert the incremented count
    const { error: upsertError } = await supabase
      .from("users")
      .upsert({
        clerk_user_id: userId,
        analyze_count: currentCount + 1,
      });

    if (upsertError) {
      console.error("Error upserting analyze count:", upsertError);
      return new Response(JSON.stringify({ error: upsertError.message }), { status: 500 });
    }

    return new Response(JSON.stringify({ message: "Analyze count updated successfully" }), { status: 200 });
  } catch (error) {
    console.error("Error in analyze-count API:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), { status: 500 });
  }
}