/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
   appDir: true,
 },
  images: {
    domains: [
      'res.cloudinary.com', 
      'avatars.githubusercontent.com',
      'lh3.googleusercontent.com',
     
    ]
  },
    
}


 module.exports = nextConfig

// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   //  experimental : {
//   //      appDir: true,
//   //  },
//   images: {
//       domains: [
//           "avatars.githubusercontent.com",
//           'res.cloudinary.com',
//           "lh3.googleusercontent.com",
//       ],
//       // remotePatterns: [
//       //     {
//       //       protocol: "https",
//       //       hostname: "**",
//       //     },
//       //   ],
//       remotePatterns: [
//           {
//             protocol: 'https',
//             hostname: 'lh3.googleusercontent.com',
//             port: '',
//             pathname: '/**',
//           },
//         ],
//   }

// };

// export default nextConfig;
