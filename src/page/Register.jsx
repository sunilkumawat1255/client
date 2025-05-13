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
    state: "Gujarat",
    city: "Sikar",
    pincode: "",
    phone: "",
  });

  const [countries] = useState(["India", "USA", "Canada"]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    if (formData.country) {
      axios
        .post("https://countriesnow.space/api/v0.1/countries/states", {
          country: formData.country,
        })
        .then((response) => {
          const fetchedStates = response.data.data.states.map(
            (state) => state.name
          );
          setStates(fetchedStates);
          if (!fetchedStates.includes(formData.state)) {
            setFormData((prev) => ({ ...prev, state: "", city: "" }));
            setCities([]);
          }
        })
        .catch(() => toast.error("Failed to fetch states"));
    }
  }, [formData.country]);

  useEffect(() => {
    if (formData.state) {
      axios
        .post("https://countriesnow.space/api/v0.1/countries/state/cities", {
          country: formData.country,
          state: formData.state,
        })
        .then((response) => {
          const fetchedCities = response.data.data;
          setCities(fetchedCities);
          if (!fetchedCities.includes(formData.city)) {
            setFormData((prev) => ({ ...prev, city: "" }));
          }
        })
        .catch(() => toast.error("Failed to fetch cities"));
    }
  }, [formData.state]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(formData.phone)) {
      toast.error("Phone number must be 10 digits.", { position: "top-right" });
      return;
    }

    try {
      const response = await axios.post(
        "https://server-rrb4.onrender.com/register",
        formData
      );
      toast.success(response.data.msg, {
        position: "top-right",
        autoClose: 3000,
      });

      setTimeout(() => {
        navigate("/login");
      }, 3000);
    } catch (error) {
      toast.error(error.response?.data?.msg || "An error occurred.", {
        position: "top-right",
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <ToastContainer />
      <div className="w-full max-w-lg bg-white shadow-lg rounded-2xl p-8">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Register Now
        </h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
          <input
            type="text"
            name="username"
            placeholder="Username"
            className="col-span-2 px-4 py-2 border rounded-lg"
            value={formData.username}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="col-span-2 px-4 py-2 border rounded-lg"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="px-4 py-2 border rounded-lg"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            className="px-4 py-2 border rounded-lg"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="houseNo"
            placeholder="House No"
            className="px-4 py-2 border rounded-lg"
            value={formData.houseNo}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="street"
            placeholder="Street"
            className="px-4 py-2 border rounded-lg"
            value={formData.street}
            onChange={handleChange}
            required
          />

          <select
            name="country"
            className="px-4 py-2 border rounded-lg"
            value={formData.country}
            onChange={handleChange}
            required
          >
            <option value="">Select Country</option>
            {countries.map((country, index) => (
              <option key={index} value={country}>
                {country}
              </option>
            ))}
          </select>

          <select
            name="state"
            className="px-4 py-2 border rounded-lg"
            value={formData.state}
            onChange={handleChange}
            required
            disabled={!states.length}
          >
            <option value="">Select State</option>
            {states.map((state, index) => (
              <option key={index} value={state}>
                {state}
              </option>
            ))}
          </select>

          <select
            name="city"
            className="px-4 py-2 border rounded-lg"
            value={formData.city}
            onChange={handleChange}
            required
            disabled={!cities.length}
          >
            <option value="">Select City</option>
            {cities.map((city, index) => (
              <option key={index} value={city}>
                {city}
              </option>
            ))}
          </select>

          <input
            type="text"
            name="pincode"
            placeholder="Pincode"
            className="px-4 py-2 border rounded-lg"
            value={formData.pincode}
            onChange={handleChange}
            required
          />
          <input
            type="number"
            name="phone"
            placeholder="Phone Number"
            className="px-4 py-2 border rounded-lg"
            value={formData.phone}
            onChange={handleChange}
            required
          />

          <button
            type="submit"
            className="col-span-2 bg-blue-500 text-white py-2 rounded-lg text-lg font-semibold hover:bg-blue-600 transition duration-300"
          >
            Register
          </button>
        </form>
        <div className="text-center mt-4">
          <NavLink to="/login" className="text-blue-500">
            Login Now
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Register;
