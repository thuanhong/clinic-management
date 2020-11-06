module.exports = {
  presets: ['next/babel'],
  plugins: [
    [
      require.resolve('babel-plugin-module-resolver'),
      {
        root: ['./src/'],
        alias: {
          '@app': './src',
          '@common': './common',
          '@static': './static',
          '@hooks': './src/hooks',
          '@hoc': './src/hoc',
          '@services': './src/services',
          '@utils': './src/utils',
        },
      },
    ],
  ],
  env: {
    test: {
      plugins: ['babel-plugin-dynamic-import-node'],
    },
  },
};
