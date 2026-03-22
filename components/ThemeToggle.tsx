'use client'

import { useEffect, useState } from 'react'

export default function ThemeToggle() {
  const [theme, setTheme] = useState<'light' | 'dark' | null>(null)

  useEffect(() => {
    const root = document.documentElement
    const observer = new MutationObserver(() => {
      setTheme(root.classList.contains('dark') ? 'dark' : 'light')
    })
    observer.observe(root, { attributes: true, attributeFilter: ['class'] })
    setTimeout(() => {
      setTheme(root.classList.contains('dark') ? 'dark' : 'light')
    }, 0)
    return () => observer.disconnect()
  }, [])

  const toggleTheme = () => {
    const root = document.documentElement
    const newTheme = theme === 'light' ? 'dark' : 'light'
    
    if (newTheme === 'dark') {
      root.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    } else {
      root.classList.remove('dark')
      localStorage.setItem('theme', 'light')
    }
    setTheme(newTheme)
  }

  // Prevent hydration mismatch by rendering nothing until mounted
  if (!theme) return <div className="w-8 h-8" />

  return (
    <button 
      onClick={toggleTheme}
      className="p-1 px-3 text-foreground hover:text-accent transition-colors flex items-center justify-center rounded-sm hover:bg-stone-100 dark:hover:bg-stone-800"
      aria-label="Toggle Dark Mode"
    >
      {theme === 'light' ? (
        <span className="text-[10px] font-sans font-bold uppercase tracking-widest flex gap-2 items-center">
          <svg fill="currentColor" viewBox="0 0 20 20" className="w-3.5 h-3.5"><path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"></path></svg>
          Dark Mode
        </span>
      ) : (
        <span className="text-[10px] font-sans font-bold uppercase tracking-widest flex gap-2 items-center">
          <svg fill="currentColor" viewBox="0 0 20 20" className="w-3.5 h-3.5"><path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4.22 2.32a1 1 0 011.415 0l.708.707a1 1 0 01-1.414 1.415l-.708-.708a1 1 0 010-1.414zM18 10a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1zm-4.78 5.68a1 1 0 010 1.415l-.707.707a1 1 0 01-1.415-1.414l.708-.708a1 1 0 011.414 0zM10 16a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zm-5.68-4.78a1 1 0 011.415 0l.707.708a1 1 0 01-1.414 1.415l-.708-.707a1 1 0 010-1.414zM2 10a1 1 0 011-1h1a1 1 0 110 2H3a1 1 0 01-1-1zm3.32-5.68a1 1 0 011.415-1.414l.708.707a1 1 0 01-1.415 1.415l-.708-.708a1 1 0 010-1.414zM10 5a5 5 0 100 10 5 5 0 000-10z" clipRule="evenodd"></path></svg>
          Light Mode
        </span>
      )}
    </button>
  )
}
