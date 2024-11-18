"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, EffectCube } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-cube";

import Image from "next/image";
import useAnimeOnView from "@/hooks/useAnimeOnView";

const TestimonialSlider: React.FC = () => {
    const ref = useAnimeOnView({
        opacity: [0, 1],
        translateY: [-50, 0],
        duration: 1000,
        easing: "easeOutQuad",
      });
    
  const testimonials = [
    {
      quote: "Agro-Splash has transformed how we farm. Their tools have improved our productivity immensely.",
      name: "John Doe",
      role: "Farmer, Nigeria",
      image: "/woman1.jpg",
    },
    {
      quote: "Their marketplace is a one-stop shop for everything we need. Highly recommended!",
      name: "Jane Smith",
      role: "Trader, Kenya",
      image: "/woman1.jpg",
    },
    {
      quote: "The platform connects us with global buyers, making trade seamless and profitable.",
      name: "Samuel Akpan",
      role: "Distributor, Ghana",
      image: "/woman1.jpg",
    },
  ];

  return (
    <section ref={ref} className="py-12 ">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-xl font-bold text-gray-800 mb-8">What People Say About Us</h2>
        <div className="w-2/4 m-auto">
        <Swiper
          modules={[Navigation, Pagination, EffectCube, Autoplay]}
        //   navigation
          effect="cube"
        //   pagination={{ clickable: true }}
          autoplay={{ delay: 6000 }}
          loop
          grabCursor={true}
          cubeEffect={{
            shadow: true,
            slideShadows: true,
            shadowOffset: 20,
            shadowScale: 0.94,
          }}
          className="swiper-container"
        >
          {testimonials.map((testimonial, index) => (
            <SwiperSlide key={index}>
              <div className="bg-white h-[200px] border p-6 rounded-lg shadow-md">
                <p className="italic text-gray-700 mb-4">&quot;{testimonial.quote}&quot;</p>
                <div className="flex items-center justify-center">
                  <Image
                    height={50}
                    width={50}
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="h-12 w-12 rounded-full mr-3"
                  />
                  <div>
                    <h4 className="text-lg font-semibold">{testimonial.name}</h4>
                    <span className="text-sm text-gray-500">{testimonial.role}</span>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        </div>
      </div>
    </section>
  );
};

export default TestimonialSlider;
