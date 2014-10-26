/*******************************************************************************
DEPENDENCIES
*******************************************************************************/

var gulp = require('gulp'),
    stylus = require('gulp-stylus'),
    koutoSwiss = require( "kouto-swiss" ),
    plumber = require('gulp-plumber');




/*******************************************************************************
FILE DESTINATIONS (RELATIVE TO ASSSETS FOLDER)
*******************************************************************************/

var target = {
    main_sass_src : './assets/stylus/styles.styl',
    sass_src : './assets/stylus/**/*.scss',                  // all sass files
    css_dest : './assets/css',                          // where to put minified css
    js_src : './assets/js/*.js',                        // all js files
    js_dest : './assets/js/min',                        // where to put minified js
    img_src : './assets/images/*.{png,jpg,gif}',        // all img files
    img_dest : './assets/images/min',                   // where to put minified img
    svg_src : './assets/images/svg/*.svg',
    svg_dest : './assets'
};






/*******************************************************************************
SASS TASK
*******************************************************************************/

gulp.task('styles', function() {
    return gulp.src(target.main_sass_src)
        .pipe(plumber())
        .pipe(stylus({
          use: koutoSwiss(),
          compress: false
        }))
        .pipe(gulp.dest(target.css_dest));
});






/*******************************************************************************
JS TASK
*******************************************************************************/

gulp.task('scripts', function() {
    return gulp.src(target.js_src)
        .pipe(plumber())
        .pipe(jshint())
        .pipe(jshint.reporter(stylish))
        .pipe(concat('scripts.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest(target.js_dest))
        .pipe(notify('Scripts task completed'));
});





/*******************************************************************************
IMAGES TASK
*******************************************************************************/

gulp.task('images', function() {
    return gulp.src(target.img_src)
        .pipe(plumber())
        .pipe(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true }))
        .pipe(notify('Images task completed'))
        .pipe(gulp.dest(target.img_dest));
});





/*******************************************************************************
SVGSTORE TASK
*******************************************************************************/

gulp.task('svgstore', function() {
    return gulp.src(target.svg_src)
        .pipe(svgmin())
        .pipe(svgstore({ fileName: 'svg-defs.svg', prefix: 'shape-', inlineSvg: false }))
        .pipe(gulp.dest(target.svg_dest));
});






/*******************************************************************************
DEFAULT TASK
*******************************************************************************/

gulp.task('default', ['styles','scripts','images'], function() {

});





/*******************************************************************************
WATCH TASK
*******************************************************************************/

gulp.task('watch', function() {

    gulp.watch(target.sass_src, ['styles']);        // Watch .scss files
    gulp.watch(target.js_src, ['scripts']);         // Watch .js files

});