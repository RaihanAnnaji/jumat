"use client";
import { FaSearch } from "react-icons/fa";
import { useState } from "react";
import { useRouter } from "next/navigation";

const Banner = () => {
  const router = useRouter();
  const [keyword, setKeyword] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    const query = keyword.trim();
    if (query) {
      router.push(`/statistik?q=${encodeURIComponent(query)}&page=1`);
    } else {
      router.push(`/statistik`);
    }
  };

  return (
    <section className="relative h-screen w-full bg-[url('/assets/bg1.jpg')] bg-cover bg-center bg-no-repeat text-white">
      <div className="pointer-events-none absolute top-0 left-0 h-1/2 w-full bg-gradient-to-t from-transparent to-white/30"></div>

      <div className="container mx-auto flex h-full items-center justify-center px-6">
        <div className="relative z-20 text-center md:w-4/7">
          <h1 className="mt-32 text-3xl font-bold drop-shadow-md md:text-4xl">
            Selamat datang di{" "}
            <span className="text-[#05EBD0]">Satu Data</span> Kabupaten Kulon Progo
          </h1>

          {/* Search bar */}
          <form
            onSubmit={handleSearch}
            className="mt-12 flex flex-wrap items-center justify-center rounded-full border-2 border-slate-100/60 bg-white/50 ps-4 pe-1 backdrop-blur-md transition duration-300 focus-within:border-[#01BBA6] focus-within:shadow-[0_0_6px_#01BBA6] focus-within:ring-2 focus-within:ring-[#01BBA6]/30"
          >
            <input
              type="text"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              placeholder="Cari data..."
              className="w-full flex-1 bg-transparent py-2 text-slate-800 placeholder:text-slate-800/50 focus:outline-none"
            />
            <button
              type="submit"
              className="flex cursor-pointer items-center gap-2 rounded-full bg-gradient-to-r from-[#01BBA6] to-[#007686] px-4 py-2 text-sm text-white transition duration-300 hover:from-[#007686] hover:to-[#005C66] active:from-[#007686] active:to-[#005C66]"
            >
              <FaSearch className="h-4 w-4" /> Cari
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Banner;
