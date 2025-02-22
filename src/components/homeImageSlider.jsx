import { useState, useEffect } from "react";

const sliderImages = [
    "/slider1.jpg",  // Replace with actual images
    "/slider2.jpg",
    "/slider3.jpg",
    "/slider4.jpg"
];

export default function HomeImageSlider() {
    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prevSlide) => (prevSlide + 1) % sliderImages.length);
        }, 4000); 

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="relative w-full h-screen overflow-hidden">
            {/* Image Slider */}
            <div className="absolute inset-0 bg-cover bg-center transition-all duration-1000" 
                 style={{ backgroundImage: `url(${sliderImages[currentSlide]})` }}>
                <div className="absolute inset-0 bg-black opacity-40"></div>
            </div>

            {/* Slider Navigation Dots */}
            <div className="absolute bottom-6 flex gap-2 left-1/2 transform -translate-x-1/2">
                {sliderImages.map((_, index) => (
                    <span key={index} 
                          className={`w-3 h-3 rounded-full transition-all duration-300 ${
                              currentSlide === index ? "bg-white" : "bg-gray-400"
                          }`} />
                ))}
            </div>
        </div>
    );
}
