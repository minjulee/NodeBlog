var gulp = require('gulp');
var webserver = require('gulp-webserver');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var minifyhtml = require('gulp-minify-html');
var sass = require('gulp-sass');
var livereload = require('gulp-livereload');

var src = 'public/src';
var dist = 'public/dist';

var paths = {
    js: src + '/js/**/*.js',
    css: src + '/css/**/*.css',
    //scss: src + '/scss/*.scss',
    html: src + '/views/**/*.html'
};

// �������� localhost:8000 �� �����Ѵ�.
gulp.task('server', function () {
    return gulp.src('/')
        .pipe(webserver());
});

// �ڹٽ�ũ��Ʈ ������ �ϳ��� ��ġ�� �����Ѵ�.
gulp.task('combine-js', function () {
    return gulp.src(paths.js)
        .pipe(concat('script.js'))
        .pipe(uglify())
        .pipe(gulp.dest(dist + '/js'));
});

// ��Ÿ�Ͻ�Ʈ ������ �ϳ��� ��ġ�� �����Ѵ�.
gulp.task('combine-css', function () {
    return gulp.src(paths.css)
        .pipe(concat('style.css'))
        .pipe(minifyhtml())
        .pipe(gulp.dest(dist + '/css'));
});

// HTML ������ �����Ѵ�.
gulp.task('compress-html', function () {
    return gulp.src(paths.html)
        .pipe(minifyhtml())
        .pipe(gulp.dest(dist + '/views'));
});

//// sass ������ css �� �������Ѵ�.
//gulp.task('compile-sass', function () {
//    return gulp.src(paths.scss)
//        .pipe(sass())
//        .pipe(gulp.dest(dist + '/css'));
//});

// ���� ���� ���� �� ������ �����
gulp.task('watch', function () {
    livereload.listen();
    gulp.watch(paths.js, ['combine-js']);
    //gulp.watch(paths.scss, ['compile-sass']);
    gulp.watch(paths.css, ['combine-css']);
    gulp.watch(paths.html, ['compress-html']);
    gulp.watch(dist + '/**').on('change', livereload.changed);
});

//�⺻ task ����
gulp.task('default', [
    'server',
    'combine-js',
    'combine-css',
    //'compile-sass',
    'compress-html',
    'watch'
]);