"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function Pagination({ currentPage = 1, totalPages = 1, preserve = {} }) {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();

  const go = (page) => {
    const n = new URLSearchParams(params);
    n.set("page", String(page));
    // Pastikan filter lain tetap ada (searchParams sudah preserve by default)
    router.push(`${pathname}?${n.toString()}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1)
    .slice(Math.max(0, currentPage - 3), Math.min(totalPages, currentPage + 2)); // window pendek

  return (
    <div className="flex items-center justify-center gap-2 mt-6">
      <button
        onClick={() => go(Math.max(1, currentPage - 1))}
        className="px-3 py-1 rounded-full border bg-white/80"
        disabled={currentPage === 1}
      >
        ‹ Back
      </button>

      {pages.map((p) => (
        <button
          key={p}
          onClick={() => go(p)}
          className={`w-9 h-9 rounded-full border ${
            p === currentPage ? "bg-emerald-500 text-white" : "bg-white/80"
          }`}
        >
          {p}
        </button>
      ))}

      <button
        onClick={() => go(Math.min(totalPages, currentPage + 1))}
        className="px-3 py-1 rounded-full border bg-white/80"
        disabled={currentPage === totalPages}
      >
        Next ›
      </button>
    </div>
  );
}
