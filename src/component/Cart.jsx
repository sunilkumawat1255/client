import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

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
          const res = await axios.get(`http://localhost:8000/cart/${userId}`);
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
      await axios.delete(`http://localhost:8000/cart/${userId}/${cartItemId}`);
      setCartItems(cartItems.filter((item) => item._id !== cartItemId));
    } catch (error) {
      console.error("Error removing from cart:", error);
    }
  };

  const handleClearCart = async () => {
    if (userId) {
      try {
        await axios.delete(`http://localhost:8000/cart/${userId}`);
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
        await axios.post(`http://localhost:8000/checkout/${userId}`);
        await axios.delete(`http://localhost:8000/cart/${userId}/clear`);
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
          `http://localhost:8000/cart/${userId}/increment/${cartItemId}`
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
          `http://localhost:8000/cart/${userId}/decrement/${cartItemId}`
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
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-5 overflow-y-auto">
        {loading ? (
          <div className="space-y-4">
            {Array(3)
              .fill(0)
              .map((_, index) => (
                <div
                  key={index}
                  className="flex flex-row items-center border border-gray-300 rounded-lg p-2 shadow-sm"
                >
                  <Skeleton height={80} width={80} />
                  <div className="ml-4 flex-1">
                    <Skeleton height={20} width="80%" />
                    <Skeleton height={15} width="50%" />
                    <Skeleton height={30} width="100%" />
                  </div>
                </div>
              ))}
          </div>
        ) : cartItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full">
            <h1 className="text-xl font-bold text-gray-800">
              Your Cart is Empty
            </h1>
            <button
              onClick={() => navigate("/")}
              className="mt-4 text-blue-500 hover:underline"
            >
              Continue Shopping...
            </button>
          </div>
        ) : (
          <div className="space-y-2">
            {cartItems.map((item, index) => (
              <div
                key={item._id}
                className="flex flex-row items-center border border-gray-300 rounded-lg p-2 shadow-sm"
              >
                <img
                  src={imageUrls[index] || ""}
                  alt={item.product.name}
                  className="h-20 w-20 md:h-[70px] md:w-[90px] object-contain rounded-md"
                />
                <div className="ml-4 flex-1">
                  <h5 className="text-lg font-semibold">{item.product.name}</h5>
                  <p className="text-gray-600">Price: ₹{item.product.price}</p>
                  <div className="flex items-center space-x-3">
                    <button
                      onClick={() => handleDecrement(item._id)}
                      className="text-gray-700 px-2 py-1 rounded bg-gray-200 hover:bg-gray-400"
                    >
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      onClick={() => handleIncrement(item._id)}
                      className="text-gray-700 px-2 py-1 rounded bg-gray-200 hover:bg-gray-400"
                    >
                      +
                    </button>
                  </div>
                  <button
                    onClick={() => handleRemoveFromCart(item._id)}
                    className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 w-full md:w-auto"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}

            <div className="mt-4">
              <h4 className="font-semibold text-gray-800">
                Total Items: {totalItems}
              </h4>
              <h4 className="font-semibold text-gray-800">
                Total Amount: ₹{totalAmount.toFixed(2)}
              </h4>
            </div>

            <div className="mt-4 flex flex-col space-y-2">
              <button
                onClick={handleClearCart}
                className="bg-gray-500 text-white py-2 rounded hover:bg-gray-600"
              >
                Clear Cart
              </button>
              <button
                onClick={() => setShowPaymentForm(true)}
                className="bg-green-500 text-white py-2 rounded hover:bg-green-600"
                disabled={checkoutLoading}
              >
                {checkoutLoading ? "Processing..." : "Checkout"}
              </button>
            </div>

            {showPaymentForm && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                <div className="bg-white p-6 rounded-lg shadow-lg">
                  <h2 className="text-lg font-semibold mb-4">
                    Payment Details
                  </h2>
                  <form onSubmit={handlePaymentSubmit}>
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700">
                        Card Number
                      </label>
                      <input
                        type="text"
                        value={paymentDetails.cardNumber}
                        onChange={(e) =>
                          setPaymentDetails({
                            ...paymentDetails,
                            cardNumber: e.target.value,
                          })
                        }
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        required
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700">
                        Expiry Date
                      </label>
                      <input
                        type="text"
                        value={paymentDetails.expiryDate}
                        onChange={(e) =>
                          setPaymentDetails({
                            ...paymentDetails,
                            expiryDate: e.target.value,
                          })
                        }
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        required
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700">
                        CVV
                      </label>
                      <input
                        type="text"
                        value={paymentDetails.cvv}
                        onChange={(e) =>
                          setPaymentDetails({
                            ...paymentDetails,
                            cvv: e.target.value,
                          })
                        }
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        required
                      />
                    </div>
                    <div className="flex justify-end">
                      <button
                        type="button"
                        onClick={() => setShowPaymentForm(false)}
                        className="mr-2 bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                      >
                        Submit Payment
                      </button>
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


