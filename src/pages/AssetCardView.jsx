import React, { useEffect, useState } from "react";
import {
  IoFilterOutline,
  IoChevronBackOutline,
  IoChevronForwardOutline,
} from "react-icons/io5";
import Searchbar from "../components/Searchbar";
import Sidebar1 from "../components/Sidebar1";
import { apiGetAllAssets, apiGetLocations } from "../servicess/tali";
import AssetAssignmentModal from "./AssetAssignmentModal";
import { Link } from "react-router-dom";
import axios from "axios";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { FaListUl } from "react-icons/fa";
import { FaTh } from "react-icons/fa";


const AssetCardView = () => {
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
  const itemsPerPage = 12; // Adjusted for card view (3x4 grid)

  // Helper function to get location name by ID
  const getLocationName = (locationId) => {
    const location = locations.find((loc) => loc._id === locationId);
    return location ? location.assetLocation : locationId; // fallback to ID if name not found
  };

  const getAssets = async (page = 1, filters = {}) => {
    try {
      setLoading(true);

      // Update your API call to include pagination parameters
      const params = {
        page: page,
        limit: itemsPerPage,
        ...filters,
      };

      const response = await apiGetAllAssets(params);
      console.log(response.data);

      // Assuming your API returns data in this structure:
      // { assets: [...], totalCount: number, totalPages: number, currentPage: number }
      setAssets(response.data.assets || response.data);
      setCurrentPage(response.data.currentPage || page);
      setTotalPages(
        response.data.totalPages ||
          Math.ceil(
            (response.data.totalCount || response.data.length) / itemsPerPage
          )
      );
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
      console.log("Locations:", response);
      setLocations(
        Array.isArray(response) ? response : response.locations || []
      );
    } catch (error) {
      console.error("Error fetching locations:", error);
    }
  };

  // Get unique location names for filter dropdown
  const uniqueLocationNames = [
    ...new Set(assets.map((asset) => getLocationName(asset.assetLocation))),
  ];

  const [summary, setSummary] = useState({
    totalAssets: 0,
    assetsAssigned: 0,
    categories: 0,
  });

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const token = localStorage.getItem("token");

        const [assetsRes, assignmentsRes] = await Promise.all([
          axios.get("https://backend-ps-tali.onrender.com/assets/count", {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get("https://backend-ps-tali.onrender.com/assignments/count", {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);

        setSummary({
          totalAssets: assetsRes.data.count,
          assetsAssigned: assignmentsRes.data.count,
          categories: 0,
        });

        console.log("Assets Response:", assetsRes.data);
      } catch (error) {
        console.error("Error fetching counts", error);
      }
    };

    fetchCounts();
  }, []);

  useEffect(() => {
    getAssets(1); // Load first page
    getLocations();
  }, []);

  // Handle filter changes
  useEffect(() => {
    // Reset to first page when filters change
    setCurrentPage(1);
    const filters = {};
    if (availabilityFilter) filters.status = availabilityFilter;
    if (locationFilter) filters.location = locationFilter;

    getAssets(1, filters);
  }, [availabilityFilter, locationFilter]);

  // Apply local filters (if needed for client-side filtering)
  const filteredAssets = assets.filter((item) => {
    const locationName = getLocationName(item.assetLocation);
    return (
      (availabilityFilter === "" || item.status === availabilityFilter) &&
      (locationFilter === "" || locationName === locationFilter)
    );
  });

  // Pagination handlers
  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages && page !== currentPage) {
      setCurrentPage(page);
      const filters = {};
      if (availabilityFilter) filters.status = availabilityFilter;
      if (locationFilter) filters.location = locationFilter;
      getAssets(page, filters);
    }
  };

  const handleDownloadPDF = async () => {
    try {
      // For PDF, get all assets without pagination
      const allAssetsResponse = await apiGetAllAssets({ limit: 1000 }); // Get all assets
      const allAssets = allAssetsResponse.data.assets || allAssetsResponse.data;

      const doc = new jsPDF();
      doc.text("All Assets", 14, 10);

      const tableColumn = [
        "Asset Name",
        "Quantity",
        "Location",
        "Availability",
      ];
      const tableRows = [];

      allAssets.forEach((asset) => {
        const assetData = [
          asset.assetName,
          asset.unit,
          getLocationName(asset.assetLocation),
          asset.status,
        ];
        tableRows.push(assetData);
      });

      doc.autoTable({
        head: [tableColumn],
        body: tableRows,
        startY: 20,
      });

      doc.save("assets.pdf");
    } catch (error) {
      console.error("Error generating PDF:", error);
    }
  };

  // Generate page numbers for pagination
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
    <div className="flex">
      <Sidebar1 />
      <div className="w-[80vw]">
        <Searchbar />
        <div className="bg-[#f0f1f3] min-h-[90%] space-y-5 py-6 px-4">
          {/* Top Summary Box */}
          <div className="bg-white p-4 rounded-md shadow-sm w-[78vw] border border-white">
            <p className="font-semibold text-[18px]">Assets</p>

            <div className="flex justify-between mb-3">
              <p className="text-[13px] text-gray-500">
                View and Manage Assets
              </p>
              <div className="flex text-[13px]">
                <Link
  to="/add-asset"
  className="px-2 py-1 rounded-sm bg-[#051b34] text-white border border-[#051b34] mr-5"
