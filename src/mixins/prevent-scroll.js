import { getEventPath, listenOpts, stopAndPrevent } from '../utils/event.js'
import { hasScrollbar, getScrollPosition, getHorizontalScrollPosition } from '../utils/scroll.js'
import Platform from '../plugins/Platform.js'

let
  registered = 0,
  scrollPositionX,
  scrollPositionY,
  bodyLeft,
  bodyTop,
  closeTimer

function onWheel (e) {
  if (shouldPreventScroll(e)) {
    stopAndPrevent(e)
  }
}

function shouldPreventScroll (e) {
  if (e.target === document.body || e.target.classList.contains('q-layout__backdrop')) {
    return true
  }

  const
    path = getEventPath(e),
    shift = e.shiftKey && !e.deltaX,
    scrollY = !shift && Math.abs(e.deltaX) <= Math.abs(e.deltaY),
    delta = shift || scrollY ? e.deltaY : e.deltaX

  for (let index = 0; index < path.length; index++) {
    const el = path[index]

    if (hasScrollbar(el, scrollY)) {
      return scrollY
        ? (
          delta < 0 && el.scrollTop === 0
            ? true
            : delta > 0 && el.scrollTop + el.clientHeight === el.scrollHeight
        )
        : (
          delta < 0 && el.scrollLeft === 0
            ? true
            : delta > 0 && el.scrollLeft + el.clientWidth === el.scrollWidth
        )
    }
  }

  return true
}

function onAppleScroll (e) {
  // iPad does not need this and neither does iPhone in landscape
  if (e.target === document && window.innerWidth < 768) {
    if (document.scrollingElement.scrollTop < 0) {
      document.scrollingElement.scrollTop -= 1
    }
    else if (window.innerWidth < 400 && document.scrollingElement.scrollTop > 260) {
      document.scrollingElement.scrollTop = 260
    }
    else if (document.scrollingElement.scrollTop > 307) {
      document.scrollingElement.scrollTop = 307
    }
  }
}

function apply (action) {
  const
    body = document.body,
    // discriminate between mac laptop and ipad with request desktop site
    needIosSafariHack = Platform.is.safari === true && (Platform.is.ios === true || (Platform.is.mac === true && Platform.has.touch === true)),
    needMacSafariHack = Platform.is.safari === true && Platform.is.desktop === true && Platform.is.mac === true && Platform.has.touch !== true

  if (action === 'add') {
    const overflowY = window.getComputedStyle(body).overflowY

    scrollPositionX = getHorizontalScrollPosition(window)
    scrollPositionY = getScrollPosition(window)
    bodyLeft = body.style.left
    bodyTop = body.style.top

    body.style.left = `-${scrollPositionX}px`
    body.style.top = `-${scrollPositionY}px`
    if (overflowY !== 'hidden' && (overflowY === 'scroll' || body.scrollHeight > window.innerHeight)) {
      body.classList.add('q-body--force-scrollbar')
    }

    body.classList.add('q-body--prevent-scroll')
    needIosSafariHack === true && window.addEventListener('scroll', onAppleScroll, listenOpts.passiveCapture)
  }

  if (needMacSafariHack === true) {
    // ref. https://developers.google.com/web/updates/2017/01/scrolling-intervention
    window[`${action}EventListener`]('wheel', onWheel, listenOpts.notPassive)
  }

  if (action === 'remove') {
    needIosSafariHack === true && window.removeEventListener('scroll', onAppleScroll, listenOpts.passiveCapture)

    body.classList.remove('q-body--prevent-scroll')
    body.classList.remove('q-body--force-scrollbar')

    body.style.left = bodyLeft
    body.style.top = bodyTop

    window.scrollTo(scrollPositionX, scrollPositionY)
  }
}

function prevent (state) {
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

    if (Platform.is.ios === true && Platform.is.nativeMobile === true) {
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
        prevent(state)
      }
    }
  }
}
