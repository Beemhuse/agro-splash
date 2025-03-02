"use client";

import Image from "next/image";
import React from "react";

interface Category {
  name: string; // Define the type for a category
  image: {
    asset: {
      url: string; // URL of the product image
    };
  };
}

interface CategoriesMenuProps {
  topCategories: Category[]; // Define the type for the categories prop
}
const TopCategories = ({ topCategories }: CategoriesMenuProps) => {
  return (
    <section className="py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-semibold text-gray-800">
            Shop From <span className="text-green-500">Top Categories</span>
          </h2>
          <a
            href="#"
            className="text-sm text-blue-500 font-medium hover:underline"
          >
            View All &gt;
          </a>
        </div>

        {/* Categories */}
        <div className="flex justify-center gap-8 overflow-x-auto hide-scrollbar">
          {topCategories?.map((category, index) => (
            <div
              key={index}
              className="flex flex-col items-center space-y-2 group"
            >
              <div className="w-20 h-20 rounded-full flex items-center justify-center border-2 border-transparent group-hover:border-green-500 transition-all duration-300">
                <Image
                  width={500}
                  height={500}
                  src={category.image.asset.url}
                  alt={category.name}
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
              <p className="text-sm text-gray-700 font-medium">
                {category.name}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TopCategories;
