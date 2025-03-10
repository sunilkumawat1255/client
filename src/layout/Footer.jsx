import React from "react";
import {
  FaFacebook,
  FaInstagram,
  FaGithub,
  FaTelegram,
} from "react-icons/fa";
import { LuPhoneCall } from "react-icons/lu";
import { MdEmail } from "react-icons/md";
import { FaLocationDot } from "react-icons/fa6";

export const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white py-12">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Contact Info */}
          <div className="bg-gray-800 p-6 rounded-2xl shadow-lg transform hover:scale-105 transition duration-300">
            <h1 className="text-2xl font-bold mb-4 text-blue-400">Contact Info</h1>
            <p className="flex items-center mb-3 text-gray-300">
              <LuPhoneCall className="mr-3 text-blue-400 text-lg" />
              +911234567890
            </p>
            <p className="flex items-center mb-3 text-gray-300">
              <MdEmail className="mr-3 text-blue-400 text-lg" />
              FruitShop@gmail.com
            </p>
            <p className="flex items-center mb-3 text-gray-300">
              <FaLocationDot className="mr-3 text-blue-400 text-lg" />
              Rajasthan, India - 332001
            </p>
          </div>

          {/* Quick Links */}
          <div className="bg-gray-800 p-6 rounded-2xl shadow-lg transform hover:scale-105 transition duration-300">
            <h1 className="text-2xl font-bold mb-4 text-blue-400">Quick Links</h1>
            <ul>
              {[
                { label: "Home", link: "/" },
                { label: "Contact", link: "/contact" },
                { label: "Skills", link: "/skills" },
                { label: "Blogs", link: "/blogs" },
              ].map((item, index) => (
                <li key={index} className="mb-3">
                  <a
                    href={item.link}
                    className="flex items-center text-gray-300 hover:text-blue-400 transition duration-300"
                  >
                    <span className="mr-2">➡</span> {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Media Links */}
          <div className="bg-gray-800 p-6 rounded-2xl shadow-lg transform hover:scale-105 transition duration-300">
            <h1 className="text-2xl font-bold mb-4 text-blue-400">Media Links</h1>
            <ul>
              {[
                { label: "Facebook", icon: <FaFacebook />, link: "https://www.facebook.com/your-username" },
                { label: "Instagram", icon: <FaInstagram />, link: "https://www.instagram.com/your-username" },
                { label: "GitHub", icon: <FaGithub />, link: "https://github.com/sunilkumawat1255" },
                { label: "Telegram", icon: <FaTelegram />, link: "https://t.me/@MR_prajapat12" },
              ].map((item, index) => (
                <li key={index} className="mb-3">
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-gray-300 hover:text-blue-400 transition duration-300"
                  >
                    <span className="mr-3 text-lg">{item.icon}</span> {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="mt-10 text-center text-gray-400 border-t border-gray-700 pt-6">
          <span className="block text-sm">© 2022-2025 BCA Final Year Project</span>
          <span className="block text-sm">BUILT BY SUNIL & PINTU</span>
        </div>
      </div>
    </footer>
  );
};
