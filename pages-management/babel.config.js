module.exports = {
  presets: ["next/babel"],
  plugins: [
    [
      require.resolve("babel-plugin-module-resolver"),
      {
        root: ["./src/"],
        alias: {
          "@app": "./src",
          "@common": './common',
          "@static": './static',
          "@hooks": './src/hooks',
          "@providers": './src/providers',
          "@context": './src/contexts',
        },
      },
    ],
  ],
  env: {
    test: {
      plugins: ["babel-plugin-dynamic-import-node"],
    },
  },
};
