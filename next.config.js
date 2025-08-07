// /** @type {import('next').NextConfig} */
// const nextConfig = {}

// module.exports = nextConfig
// module.exports = {
//     reactStrictMode: true,
//   };
//   module.exports = {
//     reactStrictMode: false,
//   };
//   // next.config.js
// module.exports = {
//   reactStrictMode: true,
//   images: {
//     remotePatterns: [
//       {
//         protocol: "https",
//         hostname: "tjotvczmgjbivixqpcqw.supabase.co",
//         pathname: "/storage/v1/object/public/**",
//       },
//     ],
//   },
// };
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "tjotvczmgjbivixqpcqw.supabase.co",
        pathname: "/storage/v1/object/public/**",
      },
       {
        protocol: 'https',
        hostname: 'unisol-sajjad.vercel.app',
        pathname: '/**',
      },
    ],
  },
};

module.exports = nextConfig;
