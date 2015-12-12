var gulp = require('gulp');
var gutil = require('gulp-util');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var minifyCss = require('gulp-minify-css');
var rename = require('gulp-rename');
let webpack = require('webpack');

var dirs = {
  src: {
    js: "src/js/**/*.js",
    scss: "src/scss/**/*.scss",
    html: "src/templates/**/*.html",
    lib: "src/assets/**/*"
  },
  out: {
    html: 'public/html',
    css: 'public/css',
    lib: 'public/'
  }
}

gulp.task('default', ['sass','library','watch']);

gulp.task('dev', ['sass','library'])

gulp.task('sass', function(done) {
  gulp.src('scss')
    .pipe(sass())
    .on('error', sass.logError)
    .pipe(concat('style.css'))
    .pipe(gulp.dest(dirs.out.css))
    .pipe(minifyCss({
      keepSpecialComments: 0
    }))
    .pipe(rename({ extname: '.min.css' }))
    .pipe(gulp.dest(dirs.out.css))
    .on('end', done);
});

gulp.task('library', function() {
  gulp.src(dirs.src.lib)
    .pipe(gulp.dest(dirs.out.lib))
});

gulp.task('templates', function(){
  return gulp.src(dirs.src.html)
    .pipe(gulp.dest(dirs.out.html))
})

gulp.task('watch', function() {
  gulp.watch(dirs.src.html, ['templates']);
  gulp.watch(dirs.src.scss, ['sass']);
});
