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

      // Handle different response structures
      const assetsData = response.data?.assets || response.data || [];
      const totalCount =
        response.data?.totalCount ||
        response.data?.length ||
        assetsData.length ||
        0;
      const currentPageNum = response.data?.currentPage || page;
      const totalPagesNum =
        response.data?.totalPages || Math.ceil(totalCount / itemsPerPage) || 1;

      setAssets(Array.isArray(assetsData) ? assetsData : []);
      setCurrentPage(currentPageNum);
      setTotalPages(totalPagesNum);
      setTotalAssets(totalCount);
    } catch (error) {
      console.error("Error fetching assets:", error);
      // Set defaults in case of error
      setAssets([]);
      setTotalAssets(0);
      setTotalPages(1);
    } finally {
      setLoading(false);
    }
  };

  const getLocations = async () => {
    try {
      const response = await apiGetLocations();
      setLocations(
        Array.isArray(response) ? response : response.locations || []
      );
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
    navigate('/dashboard/assets/add-asset');
  };

  // View toggle buttons
  const ViewToggle = () => (
    <div className="flex border border-gray-300 rounded-sm overflow-hidden">
      <button
        onClick={() => setViewMode("list")}
        className={`flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-1 text-xs sm:text-sm ${
          viewMode === "list"
            ? "bg-[#051b34] text-white"
            : "bg-white text-gray-600"
        }`}
      >
        <FaListUl />
        <span className="hidden sm:inline">List</span>
      </button>
      <button
        onClick={() => setViewMode("grid")}
        className={`flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-1 text-xs sm:text-sm ${
          viewMode === "grid"
            ? "bg-[#051b34] text-white"
            : "bg-white text-gray-600"
        }`}
      >
        <FaTh />
        <span className="hidden sm:inline">Grid</span>
      </button>
    </div>
  );

  return (
    <div className="bg-[#f0f1f3] min-h-[90%] space-y-5 py-4 sm:py-6 px-2 sm:px-4">
      <div className="bg-white p-3 sm:p-4 rounded-md shadow-sm w-full border border-white">
        <p className="font-semibold text-base sm:text-[18px]">Assets</p>

        <div className="flex flex-col sm:flex-row sm:justify-between mb-3 gap-2 sm:gap-0">
          <p className="text-xs sm:text-[13px] text-gray-500">
            View and Manage Assets
          </p>
          <div className="flex text-xs sm:text-[13px] gap-2 sm:gap-3">
            <button
              onClick={handleAddAssetClick}
              className="px-2 py-1 rounded-sm bg-[#051b34] text-white border border-[#051b34] text-xs sm:text-sm"
            >
              Add Asset
            </button>
            <ViewToggle />
          </div>
        </div>

        <div className="bg-white p-3 sm:p-4 rounded-md border-gray-300 border-[0.5px]">
          {/* Header Row with Buttons */}
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 gap-3 sm:gap-0">
            <div className="flex items-center gap-4">
              <p className="font-semibold text-sm sm:text-base">
                Total Assets: {totalAssets || 0}
              </p>
            </div>
            <div className="flex gap-3 text-xs sm:text-[13px]">
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
            <div className="mb-4 flex flex-col sm:flex-row gap-4">
              <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                <label className="text-sm text-gray-700 font-semibold">
                  Availability:
                </label>
                <select
                  className="p-1 border rounded text-xs sm:text-[13px] border-gray-300 text-black"
                  value={availabilityFilter}
                  onChange={(e) => setAvailabilityFilter(e.target.value)}
                >
                  <option value="">All</option>
                  <option value="Available">Available</option>
                  <option value="Unavailable">Unavailable</option>
                </select>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                <label className="text-sm text-gray-700 font-semibold">
                  Location:
                </label>
                <select
                  className="p-1 border rounded text-xs sm:text-[13px] border-gray-300 text-black"
                  value={locationFilter}
                  onChange={(e) => setLocationFilter(e.target.value)}
                >
                  <option value="">All</option>
                  {[
                    ...new Set(
                      assets.map((asset) =>
                        getLocationName(asset.assetLocation)
                      )
                    ),
                  ].map((location, index) => (
                    <option key={index} value={location}>
                      {location}
                    </option>
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

// Responsive List View Component
const ListView = ({ assets, getLocationName, onAssignClick }) => (
  <div className="space-y-2">
    {/* Desktop Header - hidden on mobile */}
    {/* Header Row */}
    <div className="hidden md:flex font-semibold text-sm text-gray-700 pb-2 border-b-2 border-gray-200">
      <div className="flex-[1.5]">Name</div>
      <div className="flex-[2]">VIN</div>
      <div className="flex-[1.5]">Status</div>
      <div className="flex-[1.5]">Location</div>
      <div className="flex-[1.5] text-center">Assignments</div>
    </div>

    {assets.map((item, index) => (
      <div
        key={index}
        className="flex flex-col md:flex-row md:items-center text-xs sm:text-[13px] text-gray-600 py-3 border-b border-gray-200 gap-3 md:gap-0"
      >
        {/* Mobile Layout */}
        <div className="md:hidden">
          <div className="flex items-center gap-3 mb-3">
            <img
              src={item.assetImage}
              alt=""
              className="border-2 h-12 w-12 rounded-full border-transparent flex-shrink-0"
            />
            <div className="flex-1 min-w-0">
              <Link
                to={`/dashboard/view-asset/${item._id}`}
                className="block font-medium text-sm hover:text-blue-600 truncate"
              >
                {item.assetName}
              </Link>
              <p className="text-gray-400 text-xs">2025</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 text-xs">
            <div>
              <span className="text-gray-500 font-medium">VIN:</span>
              <p className="text-gray-700">{item.assetId}</p>
            </div>
            <div>
              <span className="text-gray-500 font-medium">Status:</span>
              <p
                className={`font-semibold ${
                  item.status === "Available"
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                {item.status}
              </p>
            </div>
            <div className="col-span-2">
              <span className="text-gray-500 font-medium">Location:</span>
              <p className="text-gray-700">
                {getLocationName(item.assetLocation)}
              </p>
            </div>
          </div>

          <div className="mt-3">
            <button
              onClick={() => onAssignClick(item)}
              className="w-full px-3 py-2 rounded-md bg-[#051b34] text-white text-xs hover:bg-[#051b34]/90"
            >
              Assign Asset
            </button>
          </div>
        </div>

        {/* Desktop Layout */}
        <div className="hidden md:flex w-full items-center">
          <div className="flex-[1.5] truncate flex items-center gap-2">
            <img
              src={item.assetImage}
              alt=""
              className="border-2 h-8 w-8 rounded-full border-transparent flex-shrink-0"
            />
            <div className="min-w-0">
              <Link
                to={`/dashboard/view-asset/${item._id}`}
                className="block truncate hover:text-blue-600"
              >
                {item.assetName}
              </Link>
              <p className="text-gray-400 text-xs">2025</p>
            </div>
          </div>
          <div className="flex-[2] truncate">{item.assetId}</div>
          <div
            className={`flex-[1.5] font-semibold ${
              item.status === "Available" ? "text-green-600" : "text-red-600"
            }`}
          >
            {item.status}
          </div>
          <div className="flex-[1.5]">{getLocationName(item.assetLocation)}</div>
          <div className="flex-[1.5] flex justify-center">
            <button
              onClick={() => onAssignClick(item)}
              className="px-3 py-1 rounded-md bg-[#051b34] text-white text-xs hover:bg-[#051b34]/90"
            >
              Assign to
            </button>
          </div>
        </div>
      </div>
    ))}
  </div>
);

// Grid View Component
const GridView = ({ assets, getLocationName, onAssignClick }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
    {assets.map((item, index) => (
      <div
        key={index}
        className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow"
      >
        <div className="flex gap-4">
          <div className="flex-shrink-0">
            <img
              src={item.assetImage}
              alt={item.assetName}
              className="w-20 h-20 rounded-lg object-cover"
            />
          </div>
          <div className="flex-1 flex flex-col justify-between">
            <div className="mb-2">
              <Link
                to={`/dashboard/view-asset/${item._id}`}
                className="font-semibold text-gray-800 hover:text-blue-600 text-sm"
              >
                {item.assetName}
              </Link>
              <p className="text-xs text-gray-500 mt-1">2025</p>
            </div>
            <div className="space-y-1 mb-3">
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-500">VIN:</span>
                <span className="text-xs text-gray-700 font-medium">
                  {item.assetId}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-500">Location:</span>
                <span className="text-xs text-gray-700">
                  {getLocationName(item.assetLocation)}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-500">Status:</span>
                <span
                  className={`text-xs font-semibold ${
                    item.status === "Available"
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
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

// Fixed Pagination Component
const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  totalItems,
  itemsPerPage,
}) => {
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

  // Ensure we have valid numbers
  const safeCurrentPage = Number(currentPage) || 1;
  const safeTotalItems = Number(totalItems) || 0;
  const safeItemsPerPage = Number(itemsPerPage) || 10;
  const safeTotalPages = Number(totalPages) || 1;

  const startItem = Math.max(1, (safeCurrentPage - 1) * safeItemsPerPage + 1);
  const endItem = Math.min(safeCurrentPage * safeItemsPerPage, safeTotalItems);

  return (
    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mt-6 pt-4 border-t border-gray-200 gap-4">
      <div className="text-xs sm:text-sm text-gray-600 text-center sm:text-left">
        Showing {startItem} to {endItem} of {safeTotalItems} assets
      </div>

      {safeTotalPages > 1 && (
        <div className="flex items-center justify-center gap-1 sm:gap-2">
          <button
            onClick={() => onPageChange(safeCurrentPage - 1)}
            disabled={safeCurrentPage === 1}
            className={`flex items-center gap-1 px-2 sm:px-3 py-1 rounded text-xs sm:text-sm ${
              safeCurrentPage === 1
                ? "text-gray-400 cursor-not-allowed"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            <IoChevronBackOutline />
            <span className="hidden sm:inline">Previous</span>
          </button>

          <div className="flex gap-1">
            {getPageNumbers()[0] > 1 && (
              <>
                <button
                  onClick={() => onPageChange(1)}
                  className="px-2 sm:px-3 py-1 rounded text-xs sm:text-sm text-gray-600 hover:bg-gray-100"
                >
                  1
                </button>
                {getPageNumbers()[0] > 2 && (
                  <span className="px-1 sm:px-2 py-1 text-gray-400 text-xs">
                    ...
                  </span>
                )}
              </>
            )}

            {getPageNumbers().map((page) => (
              <button
                key={page}
                onClick={() => onPageChange(page)}
                className={`px-2 sm:px-3 py-1 rounded text-xs sm:text-sm ${
                  page === safeCurrentPage
                    ? "bg-[#1366d9] text-white"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                {page}
              </button>
            ))}

            {getPageNumbers()[getPageNumbers().length - 1] < safeTotalPages && (
              <>
                {getPageNumbers()[getPageNumbers().length - 1] <
                  safeTotalPages - 1 && (
                  <span className="px-1 sm:px-2 py-1 text-gray-400 text-xs">
                    ...
                  </span>
                )}
                <button
                  onClick={() => onPageChange(safeTotalPages)}
                  className="px-2 sm:px-3 py-1 rounded text-xs sm:text-sm text-gray-600 hover:bg-gray-100"
                >
                  {safeTotalPages}
                </button>
              </>
            )}
          </div>

          <button
            onClick={() => onPageChange(safeCurrentPage + 1)}
            disabled={safeCurrentPage === safeTotalPages}
            className={`flex items-center gap-1 px-2 sm:px-3 py-1 rounded text-xs sm:text-sm ${
              safeCurrentPage === safeTotalPages
                ? "text-gray-400 cursor-not-allowed"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            <span className="hidden sm:inline">Next</span>
            <IoChevronForwardOutline />
          </button>
        </div>
      )}
    </div>
  );
};

export default AllAssets;
