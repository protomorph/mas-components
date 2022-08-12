//
// Components Slider JS.
// @version 3.0.0
// -------------------------

import TriggerEvent from '../events/triggerevent.js'

/**
 * @param {HTMLElement} root 
 */
export default class Slider extends TriggerEvent {

  /**
   * @param {HTMLElement} root 
   */
  constructor(root) {
    super(root)

    if ( ! this.root) return

    /** @type {HTMLInputElement} */
    this.input = this.root.querySelector('[type="range"]')
    /** @type {HTMLElement} */
    this.pin = this.root.querySelector('.slider__pin')
    /** @type {HTMLElement} */
    this.marker = this.root.querySelector('.slider__marker')
    /** @type {HTMLElement} */
    this.runnable = this.root.querySelector('.slider__runnable')
    /** @type {number} */
    this.fontSize = Number(window.getComputedStyle(document.documentElement).fontSize.match(/\d+/)[0])

    /** @type {(_: Event) => void} */
    this.inputHandler = _ => this.valueInputHandler(_)
    /** @type {() => void} */
    this.resizeHandler = _ => this.updateRunnableAndMarkerPositions()

    this.root.setAttribute('aria-valuemin', this.input.min)
    this.root.setAttribute('aria-valuemax', this.input.max)
    this.root.setAttribute('aria-valuenow', this.input.value)

    this.valueInputHandler(null)

    this.input.addEventListener('input', this.inputHandler)

    window.addEventListener(
      'resize', _ => window.setTimeout(this.resizeHandler, 150)
    )
  }

  /**
   * @returns {{ input: HTMLInputElement, root: HTMLElement, max: input, min: input, value: input }}
   */
  get detail() {
    /** @type {{ input: HTMLInputElement, root: HTMLElement }} */
    const { input, root } = this
    /** @type {{ max: number, min: number, value: number }} */
    const { max, min, value } = input

    return {
      input, root,
      max, min, value
    }
  }

  /**
   * @returns {void}
   */
  updateRunnableAndMarkerPositions() {
    /** @type {{ max: number, min: number, value: number }} */
    const { max, min, value } = this.input
    /** @type {number} */
    const root = this.root.offsetWidth
    /** @type {number} */
    const width = this.marker.offsetWidth
    /** @type {float} */
    const runnable = (value - min) / (max - min)
    /** @type {float} */
    const marker = runnable * (root - width) / this.fontSize

    this.marker.style.setProperty('--slider-marker', `${marker}rem`)
    this.runnable.style.setProperty('--slider-runnable', runnable)

    this.triggerEvent('slider:update', { detail: this.detail })
  }

  /**
   * @param {void | Event} [event]
   * @returns {void}
   */
  valueInputHandler(event = false) {
    /** @type {{ value: number }} */
    const { value } = this.input

    this.updateRunnableAndMarkerPositions()

    this.pin.setAttribute('data-value', value)
    this.root.setAttribute('aria-valuenow', value)

    if ( ! event || ! event.type) return

    this.triggerEvent('slider:input', { detail: this.detail })
  }

}
