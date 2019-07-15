import debounce from '../utils/debounce'
import frameDebounce from '../utils/frame-debounce.js'
import { stopAndPrevent } from '../utils/event.js'
import { normalizeToInterval } from '../utils/format.js'

export default {
  props: {
    virtualListSliceSize: {
      type: Number,
      default: 11
    },

    virtualListItemDefaultHeight: {
      type: Number,
      default: 24
    },

    virtualListMaxPadding: {
      type: Number,
      default: 100000
    },

    options: {
      type: Array,
      default: () => []
    }
  },

  data () {
    return {
      virtualListItemSelectedIndex: -1,
      virtualListSliceRange: { from: 0, to: 0 }
    }
  },

  watch: {
    options: {
      handler (options) {
        const virtualListLength = Array.isArray(options) === false ? 0 : options.length

        if (virtualListLength <= this.virtualListSliceSizeComputed) {
          this.virtualListHeights = null
          this.virtualListHeight = 0
          this.virtualListMarginTop = 0
          return
        }

        const defaultHeight = this.virtualListItemDefaultHeight
        const virtualListHeights = new Array(virtualListLength)

        for (let i = virtualListLength - 1; i >= 0; i--) {
          virtualListHeights[i] = defaultHeight
        }

        this.virtualListHeights = virtualListHeights
        this.virtualListHeight = virtualListLength * defaultHeight
        this.virtualListMarginTop = this.virtualListHeight
      },
      immediate: true
    }
  },

  computed: {
    virtualListSlice () {
      return this.options.slice(this.virtualListSliceRange.from, this.virtualListSliceRange.to)
    }
  },

  methods: {
    setOptionIndex (index) {
      if (this.$q.platform.is.desktop !== true) { return }

      const val = index > -1 && index < this.options.length
        ? index
        : -1

      if (this.virtualListItemSelectedIndex !== val) {
        this.virtualListItemSelectedIndex = val
      }
    },

    __hydrateVirtualList (ev, toIndex) {
      clearTimeout(this.virtualListHidrateTimer)

      if (ev === void 0 || (this.preventNextScroll === true && toIndex === void 0)) {
        return
      }

      const
        delayNextScroll = this.delayNextScroll === true && toIndex === void 0,
        target = delayNextScroll === true || ev.target === void 0 || ev.target.nodeType === 8 ? void 0 : ev.target,
        content = target === void 0 ? null : target.querySelector('.q-virtual-list--content')

      if (content === null) {
        this.virtualListHidrateTimer = setTimeout(() => {
          this.__hydrateVirtualList({ target: this.__getVirtualListEl() }, toIndex)
        }, 10)

        return
      }

      if (this.virtualListHeights === null) {
        this.virtualListSliceRange = { from: 0, to: this.options.length }
        this.virtualListHeight = 0
        this.virtualListMarginTop = 0

        if (toIndex !== void 0) {
          this.$nextTick(() => {
            const
              child = content.children[toIndex],
              scrollTop = target.scrollTop,
              viewHeight = target.clientHeight,
              childPosTop = child === void 0 ? -1 : content.offsetTop + child.offsetTop,
              childPosBottom = child === void 0 ? -1 : childPosTop + child.clientHeight

            if (childPosTop < scrollTop || childPosBottom > scrollTop + viewHeight) {
              target.scrollTop = Math.trunc(childPosTop + child.clientHeight / 2 - (
                this.$q.platform.is.mobile === true
                  ? 0
                  : viewHeight / 2
              ))
            }
          })
        }

        return
      }

      const
        scrollTop = target.scrollTop,
        viewHeight = target.clientHeight,
        child = content.children[toIndex - this.virtualListSliceRange.from],
        childPosTop = child === void 0 ? -1 : content.offsetTop + child.offsetTop,
        childPosBottom = child === void 0 ? -1 : childPosTop + child.clientHeight,
        fromScroll = toIndex === void 0

      if (fromScroll === true) {
        toIndex = -1

        if (this.virtualListHeights !== null) {
          const toIndexMax = this.options.length - 1

          for (let i = Math.trunc(scrollTop + viewHeight / 2); i >= 0 && toIndex < toIndexMax;) {
            toIndex++
            i -= this.virtualListHeights[toIndex]
          }
        }
      }

      toIndex = toIndex < 0 ? 0 : toIndex

      // destination option is not in view
      if (childPosTop < scrollTop || childPosBottom > scrollTop + viewHeight) {
        this.__setVirtualListSliceRange(toIndex, target, fromScroll)
      }
    },

    __setPreventNextScroll (delay) {
      clearTimeout(this.preventNextScrollTimer)

      this.preventNextScroll = delay !== true
      this.delayNextScroll = delay === true

      this.preventNextScrollTimer = setTimeout(() => {
        this.preventNextScroll = false
        this.delayNextScroll = false
      }, 10)
    },

    __setVirtualListSliceRange (toIndex, target, fromScroll) {
      const
        from = Math.max(0, Math.min(toIndex - Math.round(this.virtualListSliceSizeComputed / 2), this.options.length - this.virtualListSliceSizeComputed)),
        to = from + this.virtualListSliceSizeComputed,
        repositionScroll = fromScroll !== true || from < this.virtualListSliceRange.from

      if (from === this.virtualListSliceRange.from && to === this.virtualListSliceRange.to) {
        if (fromScroll === true) {
          return
        }
      }
      else {
        this.__setPreventNextScroll(fromScroll)
        this.virtualListSliceRange = { from, to }
      }

      this.$nextTick(() => {
        const content = target === void 0 ? null : target.querySelector('.q-virtual-list--content')

        if (content === null) {
          return
        }

        const children = content.children

        let marginTopDiff = 0

        for (let i = children.length - 1; i >= 0; i--) {
          const diff = children[i].clientHeight - this.virtualListHeights[from + i]

          if (diff !== 0) {
            marginTopDiff += diff
            this.virtualListHeights[from + i] += diff
          }
        }

        const
          marginTop = this.virtualListHeights.slice(from).reduce((acc, h) => acc + h, 0),
          height = marginTop + this.virtualListHeights.slice(0, from).reduce((acc, h) => acc + h, 0),
          padding = this.virtualListHeight % this.virtualListMaxPadding + height - this.virtualListHeight

        if (this.virtualListMarginTop !== marginTop || this.virtualListHeight !== height) {
          this.virtualListMarginTop = marginTop
          this.virtualListHeight = height

          this.__setPreventNextScroll(fromScroll)
          // content.previousSibling is the last padding block
          content.previousSibling.style.cssText = padding >= 0 ? `height: ${padding}px; margin-top: 0px` : `height: 0px; margin-top: ${padding}px`
          content.style.marginTop = `-${marginTop}px`
        }

        if (repositionScroll === true) {
          if (fromScroll !== true) {
            this.__setPreventNextScroll(fromScroll)
            target.scrollTop = this.virtualListHeights.slice(0, toIndex).reduce((acc, h) => acc + h, 0) + (
              this.$q.platform.is.mobile === true
                ? 0
                : Math.trunc(this.virtualListHeights[toIndex] / 2 - target.clientHeight / 2)
            )
          }
          else if (marginTopDiff !== 0) {
            this.__setPreventNextScroll(fromScroll)
            target.scrollTop += marginTopDiff
          }
        }
      })
    },

    __onTargetKeydownVirtualList (e) {
      // up, down
      const optionsLength = this.options.length

      if (e.keyCode === 38 || e.keyCode === 40) {
        stopAndPrevent(e)

        if (this.menu === true) {
          let index = this.virtualListItemSelectedIndex
          do {
            index = normalizeToInterval(
              index + (e.keyCode === 38 ? -1 : 1),
              -1,
              optionsLength - 1
            )
          }
          while (index !== -1 && index !== this.virtualListItemSelectedIndex && this.__isDisabled(this.options[index]) === true)

          if (this.virtualListItemSelectedIndex !== index) {
            this.__setPreventNextScroll()

            this.virtualListItemSelectedIndex = index

            this.__hydrateVirtualList({ target: this.__getVirtualListEl() }, index)
          }
        }
      }
    },

    __padVirtualList (h, content) {
      const list = []

      for (let i = Math.trunc(this.virtualListHeight / this.virtualListMaxPadding); i > 0; i--) {
        list.push(h('div', { staticClass: 'q-virtual-list--padding', style: { height: `${this.virtualListMaxPadding}px` } }))
      }
      list.push(h('div', { staticClass: 'q-virtual-list--padding', style: { height: `${this.virtualListHeight % this.virtualListMaxPadding}px` } }))

      list.push(h('div', {
        staticClass: 'q-virtual-list--content',
        style: {
          marginTop: `-${this.virtualListMarginTop}px`
        }
      }, content))

      return list
    },

    __resetVirtualListSlice (optionIndex) {
      this.__setPreventNextScroll(true)
      this.virtualListSliceRange = { from: 0, to: 0 }
      this.__hydrateVirtualList({ target: this.__getVirtualListEl() }, optionIndex)
    }
  },

  mounted () {
    this.virtualListSliceSizeComputed = Math.max(this.virtualListSliceSize, Math.ceil(window.innerHeight / this.virtualListItemDefaultHeight * 1.2))
    this.__setVirtualListSliceRange = this.$q.platform.is.ios === true || this.$q.platform.is.safari === true
      ? frameDebounce(this.__setVirtualListSliceRange)
      : debounce(this.__setVirtualListSliceRange, 50)
  },

  beforeDestroy () {
    clearTimeout(this.virtualListHidrateTimer)
  }
}
