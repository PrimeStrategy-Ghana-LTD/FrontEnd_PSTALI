import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { apiGetLocations, apiAssignAsset, apiGetUsers } from "../servicess/tali";


const AssetAssignmentModal = ({ isOpen, onClose, asset }) => {
  const [users, setUsers] = useState([]);
  const [locations, setLocations] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [selectedImageName, setSelectedImageName] = useState('');
  
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setError('');
        const [userData, locationData] = await Promise.all([
          apiGetUsers(),
          apiGetLocations(),
        ]);
        
        console.log("Fetched users:", userData);
        console.log("Fetched locations (raw):", locationData);
        
        setUsers(userData.users || []);
        setLocations(locationData || []);
      } catch (err) {
        console.error("Failed to fetch data:", err);
        setError("Failed to load user or location data.");
      }
    };

    if (isOpen) {
      fetchData();
      setSelectedUser(null);
      setImagePreview(null);
      setSelectedImageName('');
    }
  }, [isOpen]);

  const handleUserChange = (e) => {
    const userId = e.target.value;
    const foundUser = users.find((u) => u._id === userId);
    setSelectedUser(foundUser || null);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImageName(file.name);
      setImagePreview(URL.createObjectURL(file));
    } else {
      setSelectedImageName('');
      setImagePreview(null);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError('');

    try {
      const form = event.target;
      const formData = new FormData(form);
      
      // Add asset ID to form data if available
      if (asset && asset._id) {
        formData.append('assetId', asset._id);
      }
      
      // Add selected user ID
      if (selectedUser && selectedUser._id) {
        formData.append('userId', selectedUser._id);
      }

      // Debugging output
      for (let [key, value] of formData.entries()) {
        console.log(`${key}:`, value);
      }

      const response = await apiAssignAsset(formData);
      console.log("Asset assigned successfully:", response);

      onClose();
      // Navigate to assignments page or refresh current page
      navigate('/assignments'); // Adjust route as needed
    } catch (error) {
      console.error("Error assigning asset:", error);
      setError(error.response?.data?.message || 'Failed to assign asset. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/25 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen p-6">
        <div className="bg-white p-8 rounded-md shadow-lg w-[400px] relative">
          <h2 className="text-xl font-semibold mb-6">Asset Assignment</h2>

          {error && (
            <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Image Upload UI */}
            <div className="flex flex-col items-center">
              <label
                htmlFor="imageUpload"
                className="cursor-pointer flex flex-col items-center"
              >
                <div className="w-24 h-24 rounded-full border-2 border-dashed border-gray-300 flex items-center justify-center bg-gray-50">
                  {imagePreview ? (
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="w-full h-full rounded-full object-cover"
                    />
                  ) : (
                    <span className="text-gray-400 text-3xl">👤</span>
                  )}
                </div>
                <p className="text-sm mt-2 text-gray-500">
                  Drag image here
                  <br />
                  <span className="text-blue-600 hover:underline">
                    or Browse image
                  </span>
                </p>
                <input
                  type="file"
                  name="assignmentImage"
                  id="imageUpload"
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageChange}
                />
              </label>
              {selectedImageName && (
                <p className="text-xs text-gray-600 mt-1">Selected: {selectedImageName}</p>
              )}
            </div>

            {/* Name Dropdown */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <select
                name="userName"
                onChange={handleUserChange}
                className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">Select Name</option>
                {users.length > 0 ? (
                  users.map((user) => (
                    <option key={user.id} value={user.id}>
                      {user.userName}
                    </option>
                  ))
                ) : (
                  <option disabled>No users available</option>
                )}
              </select>
            </div>

            {/* Email (auto-filled) */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={selectedUser?.email || ""}
                readOnly
                className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md bg-gray-100 text-gray-700"
              />
            </div>

            {/* Contact (auto-filled if available) */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Contact
              </label>
              <input
                type="text"
                name="phone"
                value={selectedUser?.phone || ""}
                readOnly
                className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md bg-gray-100 text-gray-700"
              />
            </div>

            {/* Location Dropdown */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Location/Department
              </label>
              <select
                name="storeLocation"
                required
                className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select Location</option>
                {locations.length > 0 ? (
                  locations.map((loc) => (
                    <option key={loc._id} value={loc._id}>
                      {loc.storeLocation}
                    </option>
                  ))
                ) : (
                  <option disabled>No locations available</option>
                )}
              </select>
            </div>

            {/* Duration */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Duration
              </label>
              <input
                type="text"
                name="duration"
                placeholder="Set Duration (e.g., 30 days, 6 months)"
                className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            {/* Asset Info (if available) */}
            {asset && (
              <div className="bg-gray-50 p-3 rounded-md">
                <p className="text-sm text-gray-600">
                  <strong>Asset:</strong> {asset.assetName || 'N/A'} ({asset.assetId || 'N/A'})
                </p>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex justify-end gap-3 mt-6">
              <button
                type="button"
                onClick={onClose}
                disabled={loading}
                className="px-4 py-2 text-gray-700 border border-gray-300 rounded-md bg-white hover:bg-gray-50 disabled:opacity-50"
              >
                Discard
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
              >
                {loading ? 'Assigning...' : 'Assign'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AssetAssignmentModal;