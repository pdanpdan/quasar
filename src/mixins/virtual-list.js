import debounce from '../utils/debounce'
import frameDebounce from '../utils/frame-debounce.js'

export default {
  props: {
    horizontal: Boolean,

    virtualListSliceSize: {
      type: Number,
      default: 11
    },

    virtualListItemDefaultSize: {
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
      virtualListSliceRange: { from: 0, to: 0 }
    }
  },

  watch: {
    options: {
      handler (options) {
        const virtualListLength = Array.isArray(options) === false ? 0 : options.length

        if (virtualListLength <= this.virtualListSliceSizeComputed) {
          this.virtualListSizes = null
          this.virtualListSize = 0
          this.virtualListMargin = 0
          return
        }

        const defaultSize = this.virtualListItemDefaultSize
        const virtualListSizes = new Array(virtualListLength)

        for (let i = virtualListLength - 1; i >= 0; i--) {
          virtualListSizes[i] = defaultSize
        }

        this.virtualListSizes = virtualListSizes
        this.virtualListSize = virtualListLength * defaultSize
        this.virtualListMargin = this.virtualListSize
      },
      immediate: true
    },

    horizontal (horizontal) {
      this.__setSizeKeys(horizontal)
    }
  },

  computed: {
    virtualListSlice () {
      return Array.isArray(this.options)
        ? this.options.slice(this.virtualListSliceRange.from, this.virtualListSliceRange.to)
        : []
    },

    virtualListOptionsLength () {
      return Array.isArray(this.options)
        ? this.options.length
        : 0
    }
  },

  methods: {
    __hydrateVirtualList (ev, toIndex) {
      clearTimeout(this.virtualListHidrateTimer)

      if (ev === void 0 || (this.preventNextScroll === true && toIndex === void 0)) {
        return
      }

      const
        delayNextScroll = this.delayNextScroll === true && toIndex === void 0,
        target = delayNextScroll === true || ev.target === void 0 || ev.target.nodeType === 8
          ? void 0
          : (ev.target === document ? document.scrollingElement : ev.target),
        content = target === void 0 ? null : target.querySelector('.q-virtual-list__content')

      if (content === null) {
        this.virtualListHidrateTimer = setTimeout(() => {
          this.__hydrateVirtualList({ target: this.__getVirtualListEl() }, toIndex)
        }, 10)

        return
      }

      if (this.virtualListSizes === null) {
        if (this.virtualListSliceRange.from !== 0 || this.virtualListSliceRange.to !== this.virtualListOptionsLength) {
          this.virtualListSliceRange = { from: 0, to: this.virtualListOptionsLength }
        }
        if (this.virtualListSize !== 0 || this.virtualListMargin !== 0) {
          this.virtualListSize = 0
          this.virtualListMargin = 0
        }

        if (toIndex !== void 0) {
          this.$nextTick(() => {
            const
              child = content.children[toIndex],
              scroll = target[this.__domProps.scroll],
              viewSize = target[this.__domProps.targetSize],
              childPosStart = child === void 0 ? -1 : content[this.__domProps.offset] + child[this.__domProps.offset],
              childPosSize = child === void 0 ? this.virtualListItemDefaultSize : child[this.__domProps.childSize],
              childPosEnd = child === void 0 ? -1 : childPosStart + childPosSize

            if (childPosStart < scroll) {
              target[this.__domProps.scroll] = childPosStart
            }
            else if (childPosEnd - viewSize > scroll) {
              target[this.__domProps.scroll] = childPosEnd - viewSize
            }
          })
        }

        return
      }

      const
        scroll = target[this.__domProps.scroll],
        scrollSize = target[this.__domProps.scrollSize],
        viewSize = target[this.__domProps.targetSize],
        child = content.children[toIndex - this.virtualListSliceRange.from],
        childPosStart = child === void 0 ? -1 : content[this.__domProps.offset] + child[this.__domProps.offset],
        childPosSize = child === void 0 ? this.virtualListItemDefaultSize : child[this.__domProps.childSize],
        childPosEnd = child === void 0 ? -1 : childPosStart + childPosSize,
        fromScroll = toIndex === void 0

      if (fromScroll === true) {
        const toIndexMax = this.virtualListOptionsLength - 1

        toIndex = -1

        if (scroll === 0) {
          toIndex = 0
        }
        else if (scroll >= scrollSize - viewSize) {
          toIndex = toIndexMax
        }
        else if (this.virtualListSizes !== null) {
          for (let i = scroll; i >= 0 && toIndex < toIndexMax;) {
            toIndex++
            i -= this.virtualListSizes[toIndex]
          }
        }
      }

      toIndex = toIndex < 0 ? 0 : toIndex

      // destination option is not in view
      if (childPosStart < scroll) {
        this.__setVirtualListSliceRange(toIndex, target, fromScroll)
      }
      else if (childPosEnd - viewSize > scroll) {
        this.__setVirtualListSliceRange(toIndex, target, fromScroll, viewSize - childPosSize)
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

    __setVirtualListSliceRange (toIndex, target, fromScroll, scrollOffset = 0) {
      const
        from = Math.max(0, Math.min(toIndex - Math.round(this.virtualListSliceSizeComputed / 2), this.virtualListOptionsLength - this.virtualListSliceSizeComputed)),
        to = from + this.virtualListSliceSizeComputed,
        repositionScroll = to >= this.virtualListOptionsLength || fromScroll !== true || from < this.virtualListSliceRange.from

      if (from === this.virtualListSliceRange.from && to === this.virtualListSliceRange.to) {
        if (fromScroll === true) {
          return
        }
      }
      else {
        this.__setPreventNextScroll(fromScroll)
        this.virtualListSliceRange = { from, to }
      }

      if ((fromScroll === true && to >= this.virtualListOptionsLength) || toIndex >= this.virtualListOptionsLength) {
        toIndex = this.virtualListOptionsLength - 1
      }

      this.$nextTick(() => {
        const content = target === void 0 ? null : target.querySelector('.q-virtual-list__content')

        if (content === null) {
          return
        }

        const children = content.children

        let marginDiff = 0

        for (let i = children.length - 1; i >= 0; i--) {
          const diff = children[i][this.__domProps.childSize] - this.virtualListSizes[from + i]

          if (diff !== 0) {
            marginDiff += diff
            this.virtualListSizes[from + i] += diff
          }
        }

        const
          margin = this.virtualListSizes.slice(from).reduce((acc, h) => acc + h, 0),
          size = margin + this.virtualListSizes.slice(0, from).reduce((acc, h) => acc + h, 0),
          padding = this.virtualListSize % this.virtualListMaxPadding + size - this.virtualListSize

        if (this.virtualListMargin !== margin || this.virtualListSize !== size) {
          this.virtualListMargin = margin
          this.virtualListSize = size

          this.__setPreventNextScroll(fromScroll)
          // content.previousSibling is the last padding block
          content.previousSibling.style.cssText = padding >= 0
            ? `${this.__domProps.size}: ${padding}px; ${this.__domProps.marginCSS}: 0px`
            : `${this.__domProps.size}: 0px; ${this.__domProps.marginCSS}: ${padding}px`
          content.style[this.__domProps.margin] = `-${margin}px`
        }

        if (repositionScroll === true) {
          if (fromScroll !== true) {
            this.__setPreventNextScroll()
            target[this.__domProps.scroll] = this.virtualListSizes.slice(0, toIndex).reduce((acc, h) => acc + h, 0) - scrollOffset
          }
          else if (marginDiff !== 0 && toIndex > 0 && toIndex < this.virtualListOptionsLength) {
            this.__setPreventNextScroll(fromScroll)
            target[this.__domProps.scroll] += marginDiff
          }
        }
      })
    },

    __padVirtualList (h, content, useBg) {
      const
        list = [],
        staticClass = 'q-virtual-list__padding' + (useBg === true ? ' q-virtual-list__padding--bg' : '')

      for (let i = Math.trunc(this.virtualListSize / this.virtualListMaxPadding); i > 0; i--) {
        list.push(h('div', { staticClass, style: { [this.__domProps.size]: `${this.virtualListMaxPadding}px` } }))
      }
      list.push(h('div', { staticClass, style: { [this.__domProps.size]: `${this.virtualListSize % this.virtualListMaxPadding}px` } }))

      list.push(h('div', {
        staticClass: 'q-virtual-list__content',
        style: {
          [this.__domProps.margin]: `-${this.virtualListMargin}px`
        }
      }, content))

      return list
    },

    __resetVirtualListSlice (index) {
      this.__setPreventNextScroll(true)
      this.virtualListSliceRange = { from: 0, to: this.virtualListSliceSizeComputed }
      this.__hydrateVirtualList({ target: this.__getVirtualListEl() }, index)
    },

    __setSizeKeys (horizontal) {
      if (horizontal === true) {
        this.__domProps = {
          size: 'width',
          childSize: 'offsetWidth',
          targetSize: 'clientWidth',
          scrollSize: 'scrollWidth',
          margin: 'marginLeft',
          marginCSS: 'margin-left',
          scroll: 'scrollLeft',
          offset: 'offsetLeft'
        }
        if (typeof window === 'undefined') {
          this.virtualListSliceSizeComputed = this.virtualListSliceSize
        }
        else {
          this.virtualListSliceSizeComputed = Math.max(this.virtualListSliceSize, Math.ceil(window.innerWidth / this.virtualListItemDefaultSize * 1.2))
        }
      }
      else {
        this.__domProps = {
          size: 'height',
          childSize: 'offsetHeight',
          targetSize: 'clientHeight',
          scrollSize: 'scrollHeight',
          margin: 'marginTop',
          marginCSS: 'margin-top',
          scroll: 'scrollTop',
          offset: 'offsetTop'
        }
        if (typeof window === 'undefined') {
          this.virtualListSliceSizeComputed = this.virtualListSliceSize
        }
        else {
          this.virtualListSliceSizeComputed = Math.max(this.virtualListSliceSize, Math.ceil(window.innerHeight / this.virtualListItemDefaultSize * 1.2))
        }
      }
    }
  },

  created () {
    this.__setSizeKeys()
  },

  mounted () {
    this.__setSizeKeys(this.horizontal)

    this.__setVirtualListSliceRange = this.$q.platform.is.ios === true || this.$q.platform.is.safari === true
      ? frameDebounce(this.__setVirtualListSliceRange)
      : debounce(this.__setVirtualListSliceRange, 50)
  },

  beforeDestroy () {
    clearTimeout(this.virtualListHidrateTimer)
  }
}
