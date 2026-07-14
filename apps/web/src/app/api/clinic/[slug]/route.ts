import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(req: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const clinic = await prisma.clinic.findUnique({
    where: { slug },
    include: {
      reviews: true,
    },
  });
  if (!clinic) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json(clinic);
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const formData = await req.formData();

  const name = formData.get('name') as string;
  const phone = formData.get('phone') as string;
  const email = formData.get('email') as string;
  const website = formData.get('website') as string;
  const address = formData.get('address') as string;
  const city = formData.get('city') as string;
  const province = formData.get('province') as string;
  const postalCode = formData.get('postalCode') as string;
  const description = formData.get('description') as string;
  const acceptsWalkIns = formData.get('acceptsWalkIns') === 'on';
  const acceptsBookings = formData.get('acceptsBookings') === 'on';

  await prisma.clinic.update({
    where: { slug },
    data: { name, phone, email, website, address, city, province, description },
  });

  // Update hours - commented out as clinicHour table not defined in schema
  /* 
  for (let i = 0; i < 7; i++) {
    const status = formData.get(`hours[${i}][status]`) as string;
    const openTime = formData.get(`hours[${i}][open]`) as string;
    const closeTime = formData.get(`hours[${i}][close]`) as string;

    await prisma.clinicHour.upsert({
      where: { clinicId_dayOfWeek: { clinicId: (await prisma.clinic.findUnique({ where: { slug } }))!.id, dayOfWeek: i } },
      update: { openTime: openTime || '09:00', closeTime: closeTime || '17:00', isClosed: status === 'closed' },
      create: { clinicId: (await prisma.clinic.findUnique({ where: { slug } }))!.id, dayOfWeek: i, openTime: openTime || '09:00', closeTime: closeTime || '17:00', isClosed: status === 'closed' },
    });
  }
  */

  return NextResponse.json({ success: true });
}
