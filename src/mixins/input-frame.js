import { QIcon } from '../components/icon'
import { stopAndPrevent } from '../utils/event'
import AlignMixin from './align'

const marginal = {
  type: Array,
  validator: v => v.every(i => 'icon' in i)
}

export default {
  mixins: [AlignMixin],
  components: {
    QIcon
  },
  props: {
    prefix: String,
    suffix: String,
    stackLabel: String,
    floatLabel: String,
    placeholder: String,
    error: Boolean,
    warning: Boolean,
    disable: Boolean,
    readonly: Boolean,
    clearable: Boolean,
    color: {
      type: String,
      default: 'primary'
    },
    align: {
      default: 'left'
    },
    dark: Boolean,
    before: marginal,
    after: marginal,
    inverted: Boolean,
    invertedLight: Boolean,
    dense: Boolean,
    box: Boolean,
    fullWidth: Boolean,
    outline: Boolean,
    textarea: Boolean,
    hideUnderline: Boolean,
    clearValue: {},
    noParentField: Boolean
  },
  computed: {
    inputPlaceholder () {
      if ((!this.floatLabel && !this.stackLabel) || this.labelIsAbove) {
        return this.placeholder
      }
    },
    isFullWidth () {
      return !this.textarea && this.fullWidth
    },
    isOutline () {
      return !this.textarea && !this.isFullWidth && this.outline
    },
    isBox () {
      return !this.textarea && !this.isFullWidth && !this.isOutline && this.box
    },
    isInverted () {
      return !this.isFullWidth && !this.isOutline && !this.isBox && (this.inverted || this.invertedLight)
    },
    isInvertedLight () {
      return this.isInverted && ((this.invertedLight && !this.hasError) || (this.inverted && this.hasWarning))
    },
    isStandard () {
      return !this.textarea && !this.isFullWidth && !this.isOutline && !this.isBox && !this.isInverted
    },
    isHideUnderline () {
      return this.isStandard && this.hideUnderline
    },
    labelIsAbove () {
      return this.focused || this.length || this.additionalLength || this.stackLabel
    },
    hasContent () {
      return this.length > 0 || this.additionalLength > 0 || this.placeholder || this.placeholder === 0
    },
    editable () {
      return !this.disable && !this.readonly
    },
    computedClearValue () {
      return this.clearValue === void 0 ? null : this.clearValue
    },
    isClearable () {
      return this.editable && this.clearable && this.computedClearValue !== this.model
    },
    hasError () {
      return !!((!this.noParentField && this.field && this.field.error) || this.error)
    },
    hasWarning () {
      // error is the higher priority
      return !!(!this.hasError && ((!this.noParentField && this.field && this.field.warning) || this.warning))
    },
    fakeInputValue () {
      return this.actualValue || this.actualValue === 0
        ? this.actualValue
        : this.placeholder
    },
    fakeInputClasses () {
      const hasValue = this.actualValue || this.actualValue === 0
      return [this.alignClass, {
        invisible: (this.stackLabel || this.floatLabel) && !this.labelIsAbove && !hasValue,
        'q-input-target-placeholder': !hasValue && this.inputPlaceholder
      }]
    }
  },
  methods: {
    clear (evt) {
      if (!this.editable) {
        return
      }
      evt && stopAndPrevent(evt)
      const val = this.computedClearValue
      if (this.__setModel) {
        this.__setModel(val, true)
      }
      this.$emit('clear', val)
    }
  }
}
