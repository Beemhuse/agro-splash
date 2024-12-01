"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { BsBagCheckFill } from "react-icons/bs";
import { FaEnvelope,  FaHome } from "react-icons/fa";
import axios from "axios";
import confetti from "canvas-confetti";
import toast from "react-hot-toast";
import useCartStore from "@/store/cartStore";
import { FaCartShopping } from "react-icons/fa6";

const runFireworks = () => {
  const duration = 5 * 1000; // 5 seconds
  const end = Date.now() + duration;

  const colors = ["#bb0000", "#ffffff"];

  (function frame() {
    confetti({
      particleCount: 2,
      angle: 60,
      spread: 55,
      origin: { x: 0 },
      colors: colors,
    });
    confetti({
      particleCount: 2,
      angle: 120,
      spread: 55,
      origin: { x: 1 },
      colors: colors,
    });

    if (Date.now() < end) {
      requestAnimationFrame(frame);
    }
  })();
};

const Success = () => {
  const [loading, setLoading] = useState(true);
  const [paymentStatus, setPaymentStatus] = useState<unknown>(null);
  const [trxref, setTrxRef] = useState<string | null>(null);
const clearCart = useCartStore(state => state.clearCart)
  useEffect(() => {
    // Access `window` safely inside `useEffect`
    const params = new URLSearchParams(window.location.search);
    const reference = params.get("trxref"); // Extract the transaction reference
    setTrxRef(reference);
  }, []);

  

  useEffect(() => {
    if (trxref) {
      const fetchVerificationResult = async () => {
        try {
          const response = await axios.get(`/api/verify?trxref=${trxref}`);
          setPaymentStatus(response.status);
          toast.success(response.data.message)
          clearCart()
        } catch (error) {
          console.error("Error verifying payment:", error);
        } finally {
          setLoading(false);
        }
      };

      fetchVerificationResult();
    } else {
      setLoading(false);
    }
  }, [clearCart, trxref]);

  useEffect(() => {
    if (paymentStatus === 200) {
      runFireworks();
    }
  }, [paymentStatus]);


  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="flex flex-col items-center">
          <svg
            className="w-12 h-12 animate-spin text-green-500"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V4a10 10 0 00-10 10h2z"
            ></path>
          </svg>
          <p className="mt-4 text-lg text-gray-700">Verifying your payment...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-green-400 to-blue-500 flex items-center justify-center px-4 py-12">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center max-w-md w-full">
        <div className="flex justify-center mb-6">
          <div className="bg-green-100 text-green-600 rounded-full p-4">
            <BsBagCheckFill className="text-4xl" />
          </div>
        </div>
        <h2 className="text-3xl font-bold text-gray-800 mb-4">
          Thank you for your order!
        </h2>
        <p className="text-gray-600 mb-4 flex items-center justify-center">
          <FaEnvelope className="mr-2" /> Check your email inbox for the receipt.
        </p>
        {/* <p className="text-gray-600 mb-6 flex items-center justify-center">
          <FaWhatsapp className="mr-2" /> Track your order on WhatsApp
        </p> */}
        <div className="flex flex-col gap-4">
          <Link href="https://agro-splash.vercel.app/u/orders">
            <button
              type="button"
              className="w-full bg-green-600 text-white py-3 rounded-md hover:bg-green-700 transition-colors duration-300 flex items-center justify-center"
            >
              <FaCartShopping className="mr-2" /> Track your Order Here
            </button>
          </Link>
          <Link href="/">
            <button
              type="button"
              className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition-colors duration-300 flex items-center justify-center"
            >
              <FaHome className="mr-2" /> Back to Homepage
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Success;
