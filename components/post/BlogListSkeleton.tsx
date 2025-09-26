const BlogListSkeleton = () => {
  const placeholders = Array.from({ length: 6 });

  return (
    <div className="min-h-screen bg-slate-50 py-16">
      <div className="mx-auto flex max-w-6xl flex-col gap-14 px-4 sm:px-6 lg:px-8">
        <section className="relative overflow-hidden rounded-3xl bg-slate-900/80 shadow-lg">
          <div className="h-[360px] w-full animate-pulse bg-slate-800 md:h-[420px]" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/30 to-transparent" />
        </section>

        <div className="relative z-10 mx-4 -mt-40 rounded-3xl bg-white p-6 shadow-xl md:mx-8 lg:mx-12">
          <div className="inline-flex h-8 w-28 animate-pulse rounded-full bg-blue-100" />
          <div className="mt-4 h-10 w-3/4 animate-pulse rounded-lg bg-slate-200" />
          <div className="mt-5 flex items-center gap-4">
            <div className="h-10 w-10 animate-pulse rounded-full bg-slate-200" />
            <div className="space-y-2">
              <div className="h-3 w-32 animate-pulse rounded bg-slate-200" />
              <div className="h-3 w-24 animate-pulse rounded bg-slate-100" />
            </div>
          </div>
        </div>

        <section>
          <div className="flex items-center justify-between">
            <div className="h-8 w-40 animate-pulse rounded bg-slate-200" />
            <div className="hidden h-10 w-32 animate-pulse rounded-full border border-slate-200 sm:inline-flex" />
          </div>

          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {placeholders.map((_, index) => (
              <div
                key={index}
                className="flex h-full flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm"
              >
                <div className="h-48 w-full animate-pulse bg-slate-200" />
                <div className="flex h-full flex-col gap-4 p-6">
                  <div className="h-6 w-24 animate-pulse rounded-full bg-blue-100" />
                  <div className="h-6 w-3/4 animate-pulse rounded bg-slate-200" />
                  <div className="mt-auto flex items-center gap-3">
                    <div className="h-9 w-9 animate-pulse rounded-full bg-slate-200" />
                    <div className="space-y-2">
                      <div className="h-3 w-24 animate-pulse rounded bg-slate-200" />
                      <div className="h-3 w-20 animate-pulse rounded bg-slate-100" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 flex justify-center sm:hidden">
            <div className="h-10 w-36 animate-pulse rounded-full border border-slate-200" />
          </div>
        </section>
      </div>
    </div>
  );
};
export default BlogListSkeleton;
