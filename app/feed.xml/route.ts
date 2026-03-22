import { client } from '@/sanity/lib/client'
import { ARTICLES_QUERY } from '@/sanity/lib/queries'
import { Article } from '@/lib/types'

const BASE_URL = 'https://newsblog.com'

export async function GET() {
  const articles = await client.fetch<Article[]>(ARTICLES_QUERY)

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>NewsBlog</title>
    <link>${BASE_URL}</link>
    <description>Latest articles from NewsBlog</description>
    <language>en-us</language>
    <atom:link href="${BASE_URL}/feed.xml" rel="self" type="application/rss+xml"/>
    ${articles
      .map(
        (article) => `
    <item>
      <title><![CDATA[${article.title}]]></title>
      <link>${BASE_URL}/articles/${article.slug.current}</link>
      <guid>${BASE_URL}/articles/${article.slug.current}</guid>
      <description><![CDATA[${article.excerpt ?? ''}]]></description>
      <pubDate>${new Date(article.publishedAt ?? '').toUTCString()}</pubDate>
    </item>`
      )
      .join('')}
  </channel>
</rss>`

  return new Response(rss, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600, stale-while-revalidate=86400',
    },
  })
}