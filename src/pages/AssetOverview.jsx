import React, { useEffect, useState } from "react";
import AssetSummaryChart from "./AssetSummaryChart";
import AssetManagementGraph from "./AssetManagementGraph";
import axios from "axios";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCar,
  faBoxOpen,
  faBox,
  faLocationDot,
  faIdCard,
  faSignal,
  faCircleUser,
} from "@fortawesome/free-solid-svg-icons";

import Taxi from "../assets/images/local_taxi.png";
import loc from "../assets/images/loc.svg";
import group from "../assets/images/group.svg";
import houses from "../assets/images/Houses.svg";
import location from "../assets/images/location.png";
import cancel from "../assets/images/cancel.svg";
import profit from "../assets/images/profit.svg";
import useLocationName from "../hooks/useLocationName";

const AssetOverview = () => {
  const [assetCount, setAssetCount] = useState(0);
  const [assignmentDataState, setAssignmentDataState] = useState({
    totalAssignments: 0,
    pendingApprovals: 0,
    locations: 0,
    totalUsers: 0,
  });
  const [summaryData, setSummaryData] = useState([]);
  const [categoryStats, setCategoryStats] = useState({
    "Cars": 0,
    "Goods 1": 0,
    "Goods 2": 0,
    "Goods 3": 0
  });
  const { getLocationName } = useLocationName();
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [assetRes, dashboardRes, categoryStatsRes] = await Promise.all([
          axios.get("https://backend-ps-tali.onrender.com/assets/count"),
          axios.get("https://backend-ps-tali.onrender.com/dashboard/get"),
          axios.get("https://backend-ps-tali.onrender.com/assets/stats/category")
        ]);

        // Update asset count
        setAssetCount(assetRes.data.count || 0);

        // Update category stats - NEW IMPLEMENTATION
        if (categoryStatsRes.data?.stats) {
          const newStats = {
            "Cars": 0,
            "Goods 1": 0,
            "Goods 2": 0,
            "Goods 3": 0
          };
          
          categoryStatsRes.data.stats.forEach(stat => {
            if (stat.category in newStats) {
              newStats[stat.category] = stat.count;
            }
          });
          
          setCategoryStats(newStats);
        }

        // Handle assignment overview from dashboard
        const assignmentOverview = dashboardRes.data.assignmentOverview;
        setAssignmentDataState({
          totalAssignments: assignmentOverview?.totalAssignments || 0,
          pendingApprovals: assignmentOverview?.pendingApprovals || 0,
          locations: assignmentOverview?.locations || 0,
          totalUsers: assignmentOverview?.totalUsers || 0,
        });

        // Handle recently added assets by location
        const assets = dashboardRes.data?.recentlyAdded || [];
        const locationCountMap = {};
        assets.forEach((item) => {
          if (item.assetLocation) {
            locationCountMap[item.assetLocation] =
              (locationCountMap[item.assetLocation] || 0) + 1;
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
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };

    fetchData();
  }, [getLocationName]);

  const assetData = [
    { icon: <FontAwesomeIcon icon={faCar} />, count: categoryStats["Cars"], label: "Cars" },
    {
      icon: <FontAwesomeIcon icon={faBoxOpen} />,
      count: categoryStats["Goods 1"],
      label: "Goods 1",
    },
    { icon: <FontAwesomeIcon icon={faBox} />, count: categoryStats["Goods 2"], label: "Goods 2" },
    { icon: <FontAwesomeIcon icon={faBox} />, count: categoryStats["Goods 3"], label: "Goods 3" },
  ];

  
  const assignmentData = [
    {
      icon: <FontAwesomeIcon icon={faLocationDot} />,
      count: assignmentDataState.locations,
      label: "Locations",
    },
    {
      icon: <FontAwesomeIcon icon={faIdCard} />,
      count: assignmentDataState.pendingApprovals,
      label: "Pending Approvals",
    },
    {
      icon: <FontAwesomeIcon icon={faSignal} />,
      count: assetCount,
      label: "Total Assets",
    },
    {
      icon: <FontAwesomeIcon icon={faCircleUser} />,
      count: assignmentDataState.totalUsers,
      label: "Users",
    },
  ];

  return (
    <div className="h-full bg-gray-50">
      <div className="max-w-7xl mx-auto h-full">
        <div className="flex flex-col lg:flex-row gap-3 h-full">
          {/* Left Column - Main Content */}
          <div className="w-full lg:w-2/3 space-y-3">
            {/* Asset Overview Card */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-3 h-[22vh]">
              <h2 className="text-base font-semibold text-gray-900 mb-3">
                Asset Overview
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {assetData.map((item, index) => (
                  <div
                    key={index}
                    className={`flex flex-col items-center ${
                      (index + 1) % 4 !== 0
                        ? "border-r border-gray-200 pr-4"
                        : ""
                    }`}
                  >
                    <div className="w-8 h-8 flex items-center justify-center mb-2">
                      {typeof item.icon === "string" ? (
                        <img
                          src={item.icon}
                          alt={item.label}
                          className="w-8 h-8"
                        />
                      ) : (
                        item.icon
                      )}
                    </div>
                    <div className="text-center flex gap-2">
                      <p className="text-sm font-bold text-gray-900">
                        {item.count}
                      </p>
                      <p className="text-xs text-gray-500">{item.label}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Assignments Overview Card */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-3 h-[22vh]">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-5">
                {assignmentData.map((item, index) => (
                  <div
                    key={index}
                    className={`flex flex-col items-center ${
                      (index + 1) % 4 !== 0
                        ? "border-r border-gray-200 pr-4"
                        : ""
                    }`}
                  >
                    <div className="w-8 h-8 flex items-center justify-center mb-2">
                      {typeof item.icon === "string" ? (
                        <img
                          src={item.icon}
                          alt={item.label}
                          className="w-12 h-12"
                        />
                      ) : (
                        <div className="text-gray- text-xl">{item.icon}</div>
                      )}
                    </div>
                    <div className="text-center flex gap-2">
                      <p className="text-sm font-bold text-gray-900">
                        {item.count}
                      </p>
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
          <div className="w-full lg:w-1/3 space-y-3">
            {/* Asset Summary Card */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-3 h-[48%]">
              <h2 className="text-base font-semibold text-gray-900 mb-3">
                Location
              </h2>
              <div className="grid grid-cols-2 mt-9">
                {summaryData.map((item, index) => (
                  <div
                    key={index}
                    className={`flex flex-col items-center justify-center p-4 border-gray-200
                      ${index % 2 === 0 ? "border-r" : ""}
                      ${index < 2 ? "border-b" : ""}`}
                  >
                    <div className="w-6 h-6 flex items-center justify-center mb-3">
                      {typeof item.icon === "string" ? (
                        <img
                          src={item.icon}
                          alt={item.label}
                          className="w-12 h-12"
                        />
                      ) : (
                        item.icon
                      )}
                    </div>

                    <div className="text-center">
                      <p className="text-sm text-gray-900">{item.count}</p>
                      <p className="text-xs text-gray-500 text-center leading-tight">
                        {item.label}
                      </p>
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