var gulp = require('gulp');
var exec = require('child_process').exec;
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var minifyhtml = require('gulp-minify-html');
var sass = require('gulp-sass');

var src = 'public/src';
var dist = 'public/dist';

var paths = {
    js: src + '/js/**/*.js',
    css: src + '/css/**/*.css',
    //scss: src + '/scss/*.scss',
    html: src + '/views/**/*.html'
};

// 웹서버를 localhost:8000 로 실행한다.
gulp.task('server', function (cb) {
    exec("node server.js", function(err, stdout, stderr){
        console.log(stdout);
        console.log(stderr);
        cb(err);
    });
});

// 자바스크립트 파일을 하나로 합치고 압축한다.
gulp.task('combine-js', function () {
    return gulp.src(paths.js)
        .pipe(concat('script.js'))
        .pipe(uglify())
        .pipe(gulp.dest(dist + '/js'));
});

// 스타일시트 파일을 하나로 합치고 압축한다.
gulp.task('combine-css', function () {
    return gulp.src(paths.css)
        .pipe(concat('style.css'))
        .pipe(minifyhtml())
        .pipe(gulp.dest(dist + '/css'));
});

// HTML 파일을 압축한다.
gulp.task('compress-html', function () {
    return gulp.src(paths.html)
        .pipe(minifyhtml())
        .pipe(gulp.dest(dist + '/views'));
});

//// sass 파일을 css 로 컴파일한다.
//gulp.task('compile-sass', function () {
//    return gulp.src(paths.scss)
//        .pipe(sass())
//        .pipe(gulp.dest(dist + '/css'));
//});


//기본 task 설정
gulp.task('default', [
    'server',
    'combine-js',
    'combine-css',
    //'compile-sass',
    'compress-html'
]);