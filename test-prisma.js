// Test 1: URL-encoded password in DATABASE_URL
const url1 = 'postgresql://postgres:**%40Yyc@localhost:5432/medidepot';
console.log('Test URL:', url1);

const { PrismaClient } = require('@prisma/client');

async function test() {
  const prisma = new PrismaClient({
    datasources: { db: { url: url1 } },
    log: ['error'],
  });
  
  try {
    const result = await prisma.$queryRaw`SELECT 1 as test`;
    console.log('Connected! Result:', result);
    
    const tables = await prisma.$queryRaw`
      SELECT table_name FROM information_schema.tables 
      WHERE table_schema = 'public' ORDER BY table_name
    `;
    console.log('Tables:', tables.map(t => t.table_name).join(', '));
  } catch (e) {
    console.log('Error:', e.message?.substring(0, 200));
  } finally {
    await prisma.$disconnect();
  }
}

test();
