import React, { useEffect, useState } from 'react';
import Sidebar1 from '../components/Sidebar1';
import Searchbar from '../components/Searchbar';
import { apiGetLocations } from '../servicess/tali';

const AssignedPage = () => {
  const [assignments, setAssignments] = useState([]);
  const [filteredAssignments, setFilteredAssignments] = useState([]);
  const [locations, setLocations] = useState([]);
  const [filterVisible, setFilterVisible] = useState(false);
  const [filterLocation, setFilterLocation] = useState('');
  const [filterAsset, setFilterAsset] = useState('');

  useEffect(() => {
    const fetchAssignments = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('https://backend-ps-tali.onrender.com/assets/location-assignments', {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`HTTP ${response.status}: ${errorText}`);
        }

        const data = await response.json();
        const cleanData = data.data || [];

        setAssignments(data.assets);
        setFilteredAssignments(data.assets);
      } catch (error) {
        console.error('Error fetching assignments:', error);
      }
    };

    const fetchLocations = async () => {
      try {
        const response = await apiGetLocations();
        const locs = Array.isArray(response) ? response : response.locations || [];
        setLocations(locs);
      } catch (error) {
        console.error('Error fetching locations:', error);
      }
    };

    fetchAssignments();
    fetchLocations();
  }, []);

  const handleFilter = () => {
  const filtered = assignments.filter((item) => {
    const locationMatch = filterLocation
      ? item.assetLocation?.assetLocation === filterLocation
      : true;
    const assetMatch = filterAsset
      ? item.assetName?.toLowerCase().includes(filterAsset.toLowerCase())
      : true;
    return locationMatch && assetMatch;
  });
  setFilteredAssignments(data.assets);
};


  const handleReset = () => {
    setFilterLocation('');
    setFilterAsset('');
    setFilteredAssignments(data.assets);
  };

  return (
    <div className="flex w-full overflow-x-hidden">
      <div className="bg-[#f0f1f3] min-h-screen flex-1 space-y-5 py-6 px-4">
        {/* Summary Cards */}
        <div className="bg-white p-4 rounded-md shadow-sm w-full border border-white">
          <p className="font-semibold mb-4">Assets</p>
          <div className="flex flex-wrap gap-6 justify-between">
            <div>
              <p className="mb-1 font-semibold text-[#1570ef]">Total Entries</p>
              <p className="text-[13px] mb-1 font-semibold">67</p>
              <p className="text-gray-600 text-[13px]">Last 7 Days</p>
            </div>
            <div>
              <p className="mb-1 font-semibold text-[#e19133]">Total Assigns Today</p>
              <div className="flex gap-4">
                <div>
                  <p className="text-[13px] mb-1 font-semibold">90</p>
                  <p className="text-gray-600 text-[13px]">Last 7 Days</p>
                </div>
                <div>
                  <p className="text-[13px] mb-1 font-semibold">3</p>
                  <p className="text-gray-600 text-[13px]">Total</p>
                </div>
              </div>
            </div>
            <div>
              <p className="mb-1 font-semibold text-[#845ebc]">Total Asset Assigned</p>
              <div className="flex gap-4">
                <div>
                  <p className="text-[13px] mb-1 font-semibold">9</p>
                  <p className="text-gray-600 text-[13px]">Last 7 Days</p>
                </div>
                <div>
                  <p className="text-[13px] mb-1 font-semibold">28</p>
                  <p className="text-gray-600 text-[13px]">Total</p>
                </div>
              </div>
            </div>
            <div>
              <p className="mb-1 font-semibold text-[#f36960]">Pending Assets</p>
              <div className="flex gap-4">
                <div>
                  <p className="text-[13px] mb-1 font-semibold">8</p>
                  <p className="text-gray-600 text-[13px]">Last 7 Days</p>
                </div>
                <div>
                  <p className="text-[13px] mb-1 font-semibold">70</p>
                  <p className="text-gray-600 text-[13px]">Total</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Assigned Assets Table */}
        <div className="bg-white p-4 rounded-md shadow-sm w-full border border-white">
          <div className="flex justify-between items-center mb-4">
            <p className="font-semibold">Assets Assigned</p>
            <div className="flex gap-3 text-[13px]">
              <button
                className="flex items-center gap-2 px-3 py-1 rounded-sm border border-gray-300 text-gray-600 cursor-pointer"
                onClick={() => setFilterVisible(!filterVisible)}
              >
                Filter
              </button>
              <button className="px-2 py-1 rounded-sm border border-gray-300 text-gray-600">
                Download All
              </button>
            </div>
          </div>

          {/* Filter Section */}
          {filterVisible && (
            <div className="bg-gray-50 rounded-md p-4 mb-4 flex flex-wrap gap-4">
              <select
                className="border p-2 rounded-sm text-sm w-[200px]"
                value={filterLocation}
                onChange={(e) => setFilterLocation(e.target.value)}
              >
                <option value="">All Locations</option>
                {locations.map((loc) => (
                  <option key={loc._id} value={loc.assetLocation}>
                    {loc.assetLocation}
                  </option>
                ))}
              </select>
              <input
                type="text"
                placeholder="Filter by Asset"
                className="border p-2 rounded-sm text-sm w-[200px]"
                value={filterAsset}
                onChange={(e) => setFilterAsset(e.target.value)}
              />
              <button
                onClick={handleFilter}
                className="bg-blue-600 text-white px-3 py-1 rounded-sm text-sm"
              >
                Apply
              </button>
              <button
                onClick={handleReset}
                className="border border-gray-300 text-gray-600 px-3 py-1 rounded-sm text-sm"
              >
                Reset
              </button>
            </div>
          )}

          {/* Table Head */}
          <div className="flex justify-between font-semibold text-[14px] text-gray-700 pb-2 border-b-2 border-gray-200 mt-6">
            <p className="w-1/3">Asset</p>
            <p className="w-1/3">Location</p>
            <p className="w-1/3">Asset ID</p>
          </div>

          {/* Table Rows */}
          {filteredAssignments.length > 0 ? (
  filteredAssignments.map((item, index) => (
    <div
      key={index}
      className="flex justify-between text-[13px] text-gray-600 py-3 border-b border-gray-200"
    >
      <p className="w-1/3">{item.assetName || '—'}</p>
      <p className="w-1/3">{item.assetLocation?.assetLocation || '—'}</p>
      <p className="w-1/3">{item.assetId || '—'}</p>
    </div>
  ))
) : (
  <div className="text-center text-sm text-gray-400 py-4">
    No assignments found.
  </div>
)}

        </div>
      </div>
    </div>
  );
};

export default AssignedPage;
