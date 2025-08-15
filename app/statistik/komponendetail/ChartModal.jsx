"use client";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export default function ChartModal({ chartData, onClose }) {
  const { metadata, data } = chartData;

  const years = Object.keys(data).sort();
  const values = years.map(y => data[y]?.value ?? null);

  const chartConfig = {
    labels: years,
    datasets: [
      {
        label: metadata.nama_elemen,
        data: values,
        borderColor: "rgb(75, 192, 192)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        tension: 0.3
      }
    ]
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-3xl p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-black"
        >
          ✕
        </button>
        <h2 className="text-lg font-bold mb-4">{metadata.nama_elemen}</h2>
        <Line data={chartConfig} />
      </div>
    </div>
  );
}
