"use client";

import React from "react";
import productsData from "../../../../public/data.json";
// import Image from "next/image";
import ProductCard from "@/components/reusables/ProductCard";
import useCartStore, { CartItem } from "@/store/cartStore";
const SmartDeals = () => {
    const addToCart = useCartStore((state) => state.addToCart);

  const handleAddToCart = ({id, name, price, quantity, image}: CartItem) => {
    addToCart({
      id: id,
      name: name,
      price: price,
      quantity: quantity,
      image: image,
    });
  };


  return (
    <section className="py-8 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-semibold text-gray-800">
            Grab the best deal on{" "}
            <span className="text-green-500">Agro-splash</span>
          </h2>
          <a
            href="#"
            className="text-sm text-blue-500 font-medium hover:underline"
          >
            View All &gt;
          </a>
        </div>
        {/* Product Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {productsData.products?.map((product) => (
        <ProductCard product={product} key={product.id} addToCart={handleAddToCart}  />
      ))}
      </div>
      </div>
    </section>
  );
};

export default SmartDeals;
