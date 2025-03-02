/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from 'next/server';
import { client } from '@/sanity/client'; // Adjust the import based on your actual Sanity client path
import { SanityClientErrorResponse } from '@/constants/sanityError';

export async function POST(req: NextRequest) {
  const { id, name, phone, address, image } = await req.json();

  try {

    // Validate that the required `id` field is present
    if (!id) {
      return NextResponse.json(
        { error: 'User ID is required' },
        { status: 400 }
      );
    }

    const updateData: Record<string, any> = {}; // Record for dynamic key-value pairs

    // Only add fields that are provided
    if (name) updateData.name = name;
    if (phone) updateData.phone = phone;
    if (address) updateData.address = address;
    if (image) updateData.image = { asset: { _ref: image } };


    // Update the customer document in Sanity
    const updatedCustomer = await client
      .patch(id) // Patch the document by its ID
      .set(updateData) // Set the fields to update
      .commit();


    // Respond with the updated customer data
    return NextResponse.json(updatedCustomer);
  } catch (error) {
    console.error("Error updating customer:", error);

    if (error instanceof SanityClientErrorResponse) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    } else {
      // Return a general error message for unexpected errors
      return NextResponse.json(
        { error: 'Failed to update customer' },
        { status: 500 }
      );
    }
  }
}
