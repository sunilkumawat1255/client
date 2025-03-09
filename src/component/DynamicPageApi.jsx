export const DynamicPageApi = async ({ params }) => {
  // =======Backend URL=======
  const backendURL = "http://localhost:8000"; // Update if hosted
  const productId = params.productID.toString(); // Ensure it's a string
  try {
    const res = await fetch(`${backendURL}/products`);
    if (!res.ok) {
      throw new Error(`HTTP error! Status: ${res.status}`);
    }
    const data = await res.json();
    const singleProduct = data.find((product) => product._id === productId);
    if (!singleProduct) {
      throw new Error("Product not found");
    }
    const matchingProducts = data.filter(
      (product) => product.category === singleProduct.category
    );
    return {
      singleProduct,
      matchingProducts,
    };
  } catch (err) {
    console.error("Error fetching products:", err);
    throw err;
  }
};
