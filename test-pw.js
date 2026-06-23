const { Client } = require('pg');

async function test() {
  const client = new Client({
    host: '127.0.0.1',
    port: 5432,
    database: 'postgres',
    user: 'postgres',
    password: "Think$#2026@Yyc",
    ssl: false,
  });

  try {
    await client.connect();
    console.log('Connected!');
    const result = await client.query('SELECT version()');
    console.log('Version:', result.rows[0].version);
  } catch (e) {
    console.log('Error:', e.message);
  } finally {
    await client.end().catch(() => {});
  }
}

test();
