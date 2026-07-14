import { createTRPCRouter } from './trpc';
import { clinicRouter } from './routers/clinic';
import { specialtyRouter } from './routers/specialty';
import { searchRouter } from './routers/search';

export const appRouter = createTRPCRouter({
  clinic: clinicRouter,
  specialty: specialtyRouter,
  search: searchRouter,
});

export type AppRouter = typeof appRouter;
