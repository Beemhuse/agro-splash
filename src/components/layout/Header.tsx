"use client";
// components/Header.tsx
import React, { useState } from "react";
import { FiMenu, FiSearch, FiUser, FiShoppingCart, FiX } from "react-icons/fi";
import anime from "animejs";
import Link from "next/link";
import useCartStore from "@/store/cartStore";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const cart = useCartStore((state) => state.cart);
  const cartQuantity = cart?.reduce((total, item) => total + item.quantity, 0);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);

    // Animate the menu opening
    anime({
      targets: ".menu-items",
      opacity: [0, 1],
      translateY: [-20, 0],
      duration: 500,
      easing: "easeOutExpo",
    });
  };

  return (
    <header className="flex flex-wrap items-center justify-between p-4 bg-white shadow-md">
      {/* Logo and Menu */}
      <div className="flex items-center space-x-4 w-full sm:w-auto">
        <FiMenu
          className="text-2xl cursor-pointer sm:hidden"
          onClick={toggleMenu}
        />
        <h1 className="text-2xl font-bold text-green-600">Agro-Splash</h1>
      </div>

      {/* Navbar Links */}
      <nav className="hidden sm:flex items-center space-x-6">
        <Link href="/" className="text-gray-700 hover:text-green-600">
          Home
        </Link>
        <Link
          href="/market-place"
          className="text-gray-700 hover:text-green-600"
        >
          Market Place
        </Link>
        <Link href="/about" className="text-gray-700 hover:text-green-600">
          About
        </Link>
        <Link href="/contact" className="text-gray-700 hover:text-green-600">
          Contact Us
        </Link>
      </nav>

      {/* Search Bar */}
      <div className="flex items-center space-x-4 w-full sm:w-auto max-w-full mt-4 sm:mt-0">
        <div className="relative w-full sm:w-auto">
          <input
            type="text"
            placeholder="Search for more than 20,000 products"
            className="w-full sm:max-w-sm border rounded px-3 py-1 pl-10"
          />
          <FiSearch className="absolute top-2 left-3 text-gray-400" />
        </div>
      </div>

      {/* User and Cart */}
      <div className="flex items-center space-x-4 mt-4 sm:mt-0">
        <FiUser className="text-2xl cursor-pointer" />
        <div
          className="relative cursor-pointer"
          onClick={() => (window.location.href = "/cart")}
        >
          <FiShoppingCart className="text-2xl" />
          {cartQuantity > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
              {cartQuantity}
            </span>
          )}
        </div>{" "}
      </div>

      {/* Hamburger Menu (Mobile) */}
      {isMenuOpen && (
        <div
          className="menu-items absolute top-16 left-0 w-full bg-white shadow-md z-50 sm:hidden"
          onClick={() => setIsMenuOpen(false)} // Close menu on click
        >
          <div className="flex justify-end p-4">
            <FiX className="text-2xl cursor-pointer" onClick={toggleMenu} />
          </div>
          <ul className="flex flex-col items-center space-y-4 pb-4">
            <li>
              <a
                href="#home"
                className="text-gray-700 hover:text-green-600 text-lg"
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="#about"
                className="text-gray-700 hover:text-green-600 text-lg"
              >
                About
              </a>
            </li>
            <li>
              <a
                href="#contact"
                className="text-gray-700 hover:text-green-600 text-lg"
              >
                Contact Us
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
};

export default Header;
