/*!
 * Quasar Framework v0.17.0-beta.12
 * (c) 2016-present Razvan Stoenescu
 * Released under the MIT License.
 */
function objectOrFunction(e){var t=typeof e;return null!==e&&("object"===t||"function"===t)}function isFunction(e){return"function"==typeof e}"undefined"!=typeof window&&function(e){try{return void new t("test")}catch(e){}var t=function(t,r){r=r||{};var n=document.createEvent("MouseEvent");return n.initMouseEvent(t,r.bubbles||!1,r.cancelable||!1,r.view||e,r.detail||0,r.screenX||0,r.screenY||0,r.clientX||0,r.clientY||0,r.ctrlKey||!1,r.altKey||!1,r.shiftKey||!1,r.metaKey||!1,r.button||0,r.relatedTarget||null),n};t.prototype=Event.prototype,e.MouseEvent=t}(window),Array.prototype.findIndex||Object.defineProperty(Array.prototype,"findIndex",{value:function(e){if(null==this)throw new TypeError("Array.prototype.findIndex called on null or undefined");if("function"!=typeof e)throw new TypeError("predicate must be a function");for(var t=Object(this),r=t.length>>>0,n=arguments[1],o=0;o<r;o++)if(e.call(n,t[o],o,t))return o;return-1}});var _isArray=void 0,isArray=_isArray=Array.isArray?Array.isArray:function(e){return"[object Array]"===Object.prototype.toString.call(e)},len=0,vertxNext=void 0,customSchedulerFn=void 0,asap=function(e,t){queue[len]=e,queue[len+1]=t,2===(len+=2)&&(customSchedulerFn?customSchedulerFn(flush):scheduleFlush())};function setScheduler(e){customSchedulerFn=e}function setAsap(e){asap=e}var browserWindow="undefined"!=typeof window?window:void 0,browserGlobal=browserWindow||{},BrowserMutationObserver=browserGlobal.MutationObserver||browserGlobal.WebKitMutationObserver,isNode="undefined"==typeof self&&"undefined"!=typeof process&&"[object process]"==={}.toString.call(process),isWorker="undefined"!=typeof Uint8ClampedArray&&"undefined"!=typeof importScripts&&"undefined"!=typeof MessageChannel;function useNextTick(){return function(){return process.nextTick(flush)}}function useVertxTimer(){return void 0!==vertxNext?function(){vertxNext(flush)}:useSetTimeout()}function useMutationObserver(){var e=0,t=new BrowserMutationObserver(flush),r=document.createTextNode("");return t.observe(r,{characterData:!0}),function(){r.data=e=++e%2}}function useMessageChannel(){var e=new MessageChannel;return e.port1.onmessage=flush,function(){return e.port2.postMessage(0)}}function useSetTimeout(){var e=setTimeout;return function(){return e(flush,1)}}var queue=new Array(1e3);function flush(){for(var e=0;e<len;e+=2){(0,queue[e])(queue[e+1]),queue[e]=void 0,queue[e+1]=void 0}len=0}function attemptVertx(){try{var e=Function("return this")().require("vertx");return vertxNext=e.runOnLoop||e.runOnContext,useVertxTimer()}catch(e){return useSetTimeout()}}var scheduleFlush=void 0;function then(e,t){var r=this,n=new this.constructor(noop);void 0===n[PROMISE_ID]&&makePromise(n);var o=r._state;if(o){var i=arguments[o-1];asap(function(){return invokeCallback(o,n,i,r._result)})}else subscribe(r,n,e,t);return n}function resolve$1(e){if(e&&"object"==typeof e&&e.constructor===this)return e;var t=new this(noop);return resolve(t,e),t}scheduleFlush=isNode?useNextTick():BrowserMutationObserver?useMutationObserver():isWorker?useMessageChannel():void 0===browserWindow&&"function"==typeof require?attemptVertx():useSetTimeout();var PROMISE_ID=Math.random().toString(36).substring(2);function noop(){}var PENDING=void 0,FULFILLED=1,REJECTED=2,TRY_CATCH_ERROR={error:null};function selfFulfillment(){return new TypeError("You cannot resolve a promise with itself")}function cannotReturnOwn(){return new TypeError("A promises callback cannot return that same promise.")}function getThen(e){try{return e.then}catch(e){return TRY_CATCH_ERROR.error=e,TRY_CATCH_ERROR}}function tryThen(e,t,r,n){try{e.call(t,r,n)}catch(e){return e}}function handleForeignThenable(e,t,r){asap(function(e){var n=!1,o=tryThen(r,t,function(r){n||(n=!0,t!==r?resolve(e,r):fulfill(e,r))},function(t){n||(n=!0,reject(e,t))},"Settle: "+(e._label||" unknown promise"));!n&&o&&(n=!0,reject(e,o))},e)}function handleOwnThenable(e,t){t._state===FULFILLED?fulfill(e,t._result):t._state===REJECTED?reject(e,t._result):subscribe(t,void 0,function(t){return resolve(e,t)},function(t){return reject(e,t)})}function handleMaybeThenable(e,t,r){t.constructor===e.constructor&&r===then&&t.constructor.resolve===resolve$1?handleOwnThenable(e,t):r===TRY_CATCH_ERROR?(reject(e,TRY_CATCH_ERROR.error),TRY_CATCH_ERROR.error=null):void 0===r?fulfill(e,t):isFunction(r)?handleForeignThenable(e,t,r):fulfill(e,t)}function resolve(e,t){e===t?reject(e,selfFulfillment()):objectOrFunction(t)?handleMaybeThenable(e,t,getThen(t)):fulfill(e,t)}function publishRejection(e){e._onerror&&e._onerror(e._result),publish(e)}function fulfill(e,t){e._state===PENDING&&(e._result=t,e._state=FULFILLED,0!==e._subscribers.length&&asap(publish,e))}function reject(e,t){e._state===PENDING&&(e._state=REJECTED,e._result=t,asap(publishRejection,e))}function subscribe(e,t,r,n){var o=e._subscribers,i=o.length;e._onerror=null,o[i]=t,o[i+FULFILLED]=r,o[i+REJECTED]=n,0===i&&e._state&&asap(publish,e)}function publish(e){var t=e._subscribers,r=e._state;if(0!==t.length){for(var n=void 0,o=void 0,i=e._result,s=0;s<t.length;s+=3)n=t[s],o=t[s+r],n?invokeCallback(r,n,o,i):o(i);e._subscribers.length=0}}function tryCatch(e,t){try{return e(t)}catch(e){return TRY_CATCH_ERROR.error=e,TRY_CATCH_ERROR}}function invokeCallback(e,t,r,n){var o=isFunction(r),i=void 0,s=void 0,u=void 0,l=void 0;if(o){if((i=tryCatch(r,n))===TRY_CATCH_ERROR?(l=!0,s=i.error,i.error=null):u=!0,t===i)return void reject(t,cannotReturnOwn())}else i=n,u=!0;t._state!==PENDING||(o&&u?resolve(t,i):l?reject(t,s):e===FULFILLED?fulfill(t,i):e===REJECTED&&reject(t,i))}function initializePromise(e,t){try{t(function(t){resolve(e,t)},function(t){reject(e,t)})}catch(t){reject(e,t)}}var id=0;function nextId(){return id++}function makePromise(e){e[PROMISE_ID]=id++,e._state=void 0,e._result=void 0,e._subscribers=[]}function validationError(){return new Error("Array Methods must be provided an Array")}var Enumerator=function(){function e(e,t){this._instanceConstructor=e,this.promise=new e(noop),this.promise[PROMISE_ID]||makePromise(this.promise),isArray(t)?(this.length=t.length,this._remaining=t.length,this._result=new Array(this.length),0===this.length?fulfill(this.promise,this._result):(this.length=this.length||0,this._enumerate(t),0===this._remaining&&fulfill(this.promise,this._result))):reject(this.promise,validationError())}return e.prototype._enumerate=function(e){for(var t=0;this._state===PENDING&&t<e.length;t++)this._eachEntry(e[t],t)},e.prototype._eachEntry=function(e,t){var r=this._instanceConstructor,n=r.resolve;if(n===resolve$1){var o=getThen(e);if(o===then&&e._state!==PENDING)this._settledAt(e._state,t,e._result);else if("function"!=typeof o)this._remaining--,this._result[t]=e;else if(r===Promise$2){var i=new r(noop);handleMaybeThenable(i,e,o),this._willSettleAt(i,t)}else this._willSettleAt(new r(function(t){return t(e)}),t)}else this._willSettleAt(n(e),t)},e.prototype._settledAt=function(e,t,r){var n=this.promise;n._state===PENDING&&(this._remaining--,e===REJECTED?reject(n,r):this._result[t]=r),0===this._remaining&&fulfill(n,this._result)},e.prototype._willSettleAt=function(e,t){var r=this;subscribe(e,void 0,function(e){return r._settledAt(FULFILLED,t,e)},function(e){return r._settledAt(REJECTED,t,e)})},e}();function all(e){return new Enumerator(this,e).promise}function race(e){var t=this;return isArray(e)?new t(function(r,n){for(var o=e.length,i=0;i<o;i++)t.resolve(e[i]).then(r,n)}):new t(function(e,t){return t(new TypeError("You must pass an array to race."))})}function reject$1(e){var t=new this(noop);return reject(t,e),t}function needsResolver(){throw new TypeError("You must pass a resolver function as the first argument to the promise constructor")}function needsNew(){throw new TypeError("Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function.")}var Promise$2=function(){function e(t){this[PROMISE_ID]=nextId(),this._result=this._state=void 0,this._subscribers=[],noop!==t&&("function"!=typeof t&&needsResolver(),this instanceof e?initializePromise(this,t):needsNew())}return e.prototype.catch=function(e){return this.then(null,e)},e.prototype.finally=function(e){var t=this.constructor;return this.then(function(r){return t.resolve(e()).then(function(){return r})},function(r){return t.resolve(e()).then(function(){throw r})})},e}();function polyfill(){var e=void 0;if("undefined"!=typeof global)e=global;else if("undefined"!=typeof self)e=self;else try{e=Function("return this")()}catch(e){throw new Error("polyfill failed because global object is unavailable in this environment")}var t=e.Promise;if(t){var r=null;try{r=Object.prototype.toString.call(t.resolve())}catch(e){}if("[object Promise]"===r&&!t.cast)return}e.Promise=Promise$2}Promise$2.prototype.then=then,Promise$2.all=all,Promise$2.race=race,Promise$2.resolve=resolve$1,Promise$2.reject=reject$1,Promise$2._setScheduler=setScheduler,Promise$2._setAsap=setAsap,Promise$2._asap=asap,polyfill();