export default function ArticleCardSkeleton() {
  return (
    <div className="flex flex-col h-full animate-pulse border-b border-stone-100 dark:border-stone-800/50 pb-10 sm:border-0 sm:pb-0">
      <div className="w-full aspect-[4/3] bg-stone-200 dark:bg-stone-800 rounded-sm mb-6" />
      <div className="flex flex-col flex-1">
        <div className="h-3 w-20 bg-stone-200 dark:bg-stone-800 rounded-sm mb-4" />
        <div className="h-6 w-full bg-stone-200 dark:bg-stone-800 rounded-sm mb-2" />
        <div className="h-6 w-4/5 bg-stone-200 dark:bg-stone-800 rounded-sm mb-4" />
        <div className="h-4 w-full bg-stone-100 dark:bg-stone-900 rounded-sm mb-2" />
        <div className="h-4 w-3/4 bg-stone-100 dark:bg-stone-900 rounded-sm mb-6" />
        <div className="mt-auto pt-6 border-t border-stone-100 dark:border-stone-800/50 flex justify-between">
          <div className="h-3 w-16 bg-stone-200 dark:bg-stone-800 rounded-sm" />
          <div className="h-3 w-16 bg-stone-200 dark:bg-stone-800 rounded-sm" />
        </div>
      </div>
    </div>
  )
}