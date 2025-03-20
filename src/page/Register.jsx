import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    houseNo: "",
    street: "",
    country: "India",
    state: "",
    city: "",
    pincode: "",
    phone: "",
  });

  const [countries] = useState(["India", "USA", "Canada"]); // Static country list
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  const navigate = useNavigate();

  // Fetch states when country changes
  useEffect(() => {
    if (formData.country) {
      axios
        .post("https://countriesnow.space/api/v0.1/countries/states", {
          country: formData.country,
        })
        .then((response) => {
          setStates(response.data.data.states.map((state) => state.name));
          setFormData((prev) => ({ ...prev, state: "", city: "" })); // Reset state and city
          setCities([]);
        })
        .catch(() => toast.error("Failed to fetch states"));
    }
  }, [formData.country]);

  // Fetch cities when state changes
  useEffect(() => {
    if (formData.state) {
      axios
        .post("https://countriesnow.space/api/v0.1/countries/state/cities", {
          country: formData.country,
          state: formData.state,
        })
        .then((response) => {
          setCities(response.data.data);
          setFormData((prev) => ({ ...prev, city: "" }));
        })
        .catch(() => toast.error("Failed to fetch cities"));
    }
  }, [formData.state]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("https://server-rrb4.onrender.com/register", formData);
      toast.success(response.data.msg, { position: "top-right", autoClose: 3000 });

      setTimeout(() => {
        navigate("/login");
      }, 3000);
    } catch (error) {
      toast.error(error.response?.data?.msg || "An error occurred.", { position: "top-right" });
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <ToastContainer />
      <div className="w-full max-w-md bg-white shadow-md rounded-lg p-6 my-20">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">Register Now</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="text" name="username" placeholder="Username" className="w-full px-4 py-2 border rounded-lg" value={formData.username} onChange={handleChange} required />
          <input type="email" name="email" placeholder="Email" className="w-full px-4 py-2 border rounded-lg" value={formData.email} onChange={handleChange} required />
          <input type="password" name="password" placeholder="Password" className="w-full px-4 py-2 border rounded-lg" value={formData.password} onChange={handleChange} required />
          <input type="password" name="confirmPassword" placeholder="Confirm Password" className="w-full px-4 py-2 border rounded-lg" value={formData.confirmPassword} onChange={handleChange} required />
          <input type="text" name="houseNo" placeholder="House No" className="w-full px-4 py-2 border rounded-lg" value={formData.houseNo} onChange={handleChange} required/>
          <input type="text" name="street" placeholder="Street" className="w-full px-4 py-2 border rounded-lg" value={formData.street} onChange={handleChange} required/>

          {/* Country Dropdown */}
          <select name="country" className="w-full px-4 py-2 border rounded-lg" value={formData.country} onChange={handleChange} required>
            <option value="">Select Country</option>
            {countries.map((country, index) => (
              <option key={index} value={country}>{country}</option>
            ))}
          </select>

          {/* State Dropdown */}
          <select name="state" className="w-full px-4 py-2 border rounded-lg" value={formData.state} onChange={handleChange} required disabled={!states.length}>
            <option value="">Select State</option>
            {states.map((state, index) => (
              <option key={index} value={state}>{state}</option>
            ))}
          </select>

          {/* City Dropdown */}
          <select name="city" className="w-full px-4 py-2 border rounded-lg" value={formData.city} onChange={handleChange} required disabled={!cities.length}>
            <option value="">Select City</option>
            {cities.map((city, index) => (
              <option key={index} value={city}>{city}</option>
            ))}
          </select>

          <input type="text" name="pincode" placeholder="Pincode" className="w-full px-4 py-2 border rounded-lg" value={formData.pincode} onChange={handleChange} required/>
          <input type="number" name="phone" placeholder="Phone Number" className="w-full px-4 py-2 border rounded-lg" value={formData.phone} onChange={handleChange} required/>
          <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-lg">Register</button>
        </form>
        <div className="text-center mt-4">
          <NavLink to="/login" className="text-blue-500">Login Now</NavLink>
        </div>
      </div>
    </div>
  );
};

export default Register;
