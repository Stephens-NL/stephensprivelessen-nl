/**
 * Aantekeningen Dashboard - Google Apps Script Web App
 * Veilige aanpak zonder service account keys
 */

const NOTABILITY_FOLDER_NAME = 'Notability';
const PRIVELES_FOLDER_NAME = 'Priveles';

// Cache configuration
const CACHE_DURATION_HOURS = 24; // Cache for 24 hours
const CACHE_KEY_STUDENTS = 'cached_students';
const CACHE_KEY_FILES = 'cached_files_';
const CACHE_KEY_STUDENT_COUNT = 'cached_student_count';
const CACHE_KEY_AI_ANALYSIS = 'cached_ai_analysis_';

// OpenAI configuration
const OPENAI_API_KEY = 'YOUR_OPENAI_API_KEY_HERE'; // Replace with your actual API key
const OPENAI_API_URL = 'https://api.openai.com/v1/chat/completions';

// Subject mapping for better categorization
const SUBJECT_MAPPING = {
  'wiskunde': '🧮 Wiskunde',
  'wiskunde a': '🧮 Wiskunde A',
  'wiskunde b': '🧮 Wiskunde B', 
  'wiskunde c': '🧮 Wiskunde C',
  'wiskunde d': '🧮 Wiskunde D',
  'natuurkunde': '🧪 Natuurkunde',
  'scheikunde': '🧪 Scheikunde',
  'natuur & techniek': '🧪 Natuur & Techniek',
  'informatica': '💻 Informatica',
  'programmeren': '💻 Programmeren',
  'python': '💻 Python',
  'digitale vaardigheden': '💻 Digitale Vaardigheden',
  'rekenen': '📊 Rekenen',
  'statistiek': '📊 Statistiek',
  'data-analyse': '📊 Data-analyse',
  'rekenen & toegepaste vaardigheden': '📊 Rekenen & Toegepaste Vaardigheden'
};

// Language support
const TRANSLATIONS = {
  'nl': {
    'search_placeholder': 'Typ je naam om je aantekeningen te vinden...',
    'search_button': '🔍 Zoeken',
    'loading': 'Laden...',
    'no_results': 'Geen studenten gevonden',
    'try_again': 'Probeer een andere naam of controleer de spelling.',
    'students_found': 'studenten gevonden',
    'student_found': 'student gevonden',
    'last_activity': 'Laatste activiteit',
    'files': 'Bestanden',
    'click_to_view': '👆 Klik om details te bekijken',
    'back_to_search': '← Terug naar zoeken',
    'icon_view': 'Icon View',
    'list_view': 'List View',
    'no_files': 'Geen bestanden gevonden in deze map.',
    'error_loading': 'Fout bij laden van bestanden. Probeer opnieuw.',
    'error_loading_files': 'Fout bij laden',
    'hover_to_load': 'Hover om te laden'
  },
  'en': {
    'search_placeholder': 'Type your name to find your notes...',
    'search_button': '🔍 Search',
    'loading': 'Loading...',
    'no_results': 'No students found',
    'try_again': 'Try a different name or check the spelling.',
    'students_found': 'students found',
    'student_found': 'student found',
    'last_activity': 'Last activity',
    'files': 'Files',
    'click_to_view': '👆 Click to view details',
    'back_to_search': '← Back to search',
    'icon_view': 'Icon View',
    'list_view': 'List View',
    'no_files': 'No files found in this folder.',
    'error_loading': 'Error loading files. Please try again.',
    'error_loading_files': 'Error loading',
    'hover_to_load': 'Hover to load'
  }
};

/**
 * Main entry point for web app
 */
function doGet(e) {
  return HtmlService.createHtmlOutputFromFile('index')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL)
    .setTitle('Aantekeningen - Stephen\'s Privelessen');
}

/**
 * Legacy function for form submissions (keep for existing functionality)
 */
function doPost(e) {
  try {
    // Get the active spreadsheet and sheet
    const spreadsheet = SpreadsheetApp.openById('1q9fCbWuizC4YdWrMZraPmy2A2fJW0H9N9Xx3gNG1cco');
    const sheet = spreadsheet.getActiveSheet();
    
    // Parse the incoming data
    const data = JSON.parse(e.postData.contents);
    
    // Create row data
    const row = [
      new Date(),           // Timestamp
      data.name || '',
      data.email || '',
      data.phone || '',
      data.age || '',
      data.parentEmail || '',
      data.level || '',
      data.subject || '',
      data.programmingLanguage || '',
      data.goals || '',
      data.location || '',
      data.preferredSchedule || '',
      'Nieuw',              // Initial status
      ''                    // Comments
    ];
    
    // Append the row
    sheet.appendRow(row);
    
    // Return success response
    return ContentService.createTextOutput(
      JSON.stringify({ status: 'success', message: 'Data added successfully' })
    ).setMimeType(ContentService.MimeType.JSON);
    
  } catch (error) {
    // Return error response
    return ContentService.createTextOutput(
      JSON.stringify({ status: 'error', message: error.toString() })
    ).setMimeType(ContentService.MimeType.JSON);
  }
}

// Test function to verify the script has access
function testAccess() {
  const spreadsheet = SpreadsheetApp.openById('1q9fCbWuizC4YdWrMZraPmy2A2fJW0H9N9Xx3gNG1cco');
  Logger.log('Successfully accessed spreadsheet: ' + spreadsheet.getName());
}

