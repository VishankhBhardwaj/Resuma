import { razorpay } from "@/lib/razorpay";
import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { supabase } from "@/lib/supabase/server";

export async function POST(req) {
    try {
        const { userId } = await auth();
        if (!userId) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }
        const { data: user } = await supabase.from("users").select("id").eq("clerk_user_id", userId).maybeSingle();
        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }
        const subscription = await razorpay.subscriptions.create({
            plan_id: process.env.RAZORPAY_PLAN_ID,
            customer_notify: 1,
            total_count: 12,
        });

        await supabase.from("subscriptions").insert({
            user_id: user.id,
            razorpay_subscription_id: subscription.id,
            plan_id: process.env.RAZORPAY_PLAN_ID,
            plan_name: "PREMIUM_MONTHLY",
            status: "PENDING"
        });
        return NextResponse.json({ subscription }, { status: 200 });
    }catch(error){
        console.error("Error creating payment order:", error);
        return NextResponse.json({ error: "Failed to create payment order" }, { status: 500 });
    }
}