import { useEffect, useState } from "react";
import { loadCart } from "../../utils/cartfunction";
import CartCard from "../../components/cartCard";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function CartPage() {
    const [cart, setCart] = useState([]);
    const [total, setTotal] = useState(0);
    const [labeledTotal, setLabeledTotal] = useState(0);
    const nav = useNavigate();

    useEffect(() => {
        setCart(loadCart());
        axios.post(import.meta.env.VITE_BACKEND_URL + "/api/orders/quote", {
            orderedItems: loadCart()
        }).then((res) => {
            console.log(res.data);
            if(res.data.total != null){
            setTotal(res.data.total);
            setLabeledTotal(res.data.labeledTotal);
            }
        });
    }, []);

    function onCheckoutClicked(){
        nav("/shipping", {
            state : {
                products : loadCart()
            }
        })
    }

    return (
        <div className="w-full min-h-screen flex flex-col lg:flex-row items-center lg:items-start p-6 bg-primary">
            
            <div className="w-full lg:w-2/3 max-w-3xl flex flex-col gap-4 overflow-y-auto max-h-[65vh] p-2">
                {cart.length > 0 ? (
                    cart.map((product) => (
                        <CartCard key={product.productId} productId={product.productId} quantity={product.quantity} />
                    ))
                ) : (
                    <p className="text-lg text-dark text-center font-semibold">Your cart is empty.</p>
                )}
            </div>

            {cart.length > 0 && (
                <div className="w-full lg:w-1/3 max-w-md bg-muted text-dark rounded-lg shadow-lg p-5 ml-4 lg:sticky top-6 border border-gray-300">
                    
                    <h2 className="text-xl font-bold text-dark text-center border-b pb-2 tracking-wide">
                        Order Summary
                    </h2>

                    <div className="flex justify-between text-lg font-medium text-gray-800 mt-4">
                        <span>Subtotal:</span>
                        <span className="text-accent">LKR. {labeledTotal.toFixed(2)}</span>
                    </div>

                    <div className="flex justify-between text-lg font-medium text-gray-800">
                        <span>Discount:</span>
                        <span className="text-green-700">- LKR. {(labeledTotal - total).toFixed(2)}</span>
                    </div>

                    <div className="flex justify-between text-xl font-bold text-dark mt-3 border-t pt-3">
                        <span>Grand Total:</span>
                        <span className="text-accent">LKR. {total.toFixed(2)}</span>
                    </div>

                    <button className="w-full text-center mt-6 px-5 py-3 bg-accent text-white text-lg font-medium rounded-md hover:bg-dark transition-all duration-300 shadow-md" onClick={onCheckoutClicked}>
                        Proceed to Checkout
                    </button>
                </div>
            )}
        </div>
    );
}
