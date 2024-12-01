"use client";

import { useAuthStore } from "@/store/authStore";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { FaTachometerAlt, FaHistory, FaHeart, FaShoppingCart, FaCog, FaSignOutAlt } from "react-icons/fa";

const Sidebar = () => {
  const pathname = usePathname();
  const [isModalOpen, setIsModalOpen] = useState(false);
const logout = useAuthStore(state=>state.logout)
  const handleLogout = () => {
    setIsModalOpen(false);
    logout()
  };
  const navigation = [
    { name: "Dashboard", path: "/u", icon: <FaTachometerAlt /> },
    { name: "Order History", path: "/u/orders", icon: <FaHistory /> },
    { name: "Wishlist", path: "/u/wishlist", icon: <FaHeart /> },
    { name: "Shopping Cart", path: "/u/cart", icon: <FaShoppingCart /> },
    { name: "Settings", path: "/u/settings", icon: <FaCog /> },
    { name: "Log-out", path: "", icon: <FaSignOutAlt /> },
  ];

  return (
    <aside className="w-64 bg-white shadow-lg">
      <nav className="p-4">
        <ul className="space-y-4">
          {navigation.map((item, index) => (
            <li key={index}>
              {
                item.path === "" ? 
                <button
                onClick={() => setIsModalOpen(true)}
                className="flex items-center gap-1 ml-4">
                  <span className="mr-3 text-lg">{item.icon}</span>
                  Logout
                </button>
                :

              <Link
                href={item.path}
                className={`flex items-center px-4 py-2 rounded ${
                  pathname === item.path
                    ? "bg-green-100 text-green-600"
                    : "text-gray-700 hover:bg-gray-200"
                }`}
              >
                <span className="mr-3 text-lg">{item.icon}</span>
                {item.name}
              </Link>
              }
            </li>
          ))}
        </ul>
      </nav>
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 shadow-lg max-w-sm w-full">
            <h2 className="text-xl font-semibold mb-4">Confirm Logout</h2>
            <p className="text-gray-600 mb-6">
              Are you sure you want to log out? This action cannot be undone.
            </p>
            <div className="flex justify-end gap-4">
              <button
                className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400"
                onClick={() => setIsModalOpen(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </aside>
  );
};

export default Sidebar;
