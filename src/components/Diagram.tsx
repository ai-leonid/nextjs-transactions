import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  ChartData,
} from "chart.js";
import { ITransaction } from "@/interfaces/transaction.interface";

Chart.register(CategoryScale, LinearScale, PointElement, LineElement, Title);

interface TransactionChartProps {
  transactionsList: ITransaction[];
}

const TransactionChart: React.FC<TransactionChartProps> = ({
  transactionsList,
}) => {
  const chartData: ChartData<"line"> = {
    labels: transactionsList.map((item) => item.category),
    datasets: [
      {
        label: "Amount",
        data: transactionsList.map((item) => item.amount),
        fill: false,
        borderColor: "rgba(75,192,192,1)",
      },
    ],
  };

  return <Line data={chartData} />;

  return null;
};

export default TransactionChart;
