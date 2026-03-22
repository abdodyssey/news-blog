import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/NavbarServer";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" });

export const metadata: Metadata = {
  title: { template: "%s | NewsBlog", default: "NewsBlog" },
  description: "A modern, high-quality editorial publication",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
                try {
                  if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                    document.documentElement.classList.add('dark')
                  } else {
                    document.documentElement.classList.remove('dark')
                  }
                } catch (_) {}
              `,
          }}
        />
      </head>
      <body
        className={`${inter.variable} ${playfair.variable} bg-background text-foreground antialiased font-sans flex flex-col min-h-screen`}
      >
        <Navbar />
        <div className="flex-1 animate-fade-in">
          {children}
        </div>
        <footer className="mt-24 border-t border-border py-16 bg-[#1A1A18] text-[#9CA3AF]">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6 text-sm font-sans">
            <span className="tracking-wide">
              © {new Date().getFullYear()} NewsBlog. All rights reserved.
            </span>
            <div className="flex items-center gap-8 uppercase tracking-widest text-[10px]">
              <a href="/about" className="hover:text-white transition-colors">
                About
              </a>
              <a href="/contact" className="hover:text-white transition-colors">
                Contact
              </a>
              <a href="/search" className="hover:text-white transition-colors">
                Search
              </a>
              <a href="/privacy" className="hover:text-white transition-colors">
                Privacy
              </a>
              <a href="/terms" className="hover:text-white transition-colors">
                Terms
              </a>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
