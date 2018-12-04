'use strict'
process.env.NODE_ENV = 'production'
const ora = require('ora')
const rm = require('rimraf')
const path = require('path')
const chalk = require('chalk')
const webpack = require('webpack')
const config = require('../config').dll
const webpackConfig = require('./webpack.dll.conf')
const spinner = ora('开始构建 dll...')
spinner.start()
rm(path.resolve(__dirname, config.outputPath), err => {
  if (err) throw err
  webpack(webpackConfig, function (err, stats) {
    spinner.stop()
    if (err) throw err
    process.stdout.write(stats.toString({
      colors: true,
      modules: false,
      children: false,
      chunks: false,
      chunkModules: false
    }) + '\n\n')
    if (stats.hasErrors()) {
      console.log(chalk.red('  构建发生了错误.\n'))
      process.exit(1)
    }
    console.log(chalk.cyan('  构建完成.\n'))
    console.log(chalk.yellow(
      '  提示：当第三方库升级或变动时，请重新构建dll .\n'
    ))
  })
})
