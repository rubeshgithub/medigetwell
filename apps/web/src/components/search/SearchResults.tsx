'use client';

import Link from 'next/link';
import { MapPin, Phone, Star, Clock, ChevronRight } from 'lucide-react';
import { trpc } from '@/lib/trpc';

interface Clinic {
  id: string;
  name: string;
  slug: string;
  address: string;
  city: string;
  province: string;
  phone: string | null;
  rating: number | null;
  reviewCount: number;
  acceptsWalkIns: boolean;
  acceptsBookings: boolean;
  specialties: { specialty: { name: string; slug: string } }[];
  hours: { dayOfWeek: number; openTime: string; closeTime: string; isClosed: boolean }[];
}

function ClinicCard({ clinic }: { clinic: Clinic }) {
  const today = new Date().getDay();
  const todayHours = clinic.hours?.find(h => h.dayOfWeek === today);
  const isOpen = todayHours && !todayHours.isClosed;

  return (
    <Link
      href={`/clinic/${clinic.slug}`}
      className="block bg-white border border-gray-200 rounded-xl p-5 hover:border-blue-400 hover:shadow-md transition-all"
    >
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-lg font-semibold text-gray-900 hover:text-blue-600">{clinic.name}</h3>
        {isOpen && (
          <span className="inline-flex items-center gap-1 text-xs font-medium text-green-700 bg-green-50 px-2 py-1 rounded-full">
            <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
            Open
          </span>
        )}
      </div>

      <div className="flex items-center gap-1 text-sm text-gray-600 mb-1">
        <MapPin className="w-4 h-4 text-gray-400" />
        <span>{clinic.address}, {clinic.city}, {clinic.province}</span>
      </div>

      {clinic.phone && (
        <div className="flex items-center gap-1 text-sm text-gray-600 mb-3">
          <Phone className="w-4 h-4 text-gray-400" />
          <span>{clinic.phone}</span>
        </div>
      )}

      <div className="flex items-center justify-between">
        <div className="flex flex-wrap gap-2">
          {clinic.acceptsWalkIns && (
            <span className="text-xs font-medium px-2 py-1 bg-blue-50 text-blue-700 rounded-full">Walk-ins</span>
          )}
          {clinic.acceptsBookings && (
            <span className="text-xs font-medium px-2 py-1 bg-purple-50 text-purple-700 rounded-full">Book Online</span>
          )}
          {clinic.specialties?.slice(0, 2).map((s) => (
            <span key={s.specialty.slug} className="text-xs font-medium px-2 py-1 bg-gray-100 text-gray-600 rounded-full">
              {s.specialty.name}
            </span>
          ))}
        </div>

        {clinic.rating && clinic.rating > 0 && (
          <div className="flex items-center gap-1 text-sm shrink-0 ml-4">
            <Star className="w-4 h-4 text-yellow-500 fill-current" />
            <span className="font-medium">{clinic.rating.toFixed(1)}</span>
            <span className="text-gray-400">({clinic.reviewCount})</span>
          </div>
        )}
      </div>
    </Link>
  );
}

export default function SearchResults({ query, city, specialty, page }: { query: string; city: string; specialty: string; page: number }) {
  const { data, isLoading } = trpc.clinic.getAll.useQuery({
    city: city || undefined,
    specialty: specialty || undefined,
    page,
    limit: 20,
  });

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-white border rounded-xl p-5 animate-pulse">
            <div className="h-5 bg-gray-200 rounded w-1/3 mb-3"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-1/4"></div>
          </div>
        ))}
      </div>
    );
  }

  if (!data?.clinics.length) {
    return (
      <div className="text-center py-16 bg-white border rounded-xl">
        <div className="text-4xl mb-4">🔍</div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">No clinics found</h3>
        <p className="text-gray-600 max-w-md mx-auto">
          Try adjusting your search terms or filters. You can also browse by province or specialty.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <p className="text-sm text-gray-600">{data.total} clinics found</p>
      {data.clinics.map((clinic) => (
        <ClinicCard key={clinic.id} clinic={clinic as Clinic} />
      ))}

      {data.totalPages > 1 && (
        <div className="flex justify-center gap-2 pt-4">
          {Array.from({ length: Math.min(data.totalPages, 5) }, (_, i) => {
            const p = i + 1;
            const isActive = p === page;
            return (
              <Link
                key={p}
                href={`/search?q=${query}&page=${p}`}
                className={`w-10 h-10 flex items-center justify-center rounded-lg text-sm font-medium transition-colors ${
                  isActive ? 'bg-blue-600 text-white' : 'bg-white border hover:border-blue-400'
                }`}
              >
                {p}
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
