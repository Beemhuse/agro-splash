"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

const Page = () => {
  return (
    <section className="pb-8 bg-gray-100">
        {/* Billing Information */}
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
      <li>
        <Link href="/shopping-cart" className="hover:underline">
          Shopping Cart
        </Link>
      </li>
      <li className="text-gray-300">/</li>
      <li className="text-green-200">Checkout</li>
    </ul>
  </nav>
</div>

      <div className="container mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8 px-6 lg:px-12">

        <div className="lg:col-span-2 bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-6">
            Billing Information
          </h2>
          <form>
            {/* Name and Company */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-gray-600 mb-2">
                  First name
                </label>
                <input
                  type="text"
                  id="firstName"
                  placeholder="Your first name"
                  className="w-full border rounded-lg px-4 py-2"
                />
              </div>
              <div>
                <label htmlFor="lastName" className="block text-sm font-medium text-gray-600 mb-2">
                  Last name
                </label>
                <input
                  type="text"
                  id="lastName"
                  placeholder="Your last name"
                  className="w-full border rounded-lg px-4 py-2"
                />
              </div>
              <div className="md:col-span-2">
                <label htmlFor="companyName" className="block text-sm font-medium text-gray-600 mb-2">
                  Company Name (optional)
                </label>
                <input
                  type="text"
                  id="companyName"
                  placeholder="Company name"
                  className="w-full border rounded-lg px-4 py-2"
                />
              </div>
            </div>

            {/* Address and Location */}
            <div className="mt-6">
              <label htmlFor="address" className="block text-sm font-medium text-gray-600 mb-2">
                Street Address
              </label>
              <input
                type="text"
                id="address"
                placeholder="Street address"
                className="w-full border rounded-lg px-4 py-2"
              />
            </div>
            <div className="grid md:grid-cols-3 gap-6 mt-6">
              <div>
                <label htmlFor="country" className="block text-sm font-medium text-gray-600 mb-2">
                  Country / Region
                </label>
                <select
                  id="country"
                  className="w-full border rounded-lg px-4 py-2"
                >
                  <option>Select</option>
                  <option>United States</option>
                  <option>Canada</option>
                </select>
              </div>
              <div>
                <label htmlFor="state" className="block text-sm font-medium text-gray-600 mb-2">
                  State
                </label>
                <select
                  id="state"
                  className="w-full border rounded-lg px-4 py-2"
                >
                  <option>Select</option>
                  <option>California</option>
                  <option>Texas</option>
                </select>
              </div>
              <div>
                <label htmlFor="zip" className="block text-sm font-medium text-gray-600 mb-2">
                  Zip Code
                </label>
                <input
                  type="text"
                  id="zip"
                  placeholder="Zip code"
                  className="w-full border rounded-lg px-4 py-2"
                />
              </div>
            </div>

            {/* Contact Details */}
            <div className="grid md:grid-cols-2 gap-6 mt-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-600 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  placeholder="Email address"
                  className="w-full border rounded-lg px-4 py-2"
                />
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-600 mb-2">
                  Phone
                </label>
                <input
                  type="text"
                  id="phone"
                  placeholder="Phone number"
                  className="w-full border rounded-lg px-4 py-2"
                />
              </div>
            </div>

            {/* Shipping Checkbox */}
            <div className="flex items-center mt-6">
              <input
                type="checkbox"
                id="differentAddress"
                className="mr-2"
              />
              <label htmlFor="differentAddress" className="text-sm text-gray-600">
                Ship to a different address
              </label>
            </div>

            {/* Additional Info */}
            <div className="mt-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Additional Info
              </h3>
              <label htmlFor="orderNotes" className="block text-sm font-medium text-gray-600 mb-2">
                Order Notes (Optional)
              </label>
              <textarea
                id="orderNotes"
                placeholder="Notes about your order, e.g., special notes for delivery"
                className="w-full border rounded-lg px-4 py-2 h-24"
              ></textarea>
            </div>
          </form>
        </div>

        {/* Order Summary */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-6">
            Order Summary
          </h2>
          <ul className="space-y-4 mb-6">
            <li className="flex items-center justify-between">
              <div className="flex items-center">
                <Image
                  src="/images/green-capsicum.png"
                  alt="Green Capsicum"
                  width={50}
                  height={50}
                  className="rounded"
                />
                <span className="ml-4">Green Capsicum x5</span>
              </div>
              <span>$70.00</span>
            </li>
            <li className="flex items-center justify-between">
              <div className="flex items-center">
                <Image
                  src="/images/red-capsicum.png"
                  alt="Red Capsicum"
                  width={50}
                  height={50}
                  className="rounded"
                />
                <span className="ml-4">Red Capsicum x1</span>
              </div>
              <span>$14.00</span>
            </li>
          </ul>

          <div className="border-t pt-4">
            <div className="flex justify-between mb-2">
              <span className="text-gray-600">Subtotal:</span>
              <span>$84.00</span>
            </div>
            <div className="flex justify-between mb-4">
              <span className="text-gray-600">Shipping:</span>
              <span>Free</span>
            </div>
            <div className="flex justify-between font-semibold text-gray-800">
              <span>Total:</span>
              <span>$84.00</span>
            </div>
          </div>

          {/* Payment Method */}
          <div className="mt-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Payment Method
            </h3>
            <div className="space-y-3">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="paymentMethod"
                  className="mr-2"
                  defaultChecked
                />
                <span>Cash on Delivery</span>
              </label>
              <label className="flex items-center">
                <input type="radio" name="paymentMethod" className="mr-2" />
                <span>Paypal</span>
              </label>
              <label className="flex items-center">
                <input type="radio" name="paymentMethod" className="mr-2" />
                <span>Amazon Pay</span>
              </label>
            </div>
          </div>

          {/* Place Order Button */}
          <button className="w-full bg-green-500 text-white py-3 rounded-lg mt-6 hover:bg-green-600 transition">
            Place Order
          </button>
        </div>
      </div>
    </section>
  );
};

export default Page;
