//
// Components Interaction JS.
// @version 3.0.0
// -------------------------

import TriggerEvent from '../events/triggerevent.js'
import { createInteractionElement } from './functions.js'
import {
  EndNames, StartNames, EventCodes,
  EventKeys, EventKeyCodes
} from './constants.js'

/**
 * @param {HTMLElement} root 
 */
export default class InteractionElement extends TriggerEvent {

  /**
   * @param {HTMLElement} root 
   */
  constructor(root) {
    super(root)

    /** @type {boolean|void} */
    this.isKey = null

    /** @type {boolean} */
    this._animationIsRunning = false

    const { container, stroke, fill } = createInteractionElement()

    /** @type {HTMLSpanElement} */
    this._container = container
    /** @type {HTMLSpanElement} */
    this._stroke = stroke
    /** @type {HTMLSpanElement} */
    this._fill = fill

    this.root.appendChild(this._container)

    this._animationStartEventHandler = event => this.animateEventSart_(event)

    StartNames.forEach(
      type => this.root.addEventListener(
        type, this._animationStartEventHandler, false
      )
    )
  }

  /**
   * @param {Event} event
   * @returns {void}
   */
  animateEventSart_(event) {
    if (
      this._animationIsRunning ||
      this.checkKeyEvent_(event)
    ) return false

    this.isKey = event.type === 'keydown'

    this.triggerEvent('interactive:animateStart')

    this.animateIn_()

    const mouseUpOrLeave = () => {
      this._container.dataset.pressed = 'false'

      if (
        this._container.dataset.animation === 'off'
      ) this.animateOut_()

      EndNames.forEach(
        type => this.root.removeEventListener(type, mouseUpOrLeave)
      )
    }

    EndNames.forEach(
      type => this.root.addEventListener(type, mouseUpOrLeave)
    )
  }

  /**
   * @returns {void}
   */
  animateIn_() {
    this._container.dataset.animation = 'on'
    this._container.dataset.pressed = 'true'
    this._container.dataset.in = 'true'

    this._animationIsRunning = true

    this.triggerEvent('interactive:animateInStart')

    this._fill.addEventListener(
      'animationend',
      () => this.animateInEnded_(),
      { once: true }
    )
  }

  /**
   * @returns {void}
   */
  animateInEnded_() {
    this._container.dataset.animation = 'off'

    this.triggerEvent('interactive:animateInEnd')

    if (
      this._container.dataset.pressed === 'false'
    ) this.animateOut_()
  }

  /**
   * @returns {void}
   */
  animateOut_() {
    this._container.dataset.in = 'false'
    this._container.dataset.out = 'true'

    this.triggerEvent('interactive:animateOutStart')

    this._stroke.addEventListener(
      'animationend',
      () => this.animateOutEnded_(),
      { once: true }
    )
  }

  /**
   * @returns {void}
   */
  animateOutEnded_() {
    this.triggerEvent('interactive:animateOutEnd')

    this._container.dataset.out = 'false'

    this._animationIsRunning = false

    this.triggerEvent('interactive:animateEnd')
  }

  /**
   * @param {Event} event
   * @returns {boolean}
   */
  checkKeyEvent_(event) {
    /** @type {{ code: string, key: string, keyCode: number }} */
    const { code, key, keyCode } = event

    if (event.type !== 'keydown')
      return false

    if (
      ! EventKeys.includes(key) ||
      ! EventCodes.includes(code) ||
      ! EventKeyCodes.includes(keyCode)
    ) return true
  }

}
