// app/statistik/page.jsx
import { getList } from "../../lib/api";
import FilterSidebar from "./komponen/FilterSidebar"; // client component
import SearchBar from "./komponen/SearchBar"; // client component
import SortDropdown from "./komponen/SortDropdown"; // client component
import DatasetCard from "./komponen/DatasetCard"; // client component
import Pagination from "./komponen/Pagination"; // client component

export const revalidate = 60; // ISR 60 detik

export default async function StatistikPage({ searchParams }) {
  const params = await searchParams; // ⬅️ wajib di-await sekarang

  const page = Number(params?.page || 1);
  const opd = params?.opd || "";
  const urusan = params?.urusan || "";
  const q = (params?.q || "").toLowerCase();
  const sort = params?.sort || "az";

  // Ambil list data (SSR + ISR)
  const dataResp = await getList({
    page: 1, // ambil semua data untuk pagination manual
    opd: opd || undefined,
    urusan: urusan || undefined,
    revalidate,
  });

  const datasets = dataResp?.datas?.data ?? [];
  const totalFound =
    dataResp?.datas?.total ??
    dataResp?.datas?.data?.length ??
    0;

  // Ambil kamus OPD & Urusan
  const pInstansi =
    dataResp?.pInstansi ??
    (await getList({ page: 1 })).pInstansi ??
    {};
  const pUrusan =
    dataResp?.pUrusan ??
    (await getList({ page: 1 })).pUrusan ??
    {};

  // Filter berdasarkan q (server-side)
  let filtered = datasets;
  if (q) {
    filtered = filtered.filter(
      (it) =>
        (it?.nama_elemen || "").toLowerCase().includes(q) ||
        (it?.nama_instansi || "").toLowerCase().includes(q)
    );
  }

  // Sort
  filtered = [...filtered].sort((a, b) => {
    const A = (a?.nama_elemen || "").toLowerCase();
    const B = (b?.nama_elemen || "").toLowerCase();
    if (sort === "za") return B.localeCompare(A);
    return A.localeCompare(B);
  });

  // Pagination manual
  const itemsPerPage = 10;
  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedData = filtered.slice(startIndex, endIndex);

  return (
    <div className="min-h-screen pt-20 bg-gradient-to-br from-green-50 via-white to-green-100">
      <div className="max-w-7xl mx-auto px-8 md:px-20">

        {/* Search + Sort */}
        <div className="flex flex-col md:flex-row md:items-center gap-3 mb-4">
          <div className="flex-1">
            <SearchBar initialQuery={q} />
          </div>
          <div className="w-full md:w-48">
            <SortDropdown initialSort={sort} />
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-6">
          {/* Sidebar Filter */}
          <aside className="w-full md:w-72 shrink-0">
            <FilterSidebar
              initialOpd={opd}
              initialUrusan={urusan}
              pInstansi={pInstansi}
              pUrusan={pUrusan}
            />
          </aside>

          {/* Konten Utama */}
          <main className="flex-1 space-y-4">
            <h1 className="text-lg font-semibold">
              {totalFound} Dataset Ditemukan
            </h1>

            <div className="space-y-3">
              {paginatedData.map((item) => (
                <DatasetCard
                  key={item.id}
                  item={item}
                  currentPage={page}
                  opd={opd}
                  urusan={urusan}
                  q={q}
                  sort={sort}
                />
              ))}
              {paginatedData.length === 0 && (
                <div className="p-6 bg-white/80 border rounded-2xl text-gray-500">
                  Tidak ada dataset yang cocok dengan pencarian.
                </div>
              )}
            </div>

            <div className="pb-6">
              <Pagination
                currentPage={page}
                totalPages={totalPages}
                preserve={{ opd, urusan, q, sort }}
              />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
