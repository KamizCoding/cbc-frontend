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
