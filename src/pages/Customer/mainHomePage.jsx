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
    { logo: "/brand014ogo.png", name: "100% PURE" },
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
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? totalSlides - 1 : prevIndex - 1
    );
  };

  const goToNextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % totalSlides);
  };

  return (
    <div className="flex-1 w-full overflow-y-auto bg-primary">
      <div className="relative w-full h-[474px] flex flex-col justify-center items-center text-white">
        <HomeImageSlider />
        <div className="relative text-center max-w-2xl rounded-md p-[10px]">
          <h1 className="text-5xl md:text-4xl font-extrabold text-gray-400 drop-shadow-lg">
            Pure & Pristine E-Market
          </h1>
          <p className="text-xl md:text-2xl mt-4 text-gray-300 font-medium">
            Discover nature-inspired beauty products made with sustainability in
            mind.
          </p>
        </div>
      </div>

      <div className="w-full flex flex-col items-center py-12">
        <h2 className="text-3xl font-extrabold text-green-800 mb-2">
          Featured Deals ✨
        </h2>
        <p className="text-lg text-gray-600 mb-6">
          Exclusive discounts on our best-selling nature-inspired products!
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-6xl">
        {products
          .filter((product) => product.lastPrice < product.price)
          .slice(0, 8)
          .map((product) => (
            <div
              key={product.productId}
              className="bg-white shadow-md rounded-lg p-4 flex flex-col items-center min-h-[380px]"
            >
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

      <div className="w-full py-12 flex flex-col items-center bg-green-50">
        <h2 className="text-3xl font-extrabold text-green-800 mb-2">
          Why Choose Us? 🌿
        </h2>
        <p className="text-lg text-gray-600 mb-6">
          Experience the best in sustainable beauty with our nature-inspired
          products!
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-6xl">
          <div
            className="flex flex-col items-center text-center p-6 bg-white rounded-lg shadow-md 
                        transform transition duration-300 hover:scale-105 hover:shadow-lg"
          >
            <span className="text-green-600 text-4xl">🌱</span>
            <h3 className="text-xl font-semibold text-green-700 mt-3">
              100% Eco-Friendly
            </h3>
            <p className="text-gray-600 mt-2">
              Our products are sustainably sourced, cruelty-free, and
              environmentally friendly.
            </p>
          </div>

          <div
            className="flex flex-col items-center text-center p-6 bg-white rounded-lg shadow-md 
                        transform transition duration-300 hover:scale-105 hover:shadow-lg"
          >
            <span className="text-yellow-500 text-4xl">✨</span>
            <h3 className="text-xl font-semibold text-green-700 mt-3">
              Premium Quality
            </h3>
            <p className="text-gray-600 mt-2">
              We ensure top-tier quality with the finest natural ingredients and
              expert craftsmanship.
            </p>
          </div>

          <div
            className="flex flex-col items-center text-center p-6 bg-white rounded-lg shadow-md 
                        transform transition duration-300 hover:scale-105 hover:shadow-lg"
          >
            <span className="text-blue-500 text-4xl">💚</span>
            <h3 className="text-xl font-semibold text-green-700 mt-3">
              Loved by Customers
            </h3>
            <p className="text-gray-600 mt-2">
              Thousands of happy customers trust us for their skincare and
              beauty needs.
            </p>
          </div>
        </div>
      </div>

      <div className="w-full py-12 bg-green-50 flex flex-col items-center">
        <h2 className="text-3xl font-extrabold text-green-800 mb-6">
          Our Trusted Partners 🤝
        </h2>
        <p className="text-lg text-gray-600 mb-6 max-w-xl text-center">
          We collaborate with top eco-friendly brands to bring you the best
          sustainable beauty products.
        </p>

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
                  {brandLogos
                    .slice(index * 4, index * 4 + 4)
                    .map((brand, i) => (
                      <div
                        key={i}
                        className="w-1/4 flex flex-col items-center p-7 hover:scale-125"
                      >
                        <img
                          src={brand.logo}
                          alt={brand.name}
                          className="w-36 h-20 object-contain transition-transform duration-300 ease-in-out "
                        />
                        <span className="mt-2 text-green-900 font-semibold text-lg text-center ">
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

      <div className="w-full py-12 flex flex-col items-center bg-white">
        <h2 className="text-3xl font-extrabold text-green-800 mb-6">
          Skincare & Beauty Tips ✨
        </h2>
        <p className="text-lg text-gray-600 mb-6 max-w-xl text-center">
          Discover expert tips on **eco-friendly skincare, natural beauty, and
          self-care.**
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-6xl">
          {[
            {
              id: 1,
              icon: "🌿",
              title: "Hydration is Key",
              description:
                "Drink plenty of water daily to keep your skin naturally glowing and hydrated.",
            },
            {
              id: 2,
              icon: "☀️",
              title: "Never Skip Sunscreen",
              description:
                "Protect your skin from harmful UV rays by applying SPF 30+ every day.",
            },
            {
              id: 3,
              icon: "🍯",
              title: "Use Natural Ingredients",
              description:
                "Honey, aloe vera, and coconut oil work wonders for nourishing the skin.",
            },
            {
              id: 4,
              icon: "💤",
              title: "Get Enough Sleep",
              description:
                "Your skin repairs itself while you sleep, so aim for at least 7-8 hours.",
            },
            {
              id: 5,
              icon: "🥑",
              title: "Eat Healthy Fats",
              description:
                "Avocados, nuts, and olive oil help maintain skin elasticity and glow.",
            },
            {
              id: 6,
              icon: "❌",
              title: "Avoid Harsh Chemicals",
              description:
                "Switch to organic, paraben-free skincare to prevent skin irritation.",
            },
          ].map((tip) => (
            <div
              key={tip.id}
              className="bg-green-50 shadow-lg rounded-lg p-6 text-center transition-transform transform hover:scale-105"
            >
              <div className="text-5xl">{tip.icon}</div>
              <h3 className="text-xl font-bold text-green-800 mt-3">
                {tip.title}
              </h3>
              <p className="text-gray-600 mt-2">{tip.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
