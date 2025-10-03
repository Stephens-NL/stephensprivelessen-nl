#!/usr/bin/env node

/**
 * Quick test script to verify Google Drive setup
 * Run with: node scripts/quick-test.js
 */

const { google } = require('googleapis');
require('dotenv').config({ path: '.env.local' });

async function quickTest() {
  console.log('🧪 Quick Google Drive Setup Test\n');

  // Check environment variables
  console.log('1. Checking environment variables...');
  const requiredVars = [
    'GOOGLE_SERVICE_ACCOUNT_EMAIL',
    'GOOGLE_SERVICE_ACCOUNT_KEY'
  ];

  const missing = requiredVars.filter(varName => !process.env[varName]);
  if (missing.length > 0) {
    console.log('❌ Missing environment variables:');
    missing.forEach(varName => console.log(`   - ${varName}`));
    console.log('\nPlease add these to your .env.local file');
    return;
  }
  console.log('✅ All required environment variables found');

  // Test authentication
  console.log('\n2. Testing Google Drive authentication...');
  try {
    const auth = new google.auth.JWT(
      process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      undefined,
      process.env.GOOGLE_SERVICE_ACCOUNT_KEY.replace(/\\n/g, '\n'),
      ['https://www.googleapis.com/auth/drive.readonly']
    );

    const drive = google.drive({ version: 'v3', auth });
    
    // Test basic access
    const response = await drive.about.get({ fields: 'user' });
    console.log('✅ Successfully authenticated with Google Drive');
    console.log(`   Authenticated as: ${response.data.user.displayName}`);
  } catch (error) {
    console.log('❌ Authentication failed:', error.message);
    return;
  }

  // Test folder access
  console.log('\n3. Testing Notability folder access...');
  try {
    const auth = new google.auth.JWT(
      process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      undefined,
      process.env.GOOGLE_SERVICE_ACCOUNT_KEY.replace(/\\n/g, '\n'),
      ['https://www.googleapis.com/auth/drive.readonly']
    );

    const drive = google.drive({ version: 'v3', auth });
    
    let folderId;
    if (process.env.NOTABILITY_FOLDER_ID) {
      folderId = process.env.NOTABILITY_FOLDER_ID;
      console.log('✅ Using folder ID from environment');
    } else {
      const name = process.env.NOTABILITY_FOLDER_NAME || 'Notability';
      const q = `mimeType='application/vnd.google-apps.folder' and name='${name}' and trashed=false`;
      const res = await drive.files.list({ q, fields: 'files(id,name)' });
      
      if (res.data.files && res.data.files.length > 0) {
        folderId = res.data.files[0].id;
        console.log(`✅ Found Notability folder by name: ${res.data.files[0].name}`);
      } else {
        console.log(`❌ Notability folder '${name}' not found`);
        return;
      }
    }

    // List subfolders
    const q = `'${folderId}' in parents and mimeType='application/vnd.google-apps.folder' and trashed=false`;
    const folders = await drive.files.list({ q, fields: 'files(id,name)' });
    
    console.log(`✅ Found ${folders.data.files?.length || 0} student folders:`);
    folders.data.files?.slice(0, 5).forEach(folder => {
      console.log(`   - ${folder.name}`);
    });
    
    if (folders.data.files && folders.data.files.length > 5) {
      console.log(`   ... and ${folders.data.files.length - 5} more`);
    }

  } catch (error) {
    console.log('❌ Folder access failed:', error.message);
    console.log('   Make sure you shared the Notability folder with the service account');
    return;
  }

  console.log('\n🎉 Setup test completed successfully!');
  console.log('\nNext steps:');
  console.log('1. Start development server: npm run dev');
  console.log('2. Go to: http://localhost:3000/aantekeningen');
  console.log('3. Test the search functionality');
}

quickTest().catch(error => {
  console.error('❌ Test failed:', error.message);
  process.exit(1);
});
