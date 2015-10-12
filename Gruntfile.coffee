module.exports = (grunt)->
  grunt.initConfig
    pkg: grunt.file.readJSON('package.json')
    bower:
      install :
        options :
          targetDir : 'vendor/bower_components'
          layout : 'byComponent'
          verbose: true
          cleanup: true
    browserify :
      vendors :
        files :  'www/js/requires.js' : ['src/js/vendor_requirements.js'] 
    watch:
      coffee:
        files: ['src/js/**/*.coffee']
        tasks: ['coffee']
      browserfy:
        files: ['src/js/vendor_requirements.js']
        tasks: ['browserify:vendors']
    coffee:
      compile:
        files:
          'www/js/scripts.js': ['src/js/**/*.coffee'] # compile and concat into single file
  grunt.loadNpmTasks 'grunt-bower-task'
  grunt.loadNpmTasks 'grunt-browserify'
  grunt.loadNpmTasks 'grunt-contrib-watch'
  grunt.loadNpmTasks 'grunt-contrib-coffee'
  grunt.registerTask 'default',['browserify:vendors','coffee','watch']
