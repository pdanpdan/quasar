import { getScrollbarWidth } from '../utils/scroll.js'
import { listenOpts } from '../utils/event.js'
import { client } from '../plugins/Platform.js'

let
  restorePos = null,
  registered = 0,
  inScroll = false,
  cleanupTimer,
  orientationTimer

const { passiveCapture } = listenOpts

function onOrientationChange () {
  clearTimeout(orientationTimer)

  orientationTimer = setTimeout(() => {
    requestAnimationFrame(() => {
      const
        { documentElement } = document,
        scale = window.visualViewport !== void 0 && client.is.ios === true
          ? window.visualViewport.scale
          : 1

      let { innerWidth, innerHeight } = window

      if (scale > 1) {
        innerWidth = Math.round(innerWidth * scale)
        innerHeight = Math.round(innerHeight * scale)
      }

      if (innerWidth !== restorePos.innerWidth) {
        restorePos.scrollLeft = innerWidth <= restorePos.originalInnerWidth
          ? restorePos.originalScrollLeft
          : Math.max(0, restorePos.originalScrollLeft - innerWidth + restorePos.originalInnerWidth)

        documentElement.style.setProperty('--scroll-lock-left', `${-Math.abs(restorePos.scrollLeft) + (restorePos.scrollLeft < 0 ? -1 : 1) * restorePos.offsetLeft}px`)
        documentElement.style.setProperty('--scroll-lock-width', `${innerWidth - restorePos.scrollbar}px`)

        restorePos.innerWidth = innerWidth
      }
      if (innerHeight !== restorePos.innerHeight) {
        restorePos.scrollTop = innerHeight <= restorePos.originalInnerHeight
          ? restorePos.originalScrollTop
          : Math.max(0, restorePos.originalScrollTop - innerHeight + restorePos.originalInnerHeight)

        documentElement.style.setProperty('--scroll-lock-top', `${-restorePos.scrollTop + restorePos.offsetTop}px`)
        documentElement.style.setProperty('--scroll-lock-height', `${innerHeight}px`)

        restorePos.innerHeight = innerHeight
      }
    })
  }, 200)
}

function iosScroll () {
  if (
    inScroll === true &&
    window.visualViewport.scale === 1 &&
    Math.ceil(window.visualViewport.pageTop + window.visualViewport.height) >= document.documentElement.scrollHeight - 1
  ) {
    document.documentElement.scrollTop -= 1
    requestAnimationFrame(iosScroll)
  }
  else {
    inScroll = false
  }
}

function onViewportScroll () {
  if (inScroll !== true) {
    inScroll = true
    requestAnimationFrame(iosScroll)
  }
}

