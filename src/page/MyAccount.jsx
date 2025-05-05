import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";

const MyAccount = () => {
  const [cartItems, setCartItems] = useState([]);
  const [userDetails, setUserDetails] = useState({});
  const [loading, setLoading] = useState(true);

  const userId = localStorage.getItem("EcomUserId");
  const userdatast = localStorage.getItem("EcomUser") || "Guest";
  const userEmail = localStorage.getItem("EcomEmail") || "No email provided";

  const navigate = useNavigate();

  const getUserDetails = async () => {
    try {
      const userRes = await axios.get(
        `https://server-rrb4.onrender.com/myprofile/${userId}`
      );
      setUserDetails(userRes.data);

      const cartRes = await axios.get(`https://server-rrb4.onrender.com/cart/${userId}`);
      setCartItems(cartRes.data);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching user details:", err);
      setLoading(false);
    }
  };

  useEffect(() => {
    getUserDetails();
  }, []);

  const getTotalPrice = () => {
    return cartItems.reduce(
      (total, item) => total + item.quantity * item.product.price,
      0
    );
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-center text-2xl font-semibold animate-pulse">Loading...</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 md:p-10 bg-gray-50 shadow-xl rounded-lg mt-20">
      {/* Profile & Logout Buttons */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 space-y-4 md:space-y-0">
        <button className="bg-teal-500 text-white px-8 py-3 rounded-lg shadow-lg w-full md:w-auto text-center text-lg font-semibold hover:bg-teal-600 transition duration-300">
          Welcome, {userdatast}
        </button>
      </div>

      {/* Profile Details */}
      <div className="profile-details mb-8 bg-white p-8 rounded-xl shadow-md border border-gray-300">
        <p className="text-lg text-gray-700 mb-3"><strong>Email:</strong> {userDetails.email}</p>
        <p className="text-lg text-gray-700 mb-3"><strong>Phone:</strong> {userDetails.phone}</p>
        <p className="text-lg text-gray-700">
          <strong>Address:</strong> {userDetails.houseNo}, {userDetails.street}, {userDetails.city}, {userDetails.state} - {userDetails.pincode}, {userDetails.country}
        </p>
      </div>

      {/* Order Items */}
      <div className="order-items">
        <h3 className="text-2xl font-bold text-gray-800 mb-6">Your Ordered Items</h3>
        
        {/* Scrollable Table Container */}
        <div className="overflow-x-auto w-full max-w-full">
          <table className="w-full min-w-[600px] bg-white border border-gray-200 shadow-md rounded-lg">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="py-4 px-6 text-left font-medium">#</th>
                <th className="py-4 px-6 text-left font-medium">Item Name</th>
                <th className="py-4 px-6 text-left font-medium">Quantity</th>
                <th className="py-4 px-6 text-left font-medium">Price</th>
                <th className="py-4 px-6 text-left font-medium">Total Price</th>
                <th className="py-4 px-6 text-left font-medium">Operation</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item, ind) => (
                <tr key={ind} className="border-b hover:bg-gray-50 transition-all duration-300">
                  <td className="py-4 px-6">{ind + 1}</td>
                  <td className="py-4 px-6 font-medium">{item.product.name}</td>
                  <td className="py-4 px-6">{item.quantity}</td>
                  <td className="py-4 px-6">₹{item.product.price}</td>
                  <td className="py-4 px-6 font-semibold">₹{item.quantity * item.product.price}</td>
                  <td className="py-4 px-6">
                    <NavLink
                      to={``}
                      className="bg-blue-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-600 transition-all duration-300"
                    >
                      View
                    </NavLink>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Total Price Section */}
        <div className="mt-6 text-right">
          <h3 className="text-xl font-bold text-gray-800">Total Price: ₹{getTotalPrice()}</h3>
        </div>
      </div>
    </div>
  );
};

export default MyAccount;
