module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		uglify: {
			options: {
				banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
			},
			build: {
				src: 'src/concat.js',
				dest: 'public/js/hotscounter.js'
			}
		},
		jshint: {
			all: ['public/js/**/*.js', 'app/**/*.js']
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
			options: {
			},
			dist: {
				src: ['src/**/*.js'],
				dest: 'src/concat.js'
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-simple-mocha');
	grunt.loadNpmTasks('grunt-contrib-concat');

	grunt.registerTask('default', ['jshint', 'simplemocha', 'concat:dist', 'uglify:build']);
};
