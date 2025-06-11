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

const AddUser = ({ isOpen, onClose }) => {
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
    if (isOpen) {
      getLocations();
    }
  }, [isOpen]);

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
      onClose?.(); // Close modal on success
      navigate(0);  // Refresh page
    } catch (error) {
      console.log("Error:", error);
      toast.error(error.response?.data?.message || "Adding user failed.");
    } finally {
      setLoading(false);
    }
  };

  const resetAndClose = () => {
    setFormData({
      userName: "",
      password: "",
      storeLocation: "",
      role: "",
      email: "",
      phone: "",
    });
    setProfile_picture(null);
    onClose?.();
  };

  // Don't render modal if isOpen is false
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl w-full max-w-md p-6 shadow-xl max-h-[90vh] overflow-y-auto">
        <h2 className="text-xl font-semibold mb-4">New User</h2>

        <div className="flex flex-row items-center justify-center mb-4">
          <div className="w-20 h-20 border-2 border-dashed border-gray-300 rounded-full flex items-center justify-center text-gray-500 text-4xl">
            {profile_picture ? (
              <img
                src={URL.createObjectURL(profile_picture)}
                alt="Profile"
                className="w-full h-full object-cover rounded-full"
              />
            ) : (
              <span>👤</span>
            )}
          </div>
          <div className="text-sm mt-2 ml-3">
            Drag image here <br />
            <p className="text-center">or</p>
            <label className="text-blue-500 cursor-pointer">
              Browse image
              <input
                type="file"
                name="profile_picture"
                accept="image/*"
                onChange={(e) => setProfile_picture(e.target.files[0])}
                className="hidden"
              />
            </label>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3">
          {[
            { name: "userName", type: "text", placeholder: "Enter supplier name", label: "User Name" },
            { name: "password", type: "text", placeholder: "Enter password", label: "Password" },
            { name: "email", type: "email", placeholder: "Enter user email", label: "Email" },
            { name: "phone", type: "text", placeholder: "Enter phone number", label: "Contact Number" },
          ].map(({ name, type, placeholder, label }) => (
            <div key={name} className="flex items-center mb-3">
              <label className="w-60 block text-md font-medium text-gray-700">{label}</label>
              <input
                type={type}
                name={name}
                placeholder={placeholder}
                value={formData[name]}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-2"
                required
              />
            </div>
          ))}

          {/* Store Location */}
          <div className="flex items-center mb-3">
            <label className="w-60 block text-md font-medium text-gray-700">Store Location</label>
            <select
              name="storeLocation"
              value={formData.storeLocation}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-500"
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

          {/* Role */}
          <div className="flex items-center mb-3">
            <label className="w-60 block text-md font-medium text-gray-700">User Role</label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-500"
              required
            >
              <option value="">Choose user role</option>
              {roles.map((role) => (
                <option key={role.value} value={role.value}>
                  {role.name}
                </option>
              ))}
            </select>
          </div>

          {/* Buttons */}
          <div className="flex justify-end space-x-2 mt-6">
            <button
              type="button"
              className="px-4 py-1 rounded-sm border border-gray-400"
              onClick={resetAndClose}
            >
              Discard
            </button>
            <button
              type="submit"
              disabled={loading}
              className={`px-4 text-white text-md rounded-sm shadow-md transition duration-300 ease-in-out ${
                loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-600"
              }`}
            >
              {loading ? "Loading..." : "Add User"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddUser;
