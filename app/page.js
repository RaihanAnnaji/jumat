import Banner from "../components/banner";
import SekilasWrapper from "../components/SekilasWrapper";
import Indikator from "../components/indikator-makro/indikator";
import Statistik from "../components/data-statistik/statistik";
import Terbaru from "../components/terbaru";

export default function Home() {
  return (
    <main>
      <Banner />
      <SekilasWrapper />
      <Indikator />
      <Statistik />
      <Terbaru />
    </main>
  );
}
