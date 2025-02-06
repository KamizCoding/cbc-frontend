import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function ProductInfoPage() {

    const parameters = useParams();
    const productId = parameters.id;
    const [product, setProduct] = useState(null)
    const [status, setStatus] = useState("loading")

    useEffect(()=>{
        console.log(productId)
        axios.get(import.meta.env.VITE_BACKEND_URL + "/api/products/" + productId).then
        ((res)=>{
            console.log(res.data)
        })
    },[])

    return(
        <div>
            {
                status === "loading" && (
                    <div className="fixed top-0 left-0 w-full h-screen flex items-center justify-center bg-opacity-50 bg-secondary">
                        <div className="w-32 h-32 border-t-2 border-b-2 border-gray-300 border-t-green-600 border-b-green-600 rounded-full animate-spin"></div>
                    </div>
                )
                
            }
            {
                status == "not found" && <h1>Product Was Not Found</h1>
            }
            {
                status == "found" && (
                    <div>
                        product found
                    </div>
                )
            }
        </div>
    );
}