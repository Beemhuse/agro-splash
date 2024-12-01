"use client";

import React, { useState } from "react";
import ProductCard from "@/components/reusables/ProductCard";
import useModal from "@/hooks/useModal";
import ProductDetailsModal from "@/components/modals/ProductDetailsModal";
import { IProduct } from "@/constants/interfaces";
import EmptyState from "@/components/reusables/EmptyState";

interface SmartDealsProps {
  products: IProduct[]; // Type definition for the products prop
  selectedCategory: string; // Selected category from CategoriesMenu
}

const SmartDeals: React.FC<SmartDealsProps> = ({
  products,
  selectedCategory,
}) => {
  //   const addToCart = useCartStore((state) => state.addToCart);
  const { isOpen, openModal, closeModal } = useModal();
  const [modalData, setModalData] = useState<IProduct | null>(null);

  // Filter products by category
  const filteredProducts =
    selectedCategory === "All"
      ? products
      : products.filter(
          (product) => product.category.name === selectedCategory
        );

  const handleModalOpen = (product: IProduct) => {
    setModalData(product);
    openModal();
  };

  // const openDetail
  return (
    <section className="py-8 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-semibold text-gray-800">
            Grab the best deal on{" "}
            <span className="text-green-500">Agro-splash</span>
          </h2>
          <a
            href="#"
            className="text-sm text-blue-500 font-medium hover:underline"
          >
            View All &gt;
          </a>
        </div>

        {filteredProducts.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProducts?.map((product) => (
              <ProductCard
                key={product._id}
                handleOpenModal={() => handleModalOpen(product)}
                product={product}
              />
            ))}
          </div>
        )}

        {/* Product Details Modal */}
        {isOpen && modalData && (
          <ProductDetailsModal
            isOpen={isOpen}
            onClose={closeModal}
            product={modalData}
          />
        )}
      </div>
    </section>
  );
};

export default SmartDeals;
