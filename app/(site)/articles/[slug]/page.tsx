import { client } from '@/sanity/lib/client'
import { ARTICLE_BY_SLUG_QUERY, ARTICLE_SLUGS_QUERY } from '@/sanity/lib/queries'
import { Article } from '@/lib/types'
import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import ArticlePageClient from './ArticlePageClient'

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

  return <ArticlePageClient article={article} />
}