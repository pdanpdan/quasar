import { client } from '../plugins/Platform.js'

export function validatePosition (pos) {
  const parts = pos.split(' ')
  if (parts.length !== 2) {
    return false
  }
  if ([ 'top', 'center', 'bottom' ].includes(parts[0]) !== true) {
    console.error('Anchor/Self position must start with one of top/center/bottom')
    return false
  }
  if ([ 'left', 'middle', 'right', 'start', 'end' ].includes(parts[1]) !== true) {
    console.error('Anchor/Self position must end with one of left/middle/right/start/end')
    return false
  }
  return true
}

export function validateOffset (val) {
  if (val !== true) { return true }
  if (val.length !== 2) { return false }
  if (typeof val[0] !== 'number' || typeof val[1] !== 'number') {
    return false
  }
  return true
}

const horizontalPos = {
  'start#ltr': 'left',
  'start#rtl': 'right',
  'end#ltr': 'right',
  'end#rtl': 'left'
}

;[ 'left', 'middle', 'right' ].forEach(pos => {
  horizontalPos[`${pos}#ltr`] = pos
  horizontalPos[`${pos}#rtl`] = pos
})

const SIDE_SPACE = 4 // how many pixels to reserve on the edge

export function parsePosition (pos, rtl) {
  const parts = pos.split(' ')
  return {
    vertical: parts[0],
    horizontal: horizontalPos[`${parts[1]}#${rtl === true ? 'rtl' : 'ltr'}`]
  }
}

export function validateCover (val) {
  if (val === true || val === false) { return true }
  return validatePosition(val)
}

function isFixedPositioned (el) {
  while (el && el !== document) {
    if (window.getComputedStyle(el).position === 'fixed') {
      return true
    }
    el = el.parentNode
  }

  return false
}

export function getAnchorProps (el, offset) {
  let { top, left, right, bottom, width, height } = el.getBoundingClientRect()

  if (width === 0) {
    width = el.offsetWidth
  }
  if (height === 0) {
    height = el.offsetHeight
  }

  if (offset !== void 0) {
    left -= offset[0]
    right += offset[0]
    top -= offset[1]
    bottom += offset[1]
  }

  return {
    left,
    middle: left + (right - left) / 2,
    right,

    top,
    center: top + (bottom - top) / 2,
    bottom,

    leftRev: right,
    middleRev: left + (right - left) / 2,
    rightRev: left,

    topRev: bottom,
    centerRev: top + (bottom - top) / 2,
    bottomRev: top,

    width,
    height
  }
}

export function getTargetProps (el) {
  let { width, height } = el.getBoundingClientRect()

  if (width === 0) {
    width = el.offsetWidth
  }
  if (height === 0) {
    height = el.offsetHeight
  }

  return {
    width,
    height
  }
}

