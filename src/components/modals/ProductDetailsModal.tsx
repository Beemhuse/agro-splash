'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { FiMinus, FiPlus, FiFacebook, FiTwitter, FiHeart, FiShoppingCart } from 'react-icons/fi';
import Modal from '../reusables/Modal';
import { CartItem, IProduct } from '@/constants/interfaces';
import useCartStore from '@/store/cartStore';
import toast from 'react-hot-toast';
import { addFavourite, isProductFavourited, removeFavourite } from '@/utils/toggleFavourites';
import { Cookies } from 'react-cookie';

interface ProductDetailsModalProps {
  product: IProduct;
  isOpen: boolean;
  onClose: () => void;
}

const ProductDetailsModal = ({ product, isOpen, onClose }: ProductDetailsModalProps) => {
  const cookies = new Cookies();
  const userId = cookies.get('agro-user');
  const [isFavourite, setIsFavourite] = useState<boolean | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(
    product?.image[0]?.asset.url || null
  );

  const { addToCart, updateQuantity, cart } = useCartStore((state) => state);
  const existingItem = cart.find((cartItem) => cartItem._id === product._id);
  const [quantity, setQuantity] = useState(existingItem?.quantity || 1);

  const handleAddToCart = (product: IProduct) => {
    const firstImage = product.image?.[0] || { asset: { url: '' } }; // Provide a fallback for safety

    if (existingItem) {
      toast.error('Product already in cart');
    } else {
      const cartItem: CartItem = {
        _id: product._id,
        name: product.name,
        price: product.price,
        quantity,
        image: firstImage,
      };
      addToCart(cartItem);
      toast.success('Product added to cart');
    }
  };

  const handleQuantityChange = (type: 'increment' | 'decrement') => {
    const newQuantity = type === 'increment' ? quantity + 1 : Math.max(quantity - 1, 1);

    if (newQuantity !== quantity) {
      if (existingItem) {
        updateQuantity(product._id, newQuantity);
        toast.success('Quantity updated');
      }
      setQuantity(newQuantity);
    }
  };

  const handleToggleFavourite = async () => {
    const isFavourited = await isProductFavourited(product._id, userId.id);
    if (isFavourited) {
      await removeFavourite(product._id, userId.id);
      toast.success('Removed from Favourites');
    } else {
      await addFavourite(product._id, userId.id);
      toast.success('Added to Favourites');
    }
  };

  useEffect(() => {
    async function isFavProd() {
      const favt = await isProductFavourited(product._id, userId.id);
      setIsFavourite(favt);
    }
    isFavProd();
  }, [product._id, userId.id]);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Product Images */}
        <div className="flex col-span-2" >
          
{/* <div className=""></div> */}
          <div className="flex flex-col gap-3 overflow-y-auto w-[100px] mt-4">
            {product.image?.map((img, idx) => (
              <Image
                key={idx}
                src={img.asset.url}
                alt={`Thumbnail ${idx + 1}`}
                width={80}
                height={80}
                className={`w-20 h-20 rounded cursor-pointer ${
                  selectedImage === img.asset.url ? 'border-2 border-green-600' : ''
                }`}
                onClick={() => setSelectedImage(img.asset.url)}
              />
            ))}
          </div>
          <Image
            src={selectedImage || ''}
            alt={product.name}
            width={500}
            height={500}
            className="w-2/3 h-full object-cover m-auto rounded-lg"
          />
        </div>

        {/* Product Details */}
        <div>
          <h1 className="text-2xl font-bold">{product.name}</h1>
          <div className="flex items-center space-x-4 mt-2">
            <p className="text-green-600 font-bold text-lg">${product.price}</p>
            {product.originalPrice && (
              <p className="text-sm text-gray-500 line-through">${product.originalPrice}</p>
            )}
            {product.discount && (
              <span className="text-sm text-red-600 bg-red-100 px-2 py-1 rounded">
                {product.discount}% Off
              </span>
            )}
          </div>
          <p className="mt-4 text-gray-600">{product.description}</p>

          {/* Quantity and Add to Cart */}
          <div className="mt-6 flex  flex-col items-start gap-4">
            <div className="flex items-center justify-start border rounded">
              <button onClick={() => handleQuantityChange('decrement')} className="p-2">
                <FiMinus />
              </button>
              <span className="px-4">{quantity}</span>
              <button onClick={() => handleQuantityChange('increment')} className="p-2">
                <FiPlus />
              </button>
            </div>
            <div className="flex items-center gap-4">

            <button
              onClick={() => handleAddToCart(product)}
              className="bg-green-600 flex items-center justify-center gap-4 w-full text-white px-6 py-2 rounded-lg"
            >
              <FiShoppingCart />
              Add to Cart
            </button>
            <button
              onClick={handleToggleFavourite}
              className={`p-3 rounded-lg ${
                isFavourite ? 'text-red-600' : 'bg-gray-100 text-gray-600'
              }`}
            >
              <FiHeart />
            </button>
            </div>
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
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ProductDetailsModal;
