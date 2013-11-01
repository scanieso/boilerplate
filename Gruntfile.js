module.exports = function (grunt) {
  'use strict';

  require('load-grunt-tasks')(grunt);

  var sourcePath = 'app/',
    destPath = 'public/',
    javascripts = sourcePath + 'javascripts/**/*.js',
    stylesheets = sourcePath + 'stylesheets/**/*.scss',
    icons = sourcePath + 'svg/icons/**/*.svg',
    images = sourcePath + 'images/**/*.{jpg,gif,png}';

  grunt.initConfig({
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
          style: 'nested'
        },
        files: {
          "<%= destPath + 'assets/css/styles.css' %>": "<%= sourcePath + 'stylesheets/styles.scss' %>"
        }
      }
    },

    cmq: {
      dist: {
        files: {
          'public/assets/css/': "<%= destPath + 'assets/css/styles.css' %>"
        }
      }
    },

    cssmin: {
      dist: {
        files: {
          "<%= destPath + 'assets/css/styles.min.css' %>": "<%= destPath + 'assets/css/styles.css' %>"
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
      touch_icon: {
        options: {
          separator: '-',
          sizes: [{
            name: '152x152-precomposed',
            width: 152
          },{
            name: '144x144-precomposed',
            width: 144
          },{
            name: '120x120-precomposed',
            width: 120
          },{
            name: '114x114-precomposed',
            width: 114
          },{
            name: '76x76-precomposed',
            width: 76
          },{
            name: '72x72-precomposed',
            width: 72
          },{
            name: '57x57-precomposed',
            width: 57
          },{
            name: 'precomposed',
            width: 57
          }]
        },
        files: [{
          expand: true,
          src: ['*.{jpg,gif,png}'],
          cwd: sourcePath + 'images/icons/',
          dest: destPath + 'assets/'
        }]
      },
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
      },
      responsive_images: {
        files: [{
          expand: true,
          cwd: sourcePath + 'images/responsive/',
          src: ['*.{jpg,gif,png}'],
          dest: destPath + 'assets/images/content/'
        }]
      }
    },

    webfont: {
      icons: {
        src: icons,
        dest: destPath + 'assets/fonts/icons',
        destCss: sourcePath + 'css/generated',
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
      scripts: {
        files: javascripts,
        tasks: ['jshint', 'concat']
      },
      sass: {
        files: stylesheets,
        tasks: ['sass:dev', 'dist_css']
      },
      jekyll: {
        files: [
        sourcePath + 'jekyll/**/*.html',
        '!' + sourcePath + 'jekyll/_site/**/*.html'
        ],
        tasks: ['jekyll', 'copy:jekyll']
      },
      icons: {
        files: icons,
        tasks: ['webfont']
      },
      images: {
        files: sourcePath + 'images/sprite/**/*.{jpg,gif,png}',
        tasks: ['sprite', 'imagemin:layout']
      },
      responsive_images: {
        files: sourcePath + 'images/responsive/**/*.{jpg,gif,png}',
        tasks: ['responsive_images', 'copy:responsive_images', 'imagemin:responsive_images']
      }
    },

    concurrent: {
      dev: ['jekyll', 'sass:dev', 'htmllint']
    }
  });

  grunt.registerTask('default', ['watch']);

  grunt.registerTask('dev', [
    'jshint',
    'concurrent',
    'copy:jekyll',
    'htmllint'
  ]);

  grunt.registerTask('dist_css', [
    'sass:dist',
    'cmq',
    'cssmin'
  ]);

  grunt.registerTask('touch_icon', [
    'responsive_images:touch_icon'
    ]);
};
