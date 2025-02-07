import { Link } from "react-router-dom"

export default function ProductCard(props){

    console.log(props)

    return(
        <Link to={`/products/productinfo/${props.product.productId}`}>
            <div className="w-[300px] h-[450px] rounded-xl shadow-lg shadow-muted m-[30px] flex flex-col  hover:shadow-none hover:border hover:border-secondary overflow-hidden">
                <img src={props.product.images[0]} alt={props.product.productName} className="h-[65%] w-full object-cover"/>
                <div className="max-h-[35%] h-[35%]">
                <h1 className="text-3xl font-bold text-center text-accent">{props.product.productName}</h1>
                <h2 className="text-xl font-bold text-center text-gray-400">{props.product.productId}</h2>
                <p className="text-left text-xl font-semibold">LKR. {props.product.lastPrice.toFixed(2)}</p>
                {
                    (props.product.lastPrice<props.product.price)&&
                    <p className="text-left text-xl font-semibold text-gray-500 line-through">LKR. {props.product.price.toFixed(2)}</p>
                }
                </div>
            </div>
        </Link>
    )

}