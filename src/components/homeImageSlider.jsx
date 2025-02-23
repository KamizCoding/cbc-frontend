import { useState, useEffect } from "react";

const sliderImages = [
    "/homeslider01.png",  
    "/homeslider02.png",
    "/homeslider03.png",
    "/homeslider04.png"
];

export default function HomeImageSlider() {
    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prevSlide) => (prevSlide + 1) % sliderImages.length);
        }, 2000); 

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="relative w-full h-screen overflow-hidden">
            <div className="absolute inset-0 bg-contain bg-no-repeat bg-center transition-all duration-1000" 
                 style={{ backgroundImage: `url(${sliderImages[currentSlide]})` }}>
            </div>

            <div className="absolute bottom-6 flex gap-2 left-1/2 transform -translate-x-1/2">
                {sliderImages.map((_, index) => (
                    <span key={index} 
                          className={`w-3 h-3 rounded-full transition-all duration-10 ${
                              currentSlide === index ? "bg-white" : "bg-gray-400"
                          }`} />
                ))}
            </div>
        </div>
    );
}
