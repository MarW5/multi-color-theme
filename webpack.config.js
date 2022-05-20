const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  mode: 'development',
  entry: [
      './index.js',
      './src/assets/scss/base.scss',
      './src/js/modal.js'
    ],
  output: {
    path: path.resolve('./public/dist'),
    filename: 'index.bundle.js',
    publicPath: "/public/"
  },
  watchOptions: {
    ignored: ['**/node_modules'],
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [],
      },
      {
          test: /\.s[ac]ss$/i,
          use:[
              MiniCssExtractPlugin.loader,
              {
                  loader: 'css-loader',
                  options: {
                    url: true
                  }
              },
              {
                  loader: 'postcss-loader',
                  options: {
                    postcssOptions: {
                      plugins: [
                        require('autoprefixer')()
                      ]
                    },
                    sourceMap: true,
                  },
              },
              {
                  loader: "sass-loader",
                  options: {
                    sourceMap: true,
                  },
              },
        ]
      },
      {
        test: /\.(woff(2)?|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
        type: "assets/resource",
        generator: {
          filename: 'fonts/[name][ext]'
        }
      },
    ]    
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[id].css"
    }),
  ],
};