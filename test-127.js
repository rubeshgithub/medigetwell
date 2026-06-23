const { Client } = require('pg');

async function test() {
  const client = new Client({
    host: '127.0.0.1',
    port: 5432,
    database: 'postgres',
    user: 'postgres',
    password: '***',
    ssl: false,
  });

  try {
    await client.connect();
    console.log('Connected! Version:', (await client.query('SELECT version()')).rows[0]);
  } catch (e) {
    console.log('Error:', e.message);
    console.log('Code:', e.code);
    console.log('Detail:', e.detail);
  } finally {
    await client.end().catch(() => {});
  }
}

test();
