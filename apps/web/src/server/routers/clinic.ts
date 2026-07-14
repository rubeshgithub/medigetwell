import { z } from 'zod';
import { createTRPCRouter, publicProcedure } from '../trpc';

export const clinicRouter = createTRPCRouter({
  getAll: publicProcedure
    .input(z.object({
      city: z.string().optional(),
      province: z.string().optional(),
      specialty: z.string().optional(),
      page: z.number().default(1),
      limit: z.number().default(20),
    }))
    .query(async ({ input, ctx }) => {
      const { city, province, specialty, page, limit } = input;
      const where: any = { isActive: true };
      if (city) where.city = { equals: city, mode: 'insensitive' as const };
      if (province) where.province = { equals: province, mode: 'insensitive' as const };
      if (specialty) where.specialties = { some: { specialty: { slug: specialty } } };

      const [clinics, total] = await Promise.all([
        ctx.prisma.clinic.findMany({
          where,
          include: {
            specialties: { include: { specialty: true } },
            services: { include: { service: true } },
            hours: { orderBy: { dayOfWeek: 'asc' } },
          },
          skip: (page - 1) * limit,
          take: limit,
          orderBy: { rating: 'desc' },
        }),
        ctx.prisma.clinic.count({ where }),
      ]);

      return { clinics, total, page, limit, totalPages: Math.ceil(total / limit) };
    }),

  getBySlug: publicProcedure
    .input(z.object({ slug: z.string() }))
    .query(async ({ input, ctx }) => {
      return ctx.prisma.clinic.findUnique({
        where: { slug: input.slug },
        include: {
          specialties: { include: { specialty: true } },
          services: { include: { service: true } },
          languages: { include: { language: true } },
          hours: { orderBy: { dayOfWeek: 'asc' } },
          reviews: {
            include: { user: { select: { name: true, image: true } } },
            orderBy: { createdAt: 'desc' },
            take: 20,
          },
        },
      });
    }),

  getByCity: publicProcedure
    .input(z.object({ city: z.string(), province: z.string(), specialty: z.string().optional() }))
    .query(async ({ input, ctx }) => {
      const where: any = {
        city: { equals: input.city, mode: 'insensitive' as const },
        province: { equals: input.province, mode: 'insensitive' as const },
        isActive: true,
      };
      if (input.specialty) where.specialties = { some: { specialty: { slug: input.specialty } } };

      return ctx.prisma.clinic.findMany({
        where,
        include: {
          specialties: { include: { specialty: true } },
          hours: { orderBy: { dayOfWeek: 'asc' } },
        },
        orderBy: { rating: 'desc' },
      });
    }),
});
