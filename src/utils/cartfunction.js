export function loadCart(){
    const cart = localStorage.getItem("cart");
    if(cart!=null){
        return JSON.parse(cart)
    }else{
        return []
    }
}

export function addToCart(productId, quantity){
    const cart = loadCart()

    const index = cart.findIndex(
        (product) => {
           return product.productId == productId
        }
    )

    if(index == -1){
        cart.push(
            {productId, quantity}
        ) 
    } else {
        const newQauntity = cart[index].quantity + quantity

        if(newQauntity <= 0){
            cart.splice(index,1)
        } else {
            cart[index].quantity = newQauntity
        }
    }
    saveCart(cart)    
}

export function saveCart(cart){
    localStorage.setItem("cart",JSON.stringify(cart))
}

export function clearCart(){
    localStorage.removeItem("cart")
}