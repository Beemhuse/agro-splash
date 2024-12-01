'use client';

import React, { useEffect, useState } from 'react';
// import Modal from './Modal'; // Import the reusable modal
import Image from 'next/image';
import { FiMinus, FiPlus } from 'react-icons/fi';
import { FiFacebook, FiTwitter,  FiHeart } from 'react-icons/fi';
import Modal from '../reusables/Modal';
import { CartItem, IProduct } from '@/constants/interfaces';
import useCartStore from '@/store/cartStore';
import toast from 'react-hot-toast';
import { addFavourite, isProductFavourited, removeFavourite } from '@/utils/toggleFavourites';
import { Cookies } from "react-cookie";

// const Coo
interface ProductDetailsModalProps {
  product: IProduct;
  isOpen: boolean;
  onClose: () => void;
}

const ProductDetailsModal = ({ product, isOpen, onClose }: ProductDetailsModalProps) => {
  const cookies = new Cookies()
console.log(product)
  const userId = cookies.get("agro-user")
  const [isFavourite, setIsFavourite] = useState(null);


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
  const handleToggleFavourite = async () => {
    const isFavourited = await isProductFavourited(product._id, userId.id);
  console.log(isFavourited)
    if (isFavourited) {
      await removeFavourite(product._id, userId.id);
      toast.success("Removed from Favourites");
    } else {
      await addFavourite(product._id, userId.id);
      toast.success("Added to Favourites");
    }
  };

useEffect(()=>{
  async function isfavProd(){

   const favt =  await isProductFavourited(product._id, userId.id)
    setIsFavourite(favt)
  }
  isfavProd()
}, [product._id, userId.id])
console.log(isFavourite)
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Product Images */}
        <div>
          <Image
            src={product?.image[0]?.asset.url}
            alt={product.name}
            width={500}
            height={500}
            className="w-full h-auto rounded-lg"
          />
          {/* <div className="flex mt-4 space-x-2">
            {product.image.map((img: string, index: number) => (
              <div key={index} className="w-16 h-16 border rounded-md">
                <Image src={img} alt={`Image ${index}`} width={64} height={64} />
              </div>
            ))}
          </div> */}
        </div>

        {/* Product Details */}
        <div>
          <h1 className="text-2xl font-bold">{product.name}</h1>
          <div className="flex items-center space-x-4 mt-2">
            <p className="text-green-600 font-bold text-lg">${product.price}</p>
            {product.originalPrice && (
              <p className="text-sm text-gray-500 line-through">
                ${product.originalPrice}
              </p>
            )}
            {product.discount && (
              <span className="text-sm text-red-600 bg-red-100 px-2 py-1 rounded">
                {product.discount}% Off
              </span>
            )}
          </div>
          <p className="mt-4 text-gray-600">{product.description}</p>

          {/* Quantity and Add to Cart */}
          <div className="mt-6 flex items-center space-x-4">
            <div className="flex items-center border rounded">
              <button
                onClick={() => handleQuantityChange('decrement')}
                className="p-2"
              >
                <FiMinus />
              </button>
              <span className="px-4">{quantity}</span>
              <button
                onClick={() => handleQuantityChange('increment')}
                className="p-2"
              >
                <FiPlus />
              </button>
            </div>
            <button onClick={()=>handleAddToCart(product)} className="bg-green-600 text-white px-6 py-2 rounded-lg">
              Add to Cart
            </button>
            <button
              onClick={handleToggleFavourite}
              className={`p-3 rounded-lg ${
                isFavourite ? "text-red-600" : "bg-gray-100 text-gray-600"
              }`}
            >
              <FiHeart />
            </button>
          </div>

          {/* Share Options */}
          <div className="mt-6">
            <h4 className="font-bold">Share item:</h4>
            <div className="flex items-center space-x-4 mt-2">
              <FiFacebook className="text-blue-600 cursor-pointer" />
              <FiTwitter className="text-blue-400 cursor-pointer" />
            </div>
          </div>

          {/* Additional Info */}
          <div className="mt-6">
            <p>
              <strong>Category:</strong> {product.category.name}
            </p>
            {/* <p>
              <strong>Tags:</strong> {product.tags?.join(', ')}
            </p> */}
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ProductDetailsModal;
