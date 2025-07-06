import React from "react";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
} from "chart.js";
import { Doughnut, Bar } from "react-chartjs-2";
import WavyChart from "./WavyChart";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title
);

const Report = () => {
  // === Pie Chart Data ===
  const pieData = {
    labels: ["Assets", "Assignment"],
    datasets: [
      {
        data: [75, 25],
        backgroundColor: ["#4F46E5", "#EC4899"],
        borderWidth: 1,
      },
    ],
  };

  const pieOptions = {
    cutout: "70%",
    plugins: {
      legend: {
        position: "right",
        labels: {
          boxWidth: 12,
          padding: 20,
        },
      },
    },
  };

  // === Bar Graph Data ===
  const barData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Assets",
        data: [20, 50, 30, 20, 15, 10],
        backgroundColor: "#4F46E5",
        borderRadius: 10,
      },
    ],
  };

  const barOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  const data = [
    { name: "Car SI", quantity: "@gmail", location: "Tema", assigned: "8" },
    { name: "Boat WD", quantity: "@gmail", location: "Takoradi", assigned: "10000" },
    { name: "CAR TF", quantity: "@gmail", location: "Location 2", assigned: "2839" },
    { name: "House IK", quantity: "@gmail", location: "Location 2", assigned: "7393" },
    { name: "House SD", quantity: "@gmail", location: "Location 1", assigned: "739292" },
  ];

  return (
    <div>
      <div className="p-4 grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Pie Chart */}
        <div className="bg-white rounded-lg p-4 shadow-md h-[250px]">
          <div className="flex items-center justify-between mb-2">
            <p className="font-semibold text-gray-700">Assets & Assignments</p>
            <p className="text-sm bg-gray-100 px-2 py-1 rounded-md">Year</p>
          </div>
          <Doughnut data={pieData} options={pieOptions} />
        </div>

        {/* Bar Chart 1 */}
        <div className="bg-white rounded-lg p-4 shadow-md">
          <div className="flex items-center justify-between mb-2">
            <p className="font-semibold text-gray-700">Assets</p>
            <p className="text-sm bg-gray-100 px-2 py-1 rounded-md">Monthly</p>
          </div>
          <Bar data={barData} options={barOptions} />
        </div>

        {/* Bar Chart 2 */}
        <div className="bg-white rounded-lg p-4 shadow-md">
          <div className="flex items-center justify-between mb-2">
            <p className="font-semibold text-gray-700">Assets By Categories</p>
            <p className="text-sm bg-gray-100 px-2 py-1 rounded-md">Weekly</p>
          </div>
          <Bar data={barData} options={barOptions} />
        </div>
      </div>
      <WavyChart />
      <div className="border-2 bg-white border-white p-4 rounded-md shadow-sm mt-5 w-[97%] ml-4">
      <div className="flex flex-row justify-between mb-2">
        <p className="font-semibold">Assignments</p>
        <p className="border-[0.05px] border-gray-400 py-1 px-5 rounded-sm text-[14px] text-gray-600">Latest</p>
      </div>

      {/* Table with fixed height similar to the chart height */}
      <div className="h-48 w-full overflow-y-auto ">
        <table className="min-w-full text-sm text-left border-t border-gray-200">
          <thead className="text-gray-600">
            <tr>
              <th className="py-1 pr-4">Asset Name</th>
              
              <th className="py-1 pr-4">Location</th>
              <th className="py-1 pr-4">Email</th>
              <th className="py-1">Duration</th>
              <th className="py-1">Contact Number</th>
            </tr>
          </thead>
          <tbody className="text-gray-800">
            {data.map((item, index) => (
              <tr key={index} className="border-t border-gray-100">
                <td className="py-1 pr-4">{item.name}</td>
                <td className="py-1 pr-4">{item.location}</td>
                <td className="py-1 pr-4">{item.quantity}</td>
                <td className="py-1">{item.assigned}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Optional custom legend-like footer (can be removed if not needed) */}
      <div className="flex gap-6 mt-3 px-4">
        <span className="text-sm text-gray-500">Table shows 5 most recent assets</span>
      </div>
    </div>
    </div>
  );
};

export default Report;
