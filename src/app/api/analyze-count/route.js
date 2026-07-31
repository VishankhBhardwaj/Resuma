import {supabase} from "@/lib/supabase";
import { auth } from "@clerk/nextjs/server";

export async function POST(req){
    try {
        const {userId} = await auth();
        await supabase.from("Users").update({
            analyze_count: analyze_count + 1
        }).eq("clerk_user_id", userId);
        return new Response(JSON.stringify({message: "Analyze count updated successfully"}), {status: 200});
    }
    catch(error){
        console.error("Error in auth:", error);
        return new Response(JSON.stringify({error: "Unauthorized"}), {status: 401});
    }
}