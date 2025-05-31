import React from 'react';
import { IoFilterOutline } from "react-icons/io5";

const assetData = [
  { product: "Dell Laptop", quantity: 5, location: "Head Office", availability: "Available", assignment: "John Doe" },
  { product: "Canon Printer", quantity: 2, location: "Warehouse", availability: "In Use", assignment: "Jane Smith" },
  { product: "HP Monitor", quantity: 10, location: "Lab A", availability: "Available", assignment: "Not Assigned" },
];

const AllAssets = () => {
  return (
    <div className='bg-[#f0f1f3] min-h-[960px] space-y-5 py-6 px-4'>
      {/* Top Summary Box */}
      <div className='bg-white p-4 rounded-md shadow-sm w-[70vw] border border-white'>
        <p className='font-semibold mb-4'>Assets</p>
        <div className='flex gap-32'>
          {/* Reusable Summary Boxes */}
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
      <div className='bg-white p-4 rounded-md shadow-sm w-[70vw] border border-white'>
        {/* Header Row with Buttons */}
        <div className='flex justify-between items-center mb-4'>
          <p className='font-semibold'>Assets</p>
          <div className='flex gap-3 text-[13px]'>
            <button className='px-2 py-1 rounded-sm bg-[#1366d9] text-white border border-[#1366d9]'>Add Asset</button>
            <div className='flex items-center gap-2 px-3 py-1 rounded-sm border border-gray-300 text-gray-600'>
              <IoFilterOutline />
              <button>Filters</button>
            </div>
            <button className='px-2 py-1 rounded-sm border border-gray-300 text-gray-600'>Download All</button>
          </div>
        </div>

        {/* Table Header */}
        <div className='flex justify-between font-semibold text-[14px] text-gray-700 pb-2 border-b-2 border-gray-200'>
          <p className='w-[20%]'>Products</p>
          <p className='w-[15%]'>Quantity</p>
          <p className='w-[20%]'>Location</p>
          <p className='w-[20%]'>Availability</p>
          <p className='w-[20%]'>Assignments</p>
        </div>

        {/* Table Rows */}
        {assetData.map((item, index) => (
          <div key={index} className='flex justify-between text-[13px] text-gray-600 py-3 border-b border-gray-200'>
            <p className='w-[20%]'>{item.product}</p>
            <p className='w-[15%]'>{item.quantity}</p>
            <p className='w-[20%]'>{item.location}</p>
            <p className='w-[20%]'>{item.availability}</p>
            <p className='w-[20%]'>{item.assignment}</p>
          </div>
        ))}
      </div>

    </div>
  );
};

export default AllAssets;
