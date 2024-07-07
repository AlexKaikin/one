/** @type {import('next').NextConfig} */

export const reactStrictMode = false

export async function rewrites() {
  return [
    {
      source: '/upload/:path*',
      destination: `${process.env.NEXT_PUBLIC_CLOUD_PATH}/upload/:path*`,
    },
  ]
}

export function webpack(config) {
  config.module.rules.push({
    test: /\.svg$/i,
    issuer: /\.[jt]sx?$/,
    use: ['@svgr/webpack'],
  })
  return config
}
