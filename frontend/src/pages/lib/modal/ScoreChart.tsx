import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

interface ScoreChartProps {
  scores: number[];
}

const ScoreChart: React.FC<ScoreChartProps> = ({ scores }) => {
  // Prepare data for the chart
  const labels = scores.map((_, index) => `Game ${index + 1}`);
  
  const data = {
    labels,
    datasets: [
      {
        label: 'Scores',
        data: scores,
        fill: false,
        backgroundColor: '#3b82f6',
        borderColor: '#3b82f6',
        tension: 0.4,
        pointBackgroundColor: '#ffffff',
        pointBorderColor: '#3b82f6',
        pointBorderWidth: 2,
        pointRadius: 5,
        pointHoverRadius: 7
      }
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        callbacks: {
          label: (context: any) => {
            return `Score: ${context.raw}`;
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: '#e5e7eb'
        },
        ticks: {
          color: '#6b7280'
        }
      },
      x: {
        grid: {
          display: false
        },
        ticks: {
          color: '#6b7280'
        }
      }
    }
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-medium text-gray-800">Your Game Scores</h3>
        <span className="text-sm text-gray-500">
          {scores.length} game{scores.length !== 1 ? 's' : ''} played
        </span>
      </div>
      <div className="h-64">
        <Line data={data} options={options} />
      </div>
      <div className="mt-3 flex justify-center">
        <div className="flex items-center">
          <span className="w-3 h-3 rounded-full bg-blue-500 mr-2"></span>
          <span className="text-sm text-gray-600">Score progression</span>
        </div>
      </div>
    </div>
  );
};

export default ScoreChart;