var gulp = require('gulp'), 
    minifycss = require('gulp-minify-css'),
    uglify = require('gulp-uglify'),
    imagemin = require('gulp-imagemin'),
    concat = require('gulp-concat'),
    htmlmin = require('gulp-htmlmin'),
    connect = require('gulp-connect'),
    rename = require('gulp-rename'),
    clean = require('gulp-clean'),
    rev = require('gulp-rev'),
    revCollector = require('gulp-rev-collector'),
    autoprefixer = require('gulp-autoprefixer'),
    processhtml = require('gulp-processhtml'), // 处理HTML
    usemin = require('gulp-usemin'),            // 处理HTML
    plumber=require('gulp-plumber'),
    cssimport = require("gulp-cssimport"),
    mergeStream = require('merge-stream'),
    runSequence = require('run-sequence'),
    livereload = require('gulp-livereload');

var paths = {
    js: [
        'src/js/*'
    ],
    css: [
         'src/css/*'
    ],
    img: [
         'src/images/*'
    ],
    html: [
        'src/view/*'
    ],
    lib: {
        js: [
            'src/bower_components/jquery/dist/jquery.min.js'
        ]
    }
};

var output = "dist"; 

gulp.task('develop', function() {
    gulp.src(paths.js)
        .pipe(gulp.dest(output + '/js'));
        
    gulp.src(paths.lib.js)
        .pipe(gulp.dest(output + '/js'));

    gulp.src(paths.css)
        .pipe(gulp.dest(output + '/css'));
        
    gulp.src(paths.img)
        .pipe(gulp.dest(output + '/images'));

    gulp.src(paths.html)
        .pipe(gulp.dest(output + "/view"));
});

gulp.task("default", ['clean'], function(){
	//gulp.start( 'reference', 'js', 'connect', 'watch');
    gulp.start('htmlput', 'js', 'styles', 'imgput', 'connect', 'watch');
});

gulp.task('clean', function() {  
  return gulp.src(['dist/*'], {read: false})
    .pipe(clean());
});

gulp.task('styles', function() {  
  return gulp.src(['src/css/*.css'])
    .pipe(plumber())
    .pipe(cssimport())
  	.pipe(minifycss())
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('dist/css'));
});

gulp.task('reference', ['htmlput', 'import'], function(){
    //gulp.start('usemin', "imgput");
});

gulp.task('reloadhtml', ['htmlput', 'import'], function(){
    gulp.start('usemin');
});

gulp.task('reloadcss', ['import'], function(){
    return gulp.src(['temp/css/*.css'])
                .pipe(plumber())
                .pipe(minifycss())
                .pipe(rename({ suffix: '.min' }))
                .pipe(gulp.dest('dist/css'));
});

gulp.task('htmlput', function() {
    return gulp.src("src/view/**/*.html")
        .pipe(plumber())
        .pipe(gulp.dest("dist/view"));
});

gulp.task("import", function() {
    return gulp.src("src/css/*.css")
        .pipe(cssimport())
        .pipe(gulp.dest("temp/css/"));
}); 


gulp.task("imgput", function(){
    gulp.src("src/images/**/*.*")
        .pipe(gulp.dest("dist/images/"))
});

gulp.task('usemin', function() {
    var options = {
            removeComments: true,//清除HTML注释
            collapseWhitespace: true,//压缩HTML
            collapseBooleanAttributes: false,//省略布尔属性的值 <input checked="true"/> ==> <input />
            removeEmptyAttributes: false,//删除所有空格作属性值 <input id="" /> ==> <input />
            removeScriptTypeAttributes: true,//删除<script>的type="text/javascript"
            removeStyleLinkTypeAttributes: true,//删除<style>和<link>的type="text/css"
            minifyJS: true,//压缩页面JS
            minifyCSS: true//压缩页面CSS
        },
        useminOpts = {
            css: [ rev() ]
        }

    gulp.src(["./dist/view/*.html"])
        .pipe(usemin({
            css: [minifycss()]
        }))
        .pipe(gulp.dest("dist/view"));
});


gulp.task('js', function(){
    return gulp.src("src/js/**/*.js")
           .pipe(plumber())
           .pipe(gulp.dest("dist/js"));
});

gulp.task('rev', function() {
    gulp.src(['./rev/*.json', './src/view/*.html'])
        .pipe(plumber())
        .pipe(revCollector())
        .pipe(gulp.dest('./dist/view/'));
});


gulp.task('watch', function () {
  
  gulp.watch(['./src/view/**/*.html'], ['htmlput', 'refresh']);
  gulp.watch(['./src/js/**/*.js'], ['js', 'refresh']);
  gulp.watch(['./src/css/**/*.css'], ['styles', 'refresh']);
  gulp.watch(['./src/images/*.*'], ['imgput', 'refresh']); 

});

gulp.task('connect', function () {
  connect.server({
    root: 'dist',
    port: 9080,
    livereload: true
  });
});

gulp.task('refresh', function () {
  gulp.src(['./dist/view/**/*.html', './dist/js/**/*.js', './dist/css/**/*.css', './dist/images/**/*.*'])
    .pipe(plumber())
    .pipe(connect.reload());
});



