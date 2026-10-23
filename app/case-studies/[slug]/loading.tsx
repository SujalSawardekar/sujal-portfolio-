export default function CaseStudyLoading() {
  return (
    <main className="min-h-screen bg-black text-white pt-32 pb-20 animate-pulse">
      <div className="mx-auto max-w-5xl px-6">
        {/* Back Link Skeleton */}
        <div className="h-4 w-32 bg-white/10 rounded mb-12" />

        {/* Header Skeleton */}
        <header className="mb-14">
          <div className="h-3 w-28 bg-white/10 rounded mb-3" />
          <div className="h-14 w-3/4 bg-white/10 rounded mb-8" />
          <div className="h-12 w-full bg-white/5 rounded-lg border border-white/5" />
        </header>

        {/* Hero Media Skeleton */}
        <div className="relative mb-14 aspect-video w-full rounded-[12px] bg-white/5 border border-white/10 overflow-hidden" />

        {/* Gallery Masonry Skeleton */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-5 space-y-5">
          <div className="aspect-[4/5] w-full rounded-[12px] bg-white/5 border border-white/5" />
          <div className="aspect-square w-full rounded-[12px] bg-white/5 border border-white/5" />
          <div className="aspect-[3/4] w-full rounded-[12px] bg-white/5 border border-white/5" />
          <div className="aspect-video w-full rounded-[12px] bg-white/5 border border-white/5" />
          <div className="aspect-[4/5] w-full rounded-[12px] bg-white/5 border border-white/5" />
          <div className="aspect-square w-full rounded-[12px] bg-white/5 border border-white/5" />
        </div>
      </div>
    </main>
  )
}
