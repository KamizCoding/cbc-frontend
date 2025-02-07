import { Link } from "react-router-dom";

export default function ProductCard({ product }) {
    return (
        <Link to={`/products/productinfo/${product.productId}`} className="transition-all duration-300 hover:scale-[1.05]">
            <div className="w-[320px] h-[550px] bg-primary rounded-2xl shadow-xl border border-muted hover:shadow-2xl flex flex-col overflow-hidden relative 
            backdrop-blur-md bg-opacity-90 border-t border-l border-opacity-30 hover:border-opacity-50 transition-all duration-300 m-[20px]">
                
                {/* Product Image */}
                <div className="h-[65%] w-full bg-muted flex items-center justify-center overflow-hidden relative">
                    <img src={product.images[0]} alt={product.productName} className="w-full h-full object-cover transition-all duration-300 hover:scale-110"/>
                    
                    {/* Floating Label */}
                    <span className="absolute top-3 left-3 bg-secondary text-dark text-sm px-3 py-1 rounded-full shadow-md font-semibold">
                        New Arrival
                    </span>
                </div>

                {/* Product Details */}
                <div className="h-[35%] p-5 flex flex-col justify-between">
                    <div className="text-center">
                        <h1 className="text-2xl font-extrabold text-accent drop-shadow-md">{product.productName}</h1>
                        <h2 className="text-md font-semibold text-dark tracking-wide opacity-70">{product.productId}</h2>
                    </div>

                    {/* Pricing */}
                    <div className="text-left flex flex-col">
                        <p className="text-xl font-bold text-dark tracking-wide">LKR. {product.lastPrice.toFixed(2)}</p>
                        {product.lastPrice < product.price && (
                            <p className="text-lg font-semibold text-gray-500 line-through opacity-80">LKR. {product.price.toFixed(2)}</p>
                        )}
                    </div>

                    {/* Call-to-Action */}
                    <div className="w-full flex justify-center mt-2">
                        <button className="px-6 py-2 bg-accent text-white font-semibold rounded-lg shadow-md hover:bg-dark hover:scale-105 transition-all duration-300">
                            View Details
                        </button>
                    </div>
                </div>
            </div>
        </Link>
    );
}
