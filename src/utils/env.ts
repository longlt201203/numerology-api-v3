import { config } from 'dotenv';

config();

export const Env = {
  LISTEN_PORT: parseInt(process.env.LISTEN_PORT || '3000'),

  DB_HOST: process.env.DB_HOST || 'localhost',
  DB_PORT: parseInt(process.env.DB_PORT || ''),
  DB_NAME: process.env.DB_NAME || '',
  DB_USER: process.env.DB_USER || '',
  DB_PASS: process.env.DB_PASS || '',

  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID || '',
  GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET || '',
  GOOGLE_SIGN_UP_REDIRECT_URI: process.env.GOOGLE_SIGN_UP_REDIRECT_URI || '',
  GOOGLE_LOGIN_REDIRECT_URI: process.env.GOOGLE_LOGIN_REDIRECT_URI || '',

  JWT_SECRET: process.env.JWT_SECRET || '',
  JWT_ISSUER: process.env.JWT_ISSUER || '',
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || '2d',

  ADMIN_EMAIL: process.env.ADMIN_EMAIL || '',
};

console.log(Env);
