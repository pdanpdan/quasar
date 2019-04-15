import Vue from 'vue'

import ModelToggleMixin from '../../mixins/model-toggle.js'
import PortalMixin from '../../mixins/portal.js'
import PreventScrollMixin from '../../mixins/prevent-scroll.js'

import EscapeKey from '../../utils/escape-key.js'
import slot from '../../utils/slot.js'
import { create, stop, stopAndPrevent } from '../../utils/event.js'

let maximizedModals = 0

const positionClass = {
  standard: 'fixed-full flex-center',
  top: 'fixed-top justify-center',
  bottom: 'fixed-bottom justify-center',
  right: 'fixed-right items-center',
  left: 'fixed-left items-center'
}

const transitions = {
  top: ['down', 'up'],
  bottom: ['up', 'down'],
  right: ['left', 'right'],
  left: ['right', 'left']
}

export default Vue.extend({
  name: 'QDialog',

  mixins: [ ModelToggleMixin, PortalMixin, PreventScrollMixin ],

  modelToggle: {
    history: true
  },

  props: {
    persistent: Boolean,
    autoClose: Boolean,

    noEscDismiss: Boolean,
    noBackdropDismiss: Boolean,
    noRouteDismiss: Boolean,
    noRefocus: Boolean,
    noFocus: Boolean,

    seamless: Boolean,

    maximized: Boolean,
    fullWidth: Boolean,
    fullHeight: Boolean,

    square: Boolean,

    position: {
      type: String,
      default: 'standard',
      validator (val) {
        return val === 'standard' || ['top', 'bottom', 'left', 'right'].includes(val)
      }
    },

    transitionShow: {
      type: String,
      default: 'scale'
    },
    transitionHide: {
      type: String,
      default: 'scale'
    }
  },

  data () {
    return {
      transitionState: this.showing
    }
  },

  watch: {
    $route () {
      this.persistent !== true &&
        this.noRouteDismiss !== true &&
        this.seamless !== true &&
        this.hide()
    },

    showing (val) {
      if (this.position !== 'standard' || this.transitionShow !== this.transitionHide) {
        this.$nextTick(() => {
          this.transitionState = val
        })
      }
    },

    maximized (newV, oldV) {
      if (this.showing === true) {
        this.__updateState(false, oldV)
        this.__updateState(true, newV)
      }
    },

    seamless (v) {
      this.showing === true && this.__preventScroll(!v)
    },

    useBackdrop (v) {
      document.body[v === true ? 'addEventListener' : 'removeEventListener']('focusin', this.__onChangeFocus)
    }
  },

  computed: {
    classes () {
      return `q-dialog__inner--${this.maximized === true ? 'maximized' : 'minimized'} ` +
        `q-dialog__inner--${this.position} ${positionClass[this.position]}` +
        (this.fullWidth === true ? ' q-dialog__inner--fullwidth' : '') +
        (this.fullHeight === true ? ' q-dialog__inner--fullheight' : '') +
        (this.square === true ? ' q-dialog__inner--square' : '')
    },

    transition () {
      return 'q-transition--' + (
        this.position === 'standard'
          ? (this.transitionState === true ? this.transitionHide : this.transitionShow)
          : 'slide-' + transitions[this.position][this.transitionState === true ? 1 : 0]
      )
    },

    useBackdrop () {
      return this.showing === true && this.seamless !== true
    }
  },

  methods: {
    shake () {
      const node = this.__portal.$refs.inner

      this.focus()

      node.classList.remove('q-animate--scale')
      node.classList.add('q-animate--scale')
      clearTimeout(this.shakeTimeout)
      this.shakeTimeout = setTimeout(() => {
        node.classList.remove('q-animate--scale')
      }, 170)
    },

    focus () {
      let node = this.__portal.$refs.inner

      if (node === void 0 || node.contains(document.activeElement) === true) {
        return
      }

      if (this.$q.platform.is.ios) {
        // workaround the iOS hover/touch issue
        this.avoidAutoClose = true
        node.click()
        this.avoidAutoClose = false
      }

      node = node.querySelector('[autofocus]') || node
      node.focus()
    },

    __show (evt) {
      clearTimeout(this.timer)

      this.__refocusTarget = this.noRefocus === false
        ? document.activeElement
        : void 0

      this.$el.dispatchEvent(create('popup-show', { bubbles: true }))

      this.__updateState(true, this.maximized)

      EscapeKey.register(this, () => {
        if (this.seamless !== true) {
          if (this.persistent === true || this.noEscDismiss === true) {
            this.maximized !== true && this.shake()
          }
          else {
            this.$emit('escape-key')
            this.hide()
          }
        }
      })

      if (this.useBackdrop === true) {
        document.body.addEventListener('focusin', this.__onChangeFocus)
      }

      this.__showPortal()

      if (this.noFocus !== true) {
        this.$nextTick(() => {
          this.focus()
        })
      }

      this.timer = setTimeout(() => {
        this.$emit('show', evt)
      }, 300)
    },

    __hide (evt) {
      this.__cleanup(true)

      if (this.__refocusTarget !== void 0) {
        this.__refocusTarget.focus()
      }

      this.timer = setTimeout(() => {
        this.__hidePortal()

        this.$el.dispatchEvent(create('popup-hide', { bubbles: true }))

        this.$emit('hide', evt)
      }, 300)
    },

    __cleanup (hiding) {
      clearTimeout(this.timer)
      clearTimeout(this.shakeTimeout)

      document.body.removeEventListener('focusin', this.__onChangeFocus)

      if (hiding === true || this.showing === true) {
        EscapeKey.pop(this)
        this.__updateState(false, this.maximized)
      }
    },

    __updateState (opening, maximized) {
      if (this.seamless !== true) {
        this.__preventScroll(opening)
      }

      if (maximized === true) {
        if (opening === true) {
          maximizedModals < 1 && document.body.classList.add('q-body--dialog')
        }
        else if (maximizedModals < 2) {
          document.body.classList.remove('q-body--dialog')
        }
        maximizedModals += opening === true ? 1 : -1
      }
    },

    __onAutoClose (e) {
      if (this.avoidAutoClose !== true) {
        this.hide(e)
        this.$listeners.click !== void 0 && this.$emit('click', e)
      }
    },

    __onBackdropDismiss (e) {
      if (this.persistent !== true && this.noBackdropDismiss !== true) {
        this.hide(e)
      }
      else {
        this.shake()
      }
    },

    __onChangeFocus (e) {
      if (
        this.__portal === void 0 ||
        this.__portal.$el === void 0 ||
        this.__portal.$el.nextElementSibling !== null ||
        this.__portal.$el.contains(e.target) === true
      ) {
        return
      }

      this.__onBackdropDismiss(e)
    },

    __render (h) {
      const on = {
        ...this.$listeners,
        input: stop
      }

      if (this.autoClose === true) {
        on.click = this.__onAutoClose
      }

      return h('div', {
        staticClass: 'q-dialog fullscreen no-pointer-events',
        class: this.contentClass,
        style: this.contentStyle,
        attrs: this.$attrs
      }, [
        h('transition', {
          props: { name: 'q-transition--fade' }
        }, this.useBackdrop === true ? [
          h('div', {
            staticClass: 'q-dialog__backdrop fixed-full',
            on: {
              touchmove: stopAndPrevent // prevent iOS page scroll
            }
          })
        ] : null),

        h('transition', {
          props: { name: this.transition }
        }, [
          this.showing === true ? h('div', {
            ref: 'inner',
            staticClass: 'q-dialog__inner flex no-pointer-events',
            class: this.classes,
            attrs: { tabindex: -1 },
            on
          }, slot(this, 'default')) : null
        ])
      ])
    },

    __onPortalClose (evt) {
      this.hide(evt)
    }
  },

  mounted () {
    this.value === true && this.show()
  },

  beforeDestroy () {
    this.__cleanup()
  }
})
