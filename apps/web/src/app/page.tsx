import Link from 'next/link';
import { Search } from 'lucide-react';

const specialties = [
  { slug: 'walk-in-clinics', name: 'Walk-in Clinic', icon: '🏥', gradient: 'from-red-500 to-pink-600' },
  { slug: 'mental-health', name: 'Mental Health', icon: '🧠', gradient: 'from-purple-500 to-indigo-600' },
  { slug: 'physiotherapists', name: 'Physiotherapist', icon: '💪', gradient: 'from-blue-500 to-blue-600' },
  { slug: 'chiropractors', name: 'Chiropractor', icon: '⚡', gradient: 'from-orange-500 to-red-600' },
  { slug: 'optometrists', name: 'Optometrist', icon: '👁️', gradient: 'from-emerald-500 to-teal-600' },
  { slug: 'dental', name: 'Dental', icon: '🦷', gradient: 'from-cyan-500 to-blue-600' },
  { slug: 'pharmacies', name: 'Pharmacies', icon: '💊', gradient: 'from-blue-500 to-cyan-600' },
  { slug: 'massage-therapists', name: 'Massage Therapy', icon: '💆', gradient: 'from-pink-500 to-rose-600' },
];

const popularCities = [
  { name: 'Calgary', province: 'AB', slug: 'calgary' },
  { name: 'Edmonton', province: 'AB', slug: 'edmonton' },
  { name: 'Toronto', province: 'ON', slug: 'toronto' },
  { name: 'Vancouver', province: 'BC', slug: 'vancouver' },
  { name: 'Montreal', province: 'QC', slug: 'montreal' },
  { name: 'Winnipeg', province: 'MB', slug: 'winnipeg' },
  { name: 'Ottawa', province: 'ON', slug: 'ottawa' },
  { name: 'Mississauga', province: 'ON', slug: 'mississauga' },
];

export default function HomePage() {
  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-indigo-50 py-16 sm:py-24">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4 leading-tight">
            Find a Healthcare Provider<br />
            <span className="text-blue-600">Near You in Canada</span>
          </h1>
          <p className="text-gray-600 text-lg mb-8 max-w-2xl mx-auto">
            Hours, ratings, and directions for clinics across Canada. Book appointments instantly.
          </p>
          <form action="/search" method="GET" className="max-w-2xl mx-auto relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              name="q"
              placeholder="Search clinics, cities, specialties..."
              className="w-full pl-12 pr-24 py-4 rounded-full border border-gray-300 bg-white text-gray-900 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-lg"
            />
            <button
              type="submit"
              className="absolute right-2 top-1/2 -translate-y-1/2 px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors font-medium"
            >
              Search
            </button>
          </form>
          <div className="flex flex-wrap justify-center gap-2 mt-8">
            {['Walk-in Clinic', 'Physiotherapist', 'Chiropractor', 'Mental Health', 'Dentist'].map((tag) => (
              <Link
                key={tag}
                href={`/search?q=${encodeURIComponent(tag)}`}
                className="text-sm font-medium px-3 py-1 rounded-full bg-white text-gray-600 shadow-sm hover:text-blue-600 hover:shadow transition-colors"
              >
                {tag}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4">
          <dl className="grid grid-cols-3 divide-x divide-gray-200 text-center">
            <div className="px-4">
              <dt className="text-3xl sm:text-4xl font-bold text-blue-600">0</dt>
              <dd className="text-sm text-gray-500 mt-1">Clinics Listed</dd>
            </div>
            <div className="px-4">
              <dt className="text-3xl sm:text-4xl font-bold text-blue-600">0</dt>
              <dd className="text-sm text-gray-500 mt-1">Cities Covered</dd>
            </div>
            <div className="px-4">
              <dt className="text-3xl sm:text-4xl font-bold text-blue-600">13</dt>
              <dd className="text-sm text-gray-500 mt-1">Provinces & Territories</dd>
            </div>
          </dl>
        </div>
      </section>

      {/* Specialty Cards */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl font-bold text-gray-900 mb-2 text-center">Find care by specialty</h2>
          <p className="text-gray-600 text-center mb-12">Browse healthcare providers by category</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {specialties.map((specialty) => (
              <Link
                key={specialty.slug}
                href={`/specialties/${specialty.slug}`}
                className="group relative overflow-hidden rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${specialty.gradient} opacity-90`} />
                <div className="relative p-6 text-white">
                  <span className="text-3xl mb-3 block">{specialty.icon}</span>
                  <h3 className="font-semibold text-lg">{specialty.name}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Cities */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl font-bold text-gray-900 mb-2 text-center">Popular Cities</h2>
          <p className="text-gray-600 text-center mb-12">Find healthcare providers in Canada's largest cities</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {popularCities.map((city) => (
              <Link
                key={`${city.name}-${city.province}`}
                href={`/clinics/walk-in-clinics/${city.province.toLowerCase()}/${city.slug}`}
                className="group bg-white border border-gray-200 rounded-xl p-4 hover:border-blue-500 hover:shadow-md transition-all"
              >
                <span className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                  {city.name}
                </span>
                <span className="text-xs text-gray-500 block">{city.province}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-3xl p-8 sm:p-12 text-center text-white">
            <h2 className="text-3xl font-bold mb-4">Are you a healthcare provider?</h2>
            <p className="text-blue-100 mb-8 max-w-lg mx-auto">
              Join thousands of clinics across Canada. Increase your visibility, fill last-minute openings, and manage your practice online.
            </p>
            <Link
              href="/list-your-practice"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-blue-600 font-semibold rounded-full hover:bg-gray-100 transition-colors"
            >
              List Your Practice
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
