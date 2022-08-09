//
// Components Appbar JS.
// @version 3.0.0
// -------------------------

import TriggerEvent from '../events/triggerevent.js'

/** @type {number} */
const MAX_APPBAR_HEIGHT = 168

/**
 * @param {HTMLElement} root 
 */
export default class Appbar extends TriggerEvent {

  /**
   * @param {HTMLElement} root 
   */
  constructor(root) {
    super(root)

    /** @type {boolean} */
    this.scrolled_ = false
    /** @type {boolean} */
    this.wasDocked_ = true
    /** @type {HTMLButtonElement} */
    this.menuButton_ = this.root.querySelector('[data-toggle="collapse"]')
    /** @type {Element.clientHeight} */
    this.appbarHeight_ = this.appbarHeight
    /** @type {boolean} */
    this.isDockedShowing_ = true
    /** @type {number} */
    this.resizeThrottleId_ = 0
    /** @type {number} */
    this.resizeDebounceId_ = 0
    /** @type {number} */
    this.lastScrollPosition_ = window.pageYOffset
    /** @type {number} */
    this.currentAppBarOffsetTop_ = 0
    /** @type {boolean} */
    this.isCurrentlyBeingResized_ = false

    /** @type {() => void} */
    this.scrollEventHandler_ = () => this.scrollHandler()
    /** @type {() => void} */
    this.resizeEventHandler_ = () => this.throttleResizeHandler()

    /** @type {(event: Event) => void} */
    const hideMenuOnClick = event => {
      if (
        event.target !== this.menuButton_ &&
        event.target.parentElement !== this.menuButton_
      ) this.menuCloseHandler()
    }

    document.addEventListener('click', hideMenuOnClick)
    window.addEventListener('scroll', this.scrollEventHandler_)
    window.addEventListener('resize', this.resizeEventHandler_)
  }

  /**
   * @returns {Element.clientHeight} 
   */
  get appbarHeight() {
    return this.root.clientHeight
  }

  /**
   * @returns {boolean} 
   */
  get menuIsOpen() {
    return this.menuButton_ && this.menuButton_.getAttribute('aria-expanded') === 'true'
  }

  /**
   * @returns {boolean} 
   */
  appbarOnScreen() {
    const offscreenBoundaryTop = -this.appbarHeight_
    const hasAnyPixelsOffscreen = this.currentAppBarOffsetTop_ < 0
    const hasAnyPixelsOnscreen = this.currentAppBarOffsetTop_ > offscreenBoundaryTop
    const partiallyShowing = hasAnyPixelsOffscreen && hasAnyPixelsOnscreen

    if (partiallyShowing) {
      this.wasDocked_ = false
    } else {
      if ( ! this.wasDocked_) {
        this.wasDocked_ = true
        return true
      } else if (this.isDockedShowing_ !== hasAnyPixelsOnscreen) {
        this.isDockedShowing_ = hasAnyPixelsOnscreen
        return true
      }
    }

    return partiallyShowing
  }

  /**
   * @returns {void} 
   */
  menuCloseHandler() {
    this.menuButton_.dispatchEvent(
      new Event('collapsible:close')
    )
  }

  /**
   * @returns {void} 
   */
  moveAppbar() {
    if (this.appbarOnScreen()) {
      let offset = this.currentAppBarOffsetTop_

      if (Math.abs(offset) >= this.appbarHeight_)
        offset = -MAX_APPBAR_HEIGHT

      this.root.style.transform = `translateY(${offset}px)`

      if (this.menuIsOpen) this.menuCloseHandler()
    }
  }

  /**
   * @returns {void} 
   */
  resizeHandler() {
    const currentHeight = this.appbarHeight

    if (this.appbarHeight_ !== currentHeight) {
      this.wasDocked_ = false

      this.currentAppBarOffsetTop_ -= this.appbarHeight_ - currentHeight
      this.appbarHeight_ = currentHeight
    }

    this.scrollHandler()
  }

  /**
   * @returns {void} 
   */
  scrollHandler() {
    const currentScrollPosition = Math.max(window.pageYOffset, 0)
    const diff = currentScrollPosition - this.lastScrollPosition_
    let scroll = window.pageYOffset
    this.lastScrollPosition_ = currentScrollPosition

    if ( ! this.isCurrentlyBeingResized_) {
      this.currentAppBarOffsetTop_ -= diff

      if (this.currentAppBarOffsetTop_ > 0)
        this.currentAppBarOffsetTop_ = 0
      else if (Math.abs(this.currentAppBarOffsetTop_) > this.appbarHeight_)
        this.currentAppBarOffsetTop_ = -this.appbarHeight_

      if (scroll <= 0) {
        if (this.scrolled_)
          this.scrolled_ = false
      } else {
        if ( ! this.scrolled_)
          this.scrolled_ = true
      }

      this.moveAppbar()
    }
  }

  /**
   * @returns {void} 
   */
  throttleResizeHandler() {
    if ( ! this.resizeThrottleId_) {
      this.resizeThrottleId_ = window.setTimeout(() => {
        this.resizeThrottleId_ = 0
        this.resizeHandler()
      }, 100)
    }

    this.isCurrentlyBeingResized_ = true

    if (this.resizeDebounceId_)
      window.clearTimeout(this.resizeDebounceId_)

    this.resizeDebounceId_ = window.setTimeout(() => {
      this.resizeHandler()
      this.isCurrentlyBeingResized_ = false
      this.resizeDebounceId_ = 0
    }, 100)
  }

}
