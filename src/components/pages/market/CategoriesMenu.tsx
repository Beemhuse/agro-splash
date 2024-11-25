"use client";
import { FaAngleDown } from "react-icons/fa";

import React, { useState } from "react";


interface Category {
    name: string; // Define the type for a category
  }
  
  interface CategoriesMenuProps {
    categories: Category[]; // Define the type for the categories prop
  }
const CategoriesMenu = ({categories}: CategoriesMenuProps) => {
  const [activeCategory, setActiveCategory] = useState<string>("");
  return (
    <div className="flex items-center justify-center overflow-x-auto hide-scrollbar gap-4 py-4 px-6 bg-white shadow rounded-lg">
      {categories.map((category) => (
        <button
          key={category.name}
          className={`px-4 py-2 flex gap-2 items-center rounded-full text-sm font-medium whitespace-nowrap ${
            activeCategory === category?.name
              ? "bg-green-500 text-white"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          } transition-colors duration-300`}
          onClick={() => setActiveCategory(category?.name)}
        >
          {category?.name} <FaAngleDown />
        </button>
      ))}
    </div>
  );
};

export default CategoriesMenu;