/**
 * Cache management functions
 */
function _getCache_(key) {
  const cache = CacheService.getScriptCache();
  const cached = cache.get(key);
  if (cached) {
    try {
      return JSON.parse(cached);
    } catch (e) {
      Logger.log('Cache parse error for key: ' + key);
      return null;
    }
  }
  return null;
}

function _setCache_(key, data, expirationSeconds = CACHE_DURATION_HOURS * 3600) {
  const cache = CacheService.getScriptCache();
  cache.put(key, JSON.stringify(data), expirationSeconds);
}

function _isCacheValid_(cacheData) {
  if (!cacheData || !cacheData.timestamp) return false;
  const now = new Date().getTime();
  const cacheAge = now - cacheData.timestamp;
  const maxAge = CACHE_DURATION_HOURS * 60 * 60 * 1000; // Convert to milliseconds
  return cacheAge < maxAge;
}

/**
 * Get the Priveles folder (where all student files are stored)
 */
function _getPrivelesFolder_() {
  const notabilityFolders = DriveApp.getFoldersByName(NOTABILITY_FOLDER_NAME);
  if (!notabilityFolders.hasNext()) {
    throw new Error('Notability folder not found');
  }
  
  const notabilityFolder = notabilityFolders.next();
  const privelesFolders = notabilityFolder.getFoldersByName(PRIVELES_FOLDER_NAME);
  
  if (!privelesFolders.hasNext()) {
    throw new Error('Priveles folder not found in Notability');
  }
  
  return privelesFolders.next();
}

/**
 * Find student folders by name (case-insensitive, partial match)
 * Searches through all subject folders (WO, Rekenen, VO) for student names
 * Uses optimized caching for better performance
 */
function findStudentFolders(needle) {
  try {
    // Try to get cached data first
    const cachedData = _getCache_(CACHE_KEY_STUDENTS);
    
    let allStudents = [];
    
    if (cachedData && _isCacheValid_(cachedData)) {
      Logger.log('Using cached student data (' + cachedData.students.length + ' students)');
      allStudents = cachedData.students;
    } else {
      Logger.log('Cache miss or expired, fetching fresh data...');
      // Fetch fresh data from Drive
      const privelesFolder = _getPrivelesFolder_();
      const subjectFolders = privelesFolder.getFolders();
      allStudents = [];
      
      // Search through each subject folder
      while (subjectFolders.hasNext()) {
        const subjectFolder = subjectFolders.next();
        const subjectName = subjectFolder.getName();
        
        // Look for student folders within this subject
        const studentFolders = subjectFolder.getFolders();
        while (studentFolders.hasNext()) {
          const studentFolder = studentFolders.next();
          allStudents.push({
            id: studentFolder.getId(),
            name: studentFolder.getName(),
            subject: subjectName,
            url: `https://drive.google.com/drive/folders/${studentFolder.getId()}`
          });
        }
      }
      
      // Cache the fresh data
      _setCache_(CACHE_KEY_STUDENTS, {
        timestamp: new Date().getTime(),
        students: allStudents
      });
      
      Logger.log('✅ Cached ' + allStudents.length + ' students');
    }
    
    // Filter students based on search term
    const searchTerm = needle.toLowerCase();
    const matches = allStudents.filter(student => {
      const studentName = student.name.toLowerCase();
      return studentName === searchTerm || studentName.includes(searchTerm);
    });
    
    Logger.log('Found ' + matches.length + ' matches for "' + needle + '"');
    return matches;
  } catch (error) {
    Logger.log('❌ Error finding student folders: ' + error.toString());
    return [];
  }
}

/**
 * List files in a student folder
 * Uses caching for better performance - only caches metadata, not file content
 */
function listFilesInFolder(folderId) {
  try {
    const cacheKey = CACHE_KEY_FILES + folderId;
    
    // Try to get cached data first
    const cachedData = _getCache_(cacheKey);
    
    if (cachedData && _isCacheValid_(cachedData)) {
      Logger.log('Using cached file metadata for folder: ' + folderId);
      return cachedData.files;
    }
    
    Logger.log('Cache miss, fetching file metadata for folder: ' + folderId);
    
    // Fetch only metadata from Drive (fast operation)
    const folder = DriveApp.getFolderById(folderId);
    const files = folder.getFiles();
    const fileList = [];
    
    while (files.hasNext()) {
      const file = files.next();
      // Only get metadata, not file content
      const fileName = file.getName();
      const cleanTitle = _cleanFileName_(fileName);
      
      // Get AI analysis (cached or basic)
      const aiAnalysis = analyzeDocumentWithAI(fileName);
      
      fileList.push({
        id: file.getId(),
        name: fileName,
        title: cleanTitle,
        url: file.getUrl(),
        downloadUrl: `https://drive.google.com/uc?export=download&id=${file.getId()}`,
        viewUrl: `https://drive.google.com/file/d/${file.getId()}/view?usp=sharing`,
        thumbnailUrl: `https://drive.google.com/thumbnail?id=${file.getId()}&sz=w400-h400`,
        modifiedTime: file.getLastUpdated(),
        size: file.getSize(),
        // AI-generated metadata
        subject: aiAnalysis.subject,
        topic: aiAnalysis.topic,
        level: aiAnalysis.level,
        keywords: aiAnalysis.keywords,
        summary: aiAnalysis.summary
      });
    }
    
    // Sort by lesson date (newest first) - extract date from filename
    const sortedFiles = fileList.sort((a, b) => {
      const dateA = extractDateFromFilename(a.name);
      const dateB = extractDateFromFilename(b.name);
      
      // If both have dates, sort by date
      if (dateA && dateB) {
        return dateB - dateA;
      }
      
      // If only one has date, prioritize it
      if (dateA && !dateB) return -1;
      if (!dateA && dateB) return 1;
      
      // If neither has date, fall back to modification time
      return new Date(b.modifiedTime) - new Date(a.modifiedTime);
    });
    
    // Cache the metadata (not file content)
    _setCache_(cacheKey, {
      timestamp: new Date().getTime(),
      files: sortedFiles
    });
    
    Logger.log('Cached metadata for ' + sortedFiles.length + ' files in folder: ' + folderId);
    
    return sortedFiles;
  } catch (error) {
    Logger.log('Error listing files: ' + error.toString());
    return [];
  }
}

