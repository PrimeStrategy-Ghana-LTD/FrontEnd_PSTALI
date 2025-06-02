import React, { useEffect, useState } from 'react';
import { IoFilterOutline } from "react-icons/io5";
import Searchbar from '../components/Searchbar';
import Sidebar1 from '../components/Sidebar1';
import AddAssetModal from './AddAssetModal';
import { apiGetAllAssets } from '../servicess/tali';
import AssetAssignmentModal from './AssetAssignmentModal';


const AllAssets = () => {
  const [showFilters, setShowFilters] = useState(false);
  const [availabilityFilter, setAvailabilityFilter] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);
  const [selectedAsset, setSelectedAsset] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [assets, setAssets] = useState([]);
  const getAssets = async () => {
    const response = await apiGetAllAssets();
    console.log(response.data)
    setAssets(response.data.assets);
  }

  useEffect(() => {
    getAssets();
  }, []);
  // Apply filters to data
  const filteredAssets = assets.filter(item => {
    return (
      (availabilityFilter === "" || item.availability === availabilityFilter) &&
      (locationFilter === "" || item.location === locationFilter)
    );
  });

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
                { title: 'Total Assets', count: 200, color: '#e19133' },
                { title: 'Asset Assigned', count: 7, color: '#845ebc' }
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
                <button className='px-2 py-1 rounded-sm border border-gray-300 text-gray-600'>Download All</button>
              </div>
            </div>

            {/* Filter Section */}
            {showFilters && (
              <div className='mb-4 flex gap-4'>
                <div>
                  <label className='text-sm text-gray-700 font-semibold'>Availability:</label>
                  <select
                    className='ml-2 p-1 border rounded text-[13px]  border-gray-300 '
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
                    className='ml-2 p-1 border rounded text-[13px]  border-gray-300 '
                    value={locationFilter}
                    onChange={(e) => setLocationFilter(e.target.value)}
                  >
                    <option value="">All</option>
                    <option value="Head Office">Head Office</option>
                    <option value="Warehouse">Warehouse</option>
                    <option value="Lab A">Lab A</option>
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
                <p className='w-[15%]'>{item.product}</p>
                <p className='w-[10%]'>{item.quantity}</p>
                <p className='w-[15%]'>{item.location}</p>
                <p
                  className={`w-[15%] font-semibold ${item.availability === "Available" ? "text-green-600" : "text-red-600"
                    }`}
                >
                  {item.availability}
                </p>
                <p
                  onClick={() => {
                    setSelectedAsset(item); // capture the asset if needed
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
        {/* <AssetAssignmentModal isOpen={isAssignModalOpen} 
  onClose={() => setIsAssignModalOpen(false)} 
  asset={selectedAsset}/> */}
    </div>
  );
};

export default AllAssets;
