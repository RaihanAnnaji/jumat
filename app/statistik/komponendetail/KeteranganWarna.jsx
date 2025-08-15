export default function KeteranganWarna() {
  return (
    <div className="mt-4 text-sm">
      <p className="font-semibold">Keterangan warna angka isi:</p>
      <ul>
        <li><span className="text-black">Hitam</span>: Data tetap</li>
        <li><span className="text-yellow-500">Kuning</span>: Data sementara</li>
        <li><span className="text-red-500">Merah</span>: Data sangat sementara</li>
        <li><span className="text-gray-400">Abu-abu</span>: Data tidak relevan</li>
      </ul>
    </div>
  );
}
