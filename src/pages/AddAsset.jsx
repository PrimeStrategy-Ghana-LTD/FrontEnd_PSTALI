import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { apiAddAsset, apiGetLocations } from "../servicess/tali";
import { IoArrowBack } from "react-icons/io5";
import Swal from "sweetalert2";

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
        
        // SweetAlert for location fetch error
        Swal.fire({
          icon: 'error',
          title: 'Error Loading Locations',
          text: 'Failed to load locations. Please refresh the page and try again.',
          confirmButtonColor: '#051b34'
        });
      }
    };

    fetchLocations();
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Check file size (10MB limit)
      if (file.size > 10 * 1024 * 1024) {
        Swal.fire({
          icon: 'error',
          title: 'File Too Large',
          text: 'Please select an image smaller than 10MB.',
          confirmButtonColor: '#051b34'
        });
        e.target.value = ''; // Clear the input
        return;
      }

      // Check file type
      if (!file.type.startsWith('image/')) {
        Swal.fire({
          icon: 'error',
          title: 'Invalid File Type',
          text: 'Please select a valid image file (PNG, JPG, GIF).',
          confirmButtonColor: '#051b34'
        });
        e.target.value = ''; // Clear the input
        return;
      }

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

    // Show loading alert
    Swal.fire({
      title: 'Adding Asset',
      text: 'Please wait while we add your asset...',
      allowOutsideClick: false,
      allowEscapeKey: false,
      showConfirmButton: false,
      didOpen: () => {
        Swal.showLoading();
      }
    });

    try {
      const form = event.target;
      const formData = new FormData(form);
      await apiAddAsset(formData);
      
      // Success alert
      Swal.fire({
        icon: 'success',
        title: 'Asset Added Successfully!',
        text: 'The asset has been added to the system.',
        confirmButtonColor: '#051b34',
        timer: 2000,
        showConfirmButton: false
      }).then(() => {
        navigate("/dashboard/assets");
      });
      
    } catch (error) {
      console.error("Error adding asset:", error);
      const errorMessage = error.response?.data?.message || "Failed to add asset. Please try again.";
      setError(errorMessage);
      
      // Error alert
      Swal.fire({
        icon: 'error',
        title: 'Failed to Add Asset',
        text: errorMessage,
        confirmButtonColor: '#051b34'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    // Confirmation alert before canceling
    Swal.fire({
      title: 'Are you sure?',
      text: 'Any unsaved changes will be lost.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#051b34',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, leave',
      cancelButtonText: 'Stay'
    }).then((result) => {
      if (result.isConfirmed) {
        navigate("/dashboard/assets");
      }
    });
  };

  const handleSaveDraft = () => {
    // You can implement save draft functionality here
    Swal.fire({
      icon: 'info',
      title: 'Save Draft',
      text: 'Draft functionality will be implemented soon.',
      confirmButtonColor: '#051b34'
    });
  };

  const renderInputRow = ({ label, name, type = "text", placeholder }) => {
    if (name === "year") {
      const currentYear = new Date().getFullYear();
      const years = Array.from({ length: currentYear - 1990 + 1 }, (_, i) => currentYear - i);

      return (
        <div key={name} className="flex items-center mb-3 gap-4">
          <label className="w-40 text-sm font-medium text-gray-700">{label}</label>
          <select
            name={name}
            required
            className="w-[250px] px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
          >
            <option value="">Select year</option>
            {years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>
      );
    }

    return (
      <div key={name} className="flex items-center mb-3 gap-4">
        <label className="w-40 text-sm font-medium text-gray-700">{label}</label>
        <input
          name={name}
          type={type}
          required
          placeholder={placeholder}
          className={`w-[250px] px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm ${
            name === "mileage" ? "remove-spinner" : ""
          }`}
          inputMode={name === "mileage" ? "numeric" : undefined}
        />
      </div>
    );
  };

  return (
    <div className="bg-[#f0f1f3] min-h-full p-4 space-y-5">
      <div className="bg-white p-6 rounded-md shadow-sm w-full border border-white">
        <div className="mb-6">
          <div className="flex gap-2">
            <Link to="/dashboard/assets" className="mt-2.5">
              <IoArrowBack />
            </Link>
            <h2 className="text-2xl font-semibold text-gray-800">Add New Asset</h2>
          </div>
          <p className="text-gray-600 text-sm mt-1">
            Fill in the details to add a new asset to the system
          </p>
        </div>

        {/* Remove the error div since we're using SweetAlert now */}

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Section */}
            <div className="col-span-1">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Asset Image</label>
                <div className="relative flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-6 bg-gray-50 hover:bg-gray-100 min-h-[279px] w-[279px]">
                  <input
                    type="file"
                    name="assetImage"
                    accept="image/*"
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    onChange={handleImageChange}
                    required
                  />
                  <div className="text-center">
                    <svg
                      className="mx-auto h-12 w-12 text-gray-400 mb-3"
                      stroke="currentColor"
                      fill="none"
                      viewBox="0 0 48 48"
                    >
                      <path
                        d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <p className="text-sm text-blue-600 font-medium">Click to upload or drag and drop</p>
                    <p className="text-xs text-gray-500 mt-1">PNG, JPG, GIF up to 10MB</p>
                    {selectedImageName && (
                      <p className="text-xs text-gray-600 mt-2 font-medium">Selected: {selectedImageName}</p>
                    )}
                  </div>
                  {imagePreview && (
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="mt-4 w-32 h-32 object-cover rounded-lg shadow-sm border border-gray-200"
                    />
                  )}
                </div>
              </div>

              <div className="mt-10">
                <h3 className="text-lg font-medium text-gray-800 mb-4 border-b border-gray-200 pb-2">
                  Basic Information
                </h3>
                <div>
                  {[
                    { label: "Asset Name", name: "assetName", placeholder: "Enter asset name" },
                    { label: "Asset ID/VIN", name: "assetId", placeholder: "Enter asset ID or VIN" },
                    { label: "Category", name: "category", placeholder: "Enter category" },
                    { label: "Make", name: "make", placeholder: "Enter make" },
                    { label: "Model", name: "model", placeholder: "Enter model" },
                    { label: "Origin", name: "origin", placeholder: "Enter origin" },
                    { label: "Year", name: "year" },
                    { label: "Mileage", name: "mileage", type: "number", placeholder: "Enter mileage" },
                    { label: "Exterior Colour", name: "exteriorColour", placeholder: "Enter exterior colour" },
                  ].map(renderInputRow)}
                </div>
              </div>
            </div>

            {/* Right Section */}
            <div className="col-span-1">
              <div>
                <h3 className="text-lg font-medium text-gray-800 mb-4 border-b border-gray-200 pb-2">
                  Technical Details
                </h3>
                <div>
                  {[
                    { label: "Variant", name: "variant", placeholder: "Enter variant" },
                    { label: "Body Type", name: "bodyType", placeholder: "Enter body type" },
                    { label: "Fuel Type", name: "fuelType", placeholder: "Enter fuel type" },
                    { label: "Drivetrain", name: "drivetrain", placeholder: "Enter drivetrain" },
                    { label: "Door Count", name: "doorCount", placeholder: "Enter number of doors" },
                    { label: "Seating Capacity", name: "seatingCapacity", placeholder: "Enter seating capacity" },
                    { label: "Condition", name: "condition", placeholder: "Enter overall condition" },
                  ].map(renderInputRow)}

                  <div className="flex items-center gap-4 mb-3">
                    <label className="w-40 text-sm font-medium text-gray-700">Asset Location</label>
                    <select
                      name="assetLocation"
                      required
                      className="w-[250px] px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
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

              <div className="mt-8">
                <label className="block text-sm font-medium text-gray-700 mb-2">Justification</label>
                <textarea
                  name="justification"
                  rows="4"
                  required
                  placeholder="Enter justification for adding this asset..."
                  className="w-[428px] px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm resize-none"
                ></textarea>
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-4 mt-10 pt-6 border-t border-gray-200">
            <button
              type="button"
              className="px-6 py-2 text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 text-sm font-medium"
              onClick={handleSaveDraft}
              disabled={loading}
            >
              Save Draft
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-[#051b34] text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-sm font-medium w-[303px]"
              disabled={loading}
            >
              {loading ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-2 h-4 w-4 inline text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
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