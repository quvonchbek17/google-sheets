import { OAuth2Client } from "google-auth-library";
import { google } from "googleapis";
import dotenv from "dotenv";
dotenv.config();

const oAuth2Client = new OAuth2Client(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    process.env.GOOGLE_CALLBACK_URL
);

const docsBuilder = async (access_token: string) => {
    oAuth2Client.setCredentials({
        access_token: access_token,
    });
    return google.docs({ version: "v1", auth: oAuth2Client });
};

export { docsBuilder };
