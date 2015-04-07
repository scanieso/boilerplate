module.exports = function (grunt) {
  'use strict';

  require('load-grunt-tasks')(grunt);
  require('time-grunt')(grunt);

  var _src = 'app/',
    _dest = 'public/',
    javascripts = [_src + 'javascripts/_es5/**/*.js'],
    stylesheets = _src + 'stylesheets/**/*.scss',
    icons = _src + 'svg/**/*.svg',
    images = _src + 'images/**/*.{jpg,gif,png}';

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    _dest: _dest,
    _src: _src,

    // Javascript Tasks
    // ---------------------------------------------

    es6transpiler: {
      dist: {
        files: [{
          expand: true,
          cwd: _src + 'javascripts/es6/',
          src: ['**/*.js'],
          dest: 'tmp/javascripts/_es5'
        }]
      }
    },

    transpile: {
      main: {
        type: 'globals',
        files: [{
          expand: true,
          cwd: 'tmp/javascripts/_es5',
          src: ['**/*.js'],
          dest: _src + 'javascripts/_es5'
        }]
      }
    },

    jshint: {
      options: {
        jshintrc: './.jshintrc'
      },
      dev: [_src + 'javascripts/_es5']
    },

    concat: {
      dev: {
        src: [javascripts],
        dest: _dest + 'assets/js/app.js',
        separator: ';'
      }
    },

    uglify: {
      dist: {
        src: [javascripts],
        dest: _dest + 'assets/js/app.min.js'
      }
    },

    // CSS Tasks
    // ---------------------------------------------

    sass: {
      dev: {
        options: {
          outputStyle: 'nested'
        },
        files: {
          "<%= _dest + 'assets/css/styles.css' %>": "<%= _src + 'stylesheets/styles.scss' %>"
        }
      },
      min: {
        options: {
          outputStyle: 'compressed'
        },
        files: {
          "<%= _dest + 'assets/css/styles.min.css' %>": "<%= _src + 'stylesheets/styles.scss' %>"
        }
      }
    },

    // HTML Tasks
    // ---------------------------------------------

    jekyll: {
      dev: {
        options: {
          src: _src + 'jekyll',
          dest: 'tmp/_site'
        }
      }
    },

    htmllint: {
      all: [_dest + '**/*.html']
    },

    // Image Tasks
    // ---------------------------------------------

    sprite: {
      all: {
        algorithm: 'binary-tree',
        src: _src + 'images/sprite/*.{jpg,gif,png}',
        destImg: _dest + 'assets/images/layout/sprite.png',
        destCSS: _src + 'stylesheets/generated/_sprite.scss',
        imgPath: '../images/layout/sprite.png'
      }
    },

    responsive_images: {
      responsive: {
        options: {
          newFilesOnly: true,
          separator: '_',
          sizes: [{
            name: 'mobile',
            width: 480
          },{
            name: 'tablet',
            width: 780
          }]
        },
        files: [{
          expand: true,
          src: ['*.{jpg,gif,png}'],
          cwd: _src + 'images/responsive',
          dest: _dest + 'assets/images/content/'
        }]
      }
    },

    favicons: {
      options: {
        tileBlackWhite: false,
        windowsTile: false
      },
      icons: {
        src: _src + 'images/icons/favicon.png',
        dest: _dest + 'assets/images/icons/'
      }
    },

    imagemin: {
      all: {
        files: [{
          expand: true,
          cwd: _dest + 'assets/images/',
          src: ['**/*.{jpg,gif,png}'],
          dest: _dest + 'assets/images/'
        }]
      }
    },

    // Misc Tasks
    // ---------------------------------------------

    clean: {
      javascripts: [
      _src + 'javascripts/_es5',
      'tmp/javascripts/**/*.js'
      ]
    },

    connect: {
      server: {
        options: {
          base: 'public/',
          hostname: '*',
          livereload: true,
          port: 8000
        }
      }
    },

    copy: {
      jekyll: {
        files: [{
          expand: true,
          cwd: 'tmp/_site',
          src: ['**/*.html'],
          dest: _dest
        }]
      },
      responsive_images: {
        files: [{
          expand: true,
          cwd: _src + 'images/responsive/',
          src: ['**/*.{jpg,gif,png}'],
          dest: _dest + 'assets/images/content'
        }]
      }
    },

    'gh-pages': {
      options: {
        base: 'public'
      },
      src: ['**']
    },

    secret: grunt.file.exists('secret.json') ? grunt.file.readJSON('secret.json') : {},

    sftp: {
      staging: {
        files: {
          './': [
            'public/**'
          ]
        },
        options: {
          host: '<%= secret.host %>',
          path: '<%= secret.path %>',
          username: '<%= secret.username %>',
          password: '<%= secret.password %>',
          minimatch: {
            noglobstar: false
          },
          showProgress: true,
          srcBasePath: 'public/'
        }
      }
    },

    webfont: {
      icons: {
        src: icons,
        dest: _dest + 'assets/fonts/icons',
        destCss: _src + 'stylesheets/generated',
        options: {
          font: 'icons',
          htmlDemo: false,
          relativeFontPath: '../fonts/icons',
          stylesheet: 'scss',
          syntax: 'bootstrap'
        }
      }
    },

    watch: {
      options: {
        livereload: true
      },
      sourceScripts: {
        options: {
          livereload: false
        },
        files: _src + 'javascripts/**/*.js',
        tasks: ['javascripts']
      },
      compiledScripts: {
        files: _dest + 'assets/js/**/*.js',
        tasks: []
      },
      sass: {
        options: {
          livereload: false
        },
        files: [
        stylesheets,
        '!' + _src + 'stylesheets/vendor/**/*.scss'
        ],
        tasks: ['stylesheets']
      },
      css: {
        files: _dest + 'assets/**/*.css',
        tasks: []
      },
      jekyll: {
        files: _src + 'jekyll/**/*.html',
        tasks: ['html']
      },
      icons: {
        files: icons,
        tasks: ['newer:webfont']
      },
      sprites: {
        files: _src + 'images/sprite/**/*.{jpg,gif,png}',
        tasks: ['sprite']
      },
      images: {
        files: _dest + 'images/**/*.{jpg,gif.png}',
        tasks: ['imagemin']
      },
      responsive_images: {
        files: _src + 'images/responsive/**/*.{jpg,gif,png}',
        tasks: ['responsive_images', 'copy:responsive_images', 'imagemin:responsive_images']
      }
    }
  });

  grunt.registerTask('default', ['watch']);

  grunt.registerTask('server', ['connect', 'watch']);
  grunt.registerTask('s', ['server']);

  grunt.registerTask('javascripts', [
    'clean:javascripts',
    'es6transpiler',
    'transpile',
    'jshint',
    'concat',
    'uglify'
  ]);

  grunt.registerTask('stylesheets', [
    'sass'
  ]);

  grunt.registerTask('images', [
    'responsive_images',
    'copy:responsive_images',
    'imagemin'
  ]);

  grunt.registerTask('html', [
    'jekyll',
    'copy:jekyll'
  ]);

  grunt.registerTask('build', [
    'javascripts',
    'stylesheets',
    'html'
  ]);
};
