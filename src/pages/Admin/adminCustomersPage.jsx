import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaBan, FaTrash } from "react-icons/fa6";

export default function AdminCustomersPage() {
  const [customers, setCustomers] = useState([]);
  const [loadedCustomers, setLoadedCustomers] = useState(false);

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
                    <button className="p-1 rounded-lg bg-yellow-500 hover:bg-yellow-600 text-white shadow-md transition duration-200">
                      <FaBan />
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
                            toast.success(
                              "The unwelcome customer was kicked out successfully"
                            );

                            // Delay the refresh so toast remains visible
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
    </div>
  );
}
