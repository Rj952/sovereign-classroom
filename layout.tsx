import type { Metadata } from "next";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "The Sovereign Classroom — Caribbean Assessment in the Age of AI",
  description:
    "An interactive companion to Dr. Rohan Jowallah's Sovereign Classroom keynote. Explore authentic assessment design through the SALF, CARE, CRAFT, and ACRE frameworks — grounded in Caribbean pedagogical traditions.",
  keywords: [
    "Caribbean education",
    "AI assessment",
    "SALF",
    "CARE framework",
    "CRAFT framework",
    "ACRE framework",
    "Rohan Jowallah",
    "Sovereign Intelligence",
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
        <Nav />
        <main className="flex-1 fade-in">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
