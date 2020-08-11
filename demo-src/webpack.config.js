const VueLoaderPlugin = require('vue-loader/lib/plugin')
const StyleLintPlugin = require('stylelint-webpack-plugin')

module.exports = {
  context: __dirname,

  entry: './index.js',

  output: {
    publicPath: '/',
    filename: 'index.js'
  },

  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.(mjs|js|vue)$/,
        loader: 'eslint-loader',
        exclude: /node_modules/
      },

      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },

      {
        test: /\.css$/,

        oneOf: [
          // this matches `<style module>`
          {
            resourceQuery: /module/,

            use: [
              'style-loader',
              {
                loader: 'css-loader',

                options: {
                  modules: true,
                  localIdentName: '[local]_[hash:base64:5]'
                }
              }
            ]
          },

          // this matches plain `<style>` or `<style scoped>`
          {
            use: [
              'style-loader',
              'css-loader'
            ]
          }
        ]
      },

      {
        test: /\.(png|jpg|jpeg|gif|eot|ttf|woff|woff2|svg|svgz|mp3)$/,

        use: {
          loader: 'file-loader',

          options: {
            esModule: false
          }
        }
      }
    ]
  },

  plugins: [
    new VueLoaderPlugin(),

    new StyleLintPlugin({
      files: ['../src/**/*.{vue,html,css}', '**/*.{vue,html,css}']
    })
  ],

  resolve: {
    extensions: ['.mjs', '.js', '.json', '.vue']
  },

  devServer: {
    host: '0.0.0.0',
    disableHostCheck: true,
    overlay: true,
    contentBase: __dirname
  },

  performance: {
    hints: false
  },

  devtool: '#eval-source-map'
}
