//
// Components TabTrapEvent JS.
// @version 3.0.0
// -------------------------

import EscapeKeyEvent from './escapekeyevent.js'

/**
 * @param {HTMLElement} root 
 */
export default class TabTrapEvent extends EscapeKeyEvent {

  /**
   * @returns {string}
   */
  static get defaults() {
    return [
      'a[href]',
      'area[href]',
      'input:not([disabled])',
      'select:not([disabled])',
      'textarea:not([disabled])',
      'button:not([disabled])',
      '[tabindex="0"]'
    ].join(',')
  }

  /**
   * @param {HTMLElement} root 
   */
  constructor(root) {
    super(root)

    /** @type {NodeListOf<Element> | void} */
    this.focusable = this.root.querySelectorAll(TabTrapEvent.defaults) || null
    /** @type {HTMLElement | void} */
    this.firstFocusable = this.focusable[0] || null
    /** @type {HTMLElement | void} */
    this.lastFocusable = this.focusable[this.focusable.length - 1] || null
  }

  /**
   * @param {HTMLElement | boolean} findFocus
   * @returns {boolean}
   */
  hasFocusWithIn(findFocus = false) {
    if ( ! findFocus) return false
    /** @type {HTMLElement} */
    const hasFocus = this.root.querySelector(':focus')
    return findFocus.contains(hasFocus)
  }

  /**
   * @param {Event} event 
   * @returns {boolean | void}
   */
  tabFocusableElements(event) {
    /** @type {{ key: string, keyCode: number }} */
    const { key, keyCode } = event

    if (
      key !== 'Tab' ||
      keyCode !== 9 ||
      this.focusable.length === 1
    ) return false

    /** @type {Element} */
    const activeElement = document.activeElement

    if (event.shiftKey) {
      if (activeElement === this.firstFocusable) {
        event.preventDefault()
        this.lastFocusable.focus()
      }
    } else {
      if (activeElement === this.lastFocusable) {
        event.preventDefault()
        this.firstFocusable.focus()
      }
    }
  }

}
