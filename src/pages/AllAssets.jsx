import React, { useEffect, useState } from "react";
import {
  IoFilterOutline,
  IoChevronBackOutline,
  IoChevronForwardOutline,
} from "react-icons/io5";
import { FaListUl, FaTh } from "react-icons/fa";
import AssetAssignmentModal from "./AssetAssignmentModal";
import { Link, useNavigate } from "react-router-dom";
import { apiGetAllAssets, apiGetLocations } from "../servicess/tali";

const AllAssets = () => {
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState("list"); // 'list' or 'grid'
  const [showFilters, setShowFilters] = useState(false);
  const [availabilityFilter, setAvailabilityFilter] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);
  const [selectedAsset, setSelectedAsset] = useState(null);
  const [assets, setAssets] = useState([]);
  const [locations, setLocations] = useState([]);

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalAssets, setTotalAssets] = useState(0);
  const [loading, setLoading] = useState(false);
  const itemsPerPage = viewMode === "list" ? 10 : 12;

  // Helper function to get location name by ID
  const getLocationName = (locationId) => {
    const location = locations.find((loc) => loc._id === locationId);
    return location ? location.assetLocation : locationId;
  };

  const getAssets = async (page = 1, filters = {}) => {
    try {
      setLoading(true);
      const params = {
        page: page,
        limit: itemsPerPage,
        ...filters,
      };
      const response = await apiGetAllAssets(params);
      setAssets(response.data.assets || response.data);
      setCurrentPage(response.data.currentPage || page);
      setTotalPages(response.data.totalPages || Math.ceil((response.data.totalCount || response.data.length) / itemsPerPage));
      setTotalAssets(response.data.totalCount || response.data.length);
    } catch (error) {
      console.error("Error fetching assets:", error);
    } finally {
      setLoading(false);
    }
  };

  const getLocations = async () => {
    try {
      const response = await apiGetLocations();
      setLocations(Array.isArray(response) ? response : response.locations || []);
    } catch (error) {
      console.error("Error fetching locations:", error);
    }
  };

  useEffect(() => {
    getAssets(1);
    getLocations();
  }, [viewMode]);

  useEffect(() => {
    setCurrentPage(1);
    const filters = {};
    if (availabilityFilter) filters.status = availabilityFilter;
    if (locationFilter) filters.location = locationFilter;
    getAssets(1, filters);
  }, [availabilityFilter, locationFilter]);

  const filteredAssets = assets.filter((item) => {
    const locationName = getLocationName(item.assetLocation);
    return (
      (availabilityFilter === "" || item.status === availabilityFilter) &&
      (locationFilter === "" || locationName === locationFilter)
    );
  });

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages && page !== currentPage) {
      setCurrentPage(page);
      const filters = {};
      if (availabilityFilter) filters.status = availabilityFilter;
      if (locationFilter) filters.location = locationFilter;
      getAssets(page, filters);
    }
  };

  // Function to handle add asset button click
  const handleAddAssetClick = () => {
    navigate('/dashboard/add-asset');
  };

  // View toggle buttons
  const ViewToggle = () => (
    <div className="flex border border-gray-300 rounded-sm overflow-hidden">
      <button
        onClick={() => setViewMode("list")}
        className={`flex items-center gap-2 px-3 py-1 text-sm ${viewMode === "list" ? "bg-[#051b34] text-white" : "bg-white text-gray-600"}`}
      >
        <FaListUl />
        <span>List</span>
      </button>
      <button
        onClick={() => setViewMode("grid")}
        className={`flex items-center gap-2 px-3 py-1 text-sm ${viewMode === "grid" ? "bg-[#051b34] text-white" : "bg-white text-gray-600"}`}
      >
        <FaTh />
        <span>Grid</span>
      </button>
    </div>
  );

  return (
    <div className="bg-[#f0f1f3] min-h-[90%] space-y-5 py-6 px-4">
      <div className="bg-white p-4 rounded-md shadow-sm w-full border border-white">
        <p className="font-semibold text-[18px]">Assets</p>

        <div className="flex justify-between mb-3">
          <p className="text-[13px] text-gray-500">View and Manage Assets</p>
          <div className="flex text-[13px] gap-3">
            <button
              onClick={handleAddAssetClick}
              className="px-2 py-1 rounded-sm bg-[#051b34] text-white border border-[#051b34]"
            >
              Add Asset
            </button>
            <ViewToggle />
          </div>
        </div>

        <div className="bg-white p-4 rounded-md border-gray-300 border-[0.5px]">
          {/* Header Row with Buttons */}
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-4">
              <p className="font-semibold">Total Assets: {totalAssets}</p>
            </div>
            <div className="flex gap-3 text-[13px]">
              <button
                className="flex items-center gap-2 px-3 py-1 rounded-sm border border-gray-300 text-gray-600 cursor-pointer"
                onClick={() => setShowFilters(!showFilters)}
              >
                <IoFilterOutline />
                <span>Filters</span>
              </button>
            </div>
          </div>

          {showFilters && (
            <div className="mb-4 flex gap-4">
              <div>
                <label className="text-sm text-gray-700 font-semibold">
                  Availability:
                </label>
                <select
                  className="ml-2 p-1 border rounded text-[13px] border-gray-300 text-black"
                  value={availabilityFilter}
                  onChange={(e) => setAvailabilityFilter(e.target.value)}
                >
                  <option value="">All</option>
                  <option value="Available">Available</option>
                  <option value="Unavailable">Unavailable</option>
                </select>
              </div>
              <div>
                <label className="text-sm text-gray-700 font-semibold">
                  Location:
                </label>
                <select
                  className="ml-2 p-1 border rounded text-[13px] border-gray-300 text-black"
                  value={locationFilter}
                  onChange={(e) => setLocationFilter(e.target.value)}
                >
                  <option value="">All</option>
                  {[...new Set(assets.map(asset => getLocationName(asset.assetLocation)))].map((location, index) => (
                    <option key={index} value={location}>{location}</option>
                  ))}
                </select>
              </div>
            </div>
          )}

          {loading && (
            <div className="flex justify-center items-center py-8">
              <div className="text-gray-600">Loading assets...</div>
            </div>
          )}

          {viewMode === "list" ? (
            <ListView 
              assets={filteredAssets} 
              getLocationName={getLocationName}
              onAssignClick={(asset) => {
                setSelectedAsset(asset);
                setIsAssignModalOpen(true);
              }}
            />
          ) : (
            <GridView 
              assets={filteredAssets} 
              getLocationName={getLocationName}
              onAssignClick={(asset) => {
                setSelectedAsset(asset);
                setIsAssignModalOpen(true);
              }}
            />
          )}

          {!loading && filteredAssets.length === 0 && (
            <div className="flex justify-center items-center py-8">
              <div className="text-gray-600">No assets found</div>
            </div>
          )}

          {totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
              totalItems={totalAssets}
              itemsPerPage={itemsPerPage}
            />
          )}
        </div>
      </div>

      <AssetAssignmentModal
        isOpen={isAssignModalOpen}
        onClose={() => setIsAssignModalOpen(false)}
        asset={selectedAsset}
      />
    </div>
  );
};

