"use client";

import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";

import { useGetBlogPostDetail } from "@/services/Post/hooks";
import BlogDetailSkeleton from "@/components/post/BlogDetailSkeleton";

const getInitial = (name?: string) => {
  if (!name) {
    return "?";
  }
  const firstChar = name.trim().charAt(0);
  return firstChar ? firstChar.toUpperCase() : "?";
};

const formatDate = (isoDate?: string) => {
  if (!isoDate) {
    return "";
  }
  const date = new Date(isoDate);
  if (Number.isNaN(date.getTime())) {
    return isoDate;
  }
  return date.toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

const BlogDetailPage = () => {
  const params = useParams();
  const rawId = params?.id;
  const blogId = Array.isArray(rawId) ? rawId[0] : rawId;

  const { data: post, isLoading, isError } = useGetBlogPostDetail(blogId ?? "");

  if (!blogId) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <p className="text-sm text-slate-500">No blog post selected.</p>
      </div>
    );
  }

  if (isLoading) {
    return <BlogDetailSkeleton />;
  }

  if (isError || !post) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <p className="text-sm text-slate-500">
          We couldn&apos;t load this blog post. Please try again later.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 pb-24">
      <div className="mx-auto max-w-5xl px-4 pb-12 pt-10 sm:px-6 lg:px-8">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-sm font-medium text-blue-600 transition hover:text-blue-700"
        >
          ← Back to articles
        </Link>
      </div>

      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <section className="relative overflow-hidden rounded-3xl bg-slate-900 shadow-lg">
          <Image
            src={post.banner}
            alt={post.title}
            width={1600}
            height={900}
            priority
            className="h-[360px] w-full object-cover md:h-[460px]"
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 100vw, 1200px"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-transparent" />
        </section>

        <article className="relative z-10 -mt-32 rounded-3xl bg-white p-8 shadow-xl md:p-10">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <span className="inline-flex items-center rounded-full bg-blue-500/10 px-4 py-1 text-xs font-semibold uppercase tracking-wide text-blue-600">
              {post.topic}
            </span>
            <p className="text-sm text-slate-400">
              {formatDate(post.createdAt)}
            </p>
          </div>

          <h1 className="mt-6 text-3xl font-semibold text-slate-900 md:text-4xl">
            {post.title}
          </h1>

          <div className="mt-6 flex items-center gap-4 text-sm text-slate-500">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-50 text-base font-semibold text-blue-600">
              {getInitial(post.author)}
            </div>
            <div>
              <p className="font-medium text-slate-700">{post.author}</p>
              <p>
                {post.contents.length} section
                {post.contents.length === 1 ? "" : "s"}
              </p>
            </div>
          </div>

          <div className="mt-12 space-y-16">
            {post.contents.map((content, index) => (
              <section
                key={`${content.header}-${index}`}
                className="grid gap-8 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)]"
              >
                <div className="space-y-4">
                  <h2 className="text-2xl font-semibold text-slate-900">
                    {content.header}
                  </h2>
                  <div className="space-y-4 text-slate-600">
                    {content.body
                      .split(/\n{2,}/)
                      .map((paragraph, paragraphIndex) => (
                        <p key={paragraphIndex} className="leading-relaxed">
                          {paragraph}
                        </p>
                      ))}
                  </div>
                </div>

                {content.photo ? (
                  <div className="relative overflow-hidden rounded-2xl bg-slate-100">
                    <Image
                      src={content.photo}
                      alt={content.header}
                      width={900}
                      height={600}
                      className="h-full w-full object-cover"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>
                ) : (
                  <div className="hidden lg:block" aria-hidden="true" />
                )}
              </section>
            ))}
          </div>
        </article>
      </div>
    </div>
  );
};

export default BlogDetailPage;
