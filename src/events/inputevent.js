//
// Components Input Event JS.
// @version 3.0.0
// -------------------------

import TriggerEvent from './triggerevent.js'

/**
 * @param {HTMLElement} root 
 */
export default class InputEvent extends TriggerEvent {

  /**
   * @param {HTMLElement} root
   */
  constructor(root) {
    super(root)

    /** @type {HTMLInputElement | HTMLTextAreaElement} */
    this.input = this.root.querySelector('input, textarea')

    if ( ! this.input) return

    this.root.dataset.focus = 'false'

    this.inputValueHandler(false)

    this.observeAttributesHandler()

    /** @type {(Event: event) => void} */
    this.blurEventHandler_ = event => this.blurHandler(event)
    /** @type {(Event: event) => void} */
    this.focusEventHandler_ = event => this.focusHandler(event)
    /** @type {(Event: event) => void} */
    this.inputEventHandler_ = event => this.inputValueHandler(event)

    this.input.addEventListener('blur', this.blurEventHandler_)
    this.input.addEventListener('focus', this.focusEventHandler_)
    this.input.addEventListener('input', this.inputEventHandler_)

    this.triggerEvent(`${this.name}:ready`, { detail: this.detail })
  }

  /**
   * @returns {{ disabled: boolean, readonly: boolean, value: unknown }}
   */
  get detail() {
    return {
      disabled: this.disabled,
      readonly: this.readonly,
      value: this.value
    }
  }

  /**
   * @returns {boolean}
   */
  get disabled() {
    return this.input.disabled
  }

  /**
   * @param {boolean} disabled
   */
  set disabled(disabled) {
    this.input.disabled = Boolean(disabled) ? true : false
  }

  /**
   * @returns {string}
   */
  get name() {
    return 'input'
  }

  /**
   * @returns {boolean}
   */
  get readonly() {
    return this.input.readOnly
  }

  /**
   * @returns {string | boolean}
   */
  get value() {
    return this.input.value
      && this.input.value !== ''
      ? this.input.value
      : false
  }

  /**
   * @param {unknown} value
   */
  set value(value) {
    this.input.value = value
  }

  /**
   * @param {Event} event
   * @returns {void}
   */
  blurHandler(event) {
    if (event.type !== 'blur') return

    this.triggerEvent(`${this.name}:blur`, { detail: this.detail })

    this.root.dataset.focus = 'false'

    this.inputValueHandler(event)
  }

  /**
   * @param {Event} event
   * @returns {void}
   */
  focusHandler(event) {
    if (event.type !== 'focus') return

    this.triggerEvent(`${this.name}:focus`, { detail: this.detail })

    this.root.dataset.focus = 'true'

    this.inputValueHandler(event)
  }

  /**
   * @param {Event} [event]
   * @returns {void}
   */
  inputValueHandler(event = false) {
    if (event && event.type === 'input')
      this.triggerEvent(`${this.name}:input`, { detail: this.detail })

    this.root.dataset.value = ! this.value ? 'false' : 'true'
  }

  /**
   * @returns {void}
   */
  observeAttributesHandler() {
    /**
     * @param {MutationRecord[]} mutation
     * @returns {void}
     */
    const observeAttribute = mutation => {
      /** @type {{ attributeName: string, target: Element }} */
      const { attributeName, target } = mutation

      if (attributeName === 'disabled')
        if (target[attributeName])
          this.root.dataset.disabled = target[attributeName]
        else
          this.root.removeAttribute('data-disabled')

      if (attributeName === 'readonly')
        if (target[attributeName])
          this.root.dataset.readonly = target[attributeName]
        else
          this.root.removeAttribute('data-readonly')

      if (attributeName)
        this.triggerEvent(`${this.name}:attributeUpdate`)
    }

    if (this.disabled)
      this.root.dataset.disabled = this.disabled

    if (this.readonly)
      this.root.dataset.readonly = this.readonly

    /** @type {MutationObserver} */
    this.observer_ = new MutationObserver(mutations =>
      mutations.forEach(observeAttribute)
    )

    this.observer_.observe(this.input, {
      attributes: true
    })
  }

}
