###
Watch
https://github.com/gruntjs/grunt-contrib-watch
Watches scss, js etc for changes and compiles them
###
module.exports = ->
  @config 'watch',
    scss:
      files: ['<%= path.source.sass %>/**/*.scss']
      tasks: [
        'sass'
        'autoprefixer'
      ]
    sprite:
      files: ['<%= path.source.sprites %>/*.png']
      tasks: ['sprite']