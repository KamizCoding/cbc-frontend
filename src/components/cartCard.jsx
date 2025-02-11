import axios from "axios"
import { useEffect, useState } from "react"

export default function CartCard(props){

    const productId = props.productId 
    const quantity = props.quantity

    const [product, setProduct] = useState(null)
    const [loaded, setLoaded] = useState(false)

    useEffect(() => {
        if(!loaded){
            axios.get(import.meta.env.VITE_BACKEND_URL + "/api/products/" + productId).then(
                (response) => {
                    setProduct(response.data)
                    console.log(response.data)
                    setLoaded(true)
                }
            ).catch(
                (error) => {
                    console.log(error)
                }
            )
        }
    })

    return(
        <div className="border w-1/2 flex justify-between items-center">
            <span>{productId}</span>
            <span>X</span>
            <span>{quantity}</span>
        </div>
    )
}