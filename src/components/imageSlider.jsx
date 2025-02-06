import { useState } from "react";

export default function ImageSlider(props){
    const images = props.images;
    const [activeImage, setActiveImage] = useState(0);

    return(
        <div className="w-full flex flex-col items-center relative aspect-square pb-[100px]"> 
            <img src={images[activeImage]} className="w-full aspect-square object-cover"/>
            <div className="absolute bottom-0 w-full h-[100px]">
                <div className="w-full h-full bg-white flex items-center justify-center overflow-hidden">
                    {
                        images.map((image, index) => (
                            <img
                                key={index}
                                src={image}
                                className="w-16 h-16 object-cover mx-2 cursor-pointer"
                                onClick={() => setActiveImage(index)}
                            />
                        ))
                    }

                </div>
            </div>
        </div>
    );
}
