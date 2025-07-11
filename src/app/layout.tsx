import type { Metadata } from "next";
import { Inter, Lato } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });
const lato = Lato({ 
  subsets: ["latin"],
  weight: ['100', '300', '400', '700', '900'],
  variable: '--font-lato',
});
const mollieGlaston = localFont({
  src: '../fonts/Mollie-Glaston.ttf',
  variable: '--font-mollie-glaston',
  weight: '400',
});

export const metadata: Metadata = {
  title: "Solace Candidate Assignment",
  description: "Show us what you got",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} ${mollieGlaston.variable} ${lato.variable}`}>{children}</body>
    </html>
  );
}
