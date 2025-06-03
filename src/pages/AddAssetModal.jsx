import React, { useEffect, useState } from 'react';
import { apiAddAsset } from '../servicess/tali';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AddAssetModal = ({ isOpen, onClose }) => {
  const [locations, setLocations] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const response = await axios.get('https://backend-ps-tali.onrender.com/locations');
        console.log("Fetched locations:", response.data);
        console.log("Type of response:", typeof response.data);
        setLocations(response.data); // adjust based on your backend response
      } catch (error) {
        console.error("Failed to fetch locations", error);
      }
    };

    if (isOpen) {
      fetchLocations();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      const formData = new FormData(event.target);
      const response = await apiAddAsset(formData);
      console.log(response.data);
      navigate("/assets");
    } catch (error) {
      console.log("error", error);
    }
  };
  console.log("Locations to map:", locations);

  return (
    <div className="fixed inset-0 bg-black/25 z-50 flex items-center justify-center pointer-events-none">
      <div className="bg-white p-6 rounded-md shadow-lg w-[450px] relative z-10 pointer-events-auto">
        <h2 className="text-xl font-semibold mb-4">New Asset</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-row gap-4 items-start">
            <div className="relative border-2 border-dashed border-gray-300 rounded-md p-4 flex items-center justify-center w-32 h-24">
              <input
                type="file"
                name="image"
                id="imageUpload"
                className="opacity-0 absolute w-full h-full cursor-pointer"
              />
              <span className="text-xs text-gray-500 pointer-events-none">Upload</span>
            </div>
            <label htmlFor="imageUpload" className="text-[16px] text-blue-600 cursor-pointer hover:underline flex flex-row items-center justify-center">
              Browse image
            </label>
          </div>

          <div className='flex flex-row gap-10 items-center'>
            <label className="block text-sm font-medium text-gray-700">Asset Name</label>
            <input name="assetName" type="text" className="mt-1 block border w-64 border-gray-300 rounded-md py-1 ml-5 pl-2" placeholder='Enter product name' />
          </div>
          <div className='flex flex-row gap-10 items-center'>
            <label className="block text-sm font-medium text-gray-700">Asset ID</label>
            <input name="assetId" type="text" className="mt-1 block border w-64 border-gray-300 rounded-md py-1 ml-11 pl-2" placeholder='Enter product ID' />
          </div>
          <div className='flex flex-row gap-10 items-center'>
            <label className="block text-sm font-medium text-gray-700">Category</label>
            <input name="category" type="text" className="mt-1 block border w-64 border-gray-300 rounded-md py-1 ml-9 pl-2" placeholder='Select product category' />
          </div>
          <div className='flex flex-row gap-10 items-center'>
            <label className="block text-sm font-medium text-gray-700">Unit</label>
            <input name='unit' type="text" className="mt-1 block border w-64 border-gray-300 rounded-md py-1 ml-[17%] pl-2" placeholder='Enter product unit' />
          </div>
          <div className='flex flex-row gap-10 items-center'>
            <label className="block text-sm font-medium text-gray-700">Asset Location</label>
            <select
              name="assetLocation"
              required
              className="mt-1 block border w-64 border-gray-300 rounded-md py-1 ml-1 pl-2"
            >
              <option value="">Select location</option>
              {Array.isArray(locations) && locations.length > 0 ? (
                locations.map((loc) => {
                  console.log("Location item:", loc); // Log each location object
                  return (
                    <option key={loc._id} value={loc.assetLocation}>
                      {loc.assetLocation}
                    </option>
                  );
                })
              ) : (
                <option disabled>No locations found</option>
              )}

            </select>
          </div>

          <div className="flex justify-end gap-5 mt-4 mr-3">
            <button
              type="button"
              className="bg-gray-200 px-4 py-1 rounded hover:bg-gray-300"
              onClick={onClose}
            >
              Cancel
            </button>
            <button type="submit" className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddAssetModal;
