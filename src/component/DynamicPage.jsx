import { useLoaderData, useNavigate } from "react-router-dom";
import { AiFillStar } from "react-icons/ai";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";

export const DynamicPage = () => {
  const navigate = useNavigate();
  const backendURL = "https://server-rrb4.onrender.com";
  const userId = localStorage.getItem("EcomUserId");

  // State
  const [product, setProduct] = useState(null);
  const [relatedProduct, setRelatedProduct] = useState(null);
  const [imageUrls, setImageUrls] = useState({});
  const [loading, setLoading] = useState(false);

  const productobj = useLoaderData();
  const { singleProduct, matchingProducts } = productobj;

  useEffect(() => {
    if (singleProduct) {
      setLoading(true);
      setTimeout(() => {
        setProduct(singleProduct);
        setLoading(false);
      }, 700);
    }

    if (matchingProducts) {
      setRelatedProduct(matchingProducts);
    }
  }, [singleProduct, matchingProducts]);

  const handleProductClick = (productId) => {
    setLoading(true);
    navigate(`/products/${productId}`);
  };

  const handleAddToCart = async (product) => {
    if (!userId) {
      toast.error("Please login to add products to cart", {
        position: "top-right",
        autoClose: 3000,
      });
      return;
    }
    try {
      await axios.post(`${backendURL}/cart/${userId}`, {
        productId: product._id,
        quantity: 1,
      });
      toast.success(`${product.name} added to cart successfully!`, {
        position: "top-right",
        autoClose: 3000,
      });
    } catch (error) {
      console.error("Error adding to cart:", error);
      toast.error("Failed to add product to cart. Please try again.", {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  function base64ToBlob(base64String) {
    if (!base64String || !base64String.includes(",")) return base64String;
    const byteCharacters = atob(base64String.split(",")[1]);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: "image/png" });
    return URL.createObjectURL(blob);
  }

  useEffect(() => {
    if (!product) return;
    const newImageUrls = { ...imageUrls };
    newImageUrls[product._id] = base64ToBlob(product.img);

    if (relatedProduct) {
      relatedProduct.forEach((item) => {
        newImageUrls[item._id] = base64ToBlob(item.img);
      });
    }

    setImageUrls(newImageUrls);
  }, [product, relatedProduct]);

  // ✅ Skeleton Loader Component
  const SkeletonLoader = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 animate-pulse">
      <div className="bg-gray-300 w-full h-80 rounded-lg"></div>
      <div className="space-y-4">
        <div className="h-8 bg-gray-300 rounded w-3/4"></div>
        <div className="h-4 bg-gray-300 rounded w-1/2"></div>
        <div className="h-4 bg-gray-300 rounded w-full"></div>
        <div className="h-4 bg-gray-300 rounded w-full"></div>
        <div className="h-10 bg-gray-400 rounded w-1/3 mt-4"></div>
      </div>
    </div>
  );

  return (
    <>
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* ✅ Main Product Section (Skeleton Loader if Loading) */}
        <div>
          {loading ? (
            <SkeletonLoader />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="relative">
                <img
                  src={imageUrls[product?._id] || ""}
                  alt={product?.name}
                  className="w-full h-auto object-cover rounded-lg shadow-lg transform transition duration-300 hover:scale-105"
                />
              </div>
              <div className="flex flex-col justify-between">
                <div>
                  <h2 className="text-3xl font-semibold text-gray-800">
                    {product?.name}
                  </h2>
                  <p className="text-sm text-gray-500 mt-2">{product?.desc}</p>
                  <div className="mt-4 flex items-center space-x-2">
                    <span className="flex items-center text-yellow-500">
                      <AiFillStar className="mr-1" /> {product?.rating}
                    </span>
                  </div>
                  <div className="flex justify-between mt-6">
                    <span className="text-2xl font-semibold text-green-600">
                      ₹{product?.price}
                    </span>
                    <button
                      onClick={() => handleAddToCart(product)}
                      className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition duration-300"
                    >
                      Add to cart
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* ✅ Related Products Always Visible */}
        <div className="mt-12">
          <h3 className="text-2xl font-semibold text-gray-800 mb-6">
            Related Products
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {relatedProduct &&
              relatedProduct.map((item) => (
                <div
                  key={item._id}
                  className="border rounded-lg shadow-md p-4 hover:shadow-lg transition duration-300"
                >
                  <button onClick={() => handleProductClick(item._id)}>
                    <img
                      src={imageUrls[item._id] || ""}
                      alt={item.name}
                      className="w-full h-48 object-contain rounded-lg mb-4"
                    />
                  </button>
                  <h4 className="text-lg font-medium text-gray-800">
                    {item.name}
                  </h4>
                  <p className="text-sm text-gray-500">
                    {item.desc.length > 50
                      ? `${item.desc.slice(0, 50)}...`
                      : item.desc}
                  </p>
                  <div className="mt-2 flex items-center justify-between">
                    <span className="text-green-600 font-semibold">
                      ₹{item.price}
                    </span>
                    <button
                      onClick={() => handleAddToCart(item)}
                      className="px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300"
                    >
                      Add to cart
                    </button>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>

      <ToastContainer />
    </>
  );
};
