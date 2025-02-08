export function loadCart(){
    const cart = localStorage.getItem("cart");
    if(cart1=null){
        return JSON.parse(cart)
    }else{
        return []
    }
}