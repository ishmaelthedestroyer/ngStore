/**
 * configuration for grunt tasks
 * @module Gruntfile
 */

module.exports = function(grunt) {
  /** load tasks */
  require('load-grunt-tasks')(grunt);

  /** config for build paths */
  var config = {
    dist: {
      dir: 'dist/',
      StoreFactory: 'dist/StoreFactory.js',
      ngStoreFactory: 'dist/ngStore.js'
    },
    src: {
      dir: 'src/'
    },
    tmp: {
      dir: 'tmp/'
    }
  };

  /** paths to files */
  var files = {

    /** src files */
    Factory: [
      'StoreFactory.js'
    ],

    /** src files */
    Store: [
      'Store.js'
    ],
  };

  /* # # # # # # # # # # # # # # # # # # # # */
  /* # # # # # # # # # # # # # # # # # # # # */
  /* # # # # # # # # # # # # # # # # # # # # */
  /* # # # # # # # # # # # # # # # # # # # # */

  /** config for grunt tasks */
  var taskConfig = {

    /** concatentation tasks for building the source files */
    concat: {
      StoreFactory: {
        options: {
          // stripBanners: true
          banner: '',
          footer: '',
        },
        src: (function() {
          var
            cwd = config.src.dir,
            queue = [].concat(files.Factory, files.Store);

          return queue.map(function(path) {
            return cwd + path;
          });
        })(),
        dest: config.dist.StoreFactory,
      },

      ngSession: {
        options: {
          banner: 'angular.module("ngStore", [])\n' +
          '.service("ngStore", [\n' +
          'function() {\n\n',
          footer: '\n\n' +
          'return new StoreFactory();\n\n}' +
          '\n]);'
        },
        src: (function() {
          return [
            config.dist.StoreFactory,
          ];
        })(),
        dest: config.dist.ngStoreFactory
      }
    },


    /** uglify (javascript minification) config */
    uglify: {
      StoreFactory: {
        options: {},
        files: [
          {
            src: config.dist.StoreFactory,
            dest: (function() {
              var split = config.dist.StoreFactory.split('.');
              split.pop(); // removes `js` extension
              split.push('min'); // adds `min` extension
              split.push('js'); // adds `js` extension

              return split.join('.');
            })()
          }
        ]
      },

      ngStoreFactory: {
        options: {},
        files: [
          {
            src: config.dist.ngStoreFactory,
            dest: (function() {
              var split = config.dist.ngStoreFactory.split('.');
              split.pop(); // removes `js` extension
              split.push('min'); // adds `min` extension
              split.push('js'); // adds `js` extension

              return split.join('.');
            })()
          }
        ]
      }
    }
  };

  /* # # # # # # # # # # # # # # # # # # # # */
  /* # # # # # # # # # # # # # # # # # # # # */
  /* # # # # # # # # # # # # # # # # # # # # */
  /* # # # # # # # # # # # # # # # # # # # # */

  // register default & custom tasks

  grunt.initConfig(taskConfig);

  grunt.registerTask('default', [
    'build'
  ]);

  grunt.registerTask('build', [
    'concat',
    'uglify'
  ]);

};