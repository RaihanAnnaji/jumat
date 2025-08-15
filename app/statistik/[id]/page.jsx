import Link from "next/link";
import { getElemenDetail } from "../../../lib/api";
import TabelDetail from "../komponendetail/TabelDetail";
import FilterTahun from "../komponendetail/FilterTahun";
import KeteranganWarna from "../komponendetail/KeteranganWarna";
import ExportButtons from "../komponendetail/ExportButtons";

export default async function DetailPage({ params, searchParams }) {
  const p = await params;
  const s = await searchParams;

  const { id } = p;
  const dari = parseInt(s.dari) || 2021;
  const sampai = parseInt(s.sampai) || 2025;

  const data = await getElemenDetail(id, { revalidate: 300 });

  const years = Array.from(
    { length: sampai - dari + 1 },
    (_, i) => (dari + i).toString()
  );

  // Buat query string untuk tombol kembali
  const backParams = new URLSearchParams({
    ...(s.page && { page: s.page }),
    ...(s.opd && { opd: s.opd }),
    ...(s.urusan && { urusan: s.urusan }),
    ...(s.q && { q: s.q }),
    ...(s.sort && { sort: s.sort }),
  }).toString();

  return (
    <div className="min-h-screen pt-20 px-4 md:px-20 bg-gray-50 flex justify-center">
      <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-7xl">
        <Link
          href={`/statistik${backParams ? `?${backParams}` : ""}`}
          className="text-blue-500 hover:underline mb-4 flex items-center"
        >
          ← Kembali
        </Link>

        <h1 className="text-2xl font-bold">{data.elemen.label}</h1>
        <p className="text-sm text-gray-600 mb-4">
          Satuan: {data.elemen.satuan || "-"} | Instansi:{" "}
          {data.elemen.instansi?.name || "-"}
        </p>

        {/* Filter + Export */}
        <div className="flex justify-between items-center mb-4 flex-wrap gap-2">
          <FilterTahun dari={dari} sampai={sampai} />
          <ExportButtons datas={data.datas} years={years} />
        </div>

        <TabelDetail datas={data.datas} years={years} />
        <KeteranganWarna />
      </div>
    </div>
  );
}
