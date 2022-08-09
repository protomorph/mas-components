//
// Components Dialog JS.
// @version 3.0.0
// -------------------------

import SurfaceEvent from '../events/surfaceevent.js'

/**
 * @param {HTMLElement} root 
 */
export default class AlertDialog extends SurfaceEvent {

  /**
   * @param {HTMLElement} root 
   */
  constructor(root) {
    super(root)

    /** @type {HTMLButtonElement} */
    this.accept = this.root.querySelector('[data-action="accept"]')
    /** @type {HTMLButtonElement} */
    this.cancel = this.root.querySelector('[data-action="cancel"]')

    /** @type {() => void} */
    this.acceptClickHandler_ = () => this.triggerEvent(`${this.name}:accept`)
    /** @type {() => void} */
    this.cancelClickHandler_ = () => this.triggerEvent(`${this.name}:cancel`)

    /** @type {() => void} */
    const onOpen = () => {
      this.accept.addEventListener('click', this.acceptClickHandler_)
      this.cancel.addEventListener('click', this.cancelClickHandler_)
      this.backdrop.addEventListener('click', this.cancelClickHandler_)
    }

    /** @type {() => void} */
    const onClose = () => {
      this.accept.removeEventListener('click', this.acceptClickHandler_)
      this.cancel.removeEventListener('click', this.cancelClickHandler_)
      this.backdrop.removeEventListener('click', this.cancelClickHandler_)
    }

    this.root.addEventListener(`${this.name}:open`, onOpen)
    this.root.addEventListener(`${this.name}:closed`, onClose)
  }

  /**
   * @returns {string} 
   */
  get name() {
    return 'dialog'
  }

}
