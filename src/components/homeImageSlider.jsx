import { useState, useEffect } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const sliderImages = [
  {
    src: "/homeslider01.png",
    heading: "Pure & Pristine",
    subheading: "Perfumery and Cosmetics",
    showLogo: true,
  },
  {
    src: "/homeslider02.png",
    heading: "Glow Naturally, Live Sustainably.",
    subheading:
      "Step into a world where beauty and nature exist in perfect harmony.",
  },
  {
    src: "/homeslider03.png",
    heading: "Pure Beauty, Inspired by Nature.",
    subheading:
      "Discover our eco-friendly skincare crafted with natural ingredients for a radiant you.",
  },
  {
    src: "/homeslider04.png",
    heading: "Nature's Touch, Your Beauty.",
    subheading:
      "Sustainable, ethical, and pure—experience the best of natural beauty.",
  },
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
    <div className="relative w-full h-[110px] sm:h-[300px] md:h-[474px] overflow-hidden flex justify-center items-center">
      {sliderImages.map((slide, index) => (
        <div
          key={index}
          className={`absolute w-full h-full transition-opacity duration-1000 flex items-center justify-center ${
            currentSlide === index ? "opacity-100" : "opacity-0"
          }`}
        >
          <img
            src={slide.src}
            alt={`Slide ${index + 1}`}
            className="absolute w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center text-white px-4 sm:px-6 text-center">
            {slide.showLogo && (
              <img
                src="/logo.png"
                alt="Pure & Pristine Logo"
                className="w-[50px] h-[50px] sm:w-36 sm:h-36 md:w-40 md:h-40 mb-3 sm:mb-4"
              />
            )}
            <h2 className="text-xl sm:text-3xl md:text-4xl font-bold">
              {slide.heading}
            </h2>
            <p className="text-sm sm:text-lg md:text-xl mt-1 sm:mt-2">
              {slide.subheading}
            </p>
          </div>
        </div>
      ))}

      <button
        className="absolute left-2 sm:left-4 top-1/2 transform -translate-y-1/2 bg-black/40 text-white p-2 sm:p-3 rounded-full hover:bg-black/60 transition"
        onClick={goToPreviousSlide}
      >
        <FaChevronLeft size={16} className="sm:size-18" />
      </button>

      <button
        className="absolute right-2 sm:right-4 top-1/2 transform -translate-y-1/2 bg-black/40 text-white p-2 sm:p-3 rounded-full hover:bg-black/60 transition"
        onClick={goToNextSlide}
      >
        <FaChevronRight size={16} className="sm:size-18" />
      </button>

      <div className="absolute bottom-3 sm:bottom-4 flex gap-1 sm:gap-2 left-1/2 transform -translate-x-1/2">
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
