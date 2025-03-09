import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const ManageUsers = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState(null);
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    role: "",
    isActive: true,
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/usersshowdetails/${id}`
        );
        const cartres = await axios.get(
          `http://localhost:8000/api/usercartdetails/${id}`
        );

        await Promise.all(
          cartres.data.map(async (curr) => {
            const productsID = curr.product_id;
            const productres = await axios.get(
              `http://localhost:8000/api/userproductdetails/${productsID}`
            );
            setProduct((prev) => [...prev, productres.data]);
          })
        );

        if (response.status === 200) {
          setCart(cartres.data);
          setUser(response.data);
          setFormData(response.data);
        } else {
          console.error("User  not found or invalid response");
          setUser(null);
          setCart(null);
          setProduct(null);
        }
      } catch (error) {
        console.error("Failed to fetch user details:", error);
        setUser(null);
        setCart(null);
        setProduct(null);
      } finally {
        setLoading(false);
      }
    };
    fetchUserDetails();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `http://localhost:8000/api/usersupdate/${id}`,
        formData
      );
      if (response.status === 200) {
        alert("User  updated successfully!");
        setUser(formData);
        setEditMode(false);
      }
    } catch (error) {
      console.error("Failed to update user:", error);
      alert("Error updating user.");
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:8000/api/usersdelet/${id}`);
      alert("User  deleted successfully!");
      navigate(-1);
    } catch (error) {
      console.error("Failed to delete user:", error);
      alert("Error deleting user.");
    }
  };

  if (loading) {
    return <p>Loading user details...</p>;
  }

  if (!user) {
    return <p>User not found!</p>;
  }

  return (
    <div className="flex flex-col md:flex-row">
      {/* Sidebar */}
      <div className="w-full md:w-1/4 h-screen bg-gray-800 text-white p-4">
        <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
        <nav className="space-y-4">
          <button
            className="w-full text-left px-4 py-2 rounded-lg hover:bg-gray-700"
            onClick={() => navigate("/dashboard")}
          >
            Dashboard Home
          </button>
          <button
            className="w-full text-left px-4 py-2 rounded-lg hover:bg-gray-700"
            onClick={() => navigate(-1)}
          >
            Back
          </button>
        </nav>
        <div className="mt-6">
          <button
            className="w-full text-left px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700"
            onClick={() => {
              localStorage.removeItem("AdminUser Token");
              navigate("/adminlogin");
            }}
          >
            Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 bg-gray-100 p-6 overflow-auto">
        <h2 className="text-3xl font-bold mb-4">User Details</h2>
        <div className="bg-white p-4 shadow rounded-lg">
          {editMode ? (
            <form onSubmit={handleUpdate} className="space-y-4">
              <div>
                <label className="block font-bold">Username:</label>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <div>
                <label className="block font-bold">Email:</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <div>
                <label className="block font-bold">Role:</label>
                <input
                  type="text"
                  name="role"
                  value={formData.role}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                />
              </div>
              <div>
                <label className="block font-bold">Status:</label>
                <select
                  name="isActive"
                  value={formData.isActive}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                >
                  <option value={true}>Active</option>
                  <option value={false}>Inactive</option>
                </select>
              </div>
              <div className="flex gap-4">
                <button
                  type="submit"
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                >
                  Save Changes
                </button>
                <button
                  type="button"
                  className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
                  onClick={() => setEditMode(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          ) : (
            <>
              <p>
                <strong>ID:</strong> {user._id}
              </p>
              <p>
                <strong>Username:</strong> {user.username}
              </p>
              <p>
                <strong>Email:</strong> {user.email}
              </p>
              <p>
                <strong>Role:</strong> {user.role || "Not specified"}
              </p>
              <p>
                <strong>Status:</strong> {user.isActive ? "Active" : "Inactive"}
              </p>

              <div className="overflow-x-auto">
                <table className="table-auto w-full border-collapse border border-gray-300 mt-4">
                  <thead>
                    <tr className="bg-gray-200">
                      <th className="border border-gray-300 px-4 py-2">
                        Item Name
                      </th>
                      <th className="border border-gray-300 px-4 py-2">
                        Price
                      </th>
                      <th className="border border-gray-300 px-4 py-2">
                        Quantity
                      </th>
                      <th className="border border-gray-300 px-4 py-2">
                        ProductID
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {cart.map((curr, index) => (
                      <tr key={curr.id} className="text-center">
                        <td className="border border-gray-300 px-4 py-2">
                          {product[index]?.name || "Loading..."}
                        </td>
                        <td className="border border-gray-300 px-4 py-2">
                          {product[index]?.price || "Loading..."}
                        </td>
                        <td className="border border-gray-300 px-4 py-2">
                          {curr.quantity}
                        </td>
                        <td className="border border-gray-300 px-4 py-2">
                          {curr.product_id}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="mt-4 flex gap-4">
                <button
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  onClick={() => setEditMode(true)}
                >
                  Update
                </button>
                <button
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                  onClick={handleDelete}
                >
                  Delete
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ManageUsers;
