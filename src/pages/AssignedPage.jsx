import React, { useEffect, useState } from "react";
import { FiArrowLeft } from "react-icons/fi";
import Sidebar1 from "../components/Sidebar1";
import Searchbar from "../components/Searchbar";
import { 
  apiGetLocations, 
  apiGetLocationAssignments, 
  apiGetLocationStats 
} from "../servicess/tali";

const AssignedPage = () => {
  const [assignments, setAssignments] = useState([]);
  const [filteredAssignments, setFilteredAssignments] = useState([]);
  const [locations, setLocations] = useState([]);
  const [filterVisible, setFilterVisible] = useState(false);
  const [filterLocation, setFilterLocation] = useState("");
  const [filterAsset, setFilterAsset] = useState("");
  const [showDownloadOptions, setShowDownloadOptions] = useState(false);
  const [showSortDropdown, setShowSortDropdown] = useState(false);
  const [sortOption, setSortOption] = useState("recent");
  const [totalAssignedAssets, setTotalAssignedAssets] = useState(0);

 useEffect(() => {
  const fetchAssignments = async () => {
    try {
      const data = await apiGetLocationAssignments();
      console.log("Assignments data:", data); // Debug log
      setAssignments(data.assets || data);
      setFilteredAssignments(data.assets || data);
      
      // ✅ Set the total count from the API response
      if (data.count !== undefined) {
        setTotalAssignedAssets(data.count);
      } else if (data.assets) {
        setTotalAssignedAssets(data.assets.length);
      } else if (Array.isArray(data)) {
        setTotalAssignedAssets(data.length);
      }
    } catch (error) {
      console.error("Error fetching assignments:", error);
    }
  };

  const fetchLocations = async () => {
    try {
      const response = await apiGetLocations();
      const locs = Array.isArray(response)
        ? response
        : response.locations || [];
      setLocations(locs);
    } catch (error) {
      console.error("Error fetching locations:", error);
    }
  };

    fetchAssignments();
    fetchLocations();
  }, []);

  // Apply sorting to assignments
  const applySorting = (assignmentsToSort) => {
    if (!Array.isArray(assignmentsToSort)) {
      return [];
    }

    let sortedAssignments = [...assignmentsToSort];

    switch (sortOption) {
      case "recent":
        sortedAssignments.sort((a, b) => {
          if (!a || !b) return 0;
          return new Date(b.createdAt || 0) - new Date(a.createdAt || 0);
        });
        break;
      case "alphabetical":
        sortedAssignments.sort((a, b) => {
          if (!a || !b) return 0;
          return (a.assetName || "").localeCompare(b.assetName || "");
        });
        break;
      case "reverse":
        sortedAssignments.sort((a, b) => {
          if (!a || !b) return 0;
          return (b.assetName || "").localeCompare(a.assetName || "");
        });
        break;
      default:
        break;
    }

    return sortedAssignments;
  };

  const handleFilter = () => {
    let filtered = assignments.filter((item) => {
      const locationMatch = filterLocation
        ? item.assetLocation?.assetLocation === filterLocation ||
          item.newLocation?.assetLocation === filterLocation
        : true;
      const assetMatch = filterAsset
        ? item.assetName?.toLowerCase().includes(filterAsset.toLowerCase())
        : true;
      return locationMatch && assetMatch;
    });

    // Apply sorting to filtered results
    filtered = applySorting(filtered);
    setFilteredAssignments(filtered);
  };

  const handleReset = () => {
    setFilterLocation("");
    setFilterAsset("");
    const sortedAssignments = applySorting(assignments);
    setFilteredAssignments(sortedAssignments);
  };

  const handleSortChange = (newSortOption) => {
    setSortOption(newSortOption);
    setShowSortDropdown(false);
    
    // Apply new sorting to current filtered assignments
    const sortedAssignments = applySorting(filteredAssignments);
    setFilteredAssignments(sortedAssignments);
  };

  // Re-apply sorting when sortOption changes or assignments are loaded
  useEffect(() => {
    if (assignments.length > 0) {
      const sortedAssignments = applySorting(filteredAssignments);
      setFilteredAssignments(sortedAssignments);
    }
  }, [sortOption]);

  const handleDownload = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        "https://backend-ps-tali.onrender.com/assets/locations/xlsx",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to download: ${response.status}`);
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "asset_locations.xlsx";
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Download failed:", error);
      alert("Failed to download file");
    }
  };

  const handleDownloadCSV = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        "https://backend-ps-tali.onrender.com/assets/locations/csv",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to download CSV: ${response.status}`);
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "asset_locations.csv";
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("CSV Download failed:", error);
      alert("Failed to download CSV file");
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".download-dropdown")) {
        setShowDownloadOptions(false);
      }
      if (!event.target.closest(".sort-dropdown")) {
        setShowSortDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Helper function to determine if an asset has been reassigned
  const hasLocationChange = (item) => {
    return item.newLocation && item.assignedBy;
  };

  // Helper function to get previous location
  const getPreviousLocation = (item) => {
    if (hasLocationChange(item)) {
      return item.assetLocation?.assetLocation || "—";
    }
    return "—";
  };

  // Helper function to get current location - FIXED VERSION
const getCurrentLocation = (item) => {
  if (hasLocationChange(item)) {
    return item.newLocation || "—"; // ✅ Direct access to string value
  }
  return item.assetLocation?.assetLocation || "—"; // ✅ Access the original location
};

  return (
    <div className="flex w-full overflow-x-hidden">
      <div className="bg-[#f0f1f3] min-h-screen flex-1 space-y-5 py-6 px-4">
        <div className="flex gap-2">
          <p><FiArrowLeft className="w-5 h-5 mt-1" /></p>
          <p className="font-semibold">Assets Assigned</p>
        </div>

        <div className="bg-white p-4 rounded-md shadow-sm w-full border border-white">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-2 text-[16px]">
              <p>Total Assigned Asset:</p>
              <p className="text-sm text-black">{totalAssignedAssets}</p>
            </div>

            <div className="flex items-center gap-3">
              <button
                className="flex items-center gap-2 px-3 py-1 rounded-sm border border-gray-300 text-gray-600 cursor-pointer"
                onClick={() => setFilterVisible(!filterVisible)}
              >
                Filter
              </button>

              <div className="relative sort-dropdown">
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

              <div className="relative">
                <button
                  className="px-2 py-1 rounded-sm border border-gray-300 text-gray-600"
                  onClick={() => setShowDownloadOptions((prev) => !prev)}
                >
                  Download
                </button>

                {showDownloadOptions && (
                  <div className="absolute right-0 mt-2 w-40 bg-white border rounded shadow z-10 download-dropdown">
                    <button
                      onClick={handleDownload}
                      className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                    >
                      Download as Excel (XLSX)
                    </button>
                    <button
                      onClick={handleDownloadCSV}
                      className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                    >
                      Download as CSV
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

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

          <div className="flex justify-between font-semibold text-[14px] text-gray-700 pb-2 border-b-2 border-gray-200 mt-6">
            <p className="w-1/5">Asset</p>
            <p className="w-1/5">VIN</p>
            <p className="w-1/5">Previous Location</p>
            <p className="w-1/5">New Location</p>
            <p className="w-1/5">Assigned By</p>
          </div>

          {filteredAssignments.length > 0 ? (
            filteredAssignments.map((item, index) => (
              <div
                key={index}
                className="flex justify-between text-[13px] text-gray-600 py-3 border-b border-gray-200"
              >
                <div className="w-1/5 flex items-center">
                  <img 
                    src={item.assetImage} 
                    alt={item.assetName} 
                    className="w-10 h-10 rounded-full mr-3 object-cover" 
                  />
                  <p>{item.assetName || "—"}</p>
                </div>
                <p className="w-1/5 flex items-center">{item.assetId || "—"}</p>
                <p className="w-1/5 flex items-center">
                  {getPreviousLocation(item)}
                </p>
                <p className="w-1/5 flex items-center">
                  {getCurrentLocation(item)}
                </p>
                <div className="w-1/5 flex items-center">
                  {item.assignedBy ? (
                    <div className="flex items-center">
                      {item.assignedBy.profilePicture && (
                        <img 
                          src={item.assignedBy.profilePicture} 
                          alt={item.assignedBy.userName}
                          className="w-6 h-6 rounded-full mr-2 object-cover" 
                        />
                      )}
                      <span>{item.assignedBy.userName}</span>
                    </div>
                  ) : (
                    "—"
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="text-center text-sm text-gray-400 py-6">
              No assignments found.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AssignedPage;