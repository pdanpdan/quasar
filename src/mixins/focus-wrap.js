import { mergeSlot } from '../utils/slot.js'

export default {
  computed: {
    focusElementDefs () {
      return {
        firstTarget: {
          ref: 'firstFocusTarget',
          staticClass: 'hide-outline absolute no-pointer-events',
          attrs: { tabindex: -1 }
        },
        lastTarget: {
          ref: 'lastFocusTarget',
          staticClass: 'hide-outline absolute no-pointer-events',
          attrs: { tabindex: -1 }
        },
        lastGuard: this.$createElement('span', {
          staticClass: 'hide-outline absolute no-pointer-events',
          attrs: { tabindex: 0 },
          on: {
            focus: this.__focusFirst
          }
        })
      }
    }
  },

  methods: {
    __focusFirst () {
      if (this.__portal !== void 0 && this.__portal.$refs !== void 0 && this.__portal.$refs.firstFocusTarget !== void 0) {
        this.__portal.$refs.firstFocusTarget.focus()
      }
    },

    __focusLast () {
      if (this.__portal !== void 0 && this.__portal.$refs !== void 0 && this.__portal.$refs.lastFocusTarget !== void 0) {
        this.__portal.$refs.lastFocusTarget.focus()
      }
    },

    __getFocusWrappedContent (h, slotName) {
      return mergeSlot([
        h('span', this.focusElementDefs.firstTarget)
      ], this, slotName).concat(
        h('span', this.focusElementDefs.lastTarget),
        this.focusElementDefs.lastGuard
      )
    }
  }
}
