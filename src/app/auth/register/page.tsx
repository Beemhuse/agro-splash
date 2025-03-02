"use client";
import React, { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import InputComponent from "@/components/ui/input";
import { RegisterFormData, registerSchema } from "@/schema";
import Link from "next/link";
import { postRequest } from "@/service/postRequest";
import toast from "react-hot-toast";
import DotLoader from "@/components/layout/DotLoader";
import { useAuthStore } from "@/store/authStore";
import { useRouter } from "next/navigation";

interface ResponseData {
  message: string;
  token: string;
}
const Page = () => {
  const methods = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });
  const setEmail = useAuthStore((state) => state.setEmail); // Use store to set email
  const {push} = useRouter(); // For navigation

  const [isLoading, setIsLoading] = useState(false);
  const onSubmit = async (data: RegisterFormData) => {
    setIsLoading(true);
    try {
      const response = await postRequest<ResponseData>("/api/register", {
        email: data.email,
        password: data.password,
      });
      setEmail(data.email)
      toast.success(response.message);
      setIsLoading(false);
      push("/auth/verify")
    } catch (err: unknown) {
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

            <li className="text-green-200">Register</li>
          </ul>
        </nav>
      </div>

      <div className="flex items-center justify-center my-10">
        <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
          <h2 className="text-2xl font-bold text-center mb-6">
            Create Account
          </h2>
          <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)}>
              {/* Email Field */}
              <div className="mb-4">
                <InputComponent
                  type="email"
                  name="email"
                  label="Email"
                  placeholder="Enter your email"
                />
              </div>

              {/* Password Field */}
              <div className="mb-4">
                <InputComponent
                  type="password"
                  name="password"
                  label="Password"
                  placeholder="Enter your password"
                  password
                />
              </div>

              {/* Confirm Password Field */}
              <div className="mb-4">
                <InputComponent
                  type="password"
                  name="confirmPassword"
                  label="Confirm Password"
                  placeholder="Re-enter your password"
                  password
                />
              </div>

              {/* Terms and Conditions */}
              <div className="mb-4">
                <label className="inline-flex items-center">
                  <input
                    type="checkbox"
                    {...methods.register("terms")}
                    className="form-checkbox h-4 w-4 text-green-600"
                  />
                  <span className="ml-2 text-sm text-gray-600">
                    Accept all terms & Conditions
                  </span>
                </label>
                {methods.formState.errors.terms && (
                  <p className="text-red-600 text-sm mt-1">
                    {methods.formState.errors.terms.message as string}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition duration-200"
              >
                {isLoading ? <DotLoader /> : "Create Account"}
              </button>
            </form>
          </FormProvider>

          {/* Login Link */}
          <p className="mt-4 text-center text-sm text-gray-600">
            Already have an account?{" "}
            <a
              href="/login"
              className="text-green-600 font-medium hover:underline"
            >
              Login
            </a>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Page;
