var gulp = require('gulp'), 
    minifycss = require('gulp-minify-css'),
    uglify = require('gulp-uglify'),
    imagemin = require('gulp-imagemin'),
    concat = require('gulp-concat'),
    htmlmin = require('gulp-htmlmin'),
    connect = require('gulp-connect'),
    livereload = require('gulp-livereload');

var paths = {
    js: [ // js目录
        'src/js/*'
    ],
    css: [
         'src/css/*'
    ],
    img: [
         'src/images/*'
    ],
    html: [
        'src/html/*'
    ],
    lib: { // 第三方依赖文件
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
        .pipe(gulp.dest(output + "/html"));
});

gulp.task("default", function(){
	console.log("hello world");
});

gulp.task('watch', function () {
  
  gulp.watch(['./src/html/*.html'], ['html']);
  gulp.watch(['./src/js/*.js'], ['html']);
  gulp.watch(['src/bower_components/jquery/dist/jquery.min.js'], ['html']);
  gulp.watch(['./src/css/*.css'], ['html']);
  gulp.watch(['./src/images/**.*'], ['html']); 

});

gulp.task('connect', function () {
  connect.server({
    root: 'src',
    livereload: true
  });
});

gulp.task('html', function () {
  gulp.src(['./src/html/*.html', './src/js/*.js', 'src/bower_components/jquery/dist/jquery.min.js', './src/css/*.css', './src/images/**.*'])
    .pipe(connect.reload());
});

gulp.task('default', ['develop','connect', 'watch']);

