import React, { useState } from 'react';
import { CalendarDays, Search, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AdvancedSearchModal = ({ onClose }) => {
  const navigate = useNavigate();

  const [filters, setFilters] = useState({
    search: '',
    category: '',
    assetLocation: '',
    model: '',
    origin: '',
    inspectedBy: '',
    from: '',
    to: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const handleSearch = () => {
    const params = new URLSearchParams();

    Object.entries(filters).forEach(([key, value]) => {
      if (value) params.append(key, value);
    });

    params.append('page', 1);
    params.append('limit', 10);
    params.append('sortBy', 'createdAt');
    params.append('sortOrder', 'desc');

    navigate(`/dashboard/assets?${params.toString()}`);
    onClose(); // close modal after navigation
  };

  const handleReset = () => {
    setFilters({
      search: '',
      category: '',
      assetLocation: '',
      model: '',
      origin: '',
      inspectedBy: '',
      from: '',
      to: '',
    });
  };

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
            name="search"
            placeholder="Search assets vin, colour"
            value={filters.search}
            onChange={handleChange}
            className="w-full rounded-lg bg-[#1F1F1F] px-4 py-2 text-sm text-white placeholder-gray-400 focus:outline-none"
          />
        </div>

        {/* Filter Grid */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
          <select
            name="category"
            value={filters.category}
            onChange={handleChange}
            className="rounded-md bg-white px-3 py-2 text-sm text-gray-500"
          >
            <option value="">Asset Category</option>
            <option value="car">Car</option>
            <option value="truck">Truck</option>
          </select>

          <select
            name="assetLocation"
            value={filters.assetLocation}
            onChange={handleChange}
            className="rounded-md bg-white px-3 py-2 text-sm text-gray-500"
          >
            <option value="">Location</option>
            <option value="Tema">Tema</option>
            <option value="Takoradi">Takoradi</option>
          </select>

          <input
            type="text"
            name="model"
            value={filters.model}
            onChange={handleChange}
            placeholder="Model"
            className="rounded-md bg-white px-3 py-2 text-sm text-gray-500"
          />

          {/* Date Range */}
          <div className="flex space-x-2">
            <div className="relative w-1/2">
              <input
                type="date"
                name="from"
                value={filters.from}
                onChange={handleChange}
                className="w-full rounded-md bg-white px-3 py-2 text-sm text-gray-500"
              />
              <CalendarDays className="absolute right-3 top-2.5 h-4 w-4 text-gray-400" />
            </div>
            <div className="relative w-1/2">
              <input
                type="date"
                name="to"
                value={filters.to}
                onChange={handleChange}
                className="w-full rounded-md bg-white px-3 py-2 text-sm text-gray-500"
              />
              <CalendarDays className="absolute right-3 top-2.5 h-4 w-4 text-gray-400" />
            </div>
          </div>

          <input
            type="text"
            name="origin"
            value={filters.origin}
            onChange={handleChange}
            placeholder="Origin"
            className="rounded-md bg-white px-3 py-2 text-sm text-gray-500"
          />

          <select
            name="inspectedBy"
            value={filters.inspectedBy}
            onChange={handleChange}
            className="rounded-md bg-white px-3 py-2 text-sm text-gray-500"
          >
            <option value="">Select User</option>
            <option value="adminUserId">Admin</option>
          </select>
        </div>

        {/* Buttons */}
        <div className="mt-6 flex justify-start gap-4">
          <button
            onClick={handleSearch}
            className="flex items-center gap-2 rounded-md bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700"
          >
            <Search size={16} />
            Search
          </button>
          <button
            onClick={handleReset}
            className="rounded-md bg-blue-700 px-4 py-2 text-sm font-medium text-white hover:bg-blue-800"
          >
            Reset Filters
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdvancedSearchModal;
