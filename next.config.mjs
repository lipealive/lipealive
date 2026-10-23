/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      /** Thumbs dos vídeos do YouTube. */
      { protocol: "https", hostname: "i.ytimg.com" },
      /** Posts do Instagram (URLs assinadas do CDN; o next/image otimiza e cacheia). */
      { protocol: "https", hostname: "**.cdninstagram.com" },
      { protocol: "https", hostname: "**.fbcdn.net" },
    ],
  },
};

export default nextConfig;
