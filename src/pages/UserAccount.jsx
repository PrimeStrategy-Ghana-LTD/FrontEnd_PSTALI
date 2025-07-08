import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Pencil, ArrowLeft, Save, X } from "lucide-react";
import { apiGetOneUser, apiUpdateUser, apiGetLocations } from "../servicess/tali";

const UserAccount = () => {
  const { userId } = useParams();
  const navigate = useNavigate();

  const [isEditing, setIsEditing] = useState(false);
  const [user, setUser] = useState(null);
  const [editedUser, setEditedUser] = useState({});
  const [profileImageFile, setProfileImageFile] = useState(null);
  const [previewImageUrl, setPreviewImageUrl] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // Fetch user data
        const userData = await apiGetOneUser(userId);
        setUser(userData);
        setEditedUser(userData);
        setPreviewImageUrl(userData.profilePicture || userData.profile_picture || "");
        
        // Fetch locations data
        const locationsData = await apiGetLocations();
        setLocations(Array.isArray(locationsData) ? locationsData : locationsData.locations || []);
      } catch (err) {
        console.error("Failed to fetch data", err);
        setError("Failed to load data.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [userId]);

  // Helper function to get location name by ID
  const getLocationName = (locationId) => {
    const location = locations.find((loc) => loc._id === locationId);
    return location ? location.assetLocation : locationId;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImageFile(file);
      setPreviewImageUrl(URL.createObjectURL(file));
    }
  };

  const handleSave = async () => {
    try {
      const formData = new FormData();
      formData.append("userName", editedUser.userName);
      formData.append("email", editedUser.email);
      formData.append("phone", editedUser.phone);
      formData.append("role", editedUser.role);
      formData.append("storeLocation", editedUser.storeLocation);
      if (profileImageFile) {
        formData.append("profilePicture", profileImageFile);
      }

      const updated = await apiUpdateUser(userId, formData);
      setUser(updated);
      setIsEditing(false);
    } catch (err) {
      console.error("Failed to update user", err);
      alert("Failed to save changes.");
    }
  };

  const handleDiscard = () => {
    setEditedUser(user);
    setPreviewImageUrl(user.profilePicture || user.profile_picture || "");
    setProfileImageFile(null);
    setIsEditing(false);
  };

  if (loading) return <div className="text-center p-10">Loading...</div>;
  if (error) return <div className="text-center p-10 text-red-500">{error}</div>;

  return (
    <div className="min-h-screen bg-gray-100 p-4 flex items-center justify-center">
      <div className="bg-white w-full max-w-4xl rounded-lg relative overflow-hidden">
        {/* Top */}
        <div className="bg-gray-100 h-40">
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
          <div className="relative">
            <img
              src={
                previewImageUrl ||
                `https://ui-avatars.com/api/?name=${encodeURIComponent(
                  user?.userName || "User"
                )}&background=random`
              }
              alt="Profile"
              className="w-32 h-32 object-cover rounded-full border-4 border-white shadow-md"
            />
            {isEditing && (
              <label className="absolute bottom-0 right-0 bg-white rounded-full p-1 shadow cursor-pointer">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
                <Pencil size={16} className="text-gray-600" />
              </label>
            )}
          </div>

          {isEditing ? (
            <div className="w-full max-w-md mt-6 space-y-4">
              {["userName", "email", "phone"].map((field) => (
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

              {/* Location Dropdown */}
              <div>
                <label className="block text-sm font-medium text-gray-700">Location</label>
                <select
                  name="storeLocation"
                  value={editedUser.storeLocation || ""}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2 border bg-white"
                >
                  <option value="">Select location</option>
                  {locations.map((location) => (
                    <option key={location._id} value={location._id}>
                      {location.assetLocation}
                    </option>
                  ))}
                </select>
              </div>

              {/* Role Dropdown */}
              <div>
                <label className="block text-sm font-medium text-gray-700">Role</label>
                <select
                  name="role"
                  value={editedUser.role || ""}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2 border bg-white"
                >
                  <option value="">Select role</option>
                  <option value="user">user</option>
                  <option value="administrator">administrator</option>
                  <option value="asset manager">asset manager</option>
                </select>
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
              <h2 className="text-xl font-semibold">{user.userName}</h2>
              <p className="text-sm text-gray-500 mt-1">
                {user.email} | {user.phone}
              </p>

              <div className="mt-6 space-y-2 text-center">
                <p>
                  <span className="font-semibold">Role:</span> {user.role}
                </p>
                <p>
                  <span className="font-semibold">Location:</span> {getLocationName(user.storeLocation)}
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