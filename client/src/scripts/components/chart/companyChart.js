import React from 'react';
import {Line} from 'react-chartjs-2';
import chartOptions from './options';

const currentCompanyCount = 90;

const dealChartData = {
  labels: ['September', 'October', 'November', 'December', 'January', 'February', 'March'],
  datasets: [
    {
      lineTension: 0,
      pointRadius: 2,
      data: [5, 20, 25, 35, 70, 75, currentCompanyCount],
      borderColor: 'rgba(37, 78, 144, 0.75)',
      backgroundColor: 'rgba(37, 78, 144, 0.25)'
    },
  ]
};

export default function CompanyChart() {
  return (
    <div className="chart-container">
      <Line
        data={dealChartData}
        options={chartOptions}
      />
    </div>
  );
}
