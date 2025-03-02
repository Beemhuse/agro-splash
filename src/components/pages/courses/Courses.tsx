"use client";

import React from "react";
// import useModal from "@/hooks/useModal";
// import ProductDetailsModal from "@/components/modals/ProductDetailsModal";
import { IBook, ICourse } from "@/constants/interfaces";
import EmptyState from "@/components/reusables/EmptyState";
import CourseCard from "@/components/reusables/CourseCard";
import Link from "next/link";
import BooksCard from "@/components/reusables/BooksCard";

interface SmartDealsProps {
  courses: ICourse[]; // Type definition for the products prop
  books: IBook[]; // Type definition for the products prop
  //   selectedCategory: string; // Selected category from CategoriesMenu
}

const Courses: React.FC<SmartDealsProps> = ({
  courses,
  books
  //   selectedCategory,
}) => {
  //   const addToCart = useCartStore((state) => state.addToCart);
  //   const { isOpen, openModal, closeModal } = useModal();
  //   const [modalData, setModalData] = useState<ICourse | null>(null);

 
  return (
    <section className="py-8 bg-white">
      <div
        className="h-24 bg-cover mb-4  bg-green-500 bg-center flex items-center px-6"
        // style={{
        //   backgroundImage: `url('/images/organic.jpeg')`, // Replace with your actual image path
        // }}
      >
        {/* Breadcrumbs */}
        <nav className="text-sm text-white">
          <ul className="flex items-center space-x-2">
            <li>
              <Link href="/" className="hover:underline">
                Home
              </Link>
            </li>
            <li className="text-gray-300">/</li>

            <li className="text-black">Resources</li>
          </ul>
        </nav>
      </div>
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-semibold text-gray-800">
            Available course on{" "}
            <span className="text-green-500">Agro-splash</span>
          </h2>
          <a
            href="#"
            className="text-sm text-blue-500 font-medium hover:underline"
          >
            View All &gt;
          </a>
        </div>

        {courses?.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {courses?.map((course) => (
              <CourseCard
                key={course._id}
                // handleOpenModal={() => handleModalOpen(course)}
                course={course}
              />
            ))}
          </div>
        )}

        {/* Product Details Modal */}
        {/* {isOpen && modalData && (
          <ProductDetailsModal
            isOpen={isOpen}
            onClose={closeModal}
            product={modalData}
          />
        )} */}
      </div>
      <div className="container mx-auto mt-10 px-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-semibold text-gray-800">
            Available books on{" "}
            <span className="text-green-500">Agro-splash</span>
          </h2>
          <a
            href="#"
            className="text-sm text-blue-500 font-medium hover:underline"
          >
            View All &gt;
          </a>
        </div>

        {books?.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {books?.map((book) => (
              <BooksCard
                key={book._id}
                book={book}
              />
            ))}
          </div>
        )}

        {/* Product Details Modal */}
        {/* {isOpen && modalData && (
          <ProductDetailsModal
            isOpen={isOpen}
            onClose={closeModal}
            product={modalData}
          />
        )} */}
      </div>
    </section>
  );
};

export default Courses;
