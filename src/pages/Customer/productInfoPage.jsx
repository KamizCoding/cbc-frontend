import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ImageSlider from "../../components/imageSlider";

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

        //If Product Was Found
        if (res.data != null) {
          setProduct(res.data);
          setStatus("found");
        }
      });
  }, []);

  return (
    <div>
      {status == "loading" && (
        <div className="fixed top-0 left-0 w-full h-screen flex flex-col items-center justify-center bg-opacity-50 bg-primary">
          <div className="w-32 h-32 border-t-2 border-b-2 border-gray-300 border-t-dark border-b-dark rounded-full animate-spin"></div>
          <p className="mt-4 text-dark text-xl font-semibold animate-pulse">
            Loading...
          </p>
        </div>
      )}
      {status == "not-found" && (
        <div className="flex flex-col items-center justify-center h-screen text-center bg-primary">
          <h1 className="text-6xl font-extrabold text-accent">404</h1>
          <h2 className="text-3xl font-bold text-gray-800 mt-2">
            Oops! This Product is Missing
          </h2>
          <p className="text-gray-600 text-lg mt-2">
            We couldn’t find the product you were looking for. It may have been
            removed or never existed.
          </p>
          <Link
            to="/products"
            className="mt-6 px-6 py-3 bg-accent text-white font-semibold rounded-md shadow-md hover:bg-dark transition-all duration-300"
          >
            Back to Products
          </Link>
        </div>
      )}

      {status === "found" && (
        <div className="w-full h-full flex items-center justify-center">
          <div className="w-[35%] h-full">
            <ImageSlider images={product.images} />
          </div>
          <div className="w-[65%] h-full p-4">
            <h1 className="text-4xl font-bold text-gray-800">
              {product.productName}
            </h1>
            <h1 className="text-2xl font-semibold text-gray-500">
              {product.altNames.join(" | ")}
            </h1>
            <p className="text-xl text-gray-600">
              {product.price > product.lastPrice && (
                <span className="line-through text-red-500">
                  ${product.price}
                </span>
              )}
              <span>${product.lastPrice}</span>
            </p>
            <p className="text-xl text-gray-600">{product.description}</p>
          </div>
        </div>
      )}
    </div>
  );
}
