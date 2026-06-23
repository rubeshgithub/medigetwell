require('dotenv').config();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function seed() {
  console.log('Seeding database...');

  // ============ SPECIALTIES ============
  const specialties = [
    { name: 'Walk-in Clinics', slug: 'walk-in-clinics', iconEmoji: '🏥', description: 'Immediate care available without appointment' },
    { name: 'Mental Health', slug: 'mental-health', iconEmoji: '🧠', description: 'Professional mental health support and counseling' },
    { name: 'Physiotherapy', slug: 'physiotherapy', iconEmoji: '💪', description: 'Physical therapy and rehabilitation services' },
    { name: 'Chiropractic', slug: 'chiropractic', iconEmoji: '⚡', description: 'Spinal health and alignment treatments' },
    { name: 'Optometry', slug: 'optometry', iconEmoji: '👁️', description: 'Eye care and vision health services' },
    { name: 'Dental', slug: 'dental', iconEmoji: '🦷', description: 'Dental care and oral health services' },
    { name: 'Pharmacy', slug: 'pharmacy', iconEmoji: '💊', description: 'Medications and health products' },
    { name: 'Massage Therapy', slug: 'massage-therapy', iconEmoji: '💆', description: 'Registered massage therapy services' },
    { name: 'Acupuncture', slug: 'acupuncture', iconEmoji: '📍', description: 'Traditional Chinese medicine acupuncture' },
    { name: 'Naturopathy', slug: 'naturopathy', iconEmoji: '🌿', description: 'Natural and holistic health treatments' },
    { name: 'Dermatology', slug: 'dermatology', iconEmoji: '🔬', description: 'Skin health and dermatological care' },
    { name: 'Pediatrics', slug: 'pediatrics', iconEmoji: '👶', description: 'Healthcare for infants, children, and adolescents' },
    { name: 'Women\'s Health', slug: 'womens-health', iconEmoji: '👩', description: 'Women\'s health and gynecological services' },
    { name: 'Travel Clinics', slug: 'travel-clinics', iconEmoji: '✈️', description: 'Travel medicine and vaccination services' },
  ];

  for (const s of specialties) {
    await prisma.specialty.upsert({ where: { slug: s.slug }, update: s, create: s });
  }
  console.log(`✅ ${specialties.length} specialties seeded`);

  // ============ SERVICES ============
  const services = [
    { name: 'Walk-in Consultation', slug: 'walk-in-consultation' },
    { name: 'Prescription Renewal', slug: 'prescription-renewal' },
    { name: 'Flu Shot', slug: 'flu-shot' },
    { name: 'COVID Vaccination', slug: 'covid-vaccination' },
    { name: 'Physical Exam', slug: 'physical-exam' },
    { name: 'Blood Test', slug: 'blood-test' },
    { name: 'X-Ray', slug: 'x-ray' },
    { name: 'Vaccination', slug: 'vaccination' },
    { name: 'Wound Care', slug: 'wound-care' },
    { name: 'STI Testing', slug: 'sti-testing' },
    { name: 'Dental Cleaning', slug: 'dental-cleaning' },
    { name: 'Eye Exam', slug: 'eye-exam' },
    { name: 'Back Pain Treatment', slug: 'back-pain-treatment' },
    { name: 'Counseling', slug: 'counseling' },
    { name: 'Nutrition Counseling', slug: 'nutrition-counseling' },
  ];

  for (const s of services) {
    await prisma.service.upsert({ where: { slug: s.slug }, update: s, create: s });
  }
  console.log(`✅ ${services.length} services seeded`);

  // ============ SYMPTOMS ============
  const symptoms = [
    { name: 'Back Pain', slug: 'back-pain', bodyPart: 'Back' },
    { name: 'Headache', slug: 'headache', bodyPart: 'Head' },
    { name: 'Sore Throat', slug: 'sore-throat', bodyPart: 'Throat' },
    { name: 'Anxiety', slug: 'anxiety', bodyPart: 'Mental' },
    { name: 'Depression', slug: 'depression', bodyPart: 'Mental' },
    { name: 'Skin Rash', slug: 'skin-rash', bodyPart: 'Skin' },
    { name: 'Stomach Pain', slug: 'stomach-pain', bodyPart: 'Abdomen' },
    { name: 'Ear Infection', slug: 'ear-infection', bodyPart: 'Ear' },
    { name: 'UTI', slug: 'uti', bodyPart: 'Urinary' },
    { name: 'Sprains', slug: 'sprains', bodyPart: 'Joints' },
    { name: 'Allergies', slug: 'allergies', bodyPart: 'Multiple' },
    { name: 'Fever', slug: 'fever', bodyPart: 'Whole body' },
    { name: 'Cough', slug: 'cough', bodyPart: 'Chest' },
    { name: 'Fatigue', slug: 'fatigue', bodyPart: 'Whole body' },
    { name: 'Nausea', slug: 'nausea', bodyPart: 'Stomach' },
    { name: 'Chest Pain', slug: 'chest-pain', bodyPart: 'Chest' },
    { name: 'Joint Pain', slug: 'joint-pain', bodyPart: 'Joints' },
    { name: 'Neck Pain', slug: 'neck-pain', bodyPart: 'Neck' },
    { name: 'Dizziness', slug: 'dizziness', bodyPart: 'Head' },
    { name: 'Insomnia', slug: 'insomnia', bodyPart: 'Mental' },
  ];

  for (const s of symptoms) {
    await prisma.symptom.upsert({ where: { slug: s.slug }, update: s, create: s });
  }
  console.log(`✅ ${symptoms.length} symptoms seeded`);

  // ============ LANGUAGES ============
  const languages = [
    { name: 'English', code: 'en' },
    { name: 'French', code: 'fr' },
    { name: 'Mandarin', code: 'zh' },
    { name: 'Cantonese', code: 'yue' },
    { name: 'Punjabi', code: 'pa' },
    { name: 'Spanish', code: 'es' },
    { name: 'Arabic', code: 'ar' },
    { name: 'Hindi', code: 'hi' },
    { name: 'Tagalog', code: 'tl' },
    { name: 'Urdu', code: 'ur' },
  ];

  for (const l of languages) {
    await prisma.language.upsert({ where: { code: l.code }, update: l, create: l });
  }
  console.log(`✅ ${languages.length} languages seeded`);

  // ============ SAMPLE CLINICS ============
  const walkin = await prisma.specialty.findUnique({ where: { slug: 'walk-in-clinics' } });
  const dental = await prisma.specialty.findUnique({ where: { slug: 'dental' } });
  const physio = await prisma.specialty.findUnique({ where: { slug: 'physiotherapy' } });
  const en = await prisma.language.findUnique({ where: { code: 'en' } });
  const fr = await prisma.language.findUnique({ where: { code: 'fr' } });

  const clinics = [
    {
      name: 'Calgary Walk-In Clinic', slug: 'calgary-walk-in-clinic',
      description: 'Walk-in medical clinic in downtown Calgary. No appointment needed. Open 7 days a week.',
      phone: '(403) 555-0101', address: '123 8th Avenue SW', city: 'Calgary', province: 'AB', postalCode: 'T2P 1B3',
      latitude: 51.0447, longitude: -114.0719, rating: 4.2, reviewCount: 156,
      acceptsWalkIns: true, acceptsBookings: true,
      specialtyIds: [walkin!.id], langIds: [en!.id, fr!.id],
      hours: [
        { dayOfWeek: 1, openTime: '08:00', closeTime: '20:00' },
        { dayOfWeek: 2, openTime: '08:00', closeTime: '20:00' },
        { dayOfWeek: 3, openTime: '08:00', closeTime: '20:00' },
        { dayOfWeek: 4, openTime: '08:00', closeTime: '20:00' },
        { dayOfWeek: 5, openTime: '08:00', closeTime: '20:00' },
        { dayOfWeek: 6, openTime: '09:00', closeTime: '18:00' },
        { dayOfWeek: 0, openTime: '10:00', closeTime: '16:00' },
      ],
    },
    {
      name: 'Edmonton Medical Centre', slug: 'edmonton-medical-centre',
      description: 'Full-service medical clinic in Edmonton. Family doctors and walk-in services available.',
      phone: '(780) 555-0202', address: '456 Jasper Avenue', city: 'Edmonton', province: 'AB', postalCode: 'T5J 1N9',
      latitude: 53.5461, longitude: -113.4938, rating: 4.5, reviewCount: 203,
      acceptsWalkIns: true, acceptsBookings: true,
      specialtyIds: [walkin!.id], langIds: [en!.id],
      hours: [
        { dayOfWeek: 1, openTime: '07:30', closeTime: '19:00' },
        { dayOfWeek: 2, openTime: '07:30', closeTime: '19:00' },
        { dayOfWeek: 3, openTime: '07:30', closeTime: '19:00' },
        { dayOfWeek: 4, openTime: '07:30', closeTime: '19:00' },
        { dayOfWeek: 5, openTime: '07:30', closeTime: '19:00' },
        { dayOfWeek: 6, openTime: '09:00', closeTime: '17:00' },
        { dayOfWeek: 0, isClosed: true, openTime: '00:00', closeTime: '00:00' },
      ],
    },
    {
      name: 'Toronto Downtown Dental', slug: 'toronto-downtown-dental',
      description: 'Modern dental clinic in the heart of Toronto. General and cosmetic dentistry services.',
      phone: '(416) 555-0303', address: '789 Bay Street', city: 'Toronto', province: 'ON', postalCode: 'M5G 1N8',
      latitude: 43.6532, longitude: -79.3832, rating: 4.8, reviewCount: 312,
      acceptsWalkIns: false, acceptsBookings: true,
      specialtyIds: [dental!.id], langIds: [en!.id, fr!.id],
      hours: [
        { dayOfWeek: 1, openTime: '09:00', closeTime: '18:00' },
        { dayOfWeek: 2, openTime: '09:00', closeTime: '18:00' },
        { dayOfWeek: 3, openTime: '09:00', closeTime: '18:00' },
        { dayOfWeek: 4, openTime: '09:00', closeTime: '20:00' },
        { dayOfWeek: 5, openTime: '09:00', closeTime: '17:00' },
        { dayOfWeek: 6, openTime: '10:00', closeTime: '15:00' },
        { dayOfWeek: 0, isClosed: true, openTime: '00:00', closeTime: '00:00' },
      ],
    },
    {
      name: 'Vancouver Physiotherapy & Rehab', slug: 'vancouver-physiotherapy-rehab',
      description: 'Leading physiotherapy clinic in Vancouver. Sports injury rehabilitation and chronic pain management.',
      phone: '(604) 555-0404', address: '321 Granville Street', city: 'Vancouver', province: 'BC', postalCode: 'V6C 1S4',
      latitude: 49.2827, longitude: -123.1207, rating: 4.6, reviewCount: 189,
      acceptsWalkIns: false, acceptsBookings: true,
      specialtyIds: [physio!.id], langIds: [en!.id],
      hours: [
        { dayOfWeek: 1, openTime: '08:00', closeTime: '19:00' },
        { dayOfWeek: 2, openTime: '08:00', closeTime: '19:00' },
        { dayOfWeek: 3, openTime: '08:00', closeTime: '19:00' },
        { dayOfWeek: 4, openTime: '08:00', closeTime: '19:00' },
        { dayOfWeek: 5, openTime: '08:00', closeTime: '17:00' },
        { dayOfWeek: 6, openTime: '09:00', closeTime: '14:00' },
        { dayOfWeek: 0, isClosed: true, openTime: '00:00', closeTime: '00:00' },
      ],
    },
    {
      name: 'Mississauga Family Health', slug: 'mississauga-family-health',
      description: 'Comprehensive family health services in Mississauga. Walk-ins welcome, appointments available.',
      phone: '(905) 555-0505', address: '555 Hurontario Street', city: 'Mississauga', province: 'ON', postalCode: 'L5R 3A9',
      latitude: 43.5890, longitude: -79.6441, rating: 4.1, reviewCount: 98,
      acceptsWalkIns: true, acceptsBookings: true,
      specialtyIds: [walkin!.id], langIds: [en!.id, fr!.id],
      hours: [
        { dayOfWeek: 1, openTime: '08:00', closeTime: '21:00' },
        { dayOfWeek: 2, openTime: '08:00', closeTime: '21:00' },
        { dayOfWeek: 3, openTime: '08:00', closeTime: '21:00' },
        { dayOfWeek: 4, openTime: '08:00', closeTime: '21:00' },
        { dayOfWeek: 5, openTime: '08:00', closeTime: '21:00' },
        { dayOfWeek: 6, openTime: '09:00', closeTime: '18:00' },
        { dayOfWeek: 0, openTime: '10:00', closeTime: '16:00' },
      ],
    },
  ];

  for (const c of clinics) {
    const existing = await prisma.clinic.findUnique({ where: { slug: c.slug } });
    if (existing) { console.log(`  ⏭️  ${c.name} exists`); continue; }
    const { specialtyIds, langIds, hours, ...data } = c;
    await prisma.clinic.create({
      data: {
        ...data,
        specialties: { create: specialtyIds.map((id: string) => ({ specialtyId: id })) },
        languages: { create: langIds.map((id: string) => ({ languageId: id })) },
        hours: { create: hours },
      },
    });
    console.log(`  ✅ ${c.name}`);
  }

  // ============ BLOG POSTS ============
  const posts = [
    { title: 'Why Your Back Hurts All the Time', slug: 'why-your-back-hurts-all-the-time', excerpt: 'Understanding the common causes of chronic back pain.', content: '# Back Pain\n\nContent here...', authorName: 'Dr. Sarah Chen', isPublished: true, publishedAt: new Date('2026-06-18') },
    { title: "Why You're Always Bloated", slug: 'why-youre-always-bloated', excerpt: "Bloating is more than just discomfort.", content: '# Bloating\n\nContent here...', authorName: 'Dr. Michael Park', isPublished: true, publishedAt: new Date('2026-06-08') },
    { title: 'Walk-in Clinic vs. the ER', slug: 'walk-in-clinic-vs-er', excerpt: 'Knowing the difference can save you time and money.', content: '# Walk-in vs ER\n\nContent here...', authorName: 'Dr. Emily Watson', isPublished: true, publishedAt: new Date('2026-05-25') },
  ];

  for (const p of posts) {
    await prisma.post.upsert({ where: { slug: p.slug }, update: p, create: p });
  }
  console.log(`✅ ${posts.length} blog posts seeded`);

  console.log('\n🎉 Database seeding complete!');
}

seed().catch(e => { console.error(e); process.exit(1); }).finally(() => prisma.$disconnect());
