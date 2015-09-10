var gulp = require('gulp');
var spawn = require('child_process').spawn;
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var minifyhtml = require('gulp-minify-html');
var node;

var src = 'public/src';
var dist = 'public/dist';

var paths = {
    js_required : src + '/js/required/*.js',
    js_combine: src + '/js/vendor/*.js',
    js_main : src + '/js/*.js',
    css_boot : src + "/css/bootstrap/*.css",
    css_font : src + '/css/font/*.css',
    css_main: src + '/css/*.css',
    html: src + '/views/**/*.html'
};

// 자바스크립트 파일을 하나로 합치고 압축한다.
gulp.task('combine-js', function () {
    return gulp.src([paths.js_required, paths.js_combine, paths.js_main])
        .pipe(concat('script.js'))
        .pipe(uglify())
        .pipe(gulp.dest(dist + '/js'));
});

// 스타일시트 파일을 하나로 합치고 압축한다.
gulp.task('combine-css', function () {
    return gulp.src([paths.css_boot, paths.css_font])
        .pipe(concat('required.css'))
        .pipe(minifyhtml())
        .pipe(gulp.dest(dist + '/css'));
});

// HTML 파일을 압축한다.
gulp.task('compress-html', function () {
    return gulp.src(paths.html)
        .pipe(minifyhtml())
        .pipe(gulp.dest(dist + '/views'));
});


// 웹서버를 localhost:8000 로 실행한다.
gulp.task('server', function (cb) {
    if(node) node.kill();
    node = spawn('node', ['server.js'], {studio: 'inherit'});
    node.on('close', function(code){
        if(code === 8){
            gulp.log('Error detected, waiting for changes...');
        }
    });
});

//기본 task 설정
gulp.task('default', [
    'server',
    'combine-js',
    'combine-css',
    //'compile-sass',
    'compress-html'
]);

process.on('exit', function() {
    if (node) node.kill()
})