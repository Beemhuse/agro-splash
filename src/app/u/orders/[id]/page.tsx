import { client } from "@/sanity/client";
import {  buildOrdersQueryByTransactionRef } from "@/sanity/queries";
import OrderDetails from "@/components/pages/userDashboard/OrderDetails";
import { ITransaction } from "@/constants/transaction";


interface PageProps {
  params: { id: string }; // Accept params with customerId
}

export default async function Page({ params }: PageProps) {
  const { id } = params;

  if (!id || typeof id !== "string") {
    console.error("Invalid customer ID in params:", params);
    return <div>Missing or invalid customer information. Please log in again.</div>;
  }

  try {
    console.log("Customer ID:", id);
    const query = buildOrdersQueryByTransactionRef(id);

    // Fetch orders for the user
    const orders: ITransaction[] = await client.fetch(query);

    console.log("Fetched Orders:", orders);

    if (!orders ) {
      return <div>No orders found for this user.</div>;
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
