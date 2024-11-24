"use client";

import Image from "next/image";
import React from "react";

const FeaturedCollections = () => {
  const collections = [
    {
      title: "ZARA PATTERN BACKPACKS",
      description: "Stretch, fresh-cool help you always comfortable",
      image: "/bg.jpg", // Replace with actual image path
      buttonText: "Shop Now",
    },
    {
      title: "BASIC COLOR CAPS",
      description:
        "Minimalist never cool, choose and make the simple great again!",
        image: "/bg.jpg", // Replace with actual image path
        buttonText: "Shop Now",
    },
  ];

  return (
    <section className="py-12 bg-white">
      <h2 className="text-xl font-semibold text-gray-800 uppercase mb-8">
        Featured Collections
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {collections.map((collection, index) => (
          <div
            key={index}
            className="relative group bg-gray-100 p-6 rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300"
          >
            {/* Text Content */}
            <div className="absolute inset-0 bg-white bg-opacity-90 opacity-100 group-hover:opacity-90 transition-opacity duration-300 flex flex-col justify-center p-6">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">
                {collection.title}
              </h3>
              <p className="text-gray-500 mb-6">{collection.description}</p>
              <button className="px-4 py-2 bg-green-600 text-white font-semibold rounded-full hover:bg-green-700 transition-colors">
                {collection.buttonText}
              </button>
            </div>
            {/* Image */}
            <div className="absolute inset-0">
              <Image
              width={500}
              height={500}
                src={collection.image}
                alt={collection.title}
                className="w-full h-full object-cover transform scale-100 group-hover:scale-110 transition-transform duration-500"
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturedCollections;
