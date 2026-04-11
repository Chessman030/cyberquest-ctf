/** @type {import('next').NextConfig} */
const nextConfig = {
  // Server Actions are now stable and enabled by default
  headers: async () => {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-Secret-Flag',
            value: 'CyberQuest{h34d3r5_c4nn0t_b3_h1dd3n}'
          }
        ]
      }
    ]
  }
}

module.exports = nextConfig