import { updateTransactionStatus } from "@/utils";
import { verifyPaystackPayment } from "@/utils/verify";
import { NextRequest } from "next/server";

export const dynamic = "force-dynamic";


export const GET = async (req: NextRequest) => {
  try {
    const { searchParams } = new URL(req.url);
    const trxref = searchParams.get('trxref');

    const isPaymentVerified = await verifyPaystackPayment(trxref as string);
    const newStatus = isPaymentVerified ? 'success' : 'failure';

    await updateTransactionStatus(trxref as string, newStatus);

    if (!isPaymentVerified) {
      return new Response(JSON.stringify({ error: 'Payment verification failed' }), { status: 400 });
    }

    return new Response(JSON.stringify({ success: true, message: "Payment verified" }), { status: 200 });
  }catch (error: unknown) {
    let errorMessage = "An unexpected error occurred";
  
    if (error instanceof Error) {
      // Narrow the type to Error
      errorMessage = error.message;
    }
  
    console.error("Error processing Payment", errorMessage);
  
    return new Response(
      JSON.stringify({
        error: errorMessage,
      }),
      { status: 500 }
    );
  }
};
