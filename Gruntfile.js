module.exports = function(grunt) {  
  require('jit-grunt')(grunt);


  grunt.initConfig({
    coffee: {
      compile: {
        files: {
          'ui/screens/Signup.coffee': 'ui/screens/Signup.coffee'
        },
        options: {
          bare: true
        }
      },
    },
    less: {
      development: {
        options: {
          compress: false,
          yuicompress: false,
          optimization: 2
        },
        files: {
          "ui/assets/styles/css/main.css": "ui/assets/styles/less/main.less" // destination file and source file
        }
      }
    },
    watch: {
      styles: {
        files: ['ui/assets/styles/less/**/*.less'], // which files to watch
        tasks: ['less'],
        options: {
          nospawn: true
        }
      },
      coffee: {
        files: ['ui/screens/Signup.coffee'],
        tasks: 'coffee',
        options: {
          bare: true
        }
      }
    }
  });

  grunt.registerTask('default', ['less', 'watch']);
  grunt.loadNpmTasks('grunt-contrib-coffee');
};