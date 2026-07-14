import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import crypto from 'crypto';

async function hashPassword(password: string): Promise<string> {
  const data = password + process.env.NEXTAUTH_SECRET;
  return crypto.createHash('sha256').update(data).digest('hex');
}

function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
    .substring(0, 60);
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      name, email, password,
      clinicName, phone, website,
      address, city, province, postalCode,
      description, acceptsWalkIns, acceptsBookings,
    } = body;

    // Validation
    if (!name || !email || !password || !clinicName || !phone || !address || !city || !province) {
      return NextResponse.json({ error: 'All required fields must be filled' }, { status: 400 });
    }

    if (password.length < 8) {
      return NextResponse.json({ error: 'Password must be at least 8 characters' }, { status: 400 });
    }

    // Check if user exists
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return NextResponse.json({ error: 'An account with this email already exists' }, { status: 409 });
    }

    // Create user + clinic in a transaction
    const passwordHash = await hashPassword(password);
    const slug = generateSlug(clinicName);

    // Ensure unique slug
    let uniqueSlug = slug;
    let counter = 1;
    while (await prisma.clinic.findUnique({ where: { slug: uniqueSlug } })) {
      uniqueSlug = `${slug}-${counter}`;
      counter++;
    }

    // @ts-ignore
    const result = await prisma.$transaction(async (tx) => {
      const user = await tx.user.create({
        data: { name, email, passwordHash, role: 'CLINIC_OWNER' },
      });

      const clinic = await tx.clinic.create({
        data: {
          slug: uniqueSlug,
          name: clinicName,
          phone,
          email,
          website: website || null,
          address,
          city,
          province,
          description: description || null,
        },
      });

      return { user, clinic };
    });

    return NextResponse.json({
      message: 'Clinic registered successfully',
      userId: result.user.id,
      clinicId: result.clinic.id,
    }, { status: 201 });
  } catch (error) {
    console.error('Clinic registration error:', error);
    return NextResponse.json({ error: 'An unexpected error occurred' }, { status: 500 });
  }
}
