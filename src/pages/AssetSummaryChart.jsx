import React, { useEffect, useRef } from 'react';
import * as Chart from 'chart.js';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  BarController,
  Tooltip,
  Legend,
  Title
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  BarController,
  Tooltip,
  Legend,
  Title
);

const AssetSummaryChart = () => {
  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null);

  const chartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
    datasets: [
      {
        label: 'In Store',
        data: [45000, 48000, 52000, 49000, 55000, 58000, 60000, 57000, 62000, 65000],
        backgroundColor: 'rgba(59, 130, 246, 0.8)',
        borderColor: 'rgb(59, 130, 246)',
        borderWidth: 1.5,
        borderRadius: {
          topLeft: 10,
          topRight: 10,
        },
        borderSkipped: false,
      },
      {
        label: 'Shipped',
        data: [32000, 33000, 31500, 34000, 35000, 36000, 37000, 35500, 38000, 39000],
        backgroundColor: 'rgba(16, 185, 129, 0.8)',
        borderColor: 'rgb(16, 185, 129)',
        borderWidth: 1.5,
        borderRadius: {
          topLeft: 10,
          topRight: 10,
        },
        borderSkipped: false,
      },
    ]
  };

  useEffect(() => {
    const ctx = chartRef.current?.getContext('2d');

    if (ctx) {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }

      chartInstanceRef.current = new Chart.Chart(ctx, {
        type: 'bar',
        data: chartData,
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            title: {
              display: false,
            },
            legend: {
              position: 'bottom',
              labels: {
                padding: 10,
                usePointStyle: true,
                pointStyle: 'circle', // circle dot
                boxWidth: 6,
                boxHeight: 6, // smaller dot size
                font: {
                  size: 12
                }
              }
            },
            tooltip: {
              mode: 'index',
              intersect: false,
              backgroundColor: 'rgba(0, 0, 0, 0.8)',
              titleColor: 'white',
              bodyColor: 'white',
              borderColor: 'rgba(255, 255, 255, 0.1)',
              borderWidth: 1,
              callbacks: {
                label: function(context) {
                  return `${context.dataset.label}: ${context.parsed.y.toLocaleString()}`;
                }
              }
            }
          },
          interaction: {
            mode: 'nearest',
            axis: 'x',
            intersect: false
          },
          scales: {
            x: {
              grid: {
                display: false
              },
              categoryPercentage: 0.5, // more spacing between groups
              barPercentage: 0.3 // thinner bars
            },
            y: {
              grid: {
                color: 'rgba(0, 0, 0, 0.1)'
              },
              ticks: {
                callback: function(value) {
                  return value.toLocaleString();
                }
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
    <div className='border-2 bg-white border-white p-4 rounded-md shadow-sm'>
      <div className="flex flex-row justify-between mb-2">
        <p className="font-semibold">Asset Summary Chart</p>
        <p className="border-[0.05px] border-gray-400 py-1 px-5 rounded-sm text-[14px] text-gray-600">Weekly</p>
      </div>

      {/* Updated height to match first chart */}
      <div className="relative h-56">
        <canvas 
          ref={chartRef}
          className="w-full h-full"
        />
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
