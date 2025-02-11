import { useEffect, useState } from "react";
import { loadCart } from "../../utils/cartfunction";
import CartCard from "../../components/cartCard";

export default function CartPage() {
    const [cart, setCart] = useState([])

    useEffect(
        () => {
            setCart(loadCart())
        },[]
    )  
    
    return(
        <div className="w-full h-full overflow-y-scroll flex flex-col items-center">
            {
                cart.map(
                    (product) => {
                        return(
                            <CartCard key={product.productId} productId={product.productId} quantity={product.quantity}/>
                        )
                    }
                )
            }
        </div>
    );
}