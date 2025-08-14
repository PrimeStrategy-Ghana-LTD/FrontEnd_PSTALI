import React from "react";

const AssetSummaryChart = () => {
  const chartData = [
    { x: 5, assetAdded: 160, assetAssigned: 140 },
    { x: 10, assetAdded: 220, assetAssigned: 200 },
    { x: 15, assetAdded: 230, assetAssigned: 180 },
    { x: 20, assetAdded: 250, assetAssigned: 190 },
    { x: 25, assetAdded: 200, assetAssigned: 170 },
  ];

  const svgWidth = 1000; // matches viewBox width
  const svgHeight = 240; // matches viewBox height
  const chartHeight = 200;
  const chartStartX = 70;
  const chartEndX = 950;

  // Function to create smooth curve path
  const createSmoothPath = (key) => {
    const points = chartData.map((item, i) => ({
      x:
        chartStartX +
        i * ((chartEndX - chartStartX) / (chartData.length - 1)),
      y: chartHeight - (item[key] - 140) * 1.25,
    }));

    let d = `M ${points[0].x},${points[0].y} `;

    for (let i = 0; i < points.length - 1; i++) {
      const p0 = points[i];
      const p1 = points[i + 1];
      const cpX = (p0.x + p1.x) / 2;
      d += `C ${cpX},${p0.y} ${cpX},${p1.y} ${p1.x},${p1.y} `;
    }

    return d;
  };

  return (
    <div className="bg-white rounded-lg p-4 sm:p-6 shadow-sm border border-gray-200">
      {/* Title & Controls */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4 sm:gap-6 flex-wrap">
        <h3 className="font-bold text-lg sm:text-xl text-gray-900">
          Asset Summary
        </h3>

        {/* Legend */}
        <div className="flex items-center gap-3 flex-wrap">
          <div className="flex items-center gap-2">
            <div className="w-4 h-0.5 bg-purple-700 rounded"></div>
            <span className="text-sm text-gray-600">Asset Added</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-0.5 bg-gray-300 rounded"></div>
            <span className="text-sm text-gray-600">Asset Assigned</span>
          </div>
        </div>

        {/* Dropdowns */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center gap-1">
            <div className="w-4 h-0.5 bg-gray-300 rounded"></div>
            <select className="text-sm px-2 text-gray-600 py-1 rounded-full bg-white border focus:outline-none focus:ring-2 focus:ring-purple-500">
              <option>Category</option>
            </select>
          </div>
          <select className="text-xs border border-gray-300 rounded py-1 px-2 bg-white focus:outline-none focus:ring-2 focus:ring-purple-500">
            <option>March 2020</option>
          </select>
        </div>
      </div>

      {/* Chart */}
      <div className="h-64 sm:h-72 lg:h-80 w-full">
        <svg
          viewBox={`0 0 ${svgWidth} ${svgHeight}`}
          preserveAspectRatio="none"
          className="w-full h-full"
        >
          {/* Grid lines */}
          {[140, 180, 220, 260].map((value) => (
            <line
              key={value}
              x1={chartStartX - 20}
              y1={chartHeight - (value - 140) * 1.25}
              x2={chartEndX}
              y2={chartHeight - (value - 140) * 1.25}
              stroke="#f3f4f6"
              strokeWidth="1"
            />
          ))}

          {/* Y-axis labels */}
          {[140, 180, 220, 260].map((value) => (
            <text
              key={value}
              x={chartStartX - 30}
              y={chartHeight + 5 - (value - 140) * 1.25}
              textAnchor="end"
              className="text-xs fill-gray-400"
              fontSize="11"
            >
              {value}
            </text>
          ))}

          {/* X-axis labels */}
          {chartData.map((item, i) => (
            <text
              key={item.x}
              x={
                chartStartX +
                i * ((chartEndX - chartStartX) / (chartData.length - 1))
              }
              y="220"
              textAnchor="middle"
              className="text-xs fill-gray-400"
              fontSize="11"
            >
              {item.x === 25 ? "3/25" : item.x}
            </text>
          ))}

          {/* Asset Added Area */}
          <path
            d={`${createSmoothPath("assetAdded")} L ${chartEndX},${chartHeight} L ${chartStartX},${chartHeight} Z`}
            fill="rgba(147, 51, 234, 0.08)"
          />

          {/* Asset Assigned Area */}
          <path
            d={`${createSmoothPath("assetAssigned")} L ${chartEndX},${chartHeight} L ${chartStartX},${chartHeight} Z`}
            fill="rgba(156, 163, 175, 0.1)"
          />

          {/* Asset Added Line */}
          <path
            d={createSmoothPath("assetAdded")}
            fill="none"
            stroke="#5B21B6"
            strokeWidth="3"
          />

          {/* Asset Assigned Line */}
          <path
            d={createSmoothPath("assetAssigned")}
            fill="none"
            stroke="#D1D5DB"
            strokeWidth="3"
          />
        </svg>
      </div>
    </div>
  );
};

export default AssetSummaryChart;
