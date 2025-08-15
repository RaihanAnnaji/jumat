"use client";
import { useState } from "react";
import { FaChartLine } from "react-icons/fa";
import ChartModal from "./ChartModal"; // modal khusus grafik

function getStatusColor(status) {
  switch (status) {
    case 1: return "text-black";
    case 2: return "text-yellow-500";
    case 3: return "text-red-500";
    case 4: return "text-gray-400";
    default: return "text-black";
  }
}

export default function TabelDetail({ datas, years }) {
  const rows = Object.entries(datas);
  const [selectedChartData, setSelectedChartData] = useState(null);

  const handleOpenChart = (row) => {
    setSelectedChartData(row); // simpan metadata + data untuk modal
  };

  const handleCloseChart = () => {
    setSelectedChartData(null);
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border border-gray-200">
        <thead>
          <tr className="bg-gray-100 text-sm">
            <th className="border px-2 py-1">Kode</th>
            <th className="border px-2 py-1">Nama Elemen</th>
            <th className="border px-2 py-1">Satuan</th>
            {years.map((y) => (
              <th key={y} className="border px-2 py-1">{y}</th>
            ))}
            <th className="border px-2 py-1 text-center">Grafik</th>
          </tr>
        </thead>
        <tbody>
          {rows.map(([_, { metadata, data }], index) => (
            <tr key={index} className="text-sm">
              <td className="border px-2 py-1 text-center">{index + 1}</td>
              <td className="border px-2 py-1">{metadata.nama_elemen}</td>
              <td className="border px-2 py-1">{metadata.satuan || "-"}</td>
              {years.map((y) => {
                const cell = data[y] || {};
                return (
                  <td
                    key={y}
                    className={`border px-2 py-1 ${getStatusColor(cell.status)}`}
                  >
                    {cell.value ?? "-"}
                  </td>
                );
              })}
              <td className="border px-2 py-1 text-center">
                <button
                  onClick={() => handleOpenChart({ metadata, data })}
                  className="text-blue-500 hover:text-blue-700"
                >
                  <FaChartLine />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedChartData && (
        <ChartModal
          chartData={selectedChartData}
          onClose={handleCloseChart}
        />
      )}
    </div>
  );
}
