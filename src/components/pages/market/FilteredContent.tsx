"use client";
import {
  ICategory,
  IProduct,
  IPromotion,
  ITopCategory,
} from "@/constants/interfaces";
import { useState } from "react";
import CategoriesMenu from "./CategoriesMenu";
import SmartDeals from "./SmartDeals";
import TopDeals from "./TopDeals";
import TopCategories from "./TopCategories";

// FilteredContent as a client-side component
export default function FilteredContent({
  products,
  categories,
  promotions,
  topCategories,
}: {
  products: IProduct[];
  categories: ICategory[];
  promotions: IPromotion[];
  topCategories: ITopCategory[];
}) {
  const [filteredProducts, setFilteredProducts] =
    useState<IProduct[]>(products);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [selectedSubcategory, setSelectedSubcategory] = useState<string | null>(
    null
  ); // Added state for subcategory
console.log(selectedSubcategory)
  const handleCategorySelect = (
    categoryName: string,
    subcategoryName?: string
  ) => {
    setSelectedCategory(categoryName);
    setSelectedSubcategory(subcategoryName || null); // If no subcategory, reset it to null

    // Apply filtering based on category and subcategory
    let filtered = products;
    if (categoryName !== "All") {
      filtered = filtered.filter(
        (product) => product.category.name === categoryName
      );
    }

    if (subcategoryName) {
      filtered = filtered.filter(
        (product) => product.subcategory?.name === subcategoryName
      ); // Filtering by subcategory
    }

    setFilteredProducts(filtered);
  };

  return (
    <section className="relative grid grid-cols-1 gap-8 ">
      <CategoriesMenu
        categories={categories}
        onCategorySelect={handleCategorySelect}
        // subCategory={selectedSubcategory}
      />
      <SmartDeals
        products={filteredProducts}
        selectedCategory={selectedCategory}
      />
      <TopDeals promotions={promotions} />
      <TopCategories topCategories={topCategories} />
    </section>
  );
}
