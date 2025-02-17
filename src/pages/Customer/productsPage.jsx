import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import ProductCard from "../../components/productCard";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [loadingStatus, setLoadingStatus] = useState("loading");

  useEffect(() => {
    if (loadingStatus === "loading") {
      axios
        .get(import.meta.env.VITE_BACKEND_URL + "/api/products")
        .then((res) => {
          setProducts(res.data.list);
          setLoadingStatus("loaded");
        })
        .catch((err) => toast.error("Failed To Fetch Products"));
    }
  }, []);

  return (
    <>
      {loadingStatus == "loaded" && (
        <div className="w-full flex flex-col items-center gap-4 p-4">
          <div className="w-full flex justify-center mb-6">
            <input
              type="text"
              className="w-1/2 p-3 rounded-lg border border-gray-300 shadow-md focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Search Products"
            />
          </div>
          <div className="w-full max-h-[70vh] overflow-y-auto flex flex-wrap justify-center gap-4">
            {products.map((product, index) => (
              <ProductCard key={product.id || index} product={product} />
            ))}
          </div>
        </div>
      )}
      {loadingStatus == "loading" && (
        <div className="fixed top-0 left-0 w-full h-screen flex flex-col items-center justify-center bg-opacity-50 bg-primary">
          <div className="w-12 h-12 border-4 border-muted border-t-accent border-b-accent rounded-full animate-spin"></div>
          <p className="mt-3 text-dark text-lg font-semibold animate-pulse">
            Loading...
          </p>
        </div>
      )}
    </>
  );
}
