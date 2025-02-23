import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import HomeImageSlider from "../../components/homeImageSlider";
import ProductCard from "../../components/productCard";

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
      {/* Hero Section */}
      <div className="relative w-full h-[474px] flex flex-col justify-center items-center text-white">
        <HomeImageSlider />

        <div className="relative text-center max-w-2xl rounded-md pt-[20px]">
          <h1 className="text-5xl md:text-4xl font-extrabold text-gray-400 drop-shadow-lg">
            Pure & Pristine E-Market
          </h1>
          <p className="text-xl md:text-2xl mt-4 text-gray-300 font-medium">
            Discover nature-inspired beauty products made with sustainability in
            mind.
          </p>
        </div>
      </div>

      <div className="w-full py-12 flex flex-col items-center">
    <h2 className="text-3xl font-extrabold text-green-800 mb-2">
        Featured Deals ✨
    </h2>
    <p className="text-lg text-gray-600 mb-6">
        Exclusive discounts on our best-selling nature-inspired products!
    </p>

    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-6xl">
        {products
            .filter(product => product.lastPrice < product.price) // Show only discounted products
            .slice(0, 4)
            .map((product) => (
                <ProductCard key={product.productId} product={product} />
            ))}
    </div>

    {products.some(product => product.lastPrice < product.price) ? (
        <Link
            to="/products"
            className="mt-8 px-6 py-3 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 transition"
        >
            View All Deals
        </Link>
    ) : (
        <p className="mt-6 text-gray-500 text-lg">
            No discounted products available at the moment. Check back soon!
        </p>
    )}
</div>


    </div>
  );
}
