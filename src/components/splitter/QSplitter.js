import Vue from 'vue'

import TouchPan from '../../directives/TouchPan.js'

import slot from '../../utils/slot.js'
import { stop } from '../../utils/event.js'

const reSplitValue = /^\s*(\+?(?:[0-9]+(?:\.[0-9]*)?|\.[0-9]+)(?:[eE][+-]?[0-9]+)?)\s*([^\s]*)\s*$/

export default Vue.extend({
  name: 'QSplitter',

  directives: {
    TouchPan
  },

  props: {
    value: {
      type: [Number, String],
      required: true
    },
    reverseModel: Boolean,
    horizontal: Boolean,

    limits: {
      type: Array,
      default: () => [10, 90],
      validator: v => {
        if (v.length !== 2) return false
        if (typeof v[0] !== 'number' || typeof v[1] !== 'number') return false
        return v[0] >= 0 && v[0] <= v[1]
      }
    },

    disable: Boolean,

    dark: Boolean,

    beforeClass: [Array, String, Object],
    afterClass: [Array, String, Object],

    separatorClass: [Array, String, Object],
    separatorStyle: [Array, String, Object]
  },

  watch: {
    value: {
      immediate: true,
      handler (v) {
        this.__normalize(v, this.limits)
      }
    },

    limits: {
      deep: true,
      handler (v) {
        this.__normalize(this.value, v)
      }
    }
  },

  computed: {
    classes () {
      return (this.horizontal === true ? 'column' : 'row') +
        ` q-splitter--${this.horizontal === true ? 'horizontal' : 'vertical'}` +
        ` q-splitter--${this.disable === true ? 'disabled' : 'workable'}` +
        (this.dark === true ? ' q-splitter--dark' : '')
    },

    prop () {
      return this.horizontal === true ? 'height' : 'width'
    },

    computedValue () {
      const match = reSplitValue.exec(this.value)

      if (match === null) {
        return [0, '', '%', '0%']
      }

      const unit = match[2] === '' ? '%' : match[2].toLowerCase()

      return [ parseFloat(match[1]), match[2], unit, match[1] + unit ]
    },

    modelStyle () {
      return { [this.prop]: this.computedValue[3] }
    },

    restStyle () {
      return { [this.prop]: 'calc(100% - ' + this.computedValue[3] + ')' }
    }
  },

  methods: {
    __pan (evt) {
      if (evt.isFirst) {
        this.__value = this.computedValue[0]
        this.__dir = this.horizontal === true ? 'up' : 'left'
        this.__multiplier = (this.reverseModel !== true ? 1 : -1) *
          (this.horizontal === true ? 1 : (this.$q.lang.rtl === true ? -1 : 1)) *
          this.__value /
          this.$refs[this.reverseModel !== true ? 'before' : 'after'].getBoundingClientRect()[this.prop]

        this.$el.classList.add('q-splitter--active')
        return
      }

      if (evt.isFinal) {
        if (this.__normalized !== this.computedValue[0]) {
          this.$emit('input', this.__normalized + this.computedValue[1])
        }

        this.$el.classList.remove('q-splitter--active')
        return
      }

      const val = this.__value +
        this.__multiplier *
        (evt.direction === this.__dir ? -1 : 1) *
        evt.distance[this.horizontal === true ? 'y' : 'x']

      this.__normalized = Math.min(this.limits[1], Math.max(this.limits[0], val))

      if (this.computedValue[2] === 'px') {
        this.__normalized = Math.round(this.__normalized)
      }

      const
        modelStyle = this.__normalized + this.computedValue[2],
        restStyle = 'calc(100% - ' + modelStyle + ')'

      this.$refs.before.style[this.prop] = this.reverseModel !== true ? modelStyle : restStyle
      this.$refs.after.style[this.prop] = this.reverseModel !== true ? restStyle : modelStyle
    },

    __normalize (val, limits) {
      if (val < limits[0]) {
        this.$emit('input', limits[0] + this.computedValue[1])
      }
      else if (val > limits[1]) {
        this.$emit('input', limits[1] + this.computedValue[1])
      }
    }
  },

  render (h) {
    return h('div', {
      staticClass: 'q-splitter no-wrap',
      class: this.classes,
      on: this.$listeners
    }, [
      h('div', {
        ref: 'before',
        staticClass: 'q-splitter__panel q-splitter__before',
        style: this.reverseModel !== true ? this.modelStyle : this.restStyle,
        class: this.beforeClass,
        on: { input: stop }
      }, slot(this, 'before')),

      h('div', {
        staticClass: 'q-splitter__separator',
        style: this.separatorStyle,
        class: this.separatorClass
      }, [
        h('div', {
          staticClass: 'absolute-full q-splitter__separator-area',
          directives: this.disable === true ? void 0 : [{
            name: 'touch-pan',
            value: this.__pan,
            modifiers: {
              horizontal: this.horizontal !== true,
              vertical: this.horizontal,
              prevent: true,
              stop: true,
              mouse: true,
              mouseAllDir: true
            }
          }]
        }, slot(this, 'separator'))
      ]),

      h('div', {
        ref: 'after',
        staticClass: 'q-splitter__panel q-splitter__after',
        style: this.reverseModel !== true ? this.restStyle : this.modelStyle,
        class: this.afterClass,
        on: { input: stop }
      }, slot(this, 'after'))
    ].concat(slot(this, 'default')))
  }
})
