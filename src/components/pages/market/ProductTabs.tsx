'use client';
import { IProduct } from "@/constants/interfaces";
import { useState } from "react";
import { IoIosStar, IoIosStarOutline } from "react-icons/io";

const ProductTabs = ({ product }: { product: IProduct }) => {
  const [activeTab, setActiveTab] = useState("description");

  const renderContent = () => {
    switch (activeTab) {
      case "description":
        return (
          <div className="mt-6">
            <p className="text-gray-700">
              {product.description}
             
            </p>
          </div>
        );
      case "additionalInfo":
        return (
          <div className="mt-6">
            <p className="text-gray-700">
              <strong>Category:</strong> {product.category?.name}
            </p>
            <p className="text-gray-700">
              <strong>Rating:</strong> {product.rating} / 5
            </p>
            <p className="text-gray-700">
              <strong>Stock:</strong>{" "}
              {product.isOutOfStock ? "Out of Stock" : "In Stock"}
            </p>
          </div>
        );
      case "reviews":
        return (
            <div className="space-y-6">
            {product?.review?.map((review) => (
              <div
                key={review._id}
                className="p-4  w-2/4 border-b-2 border-0 rounded-md shadow-sm bg-white flex gap-4"
              >
                {/* User Avatar */}
                <div className="w-12 h-12 flex items-center justify-center bg-gray-200 text-gray-600 font-bold rounded-full">
                  {review.user?.name?.[0]?.toUpperCase() || "U"}
                </div>
      
                {/* Review Details */}
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h4 className="font-semibold text-gray-800">
                      {review.user?.name || "Anonymous"}
                    </h4>
                    <span className="text-gray-500 text-sm">
                      {new Date(review.createdAt).toLocaleDateString()}
                    </span>
                  </div>
      
                  {/* Star Rating */}
                  <div className="flex items-center mt-1 text-yellow-500">
                    {Array.from({ length: 5 }).map((_, index) => (
                      <span key={index}>
                        {index < review.rating ? <IoIosStar /> : <IoIosStarOutline />}
                      </span>
                    ))}
                  </div>
      
                  {/* Comment */}
                  <p className="mt-2 text-gray-700">{review.comment}</p>
                </div>
              </div>
            ))}
      
            {/* Load More Button */}
            {/* {canLoadMore && (
              <div className="text-center mt-6">
                <button
                  onClick={loadMore}
                  className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition duration-300"
                >
                  Load More
                </button>
              </div>
            )} */}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="mt-12 bg-white shadow rounded-lg p-6">
      <div className="flex gap-6 border-b pb-2">
        <button
          className={`px-4 py-2 ${
            activeTab === "description"
              ? "text-green-500 border-b-2 border-green-500"
              : "text-gray-600"
          }`}
          onClick={() => setActiveTab("description")}
        >
          Description
        </button>
        <button
          className={`px-4 py-2 ${
            activeTab === "additionalInfo"
              ? "text-green-500 border-b-2 border-green-500"
              : "text-gray-600"
          }`}
          onClick={() => setActiveTab("additionalInfo")}
        >
          Additional Info
        </button>
        <button
          className={`px-4 py-2 ${
            activeTab === "reviews"
              ? "text-green-500 border-b-2 border-green-500"
              : "text-gray-600"
          }`}
          onClick={() => setActiveTab("reviews")}
        >
          Reviews
        </button>
      </div>
      {renderContent()}
    </div>
  );
};

export default ProductTabs;
