"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

// inisialisasi nav-item dan path link
const navItems = [
  { name: "Beranda", path: "/" },
  { name: "Data Statistik", path: "/statistik" },
  { name: "Data Spasial", path: "/webready" },
  { name: "Survei", path: "/survei" },
  { name: "Feedback", path: "/feedback" },
  { name: "Permohonan Data", path: "/permohonan" }
];

const Navbar = () => {
  // inisialisasi pathname, kondisi menu, kondisi scroll, navvar-reff
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const navRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (navRef.current && !navRef.current.contains(e.target)) setIsOpen(false);
    };
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    document.addEventListener("mousedown", handleClickOutside);
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    // navbar canvas
    <header className={`fixed top-0 left-0 z-50 w-full transition-all duration-300 ${isScrolled ? "bg-white/60 shadow-md backdrop-blur-md" : "bg-transparent"} text-slate-800`}>
      {/* navbar Container */}
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3" ref={navRef}>
        {/* navbar icon + name */}
        <Link href="/" className="flex items-center gap-2">
          <Image src="/assets/favicon.png" alt="Logo" width={29} height={29} />
          <div className="flex flex-col leading-tight">
            <span className="text-lg font-semibold">SatuData</span>
            <span className="text-xs">Kulon Progo</span>
          </div>
        </Link>

        {/* hamburger button to open nav-menu */}
        <button onClick={() => setIsOpen(!isOpen)} className="absolute right-6 block focus:outline-none md:hidden" aria-label="Toggle menu">
          <span className={`my-2 block h-[2px] w-[30px] origin-top-left bg-slate-800 transition duration-300 ease-in-out ${isOpen ? "translate-y-[0px] rotate-45" : ""}`} />
          <span className={`my-2 block h-[2px] w-[30px] bg-slate-800 transition duration-200 ease-in-out ${isOpen ? "opacity-0" : ""}`} />
          <span className={`my-2 block h-[2px] w-[30px] origin-bottom-left bg-slate-800 transition duration-300 ease-in-out ${isOpen ? "-translate-y-[0px] -rotate-45" : ""}`} />
        </button>

        {/* nav-menu */}
        <nav className={`absolute top-full right-6 mt-4 md:static md:mt-0 ${isOpen ? "block" : "hidden"} rounded-xl bg-white shadow-xl md:block md:rounded-none md:bg-transparent md:shadow-none`}>
          <ul className="flex flex-col gap-4 p-5 text-sm md:flex-row md:p-0">
            {navItems.map((item) => (
              <li key={item.path}>
                <Link href={item.path}>
                  <span className={`nav-item ${pathname === item.path ? "active" : ""}`}>{item.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;