import axios from "axios";
import { useEffect, useState } from "react";

export default function AdminProductsPage() {

    const [products, setProducts] = useState([])

    useEffect(
        ()=>{
        axios.get("http://localhost:5000/api/products").
        then((res)=>{
            console.log(res.data.list)
            setProducts(res.data.list)
        })
    },[]
    )
   
    return(
        <div>
            Admin Products Page
            {
                products.map(
                    (product,index)=>{
                        return(
                            <div key={product._id}>
                                {index}
                                {product.productName}
                            </div>
                        )
                    }
                )
            }
        </div>
    );
}