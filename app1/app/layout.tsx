import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Header from "./components/header"; 
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "E-Commerce Inventory Engine",
  description: "Stateful local retail operations prototype",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="bg-zinc-950 text-zinc-50 antialiased">
      <body className={inter.className}>
        {/* The header is placed outside of <main> so it runs edge-to-edge across the screen */}
        <Header />
        
        {/* The children prop injects whatever page.tsx the user is visiting */}
        <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
          {children}
        </main>
      </body>
    </html>
  );
}


