import React, { useEffect, useRef } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  BarController,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  BarController,
  Tooltip,
  Legend
);

const AssetSummaryChart = () => {
  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null);

  const chartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'May', 'Jun'],
    datasets: [
      {
        label: 'Received',
        data: [55000, 58000, 52000, 49000, 47000, 48000, 53000, 51000, 50000, 49000],
        backgroundColor: (context) => {
          const ctx = context.chart.ctx;
          const gradient = ctx.createLinearGradient(0, 0, 0, 300);
          gradient.addColorStop(0, 'rgba(59, 130, 246, 0.9)');   // Blue top
          gradient.addColorStop(1, 'rgba(59, 130, 246, 0.3)');   // Blue bottom
          return gradient;
        },
        borderRadius: 6,
        borderSkipped: false,
      },
      {
        label: 'Sent',
        data: [48000, 50000, 46000, 44000, 43000, 42000, 47000, 46000, 45000, 44000],
        backgroundColor: (context) => {
          const ctx = context.chart.ctx;
          const gradient = ctx.createLinearGradient(0, 0, 0, 300);
          gradient.addColorStop(0, 'rgba(34, 197, 94, 0.9)');   // Green top
          gradient.addColorStop(1, 'rgba(34, 197, 94, 0.3)');   // Green bottom
          return gradient;
        },
        borderRadius: 6,
        borderSkipped: false,
      }
    ]
  };

  useEffect(() => {
    const ctx = chartRef.current?.getContext('2d');

    if (ctx) {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }

      chartInstanceRef.current = new ChartJS(ctx, {
        type: 'bar',
        data: chartData,
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: 'bottom',
              labels: {
                usePointStyle: true,
                pointStyle: 'circle',
                boxWidth: 6,
                boxHeight: 6,
                font: {
                  size: 12
                },
                padding: 20
              }
            },
            tooltip: {
              callbacks: {
                label: (context) => `${context.dataset.label}: ${context.parsed.y.toLocaleString()}`
              }
            }
          },
          scales: {
            x: {
              grid: {
                display: false
              },
              categoryPercentage: 0.4,
              barPercentage: 0.5,
              ticks: {
                font: {
                  size: 12
                }
              }
            },
            y: {
              beginAtZero: true,
              grid: {
                color: 'rgba(0,0,0,0.05)'
              },
              ticks: {
                callback: (value) => value.toLocaleString()
              }
            }
          }
        }
      });
    }

    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }
    };
  }, []);

  return (
    <div className="border-2 bg-white border-white p-4 rounded-md shadow-sm">
      <div className="flex flex-row justify-between mb-2">
        <p className="font-semibold">Asset Summary Chart</p>
        <p className="border-[0.05px] border-gray-400 py-1 px-5 rounded-sm text-[14px] text-gray-600">Weekly</p>
      </div>

      <div className="relative h-56">
        <canvas ref={chartRef} className="w-full h-full" />
      </div>
    </div>
  );
};

export default AssetSummaryChart;


// import React, { useEffect, useRef } from 'react';
// import * as Chart from 'chart.js';
// import {
//   Chart as ChartJS,
//   ArcElement,
//   Tooltip,
//   Legend,
//   Title
// } from 'chart.js';

// ChartJS.register(
//   ArcElement,
//   Tooltip,
//   Legend,
//   Title
// );

// const AssetSummaryChart = () => {
//   const chartRef = useRef(null);
//   const chartInstanceRef = useRef(null);

//   // Combine monthly values into total for each category
//   const totalInStore = [45000, 48000, 52000, 49000, 55000, 58000, 60000, 57000, 62000, 65000].reduce((a, b) => a + b, 0);
//   const totalShipped = [32000, 33000, 31500, 34000, 35000, 36000, 37000, 35500, 38000, 39000].reduce((a, b) => a + b, 0);

//   const chartData = {
//     labels: ['In Store', 'Shipped'],
//     datasets: [
//       {
//         label: 'Asset Summary',
//         data: [totalInStore, totalShipped],
//         backgroundColor: ['rgba(59, 130, 246, 0.8)', 'rgba(16, 185, 129, 0.8)'],
//         borderColor: ['rgb(59, 130, 246)', 'rgb(16, 185, 129)'],
//         borderWidth: 1.5,
//       }
//     ]
//   };

//   useEffect(() => {
//     const ctx = chartRef.current?.getContext('2d');

//     if (ctx) {
//       if (chartInstanceRef.current) {
//         chartInstanceRef.current.destroy();
//       }

//       chartInstanceRef.current = new Chart.Chart(ctx, {
//         type: 'pie',
//         data: chartData,
//         options: {
//           responsive: true,
//           maintainAspectRatio: false,
//           plugins: {
//             title: {
//               display: false,
//             },
//             legend: {
//               position: 'bottom',
//               labels: {
//                 padding: 10,
//                 usePointStyle: true,
//                 pointStyle: 'circle',
//                 font: {
//                   size: 12
//                 }
//               }
//             },
//             tooltip: {
//               callbacks: {
//                 label: function(context) {
//                   const value = context.parsed;
//                   const label = context.label;
//                   return `${label}: ${value.toLocaleString()}`;
//                 }
//               }
//             }
//           }
//         }
//       });
//     }

//     return () => {
//       if (chartInstanceRef.current) {
//         chartInstanceRef.current.destroy();
//       }
//     };
//   }, []);

//   return (
//     <div className='border-2 bg-white border-white p-4 rounded-md shadow-sm'>
//       <div className="flex flex-row justify-between mb-2">
//         <p className="font-semibold">Asset Summary Chart</p>
//         <p className="border-[0.05px] border-gray-400 py-1 px-5 rounded-sm text-[14px] text-gray-600">Monthly</p>
//       </div>

//       <div className="relative h-56">
//         <canvas 
//           ref={chartRef}
//           className="w-full h-full"
//         />
//       </div>
//     </div>
//   );
// };

// export default AssetSummaryChart;
