import React, { useState } from "react";
import { motion } from "framer-motion";
import { FiSend } from "react-icons/fi";
import { FaCheckCircle } from "react-icons/fa";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form data submitted:", formData);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-50 to-blue-100 px-6 py-12 mt-20">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-white shadow-xl rounded-3xl p-8 md:p-12 w-full max-w-3xl transform hover:shadow-2xl"
      >
        <h2 className="text-4xl font-bold text-center text-gray-800 mb-6">
          Get in Touch
        </h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="flex flex-col">
            <label htmlFor="name" className="font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="mt-2 p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none shadow-sm transition duration-300"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="email" className="font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="mt-2 p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none shadow-sm transition duration-300"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="message" className="font-medium text-gray-700">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              className="mt-2 p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none h-32 resize-none shadow-sm transition duration-300"
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-full flex items-center justify-center bg-blue-500 text-white font-semibold py-3 rounded-xl hover:bg-blue-600 transition duration-300 shadow-md hover:shadow-lg"
          >
            <FiSend className="mr-2 text-lg" /> Send Message
          </button>
        </form>
      </motion.div>

      <div className="mt-12 text-center w-full max-w-4xl">
        <h3 className="text-3xl font-bold text-gray-800 mb-6">Why Choose Us?</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-700 text-lg">
          {[
            { text: "Best Seller: Our products are top-rated and loved by our customers.", color: "text-blue-500" },
            { text: "Fresh Fruits: We offer the freshest fruits, picked at the peak of ripeness.", color: "text-green-500" },
            { text: "Direct from Farm: Our fruits come straight from the farm to your table.", color: "text-orange-500" },
            { text: "Customer Satisfaction: We ensure top-quality service and fresh produce.", color: "text-red-500" },
          ].map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2, duration: 0.5 }}
              className="flex items-start bg-white shadow-md rounded-xl p-4 transition-transform transform hover:scale-105"
            >
              <FaCheckCircle className={`${item.color} text-3xl mr-4`} />
              <p className="text-gray-800">{item.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Contact;
