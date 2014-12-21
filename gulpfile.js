'use strict'

var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var opn = require('opn');


var server = {
  host: 'localhost',
  port: '3000'
};

var basePaths = {
  src: 'client/app/',
  assets: 'client/assets/',
  deploy: 'dist/public/',
  build: 'client/app/'
}

var paths = {
  scripts: {
    src: basePaths.src +  'components/**/*.js',
    build: basePaths.build + 'scripts/',
    dest: basePaths.deploy + 'scripts/'
  },
  html: {
    src: basePaths.src + 'components/**/*.html',
    dest: basePaths.deploy + 'html/'
  },
  styles: {
    src: basePaths.assets + 'stylesheets/*.css',
    dest: basePaths.deploy + 'css/'
  },
  images: {
    src: basePaths.src + 'images/',
    dest: basePaths.deploy + 'images/'
  }
}

gulp.task('css', function() {
  return gulp.src(paths.styles.src)
  //  .pipe($.csslint({
  //    ids: false // allow ids in CSS selectors
  //  }))
  //  .pipe($.csslint.reporter())
    .pipe(gulp.dest(paths.styles.dest));
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

gulp.task('javascript', function() {
  gulp.src(paths.scripts.build + '**/*.js')
    .pipe($.sourcemaps.init())
    .pipe($.concat('grendelall.js'))
    .pipe($.sourcemaps.write())
    .pipe(gulp.dest(paths.scripts.dest));
});

gulp.task('html', function() {
  gulp.src(paths.html.src)
    .pipe(gulp.dest(paths.html.dest));
})

gulp.task('clean', function() {
  return gulp.src([paths.scripts.build, basePaths.deploy], {read: false})
    .pipe($.rimraf());
});

gulp.task('webserver', function() {
  gulp.src(basePaths.deploy)
    .pipe($.webserver({
      host: server.host,
      port: server.port,
      livereload: true,
      directoryListing: true
    }));
});

gulp.task('openbrowser', function() {
  var options = {
    url: 'http://' + server.host + ':' + server.port + 'html/index.html'
  }

  opn(options.url);
});


gulp.task('watch', ['webserver', 'openbrowser'], function() {
    gulp.watch([paths.styles.src], ['csslint']);
    gulp.watch(paths.html.src, ['html']);
    gulp.watch([paths.scripts.src], ['jshint', 'traceur'])
});


gulp.task('default', ['css', 'html', 'jshint', 'traceur', 'javascript', 'webserver', 'watch', 'openbrowser']);
