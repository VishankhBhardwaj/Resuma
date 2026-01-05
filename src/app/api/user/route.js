import { auth, currentUser } from "@clerk/nextjs/server"

export async function GET() {
  const { userId } = await auth()
  if (!userId) {
    return new Response("Unauthorized", { status: 401 })
  }

  const user = await currentUser()

  return Response.json({
    userId,
    fullName: user?.fullName,
    email: user?.primaryEmailAddress?.emailAddress,
    image: user?.imageUrl,
  })
}
