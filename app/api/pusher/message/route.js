import { NextResponse } from "next/server";
import Pusher from "pusher";

export async function POST(req) {
  const { userId, message } = await req.json();
 
  const conversations = {};

  const pusher = new Pusher({
    appId: "1654801",
    key: "08fffc3c6fcb0f95f566",
    secret: "ccf97562f44fc5f5a071",
    cluster: "ap2",
    useTLS: true,
  });

  if (!conversations[userId]) {
    conversations[userId] = [];
  }
  conversations[userId].push({ role: "customer", message });

  console.log(conversations)
  // Broadcast message to admin
  const data = pusher.trigger(`user-${userId}`, "message", {
    userId,
    role: "customer",
    message,
  });

  return NextResponse.json(conversations);
}
