module.exports = function (grunt) {
  'use strict';

  require('load-grunt-tasks')(grunt);
  require('time-grunt')(grunt);

  var sourcePath = 'app/',
    destPath = 'public/',
    javascripts = sourcePath + 'javascripts/**/*.js',
    stylesheets = sourcePath + 'stylesheets/**/*.scss',
    icons = sourcePath + 'svg/**/*.svg',
    images = sourcePath + 'images/**/*.{jpg,gif,png}';

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    destPath: destPath,
    sourcePath: sourcePath,

    // Javascript Tasks
    // ---------------------------------------------

    jshint: {
      dev: [
      javascripts,
      '!' + sourcePath + 'javascripts/vendor/**/*.js'
      ]
    },

    concat: {
      dev: {
        src: [
        sourcePath + 'javascripts/vendor/**/*.js',
        javascripts
        ],
        dest: destPath + 'assets/js/app.js',
        separator: ';'
      }
    },

    uglify: {
      dist: {
        src: [
        sourcePath + 'javascripts/vendor/**/*.js',
        javascripts
        ],
        dest: destPath + 'assets/js/app.min.js'
      }
    },

    // CSS Tasks
    // ---------------------------------------------

    sass: {
      dev: {
        options: {
          lineNumbers: true,
          style: 'expanded'
        },
        files: {
          "<%= destPath + 'assets/css/styles.dev.css' %>": "<%= sourcePath + 'stylesheets/styles.scss' %>"
        }
      },
      dist: {
        options: {
          style: 'nested',
          quiet: true
        },
        files: {
          "<%= destPath + 'assets/css/styles.css' %>": "<%= sourcePath + 'stylesheets/styles.scss' %>"
        }
      },
      min: {
        options: {
          style: 'compressed',
          quiet: true
        },
        files: {
          "<%= destPath + 'assets/css/styles.min.css' %>": "<%= sourcePath + 'stylesheets/styles.scss' %>"
        }
      }
    },

    // HTML Tasks
    // ---------------------------------------------

    jekyll: {
      dev: {
        options: {
          src: sourcePath + 'jekyll',
          dest: sourcePath + 'jekyll/_site'
        }
      }
    },

    htmllint: {
      all: [destPath + '**/*.html']
    },

    // Image Tasks
    // ---------------------------------------------

    sprite: {
      all: {
        algorithm: 'binary-tree',
        src: sourcePath + 'images/sprite/*.{jpg,gif,png}',
        destImg: destPath + 'assets/images/layout/sprite.png',
        destCSS: sourcePath + 'stylesheets/generated/_sprite.scss',
        imgPath: '../images/layout/sprite.png'
      }
    },

    responsive_images: {
      responsive: {
        options: {
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
          cwd: sourcePath + 'images/responsive',
          dest: destPath + 'assets/images/content/'
        }]
      }
    },

    favicons: {
      options: {
        tileBlackWhite: false,
        windowsTile: false
      },
      icons: {
        src: sourcePath + 'images/icons/favicon.png',
        dest: destPath + 'assets/images/icons/'
      }
    },

    imagemin: {
      all: {
        files: [{
          expand: true,
          cwd: destPath + 'assets/images/',
          src: ['**/*.{jpg,gif,png}'],
          dest: destPath + 'assets/images/'
        }]
      }
    },

    // Misc Tasks
    // ---------------------------------------------

    copy: {
      jekyll: {
        files: [{
          expand: true,
          cwd: sourcePath + 'jekyll/_site',
          src: ['**/*.html'],
          dest: destPath
        }]
      }
    },

    'gh-pages': {
      options: {
        base: 'public'
      },
      src: ['**']
    },

    notify: {
      sass: {
        options: {
          title: 'Task complete',
          message: 'sass task complete'
        }
      }
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
          path: '/sandbox.ftsdesign.com/web/content/grunt/',
          host: '<%= secret.host %>',
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
        dest: destPath + 'assets/fonts/icons',
        destCss: sourcePath + 'stylesheets/generated',
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
      scripts: {
        files: javascripts,
        tasks: ['javascripts']
      },
      sass: {
        options: {
          livereload: false
        },
        files: [
        stylesheets,
        '!' + sourcePath + 'stylesheets/vendor/**/*.scss'
        ],
        tasks: ['stylesheets']
      },
      css: {
        files: destPath + 'assets/**/*.css',
        tasks: []
      },
      jekyll: {
        files: [
        sourcePath + 'jekyll/**/*.html',
        '!' + sourcePath + 'jekyll/_site/**/*.html'
        ],
        tasks: ['html']
      },
      icons: {
        files: icons,
        tasks: ['newer:webfont']
      },
      images: {
        files: sourcePath + 'images/sprite/**/*.{jpg,gif,png}',
        tasks: ['newer:sprite', 'newer:imagemin']
      },
      responsive_images: {
        files: sourcePath + 'images/responsive/**/*.{jpg,gif,png}',
        tasks: ['responsive_images', 'copy:responsive_images', 'imagemin:responsive_images']
      }
    }
  });

  grunt.registerTask('default', ['watch']);

  grunt.registerTask('javascripts', [
    'newer:jshint',
    'concat',
    'uglify'
  ]);

  grunt.registerTask('stylesheets', [
    'sass'
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
