import { IProduct } from "@/constants/interfaces";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import { FiShoppingCart } from "react-icons/fi";
import { IoIosStar } from "react-icons/io";
import { IoEyeOutline } from "react-icons/io5";
import { FaRegHeart } from "react-icons/fa";

  interface IProps {
    product: IProduct; // Pass the entire product object
    // addToCart: (product: CartItem) => void;
    handleOpenModal: () => void;
  }
const ProductCard = ({ product, handleOpenModal }: IProps) => {
  const {push} = useRouter()
    const {
        // _id,
        slug,
        name,
        category,
        price,
        originalPrice,
        discount,
        image,
        isOutOfStock,
        rating,
        // description,
      } = product;
  return (
    <div
      className={`relative bg-white shadow-md rounded-lg p-4 border ${
        isOutOfStock
          ? "opacity-60 border-gray-200"
          : "border-gray-100 hover:shadow-lg hover:border-green-400"
      } transition duration-300`}
    >
      {/* Badge (if out of stock or on sale) */}
      {isOutOfStock && (
        <span className="absolute top-2 left-2 bg-gray-500 text-white text-xs font-medium px-2 py-1 rounded">
          Out of Stock
        </span>
      )}
      {discount && !isOutOfStock && (
        <span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-medium px-2 py-1 rounded">
          Sale {discount}%
        </span>
      )}
      
      

      {/* Product Image */}
      <div className="flex relative items-center justify-center h-48 mb-4">
        <Image
          src={image[0]?.asset?.url}
          alt={name}
          height={500}
          width={500}
          loading='lazy'
          className="h-full w-full object-cover"
        />
        <span className="absolute top-2 cursor-pointer right-2 text-lg  text-black bg-white shadow-md rounded-full h-8 w-8 flex items-center justify-center  font-medium px-2 py-1">
          <FaRegHeart />
        </span>
        <span 
    onClick={()=>push(`market-place/${slug.current}`)}
    className="absolute top-12 right-2 cursor-pointer text-lg  text-black bg-white shadow-md rounded-full h-8 w-8 flex items-center justify-center  font-medium px-2 py-1">
          <IoEyeOutline />
        </span>
      </div>

      {/* Product Details */}
      <h2 className="text-lg font-semibold mb-1">{name}</h2>
      <p className="text-sm text-gray-500 mb-2">{category.name}</p>

      <div className="flex items-center justify-between">
        {/* Price */}
        <div>
          <p className="text-gray-800 font-bold">${price}</p>
          {originalPrice && (
            <p className="text-sm text-gray-500 line-through">
              ${originalPrice}
            </p>
          )}
        </div>

        {!isOutOfStock ? (
          <button onClick={handleOpenModal} className="w-8 h-8 bg-green-500 text-white flex items-center justify-center rounded-full hover:bg-green-600 transition duration-300">
            <FiShoppingCart />
          </button>
        ) : (
          <button
            className="w-8 h-8 bg-gray-300 text-gray-500 flex items-center justify-center rounded-full cursor-not-allowed"
            disabled
          >
            <FiShoppingCart />
            </button>
        )}
      </div>

      {/* Rating */}
      <div className="flex items-center mt-3 text-yellow-500">
        {Array.from({ length: rating }).map((_, index) => (
          <span key={index}><IoIosStar /></span>
        ))}
        {rating < 5 &&
          Array.from({ length: 5 - rating }).map((_, index) => (
            <span key={index} className="text-gray-300">
              <IoIosStar />
            </span>
          ))}
      </div>
    </div>
  );
};

export default ProductCard;
