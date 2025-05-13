import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BiSolidCloudUpload } from "react-icons/bi";

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState("home");
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    img: "",
    name: "",
    price: "",
    desc: "",
    category: "",
    rating: "",
  });
  const [data, setData] = useState({ image: "" });

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          "https://server-rrb4.onrender.com/api/users"
        );
        if (response.data && response.data.users) {
          setUsers(response.data.users);
        } else {
          setUsers([]);
        }
        console.log(response.data);
      } catch (error) {
        console.error("Failed to fetch users:", error);
        setUsers([]);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);
  

  const handleDelete = async (userId) => {
    try {
      await axios.delete(
        `https://server-rrb4.onrender.com/api/usersdelet/${userId}`
      );
      setUsers(users.filter((user) => user._id !== userId));
      alert("User deleted successfully!");
    } catch (error) {
      console.error("Failed to delete user:", error);
      alert("Failed to delete user.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("AdminUser Token");
    navigate("/adminlogin");
  };

  useEffect(() => {
    if (activeSection === "addItems") {
      fetchProducts();
    }
  }, [activeSection]);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(
        "https://server-rrb4.onrender.com/api/products"
      );
      setProducts(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch products:", error);
      setLoading(false);
    }
  };

  const ImagetoBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  const uploadImage = async (e) => {
    const dataimg = await ImagetoBase64(e.target.files[0]);
    setData({ image: dataimg });
  };

  const handleAddProduct = async () => {
    try {
      const response = await axios.post(
        "https://server-rrb4.onrender.com/api/productsadd",
        {
          name: newProduct.name,
          price: newProduct.price,
          desc: newProduct.desc,
          category: newProduct.category,
          rating: newProduct.rating,
          img: data.image,
        }
      );

      if (response.status === 201) {
        alert("Product added successfully!");
        setProducts([...products, response.data]);
        setNewProduct({
          img: "",
          name: "",
          price: "",
          desc: "",
          category: "",
          rating: "",
        });
        setData({ image: "" });
      }
    } catch (error) {
      console.error("Error adding product:", error);
      alert("Failed to add product.");
    }
  };

  const handleDeleteProduct = async (productId) => {
    try {
      await axios.delete(
        `https://server-rrb4.onrender.com/api/products/${productId}`
      );
      setProducts(products.filter((product) => product._id !== productId));
      alert("Product deleted successfully!");
    } catch (error) {
      console.error("Failed to delete product:", error);
      alert("Failed to delete product.");
    }
  };

  const handleEditProduct = async (productId) => {
    const updatedProduct = products.find(
      (product) => product._id === productId
    );
    if (!updatedProduct) {
      alert("Product not found!");
      return;
    }

    const updatedName = prompt("Enter new product name:", updatedProduct.name);
    const updatedPrice = prompt(
      "Enter new product price:",
      updatedProduct.price
    );
    const updatedDesc = prompt("Enter new description:", updatedProduct.desc);
    const updatedCategory = prompt(
      "Enter new category:",
      updatedProduct.category
    );
    const updatedRating = prompt("Enter new rating:", updatedProduct.rating);
    const updatedImg = prompt("Enter new image URL:", updatedProduct.img);

    try {
      const response = await axios.put(
        `https://server-rrb4.onrender.com/api/products/${productId}`,
        {
          name: updatedName,
          price: updatedPrice,
          desc: updatedDesc,
          category: updatedCategory,
          rating: updatedRating,
          img: updatedImg,
        }
      );

      if (response.status === 200) {
        alert("Product updated successfully!");
        fetchProducts();
      }
    } catch (error) {
      console.error("Failed to update product:", error);
      alert("Failed to update product.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Sidebar */}
      <div className="w-full md:w-1/4 bg-gray-800 text-white p-4">
        <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
        <nav className="space-y-4">
          <button
            className={`w-full text-left px-4 py-2 rounded-lg ${
              activeSection === "home" ? "bg-gray-700" : "hover:bg-gray-700"
            }`}
            onClick={() => setActiveSection("home")}
          >
            Dashboard Home
          </button>
          <button
            className={`w-full text-left px-4 py-2 rounded-lg ${
              activeSection === "manageUsers"
                ? "bg-gray-700"
                : "hover:bg-gray-700"
            }`}
            onClick={() => setActiveSection("manageUsers")}
          >
            Manage Users
          </button>
          <button
            className={`w-full text-left px-4 py-2 rounded-lg ${
              activeSection === "addItems" ? "bg-gray-700" : "hover:bg-gray-700"
            }`}
            onClick={() => setActiveSection("addItems")}
          >
            Add Items
          </button>
        </nav>
        <div className="mt-6">
          <button
            className="w-full text-left px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 bg-gray-100 p-6 overflow-auto">
        {/* HOME DASHBOARD */}
        {activeSection === "home" && (
          <div>
            <h2 className="text-3xl font-bold mb-4">
              Welcome to the Admin Dashboard
            </h2>
            <p className="text-gray-600 mb-4">
              Here are some quick stats about your platform:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="bg-white p-4 shadow rounded-lg">
                <h3 className="text-xl font-semibold">Total Users</h3>
                <p className="text-3xl font-bold text-gray-800">
                  {users.length > 0 ? users.length : 0}
                </p>
              </div>
              <div className="bg-white p-4 shadow rounded-lg">
                <h3 className="text-xl font-semibold">Active Users</h3>
                <p className="text-3xl font-bold text-gray-800">
                  {users.filter((user) => user.isActive).length}
                </p>
              </div>
            </div>

            {/* Users Table in Home Section */}
            {Array.isArray(users) && users.length > 0 ? (
              <div className="overflow-x-auto mt-4">
                <h3 className="text-xl font-bold mb-2">All Users</h3>
                <table className="min-w-full table-auto bg-white shadow rounded-lg">
                  <thead className="bg-gray-200">
                    <tr>
                      <th className="px-4 py-2 text-left">Username</th>
                      <th className="px-4 py-2 text-left">Email</th>
                      <th className="px-4 py-2 text-left">Phone</th>
                      <th className="px-4 py-2 text-left">City</th>
                      <th className="px-4 py-2 text-left">State</th>
                      <th className="px-4 py-2 text-left">Country</th>
                      <th className="px-4 py-2 text-left">Active</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user) => (
                      <tr key={user._id} className="border-t">
                        <td className="px-4 py-2">{user.username}</td>
                        <td className="px-4 py-2">{user.email}</td>
                        <td className="px-4 py-2">{user.phone || "N/A"}</td>
                        <td className="px-4 py-2">{user.city || "N/A"}</td>
                        <td className="px-4 py-2">{user.state || "N/A"}</td>
                        <td className="px-4 py-2">{user.country || "N/A"}</td>
                        <td className="px-4 py-2">
                          {user.isActive ? (
                            <span className="text-green-600 font-medium">
                              Yes
                            </span>
                          ) : (
                            <span className="text-red-600 font-medium">No</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p>No users found.</p>
            )}
          </div>
        )}

        {/* MANAGE USERS */}
        {activeSection === "manageUsers" && (
          <div>
            <h2 className="text-3xl font-bold mb-4">Manage Users</h2>
            {loading ? (
              <p>Loading users...</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full table-auto bg-white shadow rounded-lg">
                  <thead>
                    <tr className="bg-gray-200">
                      <th className="px-4 py-2 text-left">ID</th>
                      <th className="px-4 py-2 text-left">Username</th>
                      <th className="px-4 py-2 text-left">Email</th>
                      <th className="px-4 py-2 text-left">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user) => (
                      <tr key={user._id}>
                        <td className="px-4 py-2">{user._id}</td>
                        <td className="px-4 py-2">{user.username}</td>
                        <td className="px-4 py-2">{user.email}</td>
                        <td className="px-4 py-2 flex gap-2">
                          <button
                            className="text-blue-500 underline"
                            onClick={() =>
                              navigate(`/dashboard/user/${user._id}`)
                            }
                          >
                            View Details
                          </button>
                          <button
                            className="text-red-500"
                            onClick={() => handleDelete(user._id)}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* ADD ITEMS */}
        {activeSection === "addItems" && (
          <div>
            <h2 className="text-3xl font-bold mb-4">Add Items</h2>

            {/* Product Form */}
            <div className="bg-white p-4 shadow rounded-lg mb-4">
              <h3 className="text-xl font-semibold mb-2">New Product</h3>
              <label htmlFor="image" className="block mb-2">
                Image
                <div className="h-20 w-full bg-slate-200 flex items-center justify-center rounded mb-2">
                  {data.image ? (
                    <img src={data.image} className="h-full" alt="Uploaded" />
                  ) : (
                    <span className="text-5xl">
                      <BiSolidCloudUpload />
                    </span>
                  )}
                  <input
                    type="file"
                    id="image"
                    accept="image/*"
                    onChange={uploadImage}
                    className="hidden"
                  />
                </div>
              </label>

              <input
                type="text"
                placeholder="Name"
                className="border p-2 w-full mb-2"
                value={newProduct.name}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, name: e.target.value })
                }
              />
              <input
                type="number"
                placeholder="Price"
                className="border p-2 w-full mb-2"
                value={newProduct.price}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, price: e.target.value })
                }
              />
              <input
                type="text"
                placeholder="Description"
                className="border p-2 w-full mb-2"
                value={newProduct.desc}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, desc: e.target.value })
                }
              />
              <input
                type="text"
                placeholder="Category"
                className="border p-2 w-full mb-2"
                value={newProduct.category}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, category: e.target.value })
                }
              />
              <input
                type="number"
                placeholder="Rating"
                className="border p-2 w-full mb-2"
                value={newProduct.rating}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, rating: e.target.value })
                }
              />
              <button
                className="bg-green-500 text-white px-4 py-2 rounded-lg"
                onClick={handleAddProduct}
              >
                Add Product
              </button>
            </div>

            {/* Product List */}
            {loading ? (
              <p>Loading products...</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full table-auto bg-white shadow rounded-lg">
                  <thead>
                    <tr className="bg-gray-200">
                      <th className="px-4 py-2">ID</th>
                      <th className="px-4 py-2">Name</th>
                      <th className="px-4 py-2">Price</th>
                      <th className="px-4 py-2">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map((product) => (
                      <tr key={product._id}>
                        <td className="px-4 py-2">{product._id}</td>
                        <td className="px-4 py-2">{product.name}</td>
                        <td className="px-4 py-2">${product.price}</td>
                        <td className="px-4 py-2 flex gap-2">
                          <button
                            className="text-blue-500"
                            onClick={() => handleEditProduct(product._id)}
                          >
                            Edit
                          </button>
                          <button
                            className="text-red-500"
                            onClick={() => handleDeleteProduct(product._id)}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
