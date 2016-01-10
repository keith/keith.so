module.exports = function(grunt) {
  grunt.initConfig({
    bower: {
      install: {
        options: {
          targetDir: 'bower_components',
          copy: false
        }
      }
    },

    copy: {
      main: {
        files: [
          {
            src: 'bower_components/normalize-css/normalize.css',
            dest: 'sass/_normalize.scss'
          },
          {
            src: '*.html',
            dest: 'build/'
          },
          {
            src: 'CNAME',
            dest: 'build/'
          },
          {
            src: '*.asc',
            dest: 'build/'
          },
          {
            src: 'robots.txt',
            dest: 'build/',
          },
          {
            src: 'favicon.*',
            dest: 'build/'
          }
        ]
      }
    },

    sass: {
      main: {
        options: {
          style: 'compressed'
        },
        files: {
          'build/css/main.css': 'sass/main.scss'
        }
      }
    },

    watch: {
      files: ['*.html', 'sass/*'],
      tasks: ['default']
    },

    gitDir: "gh-pages",
    shell: {
      clone: {
        command: 'git clone --branch gh-pages https://github.com/Keithbsmiley/keith.so.git <%= gitDir %>'
      },
      empty: {
        command: 'rm -rf <%= gitDir %>/*'
      },
      move: {
        command: 'mv build/* <%= gitDir %>'
      },
      commit: {
        command: 'cd <%= gitDir %>; git add --all; git commit -m "`date`"; true'
      },
      push: {
        command: 'cd <%= gitDir %>; git push'
      },
      clean: {
        command: 'rm -rf <%= gitDir %>'
      }
    }
  });

  grunt.loadNpmTasks('grunt-bower-task');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-shell');

  grunt.registerTask('default', ['bower', 'copy', 'sass']);
  grunt.registerTask('deploy', ['default', 'shell']);
};
