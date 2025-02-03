import { google } from "googleapis";

export async function getGoogleSheetsData(range: string, spreadsheetId: string) {
    const auth = await google.auth.getClient({
        projectId: process.env.PROJECT_ID,
        credentials: {
            type: "authorized_user",
            private_key: process.env.CREDENTIALS_PRIVATE_KEY,
            client_secret: process.env.CREDENTIALS_CLIENT_SECRET,
            refresh_token: process.env.CREDENTIALS_REFRESH_TOKEN,
            client_email: process.env.CREDENTIALS_CLIENT_EMAIL,
            client_id: process.env.CREDENTIALS_CLIENT_ID,
            token_url: "https://oauth2.googleapis.com/token",
            universe_domain: "googleapis.com",
        },
        scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
    });

    const sheets = google.sheets({ version: "v4", auth });

    const data = await sheets.spreadsheets.values.get({
        spreadsheetId,
        range,
    });

    return data.data.values;
}
