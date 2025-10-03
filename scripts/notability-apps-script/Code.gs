/**
 * Notability Notes Dashboard - Google Apps Script
 * Super-lage drempel voor leerlingen, GDPR-proof, Drive-only
 */

const NOTABILITY_FOLDER_NAME = 'Notability'; // precies zo genoemd in Drive
const MAX_CANDIDATES = 10; // max aantal kandidaten bij zoeken

/**
 * Main entry point for web app
 */
function doGet(e) {
  return HtmlService.createHtmlOutputFromFile('index')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL)
    .setTitle('Bijlesaantekeningen - Stephen\'s Privelessen');
}

/**
 * Get the main Notability folder
 */
function _getNotabilityFolder_() {
  const it = DriveApp.getFoldersByName(NOTABILITY_FOLDER_NAME);
  if (!it.hasNext()) {
    throw new Error(`Folder '${NOTABILITY_FOLDER_NAME}' niet gevonden in je Google Drive.`);
  }
  return it.next();
}

/**
 * Find student folder by name with enhanced matching
 */
function findFolderByName(qName, birthDay = null) {
  const name = (qName || '').trim().toLowerCase();
  if (!name) {
    return { 
      status: 'error', 
      message: 'Voer je voornaam in om te beginnen.' 
    };
  }

  try {
    const parent = _getNotabilityFolder_();
    const sub = parent.getFolders();
    const candidates = [];
    
    while (sub.hasNext()) {
      const f = sub.next();
      const fname = f.getName();
      const fnameLower = fname.toLowerCase();
      
      // Check if folder name contains the search term
      if (fnameLower.includes(name)) {
        // Extract birthdate from folder name if present (format: name_YYYY-MM-DD)
        const birthdateMatch = fname.match(/_(\d{4}-\d{2}-\d{2})$/);
        const folderBirthdate = birthdateMatch ? birthdateMatch[1] : null;
        
        candidates.push({ 
          id: f.getId(), 
          name: fname,
          birthdate: folderBirthdate,
          matchScore: calculateMatchScore(name, fnameLower, birthDay, folderBirthdate)
        });
      }
    }
    
    if (candidates.length === 0) {
      return { 
        status: 'not_found', 
        message: `Geen map gevonden voor "${qName}". Controleer je spelling of vraag Stephen om hulp.` 
      };
    }
    
    // Sort by match score (best matches first)
    candidates.sort((a, b) => b.matchScore - a.matchScore);
    
    // If birthdate is provided, filter by it
    if (birthDay && birthDay.length >= 2) {
      const filtered = candidates.filter(c => 
        c.birthdate && c.birthdate.includes(birthDay)
      );
      if (filtered.length > 0) {
        candidates.splice(0, candidates.length, ...filtered);
      }
    }
    
    // Limit results
    const limitedCandidates = candidates.slice(0, MAX_CANDIDATES);
    
    if (limitedCandidates.length === 1) {
      return { 
        status: 'ok', 
        folder: limitedCandidates[0] 
      };
    }
    
    return { 
      status: 'ambiguous', 
      candidates: limitedCandidates,
      message: `Meerdere mappen gevonden voor "${qName}". Kies de juiste:`
    };
    
  } catch (error) {
    Logger.log('Error in findFolderByName: ' + error.toString());
    return { 
      status: 'error', 
      message: 'Er is een fout opgetreden. Probeer het later opnieuw.' 
    };
  }
}

/**
 * Calculate match score for folder ranking
 */
function calculateMatchScore(searchName, folderName, searchBirthday, folderBirthday) {
  let score = 0;
  
  // Exact match gets highest score
  if (folderName === searchName) {
    score += 100;
  }
  // Starts with search name
  else if (folderName.startsWith(searchName)) {
    score += 80;
  }
  // Contains search name
  else if (folderName.includes(searchName)) {
    score += 60;
  }
  
  // Birthday match bonus
  if (searchBirthday && folderBirthday && folderBirthday.includes(searchBirthday)) {
    score += 50;
  }
  
  return score;
}

