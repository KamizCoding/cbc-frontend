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
    const altNames = alternativeNames.split(",");
    const promisesArray = [];

    for (let i = 0; i < imageFiles.length; i++) {
      promisesArray[i] = uploadMediaToSupabase(imageFiles[i]);
    }

    const imgUrls = await Promise.all(promisesArray);

    const product = {
      productId,
      productName,
      altNames,
      images: imgUrls,
      price,
      lastPrice,
      stock,
      description,
    };

    const token = localStorage.getItem("token");

    try {
      await axios.post(import.meta.env.VITE_BACKEND_URL + "/api/products", product, {
        headers: { Authorization: "Bearer " + token },
      });
      navigate("/admin/products");
      toast.success("The Product Was Added Successfully");
    } catch (error) {
      toast.error("The Product Was Not Added Due To An Error");
    }
  }

  return (
    <div className="w-full min-h-screen flex justify-center items-center p-4 sm:p-12 bg-green-50">
      <div className="bg-green-100 shadow-2xl rounded-xl p-6 sm:p-8 w-full max-w-lg sm:max-w-2xl flex flex-col gap-4 border border-green-300">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-center text-green-700">
          Add Product
        </h1>

        {/* 🔹 Product ID & Name */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex flex-col flex-1 gap-2">
            <label className="font-semibold text-green-700 text-sm sm:text-base">
              Product ID
            </label>
            <input
              type="text"
              placeholder="Enter product ID"
              className="border p-2 sm:p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
              value={productId}
              onChange={(e) => setProductId(e.target.value)}
            />
          </div>
          <div className="flex flex-col flex-1 gap-2">
            <label className="font-semibold text-green-700 text-sm sm:text-base">
              Product Name
            </label>
            <input
              type="text"
              placeholder="Enter product name"
              className="border p-2 sm:p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
            />
          </div>
        </div>

        {/* 🔹 Alternative Names & Image Upload */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex flex-col flex-1 gap-2">
            <label className="font-semibold text-green-700 text-sm sm:text-base">
              Alternative Names
            </label>
            <input
              type="text"
              placeholder="Alternative names"
              className="border p-2 sm:p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
              value={alternativeNames}
              onChange={(e) => setAlternativeNames(e.target.value)}
            />
          </div>
          <div className="flex flex-col flex-1 gap-2">
            <label className="font-semibold text-green-700 text-sm sm:text-base">
              Upload Images
            </label>
            <input
              type="file"
              className="border p-2 sm:p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
              multiple
              onChange={(e) => setImageFiles(e.target.files)}
            />
          </div>
        </div>

        {/* 🔹 Pricing */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex flex-col flex-1 gap-2">
            <label className="font-semibold text-green-700 text-sm sm:text-base">
              Product Price (LKR)
            </label>
            <input
              type="number"
              placeholder="Enter price"
              className="border p-2 sm:p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>
          <div className="flex flex-col flex-1 gap-2">
            <label className="font-semibold text-green-700 text-sm sm:text-base">
              Last Price (LKR)
            </label>
            <input
              type="number"
              placeholder="Previous price"
              className="border p-2 sm:p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
              value={lastPrice}
              onChange={(e) => setLastPrice(e.target.value)}
            />
          </div>
        </div>

        {/* 🔹 Stock */}
        <div className="flex flex-col gap-2">
          <label className="font-semibold text-green-700 text-sm sm:text-base">
            Stock Quantity
          </label>
          <input
            type="number"
            placeholder="Enter stock quantity"
            className="border p-2 sm:p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
          />
        </div>

        {/* 🔹 Description */}
        <div className="flex flex-col gap-2">
          <label className="font-semibold text-green-700 text-sm sm:text-base">
            Description
          </label>
          <textarea
            placeholder="Enter product description"
            className="border p-2 sm:p-3 rounded-lg h-24 focus:outline-none focus:ring-2 focus:ring-green-400"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>

        {/* 🔹 Submit Button */}
        <button
          className="bg-green-600 text-white p-2 sm:p-3 rounded-lg font-semibold hover:bg-green-700 transition-all mt-4"
          onClick={handleAddProduct}
        >
          Add Product
        </button>
      </div>
    </div>
  );
}
