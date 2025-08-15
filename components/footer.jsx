"use client"
import Image from "next/image"
import { FaInstagram, FaFacebookF, FaYoutube } from "react-icons/fa"

export default function Footer() {
  return (
    <footer className="bg-slate-800 text-white rounded-t-2xl shadow-inner">
      <div className="max-w-7xl mx-auto flex flex-col gap-6 px-6 py-6">
        <div className="flex items-center gap-3 pt-2">
          <Image src="/assets/favicon.png" alt="Logo" width={30} height={30} />
          <div>
            <h2 className="font-bold text-xl leading-tight">Satu Data</h2>
            <p className="text-xs text-white/80">Kabupaten Kulon Progo</p>
          </div>
        </div>
        <div className="flex flex-col md:flex-row justify-between gap-8">
          <div className="flex-1 text-xs text-white/90 space-y-3 leading-relaxed">
            <div><p className="font-semibold">Alamat Kantor</p><p>Jl. Tamtama, Terbah, Wates, Kabupaten Kulon Progo, DIY 55651</p></div>
            <div><p className="font-semibold">Telepon</p><p><a href="tel:0274773010" className="text-sky-300 underline">(0274) 773010</a></p></div>
            <div><p className="font-semibold">Email</p><p><a href="mailto:kominfo@kulonprogokab.go.id" className="text-sky-300 underline">kominfo@kulonprogokab.go.id</a></p></div>
          </div>
          <div className="flex-1 text-xs text-white/90 space-y-4 md:pt-2">
            <div className="flex items-center gap-2"><div className="text-base"><FaInstagram /></div><div><p className="font-semibold">Instagram</p><p className="text-xs text-white/70">lorem ipsum</p></div></div>
            <div className="flex items-center gap-2"><div className="text-base"><FaFacebookF /></div><div><p className="font-semibold">Facebook</p><p className="text-xs text-white/70">lorem ipsum</p></div></div>
            <div className="flex items-center gap-2"><div className="text-base"><FaYoutube /></div><div><p className="font-semibold">Youtube</p><p className="text-xs text-white/70">lorem ipsum</p></div></div>
          </div>
        </div>
      </div>
      <div className="w-full border-b border-white/20 my-4"></div>
      <div className="text-center pb-2"><small>© Copyright Diskominfo. All Rights Reserved</small></div>
    </footer>
  )
}
