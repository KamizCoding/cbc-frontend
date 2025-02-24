import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import HomeImageSlider from "../../components/homeImageSlider";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

export default function MainHomePage() {
  const [products, setProducts] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const brandLogos = [
    { logo: "/brand01logo.png", name: "ILIA BEAUTY" },
    { logo: "/brand02logo.jpg", name: "AXIOLOGY" },
    { logo: "/brand03logo.jpg", name: "ELATE COSMETICS" },
    { logo: "/brand04logo.png", name: "100% PURE" },
    { logo: "/brand05logo.jpg", name: "LA BOUCHE BEAUTY" },
    { logo: "/brand06logo.jpg", name: "WELL PEOPLE" },
    { logo: "/brand07logo.jpg", name: "ALIMA PURE" },
    { logo: "/brand08logo.jpg", name: "RMS BEAUTY" },
  ];

  useEffect(() => {
    axios
      .get(import.meta.env.VITE_BACKEND_URL + "/api/products")
      .then((res) => setProducts(res.data.list || []))
      .catch(() => setProducts([]));
  }, []);

  const totalSlides = Math.floor(brandLogos.length / 4);

  const goToPreviousSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? totalSlides - 1 : prevIndex - 1));
};

const goToNextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % totalSlides);
};

  return (
    <div className="flex-1 w-full overflow-y-auto bg-primary">
      <div className="relative w-full h-[474px] flex flex-col justify-center items-center text-white">
        <HomeImageSlider />
        <div className="relative text-center max-w-2xl rounded-md p-[30px]">
          <h1 className="text-5xl md:text-4xl font-extrabold text-gray-400 drop-shadow-lg">
            Pure & Pristine E-Market
          </h1>
          <p className="text-xl md:text-2xl mt-4 text-gray-300 font-medium">
            Discover nature-inspired beauty products made with sustainability in mind.
          </p>
        </div>
      </div>

      <div className="w-full flex flex-col items-center py-12">
        <h2 className="text-3xl font-extrabold text-green-800 mb-2">Featured Deals ✨</h2>
        <p className="text-lg text-gray-600 mb-6">Exclusive discounts on our best-selling nature-inspired products!</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-6xl">
        {products
          .filter((product) => product.lastPrice < product.price)
          .slice(0, 8)
          .map((product) => (
            <div key={product.productId} className="bg-white shadow-md rounded-lg p-4 flex flex-col items-center min-h-[380px]">
              <img
                src={product.images?.[0] || "/placeholder.png"}
                alt={product.productName}
                className="w-full h-48 object-cover rounded-lg"
              />
              <h3 className="text-lg font-semibold text-gray-900 mt-4">
                {product.productName}
              </h3>
              <p className="text-gray-500 text-sm">{product.productId}</p>

              <div className="mt-2">
                <span className="text-green-600 font-bold text-lg">
                  LKR. {product.lastPrice.toFixed(2)}
                </span>
                <span className="text-gray-500 line-through ml-2">
                  LKR. {product.price.toFixed(2)}
                </span>
              </div>

              <Link
                to={`/products/productinfo/${product.productId}`}
                className="mt-4 px-4 py-2 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 transition"
              >
                View Details
              </Link>
            </div>
          ))}
      </div>

      {products.some((product) => product.lastPrice < product.price) && (
        <div className="flex justify-center mt-8">
          <Link
            to="/products"
            className="px-6 py-3 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 transition"
          >
            View All Products
          </Link>
        </div>
      )}

      <div className="w-full py-12 bg-green-50 flex flex-col items-center">
        <h2 className="text-3xl font-extrabold text-green-800 mb-6">Our Trusted Partners 🤝</h2>
        <p className="text-lg text-gray-600 mb-6 max-w-xl text-center">We collaborate with top eco-friendly brands to bring you the best sustainable beauty products.</p>

        <div className="relative w-full max-w-xl">
          <button
            className="absolute left-[-60px] top-1/3 transform -translate-y-1/2 bg-green-600 text-white p-3 rounded-full hover:bg-green-700 transition z-10"
            onClick={goToPreviousSlide}
          >
            <FaChevronLeft size={20} />
          </button>

          <div className="overflow-hidden w-full">
    <div
        className="flex transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
    >
        {Array.from({ length: totalSlides }).map((_, index) => (
            <div key={index} className="flex w-full justify-center gap-6">
                {brandLogos.slice(index * 4, index * 4 + 4).map((brand, i) => (
                    <div key={i} className="w-1/4 flex flex-col items-center p-4">
                        <img
                            src={brand.logo}
                            alt={brand.name}
                            className="w-32 h-16 object-contain transition-transform duration-300 ease-in-out hover:scale-105"
                        />
                        <span className="mt-2 text-green-900 font-semibold text-lg text-center">
                            {brand.name}
                        </span>
                    </div>
                ))}
            </div>
        ))}
    </div>
</div>


          <button
            className="absolute right-[-40px] top-1/3 transform -translate-y-1/2 bg-green-600 text-white p-3 rounded-full hover:bg-green-700 transition z-10"
            onClick={goToNextSlide}
          >
            <FaChevronRight size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}
