//
// Routes.
// -------------------------

import routeMap from './route-map.js'

/**
 * Expoted router.
 * @param {express.Router} router
 * @returns {express.Router}
 * @export {express.Router}
 */
export default function routes (router) {
  for (const route of routeMap)
    router.get(
      route.path, (_, res) => res.render(route.view, {
        pageTitle: route.name,
        menu: routeMap
      })
    )

  return router
}
