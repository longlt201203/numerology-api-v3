import { config } from "dotenv";

config();

export class Env {
    static readonly LISTEN_PORT = parseInt(process.env.LISTEN_PORT || "3000");
    
    static readonly DB_HOST = process.env.DB_HOST || "localhost";
    static readonly DB_PORT = parseInt(process.env.DB_PORT || "");
    static readonly DB_NAME = process.env.DB_NAME || "";
    static readonly DB_USER = process.env.DB_USER || "";
    static readonly DB_PASS = process.env.DB_PASS || "";

    static readonly GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID || "";
    static readonly GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET || "";
    static readonly GOOGLE_SIGN_UP_REDIRECT_URI = process.env.GOOGLE_SIGN_UP_REDIRECT_URI || "";
    static readonly GOOGLE_LOGIN_REDIRECT_URI = process.env.GOOGLE_LOGIN_REDIRECT_URI || "";

    static readonly JWT_SECRET = process.env.JWT_SECRET || "";
    static readonly JWT_ISSUER = process.env.JWT_ISSUER || "";
    static readonly JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "2d";

    static readonly ADMIN_EMAIL = process.env.ADMIN_EMAIL || "";
}