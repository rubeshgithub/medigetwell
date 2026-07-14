'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ChevronRight, Stethoscope, AlertCircle, ArrowRight } from 'lucide-react';

interface SymptomResult {
  specialty: string;
  slug: string;
  urgency: 'low' | 'medium' | 'high';
  description: string;
}

const symptomToSymptom: Record<string, SymptomResult[]> = {
  'headache': [
    { specialty: 'General Practice', slug: 'general-practice', urgency: 'low', description: 'Most headaches can be treated by a general practitioner.' },
    { specialty: 'Neurology', slug: 'neurology', urgency: 'medium', description: 'For severe or recurring headaches, see a neurologist.' },
  ],
  'back pain': [
    { specialty: 'Physiotherapy', slug: 'physiotherapy', urgency: 'low', description: 'Physiotherapists can help with most back pain.' },
    { specialty: 'Chiropractic', slug: 'chiropractic', urgency: 'low', description: 'Chiropractors specialize in spinal alignment.' },
  ],
  'fever': [
    { specialty: 'Walk-in Clinic', slug: 'walk-in-clinics', urgency: 'medium', description: 'For persistent fever, visit a walk-in clinic.' },
    { specialty: 'General Practice', slug: 'general-practice', urgency: 'low', description: 'Your family doctor can assess fever causes.' },
  ],
  'cough': [
    { specialty: 'Walk-in Clinic', slug: 'walk-in-clinics', urgency: 'low', description: 'Most coughs can be assessed at a walk-in clinic.' },
  ],
  'skin rash': [
    { specialty: 'Dermatology', slug: 'dermatology', urgency: 'medium', description: 'Dermatologists specialize in skin conditions.' },
    { specialty: 'Walk-in Clinic', slug: 'walk-in-clinics', urgency: 'low', description: 'Walk-in clinics can assess most rashes.' },
  ],
  'anxiety': [
    { specialty: 'Mental Health', slug: 'mental-health', urgency: 'medium', description: 'Mental health professionals can provide support.' },
  ],
  'joint pain': [
    { specialty: 'Physiotherapy', slug: 'physiotherapy', urgency: 'low', description: 'Physio helps with joint mobility and pain.' },
    { specialty: 'Chiropractic', slug: 'chiropractic', urgency: 'low', description: 'Chiropractic care for joint alignment.' },
  ],
  'sore throat': [
    { specialty: 'Walk-in Clinic', slug: 'walk-in-clinics', urgency: 'low', description: 'Quick assessment at a walk-in clinic.' },
  ],
};

const urgencyColors = {
  low: 'bg-green-50 text-green-700 border-green-200',
  medium: 'bg-yellow-50 text-yellow-700 border-yellow-200',
  high: 'bg-red-50 text-red-700 border-red-200',
};

const urgencyLabels = {
  low: 'Routine care',
  medium: 'See a doctor soon',
  high: 'Seek immediate care',
};

export default function SymptomCheckerPage() {
  const [selectedSymptom, setSelectedSymptom] = useState('');
  const [results, setResults] = useState<SymptomResult[] | null>(null);

  const commonSymptoms = [
    'Headache', 'Back Pain', 'Fever', 'Cough', 'Skin Rash',
    'Anxiety', 'Joint Pain', 'Sore Throat', 'Fatigue', 'Nausea',
  ];

  const handleCheck = (symptom: string) => {
    setSelectedSymptom(symptom);
    const found = symptomToSymptom[symptom.toLowerCase()];
    setResults(found || [
      { specialty: 'General Practice', slug: 'general-practice', urgency: 'low', description: 'Your family doctor is a good starting point for any health concern.' },
    ]);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
      <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-blue-600">Home</Link>
        <ChevronRight className="w-4 h-4" />
        <span className="text-gray-900">Symptom Checker</span>
      </nav>

      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4">
          <Stethoscope className="w-8 h-8 text-blue-600" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Symptom Checker</h1>
        <p className="text-gray-600 max-w-lg mx-auto">
          Select a symptom to find the right type of care. This tool helps you identify which healthcare provider may be best suited for your concern.
        </p>
      </div>

      {/* Disclaimer */}
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-8 flex items-start gap-3">
        <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
        <div>
          <p className="text-sm text-amber-800 font-medium">Not medical advice</p>
          <p className="text-sm text-amber-700">This tool is for informational purposes only. For medical emergencies, call 911.</p>
        </div>
      </div>

      {/* Symptom Selection */}
      <div className="bg-white border rounded-xl p-6 mb-8">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">What symptom are you experiencing?</h2>
        <div className="flex flex-wrap gap-2">
          {commonSymptoms.map((symptom) => (
            <button
              key={symptom}
              onClick={() => handleCheck(symptom)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedSymptom === symptom
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {symptom}
            </button>
          ))}
        </div>
      </div>

      {/* Results */}
      {results && (
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-gray-900">
            Recommended care for &quot;{selectedSymptom}&quot;
          </h2>
          {results.map((result) => (
            <div key={result.slug} className="bg-white border rounded-xl p-6">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{result.specialty}</h3>
                  <span className={`inline-block text-xs font-medium px-2 py-1 rounded-full border mt-1 ${urgencyColors[result.urgency]}`}>
                    {urgencyLabels[result.urgency]}
                  </span>
                </div>
                <Link
                  href={`/specialties/${result.slug}`}
                  className="inline-flex items-center gap-1 text-sm text-blue-600 hover:underline"
                >
                  Find providers <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
              <p className="text-gray-600">{result.description}</p>
            </div>
          ))}

          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mt-6">
            <p className="text-sm text-blue-800">
              <strong>Need immediate help?</strong> For life-threatening symptoms, call 911 or visit the nearest emergency room.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
