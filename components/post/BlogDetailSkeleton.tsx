const BlogDetailSkeleton = () => {
  const contentPlaceholders = Array.from({ length: 3 });

  return (
    <div className="min-h-screen bg-slate-50 pb-24">
      <div className="mx-auto max-w-5xl px-4 pb-12 pt-10 sm:px-6 lg:px-8">
        <div className="mb-6 h-5 w-36 animate-pulse rounded bg-blue-100" />
      </div>

      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <section className="relative overflow-hidden rounded-3xl bg-slate-900 shadow-lg">
          <div className="h-[360px] w-full animate-pulse bg-slate-800 md:h-[460px]" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-transparent" />
        </section>

        <article className="relative z-10 -mt-32 rounded-3xl bg-white p-8 shadow-xl md:p-10">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="h-8 w-28 animate-pulse rounded-full bg-blue-100" />
            <div className="h-4 w-32 animate-pulse rounded bg-slate-200" />
          </div>

          <div className="mt-6 h-12 w-2/3 animate-pulse rounded bg-slate-200" />

          <div className="mt-6 flex items-center gap-4">
            <div className="h-12 w-12 animate-pulse rounded-full bg-slate-200" />
            <div className="space-y-2">
              <div className="h-4 w-32 animate-pulse rounded bg-slate-200" />
              <div className="h-3 w-24 animate-pulse rounded bg-slate-100" />
            </div>
          </div>

          <div className="mt-12 space-y-16">
            {contentPlaceholders.map((_, index) => (
              <div
                key={index}
                className="grid gap-8 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)]"
              >
                <div className="space-y-4">
                  <div className="h-8 w-40 animate-pulse rounded bg-slate-200" />
                  <div className="space-y-3">
                    <div className="h-4 w-full animate-pulse rounded bg-slate-200" />
                    <div className="h-4 w-11/12 animate-pulse rounded bg-slate-200" />
                    <div className="h-4 w-10/12 animate-pulse rounded bg-slate-100" />
                  </div>
                </div>

                <div className="hidden h-56 w-full animate-pulse rounded-2xl bg-slate-200 lg:block" />
              </div>
            ))}
          </div>
        </article>
      </div>
    </div>
  );
};

export default BlogDetailSkeleton;
