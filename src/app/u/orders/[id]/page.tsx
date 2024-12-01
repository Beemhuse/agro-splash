import { client } from "@/sanity/client";
import { buildOrdersQueryByTransactionRef } from "@/sanity/queries";
import OrderDetails from "@/components/pages/userDashboard/OrderDetails";
import { ITransaction } from "@/constants/transaction";
import { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const resolvedParams = await params;
  console.log(resolvedParams.id)
  // Fetch order details to populate metadata dynamically
  try {
    const query = buildOrdersQueryByTransactionRef(resolvedParams.id);
    const orders: ITransaction[] = await client.fetch(query);

    if (orders && orders.length > 0) {
      const order = orders[0]; // Use the first order as an example
      return {
        title: `Order Details - ${order.transactionRef}`,
        description: `Details for your order with transaction reference: ${order.transactionRef}.`,
        openGraph: {
          title: `Order Details - ${order.transactionRef}`,
          description: `View the status and details of your recent order.`,
          url: `/orders/${resolvedParams.id}`,
        },
      };
    }
  } catch (error) {
    console.error("Error fetching metadata:", error);
  }

  // Fallback metadata if fetching fails
  return {
    title: "Order Details",
    description: "View the details of your order.",
  };
}

const Page = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => { 
  const resolvedParams = await params; // Await `params`
  if (!resolvedParams.id || typeof resolvedParams.id !== "string") {
    console.error("Invalid transactionRef in params:", params);
    return <div>Missing or invalid transaction information. Please try again.</div>;
  }

  try {
    console.log("Transaction Ref:", resolvedParams.id);
    const query = buildOrdersQueryByTransactionRef(resolvedParams.id);

    // Fetch orders for the user
    const orders: ITransaction[] = await client.fetch(query);

    console.log("Fetched Orders:", orders);

    if (!orders || orders.length === 0) {
      return <div>No orders found for this transaction reference.</div>;
    }

    return (
      <div className="container mx-auto p-6">
        <OrderDetails orders={orders} />
      </div>
    );
  } catch (error) {
    console.error("Error fetching orders:", error);
    return <div>Failed to load orders. Please try again later.</div>;
  }
}
export default Page