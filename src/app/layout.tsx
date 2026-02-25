import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SessionProvider from "@/components/SessionProvider";

export const metadata: Metadata = {
  title: "WildWorld — Animal Database",
  description:
    "Explore the incredible diversity of animal life on Earth. Discover species, habitats, conservation status, and more.",
  keywords: ["animals", "wildlife", "nature", "conservation", "species", "database"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased bg-green-50 min-h-screen">
        <SessionProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </SessionProvider>
      </body>
    </html>
  );
}
