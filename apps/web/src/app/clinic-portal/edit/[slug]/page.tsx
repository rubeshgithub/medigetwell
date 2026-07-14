import { prisma } from '@/lib/prisma';
import EditClinicPage from './EditClient';

export default async function EditPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const clinic = await prisma.clinic.findUnique({
    where: { slug },
    include: {
      reviews: true,
    },
  });
  if (!clinic) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Clinic not found</h1>
          <p className="text-gray-600">The clinic you&apos;re trying to edit doesn&apos;t exist.</p>
        </div>
      </div>
    );
  }

  return <EditClinicPage clinic={clinic} />;
}
