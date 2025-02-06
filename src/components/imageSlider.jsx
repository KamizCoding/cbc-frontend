import { useState } from "react";

export default function ImageSlider({ images }) {
    const [activeImage, setActiveImage] = useState(0);

    return (
        <div className="w-full flex flex-col items-center relative aspect-[3/4]">
            <div className="w-full aspect-[3/4] overflow-hidden rounded-lg shadow-lg border border-gray-300">
                <img
                    src={images[activeImage]}
                    className="w-full h-full object-cover transition-opacity duration-500 ease-in-out rounded-lg"
                    alt="Product"
                />
            </div>

            <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 bg-white bg-opacity-95 rounded-lg shadow-md p-2 w-[80%] flex justify-center space-x-2">
                {images.slice(0, 5).map((image, index) => (
                    <div 
                        key={index} 
                        className={`p-1 rounded-md transition-all duration-300 cursor-pointer 
                            ${index === activeImage ? "bg-white border-[3px] border-accent shadow-lg" : "opacity-70 hover:opacity-100 hover:ring-2 hover:ring-secondary"}
                        `}
                        onClick={() => setActiveImage(index)}
                    >
                        <img
                            src={image}
                            alt={`Thumbnail ${index}`}
                            className="w-12 h-12 object-cover rounded-md"
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}
