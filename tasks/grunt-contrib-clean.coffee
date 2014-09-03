###
Clean
https://github.com/gruntjs/grunt-contrib-clean
Clean folders to start fresh
###
module.exports = ->
  @config 'clean',
    build:
      src: '<%= path.build.root %>/*'
    styles:
      src: ['<%= path.build.styles %>/*', '!<%= file.build.style.min %>']