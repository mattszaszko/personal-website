import type { Metadata } from "next";
import { Caveat, IBM_Plex_Mono, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
});

const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-ibm-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Matt Szaszko",
  description:
    "Sales / Solutions Engineer — portfolio, projects, and ways to get in touch.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      data-theme="light"
      className={`${plusJakarta.variable} ${ibmPlexMono.variable} ${caveat.variable} h-full antialiased`}
    >
      <body className="min-h-full overflow-hidden font-sans">{children}</body>
    </html>
  );
}
