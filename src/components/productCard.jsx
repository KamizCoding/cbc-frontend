import { Link } from "react-router-dom";

export default function ProductCard({ product }) {
    return (
        <Link to={`/products/productinfo/${product.productId}`} className="transition-transform duration-300 hover:scale-[1.05]">
            <div className="w-[250px] bg-primary rounded-lg shadow-md border border-muted hover:shadow-lg flex flex-col overflow-hidden transition-all duration-300 m-[15px]">
                
                {/* Product Image */}
                <div className="h-[160px] w-full bg-muted flex items-center justify-center overflow-hidden">
                    <img src={product.images[0]} alt={product.productName} className="w-full h-full object-cover transition-all duration-300 hover:scale-110"/>
                </div>

                {/* Product Details */}
                <div className="p-4 flex flex-col items-center">
                    <h1 className="text-lg font-bold text-accent">{product.productName}</h1>
                    <h2 className="text-sm font-medium text-dark opacity-70">{product.productId}</h2>

                    {/* Pricing */}
                    <div className="flex items-center space-x-2 mt-1">
                        <p className="text-md font-bold text-dark">LKR. {product.lastPrice.toFixed(2)}</p>
                        {product.lastPrice < product.price && (
                            <p className="text-sm font-semibold text-gray-500 line-through">LKR. {product.price.toFixed(2)}</p>
                        )}
                    </div>

                    {/* Call-to-Action */}
                    <button className="mt-3 px-4 py-1 bg-accent text-white text-sm font-medium rounded-md shadow hover:bg-dark hover:scale-105 transition-all duration-300">
                        View Details
                    </button>
                </div>
            </div>
        </Link>
    );
}
