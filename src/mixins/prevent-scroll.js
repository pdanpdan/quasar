import { getEventPath, listenOpts, stopAndPrevent } from '../utils/event.js'
import { hasScrollbar } from '../utils/scroll.js'
import Platform from '../plugins/Platform.js'

let
  registered = 0,
  scrollPosition,
  bodyTop

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

function prevent (register) {
  registered += register === true ? 1 : -1

  if (registered < 0) {
    registered = 0

    return
  }

  if (registered > (register === true ? 1 : 0)) { return }

  const action = register === true ? 'add' : 'remove'

  if (Platform.is.mobile) {
    if (Platform.is.ios === true && register === true && typeof window !== 'undefined') {
      scrollPosition = window.pageYOffset || window.scrollY || document.body.scrollTop || 0
      bodyTop = document.body.style.top
      document.body.style.top = `-${scrollPosition}px`
    }

    document.body.classList[action]('q-body--prevent-scroll')

    if (Platform.is.ios === true && register !== true && typeof window !== 'undefined' && scrollPosition !== void 0) {
      document.body.style.top = bodyTop
      window.scrollTo(0, scrollPosition)
      scrollPosition = void 0
    }
  }
  else if (Platform.is.desktop) {
    // ref. https://developers.google.com/web/updates/2017/01/scrolling-intervention
    window[`${action}EventListener`]('wheel', onWheel, listenOpts.notPassive)
  }
}

export default {
  methods: {
    __preventScroll (state) {
      if (this.preventedScroll === void 0 && state !== true) {
        return
      }

      if (state !== this.preventedScroll) {
        this.preventedScroll = state
        prevent(state)
      }
    }
  }
}
