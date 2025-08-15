'use client'
import React, { useRef, useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Kartu from './kartu'
import dataKategori from './data'

export default function DataStatistik() {
  const scrollRef = useRef(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const router = useRouter()

  useEffect(() => {
    const container = scrollRef.current
    if (!container) return
    const onScroll = () =>
      setActiveIndex(
        Math.round(container.scrollLeft / (container.firstChild?.offsetWidth || 1))
      )
    container.addEventListener('scroll', onScroll, { passive: true })
    return () => container.removeEventListener('scroll', onScroll)
  }, [])

  const handleSelectFilter = (type, value) => {
    if (!value) return
    const query =
      type === 'opd'
        ? `?opd=${encodeURIComponent(value)}`
        : `?urusan=${encodeURIComponent(value)}`
    router.push(`/statistik${query}`)
  }

  return (
    <section className="px-6 py-20 max-w-7xl mx-auto">
      {/* Judul & Subjudul */}
      <div className="text-center mb-10">
        <h2 className="text-2xl md:text-3xl font-bold text-[#01BBA6]">
          Data Statistik Sektoral
        </h2>
        <p className="text-slate-800 mt-1">
          Data sektoral menggambarkan kondisi spesifik sektor
        </p>
      </div>

      {/* Grid desktop */}
      <div className="hidden md:grid md:grid-cols-4 gap-6">
        {dataKategori.map((item, i) => (
          <Kartu
            key={i}
            {...item}
            onClick={() => handleSelectFilter(item.type, item.filterValue)}
          />
        ))}
      </div>

      {/* Slider mobile */}
      <div className="md:hidden mt-10">
        <div
          ref={scrollRef}
          className="card-wrapper flex gap-6 overflow-x-auto snap-x snap-mandatory scroll-smooth px-4 -mx-4
                     scrollbar-hide overscroll-none"
        >
          {dataKategori.map((item, i) => (
            <div key={i} className="snap-center shrink-0 w-full max-w-sm">
              <Kartu
                {...item}
                onClick={() => handleSelectFilter(item.type, item.filterValue)}
              />
            </div>
          ))}
        </div>
        <div className="flex justify-center gap-2 mt-4">
          {dataKategori.map((_, i) => (
            <span
              key={i}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                i === activeIndex ? 'bg-[#01BBA6]' : 'bg-slate-400/30'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
