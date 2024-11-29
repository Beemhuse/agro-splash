import { getUserByEmail } from '@/sanity';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { NextRequest } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    console.log(body, "login data")
    const { email, password } = body;

    if (!email || !password) {
      return new Response(
        JSON.stringify({ error: 'Email and password are required' }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    const formattedEmail = email.toLowerCase();

    // Retrieve user by email
    const user = await getUserByEmail(formattedEmail); // Implement this function
    if (!user) {
      return new Response(
        JSON.stringify({ error: 'Invalid credentials' }),
        {
          status: 401,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    // Compare passwords
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return new Response(
        JSON.stringify({ error: 'Invalid credentials' }),
        {
          status: 401,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id },
      process.env.NEXT_PRIVATE_JWT_SECRET_KEY as string, // Ensure TypeScript knows it's a string
      { expiresIn: '1d' } // Token expires in 7 days
    );

    // Return success response
    return new Response(
      JSON.stringify({
        message: 'User signed in successfully!',
        user: { email: user.email, id: user._id }, // Return safe user data
        token,
      }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    console.error('Error during login:', error);
    return new Response(
      JSON.stringify({ message: 'An error occurred' }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}
