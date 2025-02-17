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
    <div className="w-full flex flex-col items-center gap-4 p-4">
      <div className="w-full flex justify-center mb-6">
        <input
          type="text"
          className="w-1/2 p-3 rounded-lg border border-gray-300 shadow-md focus:outline-none focus:ring-2 focus:ring-green-500"
          placeholder="Search Products"
        />
      </div>
      <div className="w-full flex flex-wrap justify-center gap-4 overflow-y-auto">
        {products.map((product, index) => (
          <ProductCard key={product.id || index} product={product} />
        ))}
      </div>
    </div>
  );
}
