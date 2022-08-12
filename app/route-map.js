//
// Route map.
// -------------------------

/** @type {{ name: string, path: string, view: string, menu: boolean }[]} */
const routeMap = [
  {
    name: 'Home',
    path: '/',
    view: 'index',
    menu: false
  },
  {
    name: 'Button',
    path: '/button',
    view: 'components/button',
    menu: true,
    type: 'component'
  },
  {
    name: 'Card',
    path: '/card',
    view: 'components/card',
    menu: true,
    type: 'component'
  },
  {
    name: 'Chip',
    path: '/chip',
    view: 'components/chip',
    menu: true,
    type: 'component'
  },
  {
    name: 'Colors',
    path: '/helper/colors',
    view: 'components/helper/colors',
    menu: false,
    type: 'helper'
  },
  {
    name: 'Dialog',
    path: '/dialog',
    view: 'components/dialog',
    menu: true,
    type: 'component'
  },
  {
    name: 'Elevation',
    path: '/helper/elevation',
    view: 'components/helper/elevation',
    menu: false,
    type: 'helper'
  },
  {
    name: 'Presentation',
    path: '/components/presentation',
    view: 'components/presentation/index',
    menu: true,
    type: 'component'
  },
  {
    name: 'Presentation Article',
    path: '/components/presentation/article',
    view: 'components/presentation/article',
    menu: false,
    type: 'layout'
  },
  {
    name: 'Presentation Banner',
    path: '/components/presentation/banner',
    view: 'components/presentation/banner',
    menu: false,
    type: 'layout'
  },
  {
    name: 'Presentation Highlight',
    path: '/components/presentation/highlight',
    view: 'components/presentation/highlight',
    menu: false,
    type: 'layout'
  },
  {
    name: 'Slider',
    path: '/slider',
    view: 'components/slider',
    menu: true,
    type: 'component'
  },
  {
    name: 'Textfield',
    path: '/textfield',
    view: 'components/textfield',
    menu: true,
    type: 'component'
  }
]

export default routeMap
