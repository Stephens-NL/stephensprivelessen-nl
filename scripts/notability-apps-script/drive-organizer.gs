/**
 * Google Drive Organizer Script
 * Helpt bij het organiseren van je Notability bestanden
 * 
 * Gebruik: Plak dit in een nieuwe Google Apps Script en voer uit
 */

/**
 * Maak de basis Notability folder structuur
 */
function createNotabilityStructure() {
  try {
    // Zoek of maak de hoofdmap
    let notabilityFolder;
    const folders = DriveApp.getFoldersByName('Notability');
    
    if (folders.hasNext()) {
      notabilityFolder = folders.next();
      Logger.log('✅ Notability folder bestaat al');
    } else {
      notabilityFolder = DriveApp.createFolder('Notability');
      Logger.log('✅ Notability folder aangemaakt');
    }
    
    // Maak voorbeeld student mappen
    const exampleStudents = [
      'Rachel',
      'Sam',
      'Emma',
      'Lucas',
      'Sophie'
    ];
    
    exampleStudents.forEach(studentName => {
      const studentFolders = notabilityFolder.getFoldersByName(studentName);
      if (!studentFolders.hasNext()) {
        const studentFolder = notabilityFolder.createFolder(studentName);
        Logger.log(`✅ Student folder aangemaakt: ${studentName}`);
        
        // Maak een voorbeeld bestand
        const exampleContent = `Dit is een voorbeeld notitie voor ${studentName}.\n\nDatum: ${new Date().toLocaleDateString('nl-NL')}\nOnderwerp: Voorbeeld les\n\nDit bestand kan worden vervangen door je echte Notability exports.`;
        const blob = Utilities.newBlob(exampleContent, 'text/plain', `${new Date().toISOString().split('T')[0]}__Voorbeeld__v001.txt`);
        studentFolder.createFile(blob);
        Logger.log(`✅ Voorbeeld bestand aangemaakt voor ${studentName}`);
      } else {
        Logger.log(`ℹ️ Student folder bestaat al: ${studentName}`);
      }
    });
    
    Logger.log('🎉 Drive structuur setup voltooid!');
    Logger.log(`📁 Notability folder ID: ${notabilityFolder.getId()}`);
    Logger.log(`🔗 Notability folder URL: https://drive.google.com/drive/folders/${notabilityFolder.getId()}`);
    
    return {
      success: true,
      notabilityFolderId: notabilityFolder.getId(),
      message: 'Drive structuur succesvol aangemaakt'
    };
    
  } catch (error) {
    Logger.log('❌ Fout bij aanmaken structuur: ' + error.toString());
    return {
      success: false,
      error: error.toString()
    };
  }
}

/**
 * Scan bestaande bestanden en suggereer nieuwe namen
 */
function suggestFileRenames() {
  try {
    const notabilityFolder = DriveApp.getFoldersByName('Notability').next();
    const suggestions = [];
    
    // Scan alle student mappen
    const studentFolders = notabilityFolder.getFolders();
    while (studentFolders.hasNext()) {
      const studentFolder = studentFolders.next();
      const studentName = studentFolder.getName();
      
      Logger.log(`📁 Scanning folder: ${studentName}`);
      
      // Scan bestanden in deze map
      const files = studentFolder.getFiles();
      while (files.hasNext()) {
        const file = files.next();
        const currentName = file.getName();
        
        // Check of bestandsnaam al correct is
        if (!currentName.match(/^\d{4}-\d{2}-\d{2}__.+\d{3}\./)) {
          // Genereer suggestie
          const suggestedName = generateSuggestedName(currentName, file.getLastUpdated());
          suggestions.push({
            student: studentName,
            currentName: currentName,
            suggestedName: suggestedName,
            fileId: file.getId(),
            lastModified: file.getLastUpdated()
          });
        }
      }
    }
    
    // Log suggesties
    if (suggestions.length > 0) {
      Logger.log('📝 Bestandsnaam suggesties:');
      suggestions.forEach(s => {
        Logger.log(`  ${s.student}: "${s.currentName}" → "${s.suggestedName}"`);
      });
    } else {
      Logger.log('✅ Alle bestanden hebben al de juiste naam conventie');
    }
    
    return suggestions;
    
  } catch (error) {
    Logger.log('❌ Fout bij scannen: ' + error.toString());
    return [];
  }
}

/**
 * Genereer een voorgestelde bestandsnaam
 */
function generateSuggestedName(currentName, lastModified) {
  const date = lastModified.toISOString().split('T')[0]; // YYYY-MM-DD
  
  // Probeer onderwerp te extraheren uit huidige naam
  let topic = 'Les';
  if (currentName.toLowerCase().includes('calculus')) topic = 'Calculus';
  else if (currentName.toLowerCase().includes('statistics')) topic = 'Statistics';
  else if (currentName.toLowerCase().includes('physics')) topic = 'Physics';
  else if (currentName.toLowerCase().includes('math')) topic = 'Mathematics';
  else if (currentName.toLowerCase().includes('wiskunde')) topic = 'Wiskunde';
  else if (currentName.toLowerCase().includes('natuurkunde')) topic = 'Natuurkunde';
  
  // Bepaal bestandsextensie
  const extension = currentName.includes('.') ? currentName.split('.').pop() : 'pdf';
  
  return `${date}__${topic}__v001.${extension}`;
}

/**
 * Maak een overzicht van alle studenten en hun bestanden
 */
