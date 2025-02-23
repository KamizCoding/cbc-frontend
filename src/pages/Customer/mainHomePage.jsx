import HomeImageSlider from "../../components/homeImageSlider";

export default function MainHomePage() {
    return (
        <div className="flex-1 w-full overflow-y-auto">
            <div className="relative w-full h-[554px] flex flex-col justify-center items-center text-white">
                <HomeImageSlider />

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
            </div>
        </div>
    );
}
