import { google } from "googleapis";
import { NextResponse } from "next/server";
import { ceremonies } from "@/lib/events";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const {
      fullName,
      guestCount,
      additionalNames,
      attendance,
      dietary,
      otherDietary,
      songRequest,
      traveling,
      lookingForward,
      excitement,
    } = body;

    if (!process.env.GOOGLE_SERVICE_ACCOUNT_JSON || !process.env.GOOGLE_SHEET_ID) {
      console.warn("Google Sheets credentials are not configured.");
      return NextResponse.json({ success: true, simulated: true });
    }

    const serviceAccount = JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_JSON);

    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: serviceAccount.client_email,
        private_key: serviceAccount.private_key,
      },
      scopes: [
        "https://www.googleapis.com/auth/spreadsheets",
      ],
    });

    const sheets = google.sheets({ version: "v4", auth });

    // Map attendance in the order of ceremonies
    const attendanceValues = ceremonies.map(c => attendance[c.id] || "Attending");

    const row = [
      new Date().toISOString(),
      fullName,
      guestCount,
      additionalNames,
      ...attendanceValues,
      dietary,
      otherDietary,
      songRequest,
      traveling,
      lookingForward,
      excitement
    ];

    await sheets.spreadsheets.values.append({
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
      range: "Sheet1!A:Z", // Assuming the first sheet is named Sheet1
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values: [row],
      },
    });

    return NextResponse.json({ success: true });
  } catch (error: unknown) {
    console.error("RSVP Submission Error:", error);
    const errorMessage = error instanceof Error ? error.message : "Failed to submit RSVP";
    const errorDetails = error instanceof Error ? error.stack : String(error);
    console.error("Full error details:", errorDetails);
    return NextResponse.json({ error: errorMessage, details: errorDetails }, { status: 500 });
  }
}