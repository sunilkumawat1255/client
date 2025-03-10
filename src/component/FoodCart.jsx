import React, { useState, useEffect } from "react";
import axios from "axios";
import { AiFillStar } from "react-icons/ai";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./foodcart.css";

const FoodCart = () => {
  const [products, setProducts] = useState([]);
  const userId = localStorage.getItem("EcomUserId");
  const [, setCart] = useState([]);
  const [imageUrls, setImageUrls] = useState({});

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("https://server-rrb4.onrender.com/products");
        setProducts(res.data);
      } catch (err) {
        console.error("Error fetching products:", err);
      }
    };

    const fetchCart = async () => {
      if (userId) {
        try {
          const res = await axios.get(`https://server-rrb4.onrender.com/cart/${userId}`);
          setCart(res.data);
        } catch (err) {
          console.error("Error fetching cart:", err);
        }
      }
    };

    fetchProducts();
    fetchCart();
  }, [userId]);

  const handleAddToCart = async (product) => {
    if (!userId) {
      alert("Please login to add products to cart");
      return;
    }

    try {
      await axios.post(`https://server-rrb4.onrender.com/cart/${userId}`, {
        productId: product._id,
        quantity: 1,
      });

      toast.success(`${product.name} added to cart successfully!`, {
        position: "top-right",
        autoClose: 3000,
      });

      const res = await axios.get(`https://server-rrb4.onrender.com/cart/${userId}`);
      setCart(res.data);
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

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
    if (products.length === 0) return;
    const newImageUrls = {};
    products.forEach((product) => {
      newImageUrls[product._id] = base64ToBlob(product.img);
    });
    setImageUrls(newImageUrls);
  }, [products]);

  return (
    <div className="container mx-auto px-4 py-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {products.map((product) => (
          <div
            key={product._id}
            className="bg-white rounded-xl shadow-lg overflow-hidden transition-transform transform hover:scale-105 duration-300"
          >
            <Link to={`/products/${product._id}`}>
              <img
                src={imageUrls[product._id] || ""}
                alt={product.name}
                className="imgfoodcart h-[130px] rounded-t-lg transition-transform duration-500 ease-in-out hover:scale-110"
              />
            </Link>
            <div className="p-4">
              <h2 className="text-lg font-semibold text-gray-800">{product.name}</h2>
              <p className="text-gray-600 text-sm">{product.desc.slice(0, 50)}...</p>
              <div className="flex justify-between items-center mt-3">
                <span className="text-lg font-bold text-green-500">₹{product.price}</span>
                <span className="flex items-center text-yellow-500 text-sm">
                  <AiFillStar className="mr-1" /> {product.rating}
                </span>
              </div>
              <button
                onClick={() => handleAddToCart(product)}
                className="mt-4 w-full bg-green-500 text-white py-2 rounded-lg text-sm hover:bg-green-600 transition duration-300"
              >
                Add to cart
              </button>
            </div>
          </div>
        ))}
      </div>
      <ToastContainer />
    </div>
  );
};

export default FoodCart;
