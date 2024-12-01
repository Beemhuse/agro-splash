import axios from "axios";

const generateTransactionRef = (length: number) => {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";

  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }

  return result;
};

export const initializePaystack = async (
  email: string,
  amount: string | number
) => {
  try {
    if (!amount) {
      throw new Error("Amount is required.");
    }

    if (isNaN(Number(amount)) || Number(amount) <= 0) {
      throw new Error("Amount must be a positive number.");
    }

    // Ensure amount is in kobo (smallest currency unit)
    const transactionRef = generateTransactionRef(7);

    // Log the environment variable for debugging (remove in production)
    if (!process.env.NEXT_PRIVATE_PAYSTACK_SECRET_KEY) {
      throw new Error("Paystack secret key is missing.");
    }

   

    // Axios request to Paystack
    const response = await axios.post(
      "https://api.paystack.co/transaction/initialize",
      {
        email,
        amount: Number(amount) * 100, // Convert to kobo
        reference: `Agro-${transactionRef}`,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PRIVATE_PAYSTACK_SECRET_KEY}`,
        },
      }
    );

    // Return the response data
    return response.data.data;
  } catch (error: unknown) {
    console.error("Paystack initialization error:", error);

    // Handle and throw Paystack-specific errors
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data?.message || "Paystack initialization failed"
      );
    }

    throw new Error((error as Error).message || "Unknown error occurred");
  }
};
