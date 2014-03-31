module.exports = function(grunt) {
  //grunt plugins
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-recess');
  
  //config
  grunt.initConfig({
    connect: {
      server: {
        options: {
          host: 'localhost',
          port: 9999,
          base: 'dist',
          open: {
            target: 'http://localhost:9999'
          }
        }
      }
    },

    concat: {
      funnel: {
        src: ['src/js/funnel/**/*.*'],
        dest: 'dist/BarChartHTML.js'
      },
      app: {
        src: ['src/js/app/**/*.*'],
        dest: 'dist/app.js'
      }
    },

    recess: {
      less: {
        options: { compile: true },
        src: ['src/less/viz.less'],
        dest: 'dist/BarChartHTML.css'
      }
    },

    watch: {
      css: {
        files: ['src/**/*.*', 'dist/index.html'],
        tasks: ['recess:less', 'concat'],
        options: {
          livereload: {
            port: 9001,
            // keepalive: true,
            // you can pass in any other options you'd like to the https server, as listed here: http://nodejs.org/api/tls.html#tls_tls_createserver_options_secureconnectionlistener
          }
        }
      }
    }
  });

  grunt.registerTask('server', [
    'connect:server',
    'watch',
    ]);
}