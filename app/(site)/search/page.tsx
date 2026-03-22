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
    <main className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-8">Search</h1>

      {/* Search input */}
      <div className="flex gap-3 mb-10">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Search articles..."
          className="flex-1 px-4 py-2.5 rounded-lg border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleSearch}
          disabled={loading}
          className="px-6 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white text-sm font-medium transition-colors"
        >
          {loading ? 'Searching...' : 'Search'}
        </button>
      </div>

      {/* Results */}
      {searched && !loading && (
        <>
          <p className="text-sm text-neutral-400 mb-6">
            {results.length} result{results.length !== 1 ? 's' : ''} for "{query}"
          </p>

          {results.length === 0 ? (
            <p className="text-neutral-400">No articles found. Try a different keyword.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {results.map((article) => (
                <ArticleCard key={article._id} article={article} />
              ))}
            </div>
          )}
        </>
      )}
    </main>
  )
}