import { createOrder, createTransaction } from "@/utils";
import { getSession } from "@/utils/lib/auth/getSession";
import { initializePaystack } from "@/utils/lib/paystack";
import {
  updateTransaction,
  updateUserAfterOrder,
} from "@/utils/lib/updateUserAfterOrder";
import { NextRequest } from "next/server";
import { v4 as uuidv4 } from "uuid";

interface CartItem {
  _id: string;
  quantity: number;
  _key?: string;
}
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
    let currentUserId: string;

    if (typeof session.user === "object" && session.user.userId) {
      currentUserId = session.user.userId;
    } else {
      throw new Error("Invalid session. User ID is missing.");
    }
    // Add unique keys to each item in cartItems
    const productsWithKeys = cartItems.map((item: CartItem) => {
      if (!item._id || !item.quantity) {
        throw new Error("Each cart item must have a productId and quantity.");
      }

      return {
        product: { _type: "reference", _ref: item._id }, // Reference to the product document
        quantity: item.quantity, // Quantity of the product
        _key: item._key || uuidv4(), // Generate a unique key if not provided
      };
    });

    // Initialize payment with Paystack
    const paymentResponse = await initializePaystack(
      email.toLowerCase(),
      amount
    );


    if (!paymentResponse?.reference) {
      throw new Error(
        "Failed to retrieve transaction reference from Paystack."
      );
    }

    const transactionRef = paymentResponse.reference;

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

    if (!("error" in order) && order?._id) {
      // The order is valid; proceed
    } else {
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


    function isTransaction(obj: unknown): obj is { _id: string } {
      return (
        typeof obj === "object" &&
        obj !== null &&
        "_id" in obj &&
        typeof (obj as { _id: unknown })._id === "string"
      );
    }
    
    // Update the transaction status
    if (isTransaction(transaction)) {
      await updateTransaction(currentUserId, transaction);
    } else {
      throw new Error(transaction.error || "Failed to create transaction.");
    }
    return new Response(
      JSON.stringify({ success: true, order, transaction, paymentResponse }),
      { status: 200 }
    );
  }catch (error: unknown) {
  let errorMessage = "An unexpected error occurred";

  if (error instanceof Error) {
    // Narrow the type to Error
    errorMessage = error.message;
  }

  console.error("Error processing order:", errorMessage);

  return new Response(
    JSON.stringify({
      error: errorMessage,
    }),
    { status: 500 }
  );
}
}
