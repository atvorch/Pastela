var gulp = require('gulp');  
var sass = require('gulp-sass'); 
var cleanCSS = require('gulp-clean-css');
var autiprefixer = require('gulp-autoprefixer');
var minifyjs = require('gulp-js-minify');  
var sourcemaps = require('gulp-sourcemaps'); 
var browserSync = require('browser-sync');
var jimp = require('gulp-jimp');
var gulpSequence = require('gulp-sequence');

const server = browserSync.create();

const path = {
    src: {
		images: 'src/images/*.jpg',
		scss: 'src/sass/*.scss',
		js: 'src/js/*.js'
	},
	build: {
		images: 'src/images/placeholders/',
		scss: 'src/',
		js: 'src/'
	},
	watch: {
		images: 'src/images/*.jpg',
		html: 'src/index.html',
		scss: 'src/sass/*.scss',
		js: 'src/js/*.js',
	}
};

//Compress and blur images for images placeholder for images lazy loading
gulp.task('build:img', function () {  
	return gulp.src(path.src.images)
	.pipe(jimp({
		'-placeholder' : {
			quality: 50,
			gaussian: 2,
			blur: 2,
			type: 'jpg'
		}
	}))
	.pipe(gulp.dest(path.build.images));
});

//minify js
gulp.task('build:js', function () {  
	return gulp.src(path.src.js)
	.pipe(sourcemaps.init())
	.pipe(minifyjs())
	.pipe(sourcemaps.write())
	.pipe(gulp.dest(path.build.js));
});

//build sass
gulp.task('build:sass', function () {  
	return gulp.src(path.src.scss)
	.pipe(sass())
	.pipe(autiprefixer())
	.pipe(sourcemaps.init())
    .pipe(cleanCSS())
    .pipe(sourcemaps.write())
	.pipe(gulp.dest(path.build.scss));
});

//run browsersync
gulp.task('browser-sync', function() {  
    browserSync.init([path.watch.scss, path.watch.img, path.watch.html, path.watch.js], {
        server: {
            baseDir: "src/"
        }
    });
});

gulp.task('watch', function () {
	gulp.watch(path.watch.img, ['build:img']);
	gulp.watch(path.watch.scss, ['build:sass']);
	gulp.watch(path.watch.js, ['build:js']);
});

gulp.task('build', gulpSequence('build:sass', 'build:js', 'browser-sync', 'watch'));