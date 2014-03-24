module.exports = function(grunt) {
  //grunt plugins
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-connect');
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

    recess: {
      less: {
        options: { compile: true },
        src: ['src/less/viz.less'],
        dest: 'dist/viz.css'
      }
    },

    watch: {
      css: {
        files: ['src/less/**/*.less', 'dist/index.html'],
        tasks: ['recess:less'],
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