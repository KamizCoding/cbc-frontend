import { useLocation, useNavigate } from "react-router-dom";
import CartCard from "../../components/cartCard";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import axios from "axios";

export default function ShippingPage() {
    const location = useLocation();
    const nav = useNavigate();
    const cart = location.state?.products || [];
    const [total, setTotal] = useState(0);
    const [labeledTotal, setLabeledTotal] = useState(0);
    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [phone, setPhone] = useState("");

    useEffect(() => {
        if (!cart.length) {
            toast.error("There Are No Items In The Cart");
            nav("/cart");
            return;
        }

        axios
            .post(import.meta.env.VITE_BACKEND_URL + "/api/orders/quote", {
                orderedItems: cart,
            })
            .then((res) => {
                console.log(res.data);
                setTotal(res.data.total);
                setLabeledTotal(res.data.labeledTotal);
            });
    }, [cart, nav]);

    function createOrder() {
        const token = localStorage.getItem("token");

        if (!token) {
            toast.error("You need to log in to place an order.");
            return;
        }

        if (!name || !address || !phone) {
            toast.error("Please fill in all shipping details.");
            return;
        }

        axios
            .post(
                import.meta.env.VITE_BACKEND_URL + "/api/orders",
                {
                    orderedItems: cart,
                    name,
                    address,
                    phone,
                },
                {
                    headers: {
                        Authorization: "Bearer " + token,
                    },
                }
            )
            .then((res) => {
                console.log(res.data);
                toast.success("Order placed successfully!");
                nav("/order-success");
            })
            .catch(() => {
                toast.error("Failed to place order. Please try again.");
            });
    }

    return (
        <div className="w-full min-h-screen flex flex-col lg:flex-row items-start p-6 bg-primary justify-center gap-8">
            
            {/* ✅ Cart Items Section - Centered & Scrollable */}
            <div className="w-full lg:w-[55%] max-w-4xl flex flex-col gap-2 bg-white rounded-lg shadow-lg p-4 border border-gray-300 max-h-[65vh] overflow-y-auto">
                {cart.length > 0 ? (
                    cart.map((product) => (
                        <CartCard key={product.productId} productId={product.productId} quantity={product.quantity} />
                    ))
                ) : (
                    <p className="text-lg text-dark text-center font-semibold">Your cart is empty.</p>
                )}
            </div>

            {/* ✅ Order Summary Section - Centered & Scrollable */}
            {cart.length > 0 && (
                <div className="w-full lg:w-[40%] max-w-lg bg-muted text-dark rounded-lg shadow-lg p-5 border border-gray-300 max-h-[65vh] overflow-y-auto">
                    
                    {/* Order Summary Heading */}
                    <h2 className="text-xl font-bold text-dark text-center border-b pb-2 tracking-wide">
                        Order Summary
                    </h2>

                    {/* Summary Details */}
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

                    {/* Shipping Details Form */}
                    <div className="mt-4">
                        <h3 className="text-lg font-bold text-dark">Shipping Details</h3>

                        <label className="block text-dark font-semibold mt-3">Full Name</label>
                        <input type="text" value={name} onChange={(e) => setName(e.target.value)} 
                            className="w-full p-2 mt-1 rounded-md border border-gray-300" placeholder="Enter your name" />

                        <label className="block text-dark font-semibold mt-3">Shipping Address</label>
                        <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} 
                            className="w-full p-2 mt-1 rounded-md border border-gray-300" placeholder="Enter your address" />

                        <label className="block text-dark font-semibold mt-3">Phone Number</label>
                        <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} 
                            className="w-full p-2 mt-1 rounded-md border border-gray-300" placeholder="Enter your phone number" />
                    </div>

                    {/* Checkout Button */}
                    <div className="mt-6 flex justify-center">
                        <button 
                            className="w-full text-center px-5 py-3 bg-accent text-white text-lg font-medium rounded-md hover:bg-dark transition-all duration-300 shadow-md" 
                            onClick={createOrder}
                        >
                            Proceed to Checkout
                        </button>
                    </div>

                </div>
            )}
        </div>
    );
}
