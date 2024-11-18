'use client'
import React from "react";
import Image from "next/image";
import useAnimeOnView from "@/hooks/useAnimeOnView";
import AboutCards from "./AboutCards";

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
          <h2 className="text-4xl font-bold mb-4">About Our Organization</h2>
          <p className="text-lg mb-6">
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

        {/* Image */}
        <div className="md:w-1/2 mt-8 md:mt-0">
          <Image
            src="/bg3.jpeg" // Replace with your image path
            alt="Support"
            width={600}
            height={400}
            className="rounded-lg"
          />
        </div>
      </div>
<AboutCards />
    </section>
  );
}
