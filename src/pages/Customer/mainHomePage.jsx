import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import HomeImageSlider from "../../components/homeImageSlider";
export default function MainHomePage() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get(import.meta.env.VITE_BACKEND_URL + "/api/products")
      .then((res) => setProducts(res.data.list || []))
      .catch(() => setProducts([]));
  }, []);

  return (
    <div className="flex-1 w-full overflow-y-auto bg-primary">
      <div className="relative w-full h-[474px] flex flex-col justify-center items-center text-white">
        <HomeImageSlider />

        <div className="relative text-center max-w-2xl rounded-md p-[30px]">
          <h1 className="text-5xl md:text-4xl font-extrabold text-gray-400 drop-shadow-lg">
            Pure & Pristine E-Market
          </h1>
          <p className="text-xl md:text-2xl mt-4 text-gray-300 font-medium">
            Discover nature-inspired beauty products made with sustainability in
            mind.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-6xl">
        {products
          .filter((product) => product.lastPrice < product.price)
          .slice(0, 8)
          .map((product) => (
            <div
              key={product.productId}
              className="bg-white shadow-md rounded-lg p-4 flex flex-col items-center min-h-[380px]"
            >
              <img
                src={product.images?.[0] || "/placeholder.png"}
                alt={product.productName}
                className="w-full h-48 object-cover rounded-lg"
              />
              <h3 className="text-lg font-semibold text-gray-900 mt-4">
                {product.productName}
              </h3>
              <p className="text-gray-500 text-sm">{product.productId}</p>

              <div className="mt-2">
                <span className="text-green-600 font-bold text-lg">
                  LKR. {product.lastPrice.toFixed(2)}
                </span>
                <span className="text-gray-500 line-through ml-2">
                  LKR. {product.price.toFixed(2)}
                </span>
              </div>

              <Link
                to={`/products/productinfo/${product.productId}`}
                className="mt-4 px-4 py-2 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 transition"
              >
                View Details
              </Link>
            </div>
          ))}
      </div>

      {products.some((product) => product.lastPrice < product.price) && (
        <div className="flex justify-center mt-8">
          <Link
            to="/products"
            className="px-6 py-3 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 transition"
          >
            View All Products
          </Link>
        </div>
      )}
    </div>
  );
}
