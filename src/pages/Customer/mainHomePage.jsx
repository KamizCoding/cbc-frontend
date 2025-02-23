export default function MainHomePage() {
    return (
        <div className="relative w-full min-h-screen flex flex-col justify-center items-center text-white">
            {/* Background Image */}
            <div className="absolute inset-0 bg-cover bg-center" 
                 style={{ backgroundImage: "url('/nature.jpg')" }}>
                <div className="absolute inset-0 bg-black opacity-40"></div> {/* Dark Overlay */}
            </div>

            {/* Hero Content */}
            <div className="relative z-10 text-center max-w-2xl p-6">
                <h1 className="text-4xl md:text-5xl font-extrabold">
                    Pure & Pristine E-Market
                </h1>
                <p className="text-lg md:text-xl mt-4">
                    Discover nature-inspired beauty products made with sustainability in mind.
                </p>
                <button className="mt-6 px-6 py-3 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 transition-all">
                    Explore Products
                </button>
            </div>

            {/* Featured Products Section */}
            <div className="relative z-10 mt-10 w-full max-w-5xl p-6 bg-white rounded-lg shadow-lg">
                <h2 className="text-xl font-semibold text-center text-green-700 mb-4">
                    🌿 Featured Products
                </h2>
                <div className="flex flex-wrap justify-center gap-6">
                    {/* Sample Product Cards */}
                    <div className="w-40 h-56 bg-gray-100 rounded-lg shadow-md p-3 flex flex-col items-center">
                        <img src="/product1.jpg" alt="Product 1" className="w-full h-32 object-cover rounded-md"/>
                        <p className="text-sm font-medium mt-2">Organic Face Cream</p>
                    </div>
                    <div className="w-40 h-56 bg-gray-100 rounded-lg shadow-md p-3 flex flex-col items-center">
                        <img src="/product2.jpg" alt="Product 2" className="w-full h-32 object-cover rounded-md"/>
                        <p className="text-sm font-medium mt-2">Eco-friendly Shampoo</p>
                    </div>
                    <div className="w-40 h-56 bg-gray-100 rounded-lg shadow-md p-3 flex flex-col items-center">
                        <img src="/product3.jpg" alt="Product 3" className="w-full h-32 object-cover rounded-md"/>
                        <p className="text-sm font-medium mt-2">Natural Lip Balm</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
