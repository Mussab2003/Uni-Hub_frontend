/** @type {import('next').NextConfig} */
const nextConfig = {
    async redirects() {
        return [
            {
                source: '/',  // The path you want to redirect from
                destination: '/home',  // The path you want to redirect to
                permanent: true,  // If true, it will send a 308 permanent redirect
            },
        ];
    },
};

export default nextConfig;
