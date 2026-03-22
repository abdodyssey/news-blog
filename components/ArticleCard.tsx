import Link from 'next/link'
import Image from 'next/image'
import { Article } from '@/lib/types'
import { urlFor } from '@/sanity/lib/image'

interface Props {
  article: Article
}

export default function ArticleCard({ article }: Props) {
  const { title, slug, excerpt, publishedAt, mainImage, author, category } = article

  return (
    <div className="group flex flex-col rounded-xl border border-neutral-200 dark:border-neutral-800 overflow-hidden hover:shadow-md transition-shadow">
      {/* Image */}
      <Link href={`/articles/${slug.current}`}>
        {mainImage && (
          <div className="relative w-full h-48 bg-neutral-100 dark:bg-neutral-900">
            <Image
              src={urlFor(mainImage).width(600).height(400).url()}
              alt={title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>
        )}
      </Link>

      {/* Content */}
      <div className="flex flex-col gap-2 p-4 flex-1">
        {/* Category badge */}
        {category && (
          <Link href={`/category/${category.slug?.current}`}>
            <span className="text-xs font-medium text-blue-600 dark:text-blue-400 uppercase tracking-wide hover:underline">
              {category.title}
            </span>
          </Link>
        )}

        {/* Title */}
        <Link href={`/articles/${slug.current}`}>
          <h3 className="text-base font-semibold leading-snug group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2">
            {title}
          </h3>
        </Link>

        {/* Excerpt */}
        {excerpt && (
          <p className="text-sm text-neutral-500 dark:text-neutral-400 line-clamp-2">
            {excerpt}
          </p>
        )}

        {/* Meta */}
        <div className="mt-auto pt-3 flex items-center justify-between text-xs text-neutral-400 dark:text-neutral-500">
          {author && (
            <Link href={`/author/${author.slug?.current}`} className="hover:text-blue-500 transition-colors">
              {author.name}
            </Link>
          )}
          {publishedAt && (
            <span>
              {new Date(publishedAt).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
              })}
            </span>
          )}
        </div>
      </div>
    </div>
  )
}