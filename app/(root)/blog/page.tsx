"use client";

import Image from "next/image";
import Link from "next/link";

import { useGetBlogPosts } from "@/services/Post/hooks";
import BlogListSkeleton from "@/components/post/BlogListSkeleton";

const Blog = () => {
  const { data: posts, isLoading, isError } = useGetBlogPosts();

  const getInitial = (name?: string) => {
    if (!name) {
      return "?";
    }
    const firstChar = name.trim().charAt(0);
    return firstChar ? firstChar.toUpperCase() : "?";
  };

  if (isLoading) {
    return <BlogListSkeleton />;
  }

  if (isError || !posts || posts.length === 0) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <p className="text-sm text-slate-500">
          We couldn&apos;t load blog posts right now. Please try again later.
        </p>
      </div>
    );
  }

  const heroPost = posts[0];
  const latestPosts = posts.slice(1);

  const heroDate = new Date(heroPost.createAt).toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="min-h-screen bg-slate-50 py-16">
      <div className="mx-auto flex max-w-6xl flex-col gap-14 px-4 sm:px-6 lg:px-8">
        <section className="relative overflow-hidden rounded-3xl bg-slate-900 shadow-lg">
          {/* Hero image */}
          <Image
            src={heroPost.banner}
            alt={heroPost.title}
            width={1600}
            height={900}
            priority
            className="h-[360px] w-full object-cover md:h-[420px]"
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 100vw, 1200px"
          />

          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/30 to-transparent" />
        </section>

        {/* Card chồng lên hero */}
        <Link
          href={`/blog/${heroPost.id}`}
          className="relative z-10 mx-4 -mt-40 block rounded-3xl bg-white p-6 shadow-xl transition hover:-translate-y-1 hover:shadow-2xl md:mx-8 lg:mx-12"
        >
          <span className="inline-flex items-center rounded-full bg-blue-500/10 px-3 py-1 text-sm font-medium text-blue-600">
            {heroPost.topic}
          </span>
          <h1 className="mt-4 text-2xl font-semibold text-slate-900 lg:text-3xl">
            {heroPost.title}
          </h1>
          <div className="mt-5 flex items-center gap-4 text-sm text-slate-500">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-50 text-base font-semibold text-blue-600">
              {getInitial(heroPost.author)}
            </div>
            <div>
              <p className="font-medium text-slate-700">{heroPost.author}</p>
              <p>{heroDate}</p>
            </div>
          </div>
        </Link>

        <section>
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold text-slate-900">
              Latest Post
            </h2>
            <button className="hidden rounded-full border border-slate-200 px-4 py-2 text-sm font-medium text-slate-600 transition hover:border-slate-300 hover:text-slate-900 sm:inline-flex">
              View All Post
            </button>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {latestPosts.map((post) => (
              <Link
                key={post.id}
                href={`/blog/${post.id}`}
                className="block h-full"
              >
                <article className="flex h-full flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md">
                  <Image
                    src={post.banner}
                    alt={post.title}
                    width={900}
                    height={600}
                    className="h-48 w-full object-cover"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <div className="flex h-full flex-col gap-4 p-6">
                    <span className="inline-flex w-fit items-center rounded-full bg-blue-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-blue-600">
                      {post.topic}
                    </span>
                    <h3 className="text-lg font-semibold text-slate-900">
                      {post.title}
                    </h3>
                    <div className="mt-auto flex items-center gap-3 text-sm text-slate-500">
                      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-50 text-sm font-semibold text-blue-600">
                        {getInitial(post.author)}
                      </div>
                      <div>
                        <p className="font-medium text-slate-700">
                          {post.author}
                        </p>
                        <p>
                          {new Date(post.createAt).toLocaleDateString(
                            undefined,
                            {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                            }
                          )}
                        </p>
                      </div>
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>

          <div className="mt-10 flex justify-center sm:hidden">
            <button className="rounded-full border border-slate-200 px-5 py-2 text-sm font-medium text-slate-600 transition hover:border-slate-300 hover:text-slate-900">
              View All Post
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Blog;
