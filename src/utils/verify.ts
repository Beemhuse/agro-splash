import axios from "axios";
import { updateTransactionStatus } from ".";

export const verifyPaystackPayment = async (trxref: string) => {
  try {
    const paystackApiUrl = `https://api.paystack.co/transaction/verify/${trxref}`;
    const response = await axios.get(paystackApiUrl, {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PRIVATE_PAYSTACK_SECRET_KEY}`,
      },
    });

    const responseData = response.data;
    // console.log('Paystack Verification Response:', trxref, response.data);

    // Handle specific error cases
    if (!responseData.status || !responseData.data) {
      console.error('Invalid response from Paystack:', responseData);
      return false;
    }

    if (responseData.data.status === 'success') {
      await updateTransactionStatus(trxref, "success");
      return true; // Payment is successfully verified
    } else if (responseData.data.status === 'failed') {
      await updateTransactionStatus(trxref, "success");

      console.error('Payment verification failed:', responseData.data.gateway_response);
      return false;
    } else {
      console.error('Unexpected status from Paystack:', responseData.data.status);
      return false;
    }
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        // The request was made, but the server responded with an error status
        console.error('Paystack server error:', error.response.data);
      } else if (error.request) {
        // The request was made but no response was received
        console.error('No response received from Paystack');
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error('Error setting up the request:', error.message);
      }
    } else if (error instanceof Error) {
      // For general JavaScript errors
      console.error('General error:', error.message);
    } else {
      // Unknown error type
      console.error('An unknown error occurred:', error);
    }
  
    return false; // Payment verification failed
  }
  
};
