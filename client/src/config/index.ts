type ConfigType = {
  auth_secret: string;
  auth_url: string;
  back_uri: string;

  // Google 
  google_auth_uri: string;
  google_client_id: string;
  google_scopes : string;
  google_redirect_uri: string;
};

const config: ConfigType = {
  auth_secret: process.env.NEXTAUTH_SECRET ?? "",
  auth_url: process.env.NEXTAUTH_URL ?? "http://localhost:3000",
  back_uri: process.env.BACK_URI ?? "http://localhost:8800",

  google_auth_uri: process.env.GOOGLE_AUTH_URI ?? "",
  google_client_id: process.env.GOOGLE_CLIENT_ID ?? "",
  google_scopes: process.env.GOOGLE_SCOPES ?? "",
  google_redirect_uri: process.env.GOOGLE_REDIRECT_URI ?? "",
};

export default config;
