import { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import uploadMediaToSupabase from "../../utils/mediaUpload";

export default function UpdateProductForm() {
    const location = useLocation();
    const navigate = useNavigate();
    const product = location.state?.product;

    if (!product) {
        navigate("/admin/products");
    }

    const altNames = product.altNames.join(",");

    const [productId] = useState(product.productId);
    const [productName, setProductName] = useState(product.productName);
    const [alternativeNames, setAlternativeNames] = useState(altNames);
    const [imageFiles, setImageFiles] = useState("");
    const [price, setPrice] = useState(product.price);
    const [lastPrice, setLastPrice] = useState(product.lastPrice);
    const [stock, setStock] = useState(product.stock);
    const [description, setDescription] = useState(product.description);
    const [showModal, setShowModal] = useState(false);

    async function handleUpdateProduct() {
        const altNamesArray = alternativeNames.split(",");
        const promisesArray = [];
        let imgUrls = product.images;

        if (imageFiles.length > 0) {
            for (let i = 0; i < imageFiles.length; i++) {
                promisesArray[i] = uploadMediaToSupabase(imageFiles[i]);
            }
            imgUrls = await Promise.all(promisesArray);
        }

        const productData = {
            productId,
            productName,
            altNames: altNamesArray,
            images: imgUrls,
            price,
            lastPrice,
            stock,
            description,
        };

        const token = localStorage.getItem("token");

        try {
            await axios.put(import.meta.env.VITE_BACKEND_URL + `/api/products/update/${product.productId}`, productData, {
                headers: { Authorization: "Bearer " + token },
            });
            setShowModal(false);
            navigate("/admin/products");
            toast.success("The Product Was Updated Successfully");
        } catch (error) {
            toast.error("The Product Was Not Updated Due To An Error");
        }
    }

    return (
        <div className="w-full min-h-screen flex justify-center items-center p-4 sm:p-12 bg-green-50">
            <div className="bg-green-100 shadow-2xl rounded-xl p-6 sm:p-8 w-full sm:w-[600px] flex flex-col gap-6 border border-green-300">
                <h1 className="text-2xl sm:text-3xl font-extrabold text-center text-green-700">Update Product Details</h1>

                {/* Product ID & Name */}
                <div className="flex flex-col sm:flex-row gap-4">
                    <div className="flex flex-col flex-1 gap-2">
                        <label className="font-semibold text-green-700 text-sm sm:text-base">Product ID</label>
                        <input type="text" className="border p-2 sm:p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400" disabled value={productId} />
                    </div>
                    <div className="flex flex-col flex-1 gap-2">
                        <label className="font-semibold text-green-700 text-sm sm:text-base">Product Name</label>
                        <input type="text" className="border p-2 sm:p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400" value={productName} onChange={(e) => setProductName(e.target.value)} />
                    </div>
                </div>

                {/* Alternative Names & Image Upload */}
                <div className="flex flex-col sm:flex-row gap-4">
                    <div className="flex flex-col flex-1 gap-2">
                        <label className="font-semibold text-green-700 text-sm sm:text-base">Alternative Names</label>
                        <input type="text" className="border p-2 sm:p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400" value={alternativeNames} onChange={(e) => setAlternativeNames(e.target.value)} />
                    </div>
                    <div className="flex flex-col flex-1 gap-2">
                        <label className="font-semibold text-green-700 text-sm sm:text-base">Upload New Images</label>
                        <input type="file" className="border p-2 sm:p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400" multiple onChange={(e) => setImageFiles(e.target.files)} />
                    </div>
                </div>

                {/* Price & Last Price */}
                <div className="flex flex-col sm:flex-row gap-4">
                    <div className="flex flex-col flex-1 gap-2">
                        <label className="font-semibold text-green-700 text-sm sm:text-base">Product Price ($)</label>
                        <input type="number" className="border p-2 sm:p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400" value={price} onChange={(e) => setPrice(e.target.value)} />
                    </div>
                    <div className="flex flex-col flex-1 gap-2">
                        <label className="font-semibold text-green-700 text-sm sm:text-base">Last Price ($)</label>
                        <input type="number" className="border p-2 sm:p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400" value={lastPrice} onChange={(e) => setLastPrice(e.target.value)} />
                    </div>
                </div>

                {/* Stock */}
                <div className="flex flex-col gap-2">
                    <label className="font-semibold text-green-700 text-sm sm:text-base">Stock Quantity</label>
                    <input type="number" className="border p-2 sm:p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400" value={stock} onChange={(e) => setStock(e.target.value)} />
                </div>

                {/* Description */}
                <div className="flex flex-col gap-2">
                    <label className="font-semibold text-green-700 text-sm sm:text-base">Description</label>
                    <textarea className="border p-2 sm:p-3 rounded-lg h-24 sm:h-28 focus:outline-none focus:ring-2 focus:ring-green-400" value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
                </div>

                {/* Update Button */}
                <button className="bg-green-600 text-white p-2 sm:p-3 rounded-lg font-semibold hover:bg-green-700 transition-all mt-4 text-sm sm:text-lg" onClick={() => setShowModal(true)}>
                    Update Product
                </button>
            </div>

            {/* Confirmation Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-4 sm:p-6 rounded-lg shadow-lg w-80 sm:w-96">
                        <h2 className="text-lg sm:text-xl font-bold mb-4">Confirm Update</h2>
                        <p className="mb-2 text-sm sm:text-base">Are you sure you want to update this product?</p>

                        <div className="flex justify-end gap-4">
                            <button className="px-3 sm:px-4 py-2 bg-gray-400 text-white rounded-md" onClick={() => setShowModal(false)}>Cancel</button>
                            <button className="px-3 sm:px-4 py-2 bg-blue-500 text-white rounded-md" onClick={handleUpdateProduct}>Confirm</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
