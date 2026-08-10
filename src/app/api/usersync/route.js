import { NextResponse } from "next/server";
import { auth, currentUser } from "@clerk/nextjs/server";
import { supabase } from "@/lib/supabase/server";


export async function POST(){

    try{

        const { userId } = await auth();

        if(!userId){
            return NextResponse.json(
                {error:"Unauthorized"},
                {status:401}
            );
        }


        // Clerk se user details
        const user = await currentUser();



        // check existing user
        const {data:existingUser} = await supabase
        .from("users")
        .select("id")
        .eq("clerk_user_id", userId)
        .maybeSingle();



        if(existingUser){

            return NextResponse.json({
                message:"User already exists"
            });

        }



        // insert new user
        const {error} = await supabase
        .from("users")
        .insert({

            clerk_user_id:userId,

            fullName:
            `${user.firstName ?? ""} ${user.lastName ?? ""}`.trim(),

            email:
            user.emailAddresses[0]?.emailAddress,

            avatar_url:user.imageUrl

        });



        if(error){
            throw error;
        }



        return NextResponse.json({
            message:"User created"
        });


    }
    catch(error){

        console.log(error);

        return NextResponse.json(
            {
                error:"Something went wrong"
            },
            {
                status:500
            }
        );

    }

}