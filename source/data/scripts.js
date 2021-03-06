const data = require('./index')

/**
 * Data to be compiled to a JSON file `scripts.js` by a Grunt task
 * Later this data can be imported in `source/scripts` via
 * `import data from '@data'`
 * Try to keep footprint of this file as small as possible
 * to avoid bloating built frontend `main.js` file.
 * @param {function} grunt Grunt instance
 * @return {object} Data for frontend scripts
 */
module.exports = (grunt) => {
  const {
    PATH: {
      file: {
        serviceWorker
      }
    },
    SITE: {
      name,
      version,
      locales,
      baseLocale
    },
    ENV: {
      build,
      buildSHA1,
      buildNumber,
      staging,
      production
    }
  } = data(grunt)()

  return {
    PATH: {
      file: {
        serviceWorker
      }
    },
    SITE: {
      name,
      version,
      locales,
      baseLocale
    },
    ENV: {
      build,
      buildSHA1,
      buildNumber,
      staging,
      production
    }
  }
}
