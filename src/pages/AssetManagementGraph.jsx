import React, { useEffect, useState } from "react";
import useLocationName from "../hooks/useLocationName"; // Adjust path if needed
import { apiGetAllAssets } from "../servicess/tali"; // Adjust import path if needed

const AssetManagementTable = () => {
  const [recentAssets, setRecentAssets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { getLocationName } = useLocationName();

  useEffect(() => {
    const fetchRecentAssets = async () => {
      try {
        const response = await apiGetAllAssets();
        const allAssets = response.data.assets || [];
console.log("API response:", response.data);
        // Ensure assets have a createdAt field and sort by it
        const sortedAssets = allAssets.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );

        setRecentAssets(sortedAssets.slice(0, 5)); // Get only the last 5
      } catch (err) {
        console.error("Failed to fetch assets:", err);
        setError("Failed to load recent assets.");
      } finally {
        setLoading(false);
      }
    };

    fetchRecentAssets();
  }, []);

  return (
    <div className="border-2 bg-white border-white p-4 rounded-md shadow-sm">
      <div className="flex flex-row justify-between mb-2">
        <p className="font-semibold">Recently Added</p>
        <p className="border-[0.05px] border-gray-400 py-1 px-5 rounded-sm text-[14px] text-gray-600">
          Latest
        </p>
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
                  <td className="py-1 pr-4">{getLocationName(item.assetLocation) || "—"}</td>
                  <td className="py-1">{item.assetId || "—"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <div className="flex gap-6 mt-3 px-4">
        <span className="text-sm text-gray-500">Table shows 5 most recent assets</span>
      </div>
    </div>
  );
};

export default AssetManagementTable;
