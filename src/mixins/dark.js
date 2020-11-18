export default {
  props: {
    dark: {
      type: Boolean,
      default: null
    }
  },

  computed: {
    isDark () {
      return this.dark === null
        ? this.$q.dark.isActive
        : this.dark
    },

    darkSuffix () {
      return this.dark === null && this.$q.dark.mode === 'auto'
        ? 'dark-auto'
        : (
          this.isDark === true ? 'dark' : 'light'
        )
    }
  }
}
