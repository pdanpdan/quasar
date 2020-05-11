import { addEvt, cleanEvt } from '../utils/touch.js'
import { prevent } from '../utils/event.js'
import {
  FOCUSABLE_SELECTOR,
  KEY_SKIP_SELECTOR,
  changeFocusedElement
} from '../utils/focus.js'

const keyCodes = {
  horizontal: {
    first: [ 36 ], // HOME
    prev: [ 37 ], // ARROW_LEFT
    next: [ 39 ], // ARROW_RIGHT
    last: [ 35 ] // END
  },
  vertical: {
    first: [ 33 ], // PG_UP
    prev: [ 38 ], // ARROW_UP
    next: [ 40 ], // ARROW_DOWN
    last: [ 34 ] // PG_DOWN
  }
}

keyCodes.all = Object.keys(keyCodes.horizontal).reduce((acc, key) => ({
  ...acc,
  [key]: keyCodes.horizontal[key].concat(keyCodes.vertical[key])
}), {})

keyCodes.horizontal.list = Object.keys(keyCodes.horizontal).reduce((acc, k) => acc.concat(keyCodes.horizontal[k]), [])
keyCodes.vertical.list = Object.keys(keyCodes.vertical).reduce((acc, k) => acc.concat(keyCodes.vertical[k]), [])
keyCodes.all.list = Object.keys(keyCodes.all).reduce((acc, k) => acc.concat(keyCodes.all[k]), [])

function createFocusTargets (ctx) {
  const target = document.createElement('span')
  target.setAttribute('tabindex', -1)
  target.classList.add('hide-outline')
  target.classList.add('absolute')
  target.classList.add('no-pointer-events')

  ctx.firstTarget = target
  ctx.lastTarget = target.cloneNode()
  ctx.lastTarget.setAttribute('tabindex', -1)
}

function addFocusTargets (ctx, el) {
  el.appendChild(ctx.lastTarget)

  if (el.childElementCount > 0) {
    el.insertBefore(ctx.firstTarget, el.childNodes[0])
  }
  else {
    el.appendChild(ctx.firstTarget)
  }
}

function removeFocusTargets (ctx) {
  ctx.firstTarget !== void 0 && ctx.firstTarget.remove()
  ctx.lastTarget !== void 0 && ctx.lastTarget.remove()
}

function update (el, { modifiers, value }) {
  const ctx = el.__qkeygrpnav

  if (ctx !== void 0) {
    if (modifiers.vertical === true) {
      ctx.keyCodes = keyCodes.vertical
    }
    else {
      ctx.keyCodes = modifiers.horizontal === true
        ? keyCodes.horizontal
        : keyCodes.all
    }

    const disabled = [false, 0, '0'].indexOf(value) > -1

    if (ctx.enabled === true && disabled === true) {
      ctx.enabled = false
      cleanEvt(ctx, 'main')
    }
    else if (ctx.enabled !== true && disabled !== true) {
      ctx.enabled = true
      addEvt(ctx, 'main', [
        [ el, 'keydown', 'keyDown', 'capturePassive' ],
        [ el, 'focusin', 'focusIn', 'capture' ],
        [ el, 'mousedown', 'setRestoreEl', 'capturePassive' ],
        [ el, 'touchstart', 'setRestoreEl', 'capturePassive' ]
      ])
    }
  }
}

export default {
  name: 'key-group-navigation',

  bind (el, binding) {
    const ctx = {
      keyCodes: keyCodes.all,

      keyDown (evt) {
        const { keyCode, shiftKey } = evt

        if (
          (keyCode !== 9 && ctx.keyCodes.list.indexOf(keyCode) === -1) ||
          evt.target.matches(KEY_SKIP_SELECTOR) === true
        ) {
          return
        }

        if (keyCode === 9) { // TAB
          addFocusTargets(ctx, el)

          if (shiftKey === true) {
            if (ctx.firstTarget !== void 0) {
              ctx.firstTarget.focus()
            }
            else {
              prevent(evt)
            }
          }
          else {
            if (ctx.lastTarget !== void 0) {
              ctx.lastTarget.focus()
            }
            else {
              prevent(evt)
            }
          }

          removeFocusTargets(ctx)

          return
        }

        const focusableElements = Array.prototype.slice.call(el.querySelectorAll(FOCUSABLE_SELECTOR))
        const lastElementIndex = focusableElements.length - 1

        if (lastElementIndex < 0) {
          return
        }

        if (ctx.keyCodes.first.indexOf(keyCode) > -1) {
          changeFocusedElement(focusableElements, 0, 1)
        }
        else if (ctx.keyCodes.last.indexOf(keyCode) > -1) {
          changeFocusedElement(focusableElements, lastElementIndex, -1)
        }
        else {
          const currentIndex = document.activeElement === null
            ? -1
            : focusableElements.indexOf(document.activeElement.closest(FOCUSABLE_SELECTOR))

          if (ctx.keyCodes.prev.indexOf(keyCode) > -1) {
            changeFocusedElement(focusableElements, currentIndex - 1, -1)
          }
          if (ctx.keyCodes.next.indexOf(keyCode) > -1) {
            changeFocusedElement(focusableElements, currentIndex + 1, 1)
          }
        }

        prevent(evt)
      },

      setRestoreEl (evt) {
        if (evt.target) {
          ctx.focusRestoreEl = evt.target
        }
      },

      focusIn (evt) {
        if (
          evt.target === ctx.firstTarget ||
          evt.target === ctx.lastTarget ||
          (evt.relatedTarget && evt.relatedTarget.classList.contains('q-key-group-navigation--ignore-focus'))
        ) {
          return
        }

        if (
          ctx.focusRestoreEl === void 0 ||
          ctx.focusRestoreEl === null ||
          el.contains(evt.relatedTarget) === true
        ) {
          ctx.focusRestoreEl = document.activeElement
        }
        else {
          const focusedEl = ctx.focusRestoreEl.closest(FOCUSABLE_SELECTOR)

          if (focusedEl === null || typeof focusedEl.focus !== 'function') {
            if (typeof ctx.focusRestoreEl.focus === 'function') {
              ctx.focusRestoreEl.focus()
            }
          }
          else {
            focusedEl.focus()
          }
        }
      }
    }

    if (el.__qkeygrpnav) {
      el.__qkeygrpnav_old = el.__qkeygrpnav
    }

    el.__qkeygrpnav = ctx

    createFocusTargets(ctx)

    update(el, binding)
  },

  update,

  unbind (el) {
    const ctx = el.__qkeygrpnav_old || el.__qkeygrpnav
    if (ctx !== void 0) {
      removeFocusTargets(ctx)
      cleanEvt(ctx, 'main')

      delete el[el.__qkeygrpnav_old ? '__qkeygrpnav_old' : '__qkeygrpnav']
    }
  }
}
