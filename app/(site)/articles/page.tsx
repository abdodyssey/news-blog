import { client } from '@/sanity/lib/client'
import { ARTICLES_QUERY } from '@/sanity/lib/queries'
import { Article } from '@/lib/types'
import ArticleCard from '@/components/ArticleCard'
import { Metadata } from 'next'

export const revalidate = 60

export const metadata: Metadata = {
  title: 'All Articles',
  description: 'Browse all articles',
}

export default async function ArticlesPage() {
  const articles = await client.fetch<Article[]>(ARTICLES_QUERY)

  return (
    <main className="max-w-7xl mx-auto px-6 lg:px-8 py-16 md:py-24 min-h-screen">
      <div className="max-w-3xl mb-16">
        <h1 className="text-5xl md:text-7xl font-serif font-black leading-[1.1] tracking-tight mb-8 text-foreground animate-fade-in">
          Latest Reporting
        </h1>
        <p className="text-xl md:text-2xl text-muted font-serif italic mb-10 max-w-2xl text-balance animate-fade-in" style={{ animationDelay: '100ms' }}>
          Explore our complete archive of in-depth analysis, timely news, and exclusive reports.
        </p>
      </div>

      {articles.length === 0 ? (
        <p className="text-muted font-serif italic text-xl border-t border-stone-200 dark:border-stone-800 pt-8 animate-fade-in">
          No records currently available. Check back soon.
        </p>
      ) : (
        <div className="flex flex-col border-t-2 border-foreground pt-4 animate-fade-in" style={{ animationDelay: '200ms' }}>
          {articles.map((article) => (
            <ArticleCard key={article._id} article={article} layout="list" />
          ))}
        </div>
      )}
    </main>
  )
}