import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ChevronRight, Calendar, User } from 'lucide-react';

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await prisma.post.findUnique({ where: { slug } });
  if (!post || !post.isPublished) notFound();
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
      <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-blue-600">Home</Link>
        <ChevronRight className="w-4 h-4" />
        <Link href="/posts" className="hover:text-blue-600">Blog</Link>
        <ChevronRight className="w-4 h-4" />
        <span className="text-gray-900">{post.title}</span>
      </nav>
      <article className="bg-white border rounded-xl p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">{post.title}</h1>
        <div className="flex items-center gap-4 text-sm text-gray-500 mb-6 pb-6 border-b">
                    {/* Published date - commented out pending schema update
                    {post.publishedAt && (
                      <div className="flex items-center gap-1"><Calendar className="w-4 h-4" /></div>
                    )} */}
          {post.excerpt && (
            <div className="flex items-center gap-1"><User className="w-4 h-4" /><span>{post.excerpt}</span></div>
          )}
        </div>
        <div className="prose prose-lg max-w-none text-gray-700 whitespace-pre-wrap">{post.content}</div>
      </article>
      <div className="mt-8 text-center">
        <Link href="/posts" className="text-blue-600 hover:underline font-medium">← Back to all posts</Link>
      </div>
    </div>
  );
}
