// app/layout.js

import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export const metadata = {
  title: "Codernatix | Software & Digital Solutions",
  description:
    "Codernatix builds digital products, custom software, websites, mobile apps, and technology solutions for growing businesses.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navbar />

        <main>{children}</main>

        <Footer />
      </body>
    </html>
  );
}