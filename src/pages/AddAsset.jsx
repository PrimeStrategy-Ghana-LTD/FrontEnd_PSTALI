import React, { useEffect, useState } from "react";
import { apiAddAsset, apiGetLocations } from "../servicess/tali";
// import { apiAddAsset, apiGetLocations } from "../services/tali";

const AddAssetModal = ({ isOpen, onClose, onAssetAdded }) => {
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
      onAssetAdded();
    } catch (error) {
      console.error("Error adding asset:", error);
      setError(error.response?.data?.message || "Failed to add asset.");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-500 opacity-75" onClick={onClose}></div>
        </div>

        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full">
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <h2 className="text-2xl font-semibold mb-6">Add New Asset</h2>
            {error && (
              <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Image Section */}
                <div className="col-span-1">
                  <div className="flex flex-col items-center border-2 border-dashed border-gray-300 rounded-lg p-4 bg-gray-50 h-full">
                    <input
                      type="file"
                      name="assetImage"
                      id="imageUpload"
                      accept="image/*"
                      className="absolute w-full h-full opacity-0 cursor-pointer"
                      onChange={handleImageChange}
                      required
                    />
                    <label htmlFor="imageUpload" className="text-sm text-blue-600 cursor-pointer hover:underline mb-2">
                      Drag image here or Browse image
                    </label>
                    {selectedImageName && <p className="text-xs text-gray-600 mt-1">{selectedImageName}</p>}
                    {imagePreview && (
                      <img src={imagePreview} alt="Preview" className="mt-2 w-24 h-24 object-cover rounded shadow" />
                    )}
                  </div>
                </div>

                {/* Left Column */}
                <div className="col-span-1 space-y-4">
                  {[
                    { label: "Asset Name", name: "assetName" },
                    { label: "Asset ID/VIN", name: "assetId" },
                    { label: "Make", name: "make" },
                    { label: "Model", name: "model" },
                    { label: "Year", name: "year", type: "number" },
                    { label: "Mileage", name: "mileage", type: "number" },
                    { label: "Exterior Colour", name: "exteriorColour" },
                  ].map(({ label, name, type = "text" }) => (
                    <div key={name}>
                      <label className="block text-sm font-medium text-gray-700">{label}</label>
                      <input
                        name={name}
                        type={type}
                        required
                        placeholder={`Enter ${label.toLowerCase()}`}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                      />
                    </div>
                  ))}
                </div>

                {/* Right Column */}
                <div className="col-span-1 space-y-4">
                  {[
                    { label: "Variant", name: "variant" },
                    { label: "Body Type", name: "bodyType" },
                    { label: "Fuel Type", name: "fuelType" },
                    { label: "Drivetrain", name: "drivetrain" },
                    { label: "Unit", name: "unit" },
                    { label: "Exterior Condition", name: "exteriorCondition" },
                    { label: "Condition", name: "condition" },
                  ].map(({ label, name }) => (
                    <div key={name}>
                      <label className="block text-sm font-medium text-gray-700">{label}</label>
                      <input
                        name={name}
                        type="text"
                        required
                        placeholder={`Enter ${label.toLowerCase()}`}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                      />
                    </div>
                  ))}

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Asset Location</label>
                    <select
                      name="assetLocation"
                      required
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm text-gray-700"
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

              {/* Justification */}
              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700">Justification</label>
                <textarea
                  name="justification"
                  rows="3"
                  required
                  placeholder="Enter justification"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                ></textarea>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end gap-3 mt-8">
                <button
                  type="button"
                  className="px-6 py-2 text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 text-sm"
                  onClick={onClose}
                  disabled={loading}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 text-sm"
                  disabled={loading}
                >
                  {loading ? "Adding..." : "Add Asset"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddAssetModal;