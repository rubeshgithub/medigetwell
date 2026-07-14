import { z } from 'zod';
import { createTRPCRouter, publicProcedure } from '../trpc';

export const searchRouter = createTRPCRouter({
  search: publicProcedure
    .input(z.object({ q: z.string().min(1) }))
    .query(async ({ input, ctx }) => {
      const searchTerm = input.q.toLowerCase();

      const [clinics, specialties, services, symptoms] = await Promise.all([
        ctx.prisma.clinic.findMany({
          where: {
            isActive: true,
            OR: [
              { name: { contains: searchTerm, mode: 'insensitive' as const } },
              { city: { contains: searchTerm, mode: 'insensitive' as const } },
              { province: { contains: searchTerm, mode: 'insensitive' as const } },
            ],
          },
          take: 10,
          include: { specialties: { include: { specialty: true } } },
        }),
        ctx.prisma.specialty.findMany({
          where: { name: { contains: searchTerm, mode: 'insensitive' as const } },
          take: 5,
        }),
        ctx.prisma.service.findMany({
          where: { name: { contains: searchTerm, mode: 'insensitive' as const } },
          take: 5,
        }),
        ctx.prisma.symptom.findMany({
          where: { name: { contains: searchTerm, mode: 'insensitive' as const } },
          take: 5,
        }),
      ]);

      return { clinics, specialties, services, symptoms };
    }),
});
