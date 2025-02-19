import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import uploadMediaToSupabase from "../../utils/mediaUpload";

export default function UserDetailsPage() {
  const location = useLocation();
  const user = location.state?.user || {};

  const [firstName, setFirstName] = useState(user.firstName || "");
  const [lastName, setLastName] = useState(user.lastName || "");
  const [email, setEmail] = useState(user.email || "");
  const [password, setPassword] = useState("");
  const [profilePic, setProfilePic] = useState(null);
  const [profilePicURL, setProfilePicURL] = useState(user.profilePicture || "");
  const nav = useNavigate();

  async function handleUpdate() {
    let uploadedImageURL = profilePicURL;

    if (profilePic) {
      try {
        uploadedImageURL = await uploadMediaToSupabase(profilePic);
      } catch (error) {
        toast.error("Profile picture upload failed.");
        return;
      }
    }

    const userData = {
      firstName,
      lastName,
      email,
      password: password || undefined,
      profilePicture: uploadedImageURL,
    };

    const token = localStorage.getItem("token");

    try {
      await axios.put(
        import.meta.env.VITE_BACKEND_URL + `/api/users/update/${email}`,
        userData,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      toast.success("Your Details Were Updated Successfully");
      setTimeout(() => {
        nav("/login");
      }, 1000);
    } catch (error) {
      toast.error("Failed to update user details due to an error");
    }
  }

  return (
    <div className="flex min-h-screen">
      <div className="w-1/3 bg-green-600 p-8 flex flex-col items-center text-white">
        <img
          src={profilePicURL || "https://via.placeholder.com/150"}
          alt="Profile"
          className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg"
        />
        <h2 className="text-xl font-bold mt-4">
          {firstName} {lastName}
        </h2>
        <p className="text-gray-200">{email}</p>
      </div>

      <div className="w-2/3 p-8 bg-muted">
        <h1 className="text-2xl font-bold text-gray-700 mb-4">Edit Profile</h1>

        <div className="space-y-4">
          <div>
            <label className="block text-gray-700 font-bold">First Name:</label>
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-bold">Last Name:</label>
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-bold">
              New Password:
            </label>
            <input
              type="password"
              placeholder="Leave empty to keep current password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-bold mb-1">
              Profile Picture:
            </label>
            <div className="relative flex items-center justify-center bg-white border-2 border-gray-400 rounded-lg cursor-pointer hover:bg-gray-200 transition focus:ring-2 focus:ring-green-500 shadow-md py-3">
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setProfilePic(e.target.files[0])}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              <span className="text-gray-700 px-4 py-2 text-sm font-semibold">
                Upload New Image
              </span>
            </div>
          </div>

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
