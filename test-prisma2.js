const { PrismaClient } = require('@prisma/client');

async function test() {
  // Use double quotes to prevent shell interpretation of $ and #
  const url = "postgresql://postgres:Think$#2026@Yyc@localhost:5432/medidepot";
  console.log('URL:', url);
  
  const prisma = new PrismaClient({
    datasources: { db: { url } },
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
    console.log('Error:', e.message?.substring(0, 300));
  } finally {
    await prisma.$disconnect();
  }
}

test();
