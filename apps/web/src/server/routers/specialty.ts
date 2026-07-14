import { z } from 'zod';
import { createTRPCRouter, publicProcedure } from '../trpc';

export const specialtyRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    return ctx.prisma.specialty.findMany({
      orderBy: { name: 'asc' },
      include: { _count: { select: { clinics: true } } },
    });
  }),

  getBySlug: publicProcedure
    .input(z.object({ slug: z.string() }))
    .query(async ({ input, ctx }) => {
      return ctx.prisma.specialty.findUnique({
        where: { slug: input.slug },
        include: { _count: { select: { clinics: true } } },
      });
    }),
});
