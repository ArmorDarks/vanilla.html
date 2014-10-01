###
SCSS-Lint
https://github.com/ahmednuaman/grunt-scss-lint
Lint .scss files
###
module.exports = ->
  @config 'scsslint',
    files: [ '<%= path.source.styles %>/{,**/}*.scss' ]
    options:
      compact: true