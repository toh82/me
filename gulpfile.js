var gulp = require('gulp')

gulp.task('hbs', function () {
  var handlebars = require('gulp-compile-handlebars')
  var loadDocumentData = require('./script/document/loadData')
  var removeDocumentData = require('./script/document/removeData')
  var pageConfig = require('./src/config.json')

  var options = {
    ignorePartials: true,
    batch: ['./src/partials'],
    helpers: {
      formatTags: require('./script/helper/formatTags'),
      articleList: require('./script/helper/articleList'),
      tagNavigation: require('./script/helper/tagNavigation'),
      markdown: require('./script/helper/markdown')
    }
  }

  return gulp.src('./src/**/*.html')
    .pipe(loadDocumentData())
    .pipe(handlebars(pageConfig, options))
    .pipe(removeDocumentData())
    .pipe(gulp.dest('web'))
})

gulp.task('js', function () {
  var uglify = require('gulp-uglify')
  var concat = require('gulp-concat')

  return gulp.src('src/js/*.js')
    .pipe(uglify())
    .pipe(concat('script.js'))
    .pipe(gulp.dest('web/assets/js'))
})

gulp.task('css', function () {
  var postcss = require('gulp-postcss')
  var sourcemaps = require('gulp-sourcemaps')
  var atImport = require('postcss-import')
  var cssnano = require('cssnano')

  return gulp.src('./src/css/styles.css')
    .pipe(sourcemaps.init())
    .pipe(postcss([
      atImport({
        path: ['./node_modules', './src/css']
      }),
      require('precss'),
      require('autoprefixer'),
      cssnano()
    ]))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('web/assets/css'))
})

gulp.task('default', ['hbs', 'css', 'js'])
gulp.task('watch', function () {
  return gulp.watch('./src/*', ['hbs', 'css', 'js'])
})
