"use client";

import React, { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import InputComponent from "@/components/ui/input";
import { AccountSettingsData, accountSettingsSchema } from "@/schema";
import Image from "next/image";
import { Cookies } from "react-cookie";
import { client } from "@/sanity/client";

const uploadImage = async (file: File) => {
  console.log(file)
  try {
    const imageAsset = await client.assets.upload('image', file, {
      contentType: file.type,
      filename: file.name,
    });
    return imageAsset._id; // Return the image asset ID
  } catch (error) {
    console.error("Image upload error:", error);
    throw new Error("Image upload failed");
  }
};
const Page = () => {
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
const cookies = new Cookies()
const user = cookies.get("agro-user")

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

  const handleAccountSubmit = async (data: AccountSettingsData) => {
    if (selectedImage) {
      // Upload image first
  const imageId = await uploadImage(selectedImage);

      const formData = new FormData();
      formData.append("id", user.id);
      formData.append("name", data.firstName + data.lastName);
      formData.append("image", selectedImage);
      formData.append("phone", data.phoneNumber);
      formData.append("image", imageId, // Include the image reference ID in the form data
      );
  // Use the asset reference ID returned by the uploadImage function
      try {
        // Send the form data to the API endpoint
        const response = await fetch(`/api/update-customer`, {
          method: "POST",
          body: formData,
        });

        if (response.ok) {
          const result = await response.json();
          console.log("Success:", result);
        } else {
          const error = await response.json();
          console.error("Error:", error);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    }
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
              {/* <InputComponent name="email" type="email" label="Email" /> */}
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

      {/* Add other sections like Billing Address or Change Password */}
    </div>
  );
};

export default Page;
