import { getScrollbarWidth } from '../utils/scroll.js'
import { listenOpts } from '../utils/event.js'
import { client } from '../plugins/Platform.js'

let
  restorePos = null,
  registered = 0,
  closeTimer,
  scrollTimer,
  orientationTimer

const { passiveCapture } = listenOpts

function onOrientationChange () {
  clearTimeout(orientationTimer)

  orientationTimer = setTimeout(() => {
    requestAnimationFrame(() => {
      if (restorePos.innerWidth !== window.innerWidth) {
        restorePos.scrollLeft = Math.max(0, restorePos.scrollLeft + Math.round((window.innerWidth - restorePos.innerWidth) / 2))
        document.documentElement.style.setProperty('--scroll-lock-left', `${-Math.abs(restorePos.scrollLeft) + (restorePos.scrollLeft < 0 ? -1 : 1) * restorePos.offsetLeft}px`)
        document.documentElement.style.setProperty('--scroll-lock-width', `${window.innerWidth}px`)
        restorePos.innerWidth = window.innerWidth
      }
      if (restorePos.innerHeight !== window.innerHeight) {
        restorePos.scrollTop = Math.max(0, restorePos.scrollTop + Math.round((window.innerHeight - restorePos.innerHeight) / 2))
        document.documentElement.style.setProperty('--scroll-lock-top', `${-restorePos.scrollTop + restorePos.offsetTop}px`)
        document.documentElement.style.setProperty('--scroll-lock-height', `${window.innerHeight}px`)
        restorePos.innerHeight = window.innerHeight
      }
    })
  }, 200)
}

function iosScroll () {
  document.documentElement.scrollTop -= 1

  requestAnimationFrame(() => {
    if (document.documentElement.scrollTop + window.visualViewport.height >= document.documentElement.scrollHeight - 1) {
      iosScroll()
    }
  })
}

function onViewportScroll (evt) {
  if (document.documentElement.scrollTop + evt.target.height >= document.documentElement.scrollHeight - 1) {
    clearTimeout(scrollTimer)

    scrollTimer = setTimeout(() => {
      requestAnimationFrame(iosScroll)
    }, 50)
  }
}

function apply (action) {
  const
    { body, documentElement } = document,
    { visualViewport } = window

  clearTimeout(scrollTimer)
  clearTimeout(orientationTimer)

  if (action === 'add') {
    const
      { overflowY } = window.getComputedStyle(body),
      { scrollLeft, scrollTop } = documentElement,
      { innerWidth, innerHeight } = window,
      forceScrollbar = overflowY !== 'hidden' && (overflowY === 'scroll' || body.scrollHeight > innerHeight)

    restorePos = {
      scrollLeft,
      scrollTop,
      offsetLeft: 0,
      offsetTop: 0,
      innerWidth,
      innerHeight,
      scrollbar: forceScrollbar === true ? getScrollbarWidth() : 0,
      scale: 1
    }

    if (client.is.mobile === true) {
      if (visualViewport !== void 0 && client.is.ios === true) {
        const { offsetLeft, offsetTop, scale } = visualViewport
        const diffWidth = innerWidth * (scale - 1)
        const diffHeight = innerHeight * (scale - 1)
        const ratioWidth = diffWidth === 0 ? 0 : offsetLeft / diffWidth
        const ratioHeight = diffHeight === 0 ? 0 : offsetTop / diffHeight

        restorePos.scale = scale
        restorePos.offsetLeft = Math.min(Math.abs(restorePos.scrollLeft), Math.round(diffWidth * ratioWidth))
        restorePos.offsetTop = Math.min(restorePos.scrollTop, Math.round(diffHeight * ratioHeight))
        restorePos.innerWidth = Math.round(innerWidth * scale)
        restorePos.innerHeight = Math.round(innerHeight * scale)

        visualViewport.addEventListener('scroll', onViewportScroll, passiveCapture)
      }

      window.addEventListener('orientationchange', onOrientationChange, passiveCapture)
    }

    document.qScrollPrevented = true

    requestAnimationFrame(() => {
      if (client.is.ie !== true) {
        documentElement.style.setProperty('--scroll-lock-width', `${restorePos.innerWidth}px`)
        documentElement.style.setProperty('--scroll-lock-height', `${restorePos.innerHeight}px`)
        documentElement.style.setProperty('--scroll-lock-left', `${-Math.abs(restorePos.scrollLeft) + (restorePos.scrollLeft < 0 ? -1 : 1) * restorePos.offsetLeft}px`)
        documentElement.style.setProperty('--scroll-lock-top', `${-restorePos.scrollTop + restorePos.offsetTop}px`)
        documentElement.style.setProperty('--scroll-lock-scrollbar', `${restorePos.scrollbar}px`)
      }

      documentElement.scrollLeft = restorePos.offsetLeft
      documentElement.scrollTop = restorePos.offsetTop

      forceScrollbar === true && documentElement.classList.add('q-body--force-scrollbar')
      documentElement.classList.add('q-body--prevent-scroll')

      if (client.is.ie === true) {
        documentElement.style.marginLeft = `${-Math.abs(restorePos.scrollLeft)}px`
        documentElement.style.marginTop = `${-restorePos.scrollTop}px`
      }

      Array.prototype.slice.call(document.querySelectorAll('.q-menu__container, .q-tooltip__container')).forEach(el => {
        el.classList.add('q-body--prevent-scroll-reposition')
      })
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
      const { scrollLeft, scrollTop } = documentElement

      documentElement.classList.remove('q-body--force-scrollbar')
      documentElement.classList.remove('q-body--prevent-scroll')

      if (client.is.ie === true) {
        documentElement.style.marginLeft = 'auto'
        documentElement.style.marginTop = 'auto'
      }

      documentElement.scrollLeft = restorePos.scrollLeft + scrollLeft - restorePos.offsetLeft
      documentElement.scrollTop = restorePos.scrollTop + scrollTop - restorePos.offsetTop

      Array.prototype.slice.call(document.querySelectorAll('.q-body--prevent-scroll-reposition')).forEach(el => {
        el.classList.remove('q-body--prevent-scroll-reposition')
      })

      if (client.is.ie !== true) {
        documentElement.style.removeProperty('--scroll-lock-width')
        documentElement.style.removeProperty('--scroll-lock-height')
        documentElement.style.removeProperty('--scroll-lock-left')
        documentElement.style.removeProperty('--scroll-lock-top')
        documentElement.style.removeProperty('--scroll-lock-scrollbar')
      }

      setTimeout(() => {
        document.qScrollPrevented = false
      }, 100)
    })
  }
}

export function preventScroll (state) {
  let action = 'add'

  if (state === true) {
    registered++

    if (closeTimer !== void 0) {
      clearTimeout(closeTimer)
      closeTimer = void 0
      return
    }

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

    if (client.is.ios === true && client.is.nativeMobile === true) {
      clearTimeout(closeTimer)

      closeTimer = setTimeout(() => {
        apply(action)
        closeTimer = void 0
      }, 100)
      return
    }
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
