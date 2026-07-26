import "server-only";
import { GoogleSpreadsheet } from "google-spreadsheet";
import { JWT } from "google-auth-library";

const SHEET_TITLE = process.env.GOOGLE_SHEETS_SHEET_NAME || "Réservations";

// Koulchi Yl3ab brand colors, as 0-1 RGB (Google Sheets API format).
const BRAND_BLUE = { red: 0 / 255, green: 111 / 255, blue: 205 / 255 };
const WHITE = { red: 1, green: 1, blue: 1 };

const HEADER = [
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
] as const;

export type ReservationRow = {
  fullName: string;
  phone: string;
  city: string;
  address: string;
  date: string;
  days: number;
  packName: string;
  rateLabel: string;
  pricePerDay: number;
  total: number;
  comment: string;
};

function getCredentials() {
  const clientEmail = process.env.GOOGLE_SHEETS_CLIENT_EMAIL;
  const privateKey = process.env.GOOGLE_SHEETS_PRIVATE_KEY?.replace(/\\n/g, "\n");
  const spreadsheetId = process.env.GOOGLE_SHEETS_SPREADSHEET_ID;

  if (!clientEmail || !privateKey || !spreadsheetId) {
    return null;
  }
  return { clientEmail, privateKey, spreadsheetId };
}

/** True once GOOGLE_SHEETS_* env vars are set — lets the API route fail fast otherwise. */
export function isGoogleSheetsConfigured() {
  return getCredentials() !== null;
}

async function getDoc() {
  const credentials = getCredentials();
  if (!credentials) {
    throw new Error(
      "Google Sheets non configuré : GOOGLE_SHEETS_CLIENT_EMAIL, GOOGLE_SHEETS_PRIVATE_KEY et GOOGLE_SHEETS_SPREADSHEET_ID sont requis.",
    );
  }

  const auth = new JWT({
    email: credentials.clientEmail,
    key: credentials.privateKey,
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });

  const doc = new GoogleSpreadsheet(credentials.spreadsheetId, auth);
  await doc.loadInfo();
  return doc;
}

/** Ensures the sheet/tab exists with the right header, styled in Koulchi Yl3ab's brand colors. */
async function ensureSheet(doc: Awaited<ReturnType<typeof getDoc>>) {
  let sheet = doc.sheetsByTitle[SHEET_TITLE];

  if (!sheet) {
    sheet = await doc.addSheet({
      title: SHEET_TITLE,
      headerValues: [...HEADER],
    });
  } else if (sheet.headerValues.length === 0) {
    await sheet.setHeaderRow([...HEADER]);
  }

  // Style the header row once (harmless to re-apply on every write).
  await sheet.loadCells({
    startRowIndex: 0,
    endRowIndex: 1,
    startColumnIndex: 0,
    endColumnIndex: HEADER.length,
  });
  for (let col = 0; col < HEADER.length; col++) {
    const cell = sheet.getCell(0, col);
    cell.backgroundColor = BRAND_BLUE;
    cell.textFormat = { bold: true, foregroundColor: WHITE };
  }
  await sheet.saveUpdatedCells();

  return sheet;
}

export async function appendReservation(row: ReservationRow) {
  const doc = await getDoc();
  const sheet = await ensureSheet(doc);

  await sheet.addRow({
    Horodatage: new Date().toLocaleString("fr-FR", { timeZone: "Africa/Casablanca" }),
    "Nom complet": row.fullName,
    Téléphone: row.phone,
    Ville: row.city,
    Adresse: row.address,
    "Date souhaitée": row.date,
    "Nombre de jours": row.days,
    Pack: row.packName,
    Tarif: row.rateLabel,
    "Prix / jour (MAD)": row.pricePerDay,
    "Total estimé (MAD)": row.total,
    Commentaire: row.comment,
  });
}