// cfg: { el, anchorEl, anchorOrigin, selfOrigin, offset, absoluteOffset, cover, fit, maxHeight, maxWidth }
export function setPosition (cfg) {
  let anchorProps, elStyle

  // scroll position might change if max-height/-width changes
  // so we need to restore it after we calculate the new positioning
  const
    extEl = cfg.el,
    fixedPositioned = isFixedPositioned(cfg.anchorEl),
    intEl = extEl.children[0],
    { scrollLeft, scrollTop } = intEl,
    anchorOrigin = { ...cfg.anchorOrigin },
    selfOrigin = { ...cfg.selfOrigin },
    viewport = fixedPositioned === true && client.is.ios === true && window.visualViewport !== void 0
      ? window.visualViewport
      : { offsetLeft: 0, offsetTop: 0 },
    vpLeft = fixedPositioned === true ? viewport.offsetLeft : window.scrollX,
    vpTop = fixedPositioned === true ? viewport.offsetTop : window.scrollY,
    vpWidth = document.documentElement[fixedPositioned === true ? 'clientWidth' : 'scrollWidth'],
    vpHeight = document.documentElement[fixedPositioned === true ? 'clientHeight' : 'scrollHeight']

  if (cfg.absoluteOffset === void 0) {
    anchorProps = getAnchorProps(cfg.anchorEl, cfg.cover === true ? [0, 0] : cfg.offset)
  }
  else {
    const
      { top: anchorTop, left: anchorLeft } = cfg.anchorEl.getBoundingClientRect(),
      top = anchorTop + (cfg.cover === true ? 0 : cfg.absoluteOffset.top),
      left = anchorLeft + (cfg.cover === true || cfg.fit === true ? 0 : cfg.absoluteOffset.left)

    anchorProps = {
      left,
      middle: left,
      right: left,

      top,
      center: top,
      bottom: top,

      leftRev: left,
      middleRev: left,
      rightRev: left,

      topRev: top,
      centerRev: top,
      bottomRev: top,

      width: 0,
      height: 0
    }
  }

  Object.assign(extEl.style, { maxWidth: null, maxHeight: null })

  elStyle = {
    minWidth: null,
    minHeight: null,
    maxWidth: cfg.maxWidth || null,
    maxHeight: cfg.maxHeight || null
  }

  if (cfg.fit === true || cfg.cover === true) {
    elStyle.minWidth = anchorProps.width + 'px'
    if (cfg.cover === true) {
      elStyle.minHeight = anchorProps.height + 'px'
    }
  }

  Object.assign(intEl.style, elStyle)

  const targetProps = getTargetProps(intEl)

  elStyle = {
    position: fixedPositioned === true ? 'fixed' : 'absolute',

    left: null,
    right: null,
    marginLeft: null,
    marginRight: null,
    maxWidth: null,

    top: null,
    bottom: null,
    marginTop: null,
    marginBottom: null,
    maxHeight: null
  }

  const
    halfWidth = Math.min(vpLeft + anchorProps[cfg.anchorOrigin.horizontal], vpWidth - vpLeft - anchorProps[cfg.anchorOrigin.horizontal]) - SIDE_SPACE,
    halfHeight = Math.min(vpTop + anchorProps[cfg.anchorOrigin.vertical], vpHeight - vpTop - anchorProps[cfg.anchorOrigin.vertical]) - SIDE_SPACE

  // horizontal repositioning
  if (
    selfOrigin.horizontal === 'left' &&
    targetProps.width + SIDE_SPACE > vpWidth - vpLeft - anchorProps[cfg.anchorOrigin.horizontal] &&
    vpLeft + anchorProps[cfg.anchorOrigin.horizontal + 'Rev'] > vpWidth - vpLeft - anchorProps[cfg.anchorOrigin.horizontal]
  ) {
    selfOrigin.horizontal = 'right'
    anchorOrigin.horizontal = anchorOrigin.horizontal + 'Rev'
  }
  else if (
    selfOrigin.horizontal === 'right' &&
    targetProps.width + SIDE_SPACE > vpLeft + anchorProps[anchorOrigin.horizontal] &&
    vpWidth - vpLeft - anchorProps[anchorOrigin.horizontal + 'Rev'] > vpLeft + anchorProps[anchorOrigin.horizontal]
  ) {
    selfOrigin.horizontal = 'left'
    anchorOrigin.horizontal = anchorOrigin.horizontal + 'Rev'
  }
  else if (
    selfOrigin.horizontal === 'middle' &&
    targetProps.width / 2 > halfWidth
  ) {
    selfOrigin.horizontal = vpLeft + anchorProps[anchorOrigin.horizontal] < vpWidth / 2
      ? 'left'
      : 'right'
    anchorOrigin.horizontal = selfOrigin.horizontal
  }

  // horizontal styles
  if (selfOrigin.horizontal === 'left') {
    elStyle.left = 0
    elStyle.marginLeft = `${vpLeft + anchorProps[anchorOrigin.horizontal]}px`
    elStyle.maxWidth = `${vpWidth - vpLeft - anchorProps[anchorOrigin.horizontal] - SIDE_SPACE}px`
  }
  else if (selfOrigin.horizontal === 'right') {
    elStyle.right = '100%'
    elStyle.marginRight = `-${vpLeft + anchorProps[anchorOrigin.horizontal]}px`
    elStyle.maxWidth = `${vpLeft + anchorProps[anchorOrigin.horizontal] - SIDE_SPACE}px`
  }
  else {
    elStyle.right = '100%'
    elStyle.marginRight = `-${vpLeft + anchorProps[anchorOrigin.horizontal]}px`
  }

  // vertical repositioning
  if (
    selfOrigin.vertical === 'top' &&
    targetProps.height + SIDE_SPACE > vpHeight - vpTop - anchorProps[cfg.anchorOrigin.vertical] &&
    vpTop + anchorProps[cfg.anchorOrigin.vertical + 'Rev'] > vpHeight - vpTop - anchorProps[cfg.anchorOrigin.vertical]
  ) {
    selfOrigin.vertical = 'bottom'
    anchorOrigin.vertical = anchorOrigin.vertical + 'Rev'
  }
  else if (
    selfOrigin.vertical === 'bottom' &&
    targetProps.height + SIDE_SPACE > vpTop + anchorProps[anchorOrigin.vertical] &&
    vpHeight - vpTop - anchorProps[anchorOrigin.vertical + 'Rev'] > vpTop + anchorProps[anchorOrigin.vertical]
  ) {
    selfOrigin.vertical = 'top'
    anchorOrigin.vertical = anchorOrigin.vertical + 'Rev'
  }
  else if (
    selfOrigin.vertical === 'center' &&
    targetProps.height / 2 > halfHeight
  ) {
    selfOrigin.vertical = vpTop + anchorProps[anchorOrigin.vertical] < vpHeight / 2
      ? 'top'
      : 'bottom'
    anchorOrigin.vertical = selfOrigin.vertical
  }

  // vertical styles
  if (selfOrigin.vertical === 'top') {
    elStyle.top = 0
    elStyle.marginTop = `${vpTop + anchorProps[anchorOrigin.vertical]}px`
    elStyle.maxHeight = `${vpHeight - vpTop - anchorProps[anchorOrigin.vertical] - SIDE_SPACE}px`
  }
  else if (selfOrigin.vertical === 'bottom') {
    elStyle.bottom = '100%'
    elStyle.marginBottom = `-${vpTop + anchorProps[anchorOrigin.vertical]}px`
    elStyle.maxHeight = `${vpTop + anchorProps[anchorOrigin.vertical] - SIDE_SPACE}px`
  }
  else {
    elStyle.bottom = '100%'
    elStyle.marginBottom = `-${vpTop + anchorProps[anchorOrigin.vertical]}px`
  }

  requestAnimationFrame(() => {
    if (selfOrigin.horizontal === 'middle' && selfOrigin.vertical === 'center') {
      intEl.style.transform = 'translate(50%, 50%)'
      elStyle.transformOrigin = '100% 100%'
    }
    else if (selfOrigin.horizontal === 'middle') {
      intEl.style.transform = 'translateX(50%)'
      elStyle.transformOrigin = '100% 50%'
    }
    else if (selfOrigin.vertical === 'center') {
      intEl.style.transform = 'translateY(50%)'
      elStyle.transformOrigin = '50% 100%'
    }
    else {
      intEl.style.transform = null
      elStyle.transformOrigin = '50% 50%'
    }

    Object.assign(extEl.style, elStyle)
    intEl.style.visibility = 'visible'

    // restore scroll position
    if (intEl.scrollTop !== scrollTop) {
      intEl.scrollTop = scrollTop
    }
    if (intEl.scrollLeft !== scrollLeft) {
      intEl.scrollLeft = scrollLeft
    }
  })
}
