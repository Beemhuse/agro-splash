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
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
};
