module.exports = function(grunt) {
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-beep');
	grunt.loadNpmTasks('grunt-sass');

	grunt.initConfig({
		uglify: {
			my_target: {
				files: {
					'app/components/script.js': ['app/components/js/*.js']
				} //files
			} //my_target
		}, //uglify
		watch: {
			scripts: {
				files: ['app/components/js/*.js'],
				tasks: ['uglify'],
				options: {
					livereload: 35729,
					spawn: false
				}
			},//scripts
			sass: {
				files: ['app/components/scss/*.scss'],
				tasks: ['sass'],
				options: {
					livereload: 35729,
					spawn: false
				}
			},//sass
			html: {
				files: ['app/*.html'],
				options: {
					livereload: 35729,
					spawn: false
				}
			}//html
		},//watch
		connect:{
			port:8080
		},//connect
		sass: {
			options: {
				style: 'expanded'
				},
				dist: { 
     		 	files: {                         // Dictionary of files
        			'app/components/styles.css': 'app/components/scss/style.scss',       // 'destination': 'source'        			
        		}
        	}
		}//sass

	}); //initConfig

	grunt.registerTask('default', ['connect','watch']); 
	

}; //exports