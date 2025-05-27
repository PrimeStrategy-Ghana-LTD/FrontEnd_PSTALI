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

  // Sample data - monthly only
  const chartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
    datasets: [
      {
        label: 'Stocks',
        data: [45000, 48000, 52000, 49000, 55000, 58000, 60000, 57000, 62000, 65000],
        backgroundColor: 'rgba(59, 130, 246, 0.8)',
        borderColor: 'rgb(59, 130, 246)',
        borderWidth: 2,
        // barThickness: 10,
        borderRadius: {
          topLeft: 10,
          topRight: 10,
          bottomLeft: 0,
          bottomRight: 0
        },
        borderSkipped: false,
      },
      {
        label: 'Bonds',
        data: [32000, 33000, 31500, 34000, 35000, 36000, 37000, 35500, 38000, 39000],
        backgroundColor: 'rgba(16, 185, 129, 0.8)',
        borderColor: 'rgb(16, 185, 129)',
        borderWidth: 2,
        // barThickness: 10,
        borderRadius: {
          topLeft: 10,
          topRight: 10,
          bottomLeft: 0,
          bottomRight: 0
        },
        borderSkipped: false,
      },
    ]
  };

  useEffect(() => {
    // Register Chart.js components
    // Chart.Chart.register(
    //   Chart.CategoryScale,
    //   Chart.LinearScale,
    //   Chart.BarElement,
    //   Chart.LineElement,
    //   Chart.PointElement,
    //   Chart.Title,
    //   Chart.Tooltip,
    //   Chart.Legend
    // );

    const ctx = chartRef.current?.getContext('2d');
    
    if (ctx) {
      // Destroy existing chart if it exists
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }

      // Create new chart
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
                padding: 20,
                usePointStyle: true,
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
              display: true,
              title: {
                display: true,
                text: '',
                font: {
                  size: 12,
                  weight: 'bold'
                }
              },
              grid: {
                display: false
              },
              categoryPercentage: 0.6,
              barPercentage: 0.15
            },
            y: {
              display: true,
              title: {
                display: true,
                text: '',
                font: {
                  size: 12,
                  weight: 'bold'
                }
              },
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

    // Cleanup function
    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }
    };
  }, []);

  return (
    <div className='border-2 w-[40%] bg-white border-white p-4 rounded-md shadow-sm'>
      <div className="flex flex-row justify-between items-center mb-4">
        <p className='font-semibold'>Asset Summary Chart</p>
      </div>
      
      <div className="relative h-72">
        <canvas 
          ref={chartRef}
          className="w-full h-full"
        />
      </div>
    </div>
  );
};

export default AssetSummaryChart;