/**
 * Google Apps Script Web App voor Aantekeningen Dashboard
 * Veilige aanpak zonder service account keys
 * 
 * Setup:
 * 1. Ga naar script.google.com
 * 2. Maak nieuw project
 * 3. Plak deze code in Code.gs
 * 4. Maak index.html bestand
 * 5. Deploy als web app
 */

const NOTABILITY_FOLDER_NAME = 'Notability';

/**
 * Main entry point for web app
 */
function doGet(e) {
  return HtmlService.createHtmlOutputFromFile('index')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL)
    .setTitle('Aantekeningen - Stephen\'s Privelessen');
}

/**
 * Get the main Notability folder
 */
function getNotabilityFolder() {
  const folders = DriveApp.getFoldersByName(NOTABILITY_FOLDER_NAME);
  if (!folders.hasNext()) {
    throw new Error(`Folder '${NOTABILITY_FOLDER_NAME}' niet gevonden in Google Drive`);
  }
  return folders.next();
}

/**
 * Find student folders by name
 */
function findStudentFolders(searchName) {
  try {
    const notabilityFolder = getNotabilityFolder();
    const studentFolders = notabilityFolder.getFolders();
    const matches = [];
    
    while (studentFolders.hasNext()) {
      const folder = studentFolders.next();
      const folderName = folder.getName().toLowerCase();
      const searchTerm = searchName.toLowerCase();
      
      if (folderName.includes(searchTerm)) {
        matches.push({
          id: folder.getId(),
          name: folder.getName()
        });
      }
    }
    
    // Sort by relevance
    matches.sort((a, b) => {
      const aName = a.name.toLowerCase();
      const bName = b.name.toLowerCase();
      const searchTerm = searchName.toLowerCase();
      
      if (aName === searchTerm) return -1;
      if (bName === searchTerm) return 1;
      if (aName.startsWith(searchTerm)) return -1;
      if (bName.startsWith(searchTerm)) return 1;
      
      return aName.localeCompare(bName);
    });
    
    return {
      success: true,
      matches: matches
    };
    
  } catch (error) {
    return {
      success: false,
      error: error.toString()
    };
  }
}

/**
 * Get files in a student folder
 */
function getStudentFiles(folderId) {
  try {
    const folder = DriveApp.getFolderById(folderId);
    const files = folder.getFiles();
    const fileList = [];
    
    while (files.hasNext()) {
      const file = files.next();
      fileList.push({
        id: file.getId(),
        name: file.getName(),
        url: file.getUrl(),
        downloadUrl: `https://drive.google.com/uc?id=${file.getId()}&export=download`,
        lastUpdated: file.getLastUpdated(),
        size: file.getSize(),
        mimeType: file.getBlob().getContentType()
      });
    }
    
    // Sort by last updated (newest first)
    fileList.sort((a, b) => new Date(b.lastUpdated) - new Date(a.lastUpdated));
    
    return {
      success: true,
      files: fileList
    };
    
  } catch (error) {
    return {
      success: false,
      error: error.toString()
    };
  }
}

/**
 * Parse session info from filename
 */
function parseSessionInfo(filename) {
  const match = filename.match(/^(\d{4}-\d{2}-\d{2})__(.+)__v(\d+)\.(.+)$/);
  
  if (match) {
    return {
      date: match[1],
      topic: match[2].replace(/_/g, ' '),
      version: match[3],
      displayName: `${match[1]} - ${match[2].replace(/_/g, ' ')}`
    };
  }
  
  return {
    date: null,
    topic: null,
    version: null,
    displayName: filename
  };
}

/**
 * Test function
 */
function testAccess() {
  try {
    const folder = getNotabilityFolder();
    const subfolders = folder.getFolders();
    let count = 0;
    const folderNames = [];
    
    while (subfolders.hasNext()) {
      const sub = subfolders.next();
      folderNames.push(sub.getName());
      count++;
    }
    
    return {
      success: true,
      message: `Found ${count} student folders`,
      folders: folderNames.slice(0, 5) // First 5 folders
    };
  } catch (error) {
    return {
      success: false,
      error: error.toString()
    };
  }
}
