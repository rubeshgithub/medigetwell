import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(req: NextRequest) {
  try {
    const query = req.nextUrl.searchParams.get('q') || '';
    const limit = parseInt(req.nextUrl.searchParams.get('limit') || '10');

    if (!query.trim()) {
      return NextResponse.json({ clinics: [], specialties: [], services: [], total: 0 });
    }
    const [clinics] = await Promise.all([
      prisma.clinic.findMany({
        where: {
          OR: [
            { name: { contains: query, mode: 'insensitive' as const } },
            { email: { contains: query, mode: 'insensitive' as const } },
            { city: { contains: query, mode: 'insensitive' as const } },
            { province: { contains: query, mode: 'insensitive' as const } },
          ],
        },
        include: { reviews: true },
        take: limit,
        orderBy: { rating: 'desc' },
      }),
    ]);

    const total = clinics.length;
    return NextResponse.json({ clinics, total });
  } catch (error) {
    console.error('Search error:', error);
    return NextResponse.json({ error: 'Search failed' }, { status: 500 });
  }
}
