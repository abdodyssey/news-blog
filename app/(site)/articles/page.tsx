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
    <main className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-10">All Articles</h1>

      {articles.length === 0 ? (
        <p className="text-neutral-400">No articles yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((article) => (
            <ArticleCard key={article._id} article={article} />
          ))}
        </div>
      )}
    </main>
  )
}