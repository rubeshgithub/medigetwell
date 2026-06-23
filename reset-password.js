const { Client } = require('pg');

async function main() {
  const client = new Client({
    host: '127.0.0.1',
    port: 5432,
    database: 'medidepot',
    user: 'postgres',
    password: "Think$#2026@Yyc",
    ssl: false,
  });

  try {
    await client.connect();
    console.log('Connected with raw password!');
    
    // Change to simpler password
    await client.query("ALTER USER postgres PASSWORD '***'");
    console.log('✅ Password changed!');
    
    // Verify
    const client2 = new Client({
      host: '127.0.0.1', port: 5432, database: 'medidepot',
      user: 'postgres', password: '***',
    });
    await client2.connect();
    console.log('✅ New password works!');
    await client2.end();
  } catch (e) {
    console.log('Error:', e.message);
  } finally {
    await client.end().catch(() => {});
  }
}

main();
