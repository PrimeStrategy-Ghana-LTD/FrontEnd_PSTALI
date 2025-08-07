import React, { useEffect, useState } from "react";
import { apiGetAllAssets } from "../servicess/tali";

const RecentAssetAdded = () => {
  const [assets, setAssets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchRecentAssets = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await apiGetAllAssets();
      const allAssets = response.data.assets || [];

      const sortedAssets = allAssets
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .slice(0, 5); // Get only 5 most recent

      setAssets(sortedAssets);
    } catch (err) {
      console.error("Failed to fetch assets:", err);
      setError("Failed to load recent assets.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecentAssets();
  }, []);

  const formatYear = (dateStr) => {
    if (!dateStr) return "—";
    const date = new Date(dateStr);
    return date.getFullYear();
  };

  return (
    <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200 w-50 ml-[45%]">
      <h3 className="font-semibold text-gray-800 mb-4 text-lg">Recent Asset Added</h3>

      {loading ? (
        <p className="text-gray-500 text-sm">Loading...</p>
      ) : error ? (
        <p className="text-red-500 text-sm">{error}</p>
      ) : assets.length === 0 ? (
        <p className="text-gray-500 text-sm">No recent assets found.</p>
      ) : (
        <div className="space-y-4">
          {assets.map((asset, index) => (
            <div key={index} className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center border border-gray-200 flex-shrink-0 overflow-hidden">
                {asset.assetImage ? (
                  <img
                    src={asset.assetImage}
                    alt={asset.assetName}
                    className="w-full h-full object-cover rounded-full"
                  />
                ) : (
                  <div
                    className="w-8 h-8 bg-gray-300 rounded-full"
                    style={{
                      backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='%236B7280' viewBox='0 0 24 24'%3E%3Cpath d='M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.22.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z'/%3E%3C/svg%3E")`,
                      backgroundSize: "cover",
                      backgroundPosition: "center"
                    }}
                  ></div>
                )}
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-medium text-gray-800">{asset.assetName || "—"}</span>
                <span className="text-sm font-medium text-gray-400">{formatYear(asset.createdAt)}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RecentAssetAdded;
