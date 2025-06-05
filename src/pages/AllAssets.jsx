// import React, { useEffect, useState } from 'react';
// import { IoFilterOutline } from "react-icons/io5";
// import Searchbar from '../components/Searchbar';
// import Sidebar1 from '../components/Sidebar1';
// import AddAssetModal from './AddAssetModal';
// import { apiGetAllAssets } from '../servicess/tali';
// import AssetAssignmentModal from './AssetAssignmentModal';
// import { Link } from 'react-router-dom';
// import axios from 'axios';
// import jsPDF from 'jspdf';
// import 'jspdf-autotable';



// const AllAssets = () => {
//   const [showFilters, setShowFilters] = useState(false);
//   const [availabilityFilter, setAvailabilityFilter] = useState("");
//   const [locationFilter, setLocationFilter] = useState("");
//   const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);
//   const [selectedAsset, setSelectedAsset] = useState(null);
//   const [isAddModalOpen, setIsAddModalOpen] = useState(false);
//   const [assets, setAssets] = useState([]);
//   const uniqueLocations = [...new Set(assets.map(asset => asset.assetLocation))];
//   const getAssets = async () => {
//     const response = await apiGetAllAssets();
//     console.log(response.data)
//     setAssets(response.data.assets);
//   }

//   const [summary, setSummary] = useState({
//     totalAssets: 0,
//     assetsAssigned: 0,
//     categories: 0,
//   });

//   useEffect(() => {
//     const fetchCounts = async () => {
//       try {
//         const token = localStorage.getItem("token");

//         const [assetsRes, assignmentsRes] = await Promise.all([axios.get('https://backend-ps-tali.onrender.com/assets/count', {
//           headers: { Authorization: `Bearer ${token}` }
//         }),
//         axios.get('https://backend-ps-tali.onrender.com/assignments/count', {
//           headers: { Authorization: `Bearer ${'token'}` }
//         })
//         ]);

//         setSummary({
//           totalAssets: assetsRes.data.count,      // adjust based on actual response shape
//           assetsAssigned: assignmentsRes.data.count, // adjust based on actual response shape
//           categories: 0 // or keep hardcoded for now
//         });

//         console.log("Assets Response:", assetsRes.data);
//       } catch (error) {
//         console.error("Error fetching counts", error)
//       }
//     };

//     fetchCounts();
//   }, []);

//   useEffect(() => {
//     getAssets();
//   }, []);
//   // Apply filters to data
//   const filteredAssets = assets.filter(item => {
//     return (
//       (availabilityFilter === "" || item.status === availabilityFilter) &&
//       (locationFilter === "" || item.assetLocation === locationFilter)
//     );
//   });

//   const handleDownloadPDF = () => {
//   const doc = new jsPDF();

//   doc.text("All Assets", 14, 10);

//   const tableColumn = ["Asset Name", "Quantity", "Location", "Availability"];
//   const tableRows = [];

//   filteredAssets.forEach(asset => {
//     const assetData = [
//       asset.assetName,
//       asset.unit,
//       asset.assetLocation,
//       asset.status
//     ];
//     tableRows.push(assetData);
//   });

//   doc.autoTable({
//     head: [tableColumn],
//     body: tableRows,
//     startY: 20,
//   });

//   doc.save("assets.pdf");
// };


