"use client";
import React from "react";
import Image from "next/image";
import { FaCheckCircle } from "react-icons/fa";
import { useRouter } from "next/navigation";

// Data list untuk Data Sektoral
const dataSektoral = [
  "Jumlah Sekolah Dasar per Kecamatan Tahun 2024",
  "Data Produksi Padi Kabupaten Purworejo Tahun 2023",
  "Statistik Kunjungan Pasien di Puskesmas Tahun 2022",
  "Jumlah Penduduk Berdasarkan Jenis Kelamin dan Umur",
  "Data Panjang Jalan Kabupaten Menurut Kondisi Tahun 2024",
  "Statistik Kunjungan Pasien di Puskesmas Tahun 2022",
  "Jumlah Penduduk Berdasarkan Jenis Kelamin dan Umur",
  "Statistik Kunjungan Pasien di Puskesmas Tahun 2022",
  "Jumlah Penduduk Berdasarkan Jenis Kelamin dan Umur",
  "Data Panjang Jalan Kabupaten Menurut Kondisi Tahun 2024"
];

// Komponen untuk render list item dengan icon
const ListItems = ({ items }) => (
  <ul className="space-y-3 text-slate-700 text-sm">
    {items.map((item, i) => (
      <li key={i} className="flex items-start gap-2">
        <FaCheckCircle className="text-[#01BBA6] mt-1" />
        {item}
      </li>
    ))}
  </ul>
);

const DataTerbaru = () => {
  const router = useRouter();

  const handleSektoralClick = () => {
    // Navigasi ke halaman statistik dengan filter sektoral
    router.push("/statistik");
  };

  const handleSpasialClick = () => {
    // Navigasi ke halaman statistik dengan filter spasial
    router.push("/webready");
  };

  return (
    <div className="bg-[#EDFCED]">
      <section className="px-6 py-20 max-w-7xl mx-auto">
        {/* Judul */}
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-[#01BBA6]">Data Terbaru</h2>
          <p className="text-slate-800 mt-1">
            Daftar data sektoral dan data spasial terbaru yang dipublikasikan
          </p>
        </div>

        {/* Dua Kolom */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* KIRI - Data Sektoral */}
          <div className="bg-white rounded-2xl p-6 shadow-md border border-slate-800/20 flex flex-col justify-between">
            <h3 className="text-lg font-bold text-slate-800 text-center mb-4">Data Sektoral</h3>
            <ListItems items={dataSektoral} />
            <div className="mt-6 text-center">
              <button
                onClick={handleSektoralClick}
                className="bg-gradient-to-r from-[#01BBA6] to-[#007686] text-white text-sm px-5 py-2 rounded-full hover:from-[#007686] hover:to-[#007686] transition-all"
              >
                Lihat Selengkapnya
              </button>
            </div>
          </div>

          {/* KANAN - Data Spasial */}
          <div className="bg-white rounded-2xl p-6 shadow-md border border-slate-800/20 flex flex-col items-center">
            <h3 className="text-lg font-bold text-slate-800 text-center mb-4">Data Spasial</h3>
            <Image
              src="/assets/kp.png"
              alt="Peta Kabupaten Purworejo"
              width={400}
              height={250}
              className="rounded-lg object-contain"
            />
            <button
              onClick={handleSpasialClick}
              className="mt-6 bg-gradient-to-r from-[#01BBA6] to-[#007686] text-white text-sm px-5 py-2 rounded-full hover:from-[#007686] hover:to-[#007686] transition-all"
            >
              Lihat Selengkapnya
            </button>
          </div>

        </div>
      </section>
    </div>
  );
};

export default DataTerbaru;
