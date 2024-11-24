"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const HeroSection = () => {
  const slides = [
    {
      title: "Organic Farming",
      subtitle: "Nurture Nature",
      description:
        "Discover the benefits of organic farming and sustainable practices for a healthier future.",
      buttonText: "Learn More",
      backgroundImage: "/images/organic.jpeg", // Replace with actual image path
      buttonColor: "bg-green-600",
    },
    {
      title: "Fresh Vegetables",
      subtitle: "Direct From Farm",
      description:
        "Get the freshest vegetables directly from local farmers to your doorstep.",
      buttonText: "Shop Now",
      backgroundImage: "/images/veg.webp", // Replace with actual image path
      buttonColor: "bg-yellow-600",
    },
    {
      title: "Modern Irrigation",
      subtitle: "Smart Solutions",
      description:
        "Explore modern irrigation techniques for efficient water usage and better crop yield.",
      buttonText: "Explore",
      backgroundImage: "/images/sprayer.jpg", // Replace with actual image path
      buttonColor: "bg-blue-600",
    },
  ];

  return (
    <section className="relative w-full">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        pagination={{ clickable: true }}
        autoplay={{ delay: 10000, disableOnInteraction: false }}
        loop
        className="w-full h-[800px]"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div
              className="relative h-full flex items-center justify-between px-12 text-white"
              style={{
                backgroundImage: `url(${slide.backgroundImage})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              {/* Content */}
              <div className="max-w-lg bg-black bg-opacity-50 p-8 rounded-lg">
                <h1 className="text-5xl font-bold leading-tight mb-4">
                  {slide.title}{" "}
                  <span className={`text-${slide.buttonColor.replace("bg-", "")}`}>
                    {slide.subtitle}
                  </span>
                </h1>
                <p className="text-gray-200 mb-6">{slide.description}</p>
                <button
                  className={`${slide.buttonColor} text-white px-6 py-3 rounded-full`}
                >
                  {slide.buttonText}
                </button>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default HeroSection;
