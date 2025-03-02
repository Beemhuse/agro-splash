import { client } from "@/sanity/client";
import { v4 as uuidv4 } from "uuid";

// Define types for the arguments and return values

interface Product {
  _id: string;
  _key?: string;
}

interface CreateOrderParams {
  products: Product[];
  total: number;
  email: string;
  serviceFee: string | { _ref: string };
  name: string;
  streetAddress: string;
  apartment?: string;
  townCity: string;
  phone: string;
  transactionRef: string;
  notes?: string;
  deliveryAddress: string;
  customer: { _type: "reference"; _ref: string };
}

interface CreateTransactionParams {
  order: { _type: "reference"; _ref: string };
  amount: number;
  transactionRef: string;
  userId: { _type: "reference"; _ref: string };
  status?: string;
  method: string;
  transactionDate: string
}

interface Transaction {
  _id: string;
  transactionRef: string;
  status: string;
}

interface Order {
  _id: string;
  orderId?: string;
}

// Function to create an order in Sanity
export const createOrder = async ({
  products,
  total,
  email,
  serviceFee,
  name,
  streetAddress,
  apartment,
  townCity,
  phone,
  transactionRef,
  notes,
  customer,
}: CreateOrderParams): Promise<Order | { error: string; message: string }> => {
  try {

    const serviceFeeRef = { _type: "reference", _ref: serviceFee };

    // Create the order document in Sanity
    const order = await client.create({
      _type: "order",
      products,
      total,
      serviceFee: serviceFeeRef,
      transactionDate: new Date().toISOString(),
      email,
      name,
      streetAddress,
      apartment,
      townCity,
      phone,
      transactionRef,
      notes,
      customer,
      status: "pending",
    });

    // Update the order with its own ID as orderId (optional)
    await client.patch(order._id).set({ orderId: order._id }).commit();

    return order;
  } catch (error: unknown) {
    console.error("Error saving order to Sanity:", error);
    return {
      error: "Internal Server Error",
      message: (error as Error).message || "Unknown error occurred",
    };
  }
};

// Function to create a transaction in Sanity
export const createTransaction = async ({
  order,
  amount,
  transactionRef,
  userId,
  status = "pending",
  method,
}: CreateTransactionParams): Promise<
  Transaction | { error: string; message: string }
> => {
  try {
    // Generate a shorter custom ID for the transaction
    const shortUuid = uuidv4().split("-")[0]; // Take only the first segment of the UUID
    const customTransactionId = `txn-${shortUuid}`;

    const transaction = await client.create({
      _type: "transaction",
      id: customTransactionId,
      order,
      amount,
      transactionRef,
      userId,
      transactionDate: new Date().toISOString(),
      status,
      method,
    });

    return transaction;
  } catch (error: unknown) {
    console.error("Error saving transaction to Sanity:", error);
    return {
      error: "Internal Server Error",
      message: (error as Error).message || "Unknown error occurred",
    };
  }
};

// Function to get all transaction references
export const getTransactionRefs = async (): Promise<string[] | { error: string }> => {
  try {
    // Query Sanity to fetch all transactions and select the transactionRef field
    const transactions = await client.fetch<{ transactionRef: string }[]>(
      `*[_type == 'transaction']{transactionRef}`
    );

    return transactions.map((transaction) => transaction.transactionRef);
  } catch (error: unknown) {
    console.error("Error fetching transaction references:", error);
    return { error: "Error fetching transaction references" };
  }
};

// Function to update the transaction status

export const updateTransactionStatus = async (
  transactionRef: string,
  newStatus: string
): Promise<{ success: boolean; transaction?: Transaction; error?: string }> => {
  try {
    const transaction = await client.fetch<Transaction>(
      `*[_type == 'transaction' && transactionRef == $transactionRef][0]`,
      { transactionRef }
    );

    // Check if transaction exists
    if (!transaction) {
      return {
        success: false,
        error: `Transaction with transactionRef ${transactionRef} not found`,
      };
    }

    // Update the status field with the new status value
     await client
      .patch(transaction._id) // Use the _id of the fetched transaction
      .set({ status: newStatus })
      .commit();

    return {
      success: true,
    };
  } catch (error: unknown) {
    console.error("Error updating transaction status:", error);

    return {
      success: false,
      error:
        (error as Error).message || "An unexpected error occurred while updating transaction status.",
    };
  }
};

