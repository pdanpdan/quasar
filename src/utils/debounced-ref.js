export default function (vm, prop, wait = 250) {
  const debounced = {
    get value () {
      const value = vm[prop]

      if (value !== debounced.propValue) {
        debounced.propValue = value
        debounced.internalValue = value
        debounced.timer !== void 0 && clearTimeout(debounced.timer)
        debounced.timer = void 0
      }

      return debounced.internalValue
    },

    set value (value) {
      if (debounced.internalValue === value) {
        return
      }

      debounced.internalValue = value

      debounced.timer !== void 0 && clearTimeout(debounced.timer)
      debounced.timer = setTimeout(() => {
        debounced.timer = void 0

        vm[prop] = value
      }, wait)
    },

    destroy () {
      if (debounced.timer !== null) {
        clearTimeout(debounced.timer)
        debounced.timer = void 0

        vm[prop] = debounced.internalValue
      }
    }
  }

  vm.$once('hook:beforeDestroy', debounced.destroy)

  return debounced
}
