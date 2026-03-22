import { client } from '@/sanity/lib/client'
import { ARTICLES_BY_CATEGORY_QUERY, CATEGORY_SLUGS_QUERY } from '@/sanity/lib/queries'
import { Article } from '@/lib/types'
import ArticleCard from '@/components/ArticleCard'
import { notFound } from 'next/navigation'
import { Metadata } from 'next'

export const revalidate = 60

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const slugs = await client.fetch<{ slug: string }[]>(CATEGORY_SLUGS_QUERY)
  return slugs.map((s) => ({ slug: s.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  return {
    title: `Category: ${slug.replace(/-/g, ' ')}`,
  }
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params
  const articles = await client.fetch<Article[]>(ARTICLES_BY_CATEGORY_QUERY, { slug })

  if (!articles) notFound()

  return (
    <main className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-2 capitalize">{slug.replace(/-/g, ' ')}</h1>
      <p className="text-neutral-400 mb-10">{articles.length} articles</p>

      {articles.length === 0 ? (
        <p className="text-neutral-400">No articles in this category yet.</p>
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