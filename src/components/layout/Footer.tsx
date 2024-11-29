'use client'
import React from "react";
import Image from "next/image";
import useAnimeOnView from "@/hooks/useAnimeOnView";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaPhone     } from "react-icons/fa6";
import { IoLocationSharp } from "react-icons/io5";
import { IoIosMail } from "react-icons/io";

const Footer = () => {
  const ref = useAnimeOnView({
    opacity: [0, 1],
    translateY: [-50, 0],
    duration: 1000,
    easing: "easeOutQuad",
  });
  return (
    <footer ref={ref} className="bg-gray-900 mt-auto text-white">
      <div className="container mx-auto px-6 py-10">
        <div className="flex flex-col md:flex-row md:justify-between">
          {/* Logo and About Section */}
          <div className="mb-8 md:mb-0 md:w-1/3">
            <Image
              src="/logo.png"
              alt="Agro-Splash Logo"
              width={120}
              height={120}
              className="mb-4"
            />
            <p className="text-sm text-gray-400">
              Agro-Splash is your gateway to modern farming and authentic African agro-products. We connect farmers, buyers, and innovators for a sustainable future.
            </p>
          </div>

          {/* Navigation Links */}
          <div className="mb-8 md:mb-0 md:w-1/3">
            <h3 className="text-lg font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="/about" className="text-gray-400 hover:text-white">
                  About Us
                </a>
              </li>
              <li>
                <a href="/services" className="text-gray-400 hover:text-white">
                  Services
                </a>
              </li>
              <li>
                <a href="/marketplace" className="text-gray-400 hover:text-white">
                  Marketplace
                </a>
              </li>
              <li>
                <a href="/contact" className="text-gray-400 hover:text-white">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="mb-8 md:mb-0 md:w-1/3">
            <h3 className="text-lg font-bold mb-4">Contact Us</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <span className="flex items-center gap-2"><IoLocationSharp /> Address</span> 123 Agro Road, Lagos, Nigeria
              </li>
              <li>
                <span className="flex items-center gap-2"><FaPhone  /> Phone</span> +234 800 123 4567
              </li>
              <li>
                <span className="flex items-center gap-2"><IoIosMail /> Email</span>{" "}
                <a href="mailto:info@agro-splash.com" className="hover:underline">
                  info@agro-splash.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Social Media & Copyright */}
        <div className="mt-10 border-t border-gray-700 pt-6 flex flex-col md:flex-row justify-between items-center">
          {/* Social Media Links */}
          <div className="flex space-x-4">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-400"
            >
                          <FaFacebook />

            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-400"
            >
                         <FaTwitter />

            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-400"
            >
              <FaInstagram/>
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-400"
            >
              
            <FaLinkedin  />
            </a>
          </div>

          {/* Copyright */}
          <p className="text-sm text-gray-400 mt-6 md:mt-0">
            © {new Date().getFullYear()} Agro-Splash. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
