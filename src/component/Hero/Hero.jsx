import React, { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import heroBg from "../../assests/img/bg2.jpg"; // ✅ Import Background Image

const fruits = [
  { name: "Strawberry", image: "/img/s8.png" },
  { name: "Strawberry", image: "/img/s5.png" },
  { name: "Apple", image: "/img/s2.png" },
];

const Hero = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const intervalRef = useRef(null);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % fruits.length);
    }, 3000);

    return () => clearInterval(intervalRef.current);
  }, []);

  return (
    <div
      className="relative w-full h-[50vh] md:h-[60vh] lg:h-[70vh] flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: `url(${heroBg})` }} // Background image with style
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>

      {/* Image Slider - Positioned on top */}
      <div className="absolute top-8 w-full max-w-3xl mx-auto overflow-hidden z-10">
        <div
          className="flex transition-transform duration-700 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {fruits.map((fruit, index) => (
            <div
              key={index}
              className="w-full flex-shrink-0 flex flex-col items-center"
            >
              <motion.img
                src={fruit.image}
                alt={fruit.name}
                className="h-[250px] md:w-56 md:h-56 lg:w-[350px] lg:h-64 object-contain transition-transform transform hover:scale-110 hover:shadow-lg"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Content Section - Positioned at the bottom */}
      <div className="absolute bottom-4 w-full text-center text-white px-6">
        <motion.h1
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-shadow-md"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          Fresh Fruits, Rapid Delivery
        </motion.h1>

        <motion.p
          className="text-sm sm:text-lg md:text-xl mb-6 text-shadow-md"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          Bringing you the freshest fruits, straight from the farm!
        </motion.p>

        {/* Button Container */}
        <div className="flex justify-center mt-4">
          <motion.button
            className="px-6 py-3 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-full text-sm sm:text-lg transition-all transform hover:scale-105"
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

