/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "jardelsousadev.com.br" }],
        destination: "https://www.jardelsousadev.com.br/:path*",
        permanent: true,
      },
    ]
  },
}

export default nextConfig
