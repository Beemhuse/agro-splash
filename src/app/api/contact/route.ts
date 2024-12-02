import { NextRequest, NextResponse } from "next/server";
import { client } from "@/sanity/client";

// Define the expected structure for the request body
interface ContactRequestBody {
  name: string;
  email: string;
  subject: string;
  message: string;
}

// Define the structure for the response
interface ApiResponse {
  message?: string;
  error?: string;
}

export async function POST(req: NextRequest): Promise<NextResponse<ApiResponse>> {
  try {
    // Parse the incoming request body
    const body = await req.json();
    const { name, email, subject, message } = body as ContactRequestBody;

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: "All fields (name, email, subject, message) are required." },
        { status: 400 }
      );
    }

    // Create a new document in Sanity
    await client.create({
      _type: "contact",
      name,
      email,
      subject,
      message,
    });

    // Send success response
    return NextResponse.json({ message: "Message sent successfully!" }, { status: 200 });
  } catch (error) {
    console.error("Error saving message to Sanity:", error);

    return NextResponse.json(
      { error: "Failed to send the message." },
      { status: 500 }
    );
  }
}
