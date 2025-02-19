import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import uploadMediaToSupabase from "../../utils/mediaUpload";

export default function UserDetailsPage() {
  const location = useLocation();
  const user = location.state.user;

  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [email, setEmail] = useState(user.email);
  const [password, setPassword] = useState(user.password);
  const [profilePic, setProfilePic] = useState(user.profilePic);
  const [profilePicURL, setProfilePicURL] = useState("");
  const nav = useNavigate();

  console.log(location);

  async function handleUpdate() {
    const promisesArray = [];

    let uploadedImageURL = profilePicURL;

    if (profilePic) {
        promisesArray.push(uploadMediaToSupabase(profilePic));
        uploadedImageURL = await Promise.all(promisesArray);
        uploadedImageURL = uploadedImageURL[0]; // Since we are uploading only one image
    }

    const userData = {
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
        profilePicture: uploadedImageURL,
    };

    const token = localStorage.getItem("token");

    try {
        await axios.put(import.meta.env.VITE_BACKEND_URL + `/api/users/update/${email}`, userData, {
            headers: {
                Authorization: "Bearer " + token,
            },
        });
        toast.success("Your Details Were Updated Successfully");
        setTimeout(() => {
            nav("/");
        }, 1000);
    } catch (error) {
        toast.error("Failed to update user details due to an error");
    }
}


  return (
    <div className="flex flex-col min-h-screen items-center justify-center bg-gradient-to-b from-green-300 to-green-500">
      <img src="/logo.png" className="rounded-full w-[150px] p-3" />
      <div className="w-full max-w-md bg-gradient-to-br from-green-500 to-green-700 rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold text-center text-green-700 mb-2 bg-green-400 rounded-3xl">
          Your Details
        </h1>

        <div>
          <label className="block text-gray-200 font-bold">Email:</label>
          <input
            type="email"
            placeholder="Enter Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled
          />
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-gray-200 font-bold">First Name:</label>
            <input
              type="text"
              placeholder="Enter Your First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-gray-200 font-bold">Last Name:</label>
            <input
              type="text"
              placeholder="Enter Your Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-gray-200 font-bold">Password:</label>
            <input
              type="password"
              placeholder="Enter Your Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-gray-200 font-bold mb-1">
              Profile Picture:
            </label>
            <div
              className="relative flex items-center justify-center bg-white border-2 border-gray-400 rounded-lg cursor-pointer 
        hover:bg-gray-200 transition focus:ring-2 focus:ring-green-500 shadow-md py-3"
            >
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setProfilePic(e.target.files[0])}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              <span className="text-gray-700 px-4 py-2 text-sm font-semibold">
                Upload Image
              </span>
            </div>
          </div>

          {profilePic && (
            <div className="flex justify-center mt-2">
              <img
                src={URL.createObjectURL(profilePic)}
                alt="Profile Preview"
                className="w-24 h-24 rounded-full object-cover border border-gray-300"
              />
            </div>
          )}

          <button
            onClick={handleUpdate}
            className="w-full py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition"
          >
            Update User Details
          </button>
        </div>
      </div>
    </div>
  );
}
