import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

export default async function SymptomsPage() {
  const symptoms = await prisma.symptom.findMany({ orderBy: { name: 'asc' } });
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-blue-600">Home</Link>
        <ChevronRight className="w-4 h-4" />
        <span className="text-gray-900">Symptoms</span>
      </nav>
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Symptoms & Conditions</h1>
      <p className="text-gray-600 mb-8">Find the right care for your symptoms</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {symptoms.map((s) => (
          <Link key={s.slug} href={`/symptoms/${s.slug}`}
            className="group bg-white border rounded-xl p-6 hover:border-blue-400 hover:shadow-md transition-all">
            <h2 className="font-semibold text-lg text-gray-900 group-hover:text-blue-600">{s.name}</h2>
            {s.bodyPart && <p className="text-sm text-gray-500 mt-1">{s.bodyPart}</p>}
          </Link>
        ))}
      </div>
    </div>
  );
}
