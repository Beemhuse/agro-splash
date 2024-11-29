"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaTachometerAlt, FaHistory, FaHeart, FaShoppingCart, FaCog, FaSignOutAlt } from "react-icons/fa";

const Sidebar = () => {
  const pathname = usePathname();

  const navigation = [
    { name: "Dashboard", path: "/u", icon: <FaTachometerAlt /> },
    { name: "Order History", path: "/u/orders", icon: <FaHistory /> },
    { name: "Wishlist", path: "/u/wishlist", icon: <FaHeart /> },
    { name: "Shopping Cart", path: "/u/cart", icon: <FaShoppingCart /> },
    { name: "Settings", path: "/u/settings", icon: <FaCog /> },
    { name: "Log-out", path: "/logout", icon: <FaSignOutAlt /> },
  ];

  return (
    <aside className="w-64 bg-white shadow-lg">
      <nav className="p-4">
        <ul className="space-y-4">
          {navigation.map((item, index) => (
            <li key={index}>
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
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
