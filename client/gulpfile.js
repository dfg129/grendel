'use strict'

var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var seq = require('run-sequence');
var opn = require('opn');
var del = require('del');

var server = {
  host: 'localhost',
  port: '3000'
};

var basePaths = {
  src: 'app/',
  assets: 'assets/',
  deploy: '../server/play-server/app/assets/',
  build: 'app/',
  external: 'bower_components/'
}

var paths = {
  scripts: {
    src: basePaths.src +  '**/**/*.js',
    build: basePaths.build + 'scripts/',
    dest: basePaths.deploy + 'javascript/'
  },
  html: {
    src: basePaths.src + 'components/**/*.html',
    dest: basePaths.deploy + '../views/'
  },
  partials: {
    src: basePaths.assets + 'partials/*.html',
    dest: basePaths.deploy + 'partials/'
  },
  styles: {
    src: basePaths.assets + 'stylesheets/*.*',
    dest: basePaths.deploy + 'stylesheets/'
  },
  images: {
    src: basePaths.src + 'images/',
    dest: basePaths.deploy + 'images/'
  },
  external: {
    src: basePaths.external,
    dest: basePaths.deploy + 'external/'
  }
}

gulp.task('css', function() {
  return gulp.src(paths.styles.src)
    .pipe(gulp.dest(paths.styles.dest));
 });

 gulp.task('partials', function() {
   return gulp.src(paths.partials.src)
   .pipe(gulp.dest(paths.partials.dest));
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
  gulp.src(paths.external.src + 'angular-route/angular-route.js')
    .pipe(gulp.dest(paths.external.dest));
  gulp.src(paths.external.src + 'angular-bootstrap/ui-bootstrap.js')
    .pipe(gulp.dest(paths.external.dest));
    gulp.src(paths.external.src + 'angular-bootstrap/ui-bootstrap-tpls.js')
    .pipe(gulp.dest(paths.external.dest));
  gulp.src(paths.external.src + 'angular-ui-grid/ui-grid.js')
    .pipe(gulp.dest(paths.external.dest));
});

gulp.task('html', function() {
  gulp.src(paths.html.src)
    .pipe(gulp.dest(paths.html.dest));
})

gulp.task('clean', function() {
  del([paths.scripts.build, basePaths.deploy], {read: false, force: true});
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
    gulp.watch([paths.styles.src], ['css']);
    gulp.watch(paths.html.src, ['html']);
    gulp.watch([paths.scripts.src], ['jshint', 'traceur'])
});

gulp.task('build', function() {
  seq('clean', ['css', 'html'], 'jshint', 'traceur',
   'external', 'watch'); //   'webserver', 'openbrowser', 'watch');
})
gulp.task('default', ['build']);
