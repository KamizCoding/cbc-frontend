import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import ImageSlider from "../../components/imageSlider";
import { addToCart } from "../../utils/cartfunction";
import toast from "react-hot-toast";

export default function ProductInfoPage() {
  const { id: productId } = useParams();
  const [product, setProduct] = useState(null);
  const [status, setStatus] = useState("loading");
  const nav = useNavigate();

  useEffect(() => {
    axios
      .get(import.meta.env.VITE_BACKEND_URL + "/api/products/" + productId)
      .then((res) => {
        if (!res.data) {
          setStatus("not-found");
        } else {
          setProduct(res.data);
          setStatus("found");
        }
      });
  }, []);

  function onAddToCartClicked() {
    addToCart(product.productId, 1);
    toast.success(product.productId + " was added to the cart successfully");
  }

  function onBuyNowClicked() {
    nav("/shipping", {
      state: {
        products: [
          {
            productId: product.productId,
            quantity: 1,
          },
        ],
      },
    });
  }

  return (
    <div className="w-full h-[calc(100vh-150px)] overflow-y-auto bg-primary px-4 lg:px-8 py-6 flex flex-col">
      {status === "loading" && (
        <div className="fixed top-0 left-0 w-full h-screen flex flex-col items-center justify-center bg-opacity-50 bg-primary">
          <div className="w-12 h-12 border-4 border-muted border-t-accent border-b-accent rounded-full animate-spin"></div>
          <p className="mt-3 text-dark text-lg font-semibold animate-pulse">
            Loading...
          </p>
        </div>
      )}

      {status === "not-found" && (
        <div className="flex flex-col items-center justify-center min-h-screen text-center bg-primary p-4 lg:p-6 shadow-lg rounded-xl">
          <h1 className="text-4xl font-extrabold text-accent">404</h1>
          <h2 className="text-xl font-bold text-gray-800 mt-2">
            Oops! This Product is Missing
          </h2>
          <p className="text-gray-600 text-sm mt-2">
            We couldn’t find the product you were looking for. It may have been
            removed or never existed.
          </p>
          <Link
            to="/products"
            className="mt-4 px-4 py-2 bg-secondary text-dark font-semibold rounded-md shadow-md hover:bg-dark hover:text-white transition-all duration-300"
          >
            Back to Products
          </Link>
        </div>
      )}

      {status === "found" && (
        <div className="w-full max-w-5xl bg-white shadow-lg rounded-xl p-6 lg:p-8 mx-auto mt-6 flex flex-col lg:flex-row gap-6 items-center">
          <h1 className="text-3xl font-bold text-dark text-center lg:hidden">
            {product.productName}
          </h1>

          <div className="flex flex-col items-center w-full lg:w-[40%] max-w-[400px] mx-auto lg:mx-0">
            <div className="w-full h-auto overflow-hidden rounded-lg">
              <ImageSlider images={product.images} />
            </div>
          </div>

          <div className="flex flex-col justify-center h-full w-full p-4 lg:p-6 leading-snug">
            <h1 className="hidden lg:block text-3xl font-bold text-dark">
              {product.productName}
            </h1>

            <h2 className="text-md lg:text-lg font-semibold text-secondary">
              {product.altNames.join(" | ")}
            </h2>

            <p
              className={`text-sm lg:text-md font-semibold ${
                product.stock > 0 ? "text-green-600" : "text-red-500"
              }`}
            >
              {product.stock > 0 ? "In Stock" : "Out of Stock"}
            </p>

            <div className="flex items-center space-x-3 text-sm lg:text-lg">
              {product.price > product.lastPrice && (
                <span className="line-through text-red-500">
                  ${product.price}
                </span>
              )}
              <span className="text-accent font-bold text-2xl lg:text-3xl">
                ${product.lastPrice}
              </span>
            </div>

            <p className="text-gray-800 text-sm lg:text-md leading-relaxed bg-gray-100 p-3 rounded-lg shadow-md">
              {product.description}
            </p>

            <div className="flex flex-col lg:flex-row gap-3 mt-4">
              <button
                className="bg-dark text-white py-2 px-5 rounded-lg font-semibold text-md hover:bg-accent transition-all duration-300"
                onClick={onAddToCartClicked}
              >
                Add To Cart
              </button>

              <button
                className="bg-accent text-white py-2 px-5 rounded-lg font-semibold text-md hover:bg-dark transition-all duration-300"
                onClick={onBuyNowClicked}
              >
                Buy Now
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
