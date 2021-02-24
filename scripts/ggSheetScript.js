function doGet(e) {
  const ss = SpreadsheetApp.openByUrl("https://docs.google.com/spreadsheets/d/1bqf3uKMINUocB0iMEIVuNa5nhPTcNCt-O6FsEjcqSxY/edit#gid=0");
  const cabinetsSheet = ss.getSheetByName("Cabinets");
  const cabinets = getCabinets(cabinetsSheet);
  const practitionersSheet = ss.getSheetByName("Praticiens");
  const practitioners = getPractitioners(practitionersSheet, cabinets);
  return ContentService
    .createTextOutput(JSON.stringify(practitioners))
    .setMimeType(ContentService.MimeType.JSON);
}

function getPractitioners(sheet, cabinets) {
  var practitioners = [];
  var rows = sheet.getRange(2, 1, sheet.getLastRow()-1, sheet.getLastColumn()).getValues();
  for (var i=0; i<rows.length; i++) {
    const dataRow = rows[i];
    try {
      practitioners.push({
        lastName: dataRow[0],
        firstName: dataRow[1],
        cabinets: getList(dataRow, i, 2, "cabinets").map((cabinetName) => {
          const cabinet = cabinets[cabinetName];
          if (!cabinet) {
            throw {
              error: "Cabinet inconnu",
              message: `Le cabinet "${cabinetName}" renseigné à la ligne ${i+2} n'existe pas dans la table "Cabinet"`,
            };
          }
          return cabinet;
        }),
        specialities: getList(dataRow, i, 3, "spécialités"),
        phones: getList(dataRow, i, 4, "téléphones"),
        profileURL: dataRow[6]
      });
    } catch (error) {
      return error;
    }
    
  }
  return practitioners;
}

function getCabinets(sheet) {
  const cabinets = {};
  const rows = sheet.getRange(2, 1, sheet.getLastRow()-1, sheet.getLastColumn()).getValues();
  for (let i=0; i<rows.length; i++) {
    const dataRow = rows[i];
    const name = dataRow[0];
    cabinets[name] = {
      name,
      city: dataRow[1],
      postalCode: dataRow[2],
      address: dataRow[3],
    };
  }
  return cabinets;
}

function getList(line, lineIndex, columnIndex, columnName) {
  try {
    return JSON.parse(line[columnIndex]);
  } catch (error) {
    throw {
      error: "Mauvais format",
      message: `Problème détecté à la ligne ${lineIndex+2}, colonne "${columnName}" du tableau de praticiens`,
    };
  }
}
