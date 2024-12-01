"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import toast from "react-hot-toast";
import { handleGenericError } from "@/utils/errorHandler";

const subscriptionSchema = z.object({
  email: z.string().email("Invalid email address").min(1, "Email is required"),
});

type SubscriptionFormData = z.infer<typeof subscriptionSchema>;

const NewsletterComponent = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SubscriptionFormData>({
    resolver: zodResolver(subscriptionSchema),
  });

  const onSubmit = async (data: SubscriptionFormData) => {
    try {
      const response = await axios.post("/api/newsletter", data);
      console.log(response)
      toast.success(response.data.message);
    } catch (error) {
        const err = handleGenericError(error)
        toast.error(err);
    }
  };

  return (
    <section className="bg-gray-100 py-6">
      <div className="container mx-auto text-center">
        <h2 className="text-lg font-semibold mb-2">Subscribe to our Newsletter</h2>
        <p className="text-gray-600 mb-4">
          Stay updated with the latest news and offers. Subscribe to our monthly newsletter.
        </p>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex justify-center items-center space-x-2"
        >
          <input
            type="email"
            placeholder="Your email address"
            {...register("email")}
            className="border rounded-lg px-4 py-2 w-1/2"
          />
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600"
          >
            {isSubmitting ? "Submitting..." : "Subscribe"}
          </button>
        </form>
        {errors.email && (
          <p className="text-red-500 mt-2">{errors.email.message}</p>
        )}
        <div className="flex justify-center space-x-4 mt-4">
          <a href="#" className="text-green-500 hover:text-green-600">
            <i className="fab fa-facebook-f"></i>
          </a>
          <a href="#" className="text-green-500 hover:text-green-600">
            <i className="fab fa-twitter"></i>
          </a>
          <a href="#" className="text-green-500 hover:text-green-600">
            <i className="fab fa-pinterest"></i>
          </a>
          <a href="#" className="text-green-500 hover:text-green-600">
            <i className="fab fa-instagram"></i>
          </a>
        </div>
      </div>
    </section>
  );
};

export default NewsletterComponent;
