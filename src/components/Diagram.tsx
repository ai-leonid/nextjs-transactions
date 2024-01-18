import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import {
  Chart,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  ChartData,
  Tooltip,
  Legend,
  ArcElement,
  Colors,
} from 'chart.js';
import { ITransaction } from '@/interfaces/transaction.interface';

Chart.register(
  Colors,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title);

interface TransactionChartProps {
  transactionsList: ITransaction[];
}

const TransactionChart: React.FC<TransactionChartProps> = ({
  transactionsList,
}) => {
  const chartData: ChartData<'doughnut'> = {
    labels: transactionsList.map((item) => item.category),
    datasets: [
      {
        label: 'Сумма',
        data: transactionsList.map((item) => item.amount),
      },
    ],
  };

  // return <Line data={chartData} />;
  return <Doughnut
    options={{
      aspectRatio: 6,
      plugins: {
        legend: {
          display: true,
          position: 'left',
          labels: {
            font: {
              size: 12
            }
          }
        }
      }
    }}
    data={chartData} />;

};

export default TransactionChart;
