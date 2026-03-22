'use client'

import { useState } from 'react'
import { client } from '@/sanity/lib/client'
import { Article } from '@/lib/types'
import ArticleCard from '@/components/ArticleCard'
import { defineQuery } from 'next-sanity'

const SEARCH_QUERY = defineQuery(`
  *[_type == "article" && (
    title match $q ||
    excerpt match $q
  )] | order(publishedAt desc) {
    _id, title, slug, excerpt, publishedAt, mainImage,
    "author": author->{ name, slug },
    "category": category->{ title, slug }
  }
`)

export default function SearchPage() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<Article[]>([])
  const [loading, setLoading] = useState(false)
  const [searched, setSearched] = useState(false)

  const handleSearch = async () => {
    if (!query.trim()) return
    setLoading(true)
    setSearched(true)
    const data = await client.fetch<Article[]>(SEARCH_QUERY, { q: `${query}*` })
    setResults(data)
    setLoading(false)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSearch()
  }

  return (
    <main className="max-w-7xl mx-auto px-6 lg:px-8 py-16 md:py-24 min-h-screen">
      <div className="max-w-3xl mx-auto text-center mb-20 animate-fade-in">
        <h1 className="text-5xl md:text-7xl font-serif font-black leading-[1.1] mb-12 text-foreground">
          Search Archives
        </h1>
        <div className="relative group mx-auto">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Search authors, topics, keywords..."
            className="w-full bg-card-bg border border-border focus:border-accent focus:ring-1 focus:ring-accent py-6 pl-6 pr-36 text-xl md:text-3xl font-serif text-foreground placeholder-stone-400 focus:outline-none transition-all rounded-sm shadow-sm"
          />
          <button
            onClick={handleSearch}
            disabled={loading}
            className="absolute right-2 bottom-2 top-2 px-8 border-none bg-accent text-[11px] font-sans font-bold uppercase tracking-widest text-white hover:bg-[#A00F18] transition-all duration-300 rounded-sm disabled:opacity-50"
          >
            {loading ? 'Searching' : 'Search'}
          </button>
        </div>
      </div>

      {searched && !loading && (
        <div className="max-w-4xl mx-auto animate-fade-in">
          <p className="text-[11px] font-sans font-bold uppercase tracking-widest text-muted mb-8 border-b border-border pb-4">
            {results.length} result{results.length !== 1 ? 's' : ''} matched &quot;{query}&quot;
          </p>

          {results.length === 0 ? (
            <p className="text-2xl font-serif italic text-muted max-w-lg">No coverage found. We recommend trying a more general search term.</p>
          ) : (
            <div className="flex flex-col border-t-2 border-foreground pt-4">
              {results.map((article) => (
                <ArticleCard key={article._id} article={article} layout="list" />
              ))}
            </div>
          )}
        </div>
      )}
    </main>
  )
}