"use client";
import { IoMdWarning } from "react-icons/io";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import useCartStore from "@/store/cartStore";
import toast from "react-hot-toast";
import { postRequest } from "@/service/postRequest";
import { getServiceFees } from "@/service/apiservice";
import { useAuthStore } from "@/store/authStore";

interface PaymentResponse {
  authorization_url: string;
}

interface ApiResponse {
  paymentResponse: PaymentResponse;
}
// Define Zod Schema for form validation
const billingSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  phoneNumber: z.string().min(10, "Phone number must be at least 10 digits"),
  streetAddress: z.string().min(1, "Street address is required"),
  apartment: z.string().optional(),
  townCity: z.string().min(1, "City is required"),
  deliveryAddress: z.string().optional(),
  orderNotes: z.string().optional(),
  serviceFee: z.string().min(1, "Service fee is required"), // Service fee is required
});

// Infer TypeScript type from Zod schema
type BillingFormData = z.infer<typeof billingSchema>;

const Page = () => {
  const cartItems = useCartStore((state) => state.cart);
  const clearCart = useCartStore((state) => state.clearCart);
  const [serviceFees, setServiceFees] = useState<
    { _id: string; location: string; fee: number }[]
  >([]);
  const [selectedServiceFee, setSelectedServiceFee] = useState<{
    location: string;
    fee: number;
  } | null>(null);
  const { token } = useAuthStore((state) => state);
  // Fetch service fees on component mount
  useEffect(() => {
    const fetchServiceFees = async () => {
      const fees = await getServiceFees();
      setServiceFees(fees);
    };
    fetchServiceFees();
  }, []);

  // Calculate the subtotal from cartItems
  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  // Calculate total based on selected service fee
  const total = subtotal + (selectedServiceFee?.fee || 0);
  // Set up react-hook-form with Zod validation
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<BillingFormData>({
    resolver: zodResolver(billingSchema),
  });

  const onSubmit = async (data: BillingFormData) => {
    try {
      const payload = {
        cartItems,
        amount: total,
        fullName: `${data.firstName} ${data.lastName}`,
        email: data.email,
        phoneNumber: data.phoneNumber,
        streetAddress: data.streetAddress,
        apartment: data.apartment,
        townCity: data.townCity,
        deliveryAddress: data.deliveryAddress,
        orderNotes: data.orderNotes,
        serviceFee: data?.serviceFee || 0, // Pass the selected service fee
      };

      const res = await postRequest<ApiResponse>("/api/order", payload);

      // Notify success
      toast.success("Order placed successfully!");
      clearCart()
      const paymentLink = res?.paymentResponse?.authorization_url;

      if (paymentLink) {
        window.location.href = paymentLink;
      }
    } catch (error: unknown) {
      toast.error(
        (error as Error).message || "An error occurred while placing the order."
      );
    }
  };

  const handleServiceFeeChange = (feeId: string) => {
    const selectedFee = serviceFees.find((fee) => fee._id === feeId);
    setSelectedServiceFee(selectedFee || null);
  };
  if (!token) {
    return (
      <div className="text-center p-10 max-w-xl m-auto flex justify-center border flex-col gap-8">
        <p className="flex flex-col items-center gap-3">
          <IoMdWarning color="red" size={30} /> Please log in to proceed with checkout.{" "}
        </p>
        <Link href="/auth/login" className="bg-green-500 text-white py-2">Login</Link>
      </div>
    );
  }
  return (
    <section className="pb-8 bg-gray-100">
      {/* Billing Information */}
      <div
        className="h-24 bg-cover bg-green-500 mb-4 bg-center flex items-center px-6"
        // style={{
        //   backgroundImage: `url('/images/organic.jpeg')`,
        // }}
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
            <li className="text-black">Checkout</li>
          </ul>
        </nav>
      </div>

      <div className="container mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8 px-6 lg:px-12">
        <div className="lg:col-span-2 bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-6">
            Billing Information
          </h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid md:grid-cols-2 gap-6">
              {/* First Name */}
              <div>
                <label
                  htmlFor="firstName"
                  className="block text-sm font-medium text-gray-600 mb-2"
                >
                  First name
                </label>
                <input
                  type="text"
                  id="firstName"
                  className="w-full border rounded-lg px-4 py-2"
                  {...register("firstName")}
                />
                {errors.firstName && (
                  <p className="text-red-500 text-sm">
                    {errors.firstName.message}
                  </p>
                )}
              </div>

              {/* Last Name */}
              <div>
                <label
                  htmlFor="lastName"
                  className="block text-sm font-medium text-gray-600 mb-2"
                >
                  Last name
                </label>
                <input
                  type="text"
                  id="lastName"
                  className="w-full border rounded-lg px-4 py-2"
                  {...register("lastName")}
                />
                {errors.lastName && (
                  <p className="text-red-500 text-sm">
                    {errors.lastName.message}
                  </p>
                )}
              </div>
            </div>

            {/* Email */}
            <div className="mt-6">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-600 mb-2"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                className="w-full border rounded-lg px-4 py-2"
                {...register("email")}
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email.message}</p>
              )}
            </div>

            {/* Phone */}
            <div className="mt-6">
              <label
                htmlFor="phoneNumber"
                className="block text-sm font-medium text-gray-600 mb-2"
              >
                Phone
              </label>
              <input
                type="text"
                id="phoneNumber"
                className="w-full border rounded-lg px-4 py-2"
                {...register("phoneNumber")}
              />
              {errors.phoneNumber && (
                <p className="text-red-500 text-sm">
                  {errors.phoneNumber.message}
                </p>
              )}
            </div>

            {/* Street Address */}
            <div className="mt-6">
              <label
                htmlFor="streetAddress"
                className="block text-sm font-medium text-gray-600 mb-2"
              >
                Street Address
              </label>
              <input
                type="text"
                id="streetAddress"
                className="w-full border rounded-lg px-4 py-2"
                {...register("streetAddress")}
              />
              {errors.streetAddress && (
                <p className="text-red-500 text-sm">
                  {errors.streetAddress.message}
                </p>
              )}
            </div>

            {/* Apartment */}
            <div className="mt-6">
              <label
                htmlFor="apartment"
                className="block text-sm font-medium text-gray-600 mb-2"
              >
                Apartment (Optional)
              </label>
              <input
                type="text"
                id="apartment"
                className="w-full border rounded-lg px-4 py-2"
                {...register("apartment")}
              />
            </div>

            {/* Town / City */}
            <div className="mt-6">
              <label
                htmlFor="townCity"
                className="block text-sm font-medium text-gray-600 mb-2"
              >
                Town / City
              </label>
              <input
                type="text"
                id="townCity"
                className="w-full border rounded-lg px-4 py-2"
                {...register("townCity")}
              />
              {errors.townCity && (
                <p className="text-red-500 text-sm">
                  {errors.townCity.message}
                </p>
              )}
            </div>
            <div className="mt-6">
              <label
                htmlFor="serviceFee"
                className="block text-sm font-medium text-gray-600 mb-2"
              >
                Select Service Fee
              </label>
              <select
                id="serviceFee"
                className="w-full border rounded-lg px-4 py-2"
                {...register("serviceFee")}
                onChange={(e) => handleServiceFeeChange(e.target.value)}
              >
                <option value="">Select a service fee</option>
                {serviceFees.map((fee) => (
                  <option key={fee._id} value={fee._id}>
                    {fee.location} - ${fee.fee.toFixed(2)}
                  </option>
                ))}
              </select>
              {errors.serviceFee && (
                <p className="text-red-500 text-sm">
                  {errors.serviceFee.message}
                </p>
              )}
            </div>
            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-green-500 text-white py-3 rounded-lg mt-6 hover:bg-green-600 transition"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Placing Order..." : "Place Order"}
            </button>
          </form>
        </div>

        {/* Order Summary */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-6">
            Order Summary
          </h2>
          <ul className="space-y-4 mb-6">
            {cartItems.length > 0 ? (
              cartItems.map((item, index) => (
                <li key={index} className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Image
                      src={item.image.asset.url}
                      alt={item.name}
                      width={50}
                      height={50}
                      className="rounded"
                    />
                    <span className="ml-4">
                      {item.name} x{item.quantity}
                    </span>
                  </div>
                  <span>${(item.price * item.quantity).toFixed(2)}</span>
                </li>
              ))
            ) : (
              <li className="text-gray-600 text-center">Your cart is empty.</li>
            )}
            <li className="flex items-center justify-between">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </li>
            {selectedServiceFee && (
              <li className="flex items-center justify-between">
                <span>Service Fee ({selectedServiceFee.location})</span>
                <span>${selectedServiceFee.fee.toFixed(2)}</span>
              </li>
            )}
            <li className="flex items-center justify-between font-bold">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Page;
