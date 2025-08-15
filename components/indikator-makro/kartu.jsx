import React from 'react'
import { HiTrendingDown, HiTrendingUp } from 'react-icons/hi'
import { TbFileSad } from 'react-icons/tb'

const Kartu = ({ tahunA, persenA, tahunB, persenB, caption }) => {
  const isNA = persenA === "N/A" || persenB === "N/A"
  const valueA = isNA ? null : parseFloat(persenA)
  const valueB = isNA ? null : parseFloat(persenB)
  const isTurun = !isNA && valueB < valueA
  const Icon = isNA ? TbFileSad : (isTurun ? HiTrendingDown : HiTrendingUp)
  const label = isNA ? "-" : (isTurun ? "Turun" : "Naik")

  return (
    <div className="group bg-gradient-to-b from-[#01BBA6] to-[#028b86] text-white rounded-2xl shadow-sm ring ring-gray-900/5 px-6 py-6 w-full mx-auto text-center transition-all ease-in-out duration-300 hover:-translate-y-1 hover:shadow-lg hover:ring-2">
      <h3 className="text-lg">{caption}</h3>

      {/* icon */}
      <div className="relative w-full aspect-square max-w-[150px] mx-auto bg-white/20 rounded-full flex flex-col items-center justify-center my-6 transform transition-all ease-in-out duration-300 group-hover:scale-105 group-hover:-translate-y-1">
        <Icon className="text-white text-6xl mb-2" />
        <h4 className="text-sm">{label}</h4>
      </div>

      {/* keterangan */}
      <div className="text-sm mb-6 space-y-2 text-center">
        <h4 className="text-lg">{tahunB} : <span className="font-semibold text-white">{persenB}</span></h4>
        <hr className="border-white/30 mx-auto w-1/2" />
        <h4>{tahunA} : <span className="font-semibold text-white">{persenA}</span></h4>
      </div>
    </div>
  )
}

export default Kartu