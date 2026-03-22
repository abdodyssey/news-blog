import { client } from '@/sanity/lib/client'
import { ARTICLE_SLUGS_QUERY, CATEGORY_SLUGS_QUERY, AUTHOR_SLUGS_QUERY } from '@/sanity/lib/queries'
import { MetadataRoute } from 'next'

const BASE_URL = 'https://newsblog.com'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [articles, categories, authors] = await Promise.all([
    client.fetch<{ slug: string }[]>(ARTICLE_SLUGS_QUERY),
    client.fetch<{ slug: string }[]>(CATEGORY_SLUGS_QUERY),
    client.fetch<{ slug: string }[]>(AUTHOR_SLUGS_QUERY),
  ])

  const articleUrls = articles.map((a) => ({
    url: `${BASE_URL}/articles/${a.slug}`,
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  const categoryUrls = categories.map((c) => ({
    url: `${BASE_URL}/category/${c.slug}`,
    changeFrequency: 'weekly' as const,
    priority: 0.6,
  }))

  const authorUrls = authors.map((a) => ({
    url: `${BASE_URL}/author/${a.slug}`,
    changeFrequency: 'monthly' as const,
    priority: 0.5,
  }))

  return [
    { url: BASE_URL, changeFrequency: 'daily', priority: 1 },
    { url: `${BASE_URL}/articles`, changeFrequency: 'daily', priority: 0.9 },
    { url: `${BASE_URL}/about`, changeFrequency: 'monthly', priority: 0.4 },
    { url: `${BASE_URL}/contact`, changeFrequency: 'monthly', priority: 0.4 },
    { url: `${BASE_URL}/privacy`, changeFrequency: 'monthly', priority: 0.3 },
    { url: `${BASE_URL}/terms`, changeFrequency: 'monthly', priority: 0.3 },
    ...articleUrls,
    ...categoryUrls,
    ...authorUrls,
  ]
}