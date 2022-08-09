//
// Errors.
// -------------------------

/**
 * @param {express.Request} req
 * @param {express.Response} res
 * @return {void}
 */
export function pageNotFound (req, res) {
  res.status(400)
  res.render('404', {
    pageTitle: '404: Page not Found!'
  })
}

/**
 * @param {express.Error} error
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.Next} next
 * @return {void}
 */
export function serverError (error, req, res, next) {
  res.status(500)
  res.render('500', {
    error,
    pageTitle: '500: Internal Server Error!'
  })
}
