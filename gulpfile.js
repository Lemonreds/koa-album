const gulp = require('gulp'),
    sass = require('gulp-sass'),
    babel = require('gulp-babel'),
    uglify  =require('gulp-uglify'),
    rename = require('gulp-rename'),
    browserify = require('browserify'),
    cleanCSS = require('gulp-clean-css'),
    autoprefixer = require('gulp-autoprefixer'),
    source = require('vinyl-source-stream')


gulp.task('sass', () => {

    return gulp.src('./src/css/style.sass')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('static'))
})

gulp.task('browserify',()=>{

    let config = browserify({
        entries: 'src/js/index.js'
    })

    return config.bundle()
        .pipe(source('bundle.js'))
        .pipe(gulp.dest('static'))  
})


gulp.task('dev', () => {

    gulp.watch('src/css/*.sass', ['sass']) 
    gulp.watch('src/css/_import/*.sass', ['sass']) 

    gulp.watch('src/js/*.js', ['browserify'])
    
})

gulp.task('build',()=>{

    gulp.src('static/bundle.js')
    .pipe(babel())
    .pipe(uglify())
    .pipe(gulp.dest('static'))

    gulp.src('static/style.css')
    .pipe(autoprefixer({
        browsers: ['last 2 versions'],
        cascade: false
    }))
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(gulp.dest('static'))
})


gulp.task('default',['sass','browserify'])