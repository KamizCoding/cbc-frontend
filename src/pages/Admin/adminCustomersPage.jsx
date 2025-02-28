import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaLock, FaLockOpen, FaTrash } from "react-icons/fa6";

export default function AdminCustomersPage() {
  const [customers, setCustomers] = useState([]);
  const [loadedCustomers, setLoadedCustomers] = useState(false);
  const [showBlockModal, setShowBlockModal] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  useEffect(() => {
    if (!loadedCustomers) {
      axios
        .get(import.meta.env.VITE_BACKEND_URL + "/api/users", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((res) => {
          console.log(res.data.list);
          setCustomers(res.data.list);
          setLoadedCustomers(true);
        })
        .catch((err) => console.error(err));
    }
  }, [loadedCustomers]);

  function handleBlockToggle(customer) {
    setSelectedCustomer(customer);
    setShowBlockModal(true);
  }

  function confirmBlock() {
    const token = localStorage.getItem("token");

    axios
      .put(
        import.meta.env.VITE_BACKEND_URL + "/api/users",
        { email: selectedCustomer.email, isBlocked: !selectedCustomer.isBlocked },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((res) => {
        toast.success(res.data.message);
        setCustomers(
          customers.map((c) =>
            c.email === selectedCustomer.email
              ? { ...c, isBlocked: !selectedCustomer.isBlocked }
              : c
          )
        );
        setShowBlockModal(false);
      })
      .catch(() => {
        toast.error("Failed to update user status. Please try again.");
      });
  }

  return (
    <div className="p-6 bg-lime-50 flex flex-col items-center relative overflow-hidden">
      <h1 className="text-4xl font-extrabold text-lime-700 mb-8">
        Admin Customers Page
      </h1>
      <div className="w-full max-w-6xl shadow-lg rounded-lg flex-grow">
        <div className="max-h-[350px] overflow-y-auto">
          <table className="w-full bg-white rounded-lg border border-gray-300 shadow-md">
            <thead>
              <tr className="bg-lime-700 text-white uppercase text-md font-semibold">
                <th className="py-3 px-3 text-left w-20">First Name</th>
                <th className="py-3 px-3 text-left w-20">Last Name</th>
                <th className="py-3 px-3 text-left w-40">Email</th>
                <th className="py-3 px-3 text-left w-16">Blocked?</th>
                <th className="py-3 px-3 text-left w-16">Type</th>
                <th className="py-3 px-3 text-left w-28">Profile</th>
                <th className="py-3 px-3 text-left w-16">Block</th>
                <th className="py-3 px-3 text-left w-16">Delete</th>
              </tr>
            </thead>
            <tbody className="text-gray-800 text-sm font-medium divide-y divide-gray-200">
              {customers.map((customer, index) => (
                <tr
                  key={index}
                  className={`${
                    index % 2 === 0 ? "bg-lime-100" : "bg-lime-200"
                  } hover:bg-lime-300 transition duration-200`}
                >
                  <td className="py-3 px-3 text-left whitespace-nowrap">
                    {customer.firstName}
                  </td>
                  <td className="py-3 px-3 text-left">{customer.lastName}</td>
                  <td className="py-3 px-3 text-left truncate">
                    {customer.email}
                  </td>
                  <td className="py-3 px-3 text-left">
                    {customer.isBlocked ? "Yes" : "No"}
                  </td>
                  <td className="py-3 px-3 text-left">{customer.type}</td>
                  <td className="py-3 px-3 text-left">
                    <img
                      src={customer.profilePicture}
                      alt="Profile"
                      className="w-8 h-8 rounded-full shadow-md border border-gray-300"
                    />
                  </td>
                  <td className="py-3 px-3 text-left">
                    <button
                      className={`p-1 rounded-lg ${
                        customer.isBlocked
                          ? "bg-green-500 hover:bg-green-600"
                          : "bg-yellow-500 hover:bg-yellow-600"
                      } text-white shadow-md transition duration-200`}
                      onClick={() => handleBlockToggle(customer)}
                    >
                      {customer.isBlocked ? <FaLockOpen /> : <FaLock />}
                    </button>
                  </td>
                  <td className="py-3 px-3 text-left">
                    <button
                      className="p-1 rounded-lg bg-red-500 hover:bg-red-600 text-white shadow-md transition duration-200"
                      onClick={() => {
                        const token = localStorage.getItem("token");

                        axios
                          .delete(
                            import.meta.env.VITE_BACKEND_URL + "/api/users",
                            {
                              headers: {
                                Authorization: `Bearer ${token}`,
                              },
                              data: { email: customer.email },
                            }
                          )
                          .then((res) => {
                            console.log(res.data);
                            toast.success("The unwelcome customer was kicked out successfully");

                            setTimeout(() => {
                              setLoadedCustomers(false);
                            }, 1000);
                          })
                          .catch((err) => console.error(err));
                      }}
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showBlockModal && selectedCustomer && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 px-4">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-bold text-center mb-4">
              Confirm Block Action
            </h2>
            <p className="text-gray-700 text-center">
              Are you sure you want to block <strong>{selectedCustomer.email}</strong>?
            </p>
            <div className="mt-4 flex justify-end gap-4">
              <button
                className="px-4 py-2 bg-gray-400 text-white rounded-md"
                onClick={() => setShowBlockModal(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-red-500 text-white rounded-md"
                onClick={confirmBlock}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
