//
// Components Trigger Event JS.
// @version 3.0.0
// -------------------------

/**
 * @param {HTMLElement} root 
 */
export default class TriggerEvent {

  /**
   * @param {HTMLElement} root 
   */
  constructor(root) {
    /** @type {HTMLElement} */
    this.root = root
  }

  /**
   * @param {{ typeArg: string, eventInitDict?: CustomEventInit<any> }} args
   * @returns {boolean}
   */
  triggerEvent(...args) {
    return this.root.dispatchEvent(
      new CustomEvent(args)
    )
  }
}
