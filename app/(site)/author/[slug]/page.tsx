import { client } from '@/sanity/lib/client'
import { AUTHOR_BY_SLUG_QUERY, ARTICLES_BY_AUTHOR_QUERY, AUTHOR_SLUGS_QUERY } from '@/sanity/lib/queries'
import { Article, Author } from '@/lib/types'
import ArticleCard from '@/components/ArticleCard'
import { urlFor } from '@/sanity/lib/image'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { Metadata } from 'next'

export const revalidate = 60

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const slugs = await client.fetch<{ slug: string }[]>(AUTHOR_SLUGS_QUERY)
  return slugs.map((s) => ({ slug: s.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const author = await client.fetch<Author>(AUTHOR_BY_SLUG_QUERY, { slug })
  return { title: author?.name ?? 'Author' }
}

export default async function AuthorPage({ params }: Props) {
  const { slug } = await params

  const [author, articles] = await Promise.all([
    client.fetch<Author>(AUTHOR_BY_SLUG_QUERY, { slug }),
    client.fetch<Article[]>(ARTICLES_BY_AUTHOR_QUERY, { slug }),
  ])

  if (!author) notFound()

  return (
    <main className="max-w-6xl mx-auto px-4 py-10">
      {/* Author header */}
      <div className="flex items-center gap-6 mb-12">
        {author.photo && (
          <div className="relative w-20 h-20 rounded-full overflow-hidden shrink-0">
            <Image
              src={urlFor(author.photo).width(160).height(160).url()}
              alt={author.name}
              fill
              className="object-cover"
            />
          </div>
        )}
        <div>
          <h1 className="text-2xl font-bold">{author.name}</h1>
          {author.bio && (
            <p className="text-neutral-400 mt-1 max-w-xl">{author.bio}</p>
          )}
        </div>
      </div>

      {/* Articles */}
      <h2 className="text-xl font-semibold mb-6">
        Articles by {author.name} ({articles.length})
      </h2>

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