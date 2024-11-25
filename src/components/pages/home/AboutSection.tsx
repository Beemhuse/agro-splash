'use client'
import React from "react";
import Image from "next/image";
import useAnimeOnView from "@/hooks/useAnimeOnView";
import AboutCards from "./AboutCards";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCards, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-cards";
import "swiper/css/navigation";
import "swiper/css/pagination";
const images = [
  { src: "/images/plant.jpg", alt: "Image 1" },
  { src: "/images/web1.jpg", alt: "Image 2" },
  { src: "/images/plant1.jpg", alt: "Image 3" },
  // { src: "/bg4.jpeg", alt: "Image 4" },
];
export default function AboutSection() {
    const ref = useAnimeOnView({
        opacity: [0, 1],
        translateY: [-50, 0],
        duration: 1000,
        easing: "easeOutQuad",
      });
  return (
    <section ref={ref} className="bg-green-800 text-white">
      {/* About Section */}
      <div className="container mx-auto flex flex-col md:flex-row items-center px-6 py-16">
        {/* Text Content */}
        <div className="md:w-1/2 text-center md:text-left">
          <h2 className="xl:text-4xl text-xl font-bold mb-4">About Our Organization</h2>
          <p className="xl:text-lg text-md mb-6">
            At Agro-Splash, we believe in the transformative power of technology
            and innovation in agriculture. Our organization is dedicated to
            supporting farmers, connecting buyers, and providing sustainable
            solutions for the agro-community, guided by our commitment to growth
            and innovation.
          </p>
          <button className="px-6 py-3 border-2 border-white rounded-full text-white hover:bg-white hover:text-green-800 transition">
            Read More
          </button>
        </div>

        <div className="w-full md:w-1/2 mt-8 md:mt-0">
      <Swiper
        modules={[EffectCards, Navigation, Pagination]}
        effect="cards"
        grabCursor={true}
        // navigation
        // pagination={{ clickable: true }}
        className="w-full h-[400px]"
      >
        {images.map((image, index) => (
          <SwiperSlide key={index} className="flex justify-center items-center">
            <Image
              src={image.src}
              alt={image.alt}
              width={600}
              height={400}
              className="rounded-lg object-cover"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
      </div>
<AboutCards />
    </section>
  );
}
