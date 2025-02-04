import { useState } from "react";

export default function AddProductForm() {
    const [productId, setProductId] = useState("");
    const [productName, setProductName] = useState("");
    const [alternativeNames, setAlternativeNames] = useState("");
    const [imageUrls, setImageUrls] = useState("");
    const [price, setPrice] = useState("");
    const [lastPrice, setLastPrice] = useState("");
    const [stock, setStock] = useState("");
    const [description, setDescription] = useState("");

    return (
        <div className="w-full min-h-screen flex justify-center items-center p-12">
            <form className="bg-green-100 shadow-2xl rounded-xl p-8 w-[600px] flex flex-col gap-6 border border-green-300">
                <h1 className="text-3xl font-extrabold text-center text-green-700">Add Product</h1>
                
                <div className="flex gap-4">
                    <div className="flex flex-col flex-1 gap-2">
                        <label htmlFor="productId" className="font-semibold text-green-700">Product ID</label>
                        <input type="text" placeholder="Enter product ID" className="border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400" />
                    </div>
                    <div className="flex flex-col flex-1 gap-2">
                        <label htmlFor="productName" className="font-semibold text-green-700">Product Name</label>
                        <input type="text" placeholder="Enter product name" className="border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400" />
                    </div>
                </div>
                
                <div className="flex gap-4">
                    <div className="flex flex-col flex-1 gap-2">
                        <label htmlFor="altNames" className="font-semibold text-green-700">Alternative Names</label>
                        <input type="text" placeholder="Alternative names" className="border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400" />
                    </div>
                    <div className="flex flex-col flex-1 gap-2">
                        <label htmlFor="image" className="font-semibold text-green-700">Image URLs</label>
                        <input type="text" className="border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400" />
                    </div>
                </div>
                
                <div className="flex gap-4">
                    <div className="flex flex-col flex-1 gap-2">
                        <label htmlFor="price" className="font-semibold text-green-700">Product Price ($)</label>
                        <input type="number" placeholder="Enter price" className="border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400" />
                    </div>
                    <div className="flex flex-col flex-1 gap-2">
                        <label htmlFor="lastPrice" className="font-semibold text-green-700">Last Price ($)</label>
                        <input type="number" placeholder="Previous price" className="border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400" />
                    </div>
                </div>
                
                <div className="flex gap-4">
                    <div className="flex flex-col flex-1 gap-2">
                        <label htmlFor="stock" className="font-semibold text-green-700">Stock Quantity</label>
                        <input type="number" placeholder="Enter stock quantity" className="border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400" />
                    </div>
                </div>
                
                <div className="flex flex-col gap-2">
                    <label htmlFor="description" className="font-semibold text-green-700">Description</label>
                    <textarea placeholder="Enter product description" className="border p-3 rounded-lg h-28 focus:outline-none focus:ring-2 focus:ring-green-400"></textarea>
                </div>
                
                <button className="bg-green-600 text-white p-3 rounded-lg font-semibold hover:bg-green-700 transition-all mt-4">Add Product</button>
            </form>
        </div>
    );
}
