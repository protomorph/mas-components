//
// Components Collapsible JS.
// @version 3.0.0
// -------------------------

import TriggerEvent from '../events/triggerevent.js'

/**
 * @param {HTMLElement} root 
 */
export default class Collapsible extends TriggerEvent {

  /**
   * @param {HTMLElement} root 
   */
  constructor(root) {
    super(root)

    /** @type {HTMLElement} */
    this.target = document.getElementById(root.dataset.target)

    if ( ! this.target) return false

    this.root.setAttribute('aria-controls', root.dataset.target)

    if (this.collapse && this.collapse === 'visible') {
      this.root.setAttribute('aria-expanded', 'true')
      this.target.setAttribute('aria-hidden', 'false')
    } else {
      if ( ! this.collapse)
        this.target.dataset.collapse = 'hidden'

      this.target.setAttribute('aria-hidden', 'true')
      this.root.setAttribute('aria-expanded', 'false')
    }

    /** @type {(event: Event) => void} */
    this.handler_ = e => this.toggle(e)
    /** @type {() => void} */
    this.closeHandler_ = () => this.close()

    this.root.addEventListener('click', this.handler_)
    this.root.addEventListener('collapsible:close', this.closeHandler_)

    /** @type {{ state: string, target: HTMLElement, toggle: HTMLElement }} */
    this.details = {
      state: this.collapse,
      target: this.target,
      toggle: this.root
    }

    this.triggerEvent('collapsible:ready', { details: this.details })
  }

  /**
   * @returns {string} 
   */
  get collapse() {
    return this.target.dataset.collapse
  }

  /**
   * @param {string} collapse
   * @returns {void} 
   */
  set collapse(collapse) {
    if (collapse === 'visible') this.open()
    else if (collapse === 'hidden') this.close()
  }

  /**
   * @returns {void} 
   */
  close() {
    if (this.collapse === 'hidden') return false

    /** @type {string} */
    this.target.dataset.collapse = 'hidden'
    /** @type {{ state: string, target: HTMLElement, toggle: HTMLElement }} */
    this.details = {
      state: this.collapse,
      target: this.target,
      toggle: this.root
    }

    this.triggerEvent('collapsible:closing', { details: this.details })
    this.target.setAttribute('aria-hidden', 'true')
    this.root.setAttribute('aria-expanded', 'false')
    this.transitionEnd_(_ => this.triggerEvent('collapsible:closed', { details: this.details }))
  }

  /**
   * @returns {void} 
   */
  open() {
    if (this.collapse === 'visible') return false

    /** @type {string} */
    this.target.dataset.collapse = 'visible'
    /** @type {{ state: string, target: HTMLElement, toggle: HTMLElement }} */
    this.details = {
      state: this.collapse,
      target: this.target,
      toggle: this.root
    }

    this.triggerEvent('collapsible:opening', { details: this.details })
    this.root.setAttribute('aria-expanded', 'true')
    this.target.setAttribute('aria-hidden', 'false')
    this.transitionEnd_(_ => this.triggerEvent('collapsible:open', { details: this.details }))
  }

  /**
   * @param {Event} event
   * @returns {void} 
   */
  toggle(event) {
    if (event) event.preventDefault()

    this.collapse = this.collapse !== 'hidden' ? 'hidden' : 'visible'
  }

  /**
   * @param {Function} callback
   * @returns {void} 
   */
  transitionEnd_(callback) {
    this.target.addEventListener('transitionend', callback, { once: true })
  }

}
