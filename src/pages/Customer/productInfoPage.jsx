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

    function onAddToCartClicked(){
        addToCart(product.productId,1)
        toast.success(product.productId + "Was Added To Cart Succesfully")
    }

    return (
        <div className="flex flex-col flex-grow items-center bg-primary px-4 sm:px-8">
            {status === "loading" && (
                <div className="fixed top-0 left-0 w-full h-screen flex flex-col items-center justify-center bg-opacity-50 bg-primary">
                    <div className="w-12 h-12 border-4 border-muted border-t-accent border-b-accent rounded-full animate-spin"></div>
                    <p className="mt-3 text-dark text-lg font-semibold animate-pulse">Loading...</p>
                </div>
            )}

            {status === "not-found" && (
                <div className="flex flex-col items-center justify-center min-h-screen text-center bg-primary p-4 sm:p-6 shadow-lg rounded-xl">
                    <h1 className="text-5xl font-extrabold text-accent">404</h1>
                    <h2 className="text-2xl font-bold text-gray-800 mt-2">Oops! This Product is Missing</h2>
                    <p className="text-gray-600 text-base mt-2">We couldn’t find the product you were looking for. It may have been removed or never existed.</p>
                    <Link to="/products" className="mt-4 px-5 py-2 bg-secondary text-dark font-semibold rounded-md shadow-md hover:bg-dark hover:text-white transition-all duration-300">
                        Back to Products
                    </Link>
                </div>
            )}

            {status === "found" && (
                <div className="w-full max-w-5xl bg-white shadow-lg rounded-xl p-6 sm:p-8 grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                    
                    <div className="rounded-xl overflow-hidden flex flex-col items-center">
                        <ImageSlider images={product.images} />
                    </div>

                    <div className="flex flex-col justify-center h-full p-4 sm:p-6 leading-relaxed">
                        <div className="space-y-4">
                            <h1 className="text-3xl sm:text-5xl font-bold text-dark">{product.productName}</h1>
                            <h2 className="text-lg sm:text-2xl font-semibold text-secondary">{product.altNames.join(" | ")}</h2>

                            <p className={`text-base sm:text-lg font-semibold ${product.stock > 0 ? "text-green-600" : "text-red-500"}`}>
                                {product.stock > 0 ? "In Stock" : "Out of Stock"}
                            </p>

                            <div className="flex items-center space-x-4 text-lg sm:text-2xl">
                                {product.price > product.lastPrice && <span className="line-through text-red-500">${product.price}</span>}
                                <span className="text-accent font-bold text-3xl sm:text-4xl">${product.lastPrice}</span>
                            </div>

                            <p className="text-gray-800 text-lg sm:text-xl leading-relaxed bg-gray-100 p-5 rounded-lg shadow-md">
                                {product.description}
                            </p>

                            <button className="bg-dark text-white p-t rounded-lg" onClick={onAddToCartClicked}>Add To Cart  </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
