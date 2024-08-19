/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        BACK_URI: process.env.BACK_URI,
        GOOGLE_AUTH_URI: process.env.GOOGLE_AUTH_URI,
        GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
        GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
        GOOGLE_SCOPES: process.env.GOOGLE_SCOPES,
        GOOGLE_REDIRECT_URI: process.env.GOOGLE_REDIRECT_URI,
    },
    output: "standalone",
};

export default nextConfig;
