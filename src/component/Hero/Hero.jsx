import React, { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import heroBg from "../../assests/img/bg2.jpg";
import s4 from "../../assests/img/s4.png";
import s5 from "../../assests/img/s5.png";
import s2 from "../../assests/img/s2.png";
import { Menu, X } from "lucide-react";

const fruits = [
  { name: "Strawberry", image: s4 },
  { name: "Strawberry", image: s5 },
  { name: "Apple", image: s2 },
];

const Hero = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const intervalRef = useRef(null);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % fruits.length);
    }, 3000);
    return () => clearInterval(intervalRef.current);
  }, []);

  return (
    <div className="relative w-full h-auto flex flex-col items-center justify-center bg-cover bg-center py-10" style={{ backgroundImage: `url(${heroBg})` }}>
      {/* Navbar */}
      <nav className="absolute top-0 left-0 w-full bg-black bg-opacity-60 p-4 flex justify-between items-center text-white z-20">
        <h1 className="text-2xl font-bold">FruitMart</h1>
        
        <div className="hidden md:flex space-x-6">
          <a href="#" className="hover:text-green-400">Home</a>
          <a href="#" className="hover:text-green-400">Shop</a>
          <a href="#" className="hover:text-green-400">About</a>
          <a href="#" className="hover:text-green-400">Contact</a>
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>
      
      {/* Mobile Menu */}
      {menuOpen && (
        <div className="absolute top-16 left-0 w-full bg-black bg-opacity-80 text-white flex flex-col space-y-4 p-6 md:hidden">
          <a href="#" className="hover:text-green-400">Home</a>
          <a href="#" className="hover:text-green-400">Shop</a>
          <a href="#" className="hover:text-green-400">About</a>
          <a href="#" className="hover:text-green-400">Contact</a>
        </div>
      )}

      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm"></div>

      {/* Image Section */}
      <div className="relative w-full max-w-3xl mx-auto flex flex-col items-center z-10">
        <motion.img
          src={fruits[currentIndex].image}
          alt={fruits[currentIndex].name}
          className="h-[200px] w-[200px] sm:h-[250px] sm:w-[250px] md:w-64 md:h-64 lg:w-[400px] lg:h-[300px] object-contain transition-transform transform hover:scale-110 hover:shadow-xl rounded-xl"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        />
      </div>

      {/* Content Section */}
      <div className="relative w-full text-center text-white px-6 mt-6 z-10">
        <motion.h1
          className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-4 drop-shadow-lg"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          Fresh Fruits, Rapid Delivery
        </motion.h1>

        <motion.p
          className="text-lg sm:text-xl md:text-2xl mb-6 drop-shadow-md"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          Bringing you the freshest fruits, straight from the farm!
        </motion.p>

        {/* Button Container */}
        <div className="flex justify-center mt-4">
          <motion.button
            className="px-8 py-3 bg-gradient-to-r from-green-400 to-green-600 hover:from-green-500 hover:to-green-700 text-white font-semibold rounded-full text-lg shadow-lg transition-all transform hover:scale-105"
            whileHover={{ scale: 1.1 }}
          >
            Shop Now
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
