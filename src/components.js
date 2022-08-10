//
// Components JS
// @version 3.0.0
// -------------------------

import Appbar from './appbar/index.js'
import Drawer from './drawer/index.js'
import Textfield from './textfield/index.js'
import AlertDialog from './dialog/index.js'
import Collapsible from './collapsible/index.js'
import RippleInteractionElement from './interaction/ripple.js'

;(document => {

  document.querySelectorAll('[data-appbar]').forEach(
    e => new Appbar(e)
  )

  document.querySelectorAll('[data-dialog]').forEach(e => {
    let dialog = new AlertDialog(document.getElementById(e.dataset.dialog))
    e.addEventListener('click', _ => dialog.open(_))
  })

  document.querySelectorAll('[data-drawer]').forEach(e => {
    let drawer = new Drawer(document.getElementById(e.dataset.drawer))
    e.addEventListener('click', _ => drawer.toggle(_))
  })

  document.querySelectorAll('.textfield').forEach(
    e => new Textfield(e)
  )

  document.querySelectorAll('[data-toggle="collapse"]').forEach(
    e => new Collapsible(e)
  )

  document.querySelectorAll('[data-interaction]').forEach(
    e => new RippleInteractionElement(e)
  )

})(document)
