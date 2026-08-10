import { auth, currentUser } from "@clerk/nextjs/server";
import { supabase } from "@/lib/supabase/server";

export async function GET() {
  const { userId } = await auth();
  if (!userId) {
    return new Response("Unauthorized", { status: 401 });
  }

  const user = await currentUser();

  let dbUser = null;
  try {
    const { data: existingUser, error: fetchErr } = await supabase
      .from("users")
      .select("id, is_premium")
      .eq("clerk_user_id", userId)
      .maybeSingle();

    if (fetchErr) {
      console.error("Error fetching user from Supabase:", fetchErr);
    }

    if (!existingUser) {
      // Lazy create user record
      const fullName = `${user?.firstName ?? ""} ${user?.lastName ?? ""}`.trim() || user?.fullName || null;
      const email = user?.primaryEmailAddress?.emailAddress || null;
      const avatar_url = user?.imageUrl || null;

      const { data: newUser, error: insertErr } = await supabase
        .from("users")
        .insert({
          clerk_user_id: userId,
          fullName: fullName,
          email: email,
          avatar_url: avatar_url
        })
        .select("id, is_premium")
        .single();

      if (insertErr) {
        console.error("Error lazy-creating user record:", insertErr);
      } else {
        dbUser = newUser;
      }
    } else {
      dbUser = existingUser;
    }
  } catch (error) {
    console.error("Database connection issue in lazy user creation:", error);
  }

  let isPremium = dbUser?.is_premium || false;
  let subscriptionId = null;

  if (dbUser) {
    try {
      // Get the latest active subscription for this user UUID
      const { data: activeSub, error: subErr } = await supabase
        .from("subscriptions")
        .select("razorpay_subscription_id")
        .eq("user_id", dbUser.id)
        .neq("status", "CANCELLED")
        .order("created_at", { ascending: false })
        .limit(1)
        .maybeSingle();

      if (subErr) {
        console.error("Error fetching user subscription:", subErr);
      } else if (activeSub) {
        subscriptionId = activeSub.razorpay_subscription_id;
      }
    } catch (subError) {
      console.error("Error loading subscription from database:", subError);
    }
  }

  return Response.json({
    userId,
    fullName: user?.fullName,
    email: user?.primaryEmailAddress?.emailAddress,
    image: user?.imageUrl,
    isPremium,
    subscriptionId,
  });
}
