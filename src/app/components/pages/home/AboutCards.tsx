import useAnimeOnView from "@/hooks/useAnimeOnView";
import React from "react";

export default function AboutCards({}) {
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
            Orphan Support
          </h3>
          <p className="text-gray-600">
            Empowering and supporting orphans with the tools they need to
            thrive.
          </p>
        </div>

        {/* Card 2 */}
        <div className="p-6">
          <h3 className="text-xl font-bold text-green-800 mb-4">
            Disability Assistance
          </h3>
          <p className="text-gray-600">
            Providing resources and assistance to individuals with disabilities.
          </p>
        </div>

        {/* Card 3 */}
        <div className="p-6">
          <h3 className="text-xl font-bold text-green-800 mb-4">
            Widow Empowerment
          </h3>
          <p className="text-gray-600">
            Extending support and empowering widows through initiatives.
          </p>
        </div>

        {/* Card 4 */}
        <div className="p-6">
          <h3 className="text-xl font-bold text-green-800 mb-4">
            Community Outreach
          </h3>
          <p className="text-gray-600">
            Engaging with local communities to foster growth and collaboration.
          </p>
        </div>
      </div>
    </div>
  );
}
