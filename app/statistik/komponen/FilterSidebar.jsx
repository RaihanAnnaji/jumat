"use client";

import { useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

function Section({ title, children }) {
  return (
    <div className="bg-white/80 backdrop-blur border rounded-2xl p-4 mb-4 shadow-sm">
      <div className="font-semibold mb-3">{title}</div>
      {children}
    </div>
  );
}

function TextFilter({ placeholder, value, onChange }) {
  return (
    <input
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full px-3 py-2 rounded-xl border focus:outline-none focus:ring"
    />
  );
}

function RadioFilter({ title, name, options, initialValue, onChange }) {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredOptions = useMemo(() => {
    return Object.entries(options || {}).filter(([key, label]) =>
      String(label).toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [options, searchQuery]);

  return (
    <Section title={title}>
      <div className="mb-3">
        <TextFilter
          placeholder={`Cari ${title}`}
          value={searchQuery}
          onChange={setSearchQuery}
        />
      </div>

      {/* Semua data */}
      <label className="flex items-center gap-2 mb-2 cursor-pointer">
        <input
          type="radio"
          name={name}
          checked={!initialValue}
          readOnly
          onClick={() => onChange("")}
        />
        <span>Semua Data</span>
      </label>

      <div className="max-h-64 overflow-auto pr-1 space-y-2">
        {filteredOptions.map(([key, label]) => {
          const isActive = String(initialValue) === String(key);
          return (
            <label key={key} className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name={name}
                checked={isActive}
                readOnly
                onClick={() => {
                  if (isActive) {
                    // klik ulang → reset
                    onChange("");
                  } else {
                    onChange(key);
                  }
                }}
              />
              <span>{label}</span>
            </label>
          );
        })}
      </div>
    </Section>
  );
}

export default function FilterSidebar({
  initialOpd = "",
  initialUrusan = "",
  pInstansi = {},
  pUrusan = {},
}) {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();

  const updateQuery = (patch) => {
    const n = new URLSearchParams(params);
    Object.entries(patch).forEach(([k, v]) => {
      if (!v) n.delete(k);
      else n.set(k, v);
    });
    n.set("page", "1"); // reset halaman
    router.push(`${pathname}?${n.toString()}`);
  };

  return (
    <div className="space-y-4">
      <RadioFilter
        title="Filter OPD"
        name="opd"
        options={pInstansi}
        initialValue={initialOpd}
        onChange={(val) => updateQuery({ opd: val })}
      />

      <RadioFilter
        title="Filter Kategori Urusan"
        name="urusan"
        options={pUrusan}
        initialValue={initialUrusan}
        onChange={(val) => updateQuery({ urusan: val })}
      />
    </div>
  );
}
