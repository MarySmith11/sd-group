const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

let articlesHtmlPlugin = [
  'index',
  'main',
  'news-detail',
  'news',
  'privacy',
  'requisites',
  'projects',
  'projects-empty',
  'projects-perspective',
  'salt-park',
  'sovremennik',
  'commertion',
  'contacts',
  'documents',
  'buy',
  'building',
  'about',
];
let multiplesFiles = articlesHtmlPlugin.map(function (entryName) {
  return new HtmlWebpackPlugin({
    filename: entryName + '.html',
    template: `src/pages/${entryName}.html`,
    scriptLoading: "blocking"
  })
});

module.exports = {
  entry: {
    main: './src/pages/index.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'main.js',
    publicPath: '',
  },
  mode: 'development',
  devServer: {
    open: true,
    compress: true,
    port: 8088
  },
  module: {
    rules: [{
        test: /\.js$/,
        use: 'babel-loader',
        exclude: '/node_modules/'
      },
      {
        test: /\.(png|svg|jpg|gif|woff(2)?|eot|ttf|otf)$/,
        type: 'asset/resource',
        generator: {
          filename: 'assets/[name]-[hash][ext]',
        }
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, {
            loader: 'css-loader',
            options: {
              importLoaders: 1
            }
          },
          'postcss-loader'
        ]
      },
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader, 
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1
            }
          },
          'sass-loader'
        ]
      },
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin()
  ].concat(multiplesFiles)
}
