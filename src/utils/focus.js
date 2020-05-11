import { normalizeToInterval } from './format.js'

export const FOCUSABLE_SELECTOR = [
  'a[href]:not([tabindex="-1"])',
  'area[href]:not([tabindex="-1"])',
  'input:not([disabled]):not([tabindex="-1"])',
  'select:not([disabled]):not([tabindex="-1"])',
  'textarea:not([disabled]):not([tabindex="-1"])',
  'button:not([disabled]):not([tabindex="-1"])',
  'iframe:not([tabindex="-1"])',
  '[tabindex]:not([tabindex="-1"])',
  '[contenteditable]:not([tabindex="-1"]):not([contenteditable=false])'
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

export function changeFocusedElement (list, to, direction = 1, start) {
  const index = normalizeToInterval(to, 0, list.length - 1)

  if (index === start) {
    return
  }

  list[index].focus()

  if (document.activeElement !== list[index]) {
    changeFocusedElement(list, index + direction, direction, start === void 0 ? index : start)
  }
}
