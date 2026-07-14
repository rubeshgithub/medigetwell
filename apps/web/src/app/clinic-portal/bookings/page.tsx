import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import { ChevronRight, Calendar, Clock, User, Phone, ArrowLeft, Check, X } from 'lucide-react';

const STATUS_COLORS: Record<string, string> = {
  PENDING: 'bg-yellow-50 text-yellow-700',
  CONFIRMED: 'bg-green-50 text-green-700',
  CANCELLED: 'bg-red-50 text-red-700',
  COMPLETED: 'bg-blue-50 text-blue-700',
  NO_SHOW: 'bg-gray-50 text-gray-700',
};

export default async function BookingsPage() {
  // In production, filter by clinic owner's clinics
  const bookings = await prisma.booking.findMany({
    include: {
      clinic: { select: { name: true, slug: true } },
      user: { select: { name: true, email: true } },
    },
    orderBy: { date: 'desc' },
    take: 50,
  });

  const pending = bookings.filter((b: any) => b.status === 'PENDING');
  const confirmed = bookings.filter((b: any) => b.status === 'CONFIRMED');
  const past = bookings.filter((b: any) => ['COMPLETED', 'CANCELLED', 'NO_SHOW'].includes(b.status));

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xs leading-none">M</span>
              </div>
              <span className="text-xl font-bold text-gray-900"><span className="text-blue-600">Medigetwell</span></span>
            </Link>
            <span className="text-gray-300">|</span>
            <span className="text-sm text-gray-600">Bookings</span>
          </div>
          <Link href="/clinic-portal/dashboard" className="text-sm text-blue-600 hover:underline flex items-center gap-1">
            <ArrowLeft className="w-4 h-4" /> Dashboard
          </Link>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Booking Management</h1>
        <p className="text-gray-600 mb-8">Manage appointments for your clinic</p>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="bg-white border rounded-xl p-5">
            <p className="text-2xl font-bold text-yellow-600">{pending.length}</p>
            <p className="text-sm text-gray-500">Pending</p>
          </div>
          <div className="bg-white border rounded-xl p-5">
            <p className="text-2xl font-bold text-green-600">{confirmed.length}</p>
            <p className="text-sm text-gray-500">Confirmed</p>
          </div>
          <div className="bg-white border rounded-xl p-5">
            <p className="text-2xl font-bold text-gray-600">{past.length}</p>
            <p className="text-sm text-gray-500">Past</p>
          </div>
        </div>

        {/* Pending Bookings */}
        {pending.length > 0 && (
          <div className="mb-8">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Pending Approval</h2>
            <div className="space-y-3">
              {pending.map((booking) => (
                <div key={booking.id} className="bg-white border rounded-xl p-5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center">
                        <User className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{booking.user?.name || 'Patient'}</p>
                        <p className="text-sm text-gray-500">{booking.user?.email}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-6">
                      <div className="text-right">
                        <div className="flex items-center gap-1 text-sm text-gray-600">
                          <Calendar className="w-4 h-4" />
                          <span>{new Date(booking.date).toLocaleDateString('en-CA', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                        </div>
                        <div className="flex items-center gap-1 text-sm text-gray-600">
                          <Clock className="w-4 h-4" />
                          <span>{booking.time}</span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button className="px-3 py-1.5 bg-green-600 text-white text-sm rounded-lg hover:bg-green-700 flex items-center gap-1">
                          <Check className="w-4 h-4" /> Confirm
                        </button>
                        <button className="px-3 py-1.5 border border-red-300 text-red-600 text-sm rounded-lg hover:bg-red-50 flex items-center gap-1">
                          <X className="w-4 h-4" /> Decline
                        </button>
                      </div>
                    </div>
                  </div>
                  {booking.notes && (
                    <p className="text-sm text-gray-500 mt-3 pl-14">Note: {booking.notes}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Confirmed Bookings */}
        {confirmed.length > 0 && (
          <div className="mb-8">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Confirmed</h2>
            <div className="space-y-3">
              {confirmed.map((booking) => (
                <div key={booking.id} className="bg-white border rounded-xl p-5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-green-50 rounded-full flex items-center justify-center">
                        <User className="w-5 h-5 text-green-600" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{booking.user?.name || 'Patient'}</p>
                        <p className="text-sm text-gray-500">{booking.user?.email}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-6">
                      <div className="text-right">
                        <div className="flex items-center gap-1 text-sm text-gray-600">
                          <Calendar className="w-4 h-4" />
                          <span>{new Date(booking.date).toLocaleDateString('en-CA', { month: 'short', day: 'numeric' })}</span>
                        </div>
                        <div className="flex items-center gap-1 text-sm text-gray-600">
                          <Clock className="w-4 h-4" />
                          <span>{booking.time}</span>
                        </div>
                      </div>
                      <span className={`text-xs font-medium px-2 py-1 rounded-full ${STATUS_COLORS[booking.status]}`}>
                        {booking.status}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Empty State */}
        {bookings.length === 0 && (
          <div className="text-center py-16 bg-white border rounded-xl">
            <Calendar className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No bookings yet</h3>
            <p className="text-gray-500">When patients book appointments, they&apos;ll appear here.</p>
          </div>
        )}
      </div>
    </div>
  );
}
