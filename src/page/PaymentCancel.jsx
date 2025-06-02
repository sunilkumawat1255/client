import React from "react";
import { useNavigate } from "react-router-dom";
import { FaTimesCircle, FaShoppingCart, FaHome } from "react-icons/fa";

const PaymentCancel = () => {
  const navigate = useNavigate();

  const handleReturnToCart = () => {
    navigate("/cart");
  };

  const handleGoHome = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8 text-center">
        <div className="mb-6">
          <FaTimesCircle className="mx-auto text-6xl text-red-500 mb-4" />
          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            Payment Cancelled
          </h1>
          <p className="text-gray-600">
            Your payment was cancelled. No charges were made to your account.
          </p>
        </div>

        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
          <p className="text-sm text-yellow-800">
            <span className="font-semibold">Don't worry!</span>
            <br />
            Your cart items are still saved. You can complete your purchase anytime.
          </p>
        </div>

        <div className="space-y-3">
          <button
            onClick={handleReturnToCart}
            className="w-full bg-blue-500 text-white py-3 px-4 rounded-lg hover:bg-blue-600 transition duration-200 flex items-center justify-center"
          >
            <FaShoppingCart className="mr-2" />
            Return to Cart
          </button>
          
          <button
            onClick={handleGoHome}
            className="w-full bg-gray-500 text-white py-3 px-4 rounded-lg hover:bg-gray-600 transition duration-200 flex items-center justify-center"
          >
            <FaHome className="mr-2" />
            Continue Shopping
          </button>
        </div>

        <div className="mt-6 text-sm text-gray-500">
          <p>
            Need help? Contact our support team.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PaymentCancel;