// List View Component - FIXED LINK
const ListView = ({ assets, getLocationName, onAssignClick }) => (
  <div className="space-y-2">
    <div className="flex font-semibold text-[14px] text-gray-700 pb-2 border-b-2 border-gray-200">
      <div className="w-[35%]">Name</div>
      <div className="w-[15%]">VIN</div>
      <div className="w-[15%]">Status</div>
      <div className="w-[20%]">Location</div>
      <div className="w-[15%] text-center">Assignments</div>
    </div>

    {assets.map((item, index) => (
      <div key={index} className="flex text-[13px] text-gray-600 py-3 border-b border-gray-200 items-center">
        <div className="w-[35%] flex items-center gap-2">
          <img src={item.assetImage} alt="" className="border-2 h-8 w-8 rounded-full border-transparent" />
          <div className="min-w-0 flex-1">
            <Link to={`/dashboard/view-asset/${item._id}`} className="block truncate hover:text-blue-600">
              {item.assetName}
            </Link>
            <p className="text-gray-400">2025</p>
          </div>
        </div>
        <div className="w-[15%]">{item.assetId}</div>
        <div className={`w-[15%] font-semibold ${item.status === "Available" ? "text-green-600" : "text-red-600"}`}>
          {item.status}
        </div>
        <div className="w-[20%]">{getLocationName(item.assetLocation)}</div>
        <div className="w-[15%] flex justify-center">
          <button
            onClick={() => onAssignClick(item)}
            className="px-3 py-1 rounded-md bg-[#051b34] text-white text-xs hover:bg-[#051b34]/90"
          >
            Assign to
          </button>
        </div>
      </div>
    ))}
  </div>
);

