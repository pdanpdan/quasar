import { normalizeToInterval } from './format.js'

let queue = []
const waitFlags = []

export function addFocusWaitFlag (flag) {
  waitFlags.push(flag)
}

export function removeFocusWaitFlag (flag) {
  const index = waitFlags.indexOf(flag)
  if (index !== -1) {
    waitFlags.splice(index, 1)
  }

  if (waitFlags.length === 0 && queue.length > 0) {
    // only call last focus handler (can't focus multiple things at once)
    queue[ queue.length - 1 ]()
    queue = []
  }
}

export function addFocusFn (fn) {
  if (waitFlags.length === 0) {
    fn()
  }
  else {
    queue.push(fn)
    return fn
  }
}

export function removeFocusFn (fn) {
  const index = queue.indexOf(fn)
  if (index !== -1) {
    queue.splice(index, 1)
  }
}

export const FOCUSABLE_SELECTOR = [
  'a[href]:not([tabindex="-1"])',
  'area[href]:not([tabindex="-1"])',
  'input:not([disabled]):not([tabindex="-1"])',
  'select:not([disabled]):not([tabindex="-1"])',
  'textarea:not([disabled]):not([tabindex="-1"])',
  'button:not([disabled]):not([tabindex="-1"])',
  'iframe:not([tabindex="-1"])',
  '[tabindex]:not([tabindex="-1"])',
  '[contenteditable]:not([tabindex="-1"]):not([contenteditable=false])',
  '.q-tab.q-focusable'
].join(',')

export const KEY_SKIP_SELECTOR = [
  'input:not([disabled])',
  'select:not([disabled])',
  'select:not([disabled]) *',
  'textarea:not([disabled])',
  '[contenteditable]:not([contenteditable=false])',
  '[contenteditable]:not([contenteditable=false]) *',
  '.q-key-group-navigation--ignore-key',
  '.q-key-group-navigation--ignore-key *'
].join(',')

export function changeFocusedElement (list, to, direction = 1, noWrap, start) {
  const lastIndex = list.length - 1

  if (noWrap === true && (to > lastIndex || to < 0)) {
    return
  }

  const initialEl = document.activeElement

  if (initialEl !== null) {
    initialEl._qKeyNavIgnore = true
  }

  const index = normalizeToInterval(to, 0, lastIndex)

  if (index === start || index > lastIndex) {
    return
  }

  list[index].focus()

  if (initialEl !== null) {
    initialEl._qKeyNavIgnore = false
  }

  if (document.activeElement !== list[index]) {
    changeFocusedElement(list, index + direction, direction, noWrap, start === void 0 ? index : start)
  }
}
