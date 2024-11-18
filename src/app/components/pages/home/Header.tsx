// components/Header.tsx
import React from "react";
import { FiMenu, FiSearch, FiUser, FiShoppingCart } from "react-icons/fi";

const Header = () => {
  return (
    <header className="flex items-center justify-between p-4 bg-white shadow-md">
      <div className="flex items-center space-x-4">
        <FiMenu className="text-2xl" />
        <h1 className="text-2xl font-bold text-green-600">Agro-Splash</h1>
      </div>
      <div className="flex items-center space-x-4 w-full max-w-xl">
        <select className="border rounded px-3 py-1">
          <option>All Categories</option>
          {/* Add more categories as needed */}
        </select>
        <div className="relative w-full">
          <input
            type="text"
            placeholder="Search for more than 20,000 products"
            className="w-full border rounded px-3 py-1 pl-10"
          />
          <FiSearch className="absolute top-2 left-3 text-gray-400" />
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <FiUser className="text-2xl" />
        <FiShoppingCart className="text-2xl" />
      </div>
    </header>
  );
};

export default Header;
