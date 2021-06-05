import { normalizeToInterval } from './format.js'
import { client } from '../plugins/Platform.js'

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
  'a[href]:not([tabindex="-1"]):not(.q-focus__clone)',
  'area[href]:not([tabindex="-1"]):not(.q-focus__clone)',
  'input:not([disabled]):not([tabindex="-1"]):not(.q-focus__clone)',
  'select:not([disabled]):not([tabindex="-1"]):not(.q-focus__clone)',
  'textarea:not([disabled]):not([tabindex="-1"]):not(.q-focus__clone)',
  'button:not([disabled]):not([tabindex="-1"]):not(.q-focus__clone)',
  'iframe:not([tabindex="-1"]):not(.q-focus__clone)',
  '[tabindex]:not([tabindex="-1"]):not(.q-focus__clone)',
  '[contenteditable]:not([tabindex="-1"]):not(.q-focus__clone):not([contenteditable="false"])',
  '.q-tab.q-focusable:not(.q-focus__clone)'
].join(',')

export const KEY_SKIP_SELECTOR = [
  'input:not([disabled])',
  'select:not([disabled])',
  'select:not([disabled]) *',
  'textarea:not([disabled])',
  '[contenteditable]:not([contenteditable="false"])',
  '[contenteditable]:not([contenteditable="false"]) *',
  '.q-key-group-navigation--ignore-key',
  '.q-key-group-navigation--ignore-key *',
  '.q-focus__clone'
].join(',')

export const EDITABLE_SELECTOR = [
  'input:not(.q-focus__clone):not([disabled]):not([readonly]):not([type="button"]):not([type="checkbox"]):not([type="file"]):not([type="hidden"]):not([type="image"]):not([type="radio"]):not([type="range"]):not([type="reset"]):not([type="submit"])',
  'textarea:not(.q-focus__clone):not([disabled]):not([readonly])',
  '[contenteditable]:not(.q-focus__clone):not([contenteditable="false"])',
  '[contenteditable]:not(.q-focus__clone):not([contenteditable="false"]) *'
].join(',')

export function focusNoScroll (el) {
  if (
    client.is.ios !== true ||
    el === document.body ||
    el === document.activeElement ||
    el.matches(EDITABLE_SELECTOR) !== true ||
    el.matches('.q-dialog *, .q-menu *, .q-tooltip *') !== true
  ) {
    el.focus({ preventScroll: true })
    return
  }

  const clone = el.cloneNode(true)
  const parent = el.parentNode

  clone.removeAttribute('id')
  clone.removeAttribute('autofocus')
  clone.removeAttribute('data-autofocus')
  clone.classList.add('q-focus__clone')

  parent.insertBefore(clone, el)

  el.focus()

  setTimeout(() => {
    requestAnimationFrame(() => {
      clone.remove()
    })
  }, 170)
}

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

  focusNoScroll(list[index])

  if (initialEl !== null) {
    initialEl._qKeyNavIgnore = false
  }

  if (document.activeElement !== list[index]) {
    changeFocusedElement(list, index + direction, direction, noWrap, start === void 0 ? index : start)
  }
}
