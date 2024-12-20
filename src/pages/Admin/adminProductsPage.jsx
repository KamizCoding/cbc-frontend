import axios from "axios";

export function AdminProductsPage() {

    getProducts()
    
    return(
        <div>
            Admin Products Page
        </div>
    );
}

async function getProducts(){
    const res = await axios.get("http://localhost:5000/api/products")
        console.log(res)
}