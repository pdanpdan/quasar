export default {
  name: 'QPage',
  inject: {
    pageContainer: {
      default () {
        console.error('QPage needs to be child of QPageContainer')
      }
    },
    layout: {}
  },
  props: {
    padding: Boolean,
    styleFn: Function
  },
  computed: {
    computedStyle () {
      const offset =
        (this.layout.header.space ? this.layout.header.size : 0) +
        (this.layout.footer.space ? this.layout.footer.size : 0)

      return typeof this.styleFn === 'function'
        ? this.styleFn(offset)
        : { minHeight: offset ? `calc(100vh - ${offset}px)` : '100vh' }
    },
    computedClass () {
      if (this.padding) {
        return 'layout-padding'
      }
    }
  },
  render (h) {
    return h('div', {
      staticClass: 'q-layout-page',
      style: this.computedStyle,
      'class': this.computedClass
    }, this.$slots.default)
  }
}
