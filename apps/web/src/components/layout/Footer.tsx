import Link from 'next/link';

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-semibold mb-4">For Patients</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link href="/search" className="hover:text-white transition-colors">Find a Clinic</Link></li>
              <li><Link href="/specialties" className="hover:text-white transition-colors">Specialties</Link></li>
              <li><Link href="/services" className="hover:text-white transition-colors">Services</Link></li>
              <li><Link href="/symptoms" className="hover:text-white transition-colors">Symptoms</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4">For Clinics</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link href="/list-your-practice" className="hover:text-white transition-colors">List Your Practice</Link></li>
              <li><Link href="/clinic-portal" className="hover:text-white transition-colors">Clinic Portal</Link></li>
              <li><Link href="/pricing" className="hover:text-white transition-colors">Pricing</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Company</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link href="/about" className="hover:text-white transition-colors">About Us</Link></li>
              <li><Link href="/posts" className="hover:text-white transition-colors">Health Blog</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Legal</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link href="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms-of-service" className="hover:text-white transition-colors">Terms of Service</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-800 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} Medigetwell. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