/**
 * Get student overview info (file count and last activity)
 * Optimized for quick overview display - only gets basic info
 */
function getStudentOverview(folderId) {
  try {
    // Try to get from cache first
    const cacheKey = CACHE_KEY_FILES + folderId;
    const cachedData = _getCache_(cacheKey);
    
    if (cachedData && _isCacheValid_(cachedData)) {
      const files = cachedData.files;
      
      if (files.length === 0) {
        return {
          fileCount: 0,
          lastActivity: null,
          lastActivityDate: 'Geen bestanden'
        };
      }
      
      const lastFile = files[0]; // Files are sorted by date, newest first
      
      // Try to get lesson date from filename, fallback to modified time
      const lessonDate = extractDateFromFilename(lastFile.name);
      const lastActivityDate = lessonDate ? 
        lessonDate.toLocaleDateString('nl-NL', {
          year: 'numeric',
          month: 'short',
          day: 'numeric'
        }) :
        new Date(lastFile.modifiedTime).toLocaleDateString('nl-NL', {
          year: 'numeric',
          month: 'short',
          day: 'numeric'
        });
      
      return {
        fileCount: files.length,
        lastActivity: lessonDate || lastFile.modifiedTime,
        lastActivityDate: lastActivityDate
      };
    }
    
    // If not cached, get minimal info directly from Drive
    const folder = DriveApp.getFolderById(folderId);
    const files = folder.getFiles();
    let fileCount = 0;
    let lastModified = null;
    
    while (files.hasNext()) {
      const file = files.next();
      fileCount++;
      if (!lastModified || file.getLastUpdated() > lastModified) {
        lastModified = file.getLastUpdated();
      }
    }
    
    if (fileCount === 0) {
      return {
        fileCount: 0,
        lastActivity: null,
        lastActivityDate: 'Geen bestanden'
      };
    }
    
    const lastActivityDate = new Date(lastModified).toLocaleDateString('nl-NL', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
    
    return {
      fileCount: fileCount,
      lastActivity: lastModified,
      lastActivityDate: lastActivityDate
    };
  } catch (error) {
    Logger.log('Error getting student overview: ' + error.toString());
    return {
      fileCount: 0,
      lastActivity: null,
      lastActivityDate: 'Fout bij laden'
    };
  }
}

/**
 * Clear all cache data
 */
function clearCache() {
  try {
    const cache = CacheService.getScriptCache();
    // Get all cache keys and remove them individually
    const keys = [CACHE_KEY_STUDENTS];
    
    // Add all possible file cache keys (we can't enumerate them, so we'll just clear the main ones)
    keys.forEach(key => {
      cache.remove(key);
    });
    
    Logger.log('✅ Cache cleared successfully');
    return { success: true, message: 'Cache cleared' };
  } catch (error) {
    Logger.log('❌ Error clearing cache: ' + error.toString());
    return { success: false, message: error.toString() };
  }
}

/**
 * Quick cache preload - only student data
 * This function can be called manually or via trigger
 */
function preloadCache() {
  try {
    Logger.log('🔄 Starting quick cache preload...');
    
    // Clear existing cache
    clearCache();
    
    // Preload student data only
    const privelesFolder = _getPrivelesFolder_();
    const subjectFolders = privelesFolder.getFolders();
    const allStudents = [];
    
    while (subjectFolders.hasNext()) {
      const subjectFolder = subjectFolders.next();
      const subjectName = subjectFolder.getName();
      
      const studentFolders = subjectFolder.getFolders();
      while (studentFolders.hasNext()) {
        const studentFolder = studentFolders.next();
        allStudents.push({
          id: studentFolder.getId(),
          name: studentFolder.getName(),
          subject: subjectName,
          url: `https://drive.google.com/drive/folders/${studentFolder.getId()}`
        });
      }
    }
    
    // Cache student data
    _setCache_(CACHE_KEY_STUDENTS, {
      timestamp: new Date().getTime(),
      students: allStudents
    });
    
    Logger.log('✅ Cached ' + allStudents.length + ' students');
    Logger.log('📝 File metadata will be cached on-demand for better performance');
    Logger.log('🎉 Quick cache preload completed!');
    
    return { 
      success: true, 
      students: allStudents.length, 
      message: `Quick cache preloaded: ${allStudents.length} students (file metadata cached on-demand)`
    };
  } catch (error) {
    Logger.log('❌ Error preloading cache: ' + error.toString());
    return { success: false, message: error.toString() };
  }
}

/**
 * Full cache preload - students + file metadata
 * This function preloads everything but takes longer
 */
function preloadFullCache() {
  try {
    Logger.log('🔄 Starting full cache preload...');
    
    // Clear existing cache
    clearCache();
    
    // Preload student data
    const privelesFolder = _getPrivelesFolder_();
    const subjectFolders = privelesFolder.getFolders();
    const allStudents = [];
    
    while (subjectFolders.hasNext()) {
      const subjectFolder = subjectFolders.next();
      const subjectName = subjectFolder.getName();
      
      const studentFolders = subjectFolder.getFolders();
      while (studentFolders.hasNext()) {
        const studentFolder = studentFolders.next();
        allStudents.push({
          id: studentFolder.getId(),
          name: studentFolder.getName(),
          subject: subjectName,
          url: `https://drive.google.com/drive/folders/${studentFolder.getId()}`
        });
      }
    }
    
    // Cache student data
    _setCache_(CACHE_KEY_STUDENTS, {
      timestamp: new Date().getTime(),
      students: allStudents
    });
    
    Logger.log('✅ Cached ' + allStudents.length + ' students');
    
    // Preload file metadata for each student (this takes time)
    let filesCached = 0;
    for (const student of allStudents) {
      try {
        const files = listFilesInFolder(student.id);
        filesCached += files.length;
      } catch (error) {
        Logger.log('Warning: Could not cache files for ' + student.name + ': ' + error.toString());
      }
    }
    
    Logger.log('✅ Cached ' + filesCached + ' files total');
    Logger.log('🎉 Full cache preload completed!');
    
    return { 
      success: true, 
      students: allStudents.length, 
      files: filesCached,
      message: `Full cache preloaded: ${allStudents.length} students, ${filesCached} files`
    };
  } catch (error) {
    Logger.log('❌ Error preloading full cache: ' + error.toString());
    return { success: false, message: error.toString() };
  }
}

/**
 * Check cache status
 */
function checkCacheStatus() {
  try {
    const cachedData = _getCache_(CACHE_KEY_STUDENTS);
    
    if (cachedData && _isCacheValid_(cachedData)) {
      const age = new Date().getTime() - cachedData.timestamp;
      const ageHours = Math.round(age / (1000 * 60 * 60));
      
      Logger.log('✅ Cache is valid');
      Logger.log('📊 Cached students: ' + cachedData.students.length);
      Logger.log('⏰ Cache age: ' + ageHours + ' hours');
      
      return {
        success: true,
        cached: true,
        students: cachedData.students.length,
        ageHours: ageHours,
        message: `Cache valid: ${cachedData.students.length} students, ${ageHours} hours old`
      };
    } else {
      Logger.log('❌ Cache is invalid or expired');
      return {
        success: true,
        cached: false,
        message: 'Cache is invalid or expired'
      };
    }
  } catch (error) {
    Logger.log('❌ Error checking cache status: ' + error.toString());
    return { success: false, message: error.toString() };
  }
}

/**
 * Set up daily cache refresh trigger
 */
function setupDailyCacheRefresh() {
  try {
    // Delete existing triggers
    const triggers = ScriptApp.getProjectTriggers();
    triggers.forEach(trigger => {
      if (trigger.getHandlerFunction() === 'preloadCache' || trigger.getHandlerFunction() === 'smartCacheRefresh') {
        ScriptApp.deleteTrigger(trigger);
      }
    });
    
    // Create new daily trigger for smart cache refresh
    ScriptApp.newTrigger('smartCacheRefresh')
      .timeBased()
      .everyDays(1)
      .atHour(2) // 2 AM daily
      .create();
    
    Logger.log('✅ Daily smart cache refresh trigger set up (2 AM daily)');
    return { success: true, message: 'Daily smart cache refresh scheduled' };
  } catch (error) {
    Logger.log('❌ Error setting up trigger: ' + error.toString());
    return { success: false, message: error.toString() };
  }
}

/**
 * Debug function to test file loading for a specific student
 */
function debugStudentFiles(studentName) {
  try {
    // Handle undefined parameter
    if (!studentName) {
      studentName = "Isabelle"; // Default test student
      Logger.log('⚠️ No student name provided, using default: ' + studentName);
    }
    
    Logger.log('🔍 Debug: Testing file loading for student: ' + studentName);
    
    // Find student
    const students = findStudentFolders(studentName);
    if (students.length === 0) {
      Logger.log('❌ No students found with name: ' + studentName);
      return { success: false, message: 'Student not found' };
    }
    
    const student = students[0];
    Logger.log('✅ Found student: ' + student.name + ' (' + student.subject + ')');
    Logger.log('📁 Folder ID: ' + student.id);
    
    // Test file loading
    Logger.log('📄 Testing file loading...');
    const startTime = new Date().getTime();
    
    const files = listFilesInFolder(student.id);
    const endTime = new Date().getTime();
    const loadTime = endTime - startTime;
    
    Logger.log('⏱️ File loading took: ' + loadTime + 'ms');
    Logger.log('📊 Found ' + files.length + ' files');
    
    if (files.length > 0) {
      Logger.log('📋 First few files:');
      files.slice(0, 3).forEach((file, index) => {
        Logger.log('   ' + (index + 1) + '. ' + file.name + ' (modified: ' + file.modifiedTime + ')');
      });
    }
    
    // Test overview function
    Logger.log('📊 Testing overview function...');
    const overviewStartTime = new Date().getTime();
    const overview = getStudentOverview(student.id);
    const overviewEndTime = new Date().getTime();
    const overviewTime = overviewEndTime - overviewStartTime;
    
    Logger.log('⏱️ Overview loading took: ' + overviewTime + 'ms');
    Logger.log('📊 Overview result: ' + JSON.stringify(overview));
    
    return {
      success: true,
      student: student,
      files: files.length,
      loadTime: loadTime,
      overview: overview,
      overviewTime: overviewTime
    };
    
  } catch (error) {
    Logger.log('❌ Debug error: ' + error.toString());
    return { success: false, error: error.toString() };
  }
}

/**
 * Clean and format file names for better display
 */
function _cleanFileName_(fileName) {
  try {
    // Remove file extension
    let cleanName = fileName.replace(/\.(pdf|doc|docx|txt)$/i, '');
    
    // Remove common prefixes (more comprehensive)
    cleanName = cleanName.replace(/^(Privéles|Prive|Note|Les|Lesson|Lesmateriaal|Materiaal)\s*/i, '');
    
    // Remove version numbers like (2), (3), etc.
    cleanName = cleanName.replace(/\s*\(\d+\)$/, '');
    
    // Remove timestamps like 12_31_26, 14_08_23
    cleanName = cleanName.replace(/\s+\d{1,2}_\d{2}_\d{2}$/, '');
    
    // Format dates from YYYY-MM-DD to DD-MM-YYYY
    cleanName = cleanName.replace(/(\d{4})-(\d{2})-(\d{2})/, '$3-$2-$1');
    
    // Format dates from DD MMM YYYY to DD MMM YYYY (already good)
    // cleanName = cleanName.replace(/(\d{1,2})\s+(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s+(\d{4})/i, '$1 $2 $3');
    
    // Capitalize first letter of each word, but keep dates intact
    cleanName = cleanName.replace(/\b\w/g, l => l.toUpperCase());
    
    // Clean up extra spaces
    cleanName = cleanName.replace(/\s+/g, ' ').trim();
    
    // If result is too short or empty, use a more descriptive fallback
    if (cleanName.length < 3) {
      cleanName = fileName.replace(/\.(pdf|doc|docx|txt)$/i, '');
    }
    
    Logger.log('Cleaned filename: "' + fileName + '" -> "' + cleanName + '"');
    return cleanName || fileName; // Fallback to original if cleaning fails
  } catch (error) {
    Logger.log('Error cleaning filename: ' + error.toString());
    return fileName; // Fallback to original
  }
}

/**
 * Analyze document content with OpenAI to extract metadata
 */
function analyzeDocumentWithAI(fileName, fileContent = null) {
  try {
    // Check cache first (use short key to avoid "Argument too large" error)
    const cacheKey = CACHE_KEY_AI_ANALYSIS + fileName.substring(0, 50); // Limit to 50 chars
    const cachedData = _getCache_(cacheKey);
    
    if (cachedData && _isCacheValid_(cachedData)) {
      Logger.log('Using cached AI analysis for: ' + fileName);
      return cachedData.analysis;
    }
    
    // If no API key, return basic analysis
    if (OPENAI_API_KEY === 'YOUR_OPENAI_API_KEY_HERE') {
      Logger.log('No OpenAI API key configured, using basic analysis');
      return _basicAnalysis_(fileName);
    }
    
    Logger.log('Analyzing document with AI: ' + fileName);
    
    // Prepare prompt for OpenAI with bilingual support
    const prompt = `Analyze this document and extract metadata. Return a JSON object with:
    - subject: The main subject/vak from this list: Wiskunde A, Wiskunde B, Wiskunde C, Wiskunde D, Natuurkunde, Scheikunde, Informatica, Programmeren, Python, Rekenen, Statistiek, Data-analyse
    - topic: The specific topic/onderwerp (e.g., "Algebra", "Functies", "Differentiëren", "Integreren", "Mechanica", "Elektriciteit", "Organische chemie", "Python basics", "Statistiek")
    - level: Educational level (e.g., "VO", "WO", "HBO")
    - schoolYear: School year in format "YY/YY" (e.g., "24/25", "23/24", "22/23")
    - keywords: Array of 3-5 relevant keywords
    - summary: Brief 1-sentence summary
    - summaryEn: Brief 1-sentence summary in English
    - topicEn: The specific topic in English
    - keywordsEn: Array of 3-5 relevant keywords in English
    
    Document name: "${fileName}"
    ${fileContent ? `Content preview: "${fileContent.substring(0, 1000)}..."` : ''}
    
    Return only valid JSON, no other text.`;
    
    // Call OpenAI API
    const response = UrlFetchApp.fetch(OPENAI_API_URL, {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer ' + OPENAI_API_KEY,
        'Content-Type': 'application/json'
      },
      payload: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: 'You are an expert at analyzing educational documents and extracting metadata. Always return valid JSON.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        max_tokens: 300,
        temperature: 0.3
      })
    });
    
    const responseData = JSON.parse(response.getContentText());
    const analysis = JSON.parse(responseData.choices[0].message.content);
    
    // Cache the result
    _setCache_(cacheKey, {
      timestamp: new Date().getTime(),
      analysis: analysis
    });
    
    Logger.log('AI analysis completed for: ' + fileName);
    return analysis;
    
  } catch (error) {
    Logger.log('Error in AI analysis: ' + error.toString());
    return _basicAnalysis_(fileName);
  }
}

