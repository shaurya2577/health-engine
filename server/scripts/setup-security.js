const bcrypt = require('bcryptjs');
const crypto = require('crypto');

// Generate secure random strings
function generateSecureString(length = 32) {
  return crypto.randomBytes(length).toString('hex');
}

// Hash password for environment variable
async function hashPassword(password) {
  const saltRounds = 12;
  return await bcrypt.hash(password, saltRounds);
}

// Setup script to generate secure environment variables
async function setupSecurity() {
  console.log('🔐 Setting up security configuration...\n');
  
  // Generate JWT secret
  const jwtSecret = generateSecureString(64);
  console.log('Generated JWT Secret:', jwtSecret);
  
  // Generate admin password hash
  const adminPassword = process.argv[2] || 'readysethealth123';
  const adminPasswordHash = await hashPassword(adminPassword);
  console.log('Generated Admin Password Hash:', adminPasswordHash);
  
  // Generate database password
  const dbPassword = generateSecureString(16);
  console.log('Generated Database Password:', dbPassword);
  
  console.log('\n📝 Add these to your .env file:');
  console.log('=====================================');
  console.log(`JWT_SECRET=${jwtSecret}`);
  console.log(`ADMIN_PASSWORD_HASH=${adminPasswordHash}`);
  console.log(`DB_PASSWORD=${dbPassword}`);
  console.log(`NODE_ENV=production`);
  console.log(`PORT=3002`);
  console.log(`RATE_LIMIT_WINDOW_MS=900000`);
  console.log(`RATE_LIMIT_MAX_REQUESTS=100`);
  console.log(`ALLOWED_ORIGINS=http://localhost:3000,https://yourdomain.com`);
  console.log('=====================================\n');
  
  console.log('⚠️  IMPORTANT SECURITY NOTES:');
  console.log('1. Never commit .env files to version control');
  console.log('2. Use strong, unique passwords in production');
  console.log('3. Regularly rotate JWT secrets and passwords');
  console.log('4. Use HTTPS in production');
  console.log('5. Monitor your application logs for suspicious activity');
}

setupSecurity().catch(console.error);

