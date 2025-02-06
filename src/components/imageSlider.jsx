import { useState } from "react";

export default function ImageSlider({ images }) {
    const [activeImage, setActiveImage] = useState(0);

    return (
        <div className="w-full flex flex-col items-center relative aspect-square">
            {/* Main Image Display */}
            <div className="w-full aspect-square overflow-hidden rounded-lg shadow-lg">
                <img
                    src={images[activeImage]}
                    className="w-full h-full object-cover transition-opacity duration-500 ease-in-out rounded-lg"
                    alt="Product"
                />
            </div>

            {/* Thumbnails Section */}
            <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 bg-white bg-opacity-90 rounded-lg shadow-md p-2 w-[90%] flex justify-center space-x-3">
                {images.slice(0, 5).map((image, index) => (
                    <img
                        key={index}
                        src={image}
                        alt={`Thumbnail ${index}`}
                        className={`w-16 h-16 object-cover rounded-md cursor-pointer transition-all duration-300 
                        ${index === activeImage ? "ring-4 ring-accent" : "opacity-70 hover:opacity-100 hover:ring-2 hover:ring-secondary"}`}
                        onClick={() => setActiveImage(index)}
                    />
                ))}
            </div>
        </div>
    );
}
