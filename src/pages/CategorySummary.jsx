import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Cell } from 'recharts';
import orange from "../assets/images/orange.svg";
import blue from "../assets/images/blue.svg";
import boxxx from "../assets/images/boxxx.svg";
import axios from "axios";

// Color map for pie chart
const CATEGORY_COLORS = {
  Vehicle: "#3B82F6",   // Blue
  'Goods 1': "#F97316", // Orange
  'Goods 2': "#10B981", // Green
  'Goods 3': "#6366F1", // Indigo
};

const CategorySummary = () => {
  const [categoryCounts, setCategoryCounts] = useState({
    Vehicle: 0,
    'Goods 1': 0,
    'Goods 2': 0,
    'Goods 3': 0,
  });

  const [totalAssets, setTotalAssets] = useState(0);
  const [chartData, setChartData] = useState([]);

  const categories = [
    {
      name: 'Vehicle',
      icon: <img src={orange} alt="" className="w-10 h-10" />,
      description: "Cars, bikes"
    },
    {
      name: 'Goods 1',
      icon: <img src={blue} alt="" className="w-10 h-10" />,
      description: "Machinery"
    },
    {
      name: 'Goods 2',
      icon: <img src={blue} alt="" className="w-10 h-10" />,
      description: "Containers"
    },
    {
      name: 'Goods 3',
      icon: <img src={blue} alt="" className="w-10 h-10" />,
      description: "Miscellaneous"
    },
  ];

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const res = await axios.get("https://backend-ps-tali.onrender.com/assets/stats/category");
        const data = res.data?.stats || [];

        const updatedCounts = {
          Vehicle: 0,
          'Goods 1': 0,
          'Goods 2': 0,
          'Goods 3': 0,
        };

        let total = 0;

        data.forEach(item => {
          const category = item.category;
          const count = item.count;

          // Map API categories to display categories
          if (category === "Cars") {
            updatedCounts["Vehicle"] = count;
          } else if (category === "Goods 1") {
            updatedCounts["Goods 1"] = count;
          } else if (category === "Goods 2") {
            updatedCounts["Goods 2"] = count;
          } else if (category === "Goods 3") {
            updatedCounts["Goods 3"] = count;
          }

          total += count;
        });

        setCategoryCounts(updatedCounts);
        setTotalAssets(total);

        // Format chart data - only include categories with counts > 0
        const chartFormatted = Object.entries(updatedCounts)
          .filter(([_, count]) => count > 0)
          .map(([name, count]) => ({
            name,
            value: count,
            color: CATEGORY_COLORS[name] || "#9CA3AF"
          }));

        setChartData(chartFormatted);
      } catch (err) {
        console.error("Error fetching category stats:", err);
      }
    };

    fetchCounts();
  }, []);

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 w-50 h-[420px] flex flex-col p-2 lg:p-4 ml-[45%]">
      <div className="text-center mb-4">
        <h3 className="font-semibold text-gray-800 text-lg mb-2">Category</h3>

        {/* Donut chart with total assets in center */}
        <div className="relative w-32 h-32 mx-auto mb-2">
          <PieChart width={130} height={130}>
            <Pie
              data={chartData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              innerRadius={40}
              outerRadius={60}
              paddingAngle={2}
              stroke="none"
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
          </PieChart>

          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div className="text-2xl font-bold text-gray-800">{totalAssets}</div>
            <div className="text-xs text-gray-500">Total Asset</div>
          </div>
        </div>
      </div>

      {/* Category breakdown list */}
      <div className="flex-grow overflow-y-hidden space-y-3">
        {categories.map((category, index) => (
          <div key={index} className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {category.icon}
              <div className="flex flex-col">
                <span className="text-sm font-medium text-gray-800">{category.name}</span>
                <p className='text-xs text-gray-500'>{category.description}</p>
              </div>
            </div>
            <span className="text-sm font-semibold text-gray-800">
              {categoryCounts[category.name] || 0}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategorySummary;