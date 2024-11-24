import { CartItem } from "@/store/cartStore";
import Image from "next/image";
import React from "react";
import { FiShoppingCart } from "react-icons/fi";
interface IProduct {
    id: number;
    name: string;
    category: string;
    price: number;
    originalPrice?: number;
    discount?: number|null;
    savings: number;
    image: string;
    isOutOfStock: boolean;
    rating: number;
    description: string;
  }
  
  interface IProps {
    product: IProduct; // Pass the entire product object
    addToCart: (product: CartItem) => void;
  }
const ProductCard = ({ product, addToCart }: IProps) => {
    const {
        id,
        name,
        category,
        price,
        originalPrice,
        discount,
        // savings,
        image,
        isOutOfStock,
        rating,
        // description,
      } = product;
      const handleAddToCart = () => {
        const cartItem: CartItem = {
          id,
          name,
          price,
          quantity: 1, // Default quantity for adding to cart
          image,
        };
        addToCart(cartItem);
      };
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
      <div className="flex items-center justify-center h-48 mb-4">
        <Image
          src={image}
          alt={name}
          height={500}
          width={500}
          className="h-full object-contain"
        />
      </div>

      {/* Product Details */}
      <h2 className="text-lg font-semibold mb-1">{name}</h2>
      <p className="text-sm text-gray-500 mb-2">{category}</p>

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

        {/* Add to Cart Icon */}
        {!isOutOfStock ? (
          <button onClick={handleAddToCart} className="w-8 h-8 bg-green-500 text-white flex items-center justify-center rounded-full hover:bg-green-600 transition duration-300">
            <FiShoppingCart />
          </button>
        ) : (
          <button
            className="w-8 h-8 bg-gray-300 text-gray-500 flex items-center justify-center rounded-full cursor-not-allowed"
            disabled
          >
            🛒
          </button>
        )}
      </div>

      {/* Rating */}
      <div className="flex items-center mt-3 text-yellow-500">
        {Array.from({ length: rating }).map((_, index) => (
          <span key={index}>⭐</span>
        ))}
        {rating < 5 &&
          Array.from({ length: 5 - rating }).map((_, index) => (
            <span key={index} className="text-gray-300">
              ⭐
            </span>
          ))}
      </div>
    </div>
  );
};

export default ProductCard;
