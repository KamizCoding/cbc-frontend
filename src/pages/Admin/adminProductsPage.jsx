import axios from "axios";
import { useEffect, useState } from "react";
import { FaTrash, FaPencil } from "react-icons/fa6";

export default function AdminProductsPage() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:5000/api/products")
            .then((res) => {
                console.log(res.data.list);
                setProducts(res.data.list);
            });
    }, []);

    return (
        <div className="p-6 bg-lime-50 min-h-screen flex flex-col items-center">
            <h1 className="text-4xl font-extrabold text-lime-700 mb-8">Admin Products Page</h1>
            <div className="w-full max-w-6xl overflow-x-auto shadow-lg rounded-lg">
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
                                    <button className="text-lime-600 hover:text-lime-800 transition duration-200 p-2 rounded-lg bg-lime-300 hover:bg-lime-400">
                                        <FaPencil />
                                    </button>
                                </td>
                                <td className="py-4 px-6 text-center">
                                    <button className="text-red-600 hover:text-red-800 transition duration-200 p-2 rounded-lg bg-red-200 hover:bg-red-300">
                                        <FaTrash />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}