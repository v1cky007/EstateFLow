import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const PropertyDistributionChart = ({ data }) => {
  const chartData = {
    labels: data.labels,
    datasets: [{
      label: 'Property Distribution',
      data: data.values,
      backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'],
      borderColor: '#fff',
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
            return `${tooltipItem.label}: ${tooltipItem.raw}`;
          },
        },
      },
    },
    onClick: (event, elements) => {
      if (elements.length > 0) {
        const index = elements[0].index;
        const label = data.labels[index];
        const value = data.values[index];
        alert(`Clicked on: ${label}, Value: ${value}`);
      }
    },
  };

  return <Pie data={chartData} options={options} />;
};

export default PropertyDistributionChart;
