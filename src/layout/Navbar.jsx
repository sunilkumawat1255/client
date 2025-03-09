import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaCartArrowDown } from "react-icons/fa";
import "./nav.css";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartCount(storedCart.length);
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
    <header className="header">
      <h1 className="logo">
        <span className="logo-icon"></span>
        FruitsShop
      </h1>

      <div className="hamburger" onClick={toggleMenu}>
        <svg
          className="hamburger-svg"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M4 6h16M4 12h16m-7 6h7" />
        </svg>
      </div>

      <nav className={`nav ${isMenuOpen ? "show" : ""}`}>
        <ul className="nav-list-ul">
          <li className="nav-item">
            <Link to="/">Home</Link>
          </li>
          <li className="nav-item">
            <Link to="/products">Product</Link>
          </li>
          <li className="nav-item">
            <Link to="/contact">Contact</Link>
          </li>

          {isLoggedIn ? (
            <ul className="navbar-nav">
              {/* Display the user's email with truncation and avatar circle */}
              <li className="nav-item flex items-center space-x-2">
                <span className="text-neutral-600 font-semibold text-sm">
                  {userEmail && userEmail.length > 18
                    ? `${userEmail.slice(0, 18)}..`
                    : userEmail}
                </span>
                <Link to="/profile">
                  <div className="w-8 h-8 bg-blue-500 text-white flex items-center justify-center rounded-full">
                    {userEmail ? userEmail.charAt(0).toUpperCase() : "U"}
                  </div>
                </Link>
              </li>
            </ul>
          ) : (
            <ul className="navbar-nav">
              {/* Login button styled in blue */}
              <li className="nav-item">
                <Link
                  to="/login"
                  className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-200"
                >
                  Login
                </Link>
              </li>
            </ul>
          )}
        </ul>
        {isMenuOpen && (
          <div className="close-button" onClick={toggleMenu}>
            <svg
              className="close-svg"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
        )}
      </nav>
      {/* cart button floating  */}
      <Link
        to="/cart"
        className="fixed bottom-4 right-4 bg-white p-4 rounded-full shadow-lg z-50 transition-transform hover:scale-105"
      >
        <div className="relative">
          <FaCartArrowDown className="text-xl text-gray-800" />
          <span className="absolute -top-2 -right-2 w-4 h-4 flex items-center justify-center bg-red-500 text-white rounded-full text-xs">
            {cartCount}
          </span>
        </div>
      </Link>
    </header>
  );
};

export default Navbar;

