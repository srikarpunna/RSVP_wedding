import type { Metadata } from "next";
import { Playfair_Display, Lato } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({ 
  subsets: ["latin"],
  variable: "--font-playfair",
});

const lato = Lato({ 
  weight: ["300", "400", "700"],
  subsets: ["latin"],
  variable: "--font-lato",
});

export const metadata: Metadata = {
  title: "Prathyusha & Sujit | Wedding RSVP",
  description: "Join us in celebrating the wedding of Prathyusha & Sujit. May 7-10, 2026.",
  icons: {
    icon: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🌸</text></svg>",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${playfair.variable} ${lato.variable} font-sans`}>
        {children}
      </body>
    </html>
  );
}
