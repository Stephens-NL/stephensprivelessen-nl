function createFormTrackingSheet() {
  // Create a new spreadsheet
  const spreadsheet = SpreadsheetApp.create('Privélessen Aanmeldingen');
  const sheet = spreadsheet.getActiveSheet();
  
  // Define columns with widths
  const columns = [
    { header: 'Timestamp', width: 150 },
    { header: 'Naam', width: 200 },
    { header: 'Email', width: 250 },
    { header: 'Telefoon', width: 150 },
    { header: 'Leeftijd', width: 100 },
    { header: 'Ouder Email', width: 250 },
    { header: 'Niveau', width: 150 },
    { header: 'Vak', width: 200 },
    { header: 'Programmeertaal', width: 150 },
    { header: 'Doelen', width: 300 },
    { header: 'Locatie', width: 120 },
    { header: 'Voorkeur Planning', width: 200 },
    { header: 'Status', width: 150 },
    { header: 'Opmerkingen', width: 300 }
  ];

  // Set headers
  const headers = columns.map(col => col.header);
  const headerRange = sheet.getRange(1, 1, 1, headers.length);
  
  // Apply header formatting
  headerRange
    .setValues([headers])
    .setBackground('#1a73e8')  // Google Blue
    .setFontColor('white')
    .setFontWeight('bold')
    .setFontFamily('Google Sans')
    .setFontSize(12)
    .setHorizontalAlignment('center')
    .setVerticalAlignment('middle');
  
  // Set individual column widths
  columns.forEach((col, index) => {
    sheet.setColumnWidth(index + 1, col.width);
  });

  // Freeze header row and first two columns
  sheet.setFrozenRows(1);
  sheet.setFrozenColumns(2);

  // Add data validation for specific columns
  const validations = {
    'Niveau': ['University', 'HBO', 'VWO', 'HAVO', 'VMBO'],
    'Locatie': ['Online', 'Fysiek', 'Hybride'],
    'Status': ['Nieuw', 'Contact Opgenomen', 'Ingepland', 'Afgerond', 'Geannuleerd']
  };

  Object.entries(validations).forEach(([column, values]) => {
    const columnIndex = headers.indexOf(column) + 1;
    const range = sheet.getRange(2, columnIndex, sheet.getMaxRows() - 1);
    const rule = SpreadsheetApp.newDataValidation()
      .requireValueInList(values)
      .setAllowInvalid(false)
      .build();
    range.setDataValidation(rule);
  });

  // Add conditional formatting for Status
  const statusColors = {
    'Nieuw': {
      background: '#FFF2CC',
      fontColor: '#856404'
    },
    'Contact Opgenomen': {
      background: '#FCE5CD',
      fontColor: '#884A12'
    },
    'Ingepland': {
      background: '#D9EAD3',
      fontColor: '#155724'
    },
    'Afgerond': {
      background: '#C9DAF8',
      fontColor: '#004085'
    },
    'Geannuleerd': {
      background: '#F4CCCC',
      fontColor: '#721C24'
    }
  };

  const statusColumnIndex = headers.indexOf('Status') + 1;
  Object.entries(statusColors).forEach(([status, colors]) => {
    const range = sheet.getRange(2, 1, sheet.getMaxRows() - 1, headers.length);
    const rule = SpreadsheetApp.newConditionalFormatRule()
      .whenFormulaSatisfied(`=$${columnToLetter(statusColumnIndex)}2="${status}"`)
      .setBackground(colors.background)
      .setFontColor(colors.fontColor)
      .setRanges([range])
      .build();
    const rules = sheet.getConditionalFormatRules();
    rules.push(rule);
    sheet.setConditionalFormatRules(rules);
  });

  // Change timestamp auto-update formula to only trigger when there's data
  const timestampRange = sheet.getRange(2, 1, sheet.getMaxRows() - 1);
  timestampRange.setFormula('=IF(LEN(B2)>0,IF(LEN(A2)=0,NOW(),A2),"")');
  // This means: If there's data in column B (Name),
  // then if there's no timestamp yet, add NOW(), otherwise keep existing timestamp
  // If no data in column B, leave timestamp empty

  // Add alternating row colors
  const dataRange = sheet.getRange(2, 1, sheet.getMaxRows() - 1, headers.length);
  const zebra = SpreadsheetApp.newConditionalFormatRule()
    .whenFormulaSatisfied('=MOD(ROW(),2)=0')
    .setBackground('#f8f9fa')
    .setRanges([dataRange])
    .build();
  
  const rules = sheet.getConditionalFormatRules();
  rules.push(zebra);
  sheet.setConditionalFormatRules(rules);

  // Add filters
  headerRange.createFilter();

  // Add borders
  sheet.getRange(1, 1, sheet.getMaxRows(), headers.length)
    .setBorder(true, true, true, true, true, true, '#E0E0E0', SpreadsheetApp.BorderStyle.SOLID);

  // Log the URL
  Logger.log('Spreadsheet URL: ' + spreadsheet.getUrl());
  
  return spreadsheet.getId();
}

// Helper function to convert column number to letter
function columnToLetter(column) {
  let temp, letter = '';
  while (column > 0) {
    temp = (column - 1) % 26;
    letter = String.fromCharCode(temp + 65) + letter;
    column = (column - temp - 1) / 26;
  }
  return letter;
}

// Add a menu item to run the setup
function onOpen() {
  const ui = SpreadsheetApp.getUi();
  ui.createMenu('Setup')
    .addItem('Initialize Form Tracking', 'createFormTrackingSheet')
    .addToUi();
} 