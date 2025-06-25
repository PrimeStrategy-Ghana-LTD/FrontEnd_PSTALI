import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Pencil, ArrowLeft, Save, X } from "lucide-react";

const UserAccount = ({ user }) => {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState({});

  // Fallback if no user is passed
  const currentUser = user || {
    userName: "Jane Cooper",
    email: "janecooper@gmail.com",
    phone: "0247599392",
    role: "Admin",
    storeLocation: "Tema",
    profile_picture: "https://randomuser.me/api/portraits/women/44.jpg",
  };

  // Initialize editedUser when component mounts or user changes
  React.useEffect(() => {
    setEditedUser(currentUser);
  }, [currentUser]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedUser(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    // Here you would typically make an API call to save changes
    console.log("Saved changes:", editedUser);
    setIsEditing(false);
    // Update currentUser with edited data
    // In a real app, you would update the state/context/API
  };

  const handleDiscard = () => {
    setEditedUser(currentUser);
    setIsEditing(false);
  };

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

          {!isEditing ? (
            <button
              onClick={() => setIsEditing(true)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              <Pencil size={20} />
            </button>
          ) : null}
        </div>

        {/* Profile Content */}
        <div className="flex flex-col items-center -mt-20 pb-10 px-4">
          <img
            src={currentUser.profile_picture}
            alt="Profile"
            className="w-32 h-32 object-cover rounded-full border-4 border-white shadow-md"
          />
          
          {isEditing ? (
            <div className="w-full max-w-md mt-4 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Name</label>
                <input
                  type="text"
                  name="userName"
                  value={editedUser.userName || ""}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2 border"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  type="text"
                  name="email"
                  value={editedUser.email || ""}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2 border"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Phone</label>
                <input
                  type="text"
                  name="phone"
                  value={editedUser.phone || ""}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2 border"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Role</label>
                <input
                  type="text"
                  name="role"
                  value={editedUser.role || ""}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2 border"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Location</label>
                <input
                  type="text"
                  name="storeLocation"
                  value={editedUser.storeLocation || ""}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2 border"
                />
              </div>

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
              <h2 className="text-xl font-semibold">{currentUser.userName}</h2>
              <p className="text-sm text-gray-500 mt-1">
                {currentUser.email} | {currentUser.phone}
              </p>

              <div className="mt-6 space-y-2 text-center">
                <p>
                  <span className="font-semibold">Role:</span> {currentUser.role}
                </p>
                <p>
                  <span className="font-semibold">Location:</span> {currentUser.storeLocation}
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