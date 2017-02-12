var gulp = require('gulp')

gulp.task('hbs', function () {
  var docData = require('./script/docData')
  var handlebars = require('gulp-compile-handlebars')
  var pageConfig = require('./src/config.json')

  var options = {
    ignorePartials: true,
    batch: ['./src/partials'],
    helpers: {
      formatTags: require('./script/helper/formatTags'),
      articleList: require('./script/helper/articleList'),
      tagNavigation: require('./script/helper/tagNavigation')
    }
  }

  return gulp.src('./src/**/*.html')
    .pipe(docData())
    .pipe(handlebars(pageConfig, options))
    .pipe(gulp.dest('web'))
})

gulp.task('css', function () {
    var postcss = require('gulp-postcss')
    var sourcemaps = require('gulp-sourcemaps')
    var atImport = require('postcss-import')

    return gulp.src('./src/css/styles.css')
        .pipe(sourcemaps.init())
        .pipe(postcss([
          atImport({
            path: ['./node_modules','./src/css'],
          }),
          require('precss'),
          require('autoprefixer')
        ]))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('web/assets/css'))
});

gulp.task('default', ['hbs','css'])
gulp.task('watch', function () {
  return gulp.watch('./src/*', ['hbs','css'])
})
