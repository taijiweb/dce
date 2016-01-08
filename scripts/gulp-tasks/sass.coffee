sass = require('gulp-sass')
sourcemaps = require('gulp-sourcemaps')

{task, src, dest, CombineStream} = require 'gulp-task-helper'

# use webpack instead
task 'sass', ->
  streamList = []

  for item in [
    {src:['src/styles/**/*.scss'], dest:'styles'}
  ]
    streamList.push (src(item.src)
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(sourcemaps.write())
    .pipe(dest(item.dest)))

  combineStream = new CombineStream(streamList)
  #combineStream.end -> logTime('finish sass')

  combineStream