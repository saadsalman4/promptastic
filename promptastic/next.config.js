// next.config.js
const nextConfig = {
    webpack(config) {
      // This is only needed if you're using webpack to process SVGs
      config.module.rules.push({
        test: /\.svg$/,
        use: ['@svgr/webpack']
      });
  
      return config;
    }
  };
  
  module.exports = nextConfig;