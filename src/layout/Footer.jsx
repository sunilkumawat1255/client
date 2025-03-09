import React from "react";
import {
  FaFacebook,
  FaInstagram,
  FaTwitter,
  FaGithub,
  FaTelegram,
} from "react-icons/fa";
import { LuPhoneCall } from "react-icons/lu";
import { MdEmail } from "react-icons/md";
import { FaLocationDot } from "react-icons/fa6";

export const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Contact Info */}
          <div className="bg-gray-900 p-6 rounded-lg shadow-lg">
            <h1 className="text-xl font-bold mb-4">Contact Info</h1>
            <p className="flex items-center mb-2">
              <LuPhoneCall className="mr-2 text-blue-400" />
              +911234567890
            </p>
            <p className="flex items-center mb-2">
              <MdEmail className="mr-2 text-blue-400" />
              FruitShop@gmail.com
            </p>
            <p className="flex items-center mb-2">
              <FaLocationDot className="mr-2 text-blue-400" />
              Rajasthan, India - 332001
            </p>
          </div>

          {/* Quick Links */}
          <div className="bg-gray-900 p-6 rounded-lg shadow-lg">
            <h1 className="text-xl font-bold mb-4">Quick Links</h1>
            <ul>
              <li className="mb-2">
                <a href="/" className="flex items-center hover:text-blue-400">
                  <span className="mr-2">➡</span> Home
                </a>
              </li>
              <li className="mb-2">
                <a
                  href="/contact"
                  className="flex items-center hover:text-blue-400"
                >
                  <span className="mr-2">➡</span> Contact
                </a>
              </li>
              <li className="mb-2">
                <a
                  href="/skills"
                  className="flex items-center hover:text-blue-400"
                >
                  <span className="mr-2">➡</span> Skills
                </a>
              </li>
              <li className="mb-2">
                <a
                  href="/blogs"
                  className="flex items-center hover:text-blue-400"
                >
                  <span className="mr-2">➡</span> Blogs
                </a>
              </li>
            </ul>
          </div>

          {/* Social Media Links */}
          <div className="bg-gray-900 p-6 rounded-lg shadow-lg">
            <h1 className="text-xl font-bold mb-4">Media Links</h1>
            <ul>
              <li className="mb-2">
                <a
                  href="https://www.facebook.com/your-username"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center hover:text-blue-400"
                >
                  <FaFacebook className="mr-2" /> Facebook
                </a>
              </li>
              <li className="mb-2">
                <a
                  href="https://www.instagram.com/your-username"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center hover:text-blue-400"
                >
                  <FaInstagram className="mr-2" /> Instagram
                </a>
              </li>
              <li className="mb-2">
                <a
                  href="https://github.com/sunilkumawat1255"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center hover:text-blue-400"
                >
                  <FaGithub className="mr-2" /> GitHub
                </a>
              </li>
              <li className="mb-2">
                <a
                  href="https://t.me/@MR_prajapat12"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center hover:text-blue-400"
                >
                  <FaTelegram className="mr-2" /> Telegram
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="mt-8 text-center">
          <span className="block text-sm">
            © 2022-2025 BCA Final Year Project
          </span>
          <span className="block text-sm">BUILT BY SUNIL & PINTU</span>
        </div>
      </div>
    </footer>
  );
};
