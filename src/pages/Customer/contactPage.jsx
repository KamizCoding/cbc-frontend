export default function ContactPage() {
    return (
      <div className="h-full overflow-y-auto flex justify-center items-center p-6 bg-gradient-to-br from-green-200 to-green-500"> 
        <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-3xl mt-20 flex flex-col md:flex-row gap-6">
          
          {/* Store Contact Information Section - Left Side */}
          <div className="bg-green-100 rounded-lg shadow-md p-5 flex-1">
            <h2 className="text-lg font-bold text-green-700 text-center">📍 Store Details</h2>
            <div className="mt-3 space-y-3 text-sm text-gray-700">
              <p className="flex items-center gap-2">
                📞 <span>+1 234 567 890</span>
              </p>
              <p className="flex items-center gap-2">
                📧 <span>support@pnpemarket.com</span>
              </p>
              <p className="flex items-center gap-2">
                📍 <span>123 Greenway Avenue, Eco City, USA</span>
              </p>
              <p className="flex items-center gap-2">
                🕒 <span>Monday - Friday: 9 AM - 6 PM</span>
              </p>
            </div>
          </div>

          {/* Contact Form - Right Side */}
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-green-700 text-center mb-3">
              Get in Touch
            </h1>
            <p className="text-gray-600 text-center text-sm mb-4">
              Have any questions or feedback? Reach out to us, and we’ll get back to you soon!
            </p>

            <form className="space-y-3 w-full">
              <div>
                <label className="block text-xs font-medium text-gray-700">Your Name</label>
                <input
                  type="text"
                  placeholder="Enter your name"
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400 text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700">Your Email</label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400 text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700">Message</label>
                <textarea
                  rows="3"
                  placeholder="Type your message here..."
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400 resize-none text-sm"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-green-600 text-white font-medium py-2 rounded-md shadow-md hover:bg-green-700 transition-all duration-300 text-sm"
              >
                Send Message
              </button>
            </form>
          </div>

        </div>
      </div>
    );
}
