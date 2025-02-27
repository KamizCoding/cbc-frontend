export default function ReviewModalPage({ isOpen, onClose }) {
    if (!isOpen) return null;
  
    return (
      <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white p-6 rounded-lg shadow-lg w-[500px] max-h-[80vh] overflow-y-auto relative">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Customer Reviews</h2>
          <button onClick={onClose} className="absolute top-3 right-3 text-gray-600 hover:text-gray-900 text-lg">
            ✖
          </button>
        </div>
      </div>
    );
  }
  