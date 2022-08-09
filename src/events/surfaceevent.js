//
// Components Surface Event JS.
// @version 3.0.0
// -------------------------

import TabTrapEvent from './tabtrapevent.js'

/**
 * @param {HTMLElement} root 
 */
export default class SurfaceEvent extends TabTrapEvent {

  /**
   * @param {HTMLElement} root 
   */
  constructor(root) {
    super(root)

    /** @type {HTMLElement} */
    this.backdrop = this.root.querySelector('[data-backdrop]')
    /** @type {HTMLButtonElement} */
    this.dismiss = this.root.querySelector('[data-dismiss]')
    /** @type {HTMLElement} */
    this.surface = this.root.querySelector('[data-surface]')

    /** @type {Element | void} */
    this.focusedBeforeOpen_ = null

    /** @type {() => void} */
    this.closeEventHandler_ = () => this.close()
    /** @type {(Event: event) => void} */
    this.tabKeyEventHandler_ = event => this.tabFocusableElements(event)
    /** @type {(Event: event) => void} */
    this.escapeKeyEventHandler_ = event => this.escapeKeyHandler(event, _ => this.close())

    this.root.setAttribute('aria-hidden', 'true')
    this.root.setAttribute('tabindex', '-1')

    this.root.dataset.visible = 'false'
    this.root.dataset.open = 'false'
  }

  /**
   * @returns {boolean}
   */
  get isOpen() {
    return this.root.dataset.open === 'true'
  }

  /**
   * @returns {string} 
   */
  get name() {
    return 'surface'
  }

  /**
   * @param {void | Event} [event]
   * @returns {void} 
   */
  close(event = null) {
    if ( ! this.isOpen) return

    if (event) event.preventDefault()

    this.root.dataset.visible = 'false'

    this.triggerEvent(`${this.name}:closing`)
  
    this.root.removeEventListener('keyup', this.escapeKeyEventHandler_)
    this.root.removeEventListener('keydown', this.tabKeyEventHandler_)
    this.backdrop.removeEventListener('click', this.closeEventHandler_)
    if (this.dismiss) this.dismiss.removeEventListener(
      'click', this.closeEventHandler_
    )

    /**
     * @returns {void}
     */
    const transitionEndEvent = () => {
      this.root.dataset.open = 'false'
      this.root.setAttribute('tabindex', '-1')
      this.root.setAttribute('aria-hidden', 'true')

      document.documentElement.style.overflowY = null

      if (this.focusedBeforeOpen_)
        this.focusedBeforeOpen_.focus()

      this.triggerEvent(`${this.name}:closed`)
    }

    this.backdrop.addEventListener(
      'transitionend', transitionEndEvent, { once: true }
    )
  }

  /**
   * @param {void | Event} [event]
   * @returns {void} 
   */
  open(event = null) {
    if (this.isOpen) return

    if (event) event.preventDefault()

    document.documentElement.style.overflowY = 'hidden'

    this.focusedBeforeOpen_ = document.activeElement

    /** @type {() => string} */
    let display = _ => window.getComputedStyle(this.root).display

    this.root.dataset.open = 'true'
    this.triggerEvent(`${this.name}:opening`)
    this.root.setAttribute('tabindex', '0')
    this.root.setAttribute('aria-hidden', 'false')
    display()
    this.root.dataset.visible = 'true'

    /**
     * @returns {void}
     */
    const transitionEndEvent = () => {
      this.root.addEventListener('keyup', this.escapeKeyEventHandler_)
      this.root.addEventListener('keydown', this.tabKeyEventHandler_)
      this.backdrop.addEventListener('click', this.closeEventHandler_)
      if (this.dismiss) this.dismiss.addEventListener(
        'click', this.closeEventHandler_
      )
      this.firstFocusable.focus()
      this.triggerEvent(`${this.name}:open`)
    }

    this.surface.addEventListener(
      'transitionend', transitionEndEvent, { once: true }
    )
  }

  /**
   * @param {void | Event} [event]
   * @returns {void}
   */
  toggle(event = null) {
    if (event) event.preventDefault()

    return ! this.isOpen ? this.open() : this.close()
  }

}
