import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import orange from "../assets/images/orange.svg";
import yellow from "../assets/images/blue.svg";
import blue from "../assets/images/blue-goods.svg";
import gray from "../assets/images/gray-goods.svg";
import axios from "axios";

const CATEGORY_COLORS = {
  Vehicle: "#3B82F6",
  'Goods 1': "#F97316",
  'Goods 2': "#10B981",
  'Goods 3': "#6366F1",
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
    { name: 'Vehicle', icon: <img src={orange} alt="" className="w-8 sm:w-10 h-8 sm:h-10" />, description: "Cars, bikes" },
    { name: 'Goods 1', icon: <img src={yellow} alt="" className="w-8 sm:w-10 h-8 sm:h-10" />, description: "Machinery" },
    { name: 'Goods 2', icon: <img src={blue} alt="" className="w-8 sm:w-10 h-8 sm:h-10" />, description: "Containers" },
    { name: 'Goods 3', icon: <img src={gray} alt="" className="w-8 sm:w-10 h-8 sm:h-10" />, description: "Miscellaneous" },
  ];

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const res = await axios.get("https://backend-ps-tali.onrender.com/assets/stats/category");
        const data = res.data?.stats || [];

        const updatedCounts = { Vehicle: 0, 'Goods 1': 0, 'Goods 2': 0, 'Goods 3': 0 };
        let total = 0;

        data.forEach(item => {
          if (item.category === "Cars") updatedCounts["Vehicle"] = item.count;
          else if (item.category === "Goods 1") updatedCounts["Goods 1"] = item.count;
          else if (item.category === "Goods 2") updatedCounts["Goods 2"] = item.count;
          else if (item.category === "Goods 3") updatedCounts["Goods 3"] = item.count;
          total += item.count;
        });

        setCategoryCounts(updatedCounts);
        setTotalAssets(total);

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
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 w-full sm:w-[90%] md:w-[70%] lg:w-[50%] xl:max-w-2xl
  mx-auto p-4 sm:p-6 flex flex-col">
      {/* Title */}
      <div className="text-center mb-4">
        <h3 className="font-semibold text-gray-800 text-base sm:text-lg mb-2">Category</h3>

        {/* Responsive donut chart */}
        <div className="relative mx-auto mb-2 w-24 h-24 sm:w-32 sm:h-32 lg:w-40 lg:h-42">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                innerRadius="60%"
                outerRadius="80%"
                paddingAngle={2}
                stroke="none"
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>

          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div className="text-lg sm:text-2xl font-bold text-gray-800">{totalAssets}</div>
            <div className="text-[10px] sm:text-xs text-gray-500">Total Asset</div>
          </div>
        </div>
      </div>

      {/* Category breakdown */}
      <div className="flex-grow overflow-y-auto space-y-3">
        {categories.map((category, index) => (
          <div key={index} className="flex items-center justify-between">
            <div className="flex items-center gap-2 sm:gap-3">
              {category.icon}
              <div className="flex flex-col">
                <span className="text-xs sm:text-sm font-medium text-gray-800">{category.name}</span>
                <p className="text-[10px] sm:text-xs text-gray-500">{category.description}</p>
              </div>
            </div>
            <span className="text-xs sm:text-sm font-semibold text-gray-800">
              {categoryCounts[category.name] || 0}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategorySummary;
