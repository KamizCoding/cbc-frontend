import axios from "axios";
import { useEffect, useState } from "react";

export default function AdminProductsPage() {

    const [products, setProducts] = useState([
        {
            "_id": "675124dfa49081c5aaa90479",
            "productId": "B12345",
            "productName": "Radiant Glow Face Serum",
            "altNames": [
                "Glow Boost Serum",
                "Vitamin C Serum"
            ],
            "images": [
                "https://example.com/images/serum1.jpg",
                "https://example.com/images/serum2.jpg"
            ],
            "price": 29.99,
            "lastPrice": 34.99,
            "description": "A hydrating face serum enriched with Vitamin C and hyaluronic acid to brighten and nourish your skin.",
            "stock": 114,
            "__v": 0
        },
        {
            "_id": "67567f6317a562e29fa90169",
            "productId": "B12346",
            "productName": "Hair Wax",
            "altNames": [
                "Smooth Hair Wax",
                "Cream Hair Polish"
            ],
            "images": [
                "https://example.com/images/serum1.jpg",
                "https://example.com/images/serum2.jpg"
            ],
            "price": 390.99,
            "lastPrice": 340.99,
            "description": "A wax that polishes your hair and makes it as smooth as silk.",
            "stock": 235,
            "__v": 0
        },
        {
            "_id": "6757bd7bd0dd59a27f21811e",
            "productId": "B567899",
            "productName": "Face Glow Cream",
            "altNames": [
                "Radiance Face Cream",
                "Brightening Day Cream"
            ],
            "images": [
                "https://example.com/images/cream1.jpg",
                "https://example.com/images/cream2.jpg"
            ],
            "price": 499.99,
            "lastPrice": 450.99,
            "description": "A luxurious cream that enhances your skin's natural glow and hydrates deeply.",
            "stock": 180,
            "__v": 0
        }
    ])

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

async function getProducts(){
    const res = await axios.get()
        console.log(res)
}