import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiAddAsset, apiGetLocations } from '../servicess/tali';

const AddAssetModal = ({ isOpen, onClose }) => {
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [imagePreview, setImagePreview] = useState(null);
  const [selectedImageName, setSelectedImageName] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        setError('');
        const data = await apiGetLocations();
        setLocations(data.locations || []);
      } catch (error) {
        console.error("Failed to fetch locations", error);
        setError('Failed to load locations');
      }
    };

    if (isOpen) {
      fetchLocations();
      setImagePreview(null); // Reset image preview when modal opens
      setSelectedImageName('');
    }
  }, [isOpen]);

  if (!isOpen) return null;

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

      // Debugging output
      for (let [key, value] of formData.entries()) {
        console.log(`${key}:`, value);
      }

      const response = await apiAddAsset(formData);
      console.log("Asset added successfully:", response);

      onClose();
      navigate('/assets');
    } catch (error) {
      console.error("Error adding asset:", error);
      setError(error.response?.data?.message || 'Failed to add asset. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
  <div className="fixed inset-0 bg-black/25 z-50 overflow-y-auto">
  <div className="flex items-center justify-center min-h-screen py-10 pointer-events-none">
    <div className="bg-white p-6 rounded-lg shadow-lg w-[450px] relative z-10 pointer-events-auto">
        <h2 className="text-lg font-semibold mb-4 text-gray-800">New Asset</h2>

        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Image Upload Section */}
          <div className="flex flex-col items-center">
            <div className="relative border-2 border-dashed border-gray-300 rounded-lg p-4 flex flex-col items-center justify-center w-32 h-20 bg-gray-50">
              <input
                type="file"
                name="assetImage"
                id="imageUpload"
                accept="image/*"
                className="absolute w-full h-full opacity-0 cursor-pointer"
                onChange={handleImageChange}
                required
              />
              <div className="text-xs text-gray-400 text-center pointer-events-none">
                Drag image here<br />or
              </div>
            </div>
            <label htmlFor="imageUpload" className="text-sm text-blue-600 cursor-pointer hover:underline mt-2">
              Browse image
            </label>
            {selectedImageName && (
              <p className="text-xs text-gray-600 mt-1">Selected: {selectedImageName}</p>
            )}
            {imagePreview && (
              <img
                src={imagePreview}
                alt="Preview"
                className="mt-2 w-20 h-20 object-cover rounded shadow"
              />
            )}
          </div>

          {/* Form Fields */}
          <div className="space-y-4">
            <div className="flex items-center">
              <label className="text-sm font-medium text-gray-700 w-32 flex-shrink-0">Asset Name</label>
              <input
                name="assetName"
                type="text"
                required
                className="flex-1 ml-4 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter asset name"
              />
            </div>

            <div className="flex items-center">
              <label className="text-sm font-medium text-gray-700 w-32 flex-shrink-0">Asset ID</label>
              <input
                name="assetId"
                type="text"
                required
                className="flex-1 ml-4 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter asset ID"
              />
            </div>

            <div className="flex items-center">
              <label className="text-sm font-medium text-gray-700 w-32 flex-shrink-0">Category</label>
              <input
                name="category"
                type="text"
                required
                className="flex-1 ml-4 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter category"
              />
            </div>

            <div className="flex items-center">
              <label className="text-sm font-medium text-gray-700 w-32 flex-shrink-0">Unit</label>
              <input
                name="unit"
                type="text"
                required
                className="flex-1 ml-4 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter unit"
              />
            </div>

            <div className="flex items-center">
              <label className="text-sm font-medium text-gray-700 w-32 flex-shrink-0">Asset Location</label>
              <select
                name="assetLocation"
                required
                className="flex-1 ml-4 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
              >
                <option value="">Select location</option>
                {locations.length > 0 ? (
                  locations.map((loc) => (
                    <option key={loc._id} value={loc._id}>
                      {loc.assetLocation}
                    </option>
                  ))
                ) : (
                  <option disabled>No locations available</option>
                )}
              </select>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-3 mt-6">
            <button
              type="button"
              className="px-6 py-2 text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
              onClick={onClose}
              disabled={loading}
            >
              Discard
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
              disabled={loading}
            >
              {loading ? 'Adding...' : 'Add Asset'}
            </button>
          </div>
        </form>
        </div>
      </div>
    </div>
  );
};

export default AddAssetModal;


