// statistik/komponendetail/HeaderDetail.jsx
"use client";
import { useRouter } from "next/navigation";

export default function HeaderDetail({ data }) {
  const router = useRouter();

  return (
    <div className="space-y-2">
      <button
        onClick={() => router.back()}
        className="text-sm text-gray-500 flex items-center gap-1"
      >
        ← Kembali
      </button>
      <h1 className="text-2xl font-bold">{data?.judul || "-"}</h1>
      <p className="text-gray-700">{data?.deskripsi || ""}</p>
      <p className="text-sm text-gray-600">
        OPD Pengampu: {data?.opd_pengampu || "-"}
      </p>
    </div>
  );
}
