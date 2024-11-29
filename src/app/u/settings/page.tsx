"use client";

import React, { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import InputComponent from "@/components/ui/input";
import {
  AccountSettingsData,
  accountSettingsSchema,
  billingAddressSchema,
  BillingAddressData,
  changePasswordSchema,
  ChangePasswordData,
} from "@/schema";
import Image from "next/image";

const Page = () => {
    const [previewImage, setPreviewImage] = useState<string | null>(null);
    const [selectedImage, setSelectedImage] = useState<File | null>(null);
    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
          const file = e.target.files[0];
          setSelectedImage(file);
          setPreviewImage(URL.createObjectURL(file)); // Preview the image
        }
      };
    
    const accountMethods = useForm<AccountSettingsData>({
        resolver: zodResolver(accountSettingsSchema),
      });

  const billingMethods = useForm<BillingAddressData>({
    resolver: zodResolver(billingAddressSchema),
  });

  const passwordMethods = useForm<ChangePasswordData>({
    resolver: zodResolver(changePasswordSchema),
  });

  const handleAccountSubmit = (data: AccountSettingsData) => {
    console.log("Account Settings", data);
    console.log("Form Data", data);

    if (selectedImage) {
      console.log("Selected Image", selectedImage);

      // Example: Upload the image to a server
      const formData = new FormData();
      formData.append("image", selectedImage);
      formData.append("firstName", data.firstName);
      formData.append("lastName", data.lastName);
      formData.append("email", data.email);
      formData.append("phoneNumber", data.phoneNumber);

      // Replace with your API endpoint
      fetch("/api/account-settings", {
        method: "POST",
        body: formData,
      })
        .then((response) => response.json())
        .then((result) => {
          console.log("Success:", result);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  };

  const handleBillingSubmit = (data: BillingAddressData) => {
    console.log("Billing Address", data);
  };

  const handlePasswordSubmit = (data: ChangePasswordData) => {
    console.log("Change Password", data);
  };

  return (
    <div className="space-y-8">
      {/* Account Settings */}
      <div className="p-6 bg-white rounded shadow">
        <h2 className="text-lg font-semibold mb-4">Account Settings</h2>
        <FormProvider {...accountMethods}>
        <form onSubmit={accountMethods.handleSubmit(handleAccountSubmit)}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InputComponent name="firstName" type="text" label="First name" />
            <InputComponent name="lastName" type="text" label="Last name" />
            <InputComponent name="email" type="email" label="Email" />
            <InputComponent name="phoneNumber" type="text" label="Phone Number" />

            {/* Image Upload Section */}
            <div className="flex flex-col items-center justify-center">
              <div className="mb-4">
                <Image
                height={500}
                width={500}
                  src={previewImage || "/default-avatar.png"} // Default avatar or uploaded image
                  alt="Profile Preview"
                  className="w-24 h-24 rounded-full object-cover border border-gray-300"
                />
              </div>
              <label
                htmlFor="image"
                className="cursor-pointer bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
              >
                Choose Image
              </label>
              <input
                id="image"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </div>
          </div>

          <button
            type="submit"
            className="mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            Save Changes
          </button>
        </form>
      </FormProvider>
      </div>

      {/* Billing Address */}
      <div className="p-6 bg-white rounded shadow">
        <h2 className="text-lg font-semibold mb-4">Billing Address</h2>
        <FormProvider {...billingMethods}>
          <form onSubmit={billingMethods.handleSubmit(handleBillingSubmit)}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InputComponent name="firstName" label="First name" />
              <InputComponent name="lastName" label="Last name" />
              <InputComponent
                name="companyName"
                label="Company Name"
                // isOptional
              />
              <InputComponent name="streetAddress" label="Street Address" />
              <InputComponent name="country" label="Country / Region" />
              <InputComponent name="state" label="State" />
              <InputComponent name="zipCode" label="Zip Code" />
              <InputComponent name="email" label="Email" />
              <InputComponent name="phone" label="Phone" />
            </div>
            <button
              type="submit"
              className="mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            >
              Save Changes
            </button>
          </form>
        </FormProvider>
      </div>

      {/* Change Password */}
      <div className="p-6 bg-white rounded shadow">
        <h2 className="text-lg font-semibold mb-4">Change Password</h2>
        <FormProvider {...passwordMethods}>
          <form onSubmit={passwordMethods.handleSubmit(handlePasswordSubmit)}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <InputComponent
                name="currentPassword"
                label="Current Password"
                type="password"
              />
              <InputComponent
                name="newPassword"
                label="New Password"
                type="password"
              />
              <InputComponent
                name="confirmPassword"
                label="Confirm Password"
                type="password"
              />
            </div>
            <button
              type="submit"
              className="mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            >
              Change Password
            </button>
          </form>
        </FormProvider>
      </div>
    </div>
  );
};

export default Page;
