import { client } from '@/sanity/lib/client'
import { FEATURED_ARTICLES_QUERY, ARTICLES_QUERY } from '@/sanity/lib/queries'
import { Article } from '@/lib/types'
import ArticleCard from '@/components/ArticleCard'
import Image from 'next/image'
import Link from 'next/link'
import { urlFor } from '@/sanity/lib/image'

export const revalidate = 60

export default async function HomePage() {
  const [featured, latest] = await Promise.all([
    client.fetch<Article[]>(FEATURED_ARTICLES_QUERY),
    client.fetch<Article[]>(ARTICLES_QUERY),
  ])

  const heroArticle = featured[0] || latest[0]
  const asyncFeatures = featured.slice(1, 4) // up to 3 for async grid
  const remainingLatest = latest.filter(a => a._id !== heroArticle?._id)

  return (
    <main className="min-h-screen">
      {/* 60vh Full-Bleed Hero Section */}
      {heroArticle && (
        <section className="relative w-full h-[70vh] md:h-[60vh] flex items-end mb-16 md:mb-24 group overflow-hidden">
          {heroArticle.mainImage && (
            <div className="absolute inset-0 z-0">
              <Image
                src={urlFor(heroArticle.mainImage).width(2000).height(1200).url()}
                alt={heroArticle.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-[1.5s] ease-out"
                priority
              />
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/10 transition-opacity duration-300 group-hover:via-black/50" />
            </div>
          )}

          <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-8 pb-12 md:pb-16 text-white grid grid-cols-1 md:grid-cols-12">
            <div className="md:col-span-10 lg:col-span-8 flex flex-col items-start">
              {heroArticle.category && (
                <div className="mb-4 md:mb-6">
                  <Link href={`/category/${heroArticle.category.slug?.current}`}>
                    <span className="text-[10px] md:text-[11px] font-sans font-bold text-white uppercase tracking-widest border-l-2 border-accent pl-2 leading-none hover:text-accent transition-colors">
                      {heroArticle.category.title}
                    </span>
                  </Link>
                </div>
              )}
              <Link href={`/articles/${heroArticle.slug.current}`}>
                <h2 className="text-4xl md:text-5xl lg:text-7xl font-serif font-bold leading-[1.05] mb-6 drop-shadow-lg text-balance opacity-95 group-hover:opacity-100 transition-opacity">
                  {heroArticle.title}
                </h2>
              </Link>
              {heroArticle.excerpt && (
                <p className="text-lg md:text-xl text-stone-200 font-sans leading-relaxed mb-8 max-w-2xl line-clamp-2 md:line-clamp-none opacity-90">
                  {heroArticle.excerpt}
                </p>
              )}
              <div className="flex items-center gap-4 text-[10px] font-sans font-bold uppercase tracking-widest text-stone-300">
                {heroArticle.author && <span className="text-white">{heroArticle.author.name}</span>}
                {heroArticle.author && heroArticle.publishedAt && <span className="opacity-50">|</span>}
                {heroArticle.publishedAt && (
                  <span>
                    {new Date(heroArticle.publishedAt).toLocaleDateString('en-US', {
                      month: 'long',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </span>
                )}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Primary Layout Container */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 pb-24">
        
        {/* Asymmetric Grid (1 large + 2 stacked right) */}
        {asyncFeatures.length > 0 && (
          <section className="mb-24">
            <h3 className="text-xs font-sans font-bold tracking-widest uppercase border-l-4 border-accent pl-3 mb-8 text-foreground">
              Featured Analysis
            </h3>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
              <div className="lg:col-span-8">
                {asyncFeatures[0] && (
                  <ArticleCard key={asyncFeatures[0]._id} article={asyncFeatures[0]} layout="large" />
                )}
              </div>
              <div className="lg:col-span-4 flex flex-col gap-8 md:gap-12 pb-8 border-b lg:border-none border-border">
                {asyncFeatures[1] && (
                  <ArticleCard key={asyncFeatures[1]._id} article={asyncFeatures[1]} layout="large" />
                )}
                {asyncFeatures[2] && (
                  <div className="pt-8 border-t border-border hidden lg:block">
                    <ArticleCard key={asyncFeatures[2]._id} article={asyncFeatures[2]} layout="large" />
                  </div>
                )}
              </div>
            </div>
          </section>
        )}

        {/* Latest News Rolls */}
        <section>
          <div className="flex items-center justify-between border-b-2 border-foreground pb-4 mb-8">
            <h3 className="text-xs font-sans font-bold tracking-widest uppercase border-l-4 border-accent pl-3 text-foreground">
              The Latest
            </h3>
            <Link href="/articles" className="text-[10px] font-sans font-bold uppercase tracking-widest text-muted hover:text-accent transition-colors">
              View All
            </Link>
          </div>
          <div className="flex flex-col">
            {remainingLatest.map((article) => (
              <ArticleCard key={article._id} article={article} layout="list" />
            ))}
          </div>
        </section>
      </div>
    </main>
  )
}