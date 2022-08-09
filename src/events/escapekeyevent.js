//
// Components Escape Key Event JS.
// @version 3.0.0
// -------------------------

import TriggerEvent from './triggerevent.js'

/**
 * @param {HTMLElement} root 
 */
export default class EscapeKeyEvent extends TriggerEvent {

  /**
   * @param {Event} event
   * @param {Function} callback
   * @returns {boolean}
   */
  escapeKeyHandler(event, callback) {
    /** @type {{ key: string, keyCode: number }} */
    const { key, keyCode } = event

    if (
      key === 'Escape' ||
      keyCode === 27
    ) return callback()
  }
}
