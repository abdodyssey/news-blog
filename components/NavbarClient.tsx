'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { Category } from '@/lib/types'
import ThemeToggle from './ThemeToggle'

interface NavbarProps {
  categories: Category[]
}

export function NavbarClient({ categories }: NavbarProps) {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
  }, [open])

  const links = [
    { href: '/', label: 'Home' },
    ...categories.map((cat) => ({
      href: `/category/${cat.slug?.current}`,
      label: cat.title,
    })),
    { href: '/about', label: 'About' },
  ]

  const dateString = new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })

  return (
    <>
      <header className={`w-full bg-nav-bg backdrop-blur-md border-b border-border transition-all duration-300 z-50 ${scrolled ? 'sticky top-0 shadow-[0_2px_10px_rgba(0,0,0,0.03)] dark:shadow-[0_2px_10px_rgba(0,0,0,0.2)]' : ''}`}>
        
        {/* Top Bar (hides on scroll) */}
        <div className={`overflow-hidden transition-all duration-300 ${scrolled ? 'max-h-0 opacity-0' : 'max-h-20 opacity-100 border-b border-border'}`}>
          <div className="max-w-7xl mx-auto px-6 lg:px-8 h-12 flex items-center justify-between text-[10px] font-sans font-bold uppercase tracking-widest text-foreground">
            {/* Left: Site Info */}
            <div className="hidden md:flex w-1/3 items-center">
              <span>NewsBlog Edition</span>
            </div>
            
            {/* Center: Date */}
            <div className="flex-1 md:w-1/3 flex justify-start md:justify-center text-muted whitespace-nowrap">
              {dateString}
            </div>

            {/* Right: Search & Theme */}
            <div className="flex-1 md:w-1/3 flex justify-end items-center gap-2 md:gap-4">
              <ThemeToggle />
              <Link href="/search" className="hidden md:flex items-center gap-2 hover:text-accent transition-colors hover-underline-slide">
                <span>Search</span>
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
              </Link>
            </div>
          </div>
        </div>

        {/* Main Nav Bar */}
        <div className="max-w-7xl mx-auto px-6 lg:px-8 h-16 md:h-20 flex items-center justify-between">
          <Link
            href="/"
            onClick={() => setOpen(false)}
            className={`font-serif font-black tracking-tighter text-foreground hover:text-accent transition-colors ${scrolled ? 'text-2xl md:text-3xl' : 'text-3xl md:text-5xl'}`}
            style={{ transition: 'font-size 0.3s' }}
          >
            NewsBlog
          </Link>

          {/* Desktop Categories */}
          <nav className="hidden md:flex items-center gap-8 text-[11px] font-sans font-bold uppercase tracking-widest text-foreground">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="hover-underline-slide py-2"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Mobile Hamburger Layout Adjuster */}
          <div className="md:hidden flex items-center gap-4">
            <Link href="/search" className="text-foreground">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
            </Link>
            <button
              onClick={() => setOpen(!open)}
              className="flex flex-col gap-[5px] p-2 text-foreground relative z-50"
              aria-label="Toggle menu"
            >
              <span className={`block w-6 h-[2px] bg-current transition-transform duration-300 ${open ? 'translate-y-[7px] rotate-45' : ''}`} />
              <span className={`block w-6 h-[2px] bg-current transition-opacity duration-300 ${open ? 'opacity-0' : ''}`} />
              <span className={`block w-6 h-[2px] bg-current transition-transform duration-300 ${open ? '-translate-y-[7px] -rotate-45' : ''}`} />
            </button>
          </div>
        </div>
      </header>

      {/* Full Screen Mobile Menu */}
      <div className={`fixed inset-0 z-40 bg-background flex flex-col justify-center transition-all duration-500 ease-in-out md:hidden ${open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
        <nav className="flex flex-col items-center gap-8 px-6">
          {links.map((link, i) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="text-4xl font-serif font-bold text-foreground hover:text-accent transition-colors"
              style={{ transform: open ? 'translateY(0)' : 'translateY(20px)', opacity: open ? 1 : 0, transitionDelay: `${i * 50}ms`, transitionDuration: '0.4s' }}
            >
              {link.label}
            </Link>
          ))}
          <div className="w-16 h-px bg-border my-4" />
          <div className="flex justify-center scale-150 mb-2">
            <ThemeToggle />
          </div>
          <Link
            href="/search"
            onClick={() => setOpen(false)}
            className="text-[11px] font-sans font-bold uppercase tracking-widest text-foreground hover:text-accent transition-colors"
          >
            Search Articles
          </Link>
          <Link
            href="/contact"
            onClick={() => setOpen(false)}
            className="text-[11px] font-sans font-bold uppercase tracking-widest text-foreground hover:text-accent transition-colors"
          >
            Contact Us
          </Link>
        </nav>
      </div>
    </>
  )
}