import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Pencil, ArrowLeft, Save, X } from "lucide-react";
import axios from "axios";

const UserAccount = () => {
  const { userId } = useParams(); // ✅ Correct
  const navigate = useNavigate();

  const [isEditing, setIsEditing] = useState(false);
  const [user, setUser] = useState(null);
  const [editedUser, setEditedUser] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ✅ Corrected useEffect dependency
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`https://backend-ps-tali.onrender.com/users/${userId}`);
        setUser(response.data);
        setEditedUser(response.data);
      } catch (err) {
        console.error("Failed to fetch user", err);
        setError("User not found.");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [userId]); // ✅ Correct dependency

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    // Here you can send a PATCH/PUT request to save the updated user
    console.log("Saved changes:", editedUser);
    setIsEditing(false);
    setUser(editedUser); // Update local user state
  };

  const handleDiscard = () => {
    setEditedUser(user);
    setIsEditing(false);
  };

  if (loading) return <div className="text-center p-10">Loading...</div>;
  if (error) return <div className="text-center p-10 text-red-500">{error}</div>;

  return (
    <div className="min-h-screen bg-gray-100 p-4 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-md w-full max-w-2xl relative overflow-hidden">
        {/* Top wave background and icons */}
        <div className="bg-[#eef2f6] h-50">
          <button
            onClick={() => navigate(-1)}
            className="absolute top-4 left-4 text-gray-500 hover:text-gray-700"
          >
            <ArrowLeft size={20} />
          </button>

          {!isEditing && (
            <button
              onClick={() => setIsEditing(true)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              <Pencil size={20} />
            </button>
          )}
        </div>

        {/* Profile Content */}
        <div className="flex flex-col items-center -mt-20 pb-10 px-4">
          <img
            src={user?.profile_picture || "https://randomuser.me/api/portraits/women/44.jpg"}
            alt="Profile"
            className="w-32 h-32 object-cover rounded-full border-4 border-white shadow-md"
          />

          {isEditing ? (
            <div className="w-full max-w-md mt-4 space-y-4">
              {["userName", "email", "phone", "role", "storeLocation"].map((field) => (
                <div key={field}>
                  <label className="block text-sm font-medium text-gray-700">
                    {field === "userName" ? "Name" : field.charAt(0).toUpperCase() + field.slice(1)}
                  </label>
                  <input
                    type="text"
                    name={field}
                    value={editedUser[field] || ""}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2 border"
                  />
                </div>
              ))}

              <div className="flex justify-end space-x-4 mt-6">
                <button
                  onClick={handleDiscard}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                >
                  <div className="flex items-center">
                    <X size={16} className="mr-2" />
                    Discard
                  </div>
                </button>
                <button
                  onClick={handleSave}
                  className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                >
                  <div className="flex items-center">
                    <Save size={16} className="mr-2" />
                    Save Changes
                  </div>
                </button>
              </div>
            </div>
          ) : (
            <div className="text-center mt-4">
              <h2 className="text-xl font-semibold">{user.userName}</h2>
              <p className="text-sm text-gray-500 mt-1">
                {user.email} | {user.phone}
              </p>

              <div className="mt-6 space-y-2 text-center">
                <p>
                  <span className="font-semibold">Role:</span> {user.role}
                </p>
                <p>
                  <span className="font-semibold">Location:</span> {user.storeLocation}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserAccount;
