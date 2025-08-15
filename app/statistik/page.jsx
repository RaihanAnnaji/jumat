// app/statistik/page.jsx
import { getList } from "../../lib/api";
import FilterSidebar from "./komponen/FilterSidebar"; // client component
import SearchBar from "./komponen/SearchBar"; // client component
import SortDropdown from "./komponen/SortDropdown"; // client component
import DatasetCard from "./komponen/DatasetCard"; // client component
import Pagination from "./komponen/Pagination"; // client component

export const revalidate = 60; // ISR 60 detik

export default async function StatistikPage({ searchParams }) {
  const params = await searchParams;

  const uiPage = Number(params?.page || 1);
  const opd = params?.opd || "";
  const urusan = params?.urusan || "";
  const q = (params?.q || "").toLowerCase();
  const sort = params?.sort || "az";

  // Konfigurasi pagination
  const itemsPerPageUI = 10;   // per halaman UI
  const itemsPerApiPage = 100; // per halaman API

  // Hitung halaman API yang harus di-fetch
  const apiPage = Math.floor((uiPage - 1) / (itemsPerApiPage / itemsPerPageUI)) + 1;

  // Ambil data dari API sesuai halaman API
  const dataResp = await getList({
    page: apiPage,
    opd: opd || undefined,
    urusan: urusan || undefined,
    revalidate,
  });

  const datasets = dataResp?.datas?.data ?? [];
  const totalFound = dataResp?.datas?.total ?? 0;

  // Ambil kamus OPD & Urusan
  const pInstansi = dataResp?.pInstansi ?? {};
  const pUrusan = dataResp?.pUrusan ?? {};

  // Filter pencarian
  let filtered = datasets;
  if (q) {
    filtered = filtered.filter(
      (it) =>
        (it?.nama_elemen || "").toLowerCase().includes(q) ||
        (it?.nama_instansi || "").toLowerCase().includes(q)
    );
  }

  // Sorting
  filtered = [...filtered].sort((a, b) => {
    const A = (a?.nama_elemen || "").toLowerCase();
    const B = (b?.nama_elemen || "").toLowerCase();
    if (sort === "za") return B.localeCompare(A);
    return A.localeCompare(B);
  });

  // Potong data untuk halaman UI sekarang
  const startIndex = ((uiPage - 1) % (itemsPerApiPage / itemsPerPageUI)) * itemsPerPageUI;
  const endIndex = startIndex + itemsPerPageUI;
  const paginatedData = filtered.slice(startIndex, endIndex);

  // Hitung total halaman UI dari total data API
  const totalPagesUI = Math.ceil(totalFound / itemsPerPageUI);

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
                  currentPage={uiPage}
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
                currentPage={uiPage}
                totalPages={totalPagesUI}
                preserve={{ opd, urusan, q, sort }}
              />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
