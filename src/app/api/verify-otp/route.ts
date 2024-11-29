import { getUserByEmail } from "@/sanity";
import { updateUser } from "@/utils/lib/updateUser";
import { getOtpByEmail, deleteOtp } from "@/utils/lib/otp"; // Replace with correct path
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { email, otp } = await req.json();

    // Validate input
    if (!email || !otp) {
      return new Response(
        JSON.stringify({ message: "Email and OTP are required" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const formattedEmail = email.toLowerCase();

    // Retrieve OTP from Sanity DB
    const storedOtp = await getOtpByEmail(formattedEmail);

    // Check if OTP exists
    if (!storedOtp) {
      return new Response(
        JSON.stringify({ message: "Invalid or expired OTP" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // Check if OTP matches
    if (storedOtp.otp !== otp) {
      return new Response(
        JSON.stringify({ message: "Invalid OTP" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // Check if OTP is expired
    if (new Date() > new Date(storedOtp.expiresAt)) {
      await deleteOtp(storedOtp._id); // Clean up expired OTP
      return new Response(
        JSON.stringify({ message: "OTP has expired" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // Retrieve the user from the database
    const user = await getUserByEmail(formattedEmail);

    if (!user) {
      return new Response(
        JSON.stringify({ message: "User not found" }),
        { status: 404, headers: { "Content-Type": "application/json" } }
      );
    }

    // Update the user's active status in the database
    user.isActive = true;
    const updatedUser = await updateUser(user);

    // Delete OTP after successful verification
    await deleteOtp(storedOtp._id);

    return new Response(
      JSON.stringify({
        message: "Email verified successfully!",
        user: updatedUser,
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (err) {
    console.error("Error verifying OTP:", err);
    return new Response(
      JSON.stringify({ message: "Failed to verify OTP" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
