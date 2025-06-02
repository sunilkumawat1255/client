import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { FaCheckCircle, FaHome, FaReceipt } from "react-icons/fa";
import axios from "axios";

const PaymentSuccess = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [sessionData, setSessionData] = useState(null);
  const userId = localStorage.getItem("EcomUserId");

  useEffect(() => {
    const sessionId = searchParams.get("session_id");
    
    // Clear the cart after successful payment
    const clearCart = async () => {
      if (userId) {
        try {
          await axios.delete(`https://server-rrb4.onrender.comhttps://server-rrb4.onrender.com/cart/${userId}`);
          console.log("Cart cleared successfully");
        } catch (error) {
          console.error("Error clearing cart:", error);
        }
      }
    };

    if (sessionId) {
      clearCart();
      setSessionData({ sessionId });
    }
    
    setLoading(false);
  }, [searchParams, userId]);

  const handleGoHome = () => {
    navigate("/");
  };

  const handleViewProfile = () => {
    navigate("/profile");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-green-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8 text-center">
        <div className="mb-6">
          <FaCheckCircle className="mx-auto text-6xl text-green-500 mb-4" />
          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            Payment Successful!
          </h1>
          <p className="text-gray-600">
            Thank you for your purchase. Your order has been confirmed.
          </p>
        </div>

        {sessionData && (
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <p className="text-sm text-gray-600">
              <span className="font-semibold">Transaction ID:</span>
              <br />
              <span className="font-mono text-xs break-all">
                {sessionData.sessionId}
              </span>
            </p>
          </div>
        )}

        <div className="space-y-3">
          <button
            onClick={handleGoHome}
            className="w-full bg-green-500 text-white py-3 px-4 rounded-lg hover:bg-green-600 transition duration-200 flex items-center justify-center"
          >
            <FaHome className="mr-2" />
            Continue Shopping
          </button>
          
          <button
            onClick={handleViewProfile}
            className="w-full bg-gray-500 text-white py-3 px-4 rounded-lg hover:bg-gray-600 transition duration-200 flex items-center justify-center"
          >
            <FaReceipt className="mr-2" />
            View Profile
          </button>
        </div>

        <div className="mt-6 text-sm text-gray-500">
          <p>
            You will receive an email confirmation shortly.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
