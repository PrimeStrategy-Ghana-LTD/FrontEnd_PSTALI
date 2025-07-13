import React from 'react';
import { CalendarDays, Search, X } from 'lucide-react';

const AdvancedSearchModal = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-opacity mt-[20%]">
      <div className="w-full max-w-4xl rounded-xl bg-[#2C2C2C] p-6 text-white shadow-lg">
        {/* Close Button */}
        <div className="flex justify-end">
          <button onClick={onClose} className="text-gray-300 hover:text-white">
            <X size={20} />
          </button>
        </div>

        {/* Search Bar */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search assets vin, colour"
            className="w-full rounded-lg bg-[#1F1F1F] px-4 py-2 text-sm text-white placeholder-gray-400 focus:outline-none"
          />
        </div>

        {/* Filter Grid */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
          <select className="rounded-md bg-white px-3 py-2 text-sm text-gray-500 placeholder-gray-700 focus:outline-none">
            <option>Asset Category</option>
          </select>
          <select className="rounded-md bg-white px-3 py-2 text-sm text-gray-500">
            <option>Location</option>
          </select>
          <select className="rounded-md bg-white px-3 py-2 text-sm text-gray-500">
            <option>Model</option>
          </select>

          {/* Date Range */}
          <div className="flex space-x-2">
            <div className="relative w-1/2">
              <input
                type="date"
                className="w-full rounded-md bg-white px-3 py-2 text-sm text-gray-500"
                placeholder="Date from"
              />
              <CalendarDays className="absolute right-3 top-2.5 h-4 w-4 text-gray-400" />
            </div>
            <div className="relative w-1/2">
              <input
                type="date"
                className="w-full rounded-md bg-white px-3 py-2 text-sm text-gray-500"
                placeholder="Date to"
              />
              <CalendarDays className="absolute right-3 top-2.5 h-4 w-4 text-gray-400" />
            </div>
          </div>

          <select className="rounded-md bg-white px-3 py-2 text-sm text-gray-500">
            <option>Origin</option>
          </select>
          <select className="rounded-md bg-white px-3 py-2 text-sm text-gray-500">
            <option>Select User</option>
          </select>
        </div>

        {/* Buttons */}
        <div className="mt-6 flex justify-start gap-4">
          <button className="flex items-center gap-2 rounded-md bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700">
            <Search size={16} />
            Search
          </button>
          <button className="rounded-md bg-blue-700 px-4 py-2 text-sm font-medium text-white hover:bg-blue-800">
            Reset Filters
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdvancedSearchModal;
