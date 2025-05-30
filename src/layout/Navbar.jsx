import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaCartArrowDown } from "react-icons/fa";
import { IoMdMenu, IoMdClose } from "react-icons/io";
import "./nav.css";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const navigate = useNavigate();

  const updateCartCount = () => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartCount(storedCart.length);
  };

  useEffect(() => {
    updateCartCount();

    // Listen for cart updates from other components
    window.addEventListener("cartUpdated", updateCartCount);

    // Cleanup on unmount
    return () => {
      window.removeEventListener("cartUpdated", updateCartCount);
    };
  }, []);

  const isLoggedIn = !!localStorage.getItem("Ecomtoken");
  const userEmail = localStorage.getItem("EcomEmail");

  const handleLogout = () => {
    localStorage.removeItem("Ecomtoken");
    localStorage.removeItem("EcomUser");
    localStorage.removeItem("EcomUserId");
    localStorage.removeItem("EcomEmail");
    localStorage.removeItem("cart");
    navigate("/login");
  };

  return (
    <header className="bg-white shadow-md fixed top-0 left-0 w-full z-50 px-6 py-3 flex items-center justify-between">
      <Link to="/" className="text-2xl font-bold text-green-600 flex items-center gap-2">
        🍏 FruitsShop
      </Link>

      <button
        className="md:hidden text-gray-800 text-2xl"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        {isMenuOpen ? <IoMdClose /> : <IoMdMenu />}
      </button>

      <nav
        className={`absolute md:static top-16 left-0 w-full md:w-auto bg-white md:bg-transparent md:flex md:items-center space-y-4 md:space-y-0 md:space-x-6 p-6 md:p-0 shadow-md md:shadow-none transition-all duration-300 ease-in-out ${isMenuOpen ? "block" : "hidden"}`}
      >
        <ul className="flex flex-col md:flex-row md:space-x-6 text-gray-700">
          <li><Link to="/" className="hover:text-green-500 transition">Home</Link></li>
          <li><Link to="/products" className="hover:text-green-500 transition">Products</Link></li>
          <li><Link to="/contact" className="hover:text-green-500 transition">Contact</Link></li>
        </ul>

        {isLoggedIn ? (
          <div className="flex flex-col md:flex-row md:items-center md:space-x-4 space-y-4 md:space-y-0">
            <Link to="/profile" className="relative w-10 h-10 bg-green-500 text-white flex items-center justify-center rounded-full text-lg">
              {userEmail ? userEmail.charAt(0).toUpperCase() : "U"}
            </Link>
            <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition">Logout</button>
          </div>
        ) : (
          <Link to="/login" className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition">Login</Link>
        )}
      </nav>

      <Link to="/cart" className="fixed bottom-4 right-4 bg-white p-4 rounded-full shadow-lg z-50 transition hover:scale-105">
        <div className="relative">
          <FaCartArrowDown className="text-xl text-gray-800" />
          <span className="absolute -top-2 -right-2 w-5 h-5 flex items-center justify-center bg-red-500 text-white rounded-full text-xs font-bold">
            {cartCount}
          </span>
        </div>
      </Link>
    </header>
  );
};

export default Navbar;
