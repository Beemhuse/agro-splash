"use client";
import { FaAngleDown } from "react-icons/fa";

import React, { useState } from "react";

const CategoriesMenu = () => {
  const [activeCategory, setActiveCategory] = useState("Groceries");

  const categories = [
    "Groceries",
    "Premium Fruits",
    "Home & Kitchen",
    "Fashion",
    "Electronics",
    "Beauty",
    "Home Improvement",
    "Sports, Toys & Luggage",
  ];

  return (
    <div className="flex items-center justify-center overflow-x-auto hide-scrollbar gap-4 py-4 px-6 bg-white shadow rounded-lg">
      {categories.map((category) => (
        <button
          key={category}
          className={`px-4 py-2 flex gap-2 items-center rounded-full text-sm font-medium whitespace-nowrap ${
            activeCategory === category
              ? "bg-green-500 text-white"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          } transition-colors duration-300`}
          onClick={() => setActiveCategory(category)}
        >
          {category} <FaAngleDown />
        </button>
      ))}
    </div>
  );
};

export default CategoriesMenu;
