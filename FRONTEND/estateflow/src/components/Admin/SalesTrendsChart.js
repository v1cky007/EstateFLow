import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, Title, Tooltip } from 'chart.js';

ChartJS.register(LineElement, CategoryScale, LinearScale, Title, Tooltip);

const SalesTrendsChart = ({ data }) => {
  const chartData = {
    labels: data.labels,
    datasets: [{
      label: 'Sales Trends',
      data: data.values,
      borderColor: 'rgba(54, 162, 235, 1)',
      backgroundColor: 'rgba(54, 162, 235, 0.2)',
      borderWidth: 2,
    }],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            return `${tooltipItem.dataset.label}: $${tooltipItem.raw.toLocaleString()}`;
          },
        },
      },
    },
    interaction: {
      mode: 'index',
      intersect: false,
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        beginAtZero: true,
        ticks: {
          callback: function (value) {
            return `$${value.toLocaleString()}`;
          },
        },
      },
    },
    elements: {
      point: {
        radius: 5,
        hoverRadius: 7,
        hoverBackgroundColor: 'rgba(75, 192, 192, 1)',
      },
    },
  };

  return <Line data={chartData} options={options} />;
};

export default SalesTrendsChart;
