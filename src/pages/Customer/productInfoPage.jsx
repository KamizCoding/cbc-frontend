import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ImageSlider from "../../components/imageSlider";

export default function ProductInfoPage() {
  const { id: productId } = useParams();
  const [product, setProduct] = useState(null);
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    console.log(productId);
    axios
      .get(import.meta.env.VITE_BACKEND_URL + "/api/products/" + productId)
      .then((res) => {
        console.log(res.data);

        if (!res.data) {
          setStatus("not-found");
        } else {
          setProduct(res.data);
          setStatus("found");
        }
      });
  }, []);

  return (
    <div className="min-h-screen bg-primary flex flex-col items-center py-10">
      {/* Loader */}
      {status === "loading" && (
        <div className="fixed top-0 left-0 w-full h-screen flex flex-col items-center justify-center bg-opacity-50 bg-primary">
          <div className="w-16 h-16 border-4 border-muted border-t-accent border-b-accent rounded-full animate-spin"></div>
          <p className="mt-4 text-dark text-xl font-semibold animate-pulse">
            Loading...
          </p>
        </div>
      )}

      {/* 404 Not Found */}
      {status === "not-found" && (
        <div className="flex flex-col items-center justify-center h-screen text-center bg-primary p-10 shadow-lg rounded-xl">
          <h1 className="text-6xl font-extrabold text-accent">404</h1>
          <h2 className="text-3xl font-bold text-gray-800 mt-3">
            Oops! This Product is Missing
          </h2>
          <p className="text-gray-600 text-lg mt-2">
            We couldn’t find the product you were looking for. It may have been
            removed or never existed.
          </p>
          <Link
            to="/products"
            className="mt-6 px-6 py-3 bg-secondary text-dark font-semibold rounded-md shadow-md hover:bg-dark hover:text-white transition-all duration-300"
          >
            Back to Products
          </Link>
        </div>
      )}

      {/* Product Details */}
      {status === "found" && (
        <div className="w-full max-w-6xl bg-white shadow-lg rounded-xl p-10 grid grid-cols-2 gap-8 items-start">
          {/* Image Section */}
          <div className="rounded-xl overflow-hidden">
            <ImageSlider images={product.images} />
          </div>

          {/* Product Details Section */}
          <div className="space-y-6">
            {/* Product Name */}
            <h1 className="text-5xl font-bold text-dark">{product.productName}</h1>
            <h2 className="text-xl font-semibold text-secondary">
              {product.altNames.join(" | ")}
            </h2>

            {/* Stock Status */}
            <p className={`text-lg font-semibold ${product.stock > 0 ? "text-green-600" : "text-red-500"}`}>
              {product.stock > 0 ? "In Stock" : "Out of Stock"}
            </p>

            {/* Price Section */}
            <div className="flex items-center space-x-4 text-2xl">
              {product.price > product.lastPrice && (
                <span className="line-through text-red-500">${product.price}</span>
              )}
              <span className="text-accent font-bold text-4xl">${product.lastPrice}</span>
            </div>

            {/* Product Features */}
            <div className="bg-muted p-4 rounded-lg">
              <h3 className="text-lg font-bold text-dark">Key Features</h3>
              <ul className="list-disc pl-5 text-gray-700">
                <li>High-quality ingredients for nourishment</li>
                <li>Long-lasting hydration</li>
                <li>Dermatologically tested</li>
                <li>Suitable for all hair types</li>
              </ul>
            </div>

            {/* Ratings & Reviews */}
            <div className="flex items-center space-x-2">
              <span className="text-yellow-500 text-2xl">⭐ 4.8</span>
              <span className="text-gray-600">(120 Reviews)</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
