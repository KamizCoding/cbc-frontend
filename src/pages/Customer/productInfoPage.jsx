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
                status == "loading" && <h1>Loading...</h1>
            }
            {
                status == "not found" && <h1>Product Was Not Found</h1>
            }
            {
                status == "found" && <h1>Loading...</h1>
            }
        </div>
    );
}