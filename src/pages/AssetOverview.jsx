import React, { useEffect, useState } from "react";
import AssetSummaryChart from "./AssetSummaryChart";
import AssetManagementGraph from "./AssetManagementGraph";
import axios from "axios";

import Taxi from "../assets/images/local_taxi.png";
import Way from "../assets/images/Way.png";
import Users from "../assets/images/Users.png";
import Goods from "../assets/images/Quantity.png";
import location from "../assets/images/location.png";
import Pending from "../assets/images/Pending.png";
import Total from "../assets/images/Total.png";


const AssetOverview = () => {
  const [assetCount, setAssetCount] = useState(0);
  const [assignmentCount, setAssignmentCount] = useState(0);

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const assetRes = await axios.get("https://backend-ps-tali.onrender.com/assets/count");
        const assignmentRes = await axios.get("https://backend-ps-tali.onrender.com/assignments/count");

        setAssetCount(assetRes.data.count || 0);
        setAssignmentCount(assignmentRes.data.count || 0);
      } catch (error) {
        console.error("Error fetching counts:", error);
      }
    };

    fetchCounts();
  }, []);

  const assetData = [
    { icon: Taxi, count: 823, label: "Cars" },
    { icon: Goods, count: 423, label: "Goods" },
    { icon: Goods, count: 156, label: "Equipment" },
    { icon: Goods, count: 89, label: "Furniture" },
  ];

  const assignmentData = [
    { icon: location, count: 82, label: "locations" },
    { icon: Pending, count: 56, label: "Pending Approvals" },
    { icon: Total, count: assetCount, label: "Total Assets" }, // updated
    { icon: Users, count: 43, label: "Users" },
  ];

  const summaryData = [
    { icon: Way, count: assignmentCount, label: "Asset Assigned" }, // updated
    { icon: Way, count: 423, label: "Asset In Store" },
    { icon: Way, count: 31, label: "Number of User" },
    { icon: Way, count: 26, label: "Number of Assigns" },
  ];

  return (
    <div className="h-full bg-gray-50">
      <div className="max-w-7xl mx-auto h-full">
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-3 h-full">
          {/* Left Column - Main Content */}
          <div className="xl:col-span-2 space-y-3">
            {/* Asset Overview Card */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-3">
              <h2 className="text-base font-semibold text-gray-900 mb-3">Asset Overview</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {assetData.map((item, index) => (
                  <div key={index} className="flex flex-col items-center">
                    <div className="w-8 h-8 flex items-center justify-center mb-2">
                      <img src={item.icon} alt={item.label} className="w-5 h-5" />
                    </div>
                    <div className="text-center">
                      <p className="text-sm font-bold text-gray-900">{item.count}</p>
                      <p className="text-xs text-gray-500">{item.label}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Assignments Overview Card */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-3">
              <h2 className="text-base font-semibold text-gray-900 mb-3">Assignments Overview</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {assignmentData.map((item, index) => (
                  <div key={index} className="flex flex-col items-center">
                    <div className="w-8 h-8 flex items-center justify-center mb-2">
                      <img src={item.icon} alt={item.label} className="w-5 h-5" />
                    </div>
                    <div className="text-center">
                      <p className="text-sm font-bold text-gray-900">{item.count}</p>
                      <p className="text-xs text-gray-500">{item.label}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Asset Management Graph */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 flex-1 min-h-0">
              <AssetManagementGraph />
            </div>
          </div>

          {/* Right Column - Summary and Chart */}
          <div className="space-y-3">
            {/* Asset Summary Card */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-3 h-[48%]">
              <h2 className="text-base font-semibold text-gray-900 mb-3">Asset Summary</h2>
              <div className="grid grid-cols-2 gap-3 mt-9">
                {summaryData.map((item, index) => (
                  <div key={index} className="flex flex-col items-center">
                    <div className="w-6 h-6 flex items-center justify-center mb-3">
                      <img src={item.icon} alt={item.label} className="w-5 h-5" />
                    </div>
                    <div className="text-center">
                      <p className="text-sm font-bold text-gray-900">{item.count}</p>
                      <p className="text-xs text-gray-500 text-center leading-tight">{item.label}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Asset Summary Chart */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 flex-1 min-h-0">
              <AssetSummaryChart />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssetOverview;
