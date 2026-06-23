const { execSync } = require('child_process');
const password = 'Think$#2026@Yyc';
const encodedPassword = encodeURIComponent(password);
const databaseUrl = `postgresql://postgres:${encodedPassword}@localhost:5432/medidepot`;

console.log('Testing connection with URL-encoded password...');
console.log('Encoded URL:', databaseUrl);

try {
  const result = execSync(
    `npx prisma db push --schema=prisma/schema.prisma --skip-generate`,
    { 
      cwd: 'C:\\Projects\\Medidepot\\packages\\db',
      env: { ...process.env, DATABASE_URL: databaseUrl },
      encoding: 'utf-8',
      timeout: 60000
    }
  );
  console.log('SUCCESS:', result);
} catch (error) {
  console.log('ERROR:', error.message);
  if (error.stdout) console.log('STDOUT:', error.stdout);
  if (error.stderr) console.log('STDERR:', error.stderr);
}
