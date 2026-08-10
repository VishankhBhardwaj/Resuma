import { NextResponse } from "next/server";
import { razorpay } from "@/lib/razorpay";
import { supabase } from "@/lib/supabase/server";


export async function POST(req){

    try{

        const {subscription_id} = await req.json();


        // Razorpay subscription cancel
        await razorpay.subscriptions.cancel(
            subscription_id
        );


        // DB update
        await supabase
        .from("subscriptions")
        .update({
            status:"CANCELLED"
        })
        .eq(
            "razorpay_subscription_id",
            subscription_id
        );


        return NextResponse.json({
            success:true
        });


    }
    catch(error){

        console.log(error);

        return NextResponse.json(
            {
                error:"Cancel failed"
            },
            {
                status:500
            }
        );

    }

}