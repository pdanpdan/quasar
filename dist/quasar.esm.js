/*!
 * Quasar Framework v0.14.0
 * (c) 2016-present Razvan Stoenescu
 * Released under the MIT License.
 */
/* eslint-disable no-useless-escape */
/* eslint-disable no-mixed-operators */

function getUserAgent () {
  return (navigator.userAgent || navigator.vendor || window.opera).toLowerCase()
}

function getMatch (userAgent, platformMatch) {
  var match = /(edge)\/([\w.]+)/.exec(userAgent) ||
    /(opr)[\/]([\w.]+)/.exec(userAgent) ||
    /(vivaldi)[\/]([\w.]+)/.exec(userAgent) ||
    /(chrome)[\/]([\w.]+)/.exec(userAgent) ||
    /(iemobile)[\/]([\w.]+)/.exec(userAgent) ||
    /(version)(applewebkit)[\/]([\w.]+).*(safari)[\/]([\w.]+)/.exec(userAgent) ||
    /(webkit)[\/]([\w.]+).*(version)[\/]([\w.]+).*(safari)[\/]([\w.]+)/.exec(userAgent) ||
    /(webkit)[\/]([\w.]+)/.exec(userAgent) ||
    /(opera)(?:.*version|)[\/]([\w.]+)/.exec(userAgent) ||
    /(msie) ([\w.]+)/.exec(userAgent) ||
    userAgent.indexOf('trident') >= 0 && /(rv)(?::| )([\w.]+)/.exec(userAgent) ||
    userAgent.indexOf('compatible') < 0 && /(mozilla)(?:.*? rv:([\w.]+)|)/.exec(userAgent) ||
    [];

  return {
    browser: match[5] || match[3] || match[1] || '',
    version: match[2] || match[4] || '0',
    versionNumber: match[4] || match[2] || '0',
    platform: platformMatch[0] || ''
  }
}

function getPlatformMatch (userAgent) {
  return /(ipad)/.exec(userAgent) ||
    /(ipod)/.exec(userAgent) ||
    /(windows phone)/.exec(userAgent) ||
    /(iphone)/.exec(userAgent) ||
    /(kindle)/.exec(userAgent) ||
    /(silk)/.exec(userAgent) ||
    /(android)/.exec(userAgent) ||
    /(win)/.exec(userAgent) ||
    /(mac)/.exec(userAgent) ||
    /(linux)/.exec(userAgent) ||
    /(cros)/.exec(userAgent) ||
    /(playbook)/.exec(userAgent) ||
    /(bb)/.exec(userAgent) ||
    /(blackberry)/.exec(userAgent) ||
    []
}

function getPlatform () {
  var
    userAgent = getUserAgent(),
    platformMatch = getPlatformMatch(userAgent),
    matched = getMatch(userAgent, platformMatch),
    browser = {};

  if (matched.browser) {
    browser[matched.browser] = true;
    browser.version = matched.version;
    browser.versionNumber = parseInt(matched.versionNumber, 10);
  }

  if (matched.platform) {
    browser[matched.platform] = true;
  }

  // These are all considered mobile platforms, meaning they run a mobile browser
  if (browser.android || browser.bb || browser.blackberry || browser.ipad || browser.iphone ||
    browser.ipod || browser.kindle || browser.playbook || browser.silk || browser['windows phone']) {
    browser.mobile = true;
  }

  // Set iOS if on iPod, iPad or iPhone
  if (browser.ipod || browser.ipad || browser.iphone) {
    browser.ios = true;
  }

  if (browser['windows phone']) {
    browser.winphone = true;
    delete browser['windows phone'];
  }

  // These are all considered desktop platforms, meaning they run a desktop browser
  if (browser.cros || browser.mac || browser.linux || browser.win) {
    browser.desktop = true;
  }

  // Chrome, Opera 15+, Vivaldi and Safari are webkit based browsers
  if (browser.chrome || browser.opr || browser.safari || browser.vivaldi) {
    browser.webkit = true;
  }

  // IE11 has a new token so we will assign it msie to avoid breaking changes
  if (browser.rv || browser.iemobile) {
    matched.browser = 'ie';
    browser.ie = true;
  }

  // Edge is officially known as Microsoft Edge, so rewrite the key to match
  if (browser.edge) {
    matched.browser = 'edge';
    browser.edge = true;
  }

  // Blackberry browsers are marked as Safari on BlackBerry
  if (browser.safari && browser.blackberry || browser.bb) {
    matched.browser = 'blackberry';
    browser.blackberry = true;
  }

  // Playbook browsers are marked as Safari on Playbook
  if (browser.safari && browser.playbook) {
    matched.browser = 'playbook';
    browser.playbook = true;
  }

  // Opera 15+ are identified as opr
  if (browser.opr) {
    matched.browser = 'opera';
    browser.opera = true;
  }

  // Stock Android browsers are marked as Safari on Android.
  if (browser.safari && browser.android) {
    matched.browser = 'android';
    browser.android = true;
  }

  // Kindle browsers are marked as Safari on Kindle
  if (browser.safari && browser.kindle) {
    matched.browser = 'kindle';
    browser.kindle = true;
  }

  // Kindle Silk browsers are marked as Safari on Kindle
  if (browser.safari && browser.silk) {
    matched.browser = 'silk';
    browser.silk = true;
  }

  if (browser.vivaldi) {
    matched.browser = 'vivaldi';
    browser.vivaldi = true;
  }

  // Assign the name and platform variable
  browser.name = matched.browser;
  browser.platform = matched.platform;

  if (window && window.process && window.process.versions && window.process.versions.electron) {
    browser.electron = true;
  }
  else if (document.location.href.indexOf('chrome-extension://') === 0) {
    browser.chromeExt = true;
  }
  else if (window._cordovaNative || document.location.href.indexOf('http') !== 0) {
    browser.cordova = true;
  }

  return browser
}

var Platform = {
  is: getPlatform(),
  has: {
    touch: (function () { return !!('ontouchstart' in document.documentElement) || window.navigator.msMaxTouchPoints > 0; })()
  },
  within: {
    iframe: window.self !== window.top
  }
};

Platform.has.popstate = !Platform.within.iframe && !Platform.is.electron;

var bus;

function install$1 (_Vue) {
  bus = new _Vue();
}

var Events = {
  $on: function $on () {
  var args = [], len = arguments.length;
  while ( len-- ) args[ len ] = arguments[ len ];
 bus && bus.$on.apply(bus, args); },
  $once: function $once () {
  var args = [], len = arguments.length;
  while ( len-- ) args[ len ] = arguments[ len ];
 bus && bus.$once.apply(bus, args); },
  $emit: function $emit () {
  var args = [], len = arguments.length;
  while ( len-- ) args[ len ] = arguments[ len ];
 bus && bus.$emit.apply(bus, args); },
  $off: function $off () {
  var args = [], len = arguments.length;
  while ( len-- ) args[ len ] = arguments[ len ];
 bus && bus.$off.apply(bus, args); }
};

function offset (el) {
  if (el === window) {
    return {top: 0, left: 0}
  }
  var ref = el.getBoundingClientRect();
  var top = ref.top;
  var left = ref.left;

  return {top: top, left: left}
}

function style (el, property) {
  return window.getComputedStyle(el).getPropertyValue(property)
}

function height (el) {
  if (el === window) {
    return viewport().height
  }
  return parseFloat(window.getComputedStyle(el).getPropertyValue('height'), 10)
}

function width (el) {
  if (el === window) {
    return viewport().width
  }
  return parseFloat(window.getComputedStyle(el).getPropertyValue('width'), 10)
}

function css (element, css) {
  var style = element.style;

  Object.keys(css).forEach(function (prop) {
    style[prop] = css[prop];
  });
}

function viewport () {
  var
    e = window,
    a = 'inner';

  if (!('innerWidth' in window)) {
    a = 'client';
    e = document.documentElement || document.body;
  }

  return {
    width: e[a + 'Width'],
    height: e[a + 'Height']
  }
}

function ready (fn) {
  if (typeof fn !== 'function') {
    return
  }

  if (document.readyState === 'complete') {
    return fn()
  }

  document.addEventListener('DOMContentLoaded', fn, false);
}

var prefix = ['-webkit-', '-moz-', '-ms-', '-o-'];
function cssTransform (val) {
  var o = {transform: val};
  prefix.forEach(function (p) {
    o[p + 'transform'] = val;
  });
  return o
}


var dom = Object.freeze({
	offset: offset,
	style: style,
	height: height,
	width: width,
	css: css,
	viewport: viewport,
	ready: ready,
	cssTransform: cssTransform
});

function set (theme) {
  var currentTheme = current;
  current = theme;

  ready(function () {
    if (currentTheme) {
      document.body.classList.remove(current);
    }
    document.body.classList.add(theme);
  });
}

var current;

if (typeof __THEME !== 'undefined') {
  set(__THEME);
}


var theme = Object.freeze({
	set: set,
	get current () { return current; }
});

var version = "0.14.0";

var Vue;

function setVue (_Vue) {
  Vue = _Vue;
}

var install$$1 = function (_Vue, opts) {
  if ( opts === void 0 ) opts = {};

  if (this.installed) {
    return
  }
  this.installed = true;

  setVue(_Vue);

  if (opts.directives) {
    Object.keys(opts.directives).forEach(function (key) {
      var d = opts.directives[key];
      if (d.name !== undefined && !d.name.startsWith('q-')) {
        _Vue.directive(d.name, d);
      }
    });
  }
  if (opts.components) {
    Object.keys(opts.components).forEach(function (key) {
      var c = opts.components[key];
      if (c.name !== undefined && c.name.startsWith('q-')) {
        _Vue.component(c.name, c);
      }
    });
  }

  install$1(_Vue);

  _Vue.prototype.$q = {
    version: version,
    platform: Platform,
    theme: current
  };
};

var start = function (callback) {
  if ( callback === void 0 ) callback = function () {};

  /*
    if on Cordova, but not on an iframe,
    like on Quasar Play app
   */
  if (!Platform.is.cordova || Platform.within.iframe) {
    return callback()
  }

  var tag = document.createElement('script');

  document.addEventListener('deviceready', callback, false);

  tag.type = 'text/javascript';
  document.body.appendChild(tag);
  tag.src = 'cordova.js';
};

var units = ['B', 'kB', 'MB', 'GB', 'TB', 'PB'];

function humanStorageSize (bytes) {
  var u = 0;

  while (Math.abs(bytes) >= 1024 && u < units.length - 1) {
    bytes /= 1024;
    ++u;
  }

  return ((bytes.toFixed(1)) + " " + (units[u]))
}

function capitalize (str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

function between (v, min, max) {
  if (max <= min) {
    return min
  }
  return Math.min(max, Math.max(min, v))
}

function normalizeToInterval (v, min, max) {
  if (max <= min) {
    return min
  }

  var size = (max - min + 1);

  var index = v % size;
  if (index < min) {
    index = size + index;
  }

  return index
}

function pad (v, length, char) {
  if ( length === void 0 ) length = 2;
  if ( char === void 0 ) char = '0';

  var val = '' + v;
  return val.length >= length
    ? val
    : new Array(length - val.length + 1).join(char) + val
}


var format = Object.freeze({
	humanStorageSize: humanStorageSize,
	capitalize: capitalize,
	between: between,
	normalizeToInterval: normalizeToInterval,
	pad: pad
});

var xhr = XMLHttpRequest;
var send = xhr.prototype.send;

function translate (ref) {
  var p = ref.p;
  var pos = ref.pos;
  var active = ref.active;
  var horiz = ref.horiz;
  var reverse = ref.reverse;

  var x = 1, y = 1;

  if (horiz) {
    if (reverse) { x = -1; }
    if (pos === 'bottom') { y = -1; }
    return cssTransform(("translate3d(" + (x * (p - 100)) + "%, " + (active ? 0 : y * -200) + "%, 0)"))
  }

  if (reverse) { y = -1; }
  if (pos === 'right') { x = -1; }
  return cssTransform(("translate3d(" + (active ? 0 : x * -200) + "%, " + (y * (p - 100)) + "%, 0)"))
}

function inc (p, amount) {
  if (typeof amount !== 'number') {
    if (p < 25) {
      amount = Math.random() * (5 - 3 + 1) + 3;
    }
    else if (p < 65) {
      amount = Math.random() * 3;
    }
    else if (p < 90) {
      amount = Math.random() * 2;
    }
    else if (p < 99) {
      amount = 0.5;
    }
    else {
      amount = 0;
    }
  }
  return between(p + amount, 0, 100)
}

function highjackAjax (startHandler, endHandler) {
  xhr.prototype.send = function () {
    var this$1 = this;
    var args = [], len = arguments.length;
    while ( len-- ) args[ len ] = arguments[ len ];

    startHandler();

    this.addEventListener('abort', endHandler, false);
    this.addEventListener('readystatechange', function () {
      if (this$1.readyState === 4) {
        endHandler();
      }
    }, false);

    send.apply(this, args);
  };
}

function restoreAjax () {
  xhr.prototype.send = send;
}

var QAjaxBar = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"q-loading-bar shadow-1",class:[_vm.position, _vm.animate ? '' : 'no-transition'],style:(_vm.containerStyle)},[_c('div',{staticClass:"q-loading-bar-inner",style:(_vm.innerStyle)})])},staticRenderFns: [],
  name: 'q-ajax-bar',
  props: {
    position: {
      type: String,
      default: 'top',
      validator: function validator (val) {
        return ['top', 'right', 'bottom', 'left'].includes(val)
      }
    },
    size: {
      type: String,
      default: '4px'
    },
    color: {
      type: String,
      default: '#e21b0c'
    },
    speed: {
      type: Number,
      default: 250
    },
    delay: {
      type: Number,
      default: 1000
    },
    reverse: Boolean
  },
  data: function data () {
    return {
      animate: false,
      active: false,
      progress: 0,
      calls: 0
    }
  },
  computed: {
    containerStyle: function containerStyle () {
      var o = translate({
        p: this.progress,
        pos: this.position,
        active: this.active,
        horiz: this.horizontal,
        reverse: this.reverse
      });
      o[this.sizeProp] = this.size;
      return o
    },
    innerStyle: function innerStyle () {
      return {background: this.color}
    },
    horizontal: function horizontal () {
      return this.position === 'top' || this.position === 'bottom'
    },
    sizeProp: function sizeProp () {
      return this.horizontal ? 'height' : 'width'
    }
  },
  methods: {
    start: function start () {
      var this$1 = this;

      this.calls++;
      if (!this.active) {
        this.progress = 0;
        this.active = true;
        this.animate = false;
        this.$emit('start');
        this.timer = setTimeout(function () {
          this$1.animate = true;
          this$1.move();
        }, this.delay);
      }
      else if (this.closing) {
        this.closing = false;
        clearTimeout(this.timer);
        this.progress = 0;
        this.move();
      }
    },
    increment: function increment (amount) {
      if (this.active) {
        this.progress = inc(this.progress, amount);
      }
    },
    stop: function stop () {
      var this$1 = this;

      this.calls = Math.max(0, this.calls - 1);
      if (this.calls > 0) {
        return
      }

      clearTimeout(this.timer);

      if (!this.animate) {
        this.active = false;
        return
      }
      this.closing = true;
      this.progress = 100;
      this.$emit('stop');
      this.timer = setTimeout(function () {
        this$1.closing = false;
        this$1.active = false;
      }, 1050);
    },
    move: function move () {
      var this$1 = this;

      this.timer = setTimeout(function () {
        this$1.increment();
        this$1.move();
      }, this.speed);
    }
  },
  mounted: function mounted () {
    highjackAjax(this.start, this.stop);
  },
  beforeDestroy: function beforeDestroy () {
    clearTimeout(this.timer);
    restoreAjax();
  }
};

var typeIcon = {
  positive: 'check_circle',
  negative: 'warning',
  info: 'info',
  warning: 'priority_high'
};

var QIcon = {
  name: 'q-icon',
  functional: true,
  props: {
    name: String,
    mat: String,
    ios: String
  },
  render: function render (h, ctx) {
    var name, text;
    var
      props = ctx.props,
      data = ctx.data,
      theme = ctx.parent.$q.theme,
      classes = ctx.data.staticClass,
      icon = props.mat && theme === 'mat'
        ? props.mat
        : (props.ios && theme === 'ios' ? props.ios : ctx.props.name);

    if (!icon) {
      name = '';
    }
    else if (icon.startsWith('fa-')) {
      name = "fa " + icon;
    }
    else if (icon.startsWith('ion-')) {
      name = "" + icon;
    }
    else {
      name = 'material-icons';
      text = icon.replace(/ /g, '_');
    }

    data.staticClass = (classes ? classes + ' ' : '') + "q-icon" + (name.length ? (" " + name) : '');
    data.attrs['aria-hidden'] = 'true';
    return h('i', data, text ? [text, ctx.children] : [' ', ctx.children])
  }
};

var QAlert = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return (_vm.active)?_c('div',{staticClass:"q-alert row",class:[ ("bg-" + (_vm.color)), _vm.position ? ("fixed-" + (_vm.position) + " shadow-2 z-alert") : '' ]},[_c('div',{staticClass:"q-alert-icon row col-auto items-center justify-center"},[_vm._t("left",[_c('q-icon',{attrs:{"name":_vm.alertIcon}})])],2),_c('div',{staticClass:"q-alert-content col self-center"},[_vm._t("default"),(_vm.buttons && _vm.buttons.length)?_c('div',{staticClass:"q-alert-actions row items-center justify-between"},_vm._l((_vm.buttons),function(btn){return _c('span',{key:btn,staticClass:"uppercase",domProps:{"innerHTML":_vm._s(btn.label)},on:{"click":function($event){_vm.dismiss(btn.handler);}}})})):_vm._e()],2),(_vm.dismissible)?_c('div',{staticClass:"q-alert-close self-top col-auto"},[_c('q-icon',{staticClass:"cursor-pointer",attrs:{"name":"close"},on:{"click":_vm.dismiss}})],1):_vm._e()]):_vm._e()},staticRenderFns: [],
  name: 'q-alert',
  components: {
    QIcon: QIcon
  },
  props: {
    value: Boolean,
    color: {
      type: String,
      default: 'negative'
    },
    icon: String,
    dismissible: Boolean,
    buttons: Array,
    position: {
      type: String,
      validator: function (v) { return [
        'top', 'top-right', 'right', 'bottom-right',
        'bottom', 'bottom-left', 'left', 'top-left'
      ].includes(v); }
    }
  },
  data: function data () {
    return {
      active: true
    }
  },
  computed: {
    alertIcon: function alertIcon () {
      return typeIcon[this.color] || typeIcon.warning
    }
  },
  methods: {
    show: function show () {
      this.$emit('input', true);
    },
    dismiss: function dismiss () {
      this.$emit('dismiss');
      this.$emit('input', false);
    },
    destroy: function destroy () {
      this.active = false;
      this.$nextTick(this.$destroy);
    }
  }
};

var filter = function (terms, ref) {
  var field = ref.field;
  var list = ref.list;

  var token = terms.toLowerCase();
  return list.filter(function (item) { return ('' + item[field]).toLowerCase().startsWith(token); })
};

function s4 () {
  return Math.floor((1 + Math.random()) * 0x10000)
    .toString(16)
    .substring(1)
}

var uid = function () {
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
    s4() + '-' + s4() + s4() + s4()
};

function isPrintableChar (v) {
  return (v > 47 && v < 58) || // number keys
    v === 32 || v === 13 || // spacebar & return key(s) (if you want to allow carriage returns)
    (v > 64 && v < 91) || // letter keys
    (v > 95 && v < 112) || // numpad keys
    (v > 185 && v < 193) || // ;=,-./` (in order)
    (v > 218 && v < 223)
}



function isDate (v) {
  return Object.prototype.toString.call(v) === '[object Date]'
}

var marginal = {
  type: Array,
  validator: function (v) { return v.every(function (i) { return 'icon' in i && 'handler' in i; }); }
};

var FrameMixin = {
  props: {
    prefix: String,
    suffix: String,
    stackLabel: String,
    floatLabel: String,
    error: Boolean,
    disable: Boolean,
    color: {
      type: String,
      default: 'primary'
    },
    dark: Boolean,
    before: marginal,
    after: marginal,
    inverted: Boolean,
    align: {
      type: String,
      default: 'left',
      validator: function (v) { return ['left', 'center', 'right'].includes(v); }
    }
  },
  computed: {
    labelIsAbove: function labelIsAbove () {
      return this.focused || this.length || this.stackLabel
    }
  }
};

var InputMixin = {
  props: {
    autofocus: Boolean,
    pattern: String,
    name: String,
    maxlength: Number,
    maxHeight: Number,
    placeholder: String
  },
  computed: {
    inputPlaceholder: function inputPlaceholder () {
      if ((!this.floatLabel && !this.stackLabel) || this.labelIsAbove) {
        return this.placeholder
      }
    }
  },
  methods: {
    focus: function focus () {
      if (!this.disable) {
        this.$refs.input.focus();
      }
    },
    blur: function blur () {
      this.$refs.input.blur();
    },

    __onFocus: function __onFocus (e) {
      this.focused = true;
      this.$emit('focus', e);
    },
    __onBlur: function __onBlur (e) {
      this.focused = false;
      this.$emit('blur', e);
    },
    __onKeydown: function __onKeydown (e) {
      this.$emit('keydown', e);
    },
    __onKeyup: function __onKeyup (e) {
      this.$emit('keyup', e);
    },
    __onClick: function __onClick (e) {
      this.focus();
      this.$emit('click', e);
    }
  },
  mounted: function mounted () {
    var this$1 = this;

    this.$nextTick(function () {
      var input = this$1.$refs.input;
      if (this$1.autofocus && input) {
        input.focus();
      }
    });
  }
};

var inputTypes = [
  'text', 'textarea', 'email',
  'tel', 'file', 'number',
  'password', 'url', 'dropdown'
];

var now = Date.now;

function debounce (fn, wait, immediate) {
  if ( wait === void 0 ) wait = 250;

  var
    timeout, params, context, timestamp, result,
    later = function () {
      var last = now() - timestamp;

      if (last < wait && last >= 0) {
        timeout = setTimeout(later, wait - last);
      }
      else {
        timeout = null;
        if (!immediate) {
          result = fn.apply(context, params);
          if (!timeout) {
            context = params = null;
          }
        }
      }
    };

  return function () {
    var args = [], len = arguments.length;
    while ( len-- ) args[ len ] = arguments[ len ];

    var callNow = immediate && !timeout;

    context = this;
    timestamp = now();
    params = args;

    if (!timeout) {
      timeout = setTimeout(later, wait);
    }
    if (callNow) {
      result = fn.apply(context, args);
      context = params = null;
    }

    return result
  }
}

function frameDebounce (fn) {
  var
    wait = false,
    param;

  return function () {
    var this$1 = this;
    var args = [], len = arguments.length;
    while ( len-- ) args[ len ] = arguments[ len ];

    param = args;
    if (wait) {
      return
    }

    wait = true;
    window.requestAnimationFrame(function () {
      fn.apply(this$1, param);
      wait = false;
    });
  }
}

var QInputFrame = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"q-if row no-wrap items-center relative-position",class:_vm.classes,attrs:{"tabindex":_vm.focusable && !_vm.disable ? 0 : null}},[(_vm.before)?_vm._l((_vm.before),function(item){return _c('q-icon',{key:item,staticClass:"q-if-control",class:{hidden: item.content && !_vm.length},attrs:{"name":item.icon},on:{"click":item.handler}})}):_vm._e(),_c('div',{staticClass:"q-if-inner col row no-wrap items-center relative-position",on:{"click":_vm.__onClick}},[(_vm.label)?_c('div',{staticClass:"q-if-label ellipsis full-width absolute self-start",class:{'q-if-label-above': _vm.labelIsAbove},domProps:{"innerHTML":_vm._s(_vm.label)}}):_vm._e(),(_vm.prefix)?_c('span',{staticClass:"q-if-addon q-if-addon-left",class:_vm.addonClass,domProps:{"innerHTML":_vm._s(_vm.prefix)}}):_vm._e(),_vm._t("default"),(_vm.suffix)?_c('span',{staticClass:"q-if-addon q-if-addon-right",class:_vm.addonClass,domProps:{"innerHTML":_vm._s(_vm.suffix)}}):_vm._e()],2),_vm._t("control"),(_vm.after)?_vm._l((_vm.after),function(item){return _c('q-icon',{key:item,staticClass:"q-if-control",class:{hidden: (item.content && !_vm.length) || (!!item.error !== _vm.hasError)},attrs:{"name":item.icon},on:{"click":item.handler}})}):_vm._e()],2)},staticRenderFns: [],
  name: 'q-input-frame',
  mixins: [FrameMixin],
  props: {
    topAddons: Boolean,
    focused: Boolean,
    length: Number,
    focusable: Boolean
  },
  data: function data () {
    return {
      field: {}
    }
  },
  inject: ['__field'],
  computed: {
    label: function label () {
      return this.stackLabel || this.floatLabel
    },
    addonClass: function addonClass () {
      return {
        'q-if-addon-visible': this.labelIsAbove,
        'self-start': this.topAddons
      }
    },
    classes: function classes () {
      var cls = [{
        'q-if-has-label': this.label,
        'q-if-focused': this.focused,
        'q-if-error': this.hasError,
        'q-if-disabled': this.disable,
        'q-if-focusable': this.focusable && !this.disable,
        'q-if-inverted': this.inverted,
        'q-if-dark': this.dark || this.inverted
      }];

      var color = this.hasError ? 'negative' : this.color;
      if (color) {
        if (this.inverted) {
          cls.push(("bg-" + color));
          cls.push("text-white");
        }
        else {
          cls.push(("text-" + color));
        }
      }
      return cls
    },
    hasError: function hasError () {
      return !!(this.field.error || this.error)
    }
  },
  methods: {
    __onClick: function __onClick (e) {
      this.$emit('click', e);
    }
  },
  created: function created () {
    if (this.__field) {
      this.field = this.__field;
      this.field.__registerInput(this);
    }
  },
  beforeDestroy: function beforeDestroy () {
    if (this.__field) {
      this.field.__unregisterInput();
    }
  }
};

function getSize (el) {
  return {
    width: el.offsetWidth,
    height: el.offsetHeight
  }
}

var QResizeObservable = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"absolute-full overflow-hidden invisible",staticStyle:{"z-index":"-1"}},[_c('div',{ref:"expand",staticClass:"absolute-full overflow-hidden invisible",on:{"scroll":_vm.onScroll}},[_c('div',{ref:"expandChild",staticClass:"absolute-top-left transition-0",staticStyle:{"width":"100000px","height":"100000px"}})]),_c('div',{ref:"shrink",staticClass:"absolute-full overflow-hidden invisible",on:{"scroll":_vm.onScroll}},[_c('div',{staticClass:"absolute-top-left transition-0",staticStyle:{"width":"200%","height":"200%"}})])])},staticRenderFns: [],
  name: 'q-resize-observable',
  methods: {
    onScroll: function onScroll () {
      var size = getSize(this.$el.parentNode);

      if (size.width === this.size.width && size.height === this.size.height) {
        return
      }

      if (!this.timer) {
        this.timer = window.requestAnimationFrame(this.emit);
      }

      this.size = size;
    },
    emit: function emit () {
      this.timer = null;
      this.reset();
      this.$emit('resize', this.size);
    },
    reset: function reset () {
      var ref = this.$refs;
      if (ref.expand) {
        ref.expand.scrollLeft = 100000;
        ref.expand.scrollTop = 100000;
      }
      if (ref.shrink) {
        ref.shrink.scrollLeft = 100000;
        ref.shrink.scrollTop = 100000;
      }
    }
  },
  mounted: function mounted () {
    var this$1 = this;

    this.$nextTick(function () {
      this$1.size = {};
      this$1.onScroll();
    });
  },
  beforeDestroy: function beforeDestroy () {
    window.cancelAnimationFrame(this.timer);
    this.$emit('resize', {width: 0, height: 0});
  }
};

function getScrollTarget (el) {
  return el.closest('.scroll') || window
}

function getScrollHeight (el) {
  return (el === window ? document.body : el).scrollHeight
}

function getScrollPosition (scrollTarget) {
  if (scrollTarget === window) {
    return window.pageYOffset || window.scrollY || document.body.scrollTop || 0
  }
  return scrollTarget.scrollTop
}

function animScrollTo (el, to, duration) {
  if (duration <= 0) {
    return
  }

  var pos = getScrollPosition(el);

  window.requestAnimationFrame(function () {
    setScroll(el, pos + (to - pos) / duration * 16);
    if (el.scrollTop !== to) {
      animScrollTo(el, to, duration - 16);
    }
  });
}

function setScroll (scrollTarget, offset$$1) {
  if (scrollTarget === window) {
    document.documentElement.scrollTop = offset$$1;
    document.body.scrollTop = offset$$1;
    return
  }
  scrollTarget.scrollTop = offset$$1;
}

function setScrollPosition (scrollTarget, offset$$1, duration) {
  if (duration) {
    animScrollTo(scrollTarget, offset$$1, duration);
    return
  }
  setScroll(scrollTarget, offset$$1);
}

var size;
function getScrollbarWidth () {
  if (size !== undefined) {
    return size
  }

  var
    inner = document.createElement('p'),
    outer = document.createElement('div');

  css(inner, {
    width: '100%',
    height: '200px'
  });
  css(outer, {
    position: 'absolute',
    top: '0px',
    left: '0px',
    visibility: 'hidden',
    width: '200px',
    height: '150px',
    overflow: 'hidden'
  });

  outer.appendChild(inner);

  document.body.appendChild(outer);

  var w1 = inner.offsetWidth;
  outer.style.overflow = 'scroll';
  var w2 = inner.offsetWidth;

  if (w1 === w2) {
    w2 = outer.clientWidth;
  }

  document.body.removeChild(outer);
  size = w1 - w2;

  return size
}


var scroll = Object.freeze({
	getScrollTarget: getScrollTarget,
	getScrollHeight: getScrollHeight,
	getScrollPosition: getScrollPosition,
	setScrollPosition: setScrollPosition,
	getScrollbarWidth: getScrollbarWidth
});

var QScrollObservable = {
  name: 'q-scroll-observable',
  render: function render () {},
  data: function data () {
    return {
      pos: 0,
      dir: 'down',
      dirChanged: false,
      dirChangePos: 0
    }
  },
  methods: {
    getPosition: function getPosition () {
      return {
        position: this.pos,
        direction: this.dir,
        directionChanged: this.dirChanged,
        inflexionPosition: this.dirChangePos
      }
    },
    trigger: function trigger () {
      if (!this.timer) {
        this.timer = window.requestAnimationFrame(this.emit);
      }
    },
    emit: function emit () {
      var
        pos = Math.max(0, getScrollPosition(this.target)),
        delta = pos - this.pos,
        dir = delta < 0 ? 'up' : 'down';

      this.dirChanged = this.dir !== dir;
      if (this.dirChanged) {
        this.dir = dir;
        this.dirChangePos = this.pos;
      }

      this.timer = null;
      this.pos = pos;
      this.$emit('scroll', this.getPosition());
    }
  },
  mounted: function mounted () {
    this.target = getScrollTarget(this.$el.parentNode);
    this.target.addEventListener('scroll', this.trigger);
    this.trigger();
  },
  beforeDestroy: function beforeDestroy () {
    this.target.removeEventListener('scroll', this.trigger);
  }
};

var QWindowResizeObservable = {
  name: 'q-window-resize-observable',
  render: function render () {},
  methods: {
    trigger: function trigger () {
      if (!this.timer) {
        this.timer = window.requestAnimationFrame(this.emit);
      }
    },
    emit: function emit () {
      this.timer = null;
      this.$emit('resize', viewport());
    }
  },
  mounted: function mounted () {
    this.emit();
    window.addEventListener('resize', this.trigger);
  },
  beforeDestroy: function beforeDestroy () {
    window.removeEventListener('resize', this.trigger);
  }
};

function getEvent (e) {
  return !e ? window.event : e
}

function rightClick (e) {
  e = getEvent(e);

  if (e.which) {
    return e.which == 3 // eslint-disable-line
  }
  if (e.button) {
    return e.button == 2 // eslint-disable-line
  }

  return false
}

function position (e) {
  var posx, posy;
  e = getEvent(e);

  if (e.touches && e.touches[0]) {
    e = e.touches[0];
  }
  else if (e.changedTouches && e.changedTouches[0]) {
    e = e.changedTouches[0];
  }

  if (e.clientX || e.clientY) {
    posx = e.clientX;
    posy = e.clientY;
  }
  else if (e.pageX || e.pageY) {
    posx = e.pageX - document.body.scrollLeft - document.documentElement.scrollLeft;
    posy = e.pageY - document.body.scrollTop - document.documentElement.scrollTop;
  }

  return {
    top: posy,
    left: posx
  }
}

function targetElement (e) {
  var target;
  e = getEvent(e);

  if (e.target) {
    target = e.target;
  }
  else if (e.srcElement) {
    target = e.srcElement;
  }

  // defeat Safari bug
  if (target.nodeType === 3) {
    target = target.parentNode;
  }

  return target
}

// Reasonable defaults
var PIXEL_STEP = 10;
var LINE_HEIGHT = 40;
var PAGE_HEIGHT = 800;

function getMouseWheelDistance (e) {
  var
    sX = 0, sY = 0,       // spinX, spinY
    pX = 0, pY = 0;        // pixelX, pixelY

  // Legacy
  if ('detail' in e) { sY = e.detail; }
  if ('wheelDelta' in e) { sY = -e.wheelDelta / 120; }
  if ('wheelDeltaY' in e) { sY = -e.wheelDeltaY / 120; }
  if ('wheelDeltaX' in e) { sX = -e.wheelDeltaX / 120; }

  // side scrolling on FF with DOMMouseScroll
  if ('axis' in e && e.axis === e.HORIZONTAL_AXIS) {
    sX = sY;
    sY = 0;
  }

  pX = sX * PIXEL_STEP;
  pY = sY * PIXEL_STEP;

  if ('deltaY' in e) { pY = e.deltaY; }
  if ('deltaX' in e) { pX = e.deltaX; }

  if ((pX || pY) && e.deltaMode) {
    if (e.deltaMode === 1) {          // delta in LINE units
      pX *= LINE_HEIGHT;
      pY *= LINE_HEIGHT;
    }
    else {                             // delta in PAGE units
      pX *= PAGE_HEIGHT;
      pY *= PAGE_HEIGHT;
    }
  }

  // Fall-back if spin cannot be determined
  if (pX && !sX) { sX = (pX < 1) ? -1 : 1; }
  if (pY && !sY) { sY = (pY < 1) ? -1 : 1; }

  /*
   * spinX  -- normalized spin speed (use for zoom) - x plane
   * spinY  -- " - y plane
   * pixelX -- normalized distance (to pixels) - x plane
   * pixelY -- " - y plane
   */
  return {
    spinX: sX,
    spinY: sY,
    pixelX: pX,
    pixelY: pY
  }
}


var event = Object.freeze({
	rightClick: rightClick,
	position: position,
	targetElement: targetElement,
	getMouseWheelDistance: getMouseWheelDistance
});

function showRipple (evt, el, stopPropagation) {
  if (stopPropagation) {
    evt.stopPropagation();
  }

  var container = document.createElement('span');
  var animNode = document.createElement('span');

  container.appendChild(animNode);
  container.className = 'q-ripple-container';

  var size = el.clientWidth > el.clientHeight ? el.clientWidth : el.clientHeight;
  size = (size * 2) + "px";
  animNode.className = 'q-ripple-animation';
  css(animNode, { width: size, height: size });

  el.appendChild(container);

  var
    offset$$1 = el.getBoundingClientRect(),
    pos = position(evt),
    x = pos.left - offset$$1.left,
    y = pos.top - offset$$1.top;

  animNode.classList.add('q-ripple-animation-enter', 'q-ripple-animation-visible');
  css(animNode, cssTransform(("translate(-50%, -50%) translate(" + x + "px, " + y + "px) scale(.001)")));
  animNode.dataset.activated = Date.now();

  setTimeout(function () {
    animNode.classList.remove('q-ripple-animation-enter');
    css(animNode, cssTransform(("translate(-50%, -50%) translate(" + x + "px, " + y + "px)")));
  }, 0);
}

function hideRipple (el) {
  var ripples = el.getElementsByClassName('q-ripple-animation');

  if (!ripples.length) {
    return
  }

  var animNode = ripples[ripples.length - 1];
  var diff = Date.now() - Number(animNode.dataset.activated);

  setTimeout(function () {
    animNode.classList.remove('q-ripple-animation-visible');

    setTimeout(function () {
      animNode.parentNode.remove();
    }, 300);
  }, Math.max(0, 400 - diff));
}

function shouldAbort (ref) {
  var modifiers = ref.modifiers;
  var value = ref.value;

  return (
    value ||
    (modifiers.mat && current !== 'mat') ||
    (modifiers.ios && current !== 'ios')
  )
}

var Ripple = {
  name: 'ripple',
  bind: function bind (el, bindings) {
    if (shouldAbort(bindings)) {
      return
    }

    function show (evt) { showRipple(evt, el, bindings.modifiers.stop); }
    function hide () { hideRipple(el); }

    var ctx = {};

    if (Platform.is.desktop) {
      ctx.mousedown = show;
      ctx.mouseup = hide;
      ctx.mouseleave = hide;
    }
    if (Platform.has.touch) {
      ctx.touchstart = show;
      ctx.touchend = hide;
      ctx.touchcancel = hide;
    }

    el.__qripple = ctx;
    Object.keys(ctx).forEach(function (evt) {
      el.addEventListener(evt, ctx[evt], false);
    });
  },
  unbind: function unbind (el, bindings) {
    if (shouldAbort(bindings)) {
      return
    }

    var ctx = el.__qripple;
    Object.keys(ctx).forEach(function (evt) {
      el.removeEventListener(evt, ctx[evt], false);
    });
    delete el.__qripple;
  }
};

var QInput = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('q-input-frame',{directives:[{name:"ripple",rawName:"v-ripple.mat",value:(!_vm.inverted),expression:"!inverted",modifiers:{"mat":true}}],staticClass:"q-input",attrs:{"prefix":_vm.prefix,"suffix":_vm.suffix,"stack-label":_vm.stackLabel,"float-label":_vm.floatLabel,"error":_vm.error,"disable":_vm.disable,"inverted":_vm.inverted,"dark":_vm.dark,"before":_vm.before,"after":_vm.after,"color":_vm.color,"align":_vm.align,"focused":_vm.focused,"length":_vm.length,"top-addons":_vm.isTextarea},on:{"click":_vm.__onClick}},[_vm._t("before"),(_vm.isTextarea)?[_c('div',{staticClass:"col row relative-position"},[_c('q-resize-observable',{on:{"resize":function($event){_vm.__updateArea();}}}),_c('textarea',{ref:"shadow",staticClass:"col q-input-target q-input-shadow absolute-top",attrs:{"rows":_vm.minRows},domProps:{"value":_vm.value}}),_c('textarea',{ref:"input",staticClass:"col q-input-target q-input-area",attrs:{"name":_vm.name,"placeholder":_vm.inputPlaceholder,"disabled":_vm.disable,"maxlength":_vm.maxlength,"rows":_vm.minRows},domProps:{"value":_vm.value},on:{"input":_vm.__set,"focus":_vm.__onFocus,"blur":_vm.__onBlur,"keydown":_vm.__onKeydown,"keyup":_vm.__onKeyup}})],1)]:_c('input',{ref:"input",staticClass:"col q-input-target",class:[("text-" + (_vm.align))],attrs:{"name":_vm.name,"placeholder":_vm.inputPlaceholder,"pattern":_vm.inputPattern,"disabled":_vm.disable,"maxlength":_vm.maxlength,"min":_vm.min,"max":_vm.max,"step":_vm.inputStep,"type":_vm.inputType},domProps:{"value":_vm.value},on:{"input":_vm.__set,"focus":_vm.__onFocus,"blur":_vm.__onBlur,"keydown":_vm.__onKeydown,"keyup":_vm.__onKeyup}}),(_vm.isPassword && _vm.length)?_c('q-icon',{staticClass:"q-if-control",attrs:{"name":_vm.showPass ? 'visibility' : 'visibility_off'},on:{"click":_vm.togglePass},slot:"control"}):_vm._e(),(_vm.clearable && _vm.length)?_c('q-icon',{staticClass:"q-if-control",attrs:{"name":"cancel"},on:{"click":_vm.clear},slot:"control"}):_vm._e(),_vm._t("after")],2)},staticRenderFns: [],
  name: 'q-input',
  mixins: [FrameMixin, InputMixin],
  components: {
    QInputFrame: QInputFrame,
    QIcon: QIcon,
    QResizeObservable: QResizeObservable
  },
  directives: {
    Ripple: Ripple
  },
  props: {
    value: { required: true },
    type: {
      type: String,
      default: 'text',
      validator: function (t) { return inputTypes.includes(t); }
    },
    minRows: Number,
    clearable: Boolean,

    min: Number,
    max: Number,
    step: {
      type: Number,
      default: 1
    },
    maxDecimals: Number
  },
  data: function data () {
    return {
      focused: false,
      showPass: false
    }
  },
  computed: {
    isNumber: function isNumber () {
      return this.type === 'number'
    },
    isPassword: function isPassword () {
      return this.type === 'password'
    },
    isTextarea: function isTextarea () {
      return this.type === 'textarea'
    },
    inputPattern: function inputPattern () {
      if (this.isNumber) {
        return this.pattern || '[0-9]*'
      }
    },
    inputStep: function inputStep () {
      if (this.isNumber) {
        return this.step
      }
    },
    inputType: function inputType () {
      return this.isPassword
        ? (this.showPass ? 'text' : 'password')
        : this.type
    },
    length: function length () {
      return this.value
        ? ('' + this.value).length
        : 0
    }
  },
  methods: {
    togglePass: function togglePass () {
      this.showPass = !this.showPass;
    },
    clear: function clear () {
      if (!this.disable) {
        this.$emit('input', null);
      }
    },

    __set: function __set (e) {
      var val = e.target ? e.target.value : e;
      if (val !== this.value) {
        if (this.isNumber && Number.isInteger(this.maxDecimals)) {
          val = parseFloat(val).toFixed(this.maxDecimals);
        }
        this.$emit('input', val);
      }
    },
    __updateArea: function __updateArea () {
      var shadow = this.$refs.shadow;
      if (shadow) {
        var h = shadow.scrollHeight;
        var max = this.maxHeight || h;
        this.$refs.input.style.minHeight = (between(h, 19, max)) + "px";
      }
    }
  },
  mounted: function mounted () {
    this.__updateArea = frameDebounce(this.__updateArea);
    if (this.isTextarea) {
      this.__updateArea();
      this.watcher = this.$watch('value', this.__updateArea);
    }
  },
  beforeDestroy: function beforeDestroy () {
    if (this.watcher !== void 0) {
      this.watcher();
    }
  }
};

var toString = Object.prototype.toString;
var hasOwn = Object.prototype.hasOwnProperty;
var class2type = {};

'Boolean Number String Function Array Date RegExp Object'.split(' ').forEach(function (name) {
  class2type['[object ' + name + ']'] = name.toLowerCase();
});

function type (obj) {
  return obj == null ? String(obj) : class2type[toString.call(obj)] || 'object'
}

function isPlainObject (obj) {
  if (!obj || type(obj) !== 'object') {
    return false
  }

  if (obj.constructor &&
    !hasOwn.call(obj, 'constructor') &&
    !hasOwn.call(obj.constructor.prototype, 'isPrototypeOf')) {
    return false
  }

  var key;
  for (key in obj) {}

  return key === undefined || hasOwn.call(obj, key)
}

function extend () {
  var arguments$1 = arguments;

  var
    options, name, src, copy, copyIsArray, clone,
    target = arguments[0] || {},
    i = 1,
    length = arguments.length,
    deep = false;

  if (typeof target === 'boolean') {
    deep = target;
    target = arguments[1] || {};
    i = 2;
  }

  if (Object(target) !== target && type(target) !== 'function') {
    target = {};
  }

  if (length === i) {
    target = this;
    i--;
  }

  for (; i < length; i++) {
    if ((options = arguments$1[i]) != null) {
      for (name in options) {
        src = target[name];
        copy = options[name];

        if (target === copy) {
          continue
        }

        if (deep && copy && (isPlainObject(copy) || (copyIsArray = type(copy) === 'array'))) {
          if (copyIsArray) {
            copyIsArray = false;
            clone = src && type(src) === 'array' ? src : [];
          }
          else {
            clone = src && isPlainObject(src) ? src : {};
          }

          target[name] = extend(deep, clone, copy);
        }
        else if (copy !== undefined) {
          target[name] = copy;
        }
      }
    }
  }

  return target
}

function getAnchorPosition (el, offset) {
  var ref = el.getBoundingClientRect();
  var top = ref.top;
  var left = ref.left;
  var right = ref.right;
  var bottom = ref.bottom;
  var a = {
      top: top,
      left: left,
      width: el.offsetWidth,
      height: el.offsetHeight
    };

  if (offset) {
    a.top -= offset[1];
    a.left -= offset[0];
    if (bottom) {
      bottom += offset[1];
    }
    if (right) {
      right += offset[0];
    }
    a.width += offset[0];
    a.height += offset[1];
  }

  a.right = right || a.left + a.width;
  a.bottom = bottom || a.top + a.height;
  a.middle = a.left + ((a.right - a.left) / 2);
  a.center = a.top + ((a.bottom - a.top) / 2);

  return a
}

function getTargetPosition (el) {
  return {
    top: 0,
    center: el.offsetHeight / 2,
    bottom: el.offsetHeight,
    left: 0,
    middle: el.offsetWidth / 2,
    right: el.offsetWidth
  }
}

function getOverlapMode (anchor, target, median) {
  if ([anchor, target].indexOf(median) >= 0) { return 'auto' }
  if (anchor === target) { return 'inclusive' }
  return 'exclusive'
}

function getPositions (anchor, target) {
  var
    a = extend({}, anchor),
    t = extend({}, target);

  var positions = {
    x: ['left', 'right'].filter(function (p) { return p !== t.horizontal; }),
    y: ['top', 'bottom'].filter(function (p) { return p !== t.vertical; })
  };

  var overlap = {
    x: getOverlapMode(a.horizontal, t.horizontal, 'middle'),
    y: getOverlapMode(a.vertical, t.vertical, 'center')
  };

  positions.x.splice(overlap.x === 'auto' ? 0 : 1, 0, 'middle');
  positions.y.splice(overlap.y === 'auto' ? 0 : 1, 0, 'center');

  if (overlap.y !== 'auto') {
    a.vertical = a.vertical === 'top' ? 'bottom' : 'top';
    if (overlap.y === 'inclusive') {
      t.vertical = t.vertical;
    }
  }

  if (overlap.x !== 'auto') {
    a.horizontal = a.horizontal === 'left' ? 'right' : 'left';
    if (overlap.y === 'inclusive') {
      t.horizontal = t.horizontal;
    }
  }

  return {
    positions: positions,
    anchorPos: a
  }
}

function applyAutoPositionIfNeeded (anchor, target, selfOrigin, anchorOrigin, targetPosition) {
  var ref = getPositions(anchorOrigin, selfOrigin);
  var positions = ref.positions;
  var anchorPos = ref.anchorPos;

  if (targetPosition.top < 0 || targetPosition.top + target.bottom > window.innerHeight) {
    var newTop = anchor[anchorPos.vertical] - target[positions.y[0]];
    if (newTop + target.bottom <= window.innerHeight) {
      targetPosition.top = newTop;
    }
    else {
      newTop = anchor[anchorPos.vertical] - target[positions.y[1]];
      if (newTop + target.bottom <= window.innerHeight) {
        targetPosition.top = newTop;
      }
    }
  }
  if (targetPosition.left < 0 || targetPosition.left + target.right > window.innerWidth) {
    var newLeft = anchor[anchorPos.horizontal] - target[positions.x[0]];
    if (newLeft + target.right <= window.innerWidth) {
      targetPosition.left = newLeft;
    }
    else {
      newLeft = anchor[anchorPos.horizontal] - target[positions.x[1]];
      if (newLeft + target.right <= window.innerWidth) {
        targetPosition.left = newLeft;
      }
    }
  }
  return targetPosition
}

function parseHorizTransformOrigin (pos) {
  return pos === 'middle' ? 'center' : pos
}

function getTransformProperties (ref) {
  var selfOrigin = ref.selfOrigin;

  var
    vert = selfOrigin.vertical,
    horiz = parseHorizTransformOrigin(selfOrigin.horizontal);

  return {
    'transform-origin': vert + ' ' + horiz + ' 0px'
  }
}

function setPosition (ref) {
  var el = ref.el;
  var anchorEl = ref.anchorEl;
  var anchorOrigin = ref.anchorOrigin;
  var selfOrigin = ref.selfOrigin;
  var maxHeight = ref.maxHeight;
  var event = ref.event;
  var anchorClick = ref.anchorClick;
  var touchPosition = ref.touchPosition;
  var offset = ref.offset;

  var anchor;
  el.style.maxHeight = maxHeight || '65vh';

  if (event && (!anchorClick || touchPosition)) {
    var ref$1 = position(event);
    var top = ref$1.top;
    var left = ref$1.left;
    anchor = {top: top, left: left, width: 1, height: 1, right: left + 1, center: top, middle: left, bottom: top + 1};
  }
  else {
    anchor = getAnchorPosition(anchorEl, offset);
  }

  var target = getTargetPosition(el);
  var targetPosition = {
    top: anchor[anchorOrigin.vertical] - target[selfOrigin.vertical],
    left: anchor[anchorOrigin.horizontal] - target[selfOrigin.horizontal]
  };

  targetPosition = applyAutoPositionIfNeeded(anchor, target, selfOrigin, anchorOrigin, targetPosition);

  el.style.top = Math.max(0, targetPosition.top) + 'px';
  el.style.left = Math.max(0, targetPosition.left) + 'px';
}

function positionValidator (pos) {
  var parts = pos.split(' ');
  if (parts.length !== 2) {
    return false
  }
  if (!['top', 'center', 'bottom'].includes(parts[0])) {
    console.error('Anchor/Self position must start with one of top/center/bottom');
    return false
  }
  if (!['left', 'middle', 'right'].includes(parts[1])) {
    console.error('Anchor/Self position must end with one of left/middle/right');
    return false
  }
  return true
}

function offsetValidator (val) {
  if (!val) { return true }
  if (val.length !== 2) { return false }
  if (typeof val[0] !== 'number' || typeof val[1] !== 'number') {
    return false
  }
  return true
}

function parsePosition (pos) {
  var parts = pos.split(' ');
  return {vertical: parts[0], horizontal: parts[1]}
}

var handlers = [];

if (Platform.is.desktop) {
  window.addEventListener('keyup', function (evt) {
    if (handlers.length === 0) {
      return
    }

    if (evt.which === 27 || evt.keyCode === 27) {
      handlers[handlers.length - 1]();
    }
  });
}

var EscapeKey = {
  register: function register (handler) {
    if (Platform.is.desktop) {
      handlers.push(handler);
    }
  },
  pop: function pop () {
    if (Platform.is.desktop) {
      handlers.pop();
    }
  }
};

var QPopover = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"q-popover animate-scale",style:(_vm.transformCSS),on:{"click":function($event){$event.stopPropagation();}}},[_vm._t("default")],2)},staticRenderFns: [],
  name: 'q-popover',
  props: {
    anchor: {
      type: String,
      default: 'bottom left',
      validator: positionValidator
    },
    self: {
      type: String,
      default: 'top left',
      validator: positionValidator
    },
    fit: Boolean,
    maxHeight: String,
    touchPosition: Boolean,
    anchorClick: {
      /*
        for handling anchor outside of Popover
        example: context menu component
      */
      type: Boolean,
      default: true
    },
    offset: {
      type: Array,
      validator: offsetValidator
    },
    disable: Boolean
  },
  data: function data () {
    return {
      opened: false,
      progress: false
    }
  },
  computed: {
    transformCSS: function transformCSS () {
      return getTransformProperties({selfOrigin: this.selfOrigin})
    },
    anchorOrigin: function anchorOrigin () {
      return parsePosition(this.anchor)
    },
    selfOrigin: function selfOrigin () {
      return parsePosition(this.self)
    }
  },
  created: function created () {
    var this$1 = this;

    this.__updatePosition = frameDebounce(function () { this$1.reposition(); });
  },
  mounted: function mounted () {
    var this$1 = this;

    this.$nextTick(function () {
      this$1.anchorEl = this$1.$el.parentNode;
      this$1.anchorEl.removeChild(this$1.$el);
      if (this$1.anchorEl.classList.contains('q-btn-inner')) {
        this$1.anchorEl = this$1.anchorEl.parentNode;
      }
      if (this$1.anchorClick) {
        this$1.anchorEl.classList.add('cursor-pointer');
        this$1.anchorEl.addEventListener('click', this$1.toggle);
      }
    });
  },
  beforeDestroy: function beforeDestroy () {
    if (this.anchorClick && this.anchorEl) {
      this.anchorEl.removeEventListener('click', this.toggle);
    }
    this.close();
  },
  methods: {
    toggle: function toggle (event) {
      if (this.opened) {
        this.close();
      }
      else {
        this.open(event);
      }
    },
    open: function open (evt) {
      var this$1 = this;

      if (this.disable) {
        return
      }
      if (this.opened) {
        this.__updatePosition();
        return
      }
      if (evt) {
        evt.stopPropagation();
        evt.preventDefault();
      }

      this.opened = true;
      document.body.click(); // close other Popovers
      document.body.appendChild(this.$el);
      EscapeKey.register(function () { this$1.close(); });
      this.scrollTarget = getScrollTarget(this.anchorEl);
      this.scrollTarget.addEventListener('scroll', this.__updatePosition);
      window.addEventListener('resize', this.__updatePosition);
      this.reposition(evt);
      this.timer = setTimeout(function () {
        this$1.timer = null;
        document.addEventListener('click', this$1.close, true);
        this$1.$emit('open');
      }, 1);
    },
    close: function close (fn) {
      var this$1 = this;

      if (!this.opened || this.progress || (fn && fn.target && this.$el.contains(fn.target))) {
        return
      }

      clearTimeout(this.timer);
      document.removeEventListener('click', this.close, true);
      this.scrollTarget.removeEventListener('scroll', this.__updatePosition);
      window.removeEventListener('resize', this.__updatePosition);
      EscapeKey.pop();
      this.progress = true;

      /*
        Using setTimeout to allow
        v-models to take effect
      */
      setTimeout(function () {
        this$1.opened = false;
        this$1.progress = false;
        document.body.removeChild(this$1.$el);
        this$1.$emit('close');
        if (typeof fn === 'function') {
          fn();
        }
      }, 1);
    },
    reposition: function reposition (event) {
      var this$1 = this;

      this.$nextTick(function () {
        if (this$1.fit) {
          this$1.$el.style.minWidth = width(this$1.anchorEl) + 'px';
        }
        var ref = this$1.anchorEl.getBoundingClientRect();
        var top = ref.top;
        var ref$1 = viewport();
        var height$$1 = ref$1.height;
        if (top < 0 || top > height$$1) {
          return this$1.close()
        }
        setPosition({
          event: event,
          el: this$1.$el,
          offset: this$1.offset,
          anchorEl: this$1.anchorEl,
          anchorOrigin: this$1.anchorOrigin,
          selfOrigin: this$1.selfOrigin,
          maxHeight: this$1.maxHeight,
          anchorClick: this$1.anchorClick,
          touchPosition: this$1.touchPosition
        });
      });
    }
  }
};

var QItem = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{directives:[{name:"ripple",rawName:"v-ripple.mat",value:(_vm.noRipple),expression:"noRipple",modifiers:{"mat":true}}],staticClass:"item",class:{ active: _vm.__prop('active'), dense: _vm.__prop('dense'), large: _vm.__prop('large'), link: _vm.__prop('link'), highlight: _vm.__prop('highlight'), 'multiple-lines': _vm.__prop('multipleLines'), }},[_vm._t("img",[(_vm.cImg)?_c('img',{attrs:{"src":_vm.cImg}}):_vm._e()]),(_vm.hasPrimary)?_c('div',{staticClass:"item-primary"},[_vm._t("primary",[(_vm.cIcon)?_c('q-icon',{attrs:{"name":_vm.cIcon}}):(_vm.cLetter)?_c('div',{staticClass:"item-letter"},[_vm._v(_vm._s(_vm.cLetter))]):(_vm.cAvatar)?_c('img',{attrs:{"src":_vm.cAvatar}}):_vm._e()])],2):_vm._e(),_c('div',{staticClass:"item-content",class:{ text: _vm.hasText, inset: _vm.__prop('inset'), delimiter: _vm.__prop('delimiter'), 'inset-delimiter': _vm.__prop('insetDelimiter') }},[(_vm.cLabel)?[_c('div',{staticClass:"ellipsis",domProps:{"innerHTML":_vm._s(_vm.cLabel)}}),(_vm.cDescription)?_c('div',{staticClass:"ellipsis-2-lines",domProps:{"innerHTML":_vm._s(_vm.cDescription)}}):_vm._e()]:_vm._t("default")],2),_vm._t("secondImg",[(_vm.cSecondImg)?_c('img',{attrs:{"src":_vm.cSecondImg}}):_vm._e()]),(_vm.hasSecondary)?_c('div',{staticClass:"item-secondary"},[_vm._t("secondary",[(_vm.cStamp)?_c('div',{staticClass:"item-stamp",domProps:{"innerHTML":_vm._s(_vm.cStamp)}}):_vm._e(),(_vm.cSecondIcon)?_c('q-icon',{attrs:{"name":_vm.cSecondIcon}}):(_vm.cSecondLetter)?_c('div',{staticClass:"item-letter"},[_vm._v(_vm._s(_vm.cSecondLetter))]):(_vm.cSecondAvatar)?_c('img',{staticClass:"avatar",attrs:{"src":_vm.cSecondAvatar}}):_vm._e()])],2):_vm._e()],2)},staticRenderFns: [],
  name: 'q-item',
  components: {
    QIcon: QIcon
  },
  directives: {
    Ripple: Ripple
  },
  props: {
    cfg: {
      type: Object,
      default: function default$1 () {
        return {}
      }
    },
    highlight: Boolean,
    link: Boolean,
    multipleLines: Boolean,
    text: Boolean,
    dense: Boolean,
    large: Boolean,
    delimiter: Boolean,
    inset: Boolean,
    insetDelimiter: Boolean,
    active: Boolean,
    noRipple: Boolean,

    label: String,
    description: String,

    icon: String,
    secondIcon: String,
    avatar: String,
    secondAvatar: String,
    img: String,
    secondImg: String,
    letter: String,
    secondLetter: String,
    stamp: String
  },
  computed: {
    hasPrimary: function hasPrimary () {
      return this.$slots.primary || this.__hasAnyProp('icon', 'avatar', 'letter')
    },
    hasSecondary: function hasSecondary () {
      return this.$slots.secondary || this.__hasAnyProp('secondIcon', 'secondAvatar', 'secondLetter', 'stamp')
    },
    hasText: function hasText () {
      return this.text || this.cLabel
    },
    cLabel: function cLabel () {
      return this.__prop('label')
    },
    cDescription: function cDescription () {
      return this.__prop('description')
    },
    cIcon: function cIcon () {
      return this.__prop('icon')
    },
    cSecondIcon: function cSecondIcon () {
      return this.__prop('secondIcon')
    },
    cAvatar: function cAvatar () {
      return this.__prop('avatar')
    },
    cSecondAvatar: function cSecondAvatar () {
      return this.__prop('secondAvatar')
    },
    cImg: function cImg () {
      return this.__prop('img')
    },
    cSecondImg: function cSecondImg () {
      return this.__prop('secondImg')
    },
    cStamp: function cStamp () {
      return this.__prop('stamp')
    },
    cLetter: function cLetter () {
      return this.__prop('letter')
    },
    cSecondLetter: function cSecondLetter () {
      return this.__prop('secondLetter')
    }
  },
  methods: {
    __prop: function __prop (prop) {
      return this[prop] || this.cfg[prop]
    },
    __hasAnyProp: function __hasAnyProp () {
      var this$1 = this;
      var props = [], len = arguments.length;
      while ( len-- ) props[ len ] = arguments[ len ];

      return props.some(function (prop) { return this$1.__prop(prop); })
    }
  }
};

function prevent (e) {
  e.preventDefault();
  e.stopPropagation();
}

var QAutocomplete = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('q-popover',{ref:"popover",attrs:{"fit":"","anchor-click":false},on:{"close":function($event){_vm.$emit('close');},"open":function($event){_vm.$emit('show');}}},[_c('div',{staticClass:"list no-border",class:{delimiter: _vm.delimiter},style:(_vm.computedWidth)},_vm._l((_vm.computedResults),function(result,index){return _c('q-item',{key:result,attrs:{"cfg":result,"link":"","active":_vm.selectedIndex === index},nativeOn:{"click":function($event){_vm.setValue(result);}}})}))])},staticRenderFns: [],
  name: 'q-autocomplete',
  components: {
    QInput: QInput,
    QPopover: QPopover,
    QItem: QItem
  },
  props: {
    minCharacters: {
      type: Number,
      default: 1
    },
    maxResults: {
      type: Number,
      default: 6
    },
    debounce: {
      type: Number,
      default: 500
    },
    staticData: Object,
    delimiter: Boolean
  },
  inject: ['getInputEl', 'setInputValue'],
  data: function data () {
    return {
      searchId: '',
      results: [],
      selectedIndex: -1,
      width: 0,
      timer: null
    }
  },
  computed: {
    computedResults: function computedResults () {
      if (this.maxResults && this.results.length > 0) {
        return this.results.slice(0, this.maxResults)
      }
    },
    computedWidth: function computedWidth () {
      return {minWidth: this.width}
    },
    searching: function searching () {
      return this.searchId.length > 0
    }
  },
  methods: {
    trigger: function trigger () {
      var this$1 = this;

      var terms = this.inputEl.value;
      this.width = width(this.inputEl) + 'px';
      var searchId = uid();
      this.searchId = searchId;

      if (terms.length < this.minCharacters) {
        this.searchId = '';
        this.close();
        return
      }

      if (this.staticData) {
        this.searchId = '';
        this.results = filter(terms, this.staticData);
        if (this.$q.platform.is.desktop) {
          this.selectedIndex = 0;
        }
        this.$refs.popover.open();
        return
      }

      this.$emit('search', terms, function (results) {
        if (!results || this$1.searchId !== searchId) {
          return
        }

        this$1.searchId = '';
        if (this$1.results === results) {
          return
        }

        if (Array.isArray(results) && results.length > 0) {
          this$1.results = results;
          if (this$1.$refs && this$1.$refs.popover) {
            if (this$1.$q.platform.is.desktop) {
              this$1.selectedIndex = 0;
            }
            this$1.$refs.popover.open();
          }
          return
        }

        this$1.close();
      });
    },
    close: function close () {
      this.$refs.popover.close();
      this.results = [];
      this.selectedIndex = -1;
    },
    setValue: function setValue (result) {
      this.setInputValue(result.value);
      this.$emit('selected', result);
      this.close();
    },
    move: function move (offset$$1) {
      this.selectedIndex = normalizeToInterval(
        this.selectedIndex + offset$$1,
        0,
        this.computedResults.length - 1
      );
    },
    setCurrentSelection: function setCurrentSelection () {
      if (this.selectedIndex >= 0) {
        this.setValue(this.results[this.selectedIndex]);
      }
    },
    __delayTrigger: function __delayTrigger () {
      clearTimeout(this.timer);
      if (this.staticData) {
        this.$nextTick(this.trigger);
        return
      }
      this.timer = setTimeout(this.trigger, this.debounce);
    },
    __handleKeypress: function __handleKeypress (e) {
      var key = e.keyCode || e.which;
      switch (key) {
        case 38: // up
          this.__moveCursor(-1, e);
          break
        case 40: // down
          this.__moveCursor(1, e);
          break
        case 13: // enter
          this.setCurrentSelection();
          prevent(e);
          break
        case 27: // escape
          break
        default:
          if (
            key === 8 || // backspace
            key === 46 || // delete
            isPrintableChar(key)
          ) {
            this.__delayTrigger();
          }
      }
    },
    __moveCursor: function __moveCursor (offset$$1, e) {
      prevent(e);

      if (!this.$refs.popover.opened) {
        this.trigger();
      }
      else {
        this.move(offset$$1);
      }
    }
  },
  mounted: function mounted () {
    var this$1 = this;

    if (!this.getInputEl) {
      console.error('Autocomplete needs to be inserted into an input.');
      return
    }
    this.$nextTick(function () {
      this$1.inputEl = this$1.getInputEl();
      this$1.inputEl.addEventListener('keydown', this$1.__handleKeypress);
    });
  },
  beforeDestroy: function beforeDestroy () {
    clearTimeout(this.timer);
    if (this.inputEl) {
      this.inputEl.removeEventListener('keydown', this.__handleKeypress);
      this.close();
    }
  }
};

var mixin = {
  props: {
    color: String,
    size: {
      type: [Number, String],
      default: 16
    }
  }
};

var QSpinnerIos = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"q-spinner",style:({color: _vm.color}),attrs:{"width":_vm.size,"height":_vm.size,"viewBox":"0 0 100 100","preserveAspectRatio":"xMidYMid","xmlns":"http://www.w3.org/2000/svg"}},[_c('rect',{attrs:{"x":"46.5","y":"40","width":"7","height":"20","rx":"5","ry":"5","fill":"currentColor","transform":"rotate(0 50 50) translate(0 -30)"}},[_c('animate',{attrs:{"attributeName":"opacity","from":"1","to":"0","dur":"1s","begin":"0s","repeatCount":"indefinite"}})]),_c('rect',{attrs:{"x":"46.5","y":"40","width":"7","height":"20","rx":"5","ry":"5","fill":"currentColor","transform":"rotate(30 50 50) translate(0 -30)"}},[_c('animate',{attrs:{"attributeName":"opacity","from":"1","to":"0","dur":"1s","begin":"0.08333333333333333s","repeatCount":"indefinite"}})]),_c('rect',{attrs:{"x":"46.5","y":"40","width":"7","height":"20","rx":"5","ry":"5","fill":"currentColor","transform":"rotate(60 50 50) translate(0 -30)"}},[_c('animate',{attrs:{"attributeName":"opacity","from":"1","to":"0","dur":"1s","begin":"0.16666666666666666s","repeatCount":"indefinite"}})]),_c('rect',{attrs:{"x":"46.5","y":"40","width":"7","height":"20","rx":"5","ry":"5","fill":"currentColor","transform":"rotate(90 50 50) translate(0 -30)"}},[_c('animate',{attrs:{"attributeName":"opacity","from":"1","to":"0","dur":"1s","begin":"0.25s","repeatCount":"indefinite"}})]),_c('rect',{attrs:{"x":"46.5","y":"40","width":"7","height":"20","rx":"5","ry":"5","fill":"currentColor","transform":"rotate(120 50 50) translate(0 -30)"}},[_c('animate',{attrs:{"attributeName":"opacity","from":"1","to":"0","dur":"1s","begin":"0.3333333333333333s","repeatCount":"indefinite"}})]),_c('rect',{attrs:{"x":"46.5","y":"40","width":"7","height":"20","rx":"5","ry":"5","fill":"currentColor","transform":"rotate(150 50 50) translate(0 -30)"}},[_c('animate',{attrs:{"attributeName":"opacity","from":"1","to":"0","dur":"1s","begin":"0.4166666666666667s","repeatCount":"indefinite"}})]),_c('rect',{attrs:{"x":"46.5","y":"40","width":"7","height":"20","rx":"5","ry":"5","fill":"currentColor","transform":"rotate(180 50 50) translate(0 -30)"}},[_c('animate',{attrs:{"attributeName":"opacity","from":"1","to":"0","dur":"1s","begin":"0.5s","repeatCount":"indefinite"}})]),_c('rect',{attrs:{"x":"46.5","y":"40","width":"7","height":"20","rx":"5","ry":"5","fill":"currentColor","transform":"rotate(210 50 50) translate(0 -30)"}},[_c('animate',{attrs:{"attributeName":"opacity","from":"1","to":"0","dur":"1s","begin":"0.5833333333333334s","repeatCount":"indefinite"}})]),_c('rect',{attrs:{"x":"46.5","y":"40","width":"7","height":"20","rx":"5","ry":"5","fill":"currentColor","transform":"rotate(240 50 50) translate(0 -30)"}},[_c('animate',{attrs:{"attributeName":"opacity","from":"1","to":"0","dur":"1s","begin":"0.6666666666666666s","repeatCount":"indefinite"}})]),_c('rect',{attrs:{"x":"46.5","y":"40","width":"7","height":"20","rx":"5","ry":"5","fill":"currentColor","transform":"rotate(270 50 50) translate(0 -30)"}},[_c('animate',{attrs:{"attributeName":"opacity","from":"1","to":"0","dur":"1s","begin":"0.75s","repeatCount":"indefinite"}})]),_c('rect',{attrs:{"x":"46.5","y":"40","width":"7","height":"20","rx":"5","ry":"5","fill":"currentColor","transform":"rotate(300 50 50) translate(0 -30)"}},[_c('animate',{attrs:{"attributeName":"opacity","from":"1","to":"0","dur":"1s","begin":"0.8333333333333334s","repeatCount":"indefinite"}})]),_c('rect',{attrs:{"x":"46.5","y":"40","width":"7","height":"20","rx":"5","ry":"5","fill":"currentColor","transform":"rotate(330 50 50) translate(0 -30)"}},[_c('animate',{attrs:{"attributeName":"opacity","from":"1","to":"0","dur":"1s","begin":"0.9166666666666666s","repeatCount":"indefinite"}})])])},staticRenderFns: [],
  name: 'q-spinner-ios',
  mixins: [mixin]
};

var QSpinnerMat = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"q-spinner q-spinner-mat",style:({color: _vm.color}),attrs:{"width":_vm.size,"height":_vm.size,"viewBox":"25 25 50 50"}},[_c('circle',{staticClass:"path",attrs:{"cx":"50","cy":"50","r":"20","fill":"none","stroke":"currentColor","stroke-width":"3","stroke-miterlimit":"10"}})])},staticRenderFns: [],
  name: 'q-spinner-mat',
  mixins: [mixin]
};

var QSpinner = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('q-spinner-' + _vm.name,{tag:"component",attrs:{"size":_vm.size,"color":_vm.color}})},staticRenderFns: [],
  name: 'q-spinner',
  mixins: [mixin],
  computed: {
    name: function name () {
      return current
    }
  },
  components: {
    QSpinnerIos: QSpinnerIos,
    QSpinnerMat: QSpinnerMat
  }
};

var QSpinnerAudio = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"q-spinner",style:({color: _vm.color}),attrs:{"fill":"currentColor","width":_vm.size,"height":_vm.size,"viewBox":"0 0 55 80","xmlns":"http://www.w3.org/2000/svg"}},[_c('g',{attrs:{"transform":"matrix(1 0 0 -1 0 80)"}},[_c('rect',{attrs:{"width":"10","height":"20","rx":"3"}},[_c('animate',{attrs:{"attributeName":"height","begin":"0s","dur":"4.3s","values":"20;45;57;80;64;32;66;45;64;23;66;13;64;56;34;34;2;23;76;79;20","calcMode":"linear","repeatCount":"indefinite"}})]),_c('rect',{attrs:{"x":"15","width":"10","height":"80","rx":"3"}},[_c('animate',{attrs:{"attributeName":"height","begin":"0s","dur":"2s","values":"80;55;33;5;75;23;73;33;12;14;60;80","calcMode":"linear","repeatCount":"indefinite"}})]),_c('rect',{attrs:{"x":"30","width":"10","height":"50","rx":"3"}},[_c('animate',{attrs:{"attributeName":"height","begin":"0s","dur":"1.4s","values":"50;34;78;23;56;23;34;76;80;54;21;50","calcMode":"linear","repeatCount":"indefinite"}})]),_c('rect',{attrs:{"x":"45","width":"10","height":"30","rx":"3"}},[_c('animate',{attrs:{"attributeName":"height","begin":"0s","dur":"2s","values":"30;45;13;80;56;72;45;76;34;23;67;30","calcMode":"linear","repeatCount":"indefinite"}})])])])},staticRenderFns: [],
  name: 'q-spinner-audio',
  mixins: [mixin]
};

var QSpinnerBall = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"q-spinner",style:({color: _vm.color}),attrs:{"stroke":"currentColor","width":_vm.size,"height":_vm.size,"viewBox":"0 0 57 57","xmlns":"http://www.w3.org/2000/svg"}},[_c('g',{attrs:{"transform":"translate(1 1)","stroke-width":"2","fill":"none","fill-rule":"evenodd"}},[_c('circle',{attrs:{"cx":"5","cy":"50","r":"5"}},[_c('animate',{attrs:{"attributeName":"cy","begin":"0s","dur":"2.2s","values":"50;5;50;50","calcMode":"linear","repeatCount":"indefinite"}}),_c('animate',{attrs:{"attributeName":"cx","begin":"0s","dur":"2.2s","values":"5;27;49;5","calcMode":"linear","repeatCount":"indefinite"}})]),_c('circle',{attrs:{"cx":"27","cy":"5","r":"5"}},[_c('animate',{attrs:{"attributeName":"cy","begin":"0s","dur":"2.2s","from":"5","to":"5","values":"5;50;50;5","calcMode":"linear","repeatCount":"indefinite"}}),_c('animate',{attrs:{"attributeName":"cx","begin":"0s","dur":"2.2s","from":"27","to":"27","values":"27;49;5;27","calcMode":"linear","repeatCount":"indefinite"}})]),_c('circle',{attrs:{"cx":"49","cy":"50","r":"5"}},[_c('animate',{attrs:{"attributeName":"cy","begin":"0s","dur":"2.2s","values":"50;50;5;50","calcMode":"linear","repeatCount":"indefinite"}}),_c('animate',{attrs:{"attributeName":"cx","from":"49","to":"49","begin":"0s","dur":"2.2s","values":"49;5;27;49","calcMode":"linear","repeatCount":"indefinite"}})])])])},staticRenderFns: [],
  name: 'q-spinner-ball',
  mixins: [mixin]
};

var QSpinnerBars = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"q-spinner",style:({color: _vm.color}),attrs:{"fill":"currentColor","width":_vm.size,"height":_vm.size,"viewBox":"0 0 135 140","xmlns":"http://www.w3.org/2000/svg"}},[_c('rect',{attrs:{"y":"10","width":"15","height":"120","rx":"6"}},[_c('animate',{attrs:{"attributeName":"height","begin":"0.5s","dur":"1s","values":"120;110;100;90;80;70;60;50;40;140;120","calcMode":"linear","repeatCount":"indefinite"}}),_c('animate',{attrs:{"attributeName":"y","begin":"0.5s","dur":"1s","values":"10;15;20;25;30;35;40;45;50;0;10","calcMode":"linear","repeatCount":"indefinite"}})]),_c('rect',{attrs:{"x":"30","y":"10","width":"15","height":"120","rx":"6"}},[_c('animate',{attrs:{"attributeName":"height","begin":"0.25s","dur":"1s","values":"120;110;100;90;80;70;60;50;40;140;120","calcMode":"linear","repeatCount":"indefinite"}}),_c('animate',{attrs:{"attributeName":"y","begin":"0.25s","dur":"1s","values":"10;15;20;25;30;35;40;45;50;0;10","calcMode":"linear","repeatCount":"indefinite"}})]),_c('rect',{attrs:{"x":"60","width":"15","height":"140","rx":"6"}},[_c('animate',{attrs:{"attributeName":"height","begin":"0s","dur":"1s","values":"120;110;100;90;80;70;60;50;40;140;120","calcMode":"linear","repeatCount":"indefinite"}}),_c('animate',{attrs:{"attributeName":"y","begin":"0s","dur":"1s","values":"10;15;20;25;30;35;40;45;50;0;10","calcMode":"linear","repeatCount":"indefinite"}})]),_c('rect',{attrs:{"x":"90","y":"10","width":"15","height":"120","rx":"6"}},[_c('animate',{attrs:{"attributeName":"height","begin":"0.25s","dur":"1s","values":"120;110;100;90;80;70;60;50;40;140;120","calcMode":"linear","repeatCount":"indefinite"}}),_c('animate',{attrs:{"attributeName":"y","begin":"0.25s","dur":"1s","values":"10;15;20;25;30;35;40;45;50;0;10","calcMode":"linear","repeatCount":"indefinite"}})]),_c('rect',{attrs:{"x":"120","y":"10","width":"15","height":"120","rx":"6"}},[_c('animate',{attrs:{"attributeName":"height","begin":"0.5s","dur":"1s","values":"120;110;100;90;80;70;60;50;40;140;120","calcMode":"linear","repeatCount":"indefinite"}}),_c('animate',{attrs:{"attributeName":"y","begin":"0.5s","dur":"1s","values":"10;15;20;25;30;35;40;45;50;0;10","calcMode":"linear","repeatCount":"indefinite"}})])])},staticRenderFns: [],
  name: 'q-spinner-bars',
  mixins: [mixin]
};

var QSpinnerCircles = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"q-spinner",style:({color: _vm.color}),attrs:{"fill":"currentColor","width":_vm.size,"height":_vm.size,"viewBox":"0 0 135 135","xmlns":"http://www.w3.org/2000/svg"}},[_c('path',{attrs:{"d":"M67.447 58c5.523 0 10-4.477 10-10s-4.477-10-10-10-10 4.477-10 10 4.477 10 10 10zm9.448 9.447c0 5.523 4.477 10 10 10 5.522 0 10-4.477 10-10s-4.478-10-10-10c-5.523 0-10 4.477-10 10zm-9.448 9.448c-5.523 0-10 4.477-10 10 0 5.522 4.477 10 10 10s10-4.478 10-10c0-5.523-4.477-10-10-10zM58 67.447c0-5.523-4.477-10-10-10s-10 4.477-10 10 4.477 10 10 10 10-4.477 10-10z"}},[_c('animateTransform',{attrs:{"attributeName":"transform","type":"rotate","from":"0 67 67","to":"-360 67 67","dur":"2.5s","repeatCount":"indefinite"}})],1),_c('path',{attrs:{"d":"M28.19 40.31c6.627 0 12-5.374 12-12 0-6.628-5.373-12-12-12-6.628 0-12 5.372-12 12 0 6.626 5.372 12 12 12zm30.72-19.825c4.686 4.687 12.284 4.687 16.97 0 4.686-4.686 4.686-12.284 0-16.97-4.686-4.687-12.284-4.687-16.97 0-4.687 4.686-4.687 12.284 0 16.97zm35.74 7.705c0 6.627 5.37 12 12 12 6.626 0 12-5.373 12-12 0-6.628-5.374-12-12-12-6.63 0-12 5.372-12 12zm19.822 30.72c-4.686 4.686-4.686 12.284 0 16.97 4.687 4.686 12.285 4.686 16.97 0 4.687-4.686 4.687-12.284 0-16.97-4.685-4.687-12.283-4.687-16.97 0zm-7.704 35.74c-6.627 0-12 5.37-12 12 0 6.626 5.373 12 12 12s12-5.374 12-12c0-6.63-5.373-12-12-12zm-30.72 19.822c-4.686-4.686-12.284-4.686-16.97 0-4.686 4.687-4.686 12.285 0 16.97 4.686 4.687 12.284 4.687 16.97 0 4.687-4.685 4.687-12.283 0-16.97zm-35.74-7.704c0-6.627-5.372-12-12-12-6.626 0-12 5.373-12 12s5.374 12 12 12c6.628 0 12-5.373 12-12zm-19.823-30.72c4.687-4.686 4.687-12.284 0-16.97-4.686-4.686-12.284-4.686-16.97 0-4.687 4.686-4.687 12.284 0 16.97 4.686 4.687 12.284 4.687 16.97 0z"}},[_c('animateTransform',{attrs:{"attributeName":"transform","type":"rotate","from":"0 67 67","to":"360 67 67","dur":"8s","repeatCount":"indefinite"}})],1)])},staticRenderFns: [],
  name: 'q-spinner-circles',
  mixins: [mixin]
};

var QSpinnerDots = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"q-spinner",style:({color: _vm.color}),attrs:{"fill":"currentColor","width":_vm.size,"height":_vm.size,"viewBox":"0 0 120 30","xmlns":"http://www.w3.org/2000/svg"}},[_c('circle',{attrs:{"cx":"15","cy":"15","r":"15"}},[_c('animate',{attrs:{"attributeName":"r","from":"15","to":"15","begin":"0s","dur":"0.8s","values":"15;9;15","calcMode":"linear","repeatCount":"indefinite"}}),_c('animate',{attrs:{"attributeName":"fill-opacity","from":"1","to":"1","begin":"0s","dur":"0.8s","values":"1;.5;1","calcMode":"linear","repeatCount":"indefinite"}})]),_c('circle',{attrs:{"cx":"60","cy":"15","r":"9","fill-opacity":".3"}},[_c('animate',{attrs:{"attributeName":"r","from":"9","to":"9","begin":"0s","dur":"0.8s","values":"9;15;9","calcMode":"linear","repeatCount":"indefinite"}}),_c('animate',{attrs:{"attributeName":"fill-opacity","from":".5","to":".5","begin":"0s","dur":"0.8s","values":".5;1;.5","calcMode":"linear","repeatCount":"indefinite"}})]),_c('circle',{attrs:{"cx":"105","cy":"15","r":"15"}},[_c('animate',{attrs:{"attributeName":"r","from":"15","to":"15","begin":"0s","dur":"0.8s","values":"15;9;15","calcMode":"linear","repeatCount":"indefinite"}}),_c('animate',{attrs:{"attributeName":"fill-opacity","from":"1","to":"1","begin":"0s","dur":"0.8s","values":"1;.5;1","calcMode":"linear","repeatCount":"indefinite"}})])])},staticRenderFns: [],
  name: 'q-spinner-dots',
  mixins: [mixin]
};

var QSpinnerFacebook = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"q-spinner",style:({color: _vm.color}),attrs:{"width":_vm.size,"height":_vm.size,"viewBox":"0 0 100 100","xmlns":"http://www.w3.org/2000/svg","preserveAspectRatio":"xMidYMid"}},[_c('g',{attrs:{"transform":"translate(20 50)"}},[_c('rect',{attrs:{"x":"-10","y":"-30","width":"20","height":"60","fill":"currentColor","opacity":"0.6"}},[_c('animateTransform',{attrs:{"attributeName":"transform","type":"scale","from":"2","to":"1","begin":"0s","repeatCount":"indefinite","dur":"1s","calcMode":"spline","keySplines":"0.1 0.9 0.4 1","keyTimes":"0;1","values":"2;1"}})],1)]),_c('g',{attrs:{"transform":"translate(50 50)"}},[_c('rect',{attrs:{"x":"-10","y":"-30","width":"20","height":"60","fill":"currentColor","opacity":"0.8"}},[_c('animateTransform',{attrs:{"attributeName":"transform","type":"scale","from":"2","to":"1","begin":"0.1s","repeatCount":"indefinite","dur":"1s","calcMode":"spline","keySplines":"0.1 0.9 0.4 1","keyTimes":"0;1","values":"2;1"}})],1)]),_c('g',{attrs:{"transform":"translate(80 50)"}},[_c('rect',{attrs:{"x":"-10","y":"-30","width":"20","height":"60","fill":"currentColor","opacity":"0.9"}},[_c('animateTransform',{attrs:{"attributeName":"transform","type":"scale","from":"2","to":"1","begin":"0.2s","repeatCount":"indefinite","dur":"1s","calcMode":"spline","keySplines":"0.1 0.9 0.4 1","keyTimes":"0;1","values":"2;1"}})],1)])])},staticRenderFns: [],
  name: 'q-spinner-facebook',
  mixins: [mixin]
};

var QSpinnerGears = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"q-spinner",style:({color: _vm.color}),attrs:{"width":_vm.size,"height":_vm.size,"viewBox":"0 0 100 100","preserveAspectRatio":"xMidYMid","xmlns":"http://www.w3.org/2000/svg"}},[_c('g',{attrs:{"transform":"translate(-20,-20)"}},[_c('path',{attrs:{"d":"M79.9,52.6C80,51.8,80,50.9,80,50s0-1.8-0.1-2.6l-5.1-0.4c-0.3-2.4-0.9-4.6-1.8-6.7l4.2-2.9c-0.7-1.6-1.6-3.1-2.6-4.5 L70,35c-1.4-1.9-3.1-3.5-4.9-4.9l2.2-4.6c-1.4-1-2.9-1.9-4.5-2.6L59.8,27c-2.1-0.9-4.4-1.5-6.7-1.8l-0.4-5.1C51.8,20,50.9,20,50,20 s-1.8,0-2.6,0.1l-0.4,5.1c-2.4,0.3-4.6,0.9-6.7,1.8l-2.9-4.1c-1.6,0.7-3.1,1.6-4.5,2.6l2.1,4.6c-1.9,1.4-3.5,3.1-5,4.9l-4.5-2.1 c-1,1.4-1.9,2.9-2.6,4.5l4.1,2.9c-0.9,2.1-1.5,4.4-1.8,6.8l-5,0.4C20,48.2,20,49.1,20,50s0,1.8,0.1,2.6l5,0.4 c0.3,2.4,0.9,4.7,1.8,6.8l-4.1,2.9c0.7,1.6,1.6,3.1,2.6,4.5l4.5-2.1c1.4,1.9,3.1,3.5,5,4.9l-2.1,4.6c1.4,1,2.9,1.9,4.5,2.6l2.9-4.1 c2.1,0.9,4.4,1.5,6.7,1.8l0.4,5.1C48.2,80,49.1,80,50,80s1.8,0,2.6-0.1l0.4-5.1c2.3-0.3,4.6-0.9,6.7-1.8l2.9,4.2 c1.6-0.7,3.1-1.6,4.5-2.6L65,69.9c1.9-1.4,3.5-3,4.9-4.9l4.6,2.2c1-1.4,1.9-2.9,2.6-4.5L73,59.8c0.9-2.1,1.5-4.4,1.8-6.7L79.9,52.6 z M50,65c-8.3,0-15-6.7-15-15c0-8.3,6.7-15,15-15s15,6.7,15,15C65,58.3,58.3,65,50,65z","fill":"currentColor"}},[_c('animateTransform',{attrs:{"attributeName":"transform","type":"rotate","from":"90 50 50","to":"0 50 50","dur":"1s","repeatCount":"indefinite"}})],1)]),_c('g',{attrs:{"transform":"translate(20,20) rotate(15 50 50)"}},[_c('path',{attrs:{"d":"M79.9,52.6C80,51.8,80,50.9,80,50s0-1.8-0.1-2.6l-5.1-0.4c-0.3-2.4-0.9-4.6-1.8-6.7l4.2-2.9c-0.7-1.6-1.6-3.1-2.6-4.5 L70,35c-1.4-1.9-3.1-3.5-4.9-4.9l2.2-4.6c-1.4-1-2.9-1.9-4.5-2.6L59.8,27c-2.1-0.9-4.4-1.5-6.7-1.8l-0.4-5.1C51.8,20,50.9,20,50,20 s-1.8,0-2.6,0.1l-0.4,5.1c-2.4,0.3-4.6,0.9-6.7,1.8l-2.9-4.1c-1.6,0.7-3.1,1.6-4.5,2.6l2.1,4.6c-1.9,1.4-3.5,3.1-5,4.9l-4.5-2.1 c-1,1.4-1.9,2.9-2.6,4.5l4.1,2.9c-0.9,2.1-1.5,4.4-1.8,6.8l-5,0.4C20,48.2,20,49.1,20,50s0,1.8,0.1,2.6l5,0.4 c0.3,2.4,0.9,4.7,1.8,6.8l-4.1,2.9c0.7,1.6,1.6,3.1,2.6,4.5l4.5-2.1c1.4,1.9,3.1,3.5,5,4.9l-2.1,4.6c1.4,1,2.9,1.9,4.5,2.6l2.9-4.1 c2.1,0.9,4.4,1.5,6.7,1.8l0.4,5.1C48.2,80,49.1,80,50,80s1.8,0,2.6-0.1l0.4-5.1c2.3-0.3,4.6-0.9,6.7-1.8l2.9,4.2 c1.6-0.7,3.1-1.6,4.5-2.6L65,69.9c1.9-1.4,3.5-3,4.9-4.9l4.6,2.2c1-1.4,1.9-2.9,2.6-4.5L73,59.8c0.9-2.1,1.5-4.4,1.8-6.7L79.9,52.6 z M50,65c-8.3,0-15-6.7-15-15c0-8.3,6.7-15,15-15s15,6.7,15,15C65,58.3,58.3,65,50,65z","fill":"currentColor"}},[_c('animateTransform',{attrs:{"attributeName":"transform","type":"rotate","from":"0 50 50","to":"90 50 50","dur":"1s","repeatCount":"indefinite"}})],1)])])},staticRenderFns: [],
  name: 'q-spinner-gears',
  mixins: [mixin]
};

var QSpinnerGrid = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"q-spinner",style:({color: _vm.color}),attrs:{"fill":"currentColor","width":_vm.size,"height":_vm.size,"viewBox":"0 0 105 105","xmlns":"http://www.w3.org/2000/svg"}},[_c('circle',{attrs:{"cx":"12.5","cy":"12.5","r":"12.5"}},[_c('animate',{attrs:{"attributeName":"fill-opacity","begin":"0s","dur":"1s","values":"1;.2;1","calcMode":"linear","repeatCount":"indefinite"}})]),_c('circle',{attrs:{"cx":"12.5","cy":"52.5","r":"12.5","fill-opacity":".5"}},[_c('animate',{attrs:{"attributeName":"fill-opacity","begin":"100ms","dur":"1s","values":"1;.2;1","calcMode":"linear","repeatCount":"indefinite"}})]),_c('circle',{attrs:{"cx":"52.5","cy":"12.5","r":"12.5"}},[_c('animate',{attrs:{"attributeName":"fill-opacity","begin":"300ms","dur":"1s","values":"1;.2;1","calcMode":"linear","repeatCount":"indefinite"}})]),_c('circle',{attrs:{"cx":"52.5","cy":"52.5","r":"12.5"}},[_c('animate',{attrs:{"attributeName":"fill-opacity","begin":"600ms","dur":"1s","values":"1;.2;1","calcMode":"linear","repeatCount":"indefinite"}})]),_c('circle',{attrs:{"cx":"92.5","cy":"12.5","r":"12.5"}},[_c('animate',{attrs:{"attributeName":"fill-opacity","begin":"800ms","dur":"1s","values":"1;.2;1","calcMode":"linear","repeatCount":"indefinite"}})]),_c('circle',{attrs:{"cx":"92.5","cy":"52.5","r":"12.5"}},[_c('animate',{attrs:{"attributeName":"fill-opacity","begin":"400ms","dur":"1s","values":"1;.2;1","calcMode":"linear","repeatCount":"indefinite"}})]),_c('circle',{attrs:{"cx":"12.5","cy":"92.5","r":"12.5"}},[_c('animate',{attrs:{"attributeName":"fill-opacity","begin":"700ms","dur":"1s","values":"1;.2;1","calcMode":"linear","repeatCount":"indefinite"}})]),_c('circle',{attrs:{"cx":"52.5","cy":"92.5","r":"12.5"}},[_c('animate',{attrs:{"attributeName":"fill-opacity","begin":"500ms","dur":"1s","values":"1;.2;1","calcMode":"linear","repeatCount":"indefinite"}})]),_c('circle',{attrs:{"cx":"92.5","cy":"92.5","r":"12.5"}},[_c('animate',{attrs:{"attributeName":"fill-opacity","begin":"200ms","dur":"1s","values":"1;.2;1","calcMode":"linear","repeatCount":"indefinite"}})])])},staticRenderFns: [],
  name: 'q-spinner-grid',
  mixins: [mixin]
};

var QSpinnerHearts = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"q-spinner",style:({color: _vm.color}),attrs:{"fill":"currentColor","width":_vm.size,"height":_vm.size,"viewBox":"0 0 140 64","xmlns":"http://www.w3.org/2000/svg"}},[_c('path',{attrs:{"d":"M30.262 57.02L7.195 40.723c-5.84-3.976-7.56-12.06-3.842-18.063 3.715-6 11.467-7.65 17.306-3.68l4.52 3.76 2.6-5.274c3.716-6.002 11.47-7.65 17.304-3.68 5.84 3.97 7.56 12.054 3.842 18.062L34.49 56.118c-.897 1.512-2.793 1.915-4.228.9z","fill-opacity":".5"}},[_c('animate',{attrs:{"attributeName":"fill-opacity","begin":"0s","dur":"1.4s","values":"0.5;1;0.5","calcMode":"linear","repeatCount":"indefinite"}})]),_c('path',{attrs:{"d":"M105.512 56.12l-14.44-24.272c-3.716-6.008-1.996-14.093 3.843-18.062 5.835-3.97 13.588-2.322 17.306 3.68l2.6 5.274 4.52-3.76c5.84-3.97 13.593-2.32 17.308 3.68 3.718 6.003 1.998 14.088-3.842 18.064L109.74 57.02c-1.434 1.014-3.33.61-4.228-.9z","fill-opacity":".5"}},[_c('animate',{attrs:{"attributeName":"fill-opacity","begin":"0.7s","dur":"1.4s","values":"0.5;1;0.5","calcMode":"linear","repeatCount":"indefinite"}})]),_c('path',{attrs:{"d":"M67.408 57.834l-23.01-24.98c-5.864-6.15-5.864-16.108 0-22.248 5.86-6.14 15.37-6.14 21.234 0L70 16.168l4.368-5.562c5.863-6.14 15.375-6.14 21.235 0 5.863 6.14 5.863 16.098 0 22.247l-23.007 24.98c-1.43 1.556-3.757 1.556-5.188 0z"}})])},staticRenderFns: [],
  name: 'q-spinner-hearts',
  mixins: [mixin]
};

var QSpinnerHourglass = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"q-spinner",style:({color: _vm.color}),attrs:{"width":_vm.size,"height":_vm.size,"viewBox":"0 0 100 100","preserveAspectRatio":"xMidYMid","xmlns":"http://www.w3.org/2000/svg"}},[_c('g',[_c('path',{staticClass:"glass",attrs:{"fill":"none","stroke":"currentColor","stroke-width":"5","stroke-miterlimit":"10","d":"M58.4,51.7c-0.9-0.9-1.4-2-1.4-2.3s0.5-0.4,1.4-1.4 C70.8,43.8,79.8,30.5,80,15.5H70H30H20c0.2,15,9.2,28.1,21.6,32.3c0.9,0.9,1.4,1.2,1.4,1.5s-0.5,1.6-1.4,2.5 C29.2,56.1,20.2,69.5,20,85.5h10h40h10C79.8,69.5,70.8,55.9,58.4,51.7z"}}),_c('clipPath',{attrs:{"id":"uil-hourglass-clip1"}},[_c('rect',{staticClass:"clip",attrs:{"x":"15","y":"20","width":"70","height":"25"}},[_c('animate',{attrs:{"attributeName":"height","from":"25","to":"0","dur":"1s","repeatCount":"indefinite","vlaues":"25;0;0","keyTimes":"0;0.5;1"}}),_c('animate',{attrs:{"attributeName":"y","from":"20","to":"45","dur":"1s","repeatCount":"indefinite","vlaues":"20;45;45","keyTimes":"0;0.5;1"}})])]),_c('clipPath',{attrs:{"id":"uil-hourglass-clip2"}},[_c('rect',{staticClass:"clip",attrs:{"x":"15","y":"55","width":"70","height":"25"}},[_c('animate',{attrs:{"attributeName":"height","from":"0","to":"25","dur":"1s","repeatCount":"indefinite","vlaues":"0;25;25","keyTimes":"0;0.5;1"}}),_c('animate',{attrs:{"attributeName":"y","from":"80","to":"55","dur":"1s","repeatCount":"indefinite","vlaues":"80;55;55","keyTimes":"0;0.5;1"}})])]),_c('path',{staticClass:"sand",attrs:{"d":"M29,23c3.1,11.4,11.3,19.5,21,19.5S67.9,34.4,71,23H29z","clip-path":"url(#uil-hourglass-clip1)","fill":"currentColor"}}),_c('path',{staticClass:"sand",attrs:{"d":"M71.6,78c-3-11.6-11.5-20-21.5-20s-18.5,8.4-21.5,20H71.6z","clip-path":"url(#uil-hourglass-clip2)","fill":"currentColor"}}),_c('animateTransform',{attrs:{"attributeName":"transform","type":"rotate","from":"0 50 50","to":"180 50 50","repeatCount":"indefinite","dur":"1s","values":"0 50 50;0 50 50;180 50 50","keyTimes":"0;0.7;1"}})],1)])},staticRenderFns: [],
  name: 'q-spinner-hourglass',
  mixins: [mixin]
};

var QSpinnerInfinity = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"q-spinner",style:({color: _vm.color}),attrs:{"width":_vm.size,"height":_vm.size,"viewBox":"0 0 100 100","preserveAspectRatio":"xMidYMid"}},[_c('path',{attrs:{"d":"M24.3,30C11.4,30,5,43.3,5,50s6.4,20,19.3,20c19.3,0,32.1-40,51.4-40C88.6,30,95,43.3,95,50s-6.4,20-19.3,20C56.4,70,43.6,30,24.3,30z","fill":"none","stroke":"currentColor","stroke-width":"8","stroke-dasharray":"10.691205342610678 10.691205342610678","stroke-dashoffset":"0"}},[_c('animate',{attrs:{"attributeName":"stroke-dashoffset","from":"0","to":"21.382410685221355","begin":"0","dur":"2s","repeatCount":"indefinite","fill":"freeze"}})])])},staticRenderFns: [],
  name: 'q-spinner-infinity',
  mixins: [mixin]
};

var QSpinnerOval = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"q-spinner",style:({color: _vm.color}),attrs:{"stroke":"currentColor","width":_vm.size,"height":_vm.size,"viewBox":"0 0 38 38","xmlns":"http://www.w3.org/2000/svg"}},[_c('g',{attrs:{"transform":"translate(1 1)","stroke-width":"2","fill":"none","fill-rule":"evenodd"}},[_c('circle',{attrs:{"stroke-opacity":".5","cx":"18","cy":"18","r":"18"}}),_c('path',{attrs:{"d":"M36 18c0-9.94-8.06-18-18-18"}},[_c('animateTransform',{attrs:{"attributeName":"transform","type":"rotate","from":"0 18 18","to":"360 18 18","dur":"1s","repeatCount":"indefinite"}})],1)])])},staticRenderFns: [],
  name: 'q-spinner-oval',
  mixins: [mixin]
};

var QSpinnerPie = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"q-spinner",style:({color: _vm.color}),attrs:{"width":_vm.size,"height":_vm.size,"viewBox":"0 0 100 100","preserveAspectRatio":"xMidYMid","xmlns":"http://www.w3.org/2000/svg"}},[_c('path',{attrs:{"d":"M0 50A50 50 0 0 1 50 0L50 50L0 50","fill":"currentColor","opacity":"0.5"}},[_c('animateTransform',{attrs:{"attributeName":"transform","type":"rotate","from":"0 50 50","to":"360 50 50","dur":"0.8s","repeatCount":"indefinite"}})],1),_c('path',{attrs:{"d":"M50 0A50 50 0 0 1 100 50L50 50L50 0","fill":"currentColor","opacity":"0.5"}},[_c('animateTransform',{attrs:{"attributeName":"transform","type":"rotate","from":"0 50 50","to":"360 50 50","dur":"1.6s","repeatCount":"indefinite"}})],1),_c('path',{attrs:{"d":"M100 50A50 50 0 0 1 50 100L50 50L100 50","fill":"currentColor","opacity":"0.5"}},[_c('animateTransform',{attrs:{"attributeName":"transform","type":"rotate","from":"0 50 50","to":"360 50 50","dur":"2.4s","repeatCount":"indefinite"}})],1),_c('path',{attrs:{"d":"M50 100A50 50 0 0 1 0 50L50 50L50 100","fill":"currentColor","opacity":"0.5"}},[_c('animateTransform',{attrs:{"attributeName":"transform","type":"rotate","from":"0 50 50","to":"360 50 50","dur":"3.2s","repeatCount":"indefinite"}})],1)])},staticRenderFns: [],
  name: 'q-spinner-pie',
  mixins: [mixin]
};

var QSpinnerPuff = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"q-spinner",style:({color: _vm.color}),attrs:{"stroke":"currentColor","width":_vm.size,"height":_vm.size,"viewBox":"0 0 44 44","xmlns":"http://www.w3.org/2000/svg"}},[_c('g',{attrs:{"fill":"none","fill-rule":"evenodd","stroke-width":"2"}},[_c('circle',{attrs:{"cx":"22","cy":"22","r":"1"}},[_c('animate',{attrs:{"attributeName":"r","begin":"0s","dur":"1.8s","values":"1; 20","calcMode":"spline","keyTimes":"0; 1","keySplines":"0.165, 0.84, 0.44, 1","repeatCount":"indefinite"}}),_c('animate',{attrs:{"attributeName":"stroke-opacity","begin":"0s","dur":"1.8s","values":"1; 0","calcMode":"spline","keyTimes":"0; 1","keySplines":"0.3, 0.61, 0.355, 1","repeatCount":"indefinite"}})]),_c('circle',{attrs:{"cx":"22","cy":"22","r":"1"}},[_c('animate',{attrs:{"attributeName":"r","begin":"-0.9s","dur":"1.8s","values":"1; 20","calcMode":"spline","keyTimes":"0; 1","keySplines":"0.165, 0.84, 0.44, 1","repeatCount":"indefinite"}}),_c('animate',{attrs:{"attributeName":"stroke-opacity","begin":"-0.9s","dur":"1.8s","values":"1; 0","calcMode":"spline","keyTimes":"0; 1","keySplines":"0.3, 0.61, 0.355, 1","repeatCount":"indefinite"}})])])])},staticRenderFns: [],
  name: 'q-spinner-puff',
  mixins: [mixin]
};

var QSpinnerRadio = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"q-spinner",style:({color: _vm.color}),attrs:{"width":_vm.size,"height":_vm.size,"viewBox":"0 0 100 100","preserveAspectRatio":"xMidYMid","xmlns":"http://www.w3.org/2000/svg"}},[_c('g',{attrs:{"transform":"scale(0.55)"}},[_c('circle',{attrs:{"cx":"30","cy":"150","r":"30","fill":"currentColor"}},[_c('animate',{attrs:{"attributeName":"opacity","from":"0","to":"1","dur":"1s","begin":"0","repeatCount":"indefinite","keyTimes":"0;0.5;1","values":"0;1;1"}})]),_c('path',{attrs:{"d":"M90,150h30c0-49.7-40.3-90-90-90v30C63.1,90,90,116.9,90,150z","fill":"currentColor"}},[_c('animate',{attrs:{"attributeName":"opacity","from":"0","to":"1","dur":"1s","begin":"0.1","repeatCount":"indefinite","keyTimes":"0;0.5;1","values":"0;1;1"}})]),_c('path',{attrs:{"d":"M150,150h30C180,67.2,112.8,0,30,0v30C96.3,30,150,83.7,150,150z","fill":"currentColor"}},[_c('animate',{attrs:{"attributeName":"opacity","from":"0","to":"1","dur":"1s","begin":"0.2","repeatCount":"indefinite","keyTimes":"0;0.5;1","values":"0;1;1"}})])])])},staticRenderFns: [],
  name: 'q-spinner-radio',
  mixins: [mixin]
};

var QSpinnerRings = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"q-spinner",style:({color: _vm.color}),attrs:{"stroke":"currentColor","width":_vm.size,"height":_vm.size,"viewBox":"0 0 45 45","xmlns":"http://www.w3.org/2000/svg"}},[_c('g',{attrs:{"fill":"none","fill-rule":"evenodd","transform":"translate(1 1)","stroke-width":"2"}},[_c('circle',{attrs:{"cx":"22","cy":"22","r":"6"}},[_c('animate',{attrs:{"attributeName":"r","begin":"1.5s","dur":"3s","values":"6;22","calcMode":"linear","repeatCount":"indefinite"}}),_c('animate',{attrs:{"attributeName":"stroke-opacity","begin":"1.5s","dur":"3s","values":"1;0","calcMode":"linear","repeatCount":"indefinite"}}),_c('animate',{attrs:{"attributeName":"stroke-width","begin":"1.5s","dur":"3s","values":"2;0","calcMode":"linear","repeatCount":"indefinite"}})]),_c('circle',{attrs:{"cx":"22","cy":"22","r":"6"}},[_c('animate',{attrs:{"attributeName":"r","begin":"3s","dur":"3s","values":"6;22","calcMode":"linear","repeatCount":"indefinite"}}),_c('animate',{attrs:{"attributeName":"stroke-opacity","begin":"3s","dur":"3s","values":"1;0","calcMode":"linear","repeatCount":"indefinite"}}),_c('animate',{attrs:{"attributeName":"stroke-width","begin":"3s","dur":"3s","values":"2;0","calcMode":"linear","repeatCount":"indefinite"}})]),_c('circle',{attrs:{"cx":"22","cy":"22","r":"8"}},[_c('animate',{attrs:{"attributeName":"r","begin":"0s","dur":"1.5s","values":"6;1;2;3;4;5;6","calcMode":"linear","repeatCount":"indefinite"}})])])])},staticRenderFns: [],
  name: 'q-spinner-rings',
  mixins: [mixin]
};

var QSpinnerTail = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"q-spinner",style:({color: _vm.color}),attrs:{"width":_vm.size,"height":_vm.size,"viewBox":"0 0 38 38","xmlns":"http://www.w3.org/2000/svg"}},[_c('defs',[_c('linearGradient',{attrs:{"x1":"8.042%","y1":"0%","x2":"65.682%","y2":"23.865%","id":"a"}},[_c('stop',{attrs:{"stop-color":"currentColor","stop-opacity":"0","offset":"0%"}}),_c('stop',{attrs:{"stop-color":"currentColor","stop-opacity":".631","offset":"63.146%"}}),_c('stop',{attrs:{"stop-color":"currentColor","offset":"100%"}})],1)],1),_c('g',{attrs:{"transform":"translate(1 1)","fill":"none","fill-rule":"evenodd"}},[_c('path',{attrs:{"d":"M36 18c0-9.94-8.06-18-18-18","stroke":"url(#a)","stroke-width":"2"}},[_c('animateTransform',{attrs:{"attributeName":"transform","type":"rotate","from":"0 18 18","to":"360 18 18","dur":"0.9s","repeatCount":"indefinite"}})],1),_c('circle',{attrs:{"fill":"currentColor","cx":"36","cy":"18","r":"1"}},[_c('animateTransform',{attrs:{"attributeName":"transform","type":"rotate","from":"0 18 18","to":"360 18 18","dur":"0.9s","repeatCount":"indefinite"}})],1)])])},staticRenderFns: [],
  name: 'q-spinner-tail',
  mixins: [mixin]
};

var QBtn = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('button',{directives:[{name:"ripple",rawName:"v-ripple.mat",modifiers:{"mat":true}}],staticClass:"q-btn row inline items-center justify-center q-focusable q-hoverable",class:( obj = { disabled: _vm.disable || _vm.loading, 'q-btn-outline': _vm.outline, 'q-btn-flat': _vm.flat, 'q-btn-rounded': _vm.rounded, 'q-btn-push': _vm.push, 'q-btn-no-uppercase': _vm.noCaps }, obj[_vm.shape] = true, obj[_vm.size] = true, obj[("bg-" + (_vm.color))] = _vm.color && !_vm.flat && !_vm.outline, obj[("text-" + (_vm.flat || _vm.outline ? _vm.color : 'white'))] = _vm.color, obj ),on:{"click":_vm.click}},[_c('div',{staticClass:"q-focus-helper"}),_c('span',{staticClass:"q-btn-inner row col items-center justify-center"},[(_vm.loading)?_vm._t("loading",[_c('q-spinner',{attrs:{"color":"currentColor"}})]):[(_vm.icon)?_c('q-icon',{class:{'on-left': !_vm.round},attrs:{"name":_vm.icon}}):_vm._e(),_vm._t("default"),(!_vm.round && _vm.iconRight)?_c('q-icon',{staticClass:"on-right",attrs:{"name":_vm.iconRight}}):_vm._e()]],2)])
var obj;},staticRenderFns: [],
  name: 'q-btn',
  components: {
    QSpinner: QSpinner,
    QIcon: QIcon
  },
  directives: {
    Ripple: Ripple
  },
  props: {
    value: Boolean,
    disable: Boolean,
    loader: Boolean,
    noCaps: {
      type: Boolean,
      default: false
    },
    icon: String,
    iconRight: String,
    round: Boolean,
    outline: Boolean,
    flat: Boolean,
    rounded: Boolean,
    push: Boolean,
    small: Boolean,
    big: Boolean,
    color: String
  },
  data: function data () {
    return {
      loading: this.value || false
    }
  },
  watch: {
    value: function value (val) {
      if (this.loading !== val) {
        this.loading = val;
      }
    }
  },
  computed: {
    size: function size () {
      return ("q-btn-" + (this.small ? 'small' : (this.big ? 'big' : 'standard')))
    },
    shape: function shape () {
      return ("q-btn-" + (this.round ? 'round' : 'rectangle'))
    }
  },
  methods: {
    click: function click (e) {
      var this$1 = this;

      this.$el.blur();

      if (this.disable || this.loading) {
        return
      }
      if (this.loader !== false || this.$slots.loading) {
        this.loading = true;
        this.$emit('input', true);
      }
      this.$emit('click', e, function () {
        this$1.loading = false;
        this$1.$emit('input', false);
      });
    }
  }
};

var QChatMessage = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"q-message",class:{ 'message-sent': _vm.sent, 'message-received': !_vm.sent }},[(_vm.label)?_c('p',{staticClass:"q-message-label text-center",domProps:{"innerHTML":_vm._s(_vm.label)}}):_vm._e(),(_vm.text)?_c('div',{staticClass:"q-message-container row items-end"},[_vm._t("avatar",[_c('img',{staticClass:"q-message-avatar",attrs:{"src":_vm.avatar}})]),_c('div',{staticClass:"column"},[(_vm.name)?_c('div',{staticClass:"q-message-name",domProps:{"innerHTML":_vm._s(_vm.name)}}):_vm._e(),_vm._l((_vm.text),function(msg,index){return _c('div',{key:msg,staticClass:"q-message-text"},[_c('div',{domProps:{"innerHTML":_vm._s(msg)}}),_c('div',{staticClass:"q-message-stamp",domProps:{"innerHTML":_vm._s(_vm.stamp)}})])}),(_vm.$slots.default)?_c('div',{staticClass:"q-message-text"},[_vm._t("default")],2):_vm._e()],2)],2):_vm._e()])},staticRenderFns: [],
  name: 'q-chat-message',
  props: {
    sent: Boolean,
    label: String,

    name: String,
    avatar: String,
    text: Array,
    stamp: String
  }
};

var Mixin = {
  props: {
    value: {
      type: [Boolean, Array],
      required: true
    },
    val: {},
    color: String,
    disable: Boolean
  },
  computed: {
    model: {
      get: function get () {
        return this.value
      },
      set: function set (value) {
        this.$emit('input', value);
      }
    },
    isArray: function isArray () {
      return Array.isArray(this.value)
    },
    index: function index () {
      if (this.isArray) {
        return this.model.indexOf(this.val)
      }
    },
    isActive: function isActive () {
      return this.isArray
        ? this.model.indexOf(this.val) > -1
        : this.model
    }
  },
  watch: {
    isActive: function isActive () {
      var ref = this.$refs.ripple;
      if (ref) {
        ref.classList.add('active');
        setTimeout(function () {
          ref.classList.remove('active');
        }, 10);
      }
    }
  },
  methods: {
    toggle: function toggle (withBlur) {
      if (withBlur !== false) {
        this.$el.blur();
      }

      if (this.disable) {
        return
      }
      if (!this.isArray) {
        this.model = !this.model;
        return
      }

      if (this.index !== -1) {
        this.unselect();
      }
      else {
        this.select();
      }
    },
    select: function select () {
      if (this.disable) {
        return
      }
      if (this.isArray) {
        this.model = true;
        return
      }
      if (this.index === -1) {
        this.model.push(this.val);
      }
    },
    unselect: function unselect () {
      if (this.disable) {
        return
      }
      if (this.isArray) {
        this.model = false;
        return
      }
      if (this.index > -1) {
        this.model.splice(this.index, 1);
      }
    },
    __change: function __change (e) {
      if (this.$q.platform.is.ios) {
        this.toggle();
      }
    }
  }
};

var QCheckbox = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"q-checkbox cursor-pointer relative-position no-outline q-focusable",class:( obj = {disabled: _vm.disable, active: _vm.isActive}, obj[("text-" + (_vm.color))] = _vm.isActive && _vm.color, obj ),attrs:{"tabindex":"0"},on:{"click":function($event){$event.stopPropagation();$event.preventDefault();_vm.toggle($event);},"focus":function($event){_vm.$emit('focus');},"blur":function($event){_vm.$emit('blur');},"keydown":function($event){if(!('button' in $event)&&_vm._k($event.keyCode,"space",32)&&_vm._k($event.keyCode,"enter",13)){ return null; }$event.preventDefault();_vm.toggle(false);}}},[_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.model),expression:"model"}],attrs:{"type":"checkbox","disabled":_vm.disable},domProps:{"value":_vm.val,"checked":Array.isArray(_vm.model)?_vm._i(_vm.model,_vm.val)>-1:(_vm.model)},on:{"click":function($event){$event.stopPropagation();},"change":_vm.__change,"__c":function($event){var $$a=_vm.model,$$el=$event.target,$$c=$$el.checked?(true):(false);if(Array.isArray($$a)){var $$v=_vm.val,$$i=_vm._i($$a,$$v);if($$c){$$i<0&&(_vm.model=$$a.concat($$v));}else{$$i>-1&&(_vm.model=$$a.slice(0,$$i).concat($$a.slice($$i+1)));}}else{_vm.model=$$c;}}}}),_c('div',{staticClass:"q-focus-helper"}),_c('q-icon',{staticClass:"q-checkbox-unchecked cursor-pointer",style:(_vm.uncheckedStyle),attrs:{"name":_vm.uncheckedIcon}}),_c('q-icon',{staticClass:"q-checkbox-checked cursor-pointer absolute-full",style:(_vm.checkedStyle),attrs:{"name":_vm.checkedIcon}}),(_vm.$q.theme !== 'ios')?_c('div',{ref:"ripple",staticClass:"q-radial-ripple"}):_vm._e(),_vm._t("default")],2)
var obj;},staticRenderFns: [],
  name: 'q-checkbox',
  mixins: [Mixin],
  components: {
    QIcon: QIcon
  },
  props: {
    checkedIcon: {
      type: String,
      default: current === 'ios' ? 'check_circle' : 'check_box'
    },
    uncheckedIcon: {
      type: String,
      default: current === 'ios' ? 'radio_button_unchecked' : 'check_box_outline_blank'
    }
  },
  computed: {
    checkedStyle: function checkedStyle () {
      return this.isActive
        ? {transition: 'opacity 0ms cubic-bezier(0.23, 1, 0.32, 1) 0ms, transform 800ms cubic-bezier(0.23, 1, 0.32, 1) 0ms', opacity: 1, transform: 'scale(1)'}
        : {transition: 'opacity 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms, transform 0ms cubic-bezier(0.23, 1, 0.32, 1) 450ms', opacity: 0, transform: 'scale(0)'}
    },
    uncheckedStyle: function uncheckedStyle () {
      return this.isActive
        ? {transition: 'opacity 650ms cubic-bezier(0.23, 1, 0.32, 1) 150ms', opacity: 0}
        : {transition: 'opacity 1000ms cubic-bezier(0.23, 1, 0.32, 1) 200ms', opacity: 1}
    }
  }
};

var QChip = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"q-chip row inline items-center",class:( obj = { tag: _vm.tag, outline: _vm.outline, square: _vm.square, floating: _vm.floating, pointing: _vm.pointing, small: _vm.small || _vm.floating, 'text-white': _vm.color }, obj[("pointing-" + (_vm.pointing))] = _vm.pointing, obj[("bg-" + (_vm.color))] = _vm.color, obj )},[(_vm.$slots.left)?_c('div',{staticClass:"q-chip-side chip-left row items-center justify-center",class:{'chip-detail': _vm.detail}},[_vm._t("left")],2):_vm._e(),_vm._t("default"),(_vm.closable)?_c('div',{staticClass:"q-chip-side chip-right row items-center justify-center"},[(_vm.closable)?_c('q-icon',{staticClass:"cursor-pointer",attrs:{"name":"cancel"},on:{"click":function($event){_vm.$emit('close');}}}):_vm._e()],1):_vm._e()],2)
var obj;},staticRenderFns: [],
  name: 'q-chip',
  components: {
    QIcon: QIcon
  },
  props: {
    small: Boolean,
    tag: Boolean,
    outline: Boolean,
    square: Boolean,
    floating: Boolean,
    pointing: {
      type: String,
      validator: function (v) { return ['up', 'right', 'down', 'left'].includes(v); }
    },
    color: String,
    closable: Boolean,
    detail: Boolean
  }
};

var QChipsInput = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('q-input-frame',{staticClass:"q-chips-input",attrs:{"prefix":_vm.prefix,"suffix":_vm.suffix,"stack-label":_vm.stackLabel,"float-label":_vm.floatLabel,"error":_vm.error,"disable":_vm.disable,"inverted":_vm.inverted,"dark":_vm.dark,"before":_vm.before,"after":_vm.after,"color":_vm.inverted ? _vm.bgColor || _vm.color : _vm.color,"focused":_vm.focused,"length":_vm.length},on:{"click":_vm.__onClick}},[_c('div',{staticClass:"col row group"},[_vm._l((_vm.value),function(label,index){return _c('q-chip',{key:index,attrs:{"small":"","closable":!_vm.disable,"color":_vm.color},on:{"close":function($event){_vm.remove(index);}}},[_vm._v(_vm._s(label))])}),_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.input),expression:"input"}],ref:"input",staticClass:"col q-input-target",class:[("text-" + (_vm.align))],attrs:{"name":_vm.name,"placeholder":_vm.inputPlaceholder,"pattern":_vm.pattern,"disabled":_vm.disable,"maxlength":_vm.maxlength},domProps:{"value":(_vm.input)},on:{"focus":_vm.__onFocus,"blur":_vm.__onBlur,"keydown":_vm.__handleKey,"keyup":_vm.__onKeyup,"input":function($event){if($event.target.composing){ return; }_vm.input=$event.target.value;}}})],2),(!_vm.disable)?_c('q-icon',{staticClass:"q-if-control self-end",class:{invisible: !_vm.input.length},attrs:{"name":"send"},on:{"click":function($event){_vm.add();}},slot:"control"}):_vm._e()],1)},staticRenderFns: [],
  name: 'q-chips-input',
  mixins: [FrameMixin, InputMixin],
  components: {
    QInputFrame: QInputFrame,
    QIcon: QIcon,
    QChip: QChip
  },
  props: {
    value: {
      type: Array,
      required: true
    },
    bgColor: String
  },
  data: function data () {
    return {
      input: '',
      focused: false
    }
  },
  computed: {
    length: function length () {
      return this.value
        ? this.value.length
        : 0
    }
  },
  methods: {
    add: function add (value) {
      if ( value === void 0 ) value = this.input;

      if (!this.disable && value) {
        this.$emit('input', this.value.concat([value]));
        this.input = '';
      }
    },
    remove: function remove (index) {
      if (!this.disable && index >= 0 && index < this.length) {
        var value = this.value.slice(0);
        value.splice(index, 1);
        this.$emit('input', value);
      }
    },
    __handleKey: function __handleKey (e) {
      // ENTER key
      if (e.which === 13 || e.keyCode === 13) {
        this.add();
      }
      // Backspace key
      else if (e.which === 8 || e.keyCode === 8) {
        if (!this.input.length && this.length) {
          this.remove(this.length - 1);
        }
      }
      else {
        this.__onKeydown(e);
      }
    },
    __onClick: function __onClick () {
      this.focus();
    }
  }
};

var ids = {};

function defaultEasing (progress) {
  return progress
}

function start$1 (ref) {
  var name = ref.name;
  var duration = ref.duration; if ( duration === void 0 ) duration = 300;
  var to = ref.to;
  var from = ref.from;
  var apply = ref.apply;
  var done = ref.done;
  var cancel = ref.cancel;
  var easing = ref.easing;

  var id = name;
  var start = performance.now();

  if (id) {
    stop(id);
  }
  else {
    id = uid();
  }

  var delta = easing || defaultEasing;
  var handler = function () {
    var progress = (performance.now() - start) / duration;
    if (progress > 1) {
      progress = 1;
    }

    var newPos = from + (to - from) * delta(progress);
    apply(newPos, progress);

    if (progress === 1) {
      delete ids[id];
      done && done(newPos);
      return
    }

    anim.last = {
      pos: newPos,
      progress: progress
    };
    anim.timer = window.requestAnimationFrame(handler);
  };

  var anim = ids[id] = {
    cancel: cancel,
    timer: window.requestAnimationFrame(handler)
  };

  return id
}

function stop (id) {
  if (!id) {
    return
  }
  var anim = ids[id];
  if (anim && anim.timer) {
    cancelAnimationFrame(anim.timer);
    anim.cancel && anim.cancel(anim.last);
    delete ids[id];
  }
}


var animate = Object.freeze({
	start: start$1,
	stop: stop
});

function getHeight (el, style$$1) {
  var initial = {
    visibility: el.style.visibility,
    maxHeight: el.style.maxHeight
  };

  css(el, {
    visibility: 'hidden',
    maxHeight: ''
  });
  var height$$1 = style$$1.height;
  css(el, initial);

  return parseFloat(height$$1, 10)
}

function parseSize (padding) {
  return padding.split(' ').map(function (t) {
    var unit = t.match(/[a-zA-Z]+/) || '';
    if (unit) {
      unit = unit[0];
    }
    return [parseFloat(t, 10), unit]
  })
}

function toggleSlide (el, showing, done) {
  var store = el.__qslidetoggle || {};
  function anim () {
    store.uid = start$1({
      to: showing ? 100 : 0,
      from: store.pos !== null ? store.pos : showing ? 0 : 100,
      apply: function apply (pos) {
        store.pos = pos;
        css(el, {
          maxHeight: ((store.height * pos / 100) + "px"),
          padding: store.padding ? store.padding.map(function (t) { return (t[0] * pos / 100) + t[1]; }).join(' ') : '',
          margin: store.margin ? store.margin.map(function (t) { return (t[0] * pos / 100) + t[1]; }).join(' ') : ''
        });
      },
      done: function done$1 () {
        store.uid = null;
        store.pos = null;
        done();
        css(el, store.css);
      }
    });
    el.__qslidetoggle = store;
  }

  if (store.uid) {
    stop(store.uid);
    return anim()
  }

  store.css = {
    overflowY: el.style.overflowY,
    maxHeight: el.style.maxHeight,
    padding: el.style.padding,
    margin: el.style.margin
  };
  var style$$1 = window.getComputedStyle(el);
  if (style$$1.padding && style$$1.padding !== '0px') {
    store.padding = parseSize(style$$1.padding);
  }
  if (style$$1.margin && style$$1.margin !== '0px') {
    store.margin = parseSize(style$$1.margin);
  }
  store.height = getHeight(el, style$$1);
  store.pos = null;
  el.style.overflowY = 'hidden';
  anim();
}

var slideAnimation = {
  enter: function enter (el, done) {
    toggleSlide(el, true, done);
  },
  leave: function leave (el, done) {
    toggleSlide(el, false, done);
  }
};

var QSlideTransition = {
  name: 'q-slide-transition',
  functional: true,
  props: {
    appear: Boolean
  },
  render: function render (h, context) {
    var data = {
      props: {
        mode: 'out-in',
        css: false,
        appear: context.props.appear
      },
      on: slideAnimation
    };
    return h('transition', data, context.children)
  }
};

var eventName = 'q:collapsible:close';

var QCollapsible = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"q-collapsible"},[_vm._t("header",[_c('q-item',{staticClass:"non-selectable item-collapsible",attrs:{"link":!_vm.iconToggle,"icon":_vm.icon,"img":_vm.img,"avatar":_vm.avatar,"letter":_vm.letter,"text":"","no-ripple":_vm.iconToggle},nativeOn:{"click":function($event){_vm.__toggleItem($event);}}},[_c('q-icon',{directives:[{name:"ripple",rawName:"v-ripple.mat.stop",value:(!_vm.iconToggle),expression:"!iconToggle",modifiers:{"mat":true,"stop":true}}],staticClass:"relative-position cursor-pointer",class:{'rotate-180': _vm.active},attrs:{"name":_vm.arrowIcon},on:{"click":function($event){$event.stopPropagation();_vm.toggle($event);}},slot:"secondary"}),_vm._t("label",[_c('div',{staticClass:"ellipsis",domProps:{"innerHTML":_vm._s(_vm.label)}}),(_vm.description)?_c('div',{staticClass:"ellipsis",domProps:{"innerHTML":_vm._s(_vm.description)}}):_vm._e()])],2)]),_c('q-slide-transition',[_c('div',{directives:[{name:"show",rawName:"v-show",value:(_vm.active),expression:"active"}]},[_c('div',{staticClass:"q-collapsible-sub-item",class:{menu: _vm.menu}},[_vm._t("default")],2)])])],2)},staticRenderFns: [],
  name: 'q-collapsible',
  components: {
    QItem: QItem,
    QIcon: QIcon,
    QSlideTransition: QSlideTransition
  },
  directives: {
    Ripple: Ripple
  },
  props: {
    opened: Boolean,
    menu: Boolean,
    icon: String,
    group: String,
    img: String,
    avatar: String,
    label: String,
    description: String,
    letter: String,
    iconToggle: Boolean,
    arrowIcon: {
      type: String,
      default: 'keyboard_arrow_down'
    }
  },
  data: function data () {
    return {
      active: this.opened
    }
  },
  watch: {
    opened: function opened (value) {
      this.active = value;
    },
    active: function active (val) {
      if (val && this.group) {
        Events.$emit(eventName, this);
      }

      this.$emit(val ? 'open' : 'close');
    }
  },
  methods: {
    toggle: function toggle () {
      this.active = !this.active;
    },
    open: function open () {
      this.active = true;
    },
    close: function close () {
      this.active = false;
    },
    __toggleItem: function __toggleItem () {
      if (!this.iconToggle) {
        this.toggle();
      }
    },
    __eventHandler: function __eventHandler (comp) {
      if (this.group && this !== comp && comp.group === this.group) {
        this.close();
      }
    }
  },
  created: function created () {
    Events.$on(eventName, this.__eventHandler);
  },
  beforeDestroy: function beforeDestroy () {
    Events.$off(eventName, this.__eventHandler);
  }
};

var ContextMenuDesktop = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('q-popover',{ref:"popover",attrs:{"anchor-click":false}},[_vm._t("default")],2)},staticRenderFns: [],
  name: 'q-context-menu',
  components: {
    QPopover: QPopover
  },
  props: {
    disable: Boolean
  },
  methods: {
    close: function close () {
      this.$refs.popover.close();
    },
    __open: function __open (evt) {
      var this$1 = this;

      if (this.disable) {
        return
      }
      this.close();
      evt.preventDefault();
      evt.stopPropagation();
      /*
        Opening with a timeout for
        Firefox workaround
       */
      setTimeout(function () {
        this$1.$refs.popover.open(evt);
      }, 100);
    }
  },
  mounted: function mounted () {
    this.target = this.$refs.popover.$el.parentNode;
    this.target.addEventListener('contextmenu', this.__open);
  },
  beforeDestroy: function beforeDestroy () {
    this.target.removeEventListener('contexmenu', this.__open);
  }
};

/*
 * Also import the necessary CSS into the app.
 *
 * Example:
 * import 'animate.css/source/_base.css'
 * import 'animate.css/source/bouncing_entrances/bounceInLeft.css'
 * import 'animate.css/source/bouncing_exits/bounceOutRight.css'
 */

var QTransition = {
  name: 'q-transition',
  functional: true,
  props: {
    name: String,
    enter: String,
    leave: String,
    group: Boolean
  },
  render: function render (h, ctx) {
    var
      prop = ctx.props,
      data = ctx.data;

    if (prop.name) {
      data.props = {
        name: prop.name
      };
    }
    else if (prop.enter && prop.leave) {
      data.props = {
        enterActiveClass: ("animated " + (prop.enter)),
        leaveActiveClass: ("animated " + (prop.leave))
      };
    }
    else {
      return ctx.children
    }

    return h(("transition" + (ctx.props.group ? '-group' : '')), data, ctx.children)
  }
};

var positions = {
  top: 'items-start justify-center with-backdrop',
  bottom: 'items-end justify-center with-backdrop',
  right: 'items-center justify-end with-backdrop',
  left: 'items-center justify-start with-backdrop'
};
var positionCSS = {
  mat: {
    maxHeight: '80vh',
    height: 'auto'
  },
  ios: {
    maxHeight: '80vh',
    height: 'auto',
    boxShadow: 'none'
  }
};

function additionalCSS (theme, position) {
  var css = {};

  if (['left', 'right'].includes(position)) {
    css.maxWidth = '90vw';
  }
  if (theme === 'ios') {
    if (['left', 'top'].includes(position)) {
      css.borderTopLeftRadius = 0;
    }
    if (['right', 'top'].includes(position)) {
      css.borderTopRightRadius = 0;
    }
    if (['left', 'bottom'].includes(position)) {
      css.borderBottomLeftRadius = 0;
    }
    if (['right', 'bottom'].includes(position)) {
      css.borderBottomRightRadius = 0;
    }
  }

  return css
}

var duration = 200;
var openedModalNumber = 0;

var QModal = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('q-transition',{attrs:{"name":_vm.modalTransition,"enter":_vm.enterClass,"leave":_vm.leaveClass}},[_c('div',{directives:[{name:"show",rawName:"v-show",value:(_vm.active),expression:"active"}],staticClass:"modal fullscreen row",class:_vm.modalClasses,on:{"click":function($event){_vm.click();}}},[_c('div',{ref:"content",staticClass:"modal-content scroll",class:_vm.contentClasses,style:(_vm.modalCss),on:{"click":function($event){$event.stopPropagation();}}},[_vm._t("default")],2)])])},staticRenderFns: [],
  name: 'q-modal',
  components: {
    QTransition: QTransition
  },
  props: {
    position: {
      type: String,
      default: '',
      validator: function validator (val) {
        return val === '' || ['top', 'bottom', 'left', 'right'].includes(val)
      }
    },
    transition: {
      type: String,
      default: 'q-modal'
    },
    enterClass: String,
    leaveClass: String,
    positionClasses: {
      type: String,
      default: 'items-center justify-center'
    },
    contentClasses: [Object, String],
    contentCss: [Object, String],
    noBackdropDismiss: {
      type: Boolean,
      default: false
    },
    noEscDismiss: {
      type: Boolean,
      default: false
    }
  },
  data: function data () {
    return {
      active: false
    }
  },
  computed: {
    modalClasses: function modalClasses () {
      return this.position
        ? positions[this.position]
        : this.positionClasses
    },
    modalTransition: function modalTransition () {
      return this.position ? ("q-modal-" + (this.position)) : this.transition
    },
    modalCss: function modalCss () {
      if (this.position) {
        return extend(
          {},
          positionCSS[this.$q.theme],
          additionalCSS(this.$q.theme, this.position),
          this.contentCss
        )
      }
      return this.contentCss
    }
  },
  methods: {
    open: function open (onShow) {
      var this$1 = this;

      if (this.minimized && this.maximized) {
        throw new Error('Modal cannot be minimized & maximized simultaneously.')
      }
      if (this.active) {
        return
      }

      document.body.appendChild(this.$el);
      document.body.classList.add('with-modal');
      EscapeKey.register(function () {
        if (this$1.noEscDismiss) {
          return
        }
        this$1.close(function () {
          this$1.$emit('escape-key');
        });
      });

      this.__popstate = function () {
        if (
          Platform.has.popstate &&
          window.history.state &&
          window.history.state.modalId &&
          window.history.state.modalId >= this$1.__modalId
        ) {
          return
        }
        openedModalNumber--;
        EscapeKey.pop();
        this$1.active = false;

        if (Platform.has.popstate) {
          window.removeEventListener('popstate', this$1.__popstate);
        }

        setTimeout(function () {
          if (!openedModalNumber) {
            document.body.classList.remove('with-modal');
          }
          if (typeof this$1.__onClose === 'function') {
            this$1.__onClose();
          }
          this$1.$emit('close');
        }, duration);
      };

      setTimeout(function () {
        var content = this$1.$refs.content;
        content.scrollTop = 0
        ;['modal-scroll', 'layout-view'].forEach(function (c) {
          [].slice.call(content.getElementsByClassName(c)).forEach(function (el) {
            el.scrollTop = 0;
          });
        });
      }, 10);

      this.active = true;
      this.__modalId = ++openedModalNumber;
      if (Platform.has.popstate) {
        window.history.pushState({modalId: this.__modalId}, '');
        window.addEventListener('popstate', this.__popstate);
      }

      setTimeout(function () {
        if (typeof onShow === 'function') {
          onShow();
        }
        this$1.$emit('open');
      }, duration);
    },
    close: function close (onClose) {
      if (!this.active) {
        return
      }

      this.__onClose = onClose;

      if (!Platform.has.popstate) {
        this.__popstate();
      }
      else {
        window.history.go(-1);
      }
    },
    toggle: function toggle (done) {
      if (this.active) {
        this.close(done);
      }
      else {
        this.open(done);
      }
    },
    click: function click (onClick) {
      if (this.noBackdropDismiss) {
        return
      }
      this.close(onClick);
    }
  },
  beforeDestroy: function beforeDestroy () {
    if (this.$el.parentNode) {
      this.$el.parentNode.removeChild(this.$el);
    }
  }
};

var QModalLayout = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"q-modal-layout column absolute-full"},[(_vm.$slots.header || (_vm.$q.theme === 'ios' && _vm.$slots.navigation))?_c('div',{staticClass:"layout-header",class:_vm.headerClass,style:(_vm.headerStyle)},[_vm._t("header"),(_vm.$q.theme !== 'ios')?_vm._t("navigation"):_vm._e()],2):_vm._e(),_c('div',{staticClass:"q-modal-layout-content col scroll",class:_vm.contentClass,style:(_vm.contentStyle)},[_vm._t("default")],2),(_vm.$slots.footer || (_vm.$q.theme === 'ios' && _vm.$slots.navigation))?_c('div',{staticClass:"layout-footer",class:_vm.footerClass,style:(_vm.footerStyle)},[_vm._t("footer"),(_vm.$q.theme === 'ios')?_vm._t("navigation"):_vm._e()],2):_vm._e()])},staticRenderFns: [],
  name: 'q-modal-layout',
  props: {
    headerStyle: [String, Object, Array],
    headerClass: [String, Object, Array],

    contentStyle: [String, Object, Array],
    contentClass: [String, Object, Array],

    footerStyle: [String, Object, Array],
    footerClass: [String, Object, Array]
  }
};

var ContextMenuMobile = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('q-modal',{ref:"dialog",staticClass:"minimized"},[_vm._t("default")],2)},staticRenderFns: [],
  name: 'q-context-menu',
  components: {
    QModal: QModal
  },
  props: {
    disable: Boolean
  },
  methods: {
    open: function open () {
      this.handler();
    },
    close: function close () {
      this.target.classList.remove('non-selectable');
      this.$refs.dialog.close();
    },
    toggle: function toggle () {
      if (this.$refs.dialog.active) {
        this.close();
      }
      else {
        this.open();
      }
    }
  },
  mounted: function mounted () {
    var this$1 = this;

    this.$nextTick(function () {
      this$1.target = this$1.$el.parentNode;

      this$1.handler = function () {
        if (!this$1.disable) {
          this$1.$refs.dialog.open();
        }
      };

      this$1.touchStartHandler = function (event) {
        this$1.target.classList.add('non-selectable');
        this$1.touchTimer = setTimeout(function () {
          event.preventDefault();
          event.stopPropagation();
          this$1.cleanup();
          setTimeout(function () {
            this$1.handler();
          }, 10);
        }, 600);
      };
      this$1.cleanup = function () {
        this$1.target.classList.remove('non-selectable');
        clearTimeout(this$1.touchTimer);
        this$1.touchTimer = null;
      };
      this$1.target.addEventListener('touchstart', this$1.touchStartHandler);
      this$1.target.addEventListener('touchcancel', this$1.cleanup);
      this$1.target.addEventListener('touchmove', this$1.cleanup);
      this$1.target.addEventListener('touchend', this$1.cleanup);
    });
  },
  beforeDestroy: function beforeDestroy () {
    this.target.removeEventListener('touchstart', this.touchStartHandler);
    this.target.removeEventListener('touchcancel', this.cleanup);
    this.target.removeEventListener('touchmove', this.cleanup);
    this.target.removeEventListener('touchend', this.cleanup);
  }
};

var QContextMenu = {
  name: 'q-context-menu',
  functional: true,
  render: function render (h, ctx) {
    return h(
      Platform.is.mobile ? ContextMenuMobile : ContextMenuDesktop,
      ctx.data,
      ctx.children
    )
  }
};

var clone = function (data) {
  return JSON.parse(JSON.stringify(data))
};

var ColumnSelection = {
  data: function data () {
    return {
      columnSelection: this.columns.map(function (col) { return col.field; })
    }
  },
  watch: {
    'config.columnPicker': function config_columnPicker (value) {
      if (!value) {
        this.columnSelection = this.columns.map(function (col) { return col.field; });
      }
    }
  },
  computed: {
    cols: function cols () {
      var this$1 = this;

      return this.columns.filter(function (col) { return this$1.columnSelection.includes(col.field); })
    },
    columnSelectionOptions: function columnSelectionOptions () {
      return this.columns.map(function (col) {
        return {
          label: col.label,
          value: col.field
        }
      })
    }
  }
};

var QSearch = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('q-input',{ref:"input",staticClass:"q-search",attrs:{"type":_vm.type,"autofocus":_vm.autofocus,"pattern":_vm.pattern,"placeholder":_vm.placeholder,"disable":_vm.disable,"error":_vm.error,"align":_vm.align,"float-label":_vm.floatLabel,"stack-label":_vm.stackLabel,"prefix":_vm.prefix,"suffix":_vm.suffix,"inverted":_vm.inverted,"color":_vm.color,"before":_vm.controlBefore,"after":_vm.controlAfter},on:{"focus":_vm.__onFocus,"blur":_vm.__onBlur},model:{value:(_vm.model),callback:function ($$v) {_vm.model=$$v;},expression:"model"}})},staticRenderFns: [],
  name: 'q-search',
  components: {
    QIcon: QIcon,
    QInput: QInput
  },
  directives: {
    Ripple: Ripple
  },
  props: {
    value: { required: true },
    type: String,
    pattern: String,
    debounce: {
      type: Number,
      default: 300
    },
    icon: {
      type: String,
      default: 'search'
    },
    placeholder: {
      type: String,
      default: 'Search'
    },
    prefix: String,
    suffix: String,
    floatLabel: String,
    stackLabel: String,
    autofocus: Boolean,
    align: String,
    disable: Boolean,
    error: Boolean,
    color: String,
    inverted: {
      type: Boolean,
      default: true
    }
  },
  data: function data () {
    return {
      timer: null,
      isEmpty: !this.value && this.value !== 0
    }
  },
  computed: {
    model: {
      get: function get () {
        this.isEmpty = !this.value && this.value !== 0;
        return this.value
      },
      set: function set (value) {
        var this$1 = this;

        clearTimeout(this.timer);
        this.isEmpty = !value && value !== 0;
        if (this.value === value) {
          return
        }
        if (this.isEmpty) {
          this.$emit('input', '');
          return
        }
        this.timer = setTimeout(function () {
          this$1.$emit('input', value);
        }, this.debounce);
      }
    },
    controlBefore: function controlBefore () {
      return [{icon: this.icon, handler: this.focus}]
    },
    controlAfter: function controlAfter () {
      return [{icon: 'clear', content: true, handler: this.clearAndFocus}]
    }
  },
  methods: {
    clear: function clear () {
      if (!this.disable) {
        this.model = '';
      }
    },
    clearAndFocus: function clearAndFocus () {
      this.clear();
      this.focus();
    },
    focus: function focus () {
      this.$refs.input.focus();
    },
    blur: function blur () {
      this.$refs.input.blur();
    },

    __onFocus: function __onFocus () {
      if (!this.disable) {
        this.$emit('focus');
      }
    },
    __onBlur: function __onBlur () {
      this.$emit('blur');
    },
    __enter: function __enter () {
      this.$emit('enter', this.model);
    }
  },
  beforeDestroy: function beforeDestroy () {
    clearTimeout(this.timer);
  }
};

var QRadio = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"q-radio cursor-pointer relative-position no-outline q-focusable",class:( obj = {disabled: _vm.disable, active: _vm.isActive}, obj[("text-" + (_vm.color))] = _vm.isActive && _vm.color, obj ),attrs:{"tabindex":"0"},on:{"click":function($event){$event.stopPropagation();$event.preventDefault();_vm.select($event);},"focus":function($event){_vm.$emit('focus');},"blur":function($event){_vm.$emit('blur');},"keydown":function($event){if(!('button' in $event)&&_vm._k($event.keyCode,"space",32)&&_vm._k($event.keyCode,"enter",13)){ return null; }$event.preventDefault();_vm.select(false);}}},[_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.model),expression:"model"}],attrs:{"type":"radio","disabled":_vm.disable},domProps:{"value":_vm.val,"checked":_vm._q(_vm.model,_vm.val)},on:{"click":function($event){$event.stopPropagation();},"change":_vm.__change,"__c":function($event){_vm.model=_vm.val;}}}),_c('div',{staticClass:"q-focus-helper"}),(_vm.$q.theme !== 'ios')?_c('q-icon',{staticClass:"q-radio-unchecked cursor-pointer",attrs:{"name":_vm.uncheckedIcon}}):_vm._e(),_c('q-icon',{staticClass:"q-radio-checked cursor-pointer absolute-full",attrs:{"name":_vm.checkedIcon}}),(_vm.$q.theme !== 'ios')?_c('div',{ref:"ripple",staticClass:"q-radial-ripple"}):_vm._e(),_vm._t("default")],2)
var obj;},staticRenderFns: [],
  name: 'q-radio',
  components: {
    QIcon: QIcon
  },
  props: {
    value: {
      required: true
    },
    val: {
      required: true
    },
    color: String,
    checkedIcon: {
      type: String,
      default: current === 'ios' ? 'check' : 'radio_button_checked'
    },
    uncheckedIcon: {
      type: String,
      default: 'radio_button_unchecked'
    },
    disable: Boolean
  },
  watch: {
    isActive: function isActive (v) {
      var ref = this.$refs.ripple;
      if (v && ref) {
        ref.classList.add('active');
        setTimeout(function () {
          ref.classList.remove('active');
        }, 10);
      }
    }
  },
  computed: {
    model: {
      get: function get () {
        return this.value
      },
      set: function set$$1 (value) {
        if (value !== this.value) {
          this.$emit('input', value);
        }
      }
    },
    isActive: function isActive () {
      return this.model === this.val
    }
  },
  methods: {
    select: function select (withBlur) {
      if (withBlur !== false) {
        this.$el.blur();
      }

      if (!this.disable) {
        this.model = this.val;
      }
    },
    __change: function __change (e) {
      this.model = this.val;
    }
  }
};

function getDirection (mod) {
  if (Object.keys(mod).length === 0) {
    return {
      left: true, right: true, up: true, down: true, horizontal: true, vertical: true
    }
  }

  var dir = {};['left', 'right', 'up', 'down', 'horizontal', 'vertical'].forEach(function (direction) {
    if (mod[direction]) {
      dir[direction] = true;
    }
  });
  if (dir.horizontal) {
    dir.left = dir.right = true;
  }
  if (dir.vertical) {
    dir.up = dir.down = true;
  }
  if (dir.left || dir.right) {
    dir.horizontal = true;
  }
  if (dir.up || dir.down) {
    dir.vertical = true;
  }

  return dir
}

function updateClasses (el, dir) {
  el.classList.add('q-touch');

  if (dir.horizontal && !dir.vertical) {
    el.classList.add('q-touch-y');
    el.classList.remove('q-touch-x');
  }
  else if (!dir.horizontal && dir.vertical) {
    el.classList.add('q-touch-x');
    el.classList.remove('q-touch-y');
  }
}

var TouchSwipe = {
  name: 'touch-swipe',
  bind: function bind (el, binding) {
    var mouse = !binding.modifiers.nomouse;

    var ctx = {
      handler: binding.value,
      direction: getDirection(binding.modifiers),

      start: function start (evt) {
        var pos = position(evt);
        ctx.event = {
          x: pos.left,
          y: pos.top,
          time: new Date().getTime(),
          detected: false,
          prevent: ctx.direction.horizontal && ctx.direction.vertical
        };
        if (mouse) {
          document.addEventListener('mousemove', ctx.move);
          document.addEventListener('mouseup', ctx.end);
        }
      },
      move: function move (evt) {
        var
          pos = position(evt),
          distX = pos.left - ctx.event.x,
          distY = pos.top - ctx.event.y;

        if (ctx.event.prevent) {
          evt.preventDefault();
          return
        }
        if (ctx.event.detected) {
          return
        }

        ctx.event.detected = true;
        if (ctx.direction.horizontal && !ctx.direction.vertical) {
          if (Math.abs(distX) > Math.abs(distY)) {
            evt.preventDefault();
            ctx.event.prevent = true;
          }
        }
        else {
          if (Math.abs(distX) < Math.abs(distY)) {
            evt.preventDefault();
            ctx.event.prevent = true;
          }
        }
      },
      end: function end (evt) {
        if (mouse) {
          document.removeEventListener('mousemove', ctx.move);
          document.removeEventListener('mouseup', ctx.end);
        }

        var
          direction,
          pos = position(evt),
          distX = pos.left - ctx.event.x,
          distY = pos.top - ctx.event.y;

        if (distX !== 0 || distY !== 0) {
          if (Math.abs(distX) >= Math.abs(distY)) {
            direction = distX < 0 ? 'left' : 'right';
          }
          else {
            direction = distY < 0 ? 'up' : 'down';
          }

          if (ctx.direction[direction]) {
            ctx.handler({
              evt: evt,
              direction: direction,
              duration: new Date().getTime() - ctx.event.time,
              distance: {
                x: Math.abs(distX),
                y: Math.abs(distY)
              }
            });
          }
        }
      }
    };

    el.__qtouchswipe = ctx;
    updateClasses(el, ctx.direction);
    if (mouse) {
      el.addEventListener('mousedown', ctx.start);
    }
    el.addEventListener('touchstart', ctx.start);
    el.addEventListener('touchmove', ctx.move);
    el.addEventListener('touchend', ctx.end);
  },
  update: function update (el, binding) {
    if (binding.oldValue !== binding.value) {
      el.__qtouchswipe.handler = binding.value;
    }
  },
  unbind: function unbind (el, binding) {
    var ctx = el.__qtouchswipe;
    el.removeEventListener('touchstart', ctx.start);
    el.removeEventListener('mousedown', ctx.start);
    el.removeEventListener('touchmove', ctx.move);
    el.removeEventListener('touchend', ctx.end);
    delete el.__qtouchswipe;
  }
};

var QToggle = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{directives:[{name:"touch-swipe",rawName:"v-touch-swipe.horizontal",value:(_vm.__swipe),expression:"__swipe",modifiers:{"horizontal":true}}],staticClass:"q-toggle cursor-pointer relative-position no-outline q-focusable",class:( obj = {disabled: _vm.disable, active: _vm.isActive}, obj[("text-" + (_vm.color))] = _vm.isActive && _vm.color, obj ),attrs:{"tabindex":"0"},on:{"click":function($event){$event.stopPropagation();$event.preventDefault();_vm.toggle($event);},"focus":function($event){_vm.$emit('focus');},"blur":function($event){_vm.$emit('blur');},"keydown":function($event){if(!('button' in $event)&&_vm._k($event.keyCode,"space",32)&&_vm._k($event.keyCode,"enter",13)){ return null; }$event.preventDefault();_vm.toggle(false);}}},[_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.model),expression:"model"}],attrs:{"type":"checkbox","disabled":_vm.disable},domProps:{"value":_vm.val,"checked":Array.isArray(_vm.model)?_vm._i(_vm.model,_vm.val)>-1:(_vm.model)},on:{"click":function($event){$event.stopPropagation();},"change":_vm.__change,"__c":function($event){var $$a=_vm.model,$$el=$event.target,$$c=$$el.checked?(true):(false);if(Array.isArray($$a)){var $$v=_vm.val,$$i=_vm._i($$a,$$v);if($$c){$$i<0&&(_vm.model=$$a.concat($$v));}else{$$i>-1&&(_vm.model=$$a.slice(0,$$i).concat($$a.slice($$i+1)));}}else{_vm.model=$$c;}}}}),_c('div',{staticClass:"q-focus-helper"}),_c('div',{staticClass:"q-toggle-base"}),_c('div',{staticClass:"q-toggle-handle shadow-1 row items-center justify-center"},[(_vm.currentIcon)?_c('q-icon',{staticClass:"q-toggle-icon",attrs:{"name":_vm.currentIcon}}):_vm._e(),(_vm.$q.theme !== 'ios')?_c('div',{ref:"ripple",staticClass:"q-radial-ripple"}):_vm._e()],1),_vm._t("default")],2)
var obj;},staticRenderFns: [],
  name: 'q-toggle',
  components: {
    QIcon: QIcon
  },
  directives: {
    TouchSwipe: TouchSwipe
  },
  mixins: [Mixin],
  props: {
    icon: String,
    checkedIcon: String,
    uncheckedIcon: String
  },
  computed: {
    currentIcon: function currentIcon () {
      return (this.isActive ? this.checkedIcon : this.uncheckedIcon) || this.icon
    }
  },
  methods: {
    __swipe: function __swipe (evt) {
      if (evt.direction === 'left') {
        this.unselect();
      }
      else if (evt.direction === 'right') {
        this.select();
      }
    }
  }
};

var SelectMixin = {
  components: {
    QIcon: QIcon,
    QInputFrame: QInputFrame
  },
  mixins: [FrameMixin],
  props: {
    options: {
      type: Array,
      required: true,
      validator: function (v) { return v.every(function (o) { return 'label' in o && 'value' in o; }); }
    },
    chips: Boolean,
    bgColor: String
  },
  data: function data () {
    return {
      terms: '',
      focused: false
    }
  },
  computed: {
    hasChips: function hasChips () {
      return this.multiple && this.chips
    },
    length: function length () {
      return this.multiple
        ? this.value.length
        : 1
    },
    frameColor: function frameColor () {
      return this.hasChips && this.inverted
        ? this.bgColor || this.color
        : this.color
    }
  }
};

function defaultFilterFn (terms, obj) {
  return obj.label.toLowerCase().startsWith(terms)
}

var QSelect = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('q-input-frame',{ref:"input",staticClass:"q-select",attrs:{"prefix":_vm.prefix,"suffix":_vm.suffix,"stack-label":_vm.stackLabel,"float-label":_vm.floatLabel,"error":_vm.error,"disable":_vm.disable,"inverted":_vm.inverted,"dark":_vm.dark,"before":_vm.before,"after":_vm.after,"color":_vm.frameColor,"align":_vm.align,"focused":_vm.focused,"focusable":"","length":_vm.length},nativeOn:{"click":function($event){_vm.open($event);},"focus":function($event){_vm.__onOpen($event);},"blur":function($event){_vm.__onBlur($event);}}},[_c('div',{staticClass:"col row group"},[(_vm.hasChips)?_vm._l((_vm.selectedOptions),function(ref){
var label = ref.label;
var value = ref.value;
return _c('q-chip',{key:label,attrs:{"small":"","closable":!_vm.disable,"color":_vm.color},on:{"close":function($event){_vm.__toggle(value);}},nativeOn:{"click":function($event){$event.stopPropagation();}}},[_vm._v(_vm._s(label))])}):_c('div',{staticClass:"q-input-target",class:[("text-" + (_vm.align))]},[_vm._v(_vm._s(_vm.actualValue))])],2),_c('q-icon',{staticClass:"q-if-control",attrs:{"name":"arrow_drop_down"},slot:"control"}),_c('q-popover',{ref:"popover",attrs:{"fit":"","disable":_vm.disable,"offset":[0, 10],"anchor-click":false},on:{"open":_vm.__onOpen,"close":_vm.__onClose}},[(_vm.filter)?_c('q-search',{attrs:{"placeholder":_vm.filterPlaceholder,"debounce":50},model:{value:(_vm.terms),callback:function ($$v) {_vm.terms=$$v;},expression:"terms"}}):_vm._e(),_c('div',{staticClass:"list link no-border",class:{delimiter: _vm.delimiter}},[(_vm.multiple)?_vm._l((_vm.visibleOptions),function(opt){return _c('q-item',{key:opt,staticClass:"item",attrs:{"cfg":opt,"no-ripple":""},nativeOn:{"click":function($event){_vm.__toggle(opt.value);}}},[(_vm.toggle)?_c('q-toggle',{attrs:{"value":_vm.optModel[opt.index]},nativeOn:{"click":function($event){_vm.__toggle(opt.value);}},slot:"secondary"}):_c('q-checkbox',{attrs:{"value":_vm.optModel[opt.index]},nativeOn:{"click":function($event){_vm.__toggle(opt.value);}},slot:"primary"})],1)}):_vm._l((_vm.visibleOptions),function(opt){return _c('q-item',{key:opt,staticClass:"item",attrs:{"cfg":opt,"active":_vm.model === opt.value,"no-ripple":""},nativeOn:{"click":function($event){_vm.__select(opt.value);}}},[(_vm.radio)?_c('q-radio',{attrs:{"value":_vm.model,"val":opt.value},slot:"primary"}):_vm._e()],1)})],2)],1)],1)},staticRenderFns: [],
  name: 'q-select',
  mixins: [SelectMixin],
  components: {
    QSearch: QSearch,
    QPopover: QPopover,
    QItem: QItem,
    QCheckbox: QCheckbox,
    QRadio: QRadio,
    QToggle: QToggle,
    QChip: QChip
  },
  props: {
    value: {
      required: true
    },
    multiple: Boolean,
    radio: Boolean,
    toggle: Boolean,
    chips: Boolean,
    filter: [Function, Boolean],
    filterPlaceholder: {
      type: String,
      default: 'Filter'
    },
    placeholder: String,
    align: String,
    disable: Boolean,
    delimiter: Boolean
  },
  watch: {
    model: {
      deep: true,
      handler: function handler (val) {
        var popover = this.$refs.popover;
        if (popover.opened) {
          popover.reposition();
        }
        if (this.multiple) {
          this.$emit('input', val);
        }
      }
    }
  },
  computed: {
    model: {
      get: function get () {
        if (this.multiple && !Array.isArray(this.value)) {
          console.error('Select model needs to be an array when using multiple selection.');
        }
        return this.value
      },
      set: function set (value) {
        this.$emit('input', value);
      }
    },
    actualValue: function actualValue () {
      var this$1 = this;

      if (!this.multiple) {
        var option = this.options.find(function (option) { return option.value === this$1.model; });
        return option ? option.label : ''
      }

      var options = this.selectedOptions.map(function (opt) { return opt.label; });
      return !options.length ? '' : options.join(', ')
    },
    optModel: function optModel () {
      var this$1 = this;

      /* Used by multiple selection only */
      if (this.multiple) {
        return this.options.map(function (opt) { return this$1.model.includes(opt.value); })
      }
    },
    selectedOptions: function selectedOptions () {
      var this$1 = this;

      if (this.multiple) {
        return this.options.filter(function (opt) { return this$1.model.includes(opt.value); })
      }
    },
    visibleOptions: function visibleOptions () {
      var this$1 = this;

      var opts = clone(this.options).map(function (opt, index) {
        opt.index = index;
        opt.value = this$1.options[index].value;
        return opt
      });
      if (this.filter && this.terms.length) {
        var lowerTerms = this.terms.toLowerCase();
        opts = opts.filter(function (opt) { return this$1.filterFn(lowerTerms, opt); });
      }
      return opts
    },
    filterFn: function filterFn () {
      return typeof this.filter === 'boolean'
        ? defaultFilterFn
        : this.filter
    }
  },
  methods: {
    open: function open (event) {
      if (!this.disable) {
        this.$refs.popover.open();
      }
    },
    close: function close () {
      this.$refs.popover.close();
    },

    __onOpen: function __onOpen () {
      this.focused = true;
      this.$emit('focus');
    },
    __onClose: function __onClose () {
      this.focused = false;
      this.$emit('blur');
      this.terms = '';
    },
    __toggle: function __toggle (value) {
      var index = this.model.indexOf(value);
      if (index > -1) {
        this.model.splice(index, 1);
      }
      else {
        this.model.push(value);
      }
    },
    __select: function __select (val) {
      this.model = val;
      this.close();
    },
    __onBlur: function __onBlur (e) {
      var this$1 = this;

      setTimeout(function () {
        if (document.activeElement !== document.body && !this$1.$refs.popover.$el.contains(document.activeElement)) {
          this$1.close();
        }
      }, 1);
    }
  }
};

var Modal = function (component) {
  return {
    create: function create (props) {
      var node = document.createElement('div');
      document.body.appendChild(node);

      var vm = new Vue({
        el: node,
        data: function data () {
          return {props: props}
        },
        render: function (h) { return h(component, {props: props}); }
      });

      return {
        vm: vm,
        close: function close (fn) {
          vm.quasarClose(fn);
        }
      }
    }
  }
};

function getPercentage (event, dragging) {
  return between((position(event).left - dragging.left) / dragging.width, 0, 1)
}

function notDivides (res, decimals) {
  var number = decimals
    ? parseFloat(res.toFixed(decimals), 10)
    : res;

  return number !== parseInt(number, 10)
}

function getModel (percentage, min, max, step, decimals) {
  var
    model = min + percentage * (max - min),
    modulo = (model - min) % step;

  model += (Math.abs(modulo) >= step / 2 ? (modulo < 0 ? -1 : 1) * step : 0) - modulo;

  if (decimals) {
    model = parseFloat(model.toFixed(decimals));
  }

  return between(model, min, max)
}

var mixin$1 = {
  components: {
    QChip: QChip
  },
  props: {
    min: {
      type: Number,
      default: 1
    },
    max: {
      type: Number,
      default: 5
    },
    step: {
      type: Number,
      default: 1
    },
    decimals: {
      type: Number,
      default: 0
    },
    snap: Boolean,
    markers: Boolean,
    label: Boolean,
    labelAlways: Boolean,
    square: Boolean,
    color: String,
    error: Boolean,
    disable: Boolean
  },
  computed: {
    classes: function classes () {
      var cls = {
        disabled: this.disable,
        'label-always': this.labelAlways,
        'has-error': this.error
      };

      if (!this.error && this.color) {
        cls[("text-" + (this.color))] = true;
      }

      return cls
    },
    labelColor: function labelColor () {
      return this.error
        ? 'negative'
        : this.color || 'primary'
    }
  },
  methods: {
    __pan: function __pan (event) {
      if (this.disable) {
        return
      }
      if (event.isFinal) {
        this.__end(event.evt);
      }
      else if (event.isFirst) {
        this.__setActive(event.evt);
      }
      else if (this.dragging) {
        this.__update(event.evt);
      }
    },
    __click: function __click (event) {
      if (this.disable) {
        return
      }
      this.__setActive(event);
      this.__end(event);
    }
  },
  created: function created () {
    this.__validateProps();
  }
};

function getDirection$1 (mod) {
  if (Object.keys(mod).length === 0) {
    return {
      horizontal: true,
      vertical: true
    }
  }

  var dir = {};['horizontal', 'vertical'].forEach(function (direction) {
    if (mod[direction]) {
      dir[direction] = true;
    }
  });

  return dir
}

function updateClasses$1 (el, dir, scroll) {
  el.classList.add('q-touch');

  if (!scroll) {
    if (dir.horizontal && !dir.vertical) {
      el.classList.add('q-touch-y');
      el.classList.remove('q-touch-x');
    }
    else if (!dir.horizontal && dir.vertical) {
      el.classList.add('q-touch-x');
      el.classList.remove('q-touch-y');
    }
  }
}

function processChanges (evt, ctx, isFinal) {
  var
    direction,
    pos = position(evt),
    distX = pos.left - ctx.event.x,
    distY = pos.top - ctx.event.y,
    absDistX = Math.abs(distX),
    absDistY = Math.abs(distY);

  if (ctx.direction.horizontal && !ctx.direction.vertical) {
    direction = distX < 0 ? 'left' : 'right';
  }
  else if (!ctx.direction.horizontal && ctx.direction.vertical) {
    direction = distY < 0 ? 'up' : 'down';
  }
  else if (absDistX >= absDistY) {
    direction = distX < 0 ? 'left' : 'right';
  }
  else {
    direction = distY < 0 ? 'up' : 'down';
  }

  return {
    evt: evt,
    position: pos,
    direction: direction,
    isFirst: ctx.event.isFirst,
    isFinal: Boolean(isFinal),
    duration: new Date().getTime() - ctx.event.time,
    distance: {
      x: absDistX,
      y: absDistY
    },
    delta: {
      x: pos.left - ctx.event.lastX,
      y: pos.top - ctx.event.lastY
    }
  }
}

function shouldTrigger (ctx, changes) {
  if (ctx.direction.horizontal && ctx.direction.vertical) {
    return true
  }
  if (ctx.direction.horizontal && !ctx.direction.vertical) {
    return Math.abs(changes.delta.x) > 0
  }
  if (!ctx.direction.horizontal && ctx.direction.vertical) {
    return Math.abs(changes.delta.y) > 0
  }
}

var TouchPan = {
  name: 'touch-pan',
  bind: function bind (el, binding) {
    var mouse = !binding.modifiers.nomouse;

    var ctx = {
      handler: binding.value,
      scroll: binding.modifiers.scroll,
      direction: getDirection$1(binding.modifiers),

      mouseStart: function mouseStart (evt) {
        if (mouse) {
          document.addEventListener('mousemove', ctx.mouseMove);
          document.addEventListener('mouseup', ctx.mouseEnd);
        }
        ctx.start(evt);
      },
      start: function start (evt) {
        var pos = position(evt);
        ctx.event = {
          x: pos.left,
          y: pos.top,
          time: new Date().getTime(),
          detected: false,
          prevent: ctx.direction.horizontal && ctx.direction.vertical,
          isFirst: true,
          lastX: pos.left,
          lastY: pos.top
        };
      },
      mouseMove: function mouseMove (evt) {
        ctx.event.prevent = true;
        ctx.move(evt);
      },
      move: function move (evt) {
        if (ctx.event.prevent) {
          if (!ctx.scroll) {
            evt.preventDefault();
          }
          var changes = processChanges(evt, ctx, false);
          if (shouldTrigger(ctx, changes)) {
            ctx.handler(changes);
            ctx.event.lastX = changes.position.left;
            ctx.event.lastY = changes.position.top;
            ctx.event.isFirst = false;
          }
          return
        }
        if (ctx.event.detected) {
          return
        }

        ctx.event.detected = true;
        var
          pos = position(evt),
          distX = pos.left - ctx.event.x,
          distY = pos.top - ctx.event.y;

        if (ctx.direction.horizontal && !ctx.direction.vertical) {
          if (Math.abs(distX) > Math.abs(distY)) {
            evt.preventDefault();
            ctx.event.prevent = true;
          }
        }
        else if (Math.abs(distX) < Math.abs(distY)) {
          ctx.event.prevent = true;
        }
      },
      mouseEnd: function mouseEnd (evt) {
        if (mouse) {
          document.removeEventListener('mousemove', ctx.mouseMove);
          document.removeEventListener('mouseup', ctx.mouseEnd);
        }
        ctx.end(evt);
      },
      end: function end (evt) {
        if (!ctx.event.prevent || ctx.event.isFirst) {
          return
        }

        ctx.handler(processChanges(evt, ctx, true));
      }
    };

    el.__qtouchpan = ctx;
    updateClasses$1(el, ctx.direction, ctx.scroll);
    if (mouse) {
      el.addEventListener('mousedown', ctx.mouseStart);
    }
    el.addEventListener('touchstart', ctx.start);
    el.addEventListener('touchmove', ctx.move);
    el.addEventListener('touchend', ctx.end);
  },
  update: function update (el, binding) {
    if (binding.oldValue !== binding.value) {
      el.__qtouchpan.handler = binding.value;
    }
  },
  unbind: function unbind (el, binding) {
    var ctx = el.__qtouchpan;
    el.removeEventListener('touchstart', ctx.start);
    el.removeEventListener('mousedown', ctx.mouseStart);
    el.removeEventListener('touchmove', ctx.move);
    el.removeEventListener('touchend', ctx.end);
    delete el.__qtouchpan;
  }
};

var QRange = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{directives:[{name:"touch-pan",rawName:"v-touch-pan.horizontal",value:(_vm.__pan),expression:"__pan",modifiers:{"horizontal":true}}],staticClass:"q-range non-selectable",class:_vm.classes,on:{"click":_vm.__click}},[_c('div',{ref:"handle",staticClass:"q-range-handle-container"},[_c('div',{staticClass:"q-range-track"}),_vm._l((((_vm.max - _vm.min) / _vm.step + 1)),function(n){return (_vm.markers)?_c('div',{staticClass:"q-range-mark",style:({left: (n - 1) * 100 * _vm.step / (_vm.max - _vm.min) + '%'})}):_vm._e()}),_c('div',{staticClass:"q-range-track active-track",class:{'no-transition': _vm.dragging, 'handle-at-minimum': _vm.value === _vm.min},style:({width: _vm.percentage})}),_c('div',{staticClass:"q-range-handle",class:{dragging: _vm.dragging, 'handle-at-minimum': _vm.value === _vm.min},style:({left: _vm.percentage, borderRadius: _vm.square ? '0' : '50%'})},[(_vm.label || _vm.labelAlways)?_c('q-chip',{staticClass:"q-range-label no-pointer-events",class:{'label-always': _vm.labelAlways},attrs:{"pointing":"down","square":"","color":_vm.labelColor}},[_vm._v(_vm._s(_vm.value))]):_vm._e(),(_vm.$q.theme !== 'ios')?_c('div',{staticClass:"q-range-ring"}):_vm._e()],1)],2)])},staticRenderFns: [],
  name: 'q-range',
  directives: {
    TouchPan: TouchPan
  },
  mixins: [mixin$1],
  props: {
    value: {
      type: Number,
      required: true
    }
  },
  data: function data () {
    return {
      dragging: false,
      currentPercentage: (this.value - this.min) / (this.max - this.min)
    }
  },
  computed: {
    percentage: function percentage () {
      if (this.snap) {
        return (this.value - this.min) / (this.max - this.min) * 100 + '%'
      }
      return 100 * this.currentPercentage + '%'
    }
  },
  watch: {
    value: function value (value$1) {
      if (this.dragging) {
        return
      }
      this.currentPercentage = (value$1 - this.min) / (this.max - this.min);
    },
    min: function min (value) {
      if (this.value < value) {
        this.value = value;
        return
      }
      this.$nextTick(this.__validateProps);
    },
    max: function max (value) {
      if (this.value > value) {
        this.value = value;
        return
      }
      this.$nextTick(this.__validateProps);
    },
    step: function step () {
      this.$nextTick(this.__validateProps);
    }
  },
  methods: {
    __setActive: function __setActive (event) {
      var container = this.$refs.handle;

      this.dragging = {
        left: container.getBoundingClientRect().left,
        width: container.offsetWidth
      };
      this.__update(event);
    },
    __update: function __update (event) {
      var
        percentage = getPercentage(event, this.dragging),
        model = getModel(percentage, this.min, this.max, this.step, this.decimals);

      this.currentPercentage = percentage;
      this.$emit('input', model);
    },
    __end: function __end () {
      this.dragging = false;
      this.currentPercentage = (this.value - this.min) / (this.max - this.min);
    },
    __validateProps: function __validateProps () {
      if (this.min >= this.max) {
        console.error('Range error: min >= max', this.$el, this.min, this.max);
      }
      else if (notDivides((this.max - this.min) / this.step, this.decimals)) {
        console.error('Range error: step must be a divisor of max - min', this.min, this.max, this.step, this.decimals);
      }
    }
  }
};

var dragType = {
  MIN: 0,
  RANGE: 1,
  MAX: 2
};

var QDoubleRange = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{directives:[{name:"touch-pan",rawName:"v-touch-pan.horizontal",value:(_vm.__pan),expression:"__pan",modifiers:{"horizontal":true}}],staticClass:"q-range non-selectable",class:_vm.classes,on:{"click":_vm.__click}},[_c('div',{ref:"handle",staticClass:"q-range-handle-container"},[_c('div',{staticClass:"q-range-track"}),_vm._l((((_vm.max - _vm.min) / _vm.step + 1)),function(n){return (_vm.markers)?_c('div',{staticClass:"q-range-mark",style:({left: (n - 1) * 100 * _vm.step / (_vm.max - _vm.min) + '%'})}):_vm._e()}),_c('div',{staticClass:"q-range-track active-track",class:{dragging: _vm.dragging, 'track-draggable': _vm.dragRange || _vm.dragOnlyRange},style:({left: ((_vm.percentageMin * 100) + "%"), width: _vm.activeTrackWidth})}),_c('div',{ref:"handleMin",staticClass:"q-range-handle q-range-handle-min",class:{dragging: _vm.dragging, 'handle-at-minimum': _vm.value.min === _vm.min},style:({left: ((_vm.percentageMin * 100) + "%"), borderRadius: _vm.square ? '0' : '50%'})},[(_vm.label || _vm.labelAlways)?_c('q-chip',{staticClass:"q-range-label no-pointer-events",class:{'label-always': _vm.labelAlways},attrs:{"pointing":"down","square":"","color":_vm.labelColor}},[_vm._v(_vm._s(_vm.value.min))]):_vm._e(),(_vm.$q.theme !== 'ios')?_c('div',{staticClass:"q-range-ring"}):_vm._e()],1),_c('div',{staticClass:"q-range-handle q-range-handle-max",class:{dragging: _vm.dragging, 'handle-at-maximum': _vm.value.max === _vm.max},style:({left: ((_vm.percentageMax * 100) + "%"), borderRadius: _vm.square ? '0' : '50%'})},[(_vm.label || _vm.labelAlways)?_c('q-chip',{staticClass:"q-range-label no-pointer-events",class:{'label-always': _vm.labelAlways},attrs:{"pointing":"down","square":"","color":_vm.labelColor}},[_vm._v(_vm._s(_vm.value.max))]):_vm._e(),(_vm.$q.theme !== 'ios')?_c('div',{staticClass:"q-range-ring"}):_vm._e()],1)],2)])},staticRenderFns: [],
  name: 'q-double-range',
  directives: {
    TouchPan: TouchPan
  },
  mixins: [mixin$1],
  props: {
    value: {
      type: Object,
      required: true,
      validator: function validator (value) {
        return typeof value.min !== 'undefined' && typeof value.max !== 'undefined'
      }
    },
    dragRange: Boolean,
    dragOnlyRange: Boolean
  },
  data: function data () {
    return {
      dragging: false,
      currentMinPercentage: (this.value.min - this.min) / (this.max - this.min),
      currentMaxPercentage: (this.value.max - this.min) / (this.max - this.min)
    }
  },
  computed: {
    percentageMin: function percentageMin () {
      return this.snap ? (this.value.min - this.min) / (this.max - this.min) : this.currentMinPercentage
    },
    percentageMax: function percentageMax () {
      return this.snap ? (this.value.max - this.min) / (this.max - this.min) : this.currentMaxPercentage
    },
    activeTrackWidth: function activeTrackWidth () {
      return 100 * (this.percentageMax - this.percentageMin) + '%'
    }
  },
  watch: {
    'value.min': function value_min (value) {
      if (this.dragging) {
        return
      }
      if (value > this.value.max) {
        value = this.value.max;
      }
      this.currentMinPercentage = (value - this.min) / (this.max - this.min);
    },
    'value.max': function value_max (value) {
      if (this.dragging) {
        return
      }
      if (value < this.value.min) {
        value = this.value.min;
      }
      this.currentMaxPercentage = (value - this.min) / (this.max - this.min);
    },
    min: function min (value) {
      if (this.value.min < value) {
        this.__update({min: value});
      }
      if (this.value.max < value) {
        this.__update({max: value});
      }
      this.$nextTick(this.__validateProps);
    },
    max: function max (value) {
      if (this.value.min > value) {
        this.__update({min: value});
      }
      if (this.value.max > value) {
        this.__update({max: value});
      }
      this.$nextTick(this.__validateProps);
    },
    step: function step () {
      this.$nextTick(this.__validateProps);
    }
  },
  methods: {
    __setActive: function __setActive (event) {
      var
        container = this.$refs.handle,
        width = container.offsetWidth,
        sensitivity = (this.dragOnlyRange ? -1 : 1) * this.$refs.handleMin.offsetWidth / (2 * width);

      this.dragging = {
        left: container.getBoundingClientRect().left,
        width: width,
        valueMin: this.value.min,
        valueMax: this.value.max,
        percentageMin: this.currentMinPercentage,
        percentageMax: this.currentMaxPercentage
      };

      var
        percentage = getPercentage(event, this.dragging),
        type;

      if (percentage < this.currentMinPercentage + sensitivity) {
        type = dragType.MIN;
      }
      else if (percentage < this.currentMaxPercentage - sensitivity) {
        if (this.dragRange || this.dragOnlyRange) {
          type = dragType.RANGE;
          extend(this.dragging, {
            offsetPercentage: percentage,
            offsetModel: getModel(percentage, this.min, this.max, this.step, this.decimals),
            rangeValue: this.dragging.valueMax - this.dragging.valueMin,
            rangePercentage: this.currentMaxPercentage - this.currentMinPercentage
          });
        }
        else {
          type = this.currentMaxPercentage - percentage < percentage - this.currentMinPercentage
            ? dragType.MAX
            : dragType.MIN;
        }
      }
      else {
        type = dragType.MAX;
      }

      if (this.dragOnlyRange && type !== dragType.RANGE) {
        this.dragging = false;
        return
      }

      this.dragging.type = type;
      this.__update(event);
    },
    __update: function __update (event) {
      var
        percentage = getPercentage(event, this.dragging),
        model = getModel(percentage, this.min, this.max, this.step, this.decimals),
        pos;

      switch (this.dragging.type) {
        case dragType.MIN:
          if (percentage <= this.dragging.percentageMax) {
            pos = {
              minP: percentage,
              maxP: this.dragging.percentageMax,
              min: model,
              max: this.dragging.valueMax
            };
          }
          else {
            pos = {
              minP: this.dragging.percentageMax,
              maxP: percentage,
              min: this.dragging.valueMax,
              max: model
            };
          }
          break

        case dragType.MAX:
          if (percentage >= this.dragging.percentageMin) {
            pos = {
              minP: this.dragging.percentageMin,
              maxP: percentage,
              min: this.dragging.valueMin,
              max: model
            };
          }
          else {
            pos = {
              minP: percentage,
              maxP: this.dragging.percentageMin,
              min: model,
              max: this.dragging.valueMin
            };
          }
          break

        case dragType.RANGE:
          var
            percentageDelta = percentage - this.dragging.offsetPercentage,
            minP = between(this.dragging.percentageMin + percentageDelta, 0, 1 - this.dragging.rangePercentage),
            modelDelta = model - this.dragging.offsetModel,
            min = between(this.dragging.valueMin + modelDelta, this.min, this.max - this.dragging.rangeValue);

          pos = {
            minP: minP,
            maxP: minP + this.dragging.rangePercentage,
            min: min,
            max: min + this.dragging.rangeValue
          };
          break
      }

      this.currentMinPercentage = pos.minP;
      this.currentMaxPercentage = pos.maxP;
      this.__updateInput(pos);
    },
    __end: function __end () {
      this.dragging = false;
      this.currentMinPercentage = (this.value.min - this.min) / (this.max - this.min);
      this.currentMaxPercentage = (this.value.max - this.min) / (this.max - this.min);
    },
    __updateInput: function __updateInput (ref) {
      var min = ref.min; if ( min === void 0 ) min = this.value.min;
      var max = ref.max; if ( max === void 0 ) max = this.value.max;

      this.$emit('input', {min: min, max: max});
    },
    __validateProps: function __validateProps () {
      if (this.min >= this.max) {
        console.error('Range error: min >= max', this.$el, this.min, this.max);
      }
      else if (notDivides((this.max - this.min) / this.step, this.decimals)) {
        console.error('Range error: step must be a divisor of max - min', this.min, this.max, this.step);
      }
      else if (notDivides((this.value.min - this.min) / this.step, this.decimals)) {
        console.error('Range error: step must be a divisor of initial value.min - min', this.value.min, this.min, this.step);
      }
      else if (notDivides((this.value.max - this.min) / this.step, this.decimals)) {
        console.error('Range error: step must be a divisor of initial value.max - min', this.value.max, this.max, this.step);
      }
    }
  }
};

var QRating = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"q-rating row inline items-center no-wrap",class:( obj = { disabled: _vm.disable, editable: _vm.editable }, obj[("text-" + (_vm.color))] = _vm.color, obj ),style:(_vm.size ? ("font-size: " + (_vm.size)) : '')},_vm._l((_vm.max),function(index){return _c('q-icon',{key:index,class:{ active: (!_vm.mouseModel && _vm.model >= index) || (_vm.mouseModel && _vm.mouseModel >= index), exselected: _vm.mouseModel && _vm.model >= index && _vm.mouseModel < index, hovered: _vm.mouseModel === index },attrs:{"name":_vm.icon},on:{"click":function($event){_vm.set(index);},"mouseover":function($event){_vm.__setHoverValue(index);},"mouseout":function($event){_vm.mouseModel = 0;}}})}))
var obj;},staticRenderFns: [],
  name: 'q-rating',
  components: {
    QIcon: QIcon
  },
  props: {
    value: {
      type: Number,
      default: 0,
      required: true
    },
    max: {
      type: Number,
      required: true
    },
    icon: {
      type: String,
      default: 'grade'
    },
    color: String,
    size: String,
    readonly: Boolean,
    disable: Boolean
  },
  data: function data () {
    return {
      mouseModel: 0
    }
  },
  computed: {
    model: {
      get: function get () {
        return this.value
      },
      set: function set (value) {
        if (this.value !== value) {
          this.$emit('input', value);
        }
      }
    },
    editable: function editable () {
      return !this.readonly && !this.disable
    }
  },
  methods: {
    set: function set (value) {
      if (this.editable) {
        this.model = between(parseInt(value, 10), 1, this.max);
        this.mouseModel = 0;
      }
    },
    __setHoverValue: function __setHoverValue (value) {
      if (this.editable) {
        this.mouseModel = value;
      }
    }
  }
};

function width$1 (val) {
  return {width: (val + "%")}
}

var QProgress = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"q-progress",class:_vm.color ? ("text-" + (_vm.color)) : ''},[(_vm.buffer && !_vm.indeterminate)?_c('div',{staticClass:"q-progress-buffer",style:(_vm.bufferStyle)},[_vm._v(" ")]):_vm._e(),_c('div',{staticClass:"q-progress-track",style:(_vm.trackStyle)},[_vm._v(" ")]),_c('div',{staticClass:"q-progress-model",class:{ animate: _vm.animate, stripe: _vm.stripe, indeterminate: _vm.indeterminate },style:(_vm.modelStyle)},[_vm._v(" ")])])},staticRenderFns: [],
  name: 'q-progress',
  props: {
    percentage: {
      type: Number,
      default: 0
    },
    color: String,
    stripe: Boolean,
    animate: Boolean,
    indeterminate: Boolean,
    buffer: Number
  },
  computed: {
    model: function model () {
      return between(this.percentage, 0, 100)
    },
    bufferModel: function bufferModel () {
      return between(this.buffer || 0, 0, 100 - this.model)
    },
    modelStyle: function modelStyle () {
      return width$1(this.model)
    },
    bufferStyle: function bufferStyle () {
      return width$1(this.bufferModel)
    },
    trackStyle: function trackStyle () {
      return width$1(this.buffer ? 100 - this.buffer : 100)
    }
  }
};

var Dialog$1 = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('q-modal',{ref:"dialog",staticClass:"minimized",attrs:{"no-backdrop-dismiss":_vm.noBackdropDismiss,"no-esc-dismiss":_vm.noEscDismiss},on:{"close":function($event){_vm.__dismiss();}}},[_c('div',{staticClass:"modal-header",domProps:{"innerHTML":_vm._s(_vm.title || '')}}),(_vm.message)?_c('div',{staticClass:"modal-body modal-scroll",domProps:{"innerHTML":_vm._s(_vm.message)}}):_vm._e(),(_vm.form)?_c('div',{staticClass:"modal-body modal-scroll"},[_vm._l((_vm.form),function(el){return [(el.type === 'heading')?_c('h6',{domProps:{"innerHTML":_vm._s(el.label)}}):_vm._e(),(_vm.__isInputType(el.type))?_c('q-input',{staticStyle:{"margin-bottom":"10px"},attrs:{"type":el.type,"color":el.color,"placeholder":el.placeholder,"float-label":el.label},model:{value:(el.model),callback:function ($$v) {el.model=$$v;},expression:"el.model"}}):_vm._e(),(el.type === 'chips')?_c('div',{staticStyle:{"margin-bottom":"10px"}},[_c('label',{domProps:{"innerHTML":_vm._s(el.label)}}),_c('q-chips-input',{attrs:{"color":el.color},model:{value:(el.model),callback:function ($$v) {el.model=$$v;},expression:"el.model"}})],1):_vm._e(),_vm._l((el.items),function(radio){return (el.type === 'radio')?_c('label',{key:radio,staticClass:"item"},[_c('div',{staticClass:"item-primary"},[_c('q-radio',{attrs:{"val":radio.value,"disable":radio.disabled,"color":radio.color || el.color},model:{value:(el.model),callback:function ($$v) {el.model=$$v;},expression:"el.model"}})],1),_c('div',{staticClass:"item-content",domProps:{"innerHTML":_vm._s(radio.label)}})]):_vm._e()}),_vm._l((el.items),function(checkbox){return (el.type === 'checkbox')?_c('label',{key:checkbox,staticClass:"item"},[_c('div',{staticClass:"item-primary"},[_c('q-checkbox',{attrs:{"disable":checkbox.disabled,"color":checkbox.color || el.color},model:{value:(checkbox.model),callback:function ($$v) {checkbox.model=$$v;},expression:"checkbox.model"}})],1),_c('div',{staticClass:"item-content",domProps:{"innerHTML":_vm._s(checkbox.label)}})]):_vm._e()}),_vm._l((el.items),function(toggle){return (el.type === 'toggle')?_c('label',{key:toggle,staticClass:"item"},[_c('div',{staticClass:"item-content has-secondary",domProps:{"innerHTML":_vm._s(toggle.label)}}),_c('div',{staticClass:"item-secondary"},[_c('q-toggle',{attrs:{"disable":toggle.disabled,"color":toggle.color || el.color},model:{value:(toggle.model),callback:function ($$v) {toggle.model=$$v;},expression:"toggle.model"}})],1)]):_vm._e()}),(el.type === 'range' || el.type === 'double-range')?_c('div',{staticStyle:{"margin-top":"15px","margin-bottom":"10px"}},[_c('label',{domProps:{"innerHTML":_vm._s(el.label + ' (' + (el.type === 'double-range' ? el.model.min + ' to ' + el.model.max : el.model) + ')')}}),_c('q-' + el.type,{tag:"component",staticClass:"with-padding",attrs:{"min":el.min,"max":el.max,"step":el.step,"label":el.withLabel,"label-always":el.labelAlways,"markers":el.markers,"snap":el.snap,"square":el.square,"color":el.color},model:{value:(el.model),callback:function ($$v) {el.model=$$v;},expression:"el.model"}})],1):_vm._e(),(el.type === 'rating')?_c('div',{staticStyle:{"margin-bottom":"10px"}},[_c('label',{staticClass:"block",domProps:{"innerHTML":_vm._s(el.label)}}),_c('q-rating',{style:({fontSize: el.size || '2rem'}),attrs:{"max":el.max,"icon":el.icon,"color":el.color},model:{value:(el.model),callback:function ($$v) {el.model=$$v;},expression:"el.model"}})],1):_vm._e()]})],2):_vm._e(),(_vm.progress)?_c('div',{staticClass:"modal-body"},[_c('q-progress',{attrs:{"percentage":_vm.progress.model,"color":"progress.color || primary","animate":"","stripe":"","indeterminate":_vm.progress.indeterminate}}),(!_vm.progress.indeterminate)?_c('span',[_vm._v(_vm._s(_vm.progress.model)+" %")]):_vm._e()],1):_vm._e(),(_vm.buttons)?_c('div',{staticClass:"modal-buttons",class:{row: !_vm.stackButtons, column: _vm.stackButtons}},_vm._l((_vm.buttons),function(button){return _c('q-btn',{key:button,class:button.classes,style:(button.style),attrs:{"color":button.color,"flat":button.flat || !button.raised && !button.push && !button.outline && !button.rounded,"push":button.push,"rounded":button.rounded,"outline":button.outline},on:{"click":function($event){_vm.trigger(button.handler, button.preventClose);}}},[_c('span',{domProps:{"innerHTML":_vm._s(typeof button === 'string' ? button : button.label)}})])})):_vm._e(),(!_vm.buttons && !_vm.nobuttons)?_c('div',{staticClass:"modal-buttons row"},[_c('q-btn',{attrs:{"flat":""},on:{"click":function($event){_vm.close();}}},[_vm._v("OK")])],1):_vm._e()])},staticRenderFns: [],
  name: 'q-dialog',
  components: {
    QModal: QModal,
    QInput: QInput,
    QChipsInput: QChipsInput,
    QRadio: QRadio,
    QCheckbox: QCheckbox,
    QToggle: QToggle,
    QRange: QRange,
    QDoubleRange: QDoubleRange,
    QRating: QRating,
    QProgress: QProgress,
    QBtn: QBtn
  },
  props: {
    title: String,
    message: String,
    form: Object,
    stackButtons: Boolean,
    buttons: Array,
    nobuttons: Boolean,
    progress: Object,
    onDismiss: Function,
    noBackdropDismiss: Boolean,
    noEscDismiss: Boolean
  },
  computed: {
    opened: function opened () {
      if (this.$refs.dialog) {
        return this.$refs.dialog.active
      }
    }
  },
  methods: {
    trigger: function trigger (handler, preventClose) {
      var this$1 = this;

      var handlerFn = typeof handler === 'function';
      if (!handlerFn) {
        this.close();
        return
      }

      if (preventClose) {
        handler(this.getFormData(), this.close);
      }
      else {
        this.close(function () { handler(this$1.getFormData()); });
      }
    },
    getFormData: function getFormData () {
      var this$1 = this;

      if (!this.form) {
        return
      }

      var data = {};

      Object.keys(this.form).forEach(function (name) {
        var el = this$1.form[name];
        if (['checkbox', 'toggle'].includes(el.type)) {
          data[name] = el.items.filter(function (item) { return item.model; }).map(function (item) { return item.value; });
        }
        else if (el.type !== 'heading') {
          data[name] = el.model;
        }
      });

      return data
    },
    close: function close (fn) {
      if (!this.opened) {
        return
      }
      this.$refs.dialog.close(function () {
        if (typeof fn === 'function') {
          fn();
        }
      });
    },
    __isInputType: function __isInputType (type) {
      return inputTypes.includes(type)
    },
    __dismiss: function __dismiss () {
      this.$root.$destroy();
      if (typeof this.onDismiss === 'function') {
        this.onDismiss();
      }
    }
  },
  mounted: function mounted () {
    var this$1 = this;

    this.$refs.dialog.open(function () {
      if (!this$1.$q.platform.is.desktop) {
        return
      }

      var node = this$1.$refs.dialog.$el.getElementsByTagName(this$1.form ? 'INPUT' : 'BUTTON');
      if (!node.length) {
        return
      }

      if (this$1.form) {
        node[0].focus();
      }
      else {
        node[node.length - 1].focus();
      }
    });
    this.$root.quasarClose = this.close;
  }
};

var Dialog = Modal(Dialog$1);

var QDialogSelect = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('q-input-frame',{ref:"input",staticClass:"q-select",attrs:{"prefix":_vm.prefix,"suffix":_vm.suffix,"stack-label":_vm.stackLabel,"float-label":_vm.floatLabel,"error":_vm.error,"disable":_vm.disable,"inverted":_vm.inverted,"dark":_vm.dark,"before":_vm.before,"after":_vm.after,"color":_vm.frameColor,"align":_vm.align,"focused":_vm.focused,"focusable":"","length":_vm.length},nativeOn:{"click":function($event){_vm.pick($event);},"focus":function($event){_vm.__onFocus($event);},"blur":function($event){_vm.__onBlur($event);}}},[_c('div',{staticClass:"col row group"},[(_vm.hasChips)?_vm._l((_vm.selectedOptions),function(ref){
var label = ref.label;
var value = ref.value;
return _c('q-chip',{key:label,attrs:{"small":"","closable":!_vm.disable,"color":"color"},on:{"close":function($event){_vm.__toggle(value);}},nativeOn:{"click":function($event){$event.stopPropagation();}}},[_vm._v(_vm._s(label))])}):_c('div',{staticClass:"q-input-target",class:[("text-" + (_vm.align))]},[_vm._v(_vm._s(_vm.actualValue))])],2),_c('q-icon',{staticClass:"q-if-control",attrs:{"name":"arrow_drop_down"},slot:"control"})],1)},staticRenderFns: [],
  name: 'q-dialog-select',
  mixins: [SelectMixin],
  props: {
    value: {
      required: true
    },
    type: {
      type: String,
      required: true,
      validator: function (v) { return ['radio', 'checkbox', 'toggle'].includes(v); }
    },
    okLabel: {
      type: String,
      default: 'OK'
    },
    cancelLabel: {
      type: String,
      default: 'Cancel'
    },
    title: {
      type: String,
      default: 'Select'
    },
    message: String
  },
  data: function data () {
    return {
      focused: false
    }
  },
  computed: {
    actualValue: function actualValue () {
      var this$1 = this;

      if (this.multiple) {
        var options = this.options
        .filter(function (option) { return this$1.value.includes(option.value); })
        .map(function (option) { return option.label; });

        return !options.length ? '' : options.join(', ')
      }

      var option = this.options.find(function (option) { return option.value === this$1.value; });
      return option ? option.label : ''
    },
    selectedOptions: function selectedOptions () {
      var this$1 = this;

      if (this.multiple) {
        return this.options.filter(function (opt) { return this$1.value.includes(opt.value); })
      }
    },
    multiple: function multiple () {
      return ['checkbox', 'toggle'].includes(this.type)
    }
  },
  methods: {
    pick: function pick () {
      var this$1 = this;

      if (this.disable) {
        return
      }

      var options = this.options.map(function (opt) {
        return {
          value: opt.value,
          label: opt.label,
          color: opt.color,
          model: this$1.multiple ? this$1.value.includes(opt.value) : this$1.value === opt.value
        }
      });

      this.dialog = Dialog.create({
        title: this.title,
        message: this.message,
        onDismiss: function () {
          this$1.dialog = null;
        },
        form: {
          select: {type: this.type, model: this.value, items: options}
        },
        buttons: [
          this.cancelLabel,
          {
            label: this.okLabel,
            handler: function (data) {
              this$1.$emit('input', data.select);
            }
          }
        ]
      });
    },
    close: function close () {
      if (this.dialog) {
        this.dialog.close();
      }
    },

    __toggle: function __toggle (value) {
      var
        index = this.value.indexOf(value),
        model = this.value.slice(0);

      if (index > -1) {
        model.splice(index, 1);
      }
      else {
        model.push(value);
      }

      this.$emit('input', model);
    },
    __onFocus: function __onFocus () {
      this.focused = true;
      this.$emit('focus');
    },
    __onBlur: function __onBlur (e) {
      this.focused = false;
      this.$emit('blur');
    }
  }
};

var TableFilter = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"q-data-table-toolbar upper-toolbar row col items-center"},[_c('q-search',{staticClass:"col",attrs:{"placeholder":_vm.labels.search},model:{value:(_vm.filtering.terms),callback:function ($$v) {_vm.filtering.terms=$$v;},expression:"filtering.terms"}}),_c('q-select',{staticClass:"no-margin text-right",attrs:{"options":_vm.filterFields,"simple":""},model:{value:(_vm.filtering.field),callback:function ($$v) {_vm.filtering.field=$$v;},expression:"filtering.field"}})],1)},staticRenderFns: [],
  name: 'q-table-filter',
  components: {
    QSearch: QSearch,
    QSelect: QSelect
  },
  props: ['filtering', 'columns', 'labels'],
  computed: {
    filterFields: function filterFields () {
      var cols = this.columns.map(function (col) {
        return {
          label: col.label,
          value: col.field
        }
      });

      return [{label: this.labels.allCols, value: ''}].concat(cols)
    }
  }
};

var Filter = {
  data: function data () {
    return {
      filtering: {
        field: '',
        terms: ''
      }
    }
  },
  watch: {
    'filtering.terms': function filtering_terms () {
      this.resetBody();
    }
  },
  computed: {
    filteringCols: function filteringCols () {
      return this.cols.filter(function (col) { return col.filter; })
    }
  },
  methods: {
    filter: function filter (rows) {
      var this$1 = this;

      var
        field = this.filtering.field,
        terms = this.filtering.terms.toLowerCase();

      if (field) {
        return rows.filter(function (row) { return (row[field] + '').toLowerCase().indexOf(terms) > -1; })
      }

      return rows.filter(function (row) {
        return this$1.filteringCols.some(function (col) { return (row[col.field] + '').toLowerCase().indexOf(terms) > -1; })
      })
    }
  },
  components: {
    TableFilter: TableFilter
  }
};

var labels = {
  columns: 'Columns',
  allCols: 'All Columns',
  rows: 'Rows',
  selected: {
    singular: 'item selected.',
    plural: 'items selected.'
  },
  clear: 'Clear',
  search: 'Search',
  all: 'All'
};

var I18n = {
  computed: {
    labels: function labels$1 () {
      if (this.config && this.config.labels) {
        return extend({}, labels, this.config.labels)
      }
      return labels
    },
    message: function message () {
      if (this.rows.length) {
        return false
      }

      if (this.filtering.terms) {
        return (this.config.messages && this.config.messages.noDataAfterFiltering) || '<i class="material-icons">warning</i> No results. Please refine your search terms.'
      }

      return (this.config.messages && this.config.messages.noData) || '<i class="material-icons">warning</i> No data available to show.'
    }
  }
};

var QPagination = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"q-pagination",class:{disabled: _vm.disable}},[_c('q-btn',{attrs:{"disable":_vm.value === _vm.min,"color":"primary","flat":"","small":""},on:{"click":function($event){_vm.set(_vm.min);}}},[_c('q-icon',{attrs:{"name":"first_page"}})],1),_c('q-btn',{attrs:{"disable":_vm.value === _vm.min,"color":"primary","flat":"","small":""},on:{"click":function($event){_vm.setByOffset(-1);}}},[_c('q-icon',{attrs:{"name":"keyboard_arrow_left"}})],1),_c('q-input',{ref:"input",staticClass:"inline q-input-no-native-addons",style:({width: ((_vm.inputPlaceholder.length) + "rem")}),attrs:{"type":"number","min":_vm.min,"max":_vm.max,"placeholder":_vm.inputPlaceholder,"disable":_vm.disable},on:{"keyup":function($event){if(!('button' in $event)&&_vm._k($event.keyCode,"enter",13)){ return null; }_vm.__update($event);},"blur":_vm.__update},model:{value:(_vm.newPage),callback:function ($$v) {_vm.newPage=$$v;},expression:"newPage"}}),_c('q-btn',{attrs:{"disable":_vm.value === _vm.max,"color":"primary","flat":"","small":""},on:{"click":function($event){_vm.setByOffset(1);}}},[_c('q-icon',{attrs:{"name":"keyboard_arrow_right"}})],1),_c('q-btn',{attrs:{"disable":_vm.value === _vm.max,"color":"primary","flat":"","small":""},on:{"click":function($event){_vm.set(_vm.max);}}},[_c('q-icon',{attrs:{"name":"last_page"}})],1)],1)},staticRenderFns: [],
  name: 'q-pagination',
  components: {
    QBtn: QBtn,
    QInput: QInput,
    QIcon: QIcon
  },
  props: {
    value: {
      type: Number,
      required: true
    },
    min: {
      type: Number,
      default: 1
    },
    max: {
      type: Number,
      required: true
    },
    disable: Boolean
  },
  data: function data () {
    return {
      newPage: ''
    }
  },
  methods: {
    set: function set (value) {
      if (!this.disable) {
        this.model = value;
      }
    },
    setByOffset: function setByOffset (offset) {
      if (!this.disable) {
        this.model = this.value + offset;
      }
    },
    __normalize: function __normalize (value) {
      return between(parseInt(value, 10), 1, this.max)
    },
    __update: function __update () {
      var parsed = parseInt(this.newPage, 10);
      if (parsed) {
        console.log('blurring and setting model');
        this.model = parsed;
        this.$refs.input.blur();
      }

      this.newPage = '';
    }
  },
  computed: {
    model: {
      get: function get () {
        return this.value
      },
      set: function set (value) {
        if (!value) {
          return
        }
        if (value < this.min || value > this.max) {
          return
        }
        if (this.value !== value) {
          this.$emit('input', value);
        }
      }
    },
    inputPlaceholder: function inputPlaceholder () {
      return this.value + ' / ' + this.max
    }
  }
};

var TablePagination = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"q-data-table-toolbar bottom-toolbar row reverse-wrap items-center justify-end"},[_c('div',[_vm._v(_vm._s(_vm.labels.rows)),_c('q-select',{staticClass:"text-right inline no-margin",attrs:{"options":_vm.pagination.options,"simple":""},on:{"input":_vm.resetPage},model:{value:(_vm.pagination.rowsPerPage),callback:function ($$v) {_vm.pagination.rowsPerPage=$$v;},expression:"pagination.rowsPerPage"}})],1),(_vm.entries > 0)?_c('div',[_vm._v(_vm._s(_vm.start)+" - "+_vm._s(_vm.end)+" / "+_vm._s(_vm.entries))]):_vm._e(),(_vm.pagination.rowsPerPage > 0)?_c('q-pagination',{attrs:{"max":_vm.max},model:{value:(_vm.pagination.page),callback:function ($$v) {_vm.pagination.page=$$v;},expression:"pagination.page"}}):_vm._e()],1)},staticRenderFns: [],
  name: 'q-table-pagination',
  components: {
    QSelect: QSelect,
    QPagination: QPagination
  },
  props: ['pagination', 'entries', 'labels'],
  watch: {
    entries: function entries () {
      this.resetPage();
    }
  },
  computed: {
    start: function start () {
      return (this.pagination.page - 1) * this.pagination.rowsPerPage + 1
    },
    end: function end () {
      if (this.pagination.page === this.max || this.pagination.rowsPerPage === 0) {
        return this.entries
      }
      return this.pagination.page * this.pagination.rowsPerPage
    },
    max: function max () {
      return Math.max(1, Math.ceil(this.entries / this.pagination.rowsPerPage))
    }
  },
  methods: {
    resetPage: function resetPage () {
      this.pagination.page = 1;
    }
  }
};

var defaultOptions = [
  { label: 'All', value: 0 },
  { label: '5', value: 5 },
  { label: '10', value: 10 },
  { label: '15', value: 15 },
  { label: '20', value: 20 },
  { label: '50', value: 50 },
  { label: '100', value: 100 }
];

function parseOptions (opts) {
  return [{ label: 'All', value: 0 }].concat(
    opts.map(function (opt) {
      return {
        label: '' + opt,
        value: Number(opt)
      }
    })
  )
}

var Pagination = {
  data: function data () {
    return {
      _pagination: {
        page: 1,
        entries: 0,
        rowsPerPage: null
      }
    }
  },
  computed: {
    pagination: function pagination () {
      var self = this,
        cfg = this.config.pagination,
        options = defaultOptions;

      if (cfg) {
        if (cfg.options) {
          options = parseOptions(cfg.options);
        }
      }

      options[0].label = this.labels.all;

      return {
        get page () { return self.$data._pagination.page },
        set page (page) { self.$data._pagination.page = page; },
        get entries () { return self.$data._pagination.entries },
        set entries (entries) { self.$data._pagination.entries = entries; },
        get rowsPerPage () {
          var rowsPerPage = self.$data._pagination.rowsPerPage;
          if (rowsPerPage == null) {
            if (cfg && typeof cfg.rowsPerPage !== 'undefined') {
              rowsPerPage = cfg.rowsPerPage;
            }
            else {
              rowsPerPage = 0;
            }
          }
          return rowsPerPage
        },
        set rowsPerPage (rowsPerPage) { self.$data._pagination.rowsPerPage = rowsPerPage; },
        options: options
      }
    }
  },
  watch: {
    'pagination.page': function pagination_page () {
      this.$refs.body.scrollTop = 0;
    }
  },
  methods: {
    paginate: function paginate (rows) {
      var
        page = this.pagination.page,
        number = this.pagination.rowsPerPage;

      if (number <= 0) {
        return rows
      }
      return rows.slice((page - 1) * number, page * number)
    }
  },
  components: {
    TablePagination: TablePagination
  }
};

var Responsive = {
  data: function data () {
    return {
      responsive: false
    }
  },
  methods: {
    handleResponsive: function handleResponsive () {
      if (typeof this.config.responsive !== 'undefined') {
        if (!this.config.responsive) {
          this.responsive = false;
          return
        }
      }
      this.responsive = viewport().width <= 600;
    }
  },
  watch: {
    'config.responsive': function config_responsive () {
      this.$nextTick(this.handleResponsive);
    }
  },
  mounted: function mounted () {
    var this$1 = this;

    this.$nextTick(function () {
      this$1.handleResponsive();
      window.addEventListener('resize', this$1.handleResponsive);
    });
  },
  beforeDestroy: function beforeDestroy () {
    window.removeEventListener('resize', this.handleResponsive);
  }
};

function getRowSelection (rows, selection, multiple) {
  if (!selection) {
    return []
  }
  return multiple ? rows.map(function () { return false; }) : [-1]
}

var RowSelection = {
  data: function data () {
    return {
      rowSelection: []
    }
  },
  created: function created () {
    this.rowSelection = getRowSelection(this.rows, this.config.selection, this.multipleSelection);
  },
  watch: {
    'config.selection': function config_selection (value) {
      this.rowSelection = getRowSelection(this.rows, value, value === 'multiple');
    },
    rows: function rows (r) {
      this.rowSelection = getRowSelection(r, this.config.selection, this.multipleSelection);
    },
    rowSelection: function rowSelection () {
      var this$1 = this;

      this.$nextTick(function () {
        this$1.$emit('selection', this$1.rowsSelected, this$1.selectedRows);

        if (this$1.rowsSelected) {
          this$1.toolbar = 'selection';
          return
        }
        if (this$1.toolbar === 'selection') {
          this$1.toolbar = '';
        }
      });
    }
  },
  computed: {
    multipleSelection: function multipleSelection () {
      return this.config.selection && this.config.selection === 'multiple'
    },
    rowsSelected: function rowsSelected () {
      if (this.multipleSelection) {
        return this.rowSelection.filter(function (r) { return r; }).length
      }
      return this.rowSelection.length && this.rowSelection[0] !== -1 ? 1 : 0
    },
    selectedRows: function selectedRows () {
      var this$1 = this;

      if (this.multipleSelection) {
        return this.rowSelection
          .map(function (selected, index) { return [selected, this$1.rows[index].__index]; })
          .filter(function (row) { return row[0]; })
          .map(function (row) {
            return { index: row[1], data: this$1.data[row[1]] }
          })
      }

      if (!this.rowSelection.length || this.rowSelection[0] === -1) {
        return []
      }
      var
        index = this.rows[this.rowSelection[0]].__index,
        row = this.data[index];

      return [{index: index, data: row}]
    }
  },
  methods: {
    clearSelection: function clearSelection () {
      if (!this.multipleSelection) {
        this.rowSelection = [-1];
        return
      }
      this.rowSelection = this.rows.map(function () { return false; });
    },
    emitRowClick: function emitRowClick (row) {
      this.$emit('rowclick', row);
    }
  }
};

var Scroll = {
  data: function data () {
    return {
      scroll: {
        horiz: 0,
        vert: 0
      }
    }
  },
  methods: {
    scrollHandler: function scrollHandler (e) {
      var this$1 = this;

      var
        left = e.currentTarget.scrollLeft,
        top = e.currentTarget.scrollTop;

      window.requestAnimationFrame(function () {
        if (this$1.$refs.head) {
          this$1.$refs.head.scrollLeft = left;
        }
        this$1.updateStickyScroll(top);
      });
    },
    mouseWheel: function mouseWheel (e) {
      if (!this.scroll.vert) {
        return
      }

      var body = this.$refs.body;
      body.scrollTop += getMouseWheelDistance(e).pixelY;
      if (body.scrollTop > 0 && body.scrollTop + body.clientHeight < body.scrollHeight) {
        e.preventDefault();
      }
    },
    resize: function resize () {
      var this$1 = this;

      this.$nextTick(function () {
        window.requestAnimationFrame(function () {
          if (this$1.responsive) {
            return
          }
          var
            body = this$1.$refs.body,
            size = getScrollbarWidth();

          this$1.scroll.horiz = size && body.clientWidth < body.scrollWidth ? size + 'px' : 0;
          this$1.scroll.vert = size && body.scrollHeight > body.clientHeight ? size + 'px' : 0;
        });
      });
    },
    updateStickyScroll: function updateStickyScroll (top) {
      if (this.$refs.stickyLeft) {
        this.$refs.stickyLeft.scrollTop = top;
      }
      if (this.$refs.stickyRight) {
        this.$refs.stickyRight.scrollTop = top;
      }
    }
  },
  watch: {
    $data: {
      deep: true,
      handler: function handler () {
        this.resize();
      }
    },
    bodyStyle: {
      deep: true,
      handler: function handler () {
        var this$1 = this;

        this.$nextTick(function () {
          this$1.resize();
        });
      }
    },
    rowStyle: {
      deep: true,
      handler: function handler () {
        var this$1 = this;

        this.$nextTick(function () {
          this$1.resize();
        });
      }
    },
    rightStickyColumns: function rightStickyColumns () {
      var this$1 = this;

      this.$nextTick(function () {
        this$1.updateStickyScroll(this$1.$refs.body.scrollTop);
      });
    },
    leftStickyColumns: function leftStickyColumns () {
      var this$1 = this;

      this.$nextTick(function () {
        this$1.updateStickyScroll(this$1.$refs.body.scrollTop);
      });
    }
  },
  mounted: function mounted () {
    var this$1 = this;

    this.$nextTick(function () {
      this$1.resize();
      window.addEventListener('resize', this$1.resize);
    });
  },
  beforeDestroy: function beforeDestroy () {
    window.removeEventListener('resize', this.resize);
  }
};

var sortMethod = {
  string: function (a, b) { return a.localeCompare(b); },
  number: function (a, b) { return a - b; },
  date: function (a, b) { return (new Date(a)) - (new Date(b)); },
  boolean: function (a, b) {
    if (a && !b) { return -1 }
    if (!a && b) { return 1 }
    return 0
  }
};

function nextDirection (dir) {
  if (dir === 0) { return 1 }
  if (dir === 1) { return -1 }
  return 0
}

function getSortFn (sort, type) {
  if (typeof sort === 'function') {
    return sort
  }
  if (type && sortMethod[type]) {
    return sortMethod[type]
  }
}

var Sort = {
  data: function data () {
    return {
      sorting: {
        field: '',
        dir: 0,
        fn: false
      }
    }
  },
  watch: {
    'sorting.dir': function sorting_dir () {
      this.resetBody();
    }
  },
  methods: {
    setSortField: function setSortField (col) {
      if (this.sorting.field === col.field) {
        this.sorting.dir = nextDirection(this.sorting.dir);
        if (this.sorting.dir === 0) {
          this.sorting.field = '';
        }
        return
      }

      this.sorting.field = col.field;
      this.sorting.dir = 1;
      this.sorting.fn = getSortFn(col.sort, col.type);
    },
    sort: function sort (rows) {
      var sortFn = this.sorting.fn || (function (a, b) { return a - b; });
      var
        field = this.sorting.field,
        dir = this.sorting.dir;

      rows.sort(function (a, b) { return dir * sortFn(a[field], b[field]); });
    }
  }
};

var SortIcon = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('q-icon',{staticClass:"cursor-pointer",attrs:{"name":_vm.icon}})},staticRenderFns: [],
  name: 'q-sort-icon',
  components: {
    QIcon: QIcon
  },
  props: {
    field: String,
    sorting: Object
  },
  computed: {
    icon: function icon () {
      if (this.sorting.field !== this.field) {
        return 'import_export'
      }
      return this.sorting.dir === 1 ? 'arrow_downward' : 'arrow_upward'
    }
  }
};

var QTooltip = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('span',{staticClass:"q-tooltip animate-scale",style:(_vm.transformCSS)},[_vm._t("default")],2)},staticRenderFns: [],
  name: 'q-tooltip',
  props: {
    anchor: {
      type: String,
      default: 'top middle',
      validator: positionValidator
    },
    self: {
      type: String,
      default: 'bottom middle',
      validator: positionValidator
    },
    offset: {
      type: Array,
      validator: offsetValidator
    },
    delay: {
      type: Number,
      default: 0
    },
    maxHeight: String,
    disable: Boolean
  },
  data: function data () {
    return {
      opened: false
    }
  },
  computed: {
    anchorOrigin: function anchorOrigin () {
      return parsePosition(this.anchor)
    },
    selfOrigin: function selfOrigin () {
      return parsePosition(this.self)
    },
    transformCSS: function transformCSS () {
      return getTransformProperties({
        selfOrigin: this.selfOrigin
      })
    }
  },
  methods: {
    toggle: function toggle () {
      if (this.opened) {
        this.close();
      }
      else {
        this.open();
      }
    },
    open: function open () {
      if (this.disable) {
        return
      }
      clearTimeout(this.timer);
      this.opened = true;
      document.body.appendChild(this.$el);
      this.scrollTarget = getScrollTarget(this.anchorEl);
      this.scrollTarget.addEventListener('scroll', this.close);
      window.addEventListener('resize', this.__debouncedUpdatePosition);
      if (Platform.is.mobile) {
        document.body.addEventListener('click', this.close, true);
      }
      this.__updatePosition();
    },
    close: function close () {
      clearTimeout(this.timer);
      if (this.opened) {
        this.opened = false;
        this.scrollTarget.removeEventListener('scroll', this.close);
        window.removeEventListener('resize', this.__debouncedUpdatePosition);
        document.body.removeChild(this.$el);
        if (Platform.is.mobile) {
          document.body.removeEventListener('click', this.close, true);
        }
      }
    },
    __updatePosition: function __updatePosition () {
      setPosition({
        el: this.$el,
        offset: this.offset,
        anchorEl: this.anchorEl,
        anchorOrigin: this.anchorOrigin,
        selfOrigin: this.selfOrigin,
        maxHeight: this.maxHeight
      });
    },
    __delayOpen: function __delayOpen () {
      clearTimeout(this.timer);
      this.timer = setTimeout(this.open, this.delay);
    }
  },
  created: function created () {
    var this$1 = this;

    this.__debouncedUpdatePosition = debounce(function () {
      this$1.__updatePosition();
    }, 70);
  },
  mounted: function mounted () {
    var this$1 = this;

    this.$nextTick(function () {
      /*
        The following is intentional.
        Fixes a bug in Chrome regarding offsetHeight by requiring browser
        to calculate this before removing from DOM and using it for first time.
      */
      this$1.$el.offsetHeight; // eslint-disable-line

      this$1.anchorEl = this$1.$el.parentNode;
      this$1.anchorEl.removeChild(this$1.$el);
      if (this$1.anchorEl.classList.contains('q-btn-inner')) {
        this$1.anchorEl = this$1.anchorEl.parentNode;
      }
      if (Platform.is.mobile) {
        this$1.anchorEl.addEventListener('click', this$1.open);
      }
      else {
        this$1.anchorEl.addEventListener('mouseenter', this$1.__delayOpen);
        this$1.anchorEl.addEventListener('focus', this$1.__delayOpen);
        this$1.anchorEl.addEventListener('mouseleave', this$1.close);
        this$1.anchorEl.addEventListener('blur', this$1.close);
      }
    });
  },
  beforeDestroy: function beforeDestroy () {
    if (Platform.is.mobile) {
      this.anchorEl.removeEventListener('click', this.open);
    }
    else {
      this.anchorEl.removeEventListener('mouseenter', this.__delayOpen);
      this.anchorEl.removeEventListener('focus', this.__delayOpen);
      this.anchorEl.removeEventListener('mouseleave', this.close);
      this.anchorEl.removeEventListener('blur', this.close);
    }
    this.close();
  }
};

var TableSticky = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('table',{staticClass:"q-table horizontal-delimiter"},[_c('colgroup',[(_vm.selection)?_c('col',{staticStyle:{"width":"45px"}}):_vm._e(),_vm._l((_vm.cols),function(col){return _c('col',{style:({width: col.width})})})],2),(!_vm.noHeader)?_c('thead',[_c('tr',[(_vm.selection)?_c('th',[_vm._v(" ")]):_vm._e(),_vm._l((_vm.cols),function(col,index){return _c('th',{class:{invisible: _vm.hidden(index), sortable: col.sort},on:{"click":function($event){_vm.sort(col);}}},[(!_vm.hidden(index))?[(col.sort)?_c('sort-icon',{attrs:{"field":col.field,"sorting":_vm.sorting}}):_vm._e(),_c('span',{domProps:{"innerHTML":_vm._s(col.label)}}),(col.label)?_c('q-tooltip',{domProps:{"innerHTML":_vm._s(col.label)}}):_vm._e()]:_vm._e()],2)})],2)]):_vm._e(),(!_vm.head)?_c('tbody',[_vm._t("default")],2):_vm._e()])},staticRenderFns: [],
  name: 'q-table-sticky',
  components: {
    SortIcon: SortIcon,
    QTooltip: QTooltip
  },
  props: {
    stickyCols: Number,
    cols: Array,
    head: Boolean,
    noHeader: Boolean,
    right: Boolean,
    sorting: Object,
    scroll: Object,
    selection: [String, Boolean]
  },
  data: function data () {
    return {
      selected: false
    }
  },
  methods: {
    hidden: function hidden (index) {
      if (this.right) {
        return this.cols.length - this.stickyCols > index
      }
      return index >= this.stickyCols
    },
    sort: function sort (col) {
      if (col.sort) {
        this.$emit('sort', col);
      }
    }
  }
};

var StickyColumns = {
  computed: {
    leftStickyColumns: function leftStickyColumns () {
      var this$1 = this;

      var
        number = this.config.leftStickyColumns || 0,
        cols = number;

      for (var i = 0; i < cols; i++) {
        if (!this$1.columnSelection.includes(this$1.columns[i].field)) {
          number--;
        }
      }
      return number
    },
    rightStickyColumns: function rightStickyColumns () {
      var this$1 = this;

      var
        number = this.config.rightStickyColumns || 0,
        cols = number,
        length = this.columns.length;

      for (var i = 1; i <= cols; i++) {
        if (!this$1.columnSelection.includes(this$1.columns[length - i].field)) {
          number--;
        }
      }
      return number
    },
    regularCols: function regularCols () {
      return this.cols.slice(this.leftStickyColumns, this.cols.length - this.rightStickyColumns)
    },
    leftCols: function leftCols () {
      var this$1 = this;

      return Array.apply(null, Array(this.leftStickyColumns)).map(function (col, n) { return this$1.cols[n]; })
    },
    rightCols: function rightCols () {
      var this$1 = this;

      return Array.apply(null, Array(this.rightStickyColumns)).map(function (col, n) { return this$1.cols[this$1.cols.length - this$1.rightStickyColumns + n]; })
    }
  },
  components: {
    TableSticky: TableSticky
  }
};

var TableContent = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('table',{staticClass:"q-table horizontal-delimiter",style:(_vm.tableStyle)},[_c('colgroup',[(_vm.selection)?_c('col',{staticStyle:{"width":"45px"}}):_vm._e(),_vm._l((_vm.cols),function(col){return _c('col',{style:({width: col.width})})}),(_vm.head && _vm.scroll.horiz)?_c('col',{style:({width: _vm.scroll.horiz})}):_vm._e()],2),(_vm.head)?_c('thead',[_c('tr',[(_vm.selection)?_c('th',[_vm._v(" ")]):_vm._e(),_vm._l((_vm.cols),function(col){return _c('th',{class:{sortable: col.sort},on:{"click":function($event){_vm.sort(col);}}},[(col.sort)?_c('sort-icon',{attrs:{"field":col.field,"sorting":_vm.sorting}}):_vm._e(),_c('span',{domProps:{"innerHTML":_vm._s(col.label)}}),(col.label)?_c('q-tooltip',{domProps:{"innerHTML":_vm._s(col.label)}}):_vm._e()],1)}),(_vm.head && _vm.scroll.horiz)?_c('th'):_vm._e()],2)]):_c('tbody',[_vm._t("default")],2)])},staticRenderFns: [],
  name: 'q-table-content',
  components: {
    SortIcon: SortIcon,
    QTooltip: QTooltip
  },
  props: {
    cols: Array,
    head: Boolean,
    sorting: Object,
    scroll: Object,
    selection: [String, Boolean]
  },
  computed: {
    tableStyle: function tableStyle () {
      return {
        width: this.head && this.vert ? ("calc(100% - " + (this.scroll.vert) + ")") : '100%'
      }
    }
  },
  methods: {
    sort: function sort (col) {
      if (col.sort) {
        this.$emit('sort', col);
      }
    }
  }
};

var QDataTable = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"q-data-table"},[(_vm.hasToolbar && _vm.toolbar === '')?[_c('div',{staticClass:"q-data-table-toolbar upper-toolbar row reverse-wrap items-center justify-end"},[(_vm.config.title)?_c('div',{staticClass:"q-data-table-title ellipsis col",domProps:{"innerHTML":_vm._s(_vm.config.title)}}):_vm._e(),_c('div',{staticClass:"row items-center"},[(_vm.config.refresh && !_vm.refreshing)?_c('q-btn',{attrs:{"flat":"","color":"primary"},on:{"click":_vm.refresh}},[_c('q-icon',{attrs:{"name":"refresh"}})],1):_vm._e(),(_vm.refreshing)?_c('q-btn',{staticClass:"disabled"},[_c('q-icon',{staticClass:"animate-spin-reverse",attrs:{"name":"cached"}})],1):_vm._e(),(_vm.config.columnPicker)?_c('q-select',{staticStyle:{"margin":"0 0 0 10px"},attrs:{"multiple":"multiple","toggle":"","options":_vm.columnSelectionOptions,"static-label":_vm.labels.columns,"simple":""},model:{value:(_vm.columnSelection),callback:function ($$v) {_vm.columnSelection=$$v;},expression:"columnSelection"}}):_vm._e()],1)])]:_vm._e(),_c('div',{directives:[{name:"show",rawName:"v-show",value:(_vm.toolbar === 'selection'),expression:"toolbar === 'selection'"}],staticClass:"q-data-table-toolbar upper-toolbar row reverse-wrap items-center justify-end q-data-table-selection"},[_c('div',{staticClass:"col"},[_vm._v(_vm._s(_vm.rowsSelected)+" "),(_vm.rowsSelected === 1)?_c('span',[_vm._v(_vm._s(_vm.labels.selected.singular))]):_c('span',[_vm._v(_vm._s(_vm.labels.selected.plural))]),_c('q-btn',{attrs:{"flat":"","small":"","color":"primary"},on:{"click":_vm.clearSelection}},[_vm._v(_vm._s(_vm.labels.clear))])],1),_c('div',[_vm._t("selection",null,{rows:_vm.selectedRows})],2)]),(_vm.filteringCols.length)?_c('table-filter',{attrs:{"filtering":_vm.filtering,"columns":_vm.filteringCols,"labels":_vm.labels}}):_vm._e(),(_vm.responsive)?[(_vm.message)?_c('div',{staticClass:"q-data-table-message row items-center justify-center",domProps:{"innerHTML":_vm._s(_vm.message)}}):_c('div',{staticStyle:{"overflow":"auto"},style:(_vm.bodyStyle)},[_c('table',{ref:"body",staticClass:"q-table horizontal-delimiter responsive"},[_c('tbody',_vm._l((_vm.rows),function(row,index){return _c('tr',{on:{"click":function($event){_vm.emitRowClick(row);}}},[(_vm.config.selection)?_c('td',[(_vm.config.selection === 'multiple')?_c('q-checkbox',{model:{value:(_vm.rowSelection[index]),callback:function ($$v) {var $$exp = _vm.rowSelection, $$idx = index;if (!Array.isArray($$exp)){_vm.rowSelection[index]=$$v;}else{$$exp.splice($$idx, 1, $$v);}},expression:"rowSelection[index]"}}):_c('q-radio',{attrs:{"val":index},model:{value:(_vm.rowSelection[0]),callback:function ($$v) {var $$exp = _vm.rowSelection, $$idx = 0;if (!Array.isArray($$exp)){_vm.rowSelection[0]=$$v;}else{$$exp.splice($$idx, 1, $$v);}},expression:"rowSelection[0]"}})],1):_vm._e(),_vm._l((_vm.cols),function(col){return _c('td',{class:_vm.formatClass(col, row[col.field]),style:(_vm.formatStyle(col, row[col.field])),attrs:{"data-th":col.label}},[_vm._t('col-'+col.field,[_c('span',{domProps:{"innerHTML":_vm._s(_vm.format(row, col))}})],{row:row,col:col,data:row[col.field]})],2)})],2)}))])])]:_c('div',{staticClass:"q-data-table-container",on:{"mousewheel":_vm.mouseWheel,"dommousescroll":_vm.mouseWheel}},[(_vm.hasHeader)?_c('div',{ref:"head",staticClass:"q-data-table-head",style:({marginRight: _vm.scroll.vert})},[_c('table-content',{attrs:{"head":"","cols":_vm.cols,"sorting":_vm.sorting,"scroll":_vm.scroll,"selection":_vm.config.selection},on:{"sort":_vm.setSortField}})],1):_vm._e(),_c('div',{ref:"body",staticClass:"q-data-table-body",style:(_vm.bodyStyle),on:{"scroll":_vm.scrollHandler}},[(_vm.message)?_c('div',{staticClass:"q-data-table-message row items-center justify-center",domProps:{"innerHTML":_vm._s(_vm.message)}}):_c('table-content',{attrs:{"cols":_vm.cols,"selection":_vm.config.selection}},_vm._l((_vm.rows),function(row){return _c('tr',{style:(_vm.rowStyle),on:{"click":function($event){_vm.emitRowClick(row);}}},[(_vm.config.selection)?_c('td'):_vm._e(),(_vm.leftStickyColumns)?_c('td',{attrs:{"colspan":_vm.leftStickyColumns}}):_vm._e(),_vm._l((_vm.regularCols),function(col){return _c('td',{class:_vm.formatClass(col, row[col.field]),style:(_vm.formatStyle(col, row[col.field]))},[_vm._t('col-'+col.field,[_c('span',{domProps:{"innerHTML":_vm._s(_vm.format(row, col))}})],{row:row,col:col,data:row[col.field]})],2)}),(_vm.rightStickyColumns)?_c('td',{attrs:{"colspan":_vm.rightStickyColumns}}):_vm._e()],2)}))],1),(!_vm.message && (_vm.leftStickyColumns || _vm.config.selection))?[_c('div',{ref:"stickyLeft",staticClass:"q-data-table-sticky-left",style:({bottom: _vm.scroll.horiz})},[_c('table-sticky',{attrs:{"no-header":!_vm.hasHeader,"sticky-cols":_vm.leftStickyColumns,"cols":_vm.cols,"sorting":_vm.sorting,"selection":_vm.config.selection}},_vm._l((_vm.rows),function(row,index){return _c('tr',{style:(_vm.rowStyle),on:{"click":function($event){_vm.emitRowClick(row);}}},[(_vm.config.selection)?_c('td',[(_vm.config.selection === 'multiple')?_c('q-checkbox',{model:{value:(_vm.rowSelection[index]),callback:function ($$v) {var $$exp = _vm.rowSelection, $$idx = index;if (!Array.isArray($$exp)){_vm.rowSelection[index]=$$v;}else{$$exp.splice($$idx, 1, $$v);}},expression:"rowSelection[index]"}}):_c('q-radio',{attrs:{"val":index},model:{value:(_vm.rowSelection[0]),callback:function ($$v) {var $$exp = _vm.rowSelection, $$idx = 0;if (!Array.isArray($$exp)){_vm.rowSelection[0]=$$v;}else{$$exp.splice($$idx, 1, $$v);}},expression:"rowSelection[0]"}})],1):_vm._e(),_vm._l((_vm.leftCols),function(col){return _c('td',{class:_vm.formatClass(col, row[col.field]),style:(_vm.formatStyle(col, row[col.field]))},[_vm._t('col-'+col.field,[_c('span',{domProps:{"innerHTML":_vm._s(_vm.format(row, col))}})],{row:row,col:col,data:row[col.field]})],2)})],2)}))],1),(_vm.hasHeader)?_c('div',{staticClass:"q-data-table-sticky-left",style:({bottom: _vm.scroll.horiz})},[_c('table-sticky',{attrs:{"head":"","sticky-cols":_vm.leftStickyColumns,"scroll":_vm.scroll,"cols":_vm.cols,"sorting":_vm.sorting,"selection":_vm.config.selection},on:{"sort":_vm.setSortField}})],1):_vm._e()]:_vm._e(),(!_vm.message && _vm.rightStickyColumns)?[_c('div',{ref:"stickyRight",staticClass:"q-data-table-sticky-right",style:({right: _vm.scroll.vert, bottom: _vm.scroll.horiz})},[_c('table-sticky',{attrs:{"no-header":!_vm.hasHeader,"right":"","sticky-cols":_vm.rightStickyColumns,"cols":_vm.cols,"sorting":_vm.sorting,"selection":_vm.config.selection}},_vm._l((_vm.rows),function(row){return _c('tr',{style:(_vm.rowStyle),on:{"click":function($event){_vm.emitRowClick(row);}}},[(_vm.config.selection)?_c('td',{staticClass:"invisible"}):_vm._e(),_c('td',{staticClass:"invisible",attrs:{"colspan":_vm.cols.length - _vm.rightStickyColumns}}),_vm._l((_vm.rightCols),function(col){return _c('td',{class:_vm.formatClass(col, row[col.field]),style:(_vm.formatStyle(col, row[col.field]))},[_vm._t('col-'+col.field,[_c('span',{domProps:{"innerHTML":_vm._s(_vm.format(row, col))}})],{row:row,col:col,data:row[col.field]})],2)})],2)}))],1),(_vm.hasHeader)?_c('div',{staticClass:"q-data-table-sticky-right",style:({right: _vm.scroll.vert})},[_c('table-sticky',{attrs:{"right":"","head":"","sticky-cols":_vm.rightStickyColumns,"scroll":_vm.scroll,"cols":_vm.cols,"sorting":_vm.sorting,"selection":_vm.config.selection},on:{"sort":_vm.setSortField}})],1):_vm._e()]:_vm._e()],2),(_vm.config.pagination)?_c('table-pagination',{attrs:{"pagination":_vm.pagination,"entries":_vm.pagination.entries,"labels":_vm.labels}}):_vm._e()],2)},staticRenderFns: [],
  name: 'q-data-table',
  components: {
    QSelect: QSelect,
    QBtn: QBtn,
    QIcon: QIcon,
    QCheckbox: QCheckbox,
    QRadio: QRadio,
    TableContent: TableContent
  },
  mixins: [ColumnSelection, Filter, I18n, Pagination, Responsive, RowSelection, Scroll, Sort, StickyColumns],
  props: {
    data: {
      type: Array,
      default: []
    },
    columns: {
      type: Array,
      required: true
    },
    config: {
      type: Object,
      default: function default$1 () { return {} }
    }
  },
  data: function data () {
    return {
      selected: false,
      toolbar: '',
      refreshing: false
    }
  },
  computed: {
    rows: function rows () {
      var length = this.data.length;

      if (!length) {
        return []
      }

      var rows = clone(this.data);

      rows.forEach(function (row, i) {
        row.__index = i;
      });

      if (this.filtering.terms) {
        rows = this.filter(rows);
      }

      if (this.sorting.field) {
        this.sort(rows);
      }

      this.pagination.entries = rows.length;
      if (this.pagination.rowsPerPage > 0) {
        rows = this.paginate(rows);
      }

      return rows
    },
    rowStyle: function rowStyle () {
      if (this.config.rowHeight) {
        return {height: this.config.rowHeight}
      }
    },
    bodyStyle: function bodyStyle () {
      return this.config.bodyStyle || {}
    },
    hasToolbar: function hasToolbar () {
      return this.config.title || this.filteringCols.length || this.config.columnPicker || this.config.refresh
    },
    hasHeader: function hasHeader () {
      return !this.config.noHeader
    }
  },
  methods: {
    resetBody: function resetBody () {
      var body = this.$refs.body;

      if (body) {
        body.scrollTop = 0;
      }
      this.pagination.page = 1;
    },
    format: function format (row, col) {
      return col.format ? col.format(row[col.field], row) : row[col.field]
    },
    refresh: function refresh (state) {
      var this$1 = this;

      if (state === false) {
        this.refreshing = false;
      }
      else if (state === true || !this.refreshing) {
        this.refreshing = true;
        this.$emit('refresh', function () {
          this$1.refreshing = false;
        });
      }
    },
    formatStyle: function formatStyle (col, value) {
      return typeof col.style === 'function' ? col.style(value) : col.style
    },
    formatClass: function formatClass (col, value) {
      return typeof col.classes === 'function' ? col.classes(value) : col.classes
    }
  }
};

/* eslint no-fallthrough: 0 */

var MILLISECONDS_IN_DAY = 86400000;
var MILLISECONDS_IN_HOUR = 360000;
var MILLISECONDS_IN_MINUTE = 60000;
var token = /d{1,4}|M{1,4}|m{1,2}|w{1,2}|D{1,4}|YY(?:YY)?|H{1,2}|h{1,2}|s{1,2}|S{1,3}|Z{1,2}|[QExX]'/g;

var dayNames = [
  'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'
];

var monthNames = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

function formatTimezone (offset, delimeter) {
  delimeter = delimeter || '';
  var sign = offset > 0 ? '-' : '+';
  var absOffset = Math.abs(offset);
  var hours = Math.floor(absOffset / 60);
  var minutes = absOffset % 60;
  return sign + pad(hours) + delimeter + pad(minutes)
}

function getChange (date, mod, add) {
  var
    t = new Date(date),
    sign = (add ? 1 : -1);

  Object.keys(mod).forEach(function (key) {
    var op = capitalize(key === 'days' ? 'date' : key);
    t[("set" + op)](t[("get" + op)]() + sign * mod[key]);
  });
  return t
}

function isValid (date) {
  var t = Date.parse(date);
  return isNaN(t) === false
}

function buildDate (mod, utc) {
  return adjustDate(new Date(), mod, utc)
}

function getDayOfWeek (date) {
  var dow = new Date(date).getDay();
  return dow === 0 ? 7 : dow
}

function getWeekOfYear (date) {
  // Remove time components of date
  var thursday = new Date(date.getFullYear(), date.getMonth(), date.getDate());

  // Change date to Thursday same week
  thursday.setDate(thursday.getDate() - ((thursday.getDay() + 6) % 7) + 3);

  // Take January 4th as it is always in week 1 (see ISO 8601)
  var firstThursday = new Date(thursday.getFullYear(), 0, 4);

  // Change date to Thursday same week
  firstThursday.setDate(firstThursday.getDate() - ((firstThursday.getDay() + 6) % 7) + 3);

  // Check if daylight-saving-time-switch occurred and correct for it
  var ds = thursday.getTimezoneOffset() - firstThursday.getTimezoneOffset();
  thursday.setHours(thursday.getHours() - ds);

  // Number of weeks between target Thursday and first Thursday
  var weekDiff = (thursday - firstThursday) / (MILLISECONDS_IN_DAY * 7);
  return 1 + Math.floor(weekDiff)
}

function isBetweenDates (date, from, to) {
  var
    d1 = new Date(from).getTime(),
    d2 = new Date(to).getTime(),
    cur = new Date(date).getTime();

  return cur > d1 && cur < d2
}

function addToDate (date, mod) {
  return getChange(date, mod, true)
}
function subtractFromDate (date, mod) {
  return getChange(date, mod, false)
}

function adjustDate (date, mod, utc) {
  var
    t = new Date(date),
    prefix = "set" + (utc ? 'UTC' : '');

  Object.keys(mod).forEach(function (key) {
    var op = key.charAt(0).toUpperCase() + key.slice(1);
    t[("" + prefix + op)](mod[key]);
  });
  return t
}

function startOfDate (date, unit) {
  var t = new Date(date);
  switch (unit) {
    case 'year':
      t.setMonth(0);
    case 'month':
      t.setDate(1);
    case 'day':
      t.setHours(0);
    case 'hour':
      t.setMinutes(0);
    case 'minute':
      t.setSeconds(0);
    case 'second':
      t.setMilliseconds(0);
  }
  return t
}

function endOfDate (date, unit) {
  var t = new Date(date);
  switch (unit) {
    case 'year':
      t.setMonth(11);
    case 'month':
      t.setDate(daysInMonth(date));
    case 'day':
      t.setHours(23);
    case 'hour':
      t.setMinutes(59);
    case 'minute':
      t.setSeconds(59);
    case 'second':
      t.setMilliseconds(59);
  }
  return t
}

function getMaxDate (date) {
  var args = [], len = arguments.length - 1;
  while ( len-- > 0 ) args[ len ] = arguments[ len + 1 ];

  var t = new Date(date);
  args.forEach(function (d) {
    t = Math.max(t, new Date(d));
  });
  return t
}
function getMinDate (date) {
  var args = [], len = arguments.length - 1;
  while ( len-- > 0 ) args[ len ] = arguments[ len + 1 ];

  var t = new Date(date);
  args.forEach(function (d) {
    t = Math.min(t, new Date(d));
  });
  return t
}

function getDiff (t, sub, interval) {
  return (
    (t.getTime() - t.getTimezoneOffset() * MILLISECONDS_IN_MINUTE) -
    (sub.getTime() - sub.getTimezoneOffset() * MILLISECONDS_IN_MINUTE)
  ) / interval
}

function getDateDiff (date, subtract, unit) {
  if ( unit === void 0 ) unit = 'days';

  var
    t = new Date(date),
    sub = new Date(subtract);

  switch (unit) {
    case 'years':
      return (t.getFullYear() - sub.getFullYear())

    case 'months':
      return (t.getFullYear() - sub.getFullYear()) * 12 + t.getMonth() - sub.getMonth()

    case 'days':
      return getDiff(startOfDate(t, 'day'), startOfDate(sub, 'day'), MILLISECONDS_IN_DAY)

    case 'hours':
      return getDiff(startOfDate(t, 'hour'), startOfDate(sub, 'hour'), MILLISECONDS_IN_HOUR)

    case 'minutes':
      return getDiff(startOfDate(t, 'minute'), startOfDate(sub, 'minute'), MILLISECONDS_IN_MINUTE)

    case 'seconds':
      return getDiff(startOfDate(t, 'second'), startOfDate(sub, 'second'), 1000)
  }
}

function getDayOfYear (date) {
  return getDateDiff(date, startOfDate(date, 'year'), 'days') + 1
}

function convertDateToFormat (date, example) {
  if (!date) {
    return
  }

  if (isDate(example)) {
    return date
  }
  if (typeof example === 'number') {
    return date.getTime()
  }

  return formatDate(date)
}

function getDateBetween (date, min, max) {
  var t = new Date(date);

  if (min) {
    var low = new Date(min);
    if (t < low) {
      return low
    }
  }

  if (max) {
    var high = new Date(max);
    if (t > high) {
      return high
    }
  }

  return t
}

function isSameDate (date, date2, unit) {
  var
    t = new Date(date),
    d = new Date(date2);

  if (unit === void 0) {
    return t.getTime() === d.getTime()
  }

  switch (unit) {
    case 'second':
      if (t.getUTCSeconds() !== d.getUTCSeconds()) {
        return false
      }
    case 'minute': // intentional fall-through
      if (t.getUTCMinutes() !== d.getUTCMinutes()) {
        return false
      }
    case 'hour': // intentional fall-through
      if (t.getUTCHours() !== d.getUTCHours()) {
        return false
      }
    case 'day': // intentional fall-through
      if (t.getUTCDate() !== d.getUTCDate()) {
        return false
      }
    case 'month': // intentional fall-through
      if (t.getUTCMonth() !== d.getUTCMonth()) {
        return false
      }
    case 'year': // intentional fall-through
      if (t.getUTCFullYear() !== d.getUTCFullYear()) {
        return false
      }
      break
    default:
      throw new Error(("date isSameDate unknown unit " + unit))
  }

  return true
}

function daysInMonth (date) {
  return (new Date(date.getFullYear(), date.getMonth() + 1, 0)).getDate()
}

var formatter = {
  // Month: 1, 2, ..., 12
  M: function M (date) {
    return date.getMonth() + 1
  },

  // Month: 01, 02, ..., 12
  MM: function MM (date) {
    return pad(date.getMonth() + 1)
  },

  // Day of week: Sun, Mon, ...
  MMM: function MMM (date) {
    return this.MMMM(date).slice(0, 3)
  },

  // Day of week: Sunday, Monday, ...
  MMMM: function MMMM (date) {
    return monthNames[date.getMonth()]
  },

  // Minute: 0, 1, ..., 59
  m: function m (date) {
    return date.getMinutes()
  },

  // Minute: 00, 01, ..., 59
  mm: function mm (date) {
    return pad(date.getMinutes())
  },

  // Quarter: 1, 2, 3, 4
  Q: function Q (date) {
    return Math.ceil((date.getMonth() + 1) / 3)
  },

  // Day of month: 1, 2, ..., 31
  D: function D (date) {
    return date.getDate()
  },

  // Day of month: 01, 02, ..., 31
  DD: function DD (date) {
    return pad(date.getDate())
  },

  // Day of year: 1, 2, ..., 366
  DDD: function DDD (date) {
    return getDayOfYear(date)
  },

  // Day of year: 001, 002, ..., 366
  DDDD: function DDDD (date) {
    return pad(getDayOfYear(date), 3)
  },

  // Day of week: 0, 1, ..., 6
  d: function d (date) {
    return date.getDay()
  },

  // Day of week: Su, Mo, ...
  dd: function dd (date) {
    return this.dddd(date).slice(0, 2)
  },

  // Day of week: Sun, Mon, ...
  ddd: function ddd (date) {
    return this.dddd(date).slice(0, 3)
  },

  // Day of week: Sunday, Monday, ...
  dddd: function dddd (date) {
    return dayNames[date.getDay()]
  },

  // Day of ISO week: 1, 2, ..., 7
  E: function E (date) {
    return date.getDay() || 7
  },

  // Week of Year: 1 2 ... 52 53
  w: function w (date) {
    return getWeekOfYear(date)
  },

  // Week of Year: 01 02 ... 52 53
  ww: function ww (date) {
    return pad(getWeekOfYear(date))
  },

  // Year: 00, 01, ..., 99
  YY: function YY (date) {
    return pad(date.getFullYear(), 4).substr(2)
  },

  // Year: 1900, 1901, ..., 2099
  YYYY: function YYYY (date) {
    return pad(date.getFullYear(), 4)
  },

  // Hour: 0, 1, ... 23
  H: function H (date) {
    return date.getHours()
  },

  // Hour: 00, 01, ..., 23
  HH: function HH (date) {
    return pad(date.getHours())
  },

  // Hour: 1, 2, ..., 12
  h: function h (date) {
    var hours = date.getHours();
    if (hours === 0) {
      return 12
    }
    if (hours > 12) {
      return hours % 12
    }
    return hours
  },

  // Hour: 01, 02, ..., 12
  hh: function hh (date) {
    return pad(this.h(date))
  },

  // Second: 0, 1, ..., 59
  s: function s (date) {
    return date.getSeconds()
  },

  // Second: 00, 01, ..., 59
  ss: function ss (date) {
    return pad(date.getSeconds())
  },

  // 1/10 of second: 0, 1, ..., 9
  S: function S (date) {
    return Math.floor(date.getMilliseconds() / 100)
  },

  // 1/100 of second: 00, 01, ..., 99
  SS: function SS (date) {
    return pad(Math.floor(date.getMilliseconds() / 10))
  },

  // Millisecond: 000, 001, ..., 999
  SSS: function SSS (date) {
    return pad(date.getMilliseconds(), 3)
  },

  // Timezone: -01:00, +00:00, ... +12:00
  Z: function Z (date) {
    return formatTimezone(date.getTimezoneOffset(), ':')
  },

  // Timezone: -0100, +0000, ... +1200
  ZZ: function ZZ (date) {
    return formatTimezone(date.getTimezoneOffset())
  },

  // Seconds timestamp: 512969520
  X: function X (date) {
    return Math.floor(date.getTime() / 1000)
  },

  // Milliseconds timestamp: 512969520900
  x: function x (date) {
    return date.getTime()
  }
};

function formatDate (val, mask) {
  if ( mask === void 0 ) mask = 'YYYY-MM-DDTHH:mm:ss.SSSZ';

  if (!val) {
    return
  }

  var date = new Date(val);

  return mask.replace(token, function (match) {
    if (match in formatter) {
      return formatter[match](date)
    }
    return match
  })
}


var date = Object.freeze({
	dayNames: dayNames,
	monthNames: monthNames,
	isValid: isValid,
	buildDate: buildDate,
	getDayOfWeek: getDayOfWeek,
	getWeekOfYear: getWeekOfYear,
	isBetweenDates: isBetweenDates,
	addToDate: addToDate,
	subtractFromDate: subtractFromDate,
	adjustDate: adjustDate,
	startOfDate: startOfDate,
	endOfDate: endOfDate,
	getMaxDate: getMaxDate,
	getMinDate: getMinDate,
	getDateDiff: getDateDiff,
	getDayOfYear: getDayOfYear,
	convertDateToFormat: convertDateToFormat,
	getDateBetween: getDateBetween,
	isSameDate: isSameDate,
	daysInMonth: daysInMonth,
	formatter: formatter,
	formatDate: formatDate
});

var modelValidator = function (v) {
  var type = typeof v;
  return (
    v === null || v === undefined ||
    type === 'number' || type === 'string' ||
    isDate(v)
  )
};

var inline = {
  value: {
    validator: modelValidator,
    required: true
  },
  type: {
    type: String,
    default: 'date',
    validator: function validator (value) {
      return ['date', 'time', 'datetime'].includes(value)
    }
  },
  min: {
    validator: modelValidator,
    default: null
  },
  max: {
    validator: modelValidator,
    default: null
  },
  monthNames: {
    type: Array,
    default: function () { return monthNames; }
  },
  dayNames: {
    type: Array,
    default: function () { return dayNames; }
  },
  mondayFirst: Boolean,
  format24h: Boolean,
  readonly: Boolean
};

var input = {
  format: String,
  noClear: Boolean,
  placeholder: String,
  clearLabel: {
    type: String,
    default: 'Clear'
  },
  okLabel: {
    type: String,
    default: 'Set'
  },
  cancelLabel: {
    type: String,
    default: 'Cancel'
  },
  readonly: Boolean
};

var mixin$2 = {
  props: inline,
  computed: {
    model: {
      get: function get () {
        var date = this.value
          ? new Date(this.value)
          : (this.defaultSelection ? new Date(this.defaultSelection) : startOfDate(new Date(), 'day'));

        return getDateBetween(
          date,
          this.pmin,
          this.pmax
        )
      },
      set: function set (val) {
        var date = getDateBetween(val, this.pmin, this.pmax);
        if ((new Date(this.value)).getTime() !== date.getTime()) {
          this.$emit('input', convertDateToFormat(date, this.value));
        }
      }
    },
    pmin: function pmin () {
      return this.min ? new Date(this.min) : null
    },
    pmax: function pmax () {
      return this.max ? new Date(this.max) : null
    },
    typeHasDate: function typeHasDate () {
      return this.type === 'date' || this.type === 'datetime'
    },
    typeHasTime: function typeHasTime () {
      return this.type === 'time' || this.type === 'datetime'
    },

    year: function year () {
      return this.model.getFullYear()
    },
    month: function month () {
      return this.model.getMonth() + 1
    },
    day: function day () {
      return this.model.getDate()
    },
    minute: function minute () {
      return this.model.getMinutes()
    },

    yearInterval: function yearInterval () {
      var
        min = this.pmin !== null ? this.pmin.getFullYear() : 1950,
        max = this.pmax !== null ? this.pmax.getFullYear() : 2050;
      return Math.max(1, max - min + 1)
    },
    yearMin: function yearMin () {
      return this.pmin !== null ? this.pmin.getFullYear() - 1 : 1949
    },
    monthInterval: function monthInterval () {
      var
        min = this.pmin !== null && this.pmin.getFullYear() === this.model.getFullYear() ? this.pmin.getMonth() : 0,
        max = this.pmax !== null && this.pmax.getFullYear() === this.model.getFullYear() ? this.pmax.getMonth() : 11;
      return Math.max(1, max - min + 1)
    },
    monthMin: function monthMin () {
      return this.pmin !== null && this.pmin.getFullYear() === this.model.getFullYear()
        ? this.pmin.getMonth()
        : 0
    },

    daysInMonth: function daysInMonth$$1 () {
      return (new Date(this.model.getFullYear(), this.model.getMonth() + 1, 0)).getDate()
    },

    editable: function editable () {
      return !this.disable && !this.readonly
    }
  },

  methods: {
    toggleAmPm: function toggleAmPm () {
      if (!this.editable) {
        return
      }
      var
        hour = this.model.getHours(),
        offset = this.am ? 12 : -12;

      this.model = new Date(this.model.setHours(hour + offset));
    },

    __parseTypeValue: function __parseTypeValue (type, value) {
      if (type === 'month') {
        return between(value, 1, 12)
      }
      if (type === 'date') {
        return between(value, 1, this.daysInMonth)
      }
      if (type === 'year') {
        var
          min = this.pmin ? this.pmin.getFullYear() : 1950,
          max = this.pmax ? this.pmax.getFullYear() : 2050;
        return between(value, min, max)
      }
      if (type === 'hour') {
        return between(value, 0, 23)
      }
      if (type === 'minute') {
        return between(value, 0, 59)
      }
    }
  }
};

var InlineDatetimeIOS = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"q-datetime",class:['type-' + _vm.type, _vm.disable ? 'disabled' : '', _vm.readonly ? 'readonly' : '']},[_vm._t("default"),_c('div',{staticClass:"q-datetime-content non-selectable"},[_c('div',{staticClass:"q-datetime-inner full-height flex justify-center"},[(_vm.typeHasDate)?[_c('div',{staticClass:"q-datetime-col q-datetime-col-month",on:{"touchstart":function($event){_vm.__dragStart($event, 'month');},"touchmove":function($event){_vm.__dragMove($event, 'month');},"touchend":function($event){_vm.__dragStop($event, 'month');}}},[_c('div',{ref:"month",staticClass:"q-datetime-col-wrapper",style:(_vm.__monthStyle)},_vm._l((_vm.monthInterval),function(index){return _c('div',{staticClass:"q-datetime-item",on:{"click":function($event){_vm.setMonth(index + _vm.monthMin);}}},[_vm._v(_vm._s(_vm.monthNames[index + _vm.monthMin - 1]))])}))]),_c('div',{staticClass:"q-datetime-col q-datetime-col-day",on:{"touchstart":function($event){_vm.__dragStart($event, 'date');},"touchmove":function($event){_vm.__dragMove($event, 'date');},"touchend":function($event){_vm.__dragStop($event, 'date');}}},[_c('div',{ref:"date",staticClass:"q-datetime-col-wrapper",style:(_vm.__dayStyle)},_vm._l((_vm.daysInterval),function(index){return _c('div',{staticClass:"q-datetime-item",on:{"click":function($event){_vm.setDay(index + _vm.dayMin - 1);}}},[_vm._v(_vm._s(index + _vm.dayMin - 1))])}))]),_c('div',{staticClass:"q-datetime-col q-datetime-col-year",on:{"touchstart":function($event){_vm.__dragStart($event, 'year');},"touchmove":function($event){_vm.__dragMove($event, 'year');},"touchend":function($event){_vm.__dragStop($event, 'year');}}},[_c('div',{ref:"year",staticClass:"q-datetime-col-wrapper",style:(_vm.__yearStyle)},_vm._l((_vm.yearInterval),function(n){return _c('div',{staticClass:"q-datetime-item",on:{"click":function($event){_vm.setYear(n + _vm.yearMin);}}},[_vm._v(_vm._s(n + _vm.yearMin))])}))])]:_vm._e(),(_vm.typeHasTime)?[_c('div',{staticClass:"q-datetime-col q-datetime-col-hour",on:{"touchstart":function($event){_vm.__dragStart($event, 'hour');},"touchmove":function($event){_vm.__dragMove($event, 'hour');},"touchend":function($event){_vm.__dragStop($event, 'hour');}}},[_c('div',{ref:"hour",staticClass:"q-datetime-col-wrapper",style:(_vm.__hourStyle)},_vm._l((_vm.hourInterval),function(n){return _c('div',{staticClass:"q-datetime-item",on:{"click":function($event){_vm.setHour(n + _vm.hourMin - 1);}}},[_vm._v(_vm._s(n + _vm.hourMin - 1))])}))]),_c('div',{staticClass:"q-datetime-col q-datetime-col-minute",on:{"touchstart":function($event){_vm.__dragStart($event, 'minute');},"touchmove":function($event){_vm.__dragMove($event, 'minute');},"touchend":function($event){_vm.__dragStop($event, 'minute');}}},[_c('div',{ref:"minute",staticClass:"q-datetime-col-wrapper",style:(_vm.__minuteStyle)},_vm._l((_vm.minuteInterval),function(n){return _c('div',{staticClass:"q-datetime-item",on:{"click":function($event){_vm.setMinute(n + _vm.minuteMin - 1);}}},[_vm._v(_vm._s(_vm.__pad(n + _vm.minuteMin - 1)))])}))])]:_vm._e()],2),_c('div',{staticClass:"q-datetime-highlight"}),_c('div',{staticClass:"q-datetime-mask"})])],2)},staticRenderFns: [],
  name: 'q-inline-datetime',
  mixins: [mixin$2],
  props: {
    defaultSelection: [String, Number, Date]
  },
  data: function data () {
    return {
      monthDragOffset: 0,
      dateDragOffset: 0,
      yearDragOffset: 0,
      hourDragOffset: 0,
      minuteDragOffset: 0,
      dragging: false
    }
  },
  watch: {
    model: function model () {
      this.$nextTick(this.__updateAllPositions);
    }
  },
  computed: {
    dayMin: function dayMin () {
      return this.pmin !== null && isSameDate(this.pmin, this.model, 'month')
        ? this.pmin.getDate()
        : 1
    },
    dayMax: function dayMax () {
      return this.pmax !== null && isSameDate(this.pmax, this.model, 'month')
        ? this.pmax.getDate()
        : this.daysInMonth
    },
    daysInterval: function daysInterval () {
      return this.dayMax - this.dayMin + 1
    },

    hour: function hour () {
      return this.model.getHours()
    },
    hourMin: function hourMin () {
      return this.pmin && isSameDate(this.pmin, this.model, 'day') ? this.pmin.getHours() : 0
    },
    hourInterval: function hourInterval () {
      return (this.pmax && isSameDate(this.pmax, this.model, 'day') ? this.pmax.getHours() : 23) - this.hourMin + 1
    },

    minuteMin: function minuteMin () {
      return this.pmin && isSameDate(this.pmin, this.model, 'hour') ? this.pmin.getMinutes() : 0
    },
    minuteInterval: function minuteInterval () {
      return (this.pmax && isSameDate(this.pmax, this.model, 'hour') ? this.pmax.getMinutes() : 59) - this.minuteMin + 1
    },

    __monthStyle: function __monthStyle () {
      return this.__colStyle(82 - (this.month - 1 + this.monthDragOffset) * 36)
    },
    __dayStyle: function __dayStyle () {
      return this.__colStyle(82 - (this.day + this.dateDragOffset) * 36)
    },
    __yearStyle: function __yearStyle () {
      return this.__colStyle(82 - (this.year + this.yearDragOffset) * 36)
    },
    __hourStyle: function __hourStyle () {
      return this.__colStyle(82 - (this.hour + this.hourDragOffset) * 36)
    },
    __minuteStyle: function __minuteStyle () {
      return this.__colStyle(82 - (this.minute + this.minuteDragOffset) * 36)
    }
  },
  methods: {
    /* date */
    setYear: function setYear (value) {
      if (this.editable) {
        this.model = new Date(this.model.setFullYear(this.__parseTypeValue('year', value)));
      }
    },
    setMonth: function setMonth (value) {
      if (this.editable) {
        this.model = new Date(this.model.setMonth(this.__parseTypeValue('month', value) - 1));
      }
    },
    setDay: function setDay (value) {
      if (this.editable) {
        this.model = new Date(this.model.setDate(this.__parseTypeValue('date', value)));
      }
    },

    /* time */
    setHour: function setHour (value) {
      if (this.editable) {
        this.model = new Date(this.model.setHours(this.__parseTypeValue('hour', value)));
      }
    },
    setMinute: function setMinute (value) {
      if (this.editable) {
        this.model = new Date(this.model.setMinutes(this.__parseTypeValue('minute', value)));
      }
    },

    /* helpers */
    __pad: function __pad (unit, filler) {
      return (unit < 10 ? filler || '0' : '') + unit
    },
    __updateAllPositions: function __updateAllPositions () {
      var this$1 = this;

      this.$nextTick(function () {
        if (this$1.typeHasDate) {
          this$1.__updatePositions('month', this$1.model.getMonth());
          this$1.__updatePositions('date', this$1.model.getDate());
          this$1.__updatePositions('year', this$1.model.getFullYear());
        }
        if (this$1.typeHasTime) {
          this$1.__updatePositions('hour', this$1.model.getHours());
          this$1.__updatePositions('minute', this$1.model.getMinutes());
        }
      });
    },
    __updatePositions: function __updatePositions (type, value) {
      var this$1 = this;

      var root = this.$refs[type];
      if (!root) {
        return
      }

      var delta = -value;
      if (type === 'year') {
        delta += this.yearMin + 1;
      }
      else if (type === 'date') {
        delta += this.dayMin;
      }
      else {
        delta += this[type + 'Min'];
      }

      [].slice.call(root.children).forEach(function (item) {
        css(item, this$1.__itemStyle(value * 36, between(delta * -18, -180, 180)));
        delta++;
      });
    },
    __colStyle: function __colStyle (value) {
      return {
        '-webkit-transform': 'translate3d(0,' + value + 'px,0)',
        '-ms-transform': 'translate3d(0,' + value + 'px,0)',
        'transform': 'translate3d(0,' + value + 'px,0)'
      }
    },
    __itemStyle: function __itemStyle (translation, rotation) {
      return {
        '-webkit-transform': 'translate3d(0, ' + translation + 'px, 0) rotateX(' + rotation + 'deg)',
        '-ms-transform': 'translate3d(0, ' + translation + 'px, 0) rotateX(' + rotation + 'deg)',
        'transform': 'translate3d(0, ' + translation + 'px, 0) rotateX(' + rotation + 'deg)'
      }
    },

    /* common */
    __dragStart: function __dragStart (ev, type) {
      var this$1 = this;

      if (!this.editable) {
        return
      }

      this.__dragCleanup()
      ;['month', 'date', 'year', 'hour', 'minute'].forEach(function (type) {
        this$1[type + 'DragOffset'] = 0;
      });
      ev.stopPropagation();
      ev.preventDefault();

      if (!this.value) {
        this.__updateModel();
      }

      this.dragging = type;
      this.__dragPosition = position(ev).top;
    },
    __dragMove: function __dragMove (ev, type) {
      if (this.dragging !== type || !this.editable) {
        return
      }
      ev.stopPropagation();
      ev.preventDefault();
      this[type + 'DragOffset'] = (this.__dragPosition - position(ev).top) / 36;
      this.__updatePositions(type, this.date[type]() + this[type + 'DragOffset']);
    },
    __dragStop: function __dragStop (ev, type) {
      var this$1 = this;

      if (this.dragging !== type || !this.editable) {
        return
      }
      ev.stopPropagation();
      ev.preventDefault();
      this.dragging = false;

      var
        offset$$1 = Math.round(this[type + 'DragOffset']),
        newValue = this.__parseTypeValue(type, this[type === 'date' ? 'day' : type] + offset$$1),
        actualType = type === 'date' ? 'day' : type;

      if (newValue !== this[actualType]) {
        this['set' + actualType.charAt(0).toUpperCase() + actualType.slice(1)](newValue);
        this[type + 'DragOffset'] = 0;
      }
      else {
        this.__updatePositions(type, this.date[type]());
        this.timeout = setTimeout(function () {
          this$1[type + 'DragOffset'] = 0;
        }, 150);
      }
    },
    __dragCleanup: function __dragCleanup () {
      clearTimeout(this.timeout);
      this.timeout = null;
    }
  },
  mounted: function mounted () {
    this.$nextTick(this.__updateAllPositions);
  },
  beforeDestroy: function beforeDestroy () {
    this.__dragCleanup();
  }
};

function convertToAmPm (hour) {
  return hour === 0 ? 12 : (hour >= 13 ? hour - 12 : hour)
}

var InlineDatetimeMat = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"q-datetime inline row",class:{disabled: _vm.disable, readonly: _vm.readonly}},[_c('div',{staticClass:"q-datetime-header column col-xs-12 col-md-4 justify-center"},[(_vm.typeHasDate)?_c('div',[_c('div',{staticClass:"q-datetime-weekdaystring col-12"},[_vm._v(_vm._s(_vm.weekDayString))]),_c('div',{staticClass:"q-datetime-datestring row items-center justify-center"},[_c('span',{staticClass:"q-datetime-link small col-auto col-md-12",class:{active: _vm.view === 'month'},on:{"click":function($event){_vm.view = 'month';}}},[_vm._v(_vm._s(_vm.monthString)+" ")]),_c('span',{staticClass:"q-datetime-link col-auto col-md-12",class:{active: _vm.view === 'day'},on:{"click":function($event){_vm.view = 'day';}}},[_vm._v(_vm._s(_vm.dayString)+" ")]),_c('span',{staticClass:"q-datetime-link small col-auto col-md-12",class:{active: _vm.view === 'year'},on:{"click":function($event){_vm.view = 'year';}}},[_vm._v(_vm._s(_vm.year))])])]):_vm._e(),(_vm.typeHasTime)?_c('div',{staticClass:"q-datetime-time row items-center justify-center"},[_c('div',{staticClass:"q-datetime-clockstring col-auto col-md-12"},[_c('span',{staticClass:"q-datetime-link col-auto col-md-12",class:{active: _vm.view === 'hour'},on:{"click":function($event){_vm.view = 'hour';}}},[_vm._v(_vm._s(_vm.__pad(_vm.hour, '  '))+" ")]),_c('span',{staticStyle:{"opacity":"0.6"}},[_vm._v(":")]),_vm._v(" "),_c('span',{staticClass:"q-datetime-link col-auto col-md-12",class:{active: _vm.view === 'minute'},on:{"click":function($event){_vm.view = 'minute';}}},[_vm._v(_vm._s(_vm.__pad(_vm.minute)))])]),(!_vm.format24h)?_c('div',{staticClass:"q-datetime-ampm column col-auto col-md-12 justify-around"},[_c('div',{staticClass:"q-datetime-link",class:{active: _vm.am},on:{"click":function($event){_vm.toggleAmPm();}}},[_vm._v("AM")]),_c('div',{staticClass:"q-datetime-link",class:{active: !_vm.am},on:{"click":function($event){_vm.toggleAmPm();}}},[_vm._v("PM")])]):_vm._e()]):_vm._e()]),_c('div',{staticClass:"q-datetime-content col-xs-12 col-md-8 column"},[_c('div',{ref:"selector",staticClass:"q-datetime-selector auto row items-center justify-center"},[(_vm.view === 'year')?_c('div',{staticClass:"q-datetime-view-year full-width full-height"},_vm._l((_vm.yearInterval),function(n){return _c('q-btn',{key:n,staticClass:"q-datetime-btn full-width",class:{active: n + _vm.yearMin === _vm.year},attrs:{"flat":"","color":"black"},on:{"click":function($event){_vm.setYear(n + _vm.yearMin);}}},[_vm._v(_vm._s(n + _vm.yearMin))])})):_vm._e(),(_vm.view === 'month')?_c('div',{staticClass:"q-datetime-view-month full-width full-height"},_vm._l((_vm.monthInterval),function(index){return _c('q-btn',{key:index,staticClass:"q-datetime-btn full-width",class:{active: _vm.month === index + _vm.monthMin},attrs:{"flat":"","color":"black"},on:{"click":function($event){_vm.setMonth(index + _vm.monthMin, true);}}},[_vm._v(_vm._s(_vm.monthNames[index + _vm.monthMin - 1]))])})):_vm._e(),(_vm.view === 'day')?_c('div',{staticClass:"q-datetime-view-day q-datetime-animate"},[_c('div',{staticClass:"row items-center content-center"},[_c('q-btn',{attrs:{"round":"","small":"","flat":"","color":"primary"},on:{"click":function($event){_vm.setMonth(_vm.month - 1, true);}}},[_c('q-icon',{attrs:{"name":"keyboard_arrow_left"}})],1),_c('div',{staticClass:"col"},[_vm._v(_vm._s(_vm.monthStamp))]),_c('q-btn',{attrs:{"round":"","small":"","flat":"","color":"primary"},on:{"click":function($event){_vm.setMonth(_vm.month + 1, true);}}},[_c('q-icon',{attrs:{"name":"keyboard_arrow_right"}})],1)],1),_c('div',{staticClass:"q-datetime-weekdays row items-center justify-start"},_vm._l((_vm.headerDayNames),function(day){return _c('div',[_vm._v(_vm._s(day))])})),_c('div',{staticClass:"q-datetime-days row wrap items-center justify-start content-center"},[_vm._l((_vm.fillerDays),function(fillerDay){return _c('div',{staticClass:"q-datetime-fillerday"})}),_vm._l((_vm.beforeMinDays),function(fillerDay){return (_vm.min)?_c('div',{staticClass:"row items-center content-center justify-center disabled"},[_vm._v(_vm._s(fillerDay))]):_vm._e()}),_vm._l((_vm.daysInterval),function(monthDay){return _c('div',{staticClass:"row items-center content-center justify-center cursor-pointer",class:{active: monthDay === _vm.day},on:{"click":function($event){_vm.setDay(monthDay);}}},[_vm._v(_vm._s(monthDay))])}),_vm._l((_vm.aferMaxDays),function(fillerDay){return (_vm.max)?_c('div',{staticClass:"row items-center content-center justify-center disabled"},[_vm._v(_vm._s(fillerDay + _vm.maxDay))]):_vm._e()})],2)]):_vm._e(),(_vm.view === 'hour' || _vm.view === 'minute')?_c('div',{ref:"clock",staticClass:"column items-center content-center justify-center"},[(_vm.view === 'hour')?_c('div',{staticClass:"q-datetime-clock cursor-pointer",on:{"mousedown":_vm.__dragStart,"mousemove":_vm.__dragMove,"mouseup":_vm.__dragStop,"touchstart":_vm.__dragStart,"touchmove":_vm.__dragMove,"touchend":_vm.__dragStop}},[_c('div',{staticClass:"q-datetime-clock-circle full-width full-height"},[_c('div',{staticClass:"q-datetime-clock-center"}),_c('div',{staticClass:"q-datetime-clock-pointer",style:(_vm.clockPointerStyle)},[_c('span')]),(_vm.format24h)?_c('div',_vm._l((24),function(n){return _c('div',{staticClass:"q-datetime-clock-position fmt24",class:[("q-datetime-clock-pos-" + (n-1)), (n - 1) === _vm.hour ? 'active' : '']},[_vm._v(_vm._s(n - 1))])})):_c('div',_vm._l((12),function(n){return _c('div',{staticClass:"q-datetime-clock-position",class:['q-datetime-clock-pos-' + n, n === _vm.hour ? 'active' : '']},[_vm._v(_vm._s(n))])}))])]):_vm._e(),(_vm.view === 'minute')?_c('div',{staticClass:"q-datetime-clock cursor-pointer",on:{"mousedown":_vm.__dragStart,"mousemove":_vm.__dragMove,"mouseup":_vm.__dragStop,"touchstart":_vm.__dragStart,"touchmove":_vm.__dragMove,"touchend":_vm.__dragStop}},[_c('div',{staticClass:"q-datetime-clock-circle full-width full-height"},[_c('div',{staticClass:"q-datetime-clock-center"}),_c('div',{staticClass:"q-datetime-clock-pointer",style:(_vm.clockPointerStyle)},[_c('span')]),_vm._l((12),function(n){return _c('div',{staticClass:"q-datetime-clock-position",class:['q-datetime-clock-pos-' + (n - 1), (n - 1) * 5 === _vm.minute ? 'active' : '']},[_vm._v(_vm._s((n - 1) * 5))])})],2)]):_vm._e()]):_vm._e()]),_vm._t("default")],2)])},staticRenderFns: [],
  name: 'q-inline-datetime',
  mixins: [mixin$2],
  props: {
    defaultSelection: [String, Number, Date],
    disable: Boolean
  },
  components: {
    QIcon: QIcon,
    QBtn: QBtn
  },
  directives: {
    Ripple: Ripple
  },
  data: function data () {
    var view;

    switch (this.type) {
      case 'time':
        view = 'hour';
        break
      case 'date':
      default:
        view = 'day';
        break
    }

    return {
      view: view,
      dragging: false,
      centerClockPos: 0
    }
  },
  watch: {
    value: function value (val) {
      if (!val) {
        this.view = ['date', 'datetime'].includes(this.type) ? 'day' : 'hour';
      }
    },
    view: function view (value) {
      if (value !== 'year' && value !== 'month') {
        return
      }

      var
        view = this.$refs.selector,
        rows = value === 'year' ? this.year - this.yearMin : this.month - this.monthMin;

      this.$nextTick(function () {
        view.scrollTop = rows * height(view.children[0].children[0]) - height(view) / 2.5;
      });
    }
  },
  computed: {
    firstDayOfWeek: function firstDayOfWeek () {
      return this.mondayFirst ? 1 : 0
    },
    headerDayNames: function headerDayNames () {
      var days = this.dayNames.map(function (day) { return day.slice(0, 3); });
      return this.mondayFirst
        ? days.slice(1, 7).concat(days[0])
        : days
    },

    dayString: function dayString () {
      return formatDate(this.model, 'D')
    },
    monthString: function monthString () {
      return formatDate(this.model, 'MMM')
    },
    monthStamp: function monthStamp () {
      return formatDate(this.model, 'MMMM YYYY')
    },
    weekDayString: function weekDayString () {
      return formatDate(this.model, 'dddd')
    },

    fillerDays: function fillerDays () {
      return Math.max(0, (new Date(this.model.getFullYear(), this.model.getMonth(), 1).getDay() - this.firstDayOfWeek))
    },
    beforeMinDays: function beforeMinDays () {
      if (this.pmin === null || !isSameDate(this.pmin, this.model, 'month')) {
        return false
      }
      return this.pmin.getDate() - 1
    },
    aferMaxDays: function aferMaxDays () {
      if (this.pmax === null || !isSameDate(this.pmax, this.model, 'month')) {
        return false
      }
      return this.daysInMonth - this.maxDay
    },
    maxDay: function maxDay () {
      return this.pmax !== null ? this.pmax.getDate() : this.daysInMonth
    },
    daysInterval: function daysInterval () {
      var after = this.pmax === null || this.afterMaxDays === false ? 0 : this.aferMaxDays;
      if (this.beforeMinDays || after) {
        var min = this.beforeMinDays ? this.beforeMinDays + 1 : 1;
        return Array.apply(null, {length: this.daysInMonth - min - after + 1}).map(function (day, index) {
          return index + min
        })
      }
      return this.daysInMonth
    },

    hour: function hour () {
      var h = this.model.getHours();
      return this.format24h
        ? h
        : convertToAmPm(h)
    },
    minute: function minute () {
      return this.model.getMinutes()
    },
    am: function am () {
      return this.model.getHours() <= 11
    },
    clockPointerStyle: function clockPointerStyle () {
      var
        divider = this.view === 'minute' ? 60 : (this.format24h ? 24 : 12),
        degrees = Math.round((this.view === 'minute' ? this.minute : this.hour) * (360 / divider)) - 180;

      return cssTransform(("rotate(" + degrees + "deg)"))
    }
  },
  methods: {
    /* date */
    setYear: function setYear (value) {
      if (this.editable) {
        this.view = 'day';
        this.model = new Date(this.model.setFullYear(this.__parseTypeValue('year', value)));
      }
    },
    setMonth: function setMonth (value, force) {
      if (this.editable) {
        this.view = 'day';
        this.model = new Date(this.model.setMonth((force ? value : this.__parseTypeValue('month', value)) - 1));
      }
    },
    setDay: function setDay (value) {
      if (this.editable) {
        this.model = new Date(this.model.setDate(this.__parseTypeValue('date', value)));
      }
    },

    setHour: function setHour (value) {
      if (!this.editable) {
        return
      }

      value = this.__parseTypeValue('hour', value);

      if (!this.format24h && value < 12 && !this.am) {
        value += 12;
      }

      this.model = new Date(this.model.setHours(value));
    },
    setMinute: function setMinute (value) {
      if (!this.editable) {
        return
      }

      this.model = new Date(this.model.setMinutes(this.__parseTypeValue('minute', value)));
    },

    /* helpers */
    __pad: function __pad (unit, filler) {
      return (unit < 10 ? filler || '0' : '') + unit
    },
    __dragStart: function __dragStart (ev) {
      ev.stopPropagation();
      ev.preventDefault();

      var
        clock = this.$refs.clock,
        clockOffset = offset(clock);

      this.centerClockPos = {
        top: clockOffset.top + height(clock) / 2,
        left: clockOffset.left + width(clock) / 2
      };

      this.dragging = true;
      this.__updateClock(ev);
    },
    __dragMove: function __dragMove (ev) {
      if (!this.dragging) {
        return
      }
      ev.stopPropagation();
      ev.preventDefault();
      this.__updateClock(ev);
    },
    __dragStop: function __dragStop (ev) {
      ev.stopPropagation();
      ev.preventDefault();
      this.dragging = false;
      this.view = 'minute';
    },
    __updateClock: function __updateClock (ev) {
      var
        pos = position(ev),
        height$$1 = Math.abs(pos.top - this.centerClockPos.top),
        distance = Math.sqrt(
          Math.pow(Math.abs(pos.top - this.centerClockPos.top), 2) +
          Math.pow(Math.abs(pos.left - this.centerClockPos.left), 2)
        ),
        angle = Math.asin(height$$1 / distance) * (180 / Math.PI);

      if (pos.top < this.centerClockPos.top) {
        angle = this.centerClockPos.left < pos.left ? 90 - angle : 270 + angle;
      }
      else {
        angle = this.centerClockPos.left < pos.left ? angle + 90 : 270 - angle;
      }

      if (this.view === 'hour') {
        this.setHour(Math.round(angle / (this.format24h ? 15 : 30)));
      }
      else {
        this.setMinute(Math.round(angle / 6));
      }
    }
  }
};

var QInlineDatetime = {
  name: 'q-inline-datetime',
  functional: true,
  render: function render (h, ctx) {
    return h(
      current === 'ios' ? InlineDatetimeIOS : InlineDatetimeMat,
      ctx.data,
      ctx.children
    )
  }
};

var contentCSS = {
  ios: {
    maxHeight: '80vh',
    height: 'auto',
    boxShadow: 'none',
    backgroundColor: '#e4e4e4'
  },
  mat: {
    maxWidth: '95vw',
    maxHeight: '98vh'
  }
};

var QDatetime = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('q-input-frame',{staticClass:"q-datetime-input",attrs:{"prefix":_vm.prefix,"suffix":_vm.suffix,"stack-label":_vm.stackLabel,"float-label":_vm.floatLabel,"error":_vm.error,"disable":_vm.disable,"inverted":_vm.inverted,"dark":_vm.dark,"before":_vm.before,"after":_vm.after,"color":_vm.color,"focused":_vm.focused,"focusable":"","length":_vm.actualValue.length},nativeOn:{"click":function($event){_vm.open($event);},"focus":function($event){_vm.__onFocus($event);},"blur":function($event){_vm.__onBlur($event);}}},[_c('div',{staticClass:"col q-input-target",class:[("text-" + (_vm.align))]},[_vm._v(_vm._s(_vm.actualValue))]),(_vm.$q.platform.is.desktop)?_c('q-popover',{ref:"popup",attrs:{"offset":[0, 10],"disable":_vm.disable || _vm.readonly,"anchor-click":false},on:{"open":_vm.__onOpen,"close":_vm.__onClose}},[_c('q-inline-datetime',{ref:"target",staticClass:"no-border",attrs:{"default-selection":_vm.defaultSelection,"type":_vm.type,"min":_vm.min,"max":_vm.max,"format24h":_vm.format24h,"monday-first":_vm.mondayFirst},model:{value:(_vm.model),callback:function ($$v) {_vm.model=$$v;},expression:"model"}},[_c('div',{staticClass:"modal-buttons row"},[(!_vm.noClear && _vm.model)?_c('q-btn',{attrs:{"flat":""},on:{"click":function($event){_vm.clear();}}},[_c('span',{domProps:{"innerHTML":_vm._s(_vm.clearLabel)}})]):_vm._e(),_c('div',{staticClass:"col"}),_c('q-btn',{attrs:{"flat":""},on:{"click":function($event){_vm.close();}}},[_c('span',{domProps:{"innerHTML":_vm._s(_vm.cancelLabel)}})]),_c('q-btn',{attrs:{"flat":""},on:{"click":function($event){_vm.close(_vm.__update);}}},[_c('span',{domProps:{"innerHTML":_vm._s(_vm.okLabel)}})])],1)])],1):_c('q-modal',{ref:"popup",staticClass:"with-backdrop",class:_vm.classNames,attrs:{"transition":_vm.transition,"position-classes":_vm.position,"content-css":_vm.css},on:{"open":_vm.__onOpen,"close":_vm.__onClose}},[_c('q-inline-datetime',{ref:"target",staticClass:"no-border",attrs:{"default-selection":_vm.defaultSelection,"type":_vm.type,"min":_vm.min,"max":_vm.max,"format24h":_vm.format24h,"monday-first":_vm.mondayFirst},model:{value:(_vm.model),callback:function ($$v) {_vm.model=$$v;},expression:"model"}},[_c('div',{staticClass:"modal-buttons row full-width"},[(!_vm.noClear && _vm.model)?_c('q-btn',{attrs:{"flat":""},on:{"click":function($event){_vm.clear();}}},[_c('span',{domProps:{"innerHTML":_vm._s(_vm.clearLabel)}})]):_vm._e(),_c('div',{staticClass:"col"}),_c('q-btn',{attrs:{"flat":""},on:{"click":function($event){_vm.close();}}},[_c('span',{domProps:{"innerHTML":_vm._s(_vm.cancelLabel)}})]),_c('q-btn',{attrs:{"flat":""},on:{"click":function($event){_vm.close(_vm.__update);}}},[_c('span',{domProps:{"innerHTML":_vm._s(_vm.okLabel)}})])],1)])],1),_c('q-icon',{staticClass:"q-if-control",attrs:{"name":"arrow_drop_down"},slot:"control"})],1)},staticRenderFns: [],
  name: 'q-datetime',
  mixins: [FrameMixin],
  components: {
    QIcon: QIcon,
    QInputFrame: QInputFrame,
    QPopover: QPopover,
    QModal: QModal,
    QInlineDatetime: QInlineDatetime,
    QBtn: QBtn
  },
  props: extend({defaultSelection: [String, Number, Date]}, input, inline),
  data: function data () {
    var data = this.$q.platform.is.desktop ? {} : {
      css: contentCSS[current],
      position: current === 'ios' ? 'items-end justify-center' : 'items-center justify-center',
      transition: current === 'ios' ? 'q-modal-bottom' : 'q-modal',
      classNames: current === 'ios' ? '' : 'minimized'
    };
    data.model = this.value;
    data.focused = false;
    return data
  },
  computed: {
    actualValue: function actualValue () {
      if (!this.value) {
        return this.placeholder || ''
      }

      var format;

      if (this.format) {
        format = this.format;
      }
      else if (this.type === 'date') {
        format = 'YYYY-MM-DD';
      }
      else if (this.type === 'time') {
        format = 'HH:mm';
      }
      else {
        format = 'YYYY-MM-DD HH:mm:ss';
      }

      return formatDate(this.value, format)
    }
  },
  methods: {
    open: function open () {
      if (!this.disable && !this.readonly) {
        this.__setModel();
        this.$refs.popup.open();
      }
    },
    close: function close (fn) {
      this.focused = false;
      this.$refs.popup.close(fn);
    },
    clear: function clear () {
      this.$refs.popup.close();
      this.$emit('input', '');
    },
    __onFocus: function __onFocus () {
      this.focused = true;
      this.$emit('focus');
    },
    __onBlur: function __onBlur (e) {
      var this$1 = this;

      this.__onClose();
      setTimeout(function () {
        if (document.activeElement !== document.body && !this$1.$refs.popup.$el.contains(document.activeElement)) {
          this$1.close();
        }
      }, 1);
    },
    __onOpen: function __onOpen () {
      this.__onFocus();
    },
    __onClose: function __onClose () {
      this.focused = false;
      this.$emit('blur');
    },
    __setModel: function __setModel () {
      this.model = this.value;
    },
    __update: function __update () {
      this.$emit('input', this.model || this.$refs.target.model);
    }
  }
};

var QDatetimeRange = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"q-datetime-range"},[_c('q-datetime',{staticClass:"inline",class:_vm.className,style:(_vm.css),attrs:{"default-selection":_vm.defaultFrom,"type":_vm.type,"min":_vm.min,"max":_vm.model.to || _vm.max,"format":_vm.format,"no-clear":_vm.noClear,"clear-label":_vm.clearLabel,"ok-label":_vm.okLabel,"cancel-label":_vm.cancelLabel,"float-label":_vm.floatLabel,"stack-label":_vm.stackLabel,"placeholder":_vm.placeholder,"disable":_vm.disable,"inverted":_vm.inverted,"dark":_vm.dark,"before":_vm.before,"after":_vm.after,"color":_vm.color,"align":_vm.align,"format24h":_vm.format24h,"monday-first":_vm.mondayFirst},model:{value:(_vm.model.from),callback:function ($$v) {_vm.model.from=$$v;},expression:"model.from"}}),_c('q-datetime',{staticClass:"inline",class:_vm.className,style:(_vm.css),attrs:{"default-selection":_vm.defaultTo,"type":_vm.type,"min":_vm.model.from || _vm.min,"max":_vm.max,"format":_vm.format,"no-clear":_vm.noClear,"clear-label":_vm.clearLabel,"ok-label":_vm.okLabel,"cancel-label":_vm.cancelLabel,"float-label":_vm.floatLabel,"stack-label":_vm.stackLabel,"placeholder":_vm.placeholder,"disable":_vm.disable,"inverted":_vm.inverted,"dark":_vm.dark,"before":_vm.before,"after":_vm.after,"color":_vm.color,"align":_vm.align,"format24h":_vm.format24h,"monday-first":_vm.mondayFirst},model:{value:(_vm.model.to),callback:function ($$v) {_vm.model.to=$$v;},expression:"model.to"}})],1)},staticRenderFns: [],
  name: 'q-datetime-range',
  mixins: [FrameMixin],
  components: {
    QDatetime: QDatetime
  },
  props: extend(
    input,
    inline,
    {
      value: {
        type: Object,
        validator: function (val) { return 'from' in val && 'to' in val; },
        required: true
      },
      className: [String, Object],
      css: [String, Object],
      defaultFrom: [String, Number, Date],
      defaultTo: [String, Number, Date]
    }
  ),
  computed: {
    model: {
      get: function get () {
        return this.value
      },
      set: function set (value) {
        this.$emit('input', value);
      }
    }
  }
};

var FabMixin = {
  props: {
    outline: Boolean,
    push: Boolean,
    flat: Boolean,
    color: String
  }
};

var QFab = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"q-fab row inline justify-center",class:{opened: _vm.opened}},[_c('q-btn',{attrs:{"round":"","outline":_vm.outline,"push":_vm.push,"flat":_vm.flat,"color":_vm.color},on:{"click":_vm.toggle}},[_c('q-icon',{staticClass:"q-fab-icon",attrs:{"name":_vm.icon}}),_c('q-icon',{staticClass:"q-fab-active-icon",attrs:{"name":_vm.activeIcon}})],1),_c('div',{staticClass:"q-fab-actions flex no-wrap inline items-center",class:("q-fab-" + (_vm.direction))},[_vm._t("default")],2)],1)},staticRenderFns: [],
  name: 'q-fab',
  mixins: [FabMixin],
  components: {
    QBtn: QBtn,
    QIcon: QIcon
  },
  props: {
    icon: {
      type: String,
      default: 'add'
    },
    activeIcon: {
      type: String,
      default: 'close'
    },
    direction: {
      type: String,
      default: 'right'
    }
  },
  provide: function provide () {
    return {
      __qFabClose: this.close
    }
  },
  data: function data () {
    return {
      opened: false
    }
  },
  methods: {
    open: function open () {
      this.opened = true;
      this.$emit('open');
    },
    close: function close (fn) {
      this.opened = false;

      if (typeof fn === 'function') {
        this.$emit('close');
        fn();
      }
    },
    toggle: function toggle () {
      if (this.opened) {
        this.close();
      }
      else {
        this.open();
      }
    }
  }
};

var QSmallFab = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('q-btn',{attrs:{"round":"","small":"","outline":_vm.outline,"push":_vm.push,"flat":_vm.flat,"color":_vm.color},on:{"click":_vm.click}},[_c('q-icon',{attrs:{"name":_vm.icon}}),_vm._t("default")],2)},staticRenderFns: [],
  name: 'q-small-fab',
  mixins: [FabMixin],
  components: {
    QBtn: QBtn,
    QIcon: QIcon
  },
  inject: ['__qFabClose'],
  props: {
    icon: {
      type: String,
      required: true
    }
  },
  methods: {
    click: function click (e) {
      var this$1 = this;

      this.__qFabClose(function () {
        this$1.$emit('click', e);
      });
    }
  }
};

var QField = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"q-field row no-wrap items-start",class:{ 'q-field-floating': _vm.childHasLabel, 'q-field-with-error': _vm.hasError, 'q-field-dark': _vm.isDark }},[(_vm.icon)?_c('q-icon',{staticClass:"q-field-icon",attrs:{"name":_vm.icon}}):(_vm.insetIcon)?_c('div',{staticClass:"q-field-icon"}):_vm._e(),_c('div',{staticClass:"row col"},[(_vm.hasLabel)?_c('div',{staticClass:"q-field-label col-xs-12",class:("col-sm-" + (_vm.labelWidth))},[_c('div',{staticClass:"q-field-label-inner row items-center"},[(_vm.label)?_c('span',{domProps:{"innerHTML":_vm._s(_vm.label)}}):_vm._e(),_vm._t("label")],2)]):_vm._e(),_c('div',{staticClass:"col-xs-12 col-sm"},[_vm._t("default"),(_vm.hasBottom)?_c('div',{staticClass:"q-field-bottom row no-wrap"},[(_vm.hasError && _vm.errorLabel)?_c('div',{staticClass:"q-field-error col",domProps:{"innerHTML":_vm._s(_vm.errorLabel)}}):(_vm.helper)?_c('div',{staticClass:"q-field-helper col",domProps:{"innerHTML":_vm._s(_vm.helper)}}):_vm._e(),(_vm.counter)?_c('div',{staticClass:"q-field-counter col-auto"},[_vm._v(_vm._s(_vm.counter))]):_vm._e()]):_vm._e()],2)])],1)},staticRenderFns: [],
  name: 'q-field',
  components: {
    QIcon: QIcon
  },
  props: {
    labelWidth: {
      type: Number,
      default: 5,
      validator: function validator (val) {
        return val >= 1 && val <= 12
      }
    },
    inset: {
      type: String,
      validator: function validator (val) {
        return ['icon', 'label', 'full'].includes(val)
      }
    },
    label: String,
    count: {
      type: [Number, Boolean],
      default: false
    },
    error: Boolean,
    errorLabel: String,
    helper: String,
    icon: String,
    dark: Boolean
  },
  data: function data () {
    return {
      input: {}
    }
  },
  computed: {
    hasError: function hasError () {
      return this.input.error || this.error
    },
    hasBottom: function hasBottom () {
      return (this.hasError && this.errorLabel) || this.helper || this.count
    },
    hasLabel: function hasLabel () {
      return this.label || this.$slots.label || ['label', 'full'].includes(this.inset)
    },
    childHasLabel: function childHasLabel () {
      return this.input.floatLabel || this.input.stackLabel
    },
    isDark: function isDark () {
      return this.input.dark || this.dark
    },
    insetIcon: function insetIcon () {
      return ['icon', 'full'].includes(this.inset)
    },
    counter: function counter () {
      if (this.count) {
        var length = this.input.length || '0';
        return Number.isInteger(this.count)
          ? (length + " / " + (this.count))
          : length
      }
    }
  },
  provide: function provide () {
    return {
      __field: this
    }
  },
  methods: {
    __registerInput: function __registerInput (vm) {
      this.input = vm;
    },
    __unregisterInput: function __unregisterInput () {
      this.input = {};
    }
  }
};

var QGallery = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"q-gallery"},_vm._l((_vm.src),function(img,index){return _c('div',{key:index,style:({width: _vm.width})},[_c('img',{attrs:{"src":img}})])}))},staticRenderFns: [],
  name: 'q-gallery',
  props: {
    src: {
      type: Array,
      required: true
    },
    width: {
      type: String,
      default: '150px'
    }
  }
};

var sliderMixin = {
  props: {
    arrows: Boolean,
    dots: Boolean,
    fullscreen: Boolean,
    infinite: Boolean,
    actions: Boolean,
    animation: {
      type: Boolean,
      default: true
    },
    autoplay: [Number, Boolean]
  }
};

var QSlider = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"q-slider",class:{fullscreen: _vm.inFullscreen}},[_c('div',{directives:[{name:"touch-pan",rawName:"v-touch-pan.horizontal",value:(_vm.__pan),expression:"__pan",modifiers:{"horizontal":true}}],staticClass:"q-slider-inner"},[_c('div',{ref:"track",staticClass:"q-slider-track",class:{'with-arrows': _vm.arrows, 'with-toolbar': _vm.toolbar, 'infinite-left': _vm.infiniteLeft, 'infinite-right': _vm.infiniteRight},style:(_vm.trackPosition)},[_c('div',{directives:[{name:"show",rawName:"v-show",value:(_vm.infiniteRight),expression:"infiniteRight"}]}),_vm._t("slide"),_c('div',{directives:[{name:"show",rawName:"v-show",value:(_vm.infiniteLeft),expression:"infiniteLeft"}]})],2),_c('div',{directives:[{name:"show",rawName:"v-show",value:(_vm.arrows && _vm.canGoToPrevious),expression:"arrows && canGoToPrevious"}],staticClass:"q-slider-left-button row items-center justify-center"},[_c('q-icon',{attrs:{"name":"keyboard_arrow_left"},on:{"click":_vm.previous}})],1),_c('div',{directives:[{name:"show",rawName:"v-show",value:(_vm.arrows && _vm.canGoToNext),expression:"arrows && canGoToNext"}],staticClass:"q-slider-right-button row items-center justify-center",on:{"click":_vm.next}},[_c('q-icon',{attrs:{"name":"keyboard_arrow_right"}})],1),(_vm.toolbar)?_c('div',{staticClass:"q-slider-toolbar row items-center justify-end"},[_c('div',{staticClass:"q-slider-dots col row items-center justify-center"},_vm._l((_vm.slidesNumber),function(n){return (_vm.dots)?_c('q-icon',{key:n,attrs:{"name":(n - 1) !== _vm.slide ? 'panorama_fish_eye' : 'lens'},on:{"click":function($event){_vm.goToSlide(n - 1);}}}):_vm._e()})),_c('div',{staticClass:"row items-center"},[_vm._t("action"),(_vm.fullscreen)?_c('q-icon',{attrs:{"name":_vm.inFullscreen ? 'fullscreen_exit' : 'fullscreen'},on:{"click":_vm.toggleFullscreen}}):_vm._e()],2)]):_vm._e(),_vm._t("default")],2)])},staticRenderFns: [],
  name: 'q-slider',
  components: {
    QIcon: QIcon
  },
  mixins: [sliderMixin],
  data: function data () {
    return {
      position: 0,
      slide: 0,
      positionSlide: 0,
      slidesNumber: 0,
      inFullscreen: false,
      animUid: false
    }
  },
  watch: {
    autoplay: function autoplay () {
      this.__planAutoPlay();
    },
    infinite: function infinite () {
      this.__planAutoPlay();
    }
  },
  computed: {
    toolbar: function toolbar () {
      return this.dots || this.fullscreen || this.actions
    },
    trackPosition: function trackPosition () {
      return cssTransform(("translateX(" + (this.position) + "%)"))
    },
    infiniteRight: function infiniteRight () {
      return this.infinite && this.slidesNumber > 1 && this.positionSlide >= this.slidesNumber
    },
    infiniteLeft: function infiniteLeft () {
      return this.infinite && this.slidesNumber > 1 && this.positionSlide < 0
    },
    canGoToPrevious: function canGoToPrevious () {
      return this.infinite ? this.slidesNumber > 1 : this.slide > 0
    },
    canGoToNext: function canGoToNext () {
      return this.infinite ? this.slidesNumber > 1 : this.slide < this.slidesNumber - 1
    }
  },
  methods: {
    __pan: function __pan (event) {
      var this$1 = this;

      if (this.infinite && this.animationInProgress) {
        return
      }
      if (!this.hasOwnProperty('initialPosition')) {
        this.initialPosition = this.position;
        this.__cleanup();
      }

      var delta = (event.direction === 'left' ? -1 : 1) * event.distance.x;

      if (
        (this.infinite && this.slidesNumber < 2) ||
        (
          !this.infinite &&
          (
            (this.slide === 0 && delta > 0) ||
            (this.slide === this.slidesNumber - 1 && delta < 0)
          )
        )
      ) {
        delta = delta / 10;
      }

      this.position = this.initialPosition + delta / this.$refs.track.offsetWidth * 100;
      this.positionSlide = (event.direction === 'left' ? this.slide + 1 : this.slide - 1);

      if (event.isFinal) {
        this.goToSlide(
          event.distance.x < 100
            ? this.slide
            : this.positionSlide,
          function () {
            delete this$1.initialPosition;
          }
        );
      }
    },
    __getSlidesNumber: function __getSlidesNumber () {
      return this.$slots.slide ? this.$slots.slide.length : 0
    },
    previous: function previous (done) {
      if (this.canGoToPrevious) {
        this.goToSlide(this.slide - 1, done);
      }
    },
    next: function next (done) {
      if (this.canGoToNext) {
        this.goToSlide(this.slide + 1, done);
      }
    },
    goToSlide: function goToSlide (slide, done) {
      var this$1 = this;

      var direction = '';
      this.__cleanup();

      var finish = function () {
        this$1.$emit('slide', this$1.slide, direction);
        this$1.__planAutoPlay();
        if (typeof done === 'function') {
          done();
        }
      };

      if (this.slidesNumber < 2) {
        this.slide = 0;
        this.positionSlide = 0;
      }
      else {
        if (!this.hasOwnProperty('initialPosition')) {
          this.position = -this.slide * 100;
        }
        direction = slide > this.slide ? 'next' : 'previous';
        if (this.infinite) {
          this.slide = normalizeToInterval(slide, 0, this.slidesNumber - 1);
          this.positionSlide = normalizeToInterval(slide, -1, this.slidesNumber);
        }
        else {
          this.slide = between(slide, 0, this.slidesNumber - 1);
          this.positionSlide = this.slide;
        }
      }

      var pos = -this.positionSlide * 100;

      if (!this.animation) {
        this.position = pos;
        finish();
        return
      }

      this.animationInProgress = true;

      this.animUid = start$1({
        from: this.position,
        to: pos,
        apply: function (pos) {
          this$1.position = pos;
        },
        done: function () {
          if (this$1.infinite) {
            this$1.position = -this$1.slide * 100;
            this$1.positionSlide = this$1.slide;
          }
          this$1.animationInProgress = false;
          finish();
        }
      });
    },
    toggleFullscreen: function toggleFullscreen () {
      if (this.inFullscreen) {
        if (!Platform.has.popstate) {
          this.__setFullscreen(false);
        }
        else {
          window.history.go(-1);
        }
        return
      }

      this.__setFullscreen(true);
      if (Platform.has.popstate) {
        window.history.pushState({}, '');
        window.addEventListener('popstate', this.__popState);
      }
    },
    __setFullscreen: function __setFullscreen (state) {
      if (this.inFullscreen === state) {
        return
      }

      if (state) {
        this.container.replaceChild(this.fillerNode, this.$el);
        document.body.appendChild(this.$el);
        this.inFullscreen = true;
        return
      }

      this.inFullscreen = false;
      this.container.replaceChild(this.$el, this.fillerNode);
    },
    __popState: function __popState () {
      if (this.inFullscreen) {
        this.__setFullscreen(false);
      }
      window.removeEventListener('popstate', this.__popState);
    },
    stopAnimation: function stopAnimation () {
      stop(this.animUid);
      this.animationInProgress = false;
    },
    __cleanup: function __cleanup () {
      this.stopAnimation();
      clearTimeout(this.timer);
    },
    __planAutoPlay: function __planAutoPlay () {
      var this$1 = this;

      this.$nextTick(function () {
        if (this$1.autoplay) {
          clearTimeout(this$1.timer);
          this$1.timer = setTimeout(
            this$1.next,
            typeof this$1.autoplay === 'number' ? this$1.autoplay : 5000
          );
        }
      });
    }
  },
  beforeUpdate: function beforeUpdate () {
    var slides = this.__getSlidesNumber();
    if (slides !== this.slidesNumber) {
      this.slidesNumber = slides;
      this.goToSlide(this.slide);
    }
  },
  mounted: function mounted () {
    var this$1 = this;

    this.$nextTick(function () {
      this$1.fillerNode = document.createElement('span');
      this$1.container = this$1.$el.parentNode;
      this$1.slidesNumber = this$1.__getSlidesNumber();
      this$1.__planAutoPlay();
    });
  },
  beforeDestroy: function beforeDestroy () {
    this.__cleanup();
  }
};

var QGallerySlider = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('q-slider',{ref:"slider",staticClass:"text-white bg-black q-gallery-slider",attrs:{"dots":_vm.dots,"arrows":_vm.arrows,"fullscreen":_vm.fullscreen,"infinite":_vm.infinite,"actions":"","animation":_vm.animation,"autoplay":_vm.autoplay},on:{"slide":_vm.__updateCurrentSlide}},[_vm._l((_vm.src),function(img,index){return _c('div',{key:index,staticClass:"no-padding row items-center justify-center",slot:"slide"},[_c('div',{staticClass:"full-width"},[_c('img',{attrs:{"src":img}})])])}),_c('div',{staticClass:"q-gallery-slider-overlay",class:{active: _vm.quickView},on:{"click":function($event){_vm.toggleQuickView();}}}),_c('q-icon',{attrs:{"name":"view_carousel"},on:{"click":function($event){_vm.toggleQuickView();}},slot:"action"}),_c('div',{staticClass:"q-gallery-slider-quickview",class:{active: _vm.quickView, row: _vm.horizontalQuickView, horizontal: _vm.horizontalQuickView},on:{"!touchstart":function($event){$event.stopPropagation();},"!touchmove":function($event){$event.stopPropagation();},"!touchend":function($event){$event.stopPropagation();},"!mousedown":function($event){$event.stopPropagation();},"!mousemove":function($event){$event.stopPropagation();},"!mouseend":function($event){$event.stopPropagation();}}},_vm._l((_vm.src),function(img,index){return _c('div',{key:index},[_c('img',{class:{active: _vm.currentSlide === index},attrs:{"src":img},on:{"click":function($event){_vm.__selectImage(index);}}})])}))],2)},staticRenderFns: [],
  name: 'q-gallery-slider',
  components: {
    QSlider: QSlider,
    QIcon: QIcon
  },
  mixins: [sliderMixin],
  props: {
    src: {
      type: Array,
      required: true
    },
    arrows: {
      type: Boolean,
      default: true
    },
    actions: {
      type: Boolean,
      default: true
    },
    horizontalQuickView: Boolean
  },
  data: function data () {
    return {
      quickView: false,
      currentSlide: 0
    }
  },
  methods: {
    toggleQuickView: function toggleQuickView () {
      this.quickView = !this.quickView;
    },
    goToSlide: function goToSlide (index, noAnimation) {
      this.$refs.slider.goToSlide(index, noAnimation);
    },
    __selectImage: function __selectImage (index) {
      this.goToSlide(index, true);
      this.toggleQuickView();
    },
    __updateCurrentSlide: function __updateCurrentSlide (value) {
      this.currentSlide = value;
      this.$emit('slide', value);
    }
  }
};

var QInfiniteScroll = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"q-infinite-scroll"},[_c('div',{ref:"content",staticClass:"q-infinite-scroll-content"},[_vm._t("default")],2),_c('div',{directives:[{name:"show",rawName:"v-show",value:(_vm.fetching),expression:"fetching"}],staticClass:"q-infinite-scroll-message"},[_vm._t("message")],2)])},staticRenderFns: [],
  name: 'q-infinite-scroll',
  props: {
    handler: {
      type: Function,
      required: true
    },
    inline: Boolean,
    offset: {
      type: Number,
      default: 0
    }
  },
  data: function data () {
    return {
      index: 0,
      fetching: false,
      working: true
    }
  },
  methods: {
    poll: function poll () {
      if (this.fetching || !this.working) {
        return
      }

      var
        containerHeight = height(this.scrollContainer),
        containerBottom = offset(this.scrollContainer).top + containerHeight,
        triggerPosition = offset(this.element).top + height(this.element) - (this.offset || containerHeight);

      if (triggerPosition < containerBottom) {
        this.loadMore();
      }
    },
    loadMore: function loadMore () {
      var this$1 = this;

      if (this.fetching || !this.working) {
        return
      }

      this.index++;
      this.fetching = true;
      this.handler(this.index, function (stopLoading) {
        this$1.fetching = false;
        if (stopLoading) {
          this$1.stop();
          return
        }
        if (this$1.element.closest('body')) {
          this$1.poll();
        }
      });
    },
    reset: function reset () {
      this.index = 0;
    },
    resume: function resume () {
      this.working = true;
      this.scrollContainer.addEventListener('scroll', this.poll);
      this.poll();
    },
    stop: function stop () {
      this.working = false;
      this.scrollContainer.removeEventListener('scroll', this.poll);
    }
  },
  mounted: function mounted () {
    var this$1 = this;

    this.$nextTick(function () {
      this$1.poll = debounce(this$1.poll, 50);
      this$1.element = this$1.$refs.content;

      this$1.scrollContainer = this$1.inline ? this$1.$el : getScrollTarget(this$1.$el);
      if (this$1.working) {
        this$1.scrollContainer.addEventListener('scroll', this$1.poll);
      }

      this$1.poll();
    });
  },
  beforeDestroy: function beforeDestroy () {
    this.scrollContainer.removeEventListener('scroll', this.poll);
  }
};

var QInnerLoading = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return (_vm.visible)?_c('div',{staticClass:"q-inner-loading animate-fade absolute-full column items-center justify-center",class:{dark: _vm.dark}},[_vm._t("default",[_c('q-spinner',{attrs:{"size":_vm.size}})])],2):_vm._e()},staticRenderFns: [],
  name: 'q-inner-loading',
  components: {
    QSpinner: QSpinner
  },
  props: {
    dark: Boolean,
    visible: Boolean,
    size: {
      type: Number,
      default: 42
    }
  }
};

var QKnob = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"q-knob non-selectable",class:{disabled: _vm.disable, 'cursor-pointer': !_vm.readonly},style:({width: _vm.size, height: _vm.size, color: _vm.color})},[_c('div',{directives:[{name:"touch-pan",rawName:"v-touch-pan",value:(_vm.__pan),expression:"__pan"}],on:{"click":_vm.__onInput}},[_c('svg',{attrs:{"viewBox":"0 0 100 100"}},[_c('path',{attrs:{"d":"M 50,50 m 0,-47\n           a 47,47 0 1 1 0,94\n           a 47,47 0 1 1 0,-94","stroke":_vm.trackColor,"stroke-width":_vm.lineWidth,"fill-opacity":"0"}}),_c('path',{style:(_vm.svgStyle),attrs:{"stroke-linecap":"round","fill-opacity":"0","d":"M 50,50 m 0,-47\n           a 47,47 0 1 1 0,94\n           a 47,47 0 1 1 0,-94","stroke":"currentColor","stroke-width":_vm.lineWidth}})]),_c('div',{staticClass:"q-knob-label row items-center justify-center content-center"},[(!_vm.$slots.default)?_c('span',[_vm._v(_vm._s(_vm.value))]):_vm._t("default")],2)])])},staticRenderFns: [],
  name: 'q-knob',
  directives: {
    TouchPan: TouchPan
  },
  props: {
    value: {
      type: Number,
      required: true
    },
    min: {
      type: Number,
      default: 0
    },
    max: {
      type: Number,
      default: 100
    },
    color: String,
    trackColor: {
      type: String,
      default: '#ececec'
    },
    lineWidth: {
      type: String,
      default: '6px'
    },
    size: {
      type: String,
      default: '100px'
    },
    step: {
      type: Number,
      default: 1
    },
    disable: Boolean,
    readonly: Boolean
  },
  computed: {
    svgStyle: function svgStyle () {
      return {
        'stroke-dasharray': '295.31px, 295.31px',
        'stroke-dashoffset': (295.31 * (1.0 - (this.value - this.min) / (this.max - this.min))) + 'px',
        'transition': this.dragging ? '' : 'stroke-dashoffset 0.6s ease 0s, stroke 0.6s ease'
      }
    },
    editable: function editable () {
      return !this.disable && !this.readonly
    }
  },
  data: function data () {
    return {
      dragging: false
    }
  },
  watch: {
    value: function value (value$1) {
      if (value$1 < this.min) {
        this.$emit('input', this.min);
      }
      else if (value$1 > this.max) {
        this.$emit('input', this.max);
      }
    }
  },
  methods: {
    __pan: function __pan (event) {
      if (!this.editable) {
        return
      }
      if (event.isFinal) {
        this.__dragStop(event.evt);
      }
      else if (event.isFirst) {
        this.__dragStart(event.evt);
      }
      else {
        this.__dragMove(event.evt);
      }
    },
    __dragStart: function __dragStart (ev) {
      if (!this.editable) {
        return
      }
      ev.stopPropagation();
      ev.preventDefault();

      this.centerPosition = this.__getCenter();

      this.dragging = true;
      this.__onInput(ev);
    },
    __dragMove: function __dragMove (ev) {
      if (!this.dragging || !this.editable) {
        return
      }
      ev.stopPropagation();
      ev.preventDefault();
      this.__onInput(ev, this.centerPosition);
    },
    __dragStop: function __dragStop (ev) {
      if (!this.editable) {
        return
      }
      ev.stopPropagation();
      ev.preventDefault();
      this.dragging = false;
    },
    __onInput: function __onInput (ev, center) {
      if ( center === void 0 ) center = this.__getCenter();

      if (!this.editable) {
        return
      }
      var
        pos = position(ev),
        height$$1 = Math.abs(pos.top - center.top),
        distance = Math.sqrt(
          Math.pow(Math.abs(pos.top - center.top), 2) +
          Math.pow(Math.abs(pos.left - center.left), 2)
        ),
        angle = Math.asin(height$$1 / distance) * (180 / Math.PI);

      if (pos.top < center.top) {
        angle = center.left < pos.left ? 90 - angle : 270 + angle;
      }
      else {
        angle = center.left < pos.left ? angle + 90 : 270 - angle;
      }

      var
        model = this.min + (angle / 360) * (this.max - this.min),
        modulo = model % this.step;

      this.$emit('input', between(
        model - modulo + (Math.abs(modulo) >= this.step / 2 ? (modulo < 0 ? -1 : 1) * this.step : 0),
        this.min,
        this.max
      ));
    },
    __getCenter: function __getCenter () {
      var knobOffset = offset(this.$el);
      return {
        top: knobOffset.top + height(this.$el) / 2,
        left: knobOffset.left + width(this.$el) / 2
      }
    }
  }
};

var QLabel = {
  name: 'q-label',
  functional: true,
  render: function render (h, ctx) {
    var
      data = ctx.data,
      classes = data.staticClass;

    data.staticClass = (classes ? classes + ' ' : '') + "q-label row inline items-center no-wrap";
    return h('label', data, ctx.children)
  }
};

var SideMixin = {
  methods: {
    toggleLeft: function toggleLeft (fn) {
      this.__toggle('left', fn);
    },
    toggleRight: function toggleRight (fn) {
      this.__toggle('right', fn);
    },
    showLeft: function showLeft (fn) {
      this.__show('left', fn);
    },
    showRight: function showRight (fn) {
      this.__show('right', fn);
    },
    hideLeft: function hideLeft (fn) {
      this.__hide('left', fn);
    },
    hideRight: function hideRight (fn) {
      this.__hide('right', fn);
    },
    hideCurrentSide: function hideCurrentSide (fn) {
      if (this.leftState.openedSmall) {
        this.hideLeft(fn);
      }
      else if (this.rightState.openedSmall) {
        this.hideRight(fn);
      }
      else if (typeof fn === 'function') {
        fn();
      }
    },

    __toggle: function __toggle (side) {
      var state = this[side + 'State'];
      if (state.openedSmall || (this[side + 'OverBreakpoint'] && state.openedBig)) {
        this.__hide(side);
      }
      else {
        this.__show(side);
      }
    },
    __popState: function __popState () {
      if (this.$q.platform.has.popstate && window.history.state && window.history.state.__quasar_layout_overlay) {
        window.removeEventListener('popstate', this.__popState);
        this.__hideSmall(this.popStateCallback);
        this.popStateCallback = null;
      }
    },
    __hideSmall: function __hideSmall (fn) {
      this.rightState.openedSmall = false;
      this.leftState.openedSmall = false;
      this.backdrop.percentage = 0;
      if (typeof fn === 'function') {
        setTimeout(fn, 310);
      }
    },
    __hide: function __hide (side, fn) {
      if (typeof side !== 'string') {
        if (this.backdrop.touchEvent) {
          this.backdrop.touchEvent = false;
          return
        }
        side = this.leftState.openedSmall ? 'left' : 'right';
      }

      var state = this[side + 'State'];

      if (!state.openedSmall) {
        state.openedBig = false;
        return
      }

      document.body.classList.remove('with-layout-side-opened');
      if (this.$q.platform.has.popstate) {
        this.popStateCallback = fn;
        if (window.history.state && !window.history.state.__quasar_layout_overlay) {
          window.history.go(-1);
        }
      }
      else {
        this.__hideSmall(fn);
      }
    },
    __show: function __show (side, fn) {
      var state = this[side + 'State'];
      if (this[side + 'OverBreakpoint']) {
        state.openedBig = true;
        if (typeof fn === 'function') {
          fn();
        }
        return
      }

      if (!this.$slots[side]) {
        return
      }

      if (this.$q.platform.has.popstate) {
        if (!window.history.state) {
          window.history.replaceState({__quasar_layout_overlay: true}, '');
        }
        else {
          window.history.state.__quasar_layout_overlay = true;
        }
        var hist = window.history.state || {};
        hist.__quasar_layout_overlay = true;
        window.history.replaceState(hist, '');
        window.history.pushState({}, '');
        window.addEventListener('popstate', this.__popState);
      }

      document.body.classList.add('with-layout-side-opened');
      state.openedSmall = true;
      this.backdrop.percentage = 1;
      if (typeof fn === 'function') {
        fn();
      }
    },
    __openLeftByTouch: function __openLeftByTouch (evt) {
      this.__openByTouch(evt, 'left');
    },
    __openRightByTouch: function __openRightByTouch (evt) {
      this.__openByTouch(evt, 'right', true);
    },
    __openByTouch: function __openByTouch (evt, side, right) {
      var
        width = this[side].w,
        position = between(evt.distance.x, 0, width),
        state = this[side + 'State'],
        withBackdrop = !this[side + 'OverBreakpoint'];

      if (evt.isFinal) {
        var opened = position >= Math.min(75, width);
        this.backdrop.inTransit = false;
        state.inTransit = false;
        if (opened) {
          this.__show(side);
        }
        else {
          this.backdrop.percentage = 0;
        }
        return
      }

      state.position = right
        ? Math.max(width - position, 0)
        : Math.min(0, position - width);

      if (withBackdrop) {
        this.backdrop.percentage = between(position / width, 0, 1);
      }

      if (evt.isFirst) {
        if (withBackdrop) {
          document.body.classList.add('with-layout-side-opened');
          this.backdrop.inTransit = side;
        }
        state.inTransit = true;
      }
    },
    __closeLeftByTouch: function __closeLeftByTouch (evt) {
      this.__closeByTouch(evt, 'left');
    },
    __closeRightByTouch: function __closeRightByTouch (evt) {
      this.__closeByTouch(evt, 'right', true);
    },
    __closeByTouch: function __closeByTouch (evt, side, right) {
      if (side === void 0) {
        right = this.rightState.openedSmall;
        side = right ? 'right' : 'left';
      }
      var
        width = this[side].w,
        state = this[side + 'State'];

      if (this[side + 'OnLayout']) {
        return
      }

      var position = evt.direction === side
        ? between(evt.distance.x, 0, width)
        : 0;

      if (evt.isFinal) {
        var opened = Math.abs(position) < Math.min(75, width);
        this.backdrop.inTransit = false;
        state.inTransit = false;
        if (!opened) {
          this.__hide(side);
        }
        else {
          this.backdrop.percentage = 1;
        }
        return
      }

      state.position = (right ? 1 : -1) * position;
      this.backdrop.percentage = between(1 + (right ? -1 : 1) * position / width, 0, 1);

      if (evt.isFirst) {
        this.backdrop.inTransit = true;
        state.inTransit = true;
        this.backdrop.touchEvent = true;
      }
    }
  }
};

function updateSize (obj, size) {
  if (obj.w !== size.width) {
    obj.w = size.width;
  }
  if (obj.h !== size.height) {
    obj.h = size.height;
  }
}

function updateObject (obj, data) {
  Object.keys(data).forEach(function (key) {
    if (obj[key] !== data[key]) {
      obj[key] = data[key];
    }
  });
}

var QLayout = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"layout"},[(!_vm.$q.platform.is.ios && _vm.$slots.left && !_vm.leftState.openedSmall && !_vm.leftOnLayout)?_c('div',{directives:[{name:"touch-pan",rawName:"v-touch-pan.horizontal",value:(_vm.__openLeftByTouch),expression:"__openLeftByTouch",modifiers:{"horizontal":true}}],staticClass:"layout-side-opener fixed-left"}):_vm._e(),(!_vm.$q.platform.is.ios && _vm.$slots.right && !_vm.rightState.openedSmall && !_vm.rightOnLayout)?_c('div',{directives:[{name:"touch-pan",rawName:"v-touch-pan.horizontal",value:(_vm.__openRightByTouch),expression:"__openRightByTouch",modifiers:{"horizontal":true}}],staticClass:"layout-side-opener fixed-right"}):_vm._e(),(_vm.$slots.left || _vm.$slots.right)?_c('div',{directives:[{name:"touch-pan",rawName:"v-touch-pan.horizontal",value:(_vm.__closeByTouch),expression:"__closeByTouch",modifiers:{"horizontal":true}}],ref:"backdrop",staticClass:"fullscreen layout-backdrop",class:{ 'transition-generic': !_vm.backdrop.inTransit, 'no-pointer-events': _vm.hideBackdrop, },style:({
      opacity: _vm.backdrop.percentage,
      hidden: _vm.hideBackdrop
    }),on:{"click":_vm.__hide}}):_vm._e(),(_vm.$slots.left)?_c('aside',{directives:[{name:"touch-pan",rawName:"v-touch-pan.horizontal",value:(_vm.__closeLeftByTouch),expression:"__closeLeftByTouch",modifiers:{"horizontal":true}}],staticClass:"layout-aside layout-aside-left scroll",class:_vm.computedLeftClass,style:(_vm.computedLeftStyle)},[_vm._t("left"),_c('q-resize-observable',{on:{"resize":_vm.onLeftAsideResize}})],2):_vm._e(),(_vm.$slots.right)?_c('aside',{directives:[{name:"touch-pan",rawName:"v-touch-pan.horizontal",value:(_vm.__closeRightByTouch),expression:"__closeRightByTouch",modifiers:{"horizontal":true}}],staticClass:"layout-aside layout-aside-right scroll",class:_vm.computedRightClass,style:(_vm.computedRightStyle)},[_vm._t("right"),_c('q-resize-observable',{on:{"resize":_vm.onRightAsideResize}})],2):_vm._e(),(_vm.$slots.header || (_vm.$q.theme !== 'ios' && _vm.$slots.navigation))?_c('header',{ref:"header",staticClass:"layout-header",class:_vm.computedHeaderClass,style:(_vm.computedHeaderStyle)},[_vm._t("header"),(_vm.$q.theme !== 'ios')?_vm._t("navigation"):_vm._e(),_c('q-resize-observable',{on:{"resize":_vm.onHeaderResize}})],2):_vm._e(),_c('div',{ref:"main",staticClass:"layout-page-container",style:(_vm.computedPageStyle)},[_c('main',{staticClass:"layout-page",class:_vm.pageClass,style:(_vm.mainStyle)},[_vm._t("default")],2)]),(_vm.$slots.footer || (_vm.$q.theme === 'ios' && _vm.$slots.navigation))?_c('footer',{ref:"footer",staticClass:"layout-footer",class:_vm.computedFooterClass,style:(_vm.computedFooterStyle)},[_vm._t("footer"),(_vm.$q.theme === 'ios')?_vm._t("navigation"):_vm._e(),_c('q-resize-observable',{on:{"resize":_vm.onFooterResize}})],2):_vm._e(),_c('q-scroll-observable',{on:{"scroll":_vm.onPageScroll}}),_c('q-resize-observable',{on:{"resize":_vm.onLayoutResize}}),_c('q-window-resize-observable',{on:{"resize":_vm.onWindowResize}})],1)},staticRenderFns: [],
  name: 'q-layout',
  components: {
    QResizeObservable: QResizeObservable,
    QWindowResizeObservable: QWindowResizeObservable,
    QScrollObservable: QScrollObservable
  },
  directives: {
    TouchPan: TouchPan
  },
  mixins: [SideMixin],
  model: {
    prop: 'sides'
  },
  props: {
    sides: {
      type: Object,
      validator: function (v) { return 'left' in v && 'right' in v; },
      default: function default$1 () {
        return {
          left: true,
          right: true
        }
      }
    },
    view: {
      type: String,
      default: 'hhh lpr fff',
      validator: function (v) { return /^(h|l)h(h|r) (l|p)p(r|p) (f|l)f(f|r)$/.test(v.toLowerCase()); }
    },
    reveal: Boolean,

    leftBreakpoint: {
      type: Number,
      default: 996
    },
    leftStyle: Object,
    leftClass: Object,

    rightBreakpoint: {
      type: Number,
      default: 996
    },
    rightStyle: Object,
    rightClass: Object,

    headerStyle: Object,
    headerClass: Object,

    footerStyle: Object,
    footerClass: Object,

    pageStyle: Object,
    pageClass: Object
  },
  data: function data () {
    return {
      headerOnScreen: true,

      header: {h: 0, w: 0},
      left: {h: 0, w: 0},
      right: {h: 0, w: 0},
      footer: {h: 0, w: 0},
      layout: {h: 0, w: 0},

      scroll: {
        position: 0,
        direction: '',
        directionChanged: false,
        inflexionPosition: 0,
        scrollHeight: 0
      },

      backdrop: {
        inTransit: false,
        touchEvent: false,
        percentage: 0
      },

      leftState: {
        position: 0,
        inTransit: false,
        openedSmall: false,
        openedBig: this.sides.left
      },
      rightState: {
        position: 0,
        inTransit: false,
        openedSmall: false,
        openedBig: this.sides.right
      }
    }
  },
  provide: function provide () {
    return {
      layout: this
    }
  },
  watch: {
    sides: {
      deep: true,
      handler: function handler (val) {
        if (val.left !== this.leftState.openedBig) {
          this.leftState.openedBig = val.left;
        }
        if (val.right !== this.rightState.openedBig) {
          this.rightState.openedBig = val.right;
        }
      }
    },
    'leftState.openedBig': function leftState_openedBig (v) {
      this.$emit('input', {
        left: v,
        right: this.rightState.openedBig
      });
    },
    'rightState.openedBig': function rightState_openedBig (v) {
      this.$emit('input', {
        left: this.leftState.openedBig,
        right: v
      });
    },
    leftOverBreakpoint: function leftOverBreakpoint (v) {
      this.$emit('left-breakpoint', v);
    },
    rightOverBreakpoint: function rightOverBreakpoint (v) {
      this.$emit('right-breakpoint', v);
    }
  },
  computed: {
    leftOverBreakpoint: function leftOverBreakpoint () {
      return !this.leftState.openedSmall && this.layout.w >= this.leftBreakpoint
    },
    leftOnLayout: function leftOnLayout () {
      return this.leftOverBreakpoint && this.leftState.openedBig
    },
    rightOverBreakpoint: function rightOverBreakpoint () {
      return !this.rightState.openedSmall && this.layout.w >= this.rightBreakpoint
    },
    rightOnLayout: function rightOnLayout () {
      return this.rightOverBreakpoint && this.rightState.openedBig
    },
    hideBackdrop: function hideBackdrop () {
      return !this.backdrop.inTransit && !this.leftState.openedSmall && !this.rightState.openedSmall
    },
    fixed: function fixed () {
      return {
        header: this.reveal || this.view.indexOf('H') > -1,
        footer: this.view.indexOf('F') > -1,
        left: this.view.indexOf('L') > -1,
        right: this.view.indexOf('R') > -1
      }
    },
    rows: function rows () {
      var rows = this.view.toLowerCase().split(' ');
      return {
        top: rows[0].split(''),
        middle: rows[1].split(''),
        bottom: rows[2].split('')
      }
    },
    computedPageStyle: function computedPageStyle () {
      var
        view = this.rows,
        css$$1 = {};

      if (!view.top.includes('p') && this.fixed.header) {
        css$$1.paddingTop = this.header.h + 'px';
      }
      if (!view.bottom.includes('p') && this.fixed.footer) {
        css$$1.paddingBottom = this.footer.h + 'px';
      }
      if (view.middle[0] !== 'p' && this.leftOnLayout) {
        css$$1.paddingLeft = this.left.w + 'px';
      }
      if (view.middle[2] !== 'p' && this.rightOnLayout) {
        css$$1.paddingRight = this.right.w + 'px';
      }

      return css$$1
    },
    mainStyle: function mainStyle () {
      var css$$1 = {
        minHeight: ("calc(100vh - " + (this.header.h + this.footer.h) + "px)")
      };

      return this.pageStyle
        ? extend({}, this.pageStyle, css$$1)
        : css$$1
    },
    showHeader: function showHeader () {
      return this.headerOnScreen || !this.reveal
    },
    computedHeaderStyle: function computedHeaderStyle () {
      var
        view = this.rows,
        css$$1 = this.showHeader
          ? {}
          : cssTransform(("translateY(" + (-this.header.h) + "px)"));

      if (view.top[0] === 'l' && this.leftOnLayout) {
        css$$1.marginLeft = this.left.w + 'px';
      }
      if (view.top[2] === 'r' && this.rightOnLayout) {
        css$$1.marginRight = this.right.w + 'px';
      }

      return this.headerStyle
        ? extend({}, this.headerStyle, css$$1)
        : css$$1
    },
    computedFooterStyle: function computedFooterStyle () {
      var
        view = this.rows,
        css$$1 = {};

      if (view.bottom[0] === 'l' && this.leftOnLayout) {
        css$$1.marginLeft = this.left.w + 'px';
      }
      if (view.bottom[2] === 'r' && this.rightOnLayout) {
        css$$1.marginRight = this.right.w + 'px';
      }

      return this.footerStyle
        ? extend({}, this.footerStyle, css$$1)
        : css$$1
    },
    computedLeftClass: function computedLeftClass () {
      var classes = {
        'fixed': this.fixed.left || !this.leftOnLayout,
        'on-top': !this.leftOverBreakpoint || this.leftState.inTransit,
        'transition-generic': !this.leftState.inTransit,
        'top-padding': this.fixed.left || this.rows.top[0] === 'l'
      };

      return this.leftClass
        ? extend({}, this.leftClass, classes)
        : classes
    },
    computedRightClass: function computedRightClass () {
      var classes = {
        'fixed': this.fixed.right || !this.rightOnLayout,
        'on-top': !this.rightOverBreakpoint || this.rightState.inTransit,
        'transition-generic': !this.rightState.inTransit,
        'top-padding': this.fixed.right || this.rows.top[2] === 'r'
      };

      return this.rightClass
        ? extend({}, this.rightClass, classes)
        : classes
    },
    computedHeaderClass: function computedHeaderClass () {
      var classes = {'fixed-top': this.fixed.header};
      return this.headerClass
        ? extend({}, this.headerClass, classes)
        : classes
    },
    computedFooterClass: function computedFooterClass () {
      var classes = {'fixed-bottom': this.fixed.footer};
      return this.footerClass
        ? extend({}, this.footerClass, classes)
        : classes
    },
    offsetTop: function offsetTop () {
      return !this.fixed.header
        ? this.header.h - this.scroll.position
        : 0
    },
    offsetBottom: function offsetBottom () {
      if (!this.fixed.footer) {
        var translate = this.scroll.scrollHeight - this.layout.h - this.scroll.position - this.footer.h;
        if (translate < 0) {
          return translate
        }
      }
    },
    computedLeftStyle: function computedLeftStyle () {
      if (!this.leftOnLayout) {
        var style$$1 = this.leftState.inTransit
          ? cssTransform(("translateX(" + (this.leftState.position) + "px)"))
          : cssTransform(("translateX(" + (this.leftState.openedSmall ? 0 : '-100%') + ")"));

        return this.leftStyle
          ? extend({}, this.leftStyle, style$$1)
          : style$$1
      }

      var
        view = this.rows,
        css$$1 = {};

      if (view.top[0] !== 'l') {
        if (this.fixed.left && this.offsetTop) {
          css$$1.top = Math.max(0, this.offsetTop) + 'px';
        }
        else if (this.showHeader) {
          css$$1.top = this.header.h + 'px';
        }
      }
      if (view.bottom[0] !== 'l') {
        if (this.fixed.footer || !this.fixed.left) {
          css$$1.bottom = this.footer.h + 'px';
        }
        else if (this.offsetBottom) {
          css$$1.bottom = -this.offsetBottom + 'px';
        }
      }

      return this.leftStyle
        ? extend({}, this.leftStyle, css$$1)
        : css$$1
    },
    computedRightStyle: function computedRightStyle () {
      if (!this.rightOnLayout) {
        var style$$1 = this.rightState.inTransit
          ? cssTransform(("translateX(" + (this.rightState.position) + "px)"))
          : cssTransform(("translateX(" + (this.rightState.openedSmall ? 0 : '100%') + ")"));

        return this.rightStyle
          ? extend({}, this.rightStyle, style$$1)
          : style$$1
      }

      var
        view = this.rows,
        css$$1 = {};

      if (view.top[2] !== 'r') {
        if (this.fixed.right && this.offsetTop) {
          css$$1.top = Math.max(0, this.offsetTop) + 'px';
        }
        else if (this.showHeader) {
          css$$1.top = this.header.h + 'px';
        }
      }
      if (view.bottom[2] !== 'r') {
        if (this.fixed.footer || !this.fixed.right) {
          css$$1.bottom = this.footer.h + 'px';
        }
        else if (this.offsetBottom) {
          css$$1.bottom = -this.offsetBottom + 'px';
        }
      }

      return this.rightStyle
        ? extend({}, this.rightStyle, css$$1)
        : css$$1
    }
  },
  methods: {
    onHeaderResize: function onHeaderResize (size) {
      updateSize(this.header, size);
    },
    onFooterResize: function onFooterResize (size) {
      updateSize(this.footer, size);
    },
    onLeftAsideResize: function onLeftAsideResize (size) {
      updateSize(this.left, size);
    },
    onRightAsideResize: function onRightAsideResize (size) {
      updateSize(this.right, size);
    },
    onLayoutResize: function onLayoutResize () {
      updateObject(this.scroll, {scrollHeight: getScrollHeight(this.$el)});
    },
    onWindowResize: function onWindowResize (size) {
      updateSize(this.layout, size);
      this.$emit('resize', size);
    },
    onPageScroll: function onPageScroll (data) {
      updateObject(this.scroll, data);

      if (this.reveal) {
        var visible = !(
          data.position > this.header.h &&
          data.direction === 'down' && data.position - data.inflexionPosition >= 100
        );

        if (this.headerOnScreen !== visible) {
          this.headerOnScreen = visible;
        }
      }

      this.$emit('scroll', data);
    }
  }
};

var sides = ['top', 'right', 'bottom', 'left'];

var QFixedPosition = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"z-fixed",class:[("fixed-" + (_vm.corner))],style:(_vm.style)},[_vm._t("default")],2)},staticRenderFns: [],
  name: 'q-fixed-position',
  props: {
    corner: {
      type: String,
      default: 'bottom-right',
      validator: function (v) { return ['top-right', 'top-left', 'bottom-right', 'bottom-left'].includes(v); }
    },
    offset: {
      type: Object,
      default: function () { return ({}); }
    }
  },
  inject: ['layout'],
  computed: {
    animated: function animated () {
      return this.pos.top && this.layout.reveal
    },
    pos: function pos () {
      return {
        top: this.corner.indexOf('top') > -1,
        right: this.corner.indexOf('right') > -1,
        bottom: this.corner.indexOf('bottom') > -1,
        left: this.corner.indexOf('left') > -1
      }
    },
    style: function style$$1 () {
      var this$1 = this;

      var
        css$$1 = extend({}, this.offset),
        layout = this.layout,
        page = layout.computedPageStyle;

      if (this.animated && !layout.showHeader) {
        extend(css$$1, cssTransform(("translateY(" + (-layout.header.h) + "px)")));
      }
      else if (this.pos.top && layout.offsetTop) {
        if (layout.offsetTop > 0) {
          extend(css$$1, cssTransform(("translateY(" + (layout.offsetTop) + "px)")));
        }
      }
      else if (this.pos.bottom && layout.offsetBottom) {
        extend(css$$1, cssTransform(("translateY(" + (layout.offsetBottom) + "px)")));
      }

      sides.forEach(function (side) {
        var prop = "padding" + (side.charAt(0).toUpperCase() + side.slice(1));
        if (this$1.pos[side] && page[prop]) {
          css$$1[side] = css$$1[side] ? ("calc(" + (page[prop]) + " + " + (css$$1[side]) + ")") : page[prop];
        }
      });

      return css$$1
    }
  }
};

var routerLinkEventName = 'qrouterlinkclick';

var evt;

try {
  evt = new Event(routerLinkEventName);
}
catch (e) {
  // IE doesn't support `new Event()`, so...`
  evt = document.createEvent('Event');
  evt.initEvent(routerLinkEventName, true, false);
}

var RouterLinkMixin = {
  props: {
    to: [String, Object],
    exact: Boolean,
    append: Boolean,
    replace: Boolean
  },
  data: function data () {
    return {
      routerLinkEventName: routerLinkEventName
    }
  }
};

var QSideLink = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('router-link',{directives:[{name:"ripple",rawName:"v-ripple.mat",modifiers:{"mat":true}}],ref:"link",attrs:{"tag":_vm.tag,"to":_vm.to,"exact":_vm.exact,"append":_vm.append,"replace":_vm.replace,"event":_vm.routerLinkEventName},nativeOn:{"click":function($event){_vm.trigger($event);}}},[_vm._t("default")],2)},staticRenderFns: [],
  name: 'q-side-link',
  directives: {
    Ripple: Ripple
  },
  mixins: [RouterLinkMixin],
  props: {
    tag: {
      type: String,
      default: 'div'
    }
  },
  inject: ['layout'],
  methods: {
    trigger: function trigger () {
      var this$1 = this;

      this.layout.hideCurrentSide(function () {
        this$1.$el.dispatchEvent(evt);
      });
    }
  }
};

var QOptionGroup = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"q-option-group group",class:{'q-option-group-inline-opts': _vm.inline}},_vm._l((_vm.options),function(opt,index){return _c('div',{staticClass:"no-wrap row items-center"},[_c('q-label',[_c(_vm.component,{tag:"component",attrs:{"val":opt.value,"disable":_vm.disable,"color":opt.color || _vm.color,"checked-icon":opt.checkedIcon,"unchecked-icon":opt.uncheckedIcon},on:{"focus":function($event){_vm.$emit('focus');},"blur":function($event){_vm.$emit('blur');}},model:{value:(_vm.model),callback:function ($$v) {_vm.model=$$v;},expression:"model"}}),_c('span',{staticClass:"col"},[_vm._v(_vm._s(opt.label))])],1)],1)}))},staticRenderFns: [],
  name: 'q-option-group',
  components: {
    QRadio: QRadio,
    QCheckbox: QCheckbox,
    QToggle: QToggle,
    QLabel: QLabel
  },
  props: {
    value: {
      required: true
    },
    type: {
      default: 'radio',
      validator: function validator (val) {
        return ['radio', 'checkbox', 'toggle'].includes(val)
      }
    },
    color: String,
    options: {
      type: Array,
      validator: function validator (opts) {
        return opts.every(function (opt) { return 'value' in opt && 'label' in opt; })
      }
    },
    inline: Boolean,
    disable: Boolean
  },
  created: function created () {
    var isArray = Array.isArray(this.value);
    if (this.type === 'radio') {
      if (isArray) {
        console.error('q-radio: model should not be array');
      }
    }
    else if (!isArray) {
      console.error('q-radio: model should be array');
    }
  },
  computed: {
    component: function component () {
      return ("q-" + (this.type))
    },
    model: {
      get: function get () {
        return this.value
      },
      set: function set (value) {
        this.$emit('input', value);
      }
    }
  }
};

var QParallax = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"q-parallax",style:({height: _vm.height + 'px'})},[_c('div',{staticClass:"q-parallax-image absolute-full"},[_c('img',{ref:"img",class:{ready: _vm.imageHasBeenLoaded},attrs:{"src":_vm.src},on:{"load":function($event){_vm.__processImage();}}})]),_c('div',{staticClass:"q-parallax-text absolute-full column items-center justify-center"},[(!_vm.imageHasBeenLoaded)?_vm._t("loading"):_vm._t("default")],2)])},staticRenderFns: [],
  name: 'q-parallax',
  props: {
    src: {
      type: String,
      required: true
    },
    height: {
      type: Number,
      default: 500
    },
    speed: {
      type: Number,
      default: 1,
      validator: function validator (value) {
        return value >= 0 && value <= 1
      }
    }
  },
  data: function data () {
    return {
      imageHasBeenLoaded: false,
      scrolling: false
    }
  },
  watch: {
    src: function src () {
      this.imageHasBeenLoaded = false;
    },
    height: function height$$1 () {
      this.__updatePos();
    }
  },
  methods: {
    __processImage: function __processImage () {
      this.imageHasBeenLoaded = true;
      this.__onResize();
    },
    __onResize: function __onResize () {
      if (!this.imageHasBeenLoaded || !this.scrollTarget) {
        return
      }

      if (this.scrollTarget === window) {
        this.viewportHeight = viewport().height;
      }
      this.imageHeight = height(this.image);
      this.__updatePos();
    },
    __updatePos: function __updatePos () {
      if (!this.imageHasBeenLoaded) {
        return
      }

      var containerTop, containerHeight, containerBottom, top, bottom;

      if (this.scrollTarget === window) {
        containerTop = 0;
        containerHeight = this.viewportHeight;
        containerBottom = containerHeight;
      }
      else {
        containerTop = offset(this.scrollTarget).top;
        containerHeight = height(this.scrollTarget);
        containerBottom = containerTop + containerHeight;
      }
      top = offset(this.container).top;
      bottom = top + this.height;

      if (bottom > containerTop && top < containerBottom) {
        var percentScrolled = (containerBottom - top) / (this.height + containerHeight);
        this.__setPos(Math.round((this.imageHeight - this.height) * percentScrolled * this.speed));
      }
    },
    __setPos: function __setPos (offset$$1) {
      css(this.$refs.img, cssTransform(("translate3D(-50%," + offset$$1 + "px, 0)")));
    }
  },
  created: function created () {
    this.__setPos = frameDebounce(this.__setPos);
  },
  mounted: function mounted () {
    var this$1 = this;

    this.$nextTick(function () {
      this$1.container = this$1.$el;
      this$1.image = this$1.$refs.img;

      this$1.scrollTarget = getScrollTarget(this$1.$el);
      this$1.resizeHandler = debounce(this$1.__onResize, 50);

      window.addEventListener('resize', this$1.resizeHandler);
      this$1.scrollTarget.addEventListener('scroll', this$1.__updatePos);
      this$1.__onResize();
    });
  },
  beforeDestroy: function beforeDestroy () {
    window.removeEventListener('resize', this.resizeHandler);
    this.scrollTarget.removeEventListener('scroll', this.__updatePos);
  }
};

var QPullToRefresh = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"pull-to-refresh"},[_c('div',{directives:[{name:"touch-pan",rawName:"v-touch-pan.vertical.scroll",value:(_vm.__pull),expression:"__pull",modifiers:{"vertical":true,"scroll":true}}],staticClass:"pull-to-refresh-container",style:(_vm.style)},[_c('div',{staticClass:"pull-to-refresh-message row items-center justify-center"},[_c('q-icon',{directives:[{name:"show",rawName:"v-show",value:(_vm.state !== 'refreshing'),expression:"state !== 'refreshing'"}],class:{'rotate-180': _vm.state === 'pulled'},attrs:{"name":"arrow_downward"}}),_c('q-icon',{directives:[{name:"show",rawName:"v-show",value:(_vm.state === 'refreshing'),expression:"state === 'refreshing'"}],staticClass:"animate-spin",attrs:{"name":_vm.refreshIcon}}),_vm._v("   "),_c('span',{domProps:{"innerHTML":_vm._s(_vm.message)}})],1),_vm._t("default")],2)])},staticRenderFns: [],
  name: 'q-pull-to-refresh',
  components: {
    QIcon: QIcon
  },
  props: {
    handler: {
      type: Function,
      required: true
    },
    distance: {
      type: Number,
      default: 35
    },
    pullMessage: {
      type: String,
      default: 'Pull down to refresh'
    },
    releaseMessage: {
      type: String,
      default: 'Release to refresh'
    },
    refreshMessage: {
      type: String,
      default: 'Refreshing...'
    },
    refreshIcon: {
      type: String,
      default: 'refresh'
    },
    inline: Boolean,
    disable: Boolean
  },
  data: function data () {
    var height$$1 = 65;

    return {
      state: 'pull',
      pullPosition: -height$$1,
      height: height$$1,
      animating: false,
      pulling: false,
      scrolling: false
    }
  },
  computed: {
    message: function message () {
      switch (this.state) {
        case 'pulled':
          return this.releaseMessage
        case 'refreshing':
          return this.refreshMessage
        case 'pull':
        default:
          return this.pullMessage
      }
    },
    style: function style$$1 () {
      return cssTransform(("translateY(" + (this.pullPosition) + "px)"))
    }
  },
  methods: {
    __pull: function __pull (event) {
      if (this.disable) {
        return
      }

      if (event.isFinal) {
        if (this.scrolling) {
          this.scrolling = false;
          this.pulling = false;
          return
        }
        this.scrolling = false;
        this.pulling = false;

        if (this.state === 'pulled') {
          this.state = 'refreshing';
          this.__animateTo(0);
          this.trigger();
        }
        else if (this.state === 'pull') {
          this.__animateTo(-this.height);
        }
        return
      }
      if (this.animating || this.scrolling || this.state === 'refreshing') {
        return true
      }

      var top = getScrollPosition(this.scrollContainer);
      if (top !== 0 || (top === 0 && event.direction !== 'down')) {
        this.scrolling = true;
        if (this.pulling) {
          this.pulling = false;
          this.state = 'pull';
          this.__animateTo(-this.height);
        }
        return true
      }

      event.evt.preventDefault();
      this.pulling = true;
      this.pullPosition = -this.height + Math.max(0, Math.pow(event.distance.y, 0.85));
      this.state = this.pullPosition > this.distance ? 'pulled' : 'pull';
    },
    __animateTo: function __animateTo (target, done, previousCall) {
      var this$1 = this;

      if (!previousCall && this.animationId) {
        cancelAnimationFrame(this.animating);
      }

      this.pullPosition -= (this.pullPosition - target) / 7;

      if (this.pullPosition - target > 1) {
        this.animating = window.requestAnimationFrame(function () {
          this$1.__animateTo(target, done, true);
        });
      }
      else {
        this.animating = window.requestAnimationFrame(function () {
          this$1.pullPosition = target;
          this$1.animating = false;
          done && done();
        });
      }
    },
    trigger: function trigger () {
      var this$1 = this;

      this.handler(function () {
        this$1.__animateTo(-this$1.height, function () {
          this$1.state = 'pull';
        });
      });
    }
  },
  mounted: function mounted () {
    var this$1 = this;

    this.$nextTick(function () {
      this$1.scrollContainer = this$1.inline ? this$1.$el.parentNode : getScrollTarget(this$1.$el);
    });
  }
};

var QScrollArea = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return (_vm.$q.platform.is.desktop)?_c('div',{staticClass:"q-scrollarea scroll relative-position overflow-hidden",on:{"mousewheel":_vm.__mouseWheel,"dommousescroll":_vm.__mouseWheel,"mouseenter":function($event){_vm.hover = true;},"mouseleave":function($event){_vm.hover = false;}}},[_c('div',{directives:[{name:"touch-pan",rawName:"v-touch-pan.vertical.nomouse",value:(_vm.__panContainer),expression:"__panContainer",modifiers:{"vertical":true,"nomouse":true}}],staticClass:"absolute",style:(_vm.mainStyle)},[_vm._t("default"),_c('q-resize-observable',{on:{"resize":_vm.__updateScrollHeight}}),_c('q-scroll-observable',{on:{"scroll":_vm.__updateScroll}})],2),_c('q-resize-observable',{on:{"resize":_vm.__updateContainer}}),_c('div',{directives:[{name:"touch-pan",rawName:"v-touch-pan.vertical",value:(_vm.__panThumb),expression:"__panThumb",modifiers:{"vertical":true}}],staticClass:"q-scrollarea-thumb absolute-right",class:{'invisible-thumb': _vm.thumbHidden},style:(_vm.style)})],1):_c('div',{staticClass:"scroll relative-position",style:(_vm.contentStyle)},[_vm._t("default")],2)},staticRenderFns: [],
  name: 'q-scroll-area',
  components: {
    QResizeObservable: QResizeObservable,
    QScrollObservable: QScrollObservable
  },
  directives: {
    TouchPan: TouchPan
  },
  props: {
    thumbStyle: {
      type: Object,
      default: function () { return ({}); }
    },
    contentStyle: {
      type: Object,
      default: function () { return ({}); }
    },
    contentActiveStyle: {
      type: Object,
      default: function () { return ({}); }
    },
    thumbWidth: {
      type: Number,
      default: 10
    },
    delay: {
      type: Number,
      default: 1000
    }
  },
  data: function data () {
    return {
      active: false,
      hover: false,
      containerHeight: 0,
      scrollPosition: 0,
      scrollHeight: 0
    }
  },
  computed: {
    thumbHidden: function thumbHidden () {
      return this.thumbHeight >= this.scrollHeight || (!this.active && !this.hover)
    },
    thumbHeight: function thumbHeight () {
      return Math.round(Math.max(20, this.containerHeight * this.containerHeight / this.scrollHeight))
    },
    style: function style () {
      var top = Math.min(
        this.scrollPosition + (this.scrollPercentage * (this.containerHeight - this.thumbHeight)),
        this.scrollHeight - this.thumbHeight
      );
      return extend({}, this.thumbStyle, {
        top: (top + "px"),
        height: ((this.thumbHeight) + "px")
      })
    },
    mainStyle: function mainStyle () {
      return this.thumbHidden ? this.contentStyle : this.contentActiveStyle
    },
    scrollPercentage: function scrollPercentage () {
      var p = between(this.scrollPosition / (this.scrollHeight - this.containerHeight), 0, 1);
      return Math.round(p * 10000) / 10000
    }
  },
  methods: {
    __updateContainer: function __updateContainer (size) {
      if (this.containerHeight !== size.height) {
        this.containerHeight = size.height;
        this.__setActive(true, true);
      }
    },
    __updateScroll: function __updateScroll (scroll) {
      if (this.scrollPosition !== scroll.position) {
        this.scrollPosition = scroll.position;
        this.__setActive(true, true);
      }
    },
    __updateScrollHeight: function __updateScrollHeight (ref) {
      var height = ref.height;

      if (this.scrollHeight !== height) {
        this.scrollHeight = height;
        this.__setActive(true, true);
      }
    },
    __panThumb: function __panThumb (e) {
      if (e.isFirst) {
        this.refPos = this.scrollPosition;
        this.__setActive(true, true);
      }
      if (e.isFinal) {
        this.__setActive(false);
      }

      var
        sign = (e.direction === 'down' ? 1 : -1),
        multiplier = (this.scrollHeight - this.containerHeight) / (this.containerHeight - this.thumbHeight);

      this.$el.scrollTop = this.refPos + sign * e.distance.y * multiplier;
    },
    __panContainer: function __panContainer (e) {
      if (e.evt.target.closest('.scroll') !== this.$el) {
        return
      }

      if (e.isFirst) {
        this.refPos = this.scrollPosition;
        this.__setActive(true, true);
      }
      if (e.isFinal) {
        this.__setActive(false);
      }

      var el = this.$el;
      el.scrollTop = this.refPos + (e.direction === 'down' ? -1 : 1) * e.distance.y;
      if (el.scrollTop > 0 && el.scrollTop + this.containerHeight < this.scrollHeight) {
        e.evt.preventDefault();
      }
    },
    __mouseWheel: function __mouseWheel (e) {
      var el = this.$el;
      if (e.target.closest('.scroll') !== el) {
        return
      }
      el.scrollTop += getMouseWheelDistance(e).pixelY;
      if (el.scrollTop > 0 && el.scrollTop + this.containerHeight < this.scrollHeight) {
        e.preventDefault();
      }
    },
    __setActive: function __setActive (active, timer) {
      clearTimeout(this.timer);
      if (active === this.active) {
        if (active && this.timer) {
          this.__startTimer();
        }
        return
      }

      if (active) {
        this.active = true;
        if (timer) {
          this.__startTimer();
        }
      }
      else {
        this.active = false;
      }
    },
    __startTimer: function __startTimer () {
      var this$1 = this;

      this.timer = setTimeout(function () {
        this$1.active = false;
        this$1.timer = null;
      }, this.delay);
    }
  }
};

var QStep = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{directives:[{name:"ripple",rawName:"v-ripple.mat",modifiers:{"mat":true}}],staticClass:"q-stepper-step row items-center",class:{ 'step-selected': _vm.selected, 'step-editable': _vm.editable || _vm.isEditable, 'step-done': _vm.done || _vm.isDone, 'step-error': _vm.error, },on:{"click":_vm.select}},[_c('div',{staticClass:"q-stepper-identity row items-center justify-center"},[(_vm.stepIcon)?_c('q-icon',{attrs:{"name":_vm.stepIcon}}):[_vm._v(_vm._s(_vm.step))]],2),_c('div',{staticClass:"q-stepper-label column"},[_vm._t("default")],2)])},staticRenderFns: [],
  name: 'q-step',
  components: {
    QIcon: QIcon
  },
  directives: {
    Ripple: Ripple
  },
  props: {
    step: {
      type: [Number, String],
      required: true
    },
    done: Boolean,
    editable: Boolean,
    icon: String,
    error: Boolean
  },
  inject: ['data', 'goToStep', 'registerStep', 'unregisterStep'],
  data: function data () {
    return {
      isEditable: false,
      isDone: false
    }
  },
  computed: {
    selected: function selected () {
      return this.data.step === this.step
    },
    stepIcon: function stepIcon () {
      if (this.selected && this.data.selectedIcon !== false) {
        return this.data.selectedIcon || 'edit'
      }
      if (this.error && this.data.errorIcon !== false) {
        return this.data.errorIcon || 'warning'
      }
      if (this.done && this.data.doneIcon !== false) {
        return this.data.doneIcon || 'check'
      }

      return this.icon
    }
  },
  methods: {
    select: function select () {
      if (this.editable || this.isEditable) {
        this.goToStep(this.step);
      }
    },
    setEditable: function setEditable (val) {
      if ( val === void 0 ) val = true;

      this.isEditable = val;
    },
    setDone: function setDone (val) {
      if ( val === void 0 ) val = true;

      this.done = val;
    }
  },
  mounted: function mounted () {
    this.registerStep(this);
  },
  beforeDestroy: function beforeDestroy () {
    this.unregisterStep(this);
  }
};

var QStepPane = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"q-stepper-pane",class:{hidden: _vm.hidden}},[(_vm.active)?_c('div',{staticClass:"q-stepper-inner"},[_vm._t("default")],2):_vm._e()])},staticRenderFns: [],
  name: 'q-step-pane',
  props: {
    step: {
      type: [Number, String],
      required: true
    }
  },
  inject: ['data'],
  computed: {
    active: function active () {
      return this.data.step === this.step
    },
    hidden: function hidden () {
      return !this.data.vertical && !this.active
    }
  }
};

var QStepper = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"q-stepper shadow-1",class:{ vertical: _vm.data.vertical, horizontal: !_vm.data.vertical }},[_vm._t("default"),_c('q-inner-loading',{attrs:{"visible":_vm.loading,"size":50}})],2)},staticRenderFns: [],
  name: 'q-stepper',
  components: {
    QInnerLoading: QInnerLoading
  },
  props: {
    value: Number,
    loading: Boolean,
    doneIcon: {
      type: [String, Boolean],
      default: 'check'
    },
    selectedIcon: {
      type: [String, Boolean],
      default: 'edit'
    },
    errorIcon: {
      type: [String, Boolean],
      default: 'warning'
    }
  },
  watch: {
    value: function value (name) {
      this.goToStep(name);
    },
    doneIcon: function doneIcon (i) {
      this.data.doneIcon = i;
    },
    selectedIcon: function selectedIcon (i) {
      this.data.selectedIcon = i;
    },
    errorIcon: function errorIcon (i) {
      this.data.errorIcon = i;
    }
  },
  data: function data () {
    return {
      data: {
        step: null,
        vertical: true,
        doneIcon: this.doneIcon,
        selectedIcon: this.selectedIcon,
        errorIcon: this.errorIcon
      },
      steps: []
    }
  },
  provide: function provide () {
    return {
      data: this.data,
      goToStep: this.goToStep,
      setVerticality: this.__setVerticality,
      registerStep: this.__registerStep,
      unregisterStep: this.__unregisterStep
    }
  },
  methods: {
    goToStep: function goToStep (step) {
      if (this.data.step === step || step === void 0) {
        return
      }

      this.data.step = step;

      if (this.value !== step) {
        this.$emit('input', step);
        this.$emit('step', step);
      }
    },
    next: function next (step) {
      if (step) {
        this.goToStep(step);
        return
      }

      var index = this.__getStepIndex(this.data.step);
      if (index !== -1 && index + 1 < this.steps.length) {
        this.goToStep(this.steps[index + 1].step);
      }
    },
    previous: function previous () {
      var index = this.__getStepIndex(this.data.step);
      if (index !== -1 && index > 0) {
        this.goToStep(this.steps[index - 1].step);
      }
    },
    reset: function reset () {
      if (this.steps.length > 0) {
        this.goToStep(this.steps[0].name);
      }
    },

    __setVerticality: function __setVerticality (bool) {
      this.data.vertical = bool;
    },
    __registerStep: function __registerStep (vm) {
      this.steps.push(vm);
    },
    __unregisterStep: function __unregisterStep (vm) {
      this.steps.splice(this.steps.indexOf(vm), 1);
    },
    __getStepIndex: function __getStepIndex (step) {
      return this.steps.findIndex(function (vm) { return vm.step === step; })
    }
  },
  mounted: function mounted () {
    var this$1 = this;

    this.$nextTick(function () {
      if (this$1.value) {
        this$1.goToStep(this$1.value);
        return
      }
      this$1.reset();
    });
  }
};

var QStepperHeader = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"q-stepper-header row items-stretch justify-between wrap shadow-1",class:{'alternative-labels': _vm.alternativeLabels}},[_vm._t("default")],2)},staticRenderFns: [],
  name: 'q-stepper-header',
  props: {
    alternativeLabels: Boolean
  },
  inject: ['setVerticality'],
  mounted: function mounted () {
    this.setVerticality(false);
  },
  beforeDestroy: function beforeDestroy () {
    this.setVerticality(true);
  }
};

var QStepperNavigation = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"q-stepper-navigation row items-center"},[_vm._t("left"),_c('div',{staticClass:"auto"}),_vm._t("default")],2)},staticRenderFns: [],
  name: 'q-stepper-navigation'
};

var TabMixin = {
  props: {
    label: String,
    icon: String,
    disable: Boolean,
    hidden: Boolean,
    hide: {
      type: String,
      default: ''
    },
    name: {
      type: String,
      default: function default$1 () {
        return uid()
      }
    },
    alert: Boolean,
    count: [Number, String],
    color: String
  },
  inject: ['data', 'selectTab'],
  computed: {
    active: function active () {
      return this.data.tabName === this.name
    },
    classes: function classes () {
      var cls = {
        active: this.active,
        hidden: this.hidden,
        disabled: this.disable,
        'icon-and-label': this.icon && this.label,
        'hide-icon': this.hide === 'icon',
        'hide-label': this.hide === 'label'
      };

      var color = this.data.inverted
        ? this.color || this.data.color
        : this.color;

      if (color) {
        cls[("text-" + color)] = this.$q.theme === 'ios' ? this.active : true;
      }

      return cls
    },
    borderClasses: function borderClasses () {
      if (this.data.inverted && this.data.color) {
        return ("text-" + (this.data.color))
      }
    }
  }
};

var QRouteTab = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('router-link',{directives:[{name:"ripple",rawName:"v-ripple.mat",modifiers:{"mat":true}}],staticClass:"q-tab column items-center justify-center relative-position",class:_vm.classes,attrs:{"tag":"div","to":_vm.to,"replace":_vm.replace,"append":_vm.append,"exact":_vm.exact,"event":_vm.routerLinkEventName},nativeOn:{"click":function($event){_vm.select($event);}}},[(_vm.icon)?_c('q-icon',{staticClass:"q-tab-icon",attrs:{"name":_vm.icon}}):_vm._e(),(_vm.label)?_c('span',{staticClass:"q-tab-label",domProps:{"innerHTML":_vm._s(_vm.label)}}):_vm._e(),_vm._v(" "),(_vm.count)?_c('span',{staticClass:"floating label circular"},[_vm._v(_vm._s(_vm.count))]):(_vm.alert)?_c('div',{staticClass:"q-dot"}):_vm._e(),_vm._t("default"),_c('div',{staticClass:"q-tab-border",class:_vm.borderClasses})],2)},staticRenderFns: [],
  name: 'q-route-tab',
  components: {
    QIcon: QIcon
  },
  directives: {
    Ripple: Ripple
  },
  mixins: [TabMixin, RouterLinkMixin],
  watch: {
    $route: function $route () {
      this.checkIfSelected();
    }
  },
  methods: {
    select: function select () {
      if (!this.disable) {
        this.$el.dispatchEvent(evt);
        this.selectTab(this.name);
      }
    },
    checkIfSelected: function checkIfSelected () {
      var this$1 = this;

      this.$nextTick(function () {
        if (this$1.$el.classList.contains('router-link-active')) {
          this$1.selectTab(this$1.name);
        }
      });
    }
  },
  created: function created () {
    this.checkIfSelected();
  }
};

var QTab = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{directives:[{name:"ripple",rawName:"v-ripple.mat",modifiers:{"mat":true}}],staticClass:"q-tab column items-center justify-center relative-position",class:_vm.classes,on:{"click":_vm.select}},[(_vm.icon)?_c('q-icon',{staticClass:"q-tab-icon",attrs:{"name":_vm.icon}}):_vm._e(),(_vm.label)?_c('span',{staticClass:"q-tab-label",domProps:{"innerHTML":_vm._s(_vm.label)}}):_vm._e(),(_vm.count)?_c('q-chip',{attrs:{"floating":""}},[_vm._v(_vm._s(_vm.count))]):(_vm.alert)?_c('div',{staticClass:"q-dot"}):_vm._e(),_vm._t("default"),(_vm.$q.theme !== 'ios')?_c('div',{staticClass:"q-tab-border",class:_vm.borderClasses}):_vm._e()],2)},staticRenderFns: [],
  name: 'q-tab',
  components: {
    QIcon: QIcon
  },
  directives: {
    Ripple: Ripple
  },
  mixins: [TabMixin],
  props: {
    selected: Boolean
  },
  methods: {
    select: function select () {
      if (!this.disable) {
        this.selectTab(this.name);
      }
    }
  },
  mounted: function mounted () {
    if (this.selected && !this.disable) {
      this.select();
    }
  }
};

var QTabPane = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return (_vm.active)?_c('div',{staticClass:"q-tab-pane"},[_vm._t("default")],2):_vm._e()},staticRenderFns: [],
  name: 'q-tab-pane',
  props: {
    name: {
      type: String,
      required: true
    }
  },
  inject: ['data'],
  computed: {
    active: function active () {
      return this.data.tabName === this.name
    }
  }
};

var scrollNavigationSpeed = 5;
var debounceDelay = 50; // in ms

var QTabs = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"q-tabs column",class:[ ("q-tabs-position-" + (_vm.position)), ("q-tabs-" + (_vm.inverted ? 'inverted' : 'normal')), _vm.twoLines ? 'q-tabs-two-lines' : '' ]},[_c('div',{ref:"tabs",staticClass:"q-tabs-head row",class:( obj = {}, obj[("q-tabs-align-" + (_vm.align))] = true, obj[("bg-" + (_vm.color))] = !_vm.inverted && _vm.color, obj )},[_c('div',{ref:"scroller",staticClass:"q-tabs-scroller row no-wrap"},[_vm._t("title"),(_vm.$q.theme !== 'ios')?_c('div',{staticClass:"relative-position self-stretch"},[_c('div',{ref:"posbar",staticClass:"q-tabs-position-bar",class:( obj$1 = {}, obj$1[("text-" + (_vm.color))] = _vm.inverted && _vm.color, obj$1 ),on:{"transitionend":_vm.__updatePosbarTransition}})]):_vm._e()],2),_c('div',{ref:"leftScroll",staticClass:"row items-center justify-center q-tabs-left-scroll",on:{"mousedown":function($event){_vm.__animScrollTo(0);},"touchstart":function($event){_vm.__animScrollTo(0);},"mouseup":_vm.__stopAnimScroll,"touchend":_vm.__stopAnimScroll}},[_c('q-icon',{attrs:{"name":"chevron_left"}})],1),_c('div',{ref:"rightScroll",staticClass:"row items-center justify-center q-tabs-right-scroll",on:{"mousedown":function($event){_vm.__animScrollTo(9999);},"touchstart":function($event){_vm.__animScrollTo(9999);},"mouseup":_vm.__stopAnimScroll,"touchend":_vm.__stopAnimScroll}},[_c('q-icon',{attrs:{"name":"chevron_right"}})],1)]),_c('div',{staticClass:"q-tabs-panes"},[_vm._t("default")],2)])
var obj;
var obj$1;},staticRenderFns: [],
  name: 'q-tabs',
  components: {
    QIcon: QIcon
  },
  props: {
    value: String,
    align: {
      type: String,
      default: 'left',
      validator: function (v) { return ['left', 'center', 'right', 'justify'].includes(v); }
    },
    position: {
      type: String,
      default: 'top',
      validator: function (v) { return ['top', 'bottom'].includes(v); }
    },
    color: String,
    inverted: Boolean,
    twoLines: Boolean
  },
  data: function data () {
    return {
      tab: {},
      data: {
        tabName: this.value || '',
        color: this.color,
        inverted: this.inverted
      }
    }
  },
  watch: {
    value: function value (name) {
      this.selectTab(name);
    },
    color: function color (v) {
      this.data.color = v;
    },
    inverted: function inverted (v) {
      this.data.inverted = v;
    }
  },
  provide: function provide () {
    return {
      data: this.data,
      selectTab: this.selectTab
    }
  },
  methods: {
    selectTab: function selectTab (name) {
      var this$1 = this;

      if (this.data.tabName === name) {
        return
      }

      clearTimeout(this.timer);
      var el = this.__getTabElByName(name);

      if (this.$q.theme === 'ios') {
        this.__setTab({name: name, el: el});
        return
      }

      var posbarClass = this.$refs.posbar.classList;
      posbarClass.remove('expand', 'contract');

      if (!el) {
        this.__setPositionBar(0, 0);
        this.__setTab({name: name});
        return
      }

      var
        offsetReference = this.$refs.posbar.parentNode.offsetLeft,
        width$$1 = el.getBoundingClientRect().width,
        offsetLeft = el.offsetLeft - offsetReference,
        index = this.$children.findIndex(function (child) { return child.name === name; });

      this.timer = setTimeout(function () {
        if (!this$1.tab.el) {
          posbarClass.add('invisible');
          this$1.__setTab({name: name, el: el, width: width$$1, offsetLeft: offsetLeft, index: index});
          return
        }

        this$1.tab.width = this$1.tab.el.getBoundingClientRect().width;
        this$1.tab.offsetLeft = this$1.tab.el.offsetLeft - offsetReference;
        this$1.tab.index = this$1.$children.findIndex(function (child) { return child.name === this$1.tab.name; });

        this$1.__setPositionBar(this$1.tab.width, this$1.tab.offsetLeft);
        posbarClass.remove('invisible');

        this$1.timer = setTimeout(function () {
          posbarClass.add('expand');

          if (this$1.tab.index < index) {
            this$1.__setPositionBar(
              offsetLeft + width$$1 - this$1.tab.offsetLeft,
              this$1.tab.offsetLeft
            );
          }
          else {
            this$1.__setPositionBar(
              this$1.tab.offsetLeft + this$1.tab.width - offsetLeft,
              offsetLeft
            );
          }

          this$1.__beforePositionContract = function () {
            this$1.__setTab({name: name, el: el, width: width$$1, offsetLeft: offsetLeft, index: index});
          };
        }, 30);
      }, 30);
    },
    __setTab: function __setTab (data) {
      this.data.tabName = data.name;
      this.$emit('input', data.name);
      this.$emit('select', data.name);
      this.__scrollToTab(data.el);
      this.tab = data;
    },
    __setPositionBar: function __setPositionBar (width$$1, left) {
      if ( width$$1 === void 0 ) width$$1 = 0;
      if ( left === void 0 ) left = 0;

      css(this.$refs.posbar, cssTransform(("translateX(" + left + "px) scaleX(" + width$$1 + ")")));
    },
    __updatePosbarTransition: function __updatePosbarTransition () {
      var cls = this.$refs.posbar.classList;

      if (cls.contains('expand')) {
        this.__beforePositionContract();
        cls.remove('expand');
        cls.add('contract');
        this.__setPositionBar(this.tab.width, this.tab.offsetLeft);
      }
      else if (cls.contains('contract')) {
        cls.remove('contract');
        cls.add('invisible');
        this.__setPositionBar(0, 0);
      }
    },
    __redraw: function __redraw () {
      if (!this.$q.platform.is.desktop) {
        return
      }
      if (width(this.$refs.scroller) === 0 && this.$refs.scroller.scrollWidth === 0) {
        return
      }
      if (width(this.$refs.scroller) + 5 < this.$refs.scroller.scrollWidth) {
        this.$refs.tabs.classList.add('scrollable');
        this.scrollable = true;
        this.__updateScrollIndicator();
      }
      else {
        this.$refs.tabs.classList.remove('scrollable');
        this.scrollable = false;
      }
    },
    __updateScrollIndicator: function __updateScrollIndicator () {
      if (!this.$q.platform.is.desktop || !this.scrollable) {
        return
      }
      var action = this.$refs.scroller.scrollLeft + width(this.$refs.scroller) + 5 >= this.$refs.scroller.scrollWidth ? 'add' : 'remove';
      this.$refs.leftScroll.classList[this.$refs.scroller.scrollLeft <= 0 ? 'add' : 'remove']('disabled');
      this.$refs.rightScroll.classList[action]('disabled');
    },
    __getTabElByName: function __getTabElByName (value) {
      var tab = this.$children.find(function (child) { return child.name === value; });
      if (tab) {
        return tab.$el
      }
    },
    __findTabAndScroll: function __findTabAndScroll (name, noAnimation) {
      var this$1 = this;

      setTimeout(function () {
        this$1.__scrollToTab(this$1.__getTabElByName(name), noAnimation);
      }, debounceDelay * 4);
    },
    __scrollToTab: function __scrollToTab (tab, noAnimation) {
      if (!tab || !this.scrollable) {
        return
      }

      var
        contentRect = this.$refs.scroller.getBoundingClientRect(),
        rect = tab.getBoundingClientRect(),
        tabWidth = rect.width,
        offset$$1 = rect.left - contentRect.left;

      if (offset$$1 < 0) {
        if (noAnimation) {
          this.$refs.scroller.scrollLeft += offset$$1;
        }
        else {
          this.__animScrollTo(this.$refs.scroller.scrollLeft + offset$$1);
        }
        return
      }

      offset$$1 += tabWidth - this.$refs.scroller.offsetWidth;
      if (offset$$1 > 0) {
        if (noAnimation) {
          this.$refs.scroller.scrollLeft += offset$$1;
        }
        else {
          this.__animScrollTo(this.$refs.scroller.scrollLeft + offset$$1);
        }
      }
    },
    __animScrollTo: function __animScrollTo (value) {
      var this$1 = this;

      this.__stopAnimScroll();
      this.__scrollTowards(value);

      this.scrollTimer = setInterval(function () {
        if (this$1.__scrollTowards(value)) {
          this$1.__stopAnimScroll();
        }
      }, 5);
    },
    __stopAnimScroll: function __stopAnimScroll () {
      clearInterval(this.scrollTimer);
    },
    __scrollTowards: function __scrollTowards (value) {
      var
        scrollPosition = this.$refs.scroller.scrollLeft,
        direction = value < scrollPosition ? -1 : 1,
        done = false;

      scrollPosition += direction * scrollNavigationSpeed;
      if (scrollPosition < 0) {
        done = true;
        scrollPosition = 0;
      }
      else if (
        (direction === -1 && scrollPosition <= value) ||
        (direction === 1 && scrollPosition >= value)
      ) {
        done = true;
        scrollPosition = value;
      }

      this.$refs.scroller.scrollLeft = scrollPosition;
      return done
    }
  },
  created: function created () {
    this.scrollTimer = null;
    this.scrollable = !this.$q.platform.is.desktop;

    // debounce some costly methods;
    // debouncing here because debounce needs to be per instance
    this.__redraw = debounce(this.__redraw, debounceDelay);
    this.__updateScrollIndicator = debounce(this.__updateScrollIndicator, debounceDelay);
  },
  mounted: function mounted () {
    var this$1 = this;

    this.$nextTick(function () {
      this$1.$refs.scroller.addEventListener('scroll', this$1.__updateScrollIndicator);
      window.addEventListener('resize', this$1.__redraw);

      if (this$1.data.tabName !== '' && this$1.value) {
        this$1.selectTab(this$1.value);
      }

      // let browser drawing stabilize then
      setTimeout(function () {
        this$1.__redraw();
        this$1.__findTabAndScroll(this$1.data.tabName, true);
      }, debounceDelay);
    });
  },
  beforeDestroy: function beforeDestroy () {
    clearTimeout(this.timer);
    this.__stopAnimScroll();
    this.$refs.scroller.removeEventListener('scroll', this.__updateScrollIndicator);
    window.removeEventListener('resize', this.__redraw);
  }
};

var QToolbar = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"q-toolbar row items-center relative-position",class:_vm.classes},[_vm._t("default")],2)},staticRenderFns: [],
  name: 'q-toolbar',
  props: {
    color: String,
    inverted: Boolean
  },
  computed: {
    classes: function classes () {
      var
        inv = this.inverted,
        cls = [];

      cls.push(("q-toolbar-" + (inv ? 'inverted' : 'normal')));
      if (this.color) {
        cls.push(((inv ? 'text' : 'bg') + "-" + (this.color)));
      }

      return cls
    }
  }
};

var QTreeItem = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('li',{staticClass:"q-tree-item"},[_c('div',{staticClass:"row inline items-center",class:{'q-tree-link': _vm.model.handler || _vm.isExpandable},on:{"click":_vm.toggle}},[_c('div',{directives:[{name:"ripple",rawName:"v-ripple.mat",modifiers:{"mat":true}}],staticClass:"q-tree-label relative-position row items-center"},[(_vm.model.icon)?_c('q-icon',{staticClass:"on-left",attrs:{"name":_vm.model.icon}}):_vm._e(),_c('span',{domProps:{"innerHTML":_vm._s(_vm.model.title)}})],1),(_vm.isExpandable)?_c('span',{staticClass:"on-right",domProps:{"innerHTML":_vm._s(_vm.model.expanded ? _vm.contractHtml : _vm.expandHtml)}}):_vm._e()]),_c('q-slide-transition',[_c('ul',{directives:[{name:"show",rawName:"v-show",value:(_vm.isExpandable && _vm.model.expanded),expression:"isExpandable && model.expanded"}]},_vm._l((_vm.model.children),function(item){return _c('q-tree-item',{key:item,attrs:{"model":item,"contract-html":_vm.contractHtml,"expand-html":_vm.expandHtml}})}))])],1)},staticRenderFns: [],
  name: 'q-tree-item',
  components: {
    QIcon: QIcon,
    QSlideTransition: QSlideTransition
  },
  props: ['model', 'contract-html', 'expand-html'],
  methods: {
    toggle: function toggle () {
      if (this.isExpandable) {
        this.model.expanded = !this.model.expanded;
        return
      }

      if (typeof this.model.handler === 'function') {
        this.model.handler(this.model);
      }
    }
  },
  computed: {
    isExpandable: function isExpandable () {
      return this.model.children && this.model.children.length
    }
  }
};

var QTree = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"q-tree"},[_c('ul',_vm._l((_vm.model),function(item){return _c('q-tree-item',{key:item,attrs:{"model":item,"contract-html":_vm.contractHtml,"expand-html":_vm.expandHtml}})}))])},staticRenderFns: [],
  name: 'q-tree',
  components: {
    QTreeItem: QTreeItem
  },
  props: {
    model: {
      type: Array,
      required: true
    },
    contractHtml: {
      type: String,
      required: true,
      default: '<i class="material-icons">remove_circle</i>'
    },
    expandHtml: {
      type: String,
      required: true,
      default: '<i class="material-icons">add_circle</i>'
    }
  }
};

var QUploader = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"q-uploader"},[(_vm.uploading)?_c('div',[_c('q-chip',{staticClass:"text-black q-uploader-progress",attrs:{"closable":"","color":"light"},on:{"close":_vm.abort}},[_c('span',{domProps:{"innerHTML":_vm._s(_vm.computedLabel.uploading)}}),_c('q-spinner',{attrs:{"size":15}}),_vm._v(_vm._s(_vm.progress)+"%")],1)],1):_c('div',{staticClass:"group"},[_c('q-btn',{staticClass:"q-uploader-pick-button overflow-hidden",class:_vm.buttonClass,attrs:{"icon":_vm.computedIcons.add,"disabled":_vm.addButtonDisabled},on:{"click":_vm.__pick}},[_vm._v(_vm._s(_vm.computedLabel.add)+" "),_c('input',{ref:"file",staticClass:"q-uploader-input absolute-full cursor-pointer",attrs:{"type":"file","accept":_vm.extensions,"multiple":_vm.multiple},on:{"change":_vm.__add}})]),(!_vm.hideUploadButton)?_c('q-btn',{class:_vm.buttonClass,attrs:{"disabled":_vm.files.length === 0,"icon":_vm.computedIcons.upload},on:{"click":_vm.upload}},[_vm._v(_vm._s(_vm.computedLabel.upload))]):_vm._e()],1),_c('div',{staticClass:"row wrap items-center group"},[_vm._l((_vm.images),function(img){return _c('div',{key:img.name,staticClass:"card"},[_c('div',{staticClass:"card-title"},[_vm._v(_vm._s(img.name))]),_c('div',{staticClass:"card-media"},[_c('img',{attrs:{"src":img.src}})]),_c('div',{staticClass:"card-content"},[_c('div',{staticClass:"row items-center"},[_c('span',{staticClass:"text-faded col"},[_vm._v(_vm._s(img.__file.__size))]),_c('q-btn',{directives:[{name:"show",rawName:"v-show",value:(!_vm.uploading),expression:"!uploading"}],attrs:{"flat":"","small":"","icon":_vm.computedIcons.remove},on:{"click":function($event){_vm.__remove(img);}}},[_vm._v(_vm._s(_vm.computedLabel.remove))])],1)]),(_vm.uploading && img.__file.__progress)?_c('q-progress',{attrs:{"percentage":img.__file.__progress}}):_vm._e(),(img.__file.__failed)?_c('div',{staticClass:"q-uploader-failed"},[_c('q-icon',{attrs:{"name":_vm.computedIcons.failed}}),_c('span',{domProps:{"innerHTML":_vm._s(_vm.computedLabel.failed)}})],1):_vm._e()],1)}),_vm._l((_vm.otherFiles),function(file){return _c('div',{key:file.name,staticClass:"card"},[_c('div',{staticClass:"card-title"},[_vm._v(_vm._s(file.name))]),_c('div',{staticClass:"card-content"},[_c('div',{staticClass:"row items-center"},[_c('span',{staticClass:"text-faded col"},[_vm._v(_vm._s(file.__size))]),_c('q-btn',{directives:[{name:"show",rawName:"v-show",value:(!_vm.uploading),expression:"!uploading"}],attrs:{"flat":"","small":"","icon":_vm.computedIcons.remove},on:{"click":function($event){_vm.__remove(file);}}},[_vm._v(_vm._s(_vm.computedLabel.remove))])],1)]),(_vm.uploading && file.__progress)?_c('q-progress',{attrs:{"percentage":file.__progress}}):_vm._e(),(file.__failed)?_c('div',{staticClass:"q-uploader-failed"},[_c('q-icon',{attrs:{"name":_vm.computedIcons.failed}}),_c('span',{domProps:{"innerHTML":_vm._s(_vm.computedLabel.failed)}})],1):_vm._e()],1)})],2)])},staticRenderFns: [],
  name: 'q-uploader',
  components: {
    QBtn: QBtn,
    QProgress: QProgress,
    QSpinner: QSpinner,
    QIcon: QIcon,
    QChip: QChip
  },
  props: {
    name: {
      type: String,
      default: 'file'
    },
    headers: Object,
    url: {
      type: String,
      required: true
    },
    additionalFields: {
      type: Array,
      default: function () { return []; }
    },
    buttonClass: {
      type: String,
      default: 'primary'
    },
    labels: {
      type: Object,
      default: function default$1 () {
        return {}
      }
    },
    icons: {
      type: Object,
      default: function default$2 () {
        return {}
      }
    },
    method: {
      type: String,
      default: 'POST'
    },
    extensions: String,
    multiple: Boolean,
    hideUploadButton: Boolean
  },
  data: function data () {
    return {
      files: [],
      uploading: false,
      uploadedSize: 0,
      totalSize: 0,
      images: [],
      otherFiles: [],
      xhrs: []
    }
  },
  computed: {
    progress: function progress () {
      return this.totalSize ? (this.uploadedSize / this.totalSize * 100).toFixed(2) : 0
    },
    computedIcons: function computedIcons () {
      return extend({
        add: 'add',
        remove: 'clear',
        upload: 'file_upload',
        failed: 'warning'
      }, this.icons)
    },
    computedLabel: function computedLabel () {
      return extend({
        add: this.multiple ? 'Add Files' : 'Pick File',
        remove: 'Remove',
        upload: 'Upload',
        failed: 'Failed',
        uploading: 'Uploading...'
      }, this.labels)
    },
    addButtonDisabled: function addButtonDisabled () {
      return !this.multiple && this.files.length >= 1
    }
  },
  methods: {
    __add: function __add (e) {
      var this$1 = this;

      if (!this.multiple && this.files.length >= 1) {
        return
      }

      var files = Array.prototype.slice.call(e.target.files);
      this.$emit('add', files);

      files = files
        .filter(function (file) { return !this$1.files.some(function (f) { return file.name === f.name; }); })
        .map(function (file) {
          file.__failed = false;
          file.__uploaded = 0;
          file.__progress = 0;
          file.__size = humanStorageSize(file.size);
          return file
        });

      files.filter(function (file) { return file.type.startsWith('image'); }).forEach(function (file, index) {
        var reader = new FileReader();
        reader.onload = function (e) {
          var img = new Image();
          img.src = e.target.result;
          img.name = file.name;
          img.__file = file;
          this$1.images.push(img);
        };
        reader.readAsDataURL(file);
      });
      this.otherFiles = this.otherFiles.concat(files.filter(function (file) { return !file.type.startsWith('image'); }));
      this.files = this.files.concat(files);
      this.$refs.file.value = '';
    },
    __remove: function __remove (file, done, xhr) {
      var name = file.name;
      this.$emit(done ? 'upload' : 'remove', file, xhr);
      this.images = this.images.filter(function (obj) { return obj.name !== name; });
      this.otherFiles = this.otherFiles.filter(function (obj) { return obj.name !== name; });
      this.files = this.files.filter(function (obj) { return obj.name !== name; });
    },
    __pick: function __pick () {
      if (this.$q.platform.is.mozilla) {
        this.$refs.file.click();
      }
    },
    __getUploadPromise: function __getUploadPromise (file) {
      var this$1 = this;

      var form = new FormData();
      var xhr = new XMLHttpRequest();

      try {
        form.append('Content-Type', file.type || 'application/octet-stream');
        form.append(this.name, file);
        this.additionalFields.forEach(function (field) {
          form.append(field.name, field.value);
        });
      }
      catch (e) {
        return
      }

      file.__uploaded = 0;
      file.__progress = 0;
      file.__failed = false;
      return new Promise(function (resolve, reject) {
        xhr.upload.addEventListener('progress', function (e) {
          e.percent = e.total ? e.loaded / e.total : 0;
          var uploaded = e.percent * file.size;
          this$1.uploadedSize += uploaded - file.__uploaded;
          file.__uploaded = uploaded;
          file.__progress = parseInt(e.percent * 100, 10);
        }, false);

        xhr.onreadystatechange = function () {
          if (xhr.readyState < 4) {
            return
          }
          if (xhr.status && xhr.status < 400) {
            this$1.__remove(file, true, xhr);
            resolve(file);
          }
          else {
            file.__failed = true;
            this$1.$emit('fail', file, xhr);
            reject(xhr);
          }
        };

        xhr.onerror = function () {
          this$1.$emit('fail', file, xhr);
          reject(xhr);
        };

        xhr.open(this$1.method, this$1.url, true);
        if (this$1.headers) {
          Object.keys(this$1.headers).forEach(function (key) {
            xhr.setRequestHeader(key, this$1.headers[key]);
          });
        }

        this$1.xhrs.push(xhr);
        xhr.send(form);
      })
    },
    upload: function upload () {
      var this$1 = this;

      var filesDone = 0;
      var length = this.files.length;

      if (!length) {
        return
      }

      this.uploadedSize = 0;
      this.totalSize = this.files.map(function (file) { return file.size; }).reduce(function (total, size) { return total + size; });
      this.uploading = true;
      this.xhrs = [];
      this.$emit('start');

      var solved = function () {
        filesDone++;
        if (filesDone === length) {
          this$1.uploading = false;
          this$1.xhrs = [];
          this$1.$emit('finish');
        }
      };

      this.files.map(function (file) { return this$1.__getUploadPromise(file); }).forEach(function (promise) {
        promise.then(solved).catch(solved);
      });
    },
    abort: function abort () {
      this.xhrs.forEach(function (xhr) { xhr.abort(); });
    }
  }
};

var QVideo = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"video"},[_c('iframe',{attrs:{"src":_vm.src,"frameborder":"0","allowfullscreen":""}})],1)},staticRenderFns: [],
  name: 'q-video',
  props: ['src']
};

function updateBinding (el, ref) {
  var value = ref.value;
  var modifiers = ref.modifiers;

  var ctx = el.__qbacktotop;

  if (!value) {
    ctx.update();
    return
  }

  if (typeof value === 'number') {
    ctx.offset = value;
    ctx.update();
    return
  }

  if (value && Object(value) !== value) {
    console.error('v-back-to-top requires an object {offset, duration} as parameter', el);
    return
  }

  if (value.offset) {
    if (typeof value.offset !== 'number') {
      console.error('v-back-to-top requires a number as offset', el);
      return
    }
    ctx.offset = value.offset;
  }
  if (value.duration) {
    if (typeof value.duration !== 'number') {
      console.error('v-back-to-top requires a number as duration', el);
      return
    }
    ctx.duration = value.duration;
  }

  ctx.update();
}

var backToTop = {
  name: 'back-to-top',
  bind: function bind (el) {
    var ctx = {
      offset: 200,
      duration: 300,
      update: debounce(function () {
        var trigger = getScrollPosition(ctx.scrollTarget) > ctx.offset;
        if (ctx.visible !== trigger) {
          ctx.visible = trigger;
          el.classList[trigger ? 'remove' : 'add']('hidden');
        }
      }, 25),
      goToTop: function goToTop () {
        setScrollPosition(ctx.scrollTarget, 0, ctx.animate ? ctx.duration : 0);
      }
    };
    el.classList.add('hidden');
    el.__qbacktotop = ctx;
  },
  inserted: function inserted (el, binding) {
    var ctx = el.__qbacktotop;
    ctx.scrollTarget = getScrollTarget(el);
    ctx.animate = binding.modifiers.animate;
    updateBinding(el, binding);
    ctx.scrollTarget.addEventListener('scroll', ctx.update);
    window.addEventListener('resize', ctx.update);
    el.addEventListener('click', ctx.goToTop);
  },
  update: function update (el, binding) {
    if (binding.oldValue !== binding.value) {
      updateBinding(el, binding);
    }
  },
  unbind: function unbind (el) {
    var ctx = el.__qbacktotop;
    ctx.scrollTarget.removeEventListener('scroll', ctx.update);
    window.removeEventListener('resize', ctx.update);
    el.removeEventListener('click', ctx.goToTop);
    delete el.__qbacktotop;
  }
};

var goBack = {
  name: 'go-back',
  bind: function bind (el, ref, vnode) {
    var value = ref.value;
    var modifiers = ref.modifiers;

    var ctx = { value: value, position: window.history.length - 1, single: modifiers.single };

    if (Platform.is.cordova) {
      ctx.goBack = function () {
        vnode.context.$router.go(ctx.single ? -1 : ctx.position - window.history.length);
      };
    }
    else {
      ctx.goBack = function () {
        vnode.context.$router.replace(ctx.value);
      };
    }

    el.__qgoback = ctx;
    el.addEventListener('click', ctx.goBack);
  },
  update: function update (el, binding) {
    if (binding.oldValue !== binding.value) {
      el.__qgoback.value = binding.value;
    }
  },
  unbind: function unbind (el) {
    el.removeEventListener('click', el.__qgoback.goBack);
    delete el.__qgoback;
  }
};

function updateBinding$1 (el, selector) {
  var
    ctx = el.__qmove,
    parent = el.parentNode;

  if (!ctx.target) {
    ctx.target = document.querySelector(selector);
  }
  if (ctx.target) {
    if (parent !== ctx.target) {
      ctx.target.appendChild(el);
    }
  }
  else if (parent) {
    parent.removeChild(el);
  }
}

var move = {
  name: 'move',
  bind: function bind (el, ref) {
    var value = ref.value;

    el.__qmove = {};
  },
  update: function update (el, ref) {
    var oldValue = ref.oldValue;
    var value = ref.value;

    if (oldValue !== value) {
      el.__qmove.target = document.querySelector(value);
      updateBinding$1(el, value);
    }
  },
  inserted: function inserted (el, ref) {
    var value = ref.value;

    updateBinding$1(el, value);
  },
  unbind: function unbind (el) {
    var parent = el.parentNode;
    if (parent) {
      parent.removeChild(el);
    }
    delete el.__qmove;
  }
};

function updateBinding$2 (el, binding) {
  var ctx = el.__qscrollfire;

  if (typeof binding.value !== 'function') {
    ctx.scrollTarget.removeEventListener('scroll', ctx.scroll);
    console.error('v-scroll-fire requires a function as parameter', el);
    return
  }

  ctx.handler = binding.value;
  if (typeof binding.oldValue !== 'function') {
    ctx.scrollTarget.addEventListener('scroll', ctx.scroll);
    ctx.scroll();
  }
}

var scrollFire = {
  name: 'scroll-fire',
  bind: function bind (el, binding) {
    var ctx = {
      scroll: debounce(function () {
        var containerBottom, elementBottom, fire;

        if (ctx.scrollTarget === window) {
          elementBottom = el.getBoundingClientRect().bottom;
          fire = elementBottom < viewport().height;
        }
        else {
          containerBottom = offset(ctx.scrollTarget).top + height(ctx.scrollTarget);
          elementBottom = offset(el).top + height(el);
          fire = elementBottom < containerBottom;
        }

        if (fire) {
          ctx.scrollTarget.removeEventListener('scroll', ctx.scroll);
          ctx.handler(el);
        }
      }, 25)
    };

    el.__qscrollfire = ctx;
  },
  inserted: function inserted (el, binding) {
    var ctx = el.__qscrollfire;
    ctx.scrollTarget = getScrollTarget(el);
    updateBinding$2(el, binding);
  },
  update: function update (el, binding) {
    if (binding.value !== binding.oldValue) {
      updateBinding$2(el, binding);
    }
  },
  unbind: function unbind (el) {
    var ctx = el.__qscrollfire;
    ctx.scrollTarget.removeEventListener('scroll', ctx.scroll);
    delete el.__qscrollfire;
  }
};

function updateBinding$3 (el, binding) {
  var ctx = el.__qscroll;

  if (typeof binding.value !== 'function') {
    ctx.scrollTarget.removeEventListener('scroll', ctx.scroll);
    console.error('v-scroll requires a function as parameter', el);
    return
  }

  ctx.handler = binding.value;
  if (typeof binding.oldValue !== 'function') {
    ctx.scrollTarget.addEventListener('scroll', ctx.scroll);
  }
}

var scroll$1 = {
  name: 'scroll',
  bind: function bind (el, binding) {
    var ctx = {
      scroll: function scroll () {
        ctx.handler(getScrollPosition(ctx.scrollTarget));
      }
    };
    el.__qscroll = ctx;
  },
  inserted: function inserted (el, binding) {
    var ctx = el.__qscroll;
    ctx.scrollTarget = getScrollTarget(el);
    updateBinding$3(el, binding);
  },
  update: function update (el, binding) {
    if (binding.oldValue !== binding.value) {
      updateBinding$3(el, binding);
    }
  },
  unbind: function unbind (el) {
    var ctx = el.__qscroll;
    ctx.scrollTarget.removeEventListener('scroll', ctx.scroll);
    delete el.__qscroll;
  }
};

function updateBinding$4 (el, binding) {
  var ctx = el.__qtouchhold;

  ctx.duration = parseInt(binding.arg, 10) || 800;

  if (binding.oldValue !== binding.value) {
    ctx.handler = binding.value;
  }
}

var touchHold = {
  name: 'touch-hold',
  bind: function bind (el, binding) {
    var mouse = !binding.modifiers.nomouse;

    var ctx = {
      start: function start (evt) {
        var startTime = new Date().getTime();
        ctx.timer = setTimeout(function () {
          if (mouse) {
            document.removeEventListener('mousemove', ctx.mouseAbort);
            document.removeEventListener('mouseup', ctx.mouseAbort);
          }

          ctx.handler({
            evt: evt,
            position: position(evt),
            duration: new Date().getTime() - startTime
          });
        }, ctx.duration);
      },
      mouseStart: function mouseStart (evt) {
        if (mouse) {
          document.addEventListener('mousemove', ctx.mouseAbort);
          document.addEventListener('mouseup', ctx.mouseAbort);
        }
        ctx.start(evt);
      },
      abort: function abort (evt) {
        clearTimeout(ctx.timer);
        ctx.timer = null;
      },
      mouseAbort: function mouseAbort (evt) {
        if (mouse) {
          document.removeEventListener('mousemove', ctx.mouseAbort);
          document.removeEventListener('mouseup', ctx.mouseAbort);
        }
        ctx.abort(evt);
      }
    };

    el.__qtouchhold = ctx;
    updateBinding$4(el, binding);
    el.addEventListener('touchstart', ctx.start);
    el.addEventListener('touchend', ctx.abort);
    if (mouse) {
      el.addEventListener('touchmove', ctx.abort);
      el.addEventListener('mousedown', ctx.mouseStart);
    }
  },
  update: function update (el, binding) {
    updateBinding$4(el, binding);
  },
  unbind: function unbind (el, binding) {
    var ctx = el.__qtouchhold;
    el.removeEventListener('touchstart', ctx.start);
    el.removeEventListener('touchend', ctx.abort);
    el.removeEventListener('touchmove', ctx.abort);
    el.removeEventListener('mousedown', ctx.mouseStart);
    document.removeEventListener('mousemove', ctx.mouseAbort);
    document.removeEventListener('mouseup', ctx.mouseAbort);
    delete el.__qtouchhold;
  }
};

function addClass (className) {
  document.body.classList.add(className);
}

ready(function () {
  addClass(Platform.is.desktop ? 'desktop' : 'mobile');
  addClass(Platform.has.touch ? 'touch' : 'no-touch');

  if (Platform.is.ios) {
    addClass('platform-ios');
  }
  else if (Platform.is.android) {
    addClass('platform-android');
  }

  if (Platform.within.iframe) {
    addClass('within-iframe');
  }

  if (Platform.is.cordova) {
    addClass('cordova');
  }

  if (Platform.is.electron) {
    addClass('electron');
  }
});

/* eslint-disable no-extend-native, one-var, no-self-compare */

if (!Array.prototype.includes) {
  Array.prototype.includes = function (searchEl, startFrom) {
    'use strict';

    var O = Object(this);
    var len = parseInt(O.length, 10) || 0;
    if (len === 0) {
      return false
    }
    var n = parseInt(startFrom, 10) || 0;
    var k;
    if (n >= 0) {
      k = n;
    }
    else {
      k = len + n;
      if (k < 0) { k = 0; }
    }
    var curEl;
    while (k < len) {
      curEl = O[k];
      if (searchEl === curEl ||
         (searchEl !== searchEl && curEl !== curEl)) { // NaN !== NaN
        return true
      }
      k++;
    }
    return false
  };
}

if (!String.prototype.startsWith) {
  String.prototype.startsWith = function (str, position) {
    position = position || 0;
    return this.substr(position, str.length) === str
  };
}

if (!String.prototype.endsWith) {
  String.prototype.endsWith = function (str, position) {
    var subjectString = this.toString();

    if (typeof position !== 'number' || !isFinite(position) || Math.floor(position) !== position || position > subjectString.length) {
      position = subjectString.length;
    }
    position -= str.length;

    var lastIndex = subjectString.indexOf(str, position);

    return lastIndex !== -1 && lastIndex === position
  };
}

if (typeof Element.prototype.matches !== 'function') {
  Element.prototype.matches = Element.prototype.msMatchesSelector || Element.prototype.mozMatchesSelector || Element.prototype.webkitMatchesSelector || function matches (selector) {
    var
      element = this,
      elements = (element.document || element.ownerDocument).querySelectorAll(selector),
      index = 0;

    while (elements[index] && elements[index] !== element) {
      ++index;
    }

    return Boolean(elements[index])
  };
}

if (typeof Element.prototype.closest !== 'function') {
  Element.prototype.closest = function closest (selector) {
    var el = this;
    while (el && el.nodeType === 1) {
      if (el.matches(selector)) {
        return el
      }
      el = el.parentNode;
    }
    return null
  };
}

if (!Array.prototype.find) {
  Object.defineProperty(Array.prototype, 'find', {
    value: function value (predicate) {
      'use strict';
      if (this == null) {
        throw new TypeError('Array.prototype.find called on null or undefined')
      }
      if (typeof predicate !== 'function') {
        throw new TypeError('predicate must be a function')
      }
      var list = Object(this);
      var length = list.length >>> 0;
      var thisArg = arguments[1];
      var value;

      for (var i = 0; i < length; i++) {
        value = list[i];
        if (predicate.call(thisArg, value, i, list)) {
          return value
        }
      }
      return undefined
    }
  });
}

/*
 * Capture errors
 */
window.onerror = function (message, source, lineno, colno, error) {
  Events.$emit('app:error', {
    message: message,
    source: source,
    lineno: lineno,
    colno: colno,
    error: error
  });
};

/*
 * Credits go to sindresorhus
 */

function rgbToHex (red, green, blue) {
  if (typeof red === 'string') {
    var res = red.match(/\b\d{1,3}\b/g).map(Number);
    red = res[0];
    green = res[1];
    blue = res[2];
  }

  if (
    typeof red !== 'number' ||
    typeof green !== 'number' ||
    typeof blue !== 'number' ||
    red > 255 ||
    green > 255 ||
    blue > 255
  ) {
    throw new TypeError('Expected three numbers below 256')
  }

  return ((blue | green << 8 | red << 16) | 1 << 24).toString(16).slice(1)
}

function hexToRgb (hex) {
  if (typeof hex !== 'string') {
    throw new TypeError('Expected a string')
  }

  hex = hex.replace(/^#/, '');

  if (hex.length === 3) {
    hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
  }

  var num = parseInt(hex, 16);

  return [num >> 16, num >> 8 & 255, num & 255]
}


var colors = Object.freeze({
	rgbToHex: rgbToHex,
	hexToRgb: hexToRgb
});

function getPrimaryHex () {
  var tempDiv = document.createElement('div');
  tempDiv.style.height = '10px';
  tempDiv.style.position = 'absolute';
  tempDiv.style.top = '-100000px';
  tempDiv.className = 'bg-primary';
  document.body.appendChild(tempDiv);
  var primaryColor = window.getComputedStyle(tempDiv).getPropertyValue('background-color');
  document.body.removeChild(tempDiv);

  var rgb = primaryColor.match(/\d+/g);
  return ("#" + (rgbToHex(parseInt(rgb[0]), parseInt(rgb[1]), parseInt(rgb[2]))))
}

function setColor (hexColor) {
  // http://stackoverflow.com/a/33193739
  var metaTag = document.createElement('meta');

  if (Platform.is.winphone) {
    metaTag.setAttribute('name', 'msapplication-navbutton-color');
  }
  else if (Platform.is.safari) {
    metaTag.setAttribute('name', 'apple-mobile-web-app-status-bar-style');
  }
  // Chrome, Firefox OS, Opera, Vivaldi
  else {
    metaTag.setAttribute('name', 'theme-color');
  }

  metaTag.setAttribute('content', hexColor);
  document.getElementsByTagName('head')[0].appendChild(metaTag);
}

var addressbarColor = {
  set: function set (hexColor) {
    if (!Platform.is.mobile || Platform.is.cordova) {
      return
    }
    if (!Platform.is.winphone && !Platform.is.safari && !Platform.is.webkit && !Platform.is.vivaldi) {
      return
    }

    ready(function () {
      setColor(hexColor || getPrimaryHex());
    });
  }
};

var Alert$1 = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[_c('q-transition',{attrs:{"name":_vm.name,"enter":_vm.enter,"leave":_vm.leave,"duration":_vm.duration,"appear":""},on:{"after-leave":_vm.dismissed}},[_c('q-alert',{directives:[{name:"show",rawName:"v-show",value:(_vm.visible),expression:"visible"}],ref:"alert",staticStyle:{"margin":"18px"},attrs:{"color":_vm.color,"dismissible":!_vm.buttons || !_vm.buttons.length,"position":_vm.position,"buttons":_vm.buttons},on:{"dismiss":_vm.dismiss}},[(_vm.icon)?_c('q-icon',{attrs:{"name":_vm.icon},slot:"left"}):_vm._e(),_c('span',{domProps:{"innerHTML":_vm._s(_vm.html)}})],1)],1)],1)},staticRenderFns: [],
  components: {
    QTransition: QTransition,
    QAlert: QAlert,
    QIcon: QIcon,
    QBtn: QBtn
  },
  methods: {
    dismiss: function dismiss (fn) {
      this.visible = false;
      if (typeof fn === 'function') {
        this.onDismiss = fn;
      }
    },
    dismissed: function dismissed () {
      this.$emit('dismissed');
      this.onDismiss && this.onDismiss();
    }
  }
};

function create (opts) {
  var node = document.createElement('div');
  document.body.appendChild(node);
  var active = true;

  var vm = new Vue(extend({
    data: function data () {
      return {
        visible: true,
        duration: opts.duration,
        name: opts.name,
        enter: opts.enter,
        leave: opts.leave,
        color: opts.color,
        icon: opts.icon,
        html: opts.html,
        buttons: opts.buttons,
        position: opts.position || 'top-right'
      }
    }
  }, Alert$1));

  vm.close = function () {
    if (!active) {
      return
    }
    active = false;
    vm.$destroy();
    vm.$el.parentNode.removeChild(vm.$el);
    if (opts.onDismiss) {
      opts.onDismiss();
    }
  };
  vm.$on('dismissed', vm.close);
  vm.$mount(node);

  return {
    dismiss: vm.dismiss
  }
}

var Alert = {
  create: create
};

function isActive () {
  return document.fullscreenElement ||
      document.mozFullScreenElement ||
      document.webkitFullscreenElement ||
      document.msFullscreenElement
}

function request (target) {
  target = target || document.documentElement;

  if (isActive()) {
    return
  }

  if (target.requestFullscreen) {
    target.requestFullscreen();
  }
  else if (target.msRequestFullscreen) {
    target.msRequestFullscreen();
  }
  else if (target.mozRequestFullScreen) {
    target.mozRequestFullScreen();
  }
  else if (target.webkitRequestFullscreen) {
    target.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT); // eslint-disable-line no-undef
  }
}

function exit () {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  }
  else if (document.msExitFullscreen) {
    document.msExitFullscreen();
  }
  else if (document.mozCancelFullScreen) {
    document.mozCancelFullScreen();
  }
  else if (document.webkitExitFullscreen) {
    document.webkitExitFullscreen();
  }
}

function toggle (target) {
  if (isActive()) {
    exit();
  }
  else {
    request(target);
  }
}

var appFullscreen = {
  isActive: isActive,
  request: request,
  exit: exit,
  toggle: toggle
};

var hidden = 'hidden';
var appVisibility = 'visible';

function onchange (evt) {
  var
    v = 'visible',
    h = 'hidden',
    state,
    evtMap = {
      focus: v,
      focusin: v,
      pageshow: v,
      blur: h,
      focusout: h,
      pagehide: h
    };

  evt = evt || window.event;

  if (evt.type in evtMap) {
    state = evtMap[evt.type];
  }
  else {
    state = this[hidden] ? h : v;
  }

  appVisibility = state;
  Events.$emit('app:visibility', state);
}

ready(function () {
  // Standards:
  if (hidden in document) {
    document.addEventListener('visibilitychange', onchange);
  }
  else if ((hidden = 'mozHidden') in document) {
    document.addEventListener('mozvisibilitychange', onchange);
  }
  else if ((hidden = 'webkitHidden') in document) {
    document.addEventListener('webkitvisibilitychange', onchange);
  }
  else if ((hidden = 'msHidden') in document) {
    document.addEventListener('msvisibilitychange', onchange);
  }
  // IE 9 and lower:
  else if ('onfocusin' in document) {
    document.onfocusin = document.onfocusout = onchange;
  }
  // All others:
  else {
    window.onpageshow = window.onpagehide = window.onfocus = window.onblur = onchange;
  }

  // set the initial state (but only if browser supports the Page Visibility API)
  if (document[hidden] !== undefined) {
    onchange({type: document[hidden] ? 'blur' : 'focus'});
  }
});

var appVisibility$1 = {
  isVisible: function () { return appVisibility === 'visible'; }
};

function encode (string) {
  return encodeURIComponent(string)
}

function decode (string) {
  return decodeURIComponent(string)
}

function stringifyCookieValue (value) {
  return encode(value === Object(value) ? JSON.stringify(value) : '' + value)
}

function read (string) {
  if (string === '') {
    return string
  }

  if (string.indexOf('"') === 0) {
    // This is a quoted cookie as according to RFC2068, unescape...
    string = string.slice(1, -1).replace(/\\"/g, '"').replace(/\\\\/g, '\\');
  }

  // Replace server-side written pluses with spaces.
  // If we can't decode the cookie, ignore it, it's unusable.
  // If we can't parse the cookie, ignore it, it's unusable.
  string = decode(string.replace(/\+/g, ' '));

  try {
    string = JSON.parse(string);
  }
  catch (e) {}

  return string
}

function set$1 (key, val, opts) {
  if ( opts === void 0 ) opts = {};

  var time = opts.expires;

  if (typeof opts.expires === 'number') {
    time = new Date();
    time.setMilliseconds(time.getMilliseconds() + opts.expires * 864e+5);
  }

  document.cookie = [
    encode(key), '=', stringifyCookieValue(val),
    time ? '; expires=' + time.toUTCString() : '', // use expires attribute, max-age is not supported by IE
    opts.path ? '; path=' + opts.path : '',
    opts.domain ? '; domain=' + opts.domain : '',
    opts.secure ? '; secure' : ''
  ].join('');
}

function get (key) {
  var
    result = key ? undefined : {},
    cookies = document.cookie ? document.cookie.split('; ') : [],
    i = 0,
    l = cookies.length,
    parts,
    name,
    cookie;

  for (; i < l; i++) {
    parts = cookies[i].split('=');
    name = decode(parts.shift());
    cookie = parts.join('=');

    if (!key) {
      result[name] = cookie;
    }
    else if (key === name) {
      result = read(cookie);
      break
    }
  }

  return result
}

function remove (key, options) {
  set$1(key, '', extend(true, {}, options, {
    expires: -1
  }));
}

function has (key) {
  return get(key) !== undefined
}

var cookies = {
  get: get,
  set: set$1,
  has: has,
  remove: remove,
  all: function () { return get(); }
};

function encode$1 (value) {
  if (Object.prototype.toString.call(value) === '[object Date]') {
    return '__q_date|' + value.toUTCString()
  }
  if (Object.prototype.toString.call(value) === '[object RegExp]') {
    return '__q_expr|' + value.source
  }
  if (typeof value === 'number') {
    return '__q_numb|' + value
  }
  if (typeof value === 'boolean') {
    return '__q_bool|' + (value ? '1' : '0')
  }
  if (typeof value === 'string') {
    return '__q_strn|' + value
  }
  if (typeof value === 'function') {
    return '__q_strn|' + value.toString()
  }
  if (value === Object(value)) {
    return '__q_objt|' + JSON.stringify(value)
  }

  // hmm, we don't know what to do with it,
  // so just return it as is
  return value
}

function decode$1 (value) {
  var type, length, source;

  length = value.length;
  if (length < 10) {
    // then it wasn't encoded by us
    return value
  }

  type = value.substr(0, 8);
  source = value.substring(9);

  switch (type) {
    case '__q_date':
      return new Date(source)

    case '__q_expr':
      return new RegExp(source)

    case '__q_numb':
      return Number(source)

    case '__q_bool':
      return Boolean(source === '1')

    case '__q_strn':
      return '' + source

    case '__q_objt':
      return JSON.parse(source)

    default:
      // hmm, we reached here, we don't know the type,
      // then it means it wasn't encoded by us, so just
      // return whatever value it is
      return value
  }
}

function generateFunctions (fn) {
  return {
    local: fn('local'),
    session: fn('session')
  }
}

var hasStorageItem = generateFunctions(
    function (type) { return function (key) { return window[type + 'Storage'].getItem(key) !== null; }; }
  );
var getStorageLength = generateFunctions(
    function (type) { return function () { return window[type + 'Storage'].length; }; }
  );
var getStorageItem = generateFunctions(function (type) {
    var
      hasFn = hasStorageItem[type],
      storage = window[type + 'Storage'];

    return function (key) {
      if (hasFn(key)) {
        return decode$1(storage.getItem(key))
      }
      return null
    }
  });
var getStorageAtIndex = generateFunctions(function (type) {
    var
      lengthFn = getStorageLength[type],
      getItemFn = getStorageItem[type],
      storage = window[type + 'Storage'];

    return function (index) {
      if (index < lengthFn()) {
        return getItemFn(storage.key(index))
      }
    }
  });
var getAllStorageItems = generateFunctions(function (type) {
    var
      lengthFn = getStorageLength[type],
      storage = window[type + 'Storage'],
      getItemFn = getStorageItem[type];

    return function () {
      var
        result = {},
        key,
        length = lengthFn();

      for (var i = 0; i < length; i++) {
        key = storage.key(i);
        result[key] = getItemFn(key);
      }

      return result
    }
  });
var setStorageItem = generateFunctions(function (type) {
    var storage = window[type + 'Storage'];
    return function (key, value) { storage.setItem(key, encode$1(value)); }
  });
var removeStorageItem = generateFunctions(function (type) {
    var storage = window[type + 'Storage'];
    return function (key) { storage.removeItem(key); }
  });
var clearStorage = generateFunctions(function (type) {
    var storage = window[type + 'Storage'];
    return function () { storage.clear(); }
  });
var storageIsEmpty = generateFunctions(function (type) {
    var getLengthFn = getStorageLength[type];
    return function () { return getLengthFn() === 0; }
  });

var LocalStorage = {
  has: hasStorageItem.local,
  get: {
    length: getStorageLength.local,
    item: getStorageItem.local,
    index: getStorageAtIndex.local,
    all: getAllStorageItems.local
  },
  set: setStorageItem.local,
  remove: removeStorageItem.local,
  clear: clearStorage.local,
  isEmpty: storageIsEmpty.local
};

var SessionStorage = { // eslint-disable-line one-var
  has: hasStorageItem.session,
  get: {
    length: getStorageLength.session,
    item: getStorageItem.session,
    index: getStorageAtIndex.session,
    all: getAllStorageItems.session
  },
  set: setStorageItem.session,
  remove: removeStorageItem.session,
  clear: clearStorage.session,
  isEmpty: storageIsEmpty.session
};

// import './features/fastclick'

var ActionSheets = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('q-modal',{ref:"dialog",attrs:{"position":"bottom","content-css":_vm.contentCss},on:{"close":function($event){_vm.__dismiss();}}},[(_vm.$q.theme === 'ios')?_vm._m(0):_vm._m(1)])},staticRenderFns: [function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[_c('div',{staticClass:"q-action-sheet"},[(_vm.title)?_c('div',{staticClass:"modal-header",domProps:{"innerHTML":_vm._s(_vm.title)}}):_vm._e(),_c('div',{staticClass:"modal-scroll"},[(_vm.gallery)?_c('div',{staticClass:"q-action-sheet-gallery row wrap items-center justify-center"},_vm._l((_vm.actions),function(button){return _c('div',{directives:[{name:"ripple",rawName:"v-ripple.mat",modifiers:{"mat":true}}],staticClass:"cursor-pointer column inline items-center justify-center",class:button.classes,attrs:{"tabindex":"0"},on:{"click":function($event){_vm.close(button.handler);},"keydown":function($event){if(!('button' in $event)&&_vm._k($event.keyCode,"enter",13)){ return null; }_vm.close(button.handler);}}},[(button.icon)?_c('q-icon',{attrs:{"name":button.icon}}):_vm._e(),(button.avatar)?_c('img',{staticClass:"avatar",attrs:{"src":button.avatar}}):_vm._e(),_vm._v(" "),_c('span',[_vm._v(_vm._s(button.label))])],1)})):_c('div',{staticClass:"list no-border"},_vm._l((_vm.actions),function(button){return _c('div',{directives:[{name:"ripple",rawName:"v-ripple.mat",modifiers:{"mat":true}}],staticClass:"item link",class:button.classes,attrs:{"tabindex":"0"},on:{"click":function($event){_vm.close(button.handler);},"keydown":function($event){if(!('button' in $event)&&_vm._k($event.keyCode,"enter",13)){ return null; }_vm.close(button.handler);}}},[(button.icon || button.avatar)?_c('div',{staticClass:"item-primary"},[_c('q-icon',{attrs:{"name":button.icon}}),(button.avatar)?_c('img',{staticClass:"avatar",attrs:{"src":button.avatar}}):_vm._e()],1):_vm._e(),_c('div',{staticClass:"item-content inset"},[_vm._v(_vm._s(button.label))])])}))])]),(_vm.dismiss)?_c('div',{staticClass:"q-action-sheet"},[_c('div',{directives:[{name:"ripple",rawName:"v-ripple.mat",modifiers:{"mat":true}}],staticClass:"item link",class:_vm.dismiss.classes,attrs:{"tabindex":"0"},on:{"click":function($event){_vm.close();},"keydown":function($event){if(!('button' in $event)&&_vm._k($event.keyCode,"enter",13)){ return null; }_vm.close();}}},[_c('div',{staticClass:"item-content row justify-center"},[_vm._v(_vm._s(_vm.dismiss.label))])])]):_vm._e()])},function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[(_vm.title)?_c('div',{staticClass:"modal-header",domProps:{"innerHTML":_vm._s(_vm.title)}}):_vm._e(),_c('div',{staticClass:"modal-scroll"},[(_vm.gallery)?_c('div',{staticClass:"q-action-sheet-gallery row wrap items-center justify-center"},_vm._l((_vm.actions),function(button){return _c('div',{directives:[{name:"ripple",rawName:"v-ripple.mat",modifiers:{"mat":true}}],staticClass:"cursor-pointer column inline items-center justify-center",class:button.classes,attrs:{"tabindex":"0"},on:{"click":function($event){_vm.close(button.handler);},"keydown":function($event){if(!('button' in $event)&&_vm._k($event.keyCode,"enter",13)){ return null; }_vm.close(button.handler);}}},[(button.icon)?_c('q-icon',{attrs:{"name":button.icon}}):_vm._e(),(button.avatar)?_c('img',{staticClass:"avatar",attrs:{"src":button.avatar}}):_vm._e(),_vm._v(" "),_c('span',[_vm._v(_vm._s(button.label))])],1)})):_c('div',{staticClass:"list no-border"},_vm._l((_vm.actions),function(button){return _c('div',{directives:[{name:"ripple",rawName:"v-ripple.mat",modifiers:{"mat":true}}],staticClass:"item link",class:button.classes,attrs:{"tabindex":"0"},on:{"click":function($event){_vm.close(button.handler);},"keydown":function($event){if(!('button' in $event)&&_vm._k($event.keyCode,"enter",13)){ return null; }_vm.close(button.handler);}}},[(button.icon || button.avatar)?_c('div',{staticClass:"item-primary"},[_c('q-icon',{attrs:{"name":button.icon}}),(button.avatar)?_c('img',{staticClass:"avatar",attrs:{"src":button.avatar}}):_vm._e()],1):_vm._e(),_c('div',{staticClass:"item-content inset"},[_vm._v(_vm._s(button.label))])])}))]),(_vm.dismiss)?_c('div',{staticClass:"list no-border"},[_c('div',{directives:[{name:"ripple",rawName:"v-ripple.mat",modifiers:{"mat":true}}],staticClass:"item link",class:_vm.dismiss.classes,attrs:{"tabindex":"0"},on:{"click":function($event){_vm.close();},"keydown":function($event){if(!('button' in $event)&&_vm._k($event.keyCode,"enter",13)){ return null; }_vm.close();}}},[(_vm.dismiss.icon)?_c('q-icon',{staticClass:"item-primary",attrs:{"name":_vm.dismiss.icon}}):_vm._e(),_c('div',{staticClass:"item-content inset"},[_vm._v(_vm._s(_vm.dismiss.label))])],1)]):_vm._e()])}],
  name: 'q-action-sheet',
  components: {
    QModal: QModal,
    QIcon: QIcon
  },
  directives: {
    Ripple: Ripple
  },
  props: {
    title: String,
    gallery: Boolean,
    actions: {
      type: Array,
      required: true
    },
    dismiss: Object
  },
  computed: {
    opened: function opened () {
      return this.$refs.dialog.active
    },
    actionButtons: function actionButtons () {
      return this.buttons.slice(0, this.buttons.length - 2)
    },
    dismissButton: function dismissButton () {
      return this.buttons[this.buttons.length - 1]
    },
    contentCss: function contentCss () {
      if (this.$q.theme === 'ios') {
        return {backgroundColor: 'transparent'}
      }
    }
  },
  methods: {
    close: function close (fn) {
      if (!this.opened) {
        return
      }
      var hasFn = typeof fn === 'function';

      if (hasFn) {
        this.__runCancelHandler = false;
      }
      this.$refs.dialog.close(function () {
        if (hasFn) {
          fn();
        }
      });
    },
    __dismiss: function __dismiss () {
      this.$root.$destroy();
      if (this.__runCancelHandler && this.dismiss && typeof this.dismiss.handler === 'function') {
        this.dismiss.handler();
      }
    }
  },
  mounted: function mounted () {
    var this$1 = this;

    this.__runCancelHandler = true;
    this.$nextTick(function () {
      this$1.$refs.dialog.open();
      this$1.$root.quasarClose = this$1.close;
    });
  }
};

var index$1 = Modal(ActionSheets);

var Loading = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"q-loading animate-fade fullscreen column items-center justify-center z-absolute"},[_c('q-spinner',{attrs:{"name":_vm.spinner,"color":_vm.spinnerColor,"size":_vm.spinnerSize}}),(_vm.message)?_c('div',{style:({color: _vm.messageColor})},[_vm._v(_vm._s(_vm.message))]):_vm._e()],1)},staticRenderFns: [],
  name: 'q-loading',
  components: {
    QSpinner: QSpinner
  },
  props: {
    message: [String, Boolean],
    spinner: String,
    spinnerSize: {
      type: Number,
      default: 80
    },
    spinnerColor: {
      type: String,
      default: '#fff'
    },
    messageColor: {
      type: String,
      default: 'white'
    }
  }
};

var vm;
var appIsInProgress = false;
var timeout;
var props = {};

function isActive$1 () {
  return appIsInProgress
}

function show (ref) {
  if ( ref === void 0 ) ref = {};
  var delay = ref.delay; if ( delay === void 0 ) delay = 500;
  var spinner = ref.spinner; if ( spinner === void 0 ) spinner = current === 'ios' ? 'ios' : 'tail';
  var message = ref.message; if ( message === void 0 ) message = false;
  var spinnerSize = ref.spinnerSize;
  var spinnerColor = ref.spinnerColor;
  var messageColor = ref.messageColor;

  props.spinner = spinner;
  props.message = message;
  props.spinnerSize = spinnerSize;
  props.spinnerColor = spinnerColor;
  props.messageColor = messageColor;

  if (appIsInProgress) {
    vm && vm.$forceUpdate();
    return
  }

  timeout = setTimeout(function () {
    timeout = null;

    var node = document.createElement('div');
    document.body.appendChild(node);
    document.body.classList.add('with-loading');

    vm = new Vue({
      el: node,
      render: function (h) { return h(Loading, {props: props}); }
    });
  }, delay);

  appIsInProgress = true;
  Events.$emit('app:loading', true);
}

function hide () {
  if (!appIsInProgress) {
    return
  }

  if (timeout) {
    clearTimeout(timeout);
    timeout = null;
  }
  else {
    vm.$destroy();
    document.body.classList.remove('with-loading');
    document.body.removeChild(vm.$el);
    vm = null;
  }

  appIsInProgress = false;
  Events.$emit('app:loading', false);
}

var index$2 = {
  isActive: isActive$1,
  show: show,
  hide: hide
};

var transitionDuration = 300;
var displayDuration = 2500; // in ms

function parseOptions$1 (opts, defaults) {
  if (!opts) {
    throw new Error('Missing toast options.')
  }

  var options = extend(
    true,
    {},
    defaults,
    typeof opts === 'string' ? {html: opts} : opts
  );

  if (!options.html) {
    throw new Error('Missing toast content/HTML.')
  }

  return options
}

var Toast = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"q-toast-container",class:{active: _vm.active}},[(_vm.stack[0])?_c('div',{staticClass:"q-toast row no-wrap items-center non-selectable",class:_vm.classes,style:({color: _vm.stack[0].color, background: _vm.stack[0].bgColor})},[(_vm.stack[0].icon)?_c('q-icon',{attrs:{"name":_vm.stack[0].icon}}):_vm._e(),(_vm.stack[0].image)?_c('img',{attrs:{"src":_vm.stack[0].image}}):_vm._e(),_c('div',{staticClass:"q-toast-message col",domProps:{"innerHTML":_vm._s(_vm.stack[0].html)}}),(_vm.stack[0].button && _vm.stack[0].button.label)?_c('a',{style:({color: _vm.stack[0].button.color}),on:{"click":function($event){_vm.dismiss(_vm.stack[0].button.handler);}}},[_vm._v(_vm._s(_vm.stack[0].button.label)+" ")]):_vm._e(),_c('a',{style:({color: _vm.stack[0].button.color}),on:{"click":function($event){_vm.dismiss();}}},[_c('q-icon',{attrs:{"name":"close"}})],1)],1):_vm._e()])},staticRenderFns: [],
  name: 'q-toast',
  components: {
    QIcon: QIcon
  },
  data: function data () {
    return {
      active: false,
      inTransition: false,
      stack: [],
      timer: null,
      defaults: {
        color: 'white',
        bgColor: '#323232',
        button: {
          color: 'inherit'
        }
      }
    }
  },
  computed: {
    classes: function classes () {
      if (!this.stack.length || !this.stack[0].classes) {
        return {}
      }

      return this.stack[0].classes.split(' ')
    }
  },
  methods: {
    create: function create (options) {
      var this$1 = this;

      this.stack.push(parseOptions$1(options, this.defaults));

      if (this.active || this.inTransition) {
        return
      }

      this.activeTimer = setTimeout(function () {
        this$1.active = true;
      }, 10);
      this.inTransition = true;

      this.__show();
    },
    __show: function __show () {
      var this$1 = this;

      Events.$emit('app:toast', this.stack[0].html);

      this.timer = setTimeout(function () {
        if (this$1.stack.length > 0) {
          this$1.dismiss();
        }
        else {
          this$1.inTransition = false;
        }
      }, transitionDuration + (this.stack[0].timeout || displayDuration));
    },
    dismiss: function dismiss (done) {
      var this$1 = this;

      clearTimeout(this.timer);
      clearTimeout(this.activeTimer);
      this.active = false;
      this.timer = null;

      setTimeout(function () {
        if (typeof this$1.stack[0].onDismiss === 'function') {
          this$1.stack[0].onDismiss();
        }

        this$1.stack.shift();
        done && done();

        if (this$1.stack.length > 0) {
          this$1.active = true;
          this$1.__show();
          return
        }

        this$1.inTransition = false;
      }, transitionDuration + 50);
    },
    setDefaults: function setDefaults (opts) {
      extend(true, this.defaults, opts);
    }
  }
};

var toast;
var defaults;
var toastStack = [];
var installed = false;
var types = [
    {
      name: 'positive',
      defaults: {icon: typeIcon.positive, classes: 'bg-positive'}
    },
    {
      name: 'negative',
      defaults: {icon: typeIcon.negative, classes: 'bg-negative'}
    },
    {
      name: 'info',
      defaults: {icon: typeIcon.info, classes: 'bg-info'}
    },
    {
      name: 'warning',
      defaults: {icon: typeIcon.warning, classes: 'bg-warning'}
    }
  ];

function create$1 (opts, defaults) {
  if (!opts) {
    throw new Error('Missing toast options.')
  }

  if (defaults) {
    opts = extend(
      true,
      typeof opts === 'string' ? {html: opts} : opts,
      defaults
    );
  }

  if (!toast) {
    toastStack.push(opts);
    if (!installed) {
      install$2();
    }
    return
  }

  toast.create(opts);
}

types.forEach(function (type) {
  create$1[type.name] = function (opts) { return create$1(opts, type.defaults); };
});

function install$2 () {
  installed = true;
  ready(function () {
    var node = document.createElement('div');
    document.body.appendChild(node);
    toast = new Vue(Toast).$mount(node);
    if (defaults) {
      toast.setDefaults(defaults);
    }
    if (toastStack.length) {
      setTimeout(function () {
        toastStack.forEach(function (opts) {
          toast.create(opts);
        });
      }, 100);
    }
  });
}

var index$3 = {
  create: create$1,
  setDefaults: function setDefaults (opts) {
    if (toast) {
      toast.setDefaults(opts);
    }
    else {
      defaults = opts;
    }
  }
};

var openUrl = function (url, reject) {
  if (Platform.is.cordova && navigator && navigator.app) {
    return navigator.app.loadUrl(url, {
      openExternal: true
    })
  }

  var win = window.open(url, '_blank');

  if (win) {
    win.focus();
    return win
  }
  else {
    reject();
  }
};

var throttle = function (fn, limit) {
  if ( limit === void 0 ) limit = 250;

  var wait = false;

  return function () {
    var args = [], len = arguments.length;
    while ( len-- ) args[ len ] = arguments[ len ];

    if (wait) {
      return
    }

    wait = true;
    fn.apply(this, args);
    setTimeout(function () {
      wait = false;
    }, limit);
  }
};

function noop () {}

var index_esm = {
  version: version,
  install: install$$1,
  start: start,
  theme: theme
};

export { QAjaxBar, QAlert, QAutocomplete, QBtn, QChatMessage, QCheckbox, QChip, QChipsInput, QCollapsible, QContextMenu, QDataTable, QDatetime, QDatetimeRange, QInlineDatetime, QFab, QSmallFab, QField, QGallery, QGallerySlider, QIcon, QInfiniteScroll, QInnerLoading, QInput, QInputFrame, QItem, QKnob, QLabel, QLayout, QFixedPosition, QSideLink, QModal, QModalLayout, QResizeObservable, QScrollObservable, QWindowResizeObservable, QOptionGroup, QPagination, QParallax, QPopover, QProgress, QPullToRefresh, QRadio, QRange, QDoubleRange, QRating, QScrollArea, QSearch, QSelect, QDialogSelect, QSlideTransition, QSlider, QSpinner, QSpinnerAudio, QSpinnerBall, QSpinnerBars, QSpinnerCircles, QSpinnerDots, QSpinnerFacebook, QSpinnerGears, QSpinnerGrid, QSpinnerHearts, QSpinnerHourglass, QSpinnerInfinity, QSpinnerIos, QSpinnerMat, QSpinnerOval, QSpinnerPie, QSpinnerPuff, QSpinnerRadio, QSpinnerRings, QSpinnerTail, QStep, QStepPane, QStepper, QStepperHeader, QStepperNavigation, QRouteTab, QTab, QTabPane, QTabs, QToggle, QToolbar, QTooltip, QTransition, QTree, QUploader, QVideo, backToTop as BackToTop, goBack as GoBack, move as Move, Ripple, scrollFire as ScrollFire, scroll$1 as Scroll, touchHold as TouchHold, TouchPan, TouchSwipe, addressbarColor as AddressbarColor, Alert, appFullscreen as AppFullscreen, appVisibility$1 as AppVisibility, cookies as Cookies, Events, Platform, LocalStorage, SessionStorage, index$1 as ActionSheet, Dialog, index$2 as Loading, index$3 as Toast, animate, clone, colors, date, debounce, frameDebounce, dom, event, extend, filter, format, noop, openUrl as openURL, scroll, throttle, uid };export default index_esm;
