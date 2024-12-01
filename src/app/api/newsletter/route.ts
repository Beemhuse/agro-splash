import { NextResponse } from "next/server";
import { client } from "@/sanity/client";

export async function POST(req: Request) {
  const { email } = await req.json();

  if (!email) {
    return NextResponse.json({ error: "Email is required" }, { status: 400 });
  }

  try {
    await client.create({
      _type: "newsletterSubscription",
      email,
      subscribedAt: new Date().toISOString(),
    });
    return NextResponse.json({ message: "Subscription successful" }, { status: 200 });
  } catch (error) {
    console.error("Error saving subscription:", error);
    return NextResponse.json({ error: "Failed to save subscription" }, { status: 500 });
  }
}
