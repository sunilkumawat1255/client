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
    const newImageUrls = cartItems.map((item) => base64ToBlob(item.product.img));
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

  const handleIncrement = async (cartItemId) => {
    if (userId) {
      try {
        await axios.put(
          `https://server-rrb4.onrender.com/cart/${userId}/increment/${cartItemId}`
        );
        setCartItems(
          cartItems.map((item) =>
            item._id === cartItemId ? { ...item, quantity: item.quantity + 1 } : item
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

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-6">
      <div className="w-full max-w-lg bg-white shadow-md rounded-lg p-5">
        <h2 className="text-2xl font-semibold text-gray-800 flex items-center mb-4">
          <FaShoppingCart className="mr-2" /> Your Cart
        </h2>
        {loading ? (
          <Skeleton height={100} count={3} />
        ) : cartItems.length === 0 ? (
          <div className="text-center">
            <h3 className="text-xl font-medium text-gray-700">Your cart is empty</h3>
            <button
              onClick={() => navigate("/")}
              className="mt-4 text-blue-500 hover:underline"
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          <>
            <div className="space-y-4">
              {cartItems.map((item, index) => (
                <div key={item._id} className="flex items-center p-3 border rounded-lg shadow-sm">
                  <img
                    src={imageUrls[index] || ""}
                    alt={item.product.name}
                    className="h-16 w-16 object-contain rounded-md border"
                  />
                  <div className="ml-4 flex-1">
                    <h5 className="text-lg font-semibold">{item.product.name}</h5>
                    <p className="text-gray-600">₹{item.product.price}</p>
                    <div className="flex items-center mt-2 space-x-2">
                      <button onClick={() => handleDecrement(item._id)} className="bg-gray-300 p-1 rounded">
                        <FaMinus />
                      </button>
                      <span className="px-2 font-medium">{item.quantity}</span>
                      <button onClick={() => handleIncrement(item._id)} className="bg-gray-300 p-1 rounded">
                        <FaPlus />
                      </button>
                    </div>
                  </div>
                  <button onClick={() => handleRemoveFromCart(item._id)} className="text-red-500">
                    <FaTrash />
                  </button>
                </div>
              ))}
            </div>
            <div className="mt-6 text-lg font-semibold">Total: ₹{cartItems.reduce((total, item) => total + item.product.price * item.quantity, 0)}</div>
            <button onClick={handleClearCart} className="w-full mt-4 bg-gray-500 text-white py-2 rounded hover:bg-gray-600">Clear Cart</button>
            <button onClick={() => setShowPaymentForm(true)} className="w-full mt-2 bg-green-500 text-white py-2 rounded hover:bg-green-600">Proceed to Checkout</button>
          </>
        )}
      </div>
    </div>
  );
};

export default Cart;
