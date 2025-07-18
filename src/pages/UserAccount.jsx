import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Pencil, ArrowLeft, Save, X, CheckCircle, AlertCircle } from "lucide-react";
import { apiGetOneUser, apiUpdateUser, apiGetLocations } from "../servicess/tali";

// Toast Component
const Toast = ({ message, type, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 4000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className={`fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg max-w-sm ${
      type === 'success' 
        ? 'bg-green-50 border border-green-200' 
        : 'bg-red-50 border border-red-200'
    }`}>
      <div className="flex items-center">
        {type === 'success' ? (
          <CheckCircle className="text-green-600 mr-2" size={20} />
        ) : (
          <AlertCircle className="text-red-600 mr-2" size={20} />
        )}
        <span className={`text-sm font-medium ${
          type === 'success' ? 'text-green-800' : 'text-red-800'
        }`}>
          {message}
        </span>
        <button
          onClick={onClose}
          className={`ml-2 ${
            type === 'success' ? 'text-green-600 hover:text-green-800' : 'text-red-600 hover:text-red-800'
          }`}
        >
          <X size={16} />
        </button>
      </div>
    </div>
  );
};

// Statistics Card Component
const StatCard = ({ title, value, linkText = "View List", onLinkClick }) => {
  return (
    <div className="bg-gray-50 p-4 rounded-lg">
      <div className="text-sm text-gray-600 mb-1">{title}</div>
      <div className="text-2xl font-bold text-gray-900 mb-2">{value}</div>
      <button 
        onClick={onLinkClick}
        className="text-green-600 text-sm hover:text-green-700 flex items-center"
      >
        {linkText}
        <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  );
};

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
  const [toast, setToast] = useState(null);
  
  // Mock statistics data - replace with actual API calls
  const [stats, setStats] = useState({
    totalAssetsAdded: 173,
    totalAssetsAssigned: 173,
    totalUsers: 173,
    totalAssetsAtLocation: 173
  });

  // Show toast notification
  const showToast = (message, type) => {
    setToast({ message, type });
  };

  // Close toast
  const closeToast = () => {
    setToast(null);
  };

  // Fetch user data
  const fetchUserData = async () => {
    try {
      const userData = await apiGetOneUser(userId);
      setUser(userData);
      setEditedUser(userData);
      setPreviewImageUrl(userData.profilePicture || userData.profile_picture || "");
    } catch (err) {
      console.error("Failed to fetch user data", err);
      showToast("Failed to load user data", "error");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // Fetch user data
        await fetchUserData();
        
        // Fetch locations data
        const locationsData = await apiGetLocations();
        setLocations(Array.isArray(locationsData) ? locationsData : locationsData.locations || []);
      } catch (err) {
        console.error("Failed to fetch data", err);
        setError("Failed to load data.");
        showToast("Failed to load data", "error");
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

  // Function to determine which stats to show based on role
  const getStatsForRole = (userRole) => {
    const role = userRole?.toLowerCase();
    
    switch (role) {
      case 'admin':
      case 'administrator':
        return [
          { title: "Total Assets Added", value: stats.totalAssetsAdded, key: "assetsAdded" },
          { title: "Total Assets Assigned", value: stats.totalAssetsAssigned, key: "assetsAssigned1" },
          { title: "Total Assets Assigned", value: stats.totalAssetsAssigned, key: "assetsAssigned2" },
          { title: "Total Users", value: stats.totalUsers, key: "users" }
        ];
      
      case 'asset manager':
        return [
          { title: "Total Assets Added", value: stats.totalAssetsAdded, key: "assetsAdded" },
          { title: "Total Assets Assigned", value: stats.totalAssetsAssigned, key: "assetsAssigned" },
          { title: "Total Assets At Location", value: stats.totalAssetsAtLocation, key: "assetsAtLocation" }
        ];
      
      case 'user':
      default:
        return [
          { title: "Total Assets At Location", value: stats.totalAssetsAtLocation, key: "assetsAtLocation" },
          { title: "Total Assets Assigned", value: stats.totalAssetsAssigned, key: "assetsAssigned" }
        ];
    }
  };

  // Handle stat card clicks
  const handleStatCardClick = (statKey) => {
    switch (statKey) {
      case 'assetsAdded':
      case 'assetsAssigned':
      case 'assetsAssigned1':
      case 'assetsAssigned2':
      case 'assetsAtLocation':
        navigate('/dashboard/assets');
        break;
      case 'users':
        navigate('/dashboard/users');
        break;
      default:
        console.log(`Clicked on ${statKey}`);
    }
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
      // Validate required fields on frontend
      if (!editedUser.userName || !editedUser.email || !editedUser.phone) {
        showToast("Please fill in all required fields (Name, Email, Phone)", "error");
        return;
      }

      const formData = new FormData();
      
      // Always include all fields, even if empty
      formData.append("userName", editedUser.userName || "");
      formData.append("email", editedUser.email || "");
      formData.append("phone", editedUser.phone || "");
      formData.append("role", editedUser.role || "user");
      formData.append("storeLocation", editedUser.storeLocation || "");
      
      if (profileImageFile) {
        formData.append("profilePicture", profileImageFile);
      }

      const updated = await apiUpdateUser(userId, formData);
      
      // Re-fetch user data to ensure we have the latest data
      await fetchUserData();
      
      setIsEditing(false);
      setProfileImageFile(null);
      showToast("User updated successfully!", "success");
      
    } catch (err) {
      console.error("Failed to update user", err);
      
      // Better error handling
      if (err.response?.data?.details) {
        const errorMessages = err.response.data.details.map(detail => detail.message).join(", ");
        showToast(`Validation error: ${errorMessages}`, "error");
      } else {
        showToast("Failed to save changes. Please try again.", "error");
      }
    }
  };

  const handleDiscard = () => {
    setEditedUser(user);
    setPreviewImageUrl(user.profilePicture || user.profile_picture || "");
    setProfileImageFile(null);
    setIsEditing(false);
    showToast("Changes discarded", "success");
  };

  if (loading) return <div className="text-center p-10">Loading...</div>;
  if (error) return <div className="text-center p-10 text-red-500">{error}</div>;

  const userStats = getStatsForRole(user?.role);

  return (
    <div className="min-h-screen bg-gray-100 p-4 flex items-center justify-center">
      {/* Toast Notification */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={closeToast}
        />
      )}

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
                  <option value="user">User</option>
                  <option value="administrator">Administrator</option>
                  <option value="asset manager">Asset manager</option>
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
            <div className="w-full">
              {/* User Info */}
              <div className="text-center mt-4 mb-6">
                <h2 className="text-xl font-semibold">
                  {user?.userName || "User"} | {user?.role || "No role"}
                </h2>
                <div className="flex items-center justify-center space-x-4 text-sm text-gray-500 mt-2">
                  <div className="flex items-center">
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    {user?.email || "No email"}
                  </div>
                  <div className="flex items-center">
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    {user?.phone || "No phone"}
                  </div>
                  <div className="flex items-center">
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    {user?.storeLocation ? getLocationName(user.storeLocation) : "No location"}
                  </div>
                </div>
                
                {/* Edit Profile Button */}
                <button 
                  onClick={() => setIsEditing(true)}
                  className="mt-4 px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 text-sm"
                >
                  Edit profile
                </button>
              </div>

              {/* Role-based Statistics */}
              <div className={`grid gap-4 max-w-4xl mx-auto ${
                userStats.length === 4 ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4' :
                userStats.length === 3 ? 'grid-cols-1 sm:grid-cols-3' :
                'grid-cols-1 sm:grid-cols-2'
              }`}>
                {userStats.map((stat) => (
                  <StatCard
                    key={stat.key}
                    title={stat.title}
                    value={stat.value}
                    onLinkClick={() => handleStatCardClick(stat.key)}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserAccount;