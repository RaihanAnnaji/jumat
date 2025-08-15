"use client";
import { FaChartBar, FaUsers, FaFolderOpen } from "react-icons/fa";
import CountUp from "react-countup";

const stats = [
  { icon: FaChartBar, value: 476, label: "Dataset" },
  { icon: FaUsers, value: 26, label: "Produsen" },
  { icon: FaFolderOpen, value: 16, label: "Topik" }
];

const Sekilas = () => (
  <section className="container mx-auto my-20 max-w-7xl px-6">
    {/* title & subtitle */}
    <div className="text-center">
      <h2 className="text-2xl md:text-3xl font-bold text-[#01BBA6]">Sekilas</h2>
      <p className="mt-1 text-slate-800">Sekilas info SatuData Kulon Progo</p>
    </div>

    <div className="grid items-center gap-10 md:grid-cols-2">
      <div className="mt-10 flex justify-center">
        <img src="/assets/data2.png" alt="Chart" className="md:w-[420px] object-contain transition duration-300 hover:-translate-y-1 hover:scale-105" />
      </div>

      {/* teks & icon statistik */}
      <div className="text-justify text-slate-800">
        <p>Satu Data Kabupaten Kulon Progo merupakan kebijakan tata kelola data pemerintah untuk menyajikan data yang akurat, mutakhir, dan mudah diakses guna mendukung kolaborasi antar instansi melalui penerapan standar data.</p>

        <div className="mt-10 grid grid-cols-3 gap-2 text-center">
          {stats.map(({ icon: Icon, value, label }, i) => (
            <div key={i} className="rounded-2xl py-4 transition duration-300 hover:bg-[#EDFCED]">
              <Icon className="mx-auto text-3xl text-[#01BBA6]" />
              <p className="text-xl font-bold text-slate-800">
                <CountUp end={value} duration={1.5} enableScrollSpy scrollSpyOnce scrollSpyDelay={100} />
                <span className="block text-sm font-medium text-gray-600">{label}</span>
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);
export default Sekilas;