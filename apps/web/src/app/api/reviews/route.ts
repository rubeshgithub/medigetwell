import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(req: NextRequest) {
  try {
    const { clinicId, rating, title, body, userName } = await req.json();

    if (!clinicId || !rating || rating < 1 || rating > 5) {
      return NextResponse.json({ error: 'Valid rating (1-5) and clinicId required' }, { status: 400 });
    }

    // Create or find user (for MVP, create anonymous if no auth)
    let userId: string;
    if (userName) {
      const user = await prisma.user.upsert({
        where: { email: `anon_${Date.now()}@medidepot.ca` },
        update: {},
        create: { email: `anon_${Date.now()}@medidepot.ca`, name: userName, role: 'PATIENT' },
      });
      userId = user.id;
    } else {
      return NextResponse.json({ error: 'User name required' }, { status: 400 });
    }

    const review = await prisma.review.create({
      data: { clinicId, rating, text: body, author: userName },
    });

    // Update clinic rating
    const stats = await prisma.review.aggregate({
      where: { clinicId },
      _avg: { rating: true },
      _count: { rating: true },
    });

    await prisma.clinic.update({
      where: { id: clinicId },
      data: {
        rating: stats._avg.rating || 0,
        reviewCount: stats._count.rating,
      },
    });

    return NextResponse.json({ success: true, review }, { status: 201 });
  } catch (error) {
    console.error('Review submission error:', error);
    return NextResponse.json({ error: 'Failed to submit review' }, { status: 500 });
  }
}
