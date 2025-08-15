// indikator.jsx (Server Component)
import React from 'react'
import Kartu from './kartu'
import SliderMobile from './SliderMobile'
import { getIndikatorData } from '../../lib/api'
import dataDummy from './data' // fallback

export default async function DataStatistik() {
  let dataIndikator = []

  try {
    dataIndikator = await getIndikatorData({ revalidate: 300 })
  } catch (err) {
    console.error('Gagal fetch API indikator, pakai data dummy:', err)
    dataIndikator = dataDummy
  }

  if (!dataIndikator.length) {
    return <p className="text-center py-10">Tidak ada data tersedia</p>
  }

  // 4 judul indikator yang ditentukan manual (urutannya sesuai data API)
  const judulConfig = [
    'Indeks Pembangunan Manusia (IPM)',
    'Angka Kemiskinan',
    'Angka Pengangguran',
    'Laju Pertumbuhan Ekonomi Kabupaten Kulon Progo',
  ]

  // gabungkan judul manual ke data API
  const dataDenganJudul = dataIndikator.map((item, i) => ({
    ...item,
    caption: judulConfig[i] || item.caption, // jika judulConfig kurang, pakai caption asli
  }))

  return (
    <div className="bg-[#EDFCED]">
      <section className="px-6 py-20 max-w-7xl mx-auto text-center">
        {/* Judul besar & subjudul section */}
        <h2 className="text-2xl md:text-3xl font-bold text-[#01BBA6]">
          Indikator Makro
        </h2>
        <p className="text-slate-800 mt-1">Capaian Kabupaten Kulon Progo</p>

        {/* Grid desktop */}
        <div className="hidden md:grid md:grid-cols-4 gap-6 mt-10">
          {dataDenganJudul.map((item, i) => (
            <Kartu key={i} {...item} />
          ))}
        </div>

        {/* Slider mobile */}
        <SliderMobile dataIndikator={dataDenganJudul} />
      </section>
    </div>
  )
}
