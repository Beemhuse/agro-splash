import useAnimeOnView from "@/hooks/useAnimeOnView";
import React from "react";

export default function AboutCards() {
  const ref = useAnimeOnView({
    opacity: [0, 1],
    translateY: [-50, 0],
    duration: 1000,
    easing: "easeOutQuad",
  });

  return (
    <div ref={ref} className="bg-white py-12">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
        {/* Card 1 */}
        <div className="p-6">
          <h3 className="text-xl font-bold text-green-800 mb-4">
            Organic Fertilizers
          </h3>
          <p className="text-gray-600">
            High-quality organic fertilizers to improve soil health and crop yields.
          </p>
        </div>

        {/* Card 2 */}
        <div className="p-6">
          <h3 className="text-xl font-bold text-green-800 mb-4">
            Agricultural Equipment
          </h3>
          <p className="text-gray-600">
            Advanced machinery and tools to enhance farming efficiency and productivity.
          </p>
        </div>

        {/* Card 3 */}
        <div className="p-6">
          <h3 className="text-xl font-bold text-green-800 mb-4">
            Fresh Produce Supply
          </h3>
          <p className="text-gray-600">
            Supplying fresh, organic fruits and vegetables directly from farms to consumers.
          </p>
        </div>

        {/* Card 4 */}
        <div className="p-6">
          <h3 className="text-xl font-bold text-green-800 mb-4">
            Smart Irrigation Systems
          </h3>
          <p className="text-gray-600">
            Providing water-efficient irrigation systems for sustainable farming practices.
          </p>
        </div>
      </div>
    </div>
  );
}
