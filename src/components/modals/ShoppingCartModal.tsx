"use client";
import { CartItem } from "@/constants/interfaces";
import useCartStore from "@/store/cartStore";
import Image from "next/image";
import { MdOutlineCancel } from "react-icons/md";


interface ShoppingCartModalProps {
  cartItems: CartItem[];
  isOpen: boolean;
  onClose: () => void;
}
const ShoppingCartModal = ({ isOpen, onClose, cartItems }: ShoppingCartModalProps) => {
  const removeFromCart = useCartStore(state => state.removeFromCart)
  // Calculate total price
  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex  justify-end">
      <div className="bg-white w-full sm:w-96 p-5 shadow-lg h-[100vh] flex flex-col">
        {/* Header */}
        <div className="p-4 border-b flex justify-between items-center">
          <h2 className="text-lg font-bold">
            Shopping Cart ({cartItems.length})
          </h2>
          <button onClick={onClose} className="text-gray-600 hover:text-black">
          <MdOutlineCancel />
          </button>
        </div>

        {/* Cart Items */}

        <div className="flex-1 overflow-y-auto p-4">
          {
            cartItems.length === 0 && (
              <p className="text-center text-gray-500">
                Your shopping cart is empty. Add some products to continue.
              </p>
            )
          }
          {cartItems.map((item, index) => (
            <div
              key={index}
              className="flex items-center justify-between py-4 border-b"
            >
              {/* Image */}
              <Image
                src={item.image.asset.url}
                width={500}
                height={500}
                // loading="lazy"
                priority={true}
                alt={item.name}
                className="w-16 h-16 object-cover rounded"
              />
              {/* Info */}
              <div className="flex-1 px-4">
                <h4 className="font-medium">{item.name}</h4>
                <p className="text-sm text-gray-500">
                  {item.quantity}  × ${item.price.toFixed(2)}
                </p>
              </div>
              {/* Remove Button */}
              <button
                onClick={() => removeFromCart(item._id)}
                className="text-red-500 hover:text-red-700"
              >
                <MdOutlineCancel />
              </button>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="p-4 border-t">
          {/* Total */}
          <div className="flex justify-between items-center mb-4">
            <span>{cartItems.length} Product(s)</span>
            <span className="font-bold">${totalPrice.toFixed(2)}</span>
          </div>
          {/* Action Buttons */}
          <div className="flex space-x-4">
            <button
              onClick={() => (window.location.href = "/checkout")}
              disabled={cartItems.length === 0}
              className="flex-1 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            >
              Checkout
            </button>
            <button
              onClick={() => (window.location.href = "/cart")}
              className="flex-1 py-2 bg-gray-100 text-gray-700 rounded hover:bg-gray-200"
            >
              Go To Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShoppingCartModal;
