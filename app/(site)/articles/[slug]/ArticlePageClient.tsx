'use client'

import { client } from '@/sanity/lib/client'
import { ARTICLE_BY_SLUG_QUERY, ARTICLE_SLUGS_QUERY } from '@/sanity/lib/queries'
import { Article } from '@/lib/types'
import { urlFor } from '@/sanity/lib/image'
import { PortableText } from '@portabletext/react'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { useEffect, useState } from 'react'

export default function ArticlePageClient({ article }: { article: Article }) {
  const [readingProgress, setReadingProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight
      if (totalHeight > 0) {
        setReadingProgress((scrollY / totalHeight) * 100)
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <article className="pb-32 relative bg-background">
      {/* Reading Progress Bar */}
      <div className="fixed top-0 left-0 h-1 bg-accent z-50 transition-all duration-150 ease-out" style={{ width: `${readingProgress}%` }} />

      {/* Article Header (Generous Layout) */}
      <header className="max-w-4xl mx-auto px-6 lg:px-8 pt-24 pb-16">
        <div className="text-center mb-10">
          {article.category && (
            <Link href={`/category/${article.category.slug?.current}`}>
              <span className="text-[11px] font-sans font-bold text-accent uppercase tracking-widest border-l-2 border-accent pl-3 hover:underline">
                {article.category.title}
              </span>
            </Link>
          )}
        </div>
        
        <h1 className="text-5xl md:text-6xl lg:text-[72px] font-serif font-black leading-[1.05] tracking-tight mb-10 text-center text-balance text-foreground">
          {article.title}
        </h1>

        {article.excerpt && (
          <p className="text-xl md:text-2xl text-muted font-sans font-light leading-[1.6] max-w-3xl mx-auto mb-16 text-center text-balance">
            {article.excerpt}
          </p>
        )}

        <div className="flex flex-col md:flex-row items-center justify-center gap-6 pt-10 border-t border-border">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-section-alt flex items-center justify-center text-xs font-serif italic text-muted overflow-hidden">
              {article.author?.name?.charAt(0) || 'A'}
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-sans font-bold uppercase tracking-widest text-foreground">
                {article.author ? article.author.name : 'Staff Writer'}
              </span>
              {article.publishedAt && (
                <span className="text-[10px] font-sans font-semibold uppercase tracking-widest text-muted mt-1">
                  {new Date(article.publishedAt).toLocaleDateString('en-US', {
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric',
                  })}
                </span>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Image Banner */}
      {article.mainImage && (
        <div className="w-full max-w-7xl mx-auto mb-20 px-0 sm:px-6">
          <div className="relative w-full aspect-[4/3] md:aspect-[21/9] bg-card-bg sm:rounded-sm overflow-hidden">
            <Image
              src={urlFor(article.mainImage).width(1600).height(800).url()}
              alt={article.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
      )}

      {/* Centered Precision Typography Body */}
      <div className="max-w-[800px] mx-auto bg-card-bg sm:border border-border sm:rounded-sm sm:shadow-[0_4px_24px_rgba(0,0,0,0.02)] sm:-mt-16 md:-mt-24 relative z-10 px-6 py-12 md:p-16 lg:p-20">
        <div className="max-w-[680px] mx-auto">
          {article.body && (
            <div className="prose prose-stone dark:prose-invert prose-lg 
              prose-p:text-[19px] prose-p:leading-[1.8] prose-p:font-sans prose-p:text-stone-800 dark:prose-p:text-stone-300 prose-p:mb-8
              prose-headings:font-serif prose-headings:font-bold prose-headings:text-foreground prose-headings:mt-12 prose-headings:mb-6
              prose-a:text-accent prose-a:decoration-accent/40 hover:prose-a:decoration-accent prose-a:underline-offset-4 prose-a:font-semibold
              prose-blockquote:font-serif prose-blockquote:text-3xl prose-blockquote:md:text-[34px] prose-blockquote:leading-[1.4] prose-blockquote:font-style-italic prose-blockquote:border-l-4 prose-blockquote:border-accent prose-blockquote:text-foreground prose-blockquote:bg-section-alt prose-blockquote:pl-8 prose-blockquote:pr-6 prose-blockquote:my-16 prose-blockquote:py-8 prose-blockquote:-mx-6 prose-blockquote:md:-mx-12 prose-blockquote:rounded-r-sm
              prose-li:text-[19px] prose-li:leading-[1.8] prose-li:font-sans prose-li:text-stone-800 dark:prose-li:text-stone-300
              max-w-none">
              <PortableText value={article.body} />
            </div>
          )}

        {/* Article Footer & Tags */}
        <div className="mt-24 pt-10 border-t border-border font-sans">
          {article.tags && article.tags.length > 0 && (
            <div className="flex flex-col gap-4">
              <span className="text-[10px] font-bold uppercase tracking-widest text-muted">Read More About</span>
              <div className="flex flex-wrap gap-2">
                {article.tags.map((tag) => (
                  <Link href={`/search?q=${tag}`} key={tag}>
                    <span className="px-5 py-2.5 text-[10px] font-bold uppercase tracking-widest bg-section-alt border border-border text-foreground hover:border-accent hover:text-accent transition-colors cursor-pointer rounded-sm hover:-translate-y-0.5 inline-block">
                      {tag}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
    </article>
  )
}
