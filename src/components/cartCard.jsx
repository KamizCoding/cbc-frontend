import axios from "axios";
import { useEffect, useState } from "react";

export default function CartCard(props) {
    const { productId, quantity } = props;

    const [product, setProduct] = useState(null);
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        if (!loaded) {
            axios.get(import.meta.env.VITE_BACKEND_URL + "/api/products/" + productId)
                .then((response) => {
                    if (response.data != null) {
                        setProduct(response.data);
                        setLoaded(true);
                    }
                })
                .catch((error) => console.log(error));
        }
    }, []);

    return (
        <div className="w-full max-w-[600px] flex items-center gap-4 bg-muted p-4 rounded-lg shadow-md border border-muted 
            transition-all duration-300 hover:shadow-lg hover:scale-[1.02] hover:border-accent">
            
            {/* Product Image with hover zoom */}
            <img src={product?.images[0]} className="w-24 h-24 object-cover rounded-lg border border-secondary 
                transition-transform duration-300 hover:scale-105" alt="Product" />

            {/* Product Details */}
            <div className="flex flex-col flex-grow">
                <h2 className="text-lg font-bold text-accent transition-all duration-300 hover:text-dark">{product?.productName}</h2>
                <p className="text-sm text-dark">Product ID: {productId}</p>
                <p className="text-sm font-semibold text-dark">Quantity: {quantity}</p>
                <p className="text-md font-semibold text-dark">LKR. {product?.lastPrice.toFixed(2)}</p>
            </div>

            {/* Total Price */}
            <div className="flex flex-col items-end">
                <p className="text-md font-bold text-accent transition-all duration-300 hover:text-dark">
                    Total: LKR. {(product?.lastPrice * quantity).toFixed(2)}
                </p>
            </div>
           
        </div>
        
    );
    
}
