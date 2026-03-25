const { hash } = require('bcryptjs');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function createTestUser() {
  try {
    // First, let's check existing users
    const users = await prisma.user.findMany();
    console.log('Existing users in DB:', users);
    
    // Create a test user
    const testEmail = 'test@example.com';
    const testPassword = 'Test123456';
    
    // Delete if exists
    await prisma.user.deleteMany({ where: { email: testEmail } });
    console.log('Deleted existing test user if any');
    
    // Create new test user
    const hashedPassword = await hash(testPassword, 10);
    const newUser = await prisma.user.create({
      data: {
        email: testEmail,
        password: hashedPassword,
        name: 'Test User'
      }
    });
    
    console.log('✅ Test user created successfully!');
    console.log('Email:', testEmail);
    console.log('Password:', testPassword);
    console.log('User ID:', newUser.id);
    
  } catch (err) {
    console.error('❌ Error:', err.message);
  } finally {
    await prisma.$disconnect();
  }
}

createTestUser();
