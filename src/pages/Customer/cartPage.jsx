import { useEffect, useState } from "react";
import { loadCart } from "../../utils/cartfunction";

export default function CartPage() {
    const [cart, setCart] = useState([])

    useEffect(
        () => {
            setCart(loadCart())
        },[]
    )  
    
    return(
        <div className="w-full h-full overflow-y-scroll flex flex-wrap justify-center">
            {
                cart.map(
                    (product) => {
                        return(
                            <span key={product.productId}>{product.productId} X {product.quantity}</span>
                        )
                    }
                )
            }
        </div>
    );
}