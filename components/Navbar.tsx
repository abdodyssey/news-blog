import Link from 'next/link'
import { CATEGORIES_QUERY } from '@/sanity/lib/queries'
import { client } from '@/sanity/lib/client'
import { Category } from '@/lib/types'

export default async function Navbar() {
  const categories = await client.fetch<Category[]>(CATEGORIES_QUERY)

  return (
    <header className="sticky top-0 z-50 w-full border-b border-neutral-200 dark:border-neutral-800 bg-white/80 dark:bg-neutral-950/80 backdrop-blur-sm">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="text-lg font-bold tracking-tight hover:text-blue-600 transition-colors">
          NewsBlog
        </Link>

        {/* Nav links */}
        <nav className="flex items-center gap-6 text-sm text-neutral-600 dark:text-neutral-400">
          <Link href="/articles" className="hover:text-blue-600 transition-colors">
            Articles
          </Link>
          {categories.map((cat) => (
            <Link
              key={cat._id}
              href={`/category/${cat.slug?.current}`}
              className="hover:text-blue-600 transition-colors"
            >
              {cat.title}
            </Link>
          ))}
          <Link href="/search" className="hover:text-blue-600 transition-colors">
            Search
          </Link>
          <Link href="/about" className="hover:text-blue-600 transition-colors">
            About
          </Link>
          <Link href="/contact" className="hover:text-blue-600 transition-colors">
            Contact
          </Link>
        </nav>
      </div>
    </header>
  )
}