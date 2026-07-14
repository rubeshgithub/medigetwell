'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ChevronRight, Building2, Clock, MapPin, Check } from 'lucide-react';

const STEPS = [
  { id: 1, name: 'Account', icon: Building2 },
  { id: 2, name: 'Clinic Details', icon: MapPin },
  { id: 3, name: 'Hours & Services', icon: Clock },
  { id: 4, name: 'Review', icon: Check },
];

export default function ListYourPracticePage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Form state
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [clinicName, setClinicName] = useState('');
  const [phone, setPhone] = useState('');
  const [website, setWebsite] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [province, setProvince] = useState('AB');
  const [postalCode, setPostalCode] = useState('');
  const [description, setDescription] = useState('');
  const [acceptsWalkIns, setAcceptsWalkIns] = useState(true);
  const [acceptsBookings, setAcceptsBookings] = useState(false);

  const handleSubmit = async () => {
    setError('');
    setLoading(true);
    try {
      const res = await fetch('/api/clinic/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name, email, password,
          clinicName, phone, website,
          address, city, province, postalCode,
          description, acceptsWalkIns, acceptsBookings,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Registration failed');
      router.push('/clinic-portal/dashboard?registered=true');
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xs leading-none">M</span>
            </div>
            <span className="text-xl font-bold text-gray-900"><span className="text-blue-600">Medigetwell</span></span>
          </Link>
          <Link href="/login" className="text-sm text-gray-600 hover:text-blue-600">Already have an account? Sign in</Link>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Progress Steps */}
        <div className="flex items-center justify-center mb-8">
          {STEPS.map((s, i) => (
            <div key={s.id} className="flex items-center">
              <div className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                step >= s.id ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-500'
              }`}>
                <s.icon className="w-4 h-4" />
                <span className="hidden sm:inline">{s.name}</span>
                <span className="sm:hidden">{s.id}</span>
              </div>
              {i < STEPS.length - 1 && (
                <div className={`w-8 h-0.5 mx-1 ${step > s.id ? 'bg-blue-600' : 'bg-gray-200'}`} />
              )}
            </div>
          ))}
        </div>

        <div className="bg-white border rounded-xl p-8">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm mb-6">{error}</div>
          )}

          {/* Step 1: Account */}
          {step === 1 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-1">Create your account</h2>
                <p className="text-gray-600">Start by creating an account as a clinic owner.</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
                  <input type="text" value={name} onChange={(e) => setName(e.target.value)} required
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Dr. John Doe" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                  <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="you@clinic.ca" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Password *</label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required minLength={8}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Min 8 characters" />
              </div>
            </div>
          )}

          {/* Step 2: Clinic Details */}
          {step === 2 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-1">Clinic details</h2>
                <p className="text-gray-600">Tell us about your clinic.</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Clinic Name *</label>
                <input type="text" value={clinicName} onChange={(e) => setClinicName(e.target.value)} required
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Calgary Walk-In Clinic" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone *</label>
                  <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} required
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="(403) 555-0100" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Website</label>
                  <input type="url" value={website} onChange={(e) => setWebsite(e.target.value)}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="https://..." />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Address *</label>
                <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} required
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="123 Main Street" />
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">City *</label>
                  <input type="text" value={city} onChange={(e) => setCity(e.target.value)} required
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Calgary" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Province *</label>
                  <select value={province} onChange={(e) => setProvince(e.target.value)}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                    {['AB','BC','MB','NB','NL','NS','NT','NU','ON','PE','QC','SK','YT'].map(p => (
                      <option key={p} value={p}>{p}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Postal Code</label>
                  <input type="text" value={postalCode} onChange={(e) => setPostalCode(e.target.value)}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="T2P 1B3" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={3}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Describe your clinic..." />
              </div>
            </div>
          )}

          {/* Step 3: Hours & Services */}
          {step === 3 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-1">Hours & services</h2>
                <p className="text-gray-600">Set your availability and service options.</p>
              </div>
              <div className="space-y-4">
                <h3 className="font-medium text-gray-900">Operating Hours</h3>
                {['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'].map((day, i) => (
                  <div key={day} className="flex items-center gap-4">
                    <span className="w-24 text-sm text-gray-600">{day}</span>
                    <select defaultValue="open" className="px-3 py-1.5 border rounded-lg text-sm">
                      <option value="open">Open</option>
                      <option value="closed">Closed</option>
                    </select>
                    <input type="time" defaultValue="09:00" className="px-3 py-1.5 border rounded-lg text-sm" />
                    <span className="text-gray-400">to</span>
                    <input type="time" defaultValue="17:00" className="px-3 py-1.5 border rounded-lg text-sm" />
                  </div>
                ))}
              </div>
              <div className="space-y-3">
                <h3 className="font-medium text-gray-900">Service Options</h3>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input type="checkbox" checked={acceptsWalkIns} onChange={(e) => setAcceptsWalkIns(e.target.checked)}
                    className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                  <div>
                    <span className="font-medium text-gray-900">Accept Walk-ins</span>
                    <p className="text-sm text-gray-500">Patients can visit without an appointment</p>
                  </div>
                </label>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input type="checkbox" checked={acceptsBookings} onChange={(e) => setAcceptsBookings(e.target.checked)}
                    className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                  <div>
                    <span className="font-medium text-gray-900">Accept Online Bookings</span>
                    <p className="text-sm text-gray-500">Patients can book appointments online</p>
                  </div>
                </label>
              </div>
            </div>
          )}

          {/* Step 4: Review */}
          {step === 4 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-1">Review & submit</h2>
                <p className="text-gray-600">Review your information before submitting.</p>
              </div>
              <div className="bg-gray-50 rounded-xl p-6 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div><span className="text-sm text-gray-500">Owner</span><p className="font-medium">{name}</p></div>
                  <div><span className="text-sm text-gray-500">Email</span><p className="font-medium">{email}</p></div>
                  <div><span className="text-sm text-gray-500">Clinic</span><p className="font-medium">{clinicName}</p></div>
                  <div><span className="text-sm text-gray-500">Phone</span><p className="font-medium">{phone}</p></div>
                  <div className="col-span-2"><span className="text-sm text-gray-500">Address</span><p className="font-medium">{address}, {city}, {province} {postalCode}</p></div>
                  <div><span className="text-sm text-gray-500">Walk-ins</span><p className="font-medium">{acceptsWalkIns ? 'Yes' : 'No'}</p></div>
                  <div><span className="text-sm text-gray-500">Online Booking</span><p className="font-medium">{acceptsBookings ? 'Yes' : 'No'}</p></div>
                </div>
              </div>
            </div>
          )}

          {/* Navigation */}
          <div className="flex justify-between mt-8 pt-6 border-t">
            {step > 1 ? (
              <button onClick={() => setStep(step - 1)} className="px-6 py-2 border rounded-lg text-gray-700 hover:bg-gray-50">
                Back
              </button>
            ) : <div />}
            {step < 4 ? (
              <button onClick={() => setStep(step + 1)} className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                Continue
              </button>
            ) : (
              <button onClick={handleSubmit} disabled={loading}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50">
                {loading ? 'Creating...' : 'Create Listing'}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