/**
 * Basic analysis when AI is not available
 */
function _basicAnalysis_(fileName) {
  const analysis = {
    subject: 'Onbekend',
    topic: 'Algemeen',
    level: 'VO',
    schoolYear: '24/25',
    keywords: ['lesmateriaal'],
    summary: 'Lesmateriaal document',
    topicEn: 'General',
    keywordsEn: ['study material'],
    summaryEn: 'Study material document'
  };
  
  // Try to extract subject from filename
  const lowerName = fileName.toLowerCase();
  if (lowerName.includes('wiskunde') || lowerName.includes('math')) {
    analysis.subject = 'Wiskunde';
    analysis.topic = 'Wiskunde';
    analysis.topicEn = 'Mathematics';
    analysis.keywords = ['wiskunde', 'rekenen', 'algebra'];
    analysis.keywordsEn = ['mathematics', 'calculations', 'algebra'];
  } else if (lowerName.includes('nederlands') || lowerName.includes('dutch')) {
    analysis.subject = 'Nederlands';
    analysis.topic = 'Taal';
    analysis.topicEn = 'Language';
    analysis.keywords = ['nederlands', 'taal', 'grammatica'];
    analysis.keywordsEn = ['dutch', 'language', 'grammar'];
  } else if (lowerName.includes('biologie') || lowerName.includes('biology')) {
    analysis.subject = 'Biologie';
    analysis.topic = 'Natuurwetenschappen';
    analysis.topicEn = 'Natural Sciences';
    analysis.keywords = ['biologie', 'natuur', 'cellen'];
    analysis.keywordsEn = ['biology', 'nature', 'cells'];
  } else if (lowerName.includes('scheikunde') || lowerName.includes('chemistry')) {
    analysis.subject = 'Scheikunde';
    analysis.topic = 'Natuurwetenschappen';
    analysis.topicEn = 'Natural Sciences';
    analysis.keywords = ['scheikunde', 'chemie', 'moleculen'];
    analysis.keywordsEn = ['chemistry', 'molecules', 'reactions'];
  } else if (lowerName.includes('fysica') || lowerName.includes('physics')) {
    analysis.subject = 'Fysica';
    analysis.topic = 'Natuurwetenschappen';
    analysis.topicEn = 'Natural Sciences';
    analysis.keywords = ['fysica', 'natuurkunde', 'mechanica'];
    analysis.keywordsEn = ['physics', 'mechanics', 'forces'];
  }
  
  // Extract school year from filename if present
  const yearMatch = fileName.match(/(\d{4})/);
  if (yearMatch) {
    const year = parseInt(yearMatch[1]);
    if (year >= 2020 && year <= 2030) {
      // Convert to school year format (e.g., 2024 -> 24/25)
      const shortYear = year.toString().slice(-2);
      const nextShortYear = (year + 1).toString().slice(-2);
      analysis.schoolYear = `${shortYear}/${nextShortYear}`;
    }
  }
  
  // Also check for explicit school year in filename (e.g., "2024-10-15__wiskunde_24-25__v001.pdf")
  const explicitYearMatch = fileName.match(/(\d{2})[_-](\d{2})/);
  if (explicitYearMatch) {
    const year1 = explicitYearMatch[1];
    const year2 = explicitYearMatch[2];
    analysis.schoolYear = `${year1}/${year2}`;
  }
  
  // Try to extract level
  if (lowerName.includes('wo') || lowerName.includes('universiteit')) {
    analysis.level = 'WO';
  } else if (lowerName.includes('hbo')) {
    analysis.level = 'HBO';
  }
  
  return analysis;
}

