const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const ROOT_DIRECTORY = path.join(__dirname, '..');
const SRC_DIRECTORY = path.join(ROOT_DIRECTORY, 'src');

const config = {
  entry: [path.resolve(__dirname, '../src/index.js')],
  output: {
    path: path.resolve(__dirname, '../build'),
    filename: 'bundle.js',
    publicPath: '/',
  },
  mode: 'development',
  resolve: {
    modules: [path.resolve('node_modules'), 'node_modules'],
    alias: {
      '@components': path.resolve(SRC_DIRECTORY, 'components'),
      '@images': path.resolve(SRC_DIRECTORY, 'assets/images'),
      '@icons': path.resolve(SRC_DIRECTORY, 'assets/icons'),
      '@services': path.resolve(SRC_DIRECTORY, 'services'),
      '@stores': path.resolve(SRC_DIRECTORY, 'store'),
      '@routes': path.resolve(SRC_DIRECTORY, 'routes'),
    }
  },
  performance: {
    hints: false,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(SRC_DIRECTORY, 'index.html'),
    }),
    new CopyWebpackPlugin([{ from: path.join(SRC_DIRECTORY, 'assets'), to: path.join(ROOT_DIRECTORY, 'build') }]),
  ],
  module: {
    rules: [
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader' },
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.less$/,
        use: ['style-loader', 'css-loader', 'less-loader'],
      },
      {
        test: /\.(png|svg|jpg|gif|pdf)$/,
        use: ['file-loader'],
      },
    ],
  },
};

module.exports = config;
