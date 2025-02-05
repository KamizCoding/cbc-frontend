import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaTrash, FaPencil, FaPlus } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";

export default function AdminProductsPage() {
    const [products, setProducts] = useState([]);
    const [loadedProducts, setLoadedProducts] = useState(false);

    useEffect(() => {
        if (!loadedProducts) {
            axios.get(import.meta.env.VITE_BACKEND_URL + "/api/products")
                .then((res) => {
                    console.log(res.data.list);
                    setProducts(res.data.list);
                    setLoadedProducts(true);
                });
        }
    }, [loadedProducts]);

    const navigate = useNavigate()

    return (
        <div className="p-6 bg-lime-50 flex flex-col items-center relative overflow-hidden">
            <Link to="/admin/products/addProducts" className="fixed right-5 bottom-5 flex items-center gap-2 p-3 bg-lime-600 text-white rounded-lg shadow-md hover:bg-lime-700 hover:scale-105 hover:shadow-lg transition-transform duration-300 ease-in-out">
                <FaPlus className="text-lg transition-transform duration-300 group-hover:rotate-90" />
                <span>Add Product</span>
            </Link>
            <h1 className="text-4xl font-extrabold text-lime-700 mb-8">Admin Products Page</h1>
            {
                loadedProducts ? (
                    <div className="w-full max-w-6xl shadow-lg rounded-lg flex-grow">
                        <div className="max-h-[350px] overflow-y-auto">
                            <table className="w-full bg-white rounded-lg border border-gray-300 shadow-md">
                                <thead>
                                    <tr className="bg-lime-700 text-white uppercase text-md font-semibold">
                                        <th className="py-4 px-6 text-left">Product ID</th>
                                        <th className="py-4 px-6 text-left">Product Name</th>
                                        <th className="py-4 px-6 text-left">Price</th>
                                        <th className="py-4 px-6 text-left">Last Price</th>
                                        <th className="py-4 px-6 text-left">Stock</th>
                                        <th className="py-4 px-6 text-left">Description</th>
                                        <th className="py-4 px-6 text-center">Update</th>
                                        <th className="py-4 px-6 text-center">Delete</th>
                                    </tr>
                                </thead>
                                <tbody className="text-gray-800 text-sm font-medium divide-y divide-gray-200">
                                    {products.map((product, index) => (
                                        <tr key={product._id} className={`${index % 2 === 0 ? 'bg-lime-100' : 'bg-lime-200'} hover:bg-lime-300 transition duration-200`}>
                                            <td className="py-4 px-6 text-left whitespace-nowrap">{product.productId}</td>
                                            <td className="py-4 px-6 text-left">{product.productName}</td>
                                            <td className="py-4 px-6 text-left">${product.price}</td>
                                            <td className="py-4 px-6 text-left">${product.lastPrice}</td>
                                            <td className="py-4 px-6 text-left">{product.stock}</td>
                                            <td className="py-4 px-6 text-left truncate max-w-sm">{product.description}</td>
                                            <td className="py-4 px-6 text-center">
                                                <button className="text-lime-600 hover:text-lime-800 transition duration-200 p-2 rounded-lg bg-lime-300 hover:bg-lime-400"
                                                onClick={()=>{
                                                    navigate("/admin/products/updateProducts");
                                                }}>
                                                    <FaPencil />
                                                </button>
                                            </td>
                                            <td className="py-4 px-6 text-center">
                                                <button className="text-red-600 hover:text-red-800 transition duration-200 p-2 rounded-lg bg-red-200 hover:bg-red-300"
                                                    onClick={() => {
                                                        const token = localStorage.getItem("token");
                                                        axios.delete(`http://localhost:5000/api/products/${product.productId}`, {
                                                            headers: {
                                                                Authorization: "Bearer " + token
                                                            }
                                                        }).then((res) => {
                                                            console.log(res.data);
                                                            toast.success("The product was deleted successfully");
                                                            setLoadedProducts(false);
                                                        });
                                                    }}>
                                                    <FaTrash />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                ) : (
                    <div className="w-full h-full flex justify-center items-center">
                        <div className="w-16 h-16 border-4 border-gray-300 border-t-green-600 border-b-green-600 rounded-full animate-spin"></div>
                    </div>
                )
            }
        </div>
    );
}
