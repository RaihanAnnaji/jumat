"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function FilterTahun({ dari, sampai }) {
  const router = useRouter();
  const [from, setFrom] = useState(dari);
  const [to, setTo] = useState(sampai);

  const applyFilter = () => {
    router.push(`?dari=${from}&sampai=${to}`);
  };

  return (
    <div className="flex items-end gap-3 flex-wrap">
      <div className="flex flex-col">
        <label className="text-xs font-medium text-gray-600 mb-1">Dari</label>
        <input
          type="number"
          value={from}
          onChange={(e) => setFrom(e.target.value)}
          className="border border-gray-300 rounded-md px-2 h-9 w-24 focus:outline-none focus:ring-2 focus:ring-teal-400"
        />
      </div>
      <div className="flex flex-col">
        <label className="text-xs font-medium text-gray-600 mb-1">Sampai</label>
        <input
          type="number"
          value={to}
          onChange={(e) => setTo(e.target.value)}
          className="border border-gray-300 rounded-md px-2 h-9 w-24 focus:outline-none focus:ring-2 focus:ring-teal-400"
        />
      </div>
      <button
        onClick={applyFilter}
        className="bg-teal-500 hover:bg-teal-600 text-white px-4 h-9 rounded-md shadow-sm text-sm"
      >
        Filter
      </button>
    </div>
  );
}
