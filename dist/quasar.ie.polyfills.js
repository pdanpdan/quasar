/*!
 * Quasar Framework v0.15.0-alpha.3
 * (c) 2016-present Razvan Stoenescu
 * Released under the MIT License.
 */
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(factory());
}(this, (function () { 'use strict';

/*!
 * ES6-Promise-Shim v0.1.1
 * This module provides a lightweight implementation of Promise in pure ES5 code
 * for older browsers or older JavaScript engines.
 *
 * @license Copyright (c) 2017 Ariyan Khan, MIT License
 *
 * Codebase: https://github.com/ariyankhan/es6-promise-shim
 * Date: Jun 15, 2017
 */


(function (global, factory) {

    if (typeof module === "object" && typeof module.exports === "object") {
        // For the environment like NodeJS, CommonJS etc where module or
        // module.exports objects are available
        module.exports = factory(global);
    } else {
        // For browser context, where global object is window
        factory(global);
    }

    /* window is for browser environment and global is for NodeJS environment */
})(typeof window !== "undefined" ? window : global, function (global) {

    var defineProperty = Object.defineProperty;

    var defineProperties = Object.defineProperties;

    var slice = Array.prototype.slice;

    var isArray = Array.isArray;

    var floor = Math.floor;

    var abs = Math.abs;

    var ES6 = typeof global.ES6 === "object" ? global.ES6 : (global.ES6 = {});

    var max = Math.max;

    var isCallable = function (fn) {
        return typeof fn === 'function';
    };

    var isObject = function (value) {
        return value !== null && (typeof value === "object" || typeof value === "function");
    };

    // Now `false` for development purpose
    var isES6Running = function () {
        return false;
    };

    var postToMessageQueue = function (fn, thisArg) {
        if (!isCallable(fn))
            { throw new TypeError(fn + " is not a function"); }
        var args = slice.call(arguments, 2);
        setTimeout(function () {
            fn.apply(thisArg, args);
        });
    };

    var Promise = function Promise(executor) {
        if (!(this instanceof Promise) || isPromise(this))
            { throw new TypeError(String(this) + " is not a promise"); }
        if (!isCallable(executor))
            { throw new TypeError("Promise resolver " + String(executor) + " is not a function"); }
        setupPromiseInternals(this);
        try {
            executor((function (value) {
                this._resolve(value);
            }).bind(this), (function (reason) {
                this._reject(reason);
            }).bind(this));
        } catch (e) {
            this._reject(e);
        }
    };

    Promise.resolve = function resolve(value) {
        if (isPromise(value))
            { return value; }
        return new Promise(function (resolve, reject) {
            if (isThenable(value)) {
                postToMessageQueue(function () {
                    try {
                        value.then(resolve, reject);
                    } catch (e) {
                        reject(e);
                    }
                });
            }
            else
                { resolve(value); }
        });
    };

    Promise.reject = function reject(reason) {
        return new Promise(function (resoolve, reject) {
            reject(reason);
        });
    };

    // As the ES5 has no any iterable features, so this method's first
    // argument should be array or array-like object
    Promise.race = function race(promiseArray) {
        if (promiseArray === undefined || promiseArray === null)
            { return new Promise(function (resolve, reject) {
                postToMessageQueue(reject, undefined, TypeError("First argument of Promise.race can not be undefined or null"));
            }); }
        var length,
            isSettled = false;

        length = Number(promiseArray.length);
        length = length !== length ? 0 : length;
        length = (length < 0 ? -1 : 1) * floor(abs(length));
        length = max(length, 0);

        return new Promise(function (resolve, reject) {
            var fn,
                i = 0;
            fn = function (promise) {
                var temp1,
                    temp2;
                if (isPromise(promise)) {
                    if (isFulfilledPromise(promise)) {
                        if (!isSettled) {
                            isSettled = true;
                            postToMessageQueue(function () {
                                resolve(promise._value);
                            });
                        }
                    }
                    else if (isRejectedPromise(promise)) {
                        if (!isSettled) {
                            isSettled = true;
                            postToMessageQueue(function () {
                                reject(promise._reason);
                            });
                        }
                    } else if (isPendingPromise(promise)) {
                        temp1 = promise._resolve;
                        temp2 = promise._reject;
                        defineProperties(promise, {
                            _resolve: {
                                value: (function (value) {
                                    temp1(value);
                                    if (!isSettled) {
                                        isSettled = true;
                                        resolve(value);
                                    }
                                }).bind(promise)
                            },
                            _reject: {
                                value: (function (reason) {
                                    temp2(reason);
                                    if (!isSettled) {
                                        isSettled = true;
                                        reject(reason);
                                    }
                                }).bind(promise)
                            }
                        });
                    }
                } else if (isThenable(promise)) {
                    postToMessageQueue(function () {
                        try {
                            promise.then(function (value) {
                                if (!isSettled) {
                                    isSettled = true;
                                    resolve(value);
                                }
                            }, function (reason) {
                                if (!isSettled) {
                                    isSettled = true;
                                    reject(reason);
                                }
                            });
                        } catch (e) {
                            reject(e);
                        }
                    });
                } else {
                    if (!isSettled) {
                        isSettled = true;
                        postToMessageQueue(function () {
                            resolve(promise);
                        });
                    }
                }
            };
            for(; i < length; ++i) {
                fn(promiseArray[i]);
            }
        });
    };

    // As the ES5 has no any iterable features, so this method's first
    // argument should be array or array-like object
    Promise.all = function all(promiseArray) {
        if (promiseArray === undefined || promiseArray === null)
            { return new Promise(function (resolve, reject) {
                postToMessageQueue(reject, undefined, TypeError("First argument of Promise.all can not be undefined or null"));
            }); }
        var counter = 0,
            length,
            values;

        length = Number(promiseArray.length);
        length = length !== length ? 0 : length;
        length = (length < 0 ? -1 : 1) * floor(abs(length));
        length = max(length, 0);

        values = new Array(length);

        return new Promise(function (resolve, reject) {
            var fn,
                i = 0;
            if (length === 0)
                { resolve(values); }
            else {
                fn = function (promise, index) {
                    var temp1,
                        temp2;
                    if (isPromise(promise)) {
                        if (isFulfilledPromise(promise)) {
                            values[index] = promise._value;
                            counter++;
                            if (counter === length) {
                                postToMessageQueue(function () {
                                    resolve(values);
                                });
                            }
                        } else if(isRejectedPromise(promise)) {
                            postToMessageQueue(function () {
                                reject(promise._reason);
                            });
                        } else if(isPendingPromise(promise)) {
                            temp1 = promise._resolve;
                            temp2 = promise._reject;
                            defineProperties(promise, {
                                _resolve: {
                                    value: (function (value) {
                                        temp1(value);
                                        values[index] = value;
                                        counter++;
                                        if (counter === length) {
                                            resolve(values);
                                        }
                                    }).bind(promise)
                                },
                                _reject: {
                                    value: (function (reason) {
                                        temp2(reason);
                                        reject(reason);
                                    }).bind(promise)
                                }
                            });
                        }
                    } else if (isThenable(promise)) {
                        postToMessageQueue(function () {
                            try {
                                promise.then(function (value) {
                                    values[index] = value;
                                    counter++;
                                    if (counter === length) {
                                        resolve(values);
                                    }
                                }, function (reason) {
                                    // If the returned promise is already rejected, then it does nothing
                                    reject(reason);
                                });
                            } catch (e) {
                                reject(e);
                            }
                        });
                    } else {
                        values[index] = promise;
                        counter++;
                        if (counter === length) {
                            postToMessageQueue(function () {
                                resolve(values);
                            });
                        }
                    }
                };
                for(; i < length; ++i) {
                    fn(promiseArray[i], i);
                }
            }
        });
    };

    Promise.prototype.then = function then(onFulfilled, onRejected) {
        if (!isPromise(this))
            { throw new TypeError(this + " is not a promise"); }
        onFulfilled = !isCallable(onFulfilled) ? defaultPromiseOnFulfilled : onFulfilled;
        onRejected = !isCallable(onRejected) ? defaultPromiseOnRejected : onRejected;

        var chainedPromise = new Promise(function (resolve, reject) {}),
            nextOnFulfilled,
            nextOnRejected;

        nextOnFulfilled = function (value) {
            var result;
            try {
                result = onFulfilled(value);
                processPromiseResult(result, chainedPromise);
            } catch (e) {
                chainedPromise._reject(e);
            }
        };

        nextOnRejected = function (reason) {
            var result;
            try {
                result = onRejected(reason);
                processPromiseResult(result, chainedPromise);
            } catch (e) {
                chainedPromise._reject(e);
            }
        };

        if (isPendingPromise(this)) {
            this._onFulfilled.push(nextOnFulfilled);
            this._onRejected.push(nextOnRejected);
        } else if (isFulfilledPromise(this)) {
            postToMessageQueue(nextOnFulfilled, undefined, this._value);
        } else if (isRejectedPromise(this))
            { postToMessageQueue(nextOnRejected, undefined, this._reason); }
        return chainedPromise;
    };

    var processPromiseResult = function (result, chainedPromise) {
        var temp1,
            temp2;
        if (isPromise(result)) {
            if (isFulfilledPromise(result))
                { chainedPromise._resolve(result._value); }
            else if (isRejectedPromise(result))
                { chainedPromise._reject(result._reason); }
            else if (isPendingPromise(result)) {
                temp1 = result._resolve;
                temp2 = result._reject;
                defineProperties(result, {
                    _resolve: {
                        value: (function (value) {
                            temp1(value);
                            chainedPromise._resolve(value);
                        }).bind(result)
                    },
                    _reject: {
                        value: (function (reason) {
                            temp2(reason);
                            chainedPromise._reject(reason);
                        }).bind(result)
                    }
                });
            }
        } else if (isThenable(result)) {
            postToMessageQueue(function () {
                try {
                    result.then((function (value) {
                        this._resolve(value);
                    }).bind(chainedPromise), (function (reason) {
                        this._reject(reason);
                    }).bind(chainedPromise));
                } catch (e) {
                    chainedPromise._reject(e);
                }
            });
        } else
            { chainedPromise._resolve(result); }
    };

    Promise.prototype.catch = function (onRejected) {
        if (!isCallable(this["then"]))
            { throw new TypeError("(var).then is not a function"); }
        return this["then"](undefined, onRejected);
    };

    // Although this method is not standard i.e. is not a part of ES6,
    // but it is given for testing purpose
    Promise.prototype.toString = function () {
        if (!isPromise(this))
            { throw new TypeError(this + " is not a promise"); }
        switch (this._state) {
            case "pending":
                return "Promise { <pending> }";
            case "fulfilled":
                return "Promise { " + this._value + " }";
            case "rejected":
                return "Promise { <rejected> " + this._reason + " }";
        }
    };

    var isThenable = function (value) {
        return isObject(value) && isCallable(value.then);
    };

    var defaultPromiseOnFulfilled = function (value) {
        return Promise.resolve(value);
    };

    var defaultPromiseOnRejected = function (reason) {
        return Promise.reject(reason);
    };

    var promiseResolve = function (value) {
        // Just return if the promise is settled already
        if (isSettledPromise(this))
            { return; }
        defineProperties(this, {
            _state: {
                value: "fulfilled"
            },
            _value: {
                value: value
            }
        });
        if (this._onFulfilled.length > 0) {
            postToMessageQueue(function (value) {
                this._onFulfilled.forEach(function (callback) {
                    callback(value);
                });
                // Free the references of the callbacks, because
                // these are not needed anymore after calling first time _resolve() method
                this._onFulfilled.length = 0;
                this._onRejected.length = 0;
            }, this, value);
        }
    };

    var promiseReject = function (reason) {
        // Just return if the promise is settled already
        if (isSettledPromise(this))
            { return; }
        defineProperties(this, {
            _state: {
                value: "rejected"
            },
            _reason: {
                value: reason
            }
        });
        if (this._onRejected.length > 0) {
            postToMessageQueue(function (reason) {
                this._onRejected.forEach(function (callback) {
                    callback(reason);
                });
                // Free the references of the callbacks, because
                // these are not needed anymore after calling first time _reject() method
                this._onFulfilled.length = 0;
                this._onRejected.length = 0;
            }, this, reason);
        }
    };

    var setupPromiseInternals = function (promise) {
        defineProperties(promise, {
            _isPromise: {
                value: true
            },
            _onFulfilled: {
                value: []
            },
            _onRejected: {
                value: []
            },
            _resolve: {
                value: promiseResolve.bind(promise),
                configurable: true
            },
            _reject: {
                value: promiseReject.bind(promise),
                configurable: true
            },
            _state: {
                value: "pending",
                configurable: true
            },
            _value: {
                value: undefined,
                configurable: true
            },
            _reason: {
                value: undefined,
                configurable: true
            }
        });
    };

    var isPendingPromise = function (promise) {
        return promise._state === "pending";
    };

    var isFulfilledPromise = function (promise) {
        return promise._state === "fulfilled";
    };

    var isRejectedPromise = function (promise) {
        return promise._state === "rejected";
    };

    var isSettledPromise = function (promise) {
        return promise._state === "fulfilled" || promise._state === "rejected";
    };

    var isValidPromiseState = function (state) {
        return ["pending", "fulfilled", "rejected"].indexOf(String(state)) !== -1;
    };

    var checkPromiseInternals = function (promise) {
        return promise._isPromise === true
            && isArray(promise._onFulfilled)
            && isArray(promise._onRejected)
            && isCallable(promise._resolve)
            && isCallable(promise._reject)
            && isValidPromiseState(promise._state)
            && promise.hasOwnProperty("_value")
            && promise.hasOwnProperty("_reason")
    };

    var isPromise = function (promise) {
        return promise instanceof Promise && checkPromiseInternals(promise);
    };

    // export ES6 APIs and add all the patches to support Promise in ES5
    // If the running environment already supports ES6 then no patches will be applied,
    if (isES6Running())
        { return ES6; }
    else {
        defineProperties(ES6, {
            isPromise: {
                value: isPromise,
                writable: true,
                configurable: true
            }
        });

        defineProperty(global, "Promise", {
            value: Promise,
            writable: true,
            configurable: true
        });
    }

    return ES6;
});
















var Promise = Object.freeze({

});

/* eslint-disable no-extend-native */

if (window && !window.Promise) {
  window.Promise = Promise;
}

if (!Number.isInteger) {
  Number.isInteger = function (value) {
    return typeof value === 'number' &&
      isFinite(value) &&
      Math.floor(value) === value
  };
}

(function (arr) {
  arr.forEach(function (item) {
    if (item.hasOwnProperty('remove')) {
      return
    }
    Object.defineProperty(item, 'remove', {
      configurable: true,
      enumerable: true,
      writable: true,
      value: function remove () {
        return this.parentNode ? this.parentNode.removeChild(this) : this
      }
    });
  });
})([Element.prototype, CharacterData.prototype, DocumentType.prototype]);

if (!Array.prototype.findIndex) {
  Object.defineProperty(Array.prototype, 'findIndex', {
    value: function value (predicate) {
      if (this == null) {
        throw new TypeError('Array.prototype.findIndex called on null or undefined')
      }
      if (typeof predicate !== 'function') {
        throw new TypeError('predicate must be a function')
      }
      var list = Object(this);
      var length = list.length >>> 0;
      var thisArg = arguments[1];

      for (var i = 0; i < length; i++) {
        if (predicate.call(thisArg, list[i], i, list)) {
          return i
        }
      }
      return -1
    }
  });
}

})));
