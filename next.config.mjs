/** @type {import('next').NextConfig} */
const nextConfig = {
    async redirects() {
      return [
        {
          source: '/',
          destination: '/home',
          permanent: true, // Use `false` if this is a temporary redirect (302)
        },
      ];
    },
  };
  
  export default nextConfig;
  