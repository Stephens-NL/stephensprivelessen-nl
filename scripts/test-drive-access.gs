/**
 * Test script om te controleren of we toegang hebben tot Google Drive
 * Plak dit in je bestaande Google Apps Script project
 */

function testDriveAccess() {
  try {
    Logger.log('🧪 Testing Google Drive access...');
    
    // Test 1: Check if we can access Drive
    const folders = DriveApp.getFolders();
    Logger.log('✅ Successfully connected to Google Drive');
    
    // Test 2: Look for Notability folder
    const notabilityFolders = DriveApp.getFoldersByName('Notability');
    if (notabilityFolders.hasNext()) {
      const notabilityFolder = notabilityFolders.next();
      Logger.log('✅ Found Notability folder: ' + notabilityFolder.getName());
      Logger.log('📁 Folder ID: ' + notabilityFolder.getId());
      Logger.log('🔗 Folder URL: https://drive.google.com/drive/folders/' + notabilityFolder.getId());
      
      // Test 3: Count student folders
      const studentFolders = notabilityFolder.getFolders();
      let count = 0;
      const folderNames = [];
      
      while (studentFolders.hasNext()) {
        const folder = studentFolders.next();
        folderNames.push(folder.getName());
        count++;
      }
      
      Logger.log('📊 Found ' + count + ' student folders:');
      folderNames.forEach(name => Logger.log('   - ' + name));
      
      // Test 4: Check files in first folder (if any)
      if (count > 0) {
        const firstFolder = notabilityFolder.getFolders().next();
        const files = firstFolder.getFiles();
        let fileCount = 0;
        
        while (files.hasNext()) {
          const file = files.next();
          fileCount++;
          if (fileCount <= 3) { // Show first 3 files
            Logger.log('   📄 ' + file.getName() + ' (' + file.getBlob().getContentType() + ')');
          }
        }
        
        Logger.log('📄 Total files in first folder: ' + fileCount);
      }
      
    } else {
      Logger.log('❌ Notability folder not found');
      Logger.log('💡 Make sure you have a folder named "Notability" in your Google Drive');
    }
    
    Logger.log('🎉 Drive access test completed!');
    
  } catch (error) {
    Logger.log('❌ Error: ' + error.toString());
  }
}

/**
 * Quick test to find a specific student folder
 */
function testStudentSearch() {
  try {
    const searchName = 'Rachel'; // Change this to test with a different name
    Logger.log('🔍 Searching for student folders containing: ' + searchName);
    
    const notabilityFolders = DriveApp.getFoldersByName('Notability');
    if (!notabilityFolders.hasNext()) {
      Logger.log('❌ Notability folder not found');
      return;
    }
    
    const notabilityFolder = notabilityFolders.next();
    const studentFolders = notabilityFolder.getFolders();
    const matches = [];
    
    while (studentFolders.hasNext()) {
      const folder = studentFolders.next();
      const folderName = folder.getName().toLowerCase();
      
      if (folderName.includes(searchName.toLowerCase())) {
        matches.push({
          name: folder.getName(),
          id: folder.getId()
        });
      }
    }
    
    if (matches.length > 0) {
      Logger.log('✅ Found ' + matches.length + ' matching folders:');
      matches.forEach(match => {
        Logger.log('   - ' + match.name + ' (ID: ' + match.id + ')');
      });
    } else {
      Logger.log('❌ No folders found containing "' + searchName + '"');
    }
    
  } catch (error) {
    Logger.log('❌ Error: ' + error.toString());
  }
}
