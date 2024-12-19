export function LoginPage() {
    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-100">
            <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
                <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">Login</h1>
                <div className="space-y-4">
                    <input
                        type="text"
                        placeholder="Enter Your User Name"
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
