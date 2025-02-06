import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

export default function ProductInfoPage() {
  const parameters = useParams();
  const productId = parameters.id;
  const [product, setProduct] = useState(null);
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    console.log(productId);
    axios
      .get(import.meta.env.VITE_BACKEND_URL + "/api/products/" + productId)
      .then((res) => {
        console.log(res.data);

        //If Null
        if (res.data == null) {
          setStatus("not-found");
        }
      });
  }, []);

  return (
    <div>
      {status == "loading" && (
        <div className="fixed top-0 left-0 w-full h-screen flex flex-col items-center justify-center bg-opacity-50 bg-secondary">
          <div className="w-32 h-32 border-t-2 border-b-2 border-gray-300 border-t-dark border-b-dark rounded-full animate-spin"></div>
          <p className="mt-4 text-dark text-xl font-semibold animate-pulse">
            Loading...
          </p>
        </div>
      )}
      {status == "not-found" && (
        <div className="flex flex-col items-center justify-center h-screen text-center">
          <h1 className="text-4xl font-bold text-accent">Product Not Found</h1>
          <p className="text-gray-700 text-lg mt-2">
            The product you are looking for does not exist or has been removed.
          </p>
          <Link
            to="/products"
            className="mt-6 px-6 py-3 bg-accent text-white font-semibold rounded-md shadow-md hover:bg-dark transition-all duration-300"
          >
            Back to Products
          </Link>
        </div>
      )}

      {status == "found" && <div>product found</div>}
    </div>
  );
}
