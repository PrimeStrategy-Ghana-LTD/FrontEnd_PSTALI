import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { apiAddUser } from "../servicess/auth";
import { apiGetLocations } from "../servicess/tali";

const DEFAULT_ROLES = [
  { value: "administrator", name: "Administrator" },
  { value: "asset manager", name: "Asset Manager" },
  { value: "user", name: "User" },
];

const AddUser = () => {
  const [formData, setFormData] = useState({
    userName: "",
    password: "",
    storeLocation: "",
    role: "",
    email: "",
    phone: "",
  });

  const [profile_picture, setProfile_picture] = useState(null);
  const [loading, setLoading] = useState(false);
  const [locations, setLocations] = useState([]);
  const [loadingLocations, setLoadingLocations] = useState(true);
  const [roles] = useState(DEFAULT_ROLES);
  const navigate = useNavigate();

  useEffect(() => {
    getLocations();
  }, []);

  const getLocations = async () => {
    try {
      setLoadingLocations(true);
      const response = await apiGetLocations();
      setLocations(Array.isArray(response) ? response : response.locations || []);
    } catch (error) {
      console.error("Error fetching locations:", error);
      toast.error("Failed to load locations");
    } finally {
      setLoadingLocations(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formDataToSend = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        formDataToSend.append(key, value);
      });

      if (profile_picture) {
        formDataToSend.append("profile_picture", profile_picture);
      }

      await apiAddUser(formDataToSend);
      toast.success("User Added Successfully");
      navigate("/dashboard/users"); // Navigate back to users list
    } catch (error) {
      console.log("Error:", error);
      toast.error(error.response?.data?.message || "Adding user failed.");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    navigate("/dashboard/users");
  };

  return (
    <div className="flex-1 p-4 lg:p-6 bg-gray-50 min-h-screen">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <button
              onClick={handleCancel}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <div>
              <h1 className="text-xl font-semibold text-gray-900">New User</h1>
              <p className="text-sm text-gray-600 mt-1">Add a new user to the system</p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Left Column - Image Upload */}
              <div className="flex flex-col items-center justify-center">
                <div className="w-64 h-48 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer relative">
                  {profile_picture ? (
                    <div className="relative w-full h-full">
                      <img
                        src={URL.createObjectURL(profile_picture)}
                        alt="Profile"
                        className="w-full h-full object-cover rounded-lg"
                      />
                      <button
                        type="button"
                        onClick={() => setProfile_picture(null)}
                        className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm hover:bg-red-600 transition-colors"
                      >
                        ×
                      </button>
                    </div>
                  ) : (
                    <label className="flex flex-col items-center justify-center w-full h-full cursor-pointer">
                      <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mb-3">
                        <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                      </div>
                      <p className="text-sm text-gray-500 mb-1">Drag image here</p>
                      <p className="text-xs text-gray-400 mb-2">or</p>
                      <span className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                        Browse image
                      </span>
                      <input
                        type="file"
                        name="profile_picture"
                        accept="image/*"
                        onChange={(e) => setProfile_picture(e.target.files[0])}
                        className="hidden"
                      />
                    </label>
                  )}
                </div>
              </div>

              {/* Right Column - Form Fields */}
              <div className="space-y-6">
                {/* User Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    User Name
                  </label>
                  <input
                    type="text"
                    name="userName"
                    placeholder="Enter name"
                    value={formData.userName}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                    required
                  />
                </div>

                {/* Password */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    placeholder="Enter Password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                    required
                  />
                </div>

                {/* Location */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Location
                  </label>
                  <select
                    name="storeLocation"
                    value={formData.storeLocation}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all bg-white"
                    required
                    disabled={loadingLocations}
                  >
                    {loadingLocations ? (
                      <option>Loading locations...</option>
                    ) : (
                      <>
                        <option value="">Select Location</option>
                        {locations.map((location) => (
                          <option key={location._id} value={location._id}>
                            {location.assetLocation || location.name || location._id}
                          </option>
                        ))}
                      </>
                    )}
                  </select>
                </div>

                {/* User Role */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    User Role
                  </label>
                  <select
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all bg-white"
                    required
                  >
                    <option value="">Select user role</option>
                    {roles.map((role) => (
                      <option key={role.value} value={role.value}>
                        {role.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Contact Number */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Contact Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Enter user contact number"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                    required
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    placeholder="Enter user email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex justify-end items-center gap-4 mt-8 pt-6 border-t border-gray-200">
              <button
                type="button"
                onClick={handleCancel}
                className="px-6 py-2 text-gray-600 hover:text-gray-800 font-medium transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className={`px-8 py-3 rounded-lg font-medium text-white transition-all ${
                  loading 
                    ? "bg-gray-400 cursor-not-allowed" 
                    : "bg-slate-800 hover:bg-slate-900 shadow-lg hover:shadow-xl"
                }`}
              >
                {loading ? "Adding User..." : "Add User"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddUser;