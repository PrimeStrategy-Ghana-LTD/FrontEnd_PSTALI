// import React, { useEffect, useState } from 'react';

// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import { apiAddAsset, apiGetLocations } from '../servicess/tali';


// const AddAssetModal = ({ isOpen, onClose }) => {
//   const [locations, setLocations] = useState([]);

//   const navigate = useNavigate();

//  useEffect(() => {
//   const fetchLocations = async () => {
//     try {
//       const data = await apiGetLocations(); // get raw response.data from service
//       console.log("Fetched locations:", data);
//       setLocations(data.locations || []); // Adjust if the locations are nested
//     } catch (error) {
//       console.error("Failed to fetch locations", error);
//     }
//   };

//   if (isOpen) {
//     fetchLocations();
//   }
// }, [isOpen]);


//   if (!isOpen) return null;

//   const handleSubmit = async (event) => {
//     try {
//       event.preventDefault();
//       const formData = new FormData(event.target);
//       const response = await apiAddAsset(formData);
//       console.log(response.data);
//       navigate("/assets");
//     } catch (error) {
//       console.log("error", error);
//     }
//   };
//   console.log("Locations to map:", locations);

//   return (
//     <div className="fixed inset-0 bg-black/25 z-50 flex items-center justify-center pointer-events-none">
//       <div className="bg-white p-6 rounded-md shadow-lg w-[450px] relative z-10 pointer-events-auto">
//         <h2 className="text-xl font-semibold mb-4">New Asset</h2>
//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div className="flex flex-row gap-4 items-start">
//             <div className="relative border-2 border-dashed border-gray-300 rounded-md p-4 flex items-center justify-center w-32 h-24">
//               <input
//                 type="file"
//                 name="image"
//                 id="imageUpload"
//                 className="opacity-0 absolute w-full h-full cursor-pointer"
//               />
//               <span className="text-xs text-gray-500 pointer-events-none">Upload</span>
//             </div>
//             <label htmlFor="imageUpload" className="text-[16px] text-blue-600 cursor-pointer hover:underline flex flex-row items-center justify-center">
//               Browse image
//             </label>
//           </div>

//           <div className='flex flex-row gap-10 items-center'>
//             <label className="block text-sm font-medium text-gray-700">Asset Name</label>
//             <input name="assetName" type="text" className="mt-1 block border w-64 border-gray-300 rounded-md py-1 ml-5 pl-2" placeholder='Enter product name' />
//           </div>
//           <div className='flex flex-row gap-10 items-center'>
//             <label className="block text-sm font-medium text-gray-700">Asset ID</label>
//             <input name="assetId" type="text" className="mt-1 block border w-64 border-gray-300 rounded-md py-1 ml-11 pl-2" placeholder='Enter product ID' />
//           </div>
//           <div className='flex flex-row gap-10 items-center'>
//             <label className="block text-sm font-medium text-gray-700">Category</label>
//             <input name="category" type="text" className="mt-1 block border w-64 border-gray-300 rounded-md py-1 ml-9 pl-2" placeholder='Select product category' />
//           </div>
//           <div className='flex flex-row gap-10 items-center'>
//             <label className="block text-sm font-medium text-gray-700">Unit</label>
//             <input name='unit' type="text" className="mt-1 block border w-64 border-gray-300 rounded-md py-1 ml-[17%] pl-2" placeholder='Enter product unit' />
//           </div>
          
//           <div className='flex flex-row gap-10 items-center'>
//             <label className="block text-sm font-medium text-gray-700">Asset Location</label>
//             <select
//   name="assetLocation"
//   required
//   className="mt-1 block border w-64 border-gray-300 rounded-md py-1 ml-1 pl-2"
// >
//   <option value="">Select location</option>
//   {Array.isArray(locations) && locations.length > 0 ? (
//     locations.map((loc) => (
//       <option key={loc._id} value={loc.assetLocation}>
//         {loc.assetLocation}
//       </option>
//     ))
//   ) : (
//     <option disabled>No locations found</option>
//   )}
// </select>

//           </div>

//           <div className="flex justify-end gap-5 mt-4 mr-3">
//             <button
//               type="button"
//               className="bg-gray-200 px-4 py-1 rounded hover:bg-gray-300"
//               onClick={onClose}
//             >
//               Cancel
//             </button>
//             <button type="submit" className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700">
//               Save
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default AddAssetModal;


