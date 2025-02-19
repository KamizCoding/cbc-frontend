import axios from "axios";
import { useState } from "react";

export default function AdminCustomersPage() {
  const [customers, setCustomers] = useState([]);

  axios.get(import.meta.env.VITE_BACKEND_URL + "/api/users", {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}` 
    }
  })
    .then((res) => {
      console.log(res.data);
    })
    .catch((err) => console.error(err));
  

  return (
    <div>
      Admin Customers Page
      {customers.map((customer,index) => {
        return(
            <div key={index}>
                {customer.firstName}
            </div>
        )
      }
      )}
    </div>
  );
}
