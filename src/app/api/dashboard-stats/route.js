import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase/server";

export async function GET() {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const { count, error } = await supabase
      .from("Portfolios")
      .select("*", { count: "exact" })
      .eq("clerk_user_id", userId);
    const {data,Porterror} = await supabase
      .from("Portfolios")
      .select("views")
      .eq("clerk_user_id", userId);
    const { data: resumeCount, error: resumeError } = await supabase
      .from("users")
      .select("analyze_count")
      .eq("clerk_user_id", userId);
    if (Porterror || error || resumeError) {
      return NextResponse.json({ error: Porterror?.message || error?.message || resumeError?.message }, { status: 500 });
    }
    console.log("Portfolio count:", count);
    return NextResponse.json({
      portfolioCount: count ?? 0,
      totalViews: data.reduce((sum, portfolio) => sum + portfolio.views, 0),
      resumeAnalyzeCount: resumeCount?.[0]?.analyze_count ?? 0
    });
  } catch (error) {
    console.error("Error fetching dashboard stats:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