// // import React, { useState } from 'react';

// // const AddAssetModal = ({ isOpen = true, onClose = () => {} }) => {
// //   const [locations] = useState([
// //     { _id: '1', assetLocation: 'Warehouse A' },
// //     { _id: '2', assetLocation: 'Store B' },
// //     { _id: '3', assetLocation: 'Office C' }
// //   ]);

// //   if (!isOpen) return null;

// //   const handleSubmit = (event) => {
// //     event.preventDefault();
// //     console.log('Form submitted');
// //     // Your form submission logic here
// //   };

// //   return (
// //     <div className="fixed inset-0 bg-black/25 z-50 flex items-center justify-center pointer-events-none">
// //       <div className="bg-white p-6 rounded-lg shadow-lg w-[400px] relative z-10 pointer-events-auto">
// //         <h2 className="text-lg font-medium mb-6 text-gray-800">New Asset</h2>
        
// //         <div className="space-y-5">
// //           {/* Image Upload Section */}
// //           <div className="flex flex-col items-center">
// //             <div className="relative border-2 border-dashed border-gray-300 rounded-lg p-8 flex flex-col items-center justify-center w-32 h-20 bg-gray-50">
// //               <input
// //                 type="file"
// //                 name="image"
// //                 id="imageUpload"
// //                 className="opacity-0 absolute w-full h-full cursor-pointer"
// //               />
// //               <div className="text-xs text-gray-400 text-center pointer-events-none">
// //                 Drag image here<br />or
// //               </div>
// //             </div>
// //             <label htmlFor="imageUpload" className="text-sm text-blue-600 cursor-pointer hover:underline mt-2">
// //               Browse image
// //             </label>
// //           </div>

// //           {/* Form Fields */}
// //           <div className="space-y-4">
// //             <div className="flex items-center">
// //               <label className="text-sm font-medium text-gray-700 w-24 flex-shrink-0">Assets Name</label>
// //               <input 
// //                 name="assetName" 
// //                 type="text" 
// //                 className="flex-1 ml-4 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
// //                 placeholder="Enter product name" 
// //               />
// //             </div>

// //             <div className="flex items-center">
// //               <label className="text-sm font-medium text-gray-700 w-24 flex-shrink-0">Assets ID</label>
// //               <input 
// //                 name="assetId" 
// //                 type="text" 
// //                 className="flex-1 ml-4 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
// //                 placeholder="Enter product ID" 
// //               />
// //             </div>

// //             <div className="flex items-center">
// //               <label className="text-sm font-medium text-gray-700 w-24 flex-shrink-0">Category</label>
// //               <input 
// //                 name="category" 
// //                 type="text" 
// //                 className="flex-1 ml-4 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
// //                 placeholder="Select product category" 
// //               />
// //             </div>

// //             <div className="flex items-center">
// //               <label className="text-sm font-medium text-gray-700 w-24 flex-shrink-0">Unit</label>
// //               <input 
// //                 name="unit" 
// //                 type="text" 
// //                 className="flex-1 ml-4 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
// //                 placeholder="Enter product unit" 
// //               />
// //             </div>

// //             <div className="flex items-center">
// //               <label className="text-sm font-medium text-gray-700 w-24 flex-shrink-0">Assets Location</label>
// //               <select
// //                 name="assetLocation"
// //                 required
// //                 className="flex-1 ml-4 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-500"
// //               >
// //                 <option value="">Enter store</option>
// //                 {locations.map((loc) => (
// //                   <option key={loc._id} value={loc.assetLocation} className="text-gray-900">
// //                     {loc.assetLocation}
// //                   </option>
// //                 ))}
// //               </select>
// //             </div>
// //           </div>

// //           {/* Action Buttons */}
// //           <div className="flex justify-end gap-3 mt-6 pt-4">
// //             <button
// //               type="button"
// //               className="px-6 py-2 text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500"
// //               onClick={onClose}
// //             >
// //               Discard
// //             </button>
// //             <button 
// //               type="button"
// //               onClick={handleSubmit}
// //               className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
// //             >
// //               Add Asset
// //             </button>
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default AddAssetModal;


// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { apiAddAsset, apiGetLocations } from '../servicess/tali';