/**
 * List files in a specific folder with enhanced metadata
 */
function listFilesInFolder(folderId, pdfOnly = false) {
  try {
    const folder = DriveApp.getFolderById(folderId);
    const it = folder.getFiles();
    const files = [];
    
    while (it.hasNext()) {
      const f = it.next();
      const mimeType = f.getBlob().getContentType();
      
      // Filter PDFs if requested
      if (pdfOnly && !mimeType.includes('pdf')) {
        continue;
      }
      
      // Extract session info from filename (format: YYYY-MM-DD__topic__v001.pdf)
      const sessionInfo = parseSessionInfo(f.getName());
      
      files.push({
        id: f.getId(),
        name: f.getName(),
        displayName: sessionInfo.displayName || f.getName(),
        sessionDate: sessionInfo.date,
        topic: sessionInfo.topic,
        version: sessionInfo.version,
        updated: f.getLastUpdated(),
        size: f.getSize(),
        mimeType: mimeType,
        viewUrl: `https://drive.google.com/file/d/${f.getId()}/view`,
        dlUrl: `https://drive.google.com/uc?id=${f.getId()}&export=download`
      });
    }
    
    // Sort by session date (most recent first)
    files.sort((a, b) => {
      if (a.sessionDate && b.sessionDate) {
        return new Date(b.sessionDate) - new Date(a.sessionDate);
      }
      return new Date(b.updated) - new Date(a.updated);
    });
    
    return files;
    
  } catch (error) {
    Logger.log('Error in listFilesInFolder: ' + error.toString());
    return [];
  }
}

/**
 * Parse session information from filename
 */
function parseSessionInfo(filename) {
  // Expected format: YYYY-MM-DD__topic__v001.pdf
  const match = filename.match(/^(\d{4}-\d{2}-\d{2})__(.+)__v(\d+)\.(.+)$/);
  
  if (match) {
    return {
      date: match[1],
      topic: match[2].replace(/_/g, ' '),
      version: match[3],
      displayName: `${match[1]} - ${match[2].replace(/_/g, ' ')}`
    };
  }
  
  // Fallback for other formats
  return {
    date: null,
    topic: null,
    version: null,
    displayName: filename
  };
}

/**
 * Generate QR code URL for a student folder
 */
function generateQRCode(folderId, studentName) {
  const webAppUrl = ScriptApp.getService().getUrl();
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(webAppUrl + '?name=' + encodeURIComponent(studentName))}`;
  return qrUrl;
}

/**
 * Get folder statistics
 */
function getFolderStats(folderId) {
  try {
    const files = listFilesInFolder(folderId);
    const pdfFiles = files.filter(f => f.mimeType.includes('pdf'));
    
    return {
      totalFiles: files.length,
      pdfFiles: pdfFiles.length,
      totalSize: files.reduce((sum, f) => sum + f.size, 0),
      lastUpdated: files.length > 0 ? files[0].updated : null
    };
  } catch (error) {
    return {
      totalFiles: 0,
      pdfFiles: 0,
      totalSize: 0,
      lastUpdated: null
    };
  }
}

/**
 * Test function to verify the script has access
 */
function testAccess() {
  try {
    const folder = _getNotabilityFolder_();
    Logger.log('✅ Successfully accessed Notability folder: ' + folder.getName());
    
    const subfolders = folder.getFolders();
    let count = 0;
    while (subfolders.hasNext()) {
      const sub = subfolders.next();
      Logger.log(`📁 Found subfolder: ${sub.getName()}`);
      count++;
    }
    
    Logger.log(`📊 Total subfolders found: ${count}`);
    return { success: true, message: `Found ${count} student folders` };
  } catch (error) {
    Logger.log('❌ Error: ' + error.toString());
    return { success: false, message: error.toString() };
  }
}
