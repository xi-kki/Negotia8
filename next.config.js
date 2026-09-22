/** @type {import('next').NextConfig} */
const path = require('path');

const nextConfig = {
  // Only transpile the R3F packages, NOT three.js (too large)
  transpilePackages: ['@react-three/fiber', '@react-three/drei'],
};

module.exports = nextConfig;
