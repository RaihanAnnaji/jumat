const BASE_UPSTREAM = "https://satudata.kulonprogokab.go.id/api/public";

/**
 * SERVER fetch (dipakai di server components / ISR)
 * Ke upstream langsung (server tidak kena CORS), dengan revalidate.
 */
export async function serverFetch(path, { query = {}, revalidate = 60 } = {}) {
  const qs = new URLSearchParams(query).toString();
  const url = `${BASE_UPSTREAM}/${path}${qs ? `?${qs}` : ""}`;
  const res = await fetch(url, { next: { revalidate } });
  if (!res.ok) {
    throw new Error(`Upstream error ${res.status}: ${await res.text()}`);
  }
  return res.json();
}

/**
 * CLIENT fetch (dipakai di komponen client kalau perlu)
 * Lewat proxy /api/proxy agar aman dari CORS.
 */
export async function clientFetch(path, { query = {} } = {}) {
  const qs = new URLSearchParams(query).toString();
  const url = `/api/proxy/${path}${qs ? `?${qs}` : ""}`;
  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) throw new Error(`Proxy error ${res.status}`);
  return res.json();
}

// Helper spesifik API
export async function getList({ page = 1, opd, urusan, revalidate = 60 } = {}) {
  const query = { page };
  if (opd) query.opd = opd;
  if (urusan) query.urusan = urusan;
  return serverFetch("data-ku", { query, revalidate });
}

export async function getElemenDetail(id, { revalidate = 300 } = {}) {
  return serverFetch(`data-ku/elemen-detil/${id}`, { revalidate });
}

// lib/api.js
export async function getDatasetDetail(id, tahunAwal, tahunAkhir) {
  const url = `https://satudata.kulonprogokab.go.id/api/public/data-ku/elemen-detil/${id}?tahun_awal=${tahunAwal}&tahun_akhir=${tahunAkhir}`;
  const res = await fetch(url, { cache: "no-store" }); // SSR
  if (!res.ok) throw new Error("Gagal mengambil data");
  return res.json();
}

// hitung jumlah data, opd, urusan di section sekilas
export async function getSekilasData() {
  const res = await fetch("https://satudata.kulonprogokab.go.id/api/public/data-ku", {
    next: { revalidate: 300 }
  });
  if (!res.ok) throw new Error("Gagal mengambil data sekilas");

  const data = await res.json();

  const list = Array.isArray(data.datas?.data) ? data.datas.data : [];

  return {
    datasetCount: data.datas?.total ?? 0,
    opdCount: new Set(Object.keys(data.pInstansi ?? {}).filter(k => k)).size, // ambil dari pInstansi, buang key kosong
    urusanCount: new Set(Object.keys(data.pUrusan ?? {}).filter(k => k)).size // ambil dari pUrusan, buang key kosong
  };
}

// --- kode di api.js sebelumnya tetap --- //

// Mapping ID → nama subelemen (kosong "" kalau ambil pertama)
const indikatorConfig = [
  { id: "j2ng6ag1rx", sub: "" },
  { id: "wOLMpQJnjr", sub: "" },
  { id: "8J1xp3Q1Wr", sub: "Pengangguran" },
  { id: "0k9qJoy18J", sub: "Laju Pertumbuhan Ekonomi Kabupaten Kulon Progo" },
];

export async function getIndikatorData({ revalidate = 300 } = {}) {
  const hitungStatus = (a, b) =>
    parseFloat(b) > parseFloat(a) ? "naik" : "turun";

  const fetchIndikator = async ({ id, sub }) => {
    const json = await serverFetch(`data-ku/elemen-detil/${id}`, { revalidate });
    const datas = json?.datas || {};

    // Pilih subelemen atau pertama
    const key = sub
      ? Object.keys(datas).find(
          (k) =>
            datas[k]?.metadata?.nama_elemen?.toLowerCase() === sub.toLowerCase()
        )
      : Object.keys(datas)[0];

    if (!key) return null;

    const meta = datas[key].metadata || {};
    const dataObj = datas[key].data || {};

    const tahun = Object.keys(dataObj)
      .filter((t) => dataObj[t]?.value != null)
      .sort((a, b) => b - a);

    if (tahun.length < 2) return null;

    const tahunA = tahun[1];
    const tahunB = tahun[0];
    const persenA = dataObj[tahunA].value;
    const persenB = dataObj[tahunB].value;

    return {
      id: `${id}-${tahunB}`,
      caption: meta.nama_elemen || json?.elemen?.label || "Tidak diketahui",
      satuan: meta.satuan || "",
      tahunA,
      persenA,
      tahunB,
      persenB,
      status: hitungStatus(persenA, persenB),
    };
  };

  const results = await Promise.all(indikatorConfig.map(fetchIndikator));
  return results.filter(Boolean);
}