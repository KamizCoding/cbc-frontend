import { useState } from "react";
import toast from "react-hot-toast";
import Footer from "../../components/footer";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState({});

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  function validateForm() {
    let newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message cannot be empty";
    } else if (formData.message.length < 10) {
      newErrors.message = "Message should be at least 10 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (!validateForm()) {
      toast.error("Please fix the errors before submitting.");
      return;
    }

    toast.success("Message sent successfully!");
    setFormData({ name: "", email: "", message: "" });
    setErrors({});
  }

  return (
    <div className="overflow-y-auto">
      <div className="overflow-y-auto flex flex-col items-center bg-primary">
        <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-3xl pt-10 mt-10 flex flex-col md:flex-row gap-6">
          <div className="flex-1 flex flex-col">
            <div className="bg-green-100 rounded-lg shadow-md p-5">
              <h2 className="text-xl font-extrabold text-green-900 text-center mb-3 border-b-2 border-green-700 pb-2">
                📍 Store Details
              </h2>
              <div className="space-y-3 text-sm text-gray-700">
                <p className="flex items-center gap-2 font-medium">
                  📞 <span>+1 234 567 890</span>
                </p>
                <p className="flex items-center gap-2 font-medium">
                  📧 <span>support@pnpemarket.com</span>
                </p>
                <p className="flex items-center gap-2 font-medium">
                  📍 <span>123 Greenway Avenue, Eco City, USA</span>
                </p>
                <p className="flex items-center gap-2 font-medium">
                  🕒 <span>Monday - Friday: 9 AM - 6 PM</span>
                </p>
              </div>

              <div className="mt-5">
                <h3 className="text-lg font-bold text-green-800 text-center mb-2">
                  🌍 Our Location
                </h3>
                <div className="rounded-lg overflow-hidden shadow-md">
                  <iframe
                    className="w-full h-40 rounded-lg"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.8354345094233!2d144.95373631531648!3d-37.81627927975148!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad65d43f1f5e3b5%3A0x5045675218ce6e0!2sMelbourne%20VIC%2C%20Australia!5e0!3m2!1sen!2sus!4v1645612921302!5m2!1sen!2sus"
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
                </div>
              </div>
            </div>
          </div>

          <div className="flex-1">
            <h1 className="text-2xl font-bold text-green-700 text-center mb-3">
              Get in Touch
            </h1>
            <p className="text-gray-600 text-center text-sm mb-4">
              Have any questions or feedback? Reach out to us, and we’ll get
              back to you soon!
            </p>

            <form onSubmit={handleSubmit} className="space-y-3 w-full">
              <div>
                <label className="block text-xs font-medium text-gray-700">
                  Your Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`w-full p-2 border ${
                    errors.name ? "border-red-500" : "border-gray-300"
                  } rounded-md focus:outline-none focus:ring-2 focus:ring-green-400 text-sm`}
                />
                {errors.name && (
                  <p className="text-red-500 text-xs mt-1">{errors.name}</p>
                )}
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700">
                  Your Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full p-2 border ${
                    errors.email ? "border-red-500" : "border-gray-300"
                  } rounded-md focus:outline-none focus:ring-2 focus:ring-green-400 text-sm`}
                />
                {errors.email && (
                  <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                )}
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700">
                  Message
                </label>
                <textarea
                  rows="3"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  className={`w-full p-2 border ${
                    errors.message ? "border-red-500" : "border-gray-300"
                  } rounded-md focus:outline-none focus:ring-2 focus:ring-green-400 resize-none text-sm`}
                ></textarea>
                {errors.message && (
                  <p className="text-red-500 text-xs mt-1">{errors.message}</p>
                )}
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

        <div className="bg-green-100 rounded-lg shadow-md p-5 mt-6 mb-4 w-full max-w-3xl text-center">
          <h2 className="text-lg font-bold text-green-900 flex items-center justify-center gap-2">
            🌱 About Us
          </h2>
          <p className="text-gray-700 text-sm mt-2">
            At <strong>Pure & Pristine E-Market</strong>, we provide the highest
            quality natural beauty products, ensuring sustainability and
            customer satisfaction. Our commitment to ethical sourcing and
            eco-friendly packaging ensures that our products align with your
            values.
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
}
