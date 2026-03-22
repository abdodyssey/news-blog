import ArticleCardSkeleton from '@/components/ArticleCardSkeleton'

export default function Loading() {
  return (
    <main className="max-w-6xl mx-auto px-4 py-10">
      <div className="h-8 w-48 bg-neutral-200 dark:bg-neutral-800 rounded-full animate-pulse mb-10" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <ArticleCardSkeleton key={i} />
        ))}
      </div>
    </main>
  )
}