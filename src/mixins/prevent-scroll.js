import { getScrollbarWidth } from '../utils/scroll.js'
import { listenOpts } from '../utils/event.js'
import { client } from '../plugins/Platform.js'

let
  restorePos = null,
  registered = 0,
  maxScrollTop,
  vpPendingUpdate = false,
  closeTimer

function onViewportResize (evt) {
  if (vpPendingUpdate === true) {
    return
  }

  vpPendingUpdate = true

  requestAnimationFrame(() => {
    vpPendingUpdate = false

    const
      { scrollingElement } = document,
      { height } = evt.target,
      { scrollHeight, scrollTop } = scrollingElement

    if (maxScrollTop === void 0 || height !== window.innerHeight) {
      maxScrollTop = scrollHeight - height
      scrollingElement.style.setProperty('--scroll-lock-height', `${height}px`)
    }

    if (scrollTop > maxScrollTop) {
      scrollingElement.scrollTop -= Math.ceil((scrollTop - maxScrollTop) / 8)
    }
  })
}

function apply (action) {
  const
    { body, documentElement } = document,
    hasViewport = window.visualViewport !== void 0

  if (action === 'add') {
    const
      { overflowY } = window.getComputedStyle(body),
      { scrollLeft, scrollTop } = documentElement,
      { innerWidth, innerHeight } = window,
      forceScrollbar = overflowY !== 'hidden' && (overflowY === 'scroll' || body.scrollHeight > innerHeight)

    restorePos = { scrollLeft, scrollTop }

    if (hasViewport === true) {
      window.visualViewport.addEventListener('resize', onViewportResize, listenOpts.passiveCapture)
      window.visualViewport.addEventListener('scroll', onViewportResize, listenOpts.passiveCapture)
    }

    requestAnimationFrame(() => {
      documentElement.style.setProperty('--scroll-lock-left', `-${Math.abs(scrollLeft)}px`)
      documentElement.style.setProperty('--scroll-lock-top', `-${scrollTop}px`)
      documentElement.style.setProperty('--scroll-lock-width', `${innerWidth}px`)
      documentElement.style.setProperty('--scroll-lock-height', `${innerHeight}px`)
      documentElement.style.setProperty('--scroll-lock-scrollbar', `${forceScrollbar === true ? getScrollbarWidth() : 0}px`)

      documentElement.scrollLeft = 0
      documentElement.scrollTop = 0

      forceScrollbar === true && documentElement.classList.add('q-body--force-scrollbar')
      documentElement.classList.add('q-body--prevent-scroll')

      if (client.is.ie === true) {
        documentElement.style.marginLeft = `-${Math.abs(scrollLeft)}px`
        documentElement.style.marginTop = `-${scrollTop}px`
      }

      Array.prototype.slice.call(document.querySelectorAll('.q-menu__container, .q-tooltip__container')).forEach(el => {
        el.classList.add('q-body--prevent-scroll-lock')
      })

      document.qScrollPrevented = true
    })
  }
  else {
    if (hasViewport === true) {
      window.visualViewport.removeEventListener('resize', onViewportResize, listenOpts.passiveCapture)
      window.visualViewport.removeEventListener('scroll', onViewportResize, listenOpts.passiveCapture)
    }

    requestAnimationFrame(() => {
      documentElement.classList.remove('q-body--force-scrollbar')
      documentElement.classList.remove('q-body--prevent-scroll')

      if (client.is.ie === true) {
        documentElement.style.marginLeft = void 0
        documentElement.style.marginTop = void 0
      }

      Object.assign(documentElement, restorePos)

      document.qScrollPrevented = false
      maxScrollTop = void 0

      Array.prototype.slice.call(document.querySelectorAll('.q-body--prevent-scroll-lock')).forEach(el => {
        el.classList.remove('q-body--prevent-scroll-lock')
      })

      documentElement.style.removeProperty('--scroll-lock-left')
      documentElement.style.removeProperty('--scroll-lock-top')
      documentElement.style.removeProperty('--scroll-lock-width')
      documentElement.style.removeProperty('--scroll-lock-height')
      documentElement.style.removeProperty('--scroll-lock-scrollbar')
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
