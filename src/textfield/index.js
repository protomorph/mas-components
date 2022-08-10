//
// Components Textfield JS.
// @version 3.0.0
// -------------------------

import InputEvent from '../events/inputevent.js'

/**
 * @param {HTMLElement} root 
 */
export default class Textfield extends InputEvent {

  /**
   * @param {HTMLElement} root
   */
  constructor(root) {
    super(root)

    this.root.dataset.type = this.input.type || this.name
  }

  /**
   * @returns {string}
   */
  get name() {
    return 'textfield'
  }

}
