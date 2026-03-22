import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

const geist = Geist({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: { template: "%s | NewsBlog", default: "NewsBlog" },
  description: "A modern news and blog website",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geist.className} bg-white dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 antialiased`}
      >
        <Navbar />
        {children}
        <footer className="mt-20 border-t border-neutral-200 dark:border-neutral-800 py-10">
          <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-neutral-400">
            <span>
              © {new Date().getFullYear()} NewsBlog. All rights reserved.
            </span>
            <div className="flex items-center gap-6">
              <a
                href="/about"
                className="hover:text-blue-500 transition-colors"
              >
                About
              </a>
              <a
                href="/contact"
                className="hover:text-blue-500 transition-colors"
              >
                Contact
              </a>
              <a
                href="/privacy"
                className="hover:text-blue-500 transition-colors"
              >
                Privacy
              </a>
              <a
                href="/terms"
                className="hover:text-blue-500 transition-colors"
              >
                Terms
              </a>
              <a
                href="/feed.xml"
                className="hover:text-blue-500 transition-colors"
              >
                RSS
              </a>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
