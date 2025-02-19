import axios from "axios";
import { useEffect, useState } from "react";

export default function AdminCustomersPage() {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    axios
      .get(import.meta.env.VITE_BACKEND_URL + "/api/users", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        console.log(res.data.list);
        setCustomers(res.data.list);
      })
      .catch((err) => console.error(err));
  }, []);

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
                <th className="py-4 px-6 text-left">First Name</th>
                <th className="py-4 px-6 text-left">Last Name</th>
                <th className="py-4 px-6 text-left">Email</th>
                <th className="py-4 px-6 text-left">Blocked?</th>
                <th className="py-4 px-6 text-left">Type</th>
                <th className="py-4 px-6 text-left">Profile Picture</th>
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
                  <td className="py-4 px-6 text-left whitespace-nowrap">
                    {customer.firstName}
                  </td>
                  <td className="py-4 px-6 text-left">{customer.lastName}</td>
                  <td className="py-4 px-6 text-left">{customer.email}</td>
                  <td className="py-4 px-6 text-left">
                    {customer.isBlocked ? "Yes" : "No"}
                  </td>
                  <td className="py-4 px-6 text-left">{customer.type}</td>
                  <td className="py-4 px-6 text-left">
                    <img
                      src={customer.profilePicture}
                      alt="Profile"
                      className="w-12 h-12 rounded-full shadow-md border border-gray-300"
                    />
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
