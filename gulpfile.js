const gulp = require('gulp'),
    sass = require('gulp-sass'),
    babel = require('gulp-babel'),
    uglify  =require('gulp-uglify'),
    rename = require('gulp-rename'),
    browserify = require('browserify'),
    cleanCSS = require('gulp-clean-css'),
    autoprefixer = require('gulp-autoprefixer'),
    source = require('vinyl-source-stream')


// sass=>css 
gulp.task('sass', () => {

    return gulp.src('./src/css/style.sass')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('static'))
})


// es6 模块化
gulp.task('browserify',()=>{

    let config = browserify({
        entries: 'src/js/index.js'
    })

    return config.bundle()
        .pipe(source('bundle.js'))
        .pipe(gulp.dest('static'))  
})

// development
// 自动监听文件修改并更新
gulp.task('dev', () => {

    gulp.watch('src/css/*.sass', ['sass']) 
    gulp.watch('src/css/_import/*.sass', ['sass']) 

    gulp.watch('src/js/*.js', ['browserify'])
    
})

// 压缩js和css,自动添加css前缀
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

// 默认任务
gulp.task('default',['sass','browserify'])