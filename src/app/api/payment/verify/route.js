import { NextResponse } from "next/server";
import crypto from "crypto";
import { supabase } from "@/lib/supabase/server";


export async function POST(req) {

    try {

        const body = await req.json();


        const {
            razorpay_payment_id,
            razorpay_subscription_id,
            razorpay_signature
        } = body;


        if (
            !razorpay_payment_id ||
            !razorpay_subscription_id ||
            !razorpay_signature
        ) {

            return NextResponse.json(
                {
                    error: "Missing payment details"
                },
                {
                    status: 400
                }
            );
        }



        // 1. Generate signature for verification

        const generated_signature = crypto
            .createHmac(
                "sha256",
                process.env.RAZORPAY_KEY_SECRET
            )
            .update(
                razorpay_subscription_id +
                "|" +
                razorpay_payment_id
            )
            .digest("hex");



        // 2. Compare signatures

        if (generated_signature !== razorpay_signature) {

            return NextResponse.json(
                {
                    error: "Invalid payment signature"
                },
                {
                    status: 400
                }
            );
        }



        // 3. Find subscription from database

        const { data: subscription, error: subscriptionError } =
            await supabase
                .from("subscriptions")
                .select("user_id")
                .eq(
                    "razorpay_subscription_id",
                    razorpay_subscription_id
                )
                .single();



        if (subscriptionError || !subscription) {

            return NextResponse.json(
                {
                    error: "Subscription not found"
                },
                {
                    status: 404
                }
            );
        }



        // 4. Update subscription status

        const { error: updateSubscriptionError } =
            await supabase
                .from("subscriptions")
                .update({
                    status: "ACTIVE"
                })
                .eq(
                    "razorpay_subscription_id",
                    razorpay_subscription_id
                );



        if (updateSubscriptionError) {
            throw updateSubscriptionError;
        }




        // 5. Make user premium

        const { error: updateUserError } =
            await supabase
                .from("users")
                .update({
                    is_premium: true
                })
                .eq(
                    "id",
                    subscription.user_id
                );



        if (updateUserError) {
            throw updateUserError;
        }



        return NextResponse.json(
            {
                success: true,
                message: "Payment verified. Premium activated."
            },
            {
                status: 200
            }
        );



    } catch (error) {

        console.error("Payment verification error:", error);


        return NextResponse.json(
            {
                error: "Payment verification failed"
            },
            {
                status: 500
            }
        );
    }
}