//   return (
//     <div className='flex'>
//       <Sidebar1 />
//       <div className='w-[80vw]'>
//         <Searchbar />
//         <div className='bg-[#f0f1f3] min-h-[90%] space-y-5 py-6 px-4'>
//           {/* Top Summary Box */}
//           <div className='bg-white p-4 rounded-md shadow-sm w-[78vw] border border-white'>
//             <p className='font-semibold mb-4'>Assets</p>
//             <div className='flex gap-32'>
//               {[
//                 { title: 'Categories', count: 14, color: '#1570ef' },
//                 { title: 'Total Assets', count: summary.totalAssets, color: '#e19133' },
//                 { title: 'Asset Assigned', count: summary.assetsAssigned, color: '#845ebc' }
//               ].map((item, index) => (
//                 <div key={index} className='flex flex-col items-center'>
//                   <p className='mb-1 font-semibold' style={{ color: item.color }}>{item.title}</p>
//                   <p className='text-[13px] mb-1 font-semibold'>{item.count}</p>
//                   <p className='text-gray-600 text-[13px]'>Last 7 Days</p>
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* Asset List Box */}
//           <div className='bg-white p-4 rounded-md shadow-sm w-[78vw] border border-white'>
//             {/* Header Row with Buttons */}
//             <div className='flex justify-between items-center mb-4'>
//               <p className='font-semibold'>Assets</p>
//               <div className='flex gap-3 text-[13px]'>
//                 <button className='px-2 py-1 rounded-sm bg-[#1366d9] text-white border border-[#1366d9]' onClick={() => setIsAddModalOpen(true)}>Add Asset</button>
//                 <div
//                   className='flex items-center gap-2 px-3 py-1 rounded-sm border border-gray-300 text-gray-600 cursor-pointer'
//                   onClick={() => setShowFilters(!showFilters)}
//                 >
//                   <IoFilterOutline />
//                   <span>Filters</span>
//                 </div>
//                 <button onClick={handleDownloadPDF} className='px-2 py-1 rounded-sm border border-gray-300 text-gray-600'>Download All</button>
//               </div>
//             </div>

//             {/* Filter Section */}
//             {showFilters && (
//               <div className='mb-4 flex gap-4'>
//                 <div>
//                   <label className='text-sm text-gray-700 font-semibold'>Availability:</label>
//                   <select
//                     className='ml-2 p-1 border rounded text-[13px]  border-gray-300 text-black '
//                     value={availabilityFilter}
//                     onChange={(e) => setAvailabilityFilter(e.target.value)}
//                   >
//                     <option value="">All</option>
//                     <option value="Available">Available</option>
//                     <option value="Unavailable">Unavailable</option>
//                   </select>

//                 </div>
//                 <div>
//                   <label className='text-sm text-gray-700 font-semibold'>Location:</label>
//                   <select
//                     className='ml-2 p-1 border rounded text-[13px]  border-gray-300 text-black '
//                     value={locationFilter}
//                     onChange={(e) => setLocationFilter(e.target.value)}
//                   >
//                     <option value="">All</option>
//                     {
//                       uniqueLocations.map((loc, index) => (
//                         <option key={index} value={loc}>{loc}</option>
//                       ))}
    
//                   </select>
//                 </div>
//               </div>
//             )}

//             {/* Table Header */}
//             <div className='flex justify-between font-semibold text-[14px] text-gray-700 pb-2 border-b-2 border-gray-200 mt-10'>
//               <p className='w-[15%]'>Products</p>
//               <p className='w-[10%]'>Quantity</p>
//               <p className='w-[15%]'>Location</p>
//               <p className='w-[15%]'>Availability</p>
//               <p className='w-[8%] mr-12'>Assignments</p>
//             </div>

//             {/* Table Rows */}
//             {filteredAssets.map((item, index) => (
//               <div key={index} className='flex justify-between text-[13px] text-gray-600 py-3 border-b border-gray-200'>
//                 <Link to={`/view-asset/${item._id}`} className='w-[15%]'>{item.assetName}</Link>
//                 <p className='w-[10%]'>{item.unit}</p>
//                 <p className='w-[15%]'>{item.assetLocation}</p>
//                 <p
//                   className={`w-[15%] font-semibold ${item.status === "Available" ? "text-green-600" : "text-red-600"
//                     }`}
//                 >
//                   {item.status}
//                 </p>
//                 <p
//                   onClick={() => {
//                     setSelectedAsset(item); // capture the asset if needed
//                     setIsAssignModalOpen(true);
//                   }}
//                   className='w-[8%] border-2 py-1 flex flex-row items-center justify-center mr-12 rounded-md bg-[#1ce586] border-[#1ce586] text-white cursor-pointer'
//                 >
//                   Assign to
//                 </p>

//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//       <AddAssetModal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} />
//       <AssetAssignmentModal isOpen={isAssignModalOpen}
//         onClose={() => setIsAssignModalOpen(false)}
//         asset={selectedAsset} />
//     </div>
//   );
// };

