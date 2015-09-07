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

// �������� localhost:8000 �� �����Ѵ�.
gulp.task('server', function (cb) {
    exec("node server.js", function(err, stdout, stderr){
        console.log(stdout);
        console.log(stderr);
        cb(err);
    });
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


//�⺻ task ����
gulp.task('default', [
    'server',
    'combine-js',
    'combine-css',
    //'compile-sass',
    'compress-html'
]);