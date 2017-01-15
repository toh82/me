var gulp  = require('gulp');

var distFolder = 'web';

gulp.task('hbs', function () {
    var handlebars = require('gulp-compile-handlebars');
    var pageConfig = require('./src/config.json');
    var options = {
        ignorePartials: true,
        batch : ['./src/partials']
    }

    return gulp.src('./src/**/*.html')
        .pipe(handlebars(pageConfig, options))
        .pipe(gulp.dest(distFolder));
});

gulp.task('css', function () {
    var postcss = require('gulp-postcss');
    var sourcemaps = require('gulp-sourcemaps');
    var atImport = require('postcss-import');

    return gulp.src('./src/**/*.css')
        .pipe(sourcemaps.init())
        .pipe(postcss([
          atImport({
            path: ['node_modules','src/css'],
          }),
          require('precss'),
          require('autoprefixer')
        ]))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(distFolder));
});

gulp.task('default', ['hbs','css']);
