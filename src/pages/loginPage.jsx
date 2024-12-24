export default function LoginPage() {
    return (
        <div className="flex flex-col min-h-screen items-center justify-center bg-gradient-to-b from-green-300 to-green-500">
            <img src="/logo1.png" className="rounded-full w-[150px] p-3" />
            <div className="w-full max-w-md bg-gradient-to-br from-green-500 to-green-700 rounded-lg shadow-md p-6">
                <h1 className="text-2xl font-bold text-center text-gray-100 mb-6">Login</h1>
                <div className="space-y-4">
                    <input
                        type="text"
                        placeholder="Enter Your Email"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                        type="password"
                        placeholder="Enter Your Password"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button className="w-full py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition">
                        Login To Your Account
                    </button>
                </div>
            </div>
        </div>
    );
}
