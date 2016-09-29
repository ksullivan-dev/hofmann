module.exports = function (grunt) {
    grunt.initConfig({
        autoprefixer: {
            dist: {
                files: {
                    'stylesheets/styles.css': 'stylesheets/styles.css'
                }
            }
        },
        sass: {
            dist: {
                files: {
                    'stylesheets/styles.css': 'sass/styles.scss'
                }
            }
        },
        watch: {
            styles: {
                files: ['sass/*.scss'],
                tasks: ['sass', 'autoprefixer']
            }
        }
    });
    grunt.loadNpmTasks('grunt-autoprefixer');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-sass');

    grunt.registerTask('default', ['sass', 'autoprefixer']);
};
