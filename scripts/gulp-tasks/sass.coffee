sass = require('gulp-sass')
sourcemaps = require('gulp-sourcemaps')

{task, src, dest, CombineStream} = require '../common'

# use webpack instead
task 'sass', ->
  streamList = []

  for item in [
    {src:'src/styles/app.scss', dest:'public'},
    {src:['src/styles/**/*.scss', '!src/styles/app.scss'], dest:'styles'}
    {src:['modules/dce/src/styles/**/*.scss'], dest:'node_modules/dce/styles'}
  ]
    streamList.push (src(item.src)
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(sourcemaps.write())
    .pipe(dest(item.dest)))

  combineStream = new CombineStream(streamList)
  #combineStream.end -> logTime('finish sass')

  combineStream