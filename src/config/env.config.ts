import * as dotenv from 'dotenv';
import * as path from 'path';

const ENV = process.env.TEST_ENV || 'dev';
dotenv.config({ path: path.resolve(process.cwd(), `environments/.env.${ENV}`) });

export const envConfig = {
  env: ENV,
  baseUrl: process.env.BASE_URL || 'https://demo.example.com',
  apiBaseUrl: process.env.API_BASE_URL || 'https://api.demo.example.com',
  adminUsername: process.env.ADMIN_USERNAME || '',
  adminPassword: process.env.ADMIN_PASSWORD || '',
  timeout: parseInt(process.env.TIMEOUT || '30000', 10),
  retries: parseInt(process.env.RETRIES || '1', 10),
};
