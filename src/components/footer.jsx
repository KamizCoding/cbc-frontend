export default function Footer() {
  return (
    <footer className="bg-green-800 text-white py-8">
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <div>
            <h2 className="text-lg font-bold">About Us</h2>
            <p className="mt-3 text-sm text-gray-300">
              We are committed to delivering high-quality, eco-friendly cosmetic
              products tailored to your needs.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-bold">Quick Links</h2>
            <ul className="mt-3 space-y-2">
              <li>
                <a href="/" className="hover:text-green-300">
                  Home
                </a>
              </li>
              <li>
                <a href="/products" className="hover:text-green-300">
                  Products
                </a>
              </li>
              <li>
                <a href="/contact" className="hover:text-green-300">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* 🔹 Contact Info */}
          <div>
            <h2 className="text-lg font-bold">Contact</h2>
            <p className="mt-3 text-sm text-gray-300">
              📍 123 Green Avenue, Colombo, Sri Lanka
            </p>
            <p className="text-sm text-gray-300">📞 +94 77 123 4567</p>
            <p className="text-sm text-gray-300">✉️ support@yourapp.com</p>
          </div>
        </div>

        <div className="border-t border-gray-500 mt-6 pt-6 text-center text-sm text-gray-400">
          <p>
            &copy; {new Date().getFullYear()} Pure & Pristine Cosmetics. All
            rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
