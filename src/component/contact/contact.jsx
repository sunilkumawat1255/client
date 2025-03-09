import React, { useState } from "react";

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
    // Here you can add your form submission logic (e.g., API call)
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="bg-white shadow-2xl rounded-2xl p-6 md:p-10 w-full max-w-2xl transition-transform transform hover:scale-105">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Contact Us
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
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
              className="mt-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none shadow-sm transition duration-200"
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
              className="mt-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none shadow-sm transition duration-200"
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
              className="mt-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none h-32 resize-none shadow-sm transition duration-200"
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white font-semibold py-3 rounded-lg hover:bg-blue-600 transition duration-300 shadow-md hover:shadow-lg"
          >
            Submit
          </button>
        </form>
      </div>

      <div className="mt-12 text-center">
        <h3 className="text-3xl font-bold text-gray-800 mb-6">
          Why Choose Us?
        </h3>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-600 text-lg">
          <li className="flex items-start bg-white shadow-md rounded-lg p-4 transition-transform transform hover:scale-105">
            <span className="text-blue-500 text-3xl mr-4">✔</span>
            <div>
              <strong className="text-gray-800">Best Seller:</strong>
              <p>Our products are top-rated and loved by our customers.</p>
            </div>
          </li>
          <li className="flex items-start bg-white shadow-md rounded-lg p-4 transition-transform transform hover:scale-105">
            <span className="text-green-500 text-3xl mr-4">✔</span>
            <div>
              <strong className="text-gray-800">Fresh Fruits:</strong>
              <p>
                We offer the freshest fruits, picked at the peak of ripeness.
              </p>
            </div>
          </li>
          <li className="flex items-start bg-white shadow-md rounded-lg p-4 transition-transform transform hover:scale-105">
            <span className="text-orange-500 text-3xl mr-4">✔</span>
            <div>
              <strong className="text-gray-800">Direct from Farm:</strong>
              <p>Our fruits come straight from the farm to your table.</p>
            </div>
          </li>
          <li className="flex items-start bg-white shadow-md rounded-lg p-4 transition-transform transform hover:scale-105">
            <span className="text-red-500 text-3xl mr-4">✔</span>
            <div>
              <strong className="text-gray-800">Customer Satisfaction:</strong>
              <p>We ensure top-quality service and fresh produce.</p>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Contact;

