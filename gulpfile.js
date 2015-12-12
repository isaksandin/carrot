var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var plumber = require('gulp-plumber');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var clean = require('gulp-clean');

var del = require('del');
var browserSync = require('browser-sync');
var runSequence = require('run-sequence');

//var source = require('vinyl-source-stream');
//var browserify = require('browserify');
//var factor = require('factor-bundle');
//var es = require('event-stream');

var gutil = require("gulp-util");
var webpack = require('webpack');



gulp.task('sass', function(){
    return gulp.src('./src/scss/**/*.scss')
        .pipe(plumber({
            errorHandler: function (err) {
                console.log(err);
                this.emit('end');
            }
        }))
        .pipe(sass())
        .pipe(autoprefixer({
            browsers: ['> 5%'],
            cascade: false
        }))
        .pipe(gulp.dest('./src/css/'))
        .pipe(browserSync.reload({
            stream: true
        }));
});

//gulp.task('build', function() {
//  
//    return browserify({
//        entries: ['./src/js/main.js', './src/js/main-pref.js', './src/js/controller.js']
//    })
//    .plugin(factor, {
//        o: ['./src/js/bundle.js', './src/js/pref-bundle.js', './src/js/controller-bundle.js']
//    })
//    .bundle()
//    .pipe(source('common-bundle.js'))
//    .pipe(gulp.dest('./src/js/'))
//    .pipe(browserSync.reload({
//        stream: true
//    }));
//});

gulp.task('build', function(callback) {
    // run webpack
    var commonsPlugin = new webpack.optimize.CommonsChunkPlugin('./src/js/common-bundle.js');
    webpack({
        entry: {
            'bundle': './src/js/main.js',
            'pref-bundle': './src/js/main-pref.js',
            'controller-bundle': './src/js/controller.js'
        },
        output: {
            path: __dirname,
            filename: './src/js/[name].js'
        },
        plugins: [commonsPlugin]
        
    }, function(err, stats) {
        if(err) throw new gutil.PluginError("webpack", err);
        gutil.log("[webpack]", stats.toString({
            // output options
        }));
        callback();
    })
});

gulp.task('compress', function() {
  return gulp.src('./dist/js/**/*.js')
      .pipe(uglify())
      .pipe(gulp.dest('./dist/js/'));
});

gulp.task('browserSync', function() {
    browserSync({
        server: {
            baseDir: './src/'
        },
        notify: false
    });
});


gulp.task('clean', function(){
    return gulp.src(['./dist/*'], {read:false})
        .pipe(clean());
});



gulp.task('move', ['clean'], function(){
    var filesToMove = [
        './src/*.html',
        './src/css/**/*.css',
        './src/js/common-bundle.js',
        './src/js/bundle.js',
        './src/js/pref-bundle.js',
        './src/js/controller-bundle.js',
        './src/lang/**/*',
        './src/images/**/*',
        './src/fonts/**/*'
    ];

    gulp.src(filesToMove, { base: './src' })
        .pipe(gulp.dest('./dist'));
});


gulp.task('default', ['browserSync', 'sass'], function () {
    gulp.watch('./src/scss/**/*.scss', ['sass']);
    gulp.watch('./src/*.html', browserSync.reload);
    gulp.watch('./src/js/**/*.js', ['build']);
});
