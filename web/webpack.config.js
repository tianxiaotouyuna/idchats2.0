const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const rootDir = path.join(__dirname, '..');
const webpackEnv = process.env.NODE_ENV || 'development';
const compileNodeModules = [
  // 这个位置，要加上所有的你用到的RN的库，因为需要把这些RN的库，都通过RNW编译成Web的代码
  // 这里为了更好的提供实例，我列出了我的项目用到的RN的库
  // 你的内容和我的不一样，这一段不要照抄，要根据自己的情况自己来改,
  '@react-navigation/bottom-tabs',
  '@react-navigation/native',
  '@react-navigation/native-stack',
  'react-native-linear-gradient',
  'react-native-safe-area-context',
  'react-native-safe-area-view',
  'react-native-screens',
  'react-native-vector-icons',
].map((moduleName) => path.resolve(rootDir, `node_modules/${moduleName}`))
const babelLoaderConfiguration = {
  // 所有需要编译的文件都要在include里列出来，上面写的compileNodeModules也要加在这里面
  include: [
    path.resolve(__dirname, 'index.web.ts'),
    path.resolve(__dirname, 'root'),
    ...compileNodeModules,
  ],
};
 const svgLoaderConfiguration = {
  test: /\.svg$/,
  use: [
    {
      loader: '@svgr/webpack',
    },
  ],
}
const imageLoaderConfiguration = {
  test: /\.(bmp|gif|jpe?g|png)$/,
  use: {
    loader: 'url-loader',
    options: {
      name: '[name].[ext]',
    },
  },
}
module.exports = {
  mode: webpackEnv,
  entry: {
    app: path.join(rootDir, './index.web.ts'),
  },
  output: {
    path: path.resolve(rootDir, 'dist'),
    filename: 'app-[hash].bundle.js',
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.(tsx|ts|jsx|js|mjs)$/,
        exclude: /node_modules/,
        loader: 'ts-loader',
      },
      babelLoaderConfiguration,
      imageLoaderConfiguration,
      svgLoaderConfiguration,
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, './index.html'),
    }),
    new webpack.HotModuleReplacementPlugin(),
  ],
  resolve: {
    extensions: [
      '.web.tsx',
      '.web.ts',
      '.tsx',
      '.ts',
      '.web.jsx',
      '.web.js',
      '.jsx',
      '.js',
    ], // read files in fillowing order
    alias: Object.assign({
      'react-native$': 'react-native-web',
    }),
  },
};