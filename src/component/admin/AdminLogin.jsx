import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("AdminUserToken");
      if (token) {
        try {
          const response = await axios.get("https://server-rrb4.onrender.com/isAuth", {
            headers: { "x-access-token": token },
          });
          if (response.data.login) {
            navigate("/dashboard");
          }
        } catch (error) {
          console.error("Auth check failed:", error);
          localStorage.removeItem("AdminUserToken");
        }
      }
    };
    checkAuth();
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
  
    try {
      const response = await axios.post("https://server-rrb4.onrender.com/adminlogin", {
        username,
        password,
      });
  
      if (response.data.login) {
        localStorage.setItem("AdminUserToken", response.data.token);
  
        toast.success(`Welcome, ${response.data.user.username}!`, {
          position: "top-center",
          autoClose: 2000,
        });
  
        setTimeout(() => {
          navigate("/dashboard");
        }, 2000);
      } else {
        toast.error(response.data.message, {
          position: "top-center",
        });
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error("Login failed. Please try again.", {
        position: "top-center",
      });
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-2xl font-semibold text-center mb-6">Admin Login</h1>
        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="text"
            className="w-full border px-4 py-2 rounded-lg focus:outline-none"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type="password"
            className="w-full border px-4 py-2 rounded-lg focus:outline-none"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
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
        <ToastContainer />
      </div>
    </div>
  );
};

export default Login;
