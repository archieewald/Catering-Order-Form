const gulp = require("gulp");
const sass = require("gulp-sass");
const plumber = require("gulp-plumber");
const autoprefixer = require('gulp-autoprefixer');
const sourcemaps = require('gulp-sourcemaps');
const browserSync = require('browser-sync').create();
const gutil = require('gulp-util');

function showErrors (err) {
    console.log(gutil.colors.red(err.toString()));
    this.emit("end");
}

gulp.task("browseSync", function() {
    browserSync.init({
        server: ".",
        notify: true,
        host: "192.168.0.24", //IPv4 Address Wirless LAN adapter WiFi from ipconfig
        //port: 3000,
        open: true //czy otwierac strone
    });
});

gulp.task('sass', function () {
    return gulp.src('./scss/main.scss')
        .pipe(plumber({
            errorHandler : showErrors
        }))
        .pipe(sourcemaps.init())
        .pipe(sass({
            outputStyle: "compressed"
        })) //nested, expanded, compact, compressed
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(sourcemaps.write("."))
        .pipe(gulp.dest('./css'))
        .pipe(browserSync.stream());
});

gulp.task('watch', function () {
    gulp.watch('./scss/**/*.scss', ['sass']);
    gulp.watch("*.html").on('change', browserSync.reload);
});

gulp.task("default", function () {
    console.log("----------- start pracy ------------");
    gulp.start(["sass", "browseSync", "watch"]);
})