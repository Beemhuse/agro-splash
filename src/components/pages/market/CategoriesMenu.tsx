"use client";
import { FaAngleDown } from "react-icons/fa";
import React, { useState } from "react";
import { ICategory } from "@/constants/interfaces";

// Define the structure for Category and Subcategory

interface CategoriesMenuProps {
  categories: ICategory[];
  // subCategory: string | null;
  onCategorySelect: (categoryName: string, subcategoryName?: string) => void;
}

const CategoriesMenu = ({ categories, onCategorySelect }: CategoriesMenuProps) => {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [activeSubcategory, setActiveSubcategory] = useState<string | null>(null);
  const [openPopover, setOpenPopover] = useState<string | null>(null); // To manage toggling of popovers

  const handleCategoryClick = (categoryName: string) => {
    setActiveCategory(categoryName);
    if (categoryName === "All") {
      setOpenPopover(null); // No popover for "All" category
      setActiveSubcategory(null); // Reset subcategory when "All" is clicked
    } else {
      if (openPopover === categoryName) {
        setOpenPopover(null); // Close the popover if it's already open
      } else {
        setOpenPopover(categoryName); // Open the popover for the clicked category
      }
    }
    onCategorySelect(categoryName);
  };

  const handleSubcategoryClick = (subcategoryName: string) => {
    setActiveSubcategory(subcategoryName);
    onCategorySelect(activeCategory, subcategoryName || undefined); // Send the selected subcategory for filtering
    setOpenPopover(null); // Optionally close the popover after selecting subcategory
  };

  // Add the "All" category at the beginning of the list
  const categoriesWithAll = [{ name: "All", subCategories: [] }, ...categories];

  return (
    <div className="flex h-full w-full items-center justify-center hide-scrollbar gap-4 py-4 px-6 bg-white shadow rounded-lg mb-20">
      {categoriesWithAll?.map((category) => (
        <div key={category.name} className="relative max-w-full">
          <button
            className={`px-4 py-2 flex gap-2 items-center rounded-full text-sm font-medium whitespace-nowrap ${
              activeCategory === category.name
                ? "bg-green-500 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            } transition-colors duration-300`}
            onClick={() => handleCategoryClick(category.name)}
          >
            {category.name} {category.name !== "All" && <FaAngleDown />}
          </button>

          {/* Show the subcategories popover when category is clicked, but only if category is not "All" */}
          {category?.subCategories && category.name !== "All" && openPopover === category.name && (
            <div className="absolute left-0 mt-2 bg-white  shadow-lg rounded-lg py-2 z-50">
              {category?.subCategories?.map((subcategory) => (
                <button
                  key={subcategory.id}
                  className={`block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 ${
                    activeSubcategory === subcategory.name
                      ? "bg-green-100 text-green-500"
                      : ""
                  }`}
                  onClick={() => handleSubcategoryClick(subcategory.name)}
                >
                  {subcategory.name}
                </button>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default CategoriesMenu;
