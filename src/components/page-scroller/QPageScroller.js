import Vue from 'vue'

import QPageSticky from '../page-sticky/QPageSticky.js'
import { getScrollTarget, setScrollPosition } from '../../utils/scroll.js'

export default Vue.extend({
  name: 'QPageScroller',

  mixins: [ QPageSticky ],

  props: {
    scrollOffset: {
      type: Number,
      default: 1000
    },

    reverse: Boolean,

    duration: {
      type: Number,
      default: 300
    },

    offset: {
      default: () => [18, 18]
    }
  },

  inject: {
    layout: {
      default () {
        console.error('QPageScroller needs to be used within a QLayout')
      }
    }
  },

  data () {
    return {
      showing: this.__isVisible()
    }
  },

  computed: {
    height () {
      return this.layout.container === true
        ? this.layout.containerHeight
        : this.layout.height
    },

    onEvents () {
      return {
        ...this.qListeners,
        click: this.__onClick
      }
    }
  },

  watch: {
    'layout.scroll.position' () {
      this.__updateVisibility()
    },

    reverse: {
      handler (val) {
        if (val === true) {
          if (this.heightWatcher === void 0) {
            this.heightWatcher = this.$watch('height', this.__updateVisibility)
          }
        }
        else if (this.heightWatcher !== void 0) {
          this.__cleanup()
        }
      },
      immediate: true
    }
  },

  methods: {
    __isVisible () {
      return this.reverse === true
        ? this.__getScrollHeight() - this.layout.scroll.position > this.scrollOffset
        : this.layout.scroll.position > this.scrollOffset
    },

    __getScrollHeight () {
      return 0
    },

    __getScrollHeightClient () {
      return getScrollTarget(this.layout.container === true ? this.$el.parentElement : this.layout.$el).scrollHeight - this.height
    },

    __onClick (e) {
      const target = this.layout.container === true
        ? getScrollTarget(this.$el.parentElement)
        : getScrollTarget(this.layout.$el)

      this.__updateVisibility()
      setScrollPosition(target, this.reverse === true ? target.scrollHeight : 0, this.duration)
      this.$emit('click', e)
    },

    __updateVisibility () {
      const newVal = this.__isVisible()
      if (this.showing !== newVal) {
        this.showing = newVal
      }
    },

    __cleanup () {
      this.heightWatcher()
      this.heightWatcher = void 0
    }
  },

  render (h) {
    return h('transition', {
      props: { name: 'q-transition--fade' }
    },
    this.showing === true
      ? [
        h('div', {
          staticClass: 'q-page-scroller',
          on: this.onEvents
        }, [
          QPageSticky.options.render.call(this, h)
        ])
      ]
      : null
    )
  },

  mounted () {
    this.__getScrollHeight = this.__getScrollHeightClient
    this.reverse === true && this.layout.container !== true && this.__updateVisibility()
  },

  beforeDestroy () {
    this.heightWatcher !== void 0 && this.__cleanup()
  }
})
