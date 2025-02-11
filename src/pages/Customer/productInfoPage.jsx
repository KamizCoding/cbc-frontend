import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ImageSlider from "../../components/imageSlider";
import { addToCart } from "../../utils/cartfunction";
import toast from "react-hot-toast";

export default function ProductInfoPage() {
    const { id: productId } = useParams();
    const [product, setProduct] = useState(null);
    const [status, setStatus] = useState("loading");

    useEffect(() => {
        axios.get(import.meta.env.VITE_BACKEND_URL + "/api/products/" + productId)
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

    return (
        <div className="flex flex-col w-full h-[calc(100vh-150px)] overflow-y-auto bg-primary px-4 sm:px-8">
            {status === "loading" && (
                <div className="fixed top-0 left-0 w-full h-screen flex flex-col items-center justify-center bg-opacity-50 bg-primary">
                    <div className="w-12 h-12 border-4 border-muted border-t-accent border-b-accent rounded-full animate-spin"></div>
                    <p className="mt-3 text-dark text-lg font-semibold animate-pulse">Loading...</p>
                </div>
            )}

            {status === "not-found" && (
                <div className="flex flex-col items-center justify-center min-h-screen text-center bg-primary p-4 sm:p-6 shadow-lg rounded-xl">
                    <h1 className="text-4xl font-extrabold text-accent">404</h1>
                    <h2 className="text-xl font-bold text-gray-800 mt-2">Oops! This Product is Missing</h2>
                    <p className="text-gray-600 text-sm mt-2">We couldn’t find the product you were looking for. It may have been removed or never existed.</p>
                    <Link to="/products" className="mt-4 px-4 py-2 bg-secondary text-dark font-semibold rounded-md shadow-md hover:bg-dark hover:text-white transition-all duration-300">
                        Back to Products
                    </Link>
                </div>
            )}

            {status === "found" && (
                <div className="w-full max-w-5xl bg-white shadow-lg rounded-xl p-6 sm:p-8 mx-auto mt-6 grid grid-cols-1 md:grid-cols-[1fr_1.2fr] gap-6 items-center">
                    
                    {/* 🔥 Fixed Image Slider Section */}
                    <div className="rounded-xl overflow-hidden flex flex-col items-center max-w-[400px]">
                        <ImageSlider images={product.images} />
                    </div>

                    {/* Product Details */}
                    <div className="flex flex-col justify-center h-full p-4 sm:p-6 leading-snug">
                        <div className="space-y-3">
                            <h1 className="text-3xl sm:text-4xl font-bold text-dark">{product.productName}</h1>
                            <h2 className="text-md sm:text-lg font-semibold text-secondary">{product.altNames.join(" | ")}</h2>

                            <p className={`text-sm sm:text-md font-semibold ${product.stock > 0 ? "text-green-600" : "text-red-500"}`}>
                                {product.stock > 0 ? "In Stock" : "Out of Stock"}
                            </p>

                            <div className="flex items-center space-x-3 text-sm sm:text-lg">
                                {product.price > product.lastPrice && <span className="line-through text-red-500">${product.price}</span>}
                                <span className="text-accent font-bold text-2xl sm:text-3xl">${product.lastPrice}</span>
                            </div>

                            <p className="text-gray-800 text-sm sm:text-md leading-relaxed bg-gray-100 p-3 rounded-lg shadow-md max-h-[100px] overflow-y-auto">
                                {product.description}
                            </p>

                            {/* Add to Cart Button */}
                            <button 
                                className="bg-dark text-white py-2 px-5 rounded-lg font-semibold text-md hover:bg-accent transition-all duration-300"
                                onClick={onAddToCartClicked}
                            >
                                Add To Cart
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
