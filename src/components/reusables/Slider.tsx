"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

interface HeaderSliderProps {
  images: Array<{
    src: string;
    alt: string;
    description: string;
    caption: string;
  }>;
}

const Slider: React.FC<HeaderSliderProps> = ({ images }) => {
  return (
    <Swiper
      modules={[Navigation, Pagination, Autoplay]}
      direction="horizontal"
      loop={true}
    //   pagination={{ clickable: true }}
    //   navigation
      autoplay={{ delay: 10000 }}
      className="header-slider"
    >
      {images.map((image, index) => (
        <SwiperSlide key={index}>
          <div
            className="relative h-[80vh] bg-cover bg-center"
            style={{ backgroundImage: `url(${image.src})` }}
          >
            {/* Black opacity overlay */}
            <div className="absolute inset-0 bg-black/50 z-[1]"></div>
            {/* Caption content */}
            <div className="relative h-[80vh] justify-center w-full items-center flex flex-col text-white z-[2]">
              <div className="xl:w-2/5 w-full text-center">
                <h1 className="xl:text-4xl text-xl font-bold mb-4">{image.caption}</h1>
                <p className="text-lg font-bold mb-4 ">{image.description}</p>
                <button className="px-6 py-2 xl:text-lg text-md bg-white text-black font-medium hover:bg-gray-200 transition">
                  Read More
                </button>
              </div>
            </div>
          
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Slider;
