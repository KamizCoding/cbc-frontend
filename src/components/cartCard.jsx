export default function CartCard(props){

    const productId = props.productId
    const quantity = props.quantity
    return(
        <div className="border w-1/2 flex justify-between items-center">
            <span>{productId}</span>
            <span>X</span>
            <span>{quantity}</span>
        </div>
    )
}