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
        imagemin: {                          // Task
          dynamic: {                         // Another target
            files: [{
              expand: true,                  // Enable dynamic expansion
              cwd: 'images/',                   // Src matches are relative to this path
              src: ['**/*.{png,jpg,gif}'],   // Actual patterns to match
              dest: 'images/'                  // Destination path prefix
            }]
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
    grunt.loadNpmTasks('grunt-contrib-imagemin');

    grunt.registerTask('default', ['sass', 'autoprefixer', 'imagemin']);
};
