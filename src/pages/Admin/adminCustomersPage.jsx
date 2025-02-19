import axios from "axios";
import { useEffect, useState } from "react";

export default function AdminCustomersPage() {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    axios.get(import.meta.env.VITE_BACKEND_URL + "/api/users", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}` 
        }
      })
        .then((res) => {
          console.log(res.data.list);
          setCustomers(res.data.list)
        })
        .catch((err) => console.error(err));
  }, [])

  return (
    <div>
      Admin Customers Page
      <table>
        <thead>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Blocked?</th>
            <th>Type</th>
            <th>Profile Picture</th>
        </thead>
        <tbody>
        {customers.map((customer,index) => {
        return(
            <tr key={index}>
                <td>{customer.firstName}</td>
                <td>{customer.lastName}</td>
                <td>{customer.email}</td>
                <td>{customer.isBlocked ? "Yes" : "No"}</td>
                <td>{customer.type}</td>
                <td>{customer.profilePicture}</td>
            </tr>
        )
      }
      )}
        </tbody>
      </table>
    </div>
  );
}
