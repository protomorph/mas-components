//
// Components RippleInteraction JS.
// @version 3.0.0
// -------------------------

import InteractionElement from './interaction.js'
import { StartNames } from './constants.js'

/**
 * @param {HTMLElement} root
 * @param {boolean} [bound]
 */
export default class RippleInteractionElement extends InteractionElement {

  /**
   * @param {HTMLElement} root
   * @param {boolean} [bound]
   */
  constructor(root, bound = false) {
    super(root)

    /** @type {boolean} */
    this.bound = bound || this.root.dataset.bound === 'true' || false
    /** @type {boolean} */
    this.ripple = this.root.dataset.interaction === 'ripple' || false

    if ( ! this.ripple) return

    this.setRippleDimensions_()

    this._ripplePositionHandler = event => this.setRipplePosition_(event)

    StartNames.forEach(
      type => this.root.addEventListener(
        type, this._ripplePositionHandler, false
      )
    )
  }

  /**
   * @param {Event} event
   * @returns {{ x: number, y: number }}
   */
  getClickPosition_(event)  {
    const root = this.root.getBoundingClientRect()

    /** @type {number} */
    let x
    /** @type {number} */
    let y

    if (this.bound || this.isKey) {
      x = root.width / 2
      y = root.height / 2
    } else {
      event = event.type === 'mousedown' ?
              event : event.touches[0]

      x = event.clientX - root.left
      y = event.clientY - root.top
    }

    return { x, y }
  }

  /**
   * @returns {void}
   */
  setRippleDimensions_() {
    /** @type {{ height: number, width: number }} */
    const { height, width } = this.root.getBoundingClientRect()
    /** @type {number} */
    const dimension = Math.max(height, width)
    /** @type {number} */
    const hypotenuse = Math.sqrt((height * height) + (width * width))
    /** @type {number} */
    const maxRadius = this.bound || this.isKey ? dimension : hypotenuse

    /** @type {number} */
    const size = Math.round(dimension * 0.1)
    /** @type {number} */
    const scale = this.bound || this.isKey ? maxRadius / size * 1.1 : maxRadius / size * 2.1

    this._container.style.setProperty(
      '--interaction-scale', scale
    )
    this._container.style.setProperty(
      '--interaction-size', `${size}px`
    )
    this._container.style.setProperty(
      '--interaction-offset', `-${size / 2}px`
    )
  }

  /**
   * @param {Event} event
   * @returns {void}
   */
  setRipplePosition_(event) {
    this.isKey = event.type === 'keydown'

    /** @type {{ x: number, y: number }} */
    const { x, y } = this.getClickPosition_(event)

    if ( ! x && ! y) return false

    this._container.style.setProperty(
      '--interaction-block-start', `${y}px`
    )
    this._container.style.setProperty(
      '--interaction-inline-start', `${x}px`
    )

    this.setRippleDimensions_()
  }

}
