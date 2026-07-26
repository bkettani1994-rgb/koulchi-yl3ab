import { NextResponse } from "next/server";
import { appendReservation, isGoogleSheetsConfigured } from "@/lib/googleSheets";

type ReservationPayload = {
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

function isValidPayload(body: unknown): body is ReservationPayload {
  if (!body || typeof body !== "object") return false;
  const b = body as Record<string, unknown>;
  return (
    typeof b.fullName === "string" &&
    b.fullName.trim().length >= 3 &&
    typeof b.phone === "string" &&
    b.phone.trim().length > 0 &&
    typeof b.city === "string" &&
    b.city.trim().length > 0 &&
    typeof b.address === "string" &&
    b.address.trim().length > 0 &&
    typeof b.date === "string" &&
    b.date.trim().length > 0 &&
    typeof b.days === "number" &&
    Number.isInteger(b.days) &&
    b.days >= 1 &&
    b.days <= 30 &&
    typeof b.packName === "string" &&
    typeof b.rateLabel === "string" &&
    typeof b.pricePerDay === "number" &&
    typeof b.total === "number" &&
    typeof b.comment === "string"
  );
}

export async function POST(request: Request) {
  if (!isGoogleSheetsConfigured()) {
    return NextResponse.json(
      { error: "Google Sheets n'est pas configuré sur ce déploiement." },
      { status: 503 },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Corps de requête JSON invalide." }, { status: 400 });
  }

  if (!isValidPayload(body)) {
    return NextResponse.json({ error: "Données de réservation invalides." }, { status: 400 });
  }

  try {
    await appendReservation(body);
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Échec de l'écriture dans Google Sheets:", error);
    return NextResponse.json(
      { error: "Impossible d'enregistrer la réservation dans Google Sheets." },
      { status: 502 },
    );
  }
}
