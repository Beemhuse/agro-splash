"use client";
import React, {  useState } from "react";
import Link from "next/link";
import {
  FiMenu,
  FiSearch,
  FiUser,
  FiShoppingCart,
  FiX,
  FiLogOut,
  FiHome,
  FiLogIn,
} from "react-icons/fi";
import anime from "animejs";
import useCartStore from "@/store/cartStore";
import useModal from "@/hooks/useModal";
import { useAuthStore } from "@/store/authStore";
import ShoppingCartModal from "../modals/ShoppingCartModal";
import Image from "next/image";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isOpen, openModal, closeModal } = useModal();
  const cart = useCartStore((state) => state.cart);
  const logout = useAuthStore((state) => state.logout);
  const cartQuantity = cart?.reduce((total, item) => total + item.quantity, 0);
  const token = useAuthStore((state) => state.token); // Assuming you have a token stored in authStore

 
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);

    anime({
      targets: ".menu-items",
      opacity: [0, 1],
      translateY: [-20, 0],
      duration: 500,
      easing: "easeOutExpo",
    });
  };

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const closeDropdown = () => {
    setIsDropdownOpen(false);
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
        <Link href="/courses" className="text-gray-700 hover:text-green-600">
          Courses
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
      <div className="flex items-center space-x-4 mt-4 sm:mt-0 relative">
        {token ? (
          <Image
            src="/next.svg"
            alt="User Avatar"
            width={32}
            height={32}
            className="rounded-full cursor-pointer"
            onClick={toggleDropdown}
          />
        ) : (
          <FiUser
            className="text-2xl cursor-pointer"
            onClick={toggleDropdown}
          />
        )}
        {isDropdownOpen && (
          <div className="absolute right-5 mt-2 top-10 w-48 bg-white rounded-md shadow-lg z-10">
            <ul className="py-2">
              {!token ? (
                <li>
                  <Link
                    href="/auth/login"
                    className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={closeDropdown}
                  >
                    <FiLogIn className="mr-2 text-lg" />
                    Login / Register
                  </Link>
                </li>
              ) : (
                <>
                  <li>
                    <Link
                      href="/u"
                      className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={closeDropdown}
                    >
                      <FiHome className="mr-2 text-lg" />
                      Dashboard
                    </Link>
                  </li>
                  <li>
                    <button
                      onClick={() => {
                        closeDropdown();
                        logout();
                      }}
                      className="w-full text-left flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      <FiLogOut className="mr-2 text-lg text-red-500" />
                      Logout
                    </button>
                  </li>
                </>
              )}
            </ul>
          </div>
        )}
        <div className="relative cursor-pointer" onClick={openModal}>
          <FiShoppingCart className="text-2xl" />
          {cartQuantity > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
              {cartQuantity}
            </span>
          )}
        </div>
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
            <Link href="/" className="text-gray-700 hover:text-green-600">
              Home
            </Link>
            <Link
              href="/market-place"
              className="text-gray-700 hover:text-green-600"
            >
              Market Place
            </Link>
            <Link href="/courses" className="text-gray-700 hover:text-green-600">
              Courses
            </Link>
            <Link href="/about" className="text-gray-700 hover:text-green-600">
              About
            </Link>
            <Link
              href="/contact"
              className="text-gray-700 hover:text-green-600"
            >
              Contact Us
            </Link>
          </ul>
        </div>
      )}

      <ShoppingCartModal isOpen={isOpen} onClose={closeModal} cartItems={cart} />
    </header>
  );
};

export default Header;
