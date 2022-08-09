//
// Components Drawer JS.
// @version 3.0.0
// -------------------------

import SurfaceEvent from '../events/surfaceevent.js'

/**
 * @param {HTMLElement} root 
 */
export default class Drawer extends SurfaceEvent {

  /**
   * @returns {string} 
   */
  get name() {
    return 'drawer'
  }

}
