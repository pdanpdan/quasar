import Vue from 'vue'

import QItem from '../list/QItem.js'
import QItemSection from '../list/QItemSection.js'
import QItemLabel from '../list/QItemLabel.js'

import VirtualList from '../../mixins/virtual-list.js'

import { listenOpts } from '../../utils/event.js'

export default Vue.extend({
  name: 'QVirtualList',

  mixins: [ VirtualList ],

  props: {
    tag: {
      type: String,
      default: 'div'
    },

    label: [Function, String],
    sanitize: Boolean,

    dense: Boolean,
    dark: Boolean,
    bgPlaceholder: Boolean,

    scrollTarget: {
      default: void 0
    }
  },

  computed: {
    optionScope () {
      return this.virtualListSlice.map((opt, i) => {
        const index = this.virtualListSliceRange.from + i

        const itemProps = {
          tabindex: -1,
          dense: this.dense,
          dark: this.dark
        }

        return {
          index,
          opt,
          sanitize: this.sanitize === true || opt.sanitize === true,
          itemProps
        }
      })
    }
  },

  watch: {
    scrollTarget () {
      this.__unconfigureScrollTarget()
      this.__configureScrollTarget()
    }
  },

  methods: {
    __getVirtualListEl () {
      return this.__virtualListEl
    },

    __getOptionLabel (opt) {
      if (typeof this.label === 'function') {
        return this.optionLabel(opt)
      }
      if (Object(opt) === opt) {
        return typeof this.label === 'string'
          ? opt[this.label]
          : opt.label
      }
      return opt
    },

    __getOptions (h) {
      const fn = this.$scopedSlots.default !== void 0
        ? this.$scopedSlots.default
        : scope => h(QItem, {
          key: scope.index,
          props: scope.itemProps
        }, [
          h(QItemSection, [
            h(QItemLabel, {
              domProps: {
                [scope.sanitize === true ? 'textContent' : 'innerHTML']: this.__getOptionLabel(scope.opt)
              }
            })
          ])
        ])

      return this.__padVirtualList(h, this.optionScope.map(fn), this.bgPlaceholder)
    },

    __configureScrollTarget () {
      this.__scrollTarget = typeof this.scrollTarget === 'string' ? document.querySelector(this.scrollTarget) : this.scrollTarget
      this.__virtualListEl = this.__scrollTarget

      if (this.__scrollTarget === void 0) {
        this.__scrollTarget = this.$el
        this.__virtualListEl = this.__scrollTarget
      }
      else if (this.__scrollTarget === window || this.__scrollTarget === document || this.__scrollTarget === document.body) {
        this.__scrollTarget = window
        this.__virtualListEl = document.scrollingElement
      }

      this.__scrollTarget.addEventListener('scroll', this.__hydrateVirtualList, listenOpts.passive)
    },

    __unconfigureScrollTarget () {
      if (this.__scrollTarget !== void 0) {
        this.__scrollTarget.removeEventListener('scroll', this.__hydrateVirtualList, listenOpts.passive)
        this.__scrollTarget = void 0
      }
    },

    scrollTo (toIndex) {
      this.__setVirtualListSliceRange(parseInt(toIndex, 10), this.__getVirtualListEl())
    }
  },

  mounted () {
    this.__configureScrollTarget()
    this.__resetVirtualListSlice()
  },

  beforeDestroy () {
    this.__unconfigureScrollTarget()
  },

  render (h) {
    const
      attrs = this.__scrollTarget !== this.$el ? this.$attrs : {
        tabindex: 0,
        ...this.$attrs
      },
      type = 'q-virtual-list q-virtual-list' + (this.horizontal === true ? '--horizontal' : '--vertical'),
      staticClass = type + (this.__scrollTarget !== this.$el ? '' : ' scroll')

    return h(this.tag, {
      staticClass,
      attrs
    }, this.__getOptions(h))
  }
})
