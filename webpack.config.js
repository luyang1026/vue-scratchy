const path = require('path')
const pkgName = require('./package.json').name
const prod = process.env.NODE_ENV === 'production'

const HtmlWebpackPlugin = require('html-webpack-plugin')

const config = {
  mode: prod ? 'production' : 'development',
  context: path.resolve(__dirname, 'src'),
  entry: './index.ts',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: '/node_modules'
      }
    ]
  },
  output: {
    filename: prod ? `${pkgName}.min.js` : `${pkgName}.js`,
    path: path.resolve(__dirname, 'build'),
    libraryTarget: 'umd',
    library: 'Scratchy',
  },
  plugins: []
}

if (!prod) { // serve index.html in dist
  config.plugins.push(
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'dist/index.html'),
      inject: 'head'
    })
  )
  config.devtool = 'inline-source-map'
}

module.exports = config
