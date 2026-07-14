import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import { ChevronRight, Calendar } from 'lucide-react';

export default async function PostsPage() {
  const posts = await prisma.post.findMany({ where: { isPublished: true }, orderBy: { publishedAt: 'desc' } });
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
      <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-blue-600">Home</Link>
        <ChevronRight className="w-4 h-4" />
        <span className="text-gray-900">Health Blog</span>
      </nav>
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Health Blog</h1>
      <p className="text-gray-600 mb-8">Expert health advice and insights</p>
      <div className="space-y-6">
        {posts.map((post) => (
          <Link key={post.slug} href={`/posts/${post.slug}`} className="group block">
            <article className="bg-white border rounded-xl overflow-hidden hover:shadow-md transition-shadow">
              <div className="p-6">
                <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                  <Calendar className="w-4 h-4" />
                  <time>{post.publishedAt?.toLocaleDateString('en-CA', { year: 'numeric', month: 'long', day: 'numeric' })}</time>
                  {post.authorName && <span>· {post.authorName}</span>}
                </div>
                <h2 className="text-xl font-semibold text-gray-900 group-hover:text-blue-600">{post.title}</h2>
                {post.excerpt && <p className="text-gray-600 mt-2">{post.excerpt}</p>}
              </div>
            </article>
          </Link>
        ))}
      </div>
    </div>
  );
}
