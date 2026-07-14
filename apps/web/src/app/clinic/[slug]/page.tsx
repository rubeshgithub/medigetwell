import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { MapPin, Phone, Globe, Clock, Star, ChevronRight } from 'lucide-react';
import Link from 'next/link';

const DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

export default async function ClinicPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const clinic = await prisma.clinic.findUnique({
    where: { slug },
  });

  if (!clinic) notFound();

  const today = new Date().getDay();
  // const todayHours = clinic.hours?.find(h => h.dayOfWeek === today);
  // const isOpen = todayHours && !todayHours.isClosed;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-blue-600">Home</Link>
        <ChevronRight className="w-4 h-4" />
        <Link href="/search" className="hover:text-blue-600">Search</Link>
        <ChevronRight className="w-4 h-4" />
        <span className="text-gray-900">{clinic.name}</span>
      </nav>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white border rounded-xl p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h1 className="text-2xl font-bold text-gray-900 mb-2">{clinic.name}</h1>
                <div className="flex items-center gap-1 text-gray-600">
                  <MapPin className="w-4 h-4" />
                  <span>{clinic.address}, {clinic.city}, {clinic.province}</span>
                </div>
              </div>
              {/* isOpen badge commented out - hours field missing from schema */}
            </div>
            <div className="flex flex-wrap gap-2 mb-4">
              {/* Badge fields commented out - schema mismatch
              {clinic.acceptsWalkIns && <span className="text-sm font-medium px-3 py-1 bg-blue-50 text-blue-700 rounded-full">Walk-ins Welcome</span>}
              {clinic.acceptsBookings && <span className="text-sm font-medium px-3 py-1 bg-purple-50 text-purple-700 rounded-full">Book Online</span>}
              {clinic.specialties.map((s) => (
                <span key={s.specialty.slug} className="text-sm font-medium px-3 py-1 bg-gray-100 text-gray-600 rounded-full">{s.specialty.name}</span>
              ))}
              */}
            </div>
            {clinic.rating && clinic.rating > 0 && (
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1">{[1,2,3,4,5].map(s => <Star key={s} className={`w-5 h-5 ${s <= Math.round(clinic.rating!) ? 'text-yellow-500 fill-current' : 'text-gray-300'}`} />)}</div>
                <span className="font-semibold">{clinic.rating.toFixed(1)}</span>
                <span className="text-gray-500">({clinic.reviewCount} reviews)</span>
              </div>
            )}
          </div>
          {clinic.description && (
            <div className="bg-white border rounded-xl p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-3">About</h2>
              <p className="text-gray-600">{clinic.description}</p>
            </div>
          )}
          {/* Hours section commented out - schema has hours as JSON, not relation
          <div className="bg-white border rounded-xl p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2"><Clock className="w-5 h-5" />Hours</h2>
            <div className="space-y-2">
              {DAYS.map((day, i) => {
                const hr = clinic.hours?.find(h => h.dayOfWeek === i);
                const isToday = i === today;
                return (
                  <div key={day} className={`flex justify-between py-2 px-3 rounded-lg ${isToday ? 'bg-blue-50 font-medium' : ''}`}>
                    <span className={isToday ? 'text-blue-700' : 'text-gray-700'}>{day}</span>
                    <span className="text-gray-600">{hr ? (hr.isClosed ? 'Closed' : `${hr.openTime} – ${hr.closeTime}`) : 'N/A'}</span>
                  </div>
                );
              })}
            </div>
          </div>
          */}
        </div>
        <div className="space-y-6">
          <div className="bg-white border rounded-xl p-6">
            <h3 className="font-semibold text-gray-900 mb-4">Contact</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3 text-sm"><MapPin className="w-5 h-5 text-gray-400 shrink-0 mt-0.5" /><span className="text-gray-600">{clinic.address}, {clinic.city}, {clinic.province} {clinic.postalCode}</span></div>
              {clinic.phone && <div className="flex items-center gap-3 text-sm"><Phone className="w-5 h-5 text-gray-400 shrink-0" /><a href={`tel:${clinic.phone}`} className="text-blue-600 hover:underline">{clinic.phone}</a></div>}
              {clinic.website && <div className="flex items-center gap-3 text-sm"><Globe className="w-5 h-5 text-gray-400 shrink-0" /><a href={clinic.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Visit Website</a></div>}
            </div>
          </div>
          {clinic.acceptsBookings && (
            <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl p-6 text-white">
              <h3 className="font-semibold text-lg mb-2">Book an Appointment</h3>
              <p className="text-blue-100 text-sm mb-4">Schedule your visit online.</p>
              <button className="w-full py-2.5 bg-white text-blue-600 font-medium rounded-lg hover:bg-blue-50 transition-colors">Book Now</button>
            </div>
          )}
          {clinic.acceptsWalkIns && (
            <div className="bg-green-50 border border-green-200 rounded-xl p-6">
              <h3 className="font-semibold text-green-800 mb-2">Walk-ins Welcome</h3>
              <p className="text-green-700 text-sm">No appointment needed. Check hours above.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
