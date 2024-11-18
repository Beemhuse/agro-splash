// components/CategorySection.tsx
import React from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

const CategorySection = () => {
  return (
    <div className="flex items-center justify-between mt-8 px-4">
      <h2 className="text-2xl font-bold">Category</h2>
      <div className="flex items-center space-x-2">
        <button className="px-4 py-2 border border-green-600 text-green-600 rounded-full">
          View All
        </button>
        <button className="p-2 border rounded-full">
          <FiChevronLeft />
        </button>
        <button className="p-2 border rounded-full">
          <FiChevronRight />
        </button>
      </div>
    </div>
  );
};

export default CategorySection;
