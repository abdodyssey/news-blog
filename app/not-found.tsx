import Link from 'next/link'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: '404 — Story Not Found',
}

export default function NotFound() {
  return (
    <main className="max-w-[680px] mx-auto px-6 lg:px-8 py-32 text-center flex flex-col items-center justify-center min-h-[70vh] animate-fade-in">
      <div className="mb-4 text-stone-200 dark:text-stone-800/40 select-none">
        <h1 className="text-[14rem] md:text-[20rem] font-serif font-black leading-none tracking-tighter mix-blend-multiply dark:mix-blend-screen">
          404
        </h1>
      </div>
      <div className="relative z-10 -mt-16 md:-mt-24 bg-background px-8 py-4 inline-block mb-8">
        <h2 className="text-4xl md:text-5xl font-serif font-bold text-foreground">Story Not Found</h2>
      </div>
      <p className="text-xl md:text-[22px] text-muted font-serif font-light italic mb-12 max-w-lg mx-auto text-balance !leading-relaxed">
        The coverage or page you&apos;re attempting to access has been moved, archived, or no longer exists.
      </p>
      <Link
        href="/"
        className="px-10 py-5 bg-accent text-white text-[11px] font-sans font-bold uppercase tracking-widest hover:bg-[#A00F18] transition-all duration-300 rounded-sm hover:-translate-y-1 shadow-md"
      >
        Return to Homepage
      </Link>
    </main>
  )
}