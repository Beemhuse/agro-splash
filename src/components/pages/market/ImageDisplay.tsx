"use client";
import Image from "next/image";
import { useState } from "react";
import { FiShoppingCart, FiHeart } from "react-icons/fi";
import { FaFacebook, FaTwitter, FaWhatsapp, FaPinterest } from "react-icons/fa";
import { CartItem, IProduct } from "@/constants/interfaces";
import useCartStore from "@/store/cartStore";
import toast from "react-hot-toast";

interface IProps {
  product: IProduct; // Pass the entire product object
  // addToCart: (product: CartItem) => void;
}
export default function ImageDisplay({ product }: IProps) {
  const [mainImage, setMainImage] = useState(product.image[0].asset.url);
  const { addToCart, updateQuantity, cart } = useCartStore((state) => state);
  const existingItem = cart.find((cartItem) => cartItem._id === product._id);
  const [quantity, setQuantity] = useState(existingItem?.quantity || 1);

  const handleAddToCart = (product: IProduct) => {
    const firstImage = product.image?.[0] || { asset: { url: "" } }; // Provide a fallback for safety

    if (existingItem) {
      toast.error("Product already in cart");
    } else {
      // Add the item to the cart
      const cartItem: CartItem = {
        _id: product._id,
        name: product.name,
        price: product.price,
        quantity,
        image: firstImage,
      };
      addToCart(cartItem);
      toast.success("Product added to cart");
    }
  };
  const handleQuantityChange = (type: "increment" | "decrement") => {
    const newQuantity =
      type === "increment" ? quantity + 1 : Math.max(quantity - 1, 1);

    if (newQuantity !== quantity) {
      // Only update the cart and show the toast if the quantity changes
      if (existingItem) {
        updateQuantity(product._id, newQuantity);
        toast.success("Quantity updated");
      }
      setQuantity(newQuantity);
    }
  };
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Product Image Section */}
      <div>
        <Image
          src={mainImage}
          alt={product.name}
          width={500}
          height={400}
          className="rounded-lg max-h-2/3 max-w-2/3  object-cover"
        />
        {/* Thumbnails */}
        <div className="flex gap-4 mt-4">
          {product.image.map((img, index) => (
            <Image
              key={index}
              src={img.asset.url}
              alt={`Thumbnail ${index + 1}`}
              width={100}
              height={100}
              className={`w-16 h-16 rounded-lg object-cover border ${
                mainImage === img.asset.url ? "border-green-500" : ""
              } hover:border-green-500 cursor-pointer`}
              onClick={() => setMainImage(img.asset.url)}
            />
          ))}
        </div>
      </div>

      {/* Product Details Section */}
      <div>
        <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
        <p className="text-green-600 font-semibold">
          {product.isOutOfStock ? "Out of Stock" : "In Stock"}
        </p>
        <div className="flex items-center gap-2 mt-2">
          <span className="text-yellow-500">⭐⭐⭐⭐⭐</span>
          <p className="text-gray-600 text-sm">
            {product.review?.length} Reviews
          </p>
        </div>

        {/* Price */}
        <div className="flex items-center gap-4 my-6">
          <p className="text-green-600 text-2xl font-semibold">
            ${product.price.toFixed(2)}
          </p>
          {product.originalPrice && (
            <p className="text-gray-500 line-through">
              ${product.originalPrice.toFixed(2)}
            </p>
          )}
          {product.discount && (
            <p className="text-red-500 font-bold">{product.discount}% OFF</p>
          )}
        </div>

        <p className="text-gray-700 mb-6">{product.description}</p>

        {/* Add to Cart */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <button
              onClick={() => handleQuantityChange("decrement")}
              className="px-2 py-1 bg-gray-200 rounded-lg"
            >
              -
            </button>
            <span className="px-4 py-1 border">{quantity}</span>
            <button
              onClick={() => handleQuantityChange("increment")}
              className="px-2 py-1 bg-gray-200 rounded-lg"
            >
              +
            </button>
          </div>
          <button
            onClick={() => handleAddToCart(product)}
            className="bg-green-500 text-white px-6 py-2 rounded-lg flex items-center gap-2 hover:bg-green-600"
          >
            <FiShoppingCart />
            Add to Cart
          </button>
          <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200">
            <FiHeart />
          </button>
        </div>

        {/* Social Share */}
        <div className="mt-4">
          <p className="text-sm text-gray-500">Share item:</p>
          <div className="flex items-center gap-4 mt-2">
            <FaFacebook className="text-blue-500 cursor-pointer" />
            <FaTwitter className="text-blue-400 cursor-pointer" />
            <FaWhatsapp className="text-green-500 cursor-pointer" />
            <FaPinterest className="text-red-500 cursor-pointer" />
          </div>
        </div>
      </div>
    </div>
  );
}
