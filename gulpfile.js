var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();

gulp.task('styles', function () {
    return gulp.src('src/css/main.scss')
        .pipe(plugins.sass({ style: 'expanded' }))
        .pipe(plugins.autoprefixer('last 2 version', 'safari 5', 'ie 8', 'opera 12.1', 'ios 6', 'android 4'))
        .pipe(plugins.rename({suffix: '.min'}))
        .pipe(plugins.minifyCss())
        .pipe(gulp.dest('dist/assets/css'))
        .pipe(plugins.notify({ message: 'Styles task complete' }));
});

gulp.task('scripts', function () {
    return gulp.src('src/js/main.js')
        .pipe(plugins.jshint('.jshintrc'))
        .pipe(plugins.jshint.reporter('default'))
        .pipe(plugins.rename({suffix: '.min'}))
        .pipe(plugins.uglify())
        .pipe(gulp.dest('dist/assets/js'))
        .pipe(plugins.notify({ message: 'Scripts task complete' }));
});

gulp.task('images', function() {
    return gulp.src('src/images/**/*')
        .pipe(plugins.cache(plugins.imagemin({ optimizationLevel: 5, progressive: true, interlaced: true })))
        .pipe(gulp.dest('dist/assets/img'))
        .pipe(plugins.notify({ message: 'Images task complete' }));
});

gulp.task('clean', function() {
    return gulp.src(['dist/assets/css', 'dist/assets/js', 'dist/assets/img'], {read: false})
        .pipe(plugins.clean());
});

gulp.task('watch', function(){

    gulp.watch('src/css/**/*.scss', ['styles']);
    gulp.watch('src/js/**/*.js', ['scripts']);
    gulp.watch('src/images/**/*', ['images']);

    var server = plugins.livereload();
    gulp.watch(['dist/**']).on('change', function(file) {
        server.changed(file.path);
    });

});

gulp.task('default', ['clean'], function() {
    gulp.start('styles', 'scripts', 'images');
});
