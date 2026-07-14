import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import { Calendar, Star, Eye, Users, Clock, MapPin, Phone, Edit } from 'lucide-react';

export default async function ClinicDashboardPage() {
  const owner = await prisma.user.findFirst({
    where: { role: 'CLINIC_OWNER' },
  });
  
  if (!owner) {
    return <div>No clinic owner found</div>;
  }
  
  const clinics = await prisma.clinic.findMany({
    where: { },
    include: {
      reviews: { orderBy: { createdAt: 'desc' }, take: 5 },
    },
  });

  const clinic = clinics[0];

  if (!clinic) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">No clinic found</h1>
          <p className="text-gray-600 mb-4">You need to register a clinic first.</p>
          <Link href="/list-your-practice" className="text-blue-600 hover:underline">List your practice</Link>
        </div>
      </div>
    );
  }

  // Mock stats (in production, these would be real queries)
  const stats = {
    profileViews: 1234,
    bookings: 45,
    rating: clinic.rating || 4.5,
    reviews: clinic.reviews?.length || 23,
  };

  const today = new Date().getDay();
  // const todayHours = clinic.hours?.find(h => h.dayOfWeek === today);
  const todayHours = undefined;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
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
            <span className="text-sm text-gray-600">Clinic Portal</span>
          </div>
          <div className="flex items-center gap-3">
            <Link href={`/clinic/${clinic.slug}`} className="text-sm text-blue-600 hover:underline">View Public Page</Link>
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
              <span className="text-blue-600 font-medium text-sm">{owner?.name?.charAt(0) || 'U'}</span>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{clinic.name}</h1>
            <div className="flex items-center gap-1 text-gray-600 mt-1">
              <MapPin className="w-4 h-4" />
              <span>{clinic.address}, {clinic.city}, {clinic.province}</span>
            </div>
          </div>
          <Link href="/clinic-portal/edit" className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            <Edit className="w-4 h-4" /> Edit Listing
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-white border rounded-xl p-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
                <Eye className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{stats.profileViews.toLocaleString()}</p>
                <p className="text-sm text-gray-500">Profile Views</p>
              </div>
            </div>
          </div>
          <div className="bg-white border rounded-xl p-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-purple-50 rounded-lg flex items-center justify-center">
                <Calendar className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{stats.bookings}</p>
                <p className="text-sm text-gray-500">Bookings</p>
              </div>
            </div>
          </div>
          <div className="bg-white border rounded-xl p-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-yellow-50 rounded-lg flex items-center justify-center">
                <Star className="w-5 h-5 text-yellow-500" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{stats.rating.toFixed(1)}</p>
                <p className="text-sm text-gray-500">Rating</p>
              </div>
            </div>
          </div>
          <div className="bg-white border rounded-xl p-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center">
                <Users className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{stats.reviews}</p>
                <p className="text-sm text-gray-500">Reviews</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Quick Info */}
            <div className="bg-white border rounded-xl p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Info</h2>
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-sm">
                  <Phone className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-600">{clinic.phone}</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Clock className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-600">
                    Hours: 9:00 AM - 5:00 PM
                  </span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <MapPin className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-600">{clinic.address}, {clinic.city}, {clinic.province}</span>
                </div>
              </div>
            </div>

            {/* Recent Reviews */}
            <div className="bg-white border rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900">Recent Reviews</h2>
                <Link href="/clinic-portal/reviews" className="text-sm text-blue-600 hover:underline">View all</Link>
              </div>
              {clinic.reviews.length === 0 ? (
                <p className="text-gray-500 text-center py-8">No reviews yet.</p>
              ) : (
                <div className="space-y-4">
                  {clinic.reviews.map((review) => (
                    <div key={review.id} className="border-b last:border-0 pb-4 last:pb-0">
                      <div className="flex items-center gap-2 mb-1">
                        <div className="flex">{[1,2,3,4,5].map(s => (
                          <Star key={s} className={`w-4 h-4 ${s <= review.rating ? 'text-yellow-500 fill-current' : 'text-gray-300'}`} />
                        ))}</div>
                        <span className="text-sm text-gray-500">{review.author || 'Anonymous'}</span>
                      </div>
                      {review.text && <p className="text-sm text-gray-600">{review.text}</p>}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Visibility Card */}
            <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl p-6 text-white">
              <h3 className="font-semibold text-lg mb-2">Boost Your Visibility</h3>
              <p className="text-blue-100 text-sm mb-4">
                Clinics with complete listings get 3x more views. Make sure your hours, services, and photos are up to date.
              </p>
              <Link href="/clinic-portal/edit" className="inline-block px-4 py-2 bg-white text-blue-600 font-medium rounded-lg hover:bg-blue-50 transition-colors text-sm">
                Complete Profile
              </Link>
            </div>

            {/* Quick Actions */}
            <div className="bg-white border rounded-xl p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Quick Actions</h3>
              <div className="space-y-2">
                <Link href="/clinic-portal/edit" className="block w-full text-left px-4 py-2 rounded-lg hover:bg-gray-50 text-sm text-gray-700">
                  ✏️ Edit clinic info
                </Link>
                <Link href="/clinic-portal/hours" className="block w-full text-left px-4 py-2 rounded-lg hover:bg-gray-50 text-sm text-gray-700">
                  🕐 Update hours
                </Link>
                <Link href="/clinic-portal/bookings" className="block w-full text-left px-4 py-2 rounded-lg hover:bg-gray-50 text-sm text-gray-700">
                  📅 Manage bookings
                </Link>
                <Link href="/clinic-portal/reviews" className="block w-full text-left px-4 py-2 rounded-lg hover:bg-gray-50 text-sm text-gray-700">
                  ⭐ View reviews
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
