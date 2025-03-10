import React, { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import heroBg from "../../assests/img/bg2.jpg";
import s4 from "../../assests/img/s4.png";
import s5 from "../../assests/img/s5.png";
import s2 from "../../assests/img/s2.png";

const fruits = [
  { name: "Strawberry", image: s4 },
  { name: "Strawberry", image: s5 },
  { name: "Apple", image: s2 },
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
      className="relative w-full h-[60vh] md:h-[75vh] lg:h-[85vh] flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: `url(${heroBg})` }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm"></div>

      {/* Image Slider */}
      <div className="absolute top-24 w-full max-w-3xl mx-auto overflow-hidden z-10">
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
                className="h-[280px] md:w-64 md:h-64 lg:w-[400px] lg:h-[300px] object-contain transition-transform transform hover:scale-110 hover:shadow-xl rounded-xl"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Content Section */}
      <div className="absolute bottom-6 w-full text-center text-white px-6">
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
