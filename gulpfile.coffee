{task} = require('gulp-task-helper')

for tsk in 'clean sass coffee webpack build-tasks'.split(/\s+/)
  require('./scripts/gulp-tasks/' + tsk)

task 'default', ['webpack-server']