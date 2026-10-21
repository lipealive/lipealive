/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    /** Thumbs dos vídeos do YouTube (src/content/youtube.json). */
    remotePatterns: [{ protocol: "https", hostname: "i.ytimg.com" }],
  },
};

export default nextConfig;
