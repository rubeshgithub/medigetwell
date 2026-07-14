'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Search, X, MapPin, Stethoscope, Activity, FileText, Loader2 } from 'lucide-react';

interface SearchResult {
  clinics: any[];
  specialties: any[];
  services: any[];
  symptoms: any[];
  posts: any[];
}

export function GlobalSearch() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const debounceRef = useRef<NodeJS.Timeout | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    if (!query.trim()) { setResults(null); return; }

    debounceRef.current = setTimeout(async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
        const data = await res.json();
        setResults(data.results);
        setShowResults(true);
      } catch (err) {
        console.error('Search error:', err);
      } finally {
        setLoading(false);
      }
    }, 300);

    return () => { if (debounceRef.current) clearTimeout(debounceRef.current); };
  }, [query]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
      setShowResults(false);
    }
  };

  const typeIcons: Record<string, any> = {
    clinics: MapPin,
    specialties: Stethoscope,
    services: Activity,
    symptoms: Activity,
    posts: FileText,
  };

  return (
    <div className="relative w-full">
      <form onSubmit={handleSearch} className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => results && setShowResults(true)}
          placeholder="Search clinics, cities, specialties..."
          className="w-full pl-12 pr-10 py-3 rounded-xl border border-gray-300 bg-white text-gray-900 text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {query && (
          <button type="button" onClick={() => { setQuery(''); setResults(null); }}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
            <X className="w-5 h-5" />
          </button>
        )}
      </form>

      {/* Dropdown Results */}
      {showResults && (query.trim() || results) && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl border shadow-xl z-50 max-h-96 overflow-y-auto">
          {loading && (
            <div className="p-4 text-center">
              <Loader2 className="w-6 h-6 animate-spin text-blue-600 mx-auto" />
            </div>
          )}

          {!loading && results && (
            <>
              {Object.entries(results).map(([type, items]) => {
                if (!items || items.length === 0) return null;
                const Icon = typeIcons[type] || Search;
                return (
                  <div key={type} className="border-b last:border-0">
                    <div className="px-4 py-2 bg-gray-50 text-xs font-medium text-gray-500 uppercase flex items-center gap-2">
                      <Icon className="w-3 h-3" />
                      {type} ({items.length})
                    </div>
                    {items.slice(0, 3).map((item: any) => (
                      <a
                        key={item.id}
                        href={type === 'clinics' ? `/clinic/${item.slug}` : type === 'specialties' ? `/specialties/${item.slug}` : type === 'services' ? `/services/${item.slug}` : type === 'symptoms' ? `/symptoms/${item.slug}` : `/posts/${item.slug}`}
                        onClick={() => setShowResults(false)}
                        className="block px-4 py-3 hover:bg-gray-50 transition-colors"
                      >
                        <p className="font-medium text-gray-900 text-sm">{item.name || item.title}</p>
                        {item.address && <p className="text-xs text-gray-500">{item.address}, {item.city}</p>}
                        {item.bodyPart && <p className="text-xs text-gray-500">{item.bodyPart}</p>}
                      </a>
                    ))}
                  </div>
                );
              })}
              <button
                onClick={handleSearch}
                className="w-full px-4 py-3 text-sm font-medium text-blue-600 hover:bg-blue-50 transition-colors text-center border-t"
              >
                View all results for &quot;{query}&quot;
              </button>
            </>
          )}

          {!loading && !results && query.trim() && (
            <div className="p-4 text-center text-gray-500">No results found</div>
          )}
        </div>
      )}
    </div>
  );
}
