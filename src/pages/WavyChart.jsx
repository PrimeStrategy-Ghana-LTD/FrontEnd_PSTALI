import React from 'react';
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend
);

const WavyChart = () => {
  const data = {
    labels: ['Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar'],
    datasets: [
      {
        label: 'Revenue',
        data: [25000, 32000, 50000, 60000, 58000, 66000, 42000],
        fill: false,
        borderColor: '#3B82F6',
        tension: 0.4,
        pointBackgroundColor: '#3B82F6',
        pointBorderColor: '#fff',
        pointRadius: 5,
        pointHoverRadius: 7,
      },
      {
        label: 'Profit',
        data: [40000, 38000, 42000, 48000, 50000, 46000, 45000],
        fill: false,
        borderColor: '#FACC15',
        tension: 0.4,
        pointRadius: 0,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false, // ❗ Needed for custom height to work
    plugins: {
      tooltip: {
        callbacks: {
          title: () => `This Month`,
          label: (tooltipItem) => tooltipItem.raw.toLocaleString(),
        },
      },
      legend: {
        display: true,
        labels: {
          usePointStyle: true,
          pointStyle: 'circle',
          padding: 20,
        },
      },
    },
    scales: {
      y: {
        beginAtZero: false,
        ticks: {
          callback: (value) => value.toLocaleString(),
        },
      },
    },
  };

  return (
    <div >
      <div className="bg-white rounded-lg p-4 shadow-md w-full">
        <div className="flex items-center justify-between mb-2">
        <p className="font-semibold text-gray-700">Assets Assignment</p>
        <p className="text-sm bg-gray-100 px-2 py-1 rounded-md">Weekly</p>
      </div>
      <div className="h-[250px]"> {/* 👈 Fixed pixel height */}
        <Line data={data} options={options} />
      </div>
      </div>
    </div>
  );
};

export default WavyChart;
