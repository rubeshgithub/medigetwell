import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

export default async function SpecialtiesPage() {
  const specialties = await prisma.specialty.findMany({
    orderBy: { name: 'asc' },
    include: { _count: { select: { clinics: true } } },
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-blue-600">Home</Link>
        <ChevronRight className="w-4 h-4" />
        <span className="text-gray-900">Specialties</span>
      </nav>
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Browse by Specialty</h1>
      <p className="text-gray-600 mb-8">Find healthcare providers by category</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {specialties.map((specialty) => (
          <Link key={specialty.slug} href={`/specialties/${specialty.slug}`}
            className="group bg-white border rounded-xl p-6 hover:border-blue-400 hover:shadow-md transition-all">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-semibold text-lg text-gray-900 group-hover:text-blue-600">
                  {specialty.iconEmoji} {specialty.name}
                </h2>
                <p className="text-sm text-gray-500 mt-1">{specialty._count.clinics} clinic{specialty._count.clinics !== 1 ? 's' : ''}</p>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-blue-600" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
