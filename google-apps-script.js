function doPost(e) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  const data = JSON.parse(e.postData.contents);
  
  const row = [
    new Date(), // Timestamp
    data.name,
    data.email,
    data.phone,
    data.level,
    data.subject,
    data.programmingLanguage || 'N/A',
    data.goals,
    data.location,
    data.preferredSchedule,
  ];
  
  sheet.appendRow(row);
  
  return ContentService.createTextOutput(JSON.stringify({ status: 'success' }))
    .setMimeType(ContentService.MimeType.JSON);
} 