>
  Add Asset
</Link>

                <Link to="/assets" className="flex flex-row items-center gap-2 px-3 py-1 rounded-l-sm border border-gray-300 text-gray-600 cursor-pointer bg-[#051b34] text-white">
                  <span><FaListUl /></span>
                  <span>List View</span>
                </Link>
                <div className="flex flex-row items-center gap-2 px-3 py-1 rounded-r-sm border border-gray-300 text-gray-600 cursor-pointer">
                  <span><FaTh /></span>
                  <span>Card View</span>
                </div>
              </div>
            </div>

            <div className="bg-white p-4 rounded-md border-gray-300 border-[0.5px]">
              {/* Header Row with Buttons */}
              <div className="flex justify-between items-center mb-4 ">
                <div className="flex items-center gap-4">
                  <p className="font-semibold">Icon</p>
                  <p className="font-semibold">Total Assets: {totalAssets}</p>
                </div>
                <div className="flex gap-3 text-[13px]">
                  <div
                    className="flex items-center gap-2 px-3 py-1 rounded-sm border border-gray-300 text-gray-600 cursor-pointer"
                    onClick={() => setShowFilters(!showFilters)}
                  >
                    <IoFilterOutline />
                    <span>Filters</span>
                  </div>
                  <div
                    className="flex items-center gap-2 px-3 py-1 rounded-sm border border-gray-300 text-gray-600 cursor-pointer"
                    onClick={() => setShowFilters(!showFilters)}
                  >
                    <IoFilterOutline />
                    <span>Sort</span>
                  </div>
                </div>
              </div>
              <div className="border-b-[0.5px] border-gray-200"></div>
              
              {/* Filter Section */}
              {showFilters && (
                <div className="mb-4 flex gap-4 mt-4">
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
                      {uniqueLocationNames.map((locationName, index) => (
                        <option key={index} value={locationName}>
                          {locationName}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              )}

              {/* Loading Indicator */}
              {loading && (
                <div className="flex justify-center items-center py-8">
                  <div className="text-gray-600">Loading assets...</div>
                </div>
              )}

              {/* Card Grid */}
              {!loading && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                  {filteredAssets.map((item, index) => (
                    <div
                      key={index}
                      className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow duration-200"
                    >
                      <div className="flex gap-4">
                        {/* Asset Image - Left Side */}
                        <div className="flex-shrink-0">
                          <img
                            src={item.assetImage}
                            alt={item.assetName}
                            className="w-20 h-30 rounded-lg border-2 border-transparent object-cover shadow-sm"
                          />
                        </div>

                        {/* Asset Details - Right Side */}
                        <div className="flex-1 flex flex-col justify-between">
                          {/* Asset Name */}
                          <div className="mb-2">
                            <Link 
                              to={`/view-asset/${item._id}`} 
                              className="font-semibold text-gray-800 hover:text-blue-600 transition-colors text-sm"
                            >
                              {item.assetName}
                            </Link>
                            <p className="text-xs text-gray-500 mt-1">2025</p>
                          </div>

                          {/* Asset Details */}
                          <div className="space-y-1 mb-3">
                            <div className="flex justify-between items-center">
                              <span className="text-xs text-gray-500">VIN:</span>
                              <span className="text-xs text-gray-700 font-medium">{item.unit}</span>
                            </div>
                            
                            <div className="flex justify-between items-center">
                              <span className="text-xs text-gray-500">Location:</span>
                              <span className="text-xs text-gray-700 truncate ml-2">{getLocationName(item.assetLocation)}</span>
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

                          {/* Assign Button */}
                          <button
                            onClick={() => {
                              setSelectedAsset(item);
                              setIsAssignModalOpen(true);
                            }}
                            className=" py-1.5 text-xs bg-[#051b34] text-white rounded-md hover:bg-[#0a2a4a] transition-colors duration-200"
                          >
                            Assign Asset
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* No data message */}
              {!loading && filteredAssets.length === 0 && (
                <div className="flex justify-center items-center py-16">
                  <div className="text-center">
                    <div className="text-gray-400 text-4xl mb-4">📦</div>
                    <div className="text-gray-600 font-medium">No assets found</div>
                    <div className="text-gray-500 text-sm mt-1">
                      Try adjusting your filters or add a new asset
                    </div>
                  </div>
                </div>
              )}

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-between items-center mt-8 pt-4 border-t border-gray-200">
                  <div className="text-sm text-gray-600">
                    Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, totalAssets)} of {totalAssets} assets
                  </div>

                  <div className="flex items-center gap-2">
                    {/* Previous Button */}
                    <button
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                      className={`flex items-center gap-1 px-3 py-1 rounded text-sm ${
                        currentPage === 1
                          ? "text-gray-400 cursor-not-allowed"
                          : "text-gray-600 hover:bg-gray-100 cursor-pointer"
                      }`}
                    >
                      <IoChevronBackOutline />
                      Previous
                    </button>

                    {/* Page Numbers */}
                    <div className="flex gap-1">
                      {/* First page */}
                      {getPageNumbers()[0] > 1 && (
                        <>
                          <button
                            onClick={() => handlePageChange(1)}
                            className="px-3 py-1 rounded text-sm text-gray-600 hover:bg-gray-100"
                          >
                            1
                          </button>
                          {getPageNumbers()[0] > 2 && (
                            <span className="px-2 py-1 text-gray-400">...</span>
                          )}
                        </>
                      )}

                      {/* Visible page numbers */}
                      {getPageNumbers().map((page) => (
                        <button
                          key={page}
                          onClick={() => handlePageChange(page)}
                          className={`px-3 py-1 rounded text-sm ${
                            page === currentPage
                              ? "bg-[#1366d9] text-white"
                              : "text-gray-600 hover:bg-gray-100"
                          }`}
                        >
                          {page}
                        </button>
                      ))}

                      {/* Last page */}
                      {getPageNumbers()[getPageNumbers().length - 1] <
                        totalPages && (
                        <>
                          {getPageNumbers()[getPageNumbers().length - 1] <
                            totalPages - 1 && (
                            <span className="px-2 py-1 text-gray-400">...</span>
                          )}
                          <button
                            onClick={() => handlePageChange(totalPages)}
                            className="px-3 py-1 rounded text-sm text-gray-600 hover:bg-gray-100"
                          >
                            {totalPages}
                          </button>
                        </>
                      )}
                    </div>

                    {/* Next Button */}
                    <button
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage === totalPages}
                      className={`flex items-center gap-1 px-3 py-1 rounded text-sm ${
                        currentPage === totalPages
                          ? "text-gray-400 cursor-not-allowed"
                          : "text-gray-600 hover:bg-gray-100 cursor-pointer"
                      }`}
                    >
                      Next
                      <IoChevronForwardOutline />
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
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

export default AssetCardView;