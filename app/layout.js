import { Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "../components/navbar";
import Footer from "../components/footer";

const fontPoppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "500", "700"],
});

export const metadata = {
  title: "SatuData Kulon Progo",
  description: "Portal layanan data kabupaten kulon progo",
  icons: {
    icon: "/assets/favicon.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${fontPoppins.className} antialiased`}>
        <Navbar />
        <div className="mx-auto">{children}</div>
        <Footer/>
      </body>
    </html>
  );
}
