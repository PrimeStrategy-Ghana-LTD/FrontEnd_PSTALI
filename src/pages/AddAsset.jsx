import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiAddAsset, apiGetLocations } from "../servicess/tali";

const AddAsset = () => {
  const navigate = useNavigate();
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const [selectedImageName, setSelectedImageName] = useState("");

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const data = await apiGetLocations();
        setLocations(data.locations || []);
      } catch (error) {
        console.error("Failed to fetch locations", error);
        setError("Failed to load locations");
      }
    };

    fetchLocations();
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImageName(file.name);
      setImagePreview(URL.createObjectURL(file));
    } else {
      setSelectedImageName("");
      setImagePreview(null);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError("");

    try {
      const form = event.target;
      const formData = new FormData(form);

      await apiAddAsset(formData);
      // Navigate back to assets page after successful addition
      navigate("/dashboard/assets");
    } catch (error) {
      console.error("Error adding asset:", error);
      setError(error.response?.data?.message || "Failed to add asset.");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    navigate("/dashboard/assets");
  };

  return (
    <div className="bg-[#f0f1f3] min-h-full space-y-5">
      <div className="bg-white p-6 rounded-md shadow-sm w-full border border-white">
        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-800">Add New Asset</h2>
          <p className="text-gray-600 text-sm mt-1">Fill in the details to add a new asset to the system</p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-md">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Image Section */}
            <div className="col-span-1">
              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Asset Image *
                </label>
                <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-6 bg-gray-50 hover:bg-gray-100 transition-colors min-h-[200px]">
                  <input
                    type="file"
                    name="assetImage"
                    id="imageUpload"
                    accept="image/*"
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    onChange={handleImageChange}
                    required
                  />
                  <div className="text-center">
                    <svg className="mx-auto h-12 w-12 text-gray-400 mb-3" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                      <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <p className="text-sm text-blue-600 font-medium">
                      Click to upload or drag and drop
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      PNG, JPG, GIF up to 10MB
                    </p>
                  </div>
                  
                  {selectedImageName && (
                    <p className="text-xs text-gray-600 mt-2 font-medium">
                      Selected: {selectedImageName}
                    </p>
                  )}
                  
                  {imagePreview && (
                    <div className="mt-4">
                      <img 
                        src={imagePreview} 
                        alt="Preview" 
                        className="w-32 h-32 object-cover rounded-lg shadow-sm border border-gray-200" 
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Left Column - Basic Information */}
            <div className="col-span-1 space-y-6">
              <div>
                <h3 className="text-lg font-medium text-gray-800 mb-4 border-b border-gray-200 pb-2">
                  Basic Information
                </h3>
                <div className="space-y-4">
                  {[
                    { label: "Asset Name", name: "assetName", placeholder: "Enter asset name" },
                    { label: "Asset ID/VIN", name: "assetId", placeholder: "Enter asset ID or VIN" },
                    { label: "Make", name: "make", placeholder: "Enter make" },
                    { label: "Model", name: "model", placeholder: "Enter model" },
                    { label: "Year", name: "year", type: "number", placeholder: "Enter year" },
                    { label: "Mileage", name: "mileage", type: "number", placeholder: "Enter mileage" },
                    { label: "Exterior Colour", name: "exteriorColour", placeholder: "Enter exterior colour" },
                  ].map(({ label, name, type = "text", placeholder }) => (
                    <div key={name}>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        {label} *
                      </label>
                      <input
                        name={name}
                        type={type}
                        required
                        placeholder={placeholder}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column - Technical Details */}
            <div className="col-span-1 space-y-6">
              <div>
                <h3 className="text-lg font-medium text-gray-800 mb-4 border-b border-gray-200 pb-2">
                  Technical Details
                </h3>
                <div className="space-y-4">
                  {[
                    { label: "Variant", name: "variant", placeholder: "Enter variant" },
                    { label: "Body Type", name: "bodyType", placeholder: "Enter body type" },
                    { label: "Fuel Type", name: "fuelType", placeholder: "Enter fuel type" },
                    { label: "Drivetrain", name: "drivetrain", placeholder: "Enter drivetrain" },
                    { label: "Door Count", name: "doorCount", placeholder: "Enter number of doors" },
                    { label: "Seating Capacity", name: "seatingCapacity", placeholder: "Enter seating capacity" },
                    { label: "Condition", name: "condition", placeholder: "Enter overall condition" },
                  ].map(({ label, name, placeholder }) => (
                    <div key={name}>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        {label} *
                      </label>
                      <input
                        name={name}
                        type="text"
                        required
                        placeholder={placeholder}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                      />
                    </div>
                  ))}

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Asset Location *
                    </label>
                    <select
                      name="assetLocation"
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                    >
                      <option value="">Select location</option>
                      {locations.map((loc) => (
                        <option key={loc._id} value={loc._id}>
                          {loc.assetLocation}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Justification - Full Width */}
          <div className="mt-8">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Justification *
            </label>
            <textarea
              name="justification"
              rows="4"
              required
              placeholder="Enter justification for adding this asset..."
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm resize-none"
            ></textarea>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-4 mt-8 pt-6 border-t border-gray-200">
            <button
              type="button"
              className="px-6 py-2 text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 text-sm font-medium transition-colors"
              onClick={handleCancel}
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed text-sm font-medium transition-colors"
              disabled={loading}
            >
              {loading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white inline" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Adding Asset...
                </>
              ) : (
                "Add Asset"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddAsset;