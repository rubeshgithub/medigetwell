const { PrismaClient } = require('@prisma/client');

async function test() {
  const password = 'Think$#2026@Yyc';
  const encodedPassword = encodeURIComponent(password);
  console.log('Original password:', password);
  console.log('Encoded password:', encodedPassword);
  
  const url = `postgresql://postgres:${encodedPassword}@localhost:5432/medidepot`;
  console.log('Full URL:', url);
  
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
