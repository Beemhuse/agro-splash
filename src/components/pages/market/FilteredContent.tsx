'use client';
import { ICategory, IProduct, IPromotion, ITopCategory } from "@/app/constants/interfaces";
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
    const [filteredProducts, setFilteredProducts] = useState<IProduct[]>(products);
    const [selectedCategory, setSelectedCategory] = useState<string>("All");
  
    const handleCategorySelect = (categoryName: string) => {
      setSelectedCategory(categoryName);
      if (categoryName === "All") {
        setFilteredProducts(products);
      } else {
        const filtered = products.filter((product) => product.category.name === categoryName);
        setFilteredProducts(filtered);
      }
    };
  
    return (
      <section>
        <CategoriesMenu categories={categories} onCategorySelect={handleCategorySelect} />
        <SmartDeals products={filteredProducts} selectedCategory={selectedCategory}  />
        <TopDeals promotions={promotions} />
        <TopCategories topCategories={topCategories} />
      </section>
    );
  }