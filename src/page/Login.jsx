import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState(false);
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem("Ecomtoken");
        if (token) {
          const response = await axios.get("https://server-rrb4.onrender.com/isAuth", {
            headers: { "x-access-token": token },
          });
          if (response.data.login) {
            navigate("/");
          }
        }
      } catch (error) {
        console.error("Auth check failed:", error);
        localStorage.removeItem("Ecomtoken"); // Clear invalid token
      }
    };
    checkAuth();
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus(false);
    setMsg("");

    try {
      const response = await axios.post("https://server-rrb4.onrender.com/login", {
        email,
        password,
      });
console.log(response,"respnsiseddfdf")
      if (response.data.login) {
        localStorage.setItem("Ecomtoken", response.data.token);
        localStorage.setItem("EcomUser", response.data.user.username);
        localStorage.setItem("EcomUserId", response.data.user.id);
        localStorage.setItem("EcomEmail", response.data.user.email);

        toast.success(`Welcome, ${response.data.user.username.toUpperCase()} !`, {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          style: {
            color: "#000", // Black text color
            backgroundColor: "#f9f9f9", // Light background for contrast
            fontSize: "16px", // Slightly larger font for better readability
            borderRadius: "8px", // Rounded corners
            boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)", // Subtle shadow for depth
          },
        });

        setTimeout(() => {
          navigate("/");
        }, 2000); 
      } else {
        setMsg(response.data.msg);
        setStatus(true);
      }
    } catch (error) {
      console.error("Login error:", error);
      setMsg(
        error.response?.data?.msg || "A network error occurred. Please try again later."
      );
      setStatus(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-6">
        {status && (
          <div className="bg-red-100 text-red-700 px-4 py-3 rounded relative mb-4">
            <button
              type="button"
              className="absolute top-2 right-2 text-red-700"
              onClick={() => setStatus(false)}
            >
              &times;
            </button>
            <p>{msg}</p>
          </div>
        )}
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Login Now
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="email"
              className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <input
              type="password"
              className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className={`w-full py-2 rounded-lg text-white ${
              loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"
            }`}
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
        <div className="text-center mt-4">
          <NavLink to="/register" className="text-blue-500 hover:underline">
            Register Now
          </NavLink>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Login;

