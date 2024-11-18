'use client'

import Image from "next/image";
import React from "react";
import { FaTools } from "react-icons/fa";
import { TiWeatherPartlySunny } from "react-icons/ti";
import { MdMonitorHeart } from "react-icons/md";
import useAnimeOnView from "@/hooks/useAnimeOnView";

export default function KeyFeatures() {
    const ref = useAnimeOnView({
        opacity: [0, 1],
        translateY: [-50, 0],
        duration: 1000,
        easing: "easeOutQuad",
      });
  return (
    <section ref={ref}  className="py-12">
      <div className="container mx-auto px-6 text-center">
        <div className="flex items-center w-full mb-8">
          <hr className="w-full border-green-700" />
          <h2 className="text-xl w-full font-bold text-gray-800">
            What We Offer
          </h2>
          <hr className="w-full border-yellow-700" />
        </div>

        <div className="grid md:grid-cols-2 gap-10">
          {/* Agrotech Features */}
          <div className="p-6 bg-green-50 rounded-lg shadow-md">
            <h3 className="text-2xl font-semibold text-green-700 mb-4">
              Agrotech Solutions
            </h3>
            <ul className="text-left text-gray-700">
              <li className="flex items-center gap-3 mb-3">
                <FaTools className="text-green-700 text-xl" />{" "}
                <span>Smart Farming Tools</span>
              </li>
              <li className="flex items-center mb-3 gap-3">
                <TiWeatherPartlySunny className="text-green-700 text-xl" />{" "}
                <span>Weather Forecasting Tools</span>
              </li>
              <li className="flex items-center  gap-3">
                <MdMonitorHeart className="text-green-700 text-xl" />{" "}
                <span>Crop Monitoring Systems</span>
              </li>
            </ul>
          </div>

          {/* Marketplace Features */}
          <div className="p-6 bg-yellow-50 rounded-lg shadow-md">
            <h3 className="text-2xl font-semibold text-yellow-700 mb-4">
              Marketplace
            </h3>
            <ul className="text-left text-gray-700">
              <li className="flex items-center mb-3">
                <Image
                  src="/icons/fruit.png"
                  width={60}
                  height={60}
                  alt="Fresh Produce"
                  className="h-6 w-6 mr-3"
                />
                <span>Fresh Produce & Organic Products</span>
              </li>
              <li className="flex items-center mb-3">
                <Image
                  src="/icons/tractor.png"
                  width={60}
                  height={60}
                  alt="Agro Machinery"
                  className="h-6 w-6 mr-3"
                />
                <span>Agro Machinery</span>
              </li>
              <li className="flex items-center">
                <Image
                  src="/icons/vegetables.png"
                  width={60}
                  height={60}
                  alt="Specialty Products"
                  className="h-8 w-8 mr-3"
                />
                <span>African Specialty Products</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
