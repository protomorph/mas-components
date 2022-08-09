//
// Templates.
// -------------------------

import nunjucks from 'nunjucks'

/**
 * @param {express} app
 * @param {string} directory
 * @param {string} [ext]
 * @export {nunjucks.Environment}
 */
export default function templates (app, directory, ext = 'html') {
  const env = nunjucks.configure(directory, {
    autoescape: false,
    express: app
  })

  env.addGlobal('year', new Date().getFullYear())

  app.set('view engine', ext)

  return env
}
