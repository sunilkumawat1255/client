import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { FaTrash, FaPlus, FaMinus, FaShoppingCart } from "react-icons/fa";

const Cart = () => {
  const userId = localStorage.getItem("EcomUserId");
  const [cartItems, setCartItems] = useState([]);
  const [imageUrls, setImageUrls] = useState([]);
  const [loading, setLoading] = useState(true);
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [paymentDetails, setPaymentDetails] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCart = async () => {
      if (userId) {
        try {
          const res = await axios.get(`https://server-rrb4.onrender.com/cart/${userId}`);
          setCartItems(res.data);
        } catch (err) {
          console.error("Error fetching cart:", err);
        } finally {
          setLoading(false);
        }
      }
    };
    fetchCart();
  }, [userId]);

  function base64ToBlob(base64String) {
    if (!base64String.includes(",")) return base64String;
    let byteCharacters = atob(base64String.split(",")[1]);
    let byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    let byteArray = new Uint8Array(byteNumbers);
    let blob = new Blob([byteArray], { type: "image/png" });
    return URL.createObjectURL(blob);
  }

  useEffect(() => {
    if (cartItems.length === 0) return;
    const newImageUrls = cartItems.map((item) =>
      base64ToBlob(item.product.img)
    );
    setImageUrls(newImageUrls);
  }, [cartItems]);

  const handleRemoveFromCart = async (cartItemId) => {
    if (!userId) return;
    try {
      await axios.delete(`https://server-rrb4.onrender.com/cart/${userId}/${cartItemId}`);
      setCartItems(cartItems.filter((item) => item._id !== cartItemId));
    } catch (error) {
      console.error("Error removing from cart:", error);
    }
  };

  const handleClearCart = async () => {
    if (userId) {
      try {
        await axios.delete(`https://server-rrb4.onrender.com/cart/${userId}`);
        setCartItems([]);
      } catch (error) {
        console.error("Error clearing cart:", error);
      }
    }
  };

  const handleCheckout = async () => {
    setCheckoutLoading(true);
    try {
      if (userId) {
        await axios.post(`https://server-rrb4.onrender.com/checkout/${userId}`);
        await axios.delete(`https://server-rrb4.onrender.com/cart/${userId}/clear`);
        setCartItems([]);
        setShowSuccess(true);
        setTimeout(() => {
          setShowSuccess(false);
          navigate("/");
        }, 2000);
      }
    } catch (error) {
      console.error("Checkout failed:", error);
    } finally {
      setCheckoutLoading(false);
    }
  };

  const handleIncrement = async (cartItemId) => {
    if (userId) {
      try {
        await axios.put(
          `https://server-rrb4.onrender.com/cart/${userId}/increment/${cartItemId}`
        );
        setCartItems(
          cartItems.map((item) =>
            item._id === cartItemId
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        );
      } catch (error) {
        console.error("Error incrementing item:", error);
      }
    }
  };

  const handleDecrement = async (cartItemId) => {
    if (userId) {
      try {
        await axios.put(
          `https://server-rrb4.onrender.com/cart/${userId}/decrement/${cartItemId}`
        );
        setCartItems(
          cartItems.map((item) =>
            item._id === cartItemId && item.quantity > 1
              ? { ...item, quantity: item.quantity - 1 }
              : item
          )
        );
      } catch (error) {
        console.error("Error decrementing item:", error);
      }
    }
  };

  const handlePaymentSubmit = (e) => {
    e.preventDefault();
    // Here you can add validation for payment details if needed
    setShowPaymentForm(false);
    handleCheckout();
  };

  const totalAmount = cartItems.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0
  );
  const totalItems = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-6">
      <div className="w-full max-w-2xl bg-white shadow-lg rounded-xl p-6">
        <h2 className="text-2xl font-bold text-gray-800 flex items-center mb-6">
          <FaShoppingCart className="mr-3 text-green-500" /> Your Cart
        </h2>
        {loading ? (
          <Skeleton height={100} count={3} />
        ) : cartItems.length === 0 ? (
          <div className="text-center p-6">
            <h3 className="text-xl font-medium text-gray-700">Your cart is empty</h3>
            <button
              onClick={() => navigate("/")}
              className="mt-4 text-blue-600 hover:text-blue-800 transition"
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {cartItems.map((item, index) => (
              <div key={item._id} className="flex items-center p-4 border rounded-lg shadow-sm bg-gray-50">
                <img
                  src={imageUrls[index] || ""}
                  alt={item.product.name}
                  className="h-16 w-16 object-cover rounded-lg border"
                />
                <div className="ml-4 flex-1">
                  <h5 className="text-lg font-semibold text-gray-900">{item.product.name}</h5>
                  <p className="text-gray-600">Price: ₹{item.product.price}</p>
                  <div className="flex items-center space-x-3 mt-2">
                    <button onClick={() => handleDecrement(item._id)} className="bg-gray-300 p-2 rounded hover:bg-gray-400 transition">
                      <FaMinus />
                    </button>
                    <span className="px-3 py-1 text-lg font-semibold bg-gray-200 rounded">{item.quantity}</span>
                    <button onClick={() => handleIncrement(item._id)} className="bg-gray-300 p-2 rounded hover:bg-gray-400 transition">
                      <FaPlus />
                    </button>
                  </div>
                </div>
                <button onClick={() => handleRemoveFromCart(item._id)} className="text-red-500 hover:text-red-700 transition">
                  <FaTrash />
                </button>
              </div>
            ))}
  
            <div className="mt-4 text-lg font-semibold text-gray-800">
              <p>Total Items: {totalItems}</p>
              <p>Total Amount: ₹{totalAmount.toFixed(2)}</p>
            </div>
  
            <div className="mt-6 flex flex-col space-y-3">
              <button onClick={handleClearCart} className="w-full bg-gray-600 text-white py-3 rounded-lg hover:bg-gray-700 transition">Clear Cart</button>
              <button onClick={() => setShowPaymentForm(true)} className="w-full bg-green-500 text-white py-3 rounded-lg hover:bg-green-600 transition">Proceed to Checkout</button>
            </div>
  
            {showPaymentForm && (
              <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                <div className="bg-white p-6 rounded-xl shadow-lg w-96">
                  <h2 className="text-lg font-bold mb-4 text-gray-800">Payment Details</h2>
                  <form onSubmit={handlePaymentSubmit}>
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700">Card Number</label>
                      <input type="text" value={paymentDetails.cardNumber} onChange={(e) => setPaymentDetails({ ...paymentDetails, cardNumber: e.target.value })} className="mt-1 block w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500" required />
                    </div>
                    <div className="mb-4 flex space-x-2">
                      <div className="w-1/2">
                        <label className="block text-sm font-medium text-gray-700">Expiry Date</label>
                        <input type="text" value={paymentDetails.expiryDate} onChange={(e) => setPaymentDetails({ ...paymentDetails, expiryDate: e.target.value })} className="mt-1 block w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500" required />
                      </div>
                      <div className="w-1/2">
                        <label className="block text-sm font-medium text-gray-700">CVV</label>
                        <input type="text" value={paymentDetails.cvv} onChange={(e) => setPaymentDetails({ ...paymentDetails, cvv: e.target.value })} className="mt-1 block w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500" required />
                      </div>
                    </div>
                    <div className="flex justify-end mt-4">
                      <button type="button" onClick={() => setShowPaymentForm(false)} className="mr-3 bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition">Cancel</button>
                      <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition">Submit Payment</button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
