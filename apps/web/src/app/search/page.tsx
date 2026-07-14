import { Suspense } from 'react';
import SearchResults from '@/components/search/SearchResults';
import SearchFilters from '@/components/search/SearchFilters';

export default async function SearchPage({ searchParams }: { searchParams: Promise<{ q?: string; city?: string; specialty?: string; page?: string }> }) {
  const params = await searchParams;
  const query = params.q || '';
  const city = params.city || '';
  const specialty = params.specialty || '';
  const page = parseInt(params.page || '1');
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-2">{query ? `Results for "${query}"` : 'Search Results'}</h1>
      <p className="text-gray-600 mb-6">Find healthcare providers across Canada</p>
      <div className="flex flex-col lg:flex-row gap-8">
        <aside className="w-full lg:w-64 shrink-0">
          <SearchFilters query={query} city={city} specialty={specialty} />
        </aside>
        <div className="flex-1">
          <Suspense fallback={<div className="text-center py-12 text-gray-500">Loading results...</div>}>
            <SearchResults query={query} city={city} specialty={specialty} page={page} />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
