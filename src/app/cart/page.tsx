"use client";
import React from "react";
import Image from "next/image";
import { FiTrash2 } from "react-icons/fi";
import useCartStore from "@/store/cartStore"; // Assuming you have a cart store
import { CartItem } from "../constants/interfaces";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Page = () => {
  const cartItems = useCartStore((state) => state.cart);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const removeItem = useCartStore((state) => state.removeFromCart);
  const { push } = useRouter();
  const calculateSubtotal = () =>
    cartItems.reduce(
      (total: number, item: { price: number; quantity: number }) =>
        total + item.price * item.quantity,
      0
    );
  return (
    <section className="pb-12 bg-gray-50">
      <div
        className="h-20 bg-cover mb-4 bg-center flex items-center px-6"
        style={{
          backgroundImage: `url('/images/organic.jpeg')`, // Replace with your actual image path
        }}
      >
        {/* Breadcrumbs */}
        <nav className="text-sm text-white">
          <ul className="flex items-center space-x-2">
            <li>
              <Link href="/" className="hover:underline">
                Home
              </Link>
            </li>
            <li className="text-gray-300">/</li>
            <li className="text-green-200">Cart</li>
          </ul>
        </nav>
      </div>
      <div className="container mx-auto px-6">
        <h1 className="text-2xl font-semibold mb-6">My Shopping Cart</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Cart Table */}
          <div className="lg:col-span-2 bg-white shadow-md rounded-lg p-6">
            <table className="w-full">
              <thead>
                <tr className="text-left border-b">
                  <th className="py-2">PRODUCT</th>
                  <th className="py-2">PRICE</th>
                  <th className="py-2">QUANTITY</th>
                  <th className="py-2">SUBTOTAL</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item: CartItem) => (
                  <tr key={item._id} className="border-b">
                    <td className="py-4 flex items-center gap-4">
                      <Image
                        src={item.image.asset.url}
                        alt={item.name}
                        width={80}
                        height={80}
                        className="rounded"
                      />
                      <span className="text-gray-700">{item.name}</span>
                    </td>
                    <td className="py-4">${item.price.toFixed(2)}</td>
                    <td className="py-4">
                      <div className="flex items-center">
                        <button
                          onClick={() =>
                            updateQuantity(
                              item._id,
                              Math.max(1, item.quantity - 1)
                            )
                          }
                          className="px-2 py-1 border rounded-l bg-gray-100"
                        >
                          -
                        </button>
                        <span className="px-4 py-1 border-t border-b bg-white">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(item._id, item.quantity + 1)
                          }
                          className="px-2 py-1 border rounded-r bg-gray-100"
                        >
                          +
                        </button>
                      </div>
                    </td>
                    <td className="py-4">
                      ${(item.price * item.quantity).toFixed(2)}
                    </td>
                    <td className="py-4">
                      <button
                        onClick={() => removeItem(item._id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <FiTrash2 size={20} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="mt-6 flex justify-between">
              <button className="bg-gray-100 px-6 py-2 rounded-lg text-gray-700">
                Return to shop
              </button>
              {/* <button className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600">
                Update Cart
              </button> */}
            </div>
          </div>

          {/* Cart Summary */}
          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-lg font-semibold mb-4">Cart Total</h2>
            <div className="flex justify-between mb-2">
              <span>Subtotal:</span>
              <span>${calculateSubtotal().toFixed(2)}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span>Shipping:</span>
              <span>Free</span>
            </div>
            <div className="flex justify-between font-bold text-lg mb-6">
              <span>Total:</span>
              <span>${calculateSubtotal().toFixed(2)}</span>
            </div>
            <button
              onClick={() => push("/checkout")}
              className="w-full bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600"
            >
              Proceed to checkout
            </button>
          </div>
        </div>

        {/* Coupon Code */}
        <div className="mt-8 bg-white shadow-md rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4">Coupon Code</h3>
          <div className="flex items-center gap-4">
            <input
              type="text"
              placeholder="Enter code"
              className="flex-1 border px-4 py-2 rounded-lg"
            />
            <button className="bg-gray-800 text-white px-6 py-2 rounded-lg hover:bg-gray-900">
              Apply Coupon
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Page;
