export default function ContactPage() {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-green-200 to-green-500 p-6">
        <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-2xl">
          <h1 className="text-3xl font-extrabold text-green-700 text-center mb-4">
            Get in Touch
          </h1>
          <p className="text-gray-600 text-center mb-6">
            Have any questions or feedback? Reach out to us, and we’ll get back to you as soon as possible!
          </p>
  
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Your Name</label>
              <input
                type="text"
                placeholder="Enter your name"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
              />
            </div>
  
            <div>
              <label className="block text-sm font-medium text-gray-700">Your Email</label>
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
              />
            </div>
  
            <div>
              <label className="block text-sm font-medium text-gray-700">Message</label>
              <textarea
                rows="4"
                placeholder="Type your message here..."
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
              ></textarea>
            </div>
  
            <button
              type="submit"
              className="w-full bg-green-600 text-white font-semibold py-3 rounded-lg shadow-md hover:bg-green-700 transition-all duration-300"
            >
              Send Message
            </button>
          </form>
  
          <div className="mt-6 text-center">
            <p className="text-gray-600">Or reach us via:</p>
            <div className="flex justify-center gap-4 mt-2">
              <a href="#" className="text-green-600 hover:text-green-800 text-2xl">
                📧 Email
              </a>
              <a href="#" className="text-green-600 hover:text-green-800 text-2xl">
                📞 Phone
              </a>
              <a href="#" className="text-green-600 hover:text-green-800 text-2xl">
                📍 Location
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }
  