import Vue from 'vue'

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

    bgPlaceholder: Boolean,

    scrollTarget: {
      default: void 0
    }
  },

  computed: {
    listScope () {
      if (this.virtualListOptionsLength === 0) {
        return []
      }

      return this.options.slice(this.virtualListSliceRange.from, this.virtualListSliceRange.to).map((item, i) => ({
        index: this.virtualListSliceRange.from + i,
        item
      }))
    },

    classes () {
      return 'q-virtual-list' + (this.horizontal === true ? '--horizontal' : '--vertical') +
        (this.scrollTarget !== void 0 ? '' : ' scroll')
    },

    attrs () {
      return this.scrollTarget !== void 0 ? void 0 : { tabindex: 0 }
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
    if (this.$scopedSlots.default === void 0) {
      console.error(`VirtualList: default scoped slot is required for rendering`, this)
      return
    }

    return h(this.tag, {
      staticClass: 'q-virtual-list',
      class: this.classes,
      attrs: this.attrs,
      props: this.$attrs
    }, this.__padVirtualList(h, this.listScope.map(this.$scopedSlots.default), this.bgPlaceholder))
  }
})
