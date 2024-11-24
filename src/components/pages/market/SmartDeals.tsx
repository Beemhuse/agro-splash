"use client";

import React from "react";
import productsData from "../../../../public/data.json";
import Image from "next/image";
const SmartDeals = () => {
 

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
        {productsData.products.map((product) => (
          <div key={product.id} className="bg-white shadow-md rounded-lg p-4">
            <Image
            height={500}
            width={500}
              src={product.image}
              alt={product.name}
              className="w-full h-48 object-contain mb-4"
            />
            <h2 className="text-lg font-semibold">{product.name}</h2>
            <p className="text-sm text-gray-500">{product.category}</p>
            <p className="text-gray-800 font-bold">{product.price}</p>
            <p className="text-gray-500 line-through">{product.originalPrice}</p>
            <p className="text-green-600 text-sm">Save: {product.savings}</p>
          </div>
        ))}
      </div>
      </div>
    </section>
  );
};

export default SmartDeals;