/**
 * Test title cleaning function
 */
function testTitleCleaning() {
  const testFiles = [
    "Privéles 1 Oct 2024.pdf",
    "Note 5 Nov 2024.pdf",
    "Privéles 3 Oct 2024 (2).pdf",
    "Lesmateriaal 10 Feb 2025 17_28_13.pdf"
  ];
  
  testFiles.forEach(fileName => {
    const cleaned = _cleanFileName_(fileName);
    Logger.log(`"${fileName}" → "${cleaned}"`);
  });
  
  return "Title cleaning test completed - check logs";
}

/**
 * Search files by metadata (subject, topic, keywords)
 */
function searchByMetadata(searchTerm) {
  try {
    Logger.log('Searching by metadata: ' + searchTerm);
    
    const privelesFolder = _getPrivelesFolder_();
    const subjectFolders = privelesFolder.getFolders();
    const allFiles = [];
    
    while (subjectFolders.hasNext()) {
      const subjectFolder = subjectFolders.next();
      const studentFolders = subjectFolder.getFolders();
      
      while (studentFolders.hasNext()) {
        const studentFolder = studentFolders.next();
        const files = studentFolder.getFiles();
        
        while (files.hasNext()) {
          const file = files.next();
          const fileName = file.getName();
          const cleanTitle = _cleanFileName_(fileName);
          const aiAnalysis = analyzeDocumentWithAI(fileName);
          
          // Check if search term matches metadata
          const searchLower = searchTerm.toLowerCase();
          const matches = 
            aiAnalysis.subject.toLowerCase().includes(searchLower) ||
            aiAnalysis.topic.toLowerCase().includes(searchLower) ||
            aiAnalysis.keywords.some(keyword => keyword.toLowerCase().includes(searchLower)) ||
            cleanTitle.toLowerCase().includes(searchLower);
          
          if (matches) {
            allFiles.push({
              id: file.getId(),
              name: fileName,
              title: cleanTitle,
              url: file.getUrl(),
              downloadUrl: `https://drive.google.com/uc?export=download&id=${file.getId()}`,
              viewUrl: `https://drive.google.com/file/d/${file.getId()}/view?usp=sharing`,
              thumbnailUrl: `https://drive.google.com/thumbnail?id=${file.getId()}&sz=w400-h400`,
              modifiedTime: file.getLastUpdated(),
              size: file.getSize(),
              subject: aiAnalysis.subject,
              topic: aiAnalysis.topic,
              level: aiAnalysis.level,
              keywords: aiAnalysis.keywords,
              summary: aiAnalysis.summary,
              studentName: studentFolder.getName(),
              subjectFolder: subjectFolder.getName()
            });
          }
        }
      }
    }
    
    // Sort by lesson date (newest first) - extract date from filename
    const sortedFiles = allFiles.sort((a, b) => {
      const dateA = extractDateFromFilename(a.name);
      const dateB = extractDateFromFilename(b.name);
      
      // If both have dates, sort by date
      if (dateA && dateB) {
        return dateB - dateA;
      }
      
      // If only one has date, prioritize it
      if (dateA && !dateB) return -1;
      if (!dateA && dateB) return 1;
      
      // If neither has date, fall back to modification time
      return new Date(b.modifiedTime) - new Date(a.modifiedTime);
    });
    
    Logger.log('Found ' + sortedFiles.length + ' files matching metadata search');
    return sortedFiles;
    
  } catch (error) {
    Logger.log('Error in metadata search: ' + error.toString());
    return [];
  }
}