function apply (action) {
  const
    { body, documentElement } = document,
    { innerWidth, innerHeight, visualViewport, getComputedStyle } = window

  clearTimeout(cleanupTimer)
  clearTimeout(orientationTimer)

  if (action === 'add') {
    const
      overflowY = client.is.mobile !== true ? getComputedStyle(body).overflowY : 'hidden',
      { scrollLeft, scrollTop } = documentElement,
      forceScrollbar = overflowY !== 'hidden' && (overflowY === 'scroll' || body.scrollHeight > innerHeight)

    restorePos = {
      scrollLeft,
      scrollTop,
      innerWidth,
      innerHeight,
      scrollbar: forceScrollbar === true ? getScrollbarWidth() : 0,
      scale: 1
    }

    if (client.is.mobile === true) {
      restorePos.originalScrollLeft = restorePos.scrollLeft
      restorePos.originalScrollTop = restorePos.scrollTop

      if (visualViewport !== void 0 && client.is.ios === true) {
        const { scale } = visualViewport
        const diffWidth = Math.min(Math.abs(restorePos.scrollLeft), Math.round(innerWidth * (scale - 1)))
        const diffHeight = Math.min(restorePos.scrollTop, Math.round(innerHeight * (scale - 1)))

        restorePos.scale = scale
        restorePos.scrollLeft = Math.abs(restorePos.scrollLeft) - (restorePos.scrollLeft >= 0 ? 1 : -1) * diffWidth
        restorePos.scrollTop = restorePos.scrollTop - diffHeight - (scale > 1 ? 4 : 0)
        restorePos.innerWidth = Math.round(innerWidth * scale)
        restorePos.innerHeight = Math.round(innerHeight * scale)

        visualViewport.addEventListener('scroll', onViewportScroll, passiveCapture)
      }

      window.addEventListener('orientationchange', onOrientationChange, passiveCapture)

      restorePos.originalInnerWidth = restorePos.innerWidth
      restorePos.originalInnerHeight = restorePos.innerHeight
    }

    document.qScrollPrevented = true

    requestAnimationFrame(() => {
      if (client.is.ie === true) {
        documentElement.style.marginLeft = `${-Math.abs(restorePos.scrollLeft)}px`
        documentElement.style.marginTop = `${-restorePos.scrollTop}px`
      }
      else {
        documentElement.style.setProperty('--scroll-lock-width', `${restorePos.innerWidth - restorePos.scrollbar}px`)
        documentElement.style.setProperty('--scroll-lock-height', `${restorePos.innerHeight}px`)
        documentElement.style.setProperty('--scroll-lock-left', `${-Math.abs(restorePos.scrollLeft)}px`)
        documentElement.style.setProperty('--scroll-lock-top', `${-restorePos.scrollTop}px`)
        documentElement.style.setProperty('--scroll-lock-scrollbar', `${-restorePos.scrollbar}px`)
      }

      documentElement.classList.add('q-body--prevent-scroll')
      client.is.desktop === true && documentElement.classList.add('q-body--prevent-scroll--desktop')

      documentElement.scrollLeft = 0
      documentElement.scrollTop = 0

      const els = document.querySelectorAll('.q-menu__container, .q-tooltip__container')
      for (let i = els.length - 1; i >= 0; i--) {
        els[i].classList.add('q-body--prevent-scroll-reposition')
      }
    })
  }
  else {
    if (client.is.mobile === true) {
      if (visualViewport !== void 0 && client.is.ios === true) {
        visualViewport.removeEventListener('scroll', onViewportScroll, passiveCapture)
      }

      window.removeEventListener('orientationchange', onOrientationChange, passiveCapture)
    }

    requestAnimationFrame(() => {
      documentElement.classList.remove('q-body--prevent-scroll')
      client.is.desktop === true && documentElement.classList.remove('q-body--prevent-scroll--desktop')

      if (visualViewport !== void 0 && client.is.ios === true) {
        documentElement.scrollLeft = restorePos.originalScrollLeft * visualViewport.scale / restorePos.scale
        documentElement.scrollTop = restorePos.originalScrollTop * visualViewport.scale / restorePos.scale
      }
      else {
        documentElement.scrollLeft = restorePos.scrollLeft
        documentElement.scrollTop = restorePos.scrollTop
      }

      const els = document.querySelectorAll('.q-body--prevent-scroll-reposition')
      for (let i = els.length - 1; i >= 0; i--) {
        els[i].classList.remove('q-body--prevent-scroll-reposition')
      }

      if (client.is.ie === true) {
        documentElement.style.marginLeft = 'auto'
        documentElement.style.marginTop = 'auto'
      }
      else {
        documentElement.style.removeProperty('--scroll-lock-width')
        documentElement.style.removeProperty('--scroll-lock-height')
        documentElement.style.removeProperty('--scroll-lock-left')
        documentElement.style.removeProperty('--scroll-lock-top')
        documentElement.style.removeProperty('--scroll-lock-scrollbar')
      }

      cleanupTimer = setTimeout(() => {
        document.qScrollPrevented = false
      }, 100)
    })
  }

  inScroll = false
}

export function preventScroll (state) {
  let action = 'add'

  if (state === true) {
    registered++

    if (registered > 1) {
      return
    }
  }
  else {
    if (registered === 0) {
      return
    }

    registered--

    if (registered > 0) {
      return
    }

    action = 'remove'
  }

  apply(action)
}

export default {
  methods: {
    __preventScroll (state) {
      if (
        state !== this.preventedScroll &&
        (this.preventedScroll !== void 0 || state === true)
      ) {
        this.preventedScroll = state
        preventScroll(state)
      }
    }
  }
}
