import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ChevronRight, MapPin } from 'lucide-react';

export default async function SpecialtyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const specialty = await prisma.specialty.findUnique({
    where: { slug },
    include: { _count: { select: { clinics: true } } },
  });

  if (!specialty) notFound();

  const clinics = await prisma.clinic.findMany({
    where: {
      isActive: true,
      specialties: { some: { specialty: { slug } } },
    },
    include: {
      specialties: { include: { specialty: true } },
      hours: { orderBy: { dayOfWeek: 'asc' } },
    },
    orderBy: { rating: 'desc' },
    take: 50,
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-blue-600">Home</Link>
        <ChevronRight className="w-4 h-4" />
        <Link href="/specialties" className="hover:text-blue-600">Specialties</Link>
        <ChevronRight className="w-4 h-4" />
        <span className="text-gray-900">{specialty.name}</span>
      </nav>
      <h1 className="text-3xl font-bold text-gray-900 mb-2">{specialty.name}</h1>
      <p className="text-gray-600 mb-8">{specialty._count.clinics} clinics available</p>
      {clinics.length === 0 ? (
        <div className="text-center py-16 bg-white border rounded-xl">
          <p className="text-gray-500">No clinics found for this specialty yet.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {clinics.map((clinic) => (
            <Link key={clinic.id} href={`/clinic/${clinic.slug}`}
              className="block bg-white border rounded-xl p-5 hover:border-blue-400 hover:shadow-md transition-all">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 hover:text-blue-600">{clinic.name}</h3>
                  <div className="flex items-center gap-1 text-sm text-gray-600 mt-1">
                    <MapPin className="w-4 h-4 text-gray-400" />
                    <span>{clinic.address}, {clinic.city}, {clinic.province}</span>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-3">
                    {clinic.acceptsWalkIns && (
                      <span className="text-xs font-medium px-2 py-1 bg-blue-50 text-blue-700 rounded-full">Walk-ins</span>
                    )}
                    {clinic.acceptsBookings && (
                      <span className="text-xs font-medium px-2 py-1 bg-purple-50 text-purple-700 rounded-full">Book Online</span>
                    )}
                  </div>
                </div>
                {clinic.rating && clinic.rating > 0 && (
                  <div className="flex items-center gap-1 text-sm shrink-0">
                    <span className="text-yellow-500">★</span>
                    <span className="font-medium">{clinic.rating.toFixed(1)}</span>
                    <span className="text-gray-400">({clinic.reviewCount})</span>
                  </div>
                )}
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
