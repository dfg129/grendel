'use strict'

var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var seq = require('run-sequence');
var opn = require('opn');


var server = {
  host: 'localhost',
  port: '3000'
};

var basePaths = {
  src: 'client/app/',
  assets: 'client/assets/',
  deploy: 'dist/public/',
  build: 'client/app/',
  external: 'client/bower_components/'
}

var paths = {
  scripts: {
    src: basePaths.src +  '**/**/*.js',
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
  },
  external: {
    src: basePaths.external,
    dest: basePaths.deploy + 'js/'
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
      .pipe($.sourcemaps.init())
      .pipe($.traceur({
        sourceMap: true
      }))
      .pipe($.sourcemaps.write(paths.scripts.dest))
      .pipe(filter.restore())
      .pipe($.concat('grendel.js'))
      .pipe($.insert.append('System.get("grendel" + "");'))
      .pipe(gulp.dest(paths.scripts.dest));
});

gulp.task('javascript', function() {
  gulp.src(paths.scripts.build + '**/*.js')
    .pipe($.sourcemaps.init())
    .pipe($.concat('grendelall.js'))
    .pipe($.sourcemaps.write())
    .pipe(gulp.dest(paths.scripts.dest));
});

gulp.task('external', function() {
  gulp.src(paths.external.src + 'angularjs/angular.js')
    .pipe(gulp.dest(paths.external.dest));
  gulp.src(paths.external.src + 'ui-router/release/angular-ui-router.js')
    .pipe(gulp.dest(paths.external.dest));
  gulp.src(paths.external.src + 'rxjs/dist/rx.lite.js')
    .pipe(gulp.dest(paths.external.dest));
    gulp.src(paths.external.src + 'angular-rx/dist/rx.angular.js')
    .pipe(gulp.dest(paths.external.dest));
});

gulp.task('html', function() {
  gulp.src(basePaths.src + "index.html")
    .pipe(gulp.dest(basePaths.deploy));

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
      livereload: true
    //  directoryListing: true
    }));
});

gulp.task('openbrowser', function() {
  var options = {
    url: 'http://' + server.host + ':' + server.port
  }
  opn(options.url);
});


gulp.task('watch', function() {
    gulp.watch([paths.styles.src], ['csslint']);
    gulp.watch(paths.html.src, ['html']);
    gulp.watch([paths.scripts.src], ['jshint', 'traceur'])
});

gulp.task('build', function() {
  seq('clean', ['css', 'html'], 'jshint', 'traceur',
   'external', 'webserver', 'openbrowser', 'watch');
})
gulp.task('default', ['build']);
