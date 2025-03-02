import jwt from 'jsonwebtoken';
import { NextRequest } from 'next/server';

export async function getSession(req: NextRequest) {
  const authorizationHeader = req.headers.get('Authorization');
  
  
  if (!authorizationHeader || !authorizationHeader.startsWith('Bearer ')) {
    return null; // No authorization header or not a Bearer token
  }

  const token = authorizationHeader.split(' ')[1]; // Extract the token part

  try {
    // Verify the JWT token
    const decodedToken = jwt.verify(token, process.env.NEXT_PRIVATE_JWT_SECRET_KEY as string);

    // Return the decoded token as the session
    return {
      user: decodedToken,
    };
  } catch (error) {
    // If token verification fails, return null
    console.error('Failed to verify token:', error);
    return null;
  }
}
