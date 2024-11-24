import {create} from "zustand";
import { persist } from "zustand/middleware";

export interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface CartState {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
  clearCart: () => void;
}

const useCartStore = create(
  persist<CartState>(
    (set) => ({
      cart: [],

      addToCart: (item) =>
        set((state) => {
          const existingItem = state.cart.find(
            (cartItem) => cartItem.id === item.id
          );

          if (existingItem) {
            // If item already exists, update the quantity
            return {
              cart: state.cart.map((cartItem) =>
                cartItem.id === item.id
                  ? { ...cartItem, quantity: cartItem.quantity + item.quantity }
                  : cartItem
              ),
            };
          }

          // If item doesn't exist, add it to the cart
          return { cart: [...state.cart, item] };
        }),

      removeFromCart: (id) =>
        set((state) => ({
          cart: state.cart.filter((cartItem) => cartItem.id !== id),
        })),

      updateQuantity: (id, quantity) =>
        set((state) => ({
          cart: state.cart.map((cartItem) =>
            cartItem.id === id ? { ...cartItem, quantity } : cartItem
          ),
        })),

      clearCart: () => set({ cart: [] }),
    }),
    {
      name: "cart-storage", // Key name in localStorage
      storage: {
        getItem: (name) => {
          const item = localStorage.getItem(name);
          return item ? JSON.parse(item) : null; // Parse JSON string into object
        },
        setItem: (name, value) => {
          localStorage.setItem(name, JSON.stringify(value)); // Convert object to JSON string
        },
        removeItem: (name) => {
          localStorage.removeItem(name); // Remove the item from localStorage
        },
      },
    }
  )
);

export default useCartStore;
