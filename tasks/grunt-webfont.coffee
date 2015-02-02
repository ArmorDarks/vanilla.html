###
SVG to webfont converter for Grunt
https://github.com/sapegin/grunt-webfont
Generate custom icon webfonts from SVG files
###
module.exports = ->
  @config 'webfont',
    icons:
      src: '<%= path.source.icons %>/{,**/}*.svg'
      dest: '<%= path.build.fonts %>/'
      destCss: '<%= path.temp.styles %>'
      options:
        hashes: false
        styles: ''
        templateOptions:
          baseClass: 'icon'
          classPrefix: 'icon--'
        stylesheet: 'scss'
        # relativeFontPath: '<%= path.build.fonts %>/'
        htmlDemo: false
        engine: 'node'