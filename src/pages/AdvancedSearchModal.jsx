import { CalendarDays, Search, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { apiGetLocations, apiGetUsers } from "../servicess/tali";

const AdvancedSearchModal = ({ onClose }) => {
  const navigate = useNavigate();
  const [isLoadingLocations, setIsLoadingLocations] = useState(false);

  const [filters, setFilters] = useState({
    search: "",
    category: "",
    assetLocation: "",
    model: "",
    origin: "",
    inspectedBy: "",
    from: "",
    to: "",
  });

  const [locations, setLocations] = useState([]);
  const [users, setUsers] = useState([]);
const [isLoadingUsers, setIsLoadingUsers] = useState(false);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleSearch = () => {
    const params = new URLSearchParams();

    Object.entries(filters).forEach(([key, value]) => {
      if (value) params.append(key, value);
    });

    params.append("page", 1);
    params.append("limit", 10);
    params.append("sortBy", "createdAt");
    params.append("sortOrder", "desc");

    navigate(`/dashboard/assets?${params.toString()}`);
    onClose();
  };

  const handleReset = () => {
    setFilters({
      search: "",
      category: "",
      assetLocation: "",
      model: "",
      origin: "",
      inspectedBy: "",
      from: "",
      to: "",
    });
  };

  useEffect(() => {
    const fetchLocations = async () => {
      setIsLoadingLocations(true);
      try {
        const response = await apiGetLocations();
        console.log("Locations API Response:", response); // Debug log
        
        // Handle different response structures
        const locationsData = response?.data?.data || 
                             response?.data || 
                             response?.locations || 
                             response;
        
        if (Array.isArray(locationsData)) {
          setLocations(locationsData);
        } else {
          console.error("Unexpected locations data format:", locationsData);
        }
      } catch (error) {
        console.error("Failed to fetch locations:", error);
      } finally {
        setIsLoadingLocations(false);
      }
    };

    const fetchUsers = async () => {
  setIsLoadingUsers(true);
  try {
    const response = await apiGetUsers();
    console.log("Users API Response:", response);

    const usersData = response?.data || response?.users || response;

    if (Array.isArray(usersData)) {
      setUsers(usersData);
    } else {
      console.error("Unexpected users data format:", usersData);
    }
  } catch (error) {
    console.error("Failed to fetch users:", error);
  } finally {
    setIsLoadingUsers(false);
  }
};

    fetchLocations();
    fetchUsers(); 
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-opacity mt-[20%]">
      <div className="w-full max-w-4xl rounded-xl bg-[#2C2C2C] p-6 text-white shadow-lg">
        <div className="flex justify-end">
          <button onClick={onClose} className="text-gray-300 hover:text-white">
            <X size={20} />
          </button>
        </div>

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
            disabled={isLoadingLocations}
            className="rounded-md bg-white px-3 py-2 text-sm text-gray-500"
          >
            <option value="">{isLoadingLocations ? "Loading locations..." : "Location"}</option>
            {Array.isArray(locations) && locations.length > 0 ? (
              locations.map((loc) => (
                <option 
                  key={loc?._id || loc?.id} 
                  value={loc?._id || loc?.id}
                >
                  {loc?.name || loc?.assetLocation || "Unnamed Location"}
                </option>
              ))
            ) : (
              !isLoadingLocations && <option value="" disabled>No locations available</option>
            )}
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
  disabled={isLoadingUsers}
  className="rounded-md bg-white px-3 py-2 text-sm text-gray-500"
>
  <option value="">{isLoadingUsers ? "Loading users..." : "Select User"}</option>
  {Array.isArray(users) && users.length > 0 ? (
    users.map((user) => (
      <option key={user._id} value={user._id}>
        {user.userName || user.name || user.userName}
      </option>
    ))
  ) : (
    !isLoadingUsers && <option value="" disabled>No users available</option>
  )}
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
