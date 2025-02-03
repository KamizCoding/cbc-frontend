import axios from "axios";
import { useEffect, useState } from "react";
import { FaTrash, FaPencil } from "react-icons/fa6";

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
            <table>
                <thead>
                    <th>Product ID</th>
                    <th>Product Name</th>
                    <th>Price</th>
                    <th>Last Price</th>
                    <th>Stock</th>
                    <th>Description</th>
                    <th>Update Product</th>
                    <th>Delete Product</th>
                </thead>
                <tbody>
                    {
                    products.map(
                        (product,index)=>{
                            return(
                                <tr key={product._id}>
                                    <td>{product.productId}</td>
                                    <td>{product.productName}</td>
                                    <td>{product.price}</td>
                                    <td>{product.lastPrice}</td>
                                    <td>{product.stock}</td>
                                    <td>{product.description}</td>
                                    <td><FaTrash/></td>
                                    <td><FaPencil/></td>
                                </tr>
                                )
                            }
                        )
                    }
                </tbody>
            </table>
            
        </div>
    );
}