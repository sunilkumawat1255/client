import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";

const MyAccount = () => {
  const [cartItems, setCartItems] = useState([]);
  const [, setUserDetails] = useState({});
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

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

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
    <div className="container mx-auto p-4 md:p-8 bg-white shadow-lg rounded-lg mt-20">
      {/* Profile & Logout Buttons */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 space-y-4 md:space-y-0">
        <button className="bg-green-500 text-white px-6 py-2 rounded-lg shadow-md w-full md:w-auto text-center" disabled>
          Welcome, {userdatast}
        </button>
        <button
          className="bg-red-500 text-white px-6 py-2 rounded-lg shadow-md hover:bg-red-600 transition w-full md:w-auto text-center"
          onClick={logout}
        >
          LogOut
        </button>
      </div>

      {/* Profile Details */}
      <div className="profile-details mb-8 bg-gray-50 p-6 rounded-lg shadow">
        <h3 className="text-2xl font-bold text-gray-800 mb-4">Your Profile</h3>
        <p className="text-lg text-gray-700"><strong>Email:</strong> {userEmail}</p>
      </div>

      {/* Order Items */}
      <div className="order-items">
        <h3 className="text-2xl font-bold text-gray-800 mb-6">Your Ordered Items</h3>
        
        {/* Scrollable Table Container */}
        <div className="overflow-x-auto w-full max-w-full">
          <table className="w-full min-w-[600px] bg-white border border-gray-200 shadow-md rounded-lg">
            <thead className="bg-gray-200 text-gray-700">
              <tr>
                <th className="py-3 px-4 text-left">#</th>
                <th className="py-3 px-4 text-left">Item Name</th>
                <th className="py-3 px-4 text-left">Quantity</th>
                <th className="py-3 px-4 text-left">Price</th>
                <th className="py-3 px-4 text-left">Total Price</th>
                <th className="py-3 px-4 text-left">Operation</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item, ind) => (
                <tr key={ind} className="border-b hover:bg-gray-100 transition">
                  <td className="py-4 px-4">{ind + 1}</td>
                  <td className="py-4 px-4 font-medium">{item.product.name}</td>
                  <td className="py-4 px-4">{item.quantity}</td>
                  <td className="py-4 px-4">₹{item.product.price}</td>
                  <td className="py-4 px-4 font-semibold">₹{item.quantity * item.product.price}</td>
                  <td className="py-4 px-4">
                    <NavLink
                      to={``}
                      className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600 transition"
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
