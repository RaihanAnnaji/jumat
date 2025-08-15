import Banner from "../components/banner";
import Sekilas from "../components/sekilas";
import Indikator from "../components/indikator-makro/indikator";
import Statistik from "../components/data-statistik/statistik";
import Terbaru from "../components/terbaru";

export default function Home() {
  return (
    <main>
      <Banner />
      <Sekilas />
      <Indikator />
      <Statistik />
      <Terbaru />
    </main >
  );
}
