import React, { useEffect, useState } from "react";
import { FiArrowLeft } from "react-icons/fi";
import Sidebar1 from "../components/Sidebar1";
import Searchbar from "../components/Searchbar";
import { 
  apiGetLocations, 
  apiApproveAsset, 
  apiRejectAsset, 
  apiGetUnapprovedAssets, 
  apiGetLocationStats 
} from "../servicess/tali";
import useLocationName from "../hooks/useLocationName";
import { Link } from "react-router-dom";

const AssetApprovals = () => {
  const [assignments, setAssignments] = useState([]);
  const [filteredAssignments, setFilteredAssignments] = useState([]);
  const [locations, setLocations] = useState([]);
  const [filterVisible, setFilterVisible] = useState(false);
  const [filterLocation, setFilterLocation] = useState("");
  const [filterAsset, setFilterAsset] = useState("");
  const [showDownloadOptions, setShowDownloadOptions] = useState(false);
  const [totalUnapproved, setTotalUnapproved] = useState(0);
  const [totalAssignedAssets, setTotalAssignedAssets] = useState(0);
  const [loading, setLoading] = useState(false);
  const { getLocationName } = useLocationName();

  // Helper function to get location name from populated or ID field
  const getLocationDisplayName = (locationField) => {
    if (!locationField) return "—";
    
    // If it's a populated object
    if (typeof locationField === 'object' && locationField.assetLocation) {
      return locationField.assetLocation;
    }
    
    // If it's just an ID, use the hook
    if (typeof locationField === 'string') {
      return getLocationName(locationField);
    }
    
    return "—";
  };

  useEffect(() => {
    const fetchAssignments = async () => {
      try {
        setLoading(true);
        const data = await apiGetUnapprovedAssets();
        console.log("Unapproved assets response:", data); // Debug log
        
        setAssignments(data.assets || []);
        setFilteredAssignments(data.assets || []);
        setTotalUnapproved(data.totalUnapproved || data.total || 0);
      } catch (error) {
        console.error("Error fetching unapproved assets:", error);
        setAssignments([]);
        setFilteredAssignments([]);
      } finally {
        setLoading(false);
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

    const fetchTotalAssignmentCount = async () => {
      try {
        const data = await apiGetLocationStats();
        setTotalAssignedAssets(data.totalAssetsWithAssetLocation || 0);
      } catch (error) {
        console.error("Error fetching total assignment count:", error);
      }
    };

    fetchAssignments();
    fetchLocations();
    fetchTotalAssignmentCount();
  }, []);

  const handleFilter = () => {
    const filtered = assignments.filter((item) => {
      const locationMatch = filterLocation
        ? getLocationDisplayName(item.assetLocation) === filterLocation
        : true;
      const assetMatch = filterAsset
        ? item.assetName?.toLowerCase().includes(filterAsset.toLowerCase())
        : true;
      return locationMatch && assetMatch;
    });
    setFilteredAssignments(filtered);
  };

  const handleReset = () => {
    setFilterLocation("");
    setFilterAsset("");
    setFilteredAssignments(assignments);
  };

  const handleApprove = async (assetId) => {
    try {
      await apiApproveAsset(assetId);
      alert("Asset approved successfully");

      // Remove approved item from list - use _id consistently
      const updatedAssignments = assignments.filter(
        (item) => item._id !== assetId
      );
      setAssignments(updatedAssignments);
      setFilteredAssignments(updatedAssignments);
      setTotalUnapproved(prev => Math.max(0, prev - 1));
    } catch (error) {
      console.error("Approval failed:", error);
      alert("Approval failed. Please try again.");
    }
  };

  const handleReject = async (assetId) => {
    try {
      await apiRejectAsset(assetId);
      alert("Asset rejected successfully");

      // Remove rejected item from the lists
      const updatedAssignments = assignments.filter(
        (item) => item._id !== assetId
      );

      setAssignments(updatedAssignments);
      setFilteredAssignments(updatedAssignments);
      setTotalUnapproved(prev => Math.max(0, prev - 1));
    } catch (error) {
      console.error("Rejection failed:", error);
      alert("Rejection failed. Please try again.");
    }
  };

  return (
    <div className="flex w-full overflow-x-hidden">
      <div className="bg-[#f0f1f3] min-h-screen flex-1 space-y-5 py-6 px-4">
        <div className="flex gap-2">
          <p className="font-semibold">Asset Approvals</p>
        </div>

        <div className="bg-white p-4 rounded-md shadow-sm w-full border border-white">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-2 text-[16px]">
              <p>Total Unapproved Assets:</p>
              <p className="text-sm text-black">{totalUnapproved}</p>
            </div>

            <div className="flex items-center gap-3">
              <button
                className="flex items-center gap-2 px-3 py-1 rounded-sm border border-gray-300 text-gray-600 cursor-pointer"
                onClick={() => setFilterVisible(!filterVisible)}
              >
                Filter
              </button>

              <div className="relative">
                <button
                  className="px-2 py-1 rounded-sm border border-gray-300 text-gray-600"
                  onClick={() => setShowDownloadOptions((prev) => !prev)}
                >
                  Download
                </button>
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

          <div className="grid grid-cols-6 font-semibold text-[14px] text-gray-700 pb-2 border-b-2 border-gray-200 mt-6">
            <p>Asset</p>
            <p>VIN</p>
            <p>Current Location</p>
            <p>New Location</p>
            <p>Assigned By</p>
            <p>Actions</p>
          </div>

          {loading ? (
            <div className="flex justify-center items-center py-8">
              <p className="text-gray-500">Loading...</p>
            </div>
          ) : filteredAssignments.length > 0 ? (
            filteredAssignments.map((item, index) => (
              <div
                key={item._id || index}
                className="grid grid-cols-6 items-center text-[13px] text-gray-600 py-3 border-b border-gray-200"
              >
                <div className="flex items-center gap-2">
                  <Link 
                                      to={`/dashboard/approvals/${item._id || item.assignmentId}`}>
                  <img
                    src={item.assetImage || "/default-asset.png"}
                    alt=""
                    className="w-8 h-8 rounded-full object-cover"
                    onError={(e) => {
                      e.target.src = "/default-asset.png";
                    }}
                  />
                  </Link>
                    <Link 
                                      to={`/dashboard/approvals/${item._id || item.assignmentId}`} className="hover:text-blue-600 transition-colors cursor-pointer">
                  <span>{item.assetName || "—"}</span>
                  </Link>
                </div>
                <p>{item.assetId || "—"}</p>
                <p>{getLocationDisplayName(item.assetLocation)}</p>
                <p>{getLocationDisplayName(item.newLocation)}</p>
                <p>{item.inspectedBy?.userName || item.inspectedBy || "—"}</p>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleApprove(item._id)}
                    className="border-[0.5px] px-2 py-1 rounded-sm bg-[#46A46C] border-[#46A46C] text-white text-[13px] hover:bg-[#3a8a59] transition-colors"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => handleReject(item._id)}
                    className="border border-red-500 bg-red-500 text-white px-2 py-1 rounded-sm text-[13px] hover:bg-red-600 transition-colors"
                  >
                    Reject
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-sm text-gray-500 mt-4 flex justify-center py-8">
              No unapproved assets found.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AssetApprovals;