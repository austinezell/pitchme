var gulp = require('gulp');
var gutil = require('gulp-util');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var minifyCss = require('gulp-minify-css');
var rename = require('gulp-rename');
var webpack = require('webpack');

var dirs = {
  src: {
    js: "src/js/**/*.js",
    scss: "src/scss/*.scss",
    html: "src/html/**/*.html",
    lib: "src/assets/**/*"
  },
  out: {
    html: 'public/html',
    css: 'public/css',
    lib: 'public/'
  }
}

gulp.task('default', ['sass','assets', 'webpack', 'templates', 'watch']);

gulp.task('dev', ['sass','assets', 'webpack', 'templates']);

gulp.task("webpack", function(done) {
    webpack(require("./webpack.config.js"), function(err, stats) {
        if(err) throw new gutil.PluginError("webpack", err);
        gutil.log("[webpack]", stats.toString({}));
        done();
    });
});

gulp.task('sass', function(done) {
  gulp.src(dirs.src.scss)
    .pipe(sass())
    .on('error', sass.logError)
    .pipe(minifyCss())
    .pipe(gulp.dest(dirs.out.css))
    .on('end', done);
});

gulp.task('assets', function() {
  gulp.src(dirs.src.lib)
    .pipe(gulp.dest(dirs.out.lib))
});

gulp.task('templates', function(){
  return gulp.src(dirs.src.html)
    .pipe(gulp.dest(dirs.out.html))
})

gulp.task('watch', function() {
  gulp.watch(dirs.src.html, ['templates']);
  gulp.watch(dirs.src.lib, ["assets"]);
  gulp.watch('src/scss/**/*.scss', ['sass']);
  gulp.watch(dirs.src.js, ['webpack']);
});
