import Vue from 'vue'

import HistoryMixin from '../../mixins/history.js'
import ModelToggleMixin from '../../mixins/model-toggle.js'
import PortalMixin from '../../mixins/portal.js'
import PreventScrollMixin from '../../mixins/prevent-scroll.js'

import { noop } from '../../utils.js'
import { childHasFocus } from '../../utils/dom.js'
import EscapeKey from '../../utils/escape-key.js'
import slot from '../../utils/slot.js'
import { create, stop, stopAndPrevent } from '../../utils/event.js'

let maximizedModals = 0

const inputTypesWithKeyboard = ['color', 'date', 'datetime-local', 'email', 'month', 'number', 'password', 'serach', 'tel', 'text', 'time', 'url', 'week', 'datetime']

const positionClass = {
  standard: 'fixed-full flex-center',
  top: 'fixed-top justify-center',
  bottom: 'fixed-bottom justify-center',
  right: 'fixed-right items-center',
  left: 'fixed-left items-center'
}

const transitions = {
  standard: ['scale', 'scale'],
  top: ['slide-down', 'slide-up'],
  bottom: ['slide-up', 'slide-down'],
  right: ['slide-left', 'slide-right'],
  left: ['slide-right', 'slide-left']
}

export default Vue.extend({
  name: 'QDialog',

  mixins: [ HistoryMixin, ModelToggleMixin, PortalMixin, PreventScrollMixin ],

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

    transitionShow: String,
    transitionHide: String
  },

  data () {
    return {
      transitionState: this.showing,
      iosKeyboard: false
    }
  },

  watch: {
    showing (val) {
      if (this.transitionShowComputed !== this.transitionHideComputed) {
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

    useBackdrop (v) {
      this.__preventScroll(v)
      this.__preventFocusout(v)
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

    transitionShowComputed () {
      return 'q-transition--' + (this.transitionShow === void 0 ? transitions[this.position][0] : this.transitionShow)
    },

    transitionHideComputed () {
      return 'q-transition--' + (this.transitionHide === void 0 ? transitions[this.position][1] : this.transitionHide)
    },

    transition () {
      return this.transitionState === true
        ? this.transitionHideComputed
        : this.transitionShowComputed
    },

    useBackdrop () {
      return this.showing === true && this.seamless !== true
    },

    hideOnRouteChange () {
      return this.persistent !== true &&
        this.noRouteDismiss !== true &&
        this.seamless !== true
    },

    __onTouchMove () {
      return this.iosKeyboard === true ? noop : stopAndPrevent
    }
  },

  methods: {
    focus () {
      let node = this.__getInnerNode()

      if (node !== void 0 && node.contains(document.activeElement) !== true) {
        node = node.querySelector('[autofocus]') || node
        node.focus()
      }
    },

    shake () {
      this.focus()

      const node = this.__getInnerNode()

      if (node !== void 0) {
        node.classList.remove('q-animate--scale')
        node.classList.add('q-animate--scale')
        clearTimeout(this.shakeTimeout)
        this.shakeTimeout = setTimeout(() => {
          node.classList.remove('q-animate--scale')
        }, 170)
      }
    },

    __getInnerNode () {
      return this.__portal !== void 0 && this.__portal.$refs !== void 0
        ? this.__portal.$refs.inner
        : void 0
    },

    __show (evt) {
      this.__addHistory()

      // IE can have null document.activeElement
      this.__refocusTarget = this.noRefocus === false && document.activeElement !== null
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

      this.__showPortal()

      if (this.noFocus !== true) {
        // IE can have null document.activeElement
        document.activeElement !== null && document.activeElement.blur()
        this.__nextTick(this.focus)
      }

      let delays = this.__isIos === true && this.useBackdrop === true && this.position === 'bottom'
        ? [ 0, 300 ]
        : [ 100, 200 ]

      this.__setTimeout(() => {
        if (this.iosKeyboard === true && this.useBackdrop === true) {
          document.scrollingElement.scrollTop = this.position === 'bottom'
            ? window.innerHeight
            : this.position === 'top' ? 0 : (this.$q.screen.width < 400 ? 130 : 153)
        }

        this.__setTimeout(() => {
          if (document.activeElement && document.activeElement.autofocus === true) {
            document.activeElement.parentElement.scrollIntoView(true)
          }

          this.$emit('show', evt)
        }, delays[1])
      }, delays[0])
    },

    __hide (evt) {
      this.__removeHistory()
      this.__cleanup(true)

      // check null for IE
      if (this.__refocusTarget !== void 0 && this.__refocusTarget !== null) {
        this.__refocusTarget.focus()
      }

      this.$el.dispatchEvent(create('popup-hide', { bubbles: true }))

      this.__setTimeout(() => {
        this.__hidePortal()
        this.$emit('hide', evt)
      }, 300)
    },

    __cleanup (hiding) {
      clearTimeout(this.shakeTimeout)
      this.__setIosKeyboard(false)

      if (hiding === true || this.showing === true) {
        EscapeKey.pop(this)
        this.__updateState(false, this.maximized)
        if (this.useBackdrop === true) {
          this.__preventScroll(false)
          this.__preventFocusout(false)
        }
      }
    },

    __updateState (opening, maximized) {
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

    __preventFocusout (state) {
      const action = `${state === true ? 'add' : 'remove'}EventListener`

      if (this.$q.platform.is.desktop === true || this.__isIos === true) {
        document.body[action]('focusin', this.__onFocusChange, true)
      }

      // Required to detect keyboard closing
      if (this.__isIos === true) {
        document.body[action]('focusout', this.__onFocusoutChange, true)
      }
    },

    __onAutoClose (e) {
      this.hide(e)
      this.$listeners.click !== void 0 && this.$emit('click', e)
    },

    __onBackdropClick (e) {
      if (this.persistent !== true && this.noBackdropDismiss !== true) {
        this.hide(e)
      }
      else {
        this.shake()
      }
    },

    __onFocusChange (e) {
      // the focus is not in a vue child component
      if (
        this.showing === true &&
        this.__portal !== void 0 &&
        childHasFocus(this.__portal.$el, e.target) !== true
      ) {
        this.focus()
      }

      if (this.__isIos === true && e !== void 0 && e.target !== void 0) {
        const nodeName = e.target.nodeName.toLowerCase()

        this.__setIosKeyboard(nodeName === 'textarea' ||
          (nodeName === 'input' && inputTypesWithKeyboard.indexOf(e.target.type.toLowerCase()) > -1) ||
          (e.path !== void 0 && e.path.some(el => el.hasAttribute !== void 0 && el.hasAttribute('contenteditable')) === true)
        )
      }
    },

    // Only called on iOS to detect keyboard hide
    __onFocusoutChange () {
      this.iosKeyboard === true && this.__setIosKeyboard(false)
    },

    __setIosKeyboard (status) {
      if (this.iosKeyboard !== status) {
        this.iosKeyboard = status
      }
    },

    __renderPortal (h) {
      const on = {
        ...this.$listeners,
        // stop propagating this events from children
        input: stop,
        'popup-show': stop,
        'popup-hide': stop
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
              touchmove: this.__onTouchMove, // prevent iOS page scroll
              click: this.__onBackdropClick
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
    }
  },

  mounted () {
    this.__processModelChange(this.value)
    // discriminate between mac laptop and ipad with request desktop site
    this.__isIos = this.$q.platform.is.ios === true || (this.$q.platform.is.mac === true && this.$q.platform.has.touch === true)
  },

  beforeDestroy () {
    this.__cleanup()
  }
})