function generateStudentOverview() {
  try {
    const notabilityFolder = DriveApp.getFoldersByName('Notability').next();
    const overview = [];
    
    const studentFolders = notabilityFolder.getFolders();
    while (studentFolders.hasNext()) {
      const studentFolder = studentFolders.next();
      const studentName = studentFolder.getName();
      
      const files = studentFolder.getFiles();
      const fileList = [];
      while (files.hasNext()) {
        const file = files.next();
        fileList.push({
          name: file.getName(),
          size: file.getSize(),
          lastModified: file.getLastUpdated(),
          id: file.getId()
        });
      }
      
      // Sorteer op datum (nieuwste eerst)
      fileList.sort((a, b) => new Date(b.lastModified) - new Date(a.lastModified));
      
      overview.push({
        student: studentName,
        folderId: studentFolder.getId(),
        fileCount: fileList.length,
        totalSize: fileList.reduce((sum, f) => sum + f.size, 0),
        lastActivity: fileList.length > 0 ? fileList[0].lastModified : null,
        files: fileList
      });
    }
    
    // Log overzicht
    Logger.log('📊 Student Overzicht:');
    overview.forEach(student => {
      Logger.log(`\n👤 ${student.student}:`);
      Logger.log(`   📁 Folder ID: ${student.folderId}`);
      Logger.log(`   📄 Bestanden: ${student.fileCount}`);
      Logger.log(`   💾 Totale grootte: ${formatFileSize(student.totalSize)}`);
      Logger.log(`   📅 Laatste activiteit: ${student.lastActivity ? student.lastActivity.toLocaleDateString('nl-NL') : 'Geen'}`);
      
      if (student.files.length > 0) {
        Logger.log(`   📝 Recente bestanden:`);
        student.files.slice(0, 3).forEach(file => {
          Logger.log(`      - ${file.name} (${formatFileSize(file.size)})`);
        });
      }
    });
    
    return overview;
    
  } catch (error) {
    Logger.log('❌ Fout bij genereren overzicht: ' + error.toString());
    return [];
  }
}

/**
 * Format file size
 */
function formatFileSize(bytes) {
  if (bytes < 1024) return bytes + ' B';
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
  return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
}

/**
 * Test functie om alles te controleren
 */
function testNotabilitySetup() {
  Logger.log('🧪 Testing Notability setup...\n');
  
  // Test 1: Check Notability folder
  try {
    const folders = DriveApp.getFoldersByName('Notability');
    if (folders.hasNext()) {
      const folder = folders.next();
      Logger.log('✅ Notability folder gevonden');
      Logger.log(`   ID: ${folder.getId()}`);
      Logger.log(`   URL: https://drive.google.com/drive/folders/${folder.getId()}`);
    } else {
      Logger.log('❌ Notability folder niet gevonden');
      return;
    }
  } catch (error) {
    Logger.log('❌ Fout bij zoeken Notability folder: ' + error.toString());
    return;
  }
  
  // Test 2: Count student folders
  try {
    const notabilityFolder = DriveApp.getFoldersByName('Notability').next();
    const studentFolders = notabilityFolder.getFolders();
    let count = 0;
    const studentNames = [];
    
    while (studentFolders.hasNext()) {
      const folder = studentFolders.next();
      studentNames.push(folder.getName());
      count++;
    }
    
    Logger.log(`✅ ${count} student folders gevonden:`);
    studentNames.forEach(name => Logger.log(`   - ${name}`));
    
  } catch (error) {
    Logger.log('❌ Fout bij tellen student folders: ' + error.toString());
  }
  
  // Test 3: Count total files
  try {
    const notabilityFolder = DriveApp.getFoldersByName('Notability').next();
    const studentFolders = notabilityFolder.getFolders();
    let totalFiles = 0;
    
    while (studentFolders.hasNext()) {
      const studentFolder = studentFolders.next();
      const files = studentFolder.getFiles();
      while (files.hasNext()) {
        files.next();
        totalFiles++;
      }
    }
    
    Logger.log(`✅ ${totalFiles} bestanden totaal gevonden`);
    
  } catch (error) {
    Logger.log('❌ Fout bij tellen bestanden: ' + error.toString());
  }
  
  Logger.log('\n🎉 Test voltooid!');
}

/**
 * Maak QR codes voor alle studenten
 */
function generateStudentQRCodes() {
  try {
    const notabilityFolder = DriveApp.getFoldersByName('Notability').next();
    const qrCodes = [];
    
    // Get web app URL (je moet dit aanpassen naar jouw URL)
    const webAppUrl = 'https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec';
    
    const studentFolders = notabilityFolder.getFolders();
    while (studentFolders.hasNext()) {
      const studentFolder = studentFolders.next();
      const studentName = studentFolder.getName();
      
      const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(webAppUrl + '?name=' + encodeURIComponent(studentName))}`;
      
      qrCodes.push({
        student: studentName,
        qrUrl: qrUrl,
        directUrl: webAppUrl + '?name=' + encodeURIComponent(studentName)
      });
      
      Logger.log(`📱 QR Code voor ${studentName}:`);
      Logger.log(`   Direct link: ${qrCodes[qrCodes.length - 1].directUrl}`);
      Logger.log(`   QR Code: ${qrUrl}`);
    }
    
    return qrCodes;
    
  } catch (error) {
    Logger.log('❌ Fout bij genereren QR codes: ' + error.toString());
    return [];
  }
}
