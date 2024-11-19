'use client';
import useAnimeOnView from "@/hooks/useAnimeOnView";
import React from "react";

const HeroSection = () => {
  const ref = useAnimeOnView({
    opacity: [0, 1],
    translateY: [-50, 0],
    duration: 1000,
    easing: "easeOutQuad",
  });
  return (
    <section ref={ref} className="bg-yellow-100 py-12 text-center">
      <div className="text-4xl font-bold">
        <span className="text-green-600">Organic</span> Foods at your{" "}
        <span className="text-gray-800">Doorsteps</span>
      </div>
      <p className="text-gray-500 mt-4">Dignissim massa diam elementum.</p>
      <div className="mt-8 space-x-4">
        <button className="px-6 py-2 bg-green-600 text-white rounded-full">
          Start Shopping
        </button>
        <button className="px-6 py-2 bg-gray-800 text-white rounded-full">
          Join Now
        </button>
      </div>
      <div className="mt-12 flex justify-center space-x-8 text-center">
        <div>
          <h3 className="text-2xl font-bold">14k+</h3>
          <p className="text-gray-600">Product Varieties</p>
        </div>
        <div>
          <h3 className="text-2xl font-bold">50k+</h3>
          <p className="text-gray-600">Happy Customers</p>
        </div>
        <div>
          <h3 className="text-2xl font-bold">10+</h3>
          <p className="text-gray-600">Store Locations</p>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
