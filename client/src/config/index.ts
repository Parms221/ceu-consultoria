type ConfigType = {
  auth_secret: string;
  auth_url: string;
  back_uri: string;
};

const config: ConfigType = {
  auth_secret: process.env.NEXTAUTH_SECRET ?? "",
  auth_url: process.env.NEXTAUTH_URL ?? "http://localhost:3000",
  back_uri: process.env.BACK_URI ?? "http://localhost:8800",
};

export default config;