/**
 * Clear only AI analysis cache
 */
function clearAICache() {
  try {
    const cache = CacheService.getScriptCache();
    const cacheKeys = [
      CACHE_KEY_AI_ANALYSIS + 'Priveles 27 Sep 2025 12_31_26.pdf'.substring(0, 50),
      CACHE_KEY_AI_ANALYSIS + 'Priveles 20 Sep 2025 12_18_27.pdf'.substring(0, 50),
      CACHE_KEY_AI_ANALYSIS + 'Priveles 13 Sep 2025 12_23_06.pdf'.substring(0, 50),
      CACHE_KEY_AI_ANALYSIS + 'Priveles 6 Sep 2025 12_37_57.pdf'.substring(0, 50),
      CACHE_KEY_AI_ANALYSIS + 'Priveles 30 Aug 2025 12_27_05.pdf'.substring(0, 50),
      CACHE_KEY_AI_ANALYSIS + 'Priveles 22 Aug 2025 14_08_23.pdf'.substring(0, 50),
      // Add more specific keys if needed
    ];
    
    cacheKeys.forEach(key => {
      cache.remove(key);
    });
    
    Logger.log('AI cache cleared');
    return { success: true, message: 'AI cache cleared' };
  } catch (error) {
    Logger.log('Error clearing AI cache: ' + error.toString());
    return { success: false, message: error.toString() };
  }
}

