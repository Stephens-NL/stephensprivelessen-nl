#!/usr/bin/env ts-node

/**
 * Test script for Google Drive integration
 * Run with: npm run test:drive
 */

import { googleDriveService } from '../lib/google-drive';

async function testGoogleDriveIntegration() {
  console.log('🚀 Testing Google Drive Integration...\n');

  try {
    // Test 1: Find Notability root folder
    console.log('1. Looking for Notability root folder...');
    const notabilityRootId = await googleDriveService.getNotabilityRootFolder();
    if (notabilityRootId) {
      console.log('✅ Found Notability root folder:', notabilityRootId);
    } else {
      console.log('❌ Notability root folder not found');
      console.log('   Make sure you have a "Notability" folder in your Google Drive');
      return;
    }

    // Test 2: Find Prefales folder
    console.log('\n2. Looking for Prefales folder...');
    const prefalesFolderId = await googleDriveService.getPrefalesFolder();
    if (prefalesFolderId) {
      console.log('✅ Found Prefales folder:', prefalesFolderId);
    } else {
      console.log('❌ Prefales folder not found');
      console.log('   Make sure you have a "Prefales" folder inside the Notability folder');
      return;
    }

    // Test 3: Get course folders
    console.log('\n3. Getting course folders...');
    const courseFolders = await googleDriveService.getCourseFolders();
    console.log(`✅ Found ${courseFolders.length} course folders:`);
    
    courseFolders.forEach((folder, index) => {
      console.log(`   ${index + 1}. ${folder.name} (${folder.files.length} files)`);
    });

    // Test 4: Get files from first folder (if any)
    if (courseFolders.length > 0) {
      console.log(`\n4. Getting files from "${courseFolders[0].name}"...`);
      const files = courseFolders[0].files;
      console.log(`✅ Found ${files.length} files:`);
      
      files.slice(0, 5).forEach((file, index) => {
        console.log(`   ${index + 1}. ${file.name} (${file.mimeType})`);
      });
      
      if (files.length > 5) {
        console.log(`   ... and ${files.length - 5} more files`);
      }
    }

    // Test 5: Search functionality
    console.log('\n5. Testing search functionality...');
    const searchResults = await googleDriveService.searchFiles('lesson');
    console.log(`✅ Search for "lesson" returned ${searchResults.length} results`);

    console.log('\n🎉 All tests passed! Your Google Drive integration is working correctly.');
    console.log('\nNext steps:');
    console.log('1. Start your development server: npm run dev');
    console.log('2. Navigate to http://localhost:3000/notes');
    console.log('3. You should see your course folders and notes!');

  } catch (error) {
    console.error('\n❌ Test failed:', error);
    console.log('\nTroubleshooting:');
    console.log('1. Check your environment variables in .env.local');
    console.log('2. Verify the service account has access to your Google Drive');
    console.log('3. Make sure the Google Drive API is enabled in Google Cloud Console');
    console.log('4. Check the folder structure matches the expected format');
  }
}

// Run the test
testGoogleDriveIntegration();
