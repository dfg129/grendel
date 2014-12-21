'use strict'

var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var opn = require('opn');


var server = {
  host: 'localhost',
  port: '3000'
};

gulp.task('css', function() {
  return gulp.src(paths.styles.src)
    .pipe($.csslint({
      ids: false // allow ids in CSS selectors
    }))
    .pipe($.csslint.reporter());
});

gulp.task('jshint', function() {
  return gulp.src(paths.scripts.src)
    .pipe($.jshint())
    .pipe($.jshint.reporter($.jshintStylish));
});

gulp.task('traceur', function() {
  var runtimePath = $.traceur.RUNTIME_PATH;
  var filter = $.filter('!traceur-runtime.js');

  return gulp.src([runtimePath, paths.scripts.src])
    .pipe($.order([
      'traceur-runtime.js',
      paths.scripts.src
      ]))
      .pipe(filter)
      .pipe($.traceur({
        sourceMap: true
      }))
      .pipe(filter.restore())
      .pipe($.concat('app.js'))
      .pipe($.insert.append('System.get("grendel" + "");'))
      .pipe(gulp.dest(paths.scripts.build));
});

gulp.task('rimraf', function() {
  return gulp.src([paths.dest.build, basePaths.deploy], {read: false})
    .pipe($.rimraf());
});

/*
gulp.task('connect', function() {
  var connect = require('connect');
  var serveStatic = require('serve-static');
  var app = connect()
    .use(require('connect-livereload')({
      port: 35729
    }))
    .use(serveStatic(__dirname));

    require('http').createServer(app)
      .listen(3000)
      .on('listening', function() {
        console.log('Started connect web server on http://localhost:3000');
      });
});

gulp.task('serve', ['connect'], function() {
  require('opn')('http://localhost:3000');
});
*/

gulp.task('webserver', function() {
  gulp.src('.')
    .pipe($.webserver({
      host: server.host,
      port: server.port,
      livereload: true,
      directoryListing: true
    }));
});

gulp.task('openbrowser', function() {
  opn('http://' + server.host + ':' + server.port);
});


gulp.task('watch', ['webserver', 'openbrowser'], function() {
    gulp.watch([paths.styles.src], ['csslint']);
    gulp.watch([paths.scripts.src], ['jshint', 'traceur'])
});


gulp.task('default', ['css', 'jshint', 'traceur', 'webserver', 'watch', 'openbrowser']);

/*
var debug = require('gulp-debug');
var watch = require('gulp-watch');
var plumber = require('gulp-plumber');
var stylus = require('gulp-stylus');
var jshint = require('gulp-jshint');
var concat = require('gulp-concat');
var browserSync = require('browser-sync');
var gutil = require('gulp-util');
var reload = browserSync.reload;
var traceur = require('gulp-traceur');
var sourcemaps = require('gulp-sourcemaps');
*/
var basePaths = {
  src: 'client/app/',
  deploy: 'dist/public/',
  build: 'client/app/'
}

var paths = {
  scripts: {
     src: basePaths.src +  'components/**/*.js',
     build: basePaths.build + 'scripts/',
     dest: basePaths.dest + 'scripts/'
  },
  html: {
    src: basePaths.src + 'html/',
    dest: basePaths.dest + 'html/'
  },
  styles: {
    src: basePaths.src + 'css/',
    dest: basePaths.dest + 'css/'
  },
  images: {
    src: basePaths.src + 'images/',
    dest: basePaths.dest + 'images/'
  }
}

/*
var onError = function (err) {
  console.log(err);
  gutil.beep();
}

gulp.task('clean', function (cb) {
  var rimraf = require('rimraf');
  rimraf('./dist', cb);
});


gulp.src('./bower_components/angularjs/angular.js')
    .pipe(gulp.dest(paths.scripts.dest));
gulp.src('./bower_components/ui-router/release/angular-ui-router.js')
    .pipe(gulp.dest(paths.scripts.dest));
gulp.src('./bower_components/ui-grid.js')
    .pipe(gulp.dest(paths.scripts.dest));

gulp.task('server', function() {
  browserSync({
    server: {
      baseDir: basePaths.deploy
    }
  });

  gulp.watch(paths.stylesSrc, ['styles']);
  gulp.watch(paths.cssSrc, ['css']);
  gulp.watch(paths.imagesSrc, ['images']);
  gulp.watch(paths.htmlSrc, ['html']);
  gulp.watch(paths.scripts.src, ['traceur''lint', 'traceur', 'scripts', 'concat']);
  gulp.watch(paths.partialsSrc, ['partials']);
  gulp.watch(paths.traceurSrc, ['traceur'])
});

gulp.task('lint', function () {
  return gulp.src(paths.scripts.src)
    .pipe(plumber())
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

gulp.task('traceur', function () {
  console.log("Traceuring : " + paths.scripts.src);
  return gulp.src(paths.scripts.src)
  .pipe(sourcemaps.init())
  .pipe(traceur())
  .pipe(sourcemaps.write())
  .pipe(gulp.dest(paths.scripts.build))
});

gulp.task('scripts', function() {
  console.log("Scripting : " + paths.scripts.src);
  return gulp.src(paths.scripts.src)
    .pipe(plumber({
      errorHandler: onError
    }))
    .pipe(gulp.dest(paths.scripts.build));
});

gulp.task('concat', function() {
  console.log("Concatting : " + paths.scripts.src);
  return gulp.src(paths.scripts.build)
  .pipe(plumber({
    errorHandler: onError
  }))
  .pipe(gulp.dest(paths.scripts.dest))
  .pipe(reload({stream:true}));
});

gulp.task('styles', function () {
  console.log("Styling : " + paths.styles.src);
  return gulp.src(paths.styles.src)
    .pipe(plumber({
      errorHandler: onError
    }))
    .pipe(stylus())
    .pipe(gulp.dest(paths.styles.dest))
    .pipe(reload({stream:true}));
});

gulp.task('css', function () {
  console.log("CSSing : " + paths.styles.src);
  return gulp.src(paths.styles.src)
    .pipe(plumber({
      errorHandler: onError
    }))
    .pipe(gulp.dest(paths.styles.dest))
    .pipe(reload({stream:true}));
});

gulp.task('images', function () {
  console.log("Imaging : " + paths.images.src);
  return gulp.src(paths.images.src)
    .pipe(plumber({
      errorHandler: onError
    }))
    .pipe(gulp.dest(paths.images.dest))
    .pipe(reload({stream:true}));
});

gulp.task('html', function() {
  console.log("Initing : " + paths.html.src);
  return gulp.src(paths.html.src)
   .pipe(plumber({
      errorHandler: onError
    }))
    .pipe(gulp.dest(paths.html.dest))
    .pipe(reload({stream:true}));
});



gulp.task('default', ['server', 'styles', 'css', 'lint', 'scripts', 'html', 'images', 'traceur']);
*/
