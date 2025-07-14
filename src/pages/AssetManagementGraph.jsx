import React, { useEffect, useState } from "react";
import useLocationName from "../hooks/useLocationName";
import { apiGetAllAssets } from "../servicess/tali";

const AssetManagementTable = () => {
  const [recentAssets, setRecentAssets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { getLocationName } = useLocationName();
  const [selectedPeriod, setSelectedPeriod] = useState("Latest");

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
          date.getMonth() === new Date().getMonth() &&
          date.getFullYear() === new Date().getFullYear()
        );
      }
      case "This Year": {
        return date.getFullYear() === new Date().getFullYear();
      }
      default:
        return true; // Latest
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

      const sortedAssets = filteredAssets
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .slice(0, 5);

      setRecentAssets(sortedAssets);
    } catch (err) {
      console.error("Failed to fetch assets:", err);
      setError("Failed to load recent assets.");
    } finally {
      setLoading(false);
    }
  };

  // Re-fetch on dropdown change
  useEffect(() => {
    fetchRecentAssets(selectedPeriod);
  }, [selectedPeriod]);

  return (
    <div className="border-2 bg-white border-white p-4 rounded-md shadow-sm">
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

      <div className="h-48 w-full overflow-y-auto">
        {loading ? (
          <p className="text-gray-500 px-2">Loading...</p>
        ) : error ? (
          <p className="text-red-500 px-2">{error}</p>
        ) : (
          <table className="min-w-full text-sm text-left border-t border-gray-200">
            <thead className="text-gray-600">
              <tr>
                <th className="py-1 pr-4">Asset Name</th>
                <th className="py-1 pr-4">Status</th>
                <th className="py-1 pr-4">Location</th>
                <th className="py-1">Asset ID</th>
              </tr>
            </thead>
            <tbody className="text-gray-800">
              {recentAssets.map((item, index) => (
                <tr key={index} className="border-t border-gray-100">
                  <td className="py-1 pr-4">{item.assetName || "—"}</td>
                  <td className="py-1 pr-4">{item.status || "—"}</td>
                  <td className="py-1 pr-4">
                    {getLocationName(item.assetLocation) || "—"}
                  </td>
                  <td className="py-1">{item.assetId || "—"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <div className="flex gap-6 mt-3 px-4">
        <span className="text-sm text-gray-500">
          Table shows 5 most recent assets based on:{" "}
          <span className="font-medium text-gray-700">{selectedPeriod}</span>
        </span>
      </div>
    </div>
  );
};

export default AssetManagementTable;
