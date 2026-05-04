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

    // We only proceed if Google Sheets is configured, otherwise simulate success for testing
    if (!process.env.GOOGLE_CLIENT_EMAIL || !process.env.GOOGLE_PRIVATE_KEY || !process.env.GOOGLE_SHEET_ID) {
      console.warn("Google Sheets credentials are not fully configured. Simulating successful RSVP for testing.");
      return NextResponse.json({ success: true, simulated: true });
    }

    // Vercel sometimes stores the key with literal \n or with actual newlines — handle both
    const privateKey = process.env.GOOGLE_PRIVATE_KEY.includes("\\n")
      ? process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, "\n")
      : process.env.GOOGLE_PRIVATE_KEY;

    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_CLIENT_EMAIL,
        private_key: privateKey,
      },
      scopes: [
        "https://www.googleapis.com/auth/drive",
        "https://www.googleapis.com/auth/drive.file",
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