// Grid View Component - FIXED LINK
const GridView = ({ assets, getLocationName, onAssignClick }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
    {assets.map((item, index) => (
      <div key={index} className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
        <div className="flex gap-4">
          <div className="flex-shrink-0">
            <img src={item.assetImage} alt={item.assetName} className="w-20 h-20 rounded-lg object-cover" />
          </div>
          <div className="flex-1 flex flex-col justify-between">
            <div className="mb-2">
              <Link to={`/dashboard/view-asset/${item._id}`} className="font-semibold text-gray-800 hover:text-blue-600 text-sm">
                {item.assetName}
              </Link>
              <p className="text-xs text-gray-500 mt-1">2025</p>
            </div>
            <div className="space-y-1 mb-3">
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-500">VIN:</span>
                <span className="text-xs text-gray-700 font-medium">{item.assetId}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-500">Location:</span>
                <span className="text-xs text-gray-700">{getLocationName(item.assetLocation)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-500">Status:</span>
                <span className={`text-xs font-semibold ${item.status === "Available" ? "text-green-600" : "text-red-600"}`}>
                  {item.status}
                </span>
              </div>
            </div>
            <button
              onClick={() => onAssignClick(item)}
              className="py-1.5 text-xs bg-[#051b34] text-white rounded-md hover:bg-[#0a2a4a]"
            >
              Assign Asset
            </button>
          </div>
        </div>
      </div>
    ))}
  </div>
);

// Pagination Component
const Pagination = ({ currentPage, totalPages, onPageChange, totalItems, itemsPerPage }) => {
  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return pages;
  };

  return (
    <div className="flex justify-between items-center mt-6 pt-4 border-t border-gray-200">
      <div className="text-sm text-gray-600">
        Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, totalItems)} of {totalItems} assets
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`flex items-center gap-1 px-3 py-1 rounded text-sm ${
            currentPage === 1 ? "text-gray-400 cursor-not-allowed" : "text-gray-600 hover:bg-gray-100"
          }`}
        >
          <IoChevronBackOutline />
          Previous
        </button>

        <div className="flex gap-1">
          {getPageNumbers()[0] > 1 && (
            <>
              <button
                onClick={() => onPageChange(1)}
                className="px-3 py-1 rounded text-sm text-gray-600 hover:bg-gray-100"
              >
                1
              </button>
              {getPageNumbers()[0] > 2 && <span className="px-2 py-1 text-gray-400">...</span>}
            </>
          )}

          {getPageNumbers().map((page) => (
            <button
              key={page}
              onClick={() => onPageChange(page)}
              className={`px-3 py-1 rounded text-sm ${
                page === currentPage ? "bg-[#1366d9] text-white" : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              {page}
            </button>
          ))}

          {getPageNumbers()[getPageNumbers().length - 1] < totalPages && (
            <>
              {getPageNumbers()[getPageNumbers().length - 1] < totalPages - 1 && (
                <span className="px-2 py-1 text-gray-400">...</span>
              )}
              <button
                onClick={() => onPageChange(totalPages)}
                className="px-3 py-1 rounded text-sm text-gray-600 hover:bg-gray-100"
              >
                {totalPages}
              </button>
            </>
          )}
        </div>

        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`flex items-center gap-1 px-3 py-1 rounded text-sm ${
            currentPage === totalPages ? "text-gray-400 cursor-not-allowed" : "text-gray-600 hover:bg-gray-100"
          }`}
        >
          Next
          <IoChevronForwardOutline />
        </button>
      </div>
    </div>
  );
};

export default AllAssets;