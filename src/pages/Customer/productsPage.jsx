import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import ProductCard from "../../components/productCard";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [loadingStatus, setLoadingStatus] = useState("loading");

  useEffect(() => {
    if (loadingStatus === "loading") {
      axios.get(import.meta.env.VITE_BACKEND_URL + "/api/products")
        .then((res) => {
                console.log(res.data)
                setProducts(res.data.list)
                setLoadingStatus('loaded')
            }
        ).catch(
            (err)=>toast.error("Failed To Fetch Products"))
    }
  },[]);
  
  return (
    <div className="w-full flex flex-wrap justify-center gap-4 overflow-y-auto h-[calc(100vh-150px)] p-4">
        {
            products.map((product, index) => (
                <ProductCard key={product.id || index} product={product} />
              ))
        }
    </div>)
}
