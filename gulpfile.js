var gulp = require('gulp');
var browserSync = require('browser-sync');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var wait = require('gulp-wait');
// Styles
gulp.task('styles', function () {
    return gulp.src(['./prebuild_assets/scss/main.scss'])
        .pipe(sass({ includePaths: ['./node_modules/bootstrap-sass/assets/stylesheets'] }).on('error', sass.logError))
        .pipe(concat('app.css'))
        .pipe(gulp.dest('assets/css'))
        .pipe(browserSync.stream());
});

// Scripts
gulp.task('scripts', function () {
    //Compile only our general scripts
    gulp.src([
        './prebuild_assets/js/script.js',
        './prebuild_assets/js/factories/**/*.js',
        './prebuild_assets/js/services/**/*.js',
        './prebuild_assets/js/calendarController.js'
    ])
        //.pipe(uglify())
        .pipe(concat('app.js'))
        .pipe(gulp.dest('assets/js'))
        .pipe(browserSync.stream());    
});

// Scripts
gulp.task('vendor', function () {

    //Compile vendor scripts
    gulp.src([
        './node_modules/jquery/dist/jquery.js',
        './node_modules/boostrap-sass/assets/javascripts/bootstrap.js',
        './node_modules/block-ui/jquery.blockUI.js',
        './node_modules/moment/moment.js',
        './node_modules/angular/angular.js',
        './node_moduless/angular-resource/angular-resource.js',
        './node_modules/angular-cookies/angular-cookies.js',
        './node_modules/angular-sanitize/angular-sanitize.js',
        './node_modules/angular-route/angular-route.js',
        './node_modules/angular-moment/angular-moment.js'
    ])
        .pipe(uglify())
        .pipe(concat('vendor.js'))
        .pipe(gulp.dest('assets/js'));

    return gulp;
});

// Default
gulp.task('default', ['vendor', 'serve'], function () {
});

gulp.task('serve', ['scripts', 'styles'], function() {

    browserSync.init({
        server: "./"  
    });

    gulp.watch(['./prebuild_assets/scss/**/*.scss'], ['styles']);
    gulp.watch(['./prebuild_assets/js/**/*.js'], ['scripts']);
    gulp.watch("./*.html").on('change', browserSync.reload);
});