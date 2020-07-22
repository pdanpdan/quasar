import Vue from 'vue'

import QBtn from '../btn/QBtn.js'
import QIcon from '../icon/QIcon.js'

import FabMixin from '../../mixins/fab.js'

import { mergeSlot } from '../../utils/slot.js'

const anchorMap = {
  start: 'self-end',
  center: 'self-center',
  end: 'self-start'
}

const anchorValues = Object.keys(anchorMap)

const defaultInjectRet = () => { }
const defaultInject = () => defaultInjectRet

export default Vue.extend({
  name: 'QFabAction',

  mixins: [ FabMixin ],

  props: {
    icon: {
      type: String,
      default: ''
    },

    anchor: {
      type: String,
      validator: v => anchorValues.includes(v)
    },

    to: [String, Object],
    replace: Boolean
  },

  inject: {
    __qFabClose: { default: defaultInject },

    __qFabRegister: { default: defaultInject },

    __qFabUnregister: { default: defaultInject }
  },

  data () {
    return {
      showing: true
    }
  },

  computed: {
    classes () {
      const align = anchorMap[this.anchor]
      return this.formClass + (align !== void 0 ? ` ${align}` : '')
    },

    onEvents () {
      return {
        ...this.qListeners,
        click: this.click
      }
    }
  },

  methods: {
    click (e) {
      this.__qFabClose()
      this.$emit('click', e)
    }
  },

  beforeMount () {
    this.__qFabRegister(this)
  },

  beforeDestroy () {
    this.__qFabUnregister(this)
  },

  render (h) {
    const child = []

    this.icon !== '' && child.push(
      h(QIcon, {
        props: { name: this.icon }
      })
    )

    this.label !== '' && child[this.labelProps.action](
      h('div', this.labelProps.data, [ this.label ])
    )

    return h(QBtn, {
      class: this.classes,
      props: {
        ...this.$props,
        noWrap: true,
        stack: this.stacked,
        icon: void 0,
        label: void 0,
        noCaps: true,
        fabMini: true,
        disable: this.showing !== true || this.disable === true
      },
      on: this.onEvents
    }, mergeSlot(child, this, 'default'))
  }
})
