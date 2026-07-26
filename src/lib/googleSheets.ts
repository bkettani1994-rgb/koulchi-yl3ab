import "server-only";

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

function getConfig() {
  const webhookUrl = process.env.GOOGLE_SHEETS_WEBHOOK_URL;
  const secret = process.env.GOOGLE_SHEETS_WEBHOOK_SECRET;

  if (!webhookUrl || !secret) {
    return null;
  }
  return { webhookUrl, secret };
}

/** True once GOOGLE_SHEETS_WEBHOOK_* env vars are set — lets the API route fail fast otherwise. */
export function isGoogleSheetsConfigured() {
  return getConfig() !== null;
}

/**
 * Sends the reservation to the Google Apps Script Web App bound to the
 * target sheet (see README → "Réservations dans Google Sheets" for the
 * script + deployment steps). The script itself owns row-appending and
 * header styling — this is just the HTTP call.
 */
export async function appendReservation(row: ReservationRow) {
  const config = getConfig();
  if (!config) {
    throw new Error(
      "Google Sheets non configuré : GOOGLE_SHEETS_WEBHOOK_URL et GOOGLE_SHEETS_WEBHOOK_SECRET sont requis.",
    );
  }

  const response = await fetch(config.webhookUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ secret: config.secret, ...row }),
  });

  if (!response.ok) {
    const body = await response.text().catch(() => "");
    throw new Error(`Apps Script a répondu ${response.status}: ${body.slice(0, 300)}`);
  }

  const result = (await response.json().catch(() => null)) as { ok?: boolean } | null;
  if (!result?.ok) {
    throw new Error("Apps Script n'a pas confirmé l'écriture (réponse inattendue).");
  }
}
