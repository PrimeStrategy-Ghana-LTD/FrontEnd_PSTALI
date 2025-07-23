import React, { useEffect, useState } from "react";
import {
  IoFilterOutline,
  IoChevronBackOutline,
  IoChevronForwardOutline,
  IoCloudUploadOutline,
} from "react-icons/io5";
import { FaListUl, FaTh } from "react-icons/fa";
import AssetAssignmentModal from "./AssetAssignmentModal";
import { Link, useNavigate } from "react-router-dom";
import {
  apiGetAllAssets,
  apiGetLocations,
  apiCountAllAssets,
} from "../servicess/tali";
import { FiSearch } from "react-icons/fi";
import ImportAssetsModal from "./ImportAssetsPage";
import { useLocation } from "react-router-dom";

const AllAssets = () => {
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState("list");
  const [showFilters, setShowFilters] = useState(false);
  const [availabilityFilter, setAvailabilityFilter] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);
  const [selectedAsset, setSelectedAsset] = useState(null);
  const [assets, setAssets] = useState([]);
  const [allAssets, setAllAssets] = useState([]); // Store all assets for client-side filtering
  const [locations, setLocations] = useState([]);
  const [showSortDropdown, setShowSortDropdown] = useState(false);
  const [sortOption, setSortOption] = useState("recent");
  const [searchTerm, setSearchTerm] = useState("");
  const [searchInput, setSearchInput] = useState(""); // For debouncing
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  const advancedFilters = {
    search: searchParams.get("search") || "",
    category: searchParams.get("category") || "",
    assetLocation: searchParams.get("assetLocation") || "",
    model: searchParams.get("model") || "",
    origin: searchParams.get("origin") || "",
    inspectedBy: searchParams.get("inspectedBy") || "",
    from: searchParams.get("from") || "",
    to: searchParams.get("to") || "",
  };

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalAssets, setTotalAssets] = useState(0);
  const [loading, setLoading] = useState(false);
  const itemsPerPage = viewMode === "list" ? 10 : 12;

  // Debounce search input
  useEffect(() => {
    const timer = setTimeout(() => {
      setSearchTerm(searchInput);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchInput]);

  // Helper function to get location name by ID
  const getLocationName = (locationId) => {
    const location = locations.find((loc) => loc._id === locationId);
    return location ? location.assetLocation : locationId;
  };

  // Client-side filtering and sorting function
  const filterAndSortAssets = (assetsToFilter) => {
    let filteredAssets = [...assetsToFilter];

    // 1. Availability and Location filters (existing)
    if (availabilityFilter) {
      filteredAssets = filteredAssets.filter(
        (asset) => asset.status === availabilityFilter
      );
    }

    if (locationFilter) {
      filteredAssets = filteredAssets.filter(
        (asset) =>
          asset.assetLocation === locationFilter ||
          getLocationName(asset.assetLocation) === locationFilter
      );
    }

    // 2. Advanced Search filters
    if (advancedFilters.search.trim()) {
      const term = advancedFilters.search.toLowerCase();
      filteredAssets = filteredAssets.filter(
        (asset) =>
          asset.assetName?.toLowerCase().includes(term) ||
          asset.assetId?.toLowerCase().includes(term) ||
          asset.category?.toLowerCase().includes(term) ||
          asset.make?.toLowerCase().includes(term) ||
          asset.model?.toLowerCase().includes(term) ||
          getLocationName(asset.assetLocation)?.toLowerCase().includes(term)
      );
    }

    if (advancedFilters.category) {
      filteredAssets = filteredAssets.filter(
        (asset) => asset.category === advancedFilters.category
      );
    }

    if (advancedFilters.assetLocation) {
      filteredAssets = filteredAssets.filter(
        (asset) =>
          getLocationName(asset.assetLocation) === advancedFilters.assetLocation
      );
    }

    if (advancedFilters.model) {
      filteredAssets = filteredAssets.filter(
        (asset) =>
          asset.model?.toLowerCase() === advancedFilters.model.toLowerCase()
      );
    }

    if (advancedFilters.origin) {
      filteredAssets = filteredAssets.filter(
        (asset) =>
          asset.origin?.toLowerCase() === advancedFilters.origin.toLowerCase()
      );
    }

    if (advancedFilters.inspectedBy) {
      filteredAssets = filteredAssets.filter(
        (asset) => asset.inspectedBy === advancedFilters.inspectedBy
      );
    }

    if (advancedFilters.from) {
      filteredAssets = filteredAssets.filter(
        (asset) => new Date(asset.createdAt) >= new Date(advancedFilters.from)
      );
    }

    if (advancedFilters.to) {
      filteredAssets = filteredAssets.filter(
        (asset) => new Date(asset.createdAt) <= new Date(advancedFilters.to)
      );
    }

    // 3. Sorting (already handled)
    switch (sortOption) {
      case "recent":
        filteredAssets.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        break;
      case "alphabetical":
        filteredAssets.sort((a, b) =>
          (a.assetName || "").localeCompare(b.assetName || "")
        );
        break;
      case "reverse":
        filteredAssets.sort((a, b) =>
          (b.assetName || "").localeCompare(a.assetName || "")
        );
        break;
      default:
        break;
    }

    return filteredAssets;
  };

  // Paginate filtered assets
  const paginateAssets = (filteredAssets, page) => {
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedAssets = filteredAssets.slice(startIndex, endIndex);

    const totalCount = filteredAssets.length;
    const totalPagesCount = Math.ceil(totalCount / itemsPerPage) || 1;

    return {
      assets: paginatedAssets,
      totalCount,
      totalPages: totalPagesCount,
      currentPage: page,
    };
  };

  // Fetch all assets from API
  const getAllAssets = async () => {
    try {
      setLoading(true);

      // Fetch all assets without pagination for client-side filtering
      const response = await apiGetAllAssets({ limit: 100 }); // Large limit to get all assets

      const assetsData = response.data?.assets || response.data || [];
      setAllAssets(Array.isArray(assetsData) ? assetsData : []);

      // Apply filtering and pagination
      const filteredAssets = filterAndSortAssets(
        Array.isArray(assetsData) ? assetsData : []
      );
      const paginatedResult = paginateAssets(filteredAssets, currentPage);

      setAssets(paginatedResult.assets);
      setTotalAssets(paginatedResult.totalCount);
      setTotalPages(paginatedResult.totalPages);
    } catch (error) {
      console.error("Error fetching assets:", error);
      setAssets([]);
      setAllAssets([]);
      setTotalAssets(0);
      setTotalPages(1);
    } finally {
      setLoading(false);
    }
  };

  // Apply filters and pagination to existing assets
  const applyFiltersAndPagination = (page = 1, resetPagination = false) => {
    const filteredAssets = filterAndSortAssets(allAssets);
    const targetPage = resetPagination ? 1 : page;
    const paginatedResult = paginateAssets(filteredAssets, targetPage);

    setAssets(paginatedResult.assets);
    setTotalAssets(paginatedResult.totalCount);
    setTotalPages(paginatedResult.totalPages);
    setCurrentPage(paginatedResult.currentPage);
  };

  const getTotalAssetsCount = async () => {
    try {
      const response = await apiCountAllAssets();
      const count = response.count || response.total || 0;
      // Note: This will show the total count from API, not filtered count
      // If you want to show filtered count, remove this function and rely on client-side counting
    } catch (error) {
      console.error("Error fetching total assets count:", error);
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

  // Initial load
  useEffect(() => {
    getAllAssets();
    getLocations();
  }, []);

  // Handle filter changes - reset to page 1 and reapply filters
  useEffect(() => {
    if (allAssets.length > 0) {
      applyFiltersAndPagination(1, true);
    }
  }, [
    availabilityFilter,
    locationFilter,
    searchTerm,
    sortOption,
    itemsPerPage,
    viewMode,
  ]);

  // Handle pagination changes
  useEffect(() => {
    if (allAssets.length > 0) {
      applyFiltersAndPagination(currentPage, false);
    }
  }, [currentPage]);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages && page !== currentPage) {
      setCurrentPage(page);
    }
  };

  const handleAddAssetClick = () => {
    navigate("/dashboard/assets/add-asset");
  };

  const handleImportSuccess = () => {
    setIsImportModalOpen(false);
    // Refresh the assets list after successful import
    getAllAssets();
  };

  const handleSortChange = (newSortOption) => {
    setSortOption(newSortOption);
    setShowSortDropdown(false);
  };

  const handleSearchChange = (e) => {
    setSearchInput(e.target.value);
  };

  const clearFilters = () => {
  setAvailabilityFilter("");
  setLocationFilter("");
  setSearchInput("");
  setSearchTerm("");
  setSortOption("recent");
  setCurrentPage(1);
  navigate("/dashboard/assets"); // Clear query params
  applyFiltersAndPagination(1, true);
};

  const handleReset = () => {
    setFilterLocation("");
    setFilterAsset("");
    setFilteredAssignments(assignments);
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

            <button
              onClick={() => navigate("/dashboard/assets/import-assets")}
              className="flex items-center gap-1 px-2 py-1 rounded-sm bg-blue-600 text-white border border-blue-600 text-xs sm:text-sm hover:bg-blue-700 transition-colors"
            >
              <IoCloudUploadOutline />
              <span className="hidden sm:inline">Import</span>
            </button>

            <ViewToggle />
          </div>
        </div>

        <div className="bg-white p-3 sm:p-4 rounded-md border-gray-300 border-[0.5px]">
          {/* Header Row with Buttons */}
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 gap-3 sm:gap-0">
            <div className="flex items-center gap-4">
              <p className="font-semibold text-sm sm:text-base">
                Total Assets: {totalAssets}
              </p>
              {(availabilityFilter || locationFilter || searchTerm) && (
                <button
                  onClick={clearFilters}
                  className="text-sm text-blue-600 hover:text-blue-800 underline"
                >
                  Clear Filters
                </button>
              )}
            </div>

            {/* Searchbar */}
            <div className=" flex ">
              <div className="relative flex items-center border border-gray-300 rounded-full text-sm focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-transparent px-3 py-2 w-96">
                <svg
                  className="w-4 h-4 text-gray-400 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
                <input
                  type="text"
                  placeholder="Search assets..."
                  value={searchInput}
                  onChange={handleSearchChange}
                  className="w-full focus:outline-none"
                />
                {searchInput && (
                  <button
                    onClick={() => {
                      setSearchInput("");
                      setSearchTerm("");
                    }}
                    className="ml-2 text-gray-400 hover:text-gray-600"
                  >
                    ×
                  </button>
                )}
              </div>
            </div>
            <div className="flex gap-3 text-xs sm:text-[13px]">
              <button
                className="flex items-center gap-2 px-3 py-1 rounded-sm border border-gray-300 text-gray-600 cursor-pointer"
                onClick={() => setShowFilters(!showFilters)}
              >
                <IoFilterOutline />
                <span>Filters</span>
              </button>
              <div className="relative">
                <button
                  className="px-4 py-2 border border-gray-300 text-gray-600 rounded-sm hover:bg-gray-50 transition-colors"
                  onClick={() => setShowSortDropdown((prev) => !prev)}
                >
                  Sort:{" "}
                  {sortOption === "recent"
                    ? "Recently Added"
                    : sortOption === "alphabetical"
                    ? "A-Z"
                    : "Z-A"}
                </button>
                {showSortDropdown && (
                  <div className="absolute right-0 z-10 mt-2 w-48 bg-white border border-gray-200 shadow-md rounded-sm text-sm">
                    <button
                      onClick={() => handleSortChange("recent")}
                      className={`block px-4 py-2 text-left w-full hover:bg-gray-100 ${
                        sortOption === "recent"
                          ? "font-semibold text-[#051b34]"
                          : ""
                      }`}
                    >
                      Recently Added
                    </button>
                    <button
                      onClick={() => handleSortChange("alphabetical")}
                      className={`block px-4 py-2 text-left w-full hover:bg-gray-100 ${
                        sortOption === "alphabetical"
                          ? "font-semibold text-[#051b34]"
                          : ""
                      }`}
                    >
                      Alphabetical (A-Z)
                    </button>
                    <button
                      onClick={() => handleSortChange("reverse")}
                      className={`block px-4 py-2 text-left w-full hover:bg-gray-100 ${
                        sortOption === "reverse"
                          ? "font-semibold text-[#051b34]"
                          : ""
                      }`}
                    >
                      Alphabetical (Z-A)
                    </button>
                  </div>
                )}
              </div>
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
                  {locations.map((location) => (
                    <option key={location._id} value={location.assetLocation}>
                      {location.assetLocation}
                    </option>
                  ))}
                </select>
              </div>
              <button
                onClick={clearFilters}
                className="px-2 py-1 rounded-sm border border-gray-400 text-gray-700 hover:bg-gray-100 text-xs sm:text-sm"
              >
                Reset
              </button>
            </div>
          )}

          {loading && (
            <div className="flex justify-center items-center py-8">
              <div className="text-gray-600">Loading assets...</div>
            </div>
          )}

          {!loading && (
            <>
              {viewMode === "list" ? (
                <ListView assets={assets} getLocationName={getLocationName} />
              ) : (
                <GridView assets={assets} getLocationName={getLocationName} />
              )}

              {assets.length === 0 && (
                <div className="flex justify-center items-center py-8">
                  <div className="text-gray-600">
                    {searchTerm || availabilityFilter || locationFilter
                      ? "No assets found matching your criteria"
                      : "No assets found"}
                  </div>
                </div>
              )}
            </>
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

// ListView Component
const ListView = ({ assets, getLocationName }) => (
  <div className="space-y-2">
    <div className="hidden md:flex font-semibold text-sm text-gray-700 pb-2 border-b-2 border-gray-200 mt-9">
      <div className="flex-[1.5]">Name</div>
      <div className="flex-[2]">VIN</div>
      <div className="flex-[1.5]">Origin</div>
      <div className="flex-[1.5]">Location</div>
      <div className="flex-[1.5] text-center">Assignment</div>
    </div>

    {assets.map((item, index) => (
      <div
        key={item._id || index}
        className="flex flex-col md:flex-row md:items-center text-xs sm:text-[13px] text-gray-600 py-3 border-b border-gray-200 gap-3 md:gap-0"
      >
        <div className="md:hidden">
          <div className="flex items-center gap-3 mb-3">
            <img
              src={item.assetImage}
              alt=""
              className="border-2 h-12 w-12 rounded-full border-transparent flex-shrink-0"
            />
            <div className="flex-1 min-w-0">
              <Link
                to={`/dashboard/assets/view-asset/${item._id}`}
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
              <span className="text-gray-500 font-medium">Origin:</span>
              <p className="font-semibold">{item.origin}</p>
            </div>
            <div className="col-span-2">
              <span className="text-gray-500 font-medium">Location:</span>
              <p className="text-gray-700">
                {getLocationName(item.assetLocation)}
              </p>
            </div>
          </div>

          <div className="mt-3">
            <div className="flex-[1.5] text-center">
              <Link
                to={`/dashboard/assign-location/${item._id}`}
                className="px-2 py-1 rounded-sm bg-[#051b34] text-white border border-[#051b34] text-xs sm:text-sm"
              >
                Assign To
              </Link>
            </div>
          </div>
        </div>

        <div className="hidden md:flex w-full items-center">
          <div className="flex-[1.5] truncate flex items-center gap-2">
            <img
              src={item.assetImage}
              alt=""
              className="border-2 h-8 w-8 rounded-full border-transparent flex-shrink-0"
            />
            <div className="min-w-0">
              <Link
                to={`/dashboard/assets/view-asset/${item._id}`}
                className="block truncate hover:text-blue-600"
              >
                {item.assetName}
              </Link>
              <p className="text-gray-400 text-xs">2025</p>
            </div>
          </div>
          <div className="flex-[2] truncate">{item.assetId}</div>
          <div className="flex-[1.5] font-semibold">{item.origin}</div>
          <div className="flex-[1.5]">
            {getLocationName(item.assetLocation)}
          </div>
          <div className="flex-[1.5] flex justify-center">
            <Link
              to={`/dashboard/assign-location/${item._id}`}
              className="px-2 py-1 rounded-sm bg-[#051b34] text-white border border-[#051b34] text-xs sm:text-sm"
            >
              Assign To
            </Link>
          </div>
        </div>
      </div>
    ))}
  </div>
);

// GridView Component
const GridView = ({ assets, getLocationName }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xlg:grid-cols-3 gap-4 mt-9 ml-20">
    {assets.map((item, index) => (
      <div
        key={item._id || index}
        className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow h-[243px] w-[348px]"
      >
        <Link
          to={`/dashboard/assign-location/${item._id}`}
          className="px-2 py-1 rounded-sm bg-[#051b34] text-white border border-[#051b34] text-xs sm:text-sm"
        >
          Assign To
        </Link>

        <p className="border-b-[0.5px] mt-2 border-gray-300"></p>
        <div className="flex gap-4 mt-2">
          <div className="flex-shrink-0">
            <img
              src={item.assetImage}
              alt={item.assetName}
              className="w-[149px] h-[149px] object-cover"
            />
          </div>
          <div className="flex-1 flex flex-col justify-between">
            <div>
              <Link
                to={`/dashboard/assets/view-asset/${item._id}`}
                className="font-semibold text-gray-800 hover:text-blue-600 text-sm"
              >
                {item.assetName}
              </Link>
              <p className="text-xs text-gray-500">2025</p>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-xs text-gray-500">Location:</span>
              <span className="text-xs text-gray-700">
                {getLocationName(item.assetLocation)}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xs text-gray-500">VIN:</span>
              <span className="text-xs text-gray-700 font-medium">
                {item.assetId}
              </span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-xs text-gray-500">Origin</span>
              <span className="text-xs font-semibold text-gray-700">
                {item.origin}
              </span>
            </div>
          </div>
        </div>
      </div>
    ))}
  </div>
);

// Pagination Component
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
