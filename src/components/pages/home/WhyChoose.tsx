"use client";
import useAnimeOnView from "@/hooks/useAnimeOnView";
import Image from "next/image";

export default function WhyChoose() {
  const ref = useAnimeOnView({
    opacity: [0, 1],
    translateY: [-50, 0],
    duration: 1000,
    easing: "easeOutQuad",
  });

  return (
    <>
      <section
        ref={ref}
        className="py-12  text-white"
      >
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-xl text-black font-bold mb-8">Why Choose Us?</h2>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-6 bg-white rounded-lg shadow-md text-gray-800">
              <Image
                width={60}
                height={60}
                src="/icons/social-support.png"
                alt="Farmer Support"
                className="h-16 w-16 mx-auto mb-4"
              />
              <h3 className="text-xl font-semibold mb-2">Supporting Farmers</h3>
              <p>
                We empower African farmers with access to innovative technology
                and global markets.
              </p>
            </div>
            <div className="p-6 bg-white rounded-lg shadow-md text-gray-800">
              <Image
                width={60}
                height={60}
                src="/icons/connection.png"
                alt="Trade Connections"
                className="h-16 w-16 mx-auto mb-4"
              />
              <h3 className="text-xl font-semibold mb-2">Connecting Trade</h3>
              <p>
                Bridging the gap between farmers, buyers, and innovators to
                boost commerce.
              </p>
            </div>
            <div className="p-6 bg-white rounded-lg shadow-md text-gray-800">
              <Image
                width={60}
                height={60}
                src="/icons/delivery.png"
                alt="Authentic Products"
                className="h-16 w-16 mx-auto mb-4"
              />
              <h3 className="text-xl font-semibold mb-2">Authentic Products</h3>
              <p>
                Delivering genuine African agro products, crafted with care and
                quality.
              </p>
            </div>
          </div>

          <button className="mt-8 px-6 py-3 bg-green-50 text-green-700 font-medium rounded-full hover:bg-green-100">
            Learn More
          </button>
        </div>
      </section>
    </>
  );
}
