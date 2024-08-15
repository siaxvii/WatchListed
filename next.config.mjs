/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      remotePatterns: [ { hostname: 'image.tmdb.org'} ], //"domains" is deprecated, uses remotePatterns instead
    },
  };
export default nextConfig;