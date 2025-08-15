'use client'
import React, { useRef, useState, useEffect } from 'react'
import Kartu from './kartu'

export default function SliderMobile({ dataIndikator }) {
  const scrollRef = useRef(null)
  const [activeIndex, setActiveIndex] = useState(0)

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

  return (
    <div className="md:hidden mt-10">
      <div
        ref={scrollRef}
        className="card-wrapper flex gap-6 overflow-x-auto snap-x snap-mandatory scroll-smooth px-4 -mx-4 scrollbar-hide"
      >
        {dataIndikator.map((item, i) => (
          <div key={i} className="snap-center shrink-0 w-full max-w-sm">
            <Kartu {...item} />
          </div>
        ))}
      </div>
      <div className="flex justify-center gap-2 mt-4">
        {dataIndikator.map((_, i) => (
          <span
            key={i}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              i === activeIndex ? 'bg-[#01BBA6]' : 'bg-slate-400/30'
            }`}
          />
        ))}
      </div>
    </div>
  )
}
