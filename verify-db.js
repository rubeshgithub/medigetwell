const { PrismaClient } = require('@prisma/client');

// Set PGPASSWORD before creating client
process.env.DATABASE_URL = 'postgresql://postgres@localhost:5432/medidepot';

const prisma = new PrismaClient();

async function main() {
  try {
    const tables = await prisma.$queryRaw`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public' 
      ORDER BY table_name;
    `;
    console.log('Tables in medidepot database:');
    tables.forEach(t => console.log(' -', t.table_name));
  } catch (e) {
    console.error('Error:', e.message);
  } finally {
    await prisma.$disconnect();
  }
}

main();
