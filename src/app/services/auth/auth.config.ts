interface AuthConfig {
    CLIENT_ID: string;
    CLIENT_DOMAIN: string;
    AUDIENCE: string;
    REDIRECT: string;
    SCOPE: string;
  }
  
  export const AUTH_CONFIG: AuthConfig = {
    CLIENT_ID: 'cfFx7ydJrZwofNqTwP1vvKhK1dI9cUvx',
    CLIENT_DOMAIN: 'dev-t7bsouyg.auth0.com',
    AUDIENCE: 'https://dev-t7bsouyg.auth0.com/api/v2/',
    REDIRECT: 'http://localhost:4200/login/',
    SCOPE: 'openid profile email'
  };