'use client';

import { useEffect, useRef, useState } from 'react';
import { MapPin, Navigation } from 'lucide-react';

interface ClinicMapProps {
  latitude?: number | null;
  longitude?: number | null;
  address: string;
  clinicName: string;
}

export default function ClinicMap({ latitude, longitude, address, clinicName }: ClinicMapProps) {
  const [mapLoaded, setMapLoaded] = useState(false);

  // If we have coordinates, show embedded map
  if (latitude && longitude) {
    return (
      <div className="space-y-3">
        <div className="rounded-xl overflow-hidden border h-64 relative bg-gray-100">
          <iframe
            width="100%"
            height="100%"
            style={{ border: 0 }}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            src={`https://www.google.com/maps/embed/v1/place?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ''}&q=${encodeURIComponent(address)}&center=${latitude},${longitude}&zoom=15`}
          />
          {!mapLoaded && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
              <div className="text-center">
                <MapPin className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-gray-500">Loading map...</p>
              </div>
            </div>
          )}
        </div>

        <div className="flex items-center justify-between">
          <a
            href={`https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm text-blue-600 hover:underline"
          >
            <Navigation className="w-4 h-4" />
            Open in Google Maps
          </a>
          <a
            href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(address)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm text-blue-600 hover:underline"
          >
            Get Directions
          </a>
        </div>
      </div>
    );
  }

  // Fallback: static map link without coordinates
  return (
    <div className="space-y-3">
      <div className="rounded-xl border h-48 bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center">
        <div className="text-center">
          <MapPin className="w-10 h-10 text-blue-300 mx-auto mb-2" />
          <p className="text-sm text-gray-500 mb-1">{address}</p>
          <p className="text-xs text-gray-400">Map not available</p>
        </div>
      </div>
      <a
        href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(address)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors"
      >
        <Navigation className="w-4 h-4" />
        Get Directions on Google Maps
      </a>
    </div>
  );
}
