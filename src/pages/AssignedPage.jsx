import React, { useEffect, useState } from 'react';
import Sidebar1 from '../components/Sidebar1';
import Searchbar from '../components/Searchbar';

const AssignedPage = () => {
  const [assignments, setAssignments] = useState([]);

  useEffect(() => {
    const fetchAssignments = async () => {
      try {
        const response = await fetch('https://backend-ps-tali.onrender.com/assignments');
        const data = await response.json();
        setAssignments(data.data); // Only use the "data" array
      } catch (error) {
        console.error('Error fetching assignments:', error);
      }
    };

    fetchAssignments();
  }, []);

  return (
    <div className='flex'>
      <Sidebar1 />
      <div>
        <Searchbar />
        <div className='bg-[#f0f1f3] min-h-[90%] space-y-5 py-6 px-4'>

          {/* Summary Card */}
          <div className='bg-white p-4 rounded-md shadow-sm w-[78vw] border border-white'>
            <p className='font-semibold mb-4'>Assets</p>
            <div className="flex flex-wrap gap-6 justify-between">
              {/* Block 1 */}
              <div>
                <p className="mb-1 font-semibold text-[#1570ef]">Total Entries</p>
                <p className="text-[13px] mb-1 font-semibold">67</p>
                <p className="text-gray-600 text-[13px]">Last 7 Day</p>
              </div>

              {/* Block 2 */}
              <div>
                <p className="mb-1 font-semibold text-[#e19133]">Total Assigns Today</p>
                <div className="flex flex-row gap-4">
                  <div>
                    <p className="text-[13px] mb-1 font-semibold">90</p>
                    <p className="text-gray-600 text-[13px]">Last 7 Day</p>
                  </div>
                  <div>
                    <p className="text-[13px] mb-1 font-semibold">3</p>
                    <p className="text-gray-600 text-[13px]">Total</p>
                  </div>
                </div>
              </div>

              {/* Block 3 */}
              <div>
                <p className="mb-1 font-semibold text-[#845ebc]">Total Asset Assigned</p>
                <div className="flex flex-row gap-4">
                  <div>
                    <p className="text-[13px] mb-1 font-semibold">9</p>
                    <p className="text-gray-600 text-[13px]">Last 7 Day</p>
                  </div>
                  <div>
                    <p className="text-[13px] mb-1 font-semibold">28</p>
                    <p className="text-gray-600 text-[13px]">Total</p>
                  </div>
                </div>
              </div>

              {/* Block 4 */}
              <div>
                <p className="mb-1 font-semibold text-[#f36960]">Pending Assets</p>
                <div className="flex flex-row gap-4">
                  <div>
                    <p className="text-[13px] mb-1 font-semibold">8</p>
                    <p className="text-gray-600 text-[13px]">Last 7 Day</p>
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
          <div className='bg-white p-4 rounded-md shadow-sm w-[78vw] border border-white'>
            <div className='flex justify-between items-center mb-4'>
              <p className='font-semibold'>Assets Assigned</p>
              <div className='flex gap-3 text-[13px]'>
                <button className='px-2 py-1 rounded-sm bg-[#1366d9] text-white border border-[#1366d9]'>Assign</button>
                <button className='flex items-center gap-2 px-3 py-1 rounded-sm border border-gray-300 text-gray-600 cursor-pointer'>Filter</button>
                <button className='px-2 py-1 rounded-sm border border-gray-300 text-gray-600'>Download All</button>
              </div>
            </div>

            {/* Table Head */}
            <div className='flex justify-between font-semibold text-[14px] text-gray-700 pb-2 border-b-2 border-gray-200 mt-10'>
              <p className='w-[20%]'>Asset</p>
              <p className='w-[20%]'>User ID</p>
              <p className='w-[20%]'>Location</p>
              <p className='w-[20%]'>Asset ID</p>
              <p className='w-[20%]'>Assign To</p>
            </div>

            {/* Table Rows */}
            {assignments.length > 0 ? (
              assignments.map((item, index) => (
                <div key={index} className='flex justify-between text-[13px] text-gray-600 py-3 border-b border-gray-200'>
                  <p className='w-[20%]'>{item.asset?.assetName || '—'}</p>
                  <p className='w-[20%]'>{item.userName?._id || '—'}</p>
                  <p className='w-[20%]'>{item.assetLocation?.assetLocation || '—'}</p>
                  <p className='w-[20%]'>{item._id}</p>
                  <p className='w-[20%]'>{item.userName?.userName || '—'}</p>
                </div>
              ))
            ) : (
              <div className="text-center text-sm text-gray-400 py-4">No assignments found.</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssignedPage;
