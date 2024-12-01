"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getOrderHistory } from "@/service/apiservice";
import { Cookies } from "react-cookie";
import { IOrder } from "@/constants/interfaces";

export default function OrderHistory() {
  const [orders, setOrders] = useState<IOrder[]>([]); // Replace `any[]` with a proper interface for order data.
  const [loading, setLoading] = useState<boolean>(true);
const cookies = new Cookies()
const user = cookies.get("agro-user")
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await getOrderHistory(user.id);
        setOrders(data || []);
      } catch (error) {
        console.error("Error fetching order history:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [user.id]);
console.log(orders)
  if (loading) {
    return <div>Loading...</div>;
  }

  if (orders.length === 0) {
    return <div>No orders found.</div>;
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Order History</h1>
      <table className="table-auto w-full border-collapse border border-gray-200">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-200 p-2">Order ID</th>
            <th className="border border-gray-200 p-2">Date</th>
            <th className="border border-gray-200 p-2">Total</th>
            <th className="border border-gray-200 p-2">Quantity</th>
            <th className="border border-gray-200 p-2">Status</th>
            <th className="border border-gray-200 p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order._id}>
              <td className="border border-gray-200 p-2">#{order._id}</td>
              <td className="border border-gray-200 p-2">{new Date(order._createdAt).toLocaleDateString()}</td>
              <td className="border border-gray-200 p-2">
                ${order.total.toFixed(2)}
              </td>
              <td className="border border-gray-200 p-2">
              {order.products.length} 
              </td>
              <td className="border border-gray-200 p-2">{order.status}</td>
              <td className="border border-gray-200 p-2">
                <Link
                  href={`/u/orders/${order.transactionRef}`}
                  className="text-green-600 underline"
                >
                  View Details
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
