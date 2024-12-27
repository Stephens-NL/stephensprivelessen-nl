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