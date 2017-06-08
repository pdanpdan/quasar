export default {
  name: 'q-list',
  functional: true,
  props: {
    noBorder: Boolean,
    dark: Boolean,
    dense: Boolean,
    sparse: Boolean,
    striped: Boolean,
    stripedOdd: Boolean,
    delimiter: Boolean,
    insetDelimiter: Boolean,
    multiline: Boolean,
    highlight: Boolean,
    link: Boolean
  },
  render (h, ctx) {
    const
      data = ctx.data,
      prop = ctx.props

    data.class = {
      'q-list': true,
      'no-border': prop.noBorder,
      'q-list-dark': prop.dark,
      'q-list-dense': prop.dense,
      'q-list-sparse': prop.sparse,
      'q-list-striped': prop.striped,
      'q-list-striped-odd': prop.stripedOdd,
      'q-list-delimiter': prop.delimiter,
      'q-list-inset-delimiter': prop.insetDelimiter,
      'q-list-multiline': prop.multiline,
      'q-list-highlight': prop.highlight,
      'q-list-link': prop.link
    }

    return h(
      'div',
      data,
      ctx.children
    )
  }
}
