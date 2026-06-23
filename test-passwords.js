const { Client } = require('pg');

async function test() {
  // Try different password variations
  const passwords = [
    '***',
    '***',
    '***',
    '***',
    '***',
  ];

  for (const pw of passwords) {
    const client = new Client({
      host: 'localhost',
      port: 5432,
      database: 'postgres',
      user: 'postgres',
      password: pw,
    });

    try {
      await client.connect();
      console.log('SUCCESS with password:', pw);
      await client.end();
      return;
    } catch (e) {
      console.log('Failed with:', pw, '-', e.message?.substring(0, 80));
    } finally {
      await client.end().catch(() => {});
    }
  }
}

test();
