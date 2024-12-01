"use client";

import Image from "next/image";
import { ITransaction } from "@/constants/transaction";

interface OrderDetailsProps {
  orders: ITransaction[]; // Accept a single transaction object
}

const OrderDetails: React.FC<OrderDetailsProps> = ({ orders }) => {
  const {
    order,
    transactionRef,
    // status,
    method: paymentMethod,
    transactionDate,
    amount: total,
  } = orders[0];

  const {   serviceFee, products, customer, _id } = order;
console.log(orders[0])

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Order Details</h1>

      <header className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Order #{_id}</h2>
        <p className="text-gray-600">{new Date(transactionDate).toLocaleDateString()}</p>
      </header>

      {/* Customer and Order Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        {/* Billing Address */}
        <div className="bg-gray-100 p-4 rounded-md shadow-md">
          <h2 className="font-semibold mb-2">Billing Address</h2>
          <p>{customer.name}</p>
          <p>{customer.address}</p>
          <p>{customer.email}</p>
          <p>{customer.phone}</p>
        </div>

        {/* Shipping Address */}
        <div className="bg-gray-100 p-4 rounded-md shadow-md">
          <h2 className="font-semibold mb-2">Shipping Address</h2>
          {/* <p>{customer.name}</p>
          <p>{customer.address}</p>
          <p>{customer.email}</p>
          <p>{customer.phone}</p> */}
        </div>

        {/* Order Summary */}
        <div className="bg-gray-100 p-4 rounded-md shadow-md">
          <h2 className="font-semibold mb-2">Order Summary</h2>
          <p>Order ID: {transactionRef}</p>
          <p>Payment Method: {paymentMethod}</p>
          <p>Subtotal: ${total.toFixed(2)}</p>
          {/* <p>Discount: {discount}%</p> */}
          <p>
            Shipping:{" "}
            {serviceFee.fee}
            {/* {shippingCost === 0 ? "Free" : `$${shippingCost.toFixed(2)}`} */}
          </p>
          <p className="font-bold">
            Total: $
            {/* {(
              total -
              (total * discount) / 100 +
              shippingCost
            ).toFixed(2)} */}
          </p>
        </div>
      </div>

   

      {/* Products Table */}
      <table className="table-auto w-full border-collapse border border-gray-200">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-200 p-2">Product</th>
            <th className="border border-gray-200 p-2">Price</th>
            <th className="border border-gray-200 p-2">Quantity</th>
            <th className="border border-gray-200 p-2">Subtotal</th>
          </tr>
        </thead>
        <tbody>
          {products?.map((product) => (
            <tr key={product.product._id}>
              <td className="border border-gray-200 p-2 flex items-center">
                <Image
                  src={product?.product?.image[0]?.asset.url}
                  alt={product.product.name}
                  width={50}
                  height={50}
                  className="rounded"
                />
                <span className="ml-4">{product.product.name}</span>
              </td>
              <td className="border border-gray-200 p-2">
                ${product.product.price.toFixed(2)}
              </td>
              <td className="border border-gray-200 p-2">
                x{product.quantity}
              </td>
              <td className="border border-gray-200 p-2">
                ${(product.product.price * product.quantity).toFixed(2)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrderDetails;
