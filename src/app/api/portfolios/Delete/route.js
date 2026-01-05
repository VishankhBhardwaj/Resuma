import { supabase } from "@/lib/supabase/server";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";


export async function POST(req) {
    const { id } = await req.json(); 
    const { userId } = await auth();

    if (!userId) {
        return NextResponse.json(
            { error: "No User Logged In" },
            { status: 401 }
        );
    }

    const { error } = await supabase
        .from("Portfolios")
        .delete()
        .eq("id", id);

    if (error) {
        return NextResponse.json(
            { error: "No such portfolio found" },
            { status: 404 }
        );
    }

    return NextResponse.json(
        { msg: "Deleted Successfully" },
        { status: 200 }
    );
}
