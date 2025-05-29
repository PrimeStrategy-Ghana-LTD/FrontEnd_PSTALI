import React, { useMemo } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const AssetManagementGraph = () => {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May'];

  const dataPoints = useMemo(() => {
    const assigned = [];
    const added = [];

    for (let i = 0; i < months.length; i++) {
      const progress = i / (months.length - 1);
      const assignedWave = Math.sin(i * 0.9) * 120 + Math.cos(i * 0.6) * 80;
      const addedWave = Math.sin(i * 1.1) * 110 + Math.cos(i * 0.7) * 90;

      const assignedBase = 2100 + progress * 700;
      const addedBase = 2050 - progress * 500;

      const assignedVal = Math.max(1000, Math.min(4000, assignedBase + assignedWave + (Math.random() - 0.5) * 80));
      const addedVal = Math.max(1000, Math.min(4000, addedBase + addedWave + (Math.random() - 0.5) * 80));

      assigned.push(Math.round(assignedVal));
      added.push(Math.round(addedVal));
    }

    return { assigned, added };
  }, []);

  const chartData = {
    labels: months,
    datasets: [
      {
        label: 'Asset Assigned',
        data: dataPoints.assigned,
        borderColor: '#3b82f6',
        backgroundColor: '#3b82f633',
        tension: 0.6, // increased waviness
        pointRadius: 0,
        borderWidth: 1.5,
      },
      {
        label: 'Asset Added',
        data: dataPoints.added,
        borderColor: '#ef4444',
        backgroundColor: '#ef444433',
        tension: 0.9, // increased waviness
        pointRadius: 0,
        borderWidth: 1.5,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRation: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: (context) => `${context.dataset.label}: ${context.formattedValue}`,
        },
      },
    },
    scales: {
      y: {
        min: 1000,
        max: 4000,
        ticks: {
          stepSize: 1000,
          callback: (value) => value.toLocaleString(),
        },
        grid: {
          color: '#e0e0e0',
        },
      },
      x: {
        grid: {
          color: '#f4f4f4',
        },
        ticks: {
          font: {
            size: 12,
          },
        },
      },
    },
  };

  return (
    <div className="border-2 bg-white border-white p-4 rounded-md shadow-sm">
      <div className="flex flex-row justify-between mb-2">
        <p className="font-semibold">Location</p>
        <p className="border-[0.05px] border-gray-400 py-1 px-5 rounded-sm text-[14px] text-gray-600">Weekly</p>
      </div>
      {/* Reduced height */}
      <div className="h-48 w-full">
        <Line data={chartData} options={options} />
      </div>

      {/* Custom legend below the chart */}
      <div className="flex gap-6 mt-3 px-4">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-blue-500 inline-block"></span>
          <span className="text-sm">Asset Assigned</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-red-500 inline-block"></span>
          <span className="text-sm">Asset Added</span>
        </div>
      </div>
    </div>
  );
};

export default AssetManagementGraph;
