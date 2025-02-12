import { useLocation } from "react-router-dom"

export default function ShippingPage(){
    const location = useLocation();
    console.log(location.state)
    return(       
        <div className="w-full h-full">
            
        </div>
    )
}