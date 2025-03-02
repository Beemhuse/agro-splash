"use client";
import React, { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import InputComponent from "@/components/ui/input";
import { LoginFormData, loginSchema } from "@/schema";
import Link from "next/link";
import { postRequest } from "@/service/postRequest";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import DotLoader from "@/components/layout/DotLoader";
import { useAuthStore } from "@/store/authStore";
interface ResponseData {
  message: string;
  token: string;
  user: object
}

const Page = () => {
  const methods = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });
  const [isLoading, setIsLoading] = useState(false);
  const { push } = useRouter(); // For navigation
  const setToken = useAuthStore((state) => state.setToken); // Use store to set email
  const setUser = useAuthStore((state) => state.setUser); // Use store to set email

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    try {
      const response = await postRequest<ResponseData>("/api/login", {
        email: data.email,
        password: data.password,
      });
      toast.success(response.message);
      setIsLoading(false);
      setToken(response.token);
      setUser(response.user);
      push("/");
    } catch (err: unknown) {
      toast.error(err as string);
      setIsLoading(false);
    }
  };

  return (
    <section className="">
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

            <li className="text-green-200">Sign in</li>
          </ul>
        </nav>
      </div>

      <div className="flex items-center justify-center my-10">
        <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
          <h2 className="text-2xl font-bold text-center mb-6">Sign in</h2>
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

              <button
                type="submit"
                className="w-full py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition duration-200"
              >
                {isLoading ? <DotLoader /> : "Sign in"}
              </button>
            </form>
          </FormProvider>

          {/* Login Link */}
          <p className="mt-4 text-center text-sm text-gray-600">
            Dont have an account?{" "}
            <Link
              href="/auth/register"
              className="text-green-600 font-medium hover:underline"
            >
              {"Create an account"}
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Page;
