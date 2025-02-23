import { useState, useEffect } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

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

    const goToPreviousSlide = () => {
        setCurrentSlide((prevSlide) => (prevSlide - 1 + sliderImages.length) % sliderImages.length);
    };

    const goToNextSlide = () => {
        setCurrentSlide((prevSlide) => (prevSlide + 1) % sliderImages.length);
    };

    return (
        <div className="relative w-full h-screen overflow-hidden">
            {sliderImages.map((image, index) => (
                <div 
                    key={index} 
                    className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ${
                        currentSlide === index ? "opacity-100" : "opacity-0"
                    }`}
                    style={{ backgroundImage: `url(${image})` }}
                />
            ))}

            <button 
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/40 text-white p-3 rounded-full hover:bg-black/60 transition"
                onClick={goToPreviousSlide}
            >
                <FaChevronLeft size={20} />
            </button>

            <button 
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/40 text-white p-3 rounded-full hover:bg-black/60 transition"
                onClick={goToNextSlide}
            >
                <FaChevronRight size={20} />
            </button>

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
