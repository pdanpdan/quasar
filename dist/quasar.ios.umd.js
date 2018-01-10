/*!
 * Quasar Framework v0.15.0-alpha.6
 * (c) 2016-present Razvan Stoenescu
 * Released under the MIT License.
 */
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.Quasar = factory());
}(this, (function () { 'use strict';

/*!
 * Vue.js v2.5.13
 * (c) 2014-2017 Evan You
 * Released under the MIT License.
 */
/*  */

var emptyObject = Object.freeze({});

// these helpers produces better vm code in JS engines due to their
// explicitness and function inlining
function isUndef (v) {
  return v === undefined || v === null
}

function isDef (v) {
  return v !== undefined && v !== null
}

function isTrue (v) {
  return v === true
}

function isFalse (v) {
  return v === false
}

/**
 * Check if value is primitive
 */
function isPrimitive (value) {
  return (
    typeof value === 'string' ||
    typeof value === 'number' ||
    // $flow-disable-line
    typeof value === 'symbol' ||
    typeof value === 'boolean'
  )
}

/**
 * Quick object check - this is primarily used to tell
 * Objects from primitive values when we know the value
 * is a JSON-compliant type.
 */
function isObject (obj) {
  return obj !== null && typeof obj === 'object'
}

/**
 * Get the raw type string of a value e.g. [object Object]
 */
var _toString = Object.prototype.toString;

function toRawType (value) {
  return _toString.call(value).slice(8, -1)
}

/**
 * Strict object type check. Only returns true
 * for plain JavaScript objects.
 */
function isPlainObject (obj) {
  return _toString.call(obj) === '[object Object]'
}

function isRegExp (v) {
  return _toString.call(v) === '[object RegExp]'
}

/**
 * Check if val is a valid array index.
 */
function isValidArrayIndex (val) {
  var n = parseFloat(String(val));
  return n >= 0 && Math.floor(n) === n && isFinite(val)
}

/**
 * Convert a value to a string that is actually rendered.
 */
function toString (val) {
  return val == null
    ? ''
    : typeof val === 'object'
      ? JSON.stringify(val, null, 2)
      : String(val)
}

/**
 * Convert a input value to a number for persistence.
 * If the conversion fails, return original string.
 */
function toNumber (val) {
  var n = parseFloat(val);
  return isNaN(n) ? val : n
}

/**
 * Make a map and return a function for checking if a key
 * is in that map.
 */
function makeMap (
  str,
  expectsLowerCase
) {
  var map = Object.create(null);
  var list = str.split(',');
  for (var i = 0; i < list.length; i++) {
    map[list[i]] = true;
  }
  return expectsLowerCase
    ? function (val) { return map[val.toLowerCase()]; }
    : function (val) { return map[val]; }
}

/**
 * Check if a tag is a built-in tag.
 */
var isBuiltInTag = makeMap('slot,component', true);

/**
 * Check if a attribute is a reserved attribute.
 */
var isReservedAttribute = makeMap('key,ref,slot,slot-scope,is');

/**
 * Remove an item from an array
 */
function remove (arr, item) {
  if (arr.length) {
    var index = arr.indexOf(item);
    if (index > -1) {
      return arr.splice(index, 1)
    }
  }
}

/**
 * Check whether the object has the property.
 */
var hasOwnProperty = Object.prototype.hasOwnProperty;
function hasOwn (obj, key) {
  return hasOwnProperty.call(obj, key)
}

/**
 * Create a cached version of a pure function.
 */
function cached (fn) {
  var cache = Object.create(null);
  return (function cachedFn (str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str))
  })
}

/**
 * Camelize a hyphen-delimited string.
 */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) { return c ? c.toUpperCase() : ''; })
});

/**
 * Capitalize a string.
 */
var capitalize = cached(function (str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
});

/**
 * Hyphenate a camelCase string.
 */
var hyphenateRE = /\B([A-Z])/g;
var hyphenate = cached(function (str) {
  return str.replace(hyphenateRE, '-$1').toLowerCase()
});

/**
 * Simple bind, faster than native
 */
function bind (fn, ctx) {
  function boundFn (a) {
    var l = arguments.length;
    return l
      ? l > 1
        ? fn.apply(ctx, arguments)
        : fn.call(ctx, a)
      : fn.call(ctx)
  }
  // record original fn length
  boundFn._length = fn.length;
  return boundFn
}

/**
 * Convert an Array-like object to a real Array.
 */
function toArray (list, start) {
  start = start || 0;
  var i = list.length - start;
  var ret = new Array(i);
  while (i--) {
    ret[i] = list[i + start];
  }
  return ret
}

/**
 * Mix properties into target object.
 */
function extend (to, _from) {
  for (var key in _from) {
    to[key] = _from[key];
  }
  return to
}

/**
 * Merge an Array of Objects into a single Object.
 */
function toObject (arr) {
  var res = {};
  for (var i = 0; i < arr.length; i++) {
    if (arr[i]) {
      extend(res, arr[i]);
    }
  }
  return res
}

/**
 * Perform no operation.
 * Stubbing args to make Flow happy without leaving useless transpiled code
 * with ...rest (https://flow.org/blog/2017/05/07/Strict-Function-Call-Arity/)
 */
function noop (a, b, c) {}

/**
 * Always return false.
 */
var no = function (a, b, c) { return false; };

/**
 * Return same value
 */
var identity = function (_) { return _; };

/**
 * Generate a static keys string from compiler modules.
 */


/**
 * Check if two values are loosely equal - that is,
 * if they are plain objects, do they have the same shape?
 */
function looseEqual (a, b) {
  if (a === b) { return true }
  var isObjectA = isObject(a);
  var isObjectB = isObject(b);
  if (isObjectA && isObjectB) {
    try {
      var isArrayA = Array.isArray(a);
      var isArrayB = Array.isArray(b);
      if (isArrayA && isArrayB) {
        return a.length === b.length && a.every(function (e, i) {
          return looseEqual(e, b[i])
        })
      } else if (!isArrayA && !isArrayB) {
        var keysA = Object.keys(a);
        var keysB = Object.keys(b);
        return keysA.length === keysB.length && keysA.every(function (key) {
          return looseEqual(a[key], b[key])
        })
      } else {
        /* istanbul ignore next */
        return false
      }
    } catch (e) {
      /* istanbul ignore next */
      return false
    }
  } else if (!isObjectA && !isObjectB) {
    return String(a) === String(b)
  } else {
    return false
  }
}

function looseIndexOf (arr, val) {
  for (var i = 0; i < arr.length; i++) {
    if (looseEqual(arr[i], val)) { return i }
  }
  return -1
}

/**
 * Ensure a function is called only once.
 */
function once (fn) {
  var called = false;
  return function () {
    if (!called) {
      called = true;
      fn.apply(this, arguments);
    }
  }
}

var SSR_ATTR = 'data-server-rendered';

var ASSET_TYPES = [
  'component',
  'directive',
  'filter'
];

var LIFECYCLE_HOOKS = [
  'beforeCreate',
  'created',
  'beforeMount',
  'mounted',
  'beforeUpdate',
  'updated',
  'beforeDestroy',
  'destroyed',
  'activated',
  'deactivated',
  'errorCaptured'
];

/*  */

var config = ({
  /**
   * Option merge strategies (used in core/util/options)
   */
  // $flow-disable-line
  optionMergeStrategies: Object.create(null),

  /**
   * Whether to suppress warnings.
   */
  silent: false,

  /**
   * Show production mode tip message on boot?
   */
  productionTip: process.env.NODE_ENV !== 'production',

  /**
   * Whether to enable devtools
   */
  devtools: process.env.NODE_ENV !== 'production',

  /**
   * Whether to record perf
   */
  performance: false,

  /**
   * Error handler for watcher errors
   */
  errorHandler: null,

  /**
   * Warn handler for watcher warns
   */
  warnHandler: null,

  /**
   * Ignore certain custom elements
   */
  ignoredElements: [],

  /**
   * Custom user key aliases for v-on
   */
  // $flow-disable-line
  keyCodes: Object.create(null),

  /**
   * Check if a tag is reserved so that it cannot be registered as a
   * component. This is platform-dependent and may be overwritten.
   */
  isReservedTag: no,

  /**
   * Check if an attribute is reserved so that it cannot be used as a component
   * prop. This is platform-dependent and may be overwritten.
   */
  isReservedAttr: no,

  /**
   * Check if a tag is an unknown element.
   * Platform-dependent.
   */
  isUnknownElement: no,

  /**
   * Get the namespace of an element
   */
  getTagNamespace: noop,

  /**
   * Parse the real tag name for the specific platform.
   */
  parsePlatformTagName: identity,

  /**
   * Check if an attribute must be bound using property, e.g. value
   * Platform-dependent.
   */
  mustUseProp: no,

  /**
   * Exposed for legacy reasons
   */
  _lifecycleHooks: LIFECYCLE_HOOKS
});

/*  */

/**
 * Check if a string starts with $ or _
 */
function isReserved (str) {
  var c = (str + '').charCodeAt(0);
  return c === 0x24 || c === 0x5F
}

/**
 * Define a property.
 */
function def (obj, key, val, enumerable) {
  Object.defineProperty(obj, key, {
    value: val,
    enumerable: !!enumerable,
    writable: true,
    configurable: true
  });
}

/**
 * Parse simple path.
 */
var bailRE = /[^\w.$]/;
function parsePath (path) {
  if (bailRE.test(path)) {
    return
  }
  var segments = path.split('.');
  return function (obj) {
    for (var i = 0; i < segments.length; i++) {
      if (!obj) { return }
      obj = obj[segments[i]];
    }
    return obj
  }
}

/*  */


// can we use __proto__?
var hasProto = '__proto__' in {};

// Browser environment sniffing
var inBrowser = typeof window !== 'undefined';
var inWeex = typeof WXEnvironment !== 'undefined' && !!WXEnvironment.platform;
var weexPlatform = inWeex && WXEnvironment.platform.toLowerCase();
var UA = inBrowser && window.navigator.userAgent.toLowerCase();
var isIE = UA && /msie|trident/.test(UA);
var isIE9 = UA && UA.indexOf('msie 9.0') > 0;
var isEdge = UA && UA.indexOf('edge/') > 0;
var isAndroid = (UA && UA.indexOf('android') > 0) || (weexPlatform === 'android');
var isIOS = (UA && /iphone|ipad|ipod|ios/.test(UA)) || (weexPlatform === 'ios');
var isChrome = UA && /chrome\/\d+/.test(UA) && !isEdge;

// Firefox has a "watch" function on Object.prototype...
var nativeWatch = ({}).watch;

var supportsPassive = false;
if (inBrowser) {
  try {
    var opts = {};
    Object.defineProperty(opts, 'passive', ({
      get: function get () {
        /* istanbul ignore next */
        supportsPassive = true;
      }
    })); // https://github.com/facebook/flow/issues/285
    window.addEventListener('test-passive', null, opts);
  } catch (e) {}
}

// this needs to be lazy-evaled because vue may be required before
// vue-server-renderer can set VUE_ENV
var _isServer;
var isServerRendering = function () {
  if (_isServer === undefined) {
    /* istanbul ignore if */
    if (!inBrowser && typeof global !== 'undefined') {
      // detect presence of vue-server-renderer and avoid
      // Webpack shimming the process
      _isServer = global['process'].env.VUE_ENV === 'server';
    } else {
      _isServer = false;
    }
  }
  return _isServer
};

// detect devtools
var devtools = inBrowser && window.__VUE_DEVTOOLS_GLOBAL_HOOK__;

/* istanbul ignore next */
function isNative (Ctor) {
  return typeof Ctor === 'function' && /native code/.test(Ctor.toString())
}

var hasSymbol =
  typeof Symbol !== 'undefined' && isNative(Symbol) &&
  typeof Reflect !== 'undefined' && isNative(Reflect.ownKeys);

var _Set;
/* istanbul ignore if */ // $flow-disable-line
if (typeof Set !== 'undefined' && isNative(Set)) {
  // use native Set when available.
  _Set = Set;
} else {
  // a non-standard Set polyfill that only works with primitive keys.
  _Set = (function () {
    function Set () {
      this.set = Object.create(null);
    }
    Set.prototype.has = function has (key) {
      return this.set[key] === true
    };
    Set.prototype.add = function add (key) {
      this.set[key] = true;
    };
    Set.prototype.clear = function clear () {
      this.set = Object.create(null);
    };

    return Set;
  }());
}

/*  */

var warn = noop;
var tip = noop;
var generateComponentTrace = (noop); // work around flow check
var formatComponentName = (noop);

if (process.env.NODE_ENV !== 'production') {
  var hasConsole = typeof console !== 'undefined';
  var classifyRE = /(?:^|[-_])(\w)/g;
  var classify = function (str) { return str
    .replace(classifyRE, function (c) { return c.toUpperCase(); })
    .replace(/[-_]/g, ''); };

  warn = function (msg, vm) {
    var trace = vm ? generateComponentTrace(vm) : '';

    if (config.warnHandler) {
      config.warnHandler.call(null, msg, vm, trace);
    } else if (hasConsole && (!config.silent)) {
      console.error(("[Vue warn]: " + msg + trace));
    }
  };

  tip = function (msg, vm) {
    if (hasConsole && (!config.silent)) {
      console.warn("[Vue tip]: " + msg + (
        vm ? generateComponentTrace(vm) : ''
      ));
    }
  };

  formatComponentName = function (vm, includeFile) {
    if (vm.$root === vm) {
      return '<Root>'
    }
    var options = typeof vm === 'function' && vm.cid != null
      ? vm.options
      : vm._isVue
        ? vm.$options || vm.constructor.options
        : vm || {};
    var name = options.name || options._componentTag;
    var file = options.__file;
    if (!name && file) {
      var match = file.match(/([^/\\]+)\.vue$/);
      name = match && match[1];
    }

    return (
      (name ? ("<" + (classify(name)) + ">") : "<Anonymous>") +
      (file && includeFile !== false ? (" at " + file) : '')
    )
  };

  var repeat = function (str, n) {
    var res = '';
    while (n) {
      if (n % 2 === 1) { res += str; }
      if (n > 1) { str += str; }
      n >>= 1;
    }
    return res
  };

  generateComponentTrace = function (vm) {
    if (vm._isVue && vm.$parent) {
      var tree = [];
      var currentRecursiveSequence = 0;
      while (vm) {
        if (tree.length > 0) {
          var last = tree[tree.length - 1];
          if (last.constructor === vm.constructor) {
            currentRecursiveSequence++;
            vm = vm.$parent;
            continue
          } else if (currentRecursiveSequence > 0) {
            tree[tree.length - 1] = [last, currentRecursiveSequence];
            currentRecursiveSequence = 0;
          }
        }
        tree.push(vm);
        vm = vm.$parent;
      }
      return '\n\nfound in\n\n' + tree
        .map(function (vm, i) { return ("" + (i === 0 ? '---> ' : repeat(' ', 5 + i * 2)) + (Array.isArray(vm)
            ? ((formatComponentName(vm[0])) + "... (" + (vm[1]) + " recursive calls)")
            : formatComponentName(vm))); })
        .join('\n')
    } else {
      return ("\n\n(found in " + (formatComponentName(vm)) + ")")
    }
  };
}

/*  */


var uid$1 = 0;

/**
 * A dep is an observable that can have multiple
 * directives subscribing to it.
 */
var Dep = function Dep () {
  this.id = uid$1++;
  this.subs = [];
};

Dep.prototype.addSub = function addSub (sub) {
  this.subs.push(sub);
};

Dep.prototype.removeSub = function removeSub (sub) {
  remove(this.subs, sub);
};

Dep.prototype.depend = function depend () {
  if (Dep.target) {
    Dep.target.addDep(this);
  }
};

Dep.prototype.notify = function notify () {
  // stabilize the subscriber list first
  var subs = this.subs.slice();
  for (var i = 0, l = subs.length; i < l; i++) {
    subs[i].update();
  }
};

// the current target watcher being evaluated.
// this is globally unique because there could be only one
// watcher being evaluated at any time.
Dep.target = null;
var targetStack = [];

function pushTarget (_target) {
  if (Dep.target) { targetStack.push(Dep.target); }
  Dep.target = _target;
}

function popTarget () {
  Dep.target = targetStack.pop();
}

/*  */

var VNode = function VNode (
  tag,
  data,
  children,
  text,
  elm,
  context,
  componentOptions,
  asyncFactory
) {
  this.tag = tag;
  this.data = data;
  this.children = children;
  this.text = text;
  this.elm = elm;
  this.ns = undefined;
  this.context = context;
  this.fnContext = undefined;
  this.fnOptions = undefined;
  this.fnScopeId = undefined;
  this.key = data && data.key;
  this.componentOptions = componentOptions;
  this.componentInstance = undefined;
  this.parent = undefined;
  this.raw = false;
  this.isStatic = false;
  this.isRootInsert = true;
  this.isComment = false;
  this.isCloned = false;
  this.isOnce = false;
  this.asyncFactory = asyncFactory;
  this.asyncMeta = undefined;
  this.isAsyncPlaceholder = false;
};

var prototypeAccessors = { child: { configurable: true } };

// DEPRECATED: alias for componentInstance for backwards compat.
/* istanbul ignore next */
prototypeAccessors.child.get = function () {
  return this.componentInstance
};

Object.defineProperties( VNode.prototype, prototypeAccessors );

var createEmptyVNode = function (text) {
  if ( text === void 0 ) { text = ''; }

  var node = new VNode();
  node.text = text;
  node.isComment = true;
  return node
};

function createTextVNode (val) {
  return new VNode(undefined, undefined, undefined, String(val))
}

// optimized shallow clone
// used for static nodes and slot nodes because they may be reused across
// multiple renders, cloning them avoids errors when DOM manipulations rely
// on their elm reference.
function cloneVNode (vnode, deep) {
  var componentOptions = vnode.componentOptions;
  var cloned = new VNode(
    vnode.tag,
    vnode.data,
    vnode.children,
    vnode.text,
    vnode.elm,
    vnode.context,
    componentOptions,
    vnode.asyncFactory
  );
  cloned.ns = vnode.ns;
  cloned.isStatic = vnode.isStatic;
  cloned.key = vnode.key;
  cloned.isComment = vnode.isComment;
  cloned.fnContext = vnode.fnContext;
  cloned.fnOptions = vnode.fnOptions;
  cloned.fnScopeId = vnode.fnScopeId;
  cloned.isCloned = true;
  if (deep) {
    if (vnode.children) {
      cloned.children = cloneVNodes(vnode.children, true);
    }
    if (componentOptions && componentOptions.children) {
      componentOptions.children = cloneVNodes(componentOptions.children, true);
    }
  }
  return cloned
}

function cloneVNodes (vnodes, deep) {
  var len = vnodes.length;
  var res = new Array(len);
  for (var i = 0; i < len; i++) {
    res[i] = cloneVNode(vnodes[i], deep);
  }
  return res
}

/*
 * not type checking this file because flow doesn't play well with
 * dynamically accessing methods on Array prototype
 */

var arrayProto = Array.prototype;
var arrayMethods = Object.create(arrayProto);[
  'push',
  'pop',
  'shift',
  'unshift',
  'splice',
  'sort',
  'reverse'
].forEach(function (method) {
  // cache original method
  var original = arrayProto[method];
  def(arrayMethods, method, function mutator () {
    var arguments$1 = arguments;

    var args = [], len = arguments.length;
    while ( len-- ) { args[ len ] = arguments$1[ len ]; }

    var result = original.apply(this, args);
    var ob = this.__ob__;
    var inserted;
    switch (method) {
      case 'push':
      case 'unshift':
        inserted = args;
        break
      case 'splice':
        inserted = args.slice(2);
        break
    }
    if (inserted) { ob.observeArray(inserted); }
    // notify change
    ob.dep.notify();
    return result
  });
});

/*  */

var arrayKeys = Object.getOwnPropertyNames(arrayMethods);

/**
 * By default, when a reactive property is set, the new value is
 * also converted to become reactive. However when passing down props,
 * we don't want to force conversion because the value may be a nested value
 * under a frozen data structure. Converting it would defeat the optimization.
 */
var observerState = {
  shouldConvert: true
};

/**
 * Observer class that are attached to each observed
 * object. Once attached, the observer converts target
 * object's property keys into getter/setters that
 * collect dependencies and dispatches updates.
 */
var Observer = function Observer (value) {
  this.value = value;
  this.dep = new Dep();
  this.vmCount = 0;
  def(value, '__ob__', this);
  if (Array.isArray(value)) {
    var augment = hasProto
      ? protoAugment
      : copyAugment;
    augment(value, arrayMethods, arrayKeys);
    this.observeArray(value);
  } else {
    this.walk(value);
  }
};

/**
 * Walk through each property and convert them into
 * getter/setters. This method should only be called when
 * value type is Object.
 */
Observer.prototype.walk = function walk (obj) {
  var keys = Object.keys(obj);
  for (var i = 0; i < keys.length; i++) {
    defineReactive(obj, keys[i], obj[keys[i]]);
  }
};

/**
 * Observe a list of Array items.
 */
Observer.prototype.observeArray = function observeArray (items) {
  for (var i = 0, l = items.length; i < l; i++) {
    observe(items[i]);
  }
};

// helpers

/**
 * Augment an target Object or Array by intercepting
 * the prototype chain using __proto__
 */
function protoAugment (target, src, keys) {
  /* eslint-disable no-proto */
  target.__proto__ = src;
  /* eslint-enable no-proto */
}

/**
 * Augment an target Object or Array by defining
 * hidden properties.
 */
/* istanbul ignore next */
function copyAugment (target, src, keys) {
  for (var i = 0, l = keys.length; i < l; i++) {
    var key = keys[i];
    def(target, key, src[key]);
  }
}

/**
 * Attempt to create an observer instance for a value,
 * returns the new observer if successfully observed,
 * or the existing observer if the value already has one.
 */
function observe (value, asRootData) {
  if (!isObject(value) || value instanceof VNode) {
    return
  }
  var ob;
  if (hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {
    ob = value.__ob__;
  } else if (
    observerState.shouldConvert &&
    !isServerRendering() &&
    (Array.isArray(value) || isPlainObject(value)) &&
    Object.isExtensible(value) &&
    !value._isVue
  ) {
    ob = new Observer(value);
  }
  if (asRootData && ob) {
    ob.vmCount++;
  }
  return ob
}

/**
 * Define a reactive property on an Object.
 */
function defineReactive (
  obj,
  key,
  val,
  customSetter,
  shallow
) {
  var dep = new Dep();

  var property = Object.getOwnPropertyDescriptor(obj, key);
  if (property && property.configurable === false) {
    return
  }

  // cater for pre-defined getter/setters
  var getter = property && property.get;
  var setter = property && property.set;

  var childOb = !shallow && observe(val);
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function reactiveGetter () {
      var value = getter ? getter.call(obj) : val;
      if (Dep.target) {
        dep.depend();
        if (childOb) {
          childOb.dep.depend();
          if (Array.isArray(value)) {
            dependArray(value);
          }
        }
      }
      return value
    },
    set: function reactiveSetter (newVal) {
      var value = getter ? getter.call(obj) : val;
      /* eslint-disable no-self-compare */
      if (newVal === value || (newVal !== newVal && value !== value)) {
        return
      }
      /* eslint-enable no-self-compare */
      if (process.env.NODE_ENV !== 'production' && customSetter) {
        customSetter();
      }
      if (setter) {
        setter.call(obj, newVal);
      } else {
        val = newVal;
      }
      childOb = !shallow && observe(newVal);
      dep.notify();
    }
  });
}

/**
 * Set a property on an object. Adds the new property and
 * triggers change notification if the property doesn't
 * already exist.
 */
function set (target, key, val) {
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.length = Math.max(target.length, key);
    target.splice(key, 1, val);
    return val
  }
  if (key in target && !(key in Object.prototype)) {
    target[key] = val;
    return val
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
    process.env.NODE_ENV !== 'production' && warn(
      'Avoid adding reactive properties to a Vue instance or its root $data ' +
      'at runtime - declare it upfront in the data option.'
    );
    return val
  }
  if (!ob) {
    target[key] = val;
    return val
  }
  defineReactive(ob.value, key, val);
  ob.dep.notify();
  return val
}

/**
 * Delete a property and trigger change if necessary.
 */
function del (target, key) {
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.splice(key, 1);
    return
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
    process.env.NODE_ENV !== 'production' && warn(
      'Avoid deleting properties on a Vue instance or its root $data ' +
      '- just set it to null.'
    );
    return
  }
  if (!hasOwn(target, key)) {
    return
  }
  delete target[key];
  if (!ob) {
    return
  }
  ob.dep.notify();
}

/**
 * Collect dependencies on array elements when the array is touched, since
 * we cannot intercept array element access like property getters.
 */
function dependArray (value) {
  for (var e = (void 0), i = 0, l = value.length; i < l; i++) {
    e = value[i];
    e && e.__ob__ && e.__ob__.dep.depend();
    if (Array.isArray(e)) {
      dependArray(e);
    }
  }
}

/*  */

/**
 * Option overwriting strategies are functions that handle
 * how to merge a parent option value and a child option
 * value into the final value.
 */
var strats = config.optionMergeStrategies;

/**
 * Options with restrictions
 */
if (process.env.NODE_ENV !== 'production') {
  strats.el = strats.propsData = function (parent, child, vm, key) {
    if (!vm) {
      warn(
        "option \"" + key + "\" can only be used during instance " +
        'creation with the `new` keyword.'
      );
    }
    return defaultStrat(parent, child)
  };
}

/**
 * Helper that recursively merges two data objects together.
 */
function mergeData (to, from) {
  if (!from) { return to }
  var key, toVal, fromVal;
  var keys = Object.keys(from);
  for (var i = 0; i < keys.length; i++) {
    key = keys[i];
    toVal = to[key];
    fromVal = from[key];
    if (!hasOwn(to, key)) {
      set(to, key, fromVal);
    } else if (isPlainObject(toVal) && isPlainObject(fromVal)) {
      mergeData(toVal, fromVal);
    }
  }
  return to
}

/**
 * Data
 */
function mergeDataOrFn (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    // in a Vue.extend merge, both should be functions
    if (!childVal) {
      return parentVal
    }
    if (!parentVal) {
      return childVal
    }
    // when parentVal & childVal are both present,
    // we need to return a function that returns the
    // merged result of both functions... no need to
    // check if parentVal is a function here because
    // it has to be a function to pass previous merges.
    return function mergedDataFn () {
      return mergeData(
        typeof childVal === 'function' ? childVal.call(this, this) : childVal,
        typeof parentVal === 'function' ? parentVal.call(this, this) : parentVal
      )
    }
  } else {
    return function mergedInstanceDataFn () {
      // instance merge
      var instanceData = typeof childVal === 'function'
        ? childVal.call(vm, vm)
        : childVal;
      var defaultData = typeof parentVal === 'function'
        ? parentVal.call(vm, vm)
        : parentVal;
      if (instanceData) {
        return mergeData(instanceData, defaultData)
      } else {
        return defaultData
      }
    }
  }
}

strats.data = function (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    if (childVal && typeof childVal !== 'function') {
      process.env.NODE_ENV !== 'production' && warn(
        'The "data" option should be a function ' +
        'that returns a per-instance value in component ' +
        'definitions.',
        vm
      );

      return parentVal
    }
    return mergeDataOrFn(parentVal, childVal)
  }

  return mergeDataOrFn(parentVal, childVal, vm)
};

/**
 * Hooks and props are merged as arrays.
 */
function mergeHook (
  parentVal,
  childVal
) {
  return childVal
    ? parentVal
      ? parentVal.concat(childVal)
      : Array.isArray(childVal)
        ? childVal
        : [childVal]
    : parentVal
}

LIFECYCLE_HOOKS.forEach(function (hook) {
  strats[hook] = mergeHook;
});

/**
 * Assets
 *
 * When a vm is present (instance creation), we need to do
 * a three-way merge between constructor options, instance
 * options and parent options.
 */
function mergeAssets (
  parentVal,
  childVal,
  vm,
  key
) {
  var res = Object.create(parentVal || null);
  if (childVal) {
    process.env.NODE_ENV !== 'production' && assertObjectType(key, childVal, vm);
    return extend(res, childVal)
  } else {
    return res
  }
}

ASSET_TYPES.forEach(function (type) {
  strats[type + 's'] = mergeAssets;
});

/**
 * Watchers.
 *
 * Watchers hashes should not overwrite one
 * another, so we merge them as arrays.
 */
strats.watch = function (
  parentVal,
  childVal,
  vm,
  key
) {
  // work around Firefox's Object.prototype.watch...
  if (parentVal === nativeWatch) { parentVal = undefined; }
  if (childVal === nativeWatch) { childVal = undefined; }
  /* istanbul ignore if */
  if (!childVal) { return Object.create(parentVal || null) }
  if (process.env.NODE_ENV !== 'production') {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = {};
  extend(ret, parentVal);
  for (var key$1 in childVal) {
    var parent = ret[key$1];
    var child = childVal[key$1];
    if (parent && !Array.isArray(parent)) {
      parent = [parent];
    }
    ret[key$1] = parent
      ? parent.concat(child)
      : Array.isArray(child) ? child : [child];
  }
  return ret
};

/**
 * Other object hashes.
 */
strats.props =
strats.methods =
strats.inject =
strats.computed = function (
  parentVal,
  childVal,
  vm,
  key
) {
  if (childVal && process.env.NODE_ENV !== 'production') {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = Object.create(null);
  extend(ret, parentVal);
  if (childVal) { extend(ret, childVal); }
  return ret
};
strats.provide = mergeDataOrFn;

/**
 * Default strategy.
 */
var defaultStrat = function (parentVal, childVal) {
  return childVal === undefined
    ? parentVal
    : childVal
};

/**
 * Validate component names
 */
function checkComponents (options) {
  for (var key in options.components) {
    validateComponentName(key);
  }
}

function validateComponentName (name) {
  if (!/^[a-zA-Z][\w-]*$/.test(name)) {
    warn(
      'Invalid component name: "' + name + '". Component names ' +
      'can only contain alphanumeric characters and the hyphen, ' +
      'and must start with a letter.'
    );
  }
  if (isBuiltInTag(name) || config.isReservedTag(name)) {
    warn(
      'Do not use built-in or reserved HTML elements as component ' +
      'id: ' + name
    );
  }
}

/**
 * Ensure all props option syntax are normalized into the
 * Object-based format.
 */
function normalizeProps (options, vm) {
  var props = options.props;
  if (!props) { return }
  var res = {};
  var i, val, name;
  if (Array.isArray(props)) {
    i = props.length;
    while (i--) {
      val = props[i];
      if (typeof val === 'string') {
        name = camelize(val);
        res[name] = { type: null };
      } else if (process.env.NODE_ENV !== 'production') {
        warn('props must be strings when using array syntax.');
      }
    }
  } else if (isPlainObject(props)) {
    for (var key in props) {
      val = props[key];
      name = camelize(key);
      res[name] = isPlainObject(val)
        ? val
        : { type: val };
    }
  } else if (process.env.NODE_ENV !== 'production') {
    warn(
      "Invalid value for option \"props\": expected an Array or an Object, " +
      "but got " + (toRawType(props)) + ".",
      vm
    );
  }
  options.props = res;
}

/**
 * Normalize all injections into Object-based format
 */
function normalizeInject (options, vm) {
  var inject = options.inject;
  if (!inject) { return }
  var normalized = options.inject = {};
  if (Array.isArray(inject)) {
    for (var i = 0; i < inject.length; i++) {
      normalized[inject[i]] = { from: inject[i] };
    }
  } else if (isPlainObject(inject)) {
    for (var key in inject) {
      var val = inject[key];
      normalized[key] = isPlainObject(val)
        ? extend({ from: key }, val)
        : { from: val };
    }
  } else if (process.env.NODE_ENV !== 'production') {
    warn(
      "Invalid value for option \"inject\": expected an Array or an Object, " +
      "but got " + (toRawType(inject)) + ".",
      vm
    );
  }
}

/**
 * Normalize raw function directives into object format.
 */
function normalizeDirectives (options) {
  var dirs = options.directives;
  if (dirs) {
    for (var key in dirs) {
      var def = dirs[key];
      if (typeof def === 'function') {
        dirs[key] = { bind: def, update: def };
      }
    }
  }
}

function assertObjectType (name, value, vm) {
  if (!isPlainObject(value)) {
    warn(
      "Invalid value for option \"" + name + "\": expected an Object, " +
      "but got " + (toRawType(value)) + ".",
      vm
    );
  }
}

/**
 * Merge two option objects into a new one.
 * Core utility used in both instantiation and inheritance.
 */
function mergeOptions (
  parent,
  child,
  vm
) {
  if (process.env.NODE_ENV !== 'production') {
    checkComponents(child);
  }

  if (typeof child === 'function') {
    child = child.options;
  }

  normalizeProps(child, vm);
  normalizeInject(child, vm);
  normalizeDirectives(child);
  var extendsFrom = child.extends;
  if (extendsFrom) {
    parent = mergeOptions(parent, extendsFrom, vm);
  }
  if (child.mixins) {
    for (var i = 0, l = child.mixins.length; i < l; i++) {
      parent = mergeOptions(parent, child.mixins[i], vm);
    }
  }
  var options = {};
  var key;
  for (key in parent) {
    mergeField(key);
  }
  for (key in child) {
    if (!hasOwn(parent, key)) {
      mergeField(key);
    }
  }
  function mergeField (key) {
    var strat = strats[key] || defaultStrat;
    options[key] = strat(parent[key], child[key], vm, key);
  }
  return options
}

/**
 * Resolve an asset.
 * This function is used because child instances need access
 * to assets defined in its ancestor chain.
 */
function resolveAsset (
  options,
  type,
  id,
  warnMissing
) {
  /* istanbul ignore if */
  if (typeof id !== 'string') {
    return
  }
  var assets = options[type];
  // check local registration variations first
  if (hasOwn(assets, id)) { return assets[id] }
  var camelizedId = camelize(id);
  if (hasOwn(assets, camelizedId)) { return assets[camelizedId] }
  var PascalCaseId = capitalize(camelizedId);
  if (hasOwn(assets, PascalCaseId)) { return assets[PascalCaseId] }
  // fallback to prototype chain
  var res = assets[id] || assets[camelizedId] || assets[PascalCaseId];
  if (process.env.NODE_ENV !== 'production' && warnMissing && !res) {
    warn(
      'Failed to resolve ' + type.slice(0, -1) + ': ' + id,
      options
    );
  }
  return res
}

/*  */

function validateProp (
  key,
  propOptions,
  propsData,
  vm
) {
  var prop = propOptions[key];
  var absent = !hasOwn(propsData, key);
  var value = propsData[key];
  // handle boolean props
  if (isType(Boolean, prop.type)) {
    if (absent && !hasOwn(prop, 'default')) {
      value = false;
    } else if (!isType(String, prop.type) && (value === '' || value === hyphenate(key))) {
      value = true;
    }
  }
  // check default value
  if (value === undefined) {
    value = getPropDefaultValue(vm, prop, key);
    // since the default value is a fresh copy,
    // make sure to observe it.
    var prevShouldConvert = observerState.shouldConvert;
    observerState.shouldConvert = true;
    observe(value);
    observerState.shouldConvert = prevShouldConvert;
  }
  if (
    process.env.NODE_ENV !== 'production' &&
    // skip validation for weex recycle-list child component props
    !(false && isObject(value) && ('@binding' in value))
  ) {
    assertProp(prop, key, value, vm, absent);
  }
  return value
}

/**
 * Get the default value of a prop.
 */
function getPropDefaultValue (vm, prop, key) {
  // no default, return undefined
  if (!hasOwn(prop, 'default')) {
    return undefined
  }
  var def = prop.default;
  // warn against non-factory defaults for Object & Array
  if (process.env.NODE_ENV !== 'production' && isObject(def)) {
    warn(
      'Invalid default value for prop "' + key + '": ' +
      'Props with type Object/Array must use a factory function ' +
      'to return the default value.',
      vm
    );
  }
  // the raw prop value was also undefined from previous render,
  // return previous default value to avoid unnecessary watcher trigger
  if (vm && vm.$options.propsData &&
    vm.$options.propsData[key] === undefined &&
    vm._props[key] !== undefined
  ) {
    return vm._props[key]
  }
  // call factory function for non-Function types
  // a value is Function if its prototype is function even across different execution context
  return typeof def === 'function' && getType(prop.type) !== 'Function'
    ? def.call(vm)
    : def
}

/**
 * Assert whether a prop is valid.
 */
function assertProp (
  prop,
  name,
  value,
  vm,
  absent
) {
  if (prop.required && absent) {
    warn(
      'Missing required prop: "' + name + '"',
      vm
    );
    return
  }
  if (value == null && !prop.required) {
    return
  }
  var type = prop.type;
  var valid = !type || type === true;
  var expectedTypes = [];
  if (type) {
    if (!Array.isArray(type)) {
      type = [type];
    }
    for (var i = 0; i < type.length && !valid; i++) {
      var assertedType = assertType(value, type[i]);
      expectedTypes.push(assertedType.expectedType || '');
      valid = assertedType.valid;
    }
  }
  if (!valid) {
    warn(
      "Invalid prop: type check failed for prop \"" + name + "\"." +
      " Expected " + (expectedTypes.map(capitalize).join(', ')) +
      ", got " + (toRawType(value)) + ".",
      vm
    );
    return
  }
  var validator = prop.validator;
  if (validator) {
    if (!validator(value)) {
      warn(
        'Invalid prop: custom validator check failed for prop "' + name + '".',
        vm
      );
    }
  }
}

var simpleCheckRE = /^(String|Number|Boolean|Function|Symbol)$/;

function assertType (value, type) {
  var valid;
  var expectedType = getType(type);
  if (simpleCheckRE.test(expectedType)) {
    var t = typeof value;
    valid = t === expectedType.toLowerCase();
    // for primitive wrapper objects
    if (!valid && t === 'object') {
      valid = value instanceof type;
    }
  } else if (expectedType === 'Object') {
    valid = isPlainObject(value);
  } else if (expectedType === 'Array') {
    valid = Array.isArray(value);
  } else {
    valid = value instanceof type;
  }
  return {
    valid: valid,
    expectedType: expectedType
  }
}

/**
 * Use function string name to check built-in types,
 * because a simple equality check will fail when running
 * across different vms / iframes.
 */
function getType (fn) {
  var match = fn && fn.toString().match(/^\s*function (\w+)/);
  return match ? match[1] : ''
}

function isType (type, fn) {
  if (!Array.isArray(fn)) {
    return getType(fn) === getType(type)
  }
  for (var i = 0, len = fn.length; i < len; i++) {
    if (getType(fn[i]) === getType(type)) {
      return true
    }
  }
  /* istanbul ignore next */
  return false
}

/*  */

function handleError (err, vm, info) {
  if (vm) {
    var cur = vm;
    while ((cur = cur.$parent)) {
      var hooks = cur.$options.errorCaptured;
      if (hooks) {
        for (var i = 0; i < hooks.length; i++) {
          try {
            var capture = hooks[i].call(cur, err, vm, info) === false;
            if (capture) { return }
          } catch (e) {
            globalHandleError(e, cur, 'errorCaptured hook');
          }
        }
      }
    }
  }
  globalHandleError(err, vm, info);
}

function globalHandleError (err, vm, info) {
  if (config.errorHandler) {
    try {
      return config.errorHandler.call(null, err, vm, info)
    } catch (e) {
      logError(e, null, 'config.errorHandler');
    }
  }
  logError(err, vm, info);
}

function logError (err, vm, info) {
  if (process.env.NODE_ENV !== 'production') {
    warn(("Error in " + info + ": \"" + (err.toString()) + "\""), vm);
  }
  /* istanbul ignore else */
  if ((inBrowser || inWeex) && typeof console !== 'undefined') {
    console.error(err);
  } else {
    throw err
  }
}

/*  */
/* globals MessageChannel */

var callbacks = [];
var pending = false;

function flushCallbacks () {
  pending = false;
  var copies = callbacks.slice(0);
  callbacks.length = 0;
  for (var i = 0; i < copies.length; i++) {
    copies[i]();
  }
}

// Here we have async deferring wrappers using both micro and macro tasks.
// In < 2.4 we used micro tasks everywhere, but there are some scenarios where
// micro tasks have too high a priority and fires in between supposedly
// sequential events (e.g. #4521, #6690) or even between bubbling of the same
// event (#6566). However, using macro tasks everywhere also has subtle problems
// when state is changed right before repaint (e.g. #6813, out-in transitions).
// Here we use micro task by default, but expose a way to force macro task when
// needed (e.g. in event handlers attached by v-on).
var microTimerFunc;
var macroTimerFunc;
var useMacroTask = false;

// Determine (macro) Task defer implementation.
// Technically setImmediate should be the ideal choice, but it's only available
// in IE. The only polyfill that consistently queues the callback after all DOM
// events triggered in the same loop is by using MessageChannel.
/* istanbul ignore if */
if (typeof setImmediate !== 'undefined' && isNative(setImmediate)) {
  macroTimerFunc = function () {
    setImmediate(flushCallbacks);
  };
} else if (typeof MessageChannel !== 'undefined' && (
  isNative(MessageChannel) ||
  // PhantomJS
  MessageChannel.toString() === '[object MessageChannelConstructor]'
)) {
  var channel = new MessageChannel();
  var port = channel.port2;
  channel.port1.onmessage = flushCallbacks;
  macroTimerFunc = function () {
    port.postMessage(1);
  };
} else {
  /* istanbul ignore next */
  macroTimerFunc = function () {
    setTimeout(flushCallbacks, 0);
  };
}

// Determine MicroTask defer implementation.
/* istanbul ignore next, $flow-disable-line */
if (typeof Promise !== 'undefined' && isNative(Promise)) {
  var p = Promise.resolve();
  microTimerFunc = function () {
    p.then(flushCallbacks);
    // in problematic UIWebViews, Promise.then doesn't completely break, but
    // it can get stuck in a weird state where callbacks are pushed into the
    // microtask queue but the queue isn't being flushed, until the browser
    // needs to do some other work, e.g. handle a timer. Therefore we can
    // "force" the microtask queue to be flushed by adding an empty timer.
    if (isIOS) { setTimeout(noop); }
  };
} else {
  // fallback to macro
  microTimerFunc = macroTimerFunc;
}

/**
 * Wrap a function so that if any code inside triggers state change,
 * the changes are queued using a Task instead of a MicroTask.
 */
function withMacroTask (fn) {
  return fn._withTask || (fn._withTask = function () {
    useMacroTask = true;
    var res = fn.apply(null, arguments);
    useMacroTask = false;
    return res
  })
}

function nextTick (cb, ctx) {
  var _resolve;
  callbacks.push(function () {
    if (cb) {
      try {
        cb.call(ctx);
      } catch (e) {
        handleError(e, ctx, 'nextTick');
      }
    } else if (_resolve) {
      _resolve(ctx);
    }
  });
  if (!pending) {
    pending = true;
    if (useMacroTask) {
      macroTimerFunc();
    } else {
      microTimerFunc();
    }
  }
  // $flow-disable-line
  if (!cb && typeof Promise !== 'undefined') {
    return new Promise(function (resolve) {
      _resolve = resolve;
    })
  }
}

/*  */

/* not type checking this file because flow doesn't play well with Proxy */

var initProxy;

if (process.env.NODE_ENV !== 'production') {
  var allowedGlobals = makeMap(
    'Infinity,undefined,NaN,isFinite,isNaN,' +
    'parseFloat,parseInt,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,' +
    'Math,Number,Date,Array,Object,Boolean,String,RegExp,Map,Set,JSON,Intl,' +
    'require' // for Webpack/Browserify
  );

  var warnNonPresent = function (target, key) {
    warn(
      "Property or method \"" + key + "\" is not defined on the instance but " +
      'referenced during render. Make sure that this property is reactive, ' +
      'either in the data option, or for class-based components, by ' +
      'initializing the property. ' +
      'See: https://vuejs.org/v2/guide/reactivity.html#Declaring-Reactive-Properties.',
      target
    );
  };

  var hasProxy =
    typeof Proxy !== 'undefined' &&
    Proxy.toString().match(/native code/);

  if (hasProxy) {
    var isBuiltInModifier = makeMap('stop,prevent,self,ctrl,shift,alt,meta,exact');
    config.keyCodes = new Proxy(config.keyCodes, {
      set: function set (target, key, value) {
        if (isBuiltInModifier(key)) {
          warn(("Avoid overwriting built-in modifier in config.keyCodes: ." + key));
          return false
        } else {
          target[key] = value;
          return true
        }
      }
    });
  }

  var hasHandler = {
    has: function has (target, key) {
      var has = key in target;
      var isAllowed = allowedGlobals(key) || key.charAt(0) === '_';
      if (!has && !isAllowed) {
        warnNonPresent(target, key);
      }
      return has || !isAllowed
    }
  };

  var getHandler = {
    get: function get (target, key) {
      if (typeof key === 'string' && !(key in target)) {
        warnNonPresent(target, key);
      }
      return target[key]
    }
  };

  initProxy = function initProxy (vm) {
    if (hasProxy) {
      // determine which proxy handler to use
      var options = vm.$options;
      var handlers = options.render && options.render._withStripped
        ? getHandler
        : hasHandler;
      vm._renderProxy = new Proxy(vm, handlers);
    } else {
      vm._renderProxy = vm;
    }
  };
}

/*  */

var seenObjects = new _Set();

/**
 * Recursively traverse an object to evoke all converted
 * getters, so that every nested property inside the object
 * is collected as a "deep" dependency.
 */
function traverse (val) {
  _traverse(val, seenObjects);
  seenObjects.clear();
}

function _traverse (val, seen) {
  var i, keys;
  var isA = Array.isArray(val);
  if ((!isA && !isObject(val)) || Object.isFrozen(val)) {
    return
  }
  if (val.__ob__) {
    var depId = val.__ob__.dep.id;
    if (seen.has(depId)) {
      return
    }
    seen.add(depId);
  }
  if (isA) {
    i = val.length;
    while (i--) { _traverse(val[i], seen); }
  } else {
    keys = Object.keys(val);
    i = keys.length;
    while (i--) { _traverse(val[keys[i]], seen); }
  }
}

var mark;
var measure;

if (process.env.NODE_ENV !== 'production') {
  var perf = inBrowser && window.performance;
  /* istanbul ignore if */
  if (
    perf &&
    perf.mark &&
    perf.measure &&
    perf.clearMarks &&
    perf.clearMeasures
  ) {
    mark = function (tag) { return perf.mark(tag); };
    measure = function (name, startTag, endTag) {
      perf.measure(name, startTag, endTag);
      perf.clearMarks(startTag);
      perf.clearMarks(endTag);
      perf.clearMeasures(name);
    };
  }
}

/*  */

var normalizeEvent = cached(function (name) {
  var passive = name.charAt(0) === '&';
  name = passive ? name.slice(1) : name;
  var once$$1 = name.charAt(0) === '~'; // Prefixed last, checked first
  name = once$$1 ? name.slice(1) : name;
  var capture = name.charAt(0) === '!';
  name = capture ? name.slice(1) : name;
  return {
    name: name,
    once: once$$1,
    capture: capture,
    passive: passive
  }
});

function createFnInvoker (fns) {
  function invoker () {
    var arguments$1 = arguments;

    var fns = invoker.fns;
    if (Array.isArray(fns)) {
      var cloned = fns.slice();
      for (var i = 0; i < cloned.length; i++) {
        cloned[i].apply(null, arguments$1);
      }
    } else {
      // return handler return value for single handlers
      return fns.apply(null, arguments)
    }
  }
  invoker.fns = fns;
  return invoker
}

function updateListeners (
  on,
  oldOn,
  add,
  remove$$1,
  vm
) {
  var name, def, cur, old, event;
  for (name in on) {
    def = cur = on[name];
    old = oldOn[name];
    event = normalizeEvent(name);
    /* istanbul ignore if */
    if (isUndef(cur)) {
      process.env.NODE_ENV !== 'production' && warn(
        "Invalid handler for event \"" + (event.name) + "\": got " + String(cur),
        vm
      );
    } else if (isUndef(old)) {
      if (isUndef(cur.fns)) {
        cur = on[name] = createFnInvoker(cur);
      }
      add(event.name, cur, event.once, event.capture, event.passive, event.params);
    } else if (cur !== old) {
      old.fns = cur;
      on[name] = old;
    }
  }
  for (name in oldOn) {
    if (isUndef(on[name])) {
      event = normalizeEvent(name);
      remove$$1(event.name, oldOn[name], event.capture);
    }
  }
}

/*  */

function mergeVNodeHook (def, hookKey, hook) {
  if (def instanceof VNode) {
    def = def.data.hook || (def.data.hook = {});
  }
  var invoker;
  var oldHook = def[hookKey];

  function wrappedHook () {
    hook.apply(this, arguments);
    // important: remove merged hook to ensure it's called only once
    // and prevent memory leak
    remove(invoker.fns, wrappedHook);
  }

  if (isUndef(oldHook)) {
    // no existing hook
    invoker = createFnInvoker([wrappedHook]);
  } else {
    /* istanbul ignore if */
    if (isDef(oldHook.fns) && isTrue(oldHook.merged)) {
      // already a merged invoker
      invoker = oldHook;
      invoker.fns.push(wrappedHook);
    } else {
      // existing plain hook
      invoker = createFnInvoker([oldHook, wrappedHook]);
    }
  }

  invoker.merged = true;
  def[hookKey] = invoker;
}

/*  */

function extractPropsFromVNodeData (
  data,
  Ctor,
  tag
) {
  // we are only extracting raw values here.
  // validation and default values are handled in the child
  // component itself.
  var propOptions = Ctor.options.props;
  if (isUndef(propOptions)) {
    return
  }
  var res = {};
  var attrs = data.attrs;
  var props = data.props;
  if (isDef(attrs) || isDef(props)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);
      if (process.env.NODE_ENV !== 'production') {
        var keyInLowerCase = key.toLowerCase();
        if (
          key !== keyInLowerCase &&
          attrs && hasOwn(attrs, keyInLowerCase)
        ) {
          tip(
            "Prop \"" + keyInLowerCase + "\" is passed to component " +
            (formatComponentName(tag || Ctor)) + ", but the declared prop name is" +
            " \"" + key + "\". " +
            "Note that HTML attributes are case-insensitive and camelCased " +
            "props need to use their kebab-case equivalents when using in-DOM " +
            "templates. You should probably use \"" + altKey + "\" instead of \"" + key + "\"."
          );
        }
      }
      checkProp(res, props, key, altKey, true) ||
      checkProp(res, attrs, key, altKey, false);
    }
  }
  return res
}

function checkProp (
  res,
  hash,
  key,
  altKey,
  preserve
) {
  if (isDef(hash)) {
    if (hasOwn(hash, key)) {
      res[key] = hash[key];
      if (!preserve) {
        delete hash[key];
      }
      return true
    } else if (hasOwn(hash, altKey)) {
      res[key] = hash[altKey];
      if (!preserve) {
        delete hash[altKey];
      }
      return true
    }
  }
  return false
}

/*  */

// The template compiler attempts to minimize the need for normalization by
// statically analyzing the template at compile time.
//
// For plain HTML markup, normalization can be completely skipped because the
// generated render function is guaranteed to return Array<VNode>. There are
// two cases where extra normalization is needed:

// 1. When the children contains components - because a functional component
// may return an Array instead of a single root. In this case, just a simple
// normalization is needed - if any child is an Array, we flatten the whole
// thing with Array.prototype.concat. It is guaranteed to be only 1-level deep
// because functional components already normalize their own children.
function simpleNormalizeChildren (children) {
  for (var i = 0; i < children.length; i++) {
    if (Array.isArray(children[i])) {
      return Array.prototype.concat.apply([], children)
    }
  }
  return children
}

// 2. When the children contains constructs that always generated nested Arrays,
// e.g. <template>, <slot>, v-for, or when the children is provided by user
// with hand-written render functions / JSX. In such cases a full normalization
// is needed to cater to all possible types of children values.
function normalizeChildren (children) {
  return isPrimitive(children)
    ? [createTextVNode(children)]
    : Array.isArray(children)
      ? normalizeArrayChildren(children)
      : undefined
}

function isTextNode (node) {
  return isDef(node) && isDef(node.text) && isFalse(node.isComment)
}

function normalizeArrayChildren (children, nestedIndex) {
  var res = [];
  var i, c, lastIndex, last;
  for (i = 0; i < children.length; i++) {
    c = children[i];
    if (isUndef(c) || typeof c === 'boolean') { continue }
    lastIndex = res.length - 1;
    last = res[lastIndex];
    //  nested
    if (Array.isArray(c)) {
      if (c.length > 0) {
        c = normalizeArrayChildren(c, ((nestedIndex || '') + "_" + i));
        // merge adjacent text nodes
        if (isTextNode(c[0]) && isTextNode(last)) {
          res[lastIndex] = createTextVNode(last.text + (c[0]).text);
          c.shift();
        }
        res.push.apply(res, c);
      }
    } else if (isPrimitive(c)) {
      if (isTextNode(last)) {
        // merge adjacent text nodes
        // this is necessary for SSR hydration because text nodes are
        // essentially merged when rendered to HTML strings
        res[lastIndex] = createTextVNode(last.text + c);
      } else if (c !== '') {
        // convert primitive to vnode
        res.push(createTextVNode(c));
      }
    } else {
      if (isTextNode(c) && isTextNode(last)) {
        // merge adjacent text nodes
        res[lastIndex] = createTextVNode(last.text + c.text);
      } else {
        // default key for nested array children (likely generated by v-for)
        if (isTrue(children._isVList) &&
          isDef(c.tag) &&
          isUndef(c.key) &&
          isDef(nestedIndex)) {
          c.key = "__vlist" + nestedIndex + "_" + i + "__";
        }
        res.push(c);
      }
    }
  }
  return res
}

/*  */

function ensureCtor (comp, base) {
  if (
    comp.__esModule ||
    (hasSymbol && comp[Symbol.toStringTag] === 'Module')
  ) {
    comp = comp.default;
  }
  return isObject(comp)
    ? base.extend(comp)
    : comp
}

function createAsyncPlaceholder (
  factory,
  data,
  context,
  children,
  tag
) {
  var node = createEmptyVNode();
  node.asyncFactory = factory;
  node.asyncMeta = { data: data, context: context, children: children, tag: tag };
  return node
}

function resolveAsyncComponent (
  factory,
  baseCtor,
  context
) {
  if (isTrue(factory.error) && isDef(factory.errorComp)) {
    return factory.errorComp
  }

  if (isDef(factory.resolved)) {
    return factory.resolved
  }

  if (isTrue(factory.loading) && isDef(factory.loadingComp)) {
    return factory.loadingComp
  }

  if (isDef(factory.contexts)) {
    // already pending
    factory.contexts.push(context);
  } else {
    var contexts = factory.contexts = [context];
    var sync = true;

    var forceRender = function () {
      for (var i = 0, l = contexts.length; i < l; i++) {
        contexts[i].$forceUpdate();
      }
    };

    var resolve = once(function (res) {
      // cache resolved
      factory.resolved = ensureCtor(res, baseCtor);
      // invoke callbacks only if this is not a synchronous resolve
      // (async resolves are shimmed as synchronous during SSR)
      if (!sync) {
        forceRender();
      }
    });

    var reject = once(function (reason) {
      process.env.NODE_ENV !== 'production' && warn(
        "Failed to resolve async component: " + (String(factory)) +
        (reason ? ("\nReason: " + reason) : '')
      );
      if (isDef(factory.errorComp)) {
        factory.error = true;
        forceRender();
      }
    });

    var res = factory(resolve, reject);

    if (isObject(res)) {
      if (typeof res.then === 'function') {
        // () => Promise
        if (isUndef(factory.resolved)) {
          res.then(resolve, reject);
        }
      } else if (isDef(res.component) && typeof res.component.then === 'function') {
        res.component.then(resolve, reject);

        if (isDef(res.error)) {
          factory.errorComp = ensureCtor(res.error, baseCtor);
        }

        if (isDef(res.loading)) {
          factory.loadingComp = ensureCtor(res.loading, baseCtor);
          if (res.delay === 0) {
            factory.loading = true;
          } else {
            setTimeout(function () {
              if (isUndef(factory.resolved) && isUndef(factory.error)) {
                factory.loading = true;
                forceRender();
              }
            }, res.delay || 200);
          }
        }

        if (isDef(res.timeout)) {
          setTimeout(function () {
            if (isUndef(factory.resolved)) {
              reject(
                process.env.NODE_ENV !== 'production'
                  ? ("timeout (" + (res.timeout) + "ms)")
                  : null
              );
            }
          }, res.timeout);
        }
      }
    }

    sync = false;
    // return in case resolved synchronously
    return factory.loading
      ? factory.loadingComp
      : factory.resolved
  }
}

/*  */

function isAsyncPlaceholder (node) {
  return node.isComment && node.asyncFactory
}

/*  */

function getFirstComponentChild (children) {
  if (Array.isArray(children)) {
    for (var i = 0; i < children.length; i++) {
      var c = children[i];
      if (isDef(c) && (isDef(c.componentOptions) || isAsyncPlaceholder(c))) {
        return c
      }
    }
  }
}

/*  */

/*  */

function initEvents (vm) {
  vm._events = Object.create(null);
  vm._hasHookEvent = false;
  // init parent attached events
  var listeners = vm.$options._parentListeners;
  if (listeners) {
    updateComponentListeners(vm, listeners);
  }
}

var target;

function add (event, fn, once) {
  if (once) {
    target.$once(event, fn);
  } else {
    target.$on(event, fn);
  }
}

function remove$1 (event, fn) {
  target.$off(event, fn);
}

function updateComponentListeners (
  vm,
  listeners,
  oldListeners
) {
  target = vm;
  updateListeners(listeners, oldListeners || {}, add, remove$1, vm);
  target = undefined;
}

function eventsMixin (Vue) {
  var hookRE = /^hook:/;
  Vue.prototype.$on = function (event, fn) {
    var this$1 = this;

    var vm = this;
    if (Array.isArray(event)) {
      for (var i = 0, l = event.length; i < l; i++) {
        this$1.$on(event[i], fn);
      }
    } else {
      (vm._events[event] || (vm._events[event] = [])).push(fn);
      // optimize hook:event cost by using a boolean flag marked at registration
      // instead of a hash lookup
      if (hookRE.test(event)) {
        vm._hasHookEvent = true;
      }
    }
    return vm
  };

  Vue.prototype.$once = function (event, fn) {
    var vm = this;
    function on () {
      vm.$off(event, on);
      fn.apply(vm, arguments);
    }
    on.fn = fn;
    vm.$on(event, on);
    return vm
  };

  Vue.prototype.$off = function (event, fn) {
    var this$1 = this;

    var vm = this;
    // all
    if (!arguments.length) {
      vm._events = Object.create(null);
      return vm
    }
    // array of events
    if (Array.isArray(event)) {
      for (var i = 0, l = event.length; i < l; i++) {
        this$1.$off(event[i], fn);
      }
      return vm
    }
    // specific event
    var cbs = vm._events[event];
    if (!cbs) {
      return vm
    }
    if (!fn) {
      vm._events[event] = null;
      return vm
    }
    if (fn) {
      // specific handler
      var cb;
      var i$1 = cbs.length;
      while (i$1--) {
        cb = cbs[i$1];
        if (cb === fn || cb.fn === fn) {
          cbs.splice(i$1, 1);
          break
        }
      }
    }
    return vm
  };

  Vue.prototype.$emit = function (event) {
    var vm = this;
    if (process.env.NODE_ENV !== 'production') {
      var lowerCaseEvent = event.toLowerCase();
      if (lowerCaseEvent !== event && vm._events[lowerCaseEvent]) {
        tip(
          "Event \"" + lowerCaseEvent + "\" is emitted in component " +
          (formatComponentName(vm)) + " but the handler is registered for \"" + event + "\". " +
          "Note that HTML attributes are case-insensitive and you cannot use " +
          "v-on to listen to camelCase events when using in-DOM templates. " +
          "You should probably use \"" + (hyphenate(event)) + "\" instead of \"" + event + "\"."
        );
      }
    }
    var cbs = vm._events[event];
    if (cbs) {
      cbs = cbs.length > 1 ? toArray(cbs) : cbs;
      var args = toArray(arguments, 1);
      for (var i = 0, l = cbs.length; i < l; i++) {
        try {
          cbs[i].apply(vm, args);
        } catch (e) {
          handleError(e, vm, ("event handler for \"" + event + "\""));
        }
      }
    }
    return vm
  };
}

/*  */



/**
 * Runtime helper for resolving raw children VNodes into a slot object.
 */
function resolveSlots (
  children,
  context
) {
  var slots = {};
  if (!children) {
    return slots
  }
  for (var i = 0, l = children.length; i < l; i++) {
    var child = children[i];
    var data = child.data;
    // remove slot attribute if the node is resolved as a Vue slot node
    if (data && data.attrs && data.attrs.slot) {
      delete data.attrs.slot;
    }
    // named slots should only be respected if the vnode was rendered in the
    // same context.
    if ((child.context === context || child.fnContext === context) &&
      data && data.slot != null
    ) {
      var name = data.slot;
      var slot = (slots[name] || (slots[name] = []));
      if (child.tag === 'template') {
        slot.push.apply(slot, child.children || []);
      } else {
        slot.push(child);
      }
    } else {
      (slots.default || (slots.default = [])).push(child);
    }
  }
  // ignore slots that contains only whitespace
  for (var name$1 in slots) {
    if (slots[name$1].every(isWhitespace)) {
      delete slots[name$1];
    }
  }
  return slots
}

function isWhitespace (node) {
  return (node.isComment && !node.asyncFactory) || node.text === ' '
}

function resolveScopedSlots (
  fns, // see flow/vnode
  res
) {
  res = res || {};
  for (var i = 0; i < fns.length; i++) {
    if (Array.isArray(fns[i])) {
      resolveScopedSlots(fns[i], res);
    } else {
      res[fns[i].key] = fns[i].fn;
    }
  }
  return res
}

/*  */

var activeInstance = null;
var isUpdatingChildComponent = false;

function initLifecycle (vm) {
  var options = vm.$options;

  // locate first non-abstract parent
  var parent = options.parent;
  if (parent && !options.abstract) {
    while (parent.$options.abstract && parent.$parent) {
      parent = parent.$parent;
    }
    parent.$children.push(vm);
  }

  vm.$parent = parent;
  vm.$root = parent ? parent.$root : vm;

  vm.$children = [];
  vm.$refs = {};

  vm._watcher = null;
  vm._inactive = null;
  vm._directInactive = false;
  vm._isMounted = false;
  vm._isDestroyed = false;
  vm._isBeingDestroyed = false;
}

function lifecycleMixin (Vue) {
  Vue.prototype._update = function (vnode, hydrating) {
    var vm = this;
    if (vm._isMounted) {
      callHook(vm, 'beforeUpdate');
    }
    var prevEl = vm.$el;
    var prevVnode = vm._vnode;
    var prevActiveInstance = activeInstance;
    activeInstance = vm;
    vm._vnode = vnode;
    // Vue.prototype.__patch__ is injected in entry points
    // based on the rendering backend used.
    if (!prevVnode) {
      // initial render
      vm.$el = vm.__patch__(
        vm.$el, vnode, hydrating, false /* removeOnly */,
        vm.$options._parentElm,
        vm.$options._refElm
      );
      // no need for the ref nodes after initial patch
      // this prevents keeping a detached DOM tree in memory (#5851)
      vm.$options._parentElm = vm.$options._refElm = null;
    } else {
      // updates
      vm.$el = vm.__patch__(prevVnode, vnode);
    }
    activeInstance = prevActiveInstance;
    // update __vue__ reference
    if (prevEl) {
      prevEl.__vue__ = null;
    }
    if (vm.$el) {
      vm.$el.__vue__ = vm;
    }
    // if parent is an HOC, update its $el as well
    if (vm.$vnode && vm.$parent && vm.$vnode === vm.$parent._vnode) {
      vm.$parent.$el = vm.$el;
    }
    // updated hook is called by the scheduler to ensure that children are
    // updated in a parent's updated hook.
  };

  Vue.prototype.$forceUpdate = function () {
    var vm = this;
    if (vm._watcher) {
      vm._watcher.update();
    }
  };

  Vue.prototype.$destroy = function () {
    var vm = this;
    if (vm._isBeingDestroyed) {
      return
    }
    callHook(vm, 'beforeDestroy');
    vm._isBeingDestroyed = true;
    // remove self from parent
    var parent = vm.$parent;
    if (parent && !parent._isBeingDestroyed && !vm.$options.abstract) {
      remove(parent.$children, vm);
    }
    // teardown watchers
    if (vm._watcher) {
      vm._watcher.teardown();
    }
    var i = vm._watchers.length;
    while (i--) {
      vm._watchers[i].teardown();
    }
    // remove reference from data ob
    // frozen object may not have observer.
    if (vm._data.__ob__) {
      vm._data.__ob__.vmCount--;
    }
    // call the last hook...
    vm._isDestroyed = true;
    // invoke destroy hooks on current rendered tree
    vm.__patch__(vm._vnode, null);
    // fire destroyed hook
    callHook(vm, 'destroyed');
    // turn off all instance listeners.
    vm.$off();
    // remove __vue__ reference
    if (vm.$el) {
      vm.$el.__vue__ = null;
    }
    // release circular reference (#6759)
    if (vm.$vnode) {
      vm.$vnode.parent = null;
    }
  };
}

function mountComponent (
  vm,
  el,
  hydrating
) {
  vm.$el = el;
  if (!vm.$options.render) {
    vm.$options.render = createEmptyVNode;
    if (process.env.NODE_ENV !== 'production') {
      /* istanbul ignore if */
      if ((vm.$options.template && vm.$options.template.charAt(0) !== '#') ||
        vm.$options.el || el) {
        warn(
          'You are using the runtime-only build of Vue where the template ' +
          'compiler is not available. Either pre-compile the templates into ' +
          'render functions, or use the compiler-included build.',
          vm
        );
      } else {
        warn(
          'Failed to mount component: template or render function not defined.',
          vm
        );
      }
    }
  }
  callHook(vm, 'beforeMount');

  var updateComponent;
  /* istanbul ignore if */
  if (process.env.NODE_ENV !== 'production' && config.performance && mark) {
    updateComponent = function () {
      var name = vm._name;
      var id = vm._uid;
      var startTag = "vue-perf-start:" + id;
      var endTag = "vue-perf-end:" + id;

      mark(startTag);
      var vnode = vm._render();
      mark(endTag);
      measure(("vue " + name + " render"), startTag, endTag);

      mark(startTag);
      vm._update(vnode, hydrating);
      mark(endTag);
      measure(("vue " + name + " patch"), startTag, endTag);
    };
  } else {
    updateComponent = function () {
      vm._update(vm._render(), hydrating);
    };
  }

  // we set this to vm._watcher inside the watcher's constructor
  // since the watcher's initial patch may call $forceUpdate (e.g. inside child
  // component's mounted hook), which relies on vm._watcher being already defined
  new Watcher(vm, updateComponent, noop, null, true /* isRenderWatcher */);
  hydrating = false;

  // manually mounted instance, call mounted on self
  // mounted is called for render-created child components in its inserted hook
  if (vm.$vnode == null) {
    vm._isMounted = true;
    callHook(vm, 'mounted');
  }
  return vm
}

function updateChildComponent (
  vm,
  propsData,
  listeners,
  parentVnode,
  renderChildren
) {
  if (process.env.NODE_ENV !== 'production') {
    isUpdatingChildComponent = true;
  }

  // determine whether component has slot children
  // we need to do this before overwriting $options._renderChildren
  var hasChildren = !!(
    renderChildren ||               // has new static slots
    vm.$options._renderChildren ||  // has old static slots
    parentVnode.data.scopedSlots || // has new scoped slots
    vm.$scopedSlots !== emptyObject // has old scoped slots
  );

  vm.$options._parentVnode = parentVnode;
  vm.$vnode = parentVnode; // update vm's placeholder node without re-render

  if (vm._vnode) { // update child tree's parent
    vm._vnode.parent = parentVnode;
  }
  vm.$options._renderChildren = renderChildren;

  // update $attrs and $listeners hash
  // these are also reactive so they may trigger child update if the child
  // used them during render
  vm.$attrs = (parentVnode.data && parentVnode.data.attrs) || emptyObject;
  vm.$listeners = listeners || emptyObject;

  // update props
  if (propsData && vm.$options.props) {
    observerState.shouldConvert = false;
    var props = vm._props;
    var propKeys = vm.$options._propKeys || [];
    for (var i = 0; i < propKeys.length; i++) {
      var key = propKeys[i];
      props[key] = validateProp(key, vm.$options.props, propsData, vm);
    }
    observerState.shouldConvert = true;
    // keep a copy of raw propsData
    vm.$options.propsData = propsData;
  }

  // update listeners
  if (listeners) {
    var oldListeners = vm.$options._parentListeners;
    vm.$options._parentListeners = listeners;
    updateComponentListeners(vm, listeners, oldListeners);
  }
  // resolve slots + force update if has children
  if (hasChildren) {
    vm.$slots = resolveSlots(renderChildren, parentVnode.context);
    vm.$forceUpdate();
  }

  if (process.env.NODE_ENV !== 'production') {
    isUpdatingChildComponent = false;
  }
}

function isInInactiveTree (vm) {
  while (vm && (vm = vm.$parent)) {
    if (vm._inactive) { return true }
  }
  return false
}

function activateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = false;
    if (isInInactiveTree(vm)) {
      return
    }
  } else if (vm._directInactive) {
    return
  }
  if (vm._inactive || vm._inactive === null) {
    vm._inactive = false;
    for (var i = 0; i < vm.$children.length; i++) {
      activateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'activated');
  }
}

function deactivateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = true;
    if (isInInactiveTree(vm)) {
      return
    }
  }
  if (!vm._inactive) {
    vm._inactive = true;
    for (var i = 0; i < vm.$children.length; i++) {
      deactivateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'deactivated');
  }
}

function callHook (vm, hook) {
  var handlers = vm.$options[hook];
  if (handlers) {
    for (var i = 0, j = handlers.length; i < j; i++) {
      try {
        handlers[i].call(vm);
      } catch (e) {
        handleError(e, vm, (hook + " hook"));
      }
    }
  }
  if (vm._hasHookEvent) {
    vm.$emit('hook:' + hook);
  }
}

/*  */


var MAX_UPDATE_COUNT = 100;

var queue = [];
var activatedChildren = [];
var has = {};
var circular = {};
var waiting = false;
var flushing = false;
var index = 0;

/**
 * Reset the scheduler's state.
 */
function resetSchedulerState () {
  index = queue.length = activatedChildren.length = 0;
  has = {};
  if (process.env.NODE_ENV !== 'production') {
    circular = {};
  }
  waiting = flushing = false;
}

/**
 * Flush both queues and run the watchers.
 */
function flushSchedulerQueue () {
  flushing = true;
  var watcher, id;

  // Sort queue before flush.
  // This ensures that:
  // 1. Components are updated from parent to child. (because parent is always
  //    created before the child)
  // 2. A component's user watchers are run before its render watcher (because
  //    user watchers are created before the render watcher)
  // 3. If a component is destroyed during a parent component's watcher run,
  //    its watchers can be skipped.
  queue.sort(function (a, b) { return a.id - b.id; });

  // do not cache length because more watchers might be pushed
  // as we run existing watchers
  for (index = 0; index < queue.length; index++) {
    watcher = queue[index];
    id = watcher.id;
    has[id] = null;
    watcher.run();
    // in dev build, check and stop circular updates.
    if (process.env.NODE_ENV !== 'production' && has[id] != null) {
      circular[id] = (circular[id] || 0) + 1;
      if (circular[id] > MAX_UPDATE_COUNT) {
        warn(
          'You may have an infinite update loop ' + (
            watcher.user
              ? ("in watcher with expression \"" + (watcher.expression) + "\"")
              : "in a component render function."
          ),
          watcher.vm
        );
        break
      }
    }
  }

  // keep copies of post queues before resetting state
  var activatedQueue = activatedChildren.slice();
  var updatedQueue = queue.slice();

  resetSchedulerState();

  // call component updated and activated hooks
  callActivatedHooks(activatedQueue);
  callUpdatedHooks(updatedQueue);

  // devtool hook
  /* istanbul ignore if */
  if (devtools && config.devtools) {
    devtools.emit('flush');
  }
}

function callUpdatedHooks (queue) {
  var i = queue.length;
  while (i--) {
    var watcher = queue[i];
    var vm = watcher.vm;
    if (vm._watcher === watcher && vm._isMounted) {
      callHook(vm, 'updated');
    }
  }
}

/**
 * Queue a kept-alive component that was activated during patch.
 * The queue will be processed after the entire tree has been patched.
 */
function queueActivatedComponent (vm) {
  // setting _inactive to false here so that a render function can
  // rely on checking whether it's in an inactive tree (e.g. router-view)
  vm._inactive = false;
  activatedChildren.push(vm);
}

function callActivatedHooks (queue) {
  for (var i = 0; i < queue.length; i++) {
    queue[i]._inactive = true;
    activateChildComponent(queue[i], true /* true */);
  }
}

/**
 * Push a watcher into the watcher queue.
 * Jobs with duplicate IDs will be skipped unless it's
 * pushed when the queue is being flushed.
 */
function queueWatcher (watcher) {
  var id = watcher.id;
  if (has[id] == null) {
    has[id] = true;
    if (!flushing) {
      queue.push(watcher);
    } else {
      // if already flushing, splice the watcher based on its id
      // if already past its id, it will be run next immediately.
      var i = queue.length - 1;
      while (i > index && queue[i].id > watcher.id) {
        i--;
      }
      queue.splice(i + 1, 0, watcher);
    }
    // queue the flush
    if (!waiting) {
      waiting = true;
      nextTick(flushSchedulerQueue);
    }
  }
}

/*  */

var uid$2 = 0;

/**
 * A watcher parses an expression, collects dependencies,
 * and fires callback when the expression value changes.
 * This is used for both the $watch() api and directives.
 */
var Watcher = function Watcher (
  vm,
  expOrFn,
  cb,
  options,
  isRenderWatcher
) {
  this.vm = vm;
  if (isRenderWatcher) {
    vm._watcher = this;
  }
  vm._watchers.push(this);
  // options
  if (options) {
    this.deep = !!options.deep;
    this.user = !!options.user;
    this.lazy = !!options.lazy;
    this.sync = !!options.sync;
  } else {
    this.deep = this.user = this.lazy = this.sync = false;
  }
  this.cb = cb;
  this.id = ++uid$2; // uid for batching
  this.active = true;
  this.dirty = this.lazy; // for lazy watchers
  this.deps = [];
  this.newDeps = [];
  this.depIds = new _Set();
  this.newDepIds = new _Set();
  this.expression = process.env.NODE_ENV !== 'production'
    ? expOrFn.toString()
    : '';
  // parse expression for getter
  if (typeof expOrFn === 'function') {
    this.getter = expOrFn;
  } else {
    this.getter = parsePath(expOrFn);
    if (!this.getter) {
      this.getter = function () {};
      process.env.NODE_ENV !== 'production' && warn(
        "Failed watching path: \"" + expOrFn + "\" " +
        'Watcher only accepts simple dot-delimited paths. ' +
        'For full control, use a function instead.',
        vm
      );
    }
  }
  this.value = this.lazy
    ? undefined
    : this.get();
};

/**
 * Evaluate the getter, and re-collect dependencies.
 */
Watcher.prototype.get = function get () {
  pushTarget(this);
  var value;
  var vm = this.vm;
  try {
    value = this.getter.call(vm, vm);
  } catch (e) {
    if (this.user) {
      handleError(e, vm, ("getter for watcher \"" + (this.expression) + "\""));
    } else {
      throw e
    }
  } finally {
    // "touch" every property so they are all tracked as
    // dependencies for deep watching
    if (this.deep) {
      traverse(value);
    }
    popTarget();
    this.cleanupDeps();
  }
  return value
};

/**
 * Add a dependency to this directive.
 */
Watcher.prototype.addDep = function addDep (dep) {
  var id = dep.id;
  if (!this.newDepIds.has(id)) {
    this.newDepIds.add(id);
    this.newDeps.push(dep);
    if (!this.depIds.has(id)) {
      dep.addSub(this);
    }
  }
};

/**
 * Clean up for dependency collection.
 */
Watcher.prototype.cleanupDeps = function cleanupDeps () {
    var this$1 = this;

  var i = this.deps.length;
  while (i--) {
    var dep = this$1.deps[i];
    if (!this$1.newDepIds.has(dep.id)) {
      dep.removeSub(this$1);
    }
  }
  var tmp = this.depIds;
  this.depIds = this.newDepIds;
  this.newDepIds = tmp;
  this.newDepIds.clear();
  tmp = this.deps;
  this.deps = this.newDeps;
  this.newDeps = tmp;
  this.newDeps.length = 0;
};

/**
 * Subscriber interface.
 * Will be called when a dependency changes.
 */
Watcher.prototype.update = function update () {
  /* istanbul ignore else */
  if (this.lazy) {
    this.dirty = true;
  } else if (this.sync) {
    this.run();
  } else {
    queueWatcher(this);
  }
};

/**
 * Scheduler job interface.
 * Will be called by the scheduler.
 */
Watcher.prototype.run = function run () {
  if (this.active) {
    var value = this.get();
    if (
      value !== this.value ||
      // Deep watchers and watchers on Object/Arrays should fire even
      // when the value is the same, because the value may
      // have mutated.
      isObject(value) ||
      this.deep
    ) {
      // set new value
      var oldValue = this.value;
      this.value = value;
      if (this.user) {
        try {
          this.cb.call(this.vm, value, oldValue);
        } catch (e) {
          handleError(e, this.vm, ("callback for watcher \"" + (this.expression) + "\""));
        }
      } else {
        this.cb.call(this.vm, value, oldValue);
      }
    }
  }
};

/**
 * Evaluate the value of the watcher.
 * This only gets called for lazy watchers.
 */
Watcher.prototype.evaluate = function evaluate () {
  this.value = this.get();
  this.dirty = false;
};

/**
 * Depend on all deps collected by this watcher.
 */
Watcher.prototype.depend = function depend () {
    var this$1 = this;

  var i = this.deps.length;
  while (i--) {
    this$1.deps[i].depend();
  }
};

/**
 * Remove self from all dependencies' subscriber list.
 */
Watcher.prototype.teardown = function teardown () {
    var this$1 = this;

  if (this.active) {
    // remove self from vm's watcher list
    // this is a somewhat expensive operation so we skip it
    // if the vm is being destroyed.
    if (!this.vm._isBeingDestroyed) {
      remove(this.vm._watchers, this);
    }
    var i = this.deps.length;
    while (i--) {
      this$1.deps[i].removeSub(this$1);
    }
    this.active = false;
  }
};

/*  */

var sharedPropertyDefinition = {
  enumerable: true,
  configurable: true,
  get: noop,
  set: noop
};

function proxy (target, sourceKey, key) {
  sharedPropertyDefinition.get = function proxyGetter () {
    return this[sourceKey][key]
  };
  sharedPropertyDefinition.set = function proxySetter (val) {
    this[sourceKey][key] = val;
  };
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function initState (vm) {
  vm._watchers = [];
  var opts = vm.$options;
  if (opts.props) { initProps(vm, opts.props); }
  if (opts.methods) { initMethods(vm, opts.methods); }
  if (opts.data) {
    initData(vm);
  } else {
    observe(vm._data = {}, true /* asRootData */);
  }
  if (opts.computed) { initComputed(vm, opts.computed); }
  if (opts.watch && opts.watch !== nativeWatch) {
    initWatch(vm, opts.watch);
  }
}

function initProps (vm, propsOptions) {
  var propsData = vm.$options.propsData || {};
  var props = vm._props = {};
  // cache prop keys so that future props updates can iterate using Array
  // instead of dynamic object key enumeration.
  var keys = vm.$options._propKeys = [];
  var isRoot = !vm.$parent;
  // root instance props should be converted
  observerState.shouldConvert = isRoot;
  var loop = function ( key ) {
    keys.push(key);
    var value = validateProp(key, propsOptions, propsData, vm);
    /* istanbul ignore else */
    if (process.env.NODE_ENV !== 'production') {
      var hyphenatedKey = hyphenate(key);
      if (isReservedAttribute(hyphenatedKey) ||
          config.isReservedAttr(hyphenatedKey)) {
        warn(
          ("\"" + hyphenatedKey + "\" is a reserved attribute and cannot be used as component prop."),
          vm
        );
      }
      defineReactive(props, key, value, function () {
        if (vm.$parent && !isUpdatingChildComponent) {
          warn(
            "Avoid mutating a prop directly since the value will be " +
            "overwritten whenever the parent component re-renders. " +
            "Instead, use a data or computed property based on the prop's " +
            "value. Prop being mutated: \"" + key + "\"",
            vm
          );
        }
      });
    } else {
      defineReactive(props, key, value);
    }
    // static props are already proxied on the component's prototype
    // during Vue.extend(). We only need to proxy props defined at
    // instantiation here.
    if (!(key in vm)) {
      proxy(vm, "_props", key);
    }
  };

  for (var key in propsOptions) { loop( key ); }
  observerState.shouldConvert = true;
}

function initData (vm) {
  var data = vm.$options.data;
  data = vm._data = typeof data === 'function'
    ? getData(data, vm)
    : data || {};
  if (!isPlainObject(data)) {
    data = {};
    process.env.NODE_ENV !== 'production' && warn(
      'data functions should return an object:\n' +
      'https://vuejs.org/v2/guide/components.html#data-Must-Be-a-Function',
      vm
    );
  }
  // proxy data on instance
  var keys = Object.keys(data);
  var props = vm.$options.props;
  var methods = vm.$options.methods;
  var i = keys.length;
  while (i--) {
    var key = keys[i];
    if (process.env.NODE_ENV !== 'production') {
      if (methods && hasOwn(methods, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a data property."),
          vm
        );
      }
    }
    if (props && hasOwn(props, key)) {
      process.env.NODE_ENV !== 'production' && warn(
        "The data property \"" + key + "\" is already declared as a prop. " +
        "Use prop default value instead.",
        vm
      );
    } else if (!isReserved(key)) {
      proxy(vm, "_data", key);
    }
  }
  // observe data
  observe(data, true /* asRootData */);
}

function getData (data, vm) {
  try {
    return data.call(vm, vm)
  } catch (e) {
    handleError(e, vm, "data()");
    return {}
  }
}

var computedWatcherOptions = { lazy: true };

function initComputed (vm, computed) {
  // $flow-disable-line
  var watchers = vm._computedWatchers = Object.create(null);
  // computed properties are just getters during SSR
  var isSSR = isServerRendering();

  for (var key in computed) {
    var userDef = computed[key];
    var getter = typeof userDef === 'function' ? userDef : userDef.get;
    if (process.env.NODE_ENV !== 'production' && getter == null) {
      warn(
        ("Getter is missing for computed property \"" + key + "\"."),
        vm
      );
    }

    if (!isSSR) {
      // create internal watcher for the computed property.
      watchers[key] = new Watcher(
        vm,
        getter || noop,
        noop,
        computedWatcherOptions
      );
    }

    // component-defined computed properties are already defined on the
    // component prototype. We only need to define computed properties defined
    // at instantiation here.
    if (!(key in vm)) {
      defineComputed(vm, key, userDef);
    } else if (process.env.NODE_ENV !== 'production') {
      if (key in vm.$data) {
        warn(("The computed property \"" + key + "\" is already defined in data."), vm);
      } else if (vm.$options.props && key in vm.$options.props) {
        warn(("The computed property \"" + key + "\" is already defined as a prop."), vm);
      }
    }
  }
}

function defineComputed (
  target,
  key,
  userDef
) {
  var shouldCache = !isServerRendering();
  if (typeof userDef === 'function') {
    sharedPropertyDefinition.get = shouldCache
      ? createComputedGetter(key)
      : userDef;
    sharedPropertyDefinition.set = noop;
  } else {
    sharedPropertyDefinition.get = userDef.get
      ? shouldCache && userDef.cache !== false
        ? createComputedGetter(key)
        : userDef.get
      : noop;
    sharedPropertyDefinition.set = userDef.set
      ? userDef.set
      : noop;
  }
  if (process.env.NODE_ENV !== 'production' &&
      sharedPropertyDefinition.set === noop) {
    sharedPropertyDefinition.set = function () {
      warn(
        ("Computed property \"" + key + "\" was assigned to but it has no setter."),
        this
      );
    };
  }
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function createComputedGetter (key) {
  return function computedGetter () {
    var watcher = this._computedWatchers && this._computedWatchers[key];
    if (watcher) {
      if (watcher.dirty) {
        watcher.evaluate();
      }
      if (Dep.target) {
        watcher.depend();
      }
      return watcher.value
    }
  }
}

function initMethods (vm, methods) {
  var props = vm.$options.props;
  for (var key in methods) {
    if (process.env.NODE_ENV !== 'production') {
      if (methods[key] == null) {
        warn(
          "Method \"" + key + "\" has an undefined value in the component definition. " +
          "Did you reference the function correctly?",
          vm
        );
      }
      if (props && hasOwn(props, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a prop."),
          vm
        );
      }
      if ((key in vm) && isReserved(key)) {
        warn(
          "Method \"" + key + "\" conflicts with an existing Vue instance method. " +
          "Avoid defining component methods that start with _ or $."
        );
      }
    }
    vm[key] = methods[key] == null ? noop : bind(methods[key], vm);
  }
}

function initWatch (vm, watch) {
  for (var key in watch) {
    var handler = watch[key];
    if (Array.isArray(handler)) {
      for (var i = 0; i < handler.length; i++) {
        createWatcher(vm, key, handler[i]);
      }
    } else {
      createWatcher(vm, key, handler);
    }
  }
}

function createWatcher (
  vm,
  keyOrFn,
  handler,
  options
) {
  if (isPlainObject(handler)) {
    options = handler;
    handler = handler.handler;
  }
  if (typeof handler === 'string') {
    handler = vm[handler];
  }
  return vm.$watch(keyOrFn, handler, options)
}

function stateMixin (Vue) {
  // flow somehow has problems with directly declared definition object
  // when using Object.defineProperty, so we have to procedurally build up
  // the object here.
  var dataDef = {};
  dataDef.get = function () { return this._data };
  var propsDef = {};
  propsDef.get = function () { return this._props };
  if (process.env.NODE_ENV !== 'production') {
    dataDef.set = function (newData) {
      warn(
        'Avoid replacing instance root $data. ' +
        'Use nested data properties instead.',
        this
      );
    };
    propsDef.set = function () {
      warn("$props is readonly.", this);
    };
  }
  Object.defineProperty(Vue.prototype, '$data', dataDef);
  Object.defineProperty(Vue.prototype, '$props', propsDef);

  Vue.prototype.$set = set;
  Vue.prototype.$delete = del;

  Vue.prototype.$watch = function (
    expOrFn,
    cb,
    options
  ) {
    var vm = this;
    if (isPlainObject(cb)) {
      return createWatcher(vm, expOrFn, cb, options)
    }
    options = options || {};
    options.user = true;
    var watcher = new Watcher(vm, expOrFn, cb, options);
    if (options.immediate) {
      cb.call(vm, watcher.value);
    }
    return function unwatchFn () {
      watcher.teardown();
    }
  };
}

/*  */

function initProvide (vm) {
  var provide = vm.$options.provide;
  if (provide) {
    vm._provided = typeof provide === 'function'
      ? provide.call(vm)
      : provide;
  }
}

function initInjections (vm) {
  var result = resolveInject(vm.$options.inject, vm);
  if (result) {
    observerState.shouldConvert = false;
    Object.keys(result).forEach(function (key) {
      /* istanbul ignore else */
      if (process.env.NODE_ENV !== 'production') {
        defineReactive(vm, key, result[key], function () {
          warn(
            "Avoid mutating an injected value directly since the changes will be " +
            "overwritten whenever the provided component re-renders. " +
            "injection being mutated: \"" + key + "\"",
            vm
          );
        });
      } else {
        defineReactive(vm, key, result[key]);
      }
    });
    observerState.shouldConvert = true;
  }
}

function resolveInject (inject, vm) {
  if (inject) {
    // inject is :any because flow is not smart enough to figure out cached
    var result = Object.create(null);
    var keys = hasSymbol
      ? Reflect.ownKeys(inject).filter(function (key) {
        /* istanbul ignore next */
        return Object.getOwnPropertyDescriptor(inject, key).enumerable
      })
      : Object.keys(inject);

    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      var provideKey = inject[key].from;
      var source = vm;
      while (source) {
        if (source._provided && provideKey in source._provided) {
          result[key] = source._provided[provideKey];
          break
        }
        source = source.$parent;
      }
      if (!source) {
        if ('default' in inject[key]) {
          var provideDefault = inject[key].default;
          result[key] = typeof provideDefault === 'function'
            ? provideDefault.call(vm)
            : provideDefault;
        } else if (process.env.NODE_ENV !== 'production') {
          warn(("Injection \"" + key + "\" not found"), vm);
        }
      }
    }
    return result
  }
}

/*  */

/**
 * Runtime helper for rendering v-for lists.
 */
function renderList (
  val,
  render
) {
  var ret, i, l, keys, key;
  if (Array.isArray(val) || typeof val === 'string') {
    ret = new Array(val.length);
    for (i = 0, l = val.length; i < l; i++) {
      ret[i] = render(val[i], i);
    }
  } else if (typeof val === 'number') {
    ret = new Array(val);
    for (i = 0; i < val; i++) {
      ret[i] = render(i + 1, i);
    }
  } else if (isObject(val)) {
    keys = Object.keys(val);
    ret = new Array(keys.length);
    for (i = 0, l = keys.length; i < l; i++) {
      key = keys[i];
      ret[i] = render(val[key], key, i);
    }
  }
  if (isDef(ret)) {
    (ret)._isVList = true;
  }
  return ret
}

/*  */

/**
 * Runtime helper for rendering <slot>
 */
function renderSlot (
  name,
  fallback,
  props,
  bindObject
) {
  var scopedSlotFn = this.$scopedSlots[name];
  var nodes;
  if (scopedSlotFn) { // scoped slot
    props = props || {};
    if (bindObject) {
      if (process.env.NODE_ENV !== 'production' && !isObject(bindObject)) {
        warn(
          'slot v-bind without argument expects an Object',
          this
        );
      }
      props = extend(extend({}, bindObject), props);
    }
    nodes = scopedSlotFn(props) || fallback;
  } else {
    var slotNodes = this.$slots[name];
    // warn duplicate slot usage
    if (slotNodes) {
      if (process.env.NODE_ENV !== 'production' && slotNodes._rendered) {
        warn(
          "Duplicate presence of slot \"" + name + "\" found in the same render tree " +
          "- this will likely cause render errors.",
          this
        );
      }
      slotNodes._rendered = true;
    }
    nodes = slotNodes || fallback;
  }

  var target = props && props.slot;
  if (target) {
    return this.$createElement('template', { slot: target }, nodes)
  } else {
    return nodes
  }
}

/*  */

/**
 * Runtime helper for resolving filters
 */
function resolveFilter (id) {
  return resolveAsset(this.$options, 'filters', id, true) || identity
}

/*  */

/**
 * Runtime helper for checking keyCodes from config.
 * exposed as Vue.prototype._k
 * passing in eventKeyName as last argument separately for backwards compat
 */
function checkKeyCodes (
  eventKeyCode,
  key,
  builtInAlias,
  eventKeyName
) {
  var keyCodes = config.keyCodes[key] || builtInAlias;
  if (keyCodes) {
    if (Array.isArray(keyCodes)) {
      return keyCodes.indexOf(eventKeyCode) === -1
    } else {
      return keyCodes !== eventKeyCode
    }
  } else if (eventKeyName) {
    return hyphenate(eventKeyName) !== key
  }
}

/*  */

/**
 * Runtime helper for merging v-bind="object" into a VNode's data.
 */
function bindObjectProps (
  data,
  tag,
  value,
  asProp,
  isSync
) {
  if (value) {
    if (!isObject(value)) {
      process.env.NODE_ENV !== 'production' && warn(
        'v-bind without argument expects an Object or Array value',
        this
      );
    } else {
      if (Array.isArray(value)) {
        value = toObject(value);
      }
      var hash;
      var loop = function ( key ) {
        if (
          key === 'class' ||
          key === 'style' ||
          isReservedAttribute(key)
        ) {
          hash = data;
        } else {
          var type = data.attrs && data.attrs.type;
          hash = asProp || config.mustUseProp(tag, type, key)
            ? data.domProps || (data.domProps = {})
            : data.attrs || (data.attrs = {});
        }
        if (!(key in hash)) {
          hash[key] = value[key];

          if (isSync) {
            var on = data.on || (data.on = {});
            on[("update:" + key)] = function ($event) {
              value[key] = $event;
            };
          }
        }
      };

      for (var key in value) { loop( key ); }
    }
  }
  return data
}

/*  */

/**
 * Runtime helper for rendering static trees.
 */
function renderStatic (
  index,
  isInFor
) {
  var cached = this._staticTrees || (this._staticTrees = []);
  var tree = cached[index];
  // if has already-rendered static tree and not inside v-for,
  // we can reuse the same tree by doing a shallow clone.
  if (tree && !isInFor) {
    return Array.isArray(tree)
      ? cloneVNodes(tree)
      : cloneVNode(tree)
  }
  // otherwise, render a fresh tree.
  tree = cached[index] = this.$options.staticRenderFns[index].call(
    this._renderProxy,
    null,
    this // for render fns generated for functional component templates
  );
  markStatic(tree, ("__static__" + index), false);
  return tree
}

/**
 * Runtime helper for v-once.
 * Effectively it means marking the node as static with a unique key.
 */
function markOnce (
  tree,
  index,
  key
) {
  markStatic(tree, ("__once__" + index + (key ? ("_" + key) : "")), true);
  return tree
}

function markStatic (
  tree,
  key,
  isOnce
) {
  if (Array.isArray(tree)) {
    for (var i = 0; i < tree.length; i++) {
      if (tree[i] && typeof tree[i] !== 'string') {
        markStaticNode(tree[i], (key + "_" + i), isOnce);
      }
    }
  } else {
    markStaticNode(tree, key, isOnce);
  }
}

function markStaticNode (node, key, isOnce) {
  node.isStatic = true;
  node.key = key;
  node.isOnce = isOnce;
}

/*  */

function bindObjectListeners (data, value) {
  if (value) {
    if (!isPlainObject(value)) {
      process.env.NODE_ENV !== 'production' && warn(
        'v-on without argument expects an Object value',
        this
      );
    } else {
      var on = data.on = data.on ? extend({}, data.on) : {};
      for (var key in value) {
        var existing = on[key];
        var ours = value[key];
        on[key] = existing ? [].concat(existing, ours) : ours;
      }
    }
  }
  return data
}

/*  */

function installRenderHelpers (target) {
  target._o = markOnce;
  target._n = toNumber;
  target._s = toString;
  target._l = renderList;
  target._t = renderSlot;
  target._q = looseEqual;
  target._i = looseIndexOf;
  target._m = renderStatic;
  target._f = resolveFilter;
  target._k = checkKeyCodes;
  target._b = bindObjectProps;
  target._v = createTextVNode;
  target._e = createEmptyVNode;
  target._u = resolveScopedSlots;
  target._g = bindObjectListeners;
}

/*  */

function FunctionalRenderContext (
  data,
  props,
  children,
  parent,
  Ctor
) {
  var options = Ctor.options;
  this.data = data;
  this.props = props;
  this.children = children;
  this.parent = parent;
  this.listeners = data.on || emptyObject;
  this.injections = resolveInject(options.inject, parent);
  this.slots = function () { return resolveSlots(children, parent); };

  // ensure the createElement function in functional components
  // gets a unique context - this is necessary for correct named slot check
  var contextVm = Object.create(parent);
  var isCompiled = isTrue(options._compiled);
  var needNormalization = !isCompiled;

  // support for compiled functional template
  if (isCompiled) {
    // exposing $options for renderStatic()
    this.$options = options;
    // pre-resolve slots for renderSlot()
    this.$slots = this.slots();
    this.$scopedSlots = data.scopedSlots || emptyObject;
  }

  if (options._scopeId) {
    this._c = function (a, b, c, d) {
      var vnode = createElement(contextVm, a, b, c, d, needNormalization);
      if (vnode) {
        vnode.fnScopeId = options._scopeId;
        vnode.fnContext = parent;
      }
      return vnode
    };
  } else {
    this._c = function (a, b, c, d) { return createElement(contextVm, a, b, c, d, needNormalization); };
  }
}

installRenderHelpers(FunctionalRenderContext.prototype);

function createFunctionalComponent (
  Ctor,
  propsData,
  data,
  contextVm,
  children
) {
  var options = Ctor.options;
  var props = {};
  var propOptions = options.props;
  if (isDef(propOptions)) {
    for (var key in propOptions) {
      props[key] = validateProp(key, propOptions, propsData || emptyObject);
    }
  } else {
    if (isDef(data.attrs)) { mergeProps(props, data.attrs); }
    if (isDef(data.props)) { mergeProps(props, data.props); }
  }

  var renderContext = new FunctionalRenderContext(
    data,
    props,
    children,
    contextVm,
    Ctor
  );

  var vnode = options.render.call(null, renderContext._c, renderContext);

  if (vnode instanceof VNode) {
    vnode.fnContext = contextVm;
    vnode.fnOptions = options;
    if (data.slot) {
      (vnode.data || (vnode.data = {})).slot = data.slot;
    }
  }

  return vnode
}

function mergeProps (to, from) {
  for (var key in from) {
    to[camelize(key)] = from[key];
  }
}

/*  */




// Register the component hook to weex native render engine.
// The hook will be triggered by native, not javascript.


// Updates the state of the component to weex native render engine.

/*  */

// https://github.com/Hanks10100/weex-native-directive/tree/master/component

// listening on native callback

/*  */

/*  */

// hooks to be invoked on component VNodes during patch
var componentVNodeHooks = {
  init: function init (
    vnode,
    hydrating,
    parentElm,
    refElm
  ) {
    if (!vnode.componentInstance || vnode.componentInstance._isDestroyed) {
      var child = vnode.componentInstance = createComponentInstanceForVnode(
        vnode,
        activeInstance,
        parentElm,
        refElm
      );
      child.$mount(hydrating ? vnode.elm : undefined, hydrating);
    } else if (vnode.data.keepAlive) {
      // kept-alive components, treat as a patch
      var mountedNode = vnode; // work around flow
      componentVNodeHooks.prepatch(mountedNode, mountedNode);
    }
  },

  prepatch: function prepatch (oldVnode, vnode) {
    var options = vnode.componentOptions;
    var child = vnode.componentInstance = oldVnode.componentInstance;
    updateChildComponent(
      child,
      options.propsData, // updated props
      options.listeners, // updated listeners
      vnode, // new parent vnode
      options.children // new children
    );
  },

  insert: function insert (vnode) {
    var context = vnode.context;
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isMounted) {
      componentInstance._isMounted = true;
      callHook(componentInstance, 'mounted');
    }
    if (vnode.data.keepAlive) {
      if (context._isMounted) {
        // vue-router#1212
        // During updates, a kept-alive component's child components may
        // change, so directly walking the tree here may call activated hooks
        // on incorrect children. Instead we push them into a queue which will
        // be processed after the whole patch process ended.
        queueActivatedComponent(componentInstance);
      } else {
        activateChildComponent(componentInstance, true /* direct */);
      }
    }
  },

  destroy: function destroy (vnode) {
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isDestroyed) {
      if (!vnode.data.keepAlive) {
        componentInstance.$destroy();
      } else {
        deactivateChildComponent(componentInstance, true /* direct */);
      }
    }
  }
};

var hooksToMerge = Object.keys(componentVNodeHooks);

function createComponent (
  Ctor,
  data,
  context,
  children,
  tag
) {
  if (isUndef(Ctor)) {
    return
  }

  var baseCtor = context.$options._base;

  // plain options object: turn it into a constructor
  if (isObject(Ctor)) {
    Ctor = baseCtor.extend(Ctor);
  }

  // if at this stage it's not a constructor or an async component factory,
  // reject.
  if (typeof Ctor !== 'function') {
    if (process.env.NODE_ENV !== 'production') {
      warn(("Invalid Component definition: " + (String(Ctor))), context);
    }
    return
  }

  // async component
  var asyncFactory;
  if (isUndef(Ctor.cid)) {
    asyncFactory = Ctor;
    Ctor = resolveAsyncComponent(asyncFactory, baseCtor, context);
    if (Ctor === undefined) {
      // return a placeholder node for async component, which is rendered
      // as a comment node but preserves all the raw information for the node.
      // the information will be used for async server-rendering and hydration.
      return createAsyncPlaceholder(
        asyncFactory,
        data,
        context,
        children,
        tag
      )
    }
  }

  data = data || {};

  // resolve constructor options in case global mixins are applied after
  // component constructor creation
  resolveConstructorOptions(Ctor);

  // transform component v-model data into props & events
  if (isDef(data.model)) {
    transformModel(Ctor.options, data);
  }

  // extract props
  var propsData = extractPropsFromVNodeData(data, Ctor, tag);

  // functional component
  if (isTrue(Ctor.options.functional)) {
    return createFunctionalComponent(Ctor, propsData, data, context, children)
  }

  // extract listeners, since these needs to be treated as
  // child component listeners instead of DOM listeners
  var listeners = data.on;
  // replace with listeners with .native modifier
  // so it gets processed during parent component patch.
  data.on = data.nativeOn;

  if (isTrue(Ctor.options.abstract)) {
    // abstract components do not keep anything
    // other than props & listeners & slot

    // work around flow
    var slot = data.slot;
    data = {};
    if (slot) {
      data.slot = slot;
    }
  }

  // merge component management hooks onto the placeholder node
  mergeHooks(data);

  // return a placeholder vnode
  var name = Ctor.options.name || tag;
  var vnode = new VNode(
    ("vue-component-" + (Ctor.cid) + (name ? ("-" + name) : '')),
    data, undefined, undefined, undefined, context,
    { Ctor: Ctor, propsData: propsData, listeners: listeners, tag: tag, children: children },
    asyncFactory
  );

  // Weex specific: invoke recycle-list optimized @render function for
  // extracting cell-slot template.
  // https://github.com/Hanks10100/weex-native-directive/tree/master/component
  /* istanbul ignore if */
  return vnode
}

function createComponentInstanceForVnode (
  vnode, // we know it's MountedComponentVNode but flow doesn't
  parent, // activeInstance in lifecycle state
  parentElm,
  refElm
) {
  var options = {
    _isComponent: true,
    parent: parent,
    _parentVnode: vnode,
    _parentElm: parentElm || null,
    _refElm: refElm || null
  };
  // check inline-template render functions
  var inlineTemplate = vnode.data.inlineTemplate;
  if (isDef(inlineTemplate)) {
    options.render = inlineTemplate.render;
    options.staticRenderFns = inlineTemplate.staticRenderFns;
  }
  return new vnode.componentOptions.Ctor(options)
}

function mergeHooks (data) {
  if (!data.hook) {
    data.hook = {};
  }
  for (var i = 0; i < hooksToMerge.length; i++) {
    var key = hooksToMerge[i];
    var fromParent = data.hook[key];
    var ours = componentVNodeHooks[key];
    data.hook[key] = fromParent ? mergeHook$1(ours, fromParent) : ours;
  }
}

function mergeHook$1 (one, two) {
  return function (a, b, c, d) {
    one(a, b, c, d);
    two(a, b, c, d);
  }
}

// transform component v-model info (value and callback) into
// prop and event handler respectively.
function transformModel (options, data) {
  var prop = (options.model && options.model.prop) || 'value';
  var event = (options.model && options.model.event) || 'input';(data.props || (data.props = {}))[prop] = data.model.value;
  var on = data.on || (data.on = {});
  if (isDef(on[event])) {
    on[event] = [data.model.callback].concat(on[event]);
  } else {
    on[event] = data.model.callback;
  }
}

/*  */

var SIMPLE_NORMALIZE = 1;
var ALWAYS_NORMALIZE = 2;

// wrapper function for providing a more flexible interface
// without getting yelled at by flow
function createElement (
  context,
  tag,
  data,
  children,
  normalizationType,
  alwaysNormalize
) {
  if (Array.isArray(data) || isPrimitive(data)) {
    normalizationType = children;
    children = data;
    data = undefined;
  }
  if (isTrue(alwaysNormalize)) {
    normalizationType = ALWAYS_NORMALIZE;
  }
  return _createElement(context, tag, data, children, normalizationType)
}

function _createElement (
  context,
  tag,
  data,
  children,
  normalizationType
) {
  if (isDef(data) && isDef((data).__ob__)) {
    process.env.NODE_ENV !== 'production' && warn(
      "Avoid using observed data object as vnode data: " + (JSON.stringify(data)) + "\n" +
      'Always create fresh vnode data objects in each render!',
      context
    );
    return createEmptyVNode()
  }
  // object syntax in v-bind
  if (isDef(data) && isDef(data.is)) {
    tag = data.is;
  }
  if (!tag) {
    // in case of component :is set to falsy value
    return createEmptyVNode()
  }
  // warn against non-primitive key
  if (process.env.NODE_ENV !== 'production' &&
    isDef(data) && isDef(data.key) && !isPrimitive(data.key)
  ) {
    {
      warn(
        'Avoid using non-primitive value as key, ' +
        'use string/number value instead.',
        context
      );
    }
  }
  // support single function children as default scoped slot
  if (Array.isArray(children) &&
    typeof children[0] === 'function'
  ) {
    data = data || {};
    data.scopedSlots = { default: children[0] };
    children.length = 0;
  }
  if (normalizationType === ALWAYS_NORMALIZE) {
    children = normalizeChildren(children);
  } else if (normalizationType === SIMPLE_NORMALIZE) {
    children = simpleNormalizeChildren(children);
  }
  var vnode, ns;
  if (typeof tag === 'string') {
    var Ctor;
    ns = (context.$vnode && context.$vnode.ns) || config.getTagNamespace(tag);
    if (config.isReservedTag(tag)) {
      // platform built-in elements
      vnode = new VNode(
        config.parsePlatformTagName(tag), data, children,
        undefined, undefined, context
      );
    } else if (isDef(Ctor = resolveAsset(context.$options, 'components', tag))) {
      // component
      vnode = createComponent(Ctor, data, context, children, tag);
    } else {
      // unknown or unlisted namespaced elements
      // check at runtime because it may get assigned a namespace when its
      // parent normalizes children
      vnode = new VNode(
        tag, data, children,
        undefined, undefined, context
      );
    }
  } else {
    // direct component options / constructor
    vnode = createComponent(tag, data, context, children);
  }
  if (isDef(vnode)) {
    if (ns) { applyNS(vnode, ns); }
    return vnode
  } else {
    return createEmptyVNode()
  }
}

function applyNS (vnode, ns, force) {
  vnode.ns = ns;
  if (vnode.tag === 'foreignObject') {
    // use default namespace inside foreignObject
    ns = undefined;
    force = true;
  }
  if (isDef(vnode.children)) {
    for (var i = 0, l = vnode.children.length; i < l; i++) {
      var child = vnode.children[i];
      if (isDef(child.tag) && (isUndef(child.ns) || isTrue(force))) {
        applyNS(child, ns, force);
      }
    }
  }
}

/*  */

function initRender (vm) {
  vm._vnode = null; // the root of the child tree
  vm._staticTrees = null; // v-once cached trees
  var options = vm.$options;
  var parentVnode = vm.$vnode = options._parentVnode; // the placeholder node in parent tree
  var renderContext = parentVnode && parentVnode.context;
  vm.$slots = resolveSlots(options._renderChildren, renderContext);
  vm.$scopedSlots = emptyObject;
  // bind the createElement fn to this instance
  // so that we get proper render context inside it.
  // args order: tag, data, children, normalizationType, alwaysNormalize
  // internal version is used by render functions compiled from templates
  vm._c = function (a, b, c, d) { return createElement(vm, a, b, c, d, false); };
  // normalization is always applied for the public version, used in
  // user-written render functions.
  vm.$createElement = function (a, b, c, d) { return createElement(vm, a, b, c, d, true); };

  // $attrs & $listeners are exposed for easier HOC creation.
  // they need to be reactive so that HOCs using them are always updated
  var parentData = parentVnode && parentVnode.data;

  /* istanbul ignore else */
  if (process.env.NODE_ENV !== 'production') {
    defineReactive(vm, '$attrs', parentData && parentData.attrs || emptyObject, function () {
      !isUpdatingChildComponent && warn("$attrs is readonly.", vm);
    }, true);
    defineReactive(vm, '$listeners', options._parentListeners || emptyObject, function () {
      !isUpdatingChildComponent && warn("$listeners is readonly.", vm);
    }, true);
  } else {
    defineReactive(vm, '$attrs', parentData && parentData.attrs || emptyObject, null, true);
    defineReactive(vm, '$listeners', options._parentListeners || emptyObject, null, true);
  }
}

function renderMixin (Vue) {
  // install runtime convenience helpers
  installRenderHelpers(Vue.prototype);

  Vue.prototype.$nextTick = function (fn) {
    return nextTick(fn, this)
  };

  Vue.prototype._render = function () {
    var vm = this;
    var ref = vm.$options;
    var render = ref.render;
    var _parentVnode = ref._parentVnode;

    if (vm._isMounted) {
      // if the parent didn't update, the slot nodes will be the ones from
      // last render. They need to be cloned to ensure "freshness" for this render.
      for (var key in vm.$slots) {
        var slot = vm.$slots[key];
        // _rendered is a flag added by renderSlot, but may not be present
        // if the slot is passed from manually written render functions
        if (slot._rendered || (slot[0] && slot[0].elm)) {
          vm.$slots[key] = cloneVNodes(slot, true /* deep */);
        }
      }
    }

    vm.$scopedSlots = (_parentVnode && _parentVnode.data.scopedSlots) || emptyObject;

    // set parent vnode. this allows render functions to have access
    // to the data on the placeholder node.
    vm.$vnode = _parentVnode;
    // render self
    var vnode;
    try {
      vnode = render.call(vm._renderProxy, vm.$createElement);
    } catch (e) {
      handleError(e, vm, "render");
      // return error render result,
      // or previous vnode to prevent render error causing blank component
      /* istanbul ignore else */
      if (process.env.NODE_ENV !== 'production') {
        if (vm.$options.renderError) {
          try {
            vnode = vm.$options.renderError.call(vm._renderProxy, vm.$createElement, e);
          } catch (e) {
            handleError(e, vm, "renderError");
            vnode = vm._vnode;
          }
        } else {
          vnode = vm._vnode;
        }
      } else {
        vnode = vm._vnode;
      }
    }
    // return empty vnode in case the render function errored out
    if (!(vnode instanceof VNode)) {
      if (process.env.NODE_ENV !== 'production' && Array.isArray(vnode)) {
        warn(
          'Multiple root nodes returned from render function. Render function ' +
          'should return a single root node.',
          vm
        );
      }
      vnode = createEmptyVNode();
    }
    // set parent
    vnode.parent = _parentVnode;
    return vnode
  };
}

/*  */

var uid = 0;

function initMixin (Vue) {
  Vue.prototype._init = function (options) {
    var vm = this;
    // a uid
    vm._uid = uid++;

    var startTag, endTag;
    /* istanbul ignore if */
    if (process.env.NODE_ENV !== 'production' && config.performance && mark) {
      startTag = "vue-perf-start:" + (vm._uid);
      endTag = "vue-perf-end:" + (vm._uid);
      mark(startTag);
    }

    // a flag to avoid this being observed
    vm._isVue = true;
    // merge options
    if (options && options._isComponent) {
      // optimize internal component instantiation
      // since dynamic options merging is pretty slow, and none of the
      // internal component options needs special treatment.
      initInternalComponent(vm, options);
    } else {
      vm.$options = mergeOptions(
        resolveConstructorOptions(vm.constructor),
        options || {},
        vm
      );
    }
    /* istanbul ignore else */
    if (process.env.NODE_ENV !== 'production') {
      initProxy(vm);
    } else {
      vm._renderProxy = vm;
    }
    // expose real self
    vm._self = vm;
    initLifecycle(vm);
    initEvents(vm);
    initRender(vm);
    callHook(vm, 'beforeCreate');
    initInjections(vm); // resolve injections before data/props
    initState(vm);
    initProvide(vm); // resolve provide after data/props
    callHook(vm, 'created');

    /* istanbul ignore if */
    if (process.env.NODE_ENV !== 'production' && config.performance && mark) {
      vm._name = formatComponentName(vm, false);
      mark(endTag);
      measure(("vue " + (vm._name) + " init"), startTag, endTag);
    }

    if (vm.$options.el) {
      vm.$mount(vm.$options.el);
    }
  };
}

function initInternalComponent (vm, options) {
  var opts = vm.$options = Object.create(vm.constructor.options);
  // doing this because it's faster than dynamic enumeration.
  var parentVnode = options._parentVnode;
  opts.parent = options.parent;
  opts._parentVnode = parentVnode;
  opts._parentElm = options._parentElm;
  opts._refElm = options._refElm;

  var vnodeComponentOptions = parentVnode.componentOptions;
  opts.propsData = vnodeComponentOptions.propsData;
  opts._parentListeners = vnodeComponentOptions.listeners;
  opts._renderChildren = vnodeComponentOptions.children;
  opts._componentTag = vnodeComponentOptions.tag;

  if (options.render) {
    opts.render = options.render;
    opts.staticRenderFns = options.staticRenderFns;
  }
}

function resolveConstructorOptions (Ctor) {
  var options = Ctor.options;
  if (Ctor.super) {
    var superOptions = resolveConstructorOptions(Ctor.super);
    var cachedSuperOptions = Ctor.superOptions;
    if (superOptions !== cachedSuperOptions) {
      // super option changed,
      // need to resolve new options.
      Ctor.superOptions = superOptions;
      // check if there are any late-modified/attached options (#4976)
      var modifiedOptions = resolveModifiedOptions(Ctor);
      // update base extend options
      if (modifiedOptions) {
        extend(Ctor.extendOptions, modifiedOptions);
      }
      options = Ctor.options = mergeOptions(superOptions, Ctor.extendOptions);
      if (options.name) {
        options.components[options.name] = Ctor;
      }
    }
  }
  return options
}

function resolveModifiedOptions (Ctor) {
  var modified;
  var latest = Ctor.options;
  var extended = Ctor.extendOptions;
  var sealed = Ctor.sealedOptions;
  for (var key in latest) {
    if (latest[key] !== sealed[key]) {
      if (!modified) { modified = {}; }
      modified[key] = dedupe(latest[key], extended[key], sealed[key]);
    }
  }
  return modified
}

function dedupe (latest, extended, sealed) {
  // compare latest and sealed to ensure lifecycle hooks won't be duplicated
  // between merges
  if (Array.isArray(latest)) {
    var res = [];
    sealed = Array.isArray(sealed) ? sealed : [sealed];
    extended = Array.isArray(extended) ? extended : [extended];
    for (var i = 0; i < latest.length; i++) {
      // push original options and not sealed options to exclude duplicated options
      if (extended.indexOf(latest[i]) >= 0 || sealed.indexOf(latest[i]) < 0) {
        res.push(latest[i]);
      }
    }
    return res
  } else {
    return latest
  }
}

function Vue$3 (options) {
  if (process.env.NODE_ENV !== 'production' &&
    !(this instanceof Vue$3)
  ) {
    warn('Vue is a constructor and should be called with the `new` keyword');
  }
  this._init(options);
}

initMixin(Vue$3);
stateMixin(Vue$3);
eventsMixin(Vue$3);
lifecycleMixin(Vue$3);
renderMixin(Vue$3);

/*  */

function initUse (Vue) {
  Vue.use = function (plugin) {
    var installedPlugins = (this._installedPlugins || (this._installedPlugins = []));
    if (installedPlugins.indexOf(plugin) > -1) {
      return this
    }

    // additional parameters
    var args = toArray(arguments, 1);
    args.unshift(this);
    if (typeof plugin.install === 'function') {
      plugin.install.apply(plugin, args);
    } else if (typeof plugin === 'function') {
      plugin.apply(null, args);
    }
    installedPlugins.push(plugin);
    return this
  };
}

/*  */

function initMixin$1 (Vue) {
  Vue.mixin = function (mixin) {
    this.options = mergeOptions(this.options, mixin);
    return this
  };
}

/*  */

function initExtend (Vue) {
  /**
   * Each instance constructor, including Vue, has a unique
   * cid. This enables us to create wrapped "child
   * constructors" for prototypal inheritance and cache them.
   */
  Vue.cid = 0;
  var cid = 1;

  /**
   * Class inheritance
   */
  Vue.extend = function (extendOptions) {
    extendOptions = extendOptions || {};
    var Super = this;
    var SuperId = Super.cid;
    var cachedCtors = extendOptions._Ctor || (extendOptions._Ctor = {});
    if (cachedCtors[SuperId]) {
      return cachedCtors[SuperId]
    }

    var name = extendOptions.name || Super.options.name;
    if (process.env.NODE_ENV !== 'production' && name) {
      validateComponentName(name);
    }

    var Sub = function VueComponent (options) {
      this._init(options);
    };
    Sub.prototype = Object.create(Super.prototype);
    Sub.prototype.constructor = Sub;
    Sub.cid = cid++;
    Sub.options = mergeOptions(
      Super.options,
      extendOptions
    );
    Sub['super'] = Super;

    // For props and computed properties, we define the proxy getters on
    // the Vue instances at extension time, on the extended prototype. This
    // avoids Object.defineProperty calls for each instance created.
    if (Sub.options.props) {
      initProps$1(Sub);
    }
    if (Sub.options.computed) {
      initComputed$1(Sub);
    }

    // allow further extension/mixin/plugin usage
    Sub.extend = Super.extend;
    Sub.mixin = Super.mixin;
    Sub.use = Super.use;

    // create asset registers, so extended classes
    // can have their private assets too.
    ASSET_TYPES.forEach(function (type) {
      Sub[type] = Super[type];
    });
    // enable recursive self-lookup
    if (name) {
      Sub.options.components[name] = Sub;
    }

    // keep a reference to the super options at extension time.
    // later at instantiation we can check if Super's options have
    // been updated.
    Sub.superOptions = Super.options;
    Sub.extendOptions = extendOptions;
    Sub.sealedOptions = extend({}, Sub.options);

    // cache constructor
    cachedCtors[SuperId] = Sub;
    return Sub
  };
}

function initProps$1 (Comp) {
  var props = Comp.options.props;
  for (var key in props) {
    proxy(Comp.prototype, "_props", key);
  }
}

function initComputed$1 (Comp) {
  var computed = Comp.options.computed;
  for (var key in computed) {
    defineComputed(Comp.prototype, key, computed[key]);
  }
}

/*  */

function initAssetRegisters (Vue) {
  /**
   * Create asset registration methods.
   */
  ASSET_TYPES.forEach(function (type) {
    Vue[type] = function (
      id,
      definition
    ) {
      if (!definition) {
        return this.options[type + 's'][id]
      } else {
        /* istanbul ignore if */
        if (process.env.NODE_ENV !== 'production' && type === 'component') {
          validateComponentName(id);
        }
        if (type === 'component' && isPlainObject(definition)) {
          definition.name = definition.name || id;
          definition = this.options._base.extend(definition);
        }
        if (type === 'directive' && typeof definition === 'function') {
          definition = { bind: definition, update: definition };
        }
        this.options[type + 's'][id] = definition;
        return definition
      }
    };
  });
}

/*  */

function getComponentName (opts) {
  return opts && (opts.Ctor.options.name || opts.tag)
}

function matches (pattern, name) {
  if (Array.isArray(pattern)) {
    return pattern.indexOf(name) > -1
  } else if (typeof pattern === 'string') {
    return pattern.split(',').indexOf(name) > -1
  } else if (isRegExp(pattern)) {
    return pattern.test(name)
  }
  /* istanbul ignore next */
  return false
}

function pruneCache (keepAliveInstance, filter) {
  var cache = keepAliveInstance.cache;
  var keys = keepAliveInstance.keys;
  var _vnode = keepAliveInstance._vnode;
  for (var key in cache) {
    var cachedNode = cache[key];
    if (cachedNode) {
      var name = getComponentName(cachedNode.componentOptions);
      if (name && !filter(name)) {
        pruneCacheEntry(cache, key, keys, _vnode);
      }
    }
  }
}

function pruneCacheEntry (
  cache,
  key,
  keys,
  current
) {
  var cached$$1 = cache[key];
  if (cached$$1 && (!current || cached$$1.tag !== current.tag)) {
    cached$$1.componentInstance.$destroy();
  }
  cache[key] = null;
  remove(keys, key);
}

var patternTypes = [String, RegExp, Array];

var KeepAlive = {
  name: 'keep-alive',
  abstract: true,

  props: {
    include: patternTypes,
    exclude: patternTypes,
    max: [String, Number]
  },

  created: function created () {
    this.cache = Object.create(null);
    this.keys = [];
  },

  destroyed: function destroyed () {
    var this$1 = this;

    for (var key in this$1.cache) {
      pruneCacheEntry(this$1.cache, key, this$1.keys);
    }
  },

  watch: {
    include: function include (val) {
      pruneCache(this, function (name) { return matches(val, name); });
    },
    exclude: function exclude (val) {
      pruneCache(this, function (name) { return !matches(val, name); });
    }
  },

  render: function render () {
    var slot = this.$slots.default;
    var vnode = getFirstComponentChild(slot);
    var componentOptions = vnode && vnode.componentOptions;
    if (componentOptions) {
      // check pattern
      var name = getComponentName(componentOptions);
      var ref = this;
      var include = ref.include;
      var exclude = ref.exclude;
      if (
        // not included
        (include && (!name || !matches(include, name))) ||
        // excluded
        (exclude && name && matches(exclude, name))
      ) {
        return vnode
      }

      var ref$1 = this;
      var cache = ref$1.cache;
      var keys = ref$1.keys;
      var key = vnode.key == null
        // same constructor may get registered as different local components
        // so cid alone is not enough (#3269)
        ? componentOptions.Ctor.cid + (componentOptions.tag ? ("::" + (componentOptions.tag)) : '')
        : vnode.key;
      if (cache[key]) {
        vnode.componentInstance = cache[key].componentInstance;
        // make current key freshest
        remove(keys, key);
        keys.push(key);
      } else {
        cache[key] = vnode;
        keys.push(key);
        // prune oldest entry
        if (this.max && keys.length > parseInt(this.max)) {
          pruneCacheEntry(cache, keys[0], keys, this._vnode);
        }
      }

      vnode.data.keepAlive = true;
    }
    return vnode || (slot && slot[0])
  }
};

var builtInComponents = {
  KeepAlive: KeepAlive
};

/*  */

function initGlobalAPI (Vue) {
  // config
  var configDef = {};
  configDef.get = function () { return config; };
  if (process.env.NODE_ENV !== 'production') {
    configDef.set = function () {
      warn(
        'Do not replace the Vue.config object, set individual fields instead.'
      );
    };
  }
  Object.defineProperty(Vue, 'config', configDef);

  // exposed util methods.
  // NOTE: these are not considered part of the public API - avoid relying on
  // them unless you are aware of the risk.
  Vue.util = {
    warn: warn,
    extend: extend,
    mergeOptions: mergeOptions,
    defineReactive: defineReactive
  };

  Vue.set = set;
  Vue.delete = del;
  Vue.nextTick = nextTick;

  Vue.options = Object.create(null);
  ASSET_TYPES.forEach(function (type) {
    Vue.options[type + 's'] = Object.create(null);
  });

  // this is used to identify the "base" constructor to extend all plain-object
  // components with in Weex's multi-instance scenarios.
  Vue.options._base = Vue;

  extend(Vue.options.components, builtInComponents);

  initUse(Vue);
  initMixin$1(Vue);
  initExtend(Vue);
  initAssetRegisters(Vue);
}

initGlobalAPI(Vue$3);

Object.defineProperty(Vue$3.prototype, '$isServer', {
  get: isServerRendering
});

Object.defineProperty(Vue$3.prototype, '$ssrContext', {
  get: function get () {
    /* istanbul ignore next */
    return this.$vnode && this.$vnode.ssrContext
  }
});

Vue$3.version = '2.5.13';

/*  */

// these are reserved for web because they are directly compiled away
// during template compilation
var isReservedAttr = makeMap('style,class');

// attributes that should be using props for binding
var acceptValue = makeMap('input,textarea,option,select,progress');
var mustUseProp = function (tag, type, attr) {
  return (
    (attr === 'value' && acceptValue(tag)) && type !== 'button' ||
    (attr === 'selected' && tag === 'option') ||
    (attr === 'checked' && tag === 'input') ||
    (attr === 'muted' && tag === 'video')
  )
};

var isEnumeratedAttr = makeMap('contenteditable,draggable,spellcheck');

var isBooleanAttr = makeMap(
  'allowfullscreen,async,autofocus,autoplay,checked,compact,controls,declare,' +
  'default,defaultchecked,defaultmuted,defaultselected,defer,disabled,' +
  'enabled,formnovalidate,hidden,indeterminate,inert,ismap,itemscope,loop,multiple,' +
  'muted,nohref,noresize,noshade,novalidate,nowrap,open,pauseonexit,readonly,' +
  'required,reversed,scoped,seamless,selected,sortable,translate,' +
  'truespeed,typemustmatch,visible'
);

var xlinkNS = 'http://www.w3.org/1999/xlink';

var isXlink = function (name) {
  return name.charAt(5) === ':' && name.slice(0, 5) === 'xlink'
};

var getXlinkProp = function (name) {
  return isXlink(name) ? name.slice(6, name.length) : ''
};

var isFalsyAttrValue = function (val) {
  return val == null || val === false
};

/*  */

function genClassForVnode (vnode) {
  var data = vnode.data;
  var parentNode = vnode;
  var childNode = vnode;
  while (isDef(childNode.componentInstance)) {
    childNode = childNode.componentInstance._vnode;
    if (childNode && childNode.data) {
      data = mergeClassData(childNode.data, data);
    }
  }
  while (isDef(parentNode = parentNode.parent)) {
    if (parentNode && parentNode.data) {
      data = mergeClassData(data, parentNode.data);
    }
  }
  return renderClass(data.staticClass, data.class)
}

function mergeClassData (child, parent) {
  return {
    staticClass: concat(child.staticClass, parent.staticClass),
    class: isDef(child.class)
      ? [child.class, parent.class]
      : parent.class
  }
}

function renderClass (
  staticClass,
  dynamicClass
) {
  if (isDef(staticClass) || isDef(dynamicClass)) {
    return concat(staticClass, stringifyClass(dynamicClass))
  }
  /* istanbul ignore next */
  return ''
}

function concat (a, b) {
  return a ? b ? (a + ' ' + b) : a : (b || '')
}

function stringifyClass (value) {
  if (Array.isArray(value)) {
    return stringifyArray(value)
  }
  if (isObject(value)) {
    return stringifyObject(value)
  }
  if (typeof value === 'string') {
    return value
  }
  /* istanbul ignore next */
  return ''
}

function stringifyArray (value) {
  var res = '';
  var stringified;
  for (var i = 0, l = value.length; i < l; i++) {
    if (isDef(stringified = stringifyClass(value[i])) && stringified !== '') {
      if (res) { res += ' '; }
      res += stringified;
    }
  }
  return res
}

function stringifyObject (value) {
  var res = '';
  for (var key in value) {
    if (value[key]) {
      if (res) { res += ' '; }
      res += key;
    }
  }
  return res
}

/*  */

var namespaceMap = {
  svg: 'http://www.w3.org/2000/svg',
  math: 'http://www.w3.org/1998/Math/MathML'
};

var isHTMLTag = makeMap(
  'html,body,base,head,link,meta,style,title,' +
  'address,article,aside,footer,header,h1,h2,h3,h4,h5,h6,hgroup,nav,section,' +
  'div,dd,dl,dt,figcaption,figure,picture,hr,img,li,main,ol,p,pre,ul,' +
  'a,b,abbr,bdi,bdo,br,cite,code,data,dfn,em,i,kbd,mark,q,rp,rt,rtc,ruby,' +
  's,samp,small,span,strong,sub,sup,time,u,var,wbr,area,audio,map,track,video,' +
  'embed,object,param,source,canvas,script,noscript,del,ins,' +
  'caption,col,colgroup,table,thead,tbody,td,th,tr,' +
  'button,datalist,fieldset,form,input,label,legend,meter,optgroup,option,' +
  'output,progress,select,textarea,' +
  'details,dialog,menu,menuitem,summary,' +
  'content,element,shadow,template,blockquote,iframe,tfoot'
);

// this map is intentionally selective, only covering SVG elements that may
// contain child elements.
var isSVG = makeMap(
  'svg,animate,circle,clippath,cursor,defs,desc,ellipse,filter,font-face,' +
  'foreignObject,g,glyph,image,line,marker,mask,missing-glyph,path,pattern,' +
  'polygon,polyline,rect,switch,symbol,text,textpath,tspan,use,view',
  true
);



var isReservedTag = function (tag) {
  return isHTMLTag(tag) || isSVG(tag)
};

function getTagNamespace (tag) {
  if (isSVG(tag)) {
    return 'svg'
  }
  // basic support for MathML
  // note it doesn't support other MathML elements being component roots
  if (tag === 'math') {
    return 'math'
  }
}

var unknownElementCache = Object.create(null);
function isUnknownElement (tag) {
  /* istanbul ignore if */
  if (!inBrowser) {
    return true
  }
  if (isReservedTag(tag)) {
    return false
  }
  tag = tag.toLowerCase();
  /* istanbul ignore if */
  if (unknownElementCache[tag] != null) {
    return unknownElementCache[tag]
  }
  var el = document.createElement(tag);
  if (tag.indexOf('-') > -1) {
    // http://stackoverflow.com/a/28210364/1070244
    return (unknownElementCache[tag] = (
      el.constructor === window.HTMLUnknownElement ||
      el.constructor === window.HTMLElement
    ))
  } else {
    return (unknownElementCache[tag] = /HTMLUnknownElement/.test(el.toString()))
  }
}

var isTextInputType = makeMap('text,number,password,search,email,tel,url');

/*  */

/**
 * Query an element selector if it's not an element already.
 */
function query (el) {
  if (typeof el === 'string') {
    var selected = document.querySelector(el);
    if (!selected) {
      process.env.NODE_ENV !== 'production' && warn(
        'Cannot find element: ' + el
      );
      return document.createElement('div')
    }
    return selected
  } else {
    return el
  }
}

/*  */

function createElement$1 (tagName, vnode) {
  var elm = document.createElement(tagName);
  if (tagName !== 'select') {
    return elm
  }
  // false or null will remove the attribute but undefined will not
  if (vnode.data && vnode.data.attrs && vnode.data.attrs.multiple !== undefined) {
    elm.setAttribute('multiple', 'multiple');
  }
  return elm
}

function createElementNS (namespace, tagName) {
  return document.createElementNS(namespaceMap[namespace], tagName)
}

function createTextNode (text) {
  return document.createTextNode(text)
}

function createComment (text) {
  return document.createComment(text)
}

function insertBefore (parentNode, newNode, referenceNode) {
  parentNode.insertBefore(newNode, referenceNode);
}

function removeChild (node, child) {
  node.removeChild(child);
}

function appendChild (node, child) {
  node.appendChild(child);
}

function parentNode (node) {
  return node.parentNode
}

function nextSibling (node) {
  return node.nextSibling
}

function tagName (node) {
  return node.tagName
}

function setTextContent (node, text) {
  node.textContent = text;
}

function setAttribute (node, key, val) {
  node.setAttribute(key, val);
}


var nodeOps = Object.freeze({
	createElement: createElement$1,
	createElementNS: createElementNS,
	createTextNode: createTextNode,
	createComment: createComment,
	insertBefore: insertBefore,
	removeChild: removeChild,
	appendChild: appendChild,
	parentNode: parentNode,
	nextSibling: nextSibling,
	tagName: tagName,
	setTextContent: setTextContent,
	setAttribute: setAttribute
});

/*  */

var ref = {
  create: function create (_, vnode) {
    registerRef(vnode);
  },
  update: function update (oldVnode, vnode) {
    if (oldVnode.data.ref !== vnode.data.ref) {
      registerRef(oldVnode, true);
      registerRef(vnode);
    }
  },
  destroy: function destroy (vnode) {
    registerRef(vnode, true);
  }
};

function registerRef (vnode, isRemoval) {
  var key = vnode.data.ref;
  if (!key) { return }

  var vm = vnode.context;
  var ref = vnode.componentInstance || vnode.elm;
  var refs = vm.$refs;
  if (isRemoval) {
    if (Array.isArray(refs[key])) {
      remove(refs[key], ref);
    } else if (refs[key] === ref) {
      refs[key] = undefined;
    }
  } else {
    if (vnode.data.refInFor) {
      if (!Array.isArray(refs[key])) {
        refs[key] = [ref];
      } else if (refs[key].indexOf(ref) < 0) {
        // $flow-disable-line
        refs[key].push(ref);
      }
    } else {
      refs[key] = ref;
    }
  }
}

/**
 * Virtual DOM patching algorithm based on Snabbdom by
 * Simon Friis Vindum (@paldepind)
 * Licensed under the MIT License
 * https://github.com/paldepind/snabbdom/blob/master/LICENSE
 *
 * modified by Evan You (@yyx990803)
 *
 * Not type-checking this because this file is perf-critical and the cost
 * of making flow understand it is not worth it.
 */

var emptyNode = new VNode('', {}, []);

var hooks = ['create', 'activate', 'update', 'remove', 'destroy'];

function sameVnode (a, b) {
  return (
    a.key === b.key && (
      (
        a.tag === b.tag &&
        a.isComment === b.isComment &&
        isDef(a.data) === isDef(b.data) &&
        sameInputType(a, b)
      ) || (
        isTrue(a.isAsyncPlaceholder) &&
        a.asyncFactory === b.asyncFactory &&
        isUndef(b.asyncFactory.error)
      )
    )
  )
}

function sameInputType (a, b) {
  if (a.tag !== 'input') { return true }
  var i;
  var typeA = isDef(i = a.data) && isDef(i = i.attrs) && i.type;
  var typeB = isDef(i = b.data) && isDef(i = i.attrs) && i.type;
  return typeA === typeB || isTextInputType(typeA) && isTextInputType(typeB)
}

function createKeyToOldIdx (children, beginIdx, endIdx) {
  var i, key;
  var map = {};
  for (i = beginIdx; i <= endIdx; ++i) {
    key = children[i].key;
    if (isDef(key)) { map[key] = i; }
  }
  return map
}

function createPatchFunction (backend) {
  var i, j;
  var cbs = {};

  var modules = backend.modules;
  var nodeOps = backend.nodeOps;

  for (i = 0; i < hooks.length; ++i) {
    cbs[hooks[i]] = [];
    for (j = 0; j < modules.length; ++j) {
      if (isDef(modules[j][hooks[i]])) {
        cbs[hooks[i]].push(modules[j][hooks[i]]);
      }
    }
  }

  function emptyNodeAt (elm) {
    return new VNode(nodeOps.tagName(elm).toLowerCase(), {}, [], undefined, elm)
  }

  function createRmCb (childElm, listeners) {
    function remove () {
      if (--remove.listeners === 0) {
        removeNode(childElm);
      }
    }
    remove.listeners = listeners;
    return remove
  }

  function removeNode (el) {
    var parent = nodeOps.parentNode(el);
    // element may have already been removed due to v-html / v-text
    if (isDef(parent)) {
      nodeOps.removeChild(parent, el);
    }
  }

  function isUnknownElement$$1 (vnode, inVPre) {
    return (
      !inVPre &&
      !vnode.ns &&
      !(
        config.ignoredElements.length &&
        config.ignoredElements.some(function (ignore) {
          return isRegExp(ignore)
            ? ignore.test(vnode.tag)
            : ignore === vnode.tag
        })
      ) &&
      config.isUnknownElement(vnode.tag)
    )
  }

  var creatingElmInVPre = 0;
  function createElm (vnode, insertedVnodeQueue, parentElm, refElm, nested) {
    vnode.isRootInsert = !nested; // for transition enter check
    if (createComponent(vnode, insertedVnodeQueue, parentElm, refElm)) {
      return
    }

    var data = vnode.data;
    var children = vnode.children;
    var tag = vnode.tag;
    if (isDef(tag)) {
      if (process.env.NODE_ENV !== 'production') {
        if (data && data.pre) {
          creatingElmInVPre++;
        }
        if (isUnknownElement$$1(vnode, creatingElmInVPre)) {
          warn(
            'Unknown custom element: <' + tag + '> - did you ' +
            'register the component correctly? For recursive components, ' +
            'make sure to provide the "name" option.',
            vnode.context
          );
        }
      }
      vnode.elm = vnode.ns
        ? nodeOps.createElementNS(vnode.ns, tag)
        : nodeOps.createElement(tag, vnode);
      setScope(vnode);

      /* istanbul ignore if */
      {
        createChildren(vnode, children, insertedVnodeQueue);
        if (isDef(data)) {
          invokeCreateHooks(vnode, insertedVnodeQueue);
        }
        insert(parentElm, vnode.elm, refElm);
      }

      if (process.env.NODE_ENV !== 'production' && data && data.pre) {
        creatingElmInVPre--;
      }
    } else if (isTrue(vnode.isComment)) {
      vnode.elm = nodeOps.createComment(vnode.text);
      insert(parentElm, vnode.elm, refElm);
    } else {
      vnode.elm = nodeOps.createTextNode(vnode.text);
      insert(parentElm, vnode.elm, refElm);
    }
  }

  function createComponent (vnode, insertedVnodeQueue, parentElm, refElm) {
    var i = vnode.data;
    if (isDef(i)) {
      var isReactivated = isDef(vnode.componentInstance) && i.keepAlive;
      if (isDef(i = i.hook) && isDef(i = i.init)) {
        i(vnode, false /* hydrating */, parentElm, refElm);
      }
      // after calling the init hook, if the vnode is a child component
      // it should've created a child instance and mounted it. the child
      // component also has set the placeholder vnode's elm.
      // in that case we can just return the element and be done.
      if (isDef(vnode.componentInstance)) {
        initComponent(vnode, insertedVnodeQueue);
        if (isTrue(isReactivated)) {
          reactivateComponent(vnode, insertedVnodeQueue, parentElm, refElm);
        }
        return true
      }
    }
  }

  function initComponent (vnode, insertedVnodeQueue) {
    if (isDef(vnode.data.pendingInsert)) {
      insertedVnodeQueue.push.apply(insertedVnodeQueue, vnode.data.pendingInsert);
      vnode.data.pendingInsert = null;
    }
    vnode.elm = vnode.componentInstance.$el;
    if (isPatchable(vnode)) {
      invokeCreateHooks(vnode, insertedVnodeQueue);
      setScope(vnode);
    } else {
      // empty component root.
      // skip all element-related modules except for ref (#3455)
      registerRef(vnode);
      // make sure to invoke the insert hook
      insertedVnodeQueue.push(vnode);
    }
  }

  function reactivateComponent (vnode, insertedVnodeQueue, parentElm, refElm) {
    var i;
    // hack for #4339: a reactivated component with inner transition
    // does not trigger because the inner node's created hooks are not called
    // again. It's not ideal to involve module-specific logic in here but
    // there doesn't seem to be a better way to do it.
    var innerNode = vnode;
    while (innerNode.componentInstance) {
      innerNode = innerNode.componentInstance._vnode;
      if (isDef(i = innerNode.data) && isDef(i = i.transition)) {
        for (i = 0; i < cbs.activate.length; ++i) {
          cbs.activate[i](emptyNode, innerNode);
        }
        insertedVnodeQueue.push(innerNode);
        break
      }
    }
    // unlike a newly created component,
    // a reactivated keep-alive component doesn't insert itself
    insert(parentElm, vnode.elm, refElm);
  }

  function insert (parent, elm, ref$$1) {
    if (isDef(parent)) {
      if (isDef(ref$$1)) {
        if (ref$$1.parentNode === parent) {
          nodeOps.insertBefore(parent, elm, ref$$1);
        }
      } else {
        nodeOps.appendChild(parent, elm);
      }
    }
  }

  function createChildren (vnode, children, insertedVnodeQueue) {
    if (Array.isArray(children)) {
      if (process.env.NODE_ENV !== 'production') {
        checkDuplicateKeys(children);
      }
      for (var i = 0; i < children.length; ++i) {
        createElm(children[i], insertedVnodeQueue, vnode.elm, null, true);
      }
    } else if (isPrimitive(vnode.text)) {
      nodeOps.appendChild(vnode.elm, nodeOps.createTextNode(String(vnode.text)));
    }
  }

  function isPatchable (vnode) {
    while (vnode.componentInstance) {
      vnode = vnode.componentInstance._vnode;
    }
    return isDef(vnode.tag)
  }

  function invokeCreateHooks (vnode, insertedVnodeQueue) {
    for (var i$1 = 0; i$1 < cbs.create.length; ++i$1) {
      cbs.create[i$1](emptyNode, vnode);
    }
    i = vnode.data.hook; // Reuse variable
    if (isDef(i)) {
      if (isDef(i.create)) { i.create(emptyNode, vnode); }
      if (isDef(i.insert)) { insertedVnodeQueue.push(vnode); }
    }
  }

  // set scope id attribute for scoped CSS.
  // this is implemented as a special case to avoid the overhead
  // of going through the normal attribute patching process.
  function setScope (vnode) {
    var i;
    if (isDef(i = vnode.fnScopeId)) {
      nodeOps.setAttribute(vnode.elm, i, '');
    } else {
      var ancestor = vnode;
      while (ancestor) {
        if (isDef(i = ancestor.context) && isDef(i = i.$options._scopeId)) {
          nodeOps.setAttribute(vnode.elm, i, '');
        }
        ancestor = ancestor.parent;
      }
    }
    // for slot content they should also get the scopeId from the host instance.
    if (isDef(i = activeInstance) &&
      i !== vnode.context &&
      i !== vnode.fnContext &&
      isDef(i = i.$options._scopeId)
    ) {
      nodeOps.setAttribute(vnode.elm, i, '');
    }
  }

  function addVnodes (parentElm, refElm, vnodes, startIdx, endIdx, insertedVnodeQueue) {
    for (; startIdx <= endIdx; ++startIdx) {
      createElm(vnodes[startIdx], insertedVnodeQueue, parentElm, refElm);
    }
  }

  function invokeDestroyHook (vnode) {
    var i, j;
    var data = vnode.data;
    if (isDef(data)) {
      if (isDef(i = data.hook) && isDef(i = i.destroy)) { i(vnode); }
      for (i = 0; i < cbs.destroy.length; ++i) { cbs.destroy[i](vnode); }
    }
    if (isDef(i = vnode.children)) {
      for (j = 0; j < vnode.children.length; ++j) {
        invokeDestroyHook(vnode.children[j]);
      }
    }
  }

  function removeVnodes (parentElm, vnodes, startIdx, endIdx) {
    for (; startIdx <= endIdx; ++startIdx) {
      var ch = vnodes[startIdx];
      if (isDef(ch)) {
        if (isDef(ch.tag)) {
          removeAndInvokeRemoveHook(ch);
          invokeDestroyHook(ch);
        } else { // Text node
          removeNode(ch.elm);
        }
      }
    }
  }

  function removeAndInvokeRemoveHook (vnode, rm) {
    if (isDef(rm) || isDef(vnode.data)) {
      var i;
      var listeners = cbs.remove.length + 1;
      if (isDef(rm)) {
        // we have a recursively passed down rm callback
        // increase the listeners count
        rm.listeners += listeners;
      } else {
        // directly removing
        rm = createRmCb(vnode.elm, listeners);
      }
      // recursively invoke hooks on child component root node
      if (isDef(i = vnode.componentInstance) && isDef(i = i._vnode) && isDef(i.data)) {
        removeAndInvokeRemoveHook(i, rm);
      }
      for (i = 0; i < cbs.remove.length; ++i) {
        cbs.remove[i](vnode, rm);
      }
      if (isDef(i = vnode.data.hook) && isDef(i = i.remove)) {
        i(vnode, rm);
      } else {
        rm();
      }
    } else {
      removeNode(vnode.elm);
    }
  }

  function updateChildren (parentElm, oldCh, newCh, insertedVnodeQueue, removeOnly) {
    var oldStartIdx = 0;
    var newStartIdx = 0;
    var oldEndIdx = oldCh.length - 1;
    var oldStartVnode = oldCh[0];
    var oldEndVnode = oldCh[oldEndIdx];
    var newEndIdx = newCh.length - 1;
    var newStartVnode = newCh[0];
    var newEndVnode = newCh[newEndIdx];
    var oldKeyToIdx, idxInOld, vnodeToMove, refElm;

    // removeOnly is a special flag used only by <transition-group>
    // to ensure removed elements stay in correct relative positions
    // during leaving transitions
    var canMove = !removeOnly;

    if (process.env.NODE_ENV !== 'production') {
      checkDuplicateKeys(newCh);
    }

    while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
      if (isUndef(oldStartVnode)) {
        oldStartVnode = oldCh[++oldStartIdx]; // Vnode has been moved left
      } else if (isUndef(oldEndVnode)) {
        oldEndVnode = oldCh[--oldEndIdx];
      } else if (sameVnode(oldStartVnode, newStartVnode)) {
        patchVnode(oldStartVnode, newStartVnode, insertedVnodeQueue);
        oldStartVnode = oldCh[++oldStartIdx];
        newStartVnode = newCh[++newStartIdx];
      } else if (sameVnode(oldEndVnode, newEndVnode)) {
        patchVnode(oldEndVnode, newEndVnode, insertedVnodeQueue);
        oldEndVnode = oldCh[--oldEndIdx];
        newEndVnode = newCh[--newEndIdx];
      } else if (sameVnode(oldStartVnode, newEndVnode)) { // Vnode moved right
        patchVnode(oldStartVnode, newEndVnode, insertedVnodeQueue);
        canMove && nodeOps.insertBefore(parentElm, oldStartVnode.elm, nodeOps.nextSibling(oldEndVnode.elm));
        oldStartVnode = oldCh[++oldStartIdx];
        newEndVnode = newCh[--newEndIdx];
      } else if (sameVnode(oldEndVnode, newStartVnode)) { // Vnode moved left
        patchVnode(oldEndVnode, newStartVnode, insertedVnodeQueue);
        canMove && nodeOps.insertBefore(parentElm, oldEndVnode.elm, oldStartVnode.elm);
        oldEndVnode = oldCh[--oldEndIdx];
        newStartVnode = newCh[++newStartIdx];
      } else {
        if (isUndef(oldKeyToIdx)) { oldKeyToIdx = createKeyToOldIdx(oldCh, oldStartIdx, oldEndIdx); }
        idxInOld = isDef(newStartVnode.key)
          ? oldKeyToIdx[newStartVnode.key]
          : findIdxInOld(newStartVnode, oldCh, oldStartIdx, oldEndIdx);
        if (isUndef(idxInOld)) { // New element
          createElm(newStartVnode, insertedVnodeQueue, parentElm, oldStartVnode.elm);
        } else {
          vnodeToMove = oldCh[idxInOld];
          if (sameVnode(vnodeToMove, newStartVnode)) {
            patchVnode(vnodeToMove, newStartVnode, insertedVnodeQueue);
            oldCh[idxInOld] = undefined;
            canMove && nodeOps.insertBefore(parentElm, vnodeToMove.elm, oldStartVnode.elm);
          } else {
            // same key but different element. treat as new element
            createElm(newStartVnode, insertedVnodeQueue, parentElm, oldStartVnode.elm);
          }
        }
        newStartVnode = newCh[++newStartIdx];
      }
    }
    if (oldStartIdx > oldEndIdx) {
      refElm = isUndef(newCh[newEndIdx + 1]) ? null : newCh[newEndIdx + 1].elm;
      addVnodes(parentElm, refElm, newCh, newStartIdx, newEndIdx, insertedVnodeQueue);
    } else if (newStartIdx > newEndIdx) {
      removeVnodes(parentElm, oldCh, oldStartIdx, oldEndIdx);
    }
  }

  function checkDuplicateKeys (children) {
    var seenKeys = {};
    for (var i = 0; i < children.length; i++) {
      var vnode = children[i];
      var key = vnode.key;
      if (isDef(key)) {
        if (seenKeys[key]) {
          warn(
            ("Duplicate keys detected: '" + key + "'. This may cause an update error."),
            vnode.context
          );
        } else {
          seenKeys[key] = true;
        }
      }
    }
  }

  function findIdxInOld (node, oldCh, start, end) {
    for (var i = start; i < end; i++) {
      var c = oldCh[i];
      if (isDef(c) && sameVnode(node, c)) { return i }
    }
  }

  function patchVnode (oldVnode, vnode, insertedVnodeQueue, removeOnly) {
    if (oldVnode === vnode) {
      return
    }

    var elm = vnode.elm = oldVnode.elm;

    if (isTrue(oldVnode.isAsyncPlaceholder)) {
      if (isDef(vnode.asyncFactory.resolved)) {
        hydrate(oldVnode.elm, vnode, insertedVnodeQueue);
      } else {
        vnode.isAsyncPlaceholder = true;
      }
      return
    }

    // reuse element for static trees.
    // note we only do this if the vnode is cloned -
    // if the new node is not cloned it means the render functions have been
    // reset by the hot-reload-api and we need to do a proper re-render.
    if (isTrue(vnode.isStatic) &&
      isTrue(oldVnode.isStatic) &&
      vnode.key === oldVnode.key &&
      (isTrue(vnode.isCloned) || isTrue(vnode.isOnce))
    ) {
      vnode.componentInstance = oldVnode.componentInstance;
      return
    }

    var i;
    var data = vnode.data;
    if (isDef(data) && isDef(i = data.hook) && isDef(i = i.prepatch)) {
      i(oldVnode, vnode);
    }

    var oldCh = oldVnode.children;
    var ch = vnode.children;
    if (isDef(data) && isPatchable(vnode)) {
      for (i = 0; i < cbs.update.length; ++i) { cbs.update[i](oldVnode, vnode); }
      if (isDef(i = data.hook) && isDef(i = i.update)) { i(oldVnode, vnode); }
    }
    if (isUndef(vnode.text)) {
      if (isDef(oldCh) && isDef(ch)) {
        if (oldCh !== ch) { updateChildren(elm, oldCh, ch, insertedVnodeQueue, removeOnly); }
      } else if (isDef(ch)) {
        if (isDef(oldVnode.text)) { nodeOps.setTextContent(elm, ''); }
        addVnodes(elm, null, ch, 0, ch.length - 1, insertedVnodeQueue);
      } else if (isDef(oldCh)) {
        removeVnodes(elm, oldCh, 0, oldCh.length - 1);
      } else if (isDef(oldVnode.text)) {
        nodeOps.setTextContent(elm, '');
      }
    } else if (oldVnode.text !== vnode.text) {
      nodeOps.setTextContent(elm, vnode.text);
    }
    if (isDef(data)) {
      if (isDef(i = data.hook) && isDef(i = i.postpatch)) { i(oldVnode, vnode); }
    }
  }

  function invokeInsertHook (vnode, queue, initial) {
    // delay insert hooks for component root nodes, invoke them after the
    // element is really inserted
    if (isTrue(initial) && isDef(vnode.parent)) {
      vnode.parent.data.pendingInsert = queue;
    } else {
      for (var i = 0; i < queue.length; ++i) {
        queue[i].data.hook.insert(queue[i]);
      }
    }
  }

  var hydrationBailed = false;
  // list of modules that can skip create hook during hydration because they
  // are already rendered on the client or has no need for initialization
  // Note: style is excluded because it relies on initial clone for future
  // deep updates (#7063).
  var isRenderedModule = makeMap('attrs,class,staticClass,staticStyle,key');

  // Note: this is a browser-only function so we can assume elms are DOM nodes.
  function hydrate (elm, vnode, insertedVnodeQueue, inVPre) {
    var i;
    var tag = vnode.tag;
    var data = vnode.data;
    var children = vnode.children;
    inVPre = inVPre || (data && data.pre);
    vnode.elm = elm;

    if (isTrue(vnode.isComment) && isDef(vnode.asyncFactory)) {
      vnode.isAsyncPlaceholder = true;
      return true
    }
    // assert node match
    if (process.env.NODE_ENV !== 'production') {
      if (!assertNodeMatch(elm, vnode, inVPre)) {
        return false
      }
    }
    if (isDef(data)) {
      if (isDef(i = data.hook) && isDef(i = i.init)) { i(vnode, true /* hydrating */); }
      if (isDef(i = vnode.componentInstance)) {
        // child component. it should have hydrated its own tree.
        initComponent(vnode, insertedVnodeQueue);
        return true
      }
    }
    if (isDef(tag)) {
      if (isDef(children)) {
        // empty element, allow client to pick up and populate children
        if (!elm.hasChildNodes()) {
          createChildren(vnode, children, insertedVnodeQueue);
        } else {
          // v-html and domProps: innerHTML
          if (isDef(i = data) && isDef(i = i.domProps) && isDef(i = i.innerHTML)) {
            if (i !== elm.innerHTML) {
              /* istanbul ignore if */
              if (process.env.NODE_ENV !== 'production' &&
                typeof console !== 'undefined' &&
                !hydrationBailed
              ) {
                hydrationBailed = true;
                console.warn('Parent: ', elm);
                console.warn('server innerHTML: ', i);
                console.warn('client innerHTML: ', elm.innerHTML);
              }
              return false
            }
          } else {
            // iterate and compare children lists
            var childrenMatch = true;
            var childNode = elm.firstChild;
            for (var i$1 = 0; i$1 < children.length; i$1++) {
              if (!childNode || !hydrate(childNode, children[i$1], insertedVnodeQueue, inVPre)) {
                childrenMatch = false;
                break
              }
              childNode = childNode.nextSibling;
            }
            // if childNode is not null, it means the actual childNodes list is
            // longer than the virtual children list.
            if (!childrenMatch || childNode) {
              /* istanbul ignore if */
              if (process.env.NODE_ENV !== 'production' &&
                typeof console !== 'undefined' &&
                !hydrationBailed
              ) {
                hydrationBailed = true;
                console.warn('Parent: ', elm);
                console.warn('Mismatching childNodes vs. VNodes: ', elm.childNodes, children);
              }
              return false
            }
          }
        }
      }
      if (isDef(data)) {
        var fullInvoke = false;
        for (var key in data) {
          if (!isRenderedModule(key)) {
            fullInvoke = true;
            invokeCreateHooks(vnode, insertedVnodeQueue);
            break
          }
        }
        if (!fullInvoke && data['class']) {
          // ensure collecting deps for deep class bindings for future updates
          traverse(data['class']);
        }
      }
    } else if (elm.data !== vnode.text) {
      elm.data = vnode.text;
    }
    return true
  }

  function assertNodeMatch (node, vnode, inVPre) {
    if (isDef(vnode.tag)) {
      return vnode.tag.indexOf('vue-component') === 0 || (
        !isUnknownElement$$1(vnode, inVPre) &&
        vnode.tag.toLowerCase() === (node.tagName && node.tagName.toLowerCase())
      )
    } else {
      return node.nodeType === (vnode.isComment ? 8 : 3)
    }
  }

  return function patch (oldVnode, vnode, hydrating, removeOnly, parentElm, refElm) {
    if (isUndef(vnode)) {
      if (isDef(oldVnode)) { invokeDestroyHook(oldVnode); }
      return
    }

    var isInitialPatch = false;
    var insertedVnodeQueue = [];

    if (isUndef(oldVnode)) {
      // empty mount (likely as component), create new root element
      isInitialPatch = true;
      createElm(vnode, insertedVnodeQueue, parentElm, refElm);
    } else {
      var isRealElement = isDef(oldVnode.nodeType);
      if (!isRealElement && sameVnode(oldVnode, vnode)) {
        // patch existing root node
        patchVnode(oldVnode, vnode, insertedVnodeQueue, removeOnly);
      } else {
        if (isRealElement) {
          // mounting to a real element
          // check if this is server-rendered content and if we can perform
          // a successful hydration.
          if (oldVnode.nodeType === 1 && oldVnode.hasAttribute(SSR_ATTR)) {
            oldVnode.removeAttribute(SSR_ATTR);
            hydrating = true;
          }
          if (isTrue(hydrating)) {
            if (hydrate(oldVnode, vnode, insertedVnodeQueue)) {
              invokeInsertHook(vnode, insertedVnodeQueue, true);
              return oldVnode
            } else if (process.env.NODE_ENV !== 'production') {
              warn(
                'The client-side rendered virtual DOM tree is not matching ' +
                'server-rendered content. This is likely caused by incorrect ' +
                'HTML markup, for example nesting block-level elements inside ' +
                '<p>, or missing <tbody>. Bailing hydration and performing ' +
                'full client-side render.'
              );
            }
          }
          // either not server-rendered, or hydration failed.
          // create an empty node and replace it
          oldVnode = emptyNodeAt(oldVnode);
        }

        // replacing existing element
        var oldElm = oldVnode.elm;
        var parentElm$1 = nodeOps.parentNode(oldElm);

        // create new node
        createElm(
          vnode,
          insertedVnodeQueue,
          // extremely rare edge case: do not insert if old element is in a
          // leaving transition. Only happens when combining transition +
          // keep-alive + HOCs. (#4590)
          oldElm._leaveCb ? null : parentElm$1,
          nodeOps.nextSibling(oldElm)
        );

        // update parent placeholder node element, recursively
        if (isDef(vnode.parent)) {
          var ancestor = vnode.parent;
          var patchable = isPatchable(vnode);
          while (ancestor) {
            for (var i = 0; i < cbs.destroy.length; ++i) {
              cbs.destroy[i](ancestor);
            }
            ancestor.elm = vnode.elm;
            if (patchable) {
              for (var i$1 = 0; i$1 < cbs.create.length; ++i$1) {
                cbs.create[i$1](emptyNode, ancestor);
              }
              // #6513
              // invoke insert hooks that may have been merged by create hooks.
              // e.g. for directives that uses the "inserted" hook.
              var insert = ancestor.data.hook.insert;
              if (insert.merged) {
                // start at index 1 to avoid re-invoking component mounted hook
                for (var i$2 = 1; i$2 < insert.fns.length; i$2++) {
                  insert.fns[i$2]();
                }
              }
            } else {
              registerRef(ancestor);
            }
            ancestor = ancestor.parent;
          }
        }

        // destroy old node
        if (isDef(parentElm$1)) {
          removeVnodes(parentElm$1, [oldVnode], 0, 0);
        } else if (isDef(oldVnode.tag)) {
          invokeDestroyHook(oldVnode);
        }
      }
    }

    invokeInsertHook(vnode, insertedVnodeQueue, isInitialPatch);
    return vnode.elm
  }
}

/*  */

var directives = {
  create: updateDirectives,
  update: updateDirectives,
  destroy: function unbindDirectives (vnode) {
    updateDirectives(vnode, emptyNode);
  }
};

function updateDirectives (oldVnode, vnode) {
  if (oldVnode.data.directives || vnode.data.directives) {
    _update(oldVnode, vnode);
  }
}

function _update (oldVnode, vnode) {
  var isCreate = oldVnode === emptyNode;
  var isDestroy = vnode === emptyNode;
  var oldDirs = normalizeDirectives$1(oldVnode.data.directives, oldVnode.context);
  var newDirs = normalizeDirectives$1(vnode.data.directives, vnode.context);

  var dirsWithInsert = [];
  var dirsWithPostpatch = [];

  var key, oldDir, dir;
  for (key in newDirs) {
    oldDir = oldDirs[key];
    dir = newDirs[key];
    if (!oldDir) {
      // new directive, bind
      callHook$1(dir, 'bind', vnode, oldVnode);
      if (dir.def && dir.def.inserted) {
        dirsWithInsert.push(dir);
      }
    } else {
      // existing directive, update
      dir.oldValue = oldDir.value;
      callHook$1(dir, 'update', vnode, oldVnode);
      if (dir.def && dir.def.componentUpdated) {
        dirsWithPostpatch.push(dir);
      }
    }
  }

  if (dirsWithInsert.length) {
    var callInsert = function () {
      for (var i = 0; i < dirsWithInsert.length; i++) {
        callHook$1(dirsWithInsert[i], 'inserted', vnode, oldVnode);
      }
    };
    if (isCreate) {
      mergeVNodeHook(vnode, 'insert', callInsert);
    } else {
      callInsert();
    }
  }

  if (dirsWithPostpatch.length) {
    mergeVNodeHook(vnode, 'postpatch', function () {
      for (var i = 0; i < dirsWithPostpatch.length; i++) {
        callHook$1(dirsWithPostpatch[i], 'componentUpdated', vnode, oldVnode);
      }
    });
  }

  if (!isCreate) {
    for (key in oldDirs) {
      if (!newDirs[key]) {
        // no longer present, unbind
        callHook$1(oldDirs[key], 'unbind', oldVnode, oldVnode, isDestroy);
      }
    }
  }
}

var emptyModifiers = Object.create(null);

function normalizeDirectives$1 (
  dirs,
  vm
) {
  var res = Object.create(null);
  if (!dirs) {
    // $flow-disable-line
    return res
  }
  var i, dir;
  for (i = 0; i < dirs.length; i++) {
    dir = dirs[i];
    if (!dir.modifiers) {
      // $flow-disable-line
      dir.modifiers = emptyModifiers;
    }
    res[getRawDirName(dir)] = dir;
    dir.def = resolveAsset(vm.$options, 'directives', dir.name, true);
  }
  // $flow-disable-line
  return res
}

function getRawDirName (dir) {
  return dir.rawName || ((dir.name) + "." + (Object.keys(dir.modifiers || {}).join('.')))
}

function callHook$1 (dir, hook, vnode, oldVnode, isDestroy) {
  var fn = dir.def && dir.def[hook];
  if (fn) {
    try {
      fn(vnode.elm, dir, vnode, oldVnode, isDestroy);
    } catch (e) {
      handleError(e, vnode.context, ("directive " + (dir.name) + " " + hook + " hook"));
    }
  }
}

var baseModules = [
  ref,
  directives
];

/*  */

function updateAttrs (oldVnode, vnode) {
  var opts = vnode.componentOptions;
  if (isDef(opts) && opts.Ctor.options.inheritAttrs === false) {
    return
  }
  if (isUndef(oldVnode.data.attrs) && isUndef(vnode.data.attrs)) {
    return
  }
  var key, cur, old;
  var elm = vnode.elm;
  var oldAttrs = oldVnode.data.attrs || {};
  var attrs = vnode.data.attrs || {};
  // clone observed objects, as the user probably wants to mutate it
  if (isDef(attrs.__ob__)) {
    attrs = vnode.data.attrs = extend({}, attrs);
  }

  for (key in attrs) {
    cur = attrs[key];
    old = oldAttrs[key];
    if (old !== cur) {
      setAttr(elm, key, cur);
    }
  }
  // #4391: in IE9, setting type can reset value for input[type=radio]
  // #6666: IE/Edge forces progress value down to 1 before setting a max
  /* istanbul ignore if */
  if ((isIE || isEdge) && attrs.value !== oldAttrs.value) {
    setAttr(elm, 'value', attrs.value);
  }
  for (key in oldAttrs) {
    if (isUndef(attrs[key])) {
      if (isXlink(key)) {
        elm.removeAttributeNS(xlinkNS, getXlinkProp(key));
      } else if (!isEnumeratedAttr(key)) {
        elm.removeAttribute(key);
      }
    }
  }
}

function setAttr (el, key, value) {
  if (isBooleanAttr(key)) {
    // set attribute for blank value
    // e.g. <option disabled>Select one</option>
    if (isFalsyAttrValue(value)) {
      el.removeAttribute(key);
    } else {
      // technically allowfullscreen is a boolean attribute for <iframe>,
      // but Flash expects a value of "true" when used on <embed> tag
      value = key === 'allowfullscreen' && el.tagName === 'EMBED'
        ? 'true'
        : key;
      el.setAttribute(key, value);
    }
  } else if (isEnumeratedAttr(key)) {
    el.setAttribute(key, isFalsyAttrValue(value) || value === 'false' ? 'false' : 'true');
  } else if (isXlink(key)) {
    if (isFalsyAttrValue(value)) {
      el.removeAttributeNS(xlinkNS, getXlinkProp(key));
    } else {
      el.setAttributeNS(xlinkNS, key, value);
    }
  } else {
    if (isFalsyAttrValue(value)) {
      el.removeAttribute(key);
    } else {
      // #7138: IE10 & 11 fires input event when setting placeholder on
      // <textarea>... block the first input event and remove the blocker
      // immediately.
      /* istanbul ignore if */
      if (
        isIE && !isIE9 &&
        el.tagName === 'TEXTAREA' &&
        key === 'placeholder' && !el.__ieph
      ) {
        var blocker = function (e) {
          e.stopImmediatePropagation();
          el.removeEventListener('input', blocker);
        };
        el.addEventListener('input', blocker);
        // $flow-disable-line
        el.__ieph = true; /* IE placeholder patched */
      }
      el.setAttribute(key, value);
    }
  }
}

var attrs = {
  create: updateAttrs,
  update: updateAttrs
};

/*  */

function updateClass (oldVnode, vnode) {
  var el = vnode.elm;
  var data = vnode.data;
  var oldData = oldVnode.data;
  if (
    isUndef(data.staticClass) &&
    isUndef(data.class) && (
      isUndef(oldData) || (
        isUndef(oldData.staticClass) &&
        isUndef(oldData.class)
      )
    )
  ) {
    return
  }

  var cls = genClassForVnode(vnode);

  // handle transition classes
  var transitionClass = el._transitionClasses;
  if (isDef(transitionClass)) {
    cls = concat(cls, stringifyClass(transitionClass));
  }

  // set the class
  if (cls !== el._prevClass) {
    el.setAttribute('class', cls);
    el._prevClass = cls;
  }
}

var klass = {
  create: updateClass,
  update: updateClass
};

/*  */

/*  */









// add a raw attr (use this in preTransforms)








// note: this only removes the attr from the Array (attrsList) so that it
// doesn't get processed by processAttrs.
// By default it does NOT remove it from the map (attrsMap) because the map is
// needed during codegen.

/*  */

/**
 * Cross-platform code generation for component v-model
 */


/**
 * Cross-platform codegen helper for generating v-model value assignment code.
 */

/*  */

// in some cases, the event used has to be determined at runtime
// so we used some reserved tokens during compile.
var RANGE_TOKEN = '__r';
var CHECKBOX_RADIO_TOKEN = '__c';

/*  */

// normalize v-model event tokens that can only be determined at runtime.
// it's important to place the event as the first in the array because
// the whole point is ensuring the v-model callback gets called before
// user-attached handlers.
function normalizeEvents (on) {
  /* istanbul ignore if */
  if (isDef(on[RANGE_TOKEN])) {
    // IE input[type=range] only supports `change` event
    var event = isIE ? 'change' : 'input';
    on[event] = [].concat(on[RANGE_TOKEN], on[event] || []);
    delete on[RANGE_TOKEN];
  }
  // This was originally intended to fix #4521 but no longer necessary
  // after 2.5. Keeping it for backwards compat with generated code from < 2.4
  /* istanbul ignore if */
  if (isDef(on[CHECKBOX_RADIO_TOKEN])) {
    on.change = [].concat(on[CHECKBOX_RADIO_TOKEN], on.change || []);
    delete on[CHECKBOX_RADIO_TOKEN];
  }
}

var target$1;

function createOnceHandler (handler, event, capture) {
  var _target = target$1; // save current target element in closure
  return function onceHandler () {
    var res = handler.apply(null, arguments);
    if (res !== null) {
      remove$2(event, onceHandler, capture, _target);
    }
  }
}

function add$1 (
  event,
  handler,
  once$$1,
  capture,
  passive
) {
  handler = withMacroTask(handler);
  if (once$$1) { handler = createOnceHandler(handler, event, capture); }
  target$1.addEventListener(
    event,
    handler,
    supportsPassive
      ? { capture: capture, passive: passive }
      : capture
  );
}

function remove$2 (
  event,
  handler,
  capture,
  _target
) {
  (_target || target$1).removeEventListener(
    event,
    handler._withTask || handler,
    capture
  );
}

function updateDOMListeners (oldVnode, vnode) {
  if (isUndef(oldVnode.data.on) && isUndef(vnode.data.on)) {
    return
  }
  var on = vnode.data.on || {};
  var oldOn = oldVnode.data.on || {};
  target$1 = vnode.elm;
  normalizeEvents(on);
  updateListeners(on, oldOn, add$1, remove$2, vnode.context);
  target$1 = undefined;
}

var events = {
  create: updateDOMListeners,
  update: updateDOMListeners
};

/*  */

function updateDOMProps (oldVnode, vnode) {
  if (isUndef(oldVnode.data.domProps) && isUndef(vnode.data.domProps)) {
    return
  }
  var key, cur;
  var elm = vnode.elm;
  var oldProps = oldVnode.data.domProps || {};
  var props = vnode.data.domProps || {};
  // clone observed objects, as the user probably wants to mutate it
  if (isDef(props.__ob__)) {
    props = vnode.data.domProps = extend({}, props);
  }

  for (key in oldProps) {
    if (isUndef(props[key])) {
      elm[key] = '';
    }
  }
  for (key in props) {
    cur = props[key];
    // ignore children if the node has textContent or innerHTML,
    // as these will throw away existing DOM nodes and cause removal errors
    // on subsequent patches (#3360)
    if (key === 'textContent' || key === 'innerHTML') {
      if (vnode.children) { vnode.children.length = 0; }
      if (cur === oldProps[key]) { continue }
      // #6601 work around Chrome version <= 55 bug where single textNode
      // replaced by innerHTML/textContent retains its parentNode property
      if (elm.childNodes.length === 1) {
        elm.removeChild(elm.childNodes[0]);
      }
    }

    if (key === 'value') {
      // store value as _value as well since
      // non-string values will be stringified
      elm._value = cur;
      // avoid resetting cursor position when value is the same
      var strCur = isUndef(cur) ? '' : String(cur);
      if (shouldUpdateValue(elm, strCur)) {
        elm.value = strCur;
      }
    } else {
      elm[key] = cur;
    }
  }
}

// check platforms/web/util/attrs.js acceptValue


function shouldUpdateValue (elm, checkVal) {
  return (!elm.composing && (
    elm.tagName === 'OPTION' ||
    isNotInFocusAndDirty(elm, checkVal) ||
    isDirtyWithModifiers(elm, checkVal)
  ))
}

function isNotInFocusAndDirty (elm, checkVal) {
  // return true when textbox (.number and .trim) loses focus and its value is
  // not equal to the updated value
  var notInFocus = true;
  // #6157
  // work around IE bug when accessing document.activeElement in an iframe
  try { notInFocus = document.activeElement !== elm; } catch (e) {}
  return notInFocus && elm.value !== checkVal
}

function isDirtyWithModifiers (elm, newVal) {
  var value = elm.value;
  var modifiers = elm._vModifiers; // injected by v-model runtime
  if (isDef(modifiers)) {
    if (modifiers.lazy) {
      // inputs with lazy should only be updated when not in focus
      return false
    }
    if (modifiers.number) {
      return toNumber(value) !== toNumber(newVal)
    }
    if (modifiers.trim) {
      return value.trim() !== newVal.trim()
    }
  }
  return value !== newVal
}

var domProps = {
  create: updateDOMProps,
  update: updateDOMProps
};

/*  */

var parseStyleText = cached(function (cssText) {
  var res = {};
  var listDelimiter = /;(?![^(]*\))/g;
  var propertyDelimiter = /:(.+)/;
  cssText.split(listDelimiter).forEach(function (item) {
    if (item) {
      var tmp = item.split(propertyDelimiter);
      tmp.length > 1 && (res[tmp[0].trim()] = tmp[1].trim());
    }
  });
  return res
});

// merge static and dynamic style data on the same vnode
function normalizeStyleData (data) {
  var style = normalizeStyleBinding(data.style);
  // static style is pre-processed into an object during compilation
  // and is always a fresh object, so it's safe to merge into it
  return data.staticStyle
    ? extend(data.staticStyle, style)
    : style
}

// normalize possible array / string values into Object
function normalizeStyleBinding (bindingStyle) {
  if (Array.isArray(bindingStyle)) {
    return toObject(bindingStyle)
  }
  if (typeof bindingStyle === 'string') {
    return parseStyleText(bindingStyle)
  }
  return bindingStyle
}

/**
 * parent component style should be after child's
 * so that parent component's style could override it
 */
function getStyle (vnode, checkChild) {
  var res = {};
  var styleData;

  if (checkChild) {
    var childNode = vnode;
    while (childNode.componentInstance) {
      childNode = childNode.componentInstance._vnode;
      if (
        childNode && childNode.data &&
        (styleData = normalizeStyleData(childNode.data))
      ) {
        extend(res, styleData);
      }
    }
  }

  if ((styleData = normalizeStyleData(vnode.data))) {
    extend(res, styleData);
  }

  var parentNode = vnode;
  while ((parentNode = parentNode.parent)) {
    if (parentNode.data && (styleData = normalizeStyleData(parentNode.data))) {
      extend(res, styleData);
    }
  }
  return res
}

/*  */

var cssVarRE = /^--/;
var importantRE = /\s*!important$/;
var setProp = function (el, name, val) {
  /* istanbul ignore if */
  if (cssVarRE.test(name)) {
    el.style.setProperty(name, val);
  } else if (importantRE.test(val)) {
    el.style.setProperty(name, val.replace(importantRE, ''), 'important');
  } else {
    var normalizedName = normalize(name);
    if (Array.isArray(val)) {
      // Support values array created by autoprefixer, e.g.
      // {display: ["-webkit-box", "-ms-flexbox", "flex"]}
      // Set them one by one, and the browser will only set those it can recognize
      for (var i = 0, len = val.length; i < len; i++) {
        el.style[normalizedName] = val[i];
      }
    } else {
      el.style[normalizedName] = val;
    }
  }
};

var vendorNames = ['Webkit', 'Moz', 'ms'];

var emptyStyle;
var normalize = cached(function (prop) {
  emptyStyle = emptyStyle || document.createElement('div').style;
  prop = camelize(prop);
  if (prop !== 'filter' && (prop in emptyStyle)) {
    return prop
  }
  var capName = prop.charAt(0).toUpperCase() + prop.slice(1);
  for (var i = 0; i < vendorNames.length; i++) {
    var name = vendorNames[i] + capName;
    if (name in emptyStyle) {
      return name
    }
  }
});

function updateStyle (oldVnode, vnode) {
  var data = vnode.data;
  var oldData = oldVnode.data;

  if (isUndef(data.staticStyle) && isUndef(data.style) &&
    isUndef(oldData.staticStyle) && isUndef(oldData.style)
  ) {
    return
  }

  var cur, name;
  var el = vnode.elm;
  var oldStaticStyle = oldData.staticStyle;
  var oldStyleBinding = oldData.normalizedStyle || oldData.style || {};

  // if static style exists, stylebinding already merged into it when doing normalizeStyleData
  var oldStyle = oldStaticStyle || oldStyleBinding;

  var style = normalizeStyleBinding(vnode.data.style) || {};

  // store normalized style under a different key for next diff
  // make sure to clone it if it's reactive, since the user likely wants
  // to mutate it.
  vnode.data.normalizedStyle = isDef(style.__ob__)
    ? extend({}, style)
    : style;

  var newStyle = getStyle(vnode, true);

  for (name in oldStyle) {
    if (isUndef(newStyle[name])) {
      setProp(el, name, '');
    }
  }
  for (name in newStyle) {
    cur = newStyle[name];
    if (cur !== oldStyle[name]) {
      // ie9 setting to null has no effect, must use empty string
      setProp(el, name, cur == null ? '' : cur);
    }
  }
}

var style = {
  create: updateStyle,
  update: updateStyle
};

/*  */

/**
 * Add class with compatibility for SVG since classList is not supported on
 * SVG elements in IE
 */
function addClass (el, cls) {
  /* istanbul ignore if */
  if (!cls || !(cls = cls.trim())) {
    return
  }

  /* istanbul ignore else */
  if (el.classList) {
    if (cls.indexOf(' ') > -1) {
      cls.split(/\s+/).forEach(function (c) { return el.classList.add(c); });
    } else {
      el.classList.add(cls);
    }
  } else {
    var cur = " " + (el.getAttribute('class') || '') + " ";
    if (cur.indexOf(' ' + cls + ' ') < 0) {
      el.setAttribute('class', (cur + cls).trim());
    }
  }
}

/**
 * Remove class with compatibility for SVG since classList is not supported on
 * SVG elements in IE
 */
function removeClass (el, cls) {
  /* istanbul ignore if */
  if (!cls || !(cls = cls.trim())) {
    return
  }

  /* istanbul ignore else */
  if (el.classList) {
    if (cls.indexOf(' ') > -1) {
      cls.split(/\s+/).forEach(function (c) { return el.classList.remove(c); });
    } else {
      el.classList.remove(cls);
    }
    if (!el.classList.length) {
      el.removeAttribute('class');
    }
  } else {
    var cur = " " + (el.getAttribute('class') || '') + " ";
    var tar = ' ' + cls + ' ';
    while (cur.indexOf(tar) >= 0) {
      cur = cur.replace(tar, ' ');
    }
    cur = cur.trim();
    if (cur) {
      el.setAttribute('class', cur);
    } else {
      el.removeAttribute('class');
    }
  }
}

/*  */

function resolveTransition (def) {
  if (!def) {
    return
  }
  /* istanbul ignore else */
  if (typeof def === 'object') {
    var res = {};
    if (def.css !== false) {
      extend(res, autoCssTransition(def.name || 'v'));
    }
    extend(res, def);
    return res
  } else if (typeof def === 'string') {
    return autoCssTransition(def)
  }
}

var autoCssTransition = cached(function (name) {
  return {
    enterClass: (name + "-enter"),
    enterToClass: (name + "-enter-to"),
    enterActiveClass: (name + "-enter-active"),
    leaveClass: (name + "-leave"),
    leaveToClass: (name + "-leave-to"),
    leaveActiveClass: (name + "-leave-active")
  }
});

var hasTransition = inBrowser && !isIE9;
var TRANSITION = 'transition';
var ANIMATION = 'animation';

// Transition property/event sniffing
var transitionProp = 'transition';
var transitionEndEvent = 'transitionend';
var animationProp = 'animation';
var animationEndEvent = 'animationend';
if (hasTransition) {
  /* istanbul ignore if */
  if (window.ontransitionend === undefined &&
    window.onwebkittransitionend !== undefined
  ) {
    transitionProp = 'WebkitTransition';
    transitionEndEvent = 'webkitTransitionEnd';
  }
  if (window.onanimationend === undefined &&
    window.onwebkitanimationend !== undefined
  ) {
    animationProp = 'WebkitAnimation';
    animationEndEvent = 'webkitAnimationEnd';
  }
}

// binding to window is necessary to make hot reload work in IE in strict mode
var raf = inBrowser
  ? window.requestAnimationFrame
    ? window.requestAnimationFrame.bind(window)
    : setTimeout
  : /* istanbul ignore next */ function (fn) { return fn(); };

function nextFrame (fn) {
  raf(function () {
    raf(fn);
  });
}

function addTransitionClass (el, cls) {
  var transitionClasses = el._transitionClasses || (el._transitionClasses = []);
  if (transitionClasses.indexOf(cls) < 0) {
    transitionClasses.push(cls);
    addClass(el, cls);
  }
}

function removeTransitionClass (el, cls) {
  if (el._transitionClasses) {
    remove(el._transitionClasses, cls);
  }
  removeClass(el, cls);
}

function whenTransitionEnds (
  el,
  expectedType,
  cb
) {
  var ref = getTransitionInfo(el, expectedType);
  var type = ref.type;
  var timeout = ref.timeout;
  var propCount = ref.propCount;
  if (!type) { return cb() }
  var event = type === TRANSITION ? transitionEndEvent : animationEndEvent;
  var ended = 0;
  var end = function () {
    el.removeEventListener(event, onEnd);
    cb();
  };
  var onEnd = function (e) {
    if (e.target === el) {
      if (++ended >= propCount) {
        end();
      }
    }
  };
  setTimeout(function () {
    if (ended < propCount) {
      end();
    }
  }, timeout + 1);
  el.addEventListener(event, onEnd);
}

var transformRE = /\b(transform|all)(,|$)/;

function getTransitionInfo (el, expectedType) {
  var styles = window.getComputedStyle(el);
  var transitionDelays = styles[transitionProp + 'Delay'].split(', ');
  var transitionDurations = styles[transitionProp + 'Duration'].split(', ');
  var transitionTimeout = getTimeout(transitionDelays, transitionDurations);
  var animationDelays = styles[animationProp + 'Delay'].split(', ');
  var animationDurations = styles[animationProp + 'Duration'].split(', ');
  var animationTimeout = getTimeout(animationDelays, animationDurations);

  var type;
  var timeout = 0;
  var propCount = 0;
  /* istanbul ignore if */
  if (expectedType === TRANSITION) {
    if (transitionTimeout > 0) {
      type = TRANSITION;
      timeout = transitionTimeout;
      propCount = transitionDurations.length;
    }
  } else if (expectedType === ANIMATION) {
    if (animationTimeout > 0) {
      type = ANIMATION;
      timeout = animationTimeout;
      propCount = animationDurations.length;
    }
  } else {
    timeout = Math.max(transitionTimeout, animationTimeout);
    type = timeout > 0
      ? transitionTimeout > animationTimeout
        ? TRANSITION
        : ANIMATION
      : null;
    propCount = type
      ? type === TRANSITION
        ? transitionDurations.length
        : animationDurations.length
      : 0;
  }
  var hasTransform =
    type === TRANSITION &&
    transformRE.test(styles[transitionProp + 'Property']);
  return {
    type: type,
    timeout: timeout,
    propCount: propCount,
    hasTransform: hasTransform
  }
}

function getTimeout (delays, durations) {
  /* istanbul ignore next */
  while (delays.length < durations.length) {
    delays = delays.concat(delays);
  }

  return Math.max.apply(null, durations.map(function (d, i) {
    return toMs(d) + toMs(delays[i])
  }))
}

function toMs (s) {
  return Number(s.slice(0, -1)) * 1000
}

/*  */

function enter (vnode, toggleDisplay) {
  var el = vnode.elm;

  // call leave callback now
  if (isDef(el._leaveCb)) {
    el._leaveCb.cancelled = true;
    el._leaveCb();
  }

  var data = resolveTransition(vnode.data.transition);
  if (isUndef(data)) {
    return
  }

  /* istanbul ignore if */
  if (isDef(el._enterCb) || el.nodeType !== 1) {
    return
  }

  var css = data.css;
  var type = data.type;
  var enterClass = data.enterClass;
  var enterToClass = data.enterToClass;
  var enterActiveClass = data.enterActiveClass;
  var appearClass = data.appearClass;
  var appearToClass = data.appearToClass;
  var appearActiveClass = data.appearActiveClass;
  var beforeEnter = data.beforeEnter;
  var enter = data.enter;
  var afterEnter = data.afterEnter;
  var enterCancelled = data.enterCancelled;
  var beforeAppear = data.beforeAppear;
  var appear = data.appear;
  var afterAppear = data.afterAppear;
  var appearCancelled = data.appearCancelled;
  var duration = data.duration;

  // activeInstance will always be the <transition> component managing this
  // transition. One edge case to check is when the <transition> is placed
  // as the root node of a child component. In that case we need to check
  // <transition>'s parent for appear check.
  var context = activeInstance;
  var transitionNode = activeInstance.$vnode;
  while (transitionNode && transitionNode.parent) {
    transitionNode = transitionNode.parent;
    context = transitionNode.context;
  }

  var isAppear = !context._isMounted || !vnode.isRootInsert;

  if (isAppear && !appear && appear !== '') {
    return
  }

  var startClass = isAppear && appearClass
    ? appearClass
    : enterClass;
  var activeClass = isAppear && appearActiveClass
    ? appearActiveClass
    : enterActiveClass;
  var toClass = isAppear && appearToClass
    ? appearToClass
    : enterToClass;

  var beforeEnterHook = isAppear
    ? (beforeAppear || beforeEnter)
    : beforeEnter;
  var enterHook = isAppear
    ? (typeof appear === 'function' ? appear : enter)
    : enter;
  var afterEnterHook = isAppear
    ? (afterAppear || afterEnter)
    : afterEnter;
  var enterCancelledHook = isAppear
    ? (appearCancelled || enterCancelled)
    : enterCancelled;

  var explicitEnterDuration = toNumber(
    isObject(duration)
      ? duration.enter
      : duration
  );

  if (process.env.NODE_ENV !== 'production' && explicitEnterDuration != null) {
    checkDuration(explicitEnterDuration, 'enter', vnode);
  }

  var expectsCSS = css !== false && !isIE9;
  var userWantsControl = getHookArgumentsLength(enterHook);

  var cb = el._enterCb = once(function () {
    if (expectsCSS) {
      removeTransitionClass(el, toClass);
      removeTransitionClass(el, activeClass);
    }
    if (cb.cancelled) {
      if (expectsCSS) {
        removeTransitionClass(el, startClass);
      }
      enterCancelledHook && enterCancelledHook(el);
    } else {
      afterEnterHook && afterEnterHook(el);
    }
    el._enterCb = null;
  });

  if (!vnode.data.show) {
    // remove pending leave element on enter by injecting an insert hook
    mergeVNodeHook(vnode, 'insert', function () {
      var parent = el.parentNode;
      var pendingNode = parent && parent._pending && parent._pending[vnode.key];
      if (pendingNode &&
        pendingNode.tag === vnode.tag &&
        pendingNode.elm._leaveCb
      ) {
        pendingNode.elm._leaveCb();
      }
      enterHook && enterHook(el, cb);
    });
  }

  // start enter transition
  beforeEnterHook && beforeEnterHook(el);
  if (expectsCSS) {
    addTransitionClass(el, startClass);
    addTransitionClass(el, activeClass);
    nextFrame(function () {
      addTransitionClass(el, toClass);
      removeTransitionClass(el, startClass);
      if (!cb.cancelled && !userWantsControl) {
        if (isValidDuration(explicitEnterDuration)) {
          setTimeout(cb, explicitEnterDuration);
        } else {
          whenTransitionEnds(el, type, cb);
        }
      }
    });
  }

  if (vnode.data.show) {
    toggleDisplay && toggleDisplay();
    enterHook && enterHook(el, cb);
  }

  if (!expectsCSS && !userWantsControl) {
    cb();
  }
}

function leave (vnode, rm) {
  var el = vnode.elm;

  // call enter callback now
  if (isDef(el._enterCb)) {
    el._enterCb.cancelled = true;
    el._enterCb();
  }

  var data = resolveTransition(vnode.data.transition);
  if (isUndef(data) || el.nodeType !== 1) {
    return rm()
  }

  /* istanbul ignore if */
  if (isDef(el._leaveCb)) {
    return
  }

  var css = data.css;
  var type = data.type;
  var leaveClass = data.leaveClass;
  var leaveToClass = data.leaveToClass;
  var leaveActiveClass = data.leaveActiveClass;
  var beforeLeave = data.beforeLeave;
  var leave = data.leave;
  var afterLeave = data.afterLeave;
  var leaveCancelled = data.leaveCancelled;
  var delayLeave = data.delayLeave;
  var duration = data.duration;

  var expectsCSS = css !== false && !isIE9;
  var userWantsControl = getHookArgumentsLength(leave);

  var explicitLeaveDuration = toNumber(
    isObject(duration)
      ? duration.leave
      : duration
  );

  if (process.env.NODE_ENV !== 'production' && isDef(explicitLeaveDuration)) {
    checkDuration(explicitLeaveDuration, 'leave', vnode);
  }

  var cb = el._leaveCb = once(function () {
    if (el.parentNode && el.parentNode._pending) {
      el.parentNode._pending[vnode.key] = null;
    }
    if (expectsCSS) {
      removeTransitionClass(el, leaveToClass);
      removeTransitionClass(el, leaveActiveClass);
    }
    if (cb.cancelled) {
      if (expectsCSS) {
        removeTransitionClass(el, leaveClass);
      }
      leaveCancelled && leaveCancelled(el);
    } else {
      rm();
      afterLeave && afterLeave(el);
    }
    el._leaveCb = null;
  });

  if (delayLeave) {
    delayLeave(performLeave);
  } else {
    performLeave();
  }

  function performLeave () {
    // the delayed leave may have already been cancelled
    if (cb.cancelled) {
      return
    }
    // record leaving element
    if (!vnode.data.show) {
      (el.parentNode._pending || (el.parentNode._pending = {}))[(vnode.key)] = vnode;
    }
    beforeLeave && beforeLeave(el);
    if (expectsCSS) {
      addTransitionClass(el, leaveClass);
      addTransitionClass(el, leaveActiveClass);
      nextFrame(function () {
        addTransitionClass(el, leaveToClass);
        removeTransitionClass(el, leaveClass);
        if (!cb.cancelled && !userWantsControl) {
          if (isValidDuration(explicitLeaveDuration)) {
            setTimeout(cb, explicitLeaveDuration);
          } else {
            whenTransitionEnds(el, type, cb);
          }
        }
      });
    }
    leave && leave(el, cb);
    if (!expectsCSS && !userWantsControl) {
      cb();
    }
  }
}

// only used in dev mode
function checkDuration (val, name, vnode) {
  if (typeof val !== 'number') {
    warn(
      "<transition> explicit " + name + " duration is not a valid number - " +
      "got " + (JSON.stringify(val)) + ".",
      vnode.context
    );
  } else if (isNaN(val)) {
    warn(
      "<transition> explicit " + name + " duration is NaN - " +
      'the duration expression might be incorrect.',
      vnode.context
    );
  }
}

function isValidDuration (val) {
  return typeof val === 'number' && !isNaN(val)
}

/**
 * Normalize a transition hook's argument length. The hook may be:
 * - a merged hook (invoker) with the original in .fns
 * - a wrapped component method (check ._length)
 * - a plain function (.length)
 */
function getHookArgumentsLength (fn) {
  if (isUndef(fn)) {
    return false
  }
  var invokerFns = fn.fns;
  if (isDef(invokerFns)) {
    // invoker
    return getHookArgumentsLength(
      Array.isArray(invokerFns)
        ? invokerFns[0]
        : invokerFns
    )
  } else {
    return (fn._length || fn.length) > 1
  }
}

function _enter (_, vnode) {
  if (vnode.data.show !== true) {
    enter(vnode);
  }
}

var transition = inBrowser ? {
  create: _enter,
  activate: _enter,
  remove: function remove$$1 (vnode, rm) {
    /* istanbul ignore else */
    if (vnode.data.show !== true) {
      leave(vnode, rm);
    } else {
      rm();
    }
  }
} : {};

var platformModules = [
  attrs,
  klass,
  events,
  domProps,
  style,
  transition
];

/*  */

// the directive module should be applied last, after all
// built-in modules have been applied.
var modules = platformModules.concat(baseModules);

var patch = createPatchFunction({ nodeOps: nodeOps, modules: modules });

/**
 * Not type checking this file because flow doesn't like attaching
 * properties to Elements.
 */

/* istanbul ignore if */
if (isIE9) {
  // http://www.matts411.com/post/internet-explorer-9-oninput/
  document.addEventListener('selectionchange', function () {
    var el = document.activeElement;
    if (el && el.vmodel) {
      trigger(el, 'input');
    }
  });
}

var directive = {
  inserted: function inserted (el, binding, vnode, oldVnode) {
    if (vnode.tag === 'select') {
      // #6903
      if (oldVnode.elm && !oldVnode.elm._vOptions) {
        mergeVNodeHook(vnode, 'postpatch', function () {
          directive.componentUpdated(el, binding, vnode);
        });
      } else {
        setSelected(el, binding, vnode.context);
      }
      el._vOptions = [].map.call(el.options, getValue);
    } else if (vnode.tag === 'textarea' || isTextInputType(el.type)) {
      el._vModifiers = binding.modifiers;
      if (!binding.modifiers.lazy) {
        // Safari < 10.2 & UIWebView doesn't fire compositionend when
        // switching focus before confirming composition choice
        // this also fixes the issue where some browsers e.g. iOS Chrome
        // fires "change" instead of "input" on autocomplete.
        el.addEventListener('change', onCompositionEnd);
        if (!isAndroid) {
          el.addEventListener('compositionstart', onCompositionStart);
          el.addEventListener('compositionend', onCompositionEnd);
        }
        /* istanbul ignore if */
        if (isIE9) {
          el.vmodel = true;
        }
      }
    }
  },

  componentUpdated: function componentUpdated (el, binding, vnode) {
    if (vnode.tag === 'select') {
      setSelected(el, binding, vnode.context);
      // in case the options rendered by v-for have changed,
      // it's possible that the value is out-of-sync with the rendered options.
      // detect such cases and filter out values that no longer has a matching
      // option in the DOM.
      var prevOptions = el._vOptions;
      var curOptions = el._vOptions = [].map.call(el.options, getValue);
      if (curOptions.some(function (o, i) { return !looseEqual(o, prevOptions[i]); })) {
        // trigger change event if
        // no matching option found for at least one value
        var needReset = el.multiple
          ? binding.value.some(function (v) { return hasNoMatchingOption(v, curOptions); })
          : binding.value !== binding.oldValue && hasNoMatchingOption(binding.value, curOptions);
        if (needReset) {
          trigger(el, 'change');
        }
      }
    }
  }
};

function setSelected (el, binding, vm) {
  actuallySetSelected(el, binding, vm);
  /* istanbul ignore if */
  if (isIE || isEdge) {
    setTimeout(function () {
      actuallySetSelected(el, binding, vm);
    }, 0);
  }
}

function actuallySetSelected (el, binding, vm) {
  var value = binding.value;
  var isMultiple = el.multiple;
  if (isMultiple && !Array.isArray(value)) {
    process.env.NODE_ENV !== 'production' && warn(
      "<select multiple v-model=\"" + (binding.expression) + "\"> " +
      "expects an Array value for its binding, but got " + (Object.prototype.toString.call(value).slice(8, -1)),
      vm
    );
    return
  }
  var selected, option;
  for (var i = 0, l = el.options.length; i < l; i++) {
    option = el.options[i];
    if (isMultiple) {
      selected = looseIndexOf(value, getValue(option)) > -1;
      if (option.selected !== selected) {
        option.selected = selected;
      }
    } else {
      if (looseEqual(getValue(option), value)) {
        if (el.selectedIndex !== i) {
          el.selectedIndex = i;
        }
        return
      }
    }
  }
  if (!isMultiple) {
    el.selectedIndex = -1;
  }
}

function hasNoMatchingOption (value, options) {
  return options.every(function (o) { return !looseEqual(o, value); })
}

function getValue (option) {
  return '_value' in option
    ? option._value
    : option.value
}

function onCompositionStart (e) {
  e.target.composing = true;
}

function onCompositionEnd (e) {
  // prevent triggering an input event for no reason
  if (!e.target.composing) { return }
  e.target.composing = false;
  trigger(e.target, 'input');
}

function trigger (el, type) {
  var e = document.createEvent('HTMLEvents');
  e.initEvent(type, true, true);
  el.dispatchEvent(e);
}

/*  */

// recursively search for possible transition defined inside the component root
function locateNode (vnode) {
  return vnode.componentInstance && (!vnode.data || !vnode.data.transition)
    ? locateNode(vnode.componentInstance._vnode)
    : vnode
}

var show = {
  bind: function bind (el, ref, vnode) {
    var value = ref.value;

    vnode = locateNode(vnode);
    var transition$$1 = vnode.data && vnode.data.transition;
    var originalDisplay = el.__vOriginalDisplay =
      el.style.display === 'none' ? '' : el.style.display;
    if (value && transition$$1) {
      vnode.data.show = true;
      enter(vnode, function () {
        el.style.display = originalDisplay;
      });
    } else {
      el.style.display = value ? originalDisplay : 'none';
    }
  },

  update: function update (el, ref, vnode) {
    var value = ref.value;
    var oldValue = ref.oldValue;

    /* istanbul ignore if */
    if (value === oldValue) { return }
    vnode = locateNode(vnode);
    var transition$$1 = vnode.data && vnode.data.transition;
    if (transition$$1) {
      vnode.data.show = true;
      if (value) {
        enter(vnode, function () {
          el.style.display = el.__vOriginalDisplay;
        });
      } else {
        leave(vnode, function () {
          el.style.display = 'none';
        });
      }
    } else {
      el.style.display = value ? el.__vOriginalDisplay : 'none';
    }
  },

  unbind: function unbind (
    el,
    binding,
    vnode,
    oldVnode,
    isDestroy
  ) {
    if (!isDestroy) {
      el.style.display = el.__vOriginalDisplay;
    }
  }
};

var platformDirectives = {
  model: directive,
  show: show
};

/*  */

// Provides transition support for a single element/component.
// supports transition mode (out-in / in-out)

var transitionProps = {
  name: String,
  appear: Boolean,
  css: Boolean,
  mode: String,
  type: String,
  enterClass: String,
  leaveClass: String,
  enterToClass: String,
  leaveToClass: String,
  enterActiveClass: String,
  leaveActiveClass: String,
  appearClass: String,
  appearActiveClass: String,
  appearToClass: String,
  duration: [Number, String, Object]
};

// in case the child is also an abstract component, e.g. <keep-alive>
// we want to recursively retrieve the real component to be rendered
function getRealChild (vnode) {
  var compOptions = vnode && vnode.componentOptions;
  if (compOptions && compOptions.Ctor.options.abstract) {
    return getRealChild(getFirstComponentChild(compOptions.children))
  } else {
    return vnode
  }
}

function extractTransitionData (comp) {
  var data = {};
  var options = comp.$options;
  // props
  for (var key in options.propsData) {
    data[key] = comp[key];
  }
  // events.
  // extract listeners and pass them directly to the transition methods
  var listeners = options._parentListeners;
  for (var key$1 in listeners) {
    data[camelize(key$1)] = listeners[key$1];
  }
  return data
}

function placeholder (h, rawChild) {
  if (/\d-keep-alive$/.test(rawChild.tag)) {
    return h('keep-alive', {
      props: rawChild.componentOptions.propsData
    })
  }
}

function hasParentTransition (vnode) {
  while ((vnode = vnode.parent)) {
    if (vnode.data.transition) {
      return true
    }
  }
}

function isSameChild (child, oldChild) {
  return oldChild.key === child.key && oldChild.tag === child.tag
}

var Transition = {
  name: 'transition',
  props: transitionProps,
  abstract: true,

  render: function render (h) {
    var this$1 = this;

    var children = this.$slots.default;
    if (!children) {
      return
    }

    // filter out text nodes (possible whitespaces)
    children = children.filter(function (c) { return c.tag || isAsyncPlaceholder(c); });
    /* istanbul ignore if */
    if (!children.length) {
      return
    }

    // warn multiple elements
    if (process.env.NODE_ENV !== 'production' && children.length > 1) {
      warn(
        '<transition> can only be used on a single element. Use ' +
        '<transition-group> for lists.',
        this.$parent
      );
    }

    var mode = this.mode;

    // warn invalid mode
    if (process.env.NODE_ENV !== 'production' &&
      mode && mode !== 'in-out' && mode !== 'out-in'
    ) {
      warn(
        'invalid <transition> mode: ' + mode,
        this.$parent
      );
    }

    var rawChild = children[0];

    // if this is a component root node and the component's
    // parent container node also has transition, skip.
    if (hasParentTransition(this.$vnode)) {
      return rawChild
    }

    // apply transition data to child
    // use getRealChild() to ignore abstract components e.g. keep-alive
    var child = getRealChild(rawChild);
    /* istanbul ignore if */
    if (!child) {
      return rawChild
    }

    if (this._leaving) {
      return placeholder(h, rawChild)
    }

    // ensure a key that is unique to the vnode type and to this transition
    // component instance. This key will be used to remove pending leaving nodes
    // during entering.
    var id = "__transition-" + (this._uid) + "-";
    child.key = child.key == null
      ? child.isComment
        ? id + 'comment'
        : id + child.tag
      : isPrimitive(child.key)
        ? (String(child.key).indexOf(id) === 0 ? child.key : id + child.key)
        : child.key;

    var data = (child.data || (child.data = {})).transition = extractTransitionData(this);
    var oldRawChild = this._vnode;
    var oldChild = getRealChild(oldRawChild);

    // mark v-show
    // so that the transition module can hand over the control to the directive
    if (child.data.directives && child.data.directives.some(function (d) { return d.name === 'show'; })) {
      child.data.show = true;
    }

    if (
      oldChild &&
      oldChild.data &&
      !isSameChild(child, oldChild) &&
      !isAsyncPlaceholder(oldChild) &&
      // #6687 component root is a comment node
      !(oldChild.componentInstance && oldChild.componentInstance._vnode.isComment)
    ) {
      // replace old child transition data with fresh one
      // important for dynamic transitions!
      var oldData = oldChild.data.transition = extend({}, data);
      // handle transition mode
      if (mode === 'out-in') {
        // return placeholder node and queue update when leave finishes
        this._leaving = true;
        mergeVNodeHook(oldData, 'afterLeave', function () {
          this$1._leaving = false;
          this$1.$forceUpdate();
        });
        return placeholder(h, rawChild)
      } else if (mode === 'in-out') {
        if (isAsyncPlaceholder(child)) {
          return oldRawChild
        }
        var delayedLeave;
        var performLeave = function () { delayedLeave(); };
        mergeVNodeHook(data, 'afterEnter', performLeave);
        mergeVNodeHook(data, 'enterCancelled', performLeave);
        mergeVNodeHook(oldData, 'delayLeave', function (leave) { delayedLeave = leave; });
      }
    }

    return rawChild
  }
};

/*  */

// Provides transition support for list items.
// supports move transitions using the FLIP technique.

// Because the vdom's children update algorithm is "unstable" - i.e.
// it doesn't guarantee the relative positioning of removed elements,
// we force transition-group to update its children into two passes:
// in the first pass, we remove all nodes that need to be removed,
// triggering their leaving transition; in the second pass, we insert/move
// into the final desired state. This way in the second pass removed
// nodes will remain where they should be.

var props = extend({
  tag: String,
  moveClass: String
}, transitionProps);

delete props.mode;

var TransitionGroup = {
  props: props,

  render: function render (h) {
    var tag = this.tag || this.$vnode.data.tag || 'span';
    var map = Object.create(null);
    var prevChildren = this.prevChildren = this.children;
    var rawChildren = this.$slots.default || [];
    var children = this.children = [];
    var transitionData = extractTransitionData(this);

    for (var i = 0; i < rawChildren.length; i++) {
      var c = rawChildren[i];
      if (c.tag) {
        if (c.key != null && String(c.key).indexOf('__vlist') !== 0) {
          children.push(c);
          map[c.key] = c
          ;(c.data || (c.data = {})).transition = transitionData;
        } else if (process.env.NODE_ENV !== 'production') {
          var opts = c.componentOptions;
          var name = opts ? (opts.Ctor.options.name || opts.tag || '') : c.tag;
          warn(("<transition-group> children must be keyed: <" + name + ">"));
        }
      }
    }

    if (prevChildren) {
      var kept = [];
      var removed = [];
      for (var i$1 = 0; i$1 < prevChildren.length; i$1++) {
        var c$1 = prevChildren[i$1];
        c$1.data.transition = transitionData;
        c$1.data.pos = c$1.elm.getBoundingClientRect();
        if (map[c$1.key]) {
          kept.push(c$1);
        } else {
          removed.push(c$1);
        }
      }
      this.kept = h(tag, null, kept);
      this.removed = removed;
    }

    return h(tag, null, children)
  },

  beforeUpdate: function beforeUpdate () {
    // force removing pass
    this.__patch__(
      this._vnode,
      this.kept,
      false, // hydrating
      true // removeOnly (!important avoids unnecessary moves)
    );
    this._vnode = this.kept;
  },

  updated: function updated () {
    var children = this.prevChildren;
    var moveClass = this.moveClass || ((this.name || 'v') + '-move');
    if (!children.length || !this.hasMove(children[0].elm, moveClass)) {
      return
    }

    // we divide the work into three loops to avoid mixing DOM reads and writes
    // in each iteration - which helps prevent layout thrashing.
    children.forEach(callPendingCbs);
    children.forEach(recordPosition);
    children.forEach(applyTranslation);

    // force reflow to put everything in position
    // assign to this to avoid being removed in tree-shaking
    // $flow-disable-line
    this._reflow = document.body.offsetHeight;

    children.forEach(function (c) {
      if (c.data.moved) {
        var el = c.elm;
        var s = el.style;
        addTransitionClass(el, moveClass);
        s.transform = s.WebkitTransform = s.transitionDuration = '';
        el.addEventListener(transitionEndEvent, el._moveCb = function cb (e) {
          if (!e || /transform$/.test(e.propertyName)) {
            el.removeEventListener(transitionEndEvent, cb);
            el._moveCb = null;
            removeTransitionClass(el, moveClass);
          }
        });
      }
    });
  },

  methods: {
    hasMove: function hasMove (el, moveClass) {
      /* istanbul ignore if */
      if (!hasTransition) {
        return false
      }
      /* istanbul ignore if */
      if (this._hasMove) {
        return this._hasMove
      }
      // Detect whether an element with the move class applied has
      // CSS transitions. Since the element may be inside an entering
      // transition at this very moment, we make a clone of it and remove
      // all other transition classes applied to ensure only the move class
      // is applied.
      var clone = el.cloneNode();
      if (el._transitionClasses) {
        el._transitionClasses.forEach(function (cls) { removeClass(clone, cls); });
      }
      addClass(clone, moveClass);
      clone.style.display = 'none';
      this.$el.appendChild(clone);
      var info = getTransitionInfo(clone);
      this.$el.removeChild(clone);
      return (this._hasMove = info.hasTransform)
    }
  }
};

function callPendingCbs (c) {
  /* istanbul ignore if */
  if (c.elm._moveCb) {
    c.elm._moveCb();
  }
  /* istanbul ignore if */
  if (c.elm._enterCb) {
    c.elm._enterCb();
  }
}

function recordPosition (c) {
  c.data.newPos = c.elm.getBoundingClientRect();
}

function applyTranslation (c) {
  var oldPos = c.data.pos;
  var newPos = c.data.newPos;
  var dx = oldPos.left - newPos.left;
  var dy = oldPos.top - newPos.top;
  if (dx || dy) {
    c.data.moved = true;
    var s = c.elm.style;
    s.transform = s.WebkitTransform = "translate(" + dx + "px," + dy + "px)";
    s.transitionDuration = '0s';
  }
}

var platformComponents = {
  Transition: Transition,
  TransitionGroup: TransitionGroup
};

/*  */

// install platform specific utils
Vue$3.config.mustUseProp = mustUseProp;
Vue$3.config.isReservedTag = isReservedTag;
Vue$3.config.isReservedAttr = isReservedAttr;
Vue$3.config.getTagNamespace = getTagNamespace;
Vue$3.config.isUnknownElement = isUnknownElement;

// install platform runtime directives & components
extend(Vue$3.options.directives, platformDirectives);
extend(Vue$3.options.components, platformComponents);

// install platform patch function
Vue$3.prototype.__patch__ = inBrowser ? patch : noop;

// public mount method
Vue$3.prototype.$mount = function (
  el,
  hydrating
) {
  el = el && inBrowser ? query(el) : undefined;
  return mountComponent(this, el, hydrating)
};

// devtools global hook
/* istanbul ignore next */
Vue$3.nextTick(function () {
  if (config.devtools) {
    if (devtools) {
      devtools.emit('init', Vue$3);
    } else if (process.env.NODE_ENV !== 'production' && isChrome) {
      console[console.info ? 'info' : 'log'](
        'Download the Vue Devtools extension for a better development experience:\n' +
        'https://github.com/vuejs/vue-devtools'
      );
    }
  }
  if (process.env.NODE_ENV !== 'production' &&
    config.productionTip !== false &&
    inBrowser && typeof console !== 'undefined'
  ) {
    console[console.info ? 'info' : 'log'](
      "You are running Vue in development mode.\n" +
      "Make sure to turn on production mode when deploying for production.\n" +
      "See more tips at https://vuejs.org/guide/deployment.html"
    );
  }
}, 0);

var version = "0.15.0-alpha.6";

function offset (el) {
  if (el === window) {
    return {top: 0, left: 0}
  }
  var ref = el.getBoundingClientRect();
  var top = ref.top;
  var left = ref.left;

  return {top: top, left: left}
}

function style$1 (el, property) {
  return window.getComputedStyle(el).getPropertyValue(property)
}

function height (el) {
  if (el === window) {
    return viewport().height
  }
  return parseFloat(style$1(el, 'height'))
}

function width (el) {
  if (el === window) {
    return viewport().width
  }
  return parseFloat(style$1(el, 'width'))
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
	style: style$1,
	height: height,
	width: width,
	css: css,
	viewport: viewport,
	ready: ready,
	cssTransform: cssTransform
});

/* eslint-disable no-useless-escape */
/* eslint-disable no-unused-expressions */
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
  else if (
    window._cordovaNative ||
    window.cordova ||
    document.location.href.indexOf('http://') === -1
  ) {
    browser.cordova = true;
  }

  return browser
}

var Platform = {
  __installed: false,
  install: function install (ref) {
    var $q = ref.$q;

    if (this.__installed) { return }
    this.__installed = true;

    Platform.is = getPlatform();
    Platform.has = {
      touch: (function () { return !!('ontouchstart' in document.documentElement) || window.navigator.msMaxTouchPoints > 0; })()
    };
    Platform.within = {
      iframe: window.self !== window.top
    };

    try {
      if (window.localStorage) {
        Platform.has.webStorage = true;
      }
    }
    catch (e) {
      Platform.has.webStorage = false;
    }

    $q.platform = Platform;
  }
};

var History = {
  __history: [],
  add: function () {},
  remove: function () {},

  __installed: false,
  install: function install () {
    var this$1 = this;

    if (this.__installed || !Platform.is.cordova) {
      return
    }

    this.__installed = true;
    this.add = function (definition) {
      this$1.__history.push(definition);
    };
    this.remove = function (definition) {
      var index = this$1.__history.indexOf(definition);
      if (index >= 0) {
        this$1.__history.splice(index, 1);
      }
    };

    document.addEventListener('deviceready', function () {
      document.addEventListener('backbutton', function () {
        if (this$1.__history.length) {
          this$1.__history.pop().handler();
        }
        else {
          window.history.back();
        }
      }, false);
    });
  }
}

/* eslint-disable no-extend-native, one-var, no-self-compare */

if (!Array.prototype.includes) {
  Array.prototype.includes = function (searchEl, startFrom) {
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
      if (this == null) {
        throw new TypeError('Array.prototype.find called on null or undefined')
      }
      if (typeof predicate !== 'function') {
        throw new TypeError('predicate must be a function')
      }

      var value;
      var
        list = Object(this),
        length = list.length >>> 0,
        thisArg = arguments[1];

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

var langEn = {
  lang: 'en-us',
  label: {
    clear: 'Clear',
    ok: 'OK',
    cancel: 'Cancel',
    close: 'Close',
    set: 'Set',
    select: 'Select',
    reset: 'Reset',
    remove: 'Remove',
    update: 'Update',
    create: 'Create',
    search: 'Search',
    filter: 'Filter',
    refresh: 'Refresh'
  },
  date: {
    days: 'Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday'.split('_'),
    daysShort: 'Sun_Mon_Tue_Wed_Thu_Fri_Sat'.split('_'),
    months: 'January_February_March_April_May_June_July_August_September_October_November_December'.split('_'),
    monthsShort: 'Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec'.split('_'),
    firstDayOfWeek: 0, // 0-6, 0 - Sunday, 1 Monday, ...
    format24h: false
  },
  pullToRefresh: {
    pull: 'Pull down to refresh',
    release: 'Release to refresh',
    refresh: 'Refreshing...'
  },
  table: {
    noData: 'No data available',
    noResults: 'No matching records found',
    loader: 'Loading...',
    selectedRows: function (rows) { return rows > 0 ? (rows + " row" + (rows === 1 ? '' : 's') + " selected.") : 'No selected rows.'; },
    rowsPerPage: 'Rows per page:',
    allRows: 'All',
    pagination: function (start, end, total) { return (start + "-" + end + " of " + total); },
    columns: 'Columns'
  },
  editor: {
    url: 'URL',
    bold: 'Bold',
    italic: 'Italic',
    strikethrough: 'Strikethrough',
    underline: 'Underline',
    unorderedList: 'Unordered List',
    orderedList: 'Ordered List',
    subscript: 'Subscript',
    superscript: 'Superscript',
    hyperlink: 'Hyperlink',
    toggleFullscreen: 'Toggle Fullscreen',
    quote: 'Quote',
    left: 'Left align',
    center: 'Center align',
    right: 'Right align',
    justify: 'Justify align',
    print: 'Print',
    outdent: 'Decrease indentation',
    indent: 'Increase indentation',
    removeFormat: 'Remove formatting',
    formatting: 'Formatting',
    fontSize: 'Font Size',
    align: 'Align',
    hr: 'Insert Horizontal Rule',
    undo: 'Undo',
    redo: 'Redo',
    header1: 'Header 1',
    header2: 'Header 2',
    header3: 'Header 3',
    header4: 'Header 4',
    header5: 'Header 5',
    header6: 'Header 6',
    paragraph: 'Paragraph',
    code: 'Code',
    size1: 'Very small',
    size2: 'A bit small',
    size3: 'Normal',
    size4: 'Medium-large',
    size5: 'Big',
    size6: 'Very big',
    size7: 'Maximum',
    defaultFont: 'Default Font'
  },
  tree: {
    noNodes: 'No nodes available',
    noResults: 'No matching nodes found'
  }
}

var i18n = {
  __installed: false,
  install: function install (ref) {
    var this$1 = this;
    var $q = ref.$q;
    var Vue = ref.Vue;
    var lang = ref.lang;

    if (this.__installed) { return }
    this.__installed = true;

    this.set = function (lang) {
      if ( lang === void 0 ) lang = langEn;

      lang.set = this$1.set;

      Vue.set($q, 'i18n', lang);
      this$1.name = lang.lang;
      this$1.lang = lang;
    };

    this.set(lang);
  }
}

var iconMaterial = {
  name: 'material',
  type: {
    positive: 'check_circle',
    negative: 'warning',
    info: 'info',
    warning: 'priority_high'
  },
  arrow: {
    up: 'arrow_upward',
    right: 'arrow_forward',
    down: 'arrow_downward',
    left: 'arrow_back'
  },
  chevron: {
    left: 'chevron_left',
    right: 'chevron_right'
  },

  pullToRefresh: {
    arrow: 'arrow_downward',
    refresh: 'refresh'
  },
  search: {
    icon: 'search',
    clear: 'cancel',
    clearInverted: 'clear'
  },
  carousel: {
    left: 'chevron_left',
    right: 'chevron_right',
    quickNav: 'lens'
  },
  checkbox: {
    checked: {
      ios: 'check_circle',
      mat: 'check_box'
    },
    unchecked: {
      ios: 'radio_button_unchecked',
      mat: 'check_box_outline_blank'
    },
    indeterminate: {
      ios: 'remove_circle_outline',
      mat: 'indeterminate_check_box'
    }
  },
  chip: {
    close: 'cancel'
  },
  collapsible: {
    icon: 'keyboard_arrow_down'
  },
  datetime: {
    arrowLeft: 'chevron_left',
    arrowRight: 'chevron_right'
  },
  editor: {
    bold: 'format_bold',
    italic: 'format_italic',
    strikethrough: 'strikethrough_s',
    underline: 'format_underlined',
    unorderedList: 'format_list_bulleted',
    orderedList: 'format_list_numbered',
    subscript: 'vertical_align_bottom',
    superscript: 'vertical_align_top',
    hyperlink: 'link',
    toggleFullscreen: 'fullscreen',
    quote: 'format_quote',
    left: 'format_align_left',
    center: 'format_align_center',
    right: 'format_align_right',
    justify: 'format_align_justify',
    print: 'print',
    outdent: 'format_indent_decrease',
    indent: 'format_indent_increase',
    removeFormat: 'format_clear',
    formatting: 'text_format',
    fontSize: 'format_size',
    align: 'format_align_left',
    hr: 'remove',
    undo: 'undo',
    redo: 'redo',
    header: 'format_size',
    code: 'code',
    size: 'format_size',
    font: 'font_download'
  },
  fab: {
    icon: 'add',
    activeIcon: 'close'
  },
  input: {
    showPass: 'visibility',
    hidePass: 'visibility_off',
    showNumber: 'keyboard',
    hideNumber: 'keyboard_hide',
    clear: 'cancel',
    dropdown: 'arrow_drop_down'
  },
  pagination: {
    first: 'first_page',
    prev: 'keyboard_arrow_left',
    next: 'keyboard_arrow_right',
    last: 'last_page'
  },
  radio: {
    checked: {
      ios: 'check',
      mat: 'radio_button_checked'
    },
    unchecked: {
      ios: '',
      mat: 'radio_button_unchecked'
    }
  },
  rating: {
    icon: 'grade'
  },
  stepper: {
    done: 'check',
    active: 'edit',
    error: 'warning'
  },
  tabs: {
    left: 'chevron_left',
    right: 'chevron_right'
  },
  table: {
    arrowUp: 'arrow_upward',
    warning: 'warning',
    prevPage: 'chevron_left',
    nextPage: 'chevron_right'
  },
  tree: {
    icon: 'play_arrow'
  },
  uploader: {
    done: 'done',
    clear: 'clear',
    add: 'add',
    upload: 'cloud_upload',
    expand: 'keyboard_arrow_down',
    file: 'insert_drive_file'
  }
}

var icons = {
  __installed: false,
  install: function install (ref) {
    var this$1 = this;
    var $q = ref.$q;
    var Vue = ref.Vue;
    var iconSet = ref.iconSet;

    if (this.__installed) { return }
    this.__installed = true;

    this.set = function (iconDef) {
      if ( iconDef === void 0 ) iconDef = iconMaterial;

      iconDef.set = this$1.set;

      Vue.set($q, 'icon', iconDef);
      this$1.name = iconDef.name;
      this$1.def = iconDef;
    };

    // TODO default ???
    this.set(iconSet);
  }
}

function addBodyClasses () {
  var cls = [
    "ios",
    Platform.is.desktop ? 'desktop' : 'mobile',
    Platform.has.touch ? 'touch' : 'no-touch',
    ("platform-" + (Platform.is.ios ? 'ios' : 'mat'))
  ];

  Platform.within.iframe && cls.push('within-iframe');
  Platform.is.cordova && cls.push('cordova');
  Platform.is.electron && cls.push('electron');

  document.body.classList.add.apply(document.body.classList, cls);
}

function install (_Vue, opts) {
  if ( opts === void 0 ) opts = {};

  if (this.__installed) {
    return
  }
  this.__installed = true;

  var $q = {
    version: version,
    theme: "ios"
  };

  // required plugins
  Platform.install({ $q: $q });
  History.install();
  i18n.install({ $q: $q, Vue: _Vue, lang: opts.i18n });
  icons.install({ $q: $q, Vue: _Vue, iconSet: opts.iconSet });

  // inject body classes
  ready(addBodyClasses);

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

  if (opts.plugins) {
    Object.keys(opts.plugins).forEach(function (key) {
      var p = opts.plugins[key];
      if (typeof p.install === 'function') {
        p.install({ $q: $q, Vue: _Vue });
      }
    });
  }

  _Vue.prototype.$q = $q;
}

var QApp = {
  name: 'q-app',
  render: function render (h) {
    return h('div', { staticClass: 'q-app' }, [
      this.$slots.default
    ])
  }
}

var handlers = [];

var EscapeKey = {
  __installed: false,
  __install: function __install () {
    this.__installed = true;
    window.addEventListener('keyup', function (evt) {
      if (handlers.length === 0) {
        return
      }

      if (evt.which === 27 || evt.keyCode === 27) {
        handlers[handlers.length - 1]();
      }
    });
  },

  register: function register (handler) {
    if (Platform.is.desktop) {
      if (!this.__installed) {
        this.__install();
      }

      handlers.push(handler);
    }
  },

  pop: function pop () {
    if (Platform.is.desktop) {
      handlers.pop();
    }
  }
}

var toString$1 = Object.prototype.toString;
var hasOwn$1 = Object.prototype.hasOwnProperty;
var class2type = {};

'Boolean Number String Function Array Date RegExp Object'.split(' ').forEach(function (name) {
  class2type['[object ' + name + ']'] = name.toLowerCase();
});

function type (obj) {
  return obj === null ? String(obj) : class2type[toString$1.call(obj)] || 'object'
}

function isPlainObject$1 (obj) {
  if (!obj || type(obj) !== 'object') {
    return false
  }

  if (obj.constructor &&
    !hasOwn$1.call(obj, 'constructor') &&
    !hasOwn$1.call(obj.constructor.prototype, 'isPrototypeOf')) {
    return false
  }

  var key;
  for (key in obj) {}

  return key === undefined || hasOwn$1.call(obj, key)
}

function extend$1 () {
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
    if ((options = arguments$1[i]) !== null) {
      for (name in options) {
        src = target[name];
        copy = options[name];

        if (target === copy) {
          continue
        }

        if (deep && copy && (isPlainObject$1(copy) || (copyIsArray = type(copy) === 'array'))) {
          if (copyIsArray) {
            copyIsArray = false;
            clone = src && type(src) === 'array' ? src : [];
          }
          else {
            clone = src && isPlainObject$1(src) ? src : {};
          }

          target[name] = extend$1(deep, clone, copy);
        }
        else if (copy !== undefined) {
          target[name] = copy;
        }
      }
    }
  }

  return target
}

/* eslint prefer-promise-reject-errors: 0 */
var ModelToggleMixin = {
  props: {
    value: Boolean
  },
  data: function data () {
    return {
      showing: false
    }
  },
  watch: {
    value: function value (val) {
      var this$1 = this;

      if (this.disable && val) {
        this.$emit('input', false);
        return
      }

      this.$nextTick(function () {
        if (this$1.value !== this$1.showing) {
          this$1[val ? 'show' : 'hide']();
        }
      });
    }
  },
  methods: {
    toggle: function toggle (evt) {
      return this[this.showing ? 'hide' : 'show'](evt)
    },
    show: function show (evt) {
      var this$1 = this;

      if (this.disable || this.showing) {
        return this.showPromise || Promise.resolve(evt)
      }

      if (this.hidePromise) {
        this.hidePromiseReject();
      }

      this.showing = true;
      if (this.value === false) {
        this.$emit('input', true);
      }

      if (this.$options.modelToggle === void 0 || this.$options.modelToggle.history) {
        this.__historyEntry = {
          handler: this.hide
        };
        History.add(this.__historyEntry);
      }

      if (!this.__show) {
        this.$emit('show');
        return Promise.resolve(evt)
      }

      this.showPromise = new Promise(function (resolve, reject) {
        this$1.showPromiseResolve = function () {
          this$1.showPromise = null;
          this$1.$emit('show');
          resolve(evt);
        };
        this$1.showPromiseReject = function () {
          this$1.showPromise = null;
          reject(null); // eslint prefer-promise-reject-errors: 0
        };
      });

      this.__show(evt);
      return this.showPromise || Promise.resolve(evt)
    },
    hide: function hide (evt) {
      var this$1 = this;

      if (this.disable || !this.showing) {
        return this.hidePromise || Promise.resolve(evt)
      }

      if (this.showPromise) {
        this.showPromiseReject();
      }

      this.showing = false;
      if (this.value === true) {
        this.$emit('input', false);
      }

      if (this.__historyEntry) {
        History.remove(this.__historyEntry);
        this.__historyEntry = null;
      }

      if (!this.__hide) {
        this.$emit('hide');
        return Promise.resolve()
      }

      this.hidePromise = new Promise(function (resolve, reject) {
        this$1.hidePromiseResolve = function () {
          this$1.hidePromise = null;
          this$1.$emit('hide');
          resolve();
        };
        this$1.hidePromiseReject = function () {
          this$1.hidePromise = null;
          reject(null);
        };
      });

      this.__hide(evt);
      return this.hidePromise || Promise.resolve(evt)
    }
  },
  beforeDestroy: function beforeDestroy () {
    if (this.showing) {
      this.showPromise && this.showPromiseReject();
      this.hidePromise && this.hidePromiseReject();
      this.$emit('input', false);
      this.__hide && this.__hide();
    }
  }
}

var positions = {
  top: 'items-start justify-center with-backdrop',
  bottom: 'items-end justify-center with-backdrop',
  right: 'items-center justify-end with-backdrop',
  left: 'items-center justify-start with-backdrop'
};
var positionCSS = {
    maxHeight: '80vh',
    height: 'auto',
    boxShadow: 'none'
  };

function additionalCSS (position) {
  var css = {};

  if (['left', 'right'].includes(position)) {
    css.maxWidth = '90vw';
  }
  {
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

var openedModalNumber = 0;

var QModal = {
  name: 'q-modal',
  mixins: [ModelToggleMixin],
  props: {
    position: {
      type: String,
      default: '',
      validator: function validator (val) {
        return val === '' || ['top', 'bottom', 'left', 'right'].includes(val)
      }
    },
    transition: String,
    enterClass: String,
    leaveClass: String,
    positionClasses: {
      type: String,
      default: 'flex-center'
    },
    contentClasses: [Object, Array, String],
    contentCss: [Object, Array, String],
    noBackdropDismiss: {
      type: Boolean,
      default: false
    },
    noEscDismiss: {
      type: Boolean,
      default: false
    },
    minimized: Boolean,
    maximized: Boolean
  },
  watch: {
    $route: function $route () {
      this.hide();
    }
  },
  computed: {
    modalClasses: function modalClasses () {
      var cls = this.position
        ? positions[this.position]
        : this.positionClasses;
      if (this.maximized) {
        return ['maximized', cls]
      }
      else if (this.minimized) {
        return ['minimized', cls]
      }
      return cls
    },
    transitionProps: function transitionProps () {
      if (this.position) {
        return { name: ("q-modal-" + (this.position)) }
      }
      if (this.enterClass === void 0 && this.leaveClass === void 0) {
        return { name: this.transition || 'q-modal' }
      }
      return {
        enterActiveClass: this.enterClass,
        leaveActiveClass: this.leaveClass
      }
    },
    modalCss: function modalCss () {
      if (this.position) {
        var css = Array.isArray(this.contentCss)
          ? this.contentCss
          : [this.contentCss];

        css.unshift(extend$1(
          {},
          positionCSS,
          additionalCSS(this.position)
        ));

        return css
      }

      return this.contentCss
    }
  },
  methods: {
    __dismiss: function __dismiss () {
      var this$1 = this;

      if (this.noBackdropDismiss) {
        return
      }
      this.hide().then(function () {
        this$1.$emit('dismiss');
      });
    },
    __show: function __show () {
      var this$1 = this;

      var body = document.body;

      body.appendChild(this.$el);
      body.classList.add('with-modal');

      EscapeKey.register(function () {
        if (!this$1.noEscDismiss) {
          this$1.hide().then(function () {
            this$1.$emit('escape-key');
          });
        }
      });

      openedModalNumber++;

      var content = this.$refs.content;
      content.scrollTop = 0
      ;['modal-scroll', 'layout-view'].forEach(function (c) {
        [].slice.call(content.getElementsByClassName(c)).forEach(function (el) {
          el.scrollTop = 0;
        });
      });
    },
    __hide: function __hide () {
      EscapeKey.pop();
      openedModalNumber--;

      if (openedModalNumber === 0) {
        var body = document.body;

        body.classList.remove('with-modal');
        body.style.paddingRight = this.bodyPadding;
      }
    }
  },
  mounted: function mounted () {
    if (this.value) {
      this.show();
    }
  },
  beforeDestroy: function beforeDestroy () {
    if (this.$el.parentNode) {
      this.$el.parentNode.removeChild(this.$el);
    }
  },
  render: function render (h) {
    var this$1 = this;

    return h('transition', {
      props: this.transitionProps,
      on: {
        afterEnter: function () {
          this$1.showPromise && this$1.showPromiseResolve();
        },
        enterCancelled: function () {
          this$1.showPromise && this$1.showPromiseReject();
        },
        afterLeave: function () {
          this$1.hidePromise && this$1.hidePromiseResolve();
        },
        leaveCancelled: function () {
          this$1.hidePromise && this$1.hidePromiseReject();
        }
      }
    }, [
      h('div', {
        staticClass: 'modal fullscreen row',
        'class': this.modalClasses,
        on: {
          click: this.__dismiss
        },
        directives: [{
          name: 'show',
          value: this.showing
        }]
      }, [
        h('div', {
          ref: 'content',
          staticClass: 'modal-content scroll',
          style: this.modalCss,
          'class': this.contentClasses,
          on: {
            click: function click (e) {
              e.stopPropagation();
            },
            touchstart: function touchstart (e) {
              e.stopPropagation();
            }
          }
        }, [ this.$slots.default ])
      ])
    ])
  }
}

var QModalLayout = {
  name: 'q-modal-layout',
  props: {
    headerStyle: [String, Object, Array],
    headerClass: [String, Object, Array],

    contentStyle: [String, Object, Array],
    contentClass: [String, Object, Array],

    footerStyle: [String, Object, Array],
    footerClass: [String, Object, Array]
  },
  render: function render (h) {
    var child = [];

    if (this.$slots.header || ("ios" !== 'ios' && this.$slots.navigation)) {
      child.push(h('div', {
        staticClass: 'q-layout-header',
        style: this.headerStyle,
        'class': this.headerClass
      }, [
        this.$slots.header,
        null
      ]));
    }

    child.push(h('div', {
      staticClass: 'q-modal-layout-content col scroll',
      style: this.contentStyle,
      'class': this.contentClass
    }, [
      this.$slots.default
    ]));

    if (this.$slots.footer || ("ios" === 'ios' && this.$slots.navigation)) {
      child.push(h('div', {
        staticClass: 'q-layout-footer',
        style: this.footerStyle,
        'class': this.footerClass
      }, [
        this.$slots.footer,
        this.$slots.navigation
      ]));
    }

    return h('div', {
      staticClass: 'q-modal-layout column absolute-full'
    }, child)
  }
}

var QIcon = {
  name: 'q-icon',
  props: {
    name: String,
    mat: String,
    ios: String,
    color: String,
    size: String
  },
  computed: {
    icon: function icon () {
      return this.mat && "ios" === 'mat'
        ? this.mat
        : (this.ios && "ios" === 'ios' ? this.ios : this.name)
    },
    classes: function classes () {
      var cls;
      var icon = this.icon;

      if (!icon) {
        cls = '';
      }
      else if (icon.startsWith('fa-')) {
        // Fontawesome 4
        cls = "fa " + icon;
      }
      else if (/^fa[s|r|l|b]{0,1} /.test(icon)) {
        // Fontawesome 5
        cls = icon;
      }
      else if (icon.startsWith('bt-')) {
        cls = "bt " + icon;
      }
      else if (icon.startsWith('ion-') || icon.startsWith('icon-')) {
        cls = "" + icon;
      }
      else if (icon.startsWith('mdi-')) {
        cls = "mdi " + icon;
      }
      else {
        cls = 'material-icons';
      }

      return this.color
        ? (cls + " text-" + (this.color))
        : cls
    },
    content: function content () {
      return this.classes.startsWith('material-icons')
        ? this.icon.replace(/ /g, '_')
        : ' '
    },
    style: function style () {
      if (this.size) {
        return { fontSize: this.size }
      }
    }
  },
  render: function render (h) {
    return h('i', {
      staticClass: 'q-icon',
      'class': this.classes,
      style: this.style,
      attrs: { 'aria-hidden': true }
    }, [
      this.content,
      this.$slots.default
    ])
  }
}

function textStyle (n) {
  return n === void 0 || n < 2
    ? {}
    : {overflow: 'hidden', display: '-webkit-box', '-webkit-box-orient': 'vertical', '-webkit-line-clamp': n}
}

var list = ['icon', 'label', 'sublabel', 'image', 'avatar', 'letter', 'stamp'];

function getType$1 (prop) {
  var len = list.length;
  for (var i = 0; i < len; i++) {
    if (prop[list[i]]) {
      return list[i]
    }
  }
  return ''
}

function itemClasses (prop) {
  return {
    'q-item': true,
    'q-item-division': true,
    'relative-position': true,
    'q-item-dark': prop.dark,
    'q-item-dense': prop.dense,
    'q-item-sparse': prop.sparse,
    'q-item-separator': prop.separator,
    'q-item-inset-separator': prop.insetSeparator,
    'q-item-multiline': prop.multiline,
    'q-item-highlight': prop.highlight,
    'q-item-link': prop.to || prop.link
  }
}

var ItemMixin = {
  props: {
    dark: Boolean,
    dense: Boolean,
    sparse: Boolean,
    separator: Boolean,
    insetSeparator: Boolean,
    multiline: Boolean,
    highlight: Boolean,
    tag: {
      type: String,
      default: 'div'
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

var QItem = {
  name: 'q-item',
  mixins: [
    ItemMixin,
    { props: RouterLinkMixin.props }
  ],
  props: {
    active: Boolean,
    link: Boolean
  },
  computed: {
    classes: function classes () {
      var cls = itemClasses(this.$props);
      return this.to !== void 0
        ? cls
        : [{active: this.active}, cls]
    }
  },
  render: function render (h) {
    return this.to !== void 0
      ? h('router-link', { props: this.$props, 'class': this.classes }, [ this.$slots.default ])
      : h(this.tag, { 'class': this.classes }, [ this.$slots.default ])
  }
}

var QItemSeparator = {
  name: 'q-item-separator',
  props: {
    inset: Boolean
  },
  render: function render (h) {
    return h('div', {
      staticClass: 'q-item-separator-component',
      'class': {
        'q-item-separator-inset-component': this.inset
      }
    }, [
      this.$slots.default
    ])
  }
}

function text (h, name, val, n) {
  n = parseInt(n, 10);
  return h('div', {
    staticClass: ("q-item-" + name + (n === 1 ? ' ellipsis' : '')),
    style: textStyle(n),
    domProps: { innerHTML: val }
  })
}

var QItemMain = {
  name: 'q-item-main',
  props: {
    label: String,
    labelLines: [String, Number],
    sublabel: String,
    sublabelLines: [String, Number],
    inset: Boolean,
    tag: {
      type: String,
      default: 'div'
    }
  },
  render: function render (h) {
    return h('div', {
      staticClass: 'q-item-main q-item-section',
      'class': {
        'q-item-main-inset': this.inset
      }
    }, [
      this.label ? text(h, 'label', this.label, this.labelLines) : null,
      this.sublabel ? text(h, 'sublabel', this.sublabel, this.sublabelLines) : null,
      this.$slots.default
    ])
  }
}

var QItemSide = {
  name: 'q-item-side',
  props: {
    right: Boolean,

    icon: String,
    inverted: Boolean,

    avatar: String,
    letter: {
      type: String,
      validator: function (v) { return v.length === 1; }
    },
    image: String,
    stamp: String,

    color: String,
    tag: {
      type: String,
      default: 'div'
    }
  },
  computed: {
    classes: function classes () {
      return [
        ("q-item-side-" + (this.right ? 'right' : 'left')),
        ("" + (this.color ? ("text-" + (this.color)) : '')),
        this.image ? 'q-item-image' : ''
      ]
    },
    subClasses: function subClasses () {
      var obj;

      return ( obj = {
        'q-item-letter-inverted': this.inverted
      }, obj[("bg-" + (this.color))] = this.color && this.inverted, obj)
    }
  },
  render: function render (h) {
    var data = {
      staticClass: 'q-item-side q-item-section',
      'class': this.classes
    };

    if (this.image) {
      data.attrs = { src: this.image };
      return h('img', data)
    }

    return h(this.tag, data, [
      this.stamp
        ? h('div', { staticClass: 'q-item-stamp' }, [
          this.stamp
        ])
        : null,

      this.icon
        ? h(QIcon, {
          props: { name: this.icon },
          staticClass: 'q-item-icon',
          'class': this.subClasses
        })
        : null,

      this.avatar
        ? h('img', {
          staticClass: 'q-item-avatar',
          attrs: { src: this.avatar }
        })
        : null,

      this.letter
        ? h('div', {
          staticClass: 'q-item-letter',
          'class': this.subClasses
        }, [ this.letter ])
        : null,

      this.$slots.default
    ])
  }
}

var QItemTile = {
  name: 'q-item-tile',
  props: {
    icon: String,
    inverted: Boolean,

    image: Boolean,
    avatar: Boolean,
    letter: Boolean,
    stamp: Boolean,

    label: Boolean,
    sublabel: Boolean,
    lines: [Number, String],

    color: String,
    tag: {
      type: String,
      default: 'div'
    }
  },
  render: function render (h) {
    var
      textColor = this.color ? (" text-" + (this.color)) : '',
      bgColor = this.color ? (" bg-" + (this.color)) : '',
      data = {
        'class': ['q-item-' + getType$1(this.$props)]
      };

    if (this.icon) {
      data.props = { name: this.icon };
      data['class'].push(
        this.inverted
          ? ("q-item-icon-inverted" + bgColor)
          : textColor
      );

      return h(QIcon, data, [ this.$slots.default ])
    }

    data['class'].push(
      this.letter && this.inverted
        ? ("q-item-letter-inverted" + bgColor)
        : textColor
    );

    if ((this.label || this.sublabel) && this.lines) {
      if (this.lines === '1' || this.lines === 1) {
        data['class'].push('ellipsis');
      }
      data.style = textStyle(this.lines);
    }

    return h(this.tag, data, [ this.$slots.default ])
  }
}

function push (child, h, name, slot, replace, conf) {
  var defaultProps = { props: { right: conf.right } };

  if (slot && replace) {
    child.push(h(name, defaultProps, slot));
    return
  }

  var v = false;
  for (var p in conf) {
    if (conf.hasOwnProperty(p)) {
      v = conf[p];
      if (v !== void 0 && v !== true) {
        child.push(h(name, { props: conf }));
        break
      }
    }
  }

  slot && child.push(h(name, defaultProps, slot));
}

var QItemWrapper = {
  name: 'q-item-wrapper',
  props: {
    cfg: {
      type: Object,
      default: function () { return ({}); }
    },
    slotReplace: Boolean
  },
  render: function render (h) {
    var
      cfg = this.cfg,
      replace = this.slotReplace,
      child = [];

    push(child, h, QItemSide, this.$slots.left, replace, {
      icon: cfg.icon,
      color: cfg.leftColor,
      avatar: cfg.avatar,
      letter: cfg.letter,
      image: cfg.image
    });

    push(child, h, QItemMain, this.$slots.main, replace, {
      label: cfg.label,
      sublabel: cfg.sublabel,
      labelLines: cfg.labelLines,
      sublabelLines: cfg.sublabelLines,
      inset: cfg.inset
    });

    push(child, h, QItemSide, this.$slots.right, replace, {
      right: true,
      icon: cfg.rightIcon,
      color: cfg.rightColor,
      avatar: cfg.rightAvatar,
      letter: cfg.rightLetter,
      image: cfg.rightImage,
      stamp: cfg.stamp
    });

    child.push(this.$slots.default);

    return h(QItem, {
      attrs: this.$attrs,
      on: this.$listeners,
      props: cfg
    }, child)
  }
}

var QList = {
  name: 'q-list',
  props: {
    noBorder: Boolean,
    dark: Boolean,
    dense: Boolean,
    sparse: Boolean,
    striped: Boolean,
    stripedOdd: Boolean,
    separator: Boolean,
    insetSeparator: Boolean,
    multiline: Boolean,
    highlight: Boolean,
    link: Boolean
  },
  computed: {
    classes: function classes () {
      return {
        'no-border': this.noBorder,
        'q-list-dark': this.dark,
        'q-list-dense': this.dense,
        'q-list-sparse': this.sparse,
        'q-list-striped': this.striped,
        'q-list-striped-odd': this.stripedOdd,
        'q-list-separator': this.separator,
        'q-list-inset-separator': this.insetSeparator,
        'q-list-multiline': this.multiline,
        'q-list-highlight': this.highlight,
        'q-list-link': this.link
      }
    }
  },
  render: function render (h) {
    return h('div', {
      staticClass: 'q-list',
      'class': this.classes
    }, [
      this.$slots.default
    ])
  }
}

var QListHeader = {
  name: 'q-list-header',
  props: {
    inset: Boolean
  },
  render: function render (h) {
    return h('div', {
      staticClass: 'q-list-header',
      'class': {
        'q-list-header-inset': this.inset
      }
    }, [
      this.$slots.default
    ])
  }
}

var QActionSheet = {
  name: 'q-action-sheet',
  props: {
    value: Boolean,
    title: String,
    grid: Boolean,
    actions: Array,
    dismissLabel: String
  },
  computed: {
    contentCss: function contentCss () {
      {
        return {backgroundColor: 'transparent'}
      }
    }
  },
  render: function render (h) {
    var this$1 = this;

    var
      child = [],
      title = this.$slots.title || this.title;

    if (title) {
      child.push(
        h('div', {
          staticClass: 'q-actionsheet-title column justify-center'
        }, [ title ])
      );
    }

    child.push(
      h(
        'div',
        { staticClass: 'q-actionsheet-body scroll' },
        this.actions
          ? [
            this.grid
              ? h('div', { staticClass: 'q-actionsheet-grid row wrap items-center justify-between' }, this.__getActions(h))
              : h(QList, { staticClass: 'no-border', props: { link: true } }, this.__getActions(h))
          ]
          : [ this.$slots.default ]
      )
    );

    {
      child = [
        h('div', { staticClass: 'q-actionsheet' }, child),
        h('div', { staticClass: 'q-actionsheet' }, [
          h(QItem, {
            props: {
              link: true
            },
            attrs: {
              tabindex: 0
            },
            nativeOn: {
              click: this.__onCancel,
              keydown: this.__onCancel
            }
          }, [
            h(QItemMain, { staticClass: 'text-center text-primary' }, [
              this.dismissLabel || this.$q.i18n.label.cancel
            ])
          ])
        ])
      ];
    }

    return h(QModal, {
      ref: 'modal',
      props: {
        value: this.value,
        position: 'bottom',
        contentCss: this.contentCss
      },
      on: {
        input: function (val) {
          this$1.$emit('input', val);
        },
        show: function () {
          this$1.$emit('show');
        },
        hide: function () {
          this$1.$emit('hide');
        },
        dismiss: function () {
          this$1.__onCancel();
        },
        'escape-key': function () {
          this$1.hide().then(function () {
            this$1.$emit('escape-key');
            this$1.__onCancel();
          });
        }
      }
    }, child)
  },
  methods: {
    show: function show () {
      return this.$refs.modal.show()
    },
    hide: function hide () {
      return this.$refs.modal.hide()
    },
    __getActions: function __getActions (h) {
      var this$1 = this;

      return this.actions.map(function (action) { return action.label
        ? h(this$1.grid ? 'div' : QItem, {
          staticClass: this$1.grid
            ? 'q-actionsheet-grid-item cursor-pointer relative-position column inline flex-center'
            : null,
          'class': action.classes,
          attrs: {
            tabindex: 0
          },
          nativeOn: {
            click: function () { return this$1.__onOk(action); },
            keydown: function (e) { return this$1.__onOk(action); }
          }
        }, this$1.grid
          ? [
            action.icon ? h(QIcon, { props: { name: action.icon, color: action.color } }) : null,
            action.avatar ? h('img', { domProps: { src: action.avatar }, staticClass: 'avatar' }) : null,
            h('span', [ action.label ])
          ]
          : [
            h(QItemSide, { props: { icon: action.icon, color: action.color, avatar: action.avatar } }),
            h(QItemMain, { props: { inset: true, label: action.label } })
          ]
        )
        : h(QItemSeparator, { staticClass: 'col-12' }); }
      )
    },
    __onOk: function __onOk (action) {
      var this$1 = this;

      this.hide().then(function () {
        this$1.$emit('ok', action);
      });
    },
    __onCancel: function __onCancel () {
      var this$1 = this;

      this.hide().then(function () {
        this$1.$emit('cancel');
      });
    }
  }
}

var units = ['B', 'kB', 'MB', 'GB', 'TB', 'PB'];

function humanStorageSize (bytes) {
  var u = 0;

  while (Math.abs(bytes) >= 1024 && u < units.length - 1) {
    bytes /= 1024;
    ++u;
  }

  return ((bytes.toFixed(1)) + " " + (units[u]))
}

function capitalize$1 (str) {
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
	capitalize: capitalize$1,
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
    else if (p < 85) {
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

var QAjaxBar = {
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
      default: 'red'
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
    classes: function classes () {
      return [
        this.position,
        { 'no-trantion': this.animate }
      ]
    },
    innerClasses: function innerClasses () {
      return ("bg-" + (this.color))
    },
    style: function style () {
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
  },
  render: function render (h) {
    return h('div', {
      staticClass: 'q-loading-bar shadow-4',
      'class': this.classes,
      style: this.style
    }, [
      h('div', {
        staticClass: 'q-loading-bar-inner',
        'class': this.innerClasses
      })
    ])
  }
}

function getEvent (e) {
  return e || window.event
}

function rightClick (e) {
  e = getEvent(e);

  if (e.which) {
    return e.which === 3
  }
  if (e.button) {
    return e.button === 2
  }

  return false
}

function getEventKey (e) {
  e = getEvent(e);
  return e.which || e.keyCode
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
  else {
    var offset = targetElement(e).getBoundingClientRect();
    posx = ((offset.right - offset.left) / 2) + offset.left;
    posy = ((offset.bottom - offset.top) / 2) + offset.top;
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
    sX = 0, sY = 0, // spinX, spinY
    pX = 0, pY = 0; // pixelX, pixelY

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
    if (e.deltaMode === 1) { // delta in LINE units
      pX *= LINE_HEIGHT;
      pY *= LINE_HEIGHT;
    }
    else { // delta in PAGE units
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

function stopAndPrevent (e) {
  if (!e) {
    return
  }
  e.preventDefault();
  e.stopPropagation();
}


var event = Object.freeze({
	rightClick: rightClick,
	getEventKey: getEventKey,
	position: position,
	targetElement: targetElement,
	getMouseWheelDistance: getMouseWheelDistance,
	stopAndPrevent: stopAndPrevent
});

function showRipple (evt, el, stopPropagation) {
  if (stopPropagation) {
    evt.stopPropagation();
  }

  var
    container = document.createElement('span'),
    animNode = document.createElement('span');

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

  setTimeout(function () {
    animNode.classList.remove('q-ripple-animation-enter');
    css(animNode, cssTransform(("translate(-50%, -50%) translate(" + x + "px, " + y + "px)")));
    setTimeout(function () {
      animNode.classList.remove('q-ripple-animation-visible');
      setTimeout(function () {
        animNode.parentNode.remove();
      }, 300);
    }, 400);
  }, 25);
}

function shouldAbort (ref) {
  var mat = ref.mat;
  var ios = ref.ios;

  return (
    (mat && "ios" !== 'mat') ||
    (ios && "ios" !== 'ios')
  )
}

var Ripple = {
  name: 'ripple',
  inserted: function inserted (el, ref) {
    var value = ref.value;
    var modifiers = ref.modifiers;

    if (shouldAbort(modifiers)) {
      return
    }

    var ctx = {
      enabled: value !== false,
      click: function click (evt) {
        if (ctx.enabled) {
          showRipple(evt, el, modifiers.stop);
        }
      }
    };

    el.__qripple = ctx;
    el.addEventListener('click', ctx.click, false);
  },
  update: function update (el, ref) {
    var value = ref.value;
    var oldValue = ref.oldValue;

    if (el.__qripple && value !== oldValue) {
      el.__qripple.enabled = value !== false;
    }
  },
  unbind: function unbind (el, ref) {
    var modifiers = ref.modifiers;

    if (shouldAbort(modifiers)) {
      return
    }

    var ctx = el.__qripple;
    el.removeEventListener('click', ctx.click, false);
    delete el.__qripple;
  }
}

var sizes = {
  xs: 8, sm: 10, md: 14, lg: 20, xl: 24
};

var BtnMixin = {
  components: {
    QIcon: QIcon
  },
  directives: {
    Ripple: Ripple
  },
  props: {
    disable: Boolean,
    label: [Number, String],
    noCaps: Boolean,
    noWrap: Boolean,
    icon: String,
    iconRight: String,
    round: Boolean,
    outline: Boolean,
    flat: Boolean,
    rounded: Boolean,
    push: Boolean,
    size: String,
    fab: Boolean,
    fabMini: Boolean,
    color: String,
    textColor: String,
    glossy: Boolean,
    dense: Boolean,
    noRipple: Boolean,
    justify: {
      type: String,
      default: 'center',
      validator: function (v) { return ['start', 'end', 'center', 'between', 'around'].includes(v); }
    }
  },
  computed: {
    style: function style () {
      if (this.size && !this.fab && !this.fabMini) {
        return {
          fontSize: this.size in sizes ? ((sizes[this.size]) + "px") : this.size
        }
      }
    },
    isRectangle: function isRectangle () {
      return !this.isRound
    },
    isRound: function isRound () {
      return this.round || this.fab || this.fabMini
    },
    shape: function shape () {
      return ("q-btn-" + (this.isRound ? 'round' : 'rectangle'))
    },
    isDisabled: function isDisabled () {
      return this.disable || this.loading
    },
    hasRipple: function hasRipple () {
      return "ios" === 'mat' && !this.noRipple && !this.isDisabled
    },
    classes: function classes () {
      var
        cls = [ this.shape ],
        color = this.toggled ? this.toggleColor : this.color;

      if (this.fab) {
        cls.push('q-btn-fab');
      }
      else if (this.fabMini) {
        cls.push('q-btn-fab-mini');
      }

      if (this.flat) {
        cls.push('q-btn-flat');
      }
      else if (this.outline) {
        cls.push('q-btn-outline');
      }
      else if (this.push) {
        cls.push('q-btn-push');
      }

      if (this.isDisabled) {
        cls.push('disabled');
      }
      else {
        cls.push('q-focusable q-hoverable');
      }

      if (color) {
        if (this.flat || this.outline) {
          cls.push(("text-" + (this.textColor || color)));
        }
        else {
          cls.push(("bg-" + color));
          cls.push(("text-" + (this.textColor || 'white')));
        }
      }

      cls.push({
        'q-btn-no-uppercase': this.noCaps,
        'q-btn-rounded': this.rounded,
        'q-btn-dense': this.dense,
        'q-btn-toggle-active': this.toggled,
        'glossy': this.glossy
      });

      return cls
    },
    innerClasses: function innerClasses () {
      var classes = [("justify-" + (this.justify))];
      if (this.noWrap) {
        classes.push('no-wrap', 'text-no-wrap');
      }
      return classes
    }
  },
  methods: {
    removeFocus: function removeFocus (e) {
      // if is touch enabled and focus was received from pointer
      if (this.$q.platform.has.touch && e.detail) {
        this.$el.blur();
      }
    }
  }
}

var mixin = {
  props: {
    color: String,
    size: {
      type: [Number, String],
      default: '1em'
    }
  },
  computed: {
    classes: function classes () {
      if (this.color) {
        return ("text-" + (this.color))
      }
    }
  }
}

var DefaultSpinner = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"q-spinner",class:_vm.classes,attrs:{"width":_vm.size,"height":_vm.size,"stroke":"currentColor","fill":"currentColor","viewBox":"0 0 64 64"}},[_c('g',{attrs:{"stroke-width":"4","stroke-linecap":"round"}},[_c('line',{attrs:{"y1":"17","y2":"29","transform":"translate(32,32) rotate(180)"}},[_c('animate',{attrs:{"attributeName":"stroke-opacity","dur":"750ms","values":"1;.85;.7;.65;.55;.45;.35;.25;.15;.1;0;1","repeatCount":"indefinite"}})]),_c('line',{attrs:{"y1":"17","y2":"29","transform":"translate(32,32) rotate(210)"}},[_c('animate',{attrs:{"attributeName":"stroke-opacity","dur":"750ms","values":"0;1;.85;.7;.65;.55;.45;.35;.25;.15;.1;0","repeatCount":"indefinite"}})]),_c('line',{attrs:{"y1":"17","y2":"29","transform":"translate(32,32) rotate(240)"}},[_c('animate',{attrs:{"attributeName":"stroke-opacity","dur":"750ms","values":".1;0;1;.85;.7;.65;.55;.45;.35;.25;.15;.1","repeatCount":"indefinite"}})]),_c('line',{attrs:{"y1":"17","y2":"29","transform":"translate(32,32) rotate(270)"}},[_c('animate',{attrs:{"attributeName":"stroke-opacity","dur":"750ms","values":".15;.1;0;1;.85;.7;.65;.55;.45;.35;.25;.15","repeatCount":"indefinite"}})]),_c('line',{attrs:{"y1":"17","y2":"29","transform":"translate(32,32) rotate(300)"}},[_c('animate',{attrs:{"attributeName":"stroke-opacity","dur":"750ms","values":".25;.15;.1;0;1;.85;.7;.65;.55;.45;.35;.25","repeatCount":"indefinite"}})]),_c('line',{attrs:{"y1":"17","y2":"29","transform":"translate(32,32) rotate(330)"}},[_c('animate',{attrs:{"attributeName":"stroke-opacity","dur":"750ms","values":".35;.25;.15;.1;0;1;.85;.7;.65;.55;.45;.35","repeatCount":"indefinite"}})]),_c('line',{attrs:{"y1":"17","y2":"29","transform":"translate(32,32) rotate(0)"}},[_c('animate',{attrs:{"attributeName":"stroke-opacity","dur":"750ms","values":".45;.35;.25;.15;.1;0;1;.85;.7;.65;.55;.45","repeatCount":"indefinite"}})]),_c('line',{attrs:{"y1":"17","y2":"29","transform":"translate(32,32) rotate(30)"}},[_c('animate',{attrs:{"attributeName":"stroke-opacity","dur":"750ms","values":".55;.45;.35;.25;.15;.1;0;1;.85;.7;.65;.55","repeatCount":"indefinite"}})]),_c('line',{attrs:{"y1":"17","y2":"29","transform":"translate(32,32) rotate(60)"}},[_c('animate',{attrs:{"attributeName":"stroke-opacity","dur":"750ms","values":".65;.55;.45;.35;.25;.15;.1;0;1;.85;.7;.65","repeatCount":"indefinite"}})]),_c('line',{attrs:{"y1":"17","y2":"29","transform":"translate(32,32) rotate(90)"}},[_c('animate',{attrs:{"attributeName":"stroke-opacity","dur":"750ms","values":".7;.65;.55;.45;.35;.25;.15;.1;0;1;.85;.7","repeatCount":"indefinite"}})]),_c('line',{attrs:{"y1":"17","y2":"29","transform":"translate(32,32) rotate(120)"}},[_c('animate',{attrs:{"attributeName":"stroke-opacity","dur":"750ms","values":".85;.7;.65;.55;.45;.35;.25;.15;.1;0;1;.85","repeatCount":"indefinite"}})]),_c('line',{attrs:{"y1":"17","y2":"29","transform":"translate(32,32) rotate(150)"}},[_c('animate',{attrs:{"attributeName":"stroke-opacity","dur":"750ms","values":"1;.85;.7;.65;.55;.45;.35;.25;.15;.1;0;1","repeatCount":"indefinite"}})])])])},staticRenderFns: [],
  name: 'q-spinner-ios',
  mixins: [mixin]
}

var audio = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"q-spinner",class:_vm.classes,attrs:{"fill":"currentColor","width":_vm.size,"height":_vm.size,"viewBox":"0 0 55 80","xmlns":"http://www.w3.org/2000/svg"}},[_c('g',{attrs:{"transform":"matrix(1 0 0 -1 0 80)"}},[_c('rect',{attrs:{"width":"10","height":"20","rx":"3"}},[_c('animate',{attrs:{"attributeName":"height","begin":"0s","dur":"4.3s","values":"20;45;57;80;64;32;66;45;64;23;66;13;64;56;34;34;2;23;76;79;20","calcMode":"linear","repeatCount":"indefinite"}})]),_c('rect',{attrs:{"x":"15","width":"10","height":"80","rx":"3"}},[_c('animate',{attrs:{"attributeName":"height","begin":"0s","dur":"2s","values":"80;55;33;5;75;23;73;33;12;14;60;80","calcMode":"linear","repeatCount":"indefinite"}})]),_c('rect',{attrs:{"x":"30","width":"10","height":"50","rx":"3"}},[_c('animate',{attrs:{"attributeName":"height","begin":"0s","dur":"1.4s","values":"50;34;78;23;56;23;34;76;80;54;21;50","calcMode":"linear","repeatCount":"indefinite"}})]),_c('rect',{attrs:{"x":"45","width":"10","height":"30","rx":"3"}},[_c('animate',{attrs:{"attributeName":"height","begin":"0s","dur":"2s","values":"30;45;13;80;56;72;45;76;34;23;67;30","calcMode":"linear","repeatCount":"indefinite"}})])])])},staticRenderFns: [],
  name: 'q-spinner-audio',
  mixins: [mixin]
}

var ball = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"q-spinner",class:_vm.classes,attrs:{"stroke":"currentColor","width":_vm.size,"height":_vm.size,"viewBox":"0 0 57 57","xmlns":"http://www.w3.org/2000/svg"}},[_c('g',{attrs:{"transform":"translate(1 1)","stroke-width":"2","fill":"none","fill-rule":"evenodd"}},[_c('circle',{attrs:{"cx":"5","cy":"50","r":"5"}},[_c('animate',{attrs:{"attributeName":"cy","begin":"0s","dur":"2.2s","values":"50;5;50;50","calcMode":"linear","repeatCount":"indefinite"}}),_c('animate',{attrs:{"attributeName":"cx","begin":"0s","dur":"2.2s","values":"5;27;49;5","calcMode":"linear","repeatCount":"indefinite"}})]),_c('circle',{attrs:{"cx":"27","cy":"5","r":"5"}},[_c('animate',{attrs:{"attributeName":"cy","begin":"0s","dur":"2.2s","from":"5","to":"5","values":"5;50;50;5","calcMode":"linear","repeatCount":"indefinite"}}),_c('animate',{attrs:{"attributeName":"cx","begin":"0s","dur":"2.2s","from":"27","to":"27","values":"27;49;5;27","calcMode":"linear","repeatCount":"indefinite"}})]),_c('circle',{attrs:{"cx":"49","cy":"50","r":"5"}},[_c('animate',{attrs:{"attributeName":"cy","begin":"0s","dur":"2.2s","values":"50;50;5;50","calcMode":"linear","repeatCount":"indefinite"}}),_c('animate',{attrs:{"attributeName":"cx","from":"49","to":"49","begin":"0s","dur":"2.2s","values":"49;5;27;49","calcMode":"linear","repeatCount":"indefinite"}})])])])},staticRenderFns: [],
  name: 'q-spinner-ball',
  mixins: [mixin]
}

var bars = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"q-spinner",class:_vm.classes,attrs:{"fill":"currentColor","width":_vm.size,"height":_vm.size,"viewBox":"0 0 135 140","xmlns":"http://www.w3.org/2000/svg"}},[_c('rect',{attrs:{"y":"10","width":"15","height":"120","rx":"6"}},[_c('animate',{attrs:{"attributeName":"height","begin":"0.5s","dur":"1s","values":"120;110;100;90;80;70;60;50;40;140;120","calcMode":"linear","repeatCount":"indefinite"}}),_c('animate',{attrs:{"attributeName":"y","begin":"0.5s","dur":"1s","values":"10;15;20;25;30;35;40;45;50;0;10","calcMode":"linear","repeatCount":"indefinite"}})]),_c('rect',{attrs:{"x":"30","y":"10","width":"15","height":"120","rx":"6"}},[_c('animate',{attrs:{"attributeName":"height","begin":"0.25s","dur":"1s","values":"120;110;100;90;80;70;60;50;40;140;120","calcMode":"linear","repeatCount":"indefinite"}}),_c('animate',{attrs:{"attributeName":"y","begin":"0.25s","dur":"1s","values":"10;15;20;25;30;35;40;45;50;0;10","calcMode":"linear","repeatCount":"indefinite"}})]),_c('rect',{attrs:{"x":"60","width":"15","height":"140","rx":"6"}},[_c('animate',{attrs:{"attributeName":"height","begin":"0s","dur":"1s","values":"120;110;100;90;80;70;60;50;40;140;120","calcMode":"linear","repeatCount":"indefinite"}}),_c('animate',{attrs:{"attributeName":"y","begin":"0s","dur":"1s","values":"10;15;20;25;30;35;40;45;50;0;10","calcMode":"linear","repeatCount":"indefinite"}})]),_c('rect',{attrs:{"x":"90","y":"10","width":"15","height":"120","rx":"6"}},[_c('animate',{attrs:{"attributeName":"height","begin":"0.25s","dur":"1s","values":"120;110;100;90;80;70;60;50;40;140;120","calcMode":"linear","repeatCount":"indefinite"}}),_c('animate',{attrs:{"attributeName":"y","begin":"0.25s","dur":"1s","values":"10;15;20;25;30;35;40;45;50;0;10","calcMode":"linear","repeatCount":"indefinite"}})]),_c('rect',{attrs:{"x":"120","y":"10","width":"15","height":"120","rx":"6"}},[_c('animate',{attrs:{"attributeName":"height","begin":"0.5s","dur":"1s","values":"120;110;100;90;80;70;60;50;40;140;120","calcMode":"linear","repeatCount":"indefinite"}}),_c('animate',{attrs:{"attributeName":"y","begin":"0.5s","dur":"1s","values":"10;15;20;25;30;35;40;45;50;0;10","calcMode":"linear","repeatCount":"indefinite"}})])])},staticRenderFns: [],
  name: 'q-spinner-bars',
  mixins: [mixin]
}

var circles = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"q-spinner",class:_vm.classes,attrs:{"fill":"currentColor","width":_vm.size,"height":_vm.size,"viewBox":"0 0 135 135","xmlns":"http://www.w3.org/2000/svg"}},[_c('path',{attrs:{"d":"M67.447 58c5.523 0 10-4.477 10-10s-4.477-10-10-10-10 4.477-10 10 4.477 10 10 10zm9.448 9.447c0 5.523 4.477 10 10 10 5.522 0 10-4.477 10-10s-4.478-10-10-10c-5.523 0-10 4.477-10 10zm-9.448 9.448c-5.523 0-10 4.477-10 10 0 5.522 4.477 10 10 10s10-4.478 10-10c0-5.523-4.477-10-10-10zM58 67.447c0-5.523-4.477-10-10-10s-10 4.477-10 10 4.477 10 10 10 10-4.477 10-10z"}},[_c('animateTransform',{attrs:{"attributeName":"transform","type":"rotate","from":"0 67 67","to":"-360 67 67","dur":"2.5s","repeatCount":"indefinite"}})],1),_c('path',{attrs:{"d":"M28.19 40.31c6.627 0 12-5.374 12-12 0-6.628-5.373-12-12-12-6.628 0-12 5.372-12 12 0 6.626 5.372 12 12 12zm30.72-19.825c4.686 4.687 12.284 4.687 16.97 0 4.686-4.686 4.686-12.284 0-16.97-4.686-4.687-12.284-4.687-16.97 0-4.687 4.686-4.687 12.284 0 16.97zm35.74 7.705c0 6.627 5.37 12 12 12 6.626 0 12-5.373 12-12 0-6.628-5.374-12-12-12-6.63 0-12 5.372-12 12zm19.822 30.72c-4.686 4.686-4.686 12.284 0 16.97 4.687 4.686 12.285 4.686 16.97 0 4.687-4.686 4.687-12.284 0-16.97-4.685-4.687-12.283-4.687-16.97 0zm-7.704 35.74c-6.627 0-12 5.37-12 12 0 6.626 5.373 12 12 12s12-5.374 12-12c0-6.63-5.373-12-12-12zm-30.72 19.822c-4.686-4.686-12.284-4.686-16.97 0-4.686 4.687-4.686 12.285 0 16.97 4.686 4.687 12.284 4.687 16.97 0 4.687-4.685 4.687-12.283 0-16.97zm-35.74-7.704c0-6.627-5.372-12-12-12-6.626 0-12 5.373-12 12s5.374 12 12 12c6.628 0 12-5.373 12-12zm-19.823-30.72c4.687-4.686 4.687-12.284 0-16.97-4.686-4.686-12.284-4.686-16.97 0-4.687 4.686-4.687 12.284 0 16.97 4.686 4.687 12.284 4.687 16.97 0z"}},[_c('animateTransform',{attrs:{"attributeName":"transform","type":"rotate","from":"0 67 67","to":"360 67 67","dur":"8s","repeatCount":"indefinite"}})],1)])},staticRenderFns: [],
  name: 'q-spinner-circles',
  mixins: [mixin]
}

var comment = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"q-spinner",class:_vm.classes,attrs:{"width":_vm.size,"height":_vm.size,"xmlns":"http://www.w3.org/2000/svg","viewBox":"0 0 100 100","preserveAspectRatio":"xMidYMid"}},[_c('rect',{attrs:{"x":"0","y":"0","width":"100","height":"100","fill":"none"}}),_c('path',{attrs:{"d":"M78,19H22c-6.6,0-12,5.4-12,12v31c0,6.6,5.4,12,12,12h37.2c0.4,3,1.8,5.6,3.7,7.6c2.4,2.5,5.1,4.1,9.1,4 c-1.4-2.1-2-7.2-2-10.3c0-0.4,0-0.8,0-1.3h8c6.6,0,12-5.4,12-12V31C90,24.4,84.6,19,78,19z","fill":"currentColor"}}),_c('circle',{attrs:{"cx":"30","cy":"47","r":"5","fill":"#fff"}},[_c('animate',{attrs:{"attributeName":"opacity","from":"0","to":"1","values":"0;1;1","keyTimes":"0;0.2;1","dur":"1s","repeatCount":"indefinite"}})]),_c('circle',{attrs:{"cx":"50","cy":"47","r":"5","fill":"#fff"}},[_c('animate',{attrs:{"attributeName":"opacity","from":"0","to":"1","values":"0;0;1;1","keyTimes":"0;0.2;0.4;1","dur":"1s","repeatCount":"indefinite"}})]),_c('circle',{attrs:{"cx":"70","cy":"47","r":"5","fill":"#fff"}},[_c('animate',{attrs:{"attributeName":"opacity","from":"0","to":"1","values":"0;0;1;1","keyTimes":"0;0.4;0.6;1","dur":"1s","repeatCount":"indefinite"}})])])},staticRenderFns: [],
  name: 'q-spinner-comment',
  mixins: [mixin]
}

var cube = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"q-spinner",class:_vm.classes,attrs:{"width":_vm.size,"height":_vm.size,"xmlns":"http://www.w3.org/2000/svg","viewBox":"0 0 100 100","preserveAspectRatio":"xMidYMid"}},[_c('rect',{attrs:{"x":"0","y":"0","width":"100","height":"100","fill":"none"}}),_c('g',{attrs:{"transform":"translate(25 25)"}},[_c('rect',{attrs:{"x":"-20","y":"-20","width":"40","height":"40","fill":"currentColor","opacity":"0.9"}},[_c('animateTransform',{attrs:{"attributeName":"transform","type":"scale","from":"1.5","to":"1","repeatCount":"indefinite","begin":"0s","dur":"1s","calcMode":"spline","keySplines":"0.2 0.8 0.2 0.8","keyTimes":"0;1"}})],1)]),_c('g',{attrs:{"transform":"translate(75 25)"}},[_c('rect',{attrs:{"x":"-20","y":"-20","width":"40","height":"40","fill":"currentColor","opacity":"0.8"}},[_c('animateTransform',{attrs:{"attributeName":"transform","type":"scale","from":"1.5","to":"1","repeatCount":"indefinite","begin":"0.1s","dur":"1s","calcMode":"spline","keySplines":"0.2 0.8 0.2 0.8","keyTimes":"0;1"}})],1)]),_c('g',{attrs:{"transform":"translate(25 75)"}},[_c('rect',{staticClass:"cube",attrs:{"x":"-20","y":"-20","width":"40","height":"40","fill":"currentColor","opacity":"0.7"}},[_c('animateTransform',{attrs:{"attributeName":"transform","type":"scale","from":"1.5","to":"1","repeatCount":"indefinite","begin":"0.3s","dur":"1s","calcMode":"spline","keySplines":"0.2 0.8 0.2 0.8","keyTimes":"0;1"}})],1)]),_c('g',{attrs:{"transform":"translate(75 75)"}},[_c('rect',{staticClass:"cube",attrs:{"x":"-20","y":"-20","width":"40","height":"40","fill":"currentColor","opacity":"0.6"}},[_c('animateTransform',{attrs:{"attributeName":"transform","type":"scale","from":"1.5","to":"1","repeatCount":"indefinite","begin":"0.2s","dur":"1s","calcMode":"spline","keySplines":"0.2 0.8 0.2 0.8","keyTimes":"0;1"}})],1)])])},staticRenderFns: [],
  name: 'q-spinner-cube',
  mixins: [mixin]
}

var dots = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"q-spinner",class:_vm.classes,attrs:{"fill":"currentColor","width":_vm.size,"height":_vm.size,"viewBox":"0 0 120 30","xmlns":"http://www.w3.org/2000/svg"}},[_c('circle',{attrs:{"cx":"15","cy":"15","r":"15"}},[_c('animate',{attrs:{"attributeName":"r","from":"15","to":"15","begin":"0s","dur":"0.8s","values":"15;9;15","calcMode":"linear","repeatCount":"indefinite"}}),_c('animate',{attrs:{"attributeName":"fill-opacity","from":"1","to":"1","begin":"0s","dur":"0.8s","values":"1;.5;1","calcMode":"linear","repeatCount":"indefinite"}})]),_c('circle',{attrs:{"cx":"60","cy":"15","r":"9","fill-opacity":".3"}},[_c('animate',{attrs:{"attributeName":"r","from":"9","to":"9","begin":"0s","dur":"0.8s","values":"9;15;9","calcMode":"linear","repeatCount":"indefinite"}}),_c('animate',{attrs:{"attributeName":"fill-opacity","from":".5","to":".5","begin":"0s","dur":"0.8s","values":".5;1;.5","calcMode":"linear","repeatCount":"indefinite"}})]),_c('circle',{attrs:{"cx":"105","cy":"15","r":"15"}},[_c('animate',{attrs:{"attributeName":"r","from":"15","to":"15","begin":"0s","dur":"0.8s","values":"15;9;15","calcMode":"linear","repeatCount":"indefinite"}}),_c('animate',{attrs:{"attributeName":"fill-opacity","from":"1","to":"1","begin":"0s","dur":"0.8s","values":"1;.5;1","calcMode":"linear","repeatCount":"indefinite"}})])])},staticRenderFns: [],
  name: 'q-spinner-dots',
  mixins: [mixin]
}

var facebook = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"q-spinner",class:_vm.classes,attrs:{"width":_vm.size,"height":_vm.size,"viewBox":"0 0 100 100","xmlns":"http://www.w3.org/2000/svg","preserveAspectRatio":"xMidYMid"}},[_c('g',{attrs:{"transform":"translate(20 50)"}},[_c('rect',{attrs:{"x":"-10","y":"-30","width":"20","height":"60","fill":"currentColor","opacity":"0.6"}},[_c('animateTransform',{attrs:{"attributeName":"transform","type":"scale","from":"2","to":"1","begin":"0s","repeatCount":"indefinite","dur":"1s","calcMode":"spline","keySplines":"0.1 0.9 0.4 1","keyTimes":"0;1","values":"2;1"}})],1)]),_c('g',{attrs:{"transform":"translate(50 50)"}},[_c('rect',{attrs:{"x":"-10","y":"-30","width":"20","height":"60","fill":"currentColor","opacity":"0.8"}},[_c('animateTransform',{attrs:{"attributeName":"transform","type":"scale","from":"2","to":"1","begin":"0.1s","repeatCount":"indefinite","dur":"1s","calcMode":"spline","keySplines":"0.1 0.9 0.4 1","keyTimes":"0;1","values":"2;1"}})],1)]),_c('g',{attrs:{"transform":"translate(80 50)"}},[_c('rect',{attrs:{"x":"-10","y":"-30","width":"20","height":"60","fill":"currentColor","opacity":"0.9"}},[_c('animateTransform',{attrs:{"attributeName":"transform","type":"scale","from":"2","to":"1","begin":"0.2s","repeatCount":"indefinite","dur":"1s","calcMode":"spline","keySplines":"0.1 0.9 0.4 1","keyTimes":"0;1","values":"2;1"}})],1)])])},staticRenderFns: [],
  name: 'q-spinner-facebook',
  mixins: [mixin]
}

var gears = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"q-spinner",class:_vm.classes,attrs:{"width":_vm.size,"height":_vm.size,"viewBox":"0 0 100 100","preserveAspectRatio":"xMidYMid","xmlns":"http://www.w3.org/2000/svg"}},[_c('g',{attrs:{"transform":"translate(-20,-20)"}},[_c('path',{attrs:{"d":"M79.9,52.6C80,51.8,80,50.9,80,50s0-1.8-0.1-2.6l-5.1-0.4c-0.3-2.4-0.9-4.6-1.8-6.7l4.2-2.9c-0.7-1.6-1.6-3.1-2.6-4.5 L70,35c-1.4-1.9-3.1-3.5-4.9-4.9l2.2-4.6c-1.4-1-2.9-1.9-4.5-2.6L59.8,27c-2.1-0.9-4.4-1.5-6.7-1.8l-0.4-5.1C51.8,20,50.9,20,50,20 s-1.8,0-2.6,0.1l-0.4,5.1c-2.4,0.3-4.6,0.9-6.7,1.8l-2.9-4.1c-1.6,0.7-3.1,1.6-4.5,2.6l2.1,4.6c-1.9,1.4-3.5,3.1-5,4.9l-4.5-2.1 c-1,1.4-1.9,2.9-2.6,4.5l4.1,2.9c-0.9,2.1-1.5,4.4-1.8,6.8l-5,0.4C20,48.2,20,49.1,20,50s0,1.8,0.1,2.6l5,0.4 c0.3,2.4,0.9,4.7,1.8,6.8l-4.1,2.9c0.7,1.6,1.6,3.1,2.6,4.5l4.5-2.1c1.4,1.9,3.1,3.5,5,4.9l-2.1,4.6c1.4,1,2.9,1.9,4.5,2.6l2.9-4.1 c2.1,0.9,4.4,1.5,6.7,1.8l0.4,5.1C48.2,80,49.1,80,50,80s1.8,0,2.6-0.1l0.4-5.1c2.3-0.3,4.6-0.9,6.7-1.8l2.9,4.2 c1.6-0.7,3.1-1.6,4.5-2.6L65,69.9c1.9-1.4,3.5-3,4.9-4.9l4.6,2.2c1-1.4,1.9-2.9,2.6-4.5L73,59.8c0.9-2.1,1.5-4.4,1.8-6.7L79.9,52.6 z M50,65c-8.3,0-15-6.7-15-15c0-8.3,6.7-15,15-15s15,6.7,15,15C65,58.3,58.3,65,50,65z","fill":"currentColor"}},[_c('animateTransform',{attrs:{"attributeName":"transform","type":"rotate","from":"90 50 50","to":"0 50 50","dur":"1s","repeatCount":"indefinite"}})],1)]),_c('g',{attrs:{"transform":"translate(20,20) rotate(15 50 50)"}},[_c('path',{attrs:{"d":"M79.9,52.6C80,51.8,80,50.9,80,50s0-1.8-0.1-2.6l-5.1-0.4c-0.3-2.4-0.9-4.6-1.8-6.7l4.2-2.9c-0.7-1.6-1.6-3.1-2.6-4.5 L70,35c-1.4-1.9-3.1-3.5-4.9-4.9l2.2-4.6c-1.4-1-2.9-1.9-4.5-2.6L59.8,27c-2.1-0.9-4.4-1.5-6.7-1.8l-0.4-5.1C51.8,20,50.9,20,50,20 s-1.8,0-2.6,0.1l-0.4,5.1c-2.4,0.3-4.6,0.9-6.7,1.8l-2.9-4.1c-1.6,0.7-3.1,1.6-4.5,2.6l2.1,4.6c-1.9,1.4-3.5,3.1-5,4.9l-4.5-2.1 c-1,1.4-1.9,2.9-2.6,4.5l4.1,2.9c-0.9,2.1-1.5,4.4-1.8,6.8l-5,0.4C20,48.2,20,49.1,20,50s0,1.8,0.1,2.6l5,0.4 c0.3,2.4,0.9,4.7,1.8,6.8l-4.1,2.9c0.7,1.6,1.6,3.1,2.6,4.5l4.5-2.1c1.4,1.9,3.1,3.5,5,4.9l-2.1,4.6c1.4,1,2.9,1.9,4.5,2.6l2.9-4.1 c2.1,0.9,4.4,1.5,6.7,1.8l0.4,5.1C48.2,80,49.1,80,50,80s1.8,0,2.6-0.1l0.4-5.1c2.3-0.3,4.6-0.9,6.7-1.8l2.9,4.2 c1.6-0.7,3.1-1.6,4.5-2.6L65,69.9c1.9-1.4,3.5-3,4.9-4.9l4.6,2.2c1-1.4,1.9-2.9,2.6-4.5L73,59.8c0.9-2.1,1.5-4.4,1.8-6.7L79.9,52.6 z M50,65c-8.3,0-15-6.7-15-15c0-8.3,6.7-15,15-15s15,6.7,15,15C65,58.3,58.3,65,50,65z","fill":"currentColor"}},[_c('animateTransform',{attrs:{"attributeName":"transform","type":"rotate","from":"0 50 50","to":"90 50 50","dur":"1s","repeatCount":"indefinite"}})],1)])])},staticRenderFns: [],
  name: 'q-spinner-gears',
  mixins: [mixin]
}

var grid = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"q-spinner",class:_vm.classes,attrs:{"fill":"currentColor","width":_vm.size,"height":_vm.size,"viewBox":"0 0 105 105","xmlns":"http://www.w3.org/2000/svg"}},[_c('circle',{attrs:{"cx":"12.5","cy":"12.5","r":"12.5"}},[_c('animate',{attrs:{"attributeName":"fill-opacity","begin":"0s","dur":"1s","values":"1;.2;1","calcMode":"linear","repeatCount":"indefinite"}})]),_c('circle',{attrs:{"cx":"12.5","cy":"52.5","r":"12.5","fill-opacity":".5"}},[_c('animate',{attrs:{"attributeName":"fill-opacity","begin":"100ms","dur":"1s","values":"1;.2;1","calcMode":"linear","repeatCount":"indefinite"}})]),_c('circle',{attrs:{"cx":"52.5","cy":"12.5","r":"12.5"}},[_c('animate',{attrs:{"attributeName":"fill-opacity","begin":"300ms","dur":"1s","values":"1;.2;1","calcMode":"linear","repeatCount":"indefinite"}})]),_c('circle',{attrs:{"cx":"52.5","cy":"52.5","r":"12.5"}},[_c('animate',{attrs:{"attributeName":"fill-opacity","begin":"600ms","dur":"1s","values":"1;.2;1","calcMode":"linear","repeatCount":"indefinite"}})]),_c('circle',{attrs:{"cx":"92.5","cy":"12.5","r":"12.5"}},[_c('animate',{attrs:{"attributeName":"fill-opacity","begin":"800ms","dur":"1s","values":"1;.2;1","calcMode":"linear","repeatCount":"indefinite"}})]),_c('circle',{attrs:{"cx":"92.5","cy":"52.5","r":"12.5"}},[_c('animate',{attrs:{"attributeName":"fill-opacity","begin":"400ms","dur":"1s","values":"1;.2;1","calcMode":"linear","repeatCount":"indefinite"}})]),_c('circle',{attrs:{"cx":"12.5","cy":"92.5","r":"12.5"}},[_c('animate',{attrs:{"attributeName":"fill-opacity","begin":"700ms","dur":"1s","values":"1;.2;1","calcMode":"linear","repeatCount":"indefinite"}})]),_c('circle',{attrs:{"cx":"52.5","cy":"92.5","r":"12.5"}},[_c('animate',{attrs:{"attributeName":"fill-opacity","begin":"500ms","dur":"1s","values":"1;.2;1","calcMode":"linear","repeatCount":"indefinite"}})]),_c('circle',{attrs:{"cx":"92.5","cy":"92.5","r":"12.5"}},[_c('animate',{attrs:{"attributeName":"fill-opacity","begin":"200ms","dur":"1s","values":"1;.2;1","calcMode":"linear","repeatCount":"indefinite"}})])])},staticRenderFns: [],
  name: 'q-spinner-grid',
  mixins: [mixin]
}

var hearts = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"q-spinner",class:_vm.classes,attrs:{"fill":"currentColor","width":_vm.size,"height":_vm.size,"viewBox":"0 0 140 64","xmlns":"http://www.w3.org/2000/svg"}},[_c('path',{attrs:{"d":"M30.262 57.02L7.195 40.723c-5.84-3.976-7.56-12.06-3.842-18.063 3.715-6 11.467-7.65 17.306-3.68l4.52 3.76 2.6-5.274c3.716-6.002 11.47-7.65 17.304-3.68 5.84 3.97 7.56 12.054 3.842 18.062L34.49 56.118c-.897 1.512-2.793 1.915-4.228.9z","fill-opacity":".5"}},[_c('animate',{attrs:{"attributeName":"fill-opacity","begin":"0s","dur":"1.4s","values":"0.5;1;0.5","calcMode":"linear","repeatCount":"indefinite"}})]),_c('path',{attrs:{"d":"M105.512 56.12l-14.44-24.272c-3.716-6.008-1.996-14.093 3.843-18.062 5.835-3.97 13.588-2.322 17.306 3.68l2.6 5.274 4.52-3.76c5.84-3.97 13.593-2.32 17.308 3.68 3.718 6.003 1.998 14.088-3.842 18.064L109.74 57.02c-1.434 1.014-3.33.61-4.228-.9z","fill-opacity":".5"}},[_c('animate',{attrs:{"attributeName":"fill-opacity","begin":"0.7s","dur":"1.4s","values":"0.5;1;0.5","calcMode":"linear","repeatCount":"indefinite"}})]),_c('path',{attrs:{"d":"M67.408 57.834l-23.01-24.98c-5.864-6.15-5.864-16.108 0-22.248 5.86-6.14 15.37-6.14 21.234 0L70 16.168l4.368-5.562c5.863-6.14 15.375-6.14 21.235 0 5.863 6.14 5.863 16.098 0 22.247l-23.007 24.98c-1.43 1.556-3.757 1.556-5.188 0z"}})])},staticRenderFns: [],
  name: 'q-spinner-hearts',
  mixins: [mixin]
}

var hourglass = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"q-spinner",class:_vm.classes,attrs:{"width":_vm.size,"height":_vm.size,"viewBox":"0 0 100 100","preserveAspectRatio":"xMidYMid","xmlns":"http://www.w3.org/2000/svg"}},[_c('g',[_c('path',{staticClass:"glass",attrs:{"fill":"none","stroke":"currentColor","stroke-width":"5","stroke-miterlimit":"10","d":"M58.4,51.7c-0.9-0.9-1.4-2-1.4-2.3s0.5-0.4,1.4-1.4 C70.8,43.8,79.8,30.5,80,15.5H70H30H20c0.2,15,9.2,28.1,21.6,32.3c0.9,0.9,1.4,1.2,1.4,1.5s-0.5,1.6-1.4,2.5 C29.2,56.1,20.2,69.5,20,85.5h10h40h10C79.8,69.5,70.8,55.9,58.4,51.7z"}}),_c('clipPath',{attrs:{"id":"uil-hourglass-clip1"}},[_c('rect',{staticClass:"clip",attrs:{"x":"15","y":"20","width":"70","height":"25"}},[_c('animate',{attrs:{"attributeName":"height","from":"25","to":"0","dur":"1s","repeatCount":"indefinite","vlaues":"25;0;0","keyTimes":"0;0.5;1"}}),_c('animate',{attrs:{"attributeName":"y","from":"20","to":"45","dur":"1s","repeatCount":"indefinite","vlaues":"20;45;45","keyTimes":"0;0.5;1"}})])]),_c('clipPath',{attrs:{"id":"uil-hourglass-clip2"}},[_c('rect',{staticClass:"clip",attrs:{"x":"15","y":"55","width":"70","height":"25"}},[_c('animate',{attrs:{"attributeName":"height","from":"0","to":"25","dur":"1s","repeatCount":"indefinite","vlaues":"0;25;25","keyTimes":"0;0.5;1"}}),_c('animate',{attrs:{"attributeName":"y","from":"80","to":"55","dur":"1s","repeatCount":"indefinite","vlaues":"80;55;55","keyTimes":"0;0.5;1"}})])]),_c('path',{staticClass:"sand",attrs:{"d":"M29,23c3.1,11.4,11.3,19.5,21,19.5S67.9,34.4,71,23H29z","clip-path":"url(#uil-hourglass-clip1)","fill":"currentColor"}}),_c('path',{staticClass:"sand",attrs:{"d":"M71.6,78c-3-11.6-11.5-20-21.5-20s-18.5,8.4-21.5,20H71.6z","clip-path":"url(#uil-hourglass-clip2)","fill":"currentColor"}}),_c('animateTransform',{attrs:{"attributeName":"transform","type":"rotate","from":"0 50 50","to":"180 50 50","repeatCount":"indefinite","dur":"1s","values":"0 50 50;0 50 50;180 50 50","keyTimes":"0;0.7;1"}})],1)])},staticRenderFns: [],
  name: 'q-spinner-hourglass',
  mixins: [mixin]
}

var infinity = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"q-spinner",class:_vm.classes,attrs:{"width":_vm.size,"height":_vm.size,"viewBox":"0 0 100 100","preserveAspectRatio":"xMidYMid"}},[_c('path',{attrs:{"d":"M24.3,30C11.4,30,5,43.3,5,50s6.4,20,19.3,20c19.3,0,32.1-40,51.4-40C88.6,30,95,43.3,95,50s-6.4,20-19.3,20C56.4,70,43.6,30,24.3,30z","fill":"none","stroke":"currentColor","stroke-width":"8","stroke-dasharray":"10.691205342610678 10.691205342610678","stroke-dashoffset":"0"}},[_c('animate',{attrs:{"attributeName":"stroke-dashoffset","from":"0","to":"21.382410685221355","begin":"0","dur":"2s","repeatCount":"indefinite","fill":"freeze"}})])])},staticRenderFns: [],
  name: 'q-spinner-infinity',
  mixins: [mixin]
}

var QSpinner_mat = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"q-spinner q-spinner-mat",class:_vm.classes,attrs:{"width":_vm.size,"height":_vm.size,"viewBox":"25 25 50 50"}},[_c('circle',{staticClass:"path",attrs:{"cx":"50","cy":"50","r":"20","fill":"none","stroke":"currentColor","stroke-width":"3","stroke-miterlimit":"10"}})])},staticRenderFns: [],
  name: 'q-spinner-mat',
  mixins: [mixin]
}

var oval = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"q-spinner",class:_vm.classes,attrs:{"stroke":"currentColor","width":_vm.size,"height":_vm.size,"viewBox":"0 0 38 38","xmlns":"http://www.w3.org/2000/svg"}},[_c('g',{attrs:{"transform":"translate(1 1)","stroke-width":"2","fill":"none","fill-rule":"evenodd"}},[_c('circle',{attrs:{"stroke-opacity":".5","cx":"18","cy":"18","r":"18"}}),_c('path',{attrs:{"d":"M36 18c0-9.94-8.06-18-18-18"}},[_c('animateTransform',{attrs:{"attributeName":"transform","type":"rotate","from":"0 18 18","to":"360 18 18","dur":"1s","repeatCount":"indefinite"}})],1)])])},staticRenderFns: [],
  name: 'q-spinner-oval',
  mixins: [mixin]
}

var pie = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"q-spinner",class:_vm.classes,attrs:{"width":_vm.size,"height":_vm.size,"viewBox":"0 0 100 100","preserveAspectRatio":"xMidYMid","xmlns":"http://www.w3.org/2000/svg"}},[_c('path',{attrs:{"d":"M0 50A50 50 0 0 1 50 0L50 50L0 50","fill":"currentColor","opacity":"0.5"}},[_c('animateTransform',{attrs:{"attributeName":"transform","type":"rotate","from":"0 50 50","to":"360 50 50","dur":"0.8s","repeatCount":"indefinite"}})],1),_c('path',{attrs:{"d":"M50 0A50 50 0 0 1 100 50L50 50L50 0","fill":"currentColor","opacity":"0.5"}},[_c('animateTransform',{attrs:{"attributeName":"transform","type":"rotate","from":"0 50 50","to":"360 50 50","dur":"1.6s","repeatCount":"indefinite"}})],1),_c('path',{attrs:{"d":"M100 50A50 50 0 0 1 50 100L50 50L100 50","fill":"currentColor","opacity":"0.5"}},[_c('animateTransform',{attrs:{"attributeName":"transform","type":"rotate","from":"0 50 50","to":"360 50 50","dur":"2.4s","repeatCount":"indefinite"}})],1),_c('path',{attrs:{"d":"M50 100A50 50 0 0 1 0 50L50 50L50 100","fill":"currentColor","opacity":"0.5"}},[_c('animateTransform',{attrs:{"attributeName":"transform","type":"rotate","from":"0 50 50","to":"360 50 50","dur":"3.2s","repeatCount":"indefinite"}})],1)])},staticRenderFns: [],
  name: 'q-spinner-pie',
  mixins: [mixin]
}

var puff = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"q-spinner",class:_vm.classes,attrs:{"stroke":"currentColor","width":_vm.size,"height":_vm.size,"viewBox":"0 0 44 44","xmlns":"http://www.w3.org/2000/svg"}},[_c('g',{attrs:{"fill":"none","fill-rule":"evenodd","stroke-width":"2"}},[_c('circle',{attrs:{"cx":"22","cy":"22","r":"1"}},[_c('animate',{attrs:{"attributeName":"r","begin":"0s","dur":"1.8s","values":"1; 20","calcMode":"spline","keyTimes":"0; 1","keySplines":"0.165, 0.84, 0.44, 1","repeatCount":"indefinite"}}),_c('animate',{attrs:{"attributeName":"stroke-opacity","begin":"0s","dur":"1.8s","values":"1; 0","calcMode":"spline","keyTimes":"0; 1","keySplines":"0.3, 0.61, 0.355, 1","repeatCount":"indefinite"}})]),_c('circle',{attrs:{"cx":"22","cy":"22","r":"1"}},[_c('animate',{attrs:{"attributeName":"r","begin":"-0.9s","dur":"1.8s","values":"1; 20","calcMode":"spline","keyTimes":"0; 1","keySplines":"0.165, 0.84, 0.44, 1","repeatCount":"indefinite"}}),_c('animate',{attrs:{"attributeName":"stroke-opacity","begin":"-0.9s","dur":"1.8s","values":"1; 0","calcMode":"spline","keyTimes":"0; 1","keySplines":"0.3, 0.61, 0.355, 1","repeatCount":"indefinite"}})])])])},staticRenderFns: [],
  name: 'q-spinner-puff',
  mixins: [mixin]
}

var radio = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"q-spinner",class:_vm.classes,attrs:{"width":_vm.size,"height":_vm.size,"viewBox":"0 0 100 100","preserveAspectRatio":"xMidYMid","xmlns":"http://www.w3.org/2000/svg"}},[_c('g',{attrs:{"transform":"scale(0.55)"}},[_c('circle',{attrs:{"cx":"30","cy":"150","r":"30","fill":"currentColor"}},[_c('animate',{attrs:{"attributeName":"opacity","from":"0","to":"1","dur":"1s","begin":"0","repeatCount":"indefinite","keyTimes":"0;0.5;1","values":"0;1;1"}})]),_c('path',{attrs:{"d":"M90,150h30c0-49.7-40.3-90-90-90v30C63.1,90,90,116.9,90,150z","fill":"currentColor"}},[_c('animate',{attrs:{"attributeName":"opacity","from":"0","to":"1","dur":"1s","begin":"0.1","repeatCount":"indefinite","keyTimes":"0;0.5;1","values":"0;1;1"}})]),_c('path',{attrs:{"d":"M150,150h30C180,67.2,112.8,0,30,0v30C96.3,30,150,83.7,150,150z","fill":"currentColor"}},[_c('animate',{attrs:{"attributeName":"opacity","from":"0","to":"1","dur":"1s","begin":"0.2","repeatCount":"indefinite","keyTimes":"0;0.5;1","values":"0;1;1"}})])])])},staticRenderFns: [],
  name: 'q-spinner-radio',
  mixins: [mixin]
}

var rings = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"q-spinner",class:_vm.classes,attrs:{"stroke":"currentColor","width":_vm.size,"height":_vm.size,"viewBox":"0 0 45 45","xmlns":"http://www.w3.org/2000/svg"}},[_c('g',{attrs:{"fill":"none","fill-rule":"evenodd","transform":"translate(1 1)","stroke-width":"2"}},[_c('circle',{attrs:{"cx":"22","cy":"22","r":"6"}},[_c('animate',{attrs:{"attributeName":"r","begin":"1.5s","dur":"3s","values":"6;22","calcMode":"linear","repeatCount":"indefinite"}}),_c('animate',{attrs:{"attributeName":"stroke-opacity","begin":"1.5s","dur":"3s","values":"1;0","calcMode":"linear","repeatCount":"indefinite"}}),_c('animate',{attrs:{"attributeName":"stroke-width","begin":"1.5s","dur":"3s","values":"2;0","calcMode":"linear","repeatCount":"indefinite"}})]),_c('circle',{attrs:{"cx":"22","cy":"22","r":"6"}},[_c('animate',{attrs:{"attributeName":"r","begin":"3s","dur":"3s","values":"6;22","calcMode":"linear","repeatCount":"indefinite"}}),_c('animate',{attrs:{"attributeName":"stroke-opacity","begin":"3s","dur":"3s","values":"1;0","calcMode":"linear","repeatCount":"indefinite"}}),_c('animate',{attrs:{"attributeName":"stroke-width","begin":"3s","dur":"3s","values":"2;0","calcMode":"linear","repeatCount":"indefinite"}})]),_c('circle',{attrs:{"cx":"22","cy":"22","r":"8"}},[_c('animate',{attrs:{"attributeName":"r","begin":"0s","dur":"1.5s","values":"6;1;2;3;4;5;6","calcMode":"linear","repeatCount":"indefinite"}})])])])},staticRenderFns: [],
  name: 'q-spinner-rings',
  mixins: [mixin]
}

var tail = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('svg',{staticClass:"q-spinner",class:_vm.classes,attrs:{"width":_vm.size,"height":_vm.size,"viewBox":"0 0 38 38","xmlns":"http://www.w3.org/2000/svg"}},[_c('defs',[_c('linearGradient',{attrs:{"x1":"8.042%","y1":"0%","x2":"65.682%","y2":"23.865%","id":"a"}},[_c('stop',{attrs:{"stop-color":"currentColor","stop-opacity":"0","offset":"0%"}}),_c('stop',{attrs:{"stop-color":"currentColor","stop-opacity":".631","offset":"63.146%"}}),_c('stop',{attrs:{"stop-color":"currentColor","offset":"100%"}})],1)],1),_c('g',{attrs:{"transform":"translate(1 1)","fill":"none","fill-rule":"evenodd"}},[_c('path',{attrs:{"d":"M36 18c0-9.94-8.06-18-18-18","stroke":"url(#a)","stroke-width":"2"}},[_c('animateTransform',{attrs:{"attributeName":"transform","type":"rotate","from":"0 18 18","to":"360 18 18","dur":"0.9s","repeatCount":"indefinite"}})],1),_c('circle',{attrs:{"fill":"currentColor","cx":"36","cy":"18","r":"1"}},[_c('animateTransform',{attrs:{"attributeName":"transform","type":"rotate","from":"0 18 18","to":"360 18 18","dur":"0.9s","repeatCount":"indefinite"}})],1)])])},staticRenderFns: [],
  name: 'q-spinner-tail',
  mixins: [mixin]
}

var QSpinner = {
  mixins: [DefaultSpinner],
  name: 'q-spinner'
};

var QBtn = {
  name: 'q-btn',
  mixins: [BtnMixin],
  props: {
    value: Boolean,
    loader: Boolean,
    percentage: Number,
    darkPercentage: Boolean,
    waitForRipple: Boolean,
    repeatTimeout: [Number, Function]
  },
  data: function data () {
    return {
      loading: this.value || false,
      repeated: 0
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
    hasPercentage: function hasPercentage () {
      return this.percentage !== void 0
    },
    width: function width () {
      return ((between(this.percentage, 0, 100)) + "%")
    },
    hasNoRepeat: function hasNoRepeat () {
      return this.isDisabled || !this.repeatTimeout || this.loader !== false
    }
  },
  methods: {
    click: function click (e) {
      var this$1 = this;

      clearTimeout(this.timer);

      if (this.isDisabled || this.repeated) {
        this.repeated = 0;
        return
      }

      var trigger = function () {
        this$1.removeFocus(e);
        if (this$1.loader !== false || this$1.$slots.loading) {
          this$1.loading = true;
          this$1.$emit('input', true);
        }
        this$1.$emit('click', e, function () {
          this$1.loading = false;
          this$1.$emit('input', false);
        });
      };

      if (this.waitForRipple && this.hasRipple) {
        this.timer = setTimeout(trigger, 350);
      }
      else {
        trigger();
      }
    },
    startRepeat: function startRepeat (e) {
      var this$1 = this;

      this.repeated = 0;

      var setTimer = function () {
        this$1.timer = setTimeout(
          trigger,
          typeof this$1.repeatTimeout === 'function'
            ? this$1.repeatTimeout(this$1.repeated)
            : this$1.repeatTimeout
        );
      };
      var trigger = function () {
        if (this$1.hasNoRepeat || this$1.$slots.loading) {
          return
        }
        this$1.repeated += 1;
        this$1.$emit('click', e);
        setTimer();
      };

      setTimer();
    },
    endRepeat: function endRepeat () {
      clearTimeout(this.timer);
    }
  },
  beforeDestroy: function beforeDestroy () {
    clearTimeout(this.timer);
  },
  render: function render (h) {
    var on = this.hasNoRepeat || this.$slots.loading
      ? {}
      : {
        mousedown: this.startRepeat,
        touchstart: this.startRepeat,
        mouseup: this.endRepeat,
        mouseleave: this.endRepeat,
        touchend: this.endRepeat
      };

    on.click = this.click;

    return h('button', {
      staticClass: 'q-btn row inline flex-center relative-position',
      'class': this.classes,
      style: this.style,
      on: on,
      directives: this.hasRipple
        ? [{
          name: 'ripple',
          value: true
        }]
        : null
    }, [
      h('div', { staticClass: 'q-focus-helper' }),

      this.loading && this.hasPercentage
        ? h('div', {
          staticClass: 'q-btn-progress absolute-full',
          'class': { 'q-btn-dark-progress': this.darkPercentage },
          style: { width: this.width }
        })
        : null,

      h('div', {
        staticClass: 'q-btn-inner row col items-center',
        'class': this.innerClasses
      },
      this.loading
        ? [ this.$slots.loading || h(QSpinner) ]
        : [
          this.icon
            ? h('q-icon', {
              'class': { 'on-left': this.label && this.isRectangle },
              props: { name: this.icon }
            })
            : null,

          this.label && this.isRectangle ? h('div', [ this.label ]) : null,

          this.$slots.default,

          this.iconRight && this.isRectangle
            ? h('q-icon', {
              staticClass: 'on-right',
              props: { name: this.iconRight }
            })
            : null
        ]
      )
    ])
  }
}

var QBtnToggle = {
  name: 'q-btn-toggle',
  mixins: [BtnMixin],
  model: {
    prop: 'toggled',
    event: 'change'
  },
  props: {
    toggled: {
      type: Boolean,
      required: true
    },
    toggleColor: {
      type: String,
      required: true
    }
  },
  methods: {
    click: function click (e) {
      var this$1 = this;

      clearTimeout(this.timer);

      if (this.isDisabled) {
        return
      }

      var trigger = function () {
        this$1.removeFocus(e);
        var state = !this$1.toggled;
        this$1.$emit('change', state);
        this$1.$emit('click', e, state);
      };

      if (this.waitForRipple && this.hasRipple) {
        this.timer = setTimeout(trigger, 350);
      }
      else {
        trigger();
      }
    }
  },
  render: function render (h) {
    return h('button', {
      staticClass: 'q-btn q-btn-toggle row inline flex-center relative-position',
      'class': this.classes,
      style: this.style,
      on: { click: this.click },
      directives: this.hasRipple
        ? [{
          name: 'ripple',
          value: true
        }]
        : null
    }, [
      h('div', { staticClass: 'q-focus-helper' }),

      h('div', {
        staticClass: 'q-btn-inner row col items-center',
        'class': this.innerClasses
      }, [
        this.icon
          ? h('q-icon', {
            'class': { 'on-left': this.label && this.isRectangle },
            props: { name: this.icon }
          })
          : null,

        this.label && this.isRectangle ? h('div', [ this.label ]) : null,

        this.$slots.default,

        this.iconRight && this.isRectangle
          ? h('q-icon', {
            staticClass: 'on-right',
            props: { name: this.iconRight }
          })
          : null
      ])
    ])
  }
}

var QBtnGroup = {
  name: 'q-btn-group',
  props: {
    outline: Boolean,
    flat: Boolean,
    rounded: Boolean,
    push: Boolean
  },
  computed: {
    classes: function classes () {
      var this$1 = this;

      return ['outline', 'flat', 'rounded', 'push']
        .filter(function (t) { return this$1[t]; })
        .map(function (t) { return ("q-btn-group-" + t); }).join(' ')
    }
  },
  render: function render (h) {
    return h('div', {
      staticClass: 'q-btn-group row no-wrap inline',
      'class': this.classes
    }, [
      this.$slots.default
    ])
  }
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
    a = extend$1({}, anchor),
    t = extend$1({}, target);

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

function debounce (fn, wait, immediate) {
  if ( wait === void 0 ) wait = 250;

  var timeout;

  function debounced () {
    var this$1 = this;
    var args = [], len = arguments.length;
    while ( len-- ) args[ len ] = arguments[ len ];

    var later = function () {
      timeout = null;
      if (!immediate) {
        fn.apply(this$1, args);
      }
    };

    clearTimeout(timeout);
    if (immediate && !timeout) {
      fn.apply(this, args);
    }
    timeout = setTimeout(later, wait);
  }

  debounced.cancel = function () {
    clearTimeout(timeout);
  };

  return debounced
}

function frameDebounce (fn) {
  var wait = false;

  return function () {
    var this$1 = this;
    var args = [], len = arguments.length;
    while ( len-- ) args[ len ] = arguments[ len ];

    if (wait) { return }

    wait = true;
    window.requestAnimationFrame(function () {
      fn.apply(this$1, args);
      wait = false;
    });
  }
}

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
	animScrollTo: animScrollTo,
	setScrollPosition: setScrollPosition,
	getScrollbarWidth: getScrollbarWidth
});

var QPopover = {
  name: 'q-popover',
  mixins: [ModelToggleMixin],
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
  watch: {
    $route: function $route () {
      this.hide();
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
  render: function render (h) {
    return h('div', {
      staticClass: 'q-popover animate-scale',
      style: this.transformCSS,
      on: {
        click: function click (e) { e.stopPropagation(); }
      }
    }, this.$slots.default)
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
      if (this$1.anchorEl.classList.contains('q-btn-inner') || this$1.anchorEl.classList.contains('q-if-inner')) {
        this$1.anchorEl = this$1.anchorEl.parentNode;
      }
      if (this$1.anchorClick) {
        this$1.anchorEl.classList.add('cursor-pointer');
        this$1.anchorEl.addEventListener('click', this$1.toggle);
      }
    });
    if (this.value) {
      this.show();
    }
  },
  beforeDestroy: function beforeDestroy () {
    if (this.anchorClick && this.anchorEl) {
      this.anchorEl.removeEventListener('click', this.toggle);
    }
  },
  methods: {
    __show: function __show (evt) {
      var this$1 = this;

      document.body.appendChild(this.$el);
      EscapeKey.register(function () { this$1.hide(); });
      this.scrollTarget = getScrollTarget(this.anchorEl);
      this.scrollTarget.addEventListener('scroll', this.__updatePosition);
      window.addEventListener('resize', this.__updatePosition);
      this.reposition(evt);

      clearTimeout(this.timer);
      this.timer = setTimeout(function () {
        document.body.addEventListener('click', this$1.__bodyHide, true);
        document.body.addEventListener('touchstart', this$1.__bodyHide, true);
        this$1.showPromise && this$1.showPromiseResolve();
      }, 0);
    },
    __bodyHide: function __bodyHide (evt) {
      if (
        evt && evt.target &&
        (this.$el.contains(evt.target) || this.anchorEl.contains(evt.target))
      ) {
        return
      }

      this.hide(evt);
    },
    __hide: function __hide (evt) {
      clearTimeout(this.timer);

      document.body.removeEventListener('click', this.__bodyHide, true);
      document.body.removeEventListener('touchstart', this.__bodyHide, true);
      this.scrollTarget.removeEventListener('scroll', this.__updatePosition);
      window.removeEventListener('resize', this.__updatePosition);
      EscapeKey.pop();

      document.body.removeChild(this.$el);
      this.hidePromise && this.hidePromiseResolve();
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
          return this$1.hide()
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
}

var QBtnDropdown = {
  name: 'q-btn-dropdown',
  mixins: [BtnMixin],
  props: {
    value: Boolean,
    label: String,
    split: Boolean
  },
  render: function render (h) {
    var this$1 = this;

    var
      Popover = h(
        QPopover,
        {
          ref: 'popover',
          props: {
            fit: true,
            anchorClick: !this.split,
            anchor: 'bottom right',
            self: 'top right'
          },
          on: {
            show: function (e) {
              this$1.$emit('show', e);
              this$1.$emit('input', true);
            },
            hide: function (e) {
              this$1.$emit('hide', e);
              this$1.$emit('input', false);
            }
          }
        },
        this.$slots.default
      ),
      Icon = h(
        'q-icon',
        {
          props: {
            name: this.$q.icon.input.dropdown
          },
          staticClass: 'transition-generic',
          'class': {
            'rotate-180': this.showing,
            'on-right': !this.split,
            'q-btn-dropdown-arrow': !this.split
          }
        }
      ),
      child = [Popover];

    var getBtn = function () {
      return h(
        QBtn,
        {
          props: {
            disable: this$1.disable,
            noCaps: this$1.noCaps,
            noWrap: this$1.noWrap,
            icon: this$1.icon,
            label: this$1.label,
            iconRight: this$1.split ? this$1.iconRight : null,
            outline: this$1.outline,
            flat: this$1.flat,
            rounded: this$1.rounded,
            push: this$1.push,
            size: this$1.size,
            color: this$1.color,
            glossy: this$1.glossy,
            dense: this$1.dense,
            noRipple: this$1.noRipple,
            waitForRipple: this$1.waitForRipple
          },
          staticClass: ("" + (this$1.split ? 'q-btn-dropdown-current' : 'q-btn-dropdown q-btn-dropdown-simple')),
          on: {
            click: function (e) {
              this$1.split && this$1.hide();
              if (!this$1.disable) {
                this$1.$emit('click', e);
              }
            }
          }
        },
        this$1.split ? null : child
      )
    };

    if (!this.split) {
      child.push(Icon);
      return getBtn()
    }

    return h(
      QBtnGroup,
      {
        props: {
          outline: this.outline,
          flat: this.flat,
          rounded: this.rounded,
          push: this.push
        },
        staticClass: 'q-btn-dropdown q-btn-dropdown-split no-wrap'
      },
      [
        getBtn(),
        h(
          QBtn,
          {
            props: {
              flat: this.flat,
              rounded: this.rounded,
              push: this.push,
              size: this.size,
              color: this.color,
              dense: this.dense,
              glossy: this.glossy,
              noRipple: this.noRipple,
              waitForRipple: this.waitForRipple
            },
            staticClass: 'q-btn-dropdown-arrow',
            on: {
              click: function () {
                if (!this$1.disable) {
                  this$1.toggle();
                }
              }
            }
          },
          [ Icon ]
        ),
        child
      ]
    )
  },
  methods: {
    toggle: function toggle () {
      return this.$refs.popover.toggle()
    },
    show: function show () {
      return this.$refs.popover.show()
    },
    hide: function hide () {
      return this.$refs.popover.hide()
    }
  }
}

var QBtnToggleGroup = {
  name: 'q-btn-toggle-group',
  props: {
    value: {
      required: true
    },
    color: String,
    toggleColor: {
      type: String,
      required: true
    },
    options: {
      type: Array,
      required: true,
      validator: function (v) { return v.every(function (opt) { return ('label' in opt || 'icon' in opt) && 'value' in opt; }); }
    },
    disable: Boolean,
    noCaps: Boolean,
    noWrap: Boolean,
    outline: Boolean,
    flat: Boolean,
    dense: Boolean,
    rounded: Boolean,
    push: Boolean,
    size: String,
    glossy: Boolean,
    noRipple: Boolean,
    waitForRipple: Boolean
  },
  computed: {
    val: function val () {
      var this$1 = this;

      return this.options.map(function (opt) { return opt.value === this$1.value; })
    }
  },
  methods: {
    set: function set (value, opt) {
      if (value !== this.value) {
        this.$emit('input', value);
        this.$emit('change', value, opt);
      }
    }
  },
  render: function render (h) {
    var this$1 = this;

    return h(QBtnGroup, {
      staticClass: 'q-btn-toggle-group',
      props: {
        outline: this.outline,
        flat: this.flat,
        rounded: this.rounded,
        push: this.push
      }
    },
    this.options.map(
      function (opt, i) { return h(QBtnToggle, {
        key: ("" + (opt.label) + (opt.icon) + (opt.iconRight)),
        attrs: {
          tabindex: opt.tabindex || 0
        },
        on: { change: function () { return this$1.set(opt.value, opt); } },
        props: {
          toggled: this$1.val[i],
          label: opt.label,
          color: opt.color || this$1.color,
          toggleColor: opt.toggleColor || this$1.toggleColor,
          icon: opt.icon,
          iconRight: opt.iconRight,
          noCaps: this$1.noCaps,
          noWrap: this$1.noWrap,
          outline: this$1.outline,
          flat: this$1.flat,
          rounded: this$1.rounded,
          push: this$1.push,
          glossy: this$1.glossy,
          size: this$1.size,
          dense: this$1.dense,
          noRipple: this$1.noRipple,
          waitForRipple: this$1.waitForRipple
        }
      }); }
    ))
  }
}

var QAlert = {
  name: 'q-alert',
  props: {
    type: {
      type: String,
      validator: function (v) { return ['positive', 'negative', 'warning', 'info'].includes(v); }
    },
    color: {
      type: String,
      default: 'negative'
    },
    textColor: String,
    message: String,
    detail: String,
    icon: String,
    avatar: String,
    actions: Array
  },
  computed: {
    computedIcon: function computedIcon () {
      return this.icon
        ? this.icon
        : this.$q.icon.type[this.type || this.color]
    },
    classes: function classes () {
      return ("bg-" + (this.type || this.color) + " text-" + (this.textColor || 'white'))
    }
  },
  render: function render (h) {
    var this$1 = this;

    var side = [];

    if (this.avatar) {
      side.push(
        h('img', {
          staticClass: 'avatar',
          domProps: { src: this.avatar }
        })
      );
    }
    else if (this.icon || this.type) {
      side.push(
        h(QIcon, {
          props: { name: this.computedIcon }
        })
      );
    }

    return h('div', [
      h('div', {
        staticClass: 'q-alert row no-wrap shadow-2',
        'class': this.classes
      }, [
        side.length
          ? h('div', { staticClass: 'q-alert-side row col-auto flex-center' }, side)
          : null,
        h('div', {
          staticClass: 'q-alert-content col self-center'
        }, [
          h('div', this.$slots.default || this.message),
          this.detail ? h('div', { staticClass: 'q-alert-detail' }, [ this.detail ]) : null
        ]),
        this.actions && this.actions.length
          ? h('div', {
            staticClass: 'q-alert-actions col-auto gutter-xs flex-center'
          },
          this.actions.map(function (action) { return h('div', [
              h(QBtn, {
                staticClass: 'full-width',
                props: {
                  flat: true,
                  dense: true,
                  icon: action.icon,
                  justify: 'start',
                  label: action.closeBtn === true
                    ? (typeof action.label === 'string' ? action.label : this$1.$q.i18n.label.close)
                    : action.label
                },
                on: {
                  click: function () { return action.handler(); }
                }
              })
            ]); }
          ))
          : null
      ])
    ])
  }
}

function filter (terms, ref) {
  var field = ref.field;
  var list = ref.list;

  var token = terms.toLowerCase();
  return list.filter(function (item) { return ('' + item[field]).toLowerCase().startsWith(token); })
}

function s4 () {
  return Math.floor((1 + Math.random()) * 0x10000)
    .toString(16)
    .substring(1)
}

function uid$1$1 () {
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
    s4() + '-' + s4() + s4() + s4()
}

var QAutocomplete = {
  name: 'q-autocomplete',
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
    filter: {
      type: Function,
      default: filter
    },
    staticData: Object,
    separator: Boolean
  },
  inject: {
    __input: {
      default: function default$1 () {
        console.error('QAutocomplete needs to be child of QInput or QSearch');
      }
    },
    __inputDebounce: { default: null }
  },
  data: function data () {
    return {
      searchId: '',
      results: [],
      selectedIndex: -1,
      width: 0,
      enterKey: false,
      timer: null
    }
  },
  watch: {
    '__input.val': function _input_val () {
      if (this.enterKey) {
        this.enterKey = false;
      }
      else {
        this.__delayTrigger();
      }
    }
  },
  computed: {
    computedResults: function computedResults () {
      return this.maxResults && this.results.length > 0
        ? this.results.slice(0, this.maxResults)
        : []
    },
    computedWidth: function computedWidth () {
      return {minWidth: this.width}
    },
    searching: function searching () {
      return this.searchId.length > 0
    }
  },
  methods: {
    isWorking: function isWorking () {
      return this.$refs && this.$refs.popover
    },
    trigger: function trigger () {
      var this$1 = this;

      if (!this.__input.hasFocus() || !this.isWorking()) {
        return
      }

      var terms = [null, void 0].includes(this.__input.val) ? '' : String(this.__input.val);
      var searchId = uid$1$1();
      this.searchId = searchId;

      if (terms.length < this.minCharacters) {
        this.searchId = '';
        this.__clearSearch();
        this.hide();
        return
      }

      this.width = width(this.inputEl) + 'px';

      if (this.staticData) {
        this.searchId = '';
        this.results = this.filter(terms, this.staticData);
        var popover = this.$refs.popover;
        if (this.results.length) {
          this.selectedIndex = 0;
          if (popover.showing) {
            popover.reposition();
          }
          else {
            popover.show();
          }
        }
        else {
          popover.hide();
        }
        return
      }

      this.__input.loading = true;
      this.$emit('search', terms, function (results) {
        if (!this$1.isWorking() || this$1.searchId !== searchId) {
          return
        }

        this$1.__clearSearch();

        if (Array.isArray(results) && results.length > 0) {
          this$1.results = results;
          this$1.selectedIndex = 0;
          this$1.$refs.popover.show();
          return
        }

        this$1.hide();
      });
    },
    hide: function hide () {
      this.results = [];
      this.selectedIndex = -1;
      return this.isWorking()
        ? this.$refs.popover.hide()
        : Promise.resolve()
    },
    blurHide: function blurHide () {
      var this$1 = this;

      this.__clearSearch();
      setTimeout(function () { return this$1.hide(); }, 300);
    },
    __clearSearch: function __clearSearch () {
      clearTimeout(this.timer);
      this.__input.loading = false;
      this.searchId = '';
    },
    setValue: function setValue (result) {
      var value = this.staticData ? result[this.staticData.field] : result.value;
      var suffix = this.__inputDebounce ? 'Debounce' : '';

      if (this.inputEl && this.__input && !this.__input.hasFocus()) {
        this.inputEl.focus();
      }

      this.enterKey = this.__input && value !== this.__input.val;
      this[("__input" + suffix)].set(value);

      this.$emit('selected', result);
      this.__clearSearch();
      this.hide();
    },
    move: function move (offset$$1) {
      this.selectedIndex = normalizeToInterval(
        this.selectedIndex + offset$$1,
        0,
        this.computedResults.length - 1
      );
    },
    setCurrentSelection: function setCurrentSelection () {
      if (this.selectedIndex >= 0 && this.selectedIndex < this.results.length) {
        this.setValue(this.results[this.selectedIndex]);
      }
    },
    __delayTrigger: function __delayTrigger () {
      this.__clearSearch();
      if (!this.__input.hasFocus()) {
        return
      }
      if (this.staticData) {
        this.trigger();
        return
      }
      this.timer = setTimeout(this.trigger, this.debounce);
    },
    __handleKeypress: function __handleKeypress (e) {
      switch (e.keyCode || e.which) {
        case 38: // up
          this.__moveCursor(-1, e);
          break
        case 40: // down
          this.__moveCursor(1, e);
          break
        case 13: // enter
          this.setCurrentSelection();
          stopAndPrevent(e);
          break
        case 27: // escape
          this.__clearSearch();
          break
      }
    },
    __moveCursor: function __moveCursor (offset$$1, e) {
      stopAndPrevent(e);

      if (!this.$refs.popover.showing) {
        this.trigger();
      }
      else {
        this.move(offset$$1);
      }
    }
  },
  mounted: function mounted () {
    var this$1 = this;

    this.__input.register();
    if (this.__inputDebounce) {
      this.__inputDebounce.setChildDebounce(true);
    }
    this.$nextTick(function () {
      this$1.inputEl = this$1.__input.getEl();
      this$1.inputEl.addEventListener('keydown', this$1.__handleKeypress);
      this$1.inputEl.addEventListener('blur', this$1.blurHide);
    });
  },
  beforeDestroy: function beforeDestroy () {
    this.__clearSearch();
    this.__input.unregister();
    if (this.__inputDebounce) {
      this.__inputDebounce.setChildDebounce(false);
    }
    if (this.inputEl) {
      this.inputEl.removeEventListener('keydown', this.__handleKeypress);
      this.inputEl.removeEventListener('blur', this.blurHide);
      this.hide();
    }
  },
  render: function render (h) {
    var this$1 = this;

    return h(QPopover, {
      ref: 'popover',
      props: {
        fit: true,
        offset: [0, 10],
        anchorClick: false
      },
      on: {
        show: function () { return this$1.$emit('show'); },
        hide: function () { return this$1.$emit('hide'); }
      }
    }, [
      h(QList, {
        props: {
          noBorder: true,
          separator: this.separator
        },
        style: this.computedWidth
      },
      this.computedResults.map(function (result, index) { return h(QItemWrapper, {
        key: result.id || JSON.stringify(result),
        'class': {
          active: this$1.selectedIndex === index,
          'cursor-pointer': !result.disable
        },
        props: { cfg: result },
        nativeOn: {
          mouseenter: function () { !result.disable && (this$1.selectedIndex = index); },
          click: function () { !result.disable && this$1.setValue(result); }
        }
      }); }))
    ])
  }
}

var alignMap = {
  left: 'start',
  center: 'center',
  right: 'end',
  justify: 'between'
};

var QBreadcrumbs = {
  name: 'q-breadcrumbs',
  props: {
    color: {
      type: String,
      default: 'faded'
    },
    activeColor: {
      type: String,
      default: 'primary'
    },
    separator: {
      type: String,
      default: '/'
    },
    align: {
      type: String,
      default: 'left',
      validator: function (v) { return ['left', 'center', 'right', 'justify'].includes(v); }
    }
  },
  computed: {
    computedAlign: function computedAlign () {
      return alignMap[this.align]
    }
  },
  render: function render (h) {
    var
      child = [],
      length = this.$slots.default.length - 1,
      separator = this.$slots.separator
        ? this.$slots.separator
        : this.separator,
      color = "text-" + (this.color),
      active = "text-" + (this.activeColor);

    this.$slots.default.forEach(function (comp, i) {
      if (comp.componentOptions && comp.componentOptions.tag === 'q-breadcrumb-el') {
        var middle = i < length;

        child.push(h('div', { staticClass: ((middle ? active : color) + " " + (middle ? 'text-weight-bold' : 'q-breadcrumb-last')) }, [ comp ]));
        if (middle) {
          child.push(h('div', { staticClass: ("q-breadcrumb-separator " + color) }, [ separator ]));
        }
      }
      else {
        child.push(comp);
      }
    });

    return h('div', {
      staticClass: 'q-breadcrumbs flex gutter-xs items-center overflow-hidden',
      'class': [("text-" + (this.color)), ("justify-" + (this.computedAlign))]
    }, child)
  }
}

var QBreadcrumbEl = {
  name: 'q-breadcrumb-el',
  mixins: [{ props: RouterLinkMixin.props }],
  props: {
    label: String,
    icon: String,
    color: String,
    noRipple: Boolean
  },
  computed: {
    link: function link () {
      return this.to !== void 0
    }
  },
  render: function render (h) {
    return h(this.link ? 'router-link' : 'span', {
      staticClass: 'q-breadcrumb-el flex inline items-center relative-position',
      props: this.link
        ? {
          to: this.to,
          exact: this.exact,
          append: this.append,
          replace: this.replace
        }
        : null
    },
    this.label || this.icon
      ? [
        this.icon ? h(QIcon, { staticClass: 'q-breacrumb-el-icon q-mr-sm', props: { name: this.icon } }) : null,
        this.label
      ]
      : [ this.$slots.default ]
    )
  }
}

var QCard = {
  name: 'q-card',
  props: {
    square: Boolean,
    flat: Boolean,
    inline: Boolean,
    color: String,
    textColor: String
  },
  computed: {
    classes: function classes () {
      var cls = [{
        'no-border-radius': this.square,
        'no-shadow': this.flat,
        'inline-block': this.inline
      }];

      if (this.color) {
        cls.push(("bg-" + (this.color)));
        cls.push("q-card-dark");
        cls.push(("text-" + (this.textColor || 'white')));
      }
      else if (this.textColor) {
        cls.push(("text-" + (this.textColor)));
      }

      return cls
    }
  },
  render: function render (h) {
    return h('div', {
      staticClass: 'q-card',
      'class': this.classes
    }, [
      this.$slots.default
    ])
  }
}

var QCardTitle = {
  name: 'q-card-title',
  render: function render (h) {
    return h('div', {
      staticClass: 'q-card-primary q-card-container row no-wrap'
    }, [
      h('div', {staticClass: 'col column'}, [
        h('div', {staticClass: 'q-card-title'}, [ this.$slots.default ]),
        h('div', {staticClass: 'q-card-subtitle'}, [ this.$slots.subtitle ])
      ]),
      h('div', {staticClass: 'col-auto self-center q-card-title-extra'}, [ this.$slots.right ])
    ])
  }
}

var QCardMain = {
  name: 'q-card-main',
  render: function render (h) {
    return h('div', {
      staticClass: 'q-card-main q-card-container'
    }, [
      this.$slots.default
    ])
  }
}

var QCardActions = {
  name: 'q-card-actions',
  props: {
    vertical: Boolean,
    align: {
      type: String,
      default: 'start',
      validator: function (v) { return ['start', 'center', 'end', 'around', 'between'].includes(v); }
    }
  },
  computed: {
    classes: function classes () {
      return "q-card-actions-" + (this.vertical ? 'vert column justify-start' : 'horiz row') + " " +
        (this.vertical ? 'items' : 'justify') + "-" + (this.align)
    }
  },
  render: function render (h) {
    return h('div', {
      staticClass: 'q-card-actions',
      'class': this.classes
    }, [
      this.$slots.default
    ])
  }
}

var QCardMedia = {
  name: 'q-card-media',
  props: {
    overlayPosition: {
      type: String,
      default: 'bottom',
      validator: function (v) { return ['top', 'bottom', 'full'].includes(v); }
    }
  },
  render: function render (h) {
    return h('div', {
      staticClass: 'q-card-media relative-position'
    }, [
      this.$slots.default,
      this.$slots.overlay
        ? h('div', {
          staticClass: 'q-card-media-overlay',
          'class': ("absolute-" + (this.overlayPosition))
        }, [
          this.$slots.overlay
        ])
        : null
    ])
  }
}

var QCardSeparator = {
  name: 'q-card-separator',
  props: {
    inset: Boolean
  },
  render: function render (h) {
    return h('div', {
      staticClass: 'q-card-separator',
      'class': { inset: this.inset }
    }, [
      this.$slots.default
    ])
  }
}

function getDirection (mod) {
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

function updateClasses (el, dir, scroll) {
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
      direction: getDirection(binding.modifiers),

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
    updateClasses(el, ctx.direction, ctx.scroll);
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
}

function isDate (v) {
  return Object.prototype.toString.call(v) === '[object Date]'
}



function isNumber (v) {
  return typeof v === 'number' && isFinite(v)
}

var linear = function (t) { return t; };

var easeInQuad = function (t) { return t * t; };
var easeOutQuad = function (t) { return t * (2 - t); };
var easeInOutQuad = function (t) { return t < 0.5
  ? 2 * t * t
  : -1 + (4 - 2 * t) * t; };

var easeInCubic = function (t) { return Math.pow( t, 3 ); };
var easeOutCubic = function (t) { return 1 + Math.pow( (t - 1), 3 ); };
var easeInOutCubic = function (t) { return t < 0.5
  ? 4 * Math.pow( t, 3 )
  : 1 + (t - 1) * Math.pow( (2 * t - 2), 2 ); };

var easeInQuart = function (t) { return Math.pow( t, 4 ); };
var easeOutQuart = function (t) { return 1 - Math.pow( (t - 1), 4 ); };
var easeInOutQuart = function (t) { return t < 0.5
  ? 8 * Math.pow( t, 4 )
  : 1 - 8 * Math.pow( (t - 1), 4 ); };

var easeInQuint = function (t) { return Math.pow( t, 5 ); };
var easeOutQuint = function (t) { return 1 + Math.pow( (t - 1), 5 ); };
var easeInOutQuint = function (t) { return t < 0.5
  ? 16 * Math.pow( t, 5 )
  : 1 + 16 * Math.pow( (t - 1), 5 ); };

var easeInCirc = function (t) { return -1 * Math.sqrt(1 - Math.pow( t, 2 )) + 1; };
var easeOutCirc = function (t) { return Math.sqrt(-1 * (t - 2) * t); };
var easeInOutCirc = function (t) { return t < 0.5
  ? 0.5 * (1 - Math.sqrt(1 - 4 * t * t))
  : 0.5 * (1 + Math.sqrt(-3 + 8 * t - 4 * t * t)); };

var overshoot = function (t) { return -1 * (Math.pow( Math.E, (-6.3 * t) )) * (Math.cos(5 * t)) + 1; };

/* -- Material Design curves -- */

/**
 * Faster ease in, slower ease out
 */
var standard = function (t) { return t < 0.4031
  ? 12 * Math.pow( t, 4 )
  : 1 / 1290 * (11 * Math.sqrt(-40000 * t * t + 80000 * t - 23359) - 129); };

var decelerate = easeOutCubic;
var accelerate = easeInCubic;
var sharp = easeInOutQuad;


var easing = Object.freeze({
	linear: linear,
	easeInQuad: easeInQuad,
	easeOutQuad: easeOutQuad,
	easeInOutQuad: easeInOutQuad,
	easeInCubic: easeInCubic,
	easeOutCubic: easeOutCubic,
	easeInOutCubic: easeInOutCubic,
	easeInQuart: easeInQuart,
	easeOutQuart: easeOutQuart,
	easeInOutQuart: easeInOutQuart,
	easeInQuint: easeInQuint,
	easeOutQuint: easeOutQuint,
	easeInOutQuint: easeInOutQuint,
	easeInCirc: easeInCirc,
	easeOutCirc: easeOutCirc,
	easeInOutCirc: easeInOutCirc,
	overshoot: overshoot,
	standard: standard,
	decelerate: decelerate,
	accelerate: accelerate,
	sharp: sharp
});

var ids = {};

function start (ref) {
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
    id = uid$1$1();
  }

  var delta = easing || linear;
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
	start: start,
	stop: stop
});

var FullscreenMixin = {
  data: function data () {
    return {
      inFullscreen: false
    }
  },
  watch: {
    $route: function $route () {
      this.exitFullscreen();
    }
  },
  methods: {
    toggleFullscreen: function toggleFullscreen () {
      if (this.inFullscreen) {
        this.exitFullscreen();
      }
      else {
        this.setFullscreen();
      }
    },
    setFullscreen: function setFullscreen () {
      if (this.inFullscreen) {
        return
      }

      this.inFullscreen = true;
      this.container = this.$el.parentNode;
      this.container.replaceChild(this.fullscreenFillerNode, this.$el);
      document.body.appendChild(this.$el);
      document.body.classList.add('with-mixin-fullscreen');

      this.__historyFullscreen = {
        handler: this.exitFullscreen
      };
      History.add(this.__historyFullscreen);
    },
    exitFullscreen: function exitFullscreen () {
      if (!this.inFullscreen) {
        return
      }

      if (this.__historyFullscreen) {
        History.remove(this.__historyFullscreen);
        this.__historyFullscreen = null;
      }
      this.container.replaceChild(this.$el, this.fullscreenFillerNode);
      document.body.classList.remove('with-mixin-fullscreen');
      this.inFullscreen = false;
    }
  },
  created: function created () {
    this.fullscreenFillerNode = document.createElement('span');
  },
  beforeDestroy: function beforeDestroy () {
    this.exitFullscreen();
  }
}

var QCarousel = {
  name: 'q-carousel',
  mixins: [FullscreenMixin],
  directives: {
    TouchPan: TouchPan
  },
  props: {
    value: Number,
    color: {
      type: String,
      default: 'primary'
    },
    height: String,
    arrows: Boolean,
    infinite: Boolean,
    animation: {
      type: [Number, Boolean],
      default: true
    },
    easing: Function,
    swipeEasing: Function,
    noSwipe: Boolean,
    autoplay: [Number, Boolean],
    handleArrowKeys: Boolean,
    quickNav: Boolean,
    quickNavIcon: String
  },
  provide: function provide () {
    return {
      'carousel': this
    }
  },
  data: function data () {
    return {
      position: 0,
      slide: 0,
      positionSlide: 0,
      slidesNumber: 0,
      animUid: false
    }
  },
  watch: {
    value: function value (v) {
      if (v !== this.slide) {
        this.goToSlide(v);
      }
    },
    autoplay: function autoplay () {
      this.__planAutoPlay();
    },
    infinite: function infinite () {
      this.__planAutoPlay();
    },
    handleArrowKeys: function handleArrowKeys (v) {
      this.__setArrowKeys(v);
    }
  },
  computed: {
    trackPosition: function trackPosition () {
      return cssTransform(("translateX(" + (this.position) + "%)"))
    },
    infiniteLeft: function infiniteLeft () {
      return this.infinite && this.slidesNumber > 1 && this.positionSlide < 0
    },
    infiniteRight: function infiniteRight () {
      return this.infinite && this.slidesNumber > 1 && this.positionSlide >= this.slidesNumber
    },
    canGoToPrevious: function canGoToPrevious () {
      return this.infinite ? this.slidesNumber > 1 : this.slide > 0
    },
    canGoToNext: function canGoToNext () {
      return this.infinite ? this.slidesNumber > 1 : this.slide < this.slidesNumber - 1
    },
    computedStyle: function computedStyle () {
      if (!this.inFullscreen && this.height) {
        return ("height: " + (this.height))
      }
    },
    slotScope: function slotScope () {
      return {
        slide: this.slide,
        slidesNumber: this.slidesNumber,
        percentage: this.slidesNumber < 2
          ? 100
          : 100 * this.slide / (this.slidesNumber - 1),
        goToSlide: this.goToSlide,
        previous: this.previous,
        next: this.next,
        color: this.color,
        inFullscreen: this.inFullscreen,
        toggleFullscreen: this.toggleFullscreen,
        canGoToNext: this.canGoToNext,
        canGoToPrevious: this.canGoToPrevious
      }
    }
  },
  methods: {
    previous: function previous () {
      return this.canGoToPrevious
        ? this.goToSlide(this.slide - 1)
        : Promise.resolve()
    },
    next: function next () {
      return this.canGoToNext
        ? this.goToSlide(this.slide + 1)
        : Promise.resolve()
    },
    goToSlide: function goToSlide (slide, fromSwipe) {
      var this$1 = this;
      if ( fromSwipe === void 0 ) fromSwipe = false;

      return new Promise(function (resolve, reject) {
        var
          direction = '',
          pos;

        this$1.__cleanup();

        var finish = function () {
          this$1.$emit('input', this$1.slide);
          this$1.$emit('slide-direction', direction);
          this$1.__planAutoPlay();
          resolve();
        };

        if (this$1.slidesNumber < 2) {
          this$1.slide = 0;
          this$1.positionSlide = 0;
          pos = 0;
        }
        else {
          if (!this$1.hasOwnProperty('initialPosition')) {
            this$1.position = -this$1.slide * 100;
          }
          direction = slide > this$1.slide ? 'next' : 'previous';
          if (this$1.infinite) {
            this$1.slide = normalizeToInterval(slide, 0, this$1.slidesNumber - 1);
            pos = normalizeToInterval(slide, -1, this$1.slidesNumber);
            if (!fromSwipe) {
              this$1.positionSlide = pos;
            }
          }
          else {
            this$1.slide = between(slide, 0, this$1.slidesNumber - 1);
            this$1.positionSlide = this$1.slide;
            pos = this$1.slide;
          }
        }

        pos = pos * -100;

        if (!this$1.animation) {
          this$1.position = pos;
          finish();
          return
        }

        this$1.animationInProgress = true;

        this$1.animUid = start({
          from: this$1.position,
          to: pos,
          duration: isNumber(this$1.animation) ? this$1.animation : 300,
          easing: fromSwipe
            ? this$1.swipeEasing || decelerate
            : this$1.easing || standard,
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
      })
    },
    stopAnimation: function stopAnimation () {
      stop(this.animUid);
      this.animationInProgress = false;
    },
    __pan: function __pan (event) {
      var this$1 = this;

      if (this.infinite && this.animationInProgress) {
        return
      }
      if (event.isFirst) {
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
          true
        ).then(function () {
          delete this$1.initialPosition;
        });
      }
    },
    __planAutoPlay: function __planAutoPlay () {
      var this$1 = this;

      this.$nextTick(function () {
        if (this$1.autoplay) {
          clearTimeout(this$1.timer);
          this$1.timer = setTimeout(
            this$1.next,
            isNumber(this$1.autoplay) ? this$1.autoplay : 5000
          );
        }
      });
    },
    __cleanup: function __cleanup () {
      this.stopAnimation();
      clearTimeout(this.timer);
    },
    __handleArrowKey: function __handleArrowKey (e) {
      var key = getEventKey(e);

      if (key === 37) { // left arrow key
        this.previous();
      }
      else if (key === 39) { // right arrow key
        this.next();
      }
    },
    __setArrowKeys: function __setArrowKeys (/* boolean */ state) {
      var op = (state === true ? 'add' : 'remove') + "EventListener";
      document[op]('keydown', this.__handleArrowKey);
    },
    __registerSlide: function __registerSlide () {
      this.slidesNumber++;
    },
    __unregisterSlide: function __unregisterSlide () {
      this.slidesNumber--;
    },
    __getScopedSlots: function __getScopedSlots (h) {
      var this$1 = this;

      if (this.slidesNumber === 0) {
        return
      }
      var slots = this.$scopedSlots;
      if (slots) {
        return Object.keys(slots)
          .filter(function (key) { return key.startsWith('control-'); })
          .map(function (key) { return slots[key](this$1.slotScope); })
      }
    },
    __getQuickNav: function __getQuickNav (h) {
      var this$1 = this;

      if (this.slidesNumber === 0 || !this.quickNav) {
        return
      }

      var
        slot = this.$scopedSlots['quick-nav'],
        items = [];

      if (slot) {
        var loop = function ( i ) {
          items.push(slot({
            slide: i,
            before: i < this$1.slide,
            current: i === this$1.slide,
            after: i > this$1.slide,
            color: this$1.color,
            goToSlide: function (slide) { this$1.goToSlide(slide || i); }
          }));
        };

        for (var i = 0; i < this.slidesNumber; i++) loop( i );
      }
      else {
        var loop$1 = function ( i ) {
          items.push(h(QBtn, {
            key: i,
            'class': { inactive: i !== this$1.slide },
            props: {
              icon: this$1.quickNavIcon || this$1.$q.icon.carousel.quickNav,
              round: true,
              flat: true,
              dense: true,
              color: this$1.color
            },
            on: {
              click: function () {
                this$1.goToSlide(i);
              }
            }
          }));
        };

        for (var i$1 = 0; i$1 < this.slidesNumber; i$1++) loop$1( i$1 );
      }

      return h('div', {
        staticClass: 'q-carousel-quick-nav absolute-bottom scroll text-center',
        'class': ("text-" + (this.color))
      }, items)
    }
  },
  render: function render (h) {
    return h('div', {
      staticClass: 'q-carousel',
      style: this.computedStyle,
      'class': { fullscreen: this.inFullscreen }
    }, [
      h('div', {
        staticClass: 'q-carousel-inner',
        directives: this.noSwipe
          ? null
          : [{
            name: 'touch-pan',
            modifiers: { horizontal: true },
            value: this.__pan
          }]
      }, [
        h('div', {
          ref: 'track',
          staticClass: 'q-carousel-track',
          style: this.trackPosition,
          'class': {
            'infinite-left': this.infiniteLeft,
            'infinite-right': this.infiniteRight
          }
        }, [
          h('div', { staticClass: 'q-carousel-slide', style: ("flex: 0 0 " + (100) + "%"), directives: [{ name: 'show', value: this.infiniteRight }] }),
          this.$slots.default,
          h('div', { staticClass: 'q-carousel-slide', style: ("flex: 0 0 " + (100) + "%"), directives: [{ name: 'show', value: this.infiniteLeft }] })
        ])
      ]),
      this.arrows ? h(QBtn, {
        staticClass: 'q-carousel-left-arrow absolute',
        props: { color: this.color, icon: this.$q.icon.carousel.left, fabMini: true, flat: true },
        directives: [{ name: 'show', value: this.canGoToPrevious }],
        on: { click: this.previous }
      }) : null,
      this.arrows ? h(QBtn, {
        staticClass: 'q-carousel-right-arrow absolute',
        props: { color: this.color, icon: this.$q.icon.carousel.right, fabMini: true, flat: true },
        directives: [{ name: 'show', value: this.canGoToNext }],
        on: { click: this.next }
      }) : null,
      this.__getQuickNav(h),
      this.__getScopedSlots(h),
      this.$slots.control
    ])
  },
  mounted: function mounted () {
    var this$1 = this;

    this.__planAutoPlay();
    if (this.handleArrowKeys) {
      this.__setArrowKeys(true);
    }
    this.__stopSlideNumberNotifier = this.$watch('slidesNumber', function (val) {
      this$1.$emit('slides-number', val);
      if (this$1.value >= val) {
        this$1.$emit('input', val - 1);
      }
    }, { immediate: true });
  },
  beforeDestroy: function beforeDestroy () {
    this.__cleanup();
    this.__stopSlideNumberNotifier();
    if (this.handleArrowKeys) {
      this.__setArrowKeys(false);
    }
  }
}

var QCarouselSlide = {
  name: 'q-carousel-slide',
  inject: {
    carousel: {
      default: function default$1 () {
        console.error('QCarouselSlide needs to be child of QCarousel');
      }
    }
  },
  props: {
    imgSrc: String
  },
  computed: {
    computedStyle: function computedStyle () {
      var style = {};
      if (this.imgSrc) {
        style.backgroundImage = "url(" + (this.imgSrc) + ")";
        style.backgroundSize = "cover";
        style.backgroundPosition = "50%";
      }
      if (!this.carousel.inFullscreen && this.carousel.height) {
        style.maxHeight = this.carousel.height;
      }
      return style
    }
  },
  render: function render (h) {
    return h('div', {
      staticClass: 'q-carousel-slide relative-position scroll',
      style: this.computedStyle
    }, this.$slots.default)
  },
  created: function created () {
    this.carousel.__registerSlide();
  },
  beforeDestroy: function beforeDestroy () {
    this.carousel.__unregisterSlide();
  }
}

var QCarouselControl = {
  name: 'q-carousel-control',
  props: {
    position: {
      type: String,
      default: 'bottom-right'
    },
    offset: {
      type: Array,
      default: function () { return [18, 18]; }
    }
  },
  computed: {
    computedClass: function computedClass () {
      return ("absolute-" + (this.position))
    },
    computedStyle: function computedStyle () {
      return {
        margin: ((this.offset[1]) + "px " + (this.offset[0]) + "px")
      }
    }
  },
  render: function render (h) {
    return h('div', {
      staticClass: 'q-carousel-control absolute',
      style: this.computedStyle,
      'class': this.computedClass
    }, this.$slots.default)
  }
}

var QChatMessage = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"q-message",class:{ 'q-message-sent': _vm.sent, 'q-message-received': !_vm.sent }},[(_vm.label)?_c('p',{staticClass:"q-message-label text-center",domProps:{"innerHTML":_vm._s(_vm.label)}}):_vm._e(),_vm._v(" "),(_vm.avatar)?_c('div',{staticClass:"q-message-container row items-end no-wrap"},[_vm._t("avatar",[_c('img',{staticClass:"q-message-avatar",attrs:{"src":_vm.avatar}})]),_vm._v(" "),_c('div',{class:_vm.sizeClass},[(_vm.name)?_c('div',{staticClass:"q-message-name",domProps:{"innerHTML":_vm._s(_vm.name)}}):_vm._e(),_vm._v(" "),_vm._l((_vm.text),function(msg){return _c('div',{key:msg,staticClass:"q-message-text",class:_vm.messageClass},[_c('span',{staticClass:"q-message-text-content",class:_vm.textClass},[_c('div',{domProps:{"innerHTML":_vm._s(msg)}}),_vm._v(" "),(_vm.stamp)?_c('div',{staticClass:"q-message-stamp",domProps:{"innerHTML":_vm._s(_vm.stamp)}}):_vm._e()])])}),_vm._v(" "),(!_vm.text || !_vm.text.length)?_c('div',{staticClass:"q-message-text",class:_vm.messageClass},[_c('span',{staticClass:"q-message-text-content",class:_vm.textClass},[_vm._t("default"),_vm._v(" "),(_vm.stamp)?_c('div',{staticClass:"q-message-stamp",domProps:{"innerHTML":_vm._s(_vm.stamp)}}):_vm._e()],2)]):_vm._e()],2)],2):_vm._e()])},staticRenderFns: [],
  name: 'q-chat-message',
  props: {
    sent: Boolean,
    label: String,

    bgColor: String,
    textColor: String,

    name: String,
    avatar: String,
    text: Array,
    stamp: String,
    size: String
  },
  computed: {
    textClass: function textClass () {
      if (this.textColor) {
        return ("text-" + (this.textColor))
      }
    },
    messageClass: function messageClass () {
      if (this.bgColor) {
        return ("text-" + (this.bgColor))
      }
    },
    sizeClass: function sizeClass () {
      if (this.size) {
        return ("col-" + (this.size))
      }
    }
  }
}

function getDirection$1 (mod) {
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

function updateClasses$1 (el, dir) {
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
      direction: getDirection$1(binding.modifiers),

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
    updateClasses$1(el, ctx.direction);
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
    el.removeEventListener('mousedown', ctx.start);
    el.removeEventListener('touchstart', ctx.start);
    el.removeEventListener('touchmove', ctx.move);
    el.removeEventListener('touchend', ctx.end);
    delete el.__qtouchswipe;
  }
}

var Mixin = {
  directives: {
    TouchSwipe: TouchSwipe
  },
  props: {
    val: {},
    trueValue: { default: true },
    falseValue: { default: false }
  },
  computed: {
    isTrue: function isTrue () {
      return this.modelIsArray
        ? this.index > -1
        : this.value === this.trueValue
    },
    isFalse: function isFalse () {
      return this.modelIsArray
        ? this.index === -1
        : this.value === this.falseValue
    },
    index: function index () {
      if (this.modelIsArray) {
        return this.value.indexOf(this.val)
      }
    },
    modelIsArray: function modelIsArray () {
      return Array.isArray(this.value)
    }
  },
  methods: {
    toggle: function toggle (evt, blur) {
      if ( blur === void 0 ) blur = true;

      if (this.disable) {
        return
      }
      if (evt) {
        stopAndPrevent(evt);
      }
      if (blur) {
        this.$el.blur();
      }

      var val;

      if (this.modelIsArray) {
        if (this.isTrue) {
          val = this.value.slice();
          val.splice(this.index, 1);
        }
        else {
          val = this.value.concat(this.val);
        }
      }
      else if (this.isTrue) {
        val = this.toggleIndeterminate ? this.indeterminateValue : this.falseValue;
      }
      else if (this.isFalse) {
        val = this.trueValue;
      }
      else {
        val = this.falseValue;
      }

      this.__update(val);
    }
  }
}

var OptionMixin = {
  props: {
    value: {
      required: true
    },
    label: String,
    leftLabel: Boolean,
    color: {
      type: String,
      default: 'primary'
    },
    keepColor: Boolean,
    dark: Boolean,
    disable: Boolean,
    noFocus: Boolean,
    checkedIcon: String,
    uncheckedIcon: String
  },
  computed: {
    classes: function classes () {
      return [
        this.$options._componentTag,
        {
          disabled: this.disable,
          reverse: this.leftLabel,
          'q-focusable': this.focusable
        }
      ]
    },
    innerClasses: function innerClasses () {
      if (this.isTrue || this.isIndeterminate) {
        return ['active', ("text-" + (this.color))]
      }
      else {
        var color = this.keepColor
          ? this.color
          : (this.dark ? 'light' : 'dark');

        return ("text-" + color)
      }
    },
    focusable: function focusable () {
      return !this.noFocus && !this.disable
    },
    tabindex: function tabindex () {
      return this.focusable ? 0 : -1
    }
  },
  methods: {
    __update: function __update (val, change) {
      var ref = this.$refs.ripple;
      if (ref) {
        ref.classList.add('active');
        setTimeout(function () {
          ref.classList.remove('active');
        }, 10);
      }

      this.$emit('input', val);
      if (change) {
        this.$emit('change', val);
      }
    },
    __onKeydown: function __onKeydown (evt) {
      var key = getEventKey(evt);
      if (key === 13 /* enter */ || key === 32 /* spacebar */) {
        this.toggle(evt, false);
      }
    }
  },
  render: function render (h) {
    var this$1 = this;

    return h('div', {
      staticClass: 'q-option cursor-pointer no-outline row inline no-wrap items-center',
      'class': this.classes,
      attrs: { tabindex: this.tabindex },
      on: {
        click: this.toggle,
        focus: function () { this$1.$emit('focus'); },
        blur: function () { this$1.$emit('blur'); },
        keydown: this.__onKeydown
      },
      directives: this.$options._componentTag === 'q-toggle'
        ? [{
          name: 'touch-swipe',
          modifiers: { horizontal: true },
          value: this.__swipe
        }]
        : null
    }, [
      h('div', {
        staticClass: 'q-option-inner relative-position',
        'class': this.innerClasses
      }, [
        h('input', {
          attrs: { type: 'checkbox' },
          on: { change: this.toggle }
        }),
        h('div', { staticClass: 'q-focus-helper' }),
        this.__getContent(h)
      ]),

      this.label
        ? h('span', { staticClass: 'q-option-label', domProps: { innerHTML: this.label } })
        : null,

      this.$slots.default
    ])
  }
}

var QCheckbox = {
  name: 'q-checkbox',
  mixins: [Mixin, OptionMixin],
  props: {
    toggleIndeterminate: Boolean,
    indeterminateValue: { default: null },
    indeterminateIcon: String
  },
  computed: {
    isIndeterminate: function isIndeterminate () {
      return this.value === void 0 || this.value === this.indeterminateValue
    },
    checkedStyle: function checkedStyle () {
      return this.isTrue
        ? {transition: 'opacity 0ms cubic-bezier(0.23, 1, 0.32, 1) 0ms, transform 800ms cubic-bezier(0.23, 1, 0.32, 1) 0ms', opacity: 1, transform: 'scale(1)'}
        : {transition: 'opacity 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms, transform 0ms cubic-bezier(0.23, 1, 0.32, 1) 450ms', opacity: 0, transform: 'scale(0)'}
    },
    indeterminateStyle: function indeterminateStyle () {
      return this.isIndeterminate
        ? {transition: 'opacity 0ms cubic-bezier(0.23, 1, 0.32, 1) 0ms, transform 800ms cubic-bezier(0.23, 1, 0.32, 1) 0ms', opacity: 1, transform: 'scale(1)'}
        : {transition: 'opacity 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms, transform 0ms cubic-bezier(0.23, 1, 0.32, 1) 450ms', opacity: 0, transform: 'scale(0)'}
    },
    uncheckedStyle: function uncheckedStyle () {
      return this.isFalse
        ? {opacity: 1}
        : {transition: 'opacity 650ms cubic-bezier(0.23, 1, 0.32, 1) 150ms', opacity: 0}
    }
  },
  methods: {
    __getContent: function __getContent (h) {
      return [
        h(QIcon, {
          staticClass: 'q-checkbox-icon cursor-pointer',
          props: { name: this.uncheckedIcon || this.$q.icon.checkbox.unchecked["ios"] },
          style: this.uncheckedStyle
        }),
        h(QIcon, {
          staticClass: 'q-checkbox-icon cursor-pointer absolute-full',
          props: { name: this.indeterminateIcon || this.$q.icon.checkbox.indeterminate["ios"] },
          style: this.indeterminateStyle
        }),
        h(QIcon, {
          staticClass: 'q-checkbox-icon cursor-pointer absolute-full',
          props: { name: this.checkedIcon || this.$q.icon.checkbox.checked["ios"] },
          style: this.checkedStyle
        }),
        null
      ]
    }
  }
}

var QChip = {
  name: 'q-chip',
  props: {
    small: Boolean,
    tag: Boolean,
    square: Boolean,
    floating: Boolean,
    pointing: {
      type: String,
      validator: function (v) { return ['up', 'right', 'down', 'left'].includes(v); }
    },
    color: String,
    textColor: String,
    icon: String,
    iconRight: String,
    avatar: String,
    closable: Boolean,
    detail: Boolean
  },
  computed: {
    classes: function classes () {
      var cls = [{
        tag: this.tag,
        square: this.square,
        floating: this.floating,
        pointing: this.pointing,
        small: this.small || this.floating
      }];
      this.pointing && cls.push(("pointing-" + (this.pointing)));
      if (this.color) {
        cls.push(("bg-" + (this.color)));
        !this.textColor && cls.push("text-white");
      }
      if (this.textColor) {
        cls.push(("text-" + (this.textColor)));
      }
      return cls
    }
  },
  methods: {
    __onClick: function __onClick (e) {
      this.$emit('click', e);
    },
    __onMouseDown: function __onMouseDown (e) {
      this.$emit('focus', e);
    }
  },
  render: function render (h) {
    var this$1 = this;

    return h('div', {
      staticClass: 'q-chip row no-wrap inline items-center',
      'class': this.classes,
      on: {
        mousedown: this.__onMouseDown,
        touchstart: this.__onMouseDown,
        click: this.__onClick
      }
    }, [
      this.icon || this.avatar
        ? h('div', {
          staticClass: 'q-chip-side chip-left row flex-center',
          'class': { 'chip-detail': this.detail }
        }, [
          this.icon
            ? h(QIcon, { props: { name: this.icon } })
            : (this.avatar ? h('img', { domProps: { src: this.avatar } }) : null)
        ])
        : null,

      h('div', { staticClass: 'q-chip-main' }, [
        this.$slots.default
      ]),

      this.iconRight
        ? h(QIcon, {
          props: { name: this.iconRight },
          staticClass: 'on-right'
        })
        : null,

      this.closable
        ? h('div', { staticClass: 'q-chip-side chip-right row flex-center' }, [
          h(QIcon, {
            props: { name: this.$q.icon.chip.close },
            staticClass: 'cursor-pointer',
            nativeOn: {
              click: function (e) {
                e && e.stopPropagation();
                this$1.$emit('hide');
              }
            }
          })
        ])
        : null
    ])
  }
}

var marginal = {
  type: Array,
  validator: function (v) { return v.every(function (i) { return 'icon' in i; }); }
};

var align = {
  left: 'start',
  center: 'center',
  right: 'end'
};

var FrameMixin = {
  components: {
    QIcon: QIcon
  },
  props: {
    prefix: String,
    suffix: String,
    stackLabel: String,
    floatLabel: String,
    error: Boolean,
    warning: Boolean,
    disable: Boolean,
    color: {
      type: String,
      default: 'primary'
    },
    dark: {
      type: Boolean,
      default: null
    },
    before: marginal,
    after: marginal,
    inverted: Boolean,
    hideUnderline: Boolean,
    align: {
      type: String,
      default: 'left',
      validator: function (v) { return ['left', 'center', 'right'].includes(v); }
    }
  },
  computed: {
    labelIsAbove: function labelIsAbove () {
      return this.focused || this.length || this.additionalLength || this.stackLabel
    },
    alignClass: function alignClass () {
      return ("justify-" + (align[this.align]))
    }
  }
}

var InputMixin = {
  props: {
    autofocus: [Boolean, String],
    name: String,
    maxLength: [Number, String],
    maxHeight: Number,
    placeholder: String,
    loading: Boolean
  },
  data: function data () {
    return {
      focused: false,
      timer: null,
      isNumberError: false
    }
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
    select: function select () {
      this.$refs.input.select();
    },

    __onFocus: function __onFocus (e) {
      clearTimeout(this.timer);
      this.focused = true;
      this.$emit('focus', e);
    },
    __onInputBlur: function __onInputBlur (e) {
      var this$1 = this;

      clearTimeout(this.timer);
      this.timer = setTimeout(function () {
        this$1.__onBlur(e);
      }, 200);
    },
    __onBlur: function __onBlur (e) {
      this.focused = false;
      this.$emit('blur', e);
      var model = this.isNumber && this.isNumberError ? null : this.model;
      if (JSON.stringify(model) !== JSON.stringify(this.value)) {
        this.$emit('input', model);
      }
      this.$emit('change', model);
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
        if (this$1.autofocus === 'select') {
          input.select();
        }
      }
    });
  },
  beforeDestroy: function beforeDestroy () {
    clearTimeout(this.timer);
  }
}

var QInputFrame = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"q-if row no-wrap items-center relative-position",class:_vm.classes,attrs:{"tabindex":_vm.focusable && !_vm.disable ? 0 : -1},on:{"click":_vm.__onClick}},[(_vm.before)?_vm._l((_vm.before),function(item){return _c('q-icon',{key:("b" + (item.icon)),staticClass:"q-if-control q-if-control-before",class:{hidden: _vm.__additionalHidden(item, _vm.hasError, _vm.hasWarning, _vm.length)},attrs:{"name":item.icon},nativeOn:{"mousedown":function($event){_vm.__onMouseDown($event);},"touchstart":function($event){_vm.__onMouseDown($event);},"click":function($event){_vm.__baHandler($event, item);}}})}):_vm._e(),_vm._v(" "),_c('div',{staticClass:"q-if-inner col row no-wrap items-center relative-position"},[(_vm.hasLabel)?_c('div',{staticClass:"q-if-label ellipsis full-width absolute self-start",class:{'q-if-label-above': _vm.labelIsAbove},domProps:{"innerHTML":_vm._s(_vm.label)}}):_vm._e(),_vm._v(" "),(_vm.prefix)?_c('span',{staticClass:"q-if-addon q-if-addon-left",class:_vm.addonClass,domProps:{"innerHTML":_vm._s(_vm.prefix)}}):_vm._e(),_vm._v(" "),_vm._t("default"),_vm._v(" "),(_vm.suffix)?_c('span',{staticClass:"q-if-addon q-if-addon-right",class:_vm.addonClass,domProps:{"innerHTML":_vm._s(_vm.suffix)}}):_vm._e()],2),_vm._v(" "),_vm._t("after"),_vm._v(" "),(_vm.after)?_vm._l((_vm.after),function(item){return _c('q-icon',{key:("a" + (item.icon)),staticClass:"q-if-control",class:{hidden: _vm.__additionalHidden(item, _vm.hasError, _vm.hasWarning, _vm.length)},attrs:{"name":item.icon},nativeOn:{"mousedown":function($event){_vm.__onMouseDown($event);},"touchstart":function($event){_vm.__onMouseDown($event);},"click":function($event){_vm.__baHandler($event, item);}}})}):_vm._e()],2)},staticRenderFns: [],
  name: 'q-input-frame',
  mixins: [FrameMixin],
  props: {
    topAddons: Boolean,
    focused: Boolean,
    length: Number,
    focusable: Boolean,
    additionalLength: Boolean
  },
  data: function data () {
    return {
      field: {}
    }
  },
  inject: {
    __field: { default: null }
  },
  computed: {
    hasStackLabel: function hasStackLabel () {
      return typeof this.stackLabel === 'string' && this.stackLabel.length > 0
    },
    hasLabel: function hasLabel () {
      return this.hasStackLabel || (typeof this.floatLabel === 'string' && this.floatLabel.length > 0)
    },
    label: function label () {
      return this.hasStackLabel ? this.stackLabel : this.floatLabel
    },
    addonClass: function addonClass () {
      return {
        'q-if-addon-visible': !this.hasLabel || this.labelIsAbove,
        'self-start': this.topAddons
      }
    },
    classes: function classes () {
      var cls = [{
        'q-if-has-label': this.label,
        'q-if-focused': this.focused,
        'q-if-error': this.hasError,
        'q-if-warning': this.hasWarning,
        'q-if-disabled': this.disable,
        'q-if-focusable': this.focusable && !this.disable,
        'q-if-inverted': this.inverted,
        'q-if-dark': this.dark || (this.inverted && this.dark !== false),
        'q-if-hide-underline': this.hideUnderline
      }];

      var color = this.hasError ? 'negative' : this.hasWarning ? 'warning' : this.color;
      if (this.inverted) {
        cls.push(("bg-" + color));
        if (this.dark !== false) {
          cls.push("text-white");
        }
      }
      else {
        cls.push(("text-" + color));
      }
      return cls
    },
    hasError: function hasError () {
      return !!(this.field.error || this.error)
    },
    hasWarning: function hasWarning () {
      // error is the higher priority
      return !!(!this.hasError && (this.field.warning || this.warning))
    }
  },
  methods: {
    __onClick: function __onClick (e) {
      this.$emit('click', e);
    },
    __onMouseDown: function __onMouseDown (e) {
      var this$1 = this;

      this.$nextTick(function () { return this$1.$emit('focus', e); });
    },
    __additionalHidden: function __additionalHidden (item, hasError, hasWarning, length) {
      if (item.condition !== void 0) {
        return item.condition === false
      }
      return (
        (item.content !== void 0 && !item.content === (length > 0)) ||
        (item.error !== void 0 && !item.error === hasError) ||
        (item.warning !== void 0 && !item.warning === hasWarning)
      )
    },
    __baHandler: function __baHandler (evt, item) {
      if (!item.allowPropagation) {
        evt.stopPropagation();
      }
      if (item.handler) {
        item.handler(evt);
      }
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
}

var QChipsInput = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('q-input-frame',{staticClass:"q-chips-input",attrs:{"prefix":_vm.prefix,"suffix":_vm.suffix,"stack-label":_vm.stackLabel,"float-label":_vm.floatLabel,"error":_vm.error,"warning":_vm.warning,"disable":_vm.disable,"inverted":_vm.inverted,"dark":_vm.dark,"hide-underline":_vm.hideUnderline,"before":_vm.before,"after":_vm.after,"color":_vm.inverted ? _vm.frameColor || _vm.color : _vm.color,"focused":_vm.focused,"length":_vm.length,"additional-length":_vm.input.length > 0},on:{"click":_vm.__onClick}},[_c('div',{staticClass:"col row items-center group q-input-chips"},[_vm._l((_vm.model),function(label,index){return _c('q-chip',{key:label,attrs:{"small":"","closable":!_vm.disable,"color":_vm.color},on:{"focus":_vm.__clearTimer,"hide":function($event){_vm.remove(index);}}},[_vm._v(" "+_vm._s(label)+" ")])}),_vm._v(" "),_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.input),expression:"input"}],ref:"input",staticClass:"col q-input-target",class:[("text-" + (_vm.align))],attrs:{"name":_vm.name,"placeholder":_vm.inputPlaceholder,"disabled":_vm.disable,"max-length":_vm.maxLength},domProps:{"value":(_vm.input)},on:{"focus":_vm.__onFocus,"blur":_vm.__onInputBlur,"keydown":_vm.__handleKey,"keyup":_vm.__onKeyup,"input":function($event){if($event.target.composing){ return; }_vm.input=$event.target.value;}}})],2),_vm._v(" "),(!_vm.disable)?_c('q-icon',{staticClass:"q-if-control self-end",class:{invisible: !_vm.input.length},attrs:{"slot":"after","name":"send"},on:{"mousedown":_vm.__clearTimer,"touchstart":_vm.__clearTimer,"click":function($event){_vm.add();}},slot:"after"}):_vm._e()],1)},staticRenderFns: [],
  name: 'q-chips-input',
  mixins: [FrameMixin, InputMixin],
  components: {
    QInputFrame: QInputFrame,
    QChip: QChip
  },
  props: {
    value: {
      type: Array,
      required: true
    },
    frameColor: String
  },
  data: function data () {
    return {
      input: '',
      model: [].concat( this.value )
    }
  },
  watch: {
    value: function value (v) {
      if (Array.isArray(v)) {
        this.model = [].concat( v );
      }
      else {
        this.model = [];
      }
    }
  },
  computed: {
    length: function length () {
      return this.model
        ? this.model.length
        : 0
    }
  },
  methods: {
    add: function add (value) {
      if ( value === void 0 ) value = this.input;

      clearTimeout(this.timer);
      this.focus();
      if (!this.disable && value) {
        this.model.push(value);
        this.$emit('input', this.model);
        this.input = '';
      }
    },
    remove: function remove (index) {
      clearTimeout(this.timer);
      this.focus();
      if (!this.disable && index >= 0 && index < this.length) {
        this.model.splice(index, 1);
        this.$emit('input', this.model);
      }
    },
    __clearTimer: function __clearTimer () {
      var this$1 = this;

      this.$nextTick(function () { return clearTimeout(this$1.timer); });
    },
    __handleKey: function __handleKey (e) {
      // ENTER key
      if (e.which === 13 || e.keyCode === 13) {
        e.preventDefault();
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
}

function getHeight (el, style) {
  var initial = {
    visibility: el.style.visibility,
    maxHeight: el.style.maxHeight
  };

  css(el, {
    visibility: 'hidden',
    maxHeight: ''
  });
  var height$$1 = style.height;
  css(el, initial);

  return parseFloat(height$$1)
}

function parseSize (padding) {
  return padding.split(' ').map(function (t) {
    var unit = t.match(/[a-zA-Z]+/) || '';
    if (unit) {
      unit = unit[0];
    }
    return [parseFloat(t), unit]
  })
}

function toggleSlide (el, showing, done) {
  var store = el.__qslidetoggle || {};
  function anim () {
    store.uid = start({
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
  var style = window.getComputedStyle(el);
  if (style.padding && style.padding !== '0px') {
    store.padding = parseSize(style.padding);
  }
  if (style.margin && style.margin !== '0px') {
    store.margin = parseSize(style.margin);
  }
  store.height = getHeight(el, style);
  store.pos = null;
  el.style.overflowY = 'hidden';
  anim();
}

var QSlideTransition = {
  name: 'q-slide-transition',
  props: {
    appear: Boolean
  },
  render: function render (h) {
    return h('transition', {
      props: {
        mode: 'out-in',
        css: false,
        appear: this.appear
      },
      on: {
        enter: function enter (el, done) {
          toggleSlide(el, true, done);
        },
        leave: function leave (el, done) {
          toggleSlide(el, false, done);
        }
      }
    }, this.$slots.default)
  }
}

var eventName = 'q:collapsible:close';

var QCollapsible = {
  name: 'q-collapsible',
  mixins: [ModelToggleMixin],
  modelToggle: {
    history: false
  },
  directives: {
    Ripple: Ripple
  },
  props: {
    disable: Boolean,
    popup: Boolean,
    indent: Boolean,
    group: String,
    iconToggle: Boolean,
    separator: Boolean,
    insetSeparator: Boolean,
    noRipple: Boolean,
    collapseIcon: String,

    dense: Boolean,
    sparse: Boolean,
    multiline: Boolean,

    icon: String,
    rightIcon: String,
    image: String,
    rightImage: String,
    avatar: String,
    rightAvatar: String,
    letter: String,
    rightLetter: String,
    label: String,
    sublabel: String,
    labelLines: [String, Number],
    sublabelLines: [String, Number],

    headerStyle: [Array, String, Object],
    headerClass: [Array, String, Object]
  },
  computed: {
    cfg: function cfg () {
      return {
        link: !this.iconToggle,

        dark: this.dark,
        dense: this.dense,
        sparse: this.sparse,
        multiline: this.multiline,

        icon: this.icon,
        rightIcon: this.rightIcon,
        image: this.image,
        rightImage: this.rightImage,
        avatar: this.avatar,
        rightAvatar: this.rightAvatar,
        letter: this.letter,
        rightLetter: this.rightLetter,

        label: this.label,
        sublabel: this.sublabel,
        labelLines: this.labelLines,
        sublabelLines: this.sublabelLines
      }
    },
    hasRipple: function hasRipple () {
      return "ios" === 'mat' && !this.noRipple && !this.disable
    },
    classes: function classes () {
      return {
        'q-collapsible-opened': this.popup && this.showing,
        'q-collapsible-closed': this.popup && !this.showing,
        'q-item-separator': this.separator,
        'q-item-inset-separator': this.insetSeparator,
        disabled: this.disable
      }
    }
  },
  watch: {
    showing: function showing (val) {
      if (val && this.group) {
        this.$root.$emit(eventName, this);
      }
    }
  },
  methods: {
    __toggleItem: function __toggleItem () {
      if (!this.iconToggle) {
        this.toggle();
      }
    },
    __toggleIcon: function __toggleIcon (e) {
      if (this.iconToggle) {
        e && e.stopPropagation();
        this.toggle();
      }
    },
    __eventHandler: function __eventHandler (comp) {
      if (this.group && this !== comp && comp.group === this.group) {
        this.hide();
      }
    },
    __getToggleSide: function __getToggleSide (h, slot) {
      return [
        h(QItemTile, {
          slot: slot ? 'right' : undefined,
          staticClass: 'cursor-pointer transition-generic relative-position',
          'class': {
            'rotate-180': this.showing,
            invisible: this.disable
          },
          nativeOn: {
            click: this.__toggleIcon
          },
          props: { icon: this.collapseIcon || this.$q.icon.collapsible.icon },
          directives: this.iconToggle && this.hasRipple
            ? [{ name: 'ripple' }]
            : null
        })
      ]
    },
    __getItemProps: function __getItemProps (wrapper) {
      return {
        props: wrapper
          ? { cfg: this.cfg }
          : { link: !this.iconToggle },
        style: this.headerStyle,
        'class': this.headerClass,
        nativeOn: {
          click: this.__toggleItem
        },
        directives: this.hasRipple && !this.iconToggle
          ? [{ name: 'ripple' }]
          : null
      }
    }
  },
  created: function created () {
    this.$root.$on(eventName, this.__eventHandler);
    if (this.value) {
      this.show();
    }
  },
  beforeDestroy: function beforeDestroy () {
    this.$root.$off(eventName, this.__eventHandler);
  },
  render: function render (h) {
    return h('div', {
      staticClass: 'q-collapsible q-item-division relative-position',
      'class': this.classes
    }, [
      h('div', {
        staticClass: 'q-collapsible-inner'
      }, [
        this.$slots.header
          ? h(QItem, this.__getItemProps(), [
            this.$slots.header,
            h(QItemSide, { props: { right: true }, staticClass: 'relative-position' }, this.__getToggleSide(h))
          ])
          : h(QItemWrapper, this.__getItemProps(true), this.__getToggleSide(h, true)),

        h(QSlideTransition, [
          h('div', {
            directives: [{ name: 'show', value: this.showing }]
          }, [
            h('div', {
              staticClass: 'q-collapsible-sub-item relative-position',
              'class': { indent: this.indent }
            }, [
              this.$slots.default
            ])
          ])
        ])
      ])
    ])
  }
}

function getPercentage (event, dragging) {
  return between((position(event).left - dragging.left) / dragging.width, 0, 1)
}

function notDivides (res, decimals) {
  var number = decimals
    ? parseFloat(res.toFixed(decimals))
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
  directives: {
    TouchPan: TouchPan
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
    fillHandleAlways: Boolean,
    error: Boolean,
    readonly: Boolean,
    disable: Boolean
  },
  data: function data () {
    return {
      clickDisabled: false
    }
  },
  computed: {
    editable: function editable () {
      return !this.disable && !this.readonly
    },
    classes: function classes () {
      var cls = {
        disabled: this.disable,
        readonly: this.readonly,
        'label-always': this.labelAlways,
        'has-error': this.error
      };

      if (!this.error && this.color) {
        cls[("text-" + (this.color))] = true;
      }

      return cls
    },
    markersLen: function markersLen () {
      return (this.max - this.min) / this.step + 1
    },
    labelColor: function labelColor () {
      return this.error
        ? 'negative'
        : this.color || 'primary'
    }
  },
  methods: {
    __pan: function __pan (event) {
      var this$1 = this;

      if (event.isFinal) {
        this.clickDisabled = true;
        this.$nextTick(function () {
          this$1.clickDisabled = false;
        });
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
      if (this.clickDisabled) {
        return
      }
      this.__setActive(event);
      this.__end(event);
    },
    __getMarkers: function __getMarkers (h) {
      var this$1 = this;

      if (!this.markers) {
        return
      }

      var markers = [];

      for (var i = 0; i < this.markersLen; i++) {
        markers.push(h('div', {
          staticClass: 'q-slider-mark',
          key: ("marker" + i),
          style: {
            left: ((i * 100 * this$1.step / (this$1.max - this$1.min)) + "%")
          }
        }));
      }

      return markers
    }
  },
  created: function created () {
    this.__validateProps();
  },
  render: function render (h) {
    return h('div', {
      staticClass: 'q-slider non-selectable',
      'class': this.classes,
      on: this.editable ? { click: this.__click } : null,
      directives: this.editable
        ? [{
          name: 'touch-pan',
          modifiers: { horizontal: true },
          value: this.__pan
        }]
        : null
    }, [
      h('div', {
        ref: 'handle',
        staticClass: 'q-slider-handle-container'
      }, [
        h('div', { staticClass: 'q-slider-track' }),
        this.__getMarkers(h)
      ].concat(this.__getContent(h)))
    ])
  }
};

var QSlider = {
  name: 'q-slider',
  mixins: [mixin$1],
  props: {
    value: {
      type: Number,
      required: true
    },
    labelValue: String
  },
  data: function data () {
    return {
      model: this.value,
      dragging: false,
      currentPercentage: (this.value - this.min) / (this.max - this.min)
    }
  },
  computed: {
    percentage: function percentage () {
      if (this.snap) {
        return (this.model - this.min) / (this.max - this.min) * 100 + '%'
      }
      return 100 * this.currentPercentage + '%'
    },
    displayValue: function displayValue () {
      return this.labelValue !== void 0
        ? this.labelValue
        : this.model
    }
  },
  watch: {
    value: function value (value$1) {
      if (this.dragging) {
        return
      }
      if (value$1 < this.min) {
        this.model = this.min;
      }
      else if (value$1 > this.max) {
        this.model = this.max;
      }
      else {
        this.model = value$1;
      }
      this.currentPercentage = (this.model - this.min) / (this.max - this.min);
    },
    min: function min (value) {
      if (this.model < value) {
        this.model = value;
        return
      }
      this.$nextTick(this.__validateProps);
    },
    max: function max (value) {
      if (this.model > value) {
        this.model = value;
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
      if (model !== this.model) {
        this.$emit('input', model);
        this.model = model;
      }
    },
    __end: function __end () {
      this.dragging = false;
      this.currentPercentage = (this.model - this.min) / (this.max - this.min);
      this.$emit('change', this.model);
    },
    __validateProps: function __validateProps () {
      if (this.min >= this.max) {
        console.error('Range error: min >= max', this.$el, this.min, this.max);
      }
      else if (notDivides((this.max - this.min) / this.step, this.decimals)) {
        console.error('Range error: step must be a divisor of max - min', this.min, this.max, this.step, this.decimals);
      }
    },
    __getContent: function __getContent (h) {
      return [
        h('div', {
          staticClass: 'q-slider-track active-track',
          style: { width: this.percentage },
          'class': {
            'no-transition': this.dragging,
            'handle-at-minimum': this.model === this.min
          }
        }),
        h('div', {
          staticClass: 'q-slider-handle',
          style: {
            left: this.percentage,
            borderRadius: this.square ? '0' : '50%'
          },
          'class': {
            dragging: this.dragging,
            'handle-at-minimum': !this.fillHandleAlways && this.model === this.min
          }
        }, [
          this.label || this.labelAlways
            ? h(QChip, {
              staticClass: 'q-slider-label no-pointer-events',
              'class': { 'label-always': this.labelAlways },
              props: {
                pointing: 'down',
                square: true,
                color: this.labelColor
              }
            }, [ this.displayValue ])
            : null,
          null
        ])
      ]
    }
  }
}

function throttle (fn, limit) {
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
}

function clone (data) {
  var s = JSON.stringify(data);
  return s === void 0 ? s : JSON.parse(JSON.stringify(data))
}

function rgbToHex (ref) {
  var r = ref.r;
  var g = ref.g;
  var b = ref.b;
  var a = ref.a;

  var alpha = a !== void 0;

  r = Math.round(r);
  g = Math.round(g);
  b = Math.round(b);

  if (
    r > 255 ||
    g > 255 ||
    b > 255 ||
    (alpha && a > 100)
  ) {
    throw new TypeError('Expected 3 numbers below 256 (and optionally one below 100)')
  }

  a = alpha
    ? (Math.round(255 * a / 100) | 1 << 8).toString(16).slice(1)
    : '';

  return '#' + ((b | g << 8 | r << 16) | 1 << 24).toString(16).slice(1) + a
}

function hexToRgb (hex) {
  if (typeof hex !== 'string') {
    throw new TypeError('Expected a string')
  }

  hex = hex.replace(/^#/, '');

  if (hex.length === 3) {
    hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
  }
  else if (hex.length === 4) {
    hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2] + hex[3] + hex[3];
  }

  var num = parseInt(hex, 16);

  return hex.length > 6
    ? {r: num >> 24 & 255, g: num >> 16 & 255, b: num >> 8 & 255, a: Math.round((num & 255) / 2.55)}
    : {r: num >> 16, g: num >> 8 & 255, b: num & 255}
}

function hsvToRgb (ref) {
  var h = ref.h;
  var s = ref.s;
  var v = ref.v;
  var a = ref.a;

  var r, g, b, i, f, p, q, t;
  s = s / 100;
  v = v / 100;

  h = h / 360;
  i = Math.floor(h * 6);
  f = h * 6 - i;
  p = v * (1 - s);
  q = v * (1 - f * s);
  t = v * (1 - (1 - f) * s);

  switch (i % 6) {
    case 0:
      r = v;
      g = t;
      b = p;
      break
    case 1:
      r = q;
      g = v;
      b = p;
      break
    case 2:
      r = p;
      g = v;
      b = t;
      break
    case 3:
      r = p;
      g = q;
      b = v;
      break
    case 4:
      r = t;
      g = p;
      b = v;
      break
    case 5:
      r = v;
      g = p;
      b = q;
      break
  }

  return {
    r: Math.round(r * 255),
    g: Math.round(g * 255),
    b: Math.round(b * 255),
    a: a
  }
}

function rgbToHsv (ref) {
  var r = ref.r;
  var g = ref.g;
  var b = ref.b;
  var a = ref.a;

  var
    max = Math.max(r, g, b), min = Math.min(r, g, b),
    d = max - min,
    h,
    s = (max === 0 ? 0 : d / max),
    v = max / 255;

  switch (max) {
    case min:
      h = 0;
      break
    case r:
      h = (g - b) + d * (g < b ? 6 : 0);
      h /= 6 * d;
      break
    case g:
      h = (b - r) + d * 2;
      h /= 6 * d;
      break
    case b:
      h = (r - g) + d * 4;
      h /= 6 * d;
      break
  }

  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    v: Math.round(v * 100),
    a: a
  }
}


var colors = Object.freeze({
	rgbToHex: rgbToHex,
	hexToRgb: hexToRgb,
	hsvToRgb: hsvToRgb,
	rgbToHsv: rgbToHsv
});

var QColorPicker = {
  name: 'q-color-picker',
  directives: {
    TouchPan: TouchPan
  },
  props: {
    value: {
      type: [String, Object],
      required: true
    },
    color: {
      type: String,
      default: 'primary'
    },
    disable: Boolean,
    readonly: Boolean
  },
  data: function data () {
    return {
      view: !this.value || typeof this.value === 'string' ? 'hex' : 'rgb',
      model: this.__parseModel(this.value),
      inputError: {
        hex: false,
        r: false,
        g: false,
        b: false
      }
    }
  },
  watch: {
    value: {
      handler: function handler (v) {
        if (this.avoidModelWatch) {
          this.avoidModelWatch = false;
          return
        }
        var model = this.__parseModel(v);
        if (model.hex !== this.model.hex) {
          this.model = model;
        }
      },
      deep: true
    }
  },
  computed: {
    isHex: function isHex () {
      return typeof this.value === 'string'
    },
    isRgb: function isRgb () {
      return !this.isHex
    },
    editable: function editable () {
      return !this.disable && !this.readonly
    },
    hasAlpha: function hasAlpha () {
      return this.isHex
        ? this.value.length > 7
        : this.value.a !== void 0
    },
    swatchStyle: function swatchStyle () {
      return {
        backgroundColor: ("rgba(" + (this.model.r) + "," + (this.model.g) + "," + (this.model.b) + "," + (this.model.a / 100) + ")")
      }
    },
    saturationStyle: function saturationStyle () {
      return {
        background: ("hsl(" + (this.model.h) + ",100%,50%)")
      }
    },
    saturationPointerStyle: function saturationPointerStyle () {
      return {
        top: ((101 - this.model.v) + "%"),
        left: ((this.model.s) + "%")
      }
    },
    inputsArray: function inputsArray () {
      var inp = ['r', 'g', 'b'];
      if (this.hasAlpha) {
        inp.push('a');
      }
      return inp
    },
    rgbColor: function rgbColor () {
      return ("rgb(" + (this.model.r) + "," + (this.model.g) + "," + (this.model.b) + ")")
    }
  },
  created: function created () {
    this.__saturationChange = throttle(this.__saturationChange, 20);
  },
  render: function render (h) {
    return h('div', {
      staticClass: 'q-color',
      'class': { disabled: this.disable }
    }, [
      this.__getSaturation(h),
      this.__getSliders(h),
      this.__getInputs(h)
    ])
  },
  methods: {
    __getSaturation: function __getSaturation (h) {
      return h('div', {
        ref: 'saturation',
        staticClass: 'q-color-saturation non-selectable relative-position overflow-hidden cursor-pointer',
        style: this.saturationStyle,
        'class': { readonly: !this.editable },
        on: this.editable
          ? { click: this.__saturationClick }
          : null,
        directives: this.editable
          ? [{
            name: 'touch-pan',
            value: this.__saturationPan
          }]
          : null
      }, [
        h('div', { staticClass: 'q-color-saturation-white absolute-full' }),
        h('div', { staticClass: 'q-color-saturation-black absolute-full' }),
        h('div', {
          staticClass: 'absolute',
          style: this.saturationPointerStyle
        }, [
          h('div', { staticClass: 'q-color-saturation-circle' })
        ])
      ])
    },
    __getSliders: function __getSliders (h) {
      var this$1 = this;

      return h('div', {
        staticClass: 'q-color-sliders row items-center'
      }, [
        h('div', {
          staticClass: 'q-color-swatch q-mt-sm q-ml-sm q-mb-sm non-selectable overflow-hidden',
          style: this.swatchStyle
        }),
        h('div', { staticClass: 'col q-pa-sm' }, [
          h('div', { staticClass: 'q-color-hue non-selectable' }, [
            h(QSlider, {
              props: {
                value: this.model.h,
                color: 'white',
                min: 0,
                max: 360,
                fillHandleAlways: true,
                readonly: !this.editable
              },
              on: {
                input: this.__onHueChange,
                change: function (val) { this$1.__onHueChange(val, true); }
              }
            })
          ]),
          this.hasAlpha
            ? h('div', { staticClass: 'q-color-alpha non-selectable' }, [
              h(QSlider, {
                props: {
                  value: this.model.a,
                  color: 'white',
                  min: 0,
                  max: 100,
                  fillHandleAlways: true,
                  readonly: !this.editable
                },
                on: {
                  input: function (value) {
                    this$1.__onNumericChange({ target: { value: value } }, 'a', 100);
                  },
                  change: function (value) {
                    this$1.__onNumericChange({ target: { value: value } }, 'a', 100, true);
                  }
                }
              })
            ])
            : null
        ])
      ])
    },
    __getNumericInputs: function __getNumericInputs (h) {
      var this$1 = this;

      return this.inputsArray.map(function (type) {
        var max = type === 'a' ? 100 : 255;
        return h('div', { staticClass: 'col q-color-padding' }, [
          h('input', {
            attrs: {
              type: 'number',
              min: 0,
              max: max,
              readonly: !this$1.editable
            },
            staticClass: 'full-width text-center q-color-number',
            domProps: {
              value: Math.round(this$1.model[type])
            },
            on: {
              input: function (evt) {
                this$1.__onNumericChange(evt, type, max);
              },
              blur: function (evt) {
                this$1.__onNumericChange(evt, type, max, true);
              }
            }
          }),
          h('div', { staticClass: 'q-color-label text-center uppercase' }, [
            type
          ])
        ])
      })
    },
    __getInputs: function __getInputs (h) {
      var this$1 = this;

      var inputs = this.view === 'hex'
        ? [
          h('div', { staticClass: 'col' }, [
            h('input', {
              domProps: { value: this.model.hex },
              attrs: { readonly: !this.editable },
              on: {
                input: this.__onHexChange,
                blur: function (evt) { console.log('blur'); this$1.__onHexChange(evt, true); }
              },
              staticClass: 'full-width text-center uppercase'
            }),
            h('div', { staticClass: 'q-color-label text-center' }, [
              ("HEX" + (this.hasAlpha ? ' / A' : ''))
            ])
          ])
        ]
        : this.__getNumericInputs(h);

      return h('div', {
        staticClass: 'q-color-inputs row items-center q-px-sm q-pb-sm'
      }, [
        h('div', { staticClass: 'col q-mr-sm row no-wrap' }, inputs),
        h('div', [
          h(QBtn, {
            props: {
              flat: true,
              color: 'grey-7'
            },
            on: {
              click: this.__nextInputView
            },
            staticClass: 'q-pa-none'
          }, [
            h('svg', {
              attrs: {
                viewBox: '0 0 24 24'
              },
              style: {width: '24px', height: '24px'}
            }, [
              h('path', {
                attrs: {
                  fill: 'currentColor',
                  d: 'M12,18.17L8.83,15L7.42,16.41L12,21L16.59,16.41L15.17,15M12,5.83L15.17,9L16.58,7.59L12,3L7.41,7.59L8.83,9L12,5.83Z'
                }
              })
            ])
          ])
        ])
      ])
    },

    __onSaturationChange: function __onSaturationChange (left, top, change) {
      var
        panel = this.$refs.saturation,
        width = panel.clientWidth,
        height = panel.clientHeight,
        rect = panel.getBoundingClientRect(),
        x = Math.min(width, Math.max(0, left - rect.left)),
        y = Math.min(height, Math.max(0, top - rect.top)),
        s = Math.round(100 * x / width),
        v = Math.round(100 * Math.max(0, Math.min(1, -(y / height) + 1))),
        rgb = hsvToRgb({
          h: this.model.h,
          s: s,
          v: v,
          a: this.hasAlpha ? this.model.a : void 0
        });

      this.model.s = s;
      this.model.v = v;
      this.__update(rgb, rgbToHex(rgb), change);
    },
    __onHueChange: function __onHueChange (h, change) {
      h = Math.round(h);
      var val = hsvToRgb({
        h: h,
        s: this.model.s,
        v: this.model.v,
        a: this.hasAlpha ? this.model.a : void 0
      });

      this.model.h = h;
      this.__update(val, rgbToHex(val), change);
    },
    __onNumericChange: function __onNumericChange (evt, type, max, change) {
      var val = Number(evt.target.value);
      if (isNaN(val)) {
        return
      }

      val = Math.floor(val);
      if (val < 0 || val > max) {
        if (change) {
          this.$forceUpdate();
        }
        return
      }

      var rgb = {
        r: type === 'r' ? val : this.model.r,
        g: type === 'g' ? val : this.model.g,
        b: type === 'b' ? val : this.model.b,
        a: this.hasAlpha
          ? (type === 'a' ? val : this.model.a)
          : void 0
      };
      if (type !== 'a') {
        var hsv = rgbToHsv(rgb);
        this.model.h = hsv.h;
        this.model.s = hsv.s;
        this.model.v = hsv.v;
      }
      this.__update(rgb, rgbToHex(rgb), change);
    },
    __onHexChange: function __onHexChange (evt, change) {
      var
        hex = evt.target.value,
        len = hex.length,
        edges = this.hasAlpha ? [5, 9] : [4, 7];

      if (len !== edges[0] && len !== edges[1]) {
        if (change) {
          this.$forceUpdate();
        }
        return
      }

      var
        rgb = hexToRgb(hex),
        hsv = rgbToHsv(rgb);

      this.model.h = hsv.h;
      this.model.s = hsv.s;
      this.model.v = hsv.v;
      this.__update(rgb, hex, change);
    },
    __update: function __update (rgb, hex, change) {
      // update internally
      this.model.hex = hex;
      this.model.r = rgb.r;
      this.model.g = rgb.g;
      this.model.b = rgb.b;
      if (this.hasAlpha) {
        this.model.a = rgb.a;
      }

      // avoid recomputing
      this.avoidModelWatch = true;

      // emit new value
      var val = this.isHex ? hex : rgb;

      this.$emit('input', val);
      if (change) {
        this.$emit('change', val);
      }
    },
    __nextInputView: function __nextInputView () {
      this.view = this.view === 'hex' ? 'rgba' : 'hex';
    },
    __parseModel: function __parseModel (v) {
      var model;
      if (typeof v === 'string') {
        model = hexToRgb(v);
        model.hex = v;
      }
      else {
        model = clone(v);
        model.hex = rgbToHex(v);
      }
      return extend$1({ a: 100 }, model, rgbToHsv(model))
    },

    __saturationPan: function __saturationPan (evt) {
      if (evt.isFinal) {
        this.__dragStop(evt);
      }
      else if (evt.isFirst) {
        this.__dragStart(evt);
      }
      else {
        this.__dragMove(evt);
      }
    },
    __dragStart: function __dragStart (event) {
      stopAndPrevent(event.evt);

      this.saturationDragging = true;
      this.__saturationChange(event);
    },
    __dragMove: function __dragMove (event) {
      if (!this.saturationDragging) {
        return
      }
      stopAndPrevent(event.evt);

      this.__saturationChange(event);
    },
    __dragStop: function __dragStop (event) {
      stopAndPrevent(event.evt);
      this.saturationDragging = false;
      this.__onSaturationChange(
        event.position.left,
        event.position.top,
        true
      );
    },
    __saturationChange: function __saturationChange (evt) {
      this.__onSaturationChange(
        evt.position.left,
        evt.position.top
      );
    },
    __saturationClick: function __saturationClick (evt) {
      this.__onSaturationChange(
        evt.pageX - window.pageXOffset,
        evt.pageY - window.pageYOffset
      );
    }
  }
}

var contentCss = {
    maxHeight: '80vh',
    height: 'auto',
    boxShadow: 'none',
    backgroundColor: '#e4e4e4'
  };

var QColor = {
  name: 'q-color',
  mixins: [FrameMixin],
  props: {
    value: {
      required: true
    },
    color: {
      type: String,
      default: 'primary'
    },
    defaultSelection: {
      type: [String, Object],
      default: '#000000'
    },
    displayValue: String,
    placeholder: String,
    clearable: Boolean,
    okLabel: String,
    cancelLabel: String,
    disable: Boolean,
    readonly: Boolean
  },
  data: function data () {
    var data = this.isPopover() ? {} : {
      transition: 'q-modal-bottom'
    };
    data.focused = false;
    data.model = this.defaultSelection;
    return data
  },
  computed: {
    usingPopover: function usingPopover () {
      return this.isPopover()
    },
    editable: function editable () {
      return !this.disable && !this.readonly
    },
    actualValue: function actualValue () {
      if (this.displayValue) {
        return this.displayValue
      }
      if (!this.value) {
        return this.placeholder || ''
      }

      if (this.value) {
        return typeof this.value === 'string'
          ? this.value
          : ("rgb" + (this.value.a !== void 0 ? 'a' : '') + "(" + (this.value.r) + "," + (this.value.g) + "," + (this.value.b) + (this.value.a !== void 0 ? ("," + (this.value.a / 100)) : '') + ")")
      }
    }
  },
  methods: {
    isPopover: function isPopover () {
      return this.$q.platform.is.desktop && !this.$q.platform.within.iframe
    },
    toggle: function toggle () {
      this[this.$refs.popup.showing ? 'hide' : 'show']();
    },
    show: function show () {
      if (!this.disable) {
        this.__setModel();
        return this.$refs.popup.show()
      }
    },
    hide: function hide () {
      this.focused = false;
      return this.$refs.popup.hide()
    },
    clear: function clear (evt) {
      stopAndPrevent(evt);
      this.$emit('input', null);
      this.$emit('change', null);
    },

    __onFocus: function __onFocus () {
      this.__setModel(this.value);
      this.focused = true;
      this.$emit('focus');
    },
    __onBlur: function __onBlur (e) {
      var this$1 = this;

      this.__onHide();
      setTimeout(function () {
        var el = document.activeElement;
        if (el !== document.body && !this$1.$refs.popup.$el.contains(el)) {
          this$1.hide();
        }
      }, 1);
    },
    __onHide: function __onHide () {
      this.focused = false;
      this.$emit('blur');
      if (this.usingPopover && this.$refs.popup.showing) {
        this.__update(true);
      }
    },
    __setModel: function __setModel (val) {
      if ( val === void 0 ) val = this.value;

      this.model = val
        ? clone(val)
        : this.defaultSelection;
    },
    __update: function __update (change) {
      this.$emit('input', this.model);
      if (change) {
        this.$emit('change', this.model);
      }
    },

    __getPicker: function __getPicker (h, modal) {
      var this$1 = this;

      var child = [
        h(QColorPicker, {
          staticClass: ("no-border" + (modal ? ' full-width' : '')),
          props: extend$1({
            color: this.color,
            value: this.model,
            disable: this.disable,
            readonly: this.readonly
          }, this.$attrs),
          on: {
            input: function (v) {
              this$1.model = v;
              if (this$1.usingPopover) {
                this$1.__update();
              }
            },
            change: function (v) {
              this$1.model = v;
            }
          }
        })
      ];

      if (modal) {
        child['unshift'](h('div', {
          staticClass: 'modal-buttons modal-buttons-top row full-width'
        }, [
          h('div', { staticClass: 'col' }),
          h(QBtn, {
            props: {
              color: this.color,
              flat: true,
              label: this.cancelLabel || this.$q.i18n.label.cancel,
              waitForRipple: true,
              dense: true
            },
            on: { click: this.hide }
          }),
          this.editable
            ? h(QBtn, {
              props: {
                color: this.color,
                flat: true,
                label: this.okLabel || this.$q.i18n.label.set,
                waitForRipple: true,
                dense: true
              },
              on: {
                click: function () {
                  this$1.hide();
                  this$1.__update(true);
                }
              }
            })
            : null
        ]));
      }

      return child
    }
  },
  render: function render (h) {
    return h(QInputFrame, {
      props: {
        prefix: this.prefix,
        suffix: this.suffix,
        stackLabel: this.stackLabel,
        floatLabel: this.floatLabel,
        error: this.error,
        warning: this.warning,
        disable: this.disable,
        inverted: this.inverted,
        dark: this.dark,
        hideUnderline: this.hideUnderline,
        before: this.before,
        after: this.after,
        color: this.color,

        focused: this.focused,
        focusable: true,
        length: this.actualValue.length
      },
      nativeOn: {
        click: this.toggle,
        focus: this.__onFocus,
        blur: this.__onBlur
      }
    }, [
      h('div', {
        staticClass: 'col row items-center q-input-target',
        'class': this.alignClass,
        domProps: {
          innerHTML: this.actualValue
        }
      }),

      this.usingPopover
        ? h(QPopover, {
          ref: 'popup',
          props: {
            offset: [0, 10],
            disable: this.disable,
            anchorClick: false,
            maxHeight: '100vh'
          },
          on: {
            show: this.__onFocus,
            hide: this.__onHide
          }
        }, this.__getPicker(h))
        : h(QModal, {
          ref: 'popup',
          staticClass: 'with-backdrop',
          props: {
            contentCss: contentCss,
            minimized: "ios" === 'mat',
            position: 'bottom',
            transition: this.transition
          },
          on: {
            show: this.__onFocus,
            hide: this.__onHide
          }
        }, this.__getPicker(h, true)),

      this.editable && this.clearable && this.actualValue.length
        ? h('q-icon', {
          slot: 'after',
          props: { name: this.$q.icon.input.clear },
          nativeOn: { click: this.clear },
          staticClass: 'q-if-control'
        })
        : null,

      h('q-icon', {
        slot: 'after',
        props: { name: this.$q.icon.input.dropdown },
        staticClass: 'q-if-control'
      })
    ])
  }
}

var ContextMenuDesktop = {
  name: 'q-context-menu',
  components: {
    QPopover: QPopover
  },
  props: {
    disable: Boolean
  },
  render: function render (h) {
    var this$1 = this;

    return h(QPopover, {
      ref: 'popover',
      props: {
        anchorClick: false
      },
      on: {
        show: function () { this$1.$emit('show'); },
        hide: function () { this$1.$emit('hide'); }
      }
    }, this.$slots.default)
  },
  methods: {
    hide: function hide () {
      return this.$refs.popover.hide()
    },
    __show: function __show (evt) {
      var this$1 = this;

      if (!evt || this.disable) {
        return
      }
      this.hide();
      stopAndPrevent(evt);
      /*
        Opening with a timeout for
        Firefox workaround
       */
      setTimeout(function () {
        this$1.$refs.popover.show(evt);
      }, 100);
    }
  },
  mounted: function mounted () {
    this.target = this.$refs.popover.$el.parentNode;
    this.target.addEventListener('contextmenu', this.__show);
    this.target.addEventListener('click', this.hide);
  },
  beforeDestroy: function beforeDestroy () {
    this.target.removeEventListener('contexmenu', this.__show);
    this.target.removeEventListener('click', this.hide);
  }
}

var ContextMenuMobile = {
  name: 'q-context-menu',
  props: {
    disable: Boolean
  },
  methods: {
    hide: function hide () {
      this.target.classList.remove('non-selectable');
      return this.$refs.dialog.hide()
    },
    __show: function __show () {
      if (!this.disable && this.$refs.dialog) {
        this.$refs.dialog.show();
      }
    },
    __touchStartHandler: function __touchStartHandler (evt) {
      var this$1 = this;

      this.target.classList.add('non-selectable');
      this.touchTimer = setTimeout(function () {
        stopAndPrevent(evt);
        setTimeout(function () {
          this$1.__cleanup();
          this$1.__show();
        }, 10);
      }, 600);
    },
    __cleanup: function __cleanup () {
      this.target.classList.remove('non-selectable');
      clearTimeout(this.touchTimer);
    }
  },
  render: function render (h) {
    var this$1 = this;

    return h(QModal, {
      ref: 'dialog',
      props: {
        minimized: true
      },
      on: {
        show: function () { this$1.$emit('show'); },
        hide: function () { this$1.$emit('hide'); }
      }
    }, this.$slots.default)
  },
  mounted: function mounted () {
    var this$1 = this;

    this.$nextTick(function () {
      this$1.target = this$1.$el.parentNode;
      this$1.target.addEventListener('touchstart', this$1.__touchStartHandler)
      ;['touchcancel', 'touchmove', 'touchend'].forEach(function (evt) {
        this$1.target.addEventListener(evt, this$1.__cleanup);
      });
    });
  },
  beforeDestroy: function beforeDestroy () {
    var this$1 = this;

    this.target.removeEventListener('touchstart', this.__touchStartHandler)
    ;['touchcancel', 'touchmove', 'touchend'].forEach(function (evt) {
      this$1.target.removeEventListener(evt, this$1.__cleanup);
    });
  }
}

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
}

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
  color: {
    type: String,
    default: 'primary'
  },
  min: {
    validator: modelValidator,
    default: null
  },
  max: {
    validator: modelValidator,
    default: null
  },
  firstDayOfWeek: Number,
  format24h: {
    type: [Boolean, Number],
    default: 0,
    validator: function (v) { return [true, false, 0].includes(v); }
  },
  defaultView: {
    type: String,
    validator: function (v) { return ['year', 'month', 'day', 'hour', 'minute'].includes(v); }
  }
};

var input = {
  format: String,
  placeholder: String,
  clearable: Boolean,
  okLabel: String,
  cancelLabel: String,
  defaultSelection: [String, Number, Date],
  displayValue: String,
  disable: Boolean,
  readonly: Boolean
};

/* eslint no-fallthrough: 0 */

var MILLISECONDS_IN_DAY = 86400000;
var MILLISECONDS_IN_HOUR = 3600000;
var MILLISECONDS_IN_MINUTE = 60000;
var token = /\[((?:[^\]\\]|\\]|\\)*)\]|d{1,4}|M{1,4}|m{1,2}|w{1,2}|Qo|Do|D{1,4}|YY(?:YY)?|H{1,2}|h{1,2}|s{1,2}|S{1,3}|Z{1,2}|a{1,2}|[AQExX]/g;

function formatTimezone (offset, delimeter) {
  if ( delimeter === void 0 ) delimeter = '';

  var
    sign = offset > 0 ? '-' : '+',
    absOffset = Math.abs(offset),
    hours = Math.floor(absOffset / 60),
    minutes = absOffset % 60;

  return sign + pad(hours) + delimeter + pad(minutes)
}

function setMonth (date, newMonth /* 1-based */) {
  var
    test = new Date(date.getFullYear(), newMonth, 0, 0, 0, 0, 0),
    days = test.getDate();

  date.setMonth(newMonth - 1, Math.min(days, date.getDate()));
}

function getChange (date, mod, add) {
  var
    t = new Date(date),
    sign = (add ? 1 : -1);

  Object.keys(mod).forEach(function (key) {
    if (key === 'month') {
      setMonth(t, t.getMonth() + 1 + sign * mod.month);
      return
    }

    var op = key === 'year'
      ? 'FullYear'
      : capitalize$1(key === 'days' ? 'date' : key);
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
    if (key === 'month') {
      setMonth(t, mod.month);
      return
    }

    var op = key === 'year'
      ? 'FullYear'
      : key.charAt(0).toUpperCase() + key.slice(1);
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

function getOrdinal (n) {
  if (n >= 11 && n <= 13) {
    return (n + "th")
  }
  switch (n % 10) {
    case 1: return (n + "st")
    case 2: return (n + "nd")
    case 3: return (n + "rd")
  }
  return (n + "th")
}

var formatter = {
  // Year: 00, 01, ..., 99
  YY: function YY (date) {
    return pad(date.getFullYear(), 4).substr(2)
  },

  // Year: 1900, 1901, ..., 2099
  YYYY: function YYYY (date) {
    return pad(date.getFullYear(), 4)
  },

  // Month: 1, 2, ..., 12
  M: function M (date) {
    return date.getMonth() + 1
  },

  // Month: 01, 02, ..., 12
  MM: function MM (date) {
    return pad(date.getMonth() + 1)
  },

  // Month Short Name: Jan, Feb, ...
  MMM: function MMM (date) {
    return i18n.lang.date.monthsShort[date.getMonth()]
  },

  // Month Name: January, February, ...
  MMMM: function MMMM (date) {
    return i18n.lang.date.months[date.getMonth()]
  },

  // Quarter: 1, 2, 3, 4
  Q: function Q (date) {
    return Math.ceil((date.getMonth() + 1) / 3)
  },

  // Quarter: 1st, 2nd, 3rd, 4th
  Qo: function Qo (date) {
    return getOrdinal(this.Q(date))
  },

  // Day of month: 1, 2, ..., 31
  D: function D (date) {
    return date.getDate()
  },

  // Day of month: 1st, 2nd, ..., 31st
  Do: function Do (date) {
    return getOrdinal(date.getDate())
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
    return i18n.lang.date.daysShort[date.getDay()]
  },

  // Day of week: Sunday, Monday, ...
  dddd: function dddd (date) {
    return i18n.lang.date.days[date.getDay()]
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

  // Minute: 0, 1, ..., 59
  m: function m (date) {
    return date.getMinutes()
  },

  // Minute: 00, 01, ..., 59
  mm: function mm (date) {
    return pad(date.getMinutes())
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

  // Meridiem: AM, PM
  A: function A (date) {
    return this.H(date) < 12 ? 'AM' : 'PM'
  },

  // Meridiem: am, pm
  a: function a (date) {
    return this.H(date) < 12 ? 'am' : 'pm'
  },

  // Meridiem: a.m., p.m
  aa: function aa (date) {
    return this.H(date) < 12 ? 'a.m.' : 'p.m.'
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

  return mask.replace(token, function (match, text) {
    if (match in formatter) {
      return formatter[match](date)
    }
    return text === void 0
      ? match
      : text.split('\\]').join(']')
  })
}


var date = Object.freeze({
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

var DateMixin = {
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
        if (!isSameDate(this.value, date)) {
          var val$1 = convertDateToFormat(date, this.value);
          this.$emit('input', val$1);
          this.$emit('change', val$1);
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
    clear: function clear () {
      if (this.value !== '') {
        this.$emit('input', '');
        this.$emit('change', '');
      }
    },

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
}

var QDatetimePicker = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"q-datetime",class:['type-' + _vm.type, _vm.disable ? 'disabled' : '', _vm.readonly ? 'readonly' : '']},[_vm._t("default"),_vm._v(" "),_c('div',{staticClass:"q-datetime-content non-selectable"},[_c('div',{staticClass:"q-datetime-inner full-height flex justify-center",on:{"touchstart":function($event){$event.stopPropagation();$event.preventDefault();}}},[(_vm.typeHasDate)?[_c('div',{directives:[{name:"touch-pan",rawName:"v-touch-pan.vertical",value:(_vm.__dragMonth),expression:"__dragMonth",modifiers:{"vertical":true}}],staticClass:"q-datetime-col q-datetime-col-month"},[_c('div',{ref:"month",staticClass:"q-datetime-col-wrapper",style:(_vm.__monthStyle)},_vm._l((_vm.monthInterval),function(index){return _c('div',{key:("mi" + index),staticClass:"q-datetime-item"},[_vm._v(" "+_vm._s(_vm.$q.i18n.date.months[index + _vm.monthMin - 1])+" ")])}))]),_vm._v(" "),_c('div',{directives:[{name:"touch-pan",rawName:"v-touch-pan.vertical",value:(_vm.__dragDate),expression:"__dragDate",modifiers:{"vertical":true}}],staticClass:"q-datetime-col q-datetime-col-day"},[_c('div',{ref:"date",staticClass:"q-datetime-col-wrapper",style:(_vm.__dayStyle)},_vm._l((_vm.daysInterval),function(index){return _c('div',{key:("di" + index),staticClass:"q-datetime-item"},[_vm._v(" "+_vm._s(index + _vm.dayMin - 1)+" ")])}))]),_vm._v(" "),_c('div',{directives:[{name:"touch-pan",rawName:"v-touch-pan.vertical",value:(_vm.__dragYear),expression:"__dragYear",modifiers:{"vertical":true}}],staticClass:"q-datetime-col q-datetime-col-year"},[_c('div',{ref:"year",staticClass:"q-datetime-col-wrapper",style:(_vm.__yearStyle)},_vm._l((_vm.yearInterval),function(n){return _c('div',{key:("yi" + n),staticClass:"q-datetime-item"},[_vm._v(" "+_vm._s(n + _vm.yearMin)+" ")])}))])]:_vm._e(),_vm._v(" "),(_vm.typeHasTime)?[_c('div',{directives:[{name:"touch-pan",rawName:"v-touch-pan.vertical",value:(_vm.__dragHour),expression:"__dragHour",modifiers:{"vertical":true}}],staticClass:"q-datetime-col q-datetime-col-hour"},[_c('div',{ref:"hour",staticClass:"q-datetime-col-wrapper",style:(_vm.__hourStyle)},_vm._l((_vm.hourInterval),function(n){return _c('div',{key:("hi" + n),staticClass:"q-datetime-item"},[_vm._v(" "+_vm._s(n + _vm.hourMin - 1)+" ")])}))]),_vm._v(" "),_c('div',{directives:[{name:"touch-pan",rawName:"v-touch-pan.vertical",value:(_vm.__dragMinute),expression:"__dragMinute",modifiers:{"vertical":true}}],staticClass:"q-datetime-col q-datetime-col-minute"},[_c('div',{ref:"minute",staticClass:"q-datetime-col-wrapper",style:(_vm.__minuteStyle)},_vm._l((_vm.minuteInterval),function(n){return _c('div',{key:("ni" + n),staticClass:"q-datetime-item"},[_vm._v(" "+_vm._s(_vm.__pad(n + _vm.minuteMin - 1))+" ")])}))])]:_vm._e()],2),_vm._v(" "),_c('div',{staticClass:"q-datetime-mask"}),_vm._v(" "),_c('div',{staticClass:"q-datetime-highlight"})])],2)},staticRenderFns: [],
  name: 'q-datetime-picker',
  mixins: [DateMixin],
  directives: {
    TouchPan: TouchPan
  },
  props: {
    defaultSelection: [String, Number, Date],
    disable: Boolean,
    readonly: Boolean
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
    __dragMonth: function __dragMonth (e) {
      this.__drag(e, 'month');
    },
    __dragDate: function __dragDate (e) {
      this.__drag(e, 'date');
    },
    __dragYear: function __dragYear (e) {
      this.__drag(e, 'year');
    },
    __dragHour: function __dragHour (e) {
      this.__drag(e, 'hour');
    },
    __dragMinute: function __dragMinute (e) {
      this.__drag(e, 'minute');
    },
    __drag: function __drag (e, type) {
      var method = e.isFirst
        ? '__dragStart' : (e.isFinal ? '__dragStop' : '__dragMove');

      this[method](e.evt, type);
    },

    /* date */
    setYear: function setYear (value) {
      if (this.editable) {
        this.model = new Date(this.model.setFullYear(this.__parseTypeValue('year', value)));
      }
    },
    setMonth: function setMonth (value) {
      if (this.editable) {
        this.model = adjustDate(this.model, {month: value});
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

    setView: function setView () {},

    /* helpers */
    __pad: function __pad (unit, filler) {
      return (unit < 10 ? filler || '0' : '') + unit
    },
    __scrollView: function __scrollView () {},
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
      if (!this.editable) {
        return
      }

      stopAndPrevent(ev);

      this[type + 'DragOffset'] = 0;
      this.dragging = type;
      this.__actualType = type === 'date' ? 'day' : type;
      this.__typeOffset = type === 'month' ? -1 : 0;
      this.__dragPosition = position(ev).top;
    },
    __dragMove: function __dragMove (ev, type) {
      if (this.dragging !== type || !this.editable) {
        return
      }

      stopAndPrevent(ev);

      var offset$$1 = (this.__dragPosition - position(ev).top) / 36;
      this[type + 'DragOffset'] = offset$$1;
      this.__updatePositions(type, this[this.__actualType] + offset$$1 + this.__typeOffset);
    },
    __dragStop: function __dragStop (ev, type) {
      var this$1 = this;

      if (this.dragging !== type || !this.editable) {
        return
      }
      stopAndPrevent(ev);
      this.dragging = false;

      var
        offset$$1 = Math.round(this[type + 'DragOffset']),
        newValue = this.__parseTypeValue(type, this[this.__actualType] + offset$$1);

      if (newValue !== this[this.__actualType]) {
        this[("set" + (capitalize$1(this.__actualType)))](newValue);
      }
      else {
        this.__updatePositions(type, this[this.__actualType] + this.__typeOffset);
      }
      this.$nextTick(function () {
        this$1[type + 'DragOffset'] = 0;
      });
    }
  },
  mounted: function mounted () {
    this.$nextTick(this.__updateAllPositions);
  }
}

var contentCss$1 = {
    maxHeight: '80vh',
    height: 'auto',
    boxShadow: 'none',
    backgroundColor: '#e4e4e4'
  };

var QDatetime = {
  name: 'q-datetime',
  mixins: [FrameMixin],
  props: extend$1(
    input,
    inline
  ),
  data: function data () {
    var data = this.isPopover() ? {} : {
      transition: 'q-modal-bottom'
    };
    data.focused = false;
    data.model = this.defaultSelection;
    return data
  },
  computed: {
    usingPopover: function usingPopover () {
      return this.$q.platform.is.desktop && !this.$q.platform.within.iframe
    },
    editable: function editable () {
      return !this.disable && !this.readonly
    },
    actualValue: function actualValue () {
      if (this.displayValue) {
        return this.displayValue
      }
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

      return formatDate(this.value, format, /* for reactiveness */ this.$q.i18n.date)
    }
  },
  methods: {
    isPopover: function isPopover () {
      return this.$q.platform.is.desktop && !this.$q.platform.within.iframe
    },
    toggle: function toggle () {
      this[this.$refs.popup.showing ? 'hide' : 'show']();
    },
    show: function show () {
      if (!this.disable) {
        this.__setModel();
        return this.$refs.popup.show()
      }
    },
    hide: function hide () {
      this.focused = false;
      return this.$refs.popup.hide()
    },
    clear: function clear (evt) {
      stopAndPrevent(evt);
      this.$emit('input', '');
      this.$emit('change', '');
    },

    __onFocus: function __onFocus () {
      if (this.defaultView) {
        var target = this.$refs.target;
        if (target.view !== this.defaultView) {
          target.setView(this.defaultView);
        }
        else {
          target.__scrollView();
        }
      }
      this.__setModel(this.value);
      this.focused = true;
      this.$emit('focus');
    },
    __onBlur: function __onBlur (e) {
      var this$1 = this;

      this.__onHide();
      setTimeout(function () {
        var el = document.activeElement;
        if (el !== document.body && !this$1.$refs.popup.$el.contains(el)) {
          this$1.hide();
        }
      }, 1);
    },
    __onHide: function __onHide () {
      this.focused = false;
      this.$emit('blur');
      if (this.usingPopover) {
        this.__update(true);
      }
    },
    __setModel: function __setModel (val) {
      if ( val === void 0 ) val = this.value;

      this.model = val
        ? clone(val)
        : this.defaultSelection;
    },
    __update: function __update (change) {
      var val = this.model || this.$refs.target.model;
      this.$emit('input', val);
      if (change) {
        this.$emit('change', val);
      }
    },

    __getPicker: function __getPicker (h, modal) {
      var this$1 = this;

      return [
        h(QDatetimePicker, {
          ref: 'target',
          staticClass: "no-border",
          props: {
            type: this.type,
            min: this.min,
            max: this.max,
            format24h: this.format24h,
            firstDayOfWeek: this.firstDayOfWeek,
            defaultView: this.defaultView,
            color: this.dark === false ? null : this.color,
            value: this.model,
            disable: this.disable,
            readonly: this.readonly
          },
          on: {
            input: function (v) {
              this$1.model = v;
              if (this$1.usingPopover) {
                this$1.__update();
              }
            },
            change: function (v) {
              this$1.model = v;
            },
            canClose: function () {
              if (this$1.usingPopover) {
                this$1.hide();
              }
            }
          }
        }, [
          modal
            ? h('div', {
              staticClass: 'modal-buttons modal-buttons-top row full-width'
            }, [
              h('div', { staticClass: 'col' }),
              h(QBtn, {
                props: {
                  color: this.color,
                  flat: true,
                  label: this.cancelLabel || this.$q.i18n.label.cancel,
                  waitForRipple: true,
                  dense: true
                },
                on: { click: this.hide }
              }),
              this.editable
                ? h(QBtn, {
                  props: {
                    color: this.color,
                    flat: true,
                    label: this.okLabel || this.$q.i18n.label.set,
                    waitForRipple: true,
                    dense: true
                  },
                  on: {
                    click: function () {
                      this$1.hide();
                      this$1.__update(true);
                    }
                  }
                })
                : null
            ])
            : null
        ])
      ]
    }
  },
  render: function render (h) {
    return h(QInputFrame, {
      props: {
        prefix: this.prefix,
        suffix: this.suffix,
        stackLabel: this.stackLabel,
        floatLabel: this.floatLabel,
        error: this.error,
        warning: this.warning,
        disable: this.disable,
        inverted: this.inverted,
        dark: this.dark,
        hideUnderline: this.hideUnderline,
        before: this.before,
        after: this.after,
        color: this.color,

        focused: this.focused,
        focusable: true,
        length: this.actualValue.length
      },
      nativeOn: {
        click: this.toggle,
        focus: this.__onFocus,
        blur: this.__onBlur
      }
    }, [
      h('div', {
        staticClass: 'col row items-center q-input-target',
        'class': this.alignClass,
        domProps: {
          innerHTML: this.actualValue
        }
      }),

      this.usingPopover
        ? h(QPopover, {
          ref: 'popup',
          props: {
            offset: [0, 10],
            disable: this.disable,
            anchorClick: false,
            maxHeight: '100vh'
          },
          on: {
            show: this.__onFocus,
            hide: this.__onHide
          }
        }, this.__getPicker(h))
        : h(QModal, {
          ref: 'popup',
          staticClass: 'with-backdrop',
          props: {
            contentCss: contentCss$1,
            minimized: "ios" === 'mat',
            position: 'bottom',
            transition: this.transition
          },
          on: {
            show: this.__onFocus,
            hide: this.__onHide
          }
        }, this.__getPicker(h, true)),

      this.editable && this.clearable && this.actualValue.length
        ? h('q-icon', {
          slot: 'after',
          props: { name: this.$q.icon.input.clear },
          nativeOn: { click: this.clear },
          staticClass: 'q-if-control'
        })
        : null,

      h('q-icon', {
        slot: 'after',
        props: { name: this.$q.icon.input.dropdown },
        staticClass: 'q-if-control'
      })
    ])
  }
}

var inputTypes = [
  'text', 'textarea', 'email',
  'tel', 'file', 'number',
  'password', 'url', 'time', 'date'
]

var QResizeObservable = {
  name: 'q-resize-observable',
  methods: {
    onResize: function onResize () {
      var size = {
        width: this.$el.offsetWidth,
        height: this.$el.offsetHeight
      };

      if (size.width === this.size.width && size.height === this.size.height) {
        return
      }

      if (!this.timer) {
        this.timer = setTimeout(this.emit, 32);
      }

      this.size = size;
    },
    emit: function emit () {
      this.timer = null;
      this.$emit('resize', this.size);
    }
  },
  render: function render (h) {
    return h('div', {
      staticClass: 'absolute-full overflow-hidden invisible',
      style: 'z-index: -1;'
    })
  },
  mounted: function mounted () {
    var this$1 = this;

    var
      object = document.createElement('object'),
      onIE = this.$q.platform.is.ie;

    this.size = {
      width: this.$el.offsetWidth,
      height: this.$el.offsetHeight
    };
    this.emit();

    this.object = object;
    object.setAttribute('style', 'display: block; position: absolute; top: 0; left: 0; height: 100%; width: 100%; overflow: hidden; pointer-events: none; z-index: -1;');
    object.onload = function () {
      object.contentDocument.defaultView.addEventListener('resize', this$1.onResize);
    };
    object.type = 'text/html';
    if (onIE) {
      this.$el.appendChild(object);
    }
    object.data = 'about:blank';
    if (!onIE) {
      this.$el.appendChild(object);
    }
  },
  beforeDestroy: function beforeDestroy () {
    clearTimeout(this.timer);
    if (this.object && this.object.onload) {
      if (!this.$q.platform.is.ie && this.object.contentDocument) {
        this.object.contentDocument.defaultView.removeEventListener('resize', this.onResize);
      }
      delete this.object.onload;
    }
  }
}

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
}

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
  created: function created () {
    this.emit();
  },
  mounted: function mounted () {
    window.addEventListener('resize', this.trigger);
  },
  beforeDestroy: function beforeDestroy () {
    window.removeEventListener('resize', this.trigger);
  }
}

var QInput = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('q-input-frame',{staticClass:"q-input",attrs:{"prefix":_vm.prefix,"suffix":_vm.suffix,"stack-label":_vm.stackLabel,"float-label":_vm.floatLabel,"error":_vm.error,"warning":_vm.warning,"disable":_vm.disable,"inverted":_vm.inverted,"dark":_vm.dark,"hide-underline":_vm.hideUnderline,"before":_vm.before,"after":_vm.after,"color":_vm.color,"focused":_vm.focused,"length":_vm.length,"top-addons":_vm.isTextarea},on:{"click":_vm.__onClick,"focus":_vm.__onFocus}},[_vm._t("before"),_vm._v(" "),(_vm.isTextarea)?[_c('div',{staticClass:"col row relative-position"},[_c('q-resize-observable',{on:{"resize":function($event){_vm.__updateArea();}}}),_vm._v(" "),_c('textarea',_vm._b({ref:"shadow",staticClass:"col q-input-target q-input-shadow absolute-top",domProps:{"value":_vm.model}},'textarea',_vm.$attrs,false)),_vm._v(" "),_c('textarea',_vm._b({ref:"input",staticClass:"col q-input-target q-input-area",attrs:{"name":_vm.name,"placeholder":_vm.inputPlaceholder,"disabled":_vm.disable,"readonly":_vm.readonly,"maxlength":_vm.maxLength},domProps:{"value":_vm.model},on:{"input":_vm.__set,"focus":_vm.__onFocus,"blur":_vm.__onInputBlur,"keydown":_vm.__onKeydown,"keyup":_vm.__onKeyup}},'textarea',_vm.$attrs,false))],1)]:_c('input',_vm._b({ref:"input",staticClass:"col q-input-target",class:[("text-" + (_vm.align))],attrs:{"name":_vm.name,"placeholder":_vm.inputPlaceholder,"disabled":_vm.disable,"readonly":_vm.readonly,"maxlength":_vm.maxLength,"type":_vm.inputType},domProps:{"value":_vm.model},on:{"input":_vm.__set,"focus":_vm.__onFocus,"blur":_vm.__onInputBlur,"keydown":_vm.__onKeydown,"keyup":_vm.__onKeyup}},'input',_vm.$attrs,false)),_vm._v(" "),(_vm.isPassword && !_vm.noPassToggle && _vm.length)?_c('q-icon',{staticClass:"q-if-control",attrs:{"slot":"after","name":_vm.$q.icon.input[_vm.showPass ? 'showPass' : 'hidePass']},nativeOn:{"mousedown":function($event){_vm.__clearTimer($event);},"touchstart":function($event){_vm.__clearTimer($event);},"click":function($event){_vm.togglePass($event);}},slot:"after"}):_vm._e(),_vm._v(" "),(_vm.isNumber && !_vm.noNumberToggle && _vm.length)?_c('q-icon',{staticClass:"q-if-control",attrs:{"slot":"after","name":_vm.$q.icon.input[_vm.showNumber ? 'showNumber' : 'hideNumber']},nativeOn:{"mousedown":function($event){_vm.__clearTimer($event);},"touchstart":function($event){_vm.__clearTimer($event);},"click":function($event){_vm.toggleNumber($event);}},slot:"after"}):_vm._e(),_vm._v(" "),(_vm.editable && _vm.clearable && _vm.length)?_c('q-icon',{staticClass:"q-if-control",attrs:{"slot":"after","name":_vm.$q.icon.input.clear},nativeOn:{"mousedown":function($event){_vm.__clearTimer($event);},"touchstart":function($event){_vm.__clearTimer($event);},"click":function($event){_vm.clear($event);}},slot:"after"}):_vm._e(),_vm._v(" "),(_vm.isLoading)?_c('q-spinner',{staticClass:"q-if-control",attrs:{"slot":"after","size":"24px"},slot:"after"}):_vm._e(),_vm._v(" "),_vm._t("after"),_vm._v(" "),_vm._t("default")],2)},staticRenderFns: [],
  name: 'q-input',
  mixins: [FrameMixin, InputMixin],
  components: {
    QInputFrame: QInputFrame,
    QSpinner: QSpinner,
    QResizeObservable: QResizeObservable
  },
  props: {
    value: { required: true },
    type: {
      type: String,
      default: 'text',
      validator: function (t) { return inputTypes.includes(t); }
    },
    clearable: Boolean,
    noPassToggle: Boolean,
    noNumberToggle: Boolean,
    readonly: Boolean,

    maxDecimals: Number,
    upperCase: Boolean
  },
  data: function data () {
    var this$1 = this;

    return {
      showPass: false,
      showNumber: true,
      model: this.value,
      shadow: {
        val: this.model,
        set: this.__set,
        loading: false,
        hasFocus: function () {
          return document.activeElement === this$1.$refs.input
        },
        register: function () {
          this$1.watcher = this$1.$watch('model', function (val) {
            this$1.shadow.val = val;
          });
        },
        unregister: function () {
          this$1.watcher();
        },
        getEl: function () {
          return this$1.$refs.input
        }
      }
    }
  },
  watch: {
    value: function value (v) {
      this.model = v;
      this.isNumberError = false;
    }
  },
  provide: function provide () {
    return {
      __input: this.shadow
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
    isLoading: function isLoading () {
      return this.loading || this.shadow.loading
    },
    pattern: function pattern () {
      if (this.isNumber) {
        return this.$attrs.pattern || '[0-9]*'
      }
    },
    inputType: function inputType () {
      if (this.isPassword) {
        return this.showPass ? 'text' : 'password'
      }
      return this.isNumber
        ? (this.showNumber ? 'number' : 'text')
        : this.type
    },
    length: function length () {
      return this.model !== null && this.model !== undefined
        ? ('' + this.model).length
        : 0
    },
    editable: function editable () {
      return !this.disable && !this.readonly
    }
  },
  methods: {
    togglePass: function togglePass () {
      this.showPass = !this.showPass;
      clearTimeout(this.timer);
      this.focus();
    },
    toggleNumber: function toggleNumber () {
      this.showNumber = !this.showNumber;
      clearTimeout(this.timer);
      this.focus();
    },
    clear: function clear () {
      clearTimeout(this.timer);
      this.focus();
      if (this.editable) {
        this.model = this.isNumber ? null : '';
        this.$emit('input', this.model);
      }
    },

    __clearTimer: function __clearTimer () {
      var this$1 = this;

      this.$nextTick(function () { return clearTimeout(this$1.timer); });
    },

    __set: function __set (e) {
      var val = e.target ? e.target.value : e;

      if (this.isNumber) {
        val = parseFloat(val);
        if (isNaN(val)) {
          this.isNumberError = true;
          return
        }
        this.isNumberError = false;
        if (Number.isInteger(this.maxDecimals)) {
          val = parseFloat(val.toFixed(this.maxDecimals));
        }
      }
      else if (this.upperCase) {
        val = val.toUpperCase();
      }

      if (val !== this.model) {
        this.$emit('input', val);
      }
      this.model = val;
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
      this.watcher = this.$watch('model', this.__updateArea);
    }
  },
  beforeDestroy: function beforeDestroy () {
    if (this.watcher !== void 0) {
      this.watcher();
    }
  }
}

var QRadio = {
  name: 'q-radio',
  mixins: [OptionMixin],
  props: {
    val: {
      required: true
    }
  },
  computed: {
    isTrue: function isTrue () {
      return this.value === this.val
    }
  },
  methods: {
    toggle: function toggle (evt, blur) {
      if ( blur === void 0 ) blur = true;

      if (this.disable) {
        return
      }
      if (evt) {
        stopAndPrevent(evt);
      }
      if (blur) {
        this.$el.blur();
      }

      if (!this.isTrue) {
        this.__update(this.val);
      }
    },
    __getContent: function __getContent (h) {
      return [
        h(QIcon, {
          staticClass: 'q-radio-unchecked cursor-pointer absolute-full',
          props: {
            name: this.uncheckedIcon || this.$q.icon.radio.unchecked["ios"]
          }
        }),
        h(QIcon, {
          staticClass: 'q-radio-checked cursor-pointer absolute-full',
          props: {
            name: this.checkedIcon || this.$q.icon.radio.checked["ios"]
          }
        }),
        null
      ]
    }
  }
}

var QToggle = {
  name: 'q-toggle',
  mixins: [Mixin, OptionMixin],
  props: {
    icon: String
  },
  computed: {
    currentIcon: function currentIcon () {
      return (this.isActive ? this.checkedIcon : this.uncheckedIcon) || this.icon
    },
    iconColor: function iconColor () {
      return 'dark'
    },
    baseClass: function baseClass () {
      if ("ios" === 'ios' && this.dark) {
        return "q-toggle-base-dark"
      }
    }
  },
  methods: {
    __swipe: function __swipe (evt) {
      if (evt.direction === 'left') {
        if (this.isTrue) {
          this.toggle();
        }
      }
      else if (evt.direction === 'right') {
        if (this.isFalse) {
          this.toggle();
        }
      }
    },
    __getContent: function __getContent (h) {
      return [
        h('div', { staticClass: 'q-toggle-base', 'class': this.baseClass }),
        h('div', { staticClass: 'q-toggle-handle row flex-center' }, [
          this.currentIcon
            ? h(QIcon, {
              staticClass: 'q-toggle-icon',
              props: { name: this.currentIcon, color: this.iconColor }
            })
            : null,
          null
        ])
      ]
    }
  }
}

var QOptionGroup = {
  name: 'q-option-group',
  inject: {
    __field: { default: null }
  },
  components: {
    QRadio: QRadio,
    QCheckbox: QCheckbox,
    QToggle: QToggle
  },
  props: {
    value: {
      required: true
    },
    type: {
      default: 'radio',
      validator: function (v) { return ['radio', 'checkbox', 'toggle'].includes(v); }
    },
    color: String,
    keepColor: Boolean,
    dark: Boolean,
    options: {
      type: Array,
      validator: function validator (opts) {
        return opts.every(function (opt) { return 'value' in opt && 'label' in opt; })
      }
    },
    leftLabel: Boolean,
    inline: Boolean,
    disable: Boolean
  },
  computed: {
    component: function component () {
      return ("q-" + (this.type))
    },
    model: {
      get: function get () {
        return Array.isArray(this.value) ? this.value.slice() : this.value
      },
      set: function set (value) {
        this.$emit('input', value);
      }
    },
    length: function length () {
      return this.value
        ? (this.type === 'radio' ? 1 : this.value.length)
        : 0
    }
  },
  methods: {
    __onFocus: function __onFocus () {
      this.$emit('focus');
    },
    __onBlur: function __onBlur () {
      this.$emit('blur');
    },
    __update: function __update (val, change) {
      this.$emit('input', val);
    }
  },
  created: function created () {
    var isArray = Array.isArray(this.value);
    if (this.type === 'radio') {
      if (isArray) {
        console.error('q-option-group: model should not be array');
      }
    }
    else if (!isArray) {
      console.error('q-option-group: model should be array in your case');
    }
    if (this.__field) {
      this.field = this.__field;
      this.field.__registerInput(this, true);
    }
  },
  beforeDestroy: function beforeDestroy () {
    if (this.__field) {
      this.field.__unregisterInput();
    }
  },
  render: function render (h) {
    var this$1 = this;

    return h(
      'div',
      {
        staticClass: 'q-option-group group',
        'class': { 'q-option-group-inline-opts': this.inline }
      },
      this.options.map(
        function (opt) { return h('div', [
          h(this$1.component, {
            props: {
              value: this$1.value,
              val: opt.value,
              disable: this$1.disable || opt.disable,
              label: opt.label,
              leftLabel: opt.leftLabel,
              color: opt.color || this$1.color,
              checkedIcon: opt.checkedIcon,
              uncheckedIcon: opt.uncheckedIcon,
              dark: opt.dark || this$1.dark,
              keepColor: opt.keepColor || this$1.keepColor
            },
            on: {
              input: this$1.__update,
              focus: this$1.__onFocus,
              blur: this$1.__onBlur
              // TODO change: this.__onChange
            }
          })
        ]); }
      )
    )
  }
}

var QDialog = {
  name: 'q-dialog',
  props: {
    value: Boolean,
    title: String,
    message: String,
    prompt: Object,
    options: Object,
    ok: {
      type: [String, Boolean],
      default: true
    },
    cancel: [String, Boolean],
    stackButtons: Boolean,
    preventClose: Boolean,
    position: String,
    color: {
      type: String,
      default: 'primary'
    }
  },
  render: function render (h) {
    var this$1 = this;

    var
      child = [],
      title = this.$slots.title || this.title,
      msg = this.$slots.message || this.message;

    if (title) {
      child.push(
        h('div', {
          staticClass: 'modal-header'
        }, [ title ])
      );
    }
    if (msg) {
      child.push(
        h('div', {
          staticClass: 'modal-body modal-scroll'
        }, [ msg ])
      );
    }

    child.push(
      h(
        'div',
        { staticClass: 'modal-body modal-scroll' },
        this.hasForm
          ? (this.prompt ? this.__getPrompt(h) : this.__getOptions(h))
          : [ this.$slots.default ]
      )
    );

    if (this.$scopedSlots.buttons) {
      child.push(
        h('div', {
          staticClass: 'modal-buttons',
          'class': {
            row: !this.stackButtons,
            column: this.stackButtons
          }
        }, [
          this.$scopedSlots.buttons({
            ok: this.__onOk,
            cancel: this.__onCancel
          })
        ])
      );
    }
    else if (this.ok || this.cancel) {
      child.push(
        h(
          'div',
          { staticClass: 'modal-buttons row' },
          this.__getButtons(h)
        )
      );
    }

    return h(QModal, {
      ref: 'modal',
      props: {
        value: this.value,
        minimized: true,
        noBackdropDismiss: this.preventClose,
        noEscDismiss: this.preventClose,
        position: this.position
      },
      on: {
        input: function (val) {
          this$1.$emit('input', val);
        },
        show: function () {
          this$1.$emit('show');

          if (!this$1.$q.platform.is.desktop) {
            return
          }

          var node = this$1.$refs.modal.$el.getElementsByTagName('INPUT');
          if (node.length) {
            node[0].focus();
            return
          }

          node = this$1.$refs.modal.$el.getElementsByTagName('BUTTON');
          if (node.length) {
            node[node.length - 1].focus();
          }
        },
        hide: function () {
          this$1.$emit('hide');
        },
        dismiss: function () {
          this$1.$emit('cancel');
        },
        'escape-key': function () {
          this$1.hide().then(function () {
            this$1.$emit('escape-key');
            this$1.$emit('cancel');
          });
        }
      }
    }, child)
  },
  computed: {
    hasForm: function hasForm () {
      return this.prompt || this.options
    },
    okLabel: function okLabel () {
      return this.ok === true
        ? this.$q.i18n.label.ok
        : this.ok
    },
    cancelLabel: function cancelLabel () {
      return this.cancel === true
        ? this.$q.i18n.label.cancel
        : this.cancel
    }
  },
  methods: {
    show: function show () {
      return this.$refs.modal.show()
    },
    hide: function hide () {
      var this$1 = this;

      var data;

      return this.$refs.modal.hide().then(function () {
        if (this$1.hasForm) {
          data = clone(this$1.__getData());
        }
        return data
      })
    },
    __getPrompt: function __getPrompt (h) {
      var this$1 = this;

      return [
        h(QInput, {
          style: 'margin-bottom: 10px',
          props: {
            value: this.prompt.model,
            type: this.prompt.type || 'text',
            color: this.color,
            noPassToggle: true
          },
          on: {
            change: function (v) { this$1.prompt.model = v; }
          }
        })
      ]
    },
    __getOptions: function __getOptions (h) {
      var this$1 = this;

      return [
        h(QOptionGroup, {
          props: {
            value: this.options.model,
            type: this.options.type,
            color: this.color,
            inline: this.options.inline,
            options: this.options.items
          },
          on: {
            change: function (v) { this$1.options.model = v; }
          }
        })
      ]
    },
    __getButtons: function __getButtons (h) {
      var child = [];

      if (this.cancel) {
        child.push(h(QBtn, {
          props: { color: this.color, flat: true, label: this.cancelLabel, waitForRipple: true },
          on: { click: this.__onCancel }
        }));
      }
      if (this.ok) {
        child.push(h(QBtn, {
          props: { color: this.color, flat: true, label: this.okLabel, waitForRipple: true },
          on: { click: this.__onOk }
        }));
      }

      return child
    },
    __onOk: function __onOk () {
      var this$1 = this;

      return this.hide().then(function (data) {
        this$1.$emit('ok', data);
      })
    },
    __onCancel: function __onCancel () {
      var this$1 = this;

      return this.hide().then(function () {
        this$1.$emit('cancel');
      })
    },
    __getData: function __getData () {
      if (this.prompt) {
        return this.prompt.model
      }
      if (this.options) {
        return this.options.model
      }
    }
  }
}

var QTooltip = {
  name: 'q-tooltip',
  mixins: [ModelToggleMixin],
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
  watch: {
    $route: function $route () {
      this.hide();
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
    __show: function __show () {
      clearTimeout(this.timer);

      document.body.appendChild(this.$el);
      this.scrollTarget = getScrollTarget(this.anchorEl);
      this.scrollTarget.addEventListener('scroll', this.hide);
      window.addEventListener('resize', this.__debouncedUpdatePosition);
      if (this.$q.platform.is.mobile) {
        document.body.addEventListener('click', this.hide, true);
      }

      this.__updatePosition();
      this.showPromise && this.showPromiseResolve();
    },
    __hide: function __hide () {
      clearTimeout(this.timer);

      this.scrollTarget.removeEventListener('scroll', this.hide);
      window.removeEventListener('resize', this.__debouncedUpdatePosition);
      document.body.removeChild(this.$el);
      if (this.$q.platform.is.mobile) {
        document.body.removeEventListener('click', this.hide, true);
      }

      this.hidePromise && this.hidePromiseResolve();
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
    __delayShow: function __delayShow () {
      clearTimeout(this.timer);
      this.timer = setTimeout(this.show, this.delay);
    },
    __delayHide: function __delayHide () {
      clearTimeout(this.timer);
      this.hide();
    }
  },
  render: function render (h) {
    return h('span', {
      staticClass: 'q-tooltip animate-scale',
      style: this.transformCSS
    }, [ this.$slots.default ])
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
      if (this$1.$q.platform.is.mobile) {
        this$1.anchorEl.addEventListener('click', this$1.show);
      }
      else {
        this$1.anchorEl.addEventListener('mouseenter', this$1.__delayShow);
        this$1.anchorEl.addEventListener('focus', this$1.__delayShow);
        this$1.anchorEl.addEventListener('mouseleave', this$1.__delayHide);
        this$1.anchorEl.addEventListener('blur', this$1.__delayHide);
      }

      if (this$1.value) {
        this$1.show();
      }
    });
  },
  beforeDestroy: function beforeDestroy () {
    clearTimeout(this.timer);
    if (!this.anchorEl) {
      return
    }
    if (this.$q.platform.is.mobile) {
      this.anchorEl.removeEventListener('click', this.show);
    }
    else {
      this.anchorEl.removeEventListener('mouseenter', this.__delayShow);
      this.anchorEl.removeEventListener('focus', this.__delayShow);
      this.anchorEl.removeEventListener('mouseleave', this.__delayHide);
      this.anchorEl.removeEventListener('blur', this.__delayHide);
    }
  }
}

function run (e, btn, vm) {
  if (btn.handler) {
    btn.handler(e, vm, vm.caret);
  }
  else {
    vm.runCmd(btn.cmd, btn.param);
  }
}

function getBtn (h, vm, btn, clickHandler) {
  var
    child = [],
    events = {
      click: function click (e) {
        clickHandler && clickHandler();
        run(e, btn, vm);
      }
    };

  if (btn.tip && vm.$q.platform.is.desktop) {
    var Key = btn.key
      ? h('div', [h('small', ("(CTRL + " + (String.fromCharCode(btn.key)) + ")"))])
      : null;
    child.push(h(QTooltip, { props: {delay: 1000} }, [
      h('div', { domProps: { innerHTML: btn.tip } }),
      Key
    ]));
  }

  if (btn.type === void 0) {
    return h(QBtnToggle, {
      props: extend$1({
        icon: btn.icon,
        label: btn.label,
        dense: true,
        toggled: btn.toggled ? btn.toggled(vm) : btn.cmd && vm.caret.is(btn.cmd, btn.param),
        color: vm.color,
        toggleColor: vm.toggleColor,
        disable: btn.disable ? btn.disable(vm) : false
      }, vm.buttonProps),
      on: events
    }, child)
  }
  if (btn.type === 'no-state') {
    return h(QBtn, {
      props: extend$1({
        icon: btn.icon,
        color: vm.color,
        dense: true,
        label: btn.label,
        disable: btn.disable ? btn.disable(vm) : false
      }, vm.buttonProps),
      on: events
    }, child)
  }
}

function getDropdown (h, vm, btn) {
  var
    label = btn.label,
    icon = btn.icon,
    noIcons = btn.list === 'no-icons',
    onlyIcons = btn.list === 'only-icons',
    Items;

  function closeDropdown () {
    Dropdown.componentInstance.hide();
  }

  if (onlyIcons) {
    Items = btn.options.map(function (btn) {
      var active = btn.type === void 0
        ? vm.caret.is(btn.cmd, btn.param)
        : false;

      if (active) {
        label = btn.tip;
        icon = btn.icon;
      }
      return getBtn(h, vm, btn, closeDropdown)
    });
    Items = [
      h(
        QBtnGroup,
        { props: vm.buttonProps, staticClass: 'relative-position q-editor-toolbar-padding' },
        Items
      )
    ];
  }
  else {
    Items = btn.options.map(function (btn) {
      var disable = btn.disable ? btn.disable(vm) : false;
      var active = btn.type === void 0
        ? vm.caret.is(btn.cmd, btn.param)
        : false;

      if (active) {
        label = btn.tip;
        icon = btn.icon;
      }

      return h(
        QItem,
        {
          props: { active: active, link: !disable },
          staticClass: disable ? 'disabled' : '',
          nativeOn: {
            click: function click (e) {
              if (disable) { return }
              closeDropdown();
              vm.$refs.content.focus();
              vm.caret.restore();
              run(e, btn, vm);
            }
          }
        },
        [
          noIcons ? '' : h(QItemSide, {props: {icon: btn.icon}}),
          h(QItemMain, {
            props: {
              label: btn.htmlTip || btn.tip
            }
          })
        ]
      )
    });
    Items = [ h(QList, { props: { separator: true } }, [ Items ]) ];
  }

  var Dropdown = h(
    QBtnDropdown,
    {
      props: extend$1({
        noCaps: true,
        noWrap: true,
        color: btn.highlight && label !== btn.label ? vm.toggleColor : vm.color,
        label: btn.fixedLabel ? btn.label : label,
        icon: btn.fixedIcon ? btn.icon : icon
      }, vm.buttonProps)
    },
    Items
  );
  return Dropdown
}

function getToolbar (h, vm) {
  if (vm.caret) {
    return vm.buttons.map(function (group) { return h(
      QBtnGroup,
      { props: vm.buttonProps, staticClass: 'relative-position' },
      group.map(function (btn) {
        if (btn.type === 'slot') {
          return vm.$slots[btn.slot]
        }

        if (btn.type === 'dropdown') {
          return getDropdown(h, vm, btn)
        }

        return getBtn(h, vm, btn)
      })
    ); })
  }
}

function getFonts (defaultFont, defaultFontLabel, defaultFontIcon, fonts) {
  if ( fonts === void 0 ) fonts = {};

  var aliases = Object.keys(fonts);
  if (aliases.length === 0) {
    return {}
  }

  var def = {
    default_font: {
      cmd: 'fontName',
      param: defaultFont,
      icon: defaultFontIcon,
      tip: defaultFontLabel
    }
  };

  aliases.forEach(function (alias) {
    var name = fonts[alias];
    def[alias] = {
      cmd: 'fontName',
      param: name,
      icon: defaultFontIcon,
      tip: name,
      htmlTip: ("<font face=\"" + name + "\">" + name + "</font>")
    };
  });

  return def
}

function getLinkEditor (h, vm) {
  if (vm.caret) {
    var link = vm.editLinkUrl;
    var updateLink = function () {
      vm.caret.restore();
      if (link !== vm.editLinkUrl) {
        document.execCommand('createLink', false, link === '' ? ' ' : link);
      }
      vm.editLinkUrl = null;
    };

    return [
      h(QInput, {
        key: 'qedt_btm_input',
        staticClass: 'q-ma-none q-pa-none col',
        props: {
          value: link,
          color: 'dark',
          autofocus: true,
          hideUnderline: true,
          floatLabel: vm.$q.i18n.editor.url
        },
        on: {
          input: function (val) { return (link = val); },
          keyup: function (event) {
            switch (event.keyCode) {
              case 13: // enter
                return updateLink()
              case 27: // escape
                vm.caret.restore();
                vm.editLinkUrl = null;
                break
            }
          }
        }
      }),
      h(QBtnGroup, {
        key: 'qedt_btm_grp',
        props: {
          flat: true
        }
      }, [
        h(QBtn, {
          key: 'qedt_btm_rem',
          attrs: {
            tabindex: -1
          },
          props: {
            color: 'negative',
            label: vm.$q.i18n.label.remove,
            flat: true,
            dense: true,
            noCaps: true
          },
          on: {
            click: function () {
              vm.caret.restore();
              document.execCommand('unlink');
              vm.editLinkUrl = null;
            }
          }
        }),
        h(QBtn, {
          key: 'qedt_btm_upd',
          props: {
            label: vm.$q.i18n.label.update,
            flat: true,
            dense: true,
            noCaps: true
          },
          on: {
            click: updateLink
          }
        })
      ])
    ]
  }
}

function getBlockElement (el, parent) {
  if (parent && el === parent) {
    return null
  }

  var
    style = window.getComputedStyle
      ? window.getComputedStyle(el)
      : el.currentStyle,
    display = style.display;

  if (display === 'block' || display === 'table') {
    return el
  }

  return getBlockElement(el.parentNode)
}

function isChildOf (el, parent) {
  if (!el) {
    return false
  }
  while ((el = el.parentNode)) {
    if (el === document.body) {
      return false
    }
    if (el === parent) {
      return true
    }
  }
  return false
}

var urlRegex = /^https?:\/\//;

var Caret = function Caret (el, vm) {
  this.el = el;
  this.vm = vm;
};

var prototypeAccessors$1 = { selection: { configurable: true },hasSelection: { configurable: true },range: { configurable: true },parent: { configurable: true },blockParent: { configurable: true } };

prototypeAccessors$1.selection.get = function () {
  if (!this.el) {
    return
  }
  var sel = document.getSelection();
  // only when the selection in element
  if (isChildOf(sel.anchorNode, this.el) && isChildOf(sel.focusNode, this.el)) {
    return sel
  }
};

prototypeAccessors$1.hasSelection.get = function () {
  return this.selection
    ? this.selection.toString().length > 0
    : null
};

prototypeAccessors$1.range.get = function () {
  var sel = this.selection;

  if (!sel) {
    return
  }

  return sel.rangeCount
    ? sel.getRangeAt(0)
    : null
};

prototypeAccessors$1.parent.get = function () {
  var range = this.range;
  if (!range) {
    return
  }

  var node = range.startContainer;
  return node.nodeType === document.ELEMENT_NODE
    ? node
    : node.parentNode
};

prototypeAccessors$1.blockParent.get = function () {
  var parent = this.parent;
  if (!parent) {
    return
  }
  return getBlockElement(parent, this.el)
};

Caret.prototype.save = function save (range) {
    if ( range === void 0 ) range = this.range;

  this._range = range;
};

Caret.prototype.restore = function restore (range) {
    if ( range === void 0 ) range = this._range;

  var
    r = document.createRange(),
    sel = document.getSelection();

  if (range) {
    r.setStart(range.startContainer, range.startOffset);
    r.setEnd(range.endContainer, range.endOffset);
    sel.removeAllRanges();
    sel.addRange(r);
  }
  else {
    sel.selectAllChildren(this.el);
    sel.collapseToEnd();
  }
};

Caret.prototype.hasParent = function hasParent (name, spanLevel) {
  var el = spanLevel
    ? this.parent
    : this.blockParent;

  return el
    ? el.nodeName.toLowerCase() === name.toLowerCase()
    : false
};

Caret.prototype.hasParents = function hasParents (list) {
  var el = this.parent;
  return el
    ? list.includes(el.nodeName.toLowerCase())
    : false
};

Caret.prototype.is = function is (cmd, param) {
  switch (cmd) {
    case 'formatBlock':
      if (param === 'DIV' && this.parent === this.el) {
        return true
      }
      return this.hasParent(param, param === 'PRE')
    case 'link':
      return this.hasParent('A', true)
    case 'fontSize':
      return document.queryCommandValue(cmd) === param
    case 'fontName':
      var res = document.queryCommandValue(cmd);
      return res === ("\"" + param + "\"") || res === param
    case 'fullscreen':
      return this.vm.inFullscreen
    default:
      var state = document.queryCommandState(cmd);
      return param ? state === param : state
  }
};

Caret.prototype.getParentAttribute = function getParentAttribute (attrib) {
  if (this.parent) {
    return this.parent.getAttribute(attrib)
  }
};

Caret.prototype.can = function can (name) {
  if (name === 'outdent') {
    return this.hasParents(['blockquote', 'li'])
  }
  if (name === 'indent') {
    var parentName = this.parent ? this.parent.nodeName.toLowerCase() : false;
    if (parentName === 'blockquote') {
      return false
    }
    if (parentName === 'li') {
      var previousEl = this.parent.previousSibling;
      return previousEl && previousEl.nodeName.toLowerCase() === 'li'
    }
    return false
  }
};

Caret.prototype.apply = function apply (cmd, param, done) {
    if ( done === void 0 ) done = function () {};

  if (cmd === 'formatBlock') {
    if (['BLOCKQUOTE', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'PRE'].includes(param) && this.is(cmd, param)) {
      cmd = 'outdent';
      param = null;
    }
  }
  else if (cmd === 'print') {
    done();
    var win = window.open();
    win.document.write(("\n        <!doctype html>\n        <html>\n          <head>\n            <title>Print - " + (document.title) + "</title>\n          </head>\n          <body>\n            <div>" + (this.el.innerHTML) + "</div>\n          </body>\n        </html>\n      "));
    win.print();
    win.close();
    return
  }
  else if (cmd === 'link') {
    var link = this.getParentAttribute('href');
    if (!link) {
      var selection = this.selectWord(this.selection);
      var url = selection ? selection.toString() : '';
      if (!url.length) {
        return
      }
      this.vm.editLinkUrl = urlRegex.test(url) ? url : ("https://" + url);
      document.execCommand('createLink', false, this.vm.editLinkUrl);
    }
    else {
      this.vm.editLinkUrl = link;
    }
    this.range.selectNodeContents(this.parent);
    this.save();
    return
  }
  else if (cmd === 'fullscreen') {
    this.vm.toggleFullscreen();
    done();
    return
  }

  document.execCommand(cmd, false, param);
  done();
};

Caret.prototype.selectWord = function selectWord (sel) {
  if (!sel.isCollapsed) {
    return sel
  }

  // Detect if selection is backwards
  var range = document.createRange();
  range.setStart(sel.anchorNode, sel.anchorOffset);
  range.setEnd(sel.focusNode, sel.focusOffset);
  var direction = range.collapsed ? ['backward', 'forward'] : ['forward', 'backward'];
  range.detach();

  // modify() works on the focus of the selection
  var
    endNode = sel.focusNode,
    endOffset = sel.focusOffset;
  sel.collapse(sel.anchorNode, sel.anchorOffset);
  sel.modify('move', direction[0], 'character');
  sel.modify('move', direction[1], 'word');
  sel.extend(endNode, endOffset);
  sel.modify('extend', direction[1], 'character');
  sel.modify('extend', direction[0], 'word');

  return sel
};

Object.defineProperties( Caret.prototype, prototypeAccessors$1 );

var QEditor = {
  name: 'q-editor',
  mixins: [FullscreenMixin],
  props: {
    value: {
      type: String,
      required: true
    },
    readonly: Boolean,
    disable: Boolean,
    minHeight: {
      type: String,
      default: '10rem'
    },
    maxHeight: String,
    height: String,
    color: String,
    toggleColor: {
      type: String,
      default: 'primary'
    },
    toolbarColor: {
      type: String,
      default: 'grey-4'
    },
    contentColor: {
      type: String,
      default: 'white'
    },
    flat: Boolean,
    outline: Boolean,
    push: Boolean,
    definitions: Object,
    fonts: Object,
    toolbar: {
      type: Array,
      validator: function (v) { return v.length > 0 && v.every(function (group) { return group.length; }); },
      default: function default$1 () {
        return [
          ['left', 'center', 'right', 'justify'],
          ['bold', 'italic', 'underline', 'strike'],
          ['undo', 'redo']
        ]
      }
    }
  },
  computed: {
    editable: function editable () {
      return !this.readonly && !this.disable
    },
    buttonProps: function buttonProps () {
      return {
        outline: this.outline,
        flat: this.flat,
        push: this.push,
        size: 'sm',
        dense: true
      }
    },
    buttonDef: function buttonDef () {
      var
        e = this.$q.i18n.editor,
        i = this.$q.icon.editor;

      return {
        bold: {cmd: 'bold', icon: i.bold, tip: e.bold, key: 66},
        italic: {cmd: 'italic', icon: i.italic, tip: e.italic, key: 73},
        strike: {cmd: 'strikeThrough', icon: i.strikethrough, tip: e.strikethrough, key: 83},
        underline: {cmd: 'underline', icon: i.underline, tip: e.underline, key: 85},
        unordered: {cmd: 'insertUnorderedList', icon: i.unorderedList, tip: e.unorderedList},
        ordered: {cmd: 'insertOrderedList', icon: i.orderedList, tip: e.orderedList},
        subscript: {cmd: 'subscript', icon: i.subscript, tip: e.subscript, htmlTip: 'x<subscript>2</subscript>'},
        superscript: {cmd: 'superscript', icon: i.superscript, tip: e.superscript, htmlTip: 'x<superscript>2</superscript>'},
        link: {cmd: 'link', icon: i.hyperlink, tip: e.hyperlink, key: 76},
        fullscreen: {cmd: 'fullscreen', icon: i.toggleFullscreen, tip: e.toggleFullscreen, key: 70},

        quote: {cmd: 'formatBlock', param: 'BLOCKQUOTE', icon: i.quote, tip: e.quote, key: 81},
        left: {cmd: 'justifyLeft', icon: i.left, tip: e.left},
        center: {cmd: 'justifyCenter', icon: i.center, tip: e.center},
        right: {cmd: 'justifyRight', icon: i.right, tip: e.right},
        justify: {cmd: 'justifyFull', icon: i.justify, tip: e.justify},

        print: {type: 'no-state', cmd: 'print', icon: i.print, tip: e.print, key: 80},
        outdent: {type: 'no-state', disable: function (vm) { return vm.caret && !vm.caret.can('outdent'); }, cmd: 'outdent', icon: i.outdent, tip: e.outdent},
        indent: {type: 'no-state', disable: function (vm) { return vm.caret && !vm.caret.can('indent'); }, cmd: 'indent', icon: i.indent, tip: e.indent},
        removeFormat: {type: 'no-state', cmd: 'removeFormat', icon: i.removeFormat, tip: e.removeFormat},
        hr: {type: 'no-state', cmd: 'insertHorizontalRule', icon: i.hr, tip: e.hr},
        undo: {type: 'no-state', cmd: 'undo', icon: i.undo, tip: e.undo, key: 90},
        redo: {type: 'no-state', cmd: 'redo', icon: i.redo, tip: e.redo, key: 89},

        h1: {cmd: 'formatBlock', param: 'H1', icon: i.header, tip: e.header1, htmlTip: ("<h1>" + (e.header1) + "</h1>")},
        h2: {cmd: 'formatBlock', param: 'H2', icon: i.header, tip: e.header2, htmlTip: ("<h2>" + (e.header2) + "</h2>")},
        h3: {cmd: 'formatBlock', param: 'H3', icon: i.header, tip: e.header3, htmlTip: ("<h3>" + (e.header3) + "</h3>")},
        h4: {cmd: 'formatBlock', param: 'H4', icon: i.header, tip: e.header4, htmlTip: ("<h4>" + (e.header4) + "</h4>")},
        h5: {cmd: 'formatBlock', param: 'H5', icon: i.header, tip: e.header5, htmlTip: ("<h5>" + (e.header5) + "</h5>")},
        h6: {cmd: 'formatBlock', param: 'H6', icon: i.header, tip: e.header6, htmlTip: ("<h6>" + (e.header6) + "</h6>")},
        p: {cmd: 'formatBlock', param: 'DIV', icon: i.header, tip: e.paragraph},
        code: {cmd: 'formatBlock', param: 'PRE', icon: i.code, tip: ("<code>" + (e.code) + "</code>")},

        'size-1': {cmd: 'fontSize', param: '1', icon: i.size, tip: e.size1, htmlTip: ("<font size=\"1\">" + (e.size1) + "</font>")},
        'size-2': {cmd: 'fontSize', param: '2', icon: i.size, tip: e.size2, htmlTip: ("<font size=\"2\">" + (e.size2) + "</font>")},
        'size-3': {cmd: 'fontSize', param: '3', icon: i.size, tip: e.size3, htmlTip: ("<font size=\"3\">" + (e.size3) + "</font>")},
        'size-4': {cmd: 'fontSize', param: '4', icon: i.size, tip: e.size4, htmlTip: ("<font size=\"4\">" + (e.size4) + "</font>")},
        'size-5': {cmd: 'fontSize', param: '5', icon: i.size, tip: e.size5, htmlTip: ("<font size=\"5\">" + (e.size5) + "</font>")},
        'size-6': {cmd: 'fontSize', param: '6', icon: i.size, tip: e.size6, htmlTip: ("<font size=\"6\">" + (e.size6) + "</font>")},
        'size-7': {cmd: 'fontSize', param: '7', icon: i.size, tip: e.size7, htmlTip: ("<font size=\"7\">" + (e.size7) + "</font>")}
      }
    },
    buttons: function buttons () {
      var def = this.definitions || this.fonts
        ? extend$1(
          true,
          {},
          this.buttonDef,
          this.definitions || {},
          getFonts(
            this.defaultFont,
            this.$q.i18n.editor.defaultFont,
            this.$q.icon.editor.font,
            this.fonts
          )
        )
        : this.buttonDef;

      return this.toolbar.map(
        function (group) { return group.map(function (token) {
          if (token.options) {
            return {
              type: 'dropdown',
              icon: token.icon,
              label: token.label,
              fixedLabel: token.fixedLabel,
              fixedIcon: token.fixedIcon,
              highlight: token.highlight,
              list: token.list,
              options: token.options.map(function (item) { return def[item]; })
            }
          }

          var obj = def[token];

          if (obj) {
            return token.handler
              ? extend$1(true, { type: 'no-state' }, obj)
              : obj
          }
          else {
            return {
              type: 'slot',
              slot: token
            }
          }
        }); }
      )
    },
    keys: function keys () {
      var
        k = {},
        add = function (btn) {
          if (btn.key) {
            k[btn.key] = {
              cmd: btn.cmd,
              param: btn.param
            };
          }
        };

      this.buttons.forEach(function (group) {
        group.forEach(function (token) {
          if (token.options) {
            token.options.forEach(add);
          }
          else {
            add(token);
          }
        });
      });
      return k
    }
  },
  data: function data () {
    return {
      editWatcher: true,
      editLinkUrl: null
    }
  },
  watch: {
    value: function value (v) {
      if (this.editWatcher) {
        this.$refs.content.innerHTML = v;
      }
      else {
        this.editWatcher = true;
      }
    }
  },
  methods: {
    onInput: function onInput (e) {
      if (this.editWatcher) {
        this.editWatcher = false;
        this.$emit('input', this.$refs.content.innerHTML);
      }
    },
    onKeydown: function onKeydown (e) {
      var key = getEventKey(e);

      if (!e.ctrlKey) {
        this.refreshToolbar();
        return
      }

      var target = this.keys[key];
      if (target !== void 0) {
        var cmd = target.cmd;
        var param = target.param;
        stopAndPrevent(e);
        this.runCmd(cmd, param, false);
      }
    },
    runCmd: function runCmd (cmd, param, update) {
      var this$1 = this;
      if ( update === void 0 ) update = true;

      this.focus();
      this.caret.apply(cmd, param, function () {
        this$1.focus();
        if (update) {
          this$1.refreshToolbar();
        }
      });
    },
    refreshToolbar: function refreshToolbar () {
      var this$1 = this;

      setTimeout(function () {
        this$1.editLinkUrl = null;
        this$1.$forceUpdate();
      }, 1);
    },
    focus: function focus () {
      this.$refs.content.focus();
    },
    getContentEl: function getContentEl () {
      return this.$refs.content
    }
  },
  created: function created () {
    document.execCommand('defaultParagraphSeparator', false, 'div');
    this.defaultFont = window.getComputedStyle(document.body).fontFamily;
  },
  mounted: function mounted () {
    var this$1 = this;

    this.$nextTick(function () {
      this$1.caret = new Caret(this$1.$refs.content, this$1);
      this$1.$refs.content.innerHTML = this$1.value;
      this$1.$nextTick(this$1.refreshToolbar);
    });
  },
  render: function render (h) {
    var this$1 = this;

    var toolbars = [];
    if (!this.readonly) {
      var toolbarConfig = {
        staticClass: ("q-editor-toolbar q-editor-toolbar-padding overflow-auto row no-wrap bg-" + (this.toolbarColor)),
        'class': {
          'q-editor-toolbar-separator': !this.outline && !this.push
        }
      };
      toolbars.push(h('div', extend$1({key: 'qedt_top'}, toolbarConfig), getToolbar(h, this)));
      if (this.editLinkUrl !== null) {
        toolbars.push(h('div', extend$1({key: 'qedt_btm'}, toolbarConfig), getLinkEditor(h, this)));
      }
    }
    return h(
      'div',
      { staticClass: 'q-editor' },
      [
        h(
          'div',
          {
            staticClass: 'q-editor-inner',
            style: {
              height: this.inFullscreen ? '100vh' : null
            },
            'class': {
              disabled: this.disable,
              fullscreen: this.inFullscreen,
              column: this.inFullscreen
            }
          },
          [
            !toolbars.length ? '' : h('div', toolbars),
            h(
              'div',
              {
                ref: 'content',
                staticClass: ("q-editor-content bg-" + (this.contentColor)),
                style: this.inFullscreen
                  ? {}
                  : { minHeight: this.minHeight, height: this.height, maxHeight: this.maxHeight },
                class: {
                  col: this.inFullscreen,
                  'overflow-auto': this.inFullscreen
                },
                attrs: { contenteditable: this.editable },
                on: {
                  input: this.onInput,
                  keydown: this.onKeydown,
                  click: this.refreshToolbar,
                  blur: function () {
                    this$1.caret.save();
                  }
                }
              }
            )
          ]
        )
      ]
    )
  }
}

var FabMixin = {
  props: {
    outline: Boolean,
    push: Boolean,
    flat: Boolean,
    color: String,
    glossy: Boolean
  }
}

var QFab = {
  name: 'q-fab',
  mixins: [FabMixin, ModelToggleMixin],
  provide: function provide () {
    return {
      __qFabClose: this.hide
    }
  },
  props: {
    icon: String,
    activeIcon: String,
    direction: {
      type: String,
      default: 'right'
    }
  },
  watch: {
    $route: function $route () {
      this.hide();
    }
  },
  created: function created () {
    if (this.value) {
      this.show();
    }
  },
  render: function render (h) {
    return h('div', {
      staticClass: 'q-fab z-fab row inline justify-center',
      'class': {
        'q-fab-opened': this.showing
      }
    }, [
      h(QBtn, {
        props: {
          fab: true,
          outline: this.outline,
          push: this.push,
          flat: this.flat,
          color: this.color,
          glossy: this.glossy
        },
        on: {
          click: this.toggle
        }
      }, [
        this.$slots.tooltip,
        h(QIcon, {
          staticClass: 'q-fab-icon absolute-full',
          props: { name: this.icon || this.$q.icon.fab.icon }
        }),
        h(QIcon, {
          staticClass: 'q-fab-active-icon absolute-full',
          props: { name: this.activeIcon || this.$q.icon.fab.activeIcon }
        })
      ]),

      h('div', {
        staticClass: 'q-fab-actions flex no-wrap inline items-center',
        'class': ("q-fab-" + (this.direction))
      }, [
        this.$slots.default
      ])
    ])
  }
}

var QFabAction = {
  name: 'q-fab-action',
  mixins: [FabMixin],
  inject: {
    __qFabClose: {
      default: function default$1 () {
        console.error('QFabAction needs to be child of QFab');
      }
    }
  },
  props: {
    icon: {
      type: String,
      required: true
    }
  },
  methods: {
    click: function click (e) {
      var this$1 = this;

      this.__qFabClose().then(function () {
        this$1.$emit('click', e);
      });
    }
  },
  render: function render (h) {
    return h(QBtn, {
      props: {
        fabMini: true,
        outline: this.outline,
        push: this.push,
        flat: this.flat,
        color: this.color,
        glossy: this.glossy,
        icon: this.icon
      },
      on: {
        click: this.click
      }
    }, [
      this.$slots.default
    ])
  }
}

var QField = {
  name: 'q-field',
  props: {
    labelWidth: {
      type: Number,
      default: 5,
      validator: function validator (val) {
        return val >= 1 && val < 12
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
    warning: Boolean,
    warningLabel: String,
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
    hasWarning: function hasWarning () {
      return !this.hasError && (this.input.warning || this.warning)
    },
    hasBottom: function hasBottom () {
      return (this.hasError && this.errorLabel) ||
        (this.hasWarning && this.warningLabel) ||
        this.helper ||
        this.count
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
    hasNoInput: function hasNoInput () {
      return !this.input.$options || this.input.__needsBottom
    },
    counter: function counter () {
      if (this.count) {
        var length = this.input.length || '0';
        return Number.isInteger(this.count)
          ? (length + " / " + (this.count))
          : length
      }
    },
    classes: function classes () {
      return {
        'q-field-floating': this.childHasLabel,
        'q-field-no-label': !this.label && !this.$slots.label,
        'q-field-with-error': this.hasError,
        'q-field-with-warning': this.hasWarning,
        'q-field-dark': this.isDark
      }
    }
  },
  provide: function provide () {
    return {
      __field: this
    }
  },
  methods: {
    __registerInput: function __registerInput (vm, needsBottom) {
      vm.__needsBottom = needsBottom;
      this.input = vm;
    },
    __unregisterInput: function __unregisterInput () {
      this.input = {};
    },
    __getBottomContent: function __getBottomContent (h) {
      if (this.hasError && this.errorLabel) {
        return h('div', { staticClass: 'q-field-error col' }, this.errorLabel)
      }
      if (this.hasWarning && this.warningLabel) {
        return h('div', { staticClass: 'q-field-warning col' }, this.warningLabel)
      }
      if (this.helper) {
        return h('div', { staticClass: 'q-field-helper col' }, this.helper)
      }
      return h('div', { staticClass: 'col' })
    }
  },
  render: function render (h) {
    return h('div', {
      staticClass: 'q-field row no-wrap items-start',
      'class': this.classes
    }, [
      this.icon
        ? h(QIcon, {
          props: { name: this.icon },
          staticClass: 'q-field-icon q-field-margin'
        })
        : (this.insetIcon ? h('div', { staticClass: 'q-field-icon' }) : null),

      h('div', { staticClass: 'row col' }, [
        this.hasLabel
          ? h('div', {
            staticClass: 'q-field-label col-xs-12 q-field-margin',
            'class': ("col-sm-" + (this.labelWidth))
          }, [
            h('div', { staticClass: 'q-field-label-inner row items-center' }, [
              this.label,
              this.$slots.label
            ])
          ])
          : null,

        h('div', { staticClass: 'q-field-content col-xs-12 col-sm' }, [
          this.$slots.default,
          this.hasBottom
            ? h('div', {
              staticClass: 'q-field-bottom row no-wrap',
              'class': { 'q-field-no-input': this.hasNoInput }
            }, [
              this.__getBottomContent(h),
              this.counter
                ? h('div', { staticClass: 'q-field-counter col-auto' }, [ this.counter ])
                : null
            ])
            : null
        ])
      ])
    ])
  }
}

var QFieldReset = {
  name: 'q-field-reset',
  provide: function provide () {
    return {
      __field: undefined
    }
  },
  render: function render (h) {
    return h('div', [
      this.$slots.default
    ])
  }
}

var QInfiniteScroll = {
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
  },
  render: function render (h) {
    return h('div', { staticClass: 'q-infinite-scroll' }, [
      h('div', {
        ref: 'content',
        staticClass: 'q-infinite-scroll-content'
      }, [ this.$slots.default ]),
      h('div', {
        staticClass: 'q-infinite-scroll-message',
        directives: [{
          name: 'show',
          value: this.fetching
        }]
      }, [
        this.$slots.message
      ])
    ])
  }
}

var QInnerLoading = {
  name: 'q-inner-loading',
  props: {
    dark: Boolean,
    visible: Boolean,
    size: {
      type: [String, Number],
      default: 42
    },
    color: String
  },
  render: function render (h) {
    if (!this.visible) {
      return
    }

    return h('div', {
      staticClass: 'q-inner-loading animate-fade absolute-full column flex-center',
      'class': { dark: this.dark }
    }, [
      this.$slots.default ||
      h(QSpinner, {
        props: {
          size: this.size,
          color: this.color
        }
      })
    ])
  }
}

var QKnob = {
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
      default: 'grey-3'
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
    classes: function classes () {
      var cls = [];
      if (this.disable) {
        cls.push('disabled');
      }
      if (!this.readonly) {
        cls.push('cursor-pointer');
      }
      if (this.color) {
        cls.push(("text-" + (this.color)));
      }
      return cls
    },
    svgStyle: function svgStyle () {
      return {
        'stroke-dasharray': '295.31px, 295.31px',
        'stroke-dashoffset': (295.31 * (1.0 - (this.model - this.min) / (this.max - this.min))) + 'px',
        'transition': this.dragging ? '' : 'stroke-dashoffset 0.6s ease 0s, stroke 0.6s ease'
      }
    },
    editable: function editable () {
      return !this.disable && !this.readonly
    }
  },
  data: function data () {
    return {
      model: this.value,
      dragging: false
    }
  },
  watch: {
    value: function value (value$1) {
      if (value$1 < this.min) {
        this.$emit('input', this.min);
        this.model = this.min;
      }
      else if (value$1 > this.max) {
        this.$emit('input', this.max);
        this.model = this.max;
      }
      else {
        this.model = value$1;
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
      stopAndPrevent(ev);

      this.centerPosition = this.__getCenter();

      this.dragging = true;
      this.__onInput(ev);
    },
    __dragMove: function __dragMove (ev) {
      if (!this.dragging || !this.editable) {
        return
      }
      stopAndPrevent(ev);
      this.__onInput(ev, this.centerPosition);
    },
    __dragStop: function __dragStop (ev) {
      if (!this.editable) {
        return
      }
      stopAndPrevent(ev);
      this.dragging = false;
      this.__onInput(ev, this.centerPosition, true);
    },
    __onInput: function __onInput (ev, center, emitChange) {
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

      var val = between(
        model - modulo + (Math.abs(modulo) >= this.step / 2 ? (modulo < 0 ? -1 : 1) * this.step : 0),
        this.min,
        this.max
      );

      if (this.model !== val) {
        this.model = val;
        this.$emit('input', val);
      }
      if (emitChange) {
        this.$emit('change', val);
      }
    },
    __getCenter: function __getCenter () {
      var knobOffset = offset(this.$el);
      return {
        top: knobOffset.top + height(this.$el) / 2,
        left: knobOffset.left + width(this.$el) / 2
      }
    }
  },
  render: function render (h) {
    var this$1 = this;

    return h('div', {
      staticClass: 'q-knob non-selectable',
      'class': this.classes,
      style: {
        width: this.size,
        height: this.size
      }
    }, [
      h('div', {
        on: {
          click: function (e) { return this$1.__onInput(e, undefined, true); }
        },
        directives: [{
          name: 'touch-pan',
          value: this.__pan
        }]
      }, [
        h('svg', { attrs: { viewBox: '0 0 100 100' } }, [
          h('path', {
            attrs: {
              d: 'M 50,50 m 0,-47 a 47,47 0 1 1 0,94 a 47,47 0 1 1 0,-94',
              'fill-opacity': '0',
              stroke: 'currentColor',
              'stroke-width': this.lineWidth
            },
            'class': ("text-" + (this.trackColor))
          }),
          h('path', {
            attrs: {
              d: 'M 50,50 m 0,-47 a 47,47 0 1 1 0,94 a 47,47 0 1 1 0,-94',
              'fill-opacity': '0',
              stroke: 'currentColor',
              'stroke-linecap': 'round',
              'stroke-width': this.lineWidth
            },
            style: this.svgStyle
          })
        ]),

        h('div', {
          staticClass: 'q-knob-label row flex-center content-center'
        }, [
          this.$slots.default
            ? this.$slots.default
            : h('span', [ this.model ])
        ])
      ])
    ])
  }
}

var QLayout = {
  name: 'q-layout',
  provide: function provide () {
    return {
      layout: this
    }
  },
  props: {
    view: {
      type: String,
      default: 'hhh lpr fff',
      validator: function (v) { return /^(h|l)h(h|r) lpr (f|l)f(f|r)$/.test(v.toLowerCase()); }
    }
  },
  data: function data () {
    var ref = viewport();
    var height$$1 = ref.height;
    var width$$1 = ref.width;

    return {
      height: height$$1, // window height
      width: width$$1, // window width

      header: {
        size: 0,
        offset: 0,
        space: true
      },
      right: {
        size: 300,
        offset: 0,
        space: false
      },
      footer: {
        size: 0,
        offset: 0,
        space: true
      },
      left: {
        size: 300,
        offset: 0,
        space: false
      },

      scrollHeight: 0,
      scroll: {
        position: 0,
        direction: 'down'
      }
    }
  },
  computed: {
    rows: function rows () {
      var rows = this.view.toLowerCase().split(' ');
      return {
        top: rows[0].split(''),
        middle: rows[1].split(''),
        bottom: rows[2].split('')
      }
    }
  },
  render: function render (h) {
    return h('div', { staticClass: 'q-layout' }, [
      h(QScrollObservable, {
        on: { scroll: this.__onPageScroll }
      }),
      h(QResizeObservable, {
        on: { resize: this.__onLayoutResize }
      }),
      h(QWindowResizeObservable, {
        on: { resize: this.__onWindowResize }
      }),
      this.$slots.default
    ])
  },
  methods: {
    __animate: function __animate () {
      var this$1 = this;

      if (this.timer) {
        clearTimeout(this.timer);
      }
      else {
        document.body.classList.add('q-layout-animate');
      }
      this.timer = setTimeout(function () {
        document.body.classList.remove('q-layout-animate');
        this$1.timer = null;
      }, 150);
    },
    __onPageScroll: function __onPageScroll (data) {
      this.scroll = data;
      this.$emit('scroll', data);
    },
    __onLayoutResize: function __onLayoutResize () {
      this.scrollHeight = getScrollHeight(this.$el);
      this.$emit('scrollHeight', this.scrollHeight);
    },
    __onWindowResize: function __onWindowResize (ref) {
      var height$$1 = ref.height;
      var width$$1 = ref.width;

      if (this.height !== height$$1) {
        this.height = height$$1;
      }
      if (this.width !== width$$1) {
        this.width = width$$1;
      }
    }
  }
}

var bodyClassBelow = 'with-layout-drawer-opened';
var bodyClassAbove = 'with-layout-drawer-opened-above';
var duration = 150;

var QLayoutDrawer = {
  name: 'q-layout-drawer',
  inject: {
    layout: {
      default: function default$1 () {
        console.error('QLayoutDrawer needs to be child of QLayout');
      }
    }
  },
  mixins: [ModelToggleMixin],
  directives: {
    TouchPan: TouchPan
  },
  props: {
    overlay: Boolean,
    side: {
      type: String,
      default: 'left',
      validator: function (v) { return ['left', 'right'].includes(v); }
    },
    breakpoint: {
      type: Number,
      default: 992
    },
    behavior: {
      type: String,
      validator: function (v) { return ['default', 'desktop', 'mobile'].includes(v); },
      default: 'default'
    },
    contentStyle: Object,
    contentClass: [String, Object, Array]
  },
  data: function data () {
    var
      largeScreenState = this.value !== void 0 ? this.value : true,
      showing = this.behavior !== 'mobile' && this.breakpoint < this.layout.width && !this.overlay
        ? largeScreenState
        : false;

    if (this.value !== void 0 && this.value !== showing) {
      this.$emit('input', showing);
    }

    return {
      showing: showing,
      belowBreakpoint: (
        this.behavior === 'mobile' ||
        (this.behavior !== 'desktop' && this.breakpoint >= this.layout.width)
      ),
      largeScreenState: largeScreenState,
      mobileOpened: false,

      size: 300,
      inTransit: false,
      position: 0,
      percentage: 0
    }
  },
  watch: {
    belowBreakpoint: function belowBreakpoint (val, old) {
      if (this.mobileOpened) {
        return
      }

      if (val) { // from lg to xs
        if (!this.overlay) {
          this.largeScreenState = this.showing;
        }
        // ensure we close it for small screen
        this.hide();
      }
      else if (!this.overlay) { // from xs to lg
        this[this.largeScreenState ? 'show' : 'hide']();
      }
    },
    behavior: function behavior (val) {
      this.__updateLocal('belowBreakpoint', (
        val === 'mobile' ||
        (val !== 'desktop' && this.breakpoint >= this.layout.width)
      ));
    },
    breakpoint: function breakpoint (val) {
      this.__updateLocal('belowBreakpoint', (
        this.behavior === 'mobile' ||
        (this.behavior !== 'desktop' && val >= this.layout.width)
      ));
    },
    'layout.width': function layout_width (val) {
      this.__updateLocal('belowBreakpoint', (
        this.behavior === 'mobile' ||
        (this.behavior !== 'desktop' && this.breakpoint >= val)
      ));
    },
    offset: function offset$$1 (val) {
      this.__update('offset', val);
    },
    onScreenOverlay: function onScreenOverlay () {
      if (this.animateOverlay) {
        this.layout.__animate();
      }
    },
    onLayout: function onLayout (val) {
      this.__update('space', val);
      this.layout.__animate();
    },
    $route: function $route () {
      if (this.mobileOpened) {
        this.hide();
        return
      }
      if (this.onScreenOverlay) {
        this.hide();
      }
    }
  },
  computed: {
    rightSide: function rightSide () {
      return this.side === 'right'
    },
    offset: function offset$$1 () {
      return this.showing && !this.mobileOpened
        ? this.size
        : 0
    },
    fixed: function fixed () {
      return this.overlay || this.layout.view.indexOf(this.rightSide ? 'R' : 'L') > -1
    },
    onLayout: function onLayout () {
      return this.showing && !this.mobileView && !this.overlay
    },
    onScreenOverlay: function onScreenOverlay () {
      return this.showing && !this.mobileView && this.overlay
    },
    backdropClass: function backdropClass () {
      return {
        'q-layout-backdrop-transition': !this.inTransit,
        'no-pointer-events': !this.inTransit && !this.showing
      }
    },
    mobileView: function mobileView () {
      return this.belowBreakpoint || this.mobileOpened
    },
    headerSlot: function headerSlot () {
      return this.overlay
        ? false
        : (this.rightSide
          ? this.layout.rows.top[2] === 'r'
          : this.layout.rows.top[0] === 'l'
        )
    },
    footerSlot: function footerSlot () {
      return this.overlay
        ? false
        : (this.rightSide
          ? this.layout.rows.bottom[2] === 'r'
          : this.layout.rows.bottom[0] === 'l'
        )
    },
    backdropStyle: function backdropStyle () {
      return { backgroundColor: ("rgba(0,0,0," + (this.percentage * 0.4) + ")") }
    },
    belowClass: function belowClass () {
      return {
        'fixed': true,
        'on-top': true,
        'on-screen': this.showing,
        'off-screen': !this.showing,
        'transition-generic': !this.inTransit,
        'top-padding': this.fixed || this.headerSlot
      }
    },
    belowStyle: function belowStyle () {
      if (this.inTransit) {
        return cssTransform(("translateX(" + (this.position) + "px)"))
      }
    },
    aboveClass: function aboveClass () {
      var onScreen = this.onLayout || this.onScreenOverlay;
      return {
        'off-screen': !onScreen,
        'on-screen': onScreen,
        'fixed': this.fixed || !this.onLayout,
        'top-padding': this.fixed || this.headerSlot
      }
    },
    aboveStyle: function aboveStyle () {
      var css$$1 = {};

      if (this.layout.header.space && !this.headerSlot) {
        if (this.fixed) {
          css$$1.top = (this.layout.header.offset) + "px";
        }
        else if (this.layout.header.space) {
          css$$1.top = (this.layout.header.size) + "px";
        }
      }

      if (this.layout.footer.space && !this.footerSlot) {
        if (this.fixed) {
          css$$1.bottom = (this.layout.footer.offset) + "px";
        }
        else if (this.layout.footer.space) {
          css$$1.bottom = (this.layout.footer.size) + "px";
        }
      }

      return css$$1
    },
    computedStyle: function computedStyle () {
      return [this.contentStyle, this.mobileView ? this.belowStyle : this.aboveStyle]
    },
    computedClass: function computedClass () {
      return [this.contentClass, this.mobileView ? this.belowClass : this.aboveClass]
    }
  },
  render: function render (h) {
    var child = [];

    if (this.mobileView) {
      child.push(h('div', {
        staticClass: ("q-layout-drawer-opener fixed-" + (this.side)),
        directives: [{
          name: 'touch-pan',
          modifiers: { horizontal: true },
          value: this.__openByTouch
        }]
      }));
      child.push(h('div', {
        staticClass: 'fullscreen q-layout-backdrop',
        'class': this.backdropClass,
        style: this.backdropStyle,
        on: { click: this.hide },
        directives: [{
          name: 'touch-pan',
          modifiers: { horizontal: true },
          value: this.__closeByTouch
        }]
      }));
    }

    return h('div', { staticClass: 'q-drawer-container' }, child.concat([
      h('aside', {
        staticClass: ("q-layout-drawer q-layout-drawer-" + (this.side) + " scroll q-layout-transition"),
        'class': this.computedClass,
        style: this.computedStyle,
        attrs: this.$attrs,
        listeners: this.$listeners,
        directives: this.mobileView ? [{
          name: 'touch-pan',
          modifiers: { horizontal: true },
          value: this.__closeByTouch
        }] : null
      }, [
        this.$slots.default,
        h(QResizeObservable, {
          on: { resize: this.__onResize }
        })
      ])
    ]))
  },
  created: function created () {
    var this$1 = this;

    if (this.onLayout) {
      this.__update('space', true);
      this.__update('offset', this.offset);
    }

    this.$nextTick(function () {
      this$1.animateOverlay = true;
    });
  },
  beforeDestroy: function beforeDestroy () {
    clearTimeout(this.timer);
    this.__update('size', 0);
    this.__update('space', false);
  },
  methods: {
    __openByTouch: function __openByTouch (evt) {
      if (!this.belowBreakpoint) {
        return
      }
      var
        width$$1 = this.size,
        position = between(evt.distance.x, 0, width$$1);

      if (evt.isFinal) {
        var opened = position >= Math.min(75, width$$1);
        this.inTransit = false;
        if (opened) { this.show(); }
        else { this.percentage = 0; }
        return
      }

      this.position = this.rightSide
        ? Math.max(width$$1 - position, 0)
        : Math.min(0, position - width$$1);

      this.percentage = between(position / width$$1, 0, 1);

      if (evt.isFirst) {
        document.body.classList.add(bodyClassBelow);
        this.inTransit = true;
      }
    },
    __closeByTouch: function __closeByTouch (evt) {
      if (!this.mobileOpened) {
        return
      }

      var
        width$$1 = this.size,
        position = evt.direction === this.side
          ? between(evt.distance.x, 0, width$$1)
          : 0;

      if (evt.isFinal) {
        var opened = Math.abs(position) < Math.min(75, width$$1);
        this.inTransit = false;
        if (opened) { this.percentage = 1; }
        else { this.hide(); }
        return
      }

      this.position = (this.rightSide ? 1 : -1) * position;
      this.percentage = between(1 - position / width$$1, 0, 1);

      if (evt.isFirst) {
        this.inTransit = true;
      }
    },
    __show: function __show () {
      var this$1 = this;

      if (this.belowBreakpoint) {
        this.mobileOpened = true;
        this.percentage = 1;
      }

      document.body.classList.add(this.belowBreakpoint ? bodyClassBelow : bodyClassAbove);

      clearTimeout(this.timer);
      this.timer = setTimeout(function () {
        if (this$1.showPromise) {
          this$1.showPromise.then(function () {
            document.body.classList.remove(bodyClassAbove);
          });
          this$1.showPromiseResolve();
        }
      }, duration);
    },
    __hide: function __hide () {
      var this$1 = this;

      this.mobileOpened = false;
      this.percentage = 0;

      document.body.classList.remove(bodyClassAbove);
      document.body.classList.remove(bodyClassBelow);

      clearTimeout(this.timer);
      this.timer = setTimeout(function () {
        this$1.hidePromise && this$1.hidePromiseResolve();
      }, duration);
    },

    __onResize: function __onResize (ref) {
      var width$$1 = ref.width;

      this.__update('size', width$$1);
      this.__updateLocal('size', width$$1);
    },
    __update: function __update (prop, val) {
      if (this.layout[this.side][prop] !== val) {
        this.layout[this.side][prop] = val;
      }
    },
    __updateLocal: function __updateLocal (prop, val) {
      if (this[prop] !== val) {
        this[prop] = val;
      }
    }
  }
}

var QLayoutFooter = {
  name: 'q-layout-footer',
  inject: {
    layout: {
      default: function default$1 () {
        console.error('QLayoutFooter needs to be child of QLayout');
      }
    }
  },
  props: {
    value: {
      type: Boolean,
      default: true
    },
    reveal: Boolean
  },
  data: function data () {
    return {
      size: 0,
      revealed: true
    }
  },
  watch: {
    value: function value (val) {
      this.__update('space', val);
      this.__updateLocal('revealed', true);
      this.layout.__animate();
    },
    offset: function offset (val) {
      this.__update('offset', val);
    },
    revealed: function revealed () {
      this.layout.__animate();
    },
    'layout.scroll': function layout_scroll () {
      this.__updateRevealed();
    },
    'layout.scrollHeight': function layout_scrollHeight () {
      this.__updateRevealed();
    },
    size: function size () {
      this.__updateRevealed();
    }
  },
  computed: {
    fixed: function fixed () {
      return this.reveal || this.layout.view.indexOf('F') > -1
    },
    offset: function offset () {
      if (!this.value) {
        return 0
      }
      if (this.fixed) {
        return this.revealed ? this.size : 0
      }
      var offset = this.layout.height + this.layout.scroll.position + this.size - this.layout.scrollHeight;
      return offset > 0 ? offset : 0
    },
    computedClass: function computedClass () {
      return {
        'fixed-bottom': this.fixed,
        'absolute-bottom': !this.fixed,
        'hidden': !this.value && !this.fixed,
        'q-layout-footer-hidden': !this.value || (this.fixed && !this.revealed)
      }
    },
    computedStyle: function computedStyle () {
      var
        view = this.layout.rows.bottom,
        css = {};

      if (view[0] === 'l' && this.layout.left.space) {
        css.marginLeft = (this.layout.left.size) + "px";
      }
      if (view[2] === 'r' && this.layout.right.space) {
        css.marginRight = (this.layout.right.size) + "px";
      }

      return css
    }
  },
  render: function render (h) {
    return h('footer', {
      staticClass: 'q-layout-footer q-layout-transition',
      'class': this.computedClass,
      style: this.computedStyle
    }, [
      h(QResizeObservable, {
        on: { resize: this.__onResize }
      }),
      this.$slots.default
    ])
  },
  created: function created () {
    this.__update('space', this.value);
  },
  destroyed: function destroyed () {
    this.__update('size', 0);
    this.__update('space', false);
  },
  methods: {
    __onResize: function __onResize (ref) {
      var height = ref.height;

      this.__updateLocal('size', height);
      this.__update('size', height);
    },
    __update: function __update (prop, val) {
      if (this.layout.footer[prop] !== val) {
        this.layout.footer[prop] = val;
      }
    },
    __updateLocal: function __updateLocal (prop, val) {
      if (this[prop] !== val) {
        this[prop] = val;
      }
    },
    __updateRevealed: function __updateRevealed () {
      if (!this.reveal) {
        return
      }
      var
        scroll = this.layout.scroll,
        scrollHeight = this.layout.scrollHeight,
        height = this.layout.height;

      this.__updateLocal('revealed',
        scroll.direction === 'up' ||
        scroll.position - scroll.inflexionPosition < 100 ||
        scrollHeight - height - scroll.position < this.size + 300
      );
    }
  }
}

var QLayoutHeader = {
  name: 'q-layout-header',
  inject: {
    layout: {
      default: function default$1 () {
        console.error('QLayoutHeader needs to be child of QLayout');
      }
    }
  },
  props: {
    value: {
      type: Boolean,
      default: true
    },
    reveal: Boolean,
    revealOffset: {
      type: Number,
      default: 250
    }
  },
  data: function data () {
    return {
      size: 0,
      revealed: true
    }
  },
  watch: {
    value: function value (val) {
      this.__update('space', val);
      this.__updateLocal('revealed', true);
      this.layout.__animate();
    },
    offset: function offset (val) {
      this.__update('offset', val);
    },
    revealed: function revealed () {
      this.layout.__animate();
    },
    'layout.scroll': function layout_scroll (scroll) {
      if (!this.reveal) {
        return
      }
      this.__updateLocal('revealed',
        scroll.direction === 'up' ||
        scroll.position <= this.revealOffset ||
        scroll.position - scroll.inflexionPosition < 100
      );
    }
  },
  computed: {
    fixed: function fixed () {
      return this.reveal || this.layout.view.indexOf('H') > -1
    },
    offset: function offset () {
      if (!this.value) {
        return 0
      }
      if (this.fixed) {
        return this.revealed ? this.size : 0
      }
      var offset = this.size - this.layout.scroll.position;
      return offset > 0 ? offset : 0
    },
    computedClass: function computedClass () {
      return {
        'fixed-top': this.fixed,
        'absolute-top': !this.fixed,
        'q-layout-header-hidden': !this.value || (this.fixed && !this.revealed)
      }
    },
    computedStyle: function computedStyle () {
      var
        view = this.layout.rows.top,
        css = {};

      if (view[0] === 'l' && this.layout.left.space) {
        css.marginLeft = (this.layout.left.size) + "px";
      }
      if (view[2] === 'r' && this.layout.right.space) {
        css.marginRight = (this.layout.right.size) + "px";
      }

      return css
    }
  },
  render: function render (h) {
    return h('header', {
      staticClass: 'q-layout-header q-layout-transition',
      'class': this.computedClass,
      style: this.computedStyle
    }, [
      h(QResizeObservable, {
        on: { resize: this.__onResize }
      }),
      this.$slots.default
    ])
  },
  created: function created () {
    this.__update('space', this.value);
  },
  destroyed: function destroyed () {
    this.__update('size', 0);
    this.__update('space', false);
  },
  methods: {
    __onResize: function __onResize (ref) {
      var height = ref.height;

      this.__updateLocal('size', height);
      this.__update('size', height);
    },
    __update: function __update (prop, val) {
      if (this.layout.header[prop] !== val) {
        this.layout.header[prop] = val;
      }
    },
    __updateLocal: function __updateLocal (prop, val) {
      if (this[prop] !== val) {
        this[prop] = val;
      }
    }
  }
}

var QPage = {
  name: 'q-page',
  inject: {
    pageContainer: {
      default: function default$1 () {
        console.error('QPage needs to be child of QPageContainer');
      }
    },
    layout: {}
  },
  props: {
    padding: Boolean
  },
  computed: {
    computedStyle: function computedStyle () {
      var offset =
        (this.layout.header.space ? this.layout.header.size : 0) +
        (this.layout.footer.space ? this.layout.footer.size : 0);

      return {
        minHeight: offset ? ("calc(100vh - " + offset + "px)") : '100vh'
      }
    },
    computedClass: function computedClass () {
      if (this.padding) {
        return 'layout-padding'
      }
    }
  },
  render: function render (h) {
    return h('main', {
      staticClass: 'q-layout-page',
      style: this.computedStyle,
      'class': this.computedClass
    }, [
      this.$slots.default
    ])
  }
}

var QPageContainer = {
  name: 'q-page-container',
  inject: {
    layout: {
      default: function default$1 () {
        console.error('QPageContainer needs to be child of QLayout');
      }
    }
  },
  provide: {
    pageContainer: true
  },
  computed: {
    computedStyle: function computedStyle () {
      var css = {};

      if (this.layout.header.space) {
        css.paddingTop = (this.layout.header.size) + "px";
      }
      if (this.layout.right.space) {
        css.paddingRight = (this.layout.right.size) + "px";
      }
      if (this.layout.footer.space) {
        css.paddingBottom = (this.layout.footer.size) + "px";
      }
      if (this.layout.left.space) {
        css.paddingLeft = (this.layout.left.size) + "px";
      }

      return css
    }
  },
  render: function render (h) {
    return h('div', {
      staticClass: 'q-layout-page-container q-layout-transition',
      style: this.computedStyle
    }, [
      this.$slots.default
    ])
  }
}

var QPageSticky = {
  name: 'q-page-sticky',
  inject: {
    layout: {
      default: function default$1 () {
        console.error('QPageSticky needs to be child of QLayout');
      }
    }
  },
  props: {
    position: {
      type: String,
      default: 'bottom-right',
      validator: function (v) { return [
        'top-right', 'top-left',
        'bottom-right', 'bottom-left',
        'top', 'right', 'bottom', 'left'
      ].includes(v); }
    },
    offset: {
      type: Array,
      validator: function (v) { return v.length === 2; }
    }
  },
  computed: {
    attach: function attach () {
      var pos = this.position;

      return {
        top: pos.indexOf('top') > -1,
        right: pos.indexOf('right') > -1,
        bottom: pos.indexOf('bottom') > -1,
        left: pos.indexOf('left') > -1,
        vertical: pos === 'top' || pos === 'bottom',
        horizontal: pos === 'left' || pos === 'right'
      }
    },
    top: function top () {
      return this.layout.header.offset
    },
    right: function right () {
      return this.layout.right.offset
    },
    bottom: function bottom () {
      return this.layout.footer.offset
    },
    left: function left () {
      return this.layout.left.offset
    },
    computedStyle: function computedStyle () {
      var
        attach = this.attach,
        transforms = [];

      if (attach.top && this.top) {
        transforms.push(("translateY(" + (this.top) + "px)"));
      }
      else if (attach.bottom && this.bottom) {
        transforms.push(("translateY(" + (-this.bottom) + "px)"));
      }

      if (attach.left && this.left) {
        transforms.push(("translateX(" + (this.left) + "px)"));
      }
      else if (attach.right && this.right) {
        transforms.push(("translateX(" + (-this.right) + "px)"));
      }

      var css$$1 = transforms.length
        ? cssTransform(transforms.join(' '))
        : {};

      if (this.offset) {
        css$$1.margin = (this.offset[1]) + "px " + (this.offset[0]) + "px";
      }

      if (attach.vertical) {
        if (this.left) {
          css$$1.left = (this.left) + "px";
        }
        if (this.right) {
          css$$1.right = (this.right) + "px";
        }
      }
      else if (attach.horizontal) {
        if (this.top) {
          css$$1.top = (this.top) + "px";
        }
        if (this.bottom) {
          css$$1.bottom = (this.bottom) + "px";
        }
      }

      return css$$1
    }
  },
  render: function render (h) {
    return h('div', {
      staticClass: 'q-page-sticky q-layout-transition z-fixed',
      'class': ("fixed-" + (this.position)),
      style: this.computedStyle
    }, [
      this.$slots.default
    ])
  }
}

var QPagination = {
  name: 'q-pagination',
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
    color: {
      type: String,
      default: 'primary'
    },
    size: String,
    disable: Boolean,
    input: Boolean,
    boundaryLinks: {
      type: Boolean,
      default: null
    },
    boundaryNumbers: {
      type: Boolean,
      default: null
    },
    directionLinks: {
      type: Boolean,
      default: null
    },
    ellipses: {
      type: Boolean,
      default: null
    },
    maxPages: {
      type: Number,
      default: 0,
      validator: function (v) {
        if (v < 0) {
          console.error('maxPages should not be negative');
          return false
        }
        return true
      }
    }
  },
  data: function data () {
    return {
      newPage: null
    }
  },
  watch: {
    min: function min (value) {
      this.model = this.value;
    },
    max: function max (value) {
      this.model = this.value;
    }
  },
  computed: {
    model: {
      get: function get () {
        return this.value
      },
      set: function set (value) {
        if (this.disable || !value || isNaN(value)) {
          return
        }
        var model = between(parseInt(value, 10), this.min, this.max);
        if (this.value !== model) {
          this.$emit('input', model);
        }
        this.$emit('change', model);
      }
    },
    inputPlaceholder: function inputPlaceholder () {
      return this.model + ' / ' + this.max
    },
    __boundaryLinks: function __boundaryLinks () {
      return this.__getBool(this.boundaryLinks, this.input)
    },
    __boundaryNumbers: function __boundaryNumbers () {
      return this.__getBool(this.boundaryNumbers, !this.input)
    },
    __directionLinks: function __directionLinks () {
      return this.__getBool(this.directionLinks, this.input)
    },
    __ellipses: function __ellipses () {
      return this.__getBool(this.ellipses, !this.input)
    }
  },
  methods: {
    set: function set (value) {
      this.model = value;
    },
    setByOffset: function setByOffset (offset) {
      this.model = this.model + offset;
    },
    __update: function __update () {
      this.model = this.newPage;
      this.newPage = null;
    },
    __getRepeatEasing: function __getRepeatEasing (from, step, to) {
      if ( from === void 0 ) from = 300;
      if ( step === void 0 ) step = 10;
      if ( to === void 0 ) to = 100;

      return function (cnt) { return cnt ? Math.max(to, from - cnt * cnt * step) : 100; }
    },
    __getBool: function __getBool (val, otherwise) {
      return [true, false].includes(val)
        ? val
        : otherwise
    },
    __getBtn: function __getBtn (h, props) {
      return h(QBtn, extend$1(true, {
        props: {
          color: this.color,
          flat: true,
          size: this.size
        }
      }, props))
    }
  },
  render: function render (h) {
    var this$1 = this;

    var
      contentStart = [],
      contentEnd = [],
      contentMiddle = [];

    if (this.__boundaryLinks) {
      contentStart.push(this.__getBtn(h, {
        key: 'bls',
        props: {
          disable: this.disable || this.value <= this.min,
          icon: this.$q.icon.pagination.first
        },
        on: {
          click: function () { return this$1.set(this$1.min); }
        }
      }));
      contentEnd.unshift(this.__getBtn(h, {
        key: 'ble',
        props: {
          disable: this.disable || this.value >= this.max,
          icon: this.$q.icon.pagination.last
        },
        on: {
          click: function () { return this$1.set(this$1.max); }
        }
      }));
    }

    if (this.__directionLinks) {
      contentStart.push(this.__getBtn(h, {
        key: 'bdp',
        props: {
          disable: this.disable || this.value <= this.min,
          icon: this.$q.icon.pagination.prev,
          repeatTimeout: this.__getRepeatEasing()
        },
        on: {
          click: function () { return this$1.setByOffset(-1); }
        }
      }));
      contentEnd.unshift(this.__getBtn(h, {
        key: 'bdn',
        props: {
          disable: this.disable || this.value >= this.max,
          icon: this.$q.icon.pagination.next,
          repeatTimeout: this.__getRepeatEasing()
        },
        on: {
          click: function () { return this$1.setByOffset(1); }
        }
      }));
    }

    if (this.input) {
      contentMiddle.push(h(QInput, {
        staticClass: 'inline no-margin no-padding',
        style: {
          width: ((this.inputPlaceholder.length) + "rem")
        },
        props: {
          type: 'number',
          value: this.newPage,
          noNumberToggle: true,
          min: this.min,
          max: this.max,
          color: this.color,
          placeholder: this.inputPlaceholder,
          disable: this.disable,
          hideUnderline: true
        },
        on: {
          input: function (value) { return (this$1.newPage = value); },
          keyup: function (event) { return (event.keyCode === 13 && this$1.__update()); },
          blur: function () { return this$1.__update(); }
        }
      }));
    }
    else { // is type select
      var
        maxPages = Math.max(
          this.maxPages,
          1 + (this.__ellipses ? 2 : 0) + (this.__boundaryNumbers ? 2 : 0)
        ),
        pgFrom = this.min,
        pgTo = this.max,
        ellipsesStart = false,
        ellipsesEnd = false,
        boundaryStart = false,
        boundaryEnd = false;

      if (this.maxPages && maxPages < (this.max - this.min + 1)) {
        maxPages = 1 + Math.floor(maxPages / 2) * 2;
        pgFrom = Math.max(this.min, Math.min(this.max - maxPages + 1, this.value - Math.floor(maxPages / 2)));
        pgTo = Math.min(this.max, pgFrom + maxPages - 1);
        if (this.__boundaryNumbers && pgFrom > this.min) {
          boundaryStart = true;
          pgFrom += 1;
        }
        if (this.__ellipses && pgFrom > (this.min + (this.__boundaryNumbers ? 1 : 0))) {
          ellipsesStart = true;
          pgFrom += 1;
        }
        if (this.__boundaryNumbers && pgTo < this.max) {
          boundaryEnd = true;
          pgTo -= 1;
        }
        if (this.__ellipses && pgTo < (this.max - (this.__boundaryNumbers ? 1 : 0))) {
          ellipsesEnd = true;
          pgTo -= 1;
        }
      }
      var style = {
        minWidth: ((Math.max(1.5, String(this.max).length)) + "em")
      };
      if (boundaryStart) {
        contentStart.push(this.__getBtn(h, {
          key: 'bns',
          style: style,
          props: {
            disable: this.disable || this.value <= this.min,
            label: this.min
          },
          on: {
            click: function () { return this$1.set(this$1.min); }
          }
        }));
      }
      if (boundaryEnd) {
        contentEnd.unshift(this.__getBtn(h, {
          key: 'bne',
          style: style,
          props: {
            disable: this.disable || this.value >= this.max,
            label: this.max
          },
          on: {
            click: function () { return this$1.set(this$1.max); }
          }
        }));
      }
      if (ellipsesStart) {
        contentStart.push(this.__getBtn(h, {
          key: 'bes',
          style: style,
          props: {
            disable: this.disable,
            label: '…',
            repeatTimeout: this.__getRepeatEasing()
          },
          on: {
            click: function () { return this$1.set(pgFrom - 1); }
          }
        }));
      }
      if (ellipsesEnd) {
        contentEnd.unshift(this.__getBtn(h, {
          key: 'bee',
          style: style,
          props: {
            disable: this.disable,
            label: '…',
            repeatTimeout: this.__getRepeatEasing()
          },
          on: {
            click: function () { return this$1.set(pgTo + 1); }
          }
        }));
      }
      var loop = function ( i ) {
        contentMiddle.push(this$1.__getBtn(h, {
          key: (i + "." + (i === this$1.value)),
          style: style,
          props: {
            disable: this$1.disable,
            flat: i !== this$1.value,
            label: i,
            noRipple: true
          },
          on: {
            click: function () { return this$1.set(i); }
          }
        }));
      };

      for (var i = pgFrom; i <= pgTo; i++) loop( i );
    }

    return h('div', {
      staticClass: 'q-pagination',
      'class': { disabled: this.disable }
    }, [
      contentStart,

      h('div', { staticClass: 'row wrap justify-center' }, [
        contentMiddle
      ]),

      contentEnd
    ])
  }
}

var QParallax = {
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
  render: function render (h) {
    return h('div', {
      staticClass: 'q-parallax',
      style: { height: ((this.height) + "px") }
    }, [
      h('div', {
        staticClass: 'q-parallax-image absolute-full'
      }, [
        h('img', {
          ref: 'img',
          domProps: {
            src: this.src
          },
          'class': { ready: this.imageHasBeenLoaded },
          on: {
            load: this.__processImage
          }
        })
      ]),

      h('div', {
        staticClass: 'q-parallax-text absolute-full column flex-center'
      }, [
        this.imageHasBeenLoaded
          ? this.$slots.default
          : this.$slots.loading
      ])
    ])
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
}

function width$1 (val) {
  return { width: (val + "%") }
}

var QProgress = {
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
    buffer: Number,
    height: {
      type: String,
      default: '4px'
    }
  },
  computed: {
    model: function model () {
      return between(this.percentage, 0, 100)
    },
    bufferModel: function bufferModel () {
      return between(this.buffer || 0, 0, 100 - this.model)
    },
    bufferStyle: function bufferStyle () {
      return width$1(this.bufferModel)
    },
    trackStyle: function trackStyle () {
      return width$1(this.buffer ? 100 - this.buffer : 100)
    },
    computedClass: function computedClass () {
      if (this.color) {
        return ("text-" + (this.color))
      }
    },
    computedStyle: function computedStyle () {
      return { height: this.height }
    },
    modelClass: function modelClass () {
      return {
        animate: this.animate,
        stripe: this.stripe,
        indeterminate: this.indeterminate
      }
    },
    modelStyle: function modelStyle () {
      return width$1(this.model)
    }
  },
  render: function render (h) {
    return h('div', {
      staticClass: 'q-progress',
      style: this.computedStyle,
      'class': this.computedClass
    }, [
      this.buffer && !this.indeterminate
        ? h('div', {
          staticClass: 'q-progress-buffer',
          style: this.bufferStyle
        })
        : null,

      h('div', {
        staticClass: 'q-progress-track',
        style: this.trackStyle
      }),

      h('div', {
        staticClass: 'q-progress-model',
        style: this.modelStyle,
        'class': this.modelClass
      })
    ])
  }
}

var QPullToRefresh = {
  name: 'q-pull-to-refresh',
  directives: {
    TouchPan: TouchPan
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
    pullMessage: String,
    releaseMessage: String,
    refreshMessage: String,
    refreshIcon: String,
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
          return this.releaseMessage || this.$q.i18n.pullToRefresh.release
        case 'refreshing':
          return this.refreshMessage || this.$q.i18n.pullToRefresh.refresh
        case 'pull':
        default:
          return this.pullMessage || this.$q.i18n.pullToRefresh.pull
      }
    },
    style: function style () {
      return cssTransform(("translateY(" + (this.pullPosition) + "px)"))
    }
  },
  methods: {
    __pull: function __pull (event) {
      if (this.disable) {
        return
      }

      if (event.isFinal) {
        this.scrolling = false;
        this.pulling = false;
        if (this.scrolling) {
          return
        }
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
  },
  render: function render (h) {
    return h('div', { staticClass: 'pull-to-refresh' }, [
      h('div', {
        staticClass: 'pull-to-refresh-container',
        style: this.style,
        directives: [{
          name: 'touch-pan',
          modifiers: {
            vertical: true,
            scroll: true
          },
          value: this.__pull
        }]
      }, [
        h('div', { staticClass: 'pull-to-refresh-message row flex-center' }, [
          h(QIcon, {
            'class': { 'rotate-180': this.state === 'pulled' },
            props: { name: this.$q.icon.pullToRefresh.arrow },
            directives: [{
              name: 'show',
              value: this.state !== 'refreshing'
            }]
          }),
          h(QIcon, {
            staticClass: 'animate-spin',
            props: { name: this.refreshIcon || this.$q.icon.pullToRefresh.refresh },
            directives: [{
              name: 'show',
              value: this.state === 'refreshing'
            }]
          }),
          (" " + (this.message))
        ]),
        this.$slots.default
      ])
    ])
  }
}

var dragType = {
  MIN: 0,
  RANGE: 1,
  MAX: 2
};

var QRange = {
  name: 'q-range',
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
    dragOnlyRange: Boolean,
    leftLabelColor: String,
    leftLabelValue: String,
    rightLabelColor: String,
    rightLabelValue: String
  },
  data: function data () {
    return {
      model: extend$1({}, this.value),
      dragging: false,
      currentMinPercentage: (this.value.min - this.min) / (this.max - this.min),
      currentMaxPercentage: (this.value.max - this.min) / (this.max - this.min)
    }
  },
  computed: {
    percentageMin: function percentageMin () {
      return this.snap ? (this.model.min - this.min) / (this.max - this.min) : this.currentMinPercentage
    },
    percentageMax: function percentageMax () {
      return this.snap ? (this.model.max - this.min) / (this.max - this.min) : this.currentMaxPercentage
    },
    activeTrackWidth: function activeTrackWidth () {
      return 100 * (this.percentageMax - this.percentageMin) + '%'
    },
    leftDisplayValue: function leftDisplayValue () {
      return this.leftLabelValue !== void 0
        ? this.leftLabelValue
        : this.model.min
    },
    rightDisplayValue: function rightDisplayValue () {
      return this.rightLabelValue !== void 0
        ? this.rightLabelValue
        : this.model.max
    },
    leftTooltipColor: function leftTooltipColor () {
      return this.leftLabelColor || this.labelColor
    },
    rightTooltipColor: function rightTooltipColor () {
      return this.rightLabelColor || this.labelColor
    }
  },
  watch: {
    'value.min': function value_min (value) {
      this.model.min = value;
    },
    'value.max': function value_max (value) {
      this.model.max = value;
    },
    'model.min': function model_min (value) {
      if (this.dragging) {
        return
      }
      if (value > this.model.max) {
        value = this.model.max;
      }
      this.currentMinPercentage = (value - this.min) / (this.max - this.min);
    },
    'model.max': function model_max (value) {
      if (this.dragging) {
        return
      }
      if (value < this.model.min) {
        value = this.model.min;
      }
      this.currentMaxPercentage = (value - this.min) / (this.max - this.min);
    },
    min: function min (value) {
      if (this.model.min < value) {
        this.__update({min: value});
      }
      if (this.model.max < value) {
        this.__update({max: value});
      }
      this.$nextTick(this.__validateProps);
    },
    max: function max (value) {
      if (this.model.min > value) {
        this.__update({min: value});
      }
      if (this.model.max > value) {
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
        valueMin: this.model.min,
        valueMax: this.model.max,
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
          extend$1(this.dragging, {
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
      this.currentMinPercentage = (this.model.min - this.min) / (this.max - this.min);
      this.currentMaxPercentage = (this.model.max - this.min) / (this.max - this.min);
      this.$emit('change', this.model);
    },
    __updateInput: function __updateInput (ref) {
      var min = ref.min; if ( min === void 0 ) min = this.model.min;
      var max = ref.max; if ( max === void 0 ) max = this.model.max;

      var val = {min: min, max: max};
      if (this.model.min !== min || this.model.max !== max) {
        this.model = val;
        this.$emit('input', val);
      }
    },
    __validateProps: function __validateProps () {
      if (this.min >= this.max) {
        console.error('Range error: min >= max', this.$el, this.min, this.max);
      }
      else if (notDivides((this.max - this.min) / this.step, this.decimals)) {
        console.error('Range error: step must be a divisor of max - min', this.min, this.max, this.step);
      }
      else if (notDivides((this.model.min - this.min) / this.step, this.decimals)) {
        console.error('Range error: step must be a divisor of initial value.min - min', this.model.min, this.min, this.step);
      }
      else if (notDivides((this.model.max - this.min) / this.step, this.decimals)) {
        console.error('Range error: step must be a divisor of initial value.max - min', this.model.max, this.max, this.step);
      }
    },

    __getHandle: function __getHandle (h, lower, upper, edge, percentage, color, label) {
      return h('div', {
        ref: ("handle" + upper),
        staticClass: ("q-slider-handle q-slider-handle-" + lower),
        style: {
          left: ((percentage * 100) + "%"),
          borderRadius: this.square ? '0' : '50%'
        },
        'class': [
          edge ? 'handle-at-minimum' : null,
          { dragging: this.dragging }
        ]
      }, [
        this.label || this.labelAlways
          ? h(QChip, {
            props: {
              pointing: 'down',
              square: true,
              color: color
            },
            staticClass: 'q-slider-label no-pointer-events',
            'class': { 'label-always': this.labelAlways }
          }, [ label ])
          : null,
        null
      ])
    },
    __getContent: function __getContent (h) {
      return [
        h('div', {
          staticClass: 'q-slider-track active-track',
          style: {
            left: ((this.percentageMin * 100) + "%"),
            width: this.activeTrackWidth
          },
          'class': {
            dragging: this.dragging,
            'track-draggable': this.dragRange || this.dragOnlyRange
          }
        }),

        this.__getHandle(
          h, 'min', 'Min', !this.fillHandleAlways && this.model.min === this.min, this.percentageMin,
          this.leftTooltipColor, this.leftDisplayValue
        ),
        this.__getHandle(
          h, 'max', 'Max', false, this.percentageMax,
          this.rightTooltipColor, this.rightDisplayValue
        )
      ]
    }
  }
}

var QRating = {
  name: 'q-rating',
  props: {
    value: {
      type: Number,
      default: 0,
      required: true
    },
    max: {
      type: Number,
      default: 5
    },
    icon: String,
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
      set: function set (val) {
        if (this.value !== val) {
          this.$emit('input', val);
        }
        this.$emit('change', val);
      }
    },
    editable: function editable () {
      return !this.readonly && !this.disable
    },
    classes: function classes () {
      var cls = [];

      this.disable && cls.push('disabled');
      this.editable && cls.push('editable');
      this.color && cls.push(("text-" + (this.color)));

      return cls
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
  },
  render: function render (h) {
    var this$1 = this;

    var child = [];

    var loop = function ( i ) {
      child.push(h(QIcon, {
        key: i,
        props: { name: this$1.icon || this$1.$q.icon.rating.icon },
        'class': {
          active: (!this$1.mouseModel && this$1.model >= i) || (this$1.mouseModel && this$1.mouseModel >= i),
          exselected: this$1.mouseModel && this$1.model >= i && this$1.mouseModel < i,
          hovered: this$1.mouseModel === i
        },
        nativeOn: {
          click: function () { return this$1.set(i); },
          mouseover: function () { return this$1.__setHoverValue(i); },
          mouseout: function () { this$1.mouseModel = 0; }
        }
      }));
    };

    for (var i = 1; i <= this.max; i++) loop( i );

    return h('div', {
      staticClass: 'q-rating row inline items-center no-wrap',
      'class': this.classes,
      style: this.size ? ("font-size: " + (this.size)) : ''
    }, child)
  }
}

var QScrollArea = {
  name: 'q-scroll-area',
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
      return this.scrollHeight <= this.containerHeight || (!this.active && !this.hover)
    },
    thumbHeight: function thumbHeight () {
      return Math.round(between(this.containerHeight * this.containerHeight / this.scrollHeight, 50, this.containerHeight))
    },
    style: function style () {
      var top = this.scrollPercentage * (this.containerHeight - this.thumbHeight);
      return extend$1({}, this.thumbStyle, {
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
    setScrollPosition: function setScrollPosition$1 (offset, duration) {
      setScrollPosition(this.$refs.target, offset, duration);
    },
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
      e.evt.preventDefault();

      if (e.isFirst) {
        this.refPos = this.scrollPosition;
        this.__setActive(true, true);
        document.body.classList.add('non-selectable');
        if (document.selection) {
          document.selection.empty();
        }
        else if (window.getSelection) {
          window.getSelection().removeAllRanges();
        }
      }
      if (e.isFinal) {
        this.__setActive(false);
        document.body.classList.remove('non-selectable');
      }

      var multiplier = (this.scrollHeight - this.containerHeight) / (this.containerHeight - this.thumbHeight);
      this.$refs.target.scrollTop = this.refPos + (e.direction === 'down' ? 1 : -1) * e.distance.y * multiplier;
    },
    __panContainer: function __panContainer (e) {
      if (e.isFirst) {
        this.refPos = this.scrollPosition;
        this.__setActive(true, true);
      }
      if (e.isFinal) {
        this.__setActive(false);
      }

      var pos = this.refPos + (e.direction === 'down' ? -1 : 1) * e.distance.y;
      this.$refs.target.scrollTop = pos;

      if (pos > 0 && pos + this.containerHeight < this.scrollHeight) {
        e.evt.preventDefault();
      }
    },
    __mouseWheel: function __mouseWheel (e) {
      var el = this.$refs.target;
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
  },
  render: function render (h) {
    var this$1 = this;

    if (!this.$q.platform.is.desktop) {
      return h('div', {
        ref: 'target',
        staticClass: 'q-scroll-area scroll relative-position',
        style: this.contentStyle
      }, [
        this.$slots.default
      ])
    }

    return h('div', {
      staticClass: 'q-scrollarea relative-position',
      on: {
        mouseenter: function () { this$1.hover = true; },
        mouseleave: function () { this$1.hover = false; }
      }
    }, [
      h('div', {
        ref: 'target',
        staticClass: 'scroll relative-position overflow-hidden fit',
        on: {
          wheel: this.__mouseWheel,
          mousewheel: this.__mouseWheel,
          DOMMouseScroll: this.__mouseWheel
        },
        directives: [{
          name: 'touch-pan',
          modifiers: { vertical: true, nomouse: true },
          value: this.__panContainer
        }]
      }, [
        h('div', {
          staticClass: 'absolute full-width',
          style: this.mainStyle
        }, [
          this.$slots.default,
          h(QResizeObservable, {
            staticClass: 'resize-obs',
            on: { resize: this.__updateScrollHeight }
          })
        ]),
        h(QScrollObservable, {
          staticClass: 'scroll-obs',
          on: { scroll: this.__updateScroll }
        })
      ]),

      h(QResizeObservable, {
        staticClass: 'main-resize-obs',
        on: { resize: this.__updateContainer }
      }),

      h('div', {
        staticClass: 'q-scrollarea-thumb absolute-right',
        style: this.style,
        'class': { 'invisible-thumb': this.thumbHidden },
        directives: [{
          name: 'touch-pan',
          modifiers: { vertical: true },
          value: this.__panThumb
        }]
      })
    ])
  }
}

var QSearch = {
  name: 'q-search',
  mixins: [FrameMixin, InputMixin],
  props: {
    value: { required: true },
    type: String,
    debounce: {
      type: Number,
      default: 300
    },
    icon: String,
    placeholder: String
  },
  data: function data () {
    return {
      model: this.value,
      childDebounce: false
    }
  },
  provide: function provide () {
    var this$1 = this;

    return {
      __inputDebounce: {
        set: function (val) {
          if (this$1.model !== val) {
            this$1.model = val;
          }
        },
        setChildDebounce: function (v) {
          this$1.childDebounce = v;
        }
      }
    }
  },
  watch: {
    value: function value (v) {
      this.model = v;
    },
    model: function model (val) {
      var this$1 = this;

      clearTimeout(this.timer);
      if (this.value === val) {
        return
      }
      if (!val && val !== 0) {
        this.model = this.type === 'number' ? null : '';
      }
      this.timer = setTimeout(function () {
        this$1.$emit('input', this$1.model);
      }, this.debounceValue);
    }
  },
  computed: {
    debounceValue: function debounceValue () {
      return this.childDebounce
        ? 0
        : this.debounce
    },
    controlBefore: function controlBefore () {
      return this.before || [{
        icon: this.icon || this.$q.icon.search.icon,
        handler: this.focus
      }]
    },
    controlAfter: function controlAfter () {
      return this.after || [{
        icon: this.$q.icon.search[("clear" + (this.inverted ? 'Inverted' : ''))],
        content: true,
        handler: this.clear
      }]
    }
  },
  methods: {
    clear: function clear () {
      this.$refs.input.clear();
    }
  },
  render: function render (h) {
    var this$1 = this;

    return h(QInput, {
      ref: 'input',
      staticClass: 'q-search',
      props: {
        value: this.model,
        type: this.type,
        autofocus: this.autofocus,
        placeholder: this.placeholder || this.$q.i18n.label.search,
        disable: this.disable,
        error: this.error,
        warning: this.warning,
        align: this.align,
        floatLabel: this.floatLabel,
        stackLabel: this.stackLabel,
        prefix: this.prefix,
        suffix: this.suffix,
        inverted: this.inverted,
        dark: this.dark,
        hideUnderline: this.hideUnderline,
        maxLength: this.maxLength,
        color: this.color,
        before: this.controlBefore,
        after: this.controlAfter
      },
      on: {
        input: function (v) { this$1.model = v; },
        focus: this.__onFocus,
        blur: this.__onBlur,
        keyup: this.__onKeyup,
        keydown: this.__onKeydown,
        click: this.__onClick
      }
    }, [
      this.$slots.default
    ])
  }
}

var SelectMixin = {
  components: {
    QIcon: QIcon,
    QInputFrame: QInputFrame,
    QChip: QChip
  },
  mixins: [FrameMixin],
  props: {
    value: {
      required: true
    },
    multiple: Boolean,
    toggle: Boolean,
    chips: Boolean,
    options: {
      type: Array,
      required: true,
      validator: function (v) { return v.every(function (o) { return 'label' in o && 'value' in o; }); }
    },
    frameColor: String,
    displayValue: String,
    clearable: Boolean
  },
  data: function data () {
    return {
      model: this.multiple && Array.isArray(this.value)
        ? this.value.slice()
        : this.value,
      terms: '',
      focused: false
    }
  },
  watch: {
    value: function value (val) {
      this.model = this.multiple && Array.isArray(val)
        ? val.slice()
        : val;
    }
  },
  computed: {
    actualValue: function actualValue () {
      var this$1 = this;

      if (this.displayValue) {
        return this.displayValue
      }
      if (!this.multiple) {
        var opt$1 = this.options.find(function (opt) { return opt.value === this$1.model; });
        return opt$1 ? opt$1.label : ''
      }

      var opt = this.selectedOptions.map(function (opt) { return opt.label; });
      return opt.length ? opt.join(', ') : ''
    },
    selectedOptions: function selectedOptions () {
      var this$1 = this;

      if (this.multiple) {
        return this.length > 0
          ? this.options.filter(function (opt) { return this$1.model.includes(opt.value); })
          : []
      }
    },
    hasChips: function hasChips () {
      return this.multiple && this.chips
    },
    length: function length () {
      return this.multiple
        ? this.model.length
        : ([null, undefined, ''].includes(this.model) ? 0 : 1)
    },
    additionalLength: function additionalLength () {
      return this.displayValue && this.displayValue.length > 0
    }
  },
  methods: {
    __toggleMultiple: function __toggleMultiple (value, disable) {
      if (disable) {
        return
      }
      var
        model = this.model,
        index = model.indexOf(value);

      if (index > -1) {
        model.splice(index, 1);
      }
      else {
        model.push(value);
      }

      this.$emit('input', model);
    },
    __emit: function __emit (val) {
      if (this.value !== val) {
        this.$emit('input', val);
      }
      this.$emit('change', val);
    },
    clear: function clear () {
      this.__emit(this.multiple ? [] : null);
    }
  }
}

function defaultFilterFn (terms, obj) {
  return obj.label.toLowerCase().indexOf(terms) > -1
}

var QSelect = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('q-input-frame',{ref:"input",staticClass:"q-select",attrs:{"prefix":_vm.prefix,"suffix":_vm.suffix,"stack-label":_vm.stackLabel,"float-label":_vm.floatLabel,"error":_vm.error,"warning":_vm.warning,"disable":_vm.disable,"inverted":_vm.inverted,"dark":_vm.dark,"hide-underline":_vm.hideUnderline,"before":_vm.before,"after":_vm.after,"color":_vm.frameColor || _vm.color,"focused":_vm.focused,"focusable":"","length":_vm.length,"additional-length":_vm.additionalLength},nativeOn:{"click":function($event){_vm.togglePopup($event);},"focus":function($event){_vm.__onFocus($event);},"blur":function($event){_vm.__onBlur($event);}}},[(_vm.hasChips)?_c('div',{staticClass:"col row items-center group q-input-chips q-if-control",class:_vm.alignClass},_vm._l((_vm.selectedOptions),function(ref){
var label = ref.label;
var value = ref.value;
var optDisable = ref.disable;
return _c('q-chip',{key:label,attrs:{"small":"","closable":!_vm.disable && !optDisable,"color":_vm.color},on:{"hide":function($event){_vm.__toggleMultiple(value, _vm.disable || optDisable);}},nativeOn:{"click":function($event){$event.stopPropagation();}}},[_vm._v(" "+_vm._s(label)+" ")])})):_c('div',{staticClass:"col row items-center q-input-target q-if-control",class:_vm.alignClass,domProps:{"innerHTML":_vm._s(_vm.actualValue)}}),_vm._v(" "),(!_vm.disable && _vm.clearable && _vm.length)?_c('q-icon',{staticClass:"q-if-control",attrs:{"slot":"after","name":"cancel"},nativeOn:{"click":function($event){$event.stopPropagation();_vm.clear($event);}},slot:"after"}):_vm._e(),_vm._v(" "),_c('q-icon',{staticClass:"q-if-control",attrs:{"slot":"after","name":_vm.$q.icon.input.dropdown},slot:"after"}),_vm._v(" "),_c('q-popover',{ref:"popover",staticClass:"column no-wrap",attrs:{"fit":"","disable":_vm.disable,"offset":[0, 10],"anchor-click":false},on:{"show":_vm.__onFocus,"hide":_vm.__onClose}},[_c('q-field-reset',[(_vm.filter)?_c('q-search',{ref:"filter",staticClass:"no-margin",staticStyle:{"min-height":"50px","padding":"10px"},attrs:{"placeholder":_vm.filterPlaceholder || _vm.$q.i18n.label.filter,"debounce":100,"color":_vm.color,"icon":"filter_list"},on:{"input":_vm.reposition},model:{value:(_vm.terms),callback:function ($$v) {_vm.terms=$$v;},expression:"terms"}}):_vm._e()],1),_vm._v(" "),_c('q-list',{staticClass:"no-border scroll",attrs:{"separator":_vm.separator}},[(_vm.multiple)?_vm._l((_vm.visibleOptions),function(opt){return _c('q-item-wrapper',{key:JSON.stringify(opt),class:{'text-faded': opt.disable},attrs:{"cfg":opt,"link":!opt.disable,"slot-replace":""},nativeOn:{"!click":function($event){_vm.__toggleMultiple(opt.value, opt.disable);}}},[(_vm.toggle)?_c('q-toggle',{attrs:{"slot":"right","color":_vm.color,"value":_vm.optModel[opt.index],"disable":opt.disable,"no-focus":""},slot:"right"}):_c('q-checkbox',{attrs:{"slot":"left","color":_vm.color,"value":_vm.optModel[opt.index],"disable":opt.disable,"no-focus":""},slot:"left"})],1)}):_vm._l((_vm.visibleOptions),function(opt){return _c('q-item-wrapper',{key:JSON.stringify(opt),class:{'text-faded': opt.disable},attrs:{"cfg":opt,"link":!opt.disable,"slot-replace":"","active":_vm.value === opt.value},nativeOn:{"!click":function($event){_vm.__singleSelect(opt.value, opt.disable);}}},[(_vm.radio)?_c('q-radio',{attrs:{"slot":"left","color":_vm.color,"value":_vm.value,"val":opt.value,"disable":opt.disable,"no-focus":""},slot:"left"}):_vm._e()],1)})],2)],1)],1)},staticRenderFns: [],
  name: 'q-select',
  mixins: [SelectMixin],
  components: {
    QFieldReset: QFieldReset,
    QSearch: QSearch,
    QPopover: QPopover,
    QList: QList,
    QItemWrapper: QItemWrapper,
    QCheckbox: QCheckbox,
    QRadio: QRadio,
    QToggle: QToggle
  },
  props: {
    filter: [Function, Boolean],
    filterPlaceholder: String,
    autofocusFilter: Boolean,
    radio: Boolean,
    placeholder: String,
    separator: Boolean
  },
  computed: {
    optModel: function optModel () {
      var this$1 = this;

      if (this.multiple) {
        return this.model.length > 0
          ? this.options.map(function (opt) { return this$1.model.includes(opt.value); })
          : this.options.map(function (opt) { return false; })
      }
    },
    visibleOptions: function visibleOptions () {
      var this$1 = this;

      var opts = this.options.map(function (opt, index) { return extend$1({}, opt, { index: index }); });
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
    },
    activeItemSelector: function activeItemSelector () {
      return this.multiple
        ? (".q-item-side > " + (this.toggle ? '.q-toggle' : '.q-checkbox') + " > .active")
        : ".q-item.active"
    }
  },
  methods: {
    togglePopup: function togglePopup () {
      this[this.$refs.popover.showing ? 'hide' : 'show']();
    },
    show: function show () {
      return this.$refs.popover.show()
    },
    hide: function hide () {
      return this.$refs.popover.hide()
    },
    reposition: function reposition () {
      var popover = this.$refs.popover;
      if (popover.showing) {
        popover.reposition();
      }
    },

    __onFocus: function __onFocus () {
      this.focused = true;
      if (this.filter && this.autofocusFilter) {
        this.$refs.filter.focus();
      }
      this.$emit('focus');
      var selected = this.$refs.popover.$el.querySelector(this.activeItemSelector);
      if (selected) {
        selected.scrollIntoView();
      }
    },
    __onBlur: function __onBlur (e) {
      var this$1 = this;

      this.__onClose();
      setTimeout(function () {
        var el = document.activeElement;
        if (el !== document.body && !this$1.$refs.popover.$el.contains(el)) {
          this$1.hide();
        }
      }, 1);
    },
    __onClose: function __onClose () {
      this.focused = false;
      this.$emit('blur');
      this.terms = '';
      this.$emit('change', this.model);
    },
    __singleSelect: function __singleSelect (val, disable) {
      if (disable) {
        return
      }
      this.__emit(val);
      this.hide();
    }
  }
}

var QDialogSelect = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('q-input-frame',{ref:"input",staticClass:"q-select",attrs:{"prefix":_vm.prefix,"suffix":_vm.suffix,"stack-label":_vm.stackLabel,"float-label":_vm.floatLabel,"error":_vm.error,"warning":_vm.warning,"disable":_vm.disable,"inverted":_vm.inverted,"dark":_vm.dark,"hide-underline":_vm.hideUnderline,"before":_vm.before,"after":_vm.after,"color":_vm.frameColor || _vm.color,"focused":_vm.focused,"focusable":"","length":_vm.length,"additional-length":_vm.additionalLength},nativeOn:{"click":function($event){_vm.pick($event);},"focus":function($event){_vm.__onFocus($event);},"blur":function($event){_vm.__onBlur($event);}}},[(_vm.hasChips)?_c('div',{staticClass:"col row items-center group q-input-chips",class:_vm.alignClass},_vm._l((_vm.selectedOptions),function(ref){
var label = ref.label;
var value = ref.value;
var optDisable = ref.disable;
return _c('q-chip',{key:label,attrs:{"small":"","closable":!_vm.disable && !optDisable,"color":_vm.color},on:{"hide":function($event){_vm.__toggleMultiple(value, _vm.disable || optDisable);}},nativeOn:{"click":function($event){$event.stopPropagation();}}},[_vm._v(" "+_vm._s(label)+" ")])})):_c('div',{staticClass:"col row items-center q-input-target",class:_vm.alignClass,domProps:{"innerHTML":_vm._s(_vm.actualValue)}}),_vm._v(" "),(!_vm.disable && _vm.clearable && _vm.length)?_c('q-icon',{staticClass:"q-if-control",attrs:{"slot":"after","name":"cancel"},nativeOn:{"click":function($event){$event.stopPropagation();_vm.clear($event);}},slot:"after"}):_vm._e(),_vm._v(" "),_c('q-icon',{staticClass:"q-if-control",attrs:{"slot":"after","name":_vm.$q.icon.input.dropdown},slot:"after"})],1)},staticRenderFns: [],
  name: 'q-dialog-select',
  mixins: [SelectMixin],
  props: {
    okLabel: String,
    cancelLabel: String,
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
    type: function type () {
      return this.multiple
        ? (this.toggle ? 'toggle' : 'checkbox')
        : 'radio'
    }
  },
  methods: {
    pick: function pick () {
      var this$1 = this;

      if (this.disable) {
        return
      }

      // TODO
      this.dialog = this.$q.dialog({
        title: this.title || this.$q.i18n.label.select,
        message: this.message,
        color: this.color,
        options: {
          type: this.type,
          model: this.multiple && Array.isArray(this.value)
            ? this.value.slice()
            : this.value,
          items: this.options
        },
        cancel: this.cancelLabel || true,
        ok: this.okLabel || true
      }).then(function (data) {
        this$1.dialog = null;
        if (JSON.stringify(this$1.value) !== JSON.stringify(data)) {
          this$1.$emit('input', data);
          this$1.$emit('change', data);
        }
      }).catch(function () {
        this$1.dialog = null;
      });
    },
    hide: function hide () {
      return this.dialog
        ? this.dialog.hide()
        : Promise.resolve()
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
}

var StepTab = {
  name: 'q-step-header',
  components: {
    QIcon: QIcon
  },
  directives: {
    Ripple: Ripple
  },
  props: ['vm'],
  computed: {
    classes: function classes () {
      return {
        'step-error': this.vm.error,
        'step-active': this.vm.active,
        'step-done': this.vm.done,
        'step-waiting': this.vm.waiting,
        'step-disabled': this.vm.disable,
        'step-colored': this.vm.active || this.vm.done,
        'items-center': !this.vm.__stepper.vertical,
        'items-start': this.vm.__stepper.vertical,
        'q-stepper-first': this.vm.first,
        'q-stepper-last': this.vm.last
      }
    }
  },
  methods: {
    __select: function __select () {
      this.vm.select();
    }
  },
  render: function render (h) {
    var icon = this.vm.stepIcon
      ? h(QIcon, { props: { name: this.vm.stepIcon } })
      : h('span', [ (this.vm.innerOrder + 1) ]);

    return h('div', {
      staticClass: 'q-stepper-tab col-grow flex no-wrap relative-position',
      'class': this.classes,
      on: {
        click: this.__select
      },
      directives: null
    }, [
      h('div', { staticClass: 'q-stepper-dot row flex-center q-stepper-line relative-position' }, [
        h('span', { staticClass: 'row flex-center' }, [ icon ])
      ]),
      this.vm.title
        ? h('div', {
          staticClass: 'q-stepper-label q-stepper-line relative-position'
        }, [
          h('div', { staticClass: 'q-stepper-title' }, [ this.vm.title ]),
          h('div', { staticClass: 'q-stepper-subtitle' }, [ this.vm.subtitle ])
        ])
        : null
    ])
  }
}

var QStep = {
  name: 'q-step',
  inject: {
    __stepper: {
      default: function default$1 () {
        console.error('QStep needs to be child of QStepper');
      }
    }
  },
  props: {
    name: {
      type: [Number, String],
      default: function default$2 () {
        return uid$1$1()
      }
    },
    default: Boolean,
    title: {
      type: String,
      required: true
    },
    subtitle: String,
    icon: String,
    order: [Number, String],
    error: Boolean,
    activeIcon: String,
    errorIcon: String,
    doneIcon: String,
    disable: Boolean
  },
  watch: {
    order: function order () {
      this.__stepper.__sortSteps();
    }
  },
  data: function data () {
    return {
      innerOrder: 0,
      first: false,
      last: false
    }
  },
  computed: {
    stepIcon: function stepIcon () {
      var data = this.__stepper;

      if (this.active) {
        return this.activeIcon || data.activeIcon || this.$q.icon.stepper.active
      }
      if (this.error) {
        return this.errorIcon || data.errorIcon || this.$q.icon.stepper.error
      }
      if (this.done && !this.disable) {
        return this.doneIcon || data.doneIcon || this.$q.icon.stepper.done
      }

      return this.icon
    },
    actualOrder: function actualOrder () {
      return parseInt(this.order || this.innerOrder, 10)
    },
    active: function active () {
      return this.__stepper.step === this.name
    },
    done: function done () {
      return !this.disable && this.__stepper.currentOrder > this.innerOrder
    },
    waiting: function waiting () {
      return !this.disable && this.__stepper.currentOrder < this.innerOrder
    },
    style: function style () {
      var ord = this.actualOrder;
      return {
        '-webkit-box-ordinal-group': ord,
        '-ms-flex-order': ord,
        order: ord
      }
    }
  },
  methods: {
    select: function select () {
      if (this.done) {
        this.__stepper.goToStep(this.name);
      }
    }
  },
  mounted: function mounted () {
    this.__stepper.__registerStep(this);
    if (this.default) {
      this.select();
    }
  },
  beforeDestroy: function beforeDestroy () {
    this.__stepper.__unregisterStep(this);
  },
  render: function render (h) {
    return h('div', {
      staticClass: 'q-stepper-step',
      style: this.style
    }, [
      this.__stepper.vertical
        ? h(StepTab, { props: { vm: this } })
        : null,
      h(QSlideTransition, [
        this.active
          ? h('div', {
            staticClass: 'q-stepper-step-content'
          }, [
            h('div', { staticClass: 'q-stepper-step-inner' }, [
              this.$slots.default
            ])
          ])
          : null
      ])
    ])
  }
}

var QStepper = {
  name: 'q-stepper',
  components: {
    StepTab: StepTab
  },
  props: {
    value: [Number, String],
    color: String,
    vertical: Boolean,
    alternativeLabels: Boolean,
    contractable: Boolean,
    doneIcon: Boolean,
    activeIcon: Boolean,
    errorIcon: Boolean
  },
  data: function data () {
    return {
      step: this.value || null,
      steps: []
    }
  },
  provide: function provide () {
    return {
      __stepper: this
    }
  },
  watch: {
    value: function value (v) {
      this.goToStep(v);
    }
  },
  computed: {
    classes: function classes () {
      var cls = [
        ("q-stepper-" + (this.vertical ? 'vertical' : 'horizontal'))
      ];
      if (this.color) {
        cls.push(("text-" + (this.color)));
      }
      if (this.contractable) {
        cls.push("q-stepper-contractable");
      }
      return cls
    },
    hasSteps: function hasSteps () {
      return this.steps.length > 0
    },
    currentStep: function currentStep () {
      var this$1 = this;

      if (this.hasSteps) {
        return this.steps.find(function (step) { return step.name === this$1.step; })
      }
    },
    currentOrder: function currentOrder () {
      if (this.currentStep) {
        return this.currentStep.innerOrder
      }
    },
    length: function length () {
      return this.steps.length
    }
  },
  methods: {
    goToStep: function goToStep (step) {
      if (this.step === step || step === void 0) {
        return
      }

      this.step = step;

      if (this.value !== step) {
        this.$emit('input', step);
        this.$emit('step', step);
      }
    },
    next: function next () {
      this.__go(1);
    },
    previous: function previous () {
      this.__go(-1);
    },
    reset: function reset () {
      if (this.hasSteps) {
        this.goToStep(this.steps[0].name);
      }
    },

    __go: function __go (offset) {
      var
        name,
        index = this.currentOrder;

      if (index === void 0) {
        if (!this.hasSteps) {
          return
        }
        name = this.steps[0].name;
      }
      else {
        do {
          index += offset;
        } while (index >= 0 && index < this.length - 1 && this.steps[index].disable)
        if (index < 0 || index > this.length - 1 || this.steps[index].disable) {
          return
        }
        name = this.steps[index].name;
      }

      this.goToStep(name);
    },
    __sortSteps: function __sortSteps () {
      var this$1 = this;

      this.steps.sort(function (a, b) {
        return a.actualOrder - b.actualOrder
      });
      var last = this.steps.length - 1;
      this.steps.forEach(function (step, index) {
        step.innerOrder = index;
        step.first = index === 0;
        step.last = index === last;
      });
      this.$nextTick(function () {
        if (!this$1.steps.some(function (step) { return step.active; })) {
          this$1.goToStep(this$1.steps[0].name);
        }
      });
    },
    __registerStep: function __registerStep (vm) {
      this.steps.push(vm);
      this.__sortSteps();
      return this
    },
    __unregisterStep: function __unregisterStep (vm) {
      this.steps = this.steps.filter(function (step) { return step !== vm; });
    }
  },
  created: function created () {
    this.__sortSteps = frameDebounce(this.__sortSteps);
  },
  render: function render (h) {
    return h('div', {
      staticClass: 'q-stepper column overflow-hidden relative-position',
      'class': this.classes
    }, [
      this.vertical
        ? null
        : h('div', {
          staticClass: 'q-stepper-header row items-stretch justify-between shadow-1',
          'class': { 'alternative-labels': this.alternativeLabels }
        },
        this.steps.map(function (step) { return h(StepTab, {
          key: step.name,
          props: {
            vm: step
          }
        }); })),
      this.$slots.default
    ])
  }
}

var QStepperNavigation = {
  name: 'q-stepper-navigation',
  render: function render (h) {
    return h('div', {
      staticClass: 'q-stepper-nav order-last row no-wrap items-center'
    }, [
      this.$slots.left,
      h('div', { staticClass: 'col' }),
      this.$slots.default
    ])
  }
}

var TabMixin = {
  directives: {
    Ripple: Ripple
  },
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
        return uid$1$1()
      }
    },
    alert: Boolean,
    count: [Number, String],
    color: String
  },
  inject: {
    data: {
      default: function default$2 () {
        console.error('QTab/QRouteTab components need to be child of QTabs');
      }
    },
    selectTab: {}
  },
  watch: {
    active: function active (val) {
      if (val) {
        this.$emit('select', this.name);
      }
    }
  },
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
        cls[("text-" + color)] = this.active;
      }

      return cls
    },
    barStyle: function barStyle () {
      if (!this.active || !this.data.highlight) {
        return 'display: none;'
      }
    }
  },
  methods: {
    __getTabContent: function __getTabContent (h) {
      var child = [];

      this.icon && child.push(h(QIcon, {
        staticClass: 'q-tab-icon',
        props: {
          name: this.icon
        }
      }));

      this.label && child.push(h('span', {
        staticClass: 'q-tab-label',
        domProps: {
          innerHTML: this.label
        }
      }));

      if (this.count) {
        child.push(h(QChip, {
          props: {
            floating: true
          }
        }, [ this.count ]));
      }
      else if (this.alert) {
        child.push(h('div', {
          staticClass: 'q-dot'
        }));
      }

      child.push(this.$slots.default);
      return child
    }
  }
}

var QRouteTab = {
  name: 'q-route-tab',
  mixins: [TabMixin, RouterLinkMixin],
  watch: {
    $route: function $route () {
      this.checkIfSelected();
    }
  },
  methods: {
    select: function select () {
      this.$emit('click', this.name);
      if (!this.disable) {
        this.$el.dispatchEvent(evt);
        this.selectTab(this.name);
      }
    },
    checkIfSelected: function checkIfSelected () {
      var this$1 = this;

      this.$nextTick(function () {
        if (this$1.$el.classList.contains('router-link-active') || this$1.$el.classList.contains('router-link-exact-active')) {
          this$1.selectTab(this$1.name);
        }
        else if (this$1.active) {
          this$1.selectTab(null);
        }
      });
    }
  },
  created: function created () {
    this.checkIfSelected();
  },
  render: function render (h) {
    return h('router-link', {
      props: {
        tag: 'div',
        to: this.to,
        replace: this.replace,
        append: this.append,
        event: routerLinkEventName
      },
      nativeOn: {
        click: this.select
      },
      staticClass: 'q-tab column flex-center relative-position',
      'class': this.classes,
      directives: null
    }, this.__getTabContent(h))
  }
}

var QTab = {
  name: 'q-tab',
  mixins: [TabMixin],
  props: {
    default: Boolean
  },
  methods: {
    select: function select () {
      this.$emit('click', this.name);
      if (!this.disable) {
        this.selectTab(this.name);
      }
    }
  },
  mounted: function mounted () {
    if (this.default && !this.disable) {
      this.select();
    }
  },
  render: function render (h) {
    return h('div', {
      staticClass: 'q-tab column flex-center relative-position',
      'class': this.classes,
      on: {
        click: this.select
      },
      directives: null
    }, this.__getTabContent(h))
  }
}

var QTabPane = {
  name: 'q-tab-pane',
  inject: {
    data: {
      default: function default$1 () {
        console.error('QTabPane needs to be child of QTabs');
      }
    }
  },
  props: {
    name: {
      type: String,
      required: true
    },
    keepAlive: Boolean
  },
  data: function data () {
    return {
      shown: false
    }
  },
  computed: {
    active: function active () {
      return this.data.tabName === this.name
    }
  },
  render: function render (h) {
    var node = h('div', {staticClass: 'q-tab-pane scroll', 'class': {hidden: !this.active}}, [this.$slots.default]);
    if (this.keepAlive) {
      if (!this.shown && !this.active) {
        return
      }
      this.shown = true;
      return node
    }
    else {
      this.shown = this.active;
      if (this.active) {
        return node
      }
    }
  }
}

var scrollNavigationSpeed = 5;
var debounceDelay = 50; // in ms

var QTabs = {render: function(){
var obj;
var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"q-tabs flex",class:[ ("q-tabs-position-" + (_vm.position)), ("q-tabs-" + (_vm.inverted ? 'inverted' : 'normal')), _vm.noPaneBorder ? 'q-tabs-no-pane-border' : '', _vm.twoLines ? 'q-tabs-two-lines' : '' ]},[_c('div',{staticClass:"column full-width no-wrap",style:(_vm.tabStyle)},[_c('div',{ref:"tabs",staticClass:"q-tabs-head row",class:( obj = {}, obj[("q-tabs-align-" + (_vm.align))] = true, obj.glossy = _vm.glossy, obj[("bg-" + (_vm.color))] = !_vm.inverted && _vm.color, obj)},[_c('div',{ref:"scroller",staticClass:"q-tabs-scroller row no-wrap"},[_vm._t("title"),_vm._v(" "),(_vm.$q.theme !== 'ios')?_c('div',{staticClass:"relative-position self-stretch q-tabs-global-bar-container",class:[_vm.inverted && _vm.color ? ("text-" + (_vm.color)) : '', _vm.data.highlight ? 'highlight' : '']},[_c('div',{ref:"posbar",staticClass:"q-tabs-bar q-tabs-global-bar",on:{"transitionend":_vm.__updatePosbarTransition}})]):_vm._e()],2),_vm._v(" "),_c('div',{ref:"leftScroll",staticClass:"row flex-center q-tabs-left-scroll",on:{"mousedown":function($event){_vm.__animScrollTo(0);},"touchstart":function($event){_vm.__animScrollTo(0);},"mouseup":_vm.__stopAnimScroll,"mouseleave":_vm.__stopAnimScroll,"touchend":_vm.__stopAnimScroll}},[_c('q-icon',{attrs:{"name":_vm.$q.icon.tabs.left}})],1),_vm._v(" "),_c('div',{ref:"rightScroll",staticClass:"row flex-center q-tabs-right-scroll",on:{"mousedown":function($event){_vm.__animScrollTo(9999);},"touchstart":function($event){_vm.__animScrollTo(9999);},"mouseup":_vm.__stopAnimScroll,"mouseleave":_vm.__stopAnimScroll,"touchend":_vm.__stopAnimScroll}},[_c('q-icon',{attrs:{"name":_vm.$q.icon.tabs.right}})],1)]),_vm._v(" "),_c('div',{staticClass:"q-tabs-panes column scroll"},[_vm._t("default")],2)])])},staticRenderFns: [],
  name: 'q-tabs',
  provide: function provide () {
    return {
      data: this.data,
      selectTab: this.selectTab
    }
  },
  components: {
    QIcon: QIcon
  },
  props: {
    value: String,
    align: {
      type: String,
      default: 'center',
      validator: function (v) { return ['left', 'center', 'right', 'justify'].includes(v); }
    },
    position: {
      type: String,
      default: 'top',
      validator: function (v) { return ['top', 'bottom'].includes(v); }
    },
    color: String,
    inverted: Boolean,
    twoLines: Boolean,
    noPaneBorder: Boolean,
    glossy: Boolean,
    tabStyle: [String, Object]
  },
  data: function data () {
    return {
      currentEl: null,
      posbar: {
        width: 0,
        left: 0
      },
      data: {
        highlight: true,
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
  methods: {
    selectTab: function selectTab (name) {
      if (this.data.tabName === name) {
        return
      }

      this.data.tabName = name;
      this.$emit('select', name);

      if (this.value !== name) {
        this.$emit('input', name);
      }

      var el = this.__getTabElByName(name);

      if (el) {
        this.__scrollToTab(el);
      }

      
    },
    __repositionBar: function __repositionBar () {
      var this$1 = this;

      clearTimeout(this.timer);

      var needsUpdate = false;
      var
        ref = this.$refs.posbar,
        el = this.currentEl;

      if (this.data.highlight !== false) {
        this.data.highlight = false;
        needsUpdate = true;
      }

      if (!el) {
        this.finalPosbar = {width: 0, left: 0};
        this.__setPositionBar(0, 0);
        return
      }

      var offsetReference = ref.parentNode.offsetLeft;

      if (needsUpdate && this.oldEl) {
        this.__setPositionBar(
          this.oldEl.getBoundingClientRect().width,
          this.oldEl.offsetLeft - offsetReference
        );
      }

      this.timer = setTimeout(function () {
        var
          width$$1 = el.getBoundingClientRect().width,
          left = el.offsetLeft - offsetReference;

        ref.classList.remove('contract');
        this$1.oldEl = el;
        this$1.finalPosbar = {width: width$$1, left: left};
        this$1.__setPositionBar(
          this$1.posbar.left < left
            ? left + width$$1 - this$1.posbar.left
            : this$1.posbar.left + this$1.posbar.width - left,
          this$1.posbar.left < left
            ? this$1.posbar.left
            : left
        );
      }, 20);
    },
    __setPositionBar: function __setPositionBar (width$$1, left) {
      if ( width$$1 === void 0 ) width$$1 = 0;
      if ( left === void 0 ) left = 0;

      if (this.posbar.width === width$$1 && this.posbar.left === left) {
        this.__updatePosbarTransition();
        return
      }
      this.posbar = {width: width$$1, left: left};
      css(this.$refs.posbar, cssTransform(("translateX(" + left + "px) scaleX(" + width$$1 + ")")));
    },
    __updatePosbarTransition: function __updatePosbarTransition () {
      if (
        this.finalPosbar.width === this.posbar.width &&
        this.finalPosbar.left === this.posbar.left
      ) {
        this.posbar = {};
        if (this.data.highlight !== true) {
          this.data.highlight = true;
        }
        return
      }

      this.$refs.posbar.classList.add('contract');
      this.__setPositionBar(this.finalPosbar.width, this.finalPosbar.left);
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
      var tab = this.$children.find(function (child) { return child.name === value && child.$el && child.$el.nodeType === 1; });
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
      if (!this$1.$refs.scroller) {
        return
      }
      this$1.$refs.scroller.addEventListener('scroll', this$1.__updateScrollIndicator);
      window.addEventListener('resize', this$1.__redraw);

      if (this$1.data.tabName !== '' && this$1.value) {
        this$1.selectTab(this$1.value);
      }

      this$1.__redraw();
      this$1.__findTabAndScroll(this$1.data.tabName, true);
    });
  },
  beforeDestroy: function beforeDestroy () {
    clearTimeout(this.timer);
    this.__stopAnimScroll();
    this.$refs.scroller.removeEventListener('scroll', this.__updateScrollIndicator);
    window.removeEventListener('resize', this.__redraw);
    this.__redraw.cancel();
    this.__updateScrollIndicator.cancel();
  }
}

var Top = {
  computed: {
    marginalsProps: function marginalsProps () {
      return {
        pagination: this.computedPagination,
        pagesNumber: this.pagesNumber,
        isFirstPage: this.isFirstPage,
        isLastPage: this.isLastPage,
        prevPage: this.prevPage,
        nextPage: this.nextPage,

        inFullscreen: this.inFullscreen,
        toggleFullscreen: this.toggleFullscreen
      }
    }
  },
  methods: {
    getTop: function getTop (h) {
      var
        top = this.$scopedSlots.top,
        topLeft = this.$scopedSlots['top-left'],
        topRight = this.$scopedSlots['top-right'],
        topSelection = this.$scopedSlots['top-selection'],
        hasSelection = this.selection && topSelection && this.rowsSelectedNumber > 0,
        staticClass = 'q-table-top relative-position row no-wrap items-center',
        child = [];

      if (top) {
        return h('div', { staticClass: staticClass }, [ top(this.marginalsProps) ])
      }

      if (hasSelection) {
        child.push(topSelection(this.marginalsProps));
      }
      else {
        if (topLeft) {
          child.push(topLeft(this.marginalsProps));
        }
        else if (this.title) {
          child.push(h('div', { staticClass: 'q-table-title' }, this.title));
        }
      }

      if (topRight) {
        child.push(h('div', { staticClass: 'q-table-separator col' }));
        child.push(topRight(this.marginalsProps));
      }

      if (child.length === 0) {
        return
      }

      return h('div', { staticClass: staticClass }, child)
    }
  }
}

var QTh = {
  name: 'q-th',
  props: {
    props: Object,
    autoWidth: Boolean
  },
  render: function render (h) {
    var this$1 = this;

    if (!this.props) {
      return h('td', {
        'class': { 'q-table-col-auto-width': this.autoWidth }
      }, [ this.$slots.default ])
    }

    var col;
    var
      name = this.$vnode.key,
      child = [ this.$slots.default ];

    if (name) {
      col = this.props.colsMap[name];
      if (!col) { return }
    }
    else {
      col = this.props.col;
    }

    if (col.sortable) {
      var action = col.align === 'right'
        ? 'unshift'
        : 'push';

      child[action](
        h(QIcon, {
          props: { name: this.$q.icon.table.arrowUp },
          staticClass: col.__iconClass
        })
      );
    }

    return h('th', {
      'class': [col.__thClass, {
        'q-table-col-auto-width': this.autoWidth
      }],
      on: col.sortable
        ? { click: function () { this$1.props.sort(col); } }
        : null
    }, child)
  }
}

var TableHeader = {
  methods: {
    getTableHeader: function getTableHeader (h) {
      if (this.hideHeader) {
        return
      }

      var child = [ this.getTableHeaderRow(h) ];

      if (this.loader) {
        child.push(h('tr', { staticClass: 'q-table-progress animate-fade' }, [
          h('td', { attrs: {colspan: '100%'} }, [
            h(QProgress, {
              props: {
                color: this.color,
                indeterminate: true,
                height: '2px'
              }
            })
          ])
        ]));
      }

      return h('thead', child)
    },
    getTableHeaderRow: function getTableHeaderRow (h) {
      var this$1 = this;

      var
        header = this.$scopedSlots.header,
        headerCell = this.$scopedSlots['header-cell'];

      if (header) {
        return header(this.addTableHeaderRowMeta({header: true, cols: this.computedCols, sort: this.sort, colsMap: this.computedColsMap}))
      }

      var mapFn;

      if (headerCell) {
        mapFn = function (col) { return headerCell({col: col, cols: this$1.computedCols, sort: this$1.sort, colsMap: this$1.computedColsMap}); };
      }
      else {
        mapFn = function (col) { return h(QTh, {
          key: col.name,
          props: {
            props: {
              col: col,
              cols: this$1.computedCols,
              sort: this$1.sort,
              colsMap: this$1.computedColsMap
            }
          }
        }, col.label); };
      }
      var child = this.computedCols.map(mapFn);

      if (this.singleSelection) {
        child.unshift(h('th', { staticClass: 'q-table-col-auto-width' }, [' ']));
      }
      else if (this.multipleSelection) {
        child.unshift(h('th', { staticClass: 'q-table-col-auto-width' }, [
          h(QCheckbox, {
            props: {
              color: this.color,
              value: this.someRowsSelected ? null : this.allRowsSelected,
              dark: this.dark
            },
            on: {
              input: function (val) {
                if (this$1.someRowsSelected) {
                  val = false;
                }
                this$1.__updateSelection(
                  this$1.computedRows.map(function (row) { return row[this$1.rowKey]; }),
                  this$1.computedRows,
                  val
                );
              }
            }
          })
        ]));
      }

      return h('tr', child)
    },
    addTableHeaderRowMeta: function addTableHeaderRowMeta (data) {
      var this$1 = this;

      if (this.multipleSelection) {
        Object.defineProperty(data, 'selected', {
          get: function () { return this$1.someRowsSelected ? 'some' : this$1.allRowsSelected; },
          set: function (val) {
            if (this$1.someRowsSelected) {
              val = false;
            }
            this$1.__updateSelection(
              this$1.computedRows.map(function (row) { return row[this$1.rowKey]; }),
              this$1.computedRows,
              val
            );
          }
        });
        data.partialSelected = this.someRowsSelected;
        data.multipleSelect = true;
      }

      return data
    }
  }
}

var TableBody = {
  methods: {
    getTableBody: function getTableBody (h) {
      var this$1 = this;

      var
        body = this.$scopedSlots.body,
        bodyCell = this.$scopedSlots['body-cell'],
        topRow = this.$scopedSlots['top-row'],
        bottomRow = this.$scopedSlots['bottom-row'];
      var
        child = [];

      if (body) {
        child = this.computedRows.map(function (row) {
          var
            key = row[this$1.rowKey],
            selected = this$1.isRowSelected(key);

          return body(this$1.addBodyRowMeta({
            key: key,
            row: row,
            cols: this$1.computedCols,
            colsMap: this$1.computedColsMap,
            __trClass: selected ? 'selected' : ''
          }))
        });
      }
      else {
        child = this.computedRows.map(function (row) {
          var
            key = row[this$1.rowKey],
            selected = this$1.isRowSelected(key),
            child = bodyCell
              ? this$1.computedCols.map(function (col) { return bodyCell(this$1.addBodyCellMetaData({ row: row, col: col })); })
              : this$1.computedCols.map(function (col) {
                var slot = this$1.$scopedSlots[("body-cell-" + (col.name))];
                return slot
                  ? slot(this$1.addBodyCellMetaData({ row: row, col: col }))
                  : h('td', { staticClass: col.__tdClass }, this$1.getCellValue(col, row))
              });

          if (this$1.selection) {
            child.unshift(h('td', { staticClass: 'q-table-col-auto-width' }, [
              h(QCheckbox, {
                props: {
                  value: selected,
                  color: this$1.color,
                  dark: this$1.dark
                },
                on: {
                  input: function (adding) {
                    this$1.__updateSelection([key], [row], adding);
                  }
                }
              })
            ]));
          }

          return h('tr', { key: key, 'class': { selected: selected } }, child)
        });
      }

      if (topRow) {
        child.unshift(topRow({cols: this.computedCols}));
      }
      if (bottomRow) {
        child.push(bottomRow({cols: this.computedCols}));
      }

      return h('tbody', child)
    },
    addBodyRowMeta: function addBodyRowMeta (data) {
      var this$1 = this;

      if (this.selection) {
        Object.defineProperty(data, 'selected', {
          get: function () { return this$1.isRowSelected(data.key); },
          set: function (adding) {
            this$1.__updateSelection([data.key], [data.row], adding);
          }
        });
      }

      Object.defineProperty(data, 'expand', {
        get: function () { return this$1.rowsExpanded[data.key] === true; },
        set: function (val) {
          this$1.$set(this$1.rowsExpanded, data.key, val);
        }
      });

      data.cols = data.cols.map(function (col) {
        var c = Object.assign({}, col);
        Object.defineProperty(c, 'value', {
          get: function () { return this$1.getCellValue(col, data.row); }
        });
        return c
      });

      return data
    },
    addBodyCellMetaData: function addBodyCellMetaData (data) {
      var this$1 = this;

      Object.defineProperty(data, 'value', {
        get: function () { return this$1.getCellValue(data.col, data.row); }
      });
      return data
    },
    getCellValue: function getCellValue (col, row) {
      var val = typeof col.field === 'function' ? col.field(row) : row[col.field];
      return col.format ? col.format(val) : val
    }
  }
}

var Bottom = {
  methods: {
    getBottom: function getBottom (h) {
      if (this.nothingToDisplay) {
        var message = this.filter
          ? this.noResultsLabel || this.$q.i18n.table.noResults
          : (this.loader ? this.loaderLabel || this.$q.i18n.table.loader : this.noDataLabel || this.$q.i18n.table.noData);

        return h('div', { staticClass: 'q-table-bottom row items-center q-table-nodata' }, [
          h(QIcon, {props: { name: this.$q.icon.table.warning }}),
          message
        ])
      }

      if (this.hideBottom) {
        return
      }

      var bottom = this.$scopedSlots.bottom;

      return h('div', { staticClass: 'q-table-bottom row items-center' },
        bottom ? [ bottom(this.marginalsProps) ] : this.getPaginationRow(h)
      )
    },
    getPaginationRow: function getPaginationRow (h) {
      var this$1 = this;

      var ref = this.computedPagination;
      var rowsPerPage = ref.rowsPerPage;
      var paginationLabel = this.paginationLabel || this.$q.i18n.table.pagination,
        paginationSlot = this.$scopedSlots.pagination;

      return [
        h('div', { staticClass: 'col' }, [
          this.selection && this.rowsSelectedNumber > 0
            ? (this.selectedRowsLabel || this.$q.i18n.table.selectedRows)(this.rowsSelectedNumber)
            : ''
        ]),
        h('div', { staticClass: 'flex items-center' }, [
          h('span', { staticClass: 'q-mr-lg' }, [
            this.rowsPerPageLabel || this.$q.i18n.table.rowsPerPage
          ]),
          h(QSelect, {
            staticClass: 'inline q-pb-none q-my-none q-ml-none q-mr-lg',
            style: {
              minWidth: '50px'
            },
            props: {
              color: this.color,
              value: rowsPerPage,
              options: this.computedRowsPerPageOptions,
              dark: this.dark,
              hideUnderline: true
            },
            on: {
              input: function (rowsPerPage) {
                this$1.setPagination({
                  page: 1,
                  rowsPerPage: rowsPerPage
                });
              }
            }
          }),
          paginationSlot
            ? paginationSlot(this.marginalsProps)
            : [
              h('span', { staticClass: 'q-mr-lg' }, [
                rowsPerPage
                  ? paginationLabel(this.firstRowIndex + 1, Math.min(this.lastRowIndex, this.computedRowsNumber), this.computedRowsNumber)
                  : paginationLabel(1, this.computedRowsNumber, this.computedRowsNumber)
              ]),
              h(QBtn, {
                props: {
                  color: this.color,
                  round: true,
                  icon: this.$q.icon.table.prevPage,
                  dense: true,
                  flat: true,
                  disable: this.isFirstPage
                },
                on: { click: this.prevPage }
              }),
              h(QBtn, {
                props: {
                  color: this.color,
                  round: true,
                  icon: this.$q.icon.table.nextPage,
                  dense: true,
                  flat: true,
                  disable: this.isLastPage
                },
                on: { click: this.nextPage }
              })
            ]
        ])
      ]
    }
  }
}

function sortDate (a, b) {
  return (new Date(a)) - (new Date(b))
}

var Sort = {
  props: {
    sortMethod: {
      type: Function,
      default: function default$1 (data, sortBy, descending) {
        var col = this.computedCols.find(function (def) { return def.name === sortBy; });
        if (col === null || col.field === void 0) {
          return data
        }

        var
          dir = descending ? -1 : 1,
          val = typeof col.field === 'function'
            ? function (v) { return col.field(v); }
            : function (v) { return v[col.field]; };

        return data.sort(function (a, b) {
          var
            A = val(a),
            B = val(b);

          if (A === null || A === void 0) {
            return -1 * dir
          }
          if (B === null || B === void 0) {
            return 1 * dir
          }
          if (col.sort) {
            return col.sort(A, B) * dir
          }
          if (isNumber(A) && isNumber(B)) {
            return (A - B) * dir
          }
          if (isDate(A) && isDate(B)) {
            return sortDate(A, B) * dir
          }

          var assign;
          (assign = [A, B].map(function (s) { return s.toLowerCase(); }), A = assign[0], B = assign[1]);

          return A < B
            ? -1 * dir
            : (A === B ? 0 : dir)
        })
      }
    }
  },
  computed: {
    columnToSort: function columnToSort () {
      var ref = this.computedPagination;
      var sortBy = ref.sortBy;

      if (sortBy) {
        var col = this.computedCols.find(function (def) { return def.name === sortBy; });
        return col || null
      }
    }
  },
  methods: {
    sort: function sort (col /* String(col name) or Object(col definition) */) {
      if (col === Object(col)) {
        col = col.name;
      }

      var ref = this.computedPagination;
      var sortBy = ref.sortBy;
      var descending = ref.descending;

      if (sortBy !== col) {
        sortBy = col;
        descending = false;
      }
      else if (descending) {
        sortBy = null;
      }
      else {
        descending = true;
      }

      this.setPagination({ sortBy: sortBy, descending: descending, page: 1 });
    }
  }
}

var Filter = {
  props: {
    filter: String,
    filterMethod: {
      type: Function,
      default: function default$1 (rows, terms, cols, cellValue) {
        if ( cols === void 0 ) cols = this.computedCols;
        if ( cellValue === void 0 ) cellValue = this.getCellValue;

        var lowerTerms = terms ? terms.toLowerCase() : '';
        return rows.filter(
          function (row) { return cols.some(function (col) { return (cellValue(col, row) + '').toLowerCase().indexOf(lowerTerms) !== -1; }); }
        )
      }
    }
  },
  computed: {
    hasFilter: function hasFilter () {
      return this.filter !== void 0 && this.filter.length > 0
    }
  },
  watch: {
    filter: function filter () {
      var this$1 = this;

      this.$nextTick(function () {
        this$1.setPagination({ page: 1 });
      });
    }
  }
}

var Pagination = {
  props: {
    pagination: Object,
    rowsPerPageOptions: {
      type: Array,
      default: function () { return [3, 5, 7, 10, 15, 20, 25, 50, 0]; }
    }
  },
  data: function data () {
    return {
      innerPagination: {
        sortBy: null,
        descending: false,
        page: 1,
        rowsPerPage: 5
      }
    }
  },
  computed: {
    computedPagination: function computedPagination () {
      return Object.assign({}, this.innerPagination, this.pagination)
    },
    firstRowIndex: function firstRowIndex () {
      var ref = this.computedPagination;
      var page = ref.page;
      var rowsPerPage = ref.rowsPerPage;
      return (page - 1) * rowsPerPage
    },
    lastRowIndex: function lastRowIndex () {
      var ref = this.computedPagination;
      var page = ref.page;
      var rowsPerPage = ref.rowsPerPage;
      return page * rowsPerPage
    },
    isFirstPage: function isFirstPage () {
      var ref = this.computedPagination;
      var page = ref.page;
      return page <= 1
    },
    pagesNumber: function pagesNumber () {
      var ref = this.computedPagination;
      var rowsPerPage = ref.rowsPerPage;
      return Math.ceil(this.computedRowsNumber / rowsPerPage)
    },
    isLastPage: function isLastPage () {
      if (this.lastRowIndex === 0) {
        return true
      }
      var ref = this.computedPagination;
      var page = ref.page;
      return page >= this.pagesNumber
    },
    computedRowsPerPageOptions: function computedRowsPerPageOptions () {
      var this$1 = this;

      return this.rowsPerPageOptions.map(function (count) { return ({
        label: count === 0 ? this$1.$q.i18n.table.allRows : '' + count,
        value: count
      }); })
    }
  },
  methods: {
    setPagination: function setPagination (val) {
      var newPagination = Object.assign({}, this.computedPagination, val);

      if (this.isServerSide) {
        this.requestServerInteraction({
          pagination: newPagination
        });
        return
      }

      if (this.pagination) {
        this.$emit('update:pagination', newPagination);
      }
      else {
        this.innerPagination = newPagination;
      }
    },
    prevPage: function prevPage () {
      var ref = this.computedPagination;
      var page = ref.page;
      if (page > 1) {
        this.setPagination({page: page - 1});
      }
    },
    nextPage: function nextPage () {
      var ref = this.computedPagination;
      var page = ref.page;
      var rowsPerPage = ref.rowsPerPage;
      if (this.lastRowIndex > 0 && page * rowsPerPage < this.computedRowsNumber) {
        this.setPagination({page: page + 1});
      }
    }
  },
  created: function created () {
    this.$emit('update:pagination', Object.assign({}, this.computedPagination));
  }
}

var RowSelection = {
  props: {
    selection: {
      type: String,
      validator: function (v) { return ['single', 'multiple'].includes(v); }
    },
    selected: {
      type: Array,
      default: function () { return []; }
    }
  },
  computed: {
    selectedKeys: function selectedKeys () {
      var this$1 = this;

      var keys = {};
      this.selected.map(function (row) { return row[this$1.rowKey]; }).forEach(function (key) {
        keys[key] = true;
      });
      return keys
    },
    singleSelection: function singleSelection () {
      return this.selection === 'single'
    },
    multipleSelection: function multipleSelection () {
      return this.selection === 'multiple'
    },
    allRowsSelected: function allRowsSelected () {
      var this$1 = this;

      if (this.multipleSelection) {
        return this.computedRows.length > 0 && this.computedRows.every(function (row) { return this$1.selectedKeys[row[this$1.rowKey]] === true; })
      }
    },
    someRowsSelected: function someRowsSelected () {
      var this$1 = this;

      if (this.multipleSelection) {
        return !this.allRowsSelected && this.computedRows.some(function (row) { return this$1.selectedKeys[row[this$1.rowKey]] === true; })
      }
    },
    rowsSelectedNumber: function rowsSelectedNumber () {
      return this.selected.length
    }
  },
  methods: {
    isRowSelected: function isRowSelected (key) {
      return this.selectedKeys[key] === true
    },
    clearSelection: function clearSelection () {
      this.$emit('update:selected', []);
    },
    __updateSelection: function __updateSelection (keys, rows, adding) {
      var this$1 = this;

      if (this.singleSelection) {
        this.$emit('update:selected', adding ? rows : []);
      }
      else {
        this.$emit('update:selected', adding
          ? this.selected.concat(rows)
          : this.selected.filter(function (row) { return !keys.includes(row[this$1.rowKey]); })
        );
      }
    }
  }
}

var ColumnSelection = {
  props: {
    visibleColumns: Array
  },
  computed: {
    computedCols: function computedCols () {
      var this$1 = this;

      var ref = this.computedPagination;
      var sortBy = ref.sortBy;
      var descending = ref.descending;

      var cols = this.visibleColumns
        ? this.columns.filter(function (col) { return col.required || this$1.visibleColumns.includes(col.name); })
        : this.columns;

      return cols.map(function (col) {
        col.align = col.align || 'right';
        col.__iconClass = "q-table-sort-icon q-table-sort-icon-" + (col.align);
        col.__thClass = "text-" + (col.align) + (col.sortable ? ' sortable' : '') + (col.name === sortBy ? (" sorted " + (descending ? 'sort-desc' : '')) : '');
        col.__tdClass = "text-" + (col.align);
        return col
      })
    },
    computedColsMap: function computedColsMap () {
      var names = {};
      this.computedCols.forEach(function (col) {
        names[col.name] = col;
      });
      return names
    }
  }
}

var Expand = {
  data: function data () {
    return {
      rowsExpanded: {}
    }
  }
}

var QTable = {
  name: 'q-table',
  mixins: [
    FullscreenMixin,
    Top,
    TableHeader,
    TableBody,
    Bottom,
    Sort,
    Filter,
    Pagination,
    RowSelection,
    ColumnSelection,
    Expand
  ],
  props: {
    data: {
      type: Array,
      default: function () { return []; }
    },
    rowKey: {
      type: String,
      default: 'id'
    },
    color: {
      type: String,
      default: 'grey-8'
    },
    columns: Array,
    loader: Boolean,
    title: String,
    hideHeader: Boolean,
    hideBottom: Boolean,
    dark: Boolean,
    separator: {
      type: String,
      default: 'horizontal',
      validator: function (v) { return ['horizontal', 'vertical', 'cell', 'none'].includes(v); }
    },
    noDataLabel: String,
    noResultsLabel: String,
    loaderLabel: String,
    selectedRowsLabel: Function,
    rowsPerPageLabel: String,
    paginationLabel: Function,
    tableStyle: {
      type: [String, Array, Object],
      default: ''
    },
    tableClass: {
      type: [String, Array, Object],
      default: ''
    }
  },
  computed: {
    computedRows: function computedRows () {
      var rows = this.data.slice().map(function (row, i) {
        row.__index = i;
        return row
      });

      if (rows.length === 0) {
        return []
      }
      if (this.isServerSide) {
        return rows
      }

      var ref = this.computedPagination;
      var sortBy = ref.sortBy;
      var descending = ref.descending;
      var rowsPerPage = ref.rowsPerPage;

      if (this.hasFilter) {
        rows = this.filterMethod(rows, this.filter, this.computedCols, this.getCellValue);
      }

      if (this.columnToSort) {
        rows = this.sortMethod(rows, sortBy, descending);
      }

      if (rowsPerPage) {
        rows = rows.slice(this.firstRowIndex, this.lastRowIndex);
      }

      return rows
    },
    computedRowsNumber: function computedRowsNumber () {
      return this.isServerSide
        ? this.computedPagination.rowsNumber || 0
        : this.data.length
    },
    nothingToDisplay: function nothingToDisplay () {
      return this.computedRows.length === 0
    },
    isServerSide: function isServerSide () {
      return this.computedPagination.rowsNumber !== void 0
    }
  },
  render: function render (h) {
    return h('div',
      {
        'class': {
          'q-table-container': true,
          'q-table-dark': this.dark,
          fullscreen: this.inFullscreen,
          scroll: this.inFullscreen
        }
      },
      [
        this.getTop(h),
        h('div', { staticClass: 'q-table-middle scroll', 'class': this.tableClass, style: this.tableStyle }, [
          h('table', { staticClass: ("q-table q-table-" + (this.separator) + "-separator" + (this.dark ? ' q-table-dark' : '')) },
            [
              this.getTableHeader(h),
              this.getTableBody(h)
            ]
          )
        ]),
        this.getBottom(h)
      ]
    )
  },
  methods: {
    requestServerInteraction: function requestServerInteraction (prop) {
      var this$1 = this;

      this.$nextTick(function () {
        this$1.$emit('request', {
          pagination: prop.pagination || this$1.computedPagination,
          filter: prop.filter || this$1.filter,
          getCellValue: this$1.getCellValue
        });
      });
    }
  }
}

var QTr = {
  name: 'q-tr',
  props: {
    props: Object
  },
  render: function render (h) {
    return h('tr',
      !this.props || this.props.header ? {} : { 'class': this.props.__trClass },
      [ this.$slots.default ]
    )
  }
}

var QTd = {
  name: 'q-td',
  props: {
    props: Object,
    autoWidth: Boolean
  },
  render: function render (h) {
    if (!this.props) {
      return h('td', {
        'class': { 'q-table-col-auto-width': this.autoWidth }
      }, [ this.$slots.default ])
    }

    var col;
    var name = this.$vnode.key;

    if (name) {
      col = this.props.colsMap[name];
      if (!col) { return }
    }
    else {
      col = this.props.col;
    }

    return h('td', {
      'class': [col.__tdClass, {
        'q-table-col-auto-width': this.autoWidth
      }]
    }, [ this.$slots.default ])
  }
}

var QTableColumns = {
  name: 'q-table-columns',
  props: {
    value: {
      type: Array,
      required: true
    },
    label: String,
    columns: {
      type: Array,
      required: true
    },
    color: String
  },
  computed: {
    computedOptions: function computedOptions () {
      return this.columns.filter(function (col) { return !col.required; }).map(function (col) { return ({
        value: col.name,
        label: col.label
      }); })
    }
  },
  render: function render (h) {
    return h(QSelect, {
      props: {
        multiple: true,
        toggle: true,
        value: this.value,
        options: this.computedOptions,
        displayValue: this.label || this.$q.i18n.table.columns,
        color: this.color,
        hideUnderline: true
      }
    })
  }
}

var QTimeline = {
  name: 'q-timeline',
  provide: function provide () {
    return {
      __timeline: this
    }
  },
  props: {
    color: {
      type: String,
      default: 'primary'
    },
    dark: Boolean
  },
  render: function render (h) {
    return h('ul', {
      staticClass: 'q-timeline',
      'class': { 'q-timeline-dark': this.dark }
    }, [
      this.$slots.default
    ])
  }
}

var QTimelineEntry = {
  name: 'q-timeline-entry',
  inject: {
    __timeline: {
      default: function default$1 () {
        console.error('QTimelineEntry needs to be child of QTimeline');
      }
    }
  },
  props: {
    heading: Boolean,
    tag: {
      type: String,
      default: 'h3'
    },
    side: {
      type: String,
      default: 'right',
      validator: function (v) { return ['left', 'right'].includes(v); }
    },
    icon: String,
    color: String,
    title: String,
    subtitle: String
  },
  computed: {
    colorClass: function colorClass () {
      return ("text-" + (this.color || this.__timeline.color))
    },
    classes: function classes () {
      return [
        ("q-timeline-entry-" + (this.side === 'left' ? 'left' : 'right')),
        this.icon ? 'q-timeline-entry-with-icon' : ''
      ]
    }
  },
  render: function render (h) {
    if (this.heading) {
      return h('div', { staticClass: 'q-timeline-heading' }, [
        h('div'),
        h('div'),
        h(this.tag, { staticClass: 'q-timeline-heading-title' }, [
          this.$slots.default
        ])
      ])
    }

    return h('li', {
      staticClass: "q-timeline-entry",
      'class': this.classes
    }, [
      h('div', { staticClass: 'q-timeline-subtitle' }, [
        h('span', this.subtitle)
      ]),

      h('div', {
        staticClass: 'q-timeline-dot',
        'class': this.colorClass
      }, [
        this.icon
          ? h(QIcon, { props: { name: this.icon } })
          : null
      ]),

      h('div', { staticClass: 'q-timeline-content' }, [
        h('h6', { staticClass: 'q-timeline-title' }, [ this.title ]),
        this.$slots.default
      ])
    ])
  }
}

var QToolbar = {
  name: 'q-toolbar',
  props: {
    color: String,
    inverted: Boolean,
    glossy: Boolean
  },
  computed: {
    classes: function classes () {
      return [
        ("q-toolbar-" + (this.inverted ? 'inverted' : 'normal')),
        this.color ? (" " + (this.inverted ? 'text' : 'bg') + "-" + (this.color)) : '',
        this.glossy ? 'glossy' : ''
      ]
    }
  },
  render: function render (h) {
    return h('div', {
      staticClass: 'q-toolbar row no-wrap items-center relative-position',
      'class': this.classes
    }, [
      this.$slots.default
    ])
  }
}

var QToolbarTitle = {
  name: 'q-toolbar-title',
  render: function render (h) {
    return h('div', {
      staticClass: 'q-toolbar-title'
    }, [
      this.$slots.default,
      this.$slots.subtitle
        ? h('div', { staticClass: 'q-toolbar-subtitle' }, this.$slots.subtitle)
        : null
    ])
  }
}

var QTree = {
  name: 'q-tree',
  directives: {
    Ripple: Ripple
  },
  props: {
    nodes: Array,
    nodeKey: {
      type: String,
      default: 'id'
    },

    color: {
      type: String,
      default: 'grey'
    },
    controlColor: String,
    textColor: String,
    dark: Boolean,

    icon: String,

    tickStrategy: {
      type: String,
      validator: function (v) { return ['none', 'strict', 'leaf', 'leaf-filtered'].includes(v); }
    },
    ticked: Array, // sync
    expanded: Array, // sync
    selected: {}, // sync

    defaultExpandAll: Boolean,
    accordion: Boolean,

    filter: String,
    filterMethod: {
      type: Function,
      default: function default$1 (node, filter) {
        return node.label && node.label.indexOf(filter) > -1
      }
    },

    noNodesLabel: String,
    noResultsLabel: String
  },
  computed: {
    hasRipple: function hasRipple () {
      return "ios" === 'mat' && !this.noRipple
    },
    classes: function classes () {
      return [
        ("text-" + (this.color)),
        { 'q-tree-dark': this.dark }
      ]
    },
    hasSelection: function hasSelection () {
      return this.selected !== void 0
    },
    computedIcon: function computedIcon () {
      return this.icon || this.$q.icon.tree.icon
    },
    computedControlColor: function computedControlColor () {
      return this.controlColor || this.color
    },
    contentClass: function contentClass () {
      return ("text-" + (this.textColor || (this.dark ? 'white' : 'black')))
    },
    meta: function meta () {
      var this$1 = this;

      var meta = {};

      var travel = function (node, parent) {
        var tickStrategy = node.tickStrategy || (parent ? parent.tickStrategy : this$1.tickStrategy);
        var
          key = node[this$1.nodeKey],
          isParent = node.children && node.children.length > 0,
          isLeaf = !isParent,
          selectable = !node.disabled && this$1.hasSelection && node.selectable !== false,
          expandable = !node.disabled && node.expandable !== false,
          hasTicking = tickStrategy !== 'none',
          strictTicking = tickStrategy === 'strict',
          leafFilteredTicking = tickStrategy === 'leaf-filtered',
          leafTicking = tickStrategy === 'leaf' || tickStrategy === 'leaf-filtered';

        var tickable = !node.disabled && node.tickable !== false;
        if (leafTicking && tickable && parent && !parent.tickable) {
          tickable = false;
        }

        var lazy = node.lazy;
        if (lazy && this$1.lazy[key]) {
          lazy = this$1.lazy[key];
        }

        var m = {
          key: key,
          parent: parent,
          isParent: isParent,
          isLeaf: isLeaf,
          lazy: lazy,
          disabled: node.disabled,
          link: selectable || (expandable && (isParent || lazy === true)),
          children: [],
          matchesFilter: this$1.filter ? this$1.filterMethod(node, this$1.filter) : true,

          selected: key === this$1.selected && selectable,
          selectable: selectable,
          expanded: isParent ? this$1.innerExpanded.includes(key) : false,
          expandable: expandable,
          noTick: node.noTick || (!strictTicking && lazy && lazy !== 'loaded'),
          tickable: tickable,
          tickStrategy: tickStrategy,
          hasTicking: hasTicking,
          strictTicking: strictTicking,
          leafFilteredTicking: leafFilteredTicking,
          leafTicking: leafTicking,
          ticked: strictTicking
            ? this$1.innerTicked.includes(key)
            : (isLeaf ? this$1.innerTicked.includes(key) : false)
        };

        meta[key] = m;

        if (isParent) {
          m.children = node.children.map(function (n) { return travel(n, m); });

          if (this$1.filter) {
            if (!m.matchesFilter) {
              m.matchesFilter = m.children.some(function (n) { return n.matchesFilter; });
            }
            if (
              m.matchesFilter &&
              !m.noTick &&
              !m.disabled &&
              m.tickable &&
              leafFilteredTicking &&
              m.children.every(function (n) { return !n.matchesFilter || n.noTick || !n.tickable; })
            ) {
              m.tickable = false;
            }
          }

          if (m.matchesFilter) {
            if (!m.noTick && !strictTicking && m.children.every(function (n) { return n.noTick; })) {
              m.noTick = true;
            }

            if (leafTicking) {
              m.ticked = false;
              m.indeterminate = m.children.some(function (node) { return node.indeterminate; });

              if (!m.indeterminate) {
                var sel = m.children
                  .reduce(function (acc, meta) { return meta.ticked ? acc + 1 : acc; }, 0);

                if (sel === m.children.length) {
                  m.ticked = true;
                }
                else if (sel > 0) {
                  m.indeterminate = true;
                }
              }
            }
          }
        }

        return m
      };

      this.nodes.forEach(function (node) { return travel(node, null); });
      return meta
    }
  },
  data: function data () {
    return {
      lazy: {},
      innerTicked: this.ticked || [],
      innerExpanded: this.expanded || []
    }
  },
  watch: {
    ticked: function ticked (val) {
      this.innerTicked = val;
    },
    expanded: function expanded (val) {
      this.innerExpanded = val;
    }
  },
  methods: {
    getNodeByKey: function getNodeByKey (key) {
      var this$1 = this;

      var reduce = [].reduce;

      var find = function (result, node) {
        if (result || !node) {
          return result
        }
        if (Array.isArray(node)) {
          return reduce.call(Object(node), find, result)
        }
        if (node[this$1.nodeKey] === key) {
          return node
        }
        if (node.children) {
          return find(null, node.children)
        }
      };

      return find(null, this.nodes)
    },
    getTickedNodes: function getTickedNodes () {
      var this$1 = this;

      return this.innerTicked.map(function (key) { return this$1.getNodeByKey(key); })
    },
    getExpandedNodes: function getExpandedNodes () {
      var this$1 = this;

      return this.innerExpanded.map(function (key) { return this$1.getNodeByKey(key); })
    },
    isExpanded: function isExpanded (key) {
      return key && this.meta[key]
        ? this.meta[key].expanded
        : false
    },
    collapseAll: function collapseAll () {
      if (this.expanded !== void 0) {
        this.$emit('update:expanded', []);
      }
      else {
        this.innerExpanded = [];
      }
    },
    expandAll: function expandAll () {
      var this$1 = this;

      var
        expanded = this.innerExpanded,
        travel = function (node) {
          if (node.children && node.children.length > 0) {
            if (node.expandable !== false && node.disabled !== true) {
              expanded.push(node[this$1.nodeKey]);
              node.children.forEach(travel);
            }
          }
        };

      this.nodes.forEach(travel);

      if (this.expanded !== void 0) {
        this.$emit('update:expanded', expanded);
      }
      else {
        this.innerExpanded = expanded;
      }
    },
    setExpanded: function setExpanded (key, state, node, meta) {
      var this$1 = this;
      if ( node === void 0 ) node = this.getNodeByKey(key);
      if ( meta === void 0 ) meta = this.meta[key];

      if (meta.lazy && meta.lazy !== 'loaded') {
        if (meta.lazy === 'loading') {
          return
        }

        this.$set(this.lazy, key, 'loading');
        this.$emit('lazy-load', {
          node: node,
          key: key,
          done: function (children) {
            this$1.lazy[key] = 'loaded';
            if (children) {
              node.children = children;
            }
            this$1.$nextTick(function () {
              var m = this$1.meta[key];
              if (m && m.isParent) {
                this$1.__setExpanded(key, true);
              }
            });
          },
          fail: function () {
            this$1.$delete(this$1.lazy, key);
          }
        });
      }
      else if (meta.isParent && meta.expandable) {
        this.__setExpanded(key, state);
      }
    },
    __setExpanded: function __setExpanded (key, state) {
      var this$1 = this;

      var target = this.innerExpanded;
      var emit = this.expanded !== void 0;

      if (emit) {
        target = target.slice();
      }

      if (state) {
        if (this.accordion) {
          if (this.meta[key]) {
            var collapse = [];
            if (this.meta[key].parent) {
              this.meta[key].parent.children.forEach(function (m) {
                if (m.key !== key && m.expandable) {
                  collapse.push(m.key);
                }
              });
            }
            else {
              this.nodes.forEach(function (node) {
                var k = node[this$1.nodeKey];
                if (k !== key) {
                  collapse.push(k);
                }
              });
            }
            if (collapse.length > 0) {
              target = target.filter(function (k) { return !collapse.includes(k); });
            }
          }
        }

        target = target.concat([ key ])
          .filter(function (key, index, self) { return self.indexOf(key) === index; });
      }
      else {
        target = target.filter(function (k) { return k !== key; });
      }

      if (emit) {
        this.$emit("update:expanded", target);
      }
    },
    isTicked: function isTicked (key) {
      return key && this.meta[key]
        ? this.meta[key].ticked
        : false
    },
    setTicked: function setTicked (keys, state) {
      var target = this.innerTicked;
      var emit = this.ticked !== void 0;

      if (emit) {
        target = target.slice();
      }

      if (state) {
        target = target.concat(keys)
          .filter(function (key, index, self) { return self.indexOf(key) === index; });
      }
      else {
        target = target.filter(function (k) { return !keys.includes(k); });
      }

      if (emit) {
        this.$emit("update:ticked", target);
      }
    },
    __getSlotScope: function __getSlotScope (node, meta, key) {
      var this$1 = this;

      var scope = { tree: this, node: node, key: key, color: this.color, dark: this.dark };

      Object.defineProperty(scope, 'expanded', {
        get: function () { return meta.expanded },
        set: function (val) { val !== meta.expanded && this$1.setExpanded(key, val); }
      });
      Object.defineProperty(scope, 'ticked', {
        get: function () { return meta.ticked },
        set: function (val) { val !== meta.ticked && this$1.setTicked([ key ], val); }
      });

      return scope
    },
    __getChildren: function __getChildren (h, nodes) {
      var this$1 = this;

      return (
        this.filter
          ? nodes.filter(function (n) { return this$1.meta[n[this$1.nodeKey]].matchesFilter; })
          : nodes
      ).map(function (child) { return this$1.__getNode(h, child); })
    },
    __getNodeMedia: function __getNodeMedia (h, node) {
      if (node.icon) {
        return h(QIcon, {
          staticClass: "q-tree-icon q-mr-sm",
          props: { name: node.icon }
        })
      }
      if (node.img || node.avatar) {
        return h('img', {
          staticClass: "q-tree-img q-mr-sm",
          'class': { avatar: node.avatar },
          domProps: { src: node.img || node.avatar }
        })
      }
    },
    __getNode: function __getNode (h, node) {
      var this$1 = this;

      var
        key = node[this.nodeKey],
        meta = this.meta[key],
        header = node.header
          ? this.$scopedSlots[("header-" + (node.header))] || this.$scopedSlots['default-header']
          : this.$scopedSlots['default-header'];

      var children = meta.isParent
        ? this.__getChildren(h, node.children)
        : [];

      var isParent = children.length > 0;

      var
        body = node.body
          ? this.$scopedSlots[("body-" + (node.body))] || this.$scopedSlots['default-body']
          : this.$scopedSlots['default-body'],
        slotScope = header || body
          ? this.__getSlotScope(node, meta, key)
          : null;

      if (body) {
        body = h('div', {
          staticClass: 'q-tree-node-body relative-position',
          'class': { 'q-tree-node-body-with-children': isParent }
        }, [
          h('div', { 'class': this.contentClass }, [
            body(slotScope)
          ])
        ]);
      }

      return h('div', {
        key: key,
        staticClass: 'q-tree-node'
      }, [
        h('div', {
          staticClass: 'q-tree-node-header relative-position row no-wrap items-center',
          'class': {
            'q-tree-node-link': meta.link,
            'q-tree-node-selected': meta.selected,
            disabled: meta.disabled
          },
          on: { click: function () { this$1.__onClick(node, meta); } },
          directives: null
        }, [
          meta.lazy === 'loading'
            ? h(QSpinner, {
              staticClass: 'q-tree-node-header-media q-mr-xs',
              props: { color: this.computedControlColor }
            })
            : (
              isParent || (meta.lazy && meta.lazy !== 'loaded')
                ? h(QIcon, {
                  staticClass: 'q-tree-arrow q-mr-xs transition-generic',
                  'class': { 'rotate-90': meta.expanded },
                  props: { name: this.computedIcon },
                  nativeOn: this.hasSelection
                    ? { click: function (e) { this$1.__onExpandClick(node, meta, e); } }
                    : undefined
                })
                : null
            ),

          h('span', { 'staticClass': 'row no-wrap items-center', 'class': this.contentClass }, [
            meta.hasTicking && !meta.noTick
              ? h(QCheckbox, {
                staticClass: 'q-mr-xs',
                props: {
                  value: meta.indeterminate ? null : meta.ticked,
                  color: this.computedControlColor,
                  dark: this.dark,
                  keepColor: true,
                  disable: !meta.tickable
                },
                on: {
                  input: function (v) {
                    this$1.__onTickedClick(node, meta, v);
                  }
                }
              })
              : null,
            header
              ? header(slotScope)
              : [
                this.__getNodeMedia(h, node),
                h('span', node.label)
              ]
          ])
        ]),

        isParent
          ? h(QSlideTransition, [
            h('div', {
              directives: [{ name: 'show', value: meta.expanded }],
              staticClass: 'q-tree-node-collapsible',
              'class': ("text-" + (this.color))
            }, [
              body,
              h('div', {
                staticClass: 'q-tree-children',
                'class': { disabled: meta.disabled }
              }, children)
            ])
          ])
          : body
      ])
    },
    __onClick: function __onClick (node, meta) {
      if (this.hasSelection) {
        meta.selectable && this.$emit('update:selected', meta.key);
      }
      else {
        this.__onExpandClick(node, meta);
      }

      if (typeof node.handler === 'function') {
        node.handler(node);
      }
    },
    __onExpandClick: function __onExpandClick (node, meta, e) {
      if (e !== void 0) {
        e.stopPropagation();
      }
      this.setExpanded(meta.key, !meta.expanded, node, meta);
    },
    __onTickedClick: function __onTickedClick (node, meta, state) {
      if (meta.indeterminate && state) {
        state = false;
      }
      if (meta.strictTicking) {
        this.setTicked([ meta.key ], state);
      }
      else if (meta.leafTicking) {
        var keys = [];
        var travel = function (meta) {
          if (meta.isParent) {
            if (!state && !meta.noTick && meta.tickable) {
              keys.push(meta.key);
            }
            if (meta.leafTicking) {
              meta.children.forEach(travel);
            }
          }
          else if (!meta.noTick && meta.tickable && (!meta.leafFilteredTicking || meta.matchesFilter)) {
            keys.push(meta.key);
          }
        };
        travel(meta);
        this.setTicked(keys, state);
      }
    }
  },
  render: function render (h) {
    var children = this.__getChildren(h, this.nodes);

    return h(
      'div', {
        staticClass: 'q-tree relative-position',
        'class': this.classes
      },
      children.length === 0
        ? (
          this.filter
            ? this.noResultsLabel || this.$q.i18n.tree.noResults
            : this.noNodesLabel || this.$q.i18n.tree.noNodes
        )
        : children
    )
  },
  created: function created () {
    if (this.defaultExpandAll) {
      this.expandAll();
    }
  }
}

function initFile (file) {
  file.__doneUploading = false;
  file.__failed = false;
  file.__uploaded = 0;
  file.__progress = 0;
}

var QUploader = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"q-uploader relative-position",on:{"dragover":function($event){$event.preventDefault();$event.stopPropagation();_vm.__onDragOver($event);}}},[_c('q-input-frame',{ref:"input",staticClass:"no-margin",attrs:{"prefix":_vm.prefix,"suffix":_vm.suffix,"stack-label":_vm.stackLabel,"float-label":_vm.floatLabel,"error":_vm.error,"warning":_vm.warning,"disable":_vm.disable,"inverted":_vm.inverted,"dark":_vm.dark,"hide-underline":_vm.hideUnderline,"before":_vm.before,"after":_vm.after,"color":_vm.color,"align":_vm.align,"length":_vm.queueLength,"additional-length":""}},[_c('div',{staticClass:"col row items-center q-input-target",domProps:{"innerHTML":_vm._s(_vm.label)}}),_vm._v(" "),(_vm.uploading)?_c('q-spinner',{staticClass:"q-if-control",attrs:{"slot":"after","size":"24px"},slot:"after"}):_vm._e(),_vm._v(" "),(_vm.uploading)?_c('q-icon',{staticClass:"q-if-control",attrs:{"slot":"after","name":_vm.$q.icon.uploader.clear},nativeOn:{"click":function($event){_vm.abort($event);}},slot:"after"}):_vm._e(),_vm._v(" "),(!_vm.uploading)?_c('q-icon',{staticClass:"q-uploader-pick-button q-if-control relative-position overflow-hidden",attrs:{"slot":"after","name":_vm.$q.icon.uploader.add,"disabled":_vm.addDisabled},nativeOn:{"click":function($event){_vm.__pick($event);}},slot:"after"},[_c('input',_vm._b({ref:"file",staticClass:"q-uploader-input absolute-full cursor-pointer",attrs:{"type":"file","accept":_vm.extensions},on:{"change":_vm.__add}},'input',{multiple: _vm.multiple},true))]):_vm._e(),_vm._v(" "),(!_vm.hideUploadButton && !_vm.uploading)?_c('q-icon',{staticClass:"q-if-control",attrs:{"slot":"after","name":_vm.$q.icon.uploader.upload,"disabled":_vm.queueLength === 0},nativeOn:{"click":function($event){_vm.upload($event);}},slot:"after"}):_vm._e(),_vm._v(" "),(_vm.hasExpandedContent)?_c('q-icon',{staticClass:"q-if-control generic_transition",class:{'rotate-180': _vm.expanded},attrs:{"slot":"after","name":_vm.$q.icon.uploader.expand},nativeOn:{"click":function($event){_vm.expanded = !_vm.expanded;}},slot:"after"}):_vm._e()],1),_vm._v(" "),_c('q-slide-transition',[_c('div',{directives:[{name:"show",rawName:"v-show",value:(_vm.expanded),expression:"expanded"}]},[_c('div',{staticClass:"q-uploader-files scroll",style:(_vm.filesStyle)},_vm._l((_vm.files),function(file){return _c('q-item',{key:file.name,staticClass:"q-uploader-file"},[(!_vm.hideUploadProgress)?_c('q-progress',{staticClass:"q-uploader-progress-bg absolute-full",attrs:{"color":file.__failed ? 'negative' : 'grey',"percentage":file.__progress}}):_vm._e(),_vm._v(" "),(!_vm.hideUploadProgress)?_c('div',{staticClass:"q-uploader-progress-text absolute"},[_vm._v(" "+_vm._s(file.__progress)+"% ")]):_vm._e(),_vm._v(" "),(file.__img)?_c('q-item-side',{attrs:{"image":file.__img.src}}):_c('q-item-side',{attrs:{"icon":_vm.$q.icon.uploader.file,"color":_vm.color}}),_vm._v(" "),_c('q-item-main',{attrs:{"label":file.name,"sublabel":file.__size}}),_vm._v(" "),_c('q-item-side',{attrs:{"right":""}},[_c('q-item-tile',{staticClass:"cursor-pointer",attrs:{"icon":_vm.$q.icon.uploader[file.__doneUploading ? 'done' : 'clear'],"color":_vm.color},nativeOn:{"click":function($event){_vm.__remove(file);}}})],1)],1)}))])]),_vm._v(" "),(_vm.dnd)?_c('div',{staticClass:"q-uploader-dnd flex row items-center justify-center absolute-full",class:_vm.dndClass,on:{"dragenter":function($event){$event.preventDefault();$event.stopPropagation();},"dragover":function($event){$event.preventDefault();$event.stopPropagation();},"dragleave":function($event){$event.preventDefault();$event.stopPropagation();_vm.__onDragLeave($event);},"drop":function($event){$event.preventDefault();$event.stopPropagation();_vm.__onDrop($event);}}}):_vm._e()],1)},staticRenderFns: [],
  name: 'q-uploader',
  mixins: [FrameMixin],
  components: {
    QInputFrame: QInputFrame,
    QSpinner: QSpinner,
    QIcon: QIcon,
    QProgress: QProgress,
    QItem: QItem,
    QItemSide: QItemSide,
    QItemMain: QItemMain,
    QItemTile: QItemTile,
    QSlideTransition: QSlideTransition
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
    urlFactory: {
      type: Function,
      required: false
    },
    additionalFields: {
      type: Array,
      default: function () { return []; }
    },
    method: {
      type: String,
      default: 'POST'
    },
    extensions: String,
    multiple: Boolean,
    hideUploadButton: Boolean,
    hideUploadProgress: Boolean,
    noThumbnails: Boolean,
    autoExpand: Boolean,
    expandStyle: [Array, String, Object],
    expandClass: [Array, String, Object],
    sendRaw: {
      type: Boolean,
      default: false
    }
  },
  data: function data () {
    return {
      queue: [],
      files: [],
      uploading: false,
      uploadedSize: 0,
      totalSize: 0,
      xhrs: [],
      focused: false,
      dnd: false,
      expanded: false
    }
  },
  computed: {
    queueLength: function queueLength () {
      return this.queue.length
    },
    hasExpandedContent: function hasExpandedContent () {
      return this.files.length > 0
    },
    label: function label () {
      var total = humanStorageSize(this.totalSize);
      return this.uploading
        ? (((this.progress).toFixed(2)) + "% (" + (humanStorageSize(this.uploadedSize)) + " / " + total + ")")
        : ((this.queueLength) + " (" + total + ")")
    },
    progress: function progress () {
      return this.totalSize ? Math.min(99.99, this.uploadedSize / this.totalSize * 100) : 0
    },
    addDisabled: function addDisabled () {
      return !this.multiple && this.queueLength >= 1
    },
    filesStyle: function filesStyle () {
      if (this.maxHeight) {
        return { maxHeight: this.maxHeight }
      }
    },
    dndClass: function dndClass () {
      var cls = [("text-" + (this.color))];
      if (this.inverted) {
        cls.push('inverted');
      }
      return cls
    }
  },
  watch: {
    hasExpandedContent: function hasExpandedContent (v) {
      if (v === false) {
        this.expanded = false;
      }
      else if (this.autoExpand) {
        this.expanded = true;
      }
    }
  },
  methods: {
    __onDragOver: function __onDragOver () {
      this.dnd = true;
    },
    __onDragLeave: function __onDragLeave () {
      this.dnd = false;
    },
    __onDrop: function __onDrop (e) {
      this.dnd = false;

      var
        files = e.dataTransfer.files,
        count = files.length;

      if (count > 0) {
        this.__add(null, this.multiple ? files : [ files[0] ]);
      }
    },
    __add: function __add (e, files) {
      var this$1 = this;

      if (this.addDisabled) {
        return
      }

      files = Array.prototype.slice.call(files || e.target.files);
      this.$refs.file.value = '';

      files = files.filter(function (file) { return !this$1.queue.some(function (f) { return file.name === f.name; }); })
        .map(function (file) {
          initFile(file);
          file.__size = humanStorageSize(file.size);

          if (this$1.noThumbnails || !file.type.startsWith('image')) {
            this$1.queue.push(file);
          }
          else {
            var reader = new FileReader();
            reader.onload = function (e) {
              var img = new Image();
              img.src = e.target.result;
              file.__img = img;
              this$1.queue.push(file);
              this$1.__computeTotalSize();
            };
            reader.readAsDataURL(file);
          }

          return file
        });

      if (files.length > 0) {
        this.files = this.files.concat(files);
        this.$emit('add', files);
        this.__computeTotalSize();
      }
    },
    __computeTotalSize: function __computeTotalSize () {
      this.totalSize = this.queueLength
        ? this.queue.map(function (f) { return f.size; }).reduce(function (total, size) { return total + size; })
        : 0;
    },
    __remove: function __remove (file) {
      var
        name = file.name,
        done = file.__doneUploading;

      if (this.uploading && !done) {
        this.$emit('remove:abort', file, file.xhr);
        file.xhr.abort();
        this.uploadedSize -= file.__uploaded;
      }
      else {
        this.$emit(("remove:" + (done ? 'done' : 'cancel')), file, file.xhr);
      }

      if (!done) {
        this.queue = this.queue.filter(function (obj) { return obj.name !== name; });
      }

      file.__removed = true;
      this.files = this.files.filter(function (obj) { return obj.name !== name; });
      this.__computeTotalSize();
    },
    __removeUploaded: function __removeUploaded () {
      this.files = this.files.filter(function (f) { return !f.__doneUploading; });
      this.__computeTotalSize();
    },
    __pick: function __pick () {
      if (!this.addDisabled && this.$q.platform.is.mozilla) {
        this.$refs.file.click();
      }
    },
    __getUploadPromise: function __getUploadPromise (file) {
      var this$1 = this;

      var
        form = new FormData(),
        xhr = new XMLHttpRequest();

      try {
        this.additionalFields.forEach(function (field) {
          form.append(field.name, field.value);
        });
        form.append('Content-Type', file.type || 'application/octet-stream');
        form.append(this.name, file);
      }
      catch (e) {
        return
      }

      initFile(file);
      file.xhr = xhr;
      return new Promise(function (resolve, reject) {
        xhr.upload.addEventListener('progress', function (e) {
          if (file.__removed) { return }
          e.percent = e.total ? e.loaded / e.total : 0;
          var uploaded = e.percent * file.size;
          this$1.uploadedSize += uploaded - file.__uploaded;
          file.__uploaded = uploaded;
          file.__progress = Math.min(99, parseInt(e.percent * 100, 10));
        }, false);

        xhr.onreadystatechange = function () {
          if (xhr.readyState < 4) {
            return
          }
          if (xhr.status && xhr.status < 400) {
            file.__doneUploading = true;
            file.__progress = 100;
            this$1.$emit('uploaded', file, xhr);
            resolve(file);
          }
          else {
            file.__failed = true;
            this$1.$emit('fail', file, xhr);
            reject(xhr);
          }
        };

        xhr.onerror = function () {
          file.__failed = true;
          this$1.$emit('fail', file, xhr);
          reject(xhr);
        };

        var resolver = this$1.urlFactory
          ? this$1.urlFactory(file)
          : Promise.resolve(this$1.url);

        resolver.then(function (url) {
          xhr.open(this$1.method, url, true);
          if (this$1.headers) {
            Object.keys(this$1.headers).forEach(function (key) {
              xhr.setRequestHeader(key, this$1.headers[key]);
            });
          }

          this$1.xhrs.push(xhr);
          if (this$1.sendRaw) {
            xhr.send(file);
          }
          else {
            xhr.send(form);
          }
        });
      })
    },
    pick: function pick () {
      if (!this.addDisabled) {
        this.$refs.file.click();
      }
    },
    upload: function upload () {
      var this$1 = this;

      var length = this.queueLength;
      if (this.disable || length === 0) {
        return
      }

      var filesDone = 0;
      this.uploadedSize = 0;
      this.uploading = true;
      this.xhrs = [];
      this.$emit('start');

      var solved = function () {
        filesDone++;
        if (filesDone === length) {
          this$1.uploading = false;
          this$1.xhrs = [];
          this$1.queue = this$1.queue.filter(function (f) { return !f.__doneUploading; });
          this$1.__computeTotalSize();
          this$1.$emit('finish');
        }
      };

      this.queue
        .map(function (file) { return this$1.__getUploadPromise(file); })
        .forEach(function (promise) {
          promise.then(solved).catch(solved);
        });
    },
    abort: function abort () {
      this.xhrs.forEach(function (xhr) { xhr.abort(); });
    },
    reset: function reset () {
      this.abort();
      this.files = [];
      this.queue = [];
      this.expanded = false;
      this.__computeTotalSize();
      this.$emit('reset');
    }
  }
}

var QVideo = {
  name: 'q-video',
  props: {
    src: {
      type: String,
      required: true
    }
  },
  computed: {
    iframeData: function iframeData () {
      return {
        attrs: {
          src: this.src,
          frameborder: '0',
          allowfullscreen: true
        }
      }
    }
  },
  render: function render (h) {
    return h('div', {
      staticClass: 'q-video'
    }, [
      h('iframe', this.iframeData)
    ])
  }
}



var components = Object.freeze({
	QApp: QApp,
	QActionSheet: QActionSheet,
	QAjaxBar: QAjaxBar,
	QAlert: QAlert,
	QAutocomplete: QAutocomplete,
	QBreadcrumbs: QBreadcrumbs,
	QBreadcrumbEl: QBreadcrumbEl,
	QBtn: QBtn,
	QBtnGroup: QBtnGroup,
	QBtnToggle: QBtnToggle,
	QBtnDropdown: QBtnDropdown,
	QBtnToggleGroup: QBtnToggleGroup,
	QCard: QCard,
	QCardTitle: QCardTitle,
	QCardMain: QCardMain,
	QCardActions: QCardActions,
	QCardMedia: QCardMedia,
	QCardSeparator: QCardSeparator,
	QCarousel: QCarousel,
	QCarouselSlide: QCarouselSlide,
	QCarouselControl: QCarouselControl,
	QChatMessage: QChatMessage,
	QCheckbox: QCheckbox,
	QChip: QChip,
	QChipsInput: QChipsInput,
	QCollapsible: QCollapsible,
	QColor: QColor,
	QColorPicker: QColorPicker,
	QContextMenu: QContextMenu,
	QDatetime: QDatetime,
	QDatetimePicker: QDatetimePicker,
	QDialog: QDialog,
	QEditor: QEditor,
	QFab: QFab,
	QFabAction: QFabAction,
	QField: QField,
	QFieldReset: QFieldReset,
	QIcon: QIcon,
	QInfiniteScroll: QInfiniteScroll,
	QInnerLoading: QInnerLoading,
	QInput: QInput,
	QInputFrame: QInputFrame,
	QKnob: QKnob,
	QLayout: QLayout,
	QLayoutDrawer: QLayoutDrawer,
	QLayoutFooter: QLayoutFooter,
	QLayoutHeader: QLayoutHeader,
	QPage: QPage,
	QPageContainer: QPageContainer,
	QPageSticky: QPageSticky,
	QItem: QItem,
	QItemSeparator: QItemSeparator,
	QItemMain: QItemMain,
	QItemSide: QItemSide,
	QItemTile: QItemTile,
	QItemWrapper: QItemWrapper,
	QList: QList,
	QListHeader: QListHeader,
	QModal: QModal,
	QModalLayout: QModalLayout,
	QResizeObservable: QResizeObservable,
	QScrollObservable: QScrollObservable,
	QWindowResizeObservable: QWindowResizeObservable,
	QOptionGroup: QOptionGroup,
	QPagination: QPagination,
	QParallax: QParallax,
	QPopover: QPopover,
	QProgress: QProgress,
	QPullToRefresh: QPullToRefresh,
	QRadio: QRadio,
	QRange: QRange,
	QRating: QRating,
	QScrollArea: QScrollArea,
	QSearch: QSearch,
	QSelect: QSelect,
	QDialogSelect: QDialogSelect,
	QSlideTransition: QSlideTransition,
	QSlider: QSlider,
	QSpinner: QSpinner,
	QSpinnerAudio: audio,
	QSpinnerBall: ball,
	QSpinnerBars: bars,
	QSpinnerCircles: circles,
	QSpinnerComment: comment,
	QSpinnerCube: cube,
	QSpinnerDots: dots,
	QSpinnerFacebook: facebook,
	QSpinnerGears: gears,
	QSpinnerGrid: grid,
	QSpinnerHearts: hearts,
	QSpinnerHourglass: hourglass,
	QSpinnerInfinity: infinity,
	QSpinnerIos: DefaultSpinner,
	QSpinnerMat: QSpinner_mat,
	QSpinnerOval: oval,
	QSpinnerPie: pie,
	QSpinnerPuff: puff,
	QSpinnerRadio: radio,
	QSpinnerRings: rings,
	QSpinnerTail: tail,
	QStep: QStep,
	QStepper: QStepper,
	QStepperNavigation: QStepperNavigation,
	QRouteTab: QRouteTab,
	QTab: QTab,
	QTabPane: QTabPane,
	QTabs: QTabs,
	QTable: QTable,
	QTh: QTh,
	QTr: QTr,
	QTd: QTd,
	QTableColumns: QTableColumns,
	QTimeline: QTimeline,
	QTimelineEntry: QTimelineEntry,
	QToggle: QToggle,
	QToolbar: QToolbar,
	QToolbarTitle: QToolbarTitle,
	QTooltip: QTooltip,
	QTree: QTree,
	QUploader: QUploader,
	QVideo: QVideo
});

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
}

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
}

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
}

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
}

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
}

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
}



var directives$1 = Object.freeze({
	BackToTop: backToTop,
	GoBack: goBack,
	Move: move,
	Ripple: Ripple,
	ScrollFire: scrollFire,
	Scroll: scroll$1,
	TouchHold: touchHold,
	TouchPan: TouchPan,
	TouchSwipe: TouchSwipe
});

function modalFn (Component, Vue) {
  return function (props) {
    var node = document.createElement('div');
    document.body.appendChild(node);

    return new Promise(function (resolve, reject) {
      var vm = new Vue({
        el: node,
        data: function data () {
          return { props: props }
        },
        render: function (h) { return h(Component, {
          props: props,
          ref: 'modal',
          on: {
            ok: function (data) {
              resolve(data);
              vm.$destroy();
            },
            cancel: function () {
              reject(new Error());
              vm.$destroy();
            }
          }
        }); },
        mounted: function mounted () {
          this.$refs.modal.show();
        }
      });
    })
  }
}

var actionSheet = {
  __installed: false,
  install: function install (ref) {
    var $q = ref.$q;
    var Vue = ref.Vue;

    if (this.__installed) { return }
    this.__installed = true;

    $q.actionSheet = modalFn(QActionSheet, Vue);
  }
}

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
}

var appFullscreen = {
  isCapable: null,
  isActive: null,
  __prefixes: {},

  request: function request (target) {
    if ( target === void 0 ) target = document.documentElement;

    if (this.isCapable && !this.isActive) {
      target[this.__prefixes.request]();
    }
  },
  exit: function exit () {
    if (this.isCapable && this.isActive) {
      document[this.__prefixes.exit]();
    }
  },
  toggle: function toggle (target) {
    if (this.isActive) {
      this.exit();
    }
    else {
      this.request(target);
    }
  },

  __installed: false,
  install: function install (ref) {
    var this$1 = this;
    var $q = ref.$q;
    var Vue = ref.Vue;

    if (this.__installed) { return }
    this.__installed = true;

    var request = [
      'requestFullscreen',
      'msRequestFullscreen', 'mozRequestFullScreen', 'webkitRequestFullscreen'
    ].find(function (request) { return document.documentElement[request]; });

    this.isCapable = request !== undefined;
    if (!this.isCapable) {
      // it means the browser does NOT support it
      return
    }

    var exit = [
      'exitFullscreen',
      'msExitFullscreen', 'mozCancelFullScreen', 'webkitExitFullscreen'
    ].find(function (exit) { return document[exit]; });

    this.__prefixes = {
      request: request,
      exit: exit
    };

    this.isActive = (document.fullscreenElement ||
      document.mozFullScreenElement ||
      document.webkitFullscreenElement ||
      document.msFullscreenElement) !== undefined

    ;[
      'onfullscreenchange',
      'MSFullscreenChange', 'onmozfullscreenchange', 'onwebkitfullscreenchange'
    ].forEach(function (evt) {
      document[evt] = function () {
        this$1.isActive = !this$1.isActive;
      };
    });

    Vue.util.defineReactive({}, 'isActive', this);
    $q.fullscreen = this;
  }
}

var appVisibility = {
  isVisible: null,

  __installed: false,
  install: function install (ref) {
    var this$1 = this;
    var $q = ref.$q;
    var Vue = ref.Vue;

    if (this.__installed) { return }
    this.__installed = true;

    var prop, evt;

    if (typeof document.hidden !== 'undefined') { // Opera 12.10 and Firefox 18 and later support
      prop = 'hidden';
      evt = 'visibilitychange';
    }
    else if (typeof document.msHidden !== 'undefined') {
      prop = 'msHidden';
      evt = 'msvisibilitychange';
    }
    else if (typeof document.webkitHidden !== 'undefined') {
      prop = 'webkitHidden';
      evt = 'webkitvisibilitychange';
    }

    var update = function () {
      this$1.isVisible = $q.appVisible = !document[prop];
    };

    update();

    if (evt && typeof document[prop] !== 'undefined') {
      Vue.util.defineReactive({}, 'appVisible', $q);
      document.addEventListener(evt, update, false);
    }
  }
}

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

function remove$1$1 (key, options) {
  set$1(key, '', extend$1(true, {}, options, {
    expires: -1
  }));
}

function has$1 (key) {
  return get(key) !== undefined
}

var cookies = {
  get: get,
  set: set$1,
  has: has$1,
  remove: remove$1$1,
  all: function () { return get(); },

  __installed: false,
  install: function install (ref) {
    var $q = ref.$q;

    if (this.__installed) { return }
    this.__installed = true;

    $q.cookies = this;
  }
}

var dialog = {
  __installed: false,
  install: function install (ref) {
    var $q = ref.$q;
    var Vue = ref.Vue;

    if (this.__installed) { return }
    this.__installed = true;

    $q.dialog = modalFn(QDialog, Vue);
  }
}

var vm;
var timeout;
var props$1 = {};

var staticClass = 'q-loading animate-fade fullscreen column flex-center z-max';

var Loading = {
  isActive: false,

  show: function show (ref) {
    var this$1 = this;
    if ( ref === void 0 ) ref = {};
    var delay = ref.delay; if ( delay === void 0 ) delay = 500;
    var message = ref.message; if ( message === void 0 ) message = false;
    var spinnerSize = ref.spinnerSize; if ( spinnerSize === void 0 ) spinnerSize = 80;
    var spinnerColor = ref.spinnerColor; if ( spinnerColor === void 0 ) spinnerColor = 'white';
    var messageColor = ref.messageColor; if ( messageColor === void 0 ) messageColor = 'white';
    var spinner = ref.spinner; if ( spinner === void 0 ) spinner = QSpinner;
    var customClass = ref.customClass; if ( customClass === void 0 ) customClass = false;

    props$1.spinner = spinner;
    props$1.message = message;
    props$1.spinnerSize = spinnerSize;
    props$1.spinnerColor = spinnerColor;
    props$1.messageColor = messageColor;

    if (customClass && typeof customClass === 'string') {
      props$1.customClass = customClass.trim();
    }

    if (this.isActive) {
      vm && vm.$forceUpdate();
      return
    }

    timeout = setTimeout(function () {
      timeout = null;

      var node = document.createElement('div');
      document.body.appendChild(node);
      document.body.classList.add('with-loading');

      vm = new this$1.__Vue({
        name: 'q-loading',
        el: node,
        render: function render (h) {
          return h('div', {
            staticClass: staticClass,
            'class': props$1.customClass
          }, [
            h(props$1.spinner, {
              props: {
                color: props$1.spinnerColor,
                size: props$1.spinnerSize
              }
            }),
            message
              ? h('div', {
                'class': ("text-" + (props$1.messageColor)),
                domProps: {
                  innerHTML: props$1.message
                }
              })
              : null
          ])
        }
      });
    }, delay);

    this.isActive = true;
  },
  hide: function hide () {
    if (!this.isActive) {
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

    this.isActive = false;
  },

  __Vue: null,
  __installed: false,
  install: function install (ref) {
    var $q = ref.$q;
    var Vue = ref.Vue;

    if (this.__installed) { return }
    this.__installed = true;

    $q.loading = Loading;
    this.__Vue = Vue;
  }
};

var positionList = [
  'top-left', 'top-right',
  'bottom-left', 'bottom-right',
  'top', 'bottom', 'left', 'right', 'center'
];

var notify = {
  create: function create (opts) {
    return this.__vm.add(opts)
  },

  __installed: false,
  install: function install (ref) {
    var $q = ref.$q;
    var Vue = ref.Vue;

    if (this.__installed) { return }
    this.__installed = true;

    var node = document.createElement('div');
    document.body.appendChild(node);

    this.__vm = new Vue({
      name: 'q-notifications',
      data: {
        notifs: {
          center: [],
          left: [],
          right: [],
          top: [],
          'top-left': [],
          'top-right': [],
          bottom: [],
          'bottom-left': [],
          'bottom-right': []
        }
      },
      methods: {
        add: function add (config) {
          var this$1 = this;

          if (!config) {
            console.error('Notify: parameter required');
            return false
          }
          var notif;
          if (typeof config === 'string') {
            notif = {
              message: config,
              position: 'bottom'
            };
          }
          else {
            notif = clone(config);
          }

          if (notif.position) {
            if (!positionList.includes(notif.position)) {
              console.error(("Notify: wrong position: " + (notif.position)));
              return false
            }
          }
          else {
            notif.position = 'bottom';
          }

          notif.__uid = uid$1$1();

          if (notif.timeout === void 0) {
            notif.timeout = 5000;
          }

          var close = function () {
            this$1.remove(notif);
          };

          if (notif.actions) {
            notif.actions = config.actions.map(function (item) {
              var
                handler = item.handler,
                action = clone(item);
              action.handler = typeof handler === 'function'
                ? function () {
                  handler();
                  close();
                }
                : function () { return close(); };
              return action
            });
          }

          if (notif.closeBtn) {
            var btn = [{
              closeBtn: true,
              label: notif.closeBtn,
              handler: close
            }];
            notif.actions = notif.actions
              ? notif.actions.concat(btn)
              : btn;
          }

          if (notif.timeout) {
            notif.__timeout = setTimeout(function () {
              close();
            }, notif.timeout + /* show duration */ 1000);
          }

          var action = notif.position.indexOf('top') > -1 ? 'unshift' : 'push';
          this.notifs[notif.position][action](notif);

          return close
        },
        remove: function remove (notif) {
          if (notif.__timeout) { clearTimeout(notif.__timeout); }

          var index = this.notifs[notif.position].indexOf(notif);
          if (index !== -1) {
            var ref = this.$refs[("notif_" + (notif.__uid))];
            if (ref && ref.$el) {
              var el = ref.$el;
              el.style.left = (el.offsetLeft) + "px";
              el.style.width = getComputedStyle(el).width;
            }
            this.notifs[notif.position].splice(index, 1);
            if (typeof notif.onDismiss === 'function') {
              notif.onDismiss();
            }
          }
        }
      },
      render: function render (h) {
        var this$1 = this;

        return h('div', { staticClass: 'q-notifications' }, positionList.map(function (pos) {
          var
            vert = ['left', 'center', 'right'].includes(pos) ? 'center' : (pos.indexOf('top') > -1 ? 'top' : 'bottom'),
            align = pos.indexOf('left') > -1 ? 'start' : (pos.indexOf('right') > -1 ? 'end' : 'center'),
            classes = ['left', 'right'].includes(pos) ? ("items-" + (pos === 'left' ? 'start' : 'end') + " justify-center") : (pos === 'center' ? 'flex-center' : ("items-" + align));

          return h('transition-group', {
            key: pos,
            staticClass: ("q-notification-list q-notification-list-" + vert + " fixed column " + classes),
            tag: 'div',
            props: {
              name: ("q-notification-" + pos),
              mode: 'out-in'
            }
          }, this$1.notifs[pos].map(function (notif) {
            return h(QAlert, {
              ref: ("notif_" + (notif.__uid)),
              key: notif.__uid,
              staticClass: 'q-notification',
              props: notif
            }, [ notif.message ])
          }))
        }))
      }
    });

    this.__vm.$mount(node);
    $q.notify = this.create.bind(this);
  }
}

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
  if (length < 9) {
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

function getEmptyStorage () {
  var fn = function () { return null; };

  return {
    has: fn,
    get: {
      length: fn,
      item: fn,
      index: fn,
      all: fn
    },
    set: fn,
    remove: fn,
    clear: fn,
    isEmpty: fn
  }
}

function getStorage (type) {
  var
    webStorage = window[type + 'Storage'],
    get = function (key) {
      var item = webStorage.getItem(key);
      return item
        ? decode$1(item)
        : null
    };

  return {
    has: function (key) { return webStorage.getItem(key) !== null; },
    get: {
      length: function () { return webStorage.length; },
      item: get,
      index: function (index) {
        if (index < webStorage.length) {
          return get(webStorage.key(index))
        }
      },
      all: function () {
        var result = {}, key, len = webStorage.length;

        for (var i = 0; i < len; i++) {
          key = webStorage.key(i);
          result[key] = get(key);
        }

        return result
      }
    },
    set: function (key, value) { webStorage.setItem(key, encode$1(value)); },
    remove: function (key) { webStorage.removeItem(key); },
    clear: function () { webStorage.clear(); },
    isEmpty: function () { return webStorage.length === 0; }
  }
}

var LocalStorage = {
  __installed: false,
  install: function install (ref) {
    var $q = ref.$q;

    if (this.__installed) { return }
    this.__installed = true;

    if ($q.platform.has.webStorage) {
      var storage = getStorage('local');
      $q.localStorage = storage;
      extend$1(true, this, storage);
    }
    else {
      $q.localStorage = getEmptyStorage();
    }
  }
};

var SessionStorage = {
  __installed: false,
  install: function install (ref) {
    var $q = ref.$q;

    if (this.__installed) { return }
    this.__installed = true;

    if ($q.platform.has.webStorage) {
      var storage = getStorage('session');
      $q.sessionStorage = storage;
      extend$1(true, this, storage);
    }
    else {
      $q.sessionStorage = getEmptyStorage();
    }
  }
};



var plugins = Object.freeze({
	ActionSheet: actionSheet,
	AddressbarColor: addressbarColor,
	AppFullscreen: appFullscreen,
	AppVisibility: appVisibility,
	Cookies: cookies,
	Dialog: dialog,
	Loading: Loading,
	Notify: notify,
	Platform: Platform,
	LocalStorage: LocalStorage,
	SessionStorage: SessionStorage
});

function openUrl (url, reject) {
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
}

function noop$1 () {}




var utils = Object.freeze({
	animate: animate,
	clone: clone,
	colors: colors,
	date: date,
	debounce: debounce,
	frameDebounce: frameDebounce,
	dom: dom,
	easing: easing,
	event: event,
	extend: extend$1,
	filter: filter,
	format: format,
	noop: noop$1,
	openURL: openUrl,
	scroll: scroll,
	throttle: throttle,
	uid: uid$1$1
});

Vue$3.use({ install: install }, {
  components: components,
  directives: directives$1,
  plugins: plugins
});

var index_umd = {
  version: version,
  theme: "ios",

  i18n: i18n,
  icons: icons,
  components: components,
  directives: directives$1,
  utils: utils
}

return index_umd;

})));
