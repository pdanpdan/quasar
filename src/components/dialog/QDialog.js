import Vue from 'vue'

import HistoryMixin from '../../mixins/history.js'
import ModelToggleMixin from '../../mixins/model-toggle.js'
import PortalMixin from '../../mixins/portal.js'
import PreventScrollMixin from '../../mixins/prevent-scroll.js'
import AttrsMixin, { ariaHidden } from '../../mixins/attrs.js'
import FocusWrapMixin from '../../mixins/focus-wrap.js'

import { childHasFocus } from '../../utils/dom.js'
import EscapeKey from '../../utils/escape-key.js'
import { create, stop } from '../../utils/event.js'
import { focusNoScroll, EDITABLE_SELECTOR } from '../../utils/focus-manager.js'
import { animScrollTo } from '../../utils/scroll.js'

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

  mixins: [
    AttrsMixin,
    HistoryMixin,
    ModelToggleMixin,
    PortalMixin,
    PreventScrollMixin,
    FocusWrapMixin
  ],

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
      validator: val => val === 'standard' ||
        ['top', 'bottom', 'left', 'right'].includes(val)
    },

    transitionShow: String,
    transitionHide: String
  },

  data () {
    return {
      transitionState: this.showing
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

    seamless (v) {
      this.showing === true && this.__preventScroll(v !== true)
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

    onBackdropEvents () {
      return {
        click: this.__onBackdropClick
      }
    },

    onInnerEvents () {
      const on = {
        ...this.qListeners,
        // stop propagating these events from children
        input: stop,
        'popup-show': stop,
        'popup-hide': stop
      }

      if (this.autoClose === true) {
        on.click = this.__onAutoClose
      }

      return on
    },

    onTransitionEvents () {
      return {
        'before-enter': this.__onTransitionBeforeEnter,
        enter: this.__onTransitionEnter,
        'after-enter': this.__onTransitionAfterEnter,
        'enter-cancelled': this.__onTransitionEnterCancelled,
        'before-leave': this.__onTransitionBeforeLeave,
        'after-leave': this.__onTransitionAfterLeave
      }
    }
  },

  methods: {
    shake () {
      this.__focusFirst()
      this.$emit('shake')

      const node = this.__getInnerNode()

      if (node !== void 0) {
        node.classList.remove('q-animate--scale')
        node.classList.add('q-animate--scale')
        clearTimeout(this.shakeTimeout)
        this.shakeTimeout = setTimeout(() => {
          node.classList.remove('q-animate--scale')

          this.__mobileScroll()
        }, 170)
      }
    },

    __show () {
      this.__addHistory()

      // IE can have null document.activeElement
      this.__refocusTarget = this.noRefocus === false && document.activeElement !== null
        ? document.activeElement
        : void 0

      this.$el.dispatchEvent(create('popup-show', { bubbles: true }))

      EscapeKey.register(this, () => {
        if (this.seamless !== true) {
          // if it should not close then focus at start
          if (this.persistent === true || this.noEscDismiss === true) {
            if (this.maximized !== true) {
              this.shake()
            }
            else {
              this.__focusFirst()
            }
          }
          else {
            this.$emit('escape-key')
            this.hide()
          }
        }
        // if focus is in menu focus the activator
        // if focus is outside menu focus menu
        else if (
          this.__refocusTarget !== null &&
          this.__refocusTarget !== void 0 &&
          this.__portal.$el.contains(document.activeElement) === true
        ) {
          focusNoScroll(this.__refocusTarget)
        }
        else {
          this.__focusFirst()
        }
      })

      this.__showPortal()
    },

    __hide () {
      this.__removeHistory()
      this.__cleanup(true)

      this.$el.dispatchEvent(create('popup-hide', { bubbles: true }))
    },

    __onTransitionBeforeEnter (target) {
      // required in order to avoid the "double-tap needed" issue
      this.$q.platform.is.ios === true && target.click()

      this.seamless !== true && this.__preventScroll(true)

      target.setAttribute('data-q-portal-animating', true)
    },

    __onTransitionEnter () {
      this.noFocus !== true && this.focus()

      this.__setTimeout(() => {
        this.__mobileScroll()
      }, 200)
    },

    __onTransitionAfterEnter (target) {
      target.removeAttribute('data-q-portal-animating')

      this.__mobileScroll()

      this.$emit('show', { target })
    },

    __onTransitionEnterCancelled (target) {
      target.removeAttribute('data-q-portal-animating')

      this.seamless !== true && this.__preventScroll(false)
    },

    __onTransitionBeforeLeave () {
      // check null for IE
      if (this.__refocusTarget !== void 0 && this.__refocusTarget !== null) {
        focusNoScroll(this.__refocusTarget)
      }
      this.seamless !== true && (document.documentElement.scrollTop = 0)
    },

    __onTransitionAfterLeave (target) {
      this.__hidePortal()

      this.seamless !== true && this.__preventScroll(false)

      this.$emit('hide', { target })
    },

    __onAutoClose (e) {
      this.hide(e)
      this.qListeners.click !== void 0 && this.$emit('click', e)
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
    },

    __cleanup (hiding) {
      clearTimeout(this.shakeTimeout)

      if (hiding === true || this.showing === true) {
        EscapeKey.pop(this)
      }
    },

    __mobileScroll () {
      if (
        (
          this.$q.platform.is.ios === true ||
          this.$q.platform.is.nativeMobile === true ||
          window.matchMedia('(display-mode: standalone)').matches === true
        ) &&
        document.activeElement &&
        document.activeElement.matches(EDITABLE_SELECTOR) === true
      ) {
        const
          { top, bottom } = document.activeElement.getBoundingClientRect(),
          { innerHeight } = window,
          height = window.visualViewport !== void 0
            ? window.visualViewport.height
            : innerHeight

        if (top <= 0) {
          document.scrollingElement.scrollTop = 0
        }
        else if (top > 0 && bottom > height / 1.5) {
          animScrollTo(
            document.scrollingElement,
            Math.min(
              document.scrollingElement.scrollHeight - height,
              bottom >= innerHeight
                ? Infinity
                : Math.ceil(document.scrollingElement.scrollTop + bottom - height / 1.5)
            ),
            150
          )
        }
      }
    },

    __renderPortal (h) {
      return h('div', {
        staticClass: `q-dialog fullscreen no-pointer-events q-dialog--${this.seamless === true ? 'seamless' : 'modal'}`,
        class: this.contentClass,
        style: this.contentStyle,
        attrs: this.qAttrs
      }, [
        h('transition', {
          props: { name: 'q-transition--fade' }
        }, this.useBackdrop === true ? [
          h('div', {
            staticClass: 'q-dialog__backdrop fixed-full',
            attrs: ariaHidden,
            on: this.onBackdropEvents
          })
        ] : null),

        h('transition', {
          props: { name: this.transition },
          on: this.onTransitionEvents
        }, [
          this.showing === true ? h('div', {
            ref: 'inner',
            staticClass: 'q-dialog__inner flex no-pointer-events',
            class: this.classes,
            attrs: { tabindex: -1 },
            on: this.onInnerEvents
          }, this.__getFocusWrappedContent('default')) : null
        ])
      ])
    }
  },

  mounted () {
    this.__processModelChange(this.value)
  },

  beforeDestroy () {
    this.__cleanup()
    this.__preventScroll(false)
  }
})
