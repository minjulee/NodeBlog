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

// �ڹٽ�ũ��Ʈ ������ �ϳ��� ��ġ�� �����Ѵ�.
gulp.task('combine-js', function () {
    return gulp.src([paths.js_required, paths.js_combine, paths.js_main])
        .pipe(concat('script.js'))
        .pipe(uglify())
        .pipe(gulp.dest(dist + '/js'));
});

// ��Ÿ�Ͻ�Ʈ ������ �ϳ��� ��ġ�� �����Ѵ�.
gulp.task('combine-css', function () {
    return gulp.src([paths.css_boot, paths.css_font])
        .pipe(concat('required.css'))
        .pipe(minifyhtml())
        .pipe(gulp.dest(dist + '/css'));
});

// HTML ������ �����Ѵ�.
gulp.task('compress-html', function () {
    return gulp.src(paths.html)
        .pipe(minifyhtml())
        .pipe(gulp.dest(dist + '/views'));
});


// �������� localhost:8000 �� �����Ѵ�.
gulp.task('server', function (cb) {
    if(node) node.kill();
    node = spawn('node', ['server.js'], {studio: 'inherit'});
    node.on('close', function(code){
        if(code === 8){
            gulp.log('Error detected, waiting for changes...');
        }
    });
});

//�⺻ task ����
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