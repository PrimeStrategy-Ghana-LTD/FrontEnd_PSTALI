import React, { useEffect, useState } from "react";
import AssetSummaryChart from "./AssetSummaryChart";
import AssetManagementGraph from "./AssetManagementGraph";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCar } from "@fortawesome/free-solid-svg-icons";
import Taxi from "../assets/images/local_taxi.png";
import loc from "../assets/images/loc.svg";
import group from "../assets/images/group.svg";
import houses from "../assets/images/Houses.svg";
import location from "../assets/images/location.png";
import cancel from "../assets/images/cancel.svg";
import profit from "../assets/images/profit.svg";

const AssetOverview = () => {
  const [assetCount, setAssetCount] = useState(0);
  const [assignmentCount, setAssignmentCount] = useState(0);

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const assetRes = await axios.get(
          "https://backend-ps-tali.onrender.com/assets/count"
        );
        const assignmentRes = await axios.get(
          "https://backend-ps-tali.onrender.com/assignments/count"
        );

        setAssetCount(assetRes.data.count || 0);
        setAssignmentCount(assignmentRes.data.count || 0);
      } catch (error) {
        console.error("Error fetching counts:", error);
      }
    };

    fetchCounts();
  }, []);

  const assetData = [
    { icon: <FontAwesomeIcon icon={faCar} />, count: 300, label: "Cars" },
    { icon: houses, count: 300, label: "Goods 1" },
    { icon: houses, count: 300, label: "Goods 2" },
    { icon: houses, count: 300, label: "Goods 3" },
  ];

  const assignmentData = [
    { icon: loc, count: 4, label: "locations" },
    { icon: cancel, count: 5, label: "Pending Approvals" },
    { icon: profit, count: assetCount, label: "Total Assets" }, // updated
    { icon: group, count: 10, label: "Users" },
  ];

  const summaryData = [
    { icon: loc, count: 200, label: "Tema" }, // updated
    { icon: loc, count: 200, label: "Takoradi" },
    { icon: loc, count: 200, label: "Location 1" },
    { icon: loc, count: 200, label: "Location 2" },
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
              <h2 className="text-base font-semibold text-gray-900 mb-3"></h2>
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
                      <img
                        src={item.icon}
                        alt={item.label}
                        className="w-8 h-8"
                      />
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
              <div className="grid grid-cols-2 mt-9 ">
                {summaryData.map((item, index) => (
                  <div
                    key={index}
                    className={`flex flex-col items-center justify-center p-4 border-gray-200
                      ${index % 2 === 0 ? "border-r" : ""}
                     ${index < 2 ? "border-b" : ""}
                     `}
                  >
                    <div className="w-6 h-6 flex items-center justify-center mb-3">
                      <img
                        src={item.icon}
                        alt={item.label}
                        className="w-8 h-8"
                      />
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
