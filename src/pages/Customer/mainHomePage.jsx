export default function MainHomePage() {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-green-200 to-green-500 text-center p-6">
        <div className="max-w-4xl">
          <h1 className="text-5xl font-extrabold text-green-900 leading-tight">
            Welcome to Pure & Pristine E-Market
          </h1>
          <p className="text-lg text-gray-700 mt-4">
            Discover eco-friendly and natural beauty products for a healthier lifestyle.
          </p>
          <div className="mt-6 space-x-4">
            <a
              href="/products"
              className="px-6 py-3 bg-green-700 text-white font-semibold rounded-lg shadow-md hover:bg-green-800 transition-all"
            >
              Shop Now
            </a>
            <a
              href="/about"
              className="px-6 py-3 bg-white text-green-700 font-semibold rounded-lg shadow-md border border-green-700 hover:bg-green-100 transition-all"
            >
              Learn More
            </a>
          </div>
        </div>
      </div>
    );
  }
  