// export default AllAssets;



import React, { useEffect, useState } from 'react';
import { IoFilterOutline } from "react-icons/io5";
import Searchbar from '../components/Searchbar';
import Sidebar1 from '../components/Sidebar1';
import AddAssetModal from './AddAssetModal';
import { apiGetAllAssets, apiGetLocations } from '../servicess/tali';
import AssetAssignmentModal from './AssetAssignmentModal';
import { Link } from 'react-router-dom';
import axios from 'axios';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const AllAssets = () => {
  const [showFilters, setShowFilters] = useState(false);
  const [availabilityFilter, setAvailabilityFilter] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);
  const [selectedAsset, setSelectedAsset] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [assets, setAssets] = useState([]);
  const [locations, setLocations] = useState([]);

  // Helper function to get location name by ID
  const getLocationName = (locationId) => {
    const location = locations.find(loc => loc._id === locationId);
    return location ? location.assetLocation : locationId; // fallback to ID if name not found
  };

  const getAssets = async () => {
    const response = await apiGetAllAssets();
    console.log(response.data)
    setAssets(response.data.assets);
  }

  const getLocations = async () => {
    try {
      const response = await apiGetLocations();
      console.log('Locations:', response);
      // Assuming response is directly an array or has a locations property
      setLocations(Array.isArray(response) ? response : response.locations || []);
    } catch (error) {
      console.error('Error fetching locations:', error);
    }
  }

  // Get unique location names for filter dropdown
  const uniqueLocationNames = [...new Set(assets.map(asset => getLocationName(asset.assetLocation)))];

  const [summary, setSummary] = useState({
    totalAssets: 0,
    assetsAssigned: 0,
    categories: 0,
  });

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const token = localStorage.getItem("token");

        const [assetsRes, assignmentsRes] = await Promise.all([axios.get('https://backend-ps-tali.onrender.com/assets/count', {
          headers: { Authorization: `Bearer ${token}` }
        }),
        axios.get('https://backend-ps-tali.onrender.com/assignments/count', {
          headers: { Authorization: `Bearer ${token}` } // Fixed: was hardcoded 'token'
        })
        ]);

        setSummary({
          totalAssets: assetsRes.data.count,
          assetsAssigned: assignmentsRes.data.count,
          categories: 0
        });

        console.log("Assets Response:", assetsRes.data);
      } catch (error) {
        console.error("Error fetching counts", error)
      }
    };

    fetchCounts();
  }, []);

  useEffect(() => {
    getAssets();
    getLocations(); // Fetch locations on component mount
  }, []);

  // Apply filters to data
  const filteredAssets = assets.filter(item => {
    const locationName = getLocationName(item.assetLocation);
    return (
      (availabilityFilter === "" || item.status === availabilityFilter) &&
      (locationFilter === "" || locationName === locationFilter)
    );
  });

  const handleDownloadPDF = () => {
    const doc = new jsPDF();

    doc.text("All Assets", 14, 10);

    const tableColumn = ["Asset Name", "Quantity", "Location", "Availability"];
    const tableRows = [];

    filteredAssets.forEach(asset => {
      const assetData = [
        asset.assetName,
        asset.unit,
        getLocationName(asset.assetLocation), // Use location name instead of ID
        asset.status
      ];
      tableRows.push(assetData);
    });

    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
      startY: 20,
    });

    doc.save("assets.pdf");
  };

  return (
    <div className='flex'>
      <Sidebar1 />
      <div className='w-[80vw]'>
        <Searchbar />
        <div className='bg-[#f0f1f3] min-h-[90%] space-y-5 py-6 px-4'>
          {/* Top Summary Box */}
          <div className='bg-white p-4 rounded-md shadow-sm w-[78vw] border border-white'>
            <p className='font-semibold mb-4'>Assets</p>
            <div className='flex gap-32'>
              {[
                { title: 'Categories', count: 14, color: '#1570ef' },
                { title: 'Total Assets', count: summary.totalAssets, color: '#e19133' },
                { title: 'Asset Assigned', count: summary.assetsAssigned, color: '#845ebc' }
              ].map((item, index) => (
                <div key={index} className='flex flex-col items-center'>
                  <p className='mb-1 font-semibold' style={{ color: item.color }}>{item.title}</p>
                  <p className='text-[13px] mb-1 font-semibold'>{item.count}</p>
                  <p className='text-gray-600 text-[13px]'>Last 7 Days</p>
                </div>
              ))}
            </div>
          </div>

          {/* Asset List Box */}
          <div className='bg-white p-4 rounded-md shadow-sm w-[78vw] border border-white'>
            {/* Header Row with Buttons */}
            <div className='flex justify-between items-center mb-4'>
              <p className='font-semibold'>Assets</p>
              <div className='flex gap-3 text-[13px]'>
                <button className='px-2 py-1 rounded-sm bg-[#1366d9] text-white border border-[#1366d9]' onClick={() => setIsAddModalOpen(true)}>Add Asset</button>
                <div
                  className='flex items-center gap-2 px-3 py-1 rounded-sm border border-gray-300 text-gray-600 cursor-pointer'
                  onClick={() => setShowFilters(!showFilters)}
                >
                  <IoFilterOutline />
                  <span>Filters</span>
                </div>
                <button onClick={handleDownloadPDF} className='px-2 py-1 rounded-sm border border-gray-300 text-gray-600'>Download All</button>
              </div>
            </div>

            {/* Filter Section */}
            {showFilters && (
              <div className='mb-4 flex gap-4'>
                <div>
                  <label className='text-sm text-gray-700 font-semibold'>Availability:</label>
                  <select
                    className='ml-2 p-1 border rounded text-[13px] border-gray-300 text-black'
                    value={availabilityFilter}
                    onChange={(e) => setAvailabilityFilter(e.target.value)}
                  >
                    <option value="">All</option>
                    <option value="Available">Available</option>
                    <option value="Unavailable">Unavailable</option>
                  </select>
                </div>
                <div>
                  <label className='text-sm text-gray-700 font-semibold'>Location:</label>
                  <select
                    className='ml-2 p-1 border rounded text-[13px] border-gray-300 text-black'
                    value={locationFilter}
                    onChange={(e) => setLocationFilter(e.target.value)}
                  >
                    <option value="">All</option>
                    {uniqueLocationNames.map((locationName, index) => (
                      <option key={index} value={locationName}>{locationName}</option>
                    ))}
                  </select>
                </div>
              </div>
            )}

            {/* Table Header */}
            <div className='flex justify-between font-semibold text-[14px] text-gray-700 pb-2 border-b-2 border-gray-200 mt-10'>
              <p className='w-[15%]'>Products</p>
              <p className='w-[10%]'>Quantity</p>
              <p className='w-[15%]'>Location</p>
              <p className='w-[15%]'>Availability</p>
              <p className='w-[8%] mr-12'>Assignments</p>
            </div>

            {/* Table Rows */}
            {filteredAssets.map((item, index) => (
              <div key={index} className='flex justify-between text-[13px] text-gray-600 py-3 border-b border-gray-200'>
                <Link to={`/view-asset/${item._id}`} className='w-[15%]'>{item.assetName}</Link>
                <p className='w-[10%]'>{item.unit}</p>
                <p className='w-[15%]'>{getLocationName(item.assetLocation)}</p>
                <p
                  className={`w-[15%] font-semibold ${item.status === "Available" ? "text-green-600" : "text-red-600"
                    }`}
                >
                  {item.status}
                </p>
                <p
                  onClick={() => {
                    setSelectedAsset(item);
                    setIsAssignModalOpen(true);
                  }}
                  className='w-[8%] border-2 py-1 flex flex-row items-center justify-center mr-12 rounded-md bg-[#1ce586] border-[#1ce586] text-white cursor-pointer'
                >
                  Assign to
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <AddAssetModal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} />
      <AssetAssignmentModal isOpen={isAssignModalOpen}
        onClose={() => setIsAssignModalOpen(false)}
        asset={selectedAsset} />
    </div>
  );
};

export default AllAssets;