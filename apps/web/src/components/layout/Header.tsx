import Link from 'next/link';
import Image from 'next/image';

export function Header() {
  return (
    <header className="sticky top-0 z-40 w-full bg-white/80 backdrop-blur-md border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xs leading-none">M</span>
            </div>
            <span className="text-xl font-bold text-gray-900">
              <span className="text-blue-600">Medigetwell</span>
            </span>
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/symptom-checker" className="text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors">
              Symptom Checker
            </Link>
            <Link href="/specialties" className="text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors">
              Specialties
            </Link>
            <Link href="/services" className="text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors">
              Services
            </Link>
            <Link href="/symptoms" className="text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors">
              Symptoms
            </Link>
            <Link href="/posts" className="text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors">
              Blog
            </Link>
          </nav>
          <div className="flex items-center gap-3">
            <Link
              href="/login"
              className="text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors"
            >
              Log in
            </Link>
            <Link
              href="/list-your-practice"
              className="text-sm font-medium px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              List Your Practice
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
