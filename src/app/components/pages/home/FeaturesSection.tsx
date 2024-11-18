import React from "react";
import { FaLeaf, FaTruck } from "react-icons/fa";

const features = [
  { title: "Fresh from farm", description: "Lorem ipsum dolor sit amet, consectetur adipi elit.", icon: <FaLeaf />, color: "bg-green-600" },
  { title: "100% Organic", description: "Lorem ipsum dolor sit amet, consectetur adipi elit.", icon: <FaLeaf />, color: "bg-green-800" },
  { title: "Machineries", description: "Lorem ipsum dolor sit amet, consectetur adipi elit.", icon: <FaTruck />, color: "bg-orange-500" },
];

const FeatureSection = () => {
  return (
    <div className="flex flex-wrap justify-between mt-8">
      {features.map((feature, index) => (
        <div key={index} className={`flex-1 min-w-[200px] mx-2 p-6 ${feature.color} text-white rounded-lg text-center`}>
          {/* <div className="text-4xl mb-2">{feature.icon}</div> */}
          <h3 className="text-xl font-bold">{feature.title}</h3>
          <p className="mt-2">{feature.description}</p>
        </div>
      ))}
    </div>
  );
};

export default FeatureSection;
