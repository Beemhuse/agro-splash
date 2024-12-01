import { createOrder, createTransaction } from "@/utils";
import { getSession } from "@/utils/lib/auth/getSession";
import { initializePaystack } from "@/utils/lib/paystack";
import {
  updateTransaction,
  updateUserAfterOrder,
} from "@/utils/lib/updateUserAfterOrder";
import { NextRequest } from "next/server";
import { v4 as uuidv4 } from "uuid";

export async function POST(req: NextRequest) {
  const {
    cartItems,
    amount,
    fullName,
    email,
    serviceFee,
    phoneNumber,
    streetAddress,
    orderNotes,
    apartment,
    townCity,
    deliveryAddress,
  } = await req.json();

  try {
    // Validate input
    if (!cartItems || !amount || !email || !fullName) {
      return new Response(JSON.stringify({ error: "Invalid request data" }), {
        status: 400,
      });
    }

    // Check if the user is signed in
    const session = await getSession(req);

    if (!session || !session.user) {
      throw new Error("User must be signed in to place an order.");
    }

    const currentUserId = session.user.userId;
    console.log(session, "session");
    // Add unique keys to each item in cartItems
    const productsWithKeys = cartItems.map((item) => {
      if (!item._id || !item.quantity) {
        throw new Error("Each cart item must have a productId and quantity.");
      }

      return {
        product: { _type: "reference", _ref: item._id }, // Reference to the product document
        quantity: item.quantity, // Quantity of the product
        _key: item._key || uuidv4(), // Generate a unique key if not provided
      };
    });
    console.log(productsWithKeys, "product with keys");

    // Initialize payment with Paystack
    const paymentResponse = await initializePaystack(
      email.toLowerCase(),
      amount
    );

    // Debugging log to inspect the response structure
    console.log("Payment Response:", paymentResponse);

    if (!paymentResponse?.reference) {
      throw new Error(
        "Failed to retrieve transaction reference from Paystack."
      );
    }

    const transactionRef = paymentResponse.reference;
    console.log("Transaction Reference:", transactionRef);

    // Create the order in Sanity
    const order = await createOrder({
      products: productsWithKeys,
      total: amount,
      email: email.toLowerCase(),
    //   serviceFee: { _type: "reference", _ref: serviceFee as string },
      serviceFee,

      name: fullName,
      streetAddress,
      apartment,
      townCity,
      phone: phoneNumber,
      transactionRef,
      deliveryAddress,
      notes: orderNotes,
      customer: { _type: "reference", _ref: currentUserId },
    });

    if (!order?._id) {
      throw new Error("Failed to create order.");
    }

    // Create a transaction for the order
    const transaction = await createTransaction({
      order: { _type: "reference", _ref: order._id },
      amount,
      transactionRef,
      userId: { _type: "reference", _ref: currentUserId },
      status: "pending",
      method: "paystack",
      transactionDate: new Date().toISOString(),
    });

    // Update user's order history
    await updateUserAfterOrder(currentUserId, amount, order, true);

    // Update the transaction status
    await updateTransaction(currentUserId, transaction);

    return new Response(
      JSON.stringify({ success: true, order, transaction, paymentResponse }),
      { status: 200 }
    );
  } catch (error: unknown) {
    console.error("Error processing order:", error.message);

    return new Response(
      JSON.stringify({
        error: error.message || "An unexpected error occurred",
      }),
      { status: 500 }
    );
  }
}
