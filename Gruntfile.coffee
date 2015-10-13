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
    concat:
      dist:
        src: ['src/js/pre-compiled/**.js'],
        dest: 'www/js/built.js',
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
      haml:
        files: ['src/js/**/*.hamlc']
        tasks: ['haml:compile']
      concat:
        files: ['src/js/pre-compiled/*.js']
        tasks: ['concat:dist']
    coffee:
      compile:
        files:
          'src/js/pre-compiled/scripts.js': ['src/js/**/*.coffee'] # compile and concat into single file
    haml:
      compile:
        options:
          includePath: true
          pathRelativeTo: "./src/js/"
          language: 'coffee'
          target: 'js'
        files:
          'src/js/pre-compiled/_templates.js': ['src/js/**/*.hamlc']

  grunt.loadNpmTasks 'grunt-bower-task'
  grunt.loadNpmTasks 'grunt-browserify'
  grunt.loadNpmTasks 'grunt-contrib-watch'
  grunt.loadNpmTasks 'grunt-contrib-coffee'
  grunt.loadNpmTasks 'grunt-haml'
  grunt.loadNpmTasks 'grunt-contrib-concat'
  grunt.registerTask 'default',['haml','browserify:vendors','coffee','concat','watch']
