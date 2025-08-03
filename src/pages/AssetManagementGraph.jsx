import React, { useEffect, useState } from "react";
import useLocationName from "../hooks/useLocationName";
import { apiGetAllAssets } from "../servicess/tali";
import useUserName from "../hooks/useUserName";

const AssetManagementTable = () => {
  const [recentAssets, setRecentAssets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedPeriod, setSelectedPeriod] = useState("Latest");

  const { getLocationName } = useLocationName();
  const { getUserName } = useUserName();

  const isWithinPeriod = (dateStr, period) => {
    const date = new Date(dateStr);
    const now = new Date();

    switch (period) {
      case "This Week": {
        const startOfWeek = new Date(now.setDate(now.getDate() - now.getDay()));
        return date >= startOfWeek;
      }
      case "This Month": {
        return (
          date.getMonth() === now.getMonth() &&
          date.getFullYear() === now.getFullYear()
        );
      }
      case "This Year": {
        return date.getFullYear() === now.getFullYear();
      }
      default:
        return true; // For "Latest"
    }
  };

  const fetchRecentAssets = async (period = "Latest") => {
    setLoading(true);
    setError(null);

    try {
      const response = await apiGetAllAssets();
      const allAssets = response.data.assets || [];

      const filteredAssets = allAssets.filter((asset) =>
        isWithinPeriod(asset.createdAt, period)
      );

      const sortedAssets = filteredAssets.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );

      const limitedAssets =
        period === "Latest" || period === "This Week"
          ? sortedAssets.slice(0, 5)
          : sortedAssets;

      setRecentAssets(limitedAssets);
    } catch (err) {
      console.error("Failed to fetch assets:", err);
      setError("Failed to load recent assets.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecentAssets(selectedPeriod);
  }, [selectedPeriod]);

  // Helper function to safely extract location ID
  const getLocationId = (assetLocation) => {
    if (typeof assetLocation === 'string') {
      return assetLocation;
    }
    if (assetLocation && typeof assetLocation === 'object') {
      return assetLocation._id || assetLocation.id;
    }
    return null;
  };

  // Helper function to safely get location name
  const getLocationDisplay = (assetLocation) => {
    // If it's already populated with location name
    if (assetLocation && typeof assetLocation === 'object' && assetLocation.assetLocation) {
      return assetLocation.assetLocation;
    }
    // Otherwise, use the hook to get the name
    const locationId = getLocationId(assetLocation);
    return locationId ? getLocationName(locationId) : "—";
  };

  return (
    <div className="border-2 bg-white border-white p-4 rounded-md shadow-sm">
      {/* Header */}
      <div className="flex flex-row justify-between mb-2">
        <p className="font-semibold">Recently Added</p>
        <select
          value={selectedPeriod}
          onChange={(e) => setSelectedPeriod(e.target.value)}
          className="border-[0.05px] border-gray-400 py-1 px-3 rounded-sm text-[14px] text-gray-600 bg-white shadow-sm"
        >
          <option value="Latest">Latest</option>
          <option value="This Week">This Week</option>
          <option value="This Month">This Month</option>
          <option value="This Year">This Year</option>
        </select>
      </div>

      {/* Scrollable Table Container */}
      <div
        className={`w-full overflow-y-auto ${
          selectedPeriod === "Latest" || selectedPeriod === "This Week"
            ? "h-48"
            : "h-72"
        }`}
      >
        {loading ? (
  <p className="text-gray-500 px-2">Loading...</p>
) : error ? (
  <p className="text-red-500 px-2">{error}</p>
) : recentAssets.length === 0 ? (
  <div className="flex items-center justify-center h-full text-gray-500 px-2 text-md">
    {selectedPeriod === "This Week"
      ? "No recent assets found this week."
      : selectedPeriod === "This Month"
      ? "No recent assets found this month."
      : "No recent assets found."}
  </div>
) : (
  <table className="min-w-full text-sm text-left border-t border-gray-200">
    <thead className="text-gray-600">
      <tr>
        <th className="py-2 px-4">Asset Name</th>
        <th className="py-2 px-4">Location</th>
        <th className="py-2 px-4">VIN</th>
        <th className="py-2 px-4">Origin</th>
        <th className="py-2 px-4">Date</th>
        <th className="py-2 px-4">Inspected By</th>
      </tr>
    </thead>
    <tbody className="text-gray-800">
      {recentAssets.map((item, index) => (
        <tr key={index} className="border-t border-gray-100">
          <td className="py-2 px-4">{item.assetName || "—"}</td>
          <td className="py-2 px-4">
            {getLocationDisplay(item.assetLocation)}
          </td>
          <td className="py-2 px-4">{item.assetId || "—"}</td>
          <td className="py-2 px-4">{item.origin || "—"}</td>
          <td className="py-2 px-4">{item.dateUploaded || "—"}</td>
          <td className="py-2 px-4">
            {item.approvedBy && typeof item.approvedBy === 'object' 
              ? item.approvedBy.userName || "—"
              : item.approvedBy || "—"
            }
          </td>
        </tr>
      ))}
    </tbody>
  </table>
)}

      </div>

      {/* Footer */}
      <div className="flex gap-6 mt-3 px-4">
        <span className="text-sm text-gray-500">
          Table shows{" "}
          {selectedPeriod === "Latest" || selectedPeriod === "This Week"
            ? "5 most recent assets"
            : "all assets"}{" "}
          based on:{" "}
          <span className="font-medium text-gray-700">{selectedPeriod}</span>
        </span>
      </div>
    </div>
  );
};

export default AssetManagementTable;

// Also update your AssetOverview.jsx - replace the location handling section:
// In the fetchData useEffect, update this part:

/*
// Handle recently added assets by location
const assets = dashboardRes.data?.recentlyAdded || [];
const locationCountMap = {};
assets.forEach((item) => {
  // Handle both populated and non-populated location objects
  let locationId;
  if (item.assetLocation) {
    if (typeof item.assetLocation === 'string') {
      locationId = item.assetLocation;
    } else if (typeof item.assetLocation === 'object') {
      locationId = item.assetLocation._id || item.assetLocation.id;
    }
    
    if (locationId) {
      locationCountMap[locationId] = (locationCountMap[locationId] || 0) + 1;
    }
  }
});

const formattedData = Object.entries(locationCountMap)
  .map(([locationId, count]) => ({
    icon: (
      <FontAwesomeIcon
        icon={faLocationDot}
        className="text-blue-500 text-xl"
      />
    ),
    count,
    label: getLocationName(locationId),
  }))
  .slice(0, 4);

setSummaryData(formattedData);
*/