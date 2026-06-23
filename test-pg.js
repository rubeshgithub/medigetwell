// Test 2: Using connection parameters instead of URL
const { Client } = require('pg');

async function test() {
  const client = new Client({
    host: 'localhost',
    port: 5432,
    database: 'medidepot',
    user: 'postgres',
    password: '***',
  });

  try {
    await client.connect();
    console.log('Connected!');
    
    const result = await client.query(
      'SELECT table_name FROM information_schema.tables WHERE table_schema = $1 ORDER BY table_name',
      ['public']
    );
    console.log('Tables:', result.rows.map(r => r.table_name).join(', '));
  } catch (e) {
    console.log('Error:', e.message);
  } finally {
    await client.end();
  }
}

test();
