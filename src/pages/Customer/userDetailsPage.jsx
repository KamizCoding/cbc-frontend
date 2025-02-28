import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import axios from "axios";
import toast from "react-hot-toast";
import uploadMediaToSupabase from "../../utils/mediaUpload";

export default function UserDetailsPage() {
  const location = useLocation();
  const user = location.state?.user || {};
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [profilePic, setProfilePic] = useState(null);
  const [profilePicURL, setProfilePicURL] = useState(user.profilePicture || "");
  const [showModal, setShowModal] = useState(false);
  const [updatedUser, setUpdatedUser] = useState(user); 

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

    const updatedUserData = {
      firstName: firstName || updatedUser.firstName,
      lastName: lastName || updatedUser.lastName,
      password: password || undefined,
      profilePicture: uploadedImageURL,
    };

    const token = localStorage.getItem("token");

    try {
      await axios.put(
        import.meta.env.VITE_BACKEND_URL + `/api/users/update/${updatedUser.email}`,
        updatedUserData,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );

      setUpdatedUser({
        ...updatedUser,
        firstName: updatedUserData.firstName,
        lastName: updatedUserData.lastName,
        profilePicture: updatedUserData.profilePicture,
      });

      setFirstName("");
      setLastName("");
      setPassword("");
      setProfilePic(null);

      toast.success("Your details were updated successfully");
      setShowModal(false);
    } catch (error) {
      toast.error("Failed to update user details due to an error");
    }
  }

  return (
    <div className="flex min-h-screen relative">
      <div className="w-1/3 bg-green-700 p-8 flex flex-col items-center text-white shadow-md">
        <img
          src={updatedUser.profilePicture || "https://via.placeholder.com/150"}
          alt="Profile"
          className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg"
        />

        <h3 className="text-lg font-semibold mt-4">{updatedUser.email}</h3>

        <div className="mt-6 w-full text-left space-y-3">
          <h3 className="text-lg font-semibold text-gray-100">First Name:</h3>
          <p className="text-xl font-bold text-white">{updatedUser.firstName}</p>

          <h3 className="text-lg font-semibold text-gray-100">Last Name:</h3>
          <p className="text-xl font-bold text-white">{updatedUser.lastName}</p>
        </div>
      </div>

      <div className="w-2/3 p-8 bg-primary relative">
        <h1 className="text-2xl font-bold text-gray-700 mb-4 text-center">
          Update Your Details
        </h1>

        <div className="space-y-4">
          <div>
            <label className="block text-gray-700 font-bold">
              Update First Name:
            </label>
            <input
              type="text"
              placeholder="Enter new first name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-bold">
              Update Last Name:
            </label>
            <input
              type="text"
              placeholder="Enter new last name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-bold">
              Update Password:
            </label>
            <input
              type="password"
              placeholder="Enter new password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-bold mb-1">
              Update Profile Picture:
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
            onClick={() => setShowModal(true)}
            className="w-full py-2 bg-green-600 text-white font-semibold rounded-md hover:bg-green-700 transition"
          >
            Update User Details
          </button>

          <button
            onClick={() => navigate(-1)}
            className="absolute right-6 mt-4 bg-gray-600 text-white px-4 py-2 flex items-center gap-2 rounded-full shadow-lg hover:bg-gray-700 transition"
          >
            <FaArrowLeft size={16} />
            <span>Back</span>
          </button>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">Confirm Update</h2>
            <p className="mb-2">
              Are you sure you want to update your details?
            </p>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-gray-400 text-white rounded-md"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdate}
                className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
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
