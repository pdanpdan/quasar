import { listenOpts } from '../utils/event.js'
import { getScrollbarWidth } from '../utils/scroll.js'
import { EDITABLE_SELECTOR } from '../utils/focus-manager.js'
import { client } from '../plugins/Platform.js'

const { passive } = listenOpts

let
  registered = 0,
  state = {},
  iosScrollActive = false,
  applyTimer,
  orientationTimer,
  closeTimer

function iosScroll () {
  const { pageTop, height, scale } = window.visualViewport

  if (
    iosScrollActive === true &&
    scale === 1 &&
    Math.ceil(pageTop + height) >= document.documentElement.scrollHeight - 1 &&
    document.activeElement &&
    document.activeElement.matches(EDITABLE_SELECTOR) === true
  ) {
    document.documentElement.scrollTop -= 1
    requestAnimationFrame(iosScroll)
  }
  else {
    iosScrollActive = false
  }
}

function onIosScroll () {
  if (iosScrollActive !== true) {
    iosScrollActive = true
    requestAnimationFrame(iosScroll)
  }
}

function onMobileRotate () {
  clearTimeout(orientationTimer)

  orientationTimer = setTimeout(() => {
    requestAnimationFrame(() => {
      const { documentElement, body } = document

      documentElement.style.height = `${innerHeight}px`

      body.style.height = `${documentElement.clientHeight + state.scrollTop}px`
    })
  }, 200)
}

function apply (action, rtl) {
  const
    { documentElement, body } = document,
    { visualViewport } = window

  clearTimeout(applyTimer)
  clearTimeout(orientationTimer)

  if (action === 'add') {
    document.qScrollPrevented = true

    const scrollbarSize = getScrollbarWidth()

    requestAnimationFrame(() => {
      const { innerHeight, innerWidth } = window

      state = {
        htmlStyle: documentElement.style.cssText,
        bodyStyle: body.style.cssText,
        scrollLeft: documentElement.scrollLeft,
        scrollTop: documentElement.scrollTop
      }

      if (client.is.mobile === true) {
        documentElement.style.height = `${innerHeight}px`

        body.style.width = `calc(100vw + ${Math.abs(state.scrollLeft)}px)`
        body.style.height = `${innerHeight + state.scrollTop}px`

        window.addEventListener('orientationchange', onMobileRotate, passive)
        if (visualViewport !== void 0 && client.is.ios === true) {
          applyTimer = setTimeout(() => {
            visualViewport.addEventListener('scroll', onIosScroll, passive)
          }, 500)
        }
      }
      else {
        const
          { scrollWidth, scrollHeight } = body,
          { overflowX, overflowY } = window.getComputedStyle(body),
          scrollbarSizeHoriz = overflowX !== 'hidden' && (overflowX === 'scroll' || scrollWidth > innerWidth)
            ? scrollbarSize
            : 0,
          scrollbarSizeVert = overflowY !== 'hidden' && (overflowY === 'scroll' || scrollHeight > innerHeight)
            ? scrollbarSize
            : 0

        if (scrollbarSizeVert > 0) {
          documentElement.style.width = `calc(100vw - ${scrollbarSizeVert}px)`

          if (rtl === true) {
            documentElement.style.marginRight = `${scrollbarSizeVert}px`
          }
        }
        if (scrollbarSizeHoriz > 0) {
          documentElement.style.height = `calc(100vh - ${scrollbarSizeHoriz}px)`
        }

        body.style.width = `calc(100vw + ${Math.abs(state.scrollLeft) - scrollbarSizeVert}px)`
        body.style.height = `calc(100vh + ${state.scrollTop - scrollbarSizeHoriz}px)`
      }

      body.style.left = `${-state.scrollLeft}px`
      body.style.top = `${-state.scrollTop}px`
      body.style['padding' + (rtl === true ? 'Left' : 'Right')] = `${Math.abs(state.scrollLeft)}px`

      documentElement.classList.add('q-body--prevent-scroll')

      window.scrollTo(0, 0)

      documentElement.style.setProperty('--q-scroll-lock-left', `${-state.scrollLeft}px`)
      const els = document.querySelectorAll('.q-menu__container, .q-tooltip__container')
      for (let i = els.length - 1; i >= 0; i--) {
        els[i].classList.add('q-body--scroll-locked')
      }
    })
  }
  else {
    if (client.is.mobile === true) {
      window.removeEventListener('orientationchange', onMobileRotate, passive)
      if (visualViewport !== void 0 && client.is.ios === true) {
        visualViewport.removeEventListener('scroll', onIosScroll, passive)
        iosScrollActive = false
      }
    }

    requestAnimationFrame(() => {
      documentElement.classList.remove('q-body--prevent-scroll')
      documentElement.style.cssText = state.htmlStyle
      body.style.cssText = state.bodyStyle

      const els = document.querySelectorAll('.q-body--scroll-locked')
      for (let i = els.length - 1; i >= 0; i--) {
        els[i].classList.remove('q-body--scroll-locked')
      }

      window.scrollTo(state.scrollLeft, state.scrollTop)

      applyTimer = setTimeout(() => {
        document.qScrollPrevented = false
      }, 50)
    })
  }
}

export function preventScroll (state, rtl) {
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
        apply(action, rtl)
        closeTimer = void 0
      }, 100)
      return
    }
  }

  apply(action, rtl)
}

export default {
  methods: {
    __preventScroll (state) {
      if (
        state !== this.preventedScroll &&
        (this.preventedScroll !== void 0 || state === true)
      ) {
        this.preventedScroll = state
        preventScroll(state, this.$q.lang.rtl)
      }
    }
  }
}
