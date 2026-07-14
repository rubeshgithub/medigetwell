'use client';

import { useRouter } from 'next/navigation';
import { MapPin, Stethoscope } from 'lucide-react';

const provinces = [
  { code: 'AB', name: 'Alberta' },
  { code: 'BC', name: 'British Columbia' },
  { code: 'MB', name: 'Manitoba' },
  { code: 'NB', name: 'New Brunswick' },
  { code: 'NL', name: 'Newfoundland' },
  { code: 'NS', name: 'Nova Scotia' },
  { code: 'NT', name: 'NWT' },
  { code: 'NU', name: 'Nunavut' },
  { code: 'ON', name: 'Ontario' },
  { code: 'PE', name: 'PEI' },
  { code: 'QC', name: 'Quebec' },
  { code: 'SK', name: 'Saskatchewan' },
  { code: 'YT', name: 'Yukon' },
];

const popularCities = [
  { name: 'Calgary', province: 'AB' },
  { name: 'Edmonton', province: 'AB' },
  { name: 'Toronto', province: 'ON' },
  { name: 'Vancouver', province: 'BC' },
  { name: 'Montreal', province: 'QC' },
  { name: 'Ottawa', province: 'ON' },
  { name: 'Winnipeg', province: 'MB' },
  { name: 'Mississauga', province: 'ON' },
];

export default function SearchFilters({ query, city, specialty }: { query: string; city: string; specialty: string }) {
  const router = useRouter();

  return (
    <div className="space-y-6">
      {/* Province Filter */}
      <div className="bg-white border rounded-xl p-4">
        <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
          <MapPin className="w-4 h-4" />
          Province
        </h3>
        <div className="space-y-1 max-h-64 overflow-y-auto">
          {provinces.map((p) => (
            <button
              key={p.code}
              onClick={() => router.push(`/search?q=${query}&province=${p.code}`)}
              className={`block w-full text-left px-3 py-1.5 rounded-lg text-sm transition-colors ${
                city === p.code ? 'bg-blue-50 text-blue-700 font-medium' : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              {p.name}
            </button>
          ))}
        </div>
      </div>

      {/* Popular Cities */}
      <div className="bg-white border rounded-xl p-4">
        <h3 className="font-semibold text-gray-900 mb-3">Popular Cities</h3>
        <div className="space-y-1">
          {popularCities.map((c) => (
            <button
              key={c.name}
              onClick={() => router.push(`/clinics/walk-in-clinics/${c.province.toLowerCase()}/${c.name.toLowerCase()}`)}
              className="block w-full text-left px-3 py-1.5 rounded-lg text-sm text-gray-600 hover:bg-gray-50 transition-colors"
            >
              {c.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
