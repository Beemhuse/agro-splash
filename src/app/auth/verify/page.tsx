"use client";

import React, { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import toast from "react-hot-toast";
import { postRequest } from "@/service/postRequest";
import DotLoader from "@/components/layout/DotLoader";
import { OtpInput } from "reactjs-otp-input";
import { useAuthStore } from "@/store/authStore";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface VerifyOtpFormData {
  otp: string;
  email: string;
}

interface ResponseData {
  message: string;
}

const Page = () => {
  const methods = useForm<VerifyOtpFormData>();
  const [otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const email = useAuthStore((state) => state.email); // Retrieve email from auth store
  console.log(email)
  const { push } = useRouter();
  const handleChange = (value: string) => {
    setOtp(value);
  };

  const onSubmit = async (data: VerifyOtpFormData) => {
    console.log(data);
    if (otp.length !== 6) {
      toast.error("Please enter a valid 6-digit OTP.");
      return;
    }

    setIsLoading(true);
    try {
      const response = await postRequest<ResponseData>("/api/verify-otp", {
        otp,
        email,
      });
      toast.success(response.message);
      setIsLoading(false);
      push("login");
    } catch (err: unknown) {
      console.error(err);
      toast.error(err as string);
      setIsLoading(false);
    }
  };

  return (
    <section className="">
      <div
        className="h-36 bg-cover mb-4 bg-center flex items-center px-6"
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

            <li className="text-green-200">Verify</li>
          </ul>
        </nav>
      </div>
      <div className="flex items-center justify-center my-10 ">
        <div className="bg-white p-8 rounded border shadow-md w-full max-w-md">
          <h2 className="text-2xl font-bold text-center mb-6">
            Verify Your Email
          </h2>
          <p className="text-sm text-gray-600 mb-6 text-center">
            Enter the 6-digit OTP sent to your email address.
          </p>
          <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)}>
              {/* OTP Input */}
              <div className="mb-4">
                <OtpInput
                  value={otp}
                  onChange={handleChange}
                  containerStyle="flex mt-4 justify-center space-x-4"
                  isInputNum
                  focusStyle="border-green-500 outline-none"
                  shouldAutoFocus
                  isInputSecure
                  inputStyle={{
                    width: "40px",
                    borderRadius: "10px",
                    height: "40px",
                    border: "1px solid gray",
                  }}
                  numInputs={6}
                  // separator={<span>-</span>}
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition duration-200"
              >
                {isLoading ? <DotLoader /> : "Verify OTP"}
              </button>
            </form>
          </FormProvider>

          {/* Resend OTP Link */}
          <p className="mt-4 text-center text-sm text-gray-600">
            Didn&apos;t receive the OTP?{" "}
            <a
              href="#"
              // onClick={() => toast.info("Feature not implemented yet.")}
              className="text-green-600 font-medium hover:underline"
            >
              Resend OTP
            </a>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Page;