/**
 * Test AI functionality
 */
function testAI() {
  const testFile = "Priveles 27 Sep 2025 12_31_26.pdf";
  Logger.log('Testing AI analysis for: ' + testFile);
  
  const analysis = analyzeDocumentWithAI(testFile);
  Logger.log('AI Analysis result: ' + JSON.stringify(analysis));
  
  const cleanTitle = _cleanFileName_(testFile);
  Logger.log('Clean title: ' + cleanTitle);
  
  return {
    fileName: testFile,
    cleanTitle: cleanTitle,
    analysis: analysis,
    hasAPIKey: OPENAI_API_KEY !== 'YOUR_OPENAI_API_KEY_HERE'
  };
}

/**
 * Quick test function - no parameters needed
 */
function quickTest() {
  return debugStudentFiles("Isabelle");
}

/**
 * Force refresh all caches and AI analysis (one-time operation)
 */
function forceRefreshAll() {
  try {
    Logger.log('🔄 Force refreshing all caches and AI analysis...');
    
    // Clear all caches
    clearCache();
    clearAICache();
    
    // Force refresh student data
    const privelesFolder = _getPrivelesFolder_();
    const subjectFolders = privelesFolder.getFolders();
    let totalFiles = 0;
    
    while (subjectFolders.hasNext()) {
      const subjectFolder = subjectFolders.next();
      const studentFolders = subjectFolder.getFolders();
      
      while (studentFolders.hasNext()) {
        const studentFolder = studentFolders.next();
        const files = studentFolder.getFiles();
        
        while (files.hasNext()) {
          const file = files.next();
          const fileName = file.getName();
          
          // Force AI analysis (will create new cache entry)
          const aiAnalysis = analyzeDocumentWithAI(fileName);
          const cleanTitle = _cleanFileName_(fileName);
          
          Logger.log(`Processed: ${fileName} -> ${cleanTitle} (${aiAnalysis.subject})`);
          totalFiles++;
        }
      }
    }
    
    Logger.log(`✅ Force refresh completed! Processed ${totalFiles} files`);
    Logger.log('ℹ️ Note: This was a one-time operation. Normal cache will refresh daily at 2 AM.');
    
    return { 
      success: true, 
      message: `Force refresh completed! Processed ${totalFiles} files. Normal cache will refresh daily at 2 AM.`,
      totalFiles: totalFiles
    };
    
  } catch (error) {
    Logger.log('❌ Error in force refresh: ' + error.toString());
    return { success: false, message: error.toString() };
  }
}

