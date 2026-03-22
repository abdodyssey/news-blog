import { client } from '@/sanity/lib/client'
import { ARTICLE_BY_SLUG_QUERY, ARTICLE_SLUGS_QUERY } from '@/sanity/lib/queries'
import { Article } from '@/lib/types'
import { urlFor } from '@/sanity/lib/image'
import { PortableText } from '@portabletext/react'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { Metadata } from 'next'

export const revalidate = 60

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const slugs = await client.fetch<{ slug: string }[]>(ARTICLE_SLUGS_QUERY)
  return slugs.map((s) => ({ slug: s.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const article = await client.fetch<Article>(ARTICLE_BY_SLUG_QUERY, { slug })
  if (!article) return {}
  return {
    title: article.title,
    description: article.excerpt,
  }
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params
  const article = await client.fetch<Article>(ARTICLE_BY_SLUG_QUERY, { slug })

  if (!article) notFound()

  return (
    <main className="max-w-3xl mx-auto px-4 py-10">
      {/* Category */}
      {article.category && (
        <span className="text-xs font-medium text-blue-600 dark:text-blue-400 uppercase tracking-wide">
          {article.category.title}
        </span>
      )}

      {/* Title */}
      <h1 className="text-3xl font-bold mt-2 mb-4 leading-tight">
        {article.title}
      </h1>

      {/* Meta */}
      <div className="flex items-center gap-3 text-sm text-neutral-400 mb-8">
        {article.author && <span>{article.author.name}</span>}
        {article.publishedAt && (
          <>
            <span>·</span>
            <span>
              {new Date(article.publishedAt).toLocaleDateString('en-US', {
                month: 'long',
                day: 'numeric',
                year: 'numeric',
              })}
            </span>
          </>
        )}
      </div>

      {/* Main Image */}
      {article.mainImage && (
        <div className="relative w-full h-72 md:h-96 rounded-xl overflow-hidden mb-10">
          <Image
            src={urlFor(article.mainImage).width(1200).height(800).url()}
            alt={article.title}
            fill
            className="object-cover"
            priority
          />
        </div>
      )}

      {/* Body */}
      {article.body && (
        <div className="prose prose-neutral dark:prose-invert max-w-none">
          <PortableText value={article.body} />
        </div>
      )}

      {/* Tags */}
      {article.tags && article.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-10">
          {article.tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 text-xs rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300"
            >
              #{tag}
            </span>
          ))}
        </div>
      )}
    </main>
  )
}