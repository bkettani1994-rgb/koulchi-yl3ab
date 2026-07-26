/**
 * Koulchi Yl3ab — réception des réservations dans Google Sheets.
 *
 * Installation : Extensions > Apps Script (dans le Google Sheet qui doit
 * recevoir les réservations) > colle ce fichier en remplaçant le contenu par
 * défaut > suis les étapes de déploiement dans le README du projet.
 */

// Secret partagé avec le site (variable d'environnement
// GOOGLE_SHEETS_WEBHOOK_SECRET) — les deux valeurs doivent être identiques.
// Celui-ci a été généré aléatoirement ; tu peux le remplacer par un autre si
// tu préfères, du moment que tu mets la même valeur des deux côtés.
const SHARED_SECRET = "VQ1vITnkQaa4DYpyREg3aryoFzNz4dxj";

const SHEET_NAME = "Réservations";

// Couleurs Koulchi Yl3ab
const BRAND_BLUE = "#006FCD";
const BRAND_WHITE = "#FFFFFF";

const HEADERS = [
  "Horodatage",
  "Nom complet",
  "Téléphone",
  "Ville",
  "Adresse",
  "Date souhaitée",
  "Nombre de jours",
  "Pack",
  "Tarif",
  "Prix / jour (MAD)",
  "Total estimé (MAD)",
  "Commentaire",
];

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);

    if (data.secret !== SHARED_SECRET) {
      return jsonResponse({ ok: false, error: "Secret invalide" });
    }

    const sheet = getOrCreateSheet();

    sheet.appendRow([
      Utilities.formatDate(new Date(), "Africa/Casablanca", "dd/MM/yyyy HH:mm"),
      data.fullName || "",
      data.phone || "",
      data.city || "",
      data.address || "",
      data.date || "",
      data.days || "",
      data.packName || "",
      data.rateLabel || "",
      data.pricePerDay || "",
      data.total || "",
      data.comment || "",
    ]);

    return jsonResponse({ ok: true });
  } catch (error) {
    return jsonResponse({ ok: false, error: String(error) });
  }
}

function getOrCreateSheet() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(SHEET_NAME);

  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
  }

  if (sheet.getLastRow() === 0) {
    sheet.appendRow(HEADERS);
    const headerRange = sheet.getRange(1, 1, 1, HEADERS.length);
    headerRange.setBackground(BRAND_BLUE);
    headerRange.setFontColor(BRAND_WHITE);
    headerRange.setFontWeight("bold");
    sheet.setFrozenRows(1);
    sheet.autoResizeColumns(1, HEADERS.length);
  }

  return sheet;
}

function jsonResponse(payload) {
  return ContentService.createTextOutput(JSON.stringify(payload)).setMimeType(
    ContentService.MimeType.JSON,
  );
}
