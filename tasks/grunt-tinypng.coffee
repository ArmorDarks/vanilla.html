###
Tiny PNG
https://github.com/marrone/grunt-tinypng
Image optimization via tinypng service
###
module.exports = ->
  @config 'tinypng',
    build:
      options:
        apiKey: 'YOUR_API_KEY_HERE'
        checkSigs: true
        sigFile: '<%= file.build.sprite.hash %>'
        summarize: true
        showProgress: true
        stopOnImageError: true
      files: [
        src: '<%= file.build.sprite.compiled %>'
        dest: '<%= file.build.sprite.compiled %>'
      ]