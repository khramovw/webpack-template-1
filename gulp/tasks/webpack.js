const gulp = require('gulp');
const webpack = require('webpack-stream');

const wconf = require('../../webpack.config');

gulp.task('webpack', function() {
  return gulp.src('src/js/plugin.js')
    .pipe(webpack( {
        config: require('../../webpack.config.js'),
        watch: true
    } ))
    .pipe(gulp.dest('dist/js/'));
});

