/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        BACK_URI: process.env.BACK_URI,
    }
};

export default nextConfig;
