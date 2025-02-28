import { useState, useEffect } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const sliderImages = [
  "/homeslider01.png",
  "/homeslider02.png",
  "/homeslider03.png",
  "/homeslider04.png",
];

export default function HomeImageSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % sliderImages.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const goToPreviousSlide = () => {
    setCurrentSlide(
      (prevSlide) => (prevSlide - 1 + sliderImages.length) % sliderImages.length
    );
  };

  const goToNextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % sliderImages.length);
  };

  return (
    <div className="relative w-full h-[250px] sm:h-[350px] md:h-[474px] overflow-hidden flex justify-center items-center">
      {sliderImages.map((image, index) => (
        <img
          key={index}
          src={image}
          alt={`Slide ${index + 1}`}
          className={`absolute w-full h-full object-cover transition-opacity duration-1000 ${
            currentSlide === index ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}

      <button
        className="absolute left-2 sm:left-4 top-1/2 transform -translate-y-1/2 bg-black/40 text-white p-2 sm:p-3 rounded-full hover:bg-black/60 transition"
        onClick={goToPreviousSlide}
      >
        <FaChevronLeft size={18} className="sm:size-18" />
      </button>

      <button
        className="absolute right-2 sm:right-4 top-1/2 transform -translate-y-1/2 bg-black/40 text-white p-2 sm:p-3 rounded-full hover:bg-black/60 transition"
        onClick={goToNextSlide}
      >
        <FaChevronRight size={18} className="sm:size-18" />
      </button>

      <div className="absolute bottom-4 flex gap-1 sm:gap-2 left-1/2 transform -translate-x-1/2">
        {sliderImages.map((_, index) => (
          <span
            key={index}
            className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-300 ${
              currentSlide === index ? "bg-white" : "bg-gray-400"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
