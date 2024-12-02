"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-hot-toast";
import { postRequest } from "@/service/postRequest"; // Function to handle API requests
import CallIcon from "@/components/icons/CallIcon";
import EmailIcon from "@/components/icons/EmailIcon";
import Location from "@/components/icons/Location";
import Link from "next/link";
import { FaHome } from "react-icons/fa";
import DotLoader from "@/components/layout/DotLoader";

// Define Zod Schema for validation
const contactSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  message: z.string().min(1, "Message is required"),
  subject: z.string().min(1, "Subject is required"),
});

type ContactFormValues = z.infer<typeof contactSchema>;

const ContactUs = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const onSubmit = async (data: ContactFormValues) => {
    try {
      await postRequest("/api/contact", data); // API to send data to Sanity
      toast.success("Message sent successfully!");
      setIsSubmitted(true);
    } catch (error) {
      toast.error("Failed to send the message. Please try again.");
      console.error("Error submitting form:", error);
    }
  };

  return (
    <section>
     <div
        className="h-20 bg-cover bg-center flex items-center px-6"
        style={{
          backgroundImage: `url('/images/organic.jpeg')`,
        }}
      >
        {/* Breadcrumbs */}
        <nav className="text-sm text-white">
          <ul className="flex items-center space-x-2">
           
            <li>
              <Link href="/" className="hover:underline">
              <FaHome />

              </Link>
            </li>
            <li className="text-gray-300">/</li>
            <li className="text-green-200">Contact</li>
          </ul>
        </nav>
      </div>
    <div className="flex flex-col items-center justify-center w-full ">
      <div className="container mx-auto flex  gap-6 p-6">
        {/* Contact Details */}
        <div className="bg-white w-[312px] rounded-lg shadow-lg p-6">
          <h3 className="text-lg font-semibold mb-4">Contact Information</h3>
          <div className="flex flex-col gap-2 items-center mb-4 border-b-2">
          <Location />
            <p>2715 Ash Dr. San Jose, South Dakota 83475</p>
          </div>
          <div className="flex flex-col gap-2 items-center mb-4 border-b-2 py-2">
          <EmailIcon />
            <p>
              Proxy@gmail.com <br /> Help.proxy@gmail.com
            </p>
          </div>
          <div className="flex flex-col gap-2 items-center">
          <CallIcon />
            <p>
              (219) 555-0114 <br /> (164) 333-0487
            </p>
          </div>
        </div>

        {/* Contact Form */}
        <div className="bg-white w-full rounded-lg shadow-lg p-6">
          <h3 className="text-lg font-semibold mb-4">Just Say Hello!</h3>
          <p className="mb-6 text-gray-600">
            Do you fancy saying hi or want to get started with your project? Feel free to contact me.
          </p>
          {isSubmitted ? (
            <div className="text-center text-green-500 font-semibold">
              Thank you for contacting us! We’ll get back to you soon.
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <input
                  type="text"
                  placeholder="Your Name"
                  className="border rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-green-500"
                  {...register("name")}
                />
                {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
                <input
                  type="email"
                  placeholder="Your Email"
                  className="border rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-green-500"
                  {...register("email")}
                />
                {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
              </div>
              <input
                type="text"
                placeholder="Subject"
                className="border rounded-lg px-4 py-2 w-full mb-4 focus:outline-none focus:ring-2 focus:ring-green-500"
                {...register("subject")}
              />
              {errors.subject && <p className="text-red-500 text-sm">{errors.subject.message}</p>}
              <textarea
                rows={4}
                placeholder="Your Message"
                className="border rounded-lg px-4 py-2 w-full mb-4 focus:outline-none focus:ring-2 focus:ring-green-500"
                {...register("message")}
              ></textarea>
              {errors.message && <p className="text-red-500 text-sm">{errors.message.message}</p>}
              <button
                type="submit"
                className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition"
                disabled={isSubmitting}
              >
                {isSubmitting ? <DotLoader /> : "Send Message"}
              </button>
            </form>
          )}
        </div>
      </div>

      {/* Map Section */}
      <div className="w-full h-80">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d24156.431309635015!2d-121.91522072169386!3d37.35410827758966!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x808fcca4e2262993%3A0x5f5c7684ffab570b!2sSan%20Jose%2C%20CA!5e0!3m2!1sen!2sus!4v1679084531639!5m2!1sen!2sus"
          width="100%"
          height="100%"
          className="border-0 rounded-lg"
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </div>
    </section>
  );
};

export default ContactUs;
