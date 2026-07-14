'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Save, ArrowLeft, Loader2 } from 'lucide-react';

const DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const PROVINCES = ['AB','BC','MB','NB','NL','NS','NT','NU','ON','PE','QC','SK','YT'];

export default function EditClinicPage({ clinic }: { clinic: any }) {
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSaving(true);
    setError('');
    const formData = new FormData(e.currentTarget);
    try {
      const res = await fetch(`/api/clinic/${clinic.slug}`, { method: 'PUT', body: formData });
      if (!res.ok) throw new Error('Failed to save');
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xs leading-none">M</span>
              </div>
              <span className="text-xl font-bold text-gray-900"><span className="text-blue-600">Medigetwell</span></span>
            </Link>
            <span className="text-gray-300">|</span>
            <span className="text-sm text-gray-600">Edit Listing</span>
          </div>
          <Link href="/clinic-portal/dashboard" className="text-sm text-blue-600 hover:underline flex items-center gap-1">
            <ArrowLeft className="w-4 h-4" /> Dashboard
          </Link>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {error && <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm mb-6">{error}</div>}
        {saved && <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg text-sm mb-6">✓ Changes saved successfully!</div>}

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Basic Info */}
          <div className="bg-white border rounded-xl p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Basic Information</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Clinic Name</label>
                <input name="name" defaultValue={clinic.name} required className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                <input name="phone" defaultValue={clinic.phone || ''} className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input name="email" type="email" defaultValue={clinic.email || ''} className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Website</label>
                <input name="website" defaultValue={clinic.website || ''} className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
            </div>
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea name="description" defaultValue={clinic.description || ''} rows={3} className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
          </div>

          {/* Address */}
          <div className="bg-white border rounded-xl p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Address</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Street Address</label>
                <input name="address" defaultValue={clinic.address} required className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                  <input name="city" defaultValue={clinic.city} required className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Province</label>
                  <select name="province" defaultValue={clinic.province} className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                    {PROVINCES.map(p => <option key={p} value={p}>{p}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Postal Code</label>
                  <input name="postalCode" defaultValue={clinic.postalCode || ''} className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
              </div>
            </div>
          </div>

          {/* Hours */}
          <div className="bg-white border rounded-xl p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Operating Hours</h2>
            <div className="space-y-3">
              {DAYS.map((day, i) => {
                const hour = clinic.hours?.find((h: any) => h.dayOfWeek === i);
                return (
                  <div key={day} className="flex items-center gap-4">
                    <span className="w-24 text-sm text-gray-600">{day}</span>
                    <select name={`hours[${i}][status]`} defaultValue={hour?.isClosed ? 'closed' : 'open'} className="px-3 py-1.5 border rounded-lg text-sm">
                      <option value="open">Open</option>
                      <option value="closed">Closed</option>
                    </select>
                    <input name={`hours[${i}][open]`} type="time" defaultValue={hour?.openTime || '09:00'} className="px-3 py-1.5 border rounded-lg text-sm" />
                    <span className="text-gray-400">to</span>
                    <input name={`hours[${i}][close]`} type="time" defaultValue={hour?.closeTime || '17:00'} className="px-3 py-1.5 border rounded-lg text-sm" />
                  </div>
                );
              })}
            </div>
          </div>

          {/* Services */}
          <div className="bg-white border rounded-xl p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Service Options</h2>
            <div className="space-y-3">
              <label className="flex items-center gap-3 cursor-pointer">
                <input type="checkbox" name="acceptsWalkIns" defaultChecked={clinic.acceptsWalkIns} className="w-5 h-5 rounded border-gray-300 text-blue-600" />
                <div><span className="font-medium text-gray-900">Accept Walk-ins</span><p className="text-sm text-gray-500">Patients can visit without an appointment</p></div>
              </label>
              <label className="flex items-center gap-3 cursor-pointer">
                <input type="checkbox" name="acceptsBookings" defaultChecked={clinic.acceptsBookings} className="w-5 h-5 rounded border-gray-300 text-blue-600" />
                <div><span className="font-medium text-gray-900">Accept Online Bookings</span><p className="text-sm text-gray-500">Patients can book appointments online</p></div>
              </label>
            </div>
          </div>

          <div className="flex justify-end gap-4">
            <Link href="/clinic-portal/dashboard" className="px-6 py-2 border rounded-lg text-gray-700 hover:bg-gray-50">Cancel</Link>
            <button type="submit" disabled={saving} className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 flex items-center gap-2">
              {saving ? <><Loader2 className="w-4 h-4 animate-spin" /> Saving...</> : <><Save className="w-4 h-4" /> Save Changes</>}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
