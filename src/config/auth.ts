interface IAuth {
  apiUrl: string;
  webUrl: string;
  secret: string;
}

export default {
  apiUrl: process.env.APP_API_URL || 'http://localhost:3333',
  webUrl: process.env.APP_WEB_URL || 'http://localhost:3000',
  secret: process.env.APP_SECRET || '',
} as IAuth;
