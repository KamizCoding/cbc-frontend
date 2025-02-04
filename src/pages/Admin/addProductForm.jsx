export default function AddProductForm(){
    return(
        <div className="w-full h-full bg-red-400">
            <h1 className="text-2xl font-bold text-center">Add Product Form</h1>
            <div className="flex flex-col w-full border items-center">
                <div className="flex flex-col">
                    <label htmlFor="ProductId">Product ID</label>
                    <input type="text"className="w-[200px]" />
                </div>
                <div className="flex flex-col">
                    <label htmlFor="ProductName">Product Name</label>
                    <input type="text"className="w-[200px]" />
                </div>
                <div className="flex flex-col">
                    <label htmlFor="AltNames">Alternative Names</label>
                    <input type="text"className="w-[200px]" />
                </div>
                <div className="flex flex-col">
                    <label htmlFor="Image">Image URLs</label>
                    <input type="text"className="w-[200px]" />
                </div>
                <div className="flex flex-col">
                    <label htmlFor="Price">Product Price</label>
                    <input type="number"className="w-[200px]" />
                </div>
                <div className="flex flex-col">
                    <label htmlFor="LastPrice">Last Price</label>
                    <input type="text"className="w-[200px]" />
                </div>
                <div className="flex flex-col">
                    <label htmlFor="Stock">Stock Quantity</label>
                    <input type="text"className="w-[200px]" />
                </div>
                <div className="flex flex-col">
                    <label htmlFor="Description">Description</label>
                    <textarea className="w-[200px]"></textarea>
                </div>
                <button className="w-[200px]">Add Product</button>
            </div>
        </div>
    )
}