const { compare } = require('bcryptjs');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function testCredentialsAuth() {
  try {
    const email = 'test@example.com';
    const password = 'Test123456';
    
    console.log('🔍 Testing credentials auth...');
    console.log('Email:', email);
    console.log('Password:', password);
    console.log('');
    
    // Find user
    const user = await prisma.user.findUnique({ where: { email } });
    console.log('User found:', user ? '✅ Yes' : '❌ No');
    
    if (!user) {
      console.log('❌ User does not exist in database');
      return;
    }
    
    console.log('User ID:', user.id);
    console.log('User email:', user.email);
    console.log('User has password:', user.password ? '✅ Yes' : '❌ No');
    
    if (!user.password) {
      console.log('❌ User has no password hash');
      return;
    }
    
    // Check password
    const passwordMatches = await compare(password, user.password);
    console.log('');
    console.log('Password comparison:');
    console.log('  Provided password:', password);
    console.log('  Stored hash:', user.password.substring(0, 20) + '...');
    console.log('  Matches:', passwordMatches ? '✅ YES' : '❌ NO');
    
    if (passwordMatches) {
      console.log('');
      console.log('✅ AUTH WOULD SUCCEED');
    } else {
      console.log('');
      console.log('❌ AUTH WOULD FAIL - Password mismatch');
    }
    
  } catch (err) {
    console.error('❌ Error:', err.message);
  } finally {
    await prisma.$disconnect();
  }
}

testCredentialsAuth();
