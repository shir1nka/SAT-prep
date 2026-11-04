// Test the /api/auth/session endpoint first
async function testSession() {
  console.log('🔍 Testing /api/auth/session...');
  try {
    const response = await fetch('http://localhost:3000/api/auth/session');
    console.log('Status:', response.status);
    const data = await response.json();
    console.log('Data:', data);
  } catch (err) {
    console.error('Error:', err.message);
  }
}

// Test the providers endpoint
async function testProviders() {
  console.log('\n🔍 Testing /api/auth/providers...');
  try {
    const response = await fetch('http://localhost:3000/api/auth/providers');
    console.log('Status:', response.status);
    const data = await response.json();
    console.log('Data:', data);
  } catch (err) {
    console.error('Error:', err.message);
  }
}

async function main() {
  await testSession();
  await testProviders();
}

main();
