/** @type {import('next').NextConfig} */
const path = require('path');

const nextConfig = {
  // Explicitly set root to avoid lockfile detection issues
  turbopack: {
    root: path.resolve(__dirname),
  },
  // Only transpile the R3F packages, NOT three.js (too large)
  transpilePackages: ['@react-three/fiber', '@react-three/drei'],
};

module.exports = nextConfig;
