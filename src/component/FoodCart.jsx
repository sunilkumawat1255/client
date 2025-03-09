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
  const [cart, setCart] = useState([]);
  const [imageUrls, setImageUrls] = useState({}); // Store converted images

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("http://localhost:8000/products");
        setProducts(res.data);
      } catch (err) {
        console.error("Error fetching products:", err);
      }
    };

    const fetchCart = async () => {
      if (userId) {
        try {
          const res = await axios.get(`http://localhost:8000/cart/${userId}`);
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
      await axios.post(`http://localhost:8000/cart/${userId}`, {
        productId: product._id, // Ensure _id is used
        quantity: 1,
      });

      toast.success(`${product.name} added to cart successfully!`, {
        position: "top-right",
        autoClose: 3000,
      });

      const res = await axios.get(`http://localhost:8000/cart/${userId}`);
      setCart(res.data);
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  // ✅ Convert Base64 to Blob URL
  function base64ToBlob(base64String) {
    if (!base64String.includes(",")) return base64String; // Prevent errors if already a URL
    let byteCharacters = atob(base64String.split(",")[1]);
    let byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    let byteArray = new Uint8Array(byteNumbers);
    let blob = new Blob([byteArray], { type: "image/png" });
    return URL.createObjectURL(blob);
  }

  // ✅ Convert images **AFTER** products are fetched
  useEffect(() => {
    if (products.length === 0) return; // Prevent running on empty data
    const newImageUrls = {};
    products.forEach((product) => {
      newImageUrls[product._id] = base64ToBlob(product.img); // ✅ Use _id instead of id
    });
    setImageUrls(newImageUrls);
  }, [products]); // ✅ Now it updates when products change

  return (
    <div>
      <div className="flex flex-wrap gap-10 justify-center lg:justify-center mx-6 my-10">
        {products.map((product) => (
          <li key={product._id} className="foodcart-li">
            <div className="maindivfoodcart font-bold bg-white p-5 flex flex-col rounded-lg gap-2 shadow-md hover:shadow-lg transition-shadow duration-300">
              <Link to={`/products/${product._id}`}>
                <img
                  src={imageUrls[product._id] || ""} // ✅ Corrected product ID mapping
                  alt="Product"
                  className="imgfoodcart h-[130px] rounded-t-lg transition-transform duration-500 ease-in-out hover:scale-110"
                />
              </Link>
              <div className="text-sm flex justify-between mt-2">
                <h2 className="text-lg font-semibold">{product.name}</h2>
                <span className="text-green-500">₹{product.price}</span>
              </div>
              <p className="text-sm font-normal text-gray-600">
                {product.desc.slice(0, 50)}...
              </p>
              <div className="flex justify-between items-center mt-auto">
                <span className="flex justify-center items-center text-yellow-500">
                  <AiFillStar className="mr-1" /> {product.rating}
                </span>
                <button
                  onClick={() => handleAddToCart(product)}
                  className="p-2 text-white bg-green-500 outline-none hover:bg-green-600 rounded-sm text-sm transition-colors duration-300"
                >
                  Add to cart
                </button>
              </div>
            </div>
          </li>
        ))}
      </div>
      <ToastContainer />
    </div>
  );
};

export default FoodCart;










// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { AiFillStar } from "react-icons/ai";
// import "./foodcart.css";
// import { Link } from "react-router-dom";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";


// const FoodCart = () => {
//   const [products, setProducts] = useState([]);
//   const userId = localStorage.getItem("EcomUserId");
//   const [cart, setCart] = useState([]);
//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const res = await axios.get("http://localhost:8000/products");
//         setProducts(res.data);
//         // console.log(res)
//       } catch (err) {
//         console.error("Error fetching products:", err);
//       }
//     };
//     const fetchCart = async () => {
//       if (userId) {
//         try {
//           const res = await axios.get(`http://localhost:8000/cart/${userId}`);
//           setCart(res.data);
//         } catch (err) {
//           console.error("Error fetching cart:", err);
//         }
//       }
//     };

//     fetchProducts();
//     fetchCart();
//   }, [userId]);

//   const handleAddToCart = async (product) => {
//     if (!userId) {
//         alert("Please login to add products to cart");
//         return;
//     }

//     try {
//         await axios.post(`http://localhost:8000/cart/${userId}`, {
//             productId: product._id,  // Ensure _id is used
//             quantity: 1,
//         });

//         toast.success(`${product.name} added to cart successfully!`, {
//             position: "top-right",
//             autoClose: 3000,
//         });

//         const res = await axios.get(`http://localhost:8000/cart/${userId}`);
//         setCart(res.data);
//     } catch (error) {
//         console.error("Error adding to cart:", error);
//     }
// };



// // converting imgage to simple format
// function base64ToBlob(base64String) {
//   let byteCharacters = atob(base64String.split(",")[1]);
//   let byteNumbers = new Array(byteCharacters.length);
//   for (let i = 0; i < byteCharacters.length; i++) {
//       byteNumbers[i] = byteCharacters.charCodeAt(i);
//   }
//   let byteArray = new Uint8Array(byteNumbers);
//   let blob = new Blob([byteArray], { type: "image/png" });
//   return URL.createObjectURL(blob);
// }


//   return (
//     <div>
//       {/* <h1>Products</h1> */}
//       <div className="flex flex-wrap gap-10 justify-center lg:justify-center mx-6 my-10">
//         {products.map((product) => (
             
//           <li key={product.id} className="foodcart-li">
//             <div className="maindivfoodcart font-bold  bg-white p-5 flex flex-col rounded-lg gap-2 shadow-md hover:shadow-lg transition-shadow duration-300">
//              <Link to={`/products/${product.id}`}> <img
//                 // src={`./img/${product.img}`}
//                 src={base64ToBlob(product.img)}
//                 alt="img errr"
//                 className="imgfoodcart h-[130px] rounded-t-lg transition-transform duration-500 ease-in-out hover:scale-110"
//               /></Link>
//               <div className="text-sm flex justify-between mt-2">
//                 <h2 className="text-lg font-semibold">{product.name}</h2>
//                 <span className="text-green-500">₹{product.price}</span>
//               </div>
//               <p className="text-sm font-normal text-gray-600">
//                 {product.desc.slice(0, 50)}...
//               </p>
//               <div className="flex justify-between items-center mt-auto">
//                 <span className="flex justify-center items-center text-yellow-500">
//                   <AiFillStar className="mr-1" /> {product.rating}
//                 </span>
//                 <button
//                   onClick={() => handleAddToCart(product)}
//                   className="p-2 text-white bg-green-500 outline-none hover:bg-green-600 rounded-sm text-sm transition-colors duration-300"
//                 >
//                   Add to cart
//                 </button>
//               </div>
//             </div>
//           </li>
//         ))}
//       </div>
//        {/* Toast Container */}
//        <ToastContainer />
//     </div>
//   );
// };

// export default FoodCart;
