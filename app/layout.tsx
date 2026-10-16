import type { Metadata } from "next";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { IslandProvider } from "@/components/IslandContext";

export const metadata: Metadata = {
  title: "The Sovereign Classroom — Caribbean Assessment in the Age of AI",
  description:
    "An interactive workshop by Dr. Rohan Jowallah. Explore authentic assessment design through the SALF, CARE, CRAFT, and ACRE frameworks — grounded in Caribbean pedagogical traditions.",
  keywords: [
    "Caribbean education",
    "AI assessment",
    "SALF",
    "CARE framework",
    "CRAFT framework",
    "ACRE framework",
    "Rohan Jowallah",
    "authentic assessment",
  ],
  authors: [{ name: "Dr. Rohan Jowallah" }],
  openGraph: {
    title: "The Sovereign Classroom",
    description:
      "Caribbean-authentic assessment design for the age of AI. SALF · CARE · CRAFT · ACRE.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        <IslandProvider>
          <Nav />
          <main className="flex-1 fade-in">{children}</main>
          <Footer />
        </IslandProvider>
      </body>
    </html>
  );
}