// const AddAssetModal = ({ isOpen = true, onClose = () => {} }) => {
//   const [locations, setLocations] = useState([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchLocations = async () => {
//       try {
//         const data = await apiGetLocations();
//         setLocations(data.locations || []);
//       } catch (error) {
//         console.error("Failed to fetch locations", error);
//       }
//     };

//     if (isOpen) fetchLocations();
//   }, [isOpen]);

//   if (!isOpen) return null;

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     try {
//       const formData = new FormData(event.target);
//       const response = await apiAddAsset(formData);
//       console.log("Asset added:", response.data);
//       navigate('/assets');
//     } catch (error) {
//       console.error("Error adding asset:", error);
//     }
//   };

//   return (
//     <div className="fixed inset-0 bg-black/25 z-50 flex items-center justify-center pointer-events-none">
//       <div className="bg-white p-6 rounded-md shadow-lg w-[450px] relative z-10 pointer-events-auto">
//         <h2 className="text-lg font-semibold mb-4 text-gray-800">New Asset</h2>

//         <form onSubmit={handleSubmit} className="space-y-5">
//           {/* Image Upload Section */}
//           <div className="flex flex-col items-center">
//             <div className="relative border-2 border-dashed border-gray-300 rounded-lg p-8 flex flex-col items-center justify-center w-32 h-20 bg-gray-50">
//               <input
//                 type="file"
//                 name="assetImage"
//                 id="imageUpload"
//                 className="opacity-0 absolute w-full h-full cursor-pointer"
//                 required
//               />
//               <div className="text-xs text-gray-400 text-center pointer-events-none">
//                 Drag image here<br />or
//               </div>
//             </div>
//             <label htmlFor="imageUpload" className="text-sm text-blue-600 cursor-pointer hover:underline mt-2">
//               Browse image
//             </label>
//           </div>

//           {/* Form Fields */}
//           <div className="space-y-4">
//             <div className="flex items-center">
//               <label className="text-sm font-medium text-gray-700 w-32">Asset Name</label>
//               <input
//                 name="assetName"
//                 type="text"
//                 required
//                 className="flex-1 px-3 py-2 border border-gray-300 rounded-md"
//                 placeholder="Enter asset name"
//               />
//             </div>

//             <div className="flex items-center">
//               <label className="text-sm font-medium text-gray-700 w-32">Asset ID</label>
//               <input
//                 name="assetId"
//                 type="text"
//                 required
//                 className="flex-1 px-3 py-2 border border-gray-300 rounded-md"
//                 placeholder="Enter asset ID"
//               />
//             </div>

//             <div className="flex items-center">
//               <label className="text-sm font-medium text-gray-700 w-32">Category</label>
//               <input
//                 name="category"
//                 type="text"
//                 required
//                 className="flex-1 px-3 py-2 border border-gray-300 rounded-md"
//                 placeholder="Enter category"
//               />
//             </div>

//             <div className="flex items-center">
//               <label className="text-sm font-medium text-gray-700 w-32">Unit</label>
//               <input
//                 name="unit"
//                 type="text"
//                 required
//                 className="flex-1 px-3 py-2 border border-gray-300 rounded-md"
//                 placeholder="Enter unit"
//               />
//             </div>

//             <div className="flex items-center">
//               <label className="text-sm font-medium text-gray-700 w-32">Location</label>
//               <select
//                 name="assetLocation"
//                 required
//                 className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-gray-500"
//               >
//                 <option value="">Select location</option>
//                 {locations.length > 0 ? (
//                   locations.map((loc) => (
//                     <option key={loc._id} value={loc.assetLocation}>
//                       {loc.assetLocation}
//                     </option>
//                   ))
//                 ) : (
//                   <option disabled>No locations found</option>
//                 )}
//               </select>
//             </div>
//           </div>

//           {/* Action Buttons */}
//           <div className="flex justify-end gap-3 mt-4">
//             <button
//               type="button"
//               className="px-5 py-1.5 text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
//               onClick={onClose}
//             >
//               Discard
//             </button>
//             <button
//               type="submit"
//               className="px-6 py-1.5 bg-blue-600 text-white rounded-md hover:bg-blue-700"
//             >
//               Add Asset
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default AddAssetModal;


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
                    <option key={loc._id} value={loc.assetLocation}>
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


