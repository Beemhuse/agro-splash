"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { IPromotion } from "@/app/constants/interfaces";

interface IProps {
    promotions: IPromotion[];
}

const TopDeals = ({promotions}: IProps) => {

console.log(promotions)
  return (
    <section className="py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-semibold text-gray-800">
            Top <span className="text-green-600">Agro Deals</span>
          </h2>
          <a href="#" className="text-sm text-green-600 font-medium hover:underline">
            View All &gt;
          </a>
        </div>

        {/* Swiper Carousel */}
        <Swiper
          modules={[Navigation, Pagination]}
          spaceBetween={16}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          breakpoints={{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          className="w-full"
        >
        {promotions?.map((deal, index) => (
  <SwiperSlide key={index}>
    <div
      className={`p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 flex items-center `}
      style={{
        backgroundColor: deal.backgroundColor
      }}
    >
      {/* Logo and Text */}
      <div className="w-1/2 pr-4">
        <div className="mb-4">
          {/* <Image src={deal.logo} alt={deal.brand} className="w-12 h-12" /> */}
        </div>
        <h3 className="text-lg font-semibold text-gray-800">{deal.brand}</h3>
        <p className="text-sm text-gray-600">{deal.description}</p>
      </div>

      {/* Background Image */}
      <div
        className="w-1/2 h-48 bg-cover bg-center rounded-lg"
        style={{
          backgroundImage: `url(${deal.image.asset.url})`,
        }}
      ></div>
    </div>
  </SwiperSlide>
))}
        </Swiper>
      </div>
    </section>
  );
};

export default TopDeals;
