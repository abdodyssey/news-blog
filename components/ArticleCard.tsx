import Link from 'next/link'
import Image from 'next/image'
import { Article } from '@/lib/types'
import { urlFor } from '@/sanity/lib/image'

interface Props {
  article: Article
  layout?: 'large' | 'list'
}

export default function ArticleCard({ article, layout = 'large' }: Props) {
  const { title, slug, excerpt, publishedAt, mainImage, author, category } = article

  if (layout === 'list') {
    return (
      <Link href={`/articles/${slug.current}`} className="group flex items-center gap-6 py-5 border-b border-border last:border-0 hover:bg-card-bg hover:-mx-4 hover:px-4 transition-all duration-300 rounded-sm">
        {mainImage && (
          <div className="w-24 md:w-32 shrink-0 overflow-hidden relative aspect-[4/3] bg-card-bg border border-border rounded-sm">
            <Image
              src={urlFor(mainImage).width(400).height(300).url()}
              alt={title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
            />
          </div>
        )}
        <div className="flex flex-col flex-1 py-1">
          <div className="flex items-center gap-3 mb-2">
            {category && (
              <span className="text-[10px] font-sans font-bold text-accent uppercase tracking-widest">
                {category.title}
              </span>
            )}
            {publishedAt && <span className="text-muted text-[10px] hidden sm:block">|</span>}
            {publishedAt && (
              <span className="text-[10px] font-sans font-bold uppercase tracking-widest text-muted hidden sm:block">
                {new Date(publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
              </span>
            )}
          </div>
          <h3 className="text-xl md:text-2xl font-serif font-bold leading-tight group-hover:text-accent transition-colors line-clamp-2 md:line-clamp-1 text-foreground">
            {title}
          </h3>
        </div>
      </Link>
    )
  }

  // large variant
  return (
    <Link href={`/articles/${slug.current}`} className="group flex flex-col h-full bg-card-bg border border-border rounded-sm hover:-translate-y-1 transition-all duration-300 shadow-sm hover:shadow-md overflow-hidden">
      {mainImage && (
        <div className="relative w-full aspect-[4/3] bg-background border-b border-border overflow-hidden">
          <Image
            src={urlFor(mainImage).width(800).height(600).url()}
            alt={title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
          />
        </div>
      )}
      <div className="flex flex-col flex-1 p-5 md:p-6">
        <div className="flex items-center gap-3 mb-4">
          {category && (
            <span className="text-[10px] font-sans font-bold text-accent uppercase tracking-widest border-l-2 border-accent pl-2 leading-none">
              {category.title}
            </span>
          )}
          {publishedAt && (
            <span className="text-[10px] font-sans font-bold uppercase tracking-widest text-muted">
              {new Date(publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
            </span>
          )}
        </div>
        <h3 className="text-2xl md:text-3xl font-serif font-bold leading-tight group-hover:text-accent transition-colors mb-4 text-foreground">
          {title}
        </h3>
        {excerpt && (
          <p className="text-base text-muted font-sans line-clamp-3 mb-6 leading-relaxed">
            {excerpt}
          </p>
        )}
        <div className="mt-auto pt-4 border-t border-border flex items-center justify-between text-[11px] font-sans font-bold uppercase tracking-widest text-foreground">
          {author ? <span>{author.name}</span> : <span />}
          <span className="text-accent group-hover:underline hover-underline-slide">Read Story</span>
        </div>
      </div>
    </Link>
  )
}