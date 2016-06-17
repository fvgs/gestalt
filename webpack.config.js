/* eslint-env node */
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const path = require('path');
const breakpoints = require('./src/breakpoints');
const postcssClassPrefix = require('postcss-class-prefix');
const postcssCssNext = require('postcss-cssnext');
const postcssImport = require('postcss-import');
const postcssImportantly = require('postcss-importantly');


module.exports = {
  entry: './src/index.css',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].js',
  },
  module: {
    loaders: [
      {
        test: /\.css$/,
        include: /src/,
        loader: ExtractTextPlugin.extract(
          'style',
          'css?modules&importLoaders=1&localIdentName=[local]!postcss'
        ),
      },
    ],
  },
  postcss(webpack) {
    return [
      postcssImport({
        addDependencyTo: webpack,
      }),
      postcssCssNext({
        features: {
          customMedia: {
            extensions: breakpoints,
          },
        },
      }),
      postcssImportantly(),
      postcssClassPrefix('dp-'),
    ];
  },
  plugins: [
    new ExtractTextPlugin('[name].css', {
      allChunks: true,
    }),
  ],
};
