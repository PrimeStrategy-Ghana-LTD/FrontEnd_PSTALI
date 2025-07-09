import React, { useState } from "react";
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
import { ChevronDown } from "lucide-react";

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
  // State for dropdown selections
  const [pieTimePeriod, setPieTimePeriod] = useState("Year");
  const [barTimePeriod, setBarTimePeriod] = useState("Monthly");
  const [categoriesTimePeriod, setCategoriesTimePeriod] = useState("Weekly");
  const [assignmentsTimePeriod, setAssignmentsTimePeriod] = useState("Latest");

  // Time period options
  const timePeriodOptions = ["Daily", "Weekly", "Monthly", "Yearly"];
  const assignmentOptions = ["Latest", "This Week", "This Month", "This Year"];

  // Function to fetch data based on time period (you can implement your API calls here)
  const fetchDataForPeriod = (period, chartType) => {
    console.log(`Fetching ${chartType} data for ${period}`);
    // Here you would make your API calls based on the selected period
    // For now, returning sample data
  };

  // Sample data - you can modify this to be dynamic based on selected time period
  const getPieData = (period) => {
    // You can customize this data based on the selected period
    const baseData = {
      labels: ["Assets", "Assignment"],
      datasets: [
        {
          data: [75, 25],
          backgroundColor: ["#4F46E5", "#EC4899"],
          borderWidth: 1,
        },
      ],
    };
    
    // Modify data based on period if needed
    switch(period) {
      case "Daily":
        return { ...baseData, datasets: [{ ...baseData.datasets[0], data: [80, 20] }] };
      case "Weekly":
        return { ...baseData, datasets: [{ ...baseData.datasets[0], data: [70, 30] }] };
      case "Monthly":
        return { ...baseData, datasets: [{ ...baseData.datasets[0], data: [75, 25] }] };
      case "Yearly":
        return { ...baseData, datasets: [{ ...baseData.datasets[0], data: [85, 15] }] };
      default:
        return baseData;
    }
  };

  const getBarData = (period) => {
    const baseLabels = {
      Daily: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      Weekly: ["Week 1", "Week 2", "Week 3", "Week 4"],
      Monthly: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
      Yearly: ["2020", "2021", "2022", "2023", "2024"]
    };

    const baseData = {
      Daily: [15, 25, 35, 20, 30, 25, 18],
      Weekly: [45, 52, 38, 61],
      Monthly: [20, 50, 30, 20, 15, 10],
      Yearly: [150, 200, 180, 220, 190]
    };

    return {
      labels: baseLabels[period] || baseLabels.Monthly,
      datasets: [
        {
          label: "Assets",
          data: baseData[period] || baseData.Monthly,
          backgroundColor: "#4F46E5",
          borderRadius: 10,
        },
      ],
    };
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

  // Sample assignment data - you can make this dynamic based on selected period
  const getAssignmentData = (period) => {
    const baseData = [
      { name: "Car SI", quantity: "@gmail", location: "Tema", assigned: "8" },
      { name: "Boat WD", quantity: "@gmail", location: "Takoradi", assigned: "10000" },
      { name: "CAR TF", quantity: "@gmail", location: "Location 2", assigned: "2839" },
      { name: "House IK", quantity: "@gmail", location: "Location 2", assigned: "7393" },
      { name: "House SD", quantity: "@gmail", location: "Location 1", assigned: "739292" },
    ];

    // You can filter or modify data based on period
    switch(period) {
      case "This Week":
        return baseData.slice(0, 3);
      case "This Month":
        return baseData.slice(0, 4);
      case "This Year":
        return baseData;
      default:
        return baseData;
    }
  };

  // Custom dropdown component
  const CustomDropdown = ({ value, onChange, options, className = "" }) => (
    <div className={`relative ${className}`}>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="appearance-none bg-gray-100 border border-gray-300 rounded-md px-3 py-1 pr-8 text-sm text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent cursor-pointer"
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
    </div>
  );

  return (
    <div>
      <div className="p-4 grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Pie Chart */}
        <div className="bg-white rounded-lg p-4 shadow-md h-[250px]">
          <div className="flex items-center justify-between mb-2">
            <p className="font-semibold text-gray-700">Assets & Assignments</p>
            <CustomDropdown
              value={pieTimePeriod}
              onChange={(value) => {
                setPieTimePeriod(value);
                fetchDataForPeriod(value, "pie");
              }}
              options={timePeriodOptions}
            />
          </div>
          <Doughnut data={getPieData(pieTimePeriod)} options={pieOptions} />
        </div>

        {/* Bar Chart 1 */}
        <div className="bg-white rounded-lg p-4 shadow-md">
          <div className="flex items-center justify-between mb-2">
            <p className="font-semibold text-gray-700">Assets</p>
            <CustomDropdown
              value={barTimePeriod}
              onChange={(value) => {
                setBarTimePeriod(value);
                fetchDataForPeriod(value, "bar");
              }}
              options={timePeriodOptions}
            />
          </div>
          <Bar data={getBarData(barTimePeriod)} options={barOptions} />
        </div>

        {/* Bar Chart 2 */}
        <div className="bg-white rounded-lg p-4 shadow-md">
          <div className="flex items-center justify-between mb-2">
            <p className="font-semibold text-gray-700">Assets By Categories</p>
            <CustomDropdown
              value={categoriesTimePeriod}
              onChange={(value) => {
                setCategoriesTimePeriod(value);
                fetchDataForPeriod(value, "categories");
              }}
              options={timePeriodOptions}
            />
          </div>
          <Bar data={getBarData(categoriesTimePeriod)} options={barOptions} />
        </div>
      </div>

      <div className="border-2 bg-white border-white p-4 rounded-md shadow-sm mt-5 w-[97%] ml-4">
        <div className="flex flex-row justify-between mb-2">
          <p className="font-semibold">Assignments</p>
          <CustomDropdown
            value={assignmentsTimePeriod}
            onChange={(value) => {
              setAssignmentsTimePeriod(value);
              fetchDataForPeriod(value, "assignments");
            }}
            options={assignmentOptions}
          />
        </div>

        {/* Table with fixed height similar to the chart height */}
        <div className="h-48 w-full overflow-y-auto">
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
              {getAssignmentData(assignmentsTimePeriod).map((item, index) => (
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

        {/* Optional custom legend-like footer */}
        <div className="flex gap-6 mt-3 px-4">
          <span className="text-sm text-gray-500">
            Table shows {getAssignmentData(assignmentsTimePeriod).length} most recent assets for {assignmentsTimePeriod.toLowerCase()}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Report;