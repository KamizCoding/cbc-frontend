import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import ProductCard from "../../components/productCard";
import { Link } from "react-router-dom";
import { FaShoppingCart, FaSearch } from "react-icons/fa";
import Footer from "../../components/footer";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [loadingStatus, setLoadingStatus] = useState("loading");
  const [query, setQuery] = useState("");

  useEffect(() => {
    if (loadingStatus === "loading") {
      axios
        .get(import.meta.env.VITE_BACKEND_URL + "/api/products")
        .then((res) => {
          setProducts(Array.isArray(res.data.list) ? res.data.list : []);
          setLoadingStatus("loaded");
        })
        .catch(() => {
          toast.error("Failed To Fetch Products");
          setProducts([]);
          setLoadingStatus("loaded");
        });
    }
  }, []);

  function search(e) {
    const query = e.target.value;
    setQuery(query);
    setLoadingStatus("loading");

    if (query === "") {
      axios
        .get(import.meta.env.VITE_BACKEND_URL + "/api/products")
        .then((res) => {
          setProducts(Array.isArray(res.data.list) ? res.data.list : []);
          setLoadingStatus("loaded");
        })
        .catch(() => {
          toast.error("Failed To Fetch Products");
          setProducts([]);
          setLoadingStatus("loaded");
        });
    } else {
      axios
        .get(import.meta.env.VITE_BACKEND_URL + "/api/products/search/" + query)
        .then((res) => {
          setProducts(Array.isArray(res.data.list) ? res.data.list : []);
          setLoadingStatus("loaded");
        })
        .catch(() => {
          toast.error("Failed To Fetch Products");
          setProducts([]);
          setLoadingStatus("loaded");
        });
    }
  }

  return (
    <div className="overflow-y-auto">
      <div className="w-full min-h-screen flex flex-col overflow-auto">
        <div className="w-full flex justify-center mt-10 mb-6">
          <div className="relative w-[90%] sm:w-1/2">
            <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 text-lg" />
            <input
              type="text"
              className="w-full p-4 pl-12 rounded-full border border-gray-300 shadow-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition-all duration-300"
              placeholder="Search for products..."
              onChange={search}
              value={query}
            />
          </div>
        </div>

        {loadingStatus === "loaded" && (
          <div className="w-full flex flex-col lg:items-center lg:gap-4 lg:p-4 lg:pb-2">
            <div className="w-full grid grid-cols-2 gap-2 pb-4 lg:flex lg:flex-wrap lg:justify-center lg:gap-4 lg:pb-2">
              {products.length > 0 ? (
                products.map((product, index) => (
                  <ProductCard key={product.id || index} product={product} />
                ))
              ) : (
                <p className="text-dark text-lg font-semibold">
                  No products found.
                </p>
              )}
            </div>
          </div>
        )}

        {loadingStatus === "loading" && (
          <div className="fixed top-0 left-0 w-full h-screen flex flex-col items-center justify-center bg-opacity-50 bg-primary">
            <div className="w-12 h-12 border-4 border-accent border-t-accent border-b-accent rounded-full animate-spin"></div>
            <p className="mt-3 text-dark text-lg font-semibold animate-pulse">
              Loading...
            </p>
          </div>
        )}

        <div className="relative">
          <Footer />
          <Link
            to="/cart"
            className="absolute top-[-30px] right-6 transform -translate-x-1/2 bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-600 transition flex items-center gap-2"
          >
            <FaShoppingCart size={24} />
            <span className="hidden md:inline font-semibold">Cart</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
