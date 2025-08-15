"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function SortDropdown({ initialSort = "az" }) {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();

  const update = (val) => {
    const n = new URLSearchParams(params);
    n.set("sort", val);
    router.push(`${pathname}?${n.toString()}`);
  };

  return (
    <div className="bg-white/80 border rounded-xl px-3 py-2">
      <label className="text-sm text-gray-500 mr-2">Urutan</label>
      <select
        className="outline-none bg-transparent"
        value={initialSort}
        onChange={(e) => update(e.target.value)}
      >
        <option value="az">A - Z</option>
        <option value="za">Z - A</option>
      </select>
    </div>
  );
}
