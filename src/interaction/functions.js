//
// Components Interaction Functions JS.
// @version 3.0.0
// -------------------------

/**
 * @returns {{ container: HTMLSpanElement, stroke: HTMLSpanElement, fill: HTMLSpanElement }}
 */
export function createInteractionElement () {
  /** @type {HTMLSpanElement} */
  const container = document.createElement('span')
  /** @type {HTMLSpanElement} */
  const stroke = document.createElement('span')
  /** @type {HTMLSpanElement} */
  const fill = document.createElement('span')

  container.classList.add('interaction')
  stroke.classList.add('interaction__stroke')
  fill.classList.add('interaction__fill')

  container.setAttribute('aria-hidden', 'true')
  container.dataset.animation = 'off'
  container.dataset.pressed = 'false'

  container.appendChild(stroke)
  container.appendChild(fill)

  return { container, stroke, fill }
}
