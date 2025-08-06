import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend
);

import React from 'react';

// Asset Summary Chart Component
const AssetSummaryChart = () => {
  const chartData = [
    { x: 5, assetActivity: 160, assetManagement: 140 },
    { x: 10, assetActivity: 180, assetManagement: 150 },
    { x: 15, assetActivity: 200, assetManagement: 170 },
    { x: 20, assetActivity: 230, assetManagement: 210 },
    { x: 25, assetActivity: 220, assetManagement: 190 },
  ];

  return (
    <div className="bg-white rounded-lg p-4 lg:p-6 shadow-sm border border-gray-200">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-3">
        <h3 className="font-semibold text-gray-800 text-lg">Asset Summary</h3>
        <div className="flex items-center gap-2 flex-wrap">
          <select className="text-xs border border-gray-300 rounded px-2 py-1 bg-white focus:outline-none focus:ring-2 focus:ring-purple-500">
            <option>Category</option>
          </select>
          <select className="text-xs border border-gray-300 rounded px-2 py-1 bg-white focus:outline-none focus:ring-2 focus:ring-purple-500">
            <option>March 2020</option>
          </select>
        </div>
      </div>
      
      {/* Legend */}
      <div className="flex items-center gap-6 mb-6">
        <div className="flex items-center gap-2">
          <div className="w-4 h-0.5 bg-purple-600 rounded"></div>
          <span className="text-sm text-gray-600">Asset Activity</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-0.5 bg-gray-400 rounded"></div>
          <span className="text-sm text-gray-600">Asset Management</span>
        </div>
      </div>
      
      {/* Chart Container */}
      <div className="h-64 relative">
        <div className="absolute top-4 left-12 bg-white px-2 py-1 rounded shadow-sm border text-xs text-gray-600">
          May<br/>
          <span className="font-semibold text-gray-800">220</span>
        </div>
        
        <svg viewBox="0 0 480 240" className="w-full h-full">
          {/* Grid lines */}
          {[120, 140, 160, 180, 200, 220, 240].map((value, i) => (
            <line
              key={value}
              x1="50"
              y1={200 - (value - 120) * 1.25}
              x2="450"
              y2={200 - (value - 120) * 1.25}
              stroke="#f3f4f6"
              strokeWidth="1"
            />
          ))}
          
          {/* Y-axis labels */}
          {[120, 140, 160, 180, 200, 220, 240].map((value) => (
            <text
              key={value}
              x="40"
              y={205 - (value - 120) * 1.25}
              textAnchor="end"
              className="text-xs fill-gray-500"
              fontSize="11"
            >
              {value}
            </text>
          ))}
          
          {/* X-axis labels */}
          {chartData.map((item, i) => (
            <text
              key={item.x}
              x={70 + i * 90}
              y="220"
              textAnchor="middle"
              className="text-xs fill-gray-500"
              fontSize="11"
            >
              {item.x === 25 ? '25/3' : item.x}
            </text>
          ))}
          
          {/* Asset Activity Area Fill */}
          <path
            d={`M 70,${200 - (chartData[0].assetActivity - 120) * 1.25} ${chartData.map((item, i) => `L ${70 + i * 90},${200 - (item.assetActivity - 120) * 1.25}`).join(' ')} L 430,200 L 70,200 Z`}
            fill="rgba(147, 51, 234, 0.1)"
          />
          
          {/* Asset Management Area Fill */}
          <path
            d={`M 70,${200 - (chartData[0].assetManagement - 120) * 1.25} ${chartData.map((item, i) => `L ${70 + i * 90},${200 - (item.assetManagement - 120) * 1.25}`).join(' ')} L 430,200 L 70,200 Z`}
            fill="rgba(156, 163, 175, 0.1)"
          />
          
          {/* Asset Activity Line */}
          <path
            d={`M 70,${200 - (chartData[0].assetActivity - 120) * 1.25} ${chartData.map((item, i) => `L ${70 + i * 90},${200 - (item.assetActivity - 120) * 1.25}`).join(' ')}`}
            fill="none"
            stroke="#9333EA"
            strokeWidth="3"
          />
          
          {/* Asset Management Line */}
          <path
            d={`M 70,${200 - (chartData[0].assetManagement - 120) * 1.25} ${chartData.map((item, i) => `L ${70 + i * 90},${200 - (item.assetManagement - 120) * 1.25}`).join(' ')}`}
            fill="none"
            stroke="#9CA3AF"
            strokeWidth="3"
          />
          
          {/* Data points for Asset Activity */}
          {chartData.map((item, i) => (
            <circle
              key={`activity-${i}`}
              cx={70 + i * 90}
              cy={200 - (item.assetActivity - 120) * 1.25}
              r="4"
              fill="#9333EA"
              stroke="white"
              strokeWidth="2"
            />
          ))}
        </svg>
      </div>
    </div>
  );
};