/**
 * Smart cache refresh - only processes new/modified files
 */
function smartCacheRefresh() {
  try {
    Logger.log('🔄 Smart cache refresh - checking for new/modified files...');
    
    const privelesFolder = _getPrivelesFolder_();
    const subjectFolders = privelesFolder.getFolders();
    let newFiles = 0;
    let totalFiles = 0;
    
    while (subjectFolders.hasNext()) {
      const subjectFolder = subjectFolders.next();
      const studentFolders = subjectFolder.getFolders();
      
      while (studentFolders.hasNext()) {
        const studentFolder = studentFolders.next();
        const files = studentFolder.getFiles();
        
        while (files.hasNext()) {
          const file = files.next();
          const fileName = file.getName();
          totalFiles++;
          
          // Create shorter cache key to avoid "Argument too large" error
          const shortCacheKey = CACHE_KEY_AI_ANALYSIS + fileName.substring(0, 50); // Limit to 50 chars
          const cachedData = _getCache_(shortCacheKey);
          
          if (!cachedData || !_isCacheValid_(cachedData)) {
            // Only analyze if not cached or expired
            const aiAnalysis = analyzeDocumentWithAI(fileName);
            const cleanTitle = _cleanFileName_(fileName);
            
            Logger.log(`New/Modified: ${fileName} -> ${cleanTitle} (${aiAnalysis.subject})`);
            newFiles++;
          }
        }
      }
    }
    
    Logger.log(`✅ Smart refresh completed! Processed ${newFiles} new/modified files out of ${totalFiles} total`);
    
    return { 
      success: true, 
      message: `Smart refresh completed! Processed ${newFiles} new/modified files out of ${totalFiles} total`,
      newFiles: newFiles,
      totalFiles: totalFiles
    };
    
  } catch (error) {
    Logger.log('❌ Error in smart refresh: ' + error.toString());
    return { success: false, message: error.toString() };
  }
}

/**
 * Test function to verify Drive access and list all students
 */
function testDriveAccess() {
  try {
    Logger.log('🧪 Testing Google Drive access...');
    Logger.log('✅ Successfully connected to Google Drive');
    
    const privelesFolder = _getPrivelesFolder_();
    Logger.log('✅ Found Priveles folder: ' + privelesFolder.getName());
    Logger.log('📁 Folder ID: ' + privelesFolder.getId());
    Logger.log('🔗 Folder URL: https://drive.google.com/drive/folders/' + privelesFolder.getId());
    
    const subjectFolders = privelesFolder.getFolders();
    let totalStudents = 0;
    
    while (subjectFolders.hasNext()) {
      const subjectFolder = subjectFolders.next();
      const subjectName = subjectFolder.getName();
      Logger.log('📚 Subject: ' + subjectName);
      
      const studentFolders = subjectFolder.getFolders();
      let studentCount = 0;
      const studentNames = [];
      
      while (studentFolders.hasNext()) {
        const studentFolder = studentFolders.next();
        studentNames.push(studentFolder.getName());
        studentCount++;
        totalStudents++;
      }
      
      Logger.log('   👥 ' + studentCount + ' students:');
      studentNames.forEach(name => Logger.log('      - ' + name));
    }
    
    Logger.log('📊 Total students found: ' + totalStudents);
    Logger.log('🎉 Drive access test completed!');
  } catch (error) {
    Logger.log('❌ Error: ' + error.toString());
  }
}

// Extract date from filename
function extractDateFromFilename(filename) {
  try {
    // Try to extract date from filename format: YYYY-MM-DD__topic__v001.pdf
    const dateMatch = filename.match(/^(\d{4}-\d{2}-\d{2})/);
    if (dateMatch) {
      return new Date(dateMatch[1]);
    }
    
    // Fallback: try other common date formats
    const altDateMatch = filename.match(/(\d{4})[_-](\d{2})[_-](\d{2})/);
    if (altDateMatch) {
      return new Date(altDateMatch[1], altDateMatch[2] - 1, altDateMatch[3]);
    }
    
    return null;
  } catch (error) {
    Logger.log('Error extracting date from filename: ' + filename + ' - ' + error.toString());
    return null;
  }
}

// Test connection function for debugging
function testConnection() {
  Logger.log('🧪 Test connection called');
  return 'Google Apps Script connection successful!';
} 