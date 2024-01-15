/** @type {import('next').NextConfig} */
const removeImports = require('next-remove-imports')();
const withMDX = require('@next/mdx')()


module.exports = removeImports({});

const nextConfig = {
  transpilePackages: ['@mdxeditor/editor', 'react-diff-view'],
  reactStrictMode: true,
  images: {
    domains: ['lh3.googleusercontent.com', 'avatars.githubusercontent.com'],
  },
  pageExtensions: ['js', 'jsx', 'mdx', 'ts', 'tsx'],
  webpack: (config) => {
    // this will override the experiments
    config.experiments = { ...config.experiments, topLevelAwait: true };
    // this will just update topLevelAwait property of config.experiments
    // config.experiments.topLevelAwait = true 
    return config;
  },
}

module.exports = withMDX(nextConfig)