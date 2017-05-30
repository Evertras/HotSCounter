module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      build: {
        files: {
          'public/js/hotscounter.js': ['src/**/*.js']
        }
      }
    },
    js_beautify: {
      files: {
        'all': '**/*.js'
      }
    },
    jshint: {
      options: {
        jshintrc: true
      },
      all: ['src/**/*.js', 'app/**/*.js']
    },
    simplemocha: {
      options: {
        globals: ['expect'],
        timeout: 3000,
        ignoreLeaks: false,
        ui: 'bdd',
        reporter: 'tap'
      },
      all: {
        src: ['app/test/**/*.js']
      }
    },
    concat: {
      options: {},
      dist: {
        src: ['src/**/*.js'],
        dest: 'concat.js'
      }
    },
    sass: {
      dist: {
        options: {
          style: 'compressed',
          sourcemap: 'none'
        },
        files: {
          'public/css/hotscounter.min.css': 'public/css/hotscounter.scss'
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-simple-mocha');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-js-beautify');

  grunt.registerTask('default', ['sass', 'jshint', 'simplemocha', 'concat:dist', 'uglify:build', 'js_beautify']);
  grunt.registerTask('build', ['sass', 'jshint', 'concat:dist', 'uglify:build', 'js_beautify']);
};
