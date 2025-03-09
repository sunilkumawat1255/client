import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";

const MyAccount = () => {
  const [cartItems, setCartItems] = useState([]);
  const [userDetails, setUserDetails] = useState({});
  const [loading, setLoading] = useState(true);

  const userId = localStorage.getItem("EcomUserId");
  const userdatast = localStorage.getItem("EcomUser") || "Guest"; // Default to "Guest" if not found
  const userEmail = localStorage.getItem("EcomEmail") || "No email provided"; // Default email

  const navigate = useNavigate();

  // Fetch user details including cart items
  const getUserDetails = async () => {
    try {
      const userRes = await axios.get(
        `http://localhost:8000/myprofile/${userId}`
      );
      setUserDetails(userRes.data);

      const cartRes = await axios.get(`http://localhost:8000/cart/${userId}`);
      console.log("Cart Items Response:", cartRes.data); // Log the cart items response
      setCartItems(cartRes.data);

      setLoading(false); // Set loading to false after both API calls
    } catch (err) {
      console.error("Error fetching user details:", err);
      setLoading(false); // Ensure loading is set to false even if there's an error
    }
  };

  useEffect(() => {
    getUserDetails();
  }, []);

  const logout = () => {
    localStorage.clear(); // Clears all localStorage items
    navigate("/"); // Redirects to homepage after logout
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
        <div className="text-center text-xl mt-8">Loading...</div>
      </div>
    );
  }

  if (!cartItems.length) {
    return (
      <div className="container mx-auto p-5">
        <div className="flex flex-col md:flex-row justify-between mb-4">
          <button
            className="bg-green-500 text-white px-4 py-2 rounded"
            disabled
          >
            Welcome {userdatast.toUpperCase()}
          </button>
          <button
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            onClick={logout}
          >
            LogOut
          </button>
        </div>
        <h2 className="text-center text-xl font-semibold">
          You have no items in your cart
        </h2>
        <div className="flex justify-center mt-4">
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            onClick={() => navigate("/products")}
          >
            Continue Shopping
          </button>
        </div>
        <Footer /> {/* Include Footer here */}
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 bg-white shadow-md rounded-lg">
      <div className="flex flex-col md:flex-row justify-between mb-6">
        <button className="bg-green-500 text-white px-4 py-2 rounded" disabled>
          Welcome, {userdatast}
        </button>
        <button
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          onClick={logout}
        >
          LogOut
        </button>
      </div>
      <div className="profile-details mb-8">
        <h3 className="text-2xl font-bold text-gray-800 mb-2">Your Profile</h3>
        <div className="bg-gray-100 p-4 rounded-lg mb-4">
          <p>
            <strong>Email:</strong> {userEmail}
          </p>
        </div>
      </div>
      <div className="order-items">
        <h3 className="text-2xl font-bold text-gray-800 mb-4">
          Your Ordered Items
        </h3>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200">
            <thead className="bg-gray-200">
              <tr>
                <th className="py-2 px-4 border-b text-left">#</th>
                <th className="py-2 px-4 border-b text-left">Item Name</th>
                <th className="py-2 px-4 border-b text-left">Quantity</th>
                <th className="py-2 px-4 border-b text-left">Price</th>
                <th className="py-2 px-4 border-b text-left">Total Price</th>
                <th className="py-2 px-4 border-b text-left">Operation</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item, ind) => (
                <tr key={ind} className="border-b hover:bg-gray-100">
                  <td className="py-2 px-4">{ind + 1}</td>
                  <td className="py-2 px-4">{item.product.name}</td>
                  <td className="py-2 px-4">{item.quantity}</td>
                  <td className="py-2 px-4">₹{item.product.price}</td>
                  <td className="py-2 px-4">
                    ₹{item.quantity * item.product.price}
                  </td>
                  <td className="py-2 px-4">
                    <NavLink
                      to={``}
                      className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    >
                      View
                    </NavLink>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-4 text-right">
          <h3 className="text-xl font-bold text-gray-800">
            Total Price: ₹{getTotalPrice()}
          </h3>
        </div>
      </div>
    </div>
  );
};

export default MyAccount;

