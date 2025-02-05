import { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import uploadMediaToSupabase from "../../utils/mediaUpload";

export default function AddProductForm() {
    const [productId, setProductId] = useState("");
    const [productName, setProductName] = useState("");
    const [alternativeNames, setAlternativeNames] = useState("");
    const [imageFiles, setImageFiles] = useState("");
    const [price, setPrice] = useState("");
    const [lastPrice, setLastPrice] = useState("");
    const [stock, setStock] = useState("");
    const [description, setDescription] = useState("");
    const navigate = useNavigate();

    async function handleAddProduct() {
        const altNames = alternativeNames.split(",")
        const promisesArray = []
        
        for(let i=0; i<imageFiles.length; i++){
            promisesArray[i] = uploadMediaToSupabase(imageFiles[i])
        }

        const imgUrls = await Promise.all(promisesArray)
        console.log(imgUrls)

        const product = {
            productId : productId,
            productName : productName,
            altNames : altNames,
            images : imgUrls,
            price : price,
            lastPrice : lastPrice,
            stock : stock,
            description : description
        }

        const token = localStorage.getItem("token")

        try {
            await axios.post(import.meta.env.VITE_BACKEND_URL + "/api/products", product,{
                headers : {
                    Authorization : "Bearer " + token
                }
            });
            navigate("/admin/products");
            toast.success("The Product Was Added Succesfully");          
        } catch (error) {
            toast.error("The Product Was Not Added Due To An Error")
        }


    }

    return (
        <div className="w-full min-h-screen flex justify-center items-center p-12 bg-green-50">
            <div className="bg-green-100 shadow-2xl rounded-xl p-8 w-[600px] flex flex-col gap-6 border border-green-300">
                <h1 className="text-3xl font-extrabold text-center text-green-700">Add Product</h1>
                
                <div className="flex gap-4">
                    <div className="flex flex-col flex-1 gap-2">
                        <label className="font-semibold text-green-700">Product ID</label>
                        <input type="text" placeholder="Enter product ID" className="border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400" value={productId} onChange={(e) => setProductId(e.target.value)} />
                    </div>
                    <div className="flex flex-col flex-1 gap-2">
                        <label className="font-semibold text-green-700">Product Name</label>
                        <input type="text" placeholder="Enter product name" className="border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400" value={productName} onChange={(e) => setProductName(e.target.value)} />
                    </div>
                </div>
                
                <div className="flex gap-4">
                    <div className="flex flex-col flex-1 gap-2">
                        <label className="font-semibold text-green-700">Alternative Names</label>
                        <input type="text" placeholder="Alternative names" className="border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400" value={alternativeNames} onChange={(e) => setAlternativeNames(e.target.value)} />
                    </div>
                    <div className="flex flex-col flex-1 gap-2">
                        <label className="font-semibold text-green-700">Image URLs</label>
                        <input type="file" className="border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400" multiple onChange={(e) => {
                            setImageFiles(e.target.files)
                        }} />
                    </div>
                </div>
                
                <div className="flex gap-4">
                    <div className="flex flex-col flex-1 gap-2">
                        <label className="font-semibold text-green-700">Product Price ($)</label>
                        <input type="number" placeholder="Enter price" className="border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400" value={price} onChange={(e) => setPrice(e.target.value)} />
                    </div>
                    <div className="flex flex-col flex-1 gap-2">
                        <label className="font-semibold text-green-700">Last Price ($)</label>
                        <input type="number" placeholder="Previous price" className="border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400" value={lastPrice} onChange={(e) => setLastPrice(e.target.value)} />
                    </div>
                </div>
                
                <div className="flex gap-4">
                    <div className="flex flex-col flex-1 gap-2">
                        <label className="font-semibold text-green-700">Stock Quantity</label>
                        <input type="number" placeholder="Enter stock quantity" className="border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400" value={stock} onChange={(e) => setStock(e.target.value)} />
                    </div>
                </div>
                
                <div className="flex flex-col gap-2">
                    <label className="font-semibold text-green-700">Description</label>
                    <textarea placeholder="Enter product description" className="border p-3 rounded-lg h-28 focus:outline-none focus:ring-2 focus:ring-green-400" value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
                </div>
                
                <button className="bg-green-600 text-white p-3 rounded-lg font-semibold hover:bg-green-700 transition-all mt-4" onClick={handleAddProduct}>Add Product</button>
            </div>
        </div>
    );
}
