runSequence = require('run-sequence')

{task} = require("gulp-task-helper")

task 'dev', (callback) -> runSequence 'clean', 'sass', 'webpack-dev', callback

task 'dist', (callback) -> runSequence 'clean', 'webpack-dist', 'sass', 'coffee', callback
