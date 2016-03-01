{task, logTime} = require("gulp-task-helper")

webpack = require('webpack')

{makeConfig, makeWebpackDevServer} = require('../webpack-config')

onTaskDone = -> (err, stats) ->
  if err then console.log('Error', err)
  else console.log(stats.toString())
  logTime("finished 'webpack'")
  return

webpack = require("webpack")
#ClosureCompilerPlugin = require('webpack-closure-compiler')

dceEntry = {
  'dce': './src/index',
}
runWebPack = (entry, filename, options) ->
  config = makeConfig(entry, filename, options)
  webpackCompiler = webpack(config)
  webpackCompiler.run onTaskDone()

webpackDistribute = (mode) ->
  pathinfo = mode=='dev'
  plugins = [new webpack.NoErrorsPlugin()]
  runWebPack(dceEntry, '[name].js', {path:'../dist', pathinfo:pathinfo, libraryTarget:'umd', library:'dc', plugins})
  if mode=='dist'
    plugins.push new webpack.optimize.UglifyJsPlugin({minimize: true})
    runWebPack(dceEntry, '[name].min.js', {path:'../dist', pathinfo:false, libraryTarget:'umd', library:'dc', plugins})
  runWebPack('./test/mocha/index', 'mocha-index.js', {path:'../dist', pathinfo:pathinfo, plugins})
  runWebPack('./demo/index', 'demo-index.js', {path:'../dist', pathinfo:pathinfo, plugins})

task 'webpack-dist', () -> webpackDistribute('dist')
task 'webpack-dev', () -> webpackDistribute('dev')

task 'webpack-server', ->
  webServerPlugins = [
    new webpack.HotModuleReplacementPlugin()
    new webpack.NoErrorsPlugin()
  ]
  makeWebpackDevServer(["webpack/hot/dev-server", './src/index'], 'dce.js', {port:8083, inline:true, plugins:webServerPlugins})
  makeWebpackDevServer(["webpack/hot/dev-server", './test/mocha/index'], 'mocha-index.js', {port:8088, plugins:webServerPlugins})
  makeWebpackDevServer(["webpack/hot/dev-server", './demo/index'], 'demo-index.js', {port:8089, plugins:webServerPlugins})
