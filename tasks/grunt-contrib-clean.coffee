###
Clean
https://github.com/gruntjs/grunt-contrib-clean
Clean folders to start fresh
###
module.exports = ->
  @config 'clean',
    build:
      files:
        src: [
          '<%= path.temp.root %>/*'
          '<%= path.build.root %>/*'
        ]
    styles:
      files:
        src: [
          '<%= path.temp.root %>/*'
          '<%= path.build.styles %>/*'
          '!<%= file.build.style.min %>'
        ]