#!/usr/bin/env ts-node

/**
 * Test script for Aantekeningen Google Drive integration
 * Run with: npm run test:aantekeningen
 */

import { testDriveAccess, getNotabilityFolderId, findStudentFolders, listFiles } from '../lib/gdrive';

async function testAantekeningenIntegration() {
  console.log('🧪 Testing Aantekeningen Google Drive Integration...\n');

  // Check environment variables
  console.log('1. Checking environment variables...');
  const requiredEnvVars = [
    'GOOGLE_SERVICE_ACCOUNT_EMAIL',
    'GOOGLE_SERVICE_ACCOUNT_KEY'
  ];

  const missingVars = requiredEnvVars.filter(varName => !process.env[varName]);
  
  if (missingVars.length > 0) {
    console.log('❌ Missing required environment variables:');
    missingVars.forEach(varName => console.log(`   - ${varName}`));
    console.log('\nPlease set these in your .env.local file');
    return;
  }

  console.log('✅ All required environment variables are set');

  // Test Google Drive access
  console.log('\n2. Testing Google Drive access...');
  try {
    const result = await testDriveAccess();
    if (result.success) {
      console.log(`✅ ${result.message}`);
      if (result.folderCount) {
        console.log(`   Found ${result.folderCount} student folders`);
      }
    } else {
      console.log(`❌ ${result.message}`);
      return;
    }
  } catch (error) {
    console.log(`❌ Error testing Drive access: ${error instanceof Error ? error.message : 'Unknown error'}`);
    return;
  }

  // Test folder ID retrieval
  console.log('\n3. Testing Notability folder ID retrieval...');
  try {
    const folderId = await getNotabilityFolderId();
    console.log(`✅ Notability folder ID: ${folderId}`);
  } catch (error) {
    console.log(`❌ Error getting folder ID: ${error instanceof Error ? error.message : 'Unknown error'}`);
    return;
  }

  // Test student folder search
  console.log('\n4. Testing student folder search...');
  try {
    const folderId = await getNotabilityFolderId();
    const testNames = ['test', 'a', 'r']; // Common letters that might match
    
    for (const name of testNames) {
      const folders = await findStudentFolders(folderId, name);
      console.log(`   Search for "${name}": ${folders.length} matches`);
      
      if (folders.length > 0) {
        folders.slice(0, 3).forEach(folder => {
          console.log(`     - ${folder.name} (${folder.id})`);
        });
        if (folders.length > 3) {
          console.log(`     ... and ${folders.length - 3} more`);
        }
      }
    }
  } catch (error) {
    console.log(`❌ Error testing folder search: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }

  // Test file listing (if we have any folders)
  console.log('\n5. Testing file listing...');
  try {
    const folderId = await getNotabilityFolderId();
    const folders = await findStudentFolders(folderId, '');
    
    if (folders.length > 0) {
      const testFolder = folders[0];
      console.log(`   Testing with folder: ${testFolder.name}`);
      
      const files = await listFiles(testFolder.id);
      console.log(`   Found ${files.length} files:`);
      
      files.slice(0, 5).forEach(file => {
        console.log(`     - ${file.name} (${file.mimeType})`);
      });
      
      if (files.length > 5) {
        console.log(`     ... and ${files.length - 5} more files`);
      }
    } else {
      console.log('   No folders found to test file listing');
    }
  } catch (error) {
    console.log(`❌ Error testing file listing: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }

  console.log('\n🎉 Integration test completed!');
  console.log('\nNext steps:');
  console.log('1. Start your development server: npm run dev');
  console.log('2. Navigate to http://localhost:3000/aantekeningen');
  console.log('3. Test the search functionality');
  console.log('4. Deploy to production when ready');
}

// Run the test
testAantekeningenIntegration().catch(error => {
  console.error('❌ Test failed:', error);
  process.exit(1);
});
