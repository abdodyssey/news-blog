import { client } from '@/sanity/lib/client'
import { FEATURED_ARTICLES_QUERY, ARTICLES_QUERY } from '@/sanity/lib/queries'
import { Article } from '@/lib/types'
import ArticleCard from '@/components/ArticleCard'

export const revalidate = 60

export default async function HomePage() {
  const [featured, latest] = await Promise.all([
    client.fetch<Article[]>(FEATURED_ARTICLES_QUERY),
    client.fetch<Article[]>(ARTICLES_QUERY),
  ])

  return (
    <main className="max-w-6xl mx-auto px-4 py-10">
      {/* Featured */}
      {featured.length > 0 && (
        <section className="mb-14">
          <h2 className="text-2xl font-semibold mb-6">Featured</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featured.map((article) => (
              <ArticleCard key={article._id} article={article} />
            ))}
          </div>
        </section>
      )}

      {/* Latest */}
      <section>
        <h2 className="text-2xl font-semibold mb-6">Latest Articles</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {latest.map((article) => (
            <ArticleCard key={article._id} article={article} />
          ))}
        </div>
      </section>
    </main>
  )
}