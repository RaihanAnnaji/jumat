"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";

export default function SearchBar({ initialQuery = "" }) {
  const [value, setValue] = useState(initialQuery);
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();

  useEffect(() => setValue(initialQuery), [initialQuery]);

  // Auto reset ketika input kosong
  useEffect(() => {
    if (value === "") {
      const n = new URLSearchParams(params);
      n.delete("q");
      router.push(`${pathname}?${n.toString()}`);
    }
  }, [value, params, pathname, router]);

  const submit = (e) => {
    e?.preventDefault?.();
    const n = new URLSearchParams(params);
    if (value) n.set("q", value);
    else n.delete("q");
    n.set("page", "1"); // reset page
    router.push(`${pathname}?${n.toString()}`);
  };

  return (
    <form onSubmit={submit} className="flex items-center gap-2 bg-white/80 border rounded-full px-3 py-2">
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="flex-1 bg-transparent outline-none"
        placeholder="Cari apa aja disini"
      />
      <button
        type="submit"
        className="px-4 py-2 rounded-full bg-emerald-500 text-white hover:bg-emerald-600"
      >
        Cari
      </button>
    </form>
  );
}
