'use client'
// components/Header.tsx
import React, { useState } from "react";
import { FiMenu, FiSearch, FiUser, FiShoppingCart, FiX } from "react-icons/fi";
import anime from "animejs";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
        <a href="#home" className="text-gray-700 hover:text-green-600">
          Home
        </a>
        <a href="#about" className="text-gray-700 hover:text-green-600">
          About
        </a>
        <a href="#contact" className="text-gray-700 hover:text-green-600">
          Contact Us
        </a>
      </nav>

      {/* Search Bar */}
      <div className="flex items-center space-x-4 w-full sm:w-auto max-w-full mt-4 sm:mt-0">
        <select className="border rounded px-3 py-1">
          <option>All Categories</option>
          {/* Add more categories */}
        </select>
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
        <FiShoppingCart className="text-2xl cursor-pointer" />
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
            <li>
              <select className="border rounded px-3 py-1">
                <option>All Categories</option>
                {/* Add more categories */}
              </select>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
};

export default Header;
