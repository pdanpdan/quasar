<template>
  <div
    class="q-if row no-wrap relative-position"
    :class="classes"
    :tabindex="focusable && !disable ? 0 : -1"
    @click="__onClick"
  >
    <div class="q-if-baseline">|</div>
    <template v-if="before">
      <q-icon
        v-for="item in before"
        :key="`b${item.icon}`"
        class="q-if-control q-if-control-before"
        :class="{hidden: __additionalHidden(item, hasError, hasWarning, length)}"
        :name="item.icon"
        @mousedown.native="__onMouseDown"
        @touchstart.native="__onMouseDown"
        @click.native="__baHandler($event, item)"
      />
    </template>

    <div class="q-if-inner col">
      <div class="row no-wrap">
        <span
          v-if="prefix && isFullWidth"
          class="q-if-addon q-if-addon-left"
          :class="addonClass"
          v-text="prefix"
        />

        <div
          v-if="hasLabel"
          class="q-if-label"
          :class="{
            'q-if-label-above': labelIsAbove
          }"
          v-text="label"
        />

        <span
          v-if="prefix && !isFullWidth"
          class="q-if-addon q-if-addon-left"
          :class="addonClass"
          v-text="prefix"
        />

        <slot/>

        <span
          v-if="suffix"
          class="q-if-addon q-if-addon-right"
          :class="addonClass"
          v-text="suffix"
        />
      </div>
      <div
        v-if="hasLabel"
        class="q-if-label-fake"
        v-text="label"
      />
    </div>

    <template v-if="after">
      <q-icon
        v-for="item in after"
        :key="`a${item.icon}`"
        class="q-if-control"
        :class="[item.class, {hidden: __additionalHidden(item, hasError, hasWarning, length)}]"
        :name="item.icon"
        @mousedown.native="__onMouseDown"
        @touchstart.native="__onMouseDown"
        @click.native="__baHandler($event, item)"
      />
    </template>
    <slot name="after"/>
  </div>
</template>

<script>
import FrameMixin from '../../mixins/input-frame.js'
import ParentFieldMixin from '../../mixins/parent-field.js'

export default {
  name: 'QInputFrame',
  mixins: [FrameMixin, ParentFieldMixin],
  props: {
    focused: Boolean,
    length: Number,
    focusable: Boolean,
    additionalLength: Boolean
  },
  computed: {
    hasStackLabel () {
      return typeof this.stackLabel === 'string' && this.stackLabel.length > 0
    },
    hasLabel () {
      return this.hasStackLabel || (typeof this.floatLabel === 'string' && this.floatLabel.length > 0)
    },
    label () {
      return this.hasStackLabel ? this.stackLabel : this.floatLabel
    },
    addonClass () {
      return {
        'q-if-addon-visible': !this.hasLabel || this.labelIsAbove
      }
    },
    classes () {
      const cls = []

      this.label && cls.push('q-if-has-label')
      this.focused && cls.push('q-if-focused')
      this.hasError && cls.push('q-if-error')
      this.hasWarning && cls.push('q-if-warning')
      this.disable && cls.push('q-if-disabled')
      this.readonly && cls.push('q-if-readonly')
      this.focusable && !this.disable && cls.push('q-if-focusable')
      this.isInverted && cls.push('q-if-inverted')
      this.isInvertedLight && cls.push('q-if-inverted-light')
      this.lightColor && cls.push('q-if-light-color')
      this.dark && cls.push('q-if-dark')
      this.dense && cls.push('q-if-dense')
      this.textarea && cls.push('q-if-textarea')
      this.isFullWidth && cls.push('q-if-full-width')
      this.isOutline && cls.push('q-if-outline')
      this.isBox && cls.push('q-if-box')
      this.isHideUnderline && cls.push('q-if-hide-underline')
      this.isStandard && cls.push('q-if-standard')
      this.hasContent && cls.push('q-if-has-content')

      const color = this.hasError ? 'negative' : (this.hasWarning ? 'warning' : this.color)

      if (this.isInverted) {
        cls.push(`bg-${color}`)
        cls.push(`text-${this.isInvertedLight ? 'black' : 'white'}`)
      }
      else if (color) {
        cls.push(`text-${color}`)
      }

      return cls
    }
  },
  methods: {
    __onClick (e) {
      this.$emit('click', e)
    },
    __onMouseDown (e) {
      this.$nextTick(() => this.$emit('focus', e))
    },
    __additionalHidden (item, hasError, hasWarning, length) {
      if (item.condition !== void 0) {
        return item.condition === false
      }
      return (
        (item.content !== void 0 && !item.content === (length > 0)) ||
        (item.error !== void 0 && !item.error === hasError) ||
        (item.warning !== void 0 && !item.warning === hasWarning)
      )
    },
    __baHandler (evt, item) {
      if (!item.allowPropagation) {
        evt.stopPropagation()
      }
      if (item.handler) {
        item.handler(evt)
      }
    }
  }
}
</script>
