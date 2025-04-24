import type { NextConfig } from 'next'
import withRspack from 'next-rspack'

const nextConfig: NextConfig = {
  reactStrictMode: false,
}

export default withRspack(nextConfig)
