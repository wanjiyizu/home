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
	notify = require("gulp-notify"),
	changed = require("gulp-changed"),
    mergeStream = require('merge-stream'),
    runSequence = require('run-sequence'),
    livereload = require('gulp-livereload');


gulp.task("default", ['clean'], function(){
	//gulp.start( 'reference', 'js', 'connect', 'watch');
    gulp.start('htmlput', 'js', 'styles', 'imgput', 'connect', 'watch');
});

gulp.task('clean', function() {  
  return gulp.src(['dist/*'], {read: false})
    .pipe(clean());
});

gulp.task('styles', function() {  
  return gulp.src(['src/css/**/*.css'])
        .pipe(plumber())
        .pipe(cssimport())
	     .pipe(autoprefixer({browsers: ['last 2 versions'],
            cascade: false}))
  	//.pipe(minifycss())
    .pipe(gulp.dest('dist/css'));
});


gulp.task('htmlput', function() {
    return gulp.src(["src/**/*.html"])
				.pipe(plumber())
				.pipe(changed("dist"))
				.pipe(gulp.dest("dist"));
});


gulp.task("imgput", function(){
    gulp.src("src/images/**/*.*")
        .pipe(gulp.dest("dist/images/"))
});

gulp.task('js', function(){
    return gulp.src("src/js/**/*.js")
           .pipe(plumber())
           .pipe(gulp.dest("dist/js"));
});


gulp.task('watch', function () {
  
  gulp.watch('src/**/*.html', function(e){
	if(e.type == "deleted"){
		var path = e.path.substring(e.path.indexOf("src")+4);
		console.log(path);
		gulp.src("dist/"+path, {read: false}).pipe(clean());
	}else if(e.type == "changed"){
		gulp.start("htmlput", "refresh");
	}else{
		gulp.start("htmlput");
	}
  });

  gulp.watch('src/css/**/*.css', function(e){
	if(e.type == "deleted"){
		var path = e.path.substring(e.path.indexOf("src")+4);
		console.log(path);
		gulp.src("dist/"+path, {read: false}).pipe(clean());
	}else if(e.type == "changed"){
    console.log("=======");
		gulp.start("styles", "refresh");
	}else{
		gulp.start("styles");
	}
  });

  gulp.watch('src/js/**/*.js', function(e){
	if(e.type == "deleted"){
		var path = e.path.substring(e.path.indexOf("src")+4);
		console.log(path);
		gulp.src("dist/"+path, {read: false}).pipe(clean());
	}else if(e.type == "changed"){
		gulp.start("js", "refresh");
	}else{
		gulp.start("js");
	}
  });

   gulp.watch('src/images/**/*.*', function(e){
	if(e.type == "deleted"){
		var path = e.path.substring(e.path.indexOf("src")+4);
		console.log(path);
		gulp.src("dist/"+path, {read: false}).pipe(clean());
	}else if(e.type == "changed"){
		gulp.start("imgput", "refresh");
	}else{
		gulp.start("imgput");
	}
  });


});

gulp.task('connect', function () {
  connect.server({
    root: 'dist',
    port: 9080,
    livereload: true
  });
});

gulp.task('refresh', function () {
  gulp.src(['dist/**/*.html', 'dist/js/**/*.js', 'dist/css/**/*.css', 'dist/images/**/*.*'])
    .pipe(plumber())
    .pipe(connect.reload());
});