function _mergeNamespaces(n2, m2) {
  for (var i = 0; i < m2.length; i++) {
    const e2 = m2[i];
    if (typeof e2 !== "string" && !Array.isArray(e2)) {
      for (const k2 in e2) {
        if (k2 !== "default" && !(k2 in n2)) {
          const d2 = Object.getOwnPropertyDescriptor(e2, k2);
          if (d2) {
            Object.defineProperty(n2, k2, d2.get ? d2 : {
              enumerable: true,
              get: () => e2[k2]
            });
          }
        }
      }
    }
  }
  return Object.freeze(Object.defineProperty(n2, Symbol.toStringTag, { value: "Module" }));
}
function getDefaultExportFromCjs(x2) {
  return x2 && x2.__esModule && Object.prototype.hasOwnProperty.call(x2, "default") ? x2["default"] : x2;
}
var jsxRuntime = { exports: {} };
var reactJsxRuntime_production_min = {};
var react = { exports: {} };
var react_production_min = {};
/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var l$4 = Symbol.for("react.element"), n$5 = Symbol.for("react.portal"), p$6 = Symbol.for("react.fragment"), q$5 = Symbol.for("react.strict_mode"), r$3 = Symbol.for("react.profiler"), t$4 = Symbol.for("react.provider"), u$3 = Symbol.for("react.context"), v$4 = Symbol.for("react.forward_ref"), w$2 = Symbol.for("react.suspense"), x$1 = Symbol.for("react.memo"), y$1 = Symbol.for("react.lazy"), z$2 = Symbol.iterator;
function A$2(a) {
  if (null === a || "object" !== typeof a)
    return null;
  a = z$2 && a[z$2] || a["@@iterator"];
  return "function" === typeof a ? a : null;
}
var B$1 = { isMounted: function() {
  return false;
}, enqueueForceUpdate: function() {
}, enqueueReplaceState: function() {
}, enqueueSetState: function() {
} }, C$1 = Object.assign, D$1 = {};
function E$1(a, b2, e2) {
  this.props = a;
  this.context = b2;
  this.refs = D$1;
  this.updater = e2 || B$1;
}
E$1.prototype.isReactComponent = {};
E$1.prototype.setState = function(a, b2) {
  if ("object" !== typeof a && "function" !== typeof a && null != a)
    throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");
  this.updater.enqueueSetState(this, a, b2, "setState");
};
E$1.prototype.forceUpdate = function(a) {
  this.updater.enqueueForceUpdate(this, a, "forceUpdate");
};
function F() {
}
F.prototype = E$1.prototype;
function G$1(a, b2, e2) {
  this.props = a;
  this.context = b2;
  this.refs = D$1;
  this.updater = e2 || B$1;
}
var H$1 = G$1.prototype = new F();
H$1.constructor = G$1;
C$1(H$1, E$1.prototype);
H$1.isPureReactComponent = true;
var I$1 = Array.isArray, J = Object.prototype.hasOwnProperty, K$1 = { current: null }, L$1 = { key: true, ref: true, __self: true, __source: true };
function M$1(a, b2, e2) {
  var d2, c2 = {}, k2 = null, h2 = null;
  if (null != b2)
    for (d2 in void 0 !== b2.ref && (h2 = b2.ref), void 0 !== b2.key && (k2 = "" + b2.key), b2)
      J.call(b2, d2) && !L$1.hasOwnProperty(d2) && (c2[d2] = b2[d2]);
  var g2 = arguments.length - 2;
  if (1 === g2)
    c2.children = e2;
  else if (1 < g2) {
    for (var f2 = Array(g2), m2 = 0; m2 < g2; m2++)
      f2[m2] = arguments[m2 + 2];
    c2.children = f2;
  }
  if (a && a.defaultProps)
    for (d2 in g2 = a.defaultProps, g2)
      void 0 === c2[d2] && (c2[d2] = g2[d2]);
  return { $$typeof: l$4, type: a, key: k2, ref: h2, props: c2, _owner: K$1.current };
}
function N$1(a, b2) {
  return { $$typeof: l$4, type: a.type, key: b2, ref: a.ref, props: a.props, _owner: a._owner };
}
function O$1(a) {
  return "object" === typeof a && null !== a && a.$$typeof === l$4;
}
function escape(a) {
  var b2 = { "=": "=0", ":": "=2" };
  return "$" + a.replace(/[=:]/g, function(a2) {
    return b2[a2];
  });
}
var P$1 = /\/+/g;
function Q$1(a, b2) {
  return "object" === typeof a && null !== a && null != a.key ? escape("" + a.key) : b2.toString(36);
}
function R$1(a, b2, e2, d2, c2) {
  var k2 = typeof a;
  if ("undefined" === k2 || "boolean" === k2)
    a = null;
  var h2 = false;
  if (null === a)
    h2 = true;
  else
    switch (k2) {
      case "string":
      case "number":
        h2 = true;
        break;
      case "object":
        switch (a.$$typeof) {
          case l$4:
          case n$5:
            h2 = true;
        }
    }
  if (h2)
    return h2 = a, c2 = c2(h2), a = "" === d2 ? "." + Q$1(h2, 0) : d2, I$1(c2) ? (e2 = "", null != a && (e2 = a.replace(P$1, "$&/") + "/"), R$1(c2, b2, e2, "", function(a2) {
      return a2;
    })) : null != c2 && (O$1(c2) && (c2 = N$1(c2, e2 + (!c2.key || h2 && h2.key === c2.key ? "" : ("" + c2.key).replace(P$1, "$&/") + "/") + a)), b2.push(c2)), 1;
  h2 = 0;
  d2 = "" === d2 ? "." : d2 + ":";
  if (I$1(a))
    for (var g2 = 0; g2 < a.length; g2++) {
      k2 = a[g2];
      var f2 = d2 + Q$1(k2, g2);
      h2 += R$1(k2, b2, e2, f2, c2);
    }
  else if (f2 = A$2(a), "function" === typeof f2)
    for (a = f2.call(a), g2 = 0; !(k2 = a.next()).done; )
      k2 = k2.value, f2 = d2 + Q$1(k2, g2++), h2 += R$1(k2, b2, e2, f2, c2);
  else if ("object" === k2)
    throw b2 = String(a), Error("Objects are not valid as a React child (found: " + ("[object Object]" === b2 ? "object with keys {" + Object.keys(a).join(", ") + "}" : b2) + "). If you meant to render a collection of children, use an array instead.");
  return h2;
}
function S$1(a, b2, e2) {
  if (null == a)
    return a;
  var d2 = [], c2 = 0;
  R$1(a, d2, "", "", function(a2) {
    return b2.call(e2, a2, c2++);
  });
  return d2;
}
function T$1(a) {
  if (-1 === a._status) {
    var b2 = a._result;
    b2 = b2();
    b2.then(function(b3) {
      if (0 === a._status || -1 === a._status)
        a._status = 1, a._result = b3;
    }, function(b3) {
      if (0 === a._status || -1 === a._status)
        a._status = 2, a._result = b3;
    });
    -1 === a._status && (a._status = 0, a._result = b2);
  }
  if (1 === a._status)
    return a._result.default;
  throw a._result;
}
var U$1 = { current: null }, V$1 = { transition: null }, W$1 = { ReactCurrentDispatcher: U$1, ReactCurrentBatchConfig: V$1, ReactCurrentOwner: K$1 };
react_production_min.Children = { map: S$1, forEach: function(a, b2, e2) {
  S$1(a, function() {
    b2.apply(this, arguments);
  }, e2);
}, count: function(a) {
  var b2 = 0;
  S$1(a, function() {
    b2++;
  });
  return b2;
}, toArray: function(a) {
  return S$1(a, function(a2) {
    return a2;
  }) || [];
}, only: function(a) {
  if (!O$1(a))
    throw Error("React.Children.only expected to receive a single React element child.");
  return a;
} };
react_production_min.Component = E$1;
react_production_min.Fragment = p$6;
react_production_min.Profiler = r$3;
react_production_min.PureComponent = G$1;
react_production_min.StrictMode = q$5;
react_production_min.Suspense = w$2;
react_production_min.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = W$1;
react_production_min.cloneElement = function(a, b2, e2) {
  if (null === a || void 0 === a)
    throw Error("React.cloneElement(...): The argument must be a React element, but you passed " + a + ".");
  var d2 = C$1({}, a.props), c2 = a.key, k2 = a.ref, h2 = a._owner;
  if (null != b2) {
    void 0 !== b2.ref && (k2 = b2.ref, h2 = K$1.current);
    void 0 !== b2.key && (c2 = "" + b2.key);
    if (a.type && a.type.defaultProps)
      var g2 = a.type.defaultProps;
    for (f2 in b2)
      J.call(b2, f2) && !L$1.hasOwnProperty(f2) && (d2[f2] = void 0 === b2[f2] && void 0 !== g2 ? g2[f2] : b2[f2]);
  }
  var f2 = arguments.length - 2;
  if (1 === f2)
    d2.children = e2;
  else if (1 < f2) {
    g2 = Array(f2);
    for (var m2 = 0; m2 < f2; m2++)
      g2[m2] = arguments[m2 + 2];
    d2.children = g2;
  }
  return { $$typeof: l$4, type: a.type, key: c2, ref: k2, props: d2, _owner: h2 };
};
react_production_min.createContext = function(a) {
  a = { $$typeof: u$3, _currentValue: a, _currentValue2: a, _threadCount: 0, Provider: null, Consumer: null, _defaultValue: null, _globalName: null };
  a.Provider = { $$typeof: t$4, _context: a };
  return a.Consumer = a;
};
react_production_min.createElement = M$1;
react_production_min.createFactory = function(a) {
  var b2 = M$1.bind(null, a);
  b2.type = a;
  return b2;
};
react_production_min.createRef = function() {
  return { current: null };
};
react_production_min.forwardRef = function(a) {
  return { $$typeof: v$4, render: a };
};
react_production_min.isValidElement = O$1;
react_production_min.lazy = function(a) {
  return { $$typeof: y$1, _payload: { _status: -1, _result: a }, _init: T$1 };
};
react_production_min.memo = function(a, b2) {
  return { $$typeof: x$1, type: a, compare: void 0 === b2 ? null : b2 };
};
react_production_min.startTransition = function(a) {
  var b2 = V$1.transition;
  V$1.transition = {};
  try {
    a();
  } finally {
    V$1.transition = b2;
  }
};
react_production_min.unstable_act = function() {
  throw Error("act(...) is not supported in production builds of React.");
};
react_production_min.useCallback = function(a, b2) {
  return U$1.current.useCallback(a, b2);
};
react_production_min.useContext = function(a) {
  return U$1.current.useContext(a);
};
react_production_min.useDebugValue = function() {
};
react_production_min.useDeferredValue = function(a) {
  return U$1.current.useDeferredValue(a);
};
react_production_min.useEffect = function(a, b2) {
  return U$1.current.useEffect(a, b2);
};
react_production_min.useId = function() {
  return U$1.current.useId();
};
react_production_min.useImperativeHandle = function(a, b2, e2) {
  return U$1.current.useImperativeHandle(a, b2, e2);
};
react_production_min.useInsertionEffect = function(a, b2) {
  return U$1.current.useInsertionEffect(a, b2);
};
react_production_min.useLayoutEffect = function(a, b2) {
  return U$1.current.useLayoutEffect(a, b2);
};
react_production_min.useMemo = function(a, b2) {
  return U$1.current.useMemo(a, b2);
};
react_production_min.useReducer = function(a, b2, e2) {
  return U$1.current.useReducer(a, b2, e2);
};
react_production_min.useRef = function(a) {
  return U$1.current.useRef(a);
};
react_production_min.useState = function(a) {
  return U$1.current.useState(a);
};
react_production_min.useSyncExternalStore = function(a, b2, e2) {
  return U$1.current.useSyncExternalStore(a, b2, e2);
};
react_production_min.useTransition = function() {
  return U$1.current.useTransition();
};
react_production_min.version = "18.2.0";
{
  react.exports = react_production_min;
}
var reactExports = react.exports;
const index$1 = /* @__PURE__ */ getDefaultExportFromCjs(reactExports);
const React = /* @__PURE__ */ _mergeNamespaces({
  __proto__: null,
  default: index$1
}, [reactExports]);
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var f$2 = reactExports, k$3 = Symbol.for("react.element"), l$3 = Symbol.for("react.fragment"), m$4 = Object.prototype.hasOwnProperty, n$4 = f$2.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, p$5 = { key: true, ref: true, __self: true, __source: true };
function q$4(c2, a, g2) {
  var b2, d2 = {}, e2 = null, h2 = null;
  void 0 !== g2 && (e2 = "" + g2);
  void 0 !== a.key && (e2 = "" + a.key);
  void 0 !== a.ref && (h2 = a.ref);
  for (b2 in a)
    m$4.call(a, b2) && !p$5.hasOwnProperty(b2) && (d2[b2] = a[b2]);
  if (c2 && c2.defaultProps)
    for (b2 in a = c2.defaultProps, a)
      void 0 === d2[b2] && (d2[b2] = a[b2]);
  return { $$typeof: k$3, type: c2, key: e2, ref: h2, props: d2, _owner: n$4.current };
}
reactJsxRuntime_production_min.Fragment = l$3;
reactJsxRuntime_production_min.jsx = q$4;
reactJsxRuntime_production_min.jsxs = q$4;
{
  jsxRuntime.exports = reactJsxRuntime_production_min;
}
var jsxRuntimeExports = jsxRuntime.exports;
function bind(fn, thisArg) {
  return function wrap() {
    return fn.apply(thisArg, arguments);
  };
}
const { toString } = Object.prototype;
const { getPrototypeOf } = Object;
const kindOf = ((cache) => (thing) => {
  const str = toString.call(thing);
  return cache[str] || (cache[str] = str.slice(8, -1).toLowerCase());
})(/* @__PURE__ */ Object.create(null));
const kindOfTest = (type) => {
  type = type.toLowerCase();
  return (thing) => kindOf(thing) === type;
};
const typeOfTest = (type) => (thing) => typeof thing === type;
const { isArray } = Array;
const isUndefined = typeOfTest("undefined");
function isBuffer(val) {
  return val !== null && !isUndefined(val) && val.constructor !== null && !isUndefined(val.constructor) && isFunction(val.constructor.isBuffer) && val.constructor.isBuffer(val);
}
const isArrayBuffer = kindOfTest("ArrayBuffer");
function isArrayBufferView(val) {
  let result;
  if (typeof ArrayBuffer !== "undefined" && ArrayBuffer.isView) {
    result = ArrayBuffer.isView(val);
  } else {
    result = val && val.buffer && isArrayBuffer(val.buffer);
  }
  return result;
}
const isString = typeOfTest("string");
const isFunction = typeOfTest("function");
const isNumber = typeOfTest("number");
const isObject = (thing) => thing !== null && typeof thing === "object";
const isBoolean = (thing) => thing === true || thing === false;
const isPlainObject$1 = (val) => {
  if (kindOf(val) !== "object") {
    return false;
  }
  const prototype2 = getPrototypeOf(val);
  return (prototype2 === null || prototype2 === Object.prototype || Object.getPrototypeOf(prototype2) === null) && !(Symbol.toStringTag in val) && !(Symbol.iterator in val);
};
const isDate = kindOfTest("Date");
const isFile = kindOfTest("File");
const isBlob = kindOfTest("Blob");
const isFileList = kindOfTest("FileList");
const isStream = (val) => isObject(val) && isFunction(val.pipe);
const isFormData = (thing) => {
  let kind;
  return thing && (typeof FormData === "function" && thing instanceof FormData || isFunction(thing.append) && ((kind = kindOf(thing)) === "formdata" || // detect form-data instance
  kind === "object" && isFunction(thing.toString) && thing.toString() === "[object FormData]"));
};
const isURLSearchParams = kindOfTest("URLSearchParams");
const trim = (str) => str.trim ? str.trim() : str.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "");
function forEach(obj, fn, { allOwnKeys = false } = {}) {
  if (obj === null || typeof obj === "undefined") {
    return;
  }
  let i;
  let l2;
  if (typeof obj !== "object") {
    obj = [obj];
  }
  if (isArray(obj)) {
    for (i = 0, l2 = obj.length; i < l2; i++) {
      fn.call(null, obj[i], i, obj);
    }
  } else {
    const keys = allOwnKeys ? Object.getOwnPropertyNames(obj) : Object.keys(obj);
    const len = keys.length;
    let key;
    for (i = 0; i < len; i++) {
      key = keys[i];
      fn.call(null, obj[key], key, obj);
    }
  }
}
function findKey(obj, key) {
  key = key.toLowerCase();
  const keys = Object.keys(obj);
  let i = keys.length;
  let _key;
  while (i-- > 0) {
    _key = keys[i];
    if (key === _key.toLowerCase()) {
      return _key;
    }
  }
  return null;
}
const _global = (() => {
  if (typeof globalThis !== "undefined")
    return globalThis;
  return typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : global;
})();
const isContextDefined = (context) => !isUndefined(context) && context !== _global;
function merge() {
  const { caseless } = isContextDefined(this) && this || {};
  const result = {};
  const assignValue = (val, key) => {
    const targetKey = caseless && findKey(result, key) || key;
    if (isPlainObject$1(result[targetKey]) && isPlainObject$1(val)) {
      result[targetKey] = merge(result[targetKey], val);
    } else if (isPlainObject$1(val)) {
      result[targetKey] = merge({}, val);
    } else if (isArray(val)) {
      result[targetKey] = val.slice();
    } else {
      result[targetKey] = val;
    }
  };
  for (let i = 0, l2 = arguments.length; i < l2; i++) {
    arguments[i] && forEach(arguments[i], assignValue);
  }
  return result;
}
const extend = (a, b2, thisArg, { allOwnKeys } = {}) => {
  forEach(b2, (val, key) => {
    if (thisArg && isFunction(val)) {
      a[key] = bind(val, thisArg);
    } else {
      a[key] = val;
    }
  }, { allOwnKeys });
  return a;
};
const stripBOM = (content) => {
  if (content.charCodeAt(0) === 65279) {
    content = content.slice(1);
  }
  return content;
};
const inherits = (constructor, superConstructor, props, descriptors2) => {
  constructor.prototype = Object.create(superConstructor.prototype, descriptors2);
  constructor.prototype.constructor = constructor;
  Object.defineProperty(constructor, "super", {
    value: superConstructor.prototype
  });
  props && Object.assign(constructor.prototype, props);
};
const toFlatObject = (sourceObj, destObj, filter2, propFilter) => {
  let props;
  let i;
  let prop;
  const merged = {};
  destObj = destObj || {};
  if (sourceObj == null)
    return destObj;
  do {
    props = Object.getOwnPropertyNames(sourceObj);
    i = props.length;
    while (i-- > 0) {
      prop = props[i];
      if ((!propFilter || propFilter(prop, sourceObj, destObj)) && !merged[prop]) {
        destObj[prop] = sourceObj[prop];
        merged[prop] = true;
      }
    }
    sourceObj = filter2 !== false && getPrototypeOf(sourceObj);
  } while (sourceObj && (!filter2 || filter2(sourceObj, destObj)) && sourceObj !== Object.prototype);
  return destObj;
};
const endsWith = (str, searchString, position) => {
  str = String(str);
  if (position === void 0 || position > str.length) {
    position = str.length;
  }
  position -= searchString.length;
  const lastIndex = str.indexOf(searchString, position);
  return lastIndex !== -1 && lastIndex === position;
};
const toArray = (thing) => {
  if (!thing)
    return null;
  if (isArray(thing))
    return thing;
  let i = thing.length;
  if (!isNumber(i))
    return null;
  const arr = new Array(i);
  while (i-- > 0) {
    arr[i] = thing[i];
  }
  return arr;
};
const isTypedArray = ((TypedArray) => {
  return (thing) => {
    return TypedArray && thing instanceof TypedArray;
  };
})(typeof Uint8Array !== "undefined" && getPrototypeOf(Uint8Array));
const forEachEntry = (obj, fn) => {
  const generator = obj && obj[Symbol.iterator];
  const iterator = generator.call(obj);
  let result;
  while ((result = iterator.next()) && !result.done) {
    const pair = result.value;
    fn.call(obj, pair[0], pair[1]);
  }
};
const matchAll = (regExp, str) => {
  let matches;
  const arr = [];
  while ((matches = regExp.exec(str)) !== null) {
    arr.push(matches);
  }
  return arr;
};
const isHTMLForm = kindOfTest("HTMLFormElement");
const toCamelCase = (str) => {
  return str.toLowerCase().replace(
    /[-_\s]([a-z\d])(\w*)/g,
    function replacer(m2, p1, p2) {
      return p1.toUpperCase() + p2;
    }
  );
};
const hasOwnProperty = (({ hasOwnProperty: hasOwnProperty2 }) => (obj, prop) => hasOwnProperty2.call(obj, prop))(Object.prototype);
const isRegExp = kindOfTest("RegExp");
const reduceDescriptors = (obj, reducer2) => {
  const descriptors2 = Object.getOwnPropertyDescriptors(obj);
  const reducedDescriptors = {};
  forEach(descriptors2, (descriptor, name) => {
    if (reducer2(descriptor, name, obj) !== false) {
      reducedDescriptors[name] = descriptor;
    }
  });
  Object.defineProperties(obj, reducedDescriptors);
};
const freezeMethods = (obj) => {
  reduceDescriptors(obj, (descriptor, name) => {
    if (isFunction(obj) && ["arguments", "caller", "callee"].indexOf(name) !== -1) {
      return false;
    }
    const value = obj[name];
    if (!isFunction(value))
      return;
    descriptor.enumerable = false;
    if ("writable" in descriptor) {
      descriptor.writable = false;
      return;
    }
    if (!descriptor.set) {
      descriptor.set = () => {
        throw Error("Can not rewrite read-only method '" + name + "'");
      };
    }
  });
};
const toObjectSet = (arrayOrString, delimiter) => {
  const obj = {};
  const define = (arr) => {
    arr.forEach((value) => {
      obj[value] = true;
    });
  };
  isArray(arrayOrString) ? define(arrayOrString) : define(String(arrayOrString).split(delimiter));
  return obj;
};
const noop = () => {
};
const toFiniteNumber = (value, defaultValue) => {
  value = +value;
  return Number.isFinite(value) ? value : defaultValue;
};
const ALPHA = "abcdefghijklmnopqrstuvwxyz";
const DIGIT = "0123456789";
const ALPHABET = {
  DIGIT,
  ALPHA,
  ALPHA_DIGIT: ALPHA + ALPHA.toUpperCase() + DIGIT
};
const generateString = (size = 16, alphabet = ALPHABET.ALPHA_DIGIT) => {
  let str = "";
  const { length } = alphabet;
  while (size--) {
    str += alphabet[Math.random() * length | 0];
  }
  return str;
};
function isSpecCompliantForm(thing) {
  return !!(thing && isFunction(thing.append) && thing[Symbol.toStringTag] === "FormData" && thing[Symbol.iterator]);
}
const toJSONObject = (obj) => {
  const stack = new Array(10);
  const visit = (source, i) => {
    if (isObject(source)) {
      if (stack.indexOf(source) >= 0) {
        return;
      }
      if (!("toJSON" in source)) {
        stack[i] = source;
        const target = isArray(source) ? [] : {};
        forEach(source, (value, key) => {
          const reducedValue = visit(value, i + 1);
          !isUndefined(reducedValue) && (target[key] = reducedValue);
        });
        stack[i] = void 0;
        return target;
      }
    }
    return source;
  };
  return visit(obj, 0);
};
const isAsyncFn = kindOfTest("AsyncFunction");
const isThenable = (thing) => thing && (isObject(thing) || isFunction(thing)) && isFunction(thing.then) && isFunction(thing.catch);
const utils = {
  isArray,
  isArrayBuffer,
  isBuffer,
  isFormData,
  isArrayBufferView,
  isString,
  isNumber,
  isBoolean,
  isObject,
  isPlainObject: isPlainObject$1,
  isUndefined,
  isDate,
  isFile,
  isBlob,
  isRegExp,
  isFunction,
  isStream,
  isURLSearchParams,
  isTypedArray,
  isFileList,
  forEach,
  merge,
  extend,
  trim,
  stripBOM,
  inherits,
  toFlatObject,
  kindOf,
  kindOfTest,
  endsWith,
  toArray,
  forEachEntry,
  matchAll,
  isHTMLForm,
  hasOwnProperty,
  hasOwnProp: hasOwnProperty,
  // an alias to avoid ESLint no-prototype-builtins detection
  reduceDescriptors,
  freezeMethods,
  toObjectSet,
  toCamelCase,
  noop,
  toFiniteNumber,
  findKey,
  global: _global,
  isContextDefined,
  ALPHABET,
  generateString,
  isSpecCompliantForm,
  toJSONObject,
  isAsyncFn,
  isThenable
};
function AxiosError(message, code, config, request, response) {
  Error.call(this);
  if (Error.captureStackTrace) {
    Error.captureStackTrace(this, this.constructor);
  } else {
    this.stack = new Error().stack;
  }
  this.message = message;
  this.name = "AxiosError";
  code && (this.code = code);
  config && (this.config = config);
  request && (this.request = request);
  response && (this.response = response);
}
utils.inherits(AxiosError, Error, {
  toJSON: function toJSON() {
    return {
      // Standard
      message: this.message,
      name: this.name,
      // Microsoft
      description: this.description,
      number: this.number,
      // Mozilla
      fileName: this.fileName,
      lineNumber: this.lineNumber,
      columnNumber: this.columnNumber,
      stack: this.stack,
      // Axios
      config: utils.toJSONObject(this.config),
      code: this.code,
      status: this.response && this.response.status ? this.response.status : null
    };
  }
});
const prototype$1 = AxiosError.prototype;
const descriptors = {};
[
  "ERR_BAD_OPTION_VALUE",
  "ERR_BAD_OPTION",
  "ECONNABORTED",
  "ETIMEDOUT",
  "ERR_NETWORK",
  "ERR_FR_TOO_MANY_REDIRECTS",
  "ERR_DEPRECATED",
  "ERR_BAD_RESPONSE",
  "ERR_BAD_REQUEST",
  "ERR_CANCELED",
  "ERR_NOT_SUPPORT",
  "ERR_INVALID_URL"
  // eslint-disable-next-line func-names
].forEach((code) => {
  descriptors[code] = { value: code };
});
Object.defineProperties(AxiosError, descriptors);
Object.defineProperty(prototype$1, "isAxiosError", { value: true });
AxiosError.from = (error, code, config, request, response, customProps) => {
  const axiosError = Object.create(prototype$1);
  utils.toFlatObject(error, axiosError, function filter2(obj) {
    return obj !== Error.prototype;
  }, (prop) => {
    return prop !== "isAxiosError";
  });
  AxiosError.call(axiosError, error.message, code, config, request, response);
  axiosError.cause = error;
  axiosError.name = error.name;
  customProps && Object.assign(axiosError, customProps);
  return axiosError;
};
const httpAdapter = null;
function isVisitable(thing) {
  return utils.isPlainObject(thing) || utils.isArray(thing);
}
function removeBrackets(key) {
  return utils.endsWith(key, "[]") ? key.slice(0, -2) : key;
}
function renderKey(path, key, dots) {
  if (!path)
    return key;
  return path.concat(key).map(function each(token, i) {
    token = removeBrackets(token);
    return !dots && i ? "[" + token + "]" : token;
  }).join(dots ? "." : "");
}
function isFlatArray(arr) {
  return utils.isArray(arr) && !arr.some(isVisitable);
}
const predicates = utils.toFlatObject(utils, {}, null, function filter(prop) {
  return /^is[A-Z]/.test(prop);
});
function toFormData(obj, formData, options) {
  if (!utils.isObject(obj)) {
    throw new TypeError("target must be an object");
  }
  formData = formData || new FormData();
  options = utils.toFlatObject(options, {
    metaTokens: true,
    dots: false,
    indexes: false
  }, false, function defined(option, source) {
    return !utils.isUndefined(source[option]);
  });
  const metaTokens = options.metaTokens;
  const visitor = options.visitor || defaultVisitor;
  const dots = options.dots;
  const indexes = options.indexes;
  const _Blob = options.Blob || typeof Blob !== "undefined" && Blob;
  const useBlob = _Blob && utils.isSpecCompliantForm(formData);
  if (!utils.isFunction(visitor)) {
    throw new TypeError("visitor must be a function");
  }
  function convertValue(value) {
    if (value === null)
      return "";
    if (utils.isDate(value)) {
      return value.toISOString();
    }
    if (!useBlob && utils.isBlob(value)) {
      throw new AxiosError("Blob is not supported. Use a Buffer instead.");
    }
    if (utils.isArrayBuffer(value) || utils.isTypedArray(value)) {
      return useBlob && typeof Blob === "function" ? new Blob([value]) : Buffer.from(value);
    }
    return value;
  }
  function defaultVisitor(value, key, path) {
    let arr = value;
    if (value && !path && typeof value === "object") {
      if (utils.endsWith(key, "{}")) {
        key = metaTokens ? key : key.slice(0, -2);
        value = JSON.stringify(value);
      } else if (utils.isArray(value) && isFlatArray(value) || (utils.isFileList(value) || utils.endsWith(key, "[]")) && (arr = utils.toArray(value))) {
        key = removeBrackets(key);
        arr.forEach(function each(el2, index2) {
          !(utils.isUndefined(el2) || el2 === null) && formData.append(
            // eslint-disable-next-line no-nested-ternary
            indexes === true ? renderKey([key], index2, dots) : indexes === null ? key : key + "[]",
            convertValue(el2)
          );
        });
        return false;
      }
    }
    if (isVisitable(value)) {
      return true;
    }
    formData.append(renderKey(path, key, dots), convertValue(value));
    return false;
  }
  const stack = [];
  const exposedHelpers = Object.assign(predicates, {
    defaultVisitor,
    convertValue,
    isVisitable
  });
  function build(value, path) {
    if (utils.isUndefined(value))
      return;
    if (stack.indexOf(value) !== -1) {
      throw Error("Circular reference detected in " + path.join("."));
    }
    stack.push(value);
    utils.forEach(value, function each(el2, key) {
      const result = !(utils.isUndefined(el2) || el2 === null) && visitor.call(
        formData,
        el2,
        utils.isString(key) ? key.trim() : key,
        path,
        exposedHelpers
      );
      if (result === true) {
        build(el2, path ? path.concat(key) : [key]);
      }
    });
    stack.pop();
  }
  if (!utils.isObject(obj)) {
    throw new TypeError("data must be an object");
  }
  build(obj);
  return formData;
}
function encode$1(str) {
  const charMap = {
    "!": "%21",
    "'": "%27",
    "(": "%28",
    ")": "%29",
    "~": "%7E",
    "%20": "+",
    "%00": "\0"
  };
  return encodeURIComponent(str).replace(/[!'()~]|%20|%00/g, function replacer(match) {
    return charMap[match];
  });
}
function AxiosURLSearchParams(params, options) {
  this._pairs = [];
  params && toFormData(params, this, options);
}
const prototype = AxiosURLSearchParams.prototype;
prototype.append = function append(name, value) {
  this._pairs.push([name, value]);
};
prototype.toString = function toString2(encoder) {
  const _encode = encoder ? function(value) {
    return encoder.call(this, value, encode$1);
  } : encode$1;
  return this._pairs.map(function each(pair) {
    return _encode(pair[0]) + "=" + _encode(pair[1]);
  }, "").join("&");
};
function encode(val) {
  return encodeURIComponent(val).replace(/%3A/gi, ":").replace(/%24/g, "$").replace(/%2C/gi, ",").replace(/%20/g, "+").replace(/%5B/gi, "[").replace(/%5D/gi, "]");
}
function buildURL(url, params, options) {
  if (!params) {
    return url;
  }
  const _encode = options && options.encode || encode;
  const serializeFn = options && options.serialize;
  let serializedParams;
  if (serializeFn) {
    serializedParams = serializeFn(params, options);
  } else {
    serializedParams = utils.isURLSearchParams(params) ? params.toString() : new AxiosURLSearchParams(params, options).toString(_encode);
  }
  if (serializedParams) {
    const hashmarkIndex = url.indexOf("#");
    if (hashmarkIndex !== -1) {
      url = url.slice(0, hashmarkIndex);
    }
    url += (url.indexOf("?") === -1 ? "?" : "&") + serializedParams;
  }
  return url;
}
class InterceptorManager {
  constructor() {
    this.handlers = [];
  }
  /**
   * Add a new interceptor to the stack
   *
   * @param {Function} fulfilled The function to handle `then` for a `Promise`
   * @param {Function} rejected The function to handle `reject` for a `Promise`
   *
   * @return {Number} An ID used to remove interceptor later
   */
  use(fulfilled, rejected, options) {
    this.handlers.push({
      fulfilled,
      rejected,
      synchronous: options ? options.synchronous : false,
      runWhen: options ? options.runWhen : null
    });
    return this.handlers.length - 1;
  }
  /**
   * Remove an interceptor from the stack
   *
   * @param {Number} id The ID that was returned by `use`
   *
   * @returns {Boolean} `true` if the interceptor was removed, `false` otherwise
   */
  eject(id2) {
    if (this.handlers[id2]) {
      this.handlers[id2] = null;
    }
  }
  /**
   * Clear all interceptors from the stack
   *
   * @returns {void}
   */
  clear() {
    if (this.handlers) {
      this.handlers = [];
    }
  }
  /**
   * Iterate over all the registered interceptors
   *
   * This method is particularly useful for skipping over any
   * interceptors that may have become `null` calling `eject`.
   *
   * @param {Function} fn The function to call for each interceptor
   *
   * @returns {void}
   */
  forEach(fn) {
    utils.forEach(this.handlers, function forEachHandler(h2) {
      if (h2 !== null) {
        fn(h2);
      }
    });
  }
}
const InterceptorManager$1 = InterceptorManager;
const transitionalDefaults = {
  silentJSONParsing: true,
  forcedJSONParsing: true,
  clarifyTimeoutError: false
};
const URLSearchParams$1 = typeof URLSearchParams !== "undefined" ? URLSearchParams : AxiosURLSearchParams;
const FormData$1 = typeof FormData !== "undefined" ? FormData : null;
const Blob$1 = typeof Blob !== "undefined" ? Blob : null;
const isStandardBrowserEnv = (() => {
  let product;
  if (typeof navigator !== "undefined" && ((product = navigator.product) === "ReactNative" || product === "NativeScript" || product === "NS")) {
    return false;
  }
  return typeof window !== "undefined" && typeof document !== "undefined";
})();
const isStandardBrowserWebWorkerEnv = (() => {
  return typeof WorkerGlobalScope !== "undefined" && // eslint-disable-next-line no-undef
  self instanceof WorkerGlobalScope && typeof self.importScripts === "function";
})();
const platform = {
  isBrowser: true,
  classes: {
    URLSearchParams: URLSearchParams$1,
    FormData: FormData$1,
    Blob: Blob$1
  },
  isStandardBrowserEnv,
  isStandardBrowserWebWorkerEnv,
  protocols: ["http", "https", "file", "blob", "url", "data"]
};
function toURLEncodedForm(data, options) {
  return toFormData(data, new platform.classes.URLSearchParams(), Object.assign({
    visitor: function(value, key, path, helpers) {
      if (platform.isNode && utils.isBuffer(value)) {
        this.append(key, value.toString("base64"));
        return false;
      }
      return helpers.defaultVisitor.apply(this, arguments);
    }
  }, options));
}
function parsePropPath(name) {
  return utils.matchAll(/\w+|\[(\w*)]/g, name).map((match) => {
    return match[0] === "[]" ? "" : match[1] || match[0];
  });
}
function arrayToObject(arr) {
  const obj = {};
  const keys = Object.keys(arr);
  let i;
  const len = keys.length;
  let key;
  for (i = 0; i < len; i++) {
    key = keys[i];
    obj[key] = arr[key];
  }
  return obj;
}
function formDataToJSON(formData) {
  function buildPath(path, value, target, index2) {
    let name = path[index2++];
    const isNumericKey = Number.isFinite(+name);
    const isLast = index2 >= path.length;
    name = !name && utils.isArray(target) ? target.length : name;
    if (isLast) {
      if (utils.hasOwnProp(target, name)) {
        target[name] = [target[name], value];
      } else {
        target[name] = value;
      }
      return !isNumericKey;
    }
    if (!target[name] || !utils.isObject(target[name])) {
      target[name] = [];
    }
    const result = buildPath(path, value, target[name], index2);
    if (result && utils.isArray(target[name])) {
      target[name] = arrayToObject(target[name]);
    }
    return !isNumericKey;
  }
  if (utils.isFormData(formData) && utils.isFunction(formData.entries)) {
    const obj = {};
    utils.forEachEntry(formData, (name, value) => {
      buildPath(parsePropPath(name), value, obj, 0);
    });
    return obj;
  }
  return null;
}
const DEFAULT_CONTENT_TYPE = {
  "Content-Type": void 0
};
function stringifySafely(rawValue, parser, encoder) {
  if (utils.isString(rawValue)) {
    try {
      (parser || JSON.parse)(rawValue);
      return utils.trim(rawValue);
    } catch (e2) {
      if (e2.name !== "SyntaxError") {
        throw e2;
      }
    }
  }
  return (encoder || JSON.stringify)(rawValue);
}
const defaults = {
  transitional: transitionalDefaults,
  adapter: ["xhr", "http"],
  transformRequest: [function transformRequest(data, headers) {
    const contentType = headers.getContentType() || "";
    const hasJSONContentType = contentType.indexOf("application/json") > -1;
    const isObjectPayload = utils.isObject(data);
    if (isObjectPayload && utils.isHTMLForm(data)) {
      data = new FormData(data);
    }
    const isFormData2 = utils.isFormData(data);
    if (isFormData2) {
      if (!hasJSONContentType) {
        return data;
      }
      return hasJSONContentType ? JSON.stringify(formDataToJSON(data)) : data;
    }
    if (utils.isArrayBuffer(data) || utils.isBuffer(data) || utils.isStream(data) || utils.isFile(data) || utils.isBlob(data)) {
      return data;
    }
    if (utils.isArrayBufferView(data)) {
      return data.buffer;
    }
    if (utils.isURLSearchParams(data)) {
      headers.setContentType("application/x-www-form-urlencoded;charset=utf-8", false);
      return data.toString();
    }
    let isFileList2;
    if (isObjectPayload) {
      if (contentType.indexOf("application/x-www-form-urlencoded") > -1) {
        return toURLEncodedForm(data, this.formSerializer).toString();
      }
      if ((isFileList2 = utils.isFileList(data)) || contentType.indexOf("multipart/form-data") > -1) {
        const _FormData = this.env && this.env.FormData;
        return toFormData(
          isFileList2 ? { "files[]": data } : data,
          _FormData && new _FormData(),
          this.formSerializer
        );
      }
    }
    if (isObjectPayload || hasJSONContentType) {
      headers.setContentType("application/json", false);
      return stringifySafely(data);
    }
    return data;
  }],
  transformResponse: [function transformResponse(data) {
    const transitional2 = this.transitional || defaults.transitional;
    const forcedJSONParsing = transitional2 && transitional2.forcedJSONParsing;
    const JSONRequested = this.responseType === "json";
    if (data && utils.isString(data) && (forcedJSONParsing && !this.responseType || JSONRequested)) {
      const silentJSONParsing = transitional2 && transitional2.silentJSONParsing;
      const strictJSONParsing = !silentJSONParsing && JSONRequested;
      try {
        return JSON.parse(data);
      } catch (e2) {
        if (strictJSONParsing) {
          if (e2.name === "SyntaxError") {
            throw AxiosError.from(e2, AxiosError.ERR_BAD_RESPONSE, this, null, this.response);
          }
          throw e2;
        }
      }
    }
    return data;
  }],
  /**
   * A timeout in milliseconds to abort a request. If set to 0 (default) a
   * timeout is not created.
   */
  timeout: 0,
  xsrfCookieName: "XSRF-TOKEN",
  xsrfHeaderName: "X-XSRF-TOKEN",
  maxContentLength: -1,
  maxBodyLength: -1,
  env: {
    FormData: platform.classes.FormData,
    Blob: platform.classes.Blob
  },
  validateStatus: function validateStatus(status) {
    return status >= 200 && status < 300;
  },
  headers: {
    common: {
      "Accept": "application/json, text/plain, */*"
    }
  }
};
utils.forEach(["delete", "get", "head"], function forEachMethodNoData(method) {
  defaults.headers[method] = {};
});
utils.forEach(["post", "put", "patch"], function forEachMethodWithData(method) {
  defaults.headers[method] = utils.merge(DEFAULT_CONTENT_TYPE);
});
const defaults$1 = defaults;
const ignoreDuplicateOf = utils.toObjectSet([
  "age",
  "authorization",
  "content-length",
  "content-type",
  "etag",
  "expires",
  "from",
  "host",
  "if-modified-since",
  "if-unmodified-since",
  "last-modified",
  "location",
  "max-forwards",
  "proxy-authorization",
  "referer",
  "retry-after",
  "user-agent"
]);
const parseHeaders = (rawHeaders) => {
  const parsed = {};
  let key;
  let val;
  let i;
  rawHeaders && rawHeaders.split("\n").forEach(function parser(line) {
    i = line.indexOf(":");
    key = line.substring(0, i).trim().toLowerCase();
    val = line.substring(i + 1).trim();
    if (!key || parsed[key] && ignoreDuplicateOf[key]) {
      return;
    }
    if (key === "set-cookie") {
      if (parsed[key]) {
        parsed[key].push(val);
      } else {
        parsed[key] = [val];
      }
    } else {
      parsed[key] = parsed[key] ? parsed[key] + ", " + val : val;
    }
  });
  return parsed;
};
const $internals = Symbol("internals");
function normalizeHeader(header) {
  return header && String(header).trim().toLowerCase();
}
function normalizeValue(value) {
  if (value === false || value == null) {
    return value;
  }
  return utils.isArray(value) ? value.map(normalizeValue) : String(value);
}
function parseTokens(str) {
  const tokens = /* @__PURE__ */ Object.create(null);
  const tokensRE = /([^\s,;=]+)\s*(?:=\s*([^,;]+))?/g;
  let match;
  while (match = tokensRE.exec(str)) {
    tokens[match[1]] = match[2];
  }
  return tokens;
}
const isValidHeaderName = (str) => /^[-_a-zA-Z0-9^`|~,!#$%&'*+.]+$/.test(str.trim());
function matchHeaderValue(context, value, header, filter2, isHeaderNameFilter) {
  if (utils.isFunction(filter2)) {
    return filter2.call(this, value, header);
  }
  if (isHeaderNameFilter) {
    value = header;
  }
  if (!utils.isString(value))
    return;
  if (utils.isString(filter2)) {
    return value.indexOf(filter2) !== -1;
  }
  if (utils.isRegExp(filter2)) {
    return filter2.test(value);
  }
}
function formatHeader(header) {
  return header.trim().toLowerCase().replace(/([a-z\d])(\w*)/g, (w2, char, str) => {
    return char.toUpperCase() + str;
  });
}
function buildAccessors(obj, header) {
  const accessorName = utils.toCamelCase(" " + header);
  ["get", "set", "has"].forEach((methodName) => {
    Object.defineProperty(obj, methodName + accessorName, {
      value: function(arg1, arg2, arg3) {
        return this[methodName].call(this, header, arg1, arg2, arg3);
      },
      configurable: true
    });
  });
}
class AxiosHeaders {
  constructor(headers) {
    headers && this.set(headers);
  }
  set(header, valueOrRewrite, rewrite) {
    const self2 = this;
    function setHeader(_value, _header, _rewrite) {
      const lHeader = normalizeHeader(_header);
      if (!lHeader) {
        throw new Error("header name must be a non-empty string");
      }
      const key = utils.findKey(self2, lHeader);
      if (!key || self2[key] === void 0 || _rewrite === true || _rewrite === void 0 && self2[key] !== false) {
        self2[key || _header] = normalizeValue(_value);
      }
    }
    const setHeaders = (headers, _rewrite) => utils.forEach(headers, (_value, _header) => setHeader(_value, _header, _rewrite));
    if (utils.isPlainObject(header) || header instanceof this.constructor) {
      setHeaders(header, valueOrRewrite);
    } else if (utils.isString(header) && (header = header.trim()) && !isValidHeaderName(header)) {
      setHeaders(parseHeaders(header), valueOrRewrite);
    } else {
      header != null && setHeader(valueOrRewrite, header, rewrite);
    }
    return this;
  }
  get(header, parser) {
    header = normalizeHeader(header);
    if (header) {
      const key = utils.findKey(this, header);
      if (key) {
        const value = this[key];
        if (!parser) {
          return value;
        }
        if (parser === true) {
          return parseTokens(value);
        }
        if (utils.isFunction(parser)) {
          return parser.call(this, value, key);
        }
        if (utils.isRegExp(parser)) {
          return parser.exec(value);
        }
        throw new TypeError("parser must be boolean|regexp|function");
      }
    }
  }
  has(header, matcher) {
    header = normalizeHeader(header);
    if (header) {
      const key = utils.findKey(this, header);
      return !!(key && this[key] !== void 0 && (!matcher || matchHeaderValue(this, this[key], key, matcher)));
    }
    return false;
  }
  delete(header, matcher) {
    const self2 = this;
    let deleted = false;
    function deleteHeader(_header) {
      _header = normalizeHeader(_header);
      if (_header) {
        const key = utils.findKey(self2, _header);
        if (key && (!matcher || matchHeaderValue(self2, self2[key], key, matcher))) {
          delete self2[key];
          deleted = true;
        }
      }
    }
    if (utils.isArray(header)) {
      header.forEach(deleteHeader);
    } else {
      deleteHeader(header);
    }
    return deleted;
  }
  clear(matcher) {
    const keys = Object.keys(this);
    let i = keys.length;
    let deleted = false;
    while (i--) {
      const key = keys[i];
      if (!matcher || matchHeaderValue(this, this[key], key, matcher, true)) {
        delete this[key];
        deleted = true;
      }
    }
    return deleted;
  }
  normalize(format) {
    const self2 = this;
    const headers = {};
    utils.forEach(this, (value, header) => {
      const key = utils.findKey(headers, header);
      if (key) {
        self2[key] = normalizeValue(value);
        delete self2[header];
        return;
      }
      const normalized = format ? formatHeader(header) : String(header).trim();
      if (normalized !== header) {
        delete self2[header];
      }
      self2[normalized] = normalizeValue(value);
      headers[normalized] = true;
    });
    return this;
  }
  concat(...targets) {
    return this.constructor.concat(this, ...targets);
  }
  toJSON(asStrings) {
    const obj = /* @__PURE__ */ Object.create(null);
    utils.forEach(this, (value, header) => {
      value != null && value !== false && (obj[header] = asStrings && utils.isArray(value) ? value.join(", ") : value);
    });
    return obj;
  }
  [Symbol.iterator]() {
    return Object.entries(this.toJSON())[Symbol.iterator]();
  }
  toString() {
    return Object.entries(this.toJSON()).map(([header, value]) => header + ": " + value).join("\n");
  }
  get [Symbol.toStringTag]() {
    return "AxiosHeaders";
  }
  static from(thing) {
    return thing instanceof this ? thing : new this(thing);
  }
  static concat(first, ...targets) {
    const computed = new this(first);
    targets.forEach((target) => computed.set(target));
    return computed;
  }
  static accessor(header) {
    const internals = this[$internals] = this[$internals] = {
      accessors: {}
    };
    const accessors = internals.accessors;
    const prototype2 = this.prototype;
    function defineAccessor(_header) {
      const lHeader = normalizeHeader(_header);
      if (!accessors[lHeader]) {
        buildAccessors(prototype2, _header);
        accessors[lHeader] = true;
      }
    }
    utils.isArray(header) ? header.forEach(defineAccessor) : defineAccessor(header);
    return this;
  }
}
AxiosHeaders.accessor(["Content-Type", "Content-Length", "Accept", "Accept-Encoding", "User-Agent", "Authorization"]);
utils.freezeMethods(AxiosHeaders.prototype);
utils.freezeMethods(AxiosHeaders);
const AxiosHeaders$1 = AxiosHeaders;
function transformData(fns, response) {
  const config = this || defaults$1;
  const context = response || config;
  const headers = AxiosHeaders$1.from(context.headers);
  let data = context.data;
  utils.forEach(fns, function transform(fn) {
    data = fn.call(config, data, headers.normalize(), response ? response.status : void 0);
  });
  headers.normalize();
  return data;
}
function isCancel(value) {
  return !!(value && value.__CANCEL__);
}
function CanceledError(message, config, request) {
  AxiosError.call(this, message == null ? "canceled" : message, AxiosError.ERR_CANCELED, config, request);
  this.name = "CanceledError";
}
utils.inherits(CanceledError, AxiosError, {
  __CANCEL__: true
});
function settle(resolve, reject, response) {
  const validateStatus2 = response.config.validateStatus;
  if (!response.status || !validateStatus2 || validateStatus2(response.status)) {
    resolve(response);
  } else {
    reject(new AxiosError(
      "Request failed with status code " + response.status,
      [AxiosError.ERR_BAD_REQUEST, AxiosError.ERR_BAD_RESPONSE][Math.floor(response.status / 100) - 4],
      response.config,
      response.request,
      response
    ));
  }
}
const cookies = platform.isStandardBrowserEnv ? (
  // Standard browser envs support document.cookie
  function standardBrowserEnv() {
    return {
      write: function write(name, value, expires, path, domain, secure) {
        const cookie = [];
        cookie.push(name + "=" + encodeURIComponent(value));
        if (utils.isNumber(expires)) {
          cookie.push("expires=" + new Date(expires).toGMTString());
        }
        if (utils.isString(path)) {
          cookie.push("path=" + path);
        }
        if (utils.isString(domain)) {
          cookie.push("domain=" + domain);
        }
        if (secure === true) {
          cookie.push("secure");
        }
        document.cookie = cookie.join("; ");
      },
      read: function read(name) {
        const match = document.cookie.match(new RegExp("(^|;\\s*)(" + name + ")=([^;]*)"));
        return match ? decodeURIComponent(match[3]) : null;
      },
      remove: function remove(name) {
        this.write(name, "", Date.now() - 864e5);
      }
    };
  }()
) : (
  // Non standard browser env (web workers, react-native) lack needed support.
  function nonStandardBrowserEnv() {
    return {
      write: function write() {
      },
      read: function read() {
        return null;
      },
      remove: function remove() {
      }
    };
  }()
);
function isAbsoluteURL(url) {
  return /^([a-z][a-z\d+\-.]*:)?\/\//i.test(url);
}
function combineURLs(baseURL, relativeURL) {
  return relativeURL ? baseURL.replace(/\/+$/, "") + "/" + relativeURL.replace(/^\/+/, "") : baseURL;
}
function buildFullPath(baseURL, requestedURL) {
  if (baseURL && !isAbsoluteURL(requestedURL)) {
    return combineURLs(baseURL, requestedURL);
  }
  return requestedURL;
}
const isURLSameOrigin = platform.isStandardBrowserEnv ? (
  // Standard browser envs have full support of the APIs needed to test
  // whether the request URL is of the same origin as current location.
  function standardBrowserEnv2() {
    const msie = /(msie|trident)/i.test(navigator.userAgent);
    const urlParsingNode = document.createElement("a");
    let originURL;
    function resolveURL(url) {
      let href = url;
      if (msie) {
        urlParsingNode.setAttribute("href", href);
        href = urlParsingNode.href;
      }
      urlParsingNode.setAttribute("href", href);
      return {
        href: urlParsingNode.href,
        protocol: urlParsingNode.protocol ? urlParsingNode.protocol.replace(/:$/, "") : "",
        host: urlParsingNode.host,
        search: urlParsingNode.search ? urlParsingNode.search.replace(/^\?/, "") : "",
        hash: urlParsingNode.hash ? urlParsingNode.hash.replace(/^#/, "") : "",
        hostname: urlParsingNode.hostname,
        port: urlParsingNode.port,
        pathname: urlParsingNode.pathname.charAt(0) === "/" ? urlParsingNode.pathname : "/" + urlParsingNode.pathname
      };
    }
    originURL = resolveURL(window.location.href);
    return function isURLSameOrigin2(requestURL) {
      const parsed = utils.isString(requestURL) ? resolveURL(requestURL) : requestURL;
      return parsed.protocol === originURL.protocol && parsed.host === originURL.host;
    };
  }()
) : (
  // Non standard browser envs (web workers, react-native) lack needed support.
  function nonStandardBrowserEnv2() {
    return function isURLSameOrigin2() {
      return true;
    };
  }()
);
function parseProtocol(url) {
  const match = /^([-+\w]{1,25})(:?\/\/|:)/.exec(url);
  return match && match[1] || "";
}
function speedometer(samplesCount, min) {
  samplesCount = samplesCount || 10;
  const bytes = new Array(samplesCount);
  const timestamps = new Array(samplesCount);
  let head = 0;
  let tail = 0;
  let firstSampleTS;
  min = min !== void 0 ? min : 1e3;
  return function push(chunkLength) {
    const now = Date.now();
    const startedAt = timestamps[tail];
    if (!firstSampleTS) {
      firstSampleTS = now;
    }
    bytes[head] = chunkLength;
    timestamps[head] = now;
    let i = tail;
    let bytesCount = 0;
    while (i !== head) {
      bytesCount += bytes[i++];
      i = i % samplesCount;
    }
    head = (head + 1) % samplesCount;
    if (head === tail) {
      tail = (tail + 1) % samplesCount;
    }
    if (now - firstSampleTS < min) {
      return;
    }
    const passed = startedAt && now - startedAt;
    return passed ? Math.round(bytesCount * 1e3 / passed) : void 0;
  };
}
function progressEventReducer(listener, isDownloadStream) {
  let bytesNotified = 0;
  const _speedometer = speedometer(50, 250);
  return (e2) => {
    const loaded = e2.loaded;
    const total = e2.lengthComputable ? e2.total : void 0;
    const progressBytes = loaded - bytesNotified;
    const rate = _speedometer(progressBytes);
    const inRange = loaded <= total;
    bytesNotified = loaded;
    const data = {
      loaded,
      total,
      progress: total ? loaded / total : void 0,
      bytes: progressBytes,
      rate: rate ? rate : void 0,
      estimated: rate && total && inRange ? (total - loaded) / rate : void 0,
      event: e2
    };
    data[isDownloadStream ? "download" : "upload"] = true;
    listener(data);
  };
}
const isXHRAdapterSupported = typeof XMLHttpRequest !== "undefined";
const xhrAdapter = isXHRAdapterSupported && function(config) {
  return new Promise(function dispatchXhrRequest(resolve, reject) {
    let requestData = config.data;
    const requestHeaders = AxiosHeaders$1.from(config.headers).normalize();
    const responseType = config.responseType;
    let onCanceled;
    function done() {
      if (config.cancelToken) {
        config.cancelToken.unsubscribe(onCanceled);
      }
      if (config.signal) {
        config.signal.removeEventListener("abort", onCanceled);
      }
    }
    if (utils.isFormData(requestData)) {
      if (platform.isStandardBrowserEnv || platform.isStandardBrowserWebWorkerEnv) {
        requestHeaders.setContentType(false);
      } else {
        requestHeaders.setContentType("multipart/form-data;", false);
      }
    }
    let request = new XMLHttpRequest();
    if (config.auth) {
      const username = config.auth.username || "";
      const password = config.auth.password ? unescape(encodeURIComponent(config.auth.password)) : "";
      requestHeaders.set("Authorization", "Basic " + btoa(username + ":" + password));
    }
    const fullPath = buildFullPath(config.baseURL, config.url);
    request.open(config.method.toUpperCase(), buildURL(fullPath, config.params, config.paramsSerializer), true);
    request.timeout = config.timeout;
    function onloadend() {
      if (!request) {
        return;
      }
      const responseHeaders = AxiosHeaders$1.from(
        "getAllResponseHeaders" in request && request.getAllResponseHeaders()
      );
      const responseData = !responseType || responseType === "text" || responseType === "json" ? request.responseText : request.response;
      const response = {
        data: responseData,
        status: request.status,
        statusText: request.statusText,
        headers: responseHeaders,
        config,
        request
      };
      settle(function _resolve(value) {
        resolve(value);
        done();
      }, function _reject(err) {
        reject(err);
        done();
      }, response);
      request = null;
    }
    if ("onloadend" in request) {
      request.onloadend = onloadend;
    } else {
      request.onreadystatechange = function handleLoad() {
        if (!request || request.readyState !== 4) {
          return;
        }
        if (request.status === 0 && !(request.responseURL && request.responseURL.indexOf("file:") === 0)) {
          return;
        }
        setTimeout(onloadend);
      };
    }
    request.onabort = function handleAbort() {
      if (!request) {
        return;
      }
      reject(new AxiosError("Request aborted", AxiosError.ECONNABORTED, config, request));
      request = null;
    };
    request.onerror = function handleError() {
      reject(new AxiosError("Network Error", AxiosError.ERR_NETWORK, config, request));
      request = null;
    };
    request.ontimeout = function handleTimeout() {
      let timeoutErrorMessage = config.timeout ? "timeout of " + config.timeout + "ms exceeded" : "timeout exceeded";
      const transitional2 = config.transitional || transitionalDefaults;
      if (config.timeoutErrorMessage) {
        timeoutErrorMessage = config.timeoutErrorMessage;
      }
      reject(new AxiosError(
        timeoutErrorMessage,
        transitional2.clarifyTimeoutError ? AxiosError.ETIMEDOUT : AxiosError.ECONNABORTED,
        config,
        request
      ));
      request = null;
    };
    if (platform.isStandardBrowserEnv) {
      const xsrfValue = (config.withCredentials || isURLSameOrigin(fullPath)) && config.xsrfCookieName && cookies.read(config.xsrfCookieName);
      if (xsrfValue) {
        requestHeaders.set(config.xsrfHeaderName, xsrfValue);
      }
    }
    requestData === void 0 && requestHeaders.setContentType(null);
    if ("setRequestHeader" in request) {
      utils.forEach(requestHeaders.toJSON(), function setRequestHeader(val, key) {
        request.setRequestHeader(key, val);
      });
    }
    if (!utils.isUndefined(config.withCredentials)) {
      request.withCredentials = !!config.withCredentials;
    }
    if (responseType && responseType !== "json") {
      request.responseType = config.responseType;
    }
    if (typeof config.onDownloadProgress === "function") {
      request.addEventListener("progress", progressEventReducer(config.onDownloadProgress, true));
    }
    if (typeof config.onUploadProgress === "function" && request.upload) {
      request.upload.addEventListener("progress", progressEventReducer(config.onUploadProgress));
    }
    if (config.cancelToken || config.signal) {
      onCanceled = (cancel) => {
        if (!request) {
          return;
        }
        reject(!cancel || cancel.type ? new CanceledError(null, config, request) : cancel);
        request.abort();
        request = null;
      };
      config.cancelToken && config.cancelToken.subscribe(onCanceled);
      if (config.signal) {
        config.signal.aborted ? onCanceled() : config.signal.addEventListener("abort", onCanceled);
      }
    }
    const protocol = parseProtocol(fullPath);
    if (protocol && platform.protocols.indexOf(protocol) === -1) {
      reject(new AxiosError("Unsupported protocol " + protocol + ":", AxiosError.ERR_BAD_REQUEST, config));
      return;
    }
    request.send(requestData || null);
  });
};
const knownAdapters = {
  http: httpAdapter,
  xhr: xhrAdapter
};
utils.forEach(knownAdapters, (fn, value) => {
  if (fn) {
    try {
      Object.defineProperty(fn, "name", { value });
    } catch (e2) {
    }
    Object.defineProperty(fn, "adapterName", { value });
  }
});
const adapters = {
  getAdapter: (adapters2) => {
    adapters2 = utils.isArray(adapters2) ? adapters2 : [adapters2];
    const { length } = adapters2;
    let nameOrAdapter;
    let adapter;
    for (let i = 0; i < length; i++) {
      nameOrAdapter = adapters2[i];
      if (adapter = utils.isString(nameOrAdapter) ? knownAdapters[nameOrAdapter.toLowerCase()] : nameOrAdapter) {
        break;
      }
    }
    if (!adapter) {
      if (adapter === false) {
        throw new AxiosError(
          `Adapter ${nameOrAdapter} is not supported by the environment`,
          "ERR_NOT_SUPPORT"
        );
      }
      throw new Error(
        utils.hasOwnProp(knownAdapters, nameOrAdapter) ? `Adapter '${nameOrAdapter}' is not available in the build` : `Unknown adapter '${nameOrAdapter}'`
      );
    }
    if (!utils.isFunction(adapter)) {
      throw new TypeError("adapter is not a function");
    }
    return adapter;
  },
  adapters: knownAdapters
};
function throwIfCancellationRequested(config) {
  if (config.cancelToken) {
    config.cancelToken.throwIfRequested();
  }
  if (config.signal && config.signal.aborted) {
    throw new CanceledError(null, config);
  }
}
function dispatchRequest(config) {
  throwIfCancellationRequested(config);
  config.headers = AxiosHeaders$1.from(config.headers);
  config.data = transformData.call(
    config,
    config.transformRequest
  );
  if (["post", "put", "patch"].indexOf(config.method) !== -1) {
    config.headers.setContentType("application/x-www-form-urlencoded", false);
  }
  const adapter = adapters.getAdapter(config.adapter || defaults$1.adapter);
  return adapter(config).then(function onAdapterResolution(response) {
    throwIfCancellationRequested(config);
    response.data = transformData.call(
      config,
      config.transformResponse,
      response
    );
    response.headers = AxiosHeaders$1.from(response.headers);
    return response;
  }, function onAdapterRejection(reason) {
    if (!isCancel(reason)) {
      throwIfCancellationRequested(config);
      if (reason && reason.response) {
        reason.response.data = transformData.call(
          config,
          config.transformResponse,
          reason.response
        );
        reason.response.headers = AxiosHeaders$1.from(reason.response.headers);
      }
    }
    return Promise.reject(reason);
  });
}
const headersToObject = (thing) => thing instanceof AxiosHeaders$1 ? thing.toJSON() : thing;
function mergeConfig(config1, config2) {
  config2 = config2 || {};
  const config = {};
  function getMergedValue(target, source, caseless) {
    if (utils.isPlainObject(target) && utils.isPlainObject(source)) {
      return utils.merge.call({ caseless }, target, source);
    } else if (utils.isPlainObject(source)) {
      return utils.merge({}, source);
    } else if (utils.isArray(source)) {
      return source.slice();
    }
    return source;
  }
  function mergeDeepProperties(a, b2, caseless) {
    if (!utils.isUndefined(b2)) {
      return getMergedValue(a, b2, caseless);
    } else if (!utils.isUndefined(a)) {
      return getMergedValue(void 0, a, caseless);
    }
  }
  function valueFromConfig2(a, b2) {
    if (!utils.isUndefined(b2)) {
      return getMergedValue(void 0, b2);
    }
  }
  function defaultToConfig2(a, b2) {
    if (!utils.isUndefined(b2)) {
      return getMergedValue(void 0, b2);
    } else if (!utils.isUndefined(a)) {
      return getMergedValue(void 0, a);
    }
  }
  function mergeDirectKeys(a, b2, prop) {
    if (prop in config2) {
      return getMergedValue(a, b2);
    } else if (prop in config1) {
      return getMergedValue(void 0, a);
    }
  }
  const mergeMap = {
    url: valueFromConfig2,
    method: valueFromConfig2,
    data: valueFromConfig2,
    baseURL: defaultToConfig2,
    transformRequest: defaultToConfig2,
    transformResponse: defaultToConfig2,
    paramsSerializer: defaultToConfig2,
    timeout: defaultToConfig2,
    timeoutMessage: defaultToConfig2,
    withCredentials: defaultToConfig2,
    adapter: defaultToConfig2,
    responseType: defaultToConfig2,
    xsrfCookieName: defaultToConfig2,
    xsrfHeaderName: defaultToConfig2,
    onUploadProgress: defaultToConfig2,
    onDownloadProgress: defaultToConfig2,
    decompress: defaultToConfig2,
    maxContentLength: defaultToConfig2,
    maxBodyLength: defaultToConfig2,
    beforeRedirect: defaultToConfig2,
    transport: defaultToConfig2,
    httpAgent: defaultToConfig2,
    httpsAgent: defaultToConfig2,
    cancelToken: defaultToConfig2,
    socketPath: defaultToConfig2,
    responseEncoding: defaultToConfig2,
    validateStatus: mergeDirectKeys,
    headers: (a, b2) => mergeDeepProperties(headersToObject(a), headersToObject(b2), true)
  };
  utils.forEach(Object.keys(Object.assign({}, config1, config2)), function computeConfigValue(prop) {
    const merge2 = mergeMap[prop] || mergeDeepProperties;
    const configValue = merge2(config1[prop], config2[prop], prop);
    utils.isUndefined(configValue) && merge2 !== mergeDirectKeys || (config[prop] = configValue);
  });
  return config;
}
const VERSION = "1.4.0";
const validators$1 = {};
["object", "boolean", "number", "function", "string", "symbol"].forEach((type, i) => {
  validators$1[type] = function validator2(thing) {
    return typeof thing === type || "a" + (i < 1 ? "n " : " ") + type;
  };
});
const deprecatedWarnings = {};
validators$1.transitional = function transitional(validator2, version, message) {
  function formatMessage(opt, desc) {
    return "[Axios v" + VERSION + "] Transitional option '" + opt + "'" + desc + (message ? ". " + message : "");
  }
  return (value, opt, opts) => {
    if (validator2 === false) {
      throw new AxiosError(
        formatMessage(opt, " has been removed" + (version ? " in " + version : "")),
        AxiosError.ERR_DEPRECATED
      );
    }
    if (version && !deprecatedWarnings[opt]) {
      deprecatedWarnings[opt] = true;
      console.warn(
        formatMessage(
          opt,
          " has been deprecated since v" + version + " and will be removed in the near future"
        )
      );
    }
    return validator2 ? validator2(value, opt, opts) : true;
  };
};
function assertOptions(options, schema, allowUnknown) {
  if (typeof options !== "object") {
    throw new AxiosError("options must be an object", AxiosError.ERR_BAD_OPTION_VALUE);
  }
  const keys = Object.keys(options);
  let i = keys.length;
  while (i-- > 0) {
    const opt = keys[i];
    const validator2 = schema[opt];
    if (validator2) {
      const value = options[opt];
      const result = value === void 0 || validator2(value, opt, options);
      if (result !== true) {
        throw new AxiosError("option " + opt + " must be " + result, AxiosError.ERR_BAD_OPTION_VALUE);
      }
      continue;
    }
    if (allowUnknown !== true) {
      throw new AxiosError("Unknown option " + opt, AxiosError.ERR_BAD_OPTION);
    }
  }
}
const validator = {
  assertOptions,
  validators: validators$1
};
const validators = validator.validators;
class Axios {
  constructor(instanceConfig) {
    this.defaults = instanceConfig;
    this.interceptors = {
      request: new InterceptorManager$1(),
      response: new InterceptorManager$1()
    };
  }
  /**
   * Dispatch a request
   *
   * @param {String|Object} configOrUrl The config specific for this request (merged with this.defaults)
   * @param {?Object} config
   *
   * @returns {Promise} The Promise to be fulfilled
   */
  request(configOrUrl, config) {
    if (typeof configOrUrl === "string") {
      config = config || {};
      config.url = configOrUrl;
    } else {
      config = configOrUrl || {};
    }
    config = mergeConfig(this.defaults, config);
    const { transitional: transitional2, paramsSerializer, headers } = config;
    if (transitional2 !== void 0) {
      validator.assertOptions(transitional2, {
        silentJSONParsing: validators.transitional(validators.boolean),
        forcedJSONParsing: validators.transitional(validators.boolean),
        clarifyTimeoutError: validators.transitional(validators.boolean)
      }, false);
    }
    if (paramsSerializer != null) {
      if (utils.isFunction(paramsSerializer)) {
        config.paramsSerializer = {
          serialize: paramsSerializer
        };
      } else {
        validator.assertOptions(paramsSerializer, {
          encode: validators.function,
          serialize: validators.function
        }, true);
      }
    }
    config.method = (config.method || this.defaults.method || "get").toLowerCase();
    let contextHeaders;
    contextHeaders = headers && utils.merge(
      headers.common,
      headers[config.method]
    );
    contextHeaders && utils.forEach(
      ["delete", "get", "head", "post", "put", "patch", "common"],
      (method) => {
        delete headers[method];
      }
    );
    config.headers = AxiosHeaders$1.concat(contextHeaders, headers);
    const requestInterceptorChain = [];
    let synchronousRequestInterceptors = true;
    this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
      if (typeof interceptor.runWhen === "function" && interceptor.runWhen(config) === false) {
        return;
      }
      synchronousRequestInterceptors = synchronousRequestInterceptors && interceptor.synchronous;
      requestInterceptorChain.unshift(interceptor.fulfilled, interceptor.rejected);
    });
    const responseInterceptorChain = [];
    this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
      responseInterceptorChain.push(interceptor.fulfilled, interceptor.rejected);
    });
    let promise;
    let i = 0;
    let len;
    if (!synchronousRequestInterceptors) {
      const chain = [dispatchRequest.bind(this), void 0];
      chain.unshift.apply(chain, requestInterceptorChain);
      chain.push.apply(chain, responseInterceptorChain);
      len = chain.length;
      promise = Promise.resolve(config);
      while (i < len) {
        promise = promise.then(chain[i++], chain[i++]);
      }
      return promise;
    }
    len = requestInterceptorChain.length;
    let newConfig = config;
    i = 0;
    while (i < len) {
      const onFulfilled = requestInterceptorChain[i++];
      const onRejected = requestInterceptorChain[i++];
      try {
        newConfig = onFulfilled(newConfig);
      } catch (error) {
        onRejected.call(this, error);
        break;
      }
    }
    try {
      promise = dispatchRequest.call(this, newConfig);
    } catch (error) {
      return Promise.reject(error);
    }
    i = 0;
    len = responseInterceptorChain.length;
    while (i < len) {
      promise = promise.then(responseInterceptorChain[i++], responseInterceptorChain[i++]);
    }
    return promise;
  }
  getUri(config) {
    config = mergeConfig(this.defaults, config);
    const fullPath = buildFullPath(config.baseURL, config.url);
    return buildURL(fullPath, config.params, config.paramsSerializer);
  }
}
utils.forEach(["delete", "get", "head", "options"], function forEachMethodNoData2(method) {
  Axios.prototype[method] = function(url, config) {
    return this.request(mergeConfig(config || {}, {
      method,
      url,
      data: (config || {}).data
    }));
  };
});
utils.forEach(["post", "put", "patch"], function forEachMethodWithData2(method) {
  function generateHTTPMethod(isForm) {
    return function httpMethod(url, data, config) {
      return this.request(mergeConfig(config || {}, {
        method,
        headers: isForm ? {
          "Content-Type": "multipart/form-data"
        } : {},
        url,
        data
      }));
    };
  }
  Axios.prototype[method] = generateHTTPMethod();
  Axios.prototype[method + "Form"] = generateHTTPMethod(true);
});
const Axios$1 = Axios;
class CancelToken {
  constructor(executor) {
    if (typeof executor !== "function") {
      throw new TypeError("executor must be a function.");
    }
    let resolvePromise;
    this.promise = new Promise(function promiseExecutor(resolve) {
      resolvePromise = resolve;
    });
    const token = this;
    this.promise.then((cancel) => {
      if (!token._listeners)
        return;
      let i = token._listeners.length;
      while (i-- > 0) {
        token._listeners[i](cancel);
      }
      token._listeners = null;
    });
    this.promise.then = (onfulfilled) => {
      let _resolve;
      const promise = new Promise((resolve) => {
        token.subscribe(resolve);
        _resolve = resolve;
      }).then(onfulfilled);
      promise.cancel = function reject() {
        token.unsubscribe(_resolve);
      };
      return promise;
    };
    executor(function cancel(message, config, request) {
      if (token.reason) {
        return;
      }
      token.reason = new CanceledError(message, config, request);
      resolvePromise(token.reason);
    });
  }
  /**
   * Throws a `CanceledError` if cancellation has been requested.
   */
  throwIfRequested() {
    if (this.reason) {
      throw this.reason;
    }
  }
  /**
   * Subscribe to the cancel signal
   */
  subscribe(listener) {
    if (this.reason) {
      listener(this.reason);
      return;
    }
    if (this._listeners) {
      this._listeners.push(listener);
    } else {
      this._listeners = [listener];
    }
  }
  /**
   * Unsubscribe from the cancel signal
   */
  unsubscribe(listener) {
    if (!this._listeners) {
      return;
    }
    const index2 = this._listeners.indexOf(listener);
    if (index2 !== -1) {
      this._listeners.splice(index2, 1);
    }
  }
  /**
   * Returns an object that contains a new `CancelToken` and a function that, when called,
   * cancels the `CancelToken`.
   */
  static source() {
    let cancel;
    const token = new CancelToken(function executor(c2) {
      cancel = c2;
    });
    return {
      token,
      cancel
    };
  }
}
const CancelToken$1 = CancelToken;
function spread(callback) {
  return function wrap(arr) {
    return callback.apply(null, arr);
  };
}
function isAxiosError(payload) {
  return utils.isObject(payload) && payload.isAxiosError === true;
}
const HttpStatusCode = {
  Continue: 100,
  SwitchingProtocols: 101,
  Processing: 102,
  EarlyHints: 103,
  Ok: 200,
  Created: 201,
  Accepted: 202,
  NonAuthoritativeInformation: 203,
  NoContent: 204,
  ResetContent: 205,
  PartialContent: 206,
  MultiStatus: 207,
  AlreadyReported: 208,
  ImUsed: 226,
  MultipleChoices: 300,
  MovedPermanently: 301,
  Found: 302,
  SeeOther: 303,
  NotModified: 304,
  UseProxy: 305,
  Unused: 306,
  TemporaryRedirect: 307,
  PermanentRedirect: 308,
  BadRequest: 400,
  Unauthorized: 401,
  PaymentRequired: 402,
  Forbidden: 403,
  NotFound: 404,
  MethodNotAllowed: 405,
  NotAcceptable: 406,
  ProxyAuthenticationRequired: 407,
  RequestTimeout: 408,
  Conflict: 409,
  Gone: 410,
  LengthRequired: 411,
  PreconditionFailed: 412,
  PayloadTooLarge: 413,
  UriTooLong: 414,
  UnsupportedMediaType: 415,
  RangeNotSatisfiable: 416,
  ExpectationFailed: 417,
  ImATeapot: 418,
  MisdirectedRequest: 421,
  UnprocessableEntity: 422,
  Locked: 423,
  FailedDependency: 424,
  TooEarly: 425,
  UpgradeRequired: 426,
  PreconditionRequired: 428,
  TooManyRequests: 429,
  RequestHeaderFieldsTooLarge: 431,
  UnavailableForLegalReasons: 451,
  InternalServerError: 500,
  NotImplemented: 501,
  BadGateway: 502,
  ServiceUnavailable: 503,
  GatewayTimeout: 504,
  HttpVersionNotSupported: 505,
  VariantAlsoNegotiates: 506,
  InsufficientStorage: 507,
  LoopDetected: 508,
  NotExtended: 510,
  NetworkAuthenticationRequired: 511
};
Object.entries(HttpStatusCode).forEach(([key, value]) => {
  HttpStatusCode[value] = key;
});
const HttpStatusCode$1 = HttpStatusCode;
function createInstance(defaultConfig) {
  const context = new Axios$1(defaultConfig);
  const instance = bind(Axios$1.prototype.request, context);
  utils.extend(instance, Axios$1.prototype, context, { allOwnKeys: true });
  utils.extend(instance, context, null, { allOwnKeys: true });
  instance.create = function create(instanceConfig) {
    return createInstance(mergeConfig(defaultConfig, instanceConfig));
  };
  return instance;
}
const axios$1 = createInstance(defaults$1);
axios$1.Axios = Axios$1;
axios$1.CanceledError = CanceledError;
axios$1.CancelToken = CancelToken$1;
axios$1.isCancel = isCancel;
axios$1.VERSION = VERSION;
axios$1.toFormData = toFormData;
axios$1.AxiosError = AxiosError;
axios$1.Cancel = axios$1.CanceledError;
axios$1.all = function all(promises) {
  return Promise.all(promises);
};
axios$1.spread = spread;
axios$1.isAxiosError = isAxiosError;
axios$1.mergeConfig = mergeConfig;
axios$1.AxiosHeaders = AxiosHeaders$1;
axios$1.formToJSON = (thing) => formDataToJSON(utils.isHTMLForm(thing) ? new FormData(thing) : thing);
axios$1.HttpStatusCode = HttpStatusCode$1;
axios$1.default = axios$1;
const axios$2 = axios$1;
var client = {};
var reactDom = { exports: {} };
var reactDom_production_min = {};
var scheduler = { exports: {} };
var scheduler_production_min = {};
/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
(function(exports) {
  function f2(a, b2) {
    var c2 = a.length;
    a.push(b2);
    a:
      for (; 0 < c2; ) {
        var d2 = c2 - 1 >>> 1, e2 = a[d2];
        if (0 < g2(e2, b2))
          a[d2] = b2, a[c2] = e2, c2 = d2;
        else
          break a;
      }
  }
  function h2(a) {
    return 0 === a.length ? null : a[0];
  }
  function k2(a) {
    if (0 === a.length)
      return null;
    var b2 = a[0], c2 = a.pop();
    if (c2 !== b2) {
      a[0] = c2;
      a:
        for (var d2 = 0, e2 = a.length, w2 = e2 >>> 1; d2 < w2; ) {
          var m2 = 2 * (d2 + 1) - 1, C2 = a[m2], n2 = m2 + 1, x2 = a[n2];
          if (0 > g2(C2, c2))
            n2 < e2 && 0 > g2(x2, C2) ? (a[d2] = x2, a[n2] = c2, d2 = n2) : (a[d2] = C2, a[m2] = c2, d2 = m2);
          else if (n2 < e2 && 0 > g2(x2, c2))
            a[d2] = x2, a[n2] = c2, d2 = n2;
          else
            break a;
        }
    }
    return b2;
  }
  function g2(a, b2) {
    var c2 = a.sortIndex - b2.sortIndex;
    return 0 !== c2 ? c2 : a.id - b2.id;
  }
  if ("object" === typeof performance && "function" === typeof performance.now) {
    var l2 = performance;
    exports.unstable_now = function() {
      return l2.now();
    };
  } else {
    var p2 = Date, q2 = p2.now();
    exports.unstable_now = function() {
      return p2.now() - q2;
    };
  }
  var r2 = [], t2 = [], u2 = 1, v2 = null, y2 = 3, z2 = false, A2 = false, B2 = false, D2 = "function" === typeof setTimeout ? setTimeout : null, E2 = "function" === typeof clearTimeout ? clearTimeout : null, F2 = "undefined" !== typeof setImmediate ? setImmediate : null;
  "undefined" !== typeof navigator && void 0 !== navigator.scheduling && void 0 !== navigator.scheduling.isInputPending && navigator.scheduling.isInputPending.bind(navigator.scheduling);
  function G2(a) {
    for (var b2 = h2(t2); null !== b2; ) {
      if (null === b2.callback)
        k2(t2);
      else if (b2.startTime <= a)
        k2(t2), b2.sortIndex = b2.expirationTime, f2(r2, b2);
      else
        break;
      b2 = h2(t2);
    }
  }
  function H2(a) {
    B2 = false;
    G2(a);
    if (!A2)
      if (null !== h2(r2))
        A2 = true, I2(J2);
      else {
        var b2 = h2(t2);
        null !== b2 && K2(H2, b2.startTime - a);
      }
  }
  function J2(a, b2) {
    A2 = false;
    B2 && (B2 = false, E2(L2), L2 = -1);
    z2 = true;
    var c2 = y2;
    try {
      G2(b2);
      for (v2 = h2(r2); null !== v2 && (!(v2.expirationTime > b2) || a && !M2()); ) {
        var d2 = v2.callback;
        if ("function" === typeof d2) {
          v2.callback = null;
          y2 = v2.priorityLevel;
          var e2 = d2(v2.expirationTime <= b2);
          b2 = exports.unstable_now();
          "function" === typeof e2 ? v2.callback = e2 : v2 === h2(r2) && k2(r2);
          G2(b2);
        } else
          k2(r2);
        v2 = h2(r2);
      }
      if (null !== v2)
        var w2 = true;
      else {
        var m2 = h2(t2);
        null !== m2 && K2(H2, m2.startTime - b2);
        w2 = false;
      }
      return w2;
    } finally {
      v2 = null, y2 = c2, z2 = false;
    }
  }
  var N2 = false, O2 = null, L2 = -1, P2 = 5, Q2 = -1;
  function M2() {
    return exports.unstable_now() - Q2 < P2 ? false : true;
  }
  function R2() {
    if (null !== O2) {
      var a = exports.unstable_now();
      Q2 = a;
      var b2 = true;
      try {
        b2 = O2(true, a);
      } finally {
        b2 ? S2() : (N2 = false, O2 = null);
      }
    } else
      N2 = false;
  }
  var S2;
  if ("function" === typeof F2)
    S2 = function() {
      F2(R2);
    };
  else if ("undefined" !== typeof MessageChannel) {
    var T2 = new MessageChannel(), U2 = T2.port2;
    T2.port1.onmessage = R2;
    S2 = function() {
      U2.postMessage(null);
    };
  } else
    S2 = function() {
      D2(R2, 0);
    };
  function I2(a) {
    O2 = a;
    N2 || (N2 = true, S2());
  }
  function K2(a, b2) {
    L2 = D2(function() {
      a(exports.unstable_now());
    }, b2);
  }
  exports.unstable_IdlePriority = 5;
  exports.unstable_ImmediatePriority = 1;
  exports.unstable_LowPriority = 4;
  exports.unstable_NormalPriority = 3;
  exports.unstable_Profiling = null;
  exports.unstable_UserBlockingPriority = 2;
  exports.unstable_cancelCallback = function(a) {
    a.callback = null;
  };
  exports.unstable_continueExecution = function() {
    A2 || z2 || (A2 = true, I2(J2));
  };
  exports.unstable_forceFrameRate = function(a) {
    0 > a || 125 < a ? console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported") : P2 = 0 < a ? Math.floor(1e3 / a) : 5;
  };
  exports.unstable_getCurrentPriorityLevel = function() {
    return y2;
  };
  exports.unstable_getFirstCallbackNode = function() {
    return h2(r2);
  };
  exports.unstable_next = function(a) {
    switch (y2) {
      case 1:
      case 2:
      case 3:
        var b2 = 3;
        break;
      default:
        b2 = y2;
    }
    var c2 = y2;
    y2 = b2;
    try {
      return a();
    } finally {
      y2 = c2;
    }
  };
  exports.unstable_pauseExecution = function() {
  };
  exports.unstable_requestPaint = function() {
  };
  exports.unstable_runWithPriority = function(a, b2) {
    switch (a) {
      case 1:
      case 2:
      case 3:
      case 4:
      case 5:
        break;
      default:
        a = 3;
    }
    var c2 = y2;
    y2 = a;
    try {
      return b2();
    } finally {
      y2 = c2;
    }
  };
  exports.unstable_scheduleCallback = function(a, b2, c2) {
    var d2 = exports.unstable_now();
    "object" === typeof c2 && null !== c2 ? (c2 = c2.delay, c2 = "number" === typeof c2 && 0 < c2 ? d2 + c2 : d2) : c2 = d2;
    switch (a) {
      case 1:
        var e2 = -1;
        break;
      case 2:
        e2 = 250;
        break;
      case 5:
        e2 = 1073741823;
        break;
      case 4:
        e2 = 1e4;
        break;
      default:
        e2 = 5e3;
    }
    e2 = c2 + e2;
    a = { id: u2++, callback: b2, priorityLevel: a, startTime: c2, expirationTime: e2, sortIndex: -1 };
    c2 > d2 ? (a.sortIndex = c2, f2(t2, a), null === h2(r2) && a === h2(t2) && (B2 ? (E2(L2), L2 = -1) : B2 = true, K2(H2, c2 - d2))) : (a.sortIndex = e2, f2(r2, a), A2 || z2 || (A2 = true, I2(J2)));
    return a;
  };
  exports.unstable_shouldYield = M2;
  exports.unstable_wrapCallback = function(a) {
    var b2 = y2;
    return function() {
      var c2 = y2;
      y2 = b2;
      try {
        return a.apply(this, arguments);
      } finally {
        y2 = c2;
      }
    };
  };
})(scheduler_production_min);
{
  scheduler.exports = scheduler_production_min;
}
var schedulerExports = scheduler.exports;
/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var aa = reactExports, ca = schedulerExports;
function p$4(a) {
  for (var b2 = "https://reactjs.org/docs/error-decoder.html?invariant=" + a, c2 = 1; c2 < arguments.length; c2++)
    b2 += "&args[]=" + encodeURIComponent(arguments[c2]);
  return "Minified React error #" + a + "; visit " + b2 + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
}
var da = /* @__PURE__ */ new Set(), ea = {};
function fa(a, b2) {
  ha(a, b2);
  ha(a + "Capture", b2);
}
function ha(a, b2) {
  ea[a] = b2;
  for (a = 0; a < b2.length; a++)
    da.add(b2[a]);
}
var ia = !("undefined" === typeof window || "undefined" === typeof window.document || "undefined" === typeof window.document.createElement), ja = Object.prototype.hasOwnProperty, ka = /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/, la = {}, ma = {};
function oa(a) {
  if (ja.call(ma, a))
    return true;
  if (ja.call(la, a))
    return false;
  if (ka.test(a))
    return ma[a] = true;
  la[a] = true;
  return false;
}
function pa(a, b2, c2, d2) {
  if (null !== c2 && 0 === c2.type)
    return false;
  switch (typeof b2) {
    case "function":
    case "symbol":
      return true;
    case "boolean":
      if (d2)
        return false;
      if (null !== c2)
        return !c2.acceptsBooleans;
      a = a.toLowerCase().slice(0, 5);
      return "data-" !== a && "aria-" !== a;
    default:
      return false;
  }
}
function qa(a, b2, c2, d2) {
  if (null === b2 || "undefined" === typeof b2 || pa(a, b2, c2, d2))
    return true;
  if (d2)
    return false;
  if (null !== c2)
    switch (c2.type) {
      case 3:
        return !b2;
      case 4:
        return false === b2;
      case 5:
        return isNaN(b2);
      case 6:
        return isNaN(b2) || 1 > b2;
    }
  return false;
}
function v$3(a, b2, c2, d2, e2, f2, g2) {
  this.acceptsBooleans = 2 === b2 || 3 === b2 || 4 === b2;
  this.attributeName = d2;
  this.attributeNamespace = e2;
  this.mustUseProperty = c2;
  this.propertyName = a;
  this.type = b2;
  this.sanitizeURL = f2;
  this.removeEmptyString = g2;
}
var z$1 = {};
"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(a) {
  z$1[a] = new v$3(a, 0, false, a, null, false, false);
});
[["acceptCharset", "accept-charset"], ["className", "class"], ["htmlFor", "for"], ["httpEquiv", "http-equiv"]].forEach(function(a) {
  var b2 = a[0];
  z$1[b2] = new v$3(b2, 1, false, a[1], null, false, false);
});
["contentEditable", "draggable", "spellCheck", "value"].forEach(function(a) {
  z$1[a] = new v$3(a, 2, false, a.toLowerCase(), null, false, false);
});
["autoReverse", "externalResourcesRequired", "focusable", "preserveAlpha"].forEach(function(a) {
  z$1[a] = new v$3(a, 2, false, a, null, false, false);
});
"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(a) {
  z$1[a] = new v$3(a, 3, false, a.toLowerCase(), null, false, false);
});
["checked", "multiple", "muted", "selected"].forEach(function(a) {
  z$1[a] = new v$3(a, 3, true, a, null, false, false);
});
["capture", "download"].forEach(function(a) {
  z$1[a] = new v$3(a, 4, false, a, null, false, false);
});
["cols", "rows", "size", "span"].forEach(function(a) {
  z$1[a] = new v$3(a, 6, false, a, null, false, false);
});
["rowSpan", "start"].forEach(function(a) {
  z$1[a] = new v$3(a, 5, false, a.toLowerCase(), null, false, false);
});
var ra = /[\-:]([a-z])/g;
function sa(a) {
  return a[1].toUpperCase();
}
"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(a) {
  var b2 = a.replace(
    ra,
    sa
  );
  z$1[b2] = new v$3(b2, 1, false, a, null, false, false);
});
"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(a) {
  var b2 = a.replace(ra, sa);
  z$1[b2] = new v$3(b2, 1, false, a, "http://www.w3.org/1999/xlink", false, false);
});
["xml:base", "xml:lang", "xml:space"].forEach(function(a) {
  var b2 = a.replace(ra, sa);
  z$1[b2] = new v$3(b2, 1, false, a, "http://www.w3.org/XML/1998/namespace", false, false);
});
["tabIndex", "crossOrigin"].forEach(function(a) {
  z$1[a] = new v$3(a, 1, false, a.toLowerCase(), null, false, false);
});
z$1.xlinkHref = new v$3("xlinkHref", 1, false, "xlink:href", "http://www.w3.org/1999/xlink", true, false);
["src", "href", "action", "formAction"].forEach(function(a) {
  z$1[a] = new v$3(a, 1, false, a.toLowerCase(), null, true, true);
});
function ta(a, b2, c2, d2) {
  var e2 = z$1.hasOwnProperty(b2) ? z$1[b2] : null;
  if (null !== e2 ? 0 !== e2.type : d2 || !(2 < b2.length) || "o" !== b2[0] && "O" !== b2[0] || "n" !== b2[1] && "N" !== b2[1])
    qa(b2, c2, e2, d2) && (c2 = null), d2 || null === e2 ? oa(b2) && (null === c2 ? a.removeAttribute(b2) : a.setAttribute(b2, "" + c2)) : e2.mustUseProperty ? a[e2.propertyName] = null === c2 ? 3 === e2.type ? false : "" : c2 : (b2 = e2.attributeName, d2 = e2.attributeNamespace, null === c2 ? a.removeAttribute(b2) : (e2 = e2.type, c2 = 3 === e2 || 4 === e2 && true === c2 ? "" : "" + c2, d2 ? a.setAttributeNS(d2, b2, c2) : a.setAttribute(b2, c2)));
}
var ua = aa.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED, va = Symbol.for("react.element"), wa = Symbol.for("react.portal"), ya = Symbol.for("react.fragment"), za = Symbol.for("react.strict_mode"), Aa = Symbol.for("react.profiler"), Ba = Symbol.for("react.provider"), Ca = Symbol.for("react.context"), Da = Symbol.for("react.forward_ref"), Ea = Symbol.for("react.suspense"), Fa = Symbol.for("react.suspense_list"), Ga = Symbol.for("react.memo"), Ha = Symbol.for("react.lazy");
var Ia = Symbol.for("react.offscreen");
var Ja = Symbol.iterator;
function Ka(a) {
  if (null === a || "object" !== typeof a)
    return null;
  a = Ja && a[Ja] || a["@@iterator"];
  return "function" === typeof a ? a : null;
}
var A$1 = Object.assign, La;
function Ma(a) {
  if (void 0 === La)
    try {
      throw Error();
    } catch (c2) {
      var b2 = c2.stack.trim().match(/\n( *(at )?)/);
      La = b2 && b2[1] || "";
    }
  return "\n" + La + a;
}
var Na = false;
function Oa(a, b2) {
  if (!a || Na)
    return "";
  Na = true;
  var c2 = Error.prepareStackTrace;
  Error.prepareStackTrace = void 0;
  try {
    if (b2)
      if (b2 = function() {
        throw Error();
      }, Object.defineProperty(b2.prototype, "props", { set: function() {
        throw Error();
      } }), "object" === typeof Reflect && Reflect.construct) {
        try {
          Reflect.construct(b2, []);
        } catch (l2) {
          var d2 = l2;
        }
        Reflect.construct(a, [], b2);
      } else {
        try {
          b2.call();
        } catch (l2) {
          d2 = l2;
        }
        a.call(b2.prototype);
      }
    else {
      try {
        throw Error();
      } catch (l2) {
        d2 = l2;
      }
      a();
    }
  } catch (l2) {
    if (l2 && d2 && "string" === typeof l2.stack) {
      for (var e2 = l2.stack.split("\n"), f2 = d2.stack.split("\n"), g2 = e2.length - 1, h2 = f2.length - 1; 1 <= g2 && 0 <= h2 && e2[g2] !== f2[h2]; )
        h2--;
      for (; 1 <= g2 && 0 <= h2; g2--, h2--)
        if (e2[g2] !== f2[h2]) {
          if (1 !== g2 || 1 !== h2) {
            do
              if (g2--, h2--, 0 > h2 || e2[g2] !== f2[h2]) {
                var k2 = "\n" + e2[g2].replace(" at new ", " at ");
                a.displayName && k2.includes("<anonymous>") && (k2 = k2.replace("<anonymous>", a.displayName));
                return k2;
              }
            while (1 <= g2 && 0 <= h2);
          }
          break;
        }
    }
  } finally {
    Na = false, Error.prepareStackTrace = c2;
  }
  return (a = a ? a.displayName || a.name : "") ? Ma(a) : "";
}
function Pa(a) {
  switch (a.tag) {
    case 5:
      return Ma(a.type);
    case 16:
      return Ma("Lazy");
    case 13:
      return Ma("Suspense");
    case 19:
      return Ma("SuspenseList");
    case 0:
    case 2:
    case 15:
      return a = Oa(a.type, false), a;
    case 11:
      return a = Oa(a.type.render, false), a;
    case 1:
      return a = Oa(a.type, true), a;
    default:
      return "";
  }
}
function Qa(a) {
  if (null == a)
    return null;
  if ("function" === typeof a)
    return a.displayName || a.name || null;
  if ("string" === typeof a)
    return a;
  switch (a) {
    case ya:
      return "Fragment";
    case wa:
      return "Portal";
    case Aa:
      return "Profiler";
    case za:
      return "StrictMode";
    case Ea:
      return "Suspense";
    case Fa:
      return "SuspenseList";
  }
  if ("object" === typeof a)
    switch (a.$$typeof) {
      case Ca:
        return (a.displayName || "Context") + ".Consumer";
      case Ba:
        return (a._context.displayName || "Context") + ".Provider";
      case Da:
        var b2 = a.render;
        a = a.displayName;
        a || (a = b2.displayName || b2.name || "", a = "" !== a ? "ForwardRef(" + a + ")" : "ForwardRef");
        return a;
      case Ga:
        return b2 = a.displayName || null, null !== b2 ? b2 : Qa(a.type) || "Memo";
      case Ha:
        b2 = a._payload;
        a = a._init;
        try {
          return Qa(a(b2));
        } catch (c2) {
        }
    }
  return null;
}
function Ra(a) {
  var b2 = a.type;
  switch (a.tag) {
    case 24:
      return "Cache";
    case 9:
      return (b2.displayName || "Context") + ".Consumer";
    case 10:
      return (b2._context.displayName || "Context") + ".Provider";
    case 18:
      return "DehydratedFragment";
    case 11:
      return a = b2.render, a = a.displayName || a.name || "", b2.displayName || ("" !== a ? "ForwardRef(" + a + ")" : "ForwardRef");
    case 7:
      return "Fragment";
    case 5:
      return b2;
    case 4:
      return "Portal";
    case 3:
      return "Root";
    case 6:
      return "Text";
    case 16:
      return Qa(b2);
    case 8:
      return b2 === za ? "StrictMode" : "Mode";
    case 22:
      return "Offscreen";
    case 12:
      return "Profiler";
    case 21:
      return "Scope";
    case 13:
      return "Suspense";
    case 19:
      return "SuspenseList";
    case 25:
      return "TracingMarker";
    case 1:
    case 0:
    case 17:
    case 2:
    case 14:
    case 15:
      if ("function" === typeof b2)
        return b2.displayName || b2.name || null;
      if ("string" === typeof b2)
        return b2;
  }
  return null;
}
function Sa(a) {
  switch (typeof a) {
    case "boolean":
    case "number":
    case "string":
    case "undefined":
      return a;
    case "object":
      return a;
    default:
      return "";
  }
}
function Ta(a) {
  var b2 = a.type;
  return (a = a.nodeName) && "input" === a.toLowerCase() && ("checkbox" === b2 || "radio" === b2);
}
function Ua(a) {
  var b2 = Ta(a) ? "checked" : "value", c2 = Object.getOwnPropertyDescriptor(a.constructor.prototype, b2), d2 = "" + a[b2];
  if (!a.hasOwnProperty(b2) && "undefined" !== typeof c2 && "function" === typeof c2.get && "function" === typeof c2.set) {
    var e2 = c2.get, f2 = c2.set;
    Object.defineProperty(a, b2, { configurable: true, get: function() {
      return e2.call(this);
    }, set: function(a2) {
      d2 = "" + a2;
      f2.call(this, a2);
    } });
    Object.defineProperty(a, b2, { enumerable: c2.enumerable });
    return { getValue: function() {
      return d2;
    }, setValue: function(a2) {
      d2 = "" + a2;
    }, stopTracking: function() {
      a._valueTracker = null;
      delete a[b2];
    } };
  }
}
function Va(a) {
  a._valueTracker || (a._valueTracker = Ua(a));
}
function Wa(a) {
  if (!a)
    return false;
  var b2 = a._valueTracker;
  if (!b2)
    return true;
  var c2 = b2.getValue();
  var d2 = "";
  a && (d2 = Ta(a) ? a.checked ? "true" : "false" : a.value);
  a = d2;
  return a !== c2 ? (b2.setValue(a), true) : false;
}
function Xa(a) {
  a = a || ("undefined" !== typeof document ? document : void 0);
  if ("undefined" === typeof a)
    return null;
  try {
    return a.activeElement || a.body;
  } catch (b2) {
    return a.body;
  }
}
function Ya(a, b2) {
  var c2 = b2.checked;
  return A$1({}, b2, { defaultChecked: void 0, defaultValue: void 0, value: void 0, checked: null != c2 ? c2 : a._wrapperState.initialChecked });
}
function Za(a, b2) {
  var c2 = null == b2.defaultValue ? "" : b2.defaultValue, d2 = null != b2.checked ? b2.checked : b2.defaultChecked;
  c2 = Sa(null != b2.value ? b2.value : c2);
  a._wrapperState = { initialChecked: d2, initialValue: c2, controlled: "checkbox" === b2.type || "radio" === b2.type ? null != b2.checked : null != b2.value };
}
function ab(a, b2) {
  b2 = b2.checked;
  null != b2 && ta(a, "checked", b2, false);
}
function bb(a, b2) {
  ab(a, b2);
  var c2 = Sa(b2.value), d2 = b2.type;
  if (null != c2)
    if ("number" === d2) {
      if (0 === c2 && "" === a.value || a.value != c2)
        a.value = "" + c2;
    } else
      a.value !== "" + c2 && (a.value = "" + c2);
  else if ("submit" === d2 || "reset" === d2) {
    a.removeAttribute("value");
    return;
  }
  b2.hasOwnProperty("value") ? cb(a, b2.type, c2) : b2.hasOwnProperty("defaultValue") && cb(a, b2.type, Sa(b2.defaultValue));
  null == b2.checked && null != b2.defaultChecked && (a.defaultChecked = !!b2.defaultChecked);
}
function db(a, b2, c2) {
  if (b2.hasOwnProperty("value") || b2.hasOwnProperty("defaultValue")) {
    var d2 = b2.type;
    if (!("submit" !== d2 && "reset" !== d2 || void 0 !== b2.value && null !== b2.value))
      return;
    b2 = "" + a._wrapperState.initialValue;
    c2 || b2 === a.value || (a.value = b2);
    a.defaultValue = b2;
  }
  c2 = a.name;
  "" !== c2 && (a.name = "");
  a.defaultChecked = !!a._wrapperState.initialChecked;
  "" !== c2 && (a.name = c2);
}
function cb(a, b2, c2) {
  if ("number" !== b2 || Xa(a.ownerDocument) !== a)
    null == c2 ? a.defaultValue = "" + a._wrapperState.initialValue : a.defaultValue !== "" + c2 && (a.defaultValue = "" + c2);
}
var eb = Array.isArray;
function fb(a, b2, c2, d2) {
  a = a.options;
  if (b2) {
    b2 = {};
    for (var e2 = 0; e2 < c2.length; e2++)
      b2["$" + c2[e2]] = true;
    for (c2 = 0; c2 < a.length; c2++)
      e2 = b2.hasOwnProperty("$" + a[c2].value), a[c2].selected !== e2 && (a[c2].selected = e2), e2 && d2 && (a[c2].defaultSelected = true);
  } else {
    c2 = "" + Sa(c2);
    b2 = null;
    for (e2 = 0; e2 < a.length; e2++) {
      if (a[e2].value === c2) {
        a[e2].selected = true;
        d2 && (a[e2].defaultSelected = true);
        return;
      }
      null !== b2 || a[e2].disabled || (b2 = a[e2]);
    }
    null !== b2 && (b2.selected = true);
  }
}
function gb(a, b2) {
  if (null != b2.dangerouslySetInnerHTML)
    throw Error(p$4(91));
  return A$1({}, b2, { value: void 0, defaultValue: void 0, children: "" + a._wrapperState.initialValue });
}
function hb(a, b2) {
  var c2 = b2.value;
  if (null == c2) {
    c2 = b2.children;
    b2 = b2.defaultValue;
    if (null != c2) {
      if (null != b2)
        throw Error(p$4(92));
      if (eb(c2)) {
        if (1 < c2.length)
          throw Error(p$4(93));
        c2 = c2[0];
      }
      b2 = c2;
    }
    null == b2 && (b2 = "");
    c2 = b2;
  }
  a._wrapperState = { initialValue: Sa(c2) };
}
function ib(a, b2) {
  var c2 = Sa(b2.value), d2 = Sa(b2.defaultValue);
  null != c2 && (c2 = "" + c2, c2 !== a.value && (a.value = c2), null == b2.defaultValue && a.defaultValue !== c2 && (a.defaultValue = c2));
  null != d2 && (a.defaultValue = "" + d2);
}
function jb(a) {
  var b2 = a.textContent;
  b2 === a._wrapperState.initialValue && "" !== b2 && null !== b2 && (a.value = b2);
}
function kb(a) {
  switch (a) {
    case "svg":
      return "http://www.w3.org/2000/svg";
    case "math":
      return "http://www.w3.org/1998/Math/MathML";
    default:
      return "http://www.w3.org/1999/xhtml";
  }
}
function lb(a, b2) {
  return null == a || "http://www.w3.org/1999/xhtml" === a ? kb(b2) : "http://www.w3.org/2000/svg" === a && "foreignObject" === b2 ? "http://www.w3.org/1999/xhtml" : a;
}
var mb, nb = function(a) {
  return "undefined" !== typeof MSApp && MSApp.execUnsafeLocalFunction ? function(b2, c2, d2, e2) {
    MSApp.execUnsafeLocalFunction(function() {
      return a(b2, c2, d2, e2);
    });
  } : a;
}(function(a, b2) {
  if ("http://www.w3.org/2000/svg" !== a.namespaceURI || "innerHTML" in a)
    a.innerHTML = b2;
  else {
    mb = mb || document.createElement("div");
    mb.innerHTML = "<svg>" + b2.valueOf().toString() + "</svg>";
    for (b2 = mb.firstChild; a.firstChild; )
      a.removeChild(a.firstChild);
    for (; b2.firstChild; )
      a.appendChild(b2.firstChild);
  }
});
function ob(a, b2) {
  if (b2) {
    var c2 = a.firstChild;
    if (c2 && c2 === a.lastChild && 3 === c2.nodeType) {
      c2.nodeValue = b2;
      return;
    }
  }
  a.textContent = b2;
}
var pb = {
  animationIterationCount: true,
  aspectRatio: true,
  borderImageOutset: true,
  borderImageSlice: true,
  borderImageWidth: true,
  boxFlex: true,
  boxFlexGroup: true,
  boxOrdinalGroup: true,
  columnCount: true,
  columns: true,
  flex: true,
  flexGrow: true,
  flexPositive: true,
  flexShrink: true,
  flexNegative: true,
  flexOrder: true,
  gridArea: true,
  gridRow: true,
  gridRowEnd: true,
  gridRowSpan: true,
  gridRowStart: true,
  gridColumn: true,
  gridColumnEnd: true,
  gridColumnSpan: true,
  gridColumnStart: true,
  fontWeight: true,
  lineClamp: true,
  lineHeight: true,
  opacity: true,
  order: true,
  orphans: true,
  tabSize: true,
  widows: true,
  zIndex: true,
  zoom: true,
  fillOpacity: true,
  floodOpacity: true,
  stopOpacity: true,
  strokeDasharray: true,
  strokeDashoffset: true,
  strokeMiterlimit: true,
  strokeOpacity: true,
  strokeWidth: true
}, qb = ["Webkit", "ms", "Moz", "O"];
Object.keys(pb).forEach(function(a) {
  qb.forEach(function(b2) {
    b2 = b2 + a.charAt(0).toUpperCase() + a.substring(1);
    pb[b2] = pb[a];
  });
});
function rb(a, b2, c2) {
  return null == b2 || "boolean" === typeof b2 || "" === b2 ? "" : c2 || "number" !== typeof b2 || 0 === b2 || pb.hasOwnProperty(a) && pb[a] ? ("" + b2).trim() : b2 + "px";
}
function sb(a, b2) {
  a = a.style;
  for (var c2 in b2)
    if (b2.hasOwnProperty(c2)) {
      var d2 = 0 === c2.indexOf("--"), e2 = rb(c2, b2[c2], d2);
      "float" === c2 && (c2 = "cssFloat");
      d2 ? a.setProperty(c2, e2) : a[c2] = e2;
    }
}
var tb = A$1({ menuitem: true }, { area: true, base: true, br: true, col: true, embed: true, hr: true, img: true, input: true, keygen: true, link: true, meta: true, param: true, source: true, track: true, wbr: true });
function ub(a, b2) {
  if (b2) {
    if (tb[a] && (null != b2.children || null != b2.dangerouslySetInnerHTML))
      throw Error(p$4(137, a));
    if (null != b2.dangerouslySetInnerHTML) {
      if (null != b2.children)
        throw Error(p$4(60));
      if ("object" !== typeof b2.dangerouslySetInnerHTML || !("__html" in b2.dangerouslySetInnerHTML))
        throw Error(p$4(61));
    }
    if (null != b2.style && "object" !== typeof b2.style)
      throw Error(p$4(62));
  }
}
function vb(a, b2) {
  if (-1 === a.indexOf("-"))
    return "string" === typeof b2.is;
  switch (a) {
    case "annotation-xml":
    case "color-profile":
    case "font-face":
    case "font-face-src":
    case "font-face-uri":
    case "font-face-format":
    case "font-face-name":
    case "missing-glyph":
      return false;
    default:
      return true;
  }
}
var wb = null;
function xb(a) {
  a = a.target || a.srcElement || window;
  a.correspondingUseElement && (a = a.correspondingUseElement);
  return 3 === a.nodeType ? a.parentNode : a;
}
var yb = null, zb = null, Ab = null;
function Bb(a) {
  if (a = Cb(a)) {
    if ("function" !== typeof yb)
      throw Error(p$4(280));
    var b2 = a.stateNode;
    b2 && (b2 = Db(b2), yb(a.stateNode, a.type, b2));
  }
}
function Eb(a) {
  zb ? Ab ? Ab.push(a) : Ab = [a] : zb = a;
}
function Fb() {
  if (zb) {
    var a = zb, b2 = Ab;
    Ab = zb = null;
    Bb(a);
    if (b2)
      for (a = 0; a < b2.length; a++)
        Bb(b2[a]);
  }
}
function Gb(a, b2) {
  return a(b2);
}
function Hb() {
}
var Ib = false;
function Jb(a, b2, c2) {
  if (Ib)
    return a(b2, c2);
  Ib = true;
  try {
    return Gb(a, b2, c2);
  } finally {
    if (Ib = false, null !== zb || null !== Ab)
      Hb(), Fb();
  }
}
function Kb(a, b2) {
  var c2 = a.stateNode;
  if (null === c2)
    return null;
  var d2 = Db(c2);
  if (null === d2)
    return null;
  c2 = d2[b2];
  a:
    switch (b2) {
      case "onClick":
      case "onClickCapture":
      case "onDoubleClick":
      case "onDoubleClickCapture":
      case "onMouseDown":
      case "onMouseDownCapture":
      case "onMouseMove":
      case "onMouseMoveCapture":
      case "onMouseUp":
      case "onMouseUpCapture":
      case "onMouseEnter":
        (d2 = !d2.disabled) || (a = a.type, d2 = !("button" === a || "input" === a || "select" === a || "textarea" === a));
        a = !d2;
        break a;
      default:
        a = false;
    }
  if (a)
    return null;
  if (c2 && "function" !== typeof c2)
    throw Error(p$4(231, b2, typeof c2));
  return c2;
}
var Lb = false;
if (ia)
  try {
    var Mb = {};
    Object.defineProperty(Mb, "passive", { get: function() {
      Lb = true;
    } });
    window.addEventListener("test", Mb, Mb);
    window.removeEventListener("test", Mb, Mb);
  } catch (a) {
    Lb = false;
  }
function Nb(a, b2, c2, d2, e2, f2, g2, h2, k2) {
  var l2 = Array.prototype.slice.call(arguments, 3);
  try {
    b2.apply(c2, l2);
  } catch (m2) {
    this.onError(m2);
  }
}
var Ob = false, Pb = null, Qb = false, Rb = null, Sb = { onError: function(a) {
  Ob = true;
  Pb = a;
} };
function Tb(a, b2, c2, d2, e2, f2, g2, h2, k2) {
  Ob = false;
  Pb = null;
  Nb.apply(Sb, arguments);
}
function Ub(a, b2, c2, d2, e2, f2, g2, h2, k2) {
  Tb.apply(this, arguments);
  if (Ob) {
    if (Ob) {
      var l2 = Pb;
      Ob = false;
      Pb = null;
    } else
      throw Error(p$4(198));
    Qb || (Qb = true, Rb = l2);
  }
}
function Vb(a) {
  var b2 = a, c2 = a;
  if (a.alternate)
    for (; b2.return; )
      b2 = b2.return;
  else {
    a = b2;
    do
      b2 = a, 0 !== (b2.flags & 4098) && (c2 = b2.return), a = b2.return;
    while (a);
  }
  return 3 === b2.tag ? c2 : null;
}
function Wb(a) {
  if (13 === a.tag) {
    var b2 = a.memoizedState;
    null === b2 && (a = a.alternate, null !== a && (b2 = a.memoizedState));
    if (null !== b2)
      return b2.dehydrated;
  }
  return null;
}
function Xb(a) {
  if (Vb(a) !== a)
    throw Error(p$4(188));
}
function Yb(a) {
  var b2 = a.alternate;
  if (!b2) {
    b2 = Vb(a);
    if (null === b2)
      throw Error(p$4(188));
    return b2 !== a ? null : a;
  }
  for (var c2 = a, d2 = b2; ; ) {
    var e2 = c2.return;
    if (null === e2)
      break;
    var f2 = e2.alternate;
    if (null === f2) {
      d2 = e2.return;
      if (null !== d2) {
        c2 = d2;
        continue;
      }
      break;
    }
    if (e2.child === f2.child) {
      for (f2 = e2.child; f2; ) {
        if (f2 === c2)
          return Xb(e2), a;
        if (f2 === d2)
          return Xb(e2), b2;
        f2 = f2.sibling;
      }
      throw Error(p$4(188));
    }
    if (c2.return !== d2.return)
      c2 = e2, d2 = f2;
    else {
      for (var g2 = false, h2 = e2.child; h2; ) {
        if (h2 === c2) {
          g2 = true;
          c2 = e2;
          d2 = f2;
          break;
        }
        if (h2 === d2) {
          g2 = true;
          d2 = e2;
          c2 = f2;
          break;
        }
        h2 = h2.sibling;
      }
      if (!g2) {
        for (h2 = f2.child; h2; ) {
          if (h2 === c2) {
            g2 = true;
            c2 = f2;
            d2 = e2;
            break;
          }
          if (h2 === d2) {
            g2 = true;
            d2 = f2;
            c2 = e2;
            break;
          }
          h2 = h2.sibling;
        }
        if (!g2)
          throw Error(p$4(189));
      }
    }
    if (c2.alternate !== d2)
      throw Error(p$4(190));
  }
  if (3 !== c2.tag)
    throw Error(p$4(188));
  return c2.stateNode.current === c2 ? a : b2;
}
function Zb(a) {
  a = Yb(a);
  return null !== a ? $b(a) : null;
}
function $b(a) {
  if (5 === a.tag || 6 === a.tag)
    return a;
  for (a = a.child; null !== a; ) {
    var b2 = $b(a);
    if (null !== b2)
      return b2;
    a = a.sibling;
  }
  return null;
}
var ac = ca.unstable_scheduleCallback, bc = ca.unstable_cancelCallback, cc = ca.unstable_shouldYield, dc = ca.unstable_requestPaint, B = ca.unstable_now, ec = ca.unstable_getCurrentPriorityLevel, fc = ca.unstable_ImmediatePriority, gc = ca.unstable_UserBlockingPriority, hc = ca.unstable_NormalPriority, ic = ca.unstable_LowPriority, jc = ca.unstable_IdlePriority, kc = null, lc = null;
function mc(a) {
  if (lc && "function" === typeof lc.onCommitFiberRoot)
    try {
      lc.onCommitFiberRoot(kc, a, void 0, 128 === (a.current.flags & 128));
    } catch (b2) {
    }
}
var oc = Math.clz32 ? Math.clz32 : nc, pc = Math.log, qc = Math.LN2;
function nc(a) {
  a >>>= 0;
  return 0 === a ? 32 : 31 - (pc(a) / qc | 0) | 0;
}
var rc = 64, sc = 4194304;
function tc(a) {
  switch (a & -a) {
    case 1:
      return 1;
    case 2:
      return 2;
    case 4:
      return 4;
    case 8:
      return 8;
    case 16:
      return 16;
    case 32:
      return 32;
    case 64:
    case 128:
    case 256:
    case 512:
    case 1024:
    case 2048:
    case 4096:
    case 8192:
    case 16384:
    case 32768:
    case 65536:
    case 131072:
    case 262144:
    case 524288:
    case 1048576:
    case 2097152:
      return a & 4194240;
    case 4194304:
    case 8388608:
    case 16777216:
    case 33554432:
    case 67108864:
      return a & 130023424;
    case 134217728:
      return 134217728;
    case 268435456:
      return 268435456;
    case 536870912:
      return 536870912;
    case 1073741824:
      return 1073741824;
    default:
      return a;
  }
}
function uc(a, b2) {
  var c2 = a.pendingLanes;
  if (0 === c2)
    return 0;
  var d2 = 0, e2 = a.suspendedLanes, f2 = a.pingedLanes, g2 = c2 & 268435455;
  if (0 !== g2) {
    var h2 = g2 & ~e2;
    0 !== h2 ? d2 = tc(h2) : (f2 &= g2, 0 !== f2 && (d2 = tc(f2)));
  } else
    g2 = c2 & ~e2, 0 !== g2 ? d2 = tc(g2) : 0 !== f2 && (d2 = tc(f2));
  if (0 === d2)
    return 0;
  if (0 !== b2 && b2 !== d2 && 0 === (b2 & e2) && (e2 = d2 & -d2, f2 = b2 & -b2, e2 >= f2 || 16 === e2 && 0 !== (f2 & 4194240)))
    return b2;
  0 !== (d2 & 4) && (d2 |= c2 & 16);
  b2 = a.entangledLanes;
  if (0 !== b2)
    for (a = a.entanglements, b2 &= d2; 0 < b2; )
      c2 = 31 - oc(b2), e2 = 1 << c2, d2 |= a[c2], b2 &= ~e2;
  return d2;
}
function vc(a, b2) {
  switch (a) {
    case 1:
    case 2:
    case 4:
      return b2 + 250;
    case 8:
    case 16:
    case 32:
    case 64:
    case 128:
    case 256:
    case 512:
    case 1024:
    case 2048:
    case 4096:
    case 8192:
    case 16384:
    case 32768:
    case 65536:
    case 131072:
    case 262144:
    case 524288:
    case 1048576:
    case 2097152:
      return b2 + 5e3;
    case 4194304:
    case 8388608:
    case 16777216:
    case 33554432:
    case 67108864:
      return -1;
    case 134217728:
    case 268435456:
    case 536870912:
    case 1073741824:
      return -1;
    default:
      return -1;
  }
}
function wc(a, b2) {
  for (var c2 = a.suspendedLanes, d2 = a.pingedLanes, e2 = a.expirationTimes, f2 = a.pendingLanes; 0 < f2; ) {
    var g2 = 31 - oc(f2), h2 = 1 << g2, k2 = e2[g2];
    if (-1 === k2) {
      if (0 === (h2 & c2) || 0 !== (h2 & d2))
        e2[g2] = vc(h2, b2);
    } else
      k2 <= b2 && (a.expiredLanes |= h2);
    f2 &= ~h2;
  }
}
function xc(a) {
  a = a.pendingLanes & -1073741825;
  return 0 !== a ? a : a & 1073741824 ? 1073741824 : 0;
}
function yc() {
  var a = rc;
  rc <<= 1;
  0 === (rc & 4194240) && (rc = 64);
  return a;
}
function zc(a) {
  for (var b2 = [], c2 = 0; 31 > c2; c2++)
    b2.push(a);
  return b2;
}
function Ac(a, b2, c2) {
  a.pendingLanes |= b2;
  536870912 !== b2 && (a.suspendedLanes = 0, a.pingedLanes = 0);
  a = a.eventTimes;
  b2 = 31 - oc(b2);
  a[b2] = c2;
}
function Bc(a, b2) {
  var c2 = a.pendingLanes & ~b2;
  a.pendingLanes = b2;
  a.suspendedLanes = 0;
  a.pingedLanes = 0;
  a.expiredLanes &= b2;
  a.mutableReadLanes &= b2;
  a.entangledLanes &= b2;
  b2 = a.entanglements;
  var d2 = a.eventTimes;
  for (a = a.expirationTimes; 0 < c2; ) {
    var e2 = 31 - oc(c2), f2 = 1 << e2;
    b2[e2] = 0;
    d2[e2] = -1;
    a[e2] = -1;
    c2 &= ~f2;
  }
}
function Cc(a, b2) {
  var c2 = a.entangledLanes |= b2;
  for (a = a.entanglements; c2; ) {
    var d2 = 31 - oc(c2), e2 = 1 << d2;
    e2 & b2 | a[d2] & b2 && (a[d2] |= b2);
    c2 &= ~e2;
  }
}
var C = 0;
function Dc(a) {
  a &= -a;
  return 1 < a ? 4 < a ? 0 !== (a & 268435455) ? 16 : 536870912 : 4 : 1;
}
var Ec, Fc, Gc, Hc, Ic, Jc = false, Kc = [], Lc = null, Mc = null, Nc = null, Oc = /* @__PURE__ */ new Map(), Pc = /* @__PURE__ */ new Map(), Qc = [], Rc = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");
function Sc(a, b2) {
  switch (a) {
    case "focusin":
    case "focusout":
      Lc = null;
      break;
    case "dragenter":
    case "dragleave":
      Mc = null;
      break;
    case "mouseover":
    case "mouseout":
      Nc = null;
      break;
    case "pointerover":
    case "pointerout":
      Oc.delete(b2.pointerId);
      break;
    case "gotpointercapture":
    case "lostpointercapture":
      Pc.delete(b2.pointerId);
  }
}
function Tc(a, b2, c2, d2, e2, f2) {
  if (null === a || a.nativeEvent !== f2)
    return a = { blockedOn: b2, domEventName: c2, eventSystemFlags: d2, nativeEvent: f2, targetContainers: [e2] }, null !== b2 && (b2 = Cb(b2), null !== b2 && Fc(b2)), a;
  a.eventSystemFlags |= d2;
  b2 = a.targetContainers;
  null !== e2 && -1 === b2.indexOf(e2) && b2.push(e2);
  return a;
}
function Uc(a, b2, c2, d2, e2) {
  switch (b2) {
    case "focusin":
      return Lc = Tc(Lc, a, b2, c2, d2, e2), true;
    case "dragenter":
      return Mc = Tc(Mc, a, b2, c2, d2, e2), true;
    case "mouseover":
      return Nc = Tc(Nc, a, b2, c2, d2, e2), true;
    case "pointerover":
      var f2 = e2.pointerId;
      Oc.set(f2, Tc(Oc.get(f2) || null, a, b2, c2, d2, e2));
      return true;
    case "gotpointercapture":
      return f2 = e2.pointerId, Pc.set(f2, Tc(Pc.get(f2) || null, a, b2, c2, d2, e2)), true;
  }
  return false;
}
function Vc(a) {
  var b2 = Wc(a.target);
  if (null !== b2) {
    var c2 = Vb(b2);
    if (null !== c2) {
      if (b2 = c2.tag, 13 === b2) {
        if (b2 = Wb(c2), null !== b2) {
          a.blockedOn = b2;
          Ic(a.priority, function() {
            Gc(c2);
          });
          return;
        }
      } else if (3 === b2 && c2.stateNode.current.memoizedState.isDehydrated) {
        a.blockedOn = 3 === c2.tag ? c2.stateNode.containerInfo : null;
        return;
      }
    }
  }
  a.blockedOn = null;
}
function Xc(a) {
  if (null !== a.blockedOn)
    return false;
  for (var b2 = a.targetContainers; 0 < b2.length; ) {
    var c2 = Yc(a.domEventName, a.eventSystemFlags, b2[0], a.nativeEvent);
    if (null === c2) {
      c2 = a.nativeEvent;
      var d2 = new c2.constructor(c2.type, c2);
      wb = d2;
      c2.target.dispatchEvent(d2);
      wb = null;
    } else
      return b2 = Cb(c2), null !== b2 && Fc(b2), a.blockedOn = c2, false;
    b2.shift();
  }
  return true;
}
function Zc(a, b2, c2) {
  Xc(a) && c2.delete(b2);
}
function $c() {
  Jc = false;
  null !== Lc && Xc(Lc) && (Lc = null);
  null !== Mc && Xc(Mc) && (Mc = null);
  null !== Nc && Xc(Nc) && (Nc = null);
  Oc.forEach(Zc);
  Pc.forEach(Zc);
}
function ad(a, b2) {
  a.blockedOn === b2 && (a.blockedOn = null, Jc || (Jc = true, ca.unstable_scheduleCallback(ca.unstable_NormalPriority, $c)));
}
function bd(a) {
  function b2(b3) {
    return ad(b3, a);
  }
  if (0 < Kc.length) {
    ad(Kc[0], a);
    for (var c2 = 1; c2 < Kc.length; c2++) {
      var d2 = Kc[c2];
      d2.blockedOn === a && (d2.blockedOn = null);
    }
  }
  null !== Lc && ad(Lc, a);
  null !== Mc && ad(Mc, a);
  null !== Nc && ad(Nc, a);
  Oc.forEach(b2);
  Pc.forEach(b2);
  for (c2 = 0; c2 < Qc.length; c2++)
    d2 = Qc[c2], d2.blockedOn === a && (d2.blockedOn = null);
  for (; 0 < Qc.length && (c2 = Qc[0], null === c2.blockedOn); )
    Vc(c2), null === c2.blockedOn && Qc.shift();
}
var cd = ua.ReactCurrentBatchConfig, dd = true;
function ed(a, b2, c2, d2) {
  var e2 = C, f2 = cd.transition;
  cd.transition = null;
  try {
    C = 1, fd(a, b2, c2, d2);
  } finally {
    C = e2, cd.transition = f2;
  }
}
function gd(a, b2, c2, d2) {
  var e2 = C, f2 = cd.transition;
  cd.transition = null;
  try {
    C = 4, fd(a, b2, c2, d2);
  } finally {
    C = e2, cd.transition = f2;
  }
}
function fd(a, b2, c2, d2) {
  if (dd) {
    var e2 = Yc(a, b2, c2, d2);
    if (null === e2)
      hd(a, b2, d2, id, c2), Sc(a, d2);
    else if (Uc(e2, a, b2, c2, d2))
      d2.stopPropagation();
    else if (Sc(a, d2), b2 & 4 && -1 < Rc.indexOf(a)) {
      for (; null !== e2; ) {
        var f2 = Cb(e2);
        null !== f2 && Ec(f2);
        f2 = Yc(a, b2, c2, d2);
        null === f2 && hd(a, b2, d2, id, c2);
        if (f2 === e2)
          break;
        e2 = f2;
      }
      null !== e2 && d2.stopPropagation();
    } else
      hd(a, b2, d2, null, c2);
  }
}
var id = null;
function Yc(a, b2, c2, d2) {
  id = null;
  a = xb(d2);
  a = Wc(a);
  if (null !== a)
    if (b2 = Vb(a), null === b2)
      a = null;
    else if (c2 = b2.tag, 13 === c2) {
      a = Wb(b2);
      if (null !== a)
        return a;
      a = null;
    } else if (3 === c2) {
      if (b2.stateNode.current.memoizedState.isDehydrated)
        return 3 === b2.tag ? b2.stateNode.containerInfo : null;
      a = null;
    } else
      b2 !== a && (a = null);
  id = a;
  return null;
}
function jd(a) {
  switch (a) {
    case "cancel":
    case "click":
    case "close":
    case "contextmenu":
    case "copy":
    case "cut":
    case "auxclick":
    case "dblclick":
    case "dragend":
    case "dragstart":
    case "drop":
    case "focusin":
    case "focusout":
    case "input":
    case "invalid":
    case "keydown":
    case "keypress":
    case "keyup":
    case "mousedown":
    case "mouseup":
    case "paste":
    case "pause":
    case "play":
    case "pointercancel":
    case "pointerdown":
    case "pointerup":
    case "ratechange":
    case "reset":
    case "resize":
    case "seeked":
    case "submit":
    case "touchcancel":
    case "touchend":
    case "touchstart":
    case "volumechange":
    case "change":
    case "selectionchange":
    case "textInput":
    case "compositionstart":
    case "compositionend":
    case "compositionupdate":
    case "beforeblur":
    case "afterblur":
    case "beforeinput":
    case "blur":
    case "fullscreenchange":
    case "focus":
    case "hashchange":
    case "popstate":
    case "select":
    case "selectstart":
      return 1;
    case "drag":
    case "dragenter":
    case "dragexit":
    case "dragleave":
    case "dragover":
    case "mousemove":
    case "mouseout":
    case "mouseover":
    case "pointermove":
    case "pointerout":
    case "pointerover":
    case "scroll":
    case "toggle":
    case "touchmove":
    case "wheel":
    case "mouseenter":
    case "mouseleave":
    case "pointerenter":
    case "pointerleave":
      return 4;
    case "message":
      switch (ec()) {
        case fc:
          return 1;
        case gc:
          return 4;
        case hc:
        case ic:
          return 16;
        case jc:
          return 536870912;
        default:
          return 16;
      }
    default:
      return 16;
  }
}
var kd = null, ld = null, md = null;
function nd() {
  if (md)
    return md;
  var a, b2 = ld, c2 = b2.length, d2, e2 = "value" in kd ? kd.value : kd.textContent, f2 = e2.length;
  for (a = 0; a < c2 && b2[a] === e2[a]; a++)
    ;
  var g2 = c2 - a;
  for (d2 = 1; d2 <= g2 && b2[c2 - d2] === e2[f2 - d2]; d2++)
    ;
  return md = e2.slice(a, 1 < d2 ? 1 - d2 : void 0);
}
function od(a) {
  var b2 = a.keyCode;
  "charCode" in a ? (a = a.charCode, 0 === a && 13 === b2 && (a = 13)) : a = b2;
  10 === a && (a = 13);
  return 32 <= a || 13 === a ? a : 0;
}
function pd() {
  return true;
}
function qd() {
  return false;
}
function rd(a) {
  function b2(b3, d2, e2, f2, g2) {
    this._reactName = b3;
    this._targetInst = e2;
    this.type = d2;
    this.nativeEvent = f2;
    this.target = g2;
    this.currentTarget = null;
    for (var c2 in a)
      a.hasOwnProperty(c2) && (b3 = a[c2], this[c2] = b3 ? b3(f2) : f2[c2]);
    this.isDefaultPrevented = (null != f2.defaultPrevented ? f2.defaultPrevented : false === f2.returnValue) ? pd : qd;
    this.isPropagationStopped = qd;
    return this;
  }
  A$1(b2.prototype, { preventDefault: function() {
    this.defaultPrevented = true;
    var a2 = this.nativeEvent;
    a2 && (a2.preventDefault ? a2.preventDefault() : "unknown" !== typeof a2.returnValue && (a2.returnValue = false), this.isDefaultPrevented = pd);
  }, stopPropagation: function() {
    var a2 = this.nativeEvent;
    a2 && (a2.stopPropagation ? a2.stopPropagation() : "unknown" !== typeof a2.cancelBubble && (a2.cancelBubble = true), this.isPropagationStopped = pd);
  }, persist: function() {
  }, isPersistent: pd });
  return b2;
}
var sd = { eventPhase: 0, bubbles: 0, cancelable: 0, timeStamp: function(a) {
  return a.timeStamp || Date.now();
}, defaultPrevented: 0, isTrusted: 0 }, td = rd(sd), ud = A$1({}, sd, { view: 0, detail: 0 }), vd = rd(ud), wd, xd, yd, Ad = A$1({}, ud, { screenX: 0, screenY: 0, clientX: 0, clientY: 0, pageX: 0, pageY: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, getModifierState: zd, button: 0, buttons: 0, relatedTarget: function(a) {
  return void 0 === a.relatedTarget ? a.fromElement === a.srcElement ? a.toElement : a.fromElement : a.relatedTarget;
}, movementX: function(a) {
  if ("movementX" in a)
    return a.movementX;
  a !== yd && (yd && "mousemove" === a.type ? (wd = a.screenX - yd.screenX, xd = a.screenY - yd.screenY) : xd = wd = 0, yd = a);
  return wd;
}, movementY: function(a) {
  return "movementY" in a ? a.movementY : xd;
} }), Bd = rd(Ad), Cd = A$1({}, Ad, { dataTransfer: 0 }), Dd = rd(Cd), Ed = A$1({}, ud, { relatedTarget: 0 }), Fd = rd(Ed), Gd = A$1({}, sd, { animationName: 0, elapsedTime: 0, pseudoElement: 0 }), Hd = rd(Gd), Id = A$1({}, sd, { clipboardData: function(a) {
  return "clipboardData" in a ? a.clipboardData : window.clipboardData;
} }), Jd = rd(Id), Kd = A$1({}, sd, { data: 0 }), Ld = rd(Kd), Md = {
  Esc: "Escape",
  Spacebar: " ",
  Left: "ArrowLeft",
  Up: "ArrowUp",
  Right: "ArrowRight",
  Down: "ArrowDown",
  Del: "Delete",
  Win: "OS",
  Menu: "ContextMenu",
  Apps: "ContextMenu",
  Scroll: "ScrollLock",
  MozPrintableKey: "Unidentified"
}, Nd = {
  8: "Backspace",
  9: "Tab",
  12: "Clear",
  13: "Enter",
  16: "Shift",
  17: "Control",
  18: "Alt",
  19: "Pause",
  20: "CapsLock",
  27: "Escape",
  32: " ",
  33: "PageUp",
  34: "PageDown",
  35: "End",
  36: "Home",
  37: "ArrowLeft",
  38: "ArrowUp",
  39: "ArrowRight",
  40: "ArrowDown",
  45: "Insert",
  46: "Delete",
  112: "F1",
  113: "F2",
  114: "F3",
  115: "F4",
  116: "F5",
  117: "F6",
  118: "F7",
  119: "F8",
  120: "F9",
  121: "F10",
  122: "F11",
  123: "F12",
  144: "NumLock",
  145: "ScrollLock",
  224: "Meta"
}, Od = { Alt: "altKey", Control: "ctrlKey", Meta: "metaKey", Shift: "shiftKey" };
function Pd(a) {
  var b2 = this.nativeEvent;
  return b2.getModifierState ? b2.getModifierState(a) : (a = Od[a]) ? !!b2[a] : false;
}
function zd() {
  return Pd;
}
var Qd = A$1({}, ud, { key: function(a) {
  if (a.key) {
    var b2 = Md[a.key] || a.key;
    if ("Unidentified" !== b2)
      return b2;
  }
  return "keypress" === a.type ? (a = od(a), 13 === a ? "Enter" : String.fromCharCode(a)) : "keydown" === a.type || "keyup" === a.type ? Nd[a.keyCode] || "Unidentified" : "";
}, code: 0, location: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, repeat: 0, locale: 0, getModifierState: zd, charCode: function(a) {
  return "keypress" === a.type ? od(a) : 0;
}, keyCode: function(a) {
  return "keydown" === a.type || "keyup" === a.type ? a.keyCode : 0;
}, which: function(a) {
  return "keypress" === a.type ? od(a) : "keydown" === a.type || "keyup" === a.type ? a.keyCode : 0;
} }), Rd = rd(Qd), Sd = A$1({}, Ad, { pointerId: 0, width: 0, height: 0, pressure: 0, tangentialPressure: 0, tiltX: 0, tiltY: 0, twist: 0, pointerType: 0, isPrimary: 0 }), Td = rd(Sd), Ud = A$1({}, ud, { touches: 0, targetTouches: 0, changedTouches: 0, altKey: 0, metaKey: 0, ctrlKey: 0, shiftKey: 0, getModifierState: zd }), Vd = rd(Ud), Wd = A$1({}, sd, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 }), Xd = rd(Wd), Yd = A$1({}, Ad, {
  deltaX: function(a) {
    return "deltaX" in a ? a.deltaX : "wheelDeltaX" in a ? -a.wheelDeltaX : 0;
  },
  deltaY: function(a) {
    return "deltaY" in a ? a.deltaY : "wheelDeltaY" in a ? -a.wheelDeltaY : "wheelDelta" in a ? -a.wheelDelta : 0;
  },
  deltaZ: 0,
  deltaMode: 0
}), Zd = rd(Yd), $d = [9, 13, 27, 32], ae = ia && "CompositionEvent" in window, be = null;
ia && "documentMode" in document && (be = document.documentMode);
var ce = ia && "TextEvent" in window && !be, de = ia && (!ae || be && 8 < be && 11 >= be), ee = String.fromCharCode(32), fe = false;
function ge(a, b2) {
  switch (a) {
    case "keyup":
      return -1 !== $d.indexOf(b2.keyCode);
    case "keydown":
      return 229 !== b2.keyCode;
    case "keypress":
    case "mousedown":
    case "focusout":
      return true;
    default:
      return false;
  }
}
function he(a) {
  a = a.detail;
  return "object" === typeof a && "data" in a ? a.data : null;
}
var ie = false;
function je(a, b2) {
  switch (a) {
    case "compositionend":
      return he(b2);
    case "keypress":
      if (32 !== b2.which)
        return null;
      fe = true;
      return ee;
    case "textInput":
      return a = b2.data, a === ee && fe ? null : a;
    default:
      return null;
  }
}
function ke(a, b2) {
  if (ie)
    return "compositionend" === a || !ae && ge(a, b2) ? (a = nd(), md = ld = kd = null, ie = false, a) : null;
  switch (a) {
    case "paste":
      return null;
    case "keypress":
      if (!(b2.ctrlKey || b2.altKey || b2.metaKey) || b2.ctrlKey && b2.altKey) {
        if (b2.char && 1 < b2.char.length)
          return b2.char;
        if (b2.which)
          return String.fromCharCode(b2.which);
      }
      return null;
    case "compositionend":
      return de && "ko" !== b2.locale ? null : b2.data;
    default:
      return null;
  }
}
var le = { color: true, date: true, datetime: true, "datetime-local": true, email: true, month: true, number: true, password: true, range: true, search: true, tel: true, text: true, time: true, url: true, week: true };
function me(a) {
  var b2 = a && a.nodeName && a.nodeName.toLowerCase();
  return "input" === b2 ? !!le[a.type] : "textarea" === b2 ? true : false;
}
function ne(a, b2, c2, d2) {
  Eb(d2);
  b2 = oe(b2, "onChange");
  0 < b2.length && (c2 = new td("onChange", "change", null, c2, d2), a.push({ event: c2, listeners: b2 }));
}
var pe = null, qe = null;
function re(a) {
  se(a, 0);
}
function te(a) {
  var b2 = ue(a);
  if (Wa(b2))
    return a;
}
function ve(a, b2) {
  if ("change" === a)
    return b2;
}
var we = false;
if (ia) {
  var xe;
  if (ia) {
    var ye = "oninput" in document;
    if (!ye) {
      var ze = document.createElement("div");
      ze.setAttribute("oninput", "return;");
      ye = "function" === typeof ze.oninput;
    }
    xe = ye;
  } else
    xe = false;
  we = xe && (!document.documentMode || 9 < document.documentMode);
}
function Ae() {
  pe && (pe.detachEvent("onpropertychange", Be), qe = pe = null);
}
function Be(a) {
  if ("value" === a.propertyName && te(qe)) {
    var b2 = [];
    ne(b2, qe, a, xb(a));
    Jb(re, b2);
  }
}
function Ce(a, b2, c2) {
  "focusin" === a ? (Ae(), pe = b2, qe = c2, pe.attachEvent("onpropertychange", Be)) : "focusout" === a && Ae();
}
function De(a) {
  if ("selectionchange" === a || "keyup" === a || "keydown" === a)
    return te(qe);
}
function Ee(a, b2) {
  if ("click" === a)
    return te(b2);
}
function Fe(a, b2) {
  if ("input" === a || "change" === a)
    return te(b2);
}
function Ge(a, b2) {
  return a === b2 && (0 !== a || 1 / a === 1 / b2) || a !== a && b2 !== b2;
}
var He = "function" === typeof Object.is ? Object.is : Ge;
function Ie(a, b2) {
  if (He(a, b2))
    return true;
  if ("object" !== typeof a || null === a || "object" !== typeof b2 || null === b2)
    return false;
  var c2 = Object.keys(a), d2 = Object.keys(b2);
  if (c2.length !== d2.length)
    return false;
  for (d2 = 0; d2 < c2.length; d2++) {
    var e2 = c2[d2];
    if (!ja.call(b2, e2) || !He(a[e2], b2[e2]))
      return false;
  }
  return true;
}
function Je(a) {
  for (; a && a.firstChild; )
    a = a.firstChild;
  return a;
}
function Ke(a, b2) {
  var c2 = Je(a);
  a = 0;
  for (var d2; c2; ) {
    if (3 === c2.nodeType) {
      d2 = a + c2.textContent.length;
      if (a <= b2 && d2 >= b2)
        return { node: c2, offset: b2 - a };
      a = d2;
    }
    a: {
      for (; c2; ) {
        if (c2.nextSibling) {
          c2 = c2.nextSibling;
          break a;
        }
        c2 = c2.parentNode;
      }
      c2 = void 0;
    }
    c2 = Je(c2);
  }
}
function Le(a, b2) {
  return a && b2 ? a === b2 ? true : a && 3 === a.nodeType ? false : b2 && 3 === b2.nodeType ? Le(a, b2.parentNode) : "contains" in a ? a.contains(b2) : a.compareDocumentPosition ? !!(a.compareDocumentPosition(b2) & 16) : false : false;
}
function Me() {
  for (var a = window, b2 = Xa(); b2 instanceof a.HTMLIFrameElement; ) {
    try {
      var c2 = "string" === typeof b2.contentWindow.location.href;
    } catch (d2) {
      c2 = false;
    }
    if (c2)
      a = b2.contentWindow;
    else
      break;
    b2 = Xa(a.document);
  }
  return b2;
}
function Ne(a) {
  var b2 = a && a.nodeName && a.nodeName.toLowerCase();
  return b2 && ("input" === b2 && ("text" === a.type || "search" === a.type || "tel" === a.type || "url" === a.type || "password" === a.type) || "textarea" === b2 || "true" === a.contentEditable);
}
function Oe(a) {
  var b2 = Me(), c2 = a.focusedElem, d2 = a.selectionRange;
  if (b2 !== c2 && c2 && c2.ownerDocument && Le(c2.ownerDocument.documentElement, c2)) {
    if (null !== d2 && Ne(c2)) {
      if (b2 = d2.start, a = d2.end, void 0 === a && (a = b2), "selectionStart" in c2)
        c2.selectionStart = b2, c2.selectionEnd = Math.min(a, c2.value.length);
      else if (a = (b2 = c2.ownerDocument || document) && b2.defaultView || window, a.getSelection) {
        a = a.getSelection();
        var e2 = c2.textContent.length, f2 = Math.min(d2.start, e2);
        d2 = void 0 === d2.end ? f2 : Math.min(d2.end, e2);
        !a.extend && f2 > d2 && (e2 = d2, d2 = f2, f2 = e2);
        e2 = Ke(c2, f2);
        var g2 = Ke(
          c2,
          d2
        );
        e2 && g2 && (1 !== a.rangeCount || a.anchorNode !== e2.node || a.anchorOffset !== e2.offset || a.focusNode !== g2.node || a.focusOffset !== g2.offset) && (b2 = b2.createRange(), b2.setStart(e2.node, e2.offset), a.removeAllRanges(), f2 > d2 ? (a.addRange(b2), a.extend(g2.node, g2.offset)) : (b2.setEnd(g2.node, g2.offset), a.addRange(b2)));
      }
    }
    b2 = [];
    for (a = c2; a = a.parentNode; )
      1 === a.nodeType && b2.push({ element: a, left: a.scrollLeft, top: a.scrollTop });
    "function" === typeof c2.focus && c2.focus();
    for (c2 = 0; c2 < b2.length; c2++)
      a = b2[c2], a.element.scrollLeft = a.left, a.element.scrollTop = a.top;
  }
}
var Pe = ia && "documentMode" in document && 11 >= document.documentMode, Qe = null, Re = null, Se = null, Te = false;
function Ue(a, b2, c2) {
  var d2 = c2.window === c2 ? c2.document : 9 === c2.nodeType ? c2 : c2.ownerDocument;
  Te || null == Qe || Qe !== Xa(d2) || (d2 = Qe, "selectionStart" in d2 && Ne(d2) ? d2 = { start: d2.selectionStart, end: d2.selectionEnd } : (d2 = (d2.ownerDocument && d2.ownerDocument.defaultView || window).getSelection(), d2 = { anchorNode: d2.anchorNode, anchorOffset: d2.anchorOffset, focusNode: d2.focusNode, focusOffset: d2.focusOffset }), Se && Ie(Se, d2) || (Se = d2, d2 = oe(Re, "onSelect"), 0 < d2.length && (b2 = new td("onSelect", "select", null, b2, c2), a.push({ event: b2, listeners: d2 }), b2.target = Qe)));
}
function Ve(a, b2) {
  var c2 = {};
  c2[a.toLowerCase()] = b2.toLowerCase();
  c2["Webkit" + a] = "webkit" + b2;
  c2["Moz" + a] = "moz" + b2;
  return c2;
}
var We = { animationend: Ve("Animation", "AnimationEnd"), animationiteration: Ve("Animation", "AnimationIteration"), animationstart: Ve("Animation", "AnimationStart"), transitionend: Ve("Transition", "TransitionEnd") }, Xe = {}, Ye = {};
ia && (Ye = document.createElement("div").style, "AnimationEvent" in window || (delete We.animationend.animation, delete We.animationiteration.animation, delete We.animationstart.animation), "TransitionEvent" in window || delete We.transitionend.transition);
function Ze(a) {
  if (Xe[a])
    return Xe[a];
  if (!We[a])
    return a;
  var b2 = We[a], c2;
  for (c2 in b2)
    if (b2.hasOwnProperty(c2) && c2 in Ye)
      return Xe[a] = b2[c2];
  return a;
}
var $e = Ze("animationend"), af = Ze("animationiteration"), bf = Ze("animationstart"), cf = Ze("transitionend"), df = /* @__PURE__ */ new Map(), ef = "abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");
function ff(a, b2) {
  df.set(a, b2);
  fa(b2, [a]);
}
for (var gf = 0; gf < ef.length; gf++) {
  var hf = ef[gf], jf = hf.toLowerCase(), kf = hf[0].toUpperCase() + hf.slice(1);
  ff(jf, "on" + kf);
}
ff($e, "onAnimationEnd");
ff(af, "onAnimationIteration");
ff(bf, "onAnimationStart");
ff("dblclick", "onDoubleClick");
ff("focusin", "onFocus");
ff("focusout", "onBlur");
ff(cf, "onTransitionEnd");
ha("onMouseEnter", ["mouseout", "mouseover"]);
ha("onMouseLeave", ["mouseout", "mouseover"]);
ha("onPointerEnter", ["pointerout", "pointerover"]);
ha("onPointerLeave", ["pointerout", "pointerover"]);
fa("onChange", "change click focusin focusout input keydown keyup selectionchange".split(" "));
fa("onSelect", "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));
fa("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]);
fa("onCompositionEnd", "compositionend focusout keydown keypress keyup mousedown".split(" "));
fa("onCompositionStart", "compositionstart focusout keydown keypress keyup mousedown".split(" "));
fa("onCompositionUpdate", "compositionupdate focusout keydown keypress keyup mousedown".split(" "));
var lf = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "), mf = new Set("cancel close invalid load scroll toggle".split(" ").concat(lf));
function nf(a, b2, c2) {
  var d2 = a.type || "unknown-event";
  a.currentTarget = c2;
  Ub(d2, b2, void 0, a);
  a.currentTarget = null;
}
function se(a, b2) {
  b2 = 0 !== (b2 & 4);
  for (var c2 = 0; c2 < a.length; c2++) {
    var d2 = a[c2], e2 = d2.event;
    d2 = d2.listeners;
    a: {
      var f2 = void 0;
      if (b2)
        for (var g2 = d2.length - 1; 0 <= g2; g2--) {
          var h2 = d2[g2], k2 = h2.instance, l2 = h2.currentTarget;
          h2 = h2.listener;
          if (k2 !== f2 && e2.isPropagationStopped())
            break a;
          nf(e2, h2, l2);
          f2 = k2;
        }
      else
        for (g2 = 0; g2 < d2.length; g2++) {
          h2 = d2[g2];
          k2 = h2.instance;
          l2 = h2.currentTarget;
          h2 = h2.listener;
          if (k2 !== f2 && e2.isPropagationStopped())
            break a;
          nf(e2, h2, l2);
          f2 = k2;
        }
    }
  }
  if (Qb)
    throw a = Rb, Qb = false, Rb = null, a;
}
function D(a, b2) {
  var c2 = b2[of];
  void 0 === c2 && (c2 = b2[of] = /* @__PURE__ */ new Set());
  var d2 = a + "__bubble";
  c2.has(d2) || (pf(b2, a, 2, false), c2.add(d2));
}
function qf(a, b2, c2) {
  var d2 = 0;
  b2 && (d2 |= 4);
  pf(c2, a, d2, b2);
}
var rf = "_reactListening" + Math.random().toString(36).slice(2);
function sf(a) {
  if (!a[rf]) {
    a[rf] = true;
    da.forEach(function(b3) {
      "selectionchange" !== b3 && (mf.has(b3) || qf(b3, false, a), qf(b3, true, a));
    });
    var b2 = 9 === a.nodeType ? a : a.ownerDocument;
    null === b2 || b2[rf] || (b2[rf] = true, qf("selectionchange", false, b2));
  }
}
function pf(a, b2, c2, d2) {
  switch (jd(b2)) {
    case 1:
      var e2 = ed;
      break;
    case 4:
      e2 = gd;
      break;
    default:
      e2 = fd;
  }
  c2 = e2.bind(null, b2, c2, a);
  e2 = void 0;
  !Lb || "touchstart" !== b2 && "touchmove" !== b2 && "wheel" !== b2 || (e2 = true);
  d2 ? void 0 !== e2 ? a.addEventListener(b2, c2, { capture: true, passive: e2 }) : a.addEventListener(b2, c2, true) : void 0 !== e2 ? a.addEventListener(b2, c2, { passive: e2 }) : a.addEventListener(b2, c2, false);
}
function hd(a, b2, c2, d2, e2) {
  var f2 = d2;
  if (0 === (b2 & 1) && 0 === (b2 & 2) && null !== d2)
    a:
      for (; ; ) {
        if (null === d2)
          return;
        var g2 = d2.tag;
        if (3 === g2 || 4 === g2) {
          var h2 = d2.stateNode.containerInfo;
          if (h2 === e2 || 8 === h2.nodeType && h2.parentNode === e2)
            break;
          if (4 === g2)
            for (g2 = d2.return; null !== g2; ) {
              var k2 = g2.tag;
              if (3 === k2 || 4 === k2) {
                if (k2 = g2.stateNode.containerInfo, k2 === e2 || 8 === k2.nodeType && k2.parentNode === e2)
                  return;
              }
              g2 = g2.return;
            }
          for (; null !== h2; ) {
            g2 = Wc(h2);
            if (null === g2)
              return;
            k2 = g2.tag;
            if (5 === k2 || 6 === k2) {
              d2 = f2 = g2;
              continue a;
            }
            h2 = h2.parentNode;
          }
        }
        d2 = d2.return;
      }
  Jb(function() {
    var d3 = f2, e3 = xb(c2), g3 = [];
    a: {
      var h3 = df.get(a);
      if (void 0 !== h3) {
        var k3 = td, n2 = a;
        switch (a) {
          case "keypress":
            if (0 === od(c2))
              break a;
          case "keydown":
          case "keyup":
            k3 = Rd;
            break;
          case "focusin":
            n2 = "focus";
            k3 = Fd;
            break;
          case "focusout":
            n2 = "blur";
            k3 = Fd;
            break;
          case "beforeblur":
          case "afterblur":
            k3 = Fd;
            break;
          case "click":
            if (2 === c2.button)
              break a;
          case "auxclick":
          case "dblclick":
          case "mousedown":
          case "mousemove":
          case "mouseup":
          case "mouseout":
          case "mouseover":
          case "contextmenu":
            k3 = Bd;
            break;
          case "drag":
          case "dragend":
          case "dragenter":
          case "dragexit":
          case "dragleave":
          case "dragover":
          case "dragstart":
          case "drop":
            k3 = Dd;
            break;
          case "touchcancel":
          case "touchend":
          case "touchmove":
          case "touchstart":
            k3 = Vd;
            break;
          case $e:
          case af:
          case bf:
            k3 = Hd;
            break;
          case cf:
            k3 = Xd;
            break;
          case "scroll":
            k3 = vd;
            break;
          case "wheel":
            k3 = Zd;
            break;
          case "copy":
          case "cut":
          case "paste":
            k3 = Jd;
            break;
          case "gotpointercapture":
          case "lostpointercapture":
          case "pointercancel":
          case "pointerdown":
          case "pointermove":
          case "pointerout":
          case "pointerover":
          case "pointerup":
            k3 = Td;
        }
        var t2 = 0 !== (b2 & 4), J2 = !t2 && "scroll" === a, x2 = t2 ? null !== h3 ? h3 + "Capture" : null : h3;
        t2 = [];
        for (var w2 = d3, u2; null !== w2; ) {
          u2 = w2;
          var F2 = u2.stateNode;
          5 === u2.tag && null !== F2 && (u2 = F2, null !== x2 && (F2 = Kb(w2, x2), null != F2 && t2.push(tf(w2, F2, u2))));
          if (J2)
            break;
          w2 = w2.return;
        }
        0 < t2.length && (h3 = new k3(h3, n2, null, c2, e3), g3.push({ event: h3, listeners: t2 }));
      }
    }
    if (0 === (b2 & 7)) {
      a: {
        h3 = "mouseover" === a || "pointerover" === a;
        k3 = "mouseout" === a || "pointerout" === a;
        if (h3 && c2 !== wb && (n2 = c2.relatedTarget || c2.fromElement) && (Wc(n2) || n2[uf]))
          break a;
        if (k3 || h3) {
          h3 = e3.window === e3 ? e3 : (h3 = e3.ownerDocument) ? h3.defaultView || h3.parentWindow : window;
          if (k3) {
            if (n2 = c2.relatedTarget || c2.toElement, k3 = d3, n2 = n2 ? Wc(n2) : null, null !== n2 && (J2 = Vb(n2), n2 !== J2 || 5 !== n2.tag && 6 !== n2.tag))
              n2 = null;
          } else
            k3 = null, n2 = d3;
          if (k3 !== n2) {
            t2 = Bd;
            F2 = "onMouseLeave";
            x2 = "onMouseEnter";
            w2 = "mouse";
            if ("pointerout" === a || "pointerover" === a)
              t2 = Td, F2 = "onPointerLeave", x2 = "onPointerEnter", w2 = "pointer";
            J2 = null == k3 ? h3 : ue(k3);
            u2 = null == n2 ? h3 : ue(n2);
            h3 = new t2(F2, w2 + "leave", k3, c2, e3);
            h3.target = J2;
            h3.relatedTarget = u2;
            F2 = null;
            Wc(e3) === d3 && (t2 = new t2(x2, w2 + "enter", n2, c2, e3), t2.target = u2, t2.relatedTarget = J2, F2 = t2);
            J2 = F2;
            if (k3 && n2)
              b: {
                t2 = k3;
                x2 = n2;
                w2 = 0;
                for (u2 = t2; u2; u2 = vf(u2))
                  w2++;
                u2 = 0;
                for (F2 = x2; F2; F2 = vf(F2))
                  u2++;
                for (; 0 < w2 - u2; )
                  t2 = vf(t2), w2--;
                for (; 0 < u2 - w2; )
                  x2 = vf(x2), u2--;
                for (; w2--; ) {
                  if (t2 === x2 || null !== x2 && t2 === x2.alternate)
                    break b;
                  t2 = vf(t2);
                  x2 = vf(x2);
                }
                t2 = null;
              }
            else
              t2 = null;
            null !== k3 && wf(g3, h3, k3, t2, false);
            null !== n2 && null !== J2 && wf(g3, J2, n2, t2, true);
          }
        }
      }
      a: {
        h3 = d3 ? ue(d3) : window;
        k3 = h3.nodeName && h3.nodeName.toLowerCase();
        if ("select" === k3 || "input" === k3 && "file" === h3.type)
          var na = ve;
        else if (me(h3))
          if (we)
            na = Fe;
          else {
            na = De;
            var xa = Ce;
          }
        else
          (k3 = h3.nodeName) && "input" === k3.toLowerCase() && ("checkbox" === h3.type || "radio" === h3.type) && (na = Ee);
        if (na && (na = na(a, d3))) {
          ne(g3, na, c2, e3);
          break a;
        }
        xa && xa(a, h3, d3);
        "focusout" === a && (xa = h3._wrapperState) && xa.controlled && "number" === h3.type && cb(h3, "number", h3.value);
      }
      xa = d3 ? ue(d3) : window;
      switch (a) {
        case "focusin":
          if (me(xa) || "true" === xa.contentEditable)
            Qe = xa, Re = d3, Se = null;
          break;
        case "focusout":
          Se = Re = Qe = null;
          break;
        case "mousedown":
          Te = true;
          break;
        case "contextmenu":
        case "mouseup":
        case "dragend":
          Te = false;
          Ue(g3, c2, e3);
          break;
        case "selectionchange":
          if (Pe)
            break;
        case "keydown":
        case "keyup":
          Ue(g3, c2, e3);
      }
      var $a;
      if (ae)
        b: {
          switch (a) {
            case "compositionstart":
              var ba = "onCompositionStart";
              break b;
            case "compositionend":
              ba = "onCompositionEnd";
              break b;
            case "compositionupdate":
              ba = "onCompositionUpdate";
              break b;
          }
          ba = void 0;
        }
      else
        ie ? ge(a, c2) && (ba = "onCompositionEnd") : "keydown" === a && 229 === c2.keyCode && (ba = "onCompositionStart");
      ba && (de && "ko" !== c2.locale && (ie || "onCompositionStart" !== ba ? "onCompositionEnd" === ba && ie && ($a = nd()) : (kd = e3, ld = "value" in kd ? kd.value : kd.textContent, ie = true)), xa = oe(d3, ba), 0 < xa.length && (ba = new Ld(ba, a, null, c2, e3), g3.push({ event: ba, listeners: xa }), $a ? ba.data = $a : ($a = he(c2), null !== $a && (ba.data = $a))));
      if ($a = ce ? je(a, c2) : ke(a, c2))
        d3 = oe(d3, "onBeforeInput"), 0 < d3.length && (e3 = new Ld("onBeforeInput", "beforeinput", null, c2, e3), g3.push({ event: e3, listeners: d3 }), e3.data = $a);
    }
    se(g3, b2);
  });
}
function tf(a, b2, c2) {
  return { instance: a, listener: b2, currentTarget: c2 };
}
function oe(a, b2) {
  for (var c2 = b2 + "Capture", d2 = []; null !== a; ) {
    var e2 = a, f2 = e2.stateNode;
    5 === e2.tag && null !== f2 && (e2 = f2, f2 = Kb(a, c2), null != f2 && d2.unshift(tf(a, f2, e2)), f2 = Kb(a, b2), null != f2 && d2.push(tf(a, f2, e2)));
    a = a.return;
  }
  return d2;
}
function vf(a) {
  if (null === a)
    return null;
  do
    a = a.return;
  while (a && 5 !== a.tag);
  return a ? a : null;
}
function wf(a, b2, c2, d2, e2) {
  for (var f2 = b2._reactName, g2 = []; null !== c2 && c2 !== d2; ) {
    var h2 = c2, k2 = h2.alternate, l2 = h2.stateNode;
    if (null !== k2 && k2 === d2)
      break;
    5 === h2.tag && null !== l2 && (h2 = l2, e2 ? (k2 = Kb(c2, f2), null != k2 && g2.unshift(tf(c2, k2, h2))) : e2 || (k2 = Kb(c2, f2), null != k2 && g2.push(tf(c2, k2, h2))));
    c2 = c2.return;
  }
  0 !== g2.length && a.push({ event: b2, listeners: g2 });
}
var xf = /\r\n?/g, yf = /\u0000|\uFFFD/g;
function zf(a) {
  return ("string" === typeof a ? a : "" + a).replace(xf, "\n").replace(yf, "");
}
function Af(a, b2, c2) {
  b2 = zf(b2);
  if (zf(a) !== b2 && c2)
    throw Error(p$4(425));
}
function Bf() {
}
var Cf = null, Df = null;
function Ef(a, b2) {
  return "textarea" === a || "noscript" === a || "string" === typeof b2.children || "number" === typeof b2.children || "object" === typeof b2.dangerouslySetInnerHTML && null !== b2.dangerouslySetInnerHTML && null != b2.dangerouslySetInnerHTML.__html;
}
var Ff = "function" === typeof setTimeout ? setTimeout : void 0, Gf = "function" === typeof clearTimeout ? clearTimeout : void 0, Hf = "function" === typeof Promise ? Promise : void 0, Jf = "function" === typeof queueMicrotask ? queueMicrotask : "undefined" !== typeof Hf ? function(a) {
  return Hf.resolve(null).then(a).catch(If);
} : Ff;
function If(a) {
  setTimeout(function() {
    throw a;
  });
}
function Kf(a, b2) {
  var c2 = b2, d2 = 0;
  do {
    var e2 = c2.nextSibling;
    a.removeChild(c2);
    if (e2 && 8 === e2.nodeType)
      if (c2 = e2.data, "/$" === c2) {
        if (0 === d2) {
          a.removeChild(e2);
          bd(b2);
          return;
        }
        d2--;
      } else
        "$" !== c2 && "$?" !== c2 && "$!" !== c2 || d2++;
    c2 = e2;
  } while (c2);
  bd(b2);
}
function Lf(a) {
  for (; null != a; a = a.nextSibling) {
    var b2 = a.nodeType;
    if (1 === b2 || 3 === b2)
      break;
    if (8 === b2) {
      b2 = a.data;
      if ("$" === b2 || "$!" === b2 || "$?" === b2)
        break;
      if ("/$" === b2)
        return null;
    }
  }
  return a;
}
function Mf(a) {
  a = a.previousSibling;
  for (var b2 = 0; a; ) {
    if (8 === a.nodeType) {
      var c2 = a.data;
      if ("$" === c2 || "$!" === c2 || "$?" === c2) {
        if (0 === b2)
          return a;
        b2--;
      } else
        "/$" === c2 && b2++;
    }
    a = a.previousSibling;
  }
  return null;
}
var Nf = Math.random().toString(36).slice(2), Of = "__reactFiber$" + Nf, Pf = "__reactProps$" + Nf, uf = "__reactContainer$" + Nf, of = "__reactEvents$" + Nf, Qf = "__reactListeners$" + Nf, Rf = "__reactHandles$" + Nf;
function Wc(a) {
  var b2 = a[Of];
  if (b2)
    return b2;
  for (var c2 = a.parentNode; c2; ) {
    if (b2 = c2[uf] || c2[Of]) {
      c2 = b2.alternate;
      if (null !== b2.child || null !== c2 && null !== c2.child)
        for (a = Mf(a); null !== a; ) {
          if (c2 = a[Of])
            return c2;
          a = Mf(a);
        }
      return b2;
    }
    a = c2;
    c2 = a.parentNode;
  }
  return null;
}
function Cb(a) {
  a = a[Of] || a[uf];
  return !a || 5 !== a.tag && 6 !== a.tag && 13 !== a.tag && 3 !== a.tag ? null : a;
}
function ue(a) {
  if (5 === a.tag || 6 === a.tag)
    return a.stateNode;
  throw Error(p$4(33));
}
function Db(a) {
  return a[Pf] || null;
}
var Sf = [], Tf = -1;
function Uf(a) {
  return { current: a };
}
function E(a) {
  0 > Tf || (a.current = Sf[Tf], Sf[Tf] = null, Tf--);
}
function G(a, b2) {
  Tf++;
  Sf[Tf] = a.current;
  a.current = b2;
}
var Vf = {}, H = Uf(Vf), Wf = Uf(false), Xf = Vf;
function Yf(a, b2) {
  var c2 = a.type.contextTypes;
  if (!c2)
    return Vf;
  var d2 = a.stateNode;
  if (d2 && d2.__reactInternalMemoizedUnmaskedChildContext === b2)
    return d2.__reactInternalMemoizedMaskedChildContext;
  var e2 = {}, f2;
  for (f2 in c2)
    e2[f2] = b2[f2];
  d2 && (a = a.stateNode, a.__reactInternalMemoizedUnmaskedChildContext = b2, a.__reactInternalMemoizedMaskedChildContext = e2);
  return e2;
}
function Zf(a) {
  a = a.childContextTypes;
  return null !== a && void 0 !== a;
}
function $f() {
  E(Wf);
  E(H);
}
function ag(a, b2, c2) {
  if (H.current !== Vf)
    throw Error(p$4(168));
  G(H, b2);
  G(Wf, c2);
}
function bg(a, b2, c2) {
  var d2 = a.stateNode;
  b2 = b2.childContextTypes;
  if ("function" !== typeof d2.getChildContext)
    return c2;
  d2 = d2.getChildContext();
  for (var e2 in d2)
    if (!(e2 in b2))
      throw Error(p$4(108, Ra(a) || "Unknown", e2));
  return A$1({}, c2, d2);
}
function cg(a) {
  a = (a = a.stateNode) && a.__reactInternalMemoizedMergedChildContext || Vf;
  Xf = H.current;
  G(H, a);
  G(Wf, Wf.current);
  return true;
}
function dg(a, b2, c2) {
  var d2 = a.stateNode;
  if (!d2)
    throw Error(p$4(169));
  c2 ? (a = bg(a, b2, Xf), d2.__reactInternalMemoizedMergedChildContext = a, E(Wf), E(H), G(H, a)) : E(Wf);
  G(Wf, c2);
}
var eg = null, fg = false, gg = false;
function hg(a) {
  null === eg ? eg = [a] : eg.push(a);
}
function ig(a) {
  fg = true;
  hg(a);
}
function jg() {
  if (!gg && null !== eg) {
    gg = true;
    var a = 0, b2 = C;
    try {
      var c2 = eg;
      for (C = 1; a < c2.length; a++) {
        var d2 = c2[a];
        do
          d2 = d2(true);
        while (null !== d2);
      }
      eg = null;
      fg = false;
    } catch (e2) {
      throw null !== eg && (eg = eg.slice(a + 1)), ac(fc, jg), e2;
    } finally {
      C = b2, gg = false;
    }
  }
  return null;
}
var kg = [], lg = 0, mg = null, ng = 0, og = [], pg = 0, qg = null, rg = 1, sg = "";
function tg(a, b2) {
  kg[lg++] = ng;
  kg[lg++] = mg;
  mg = a;
  ng = b2;
}
function ug(a, b2, c2) {
  og[pg++] = rg;
  og[pg++] = sg;
  og[pg++] = qg;
  qg = a;
  var d2 = rg;
  a = sg;
  var e2 = 32 - oc(d2) - 1;
  d2 &= ~(1 << e2);
  c2 += 1;
  var f2 = 32 - oc(b2) + e2;
  if (30 < f2) {
    var g2 = e2 - e2 % 5;
    f2 = (d2 & (1 << g2) - 1).toString(32);
    d2 >>= g2;
    e2 -= g2;
    rg = 1 << 32 - oc(b2) + e2 | c2 << e2 | d2;
    sg = f2 + a;
  } else
    rg = 1 << f2 | c2 << e2 | d2, sg = a;
}
function vg(a) {
  null !== a.return && (tg(a, 1), ug(a, 1, 0));
}
function wg(a) {
  for (; a === mg; )
    mg = kg[--lg], kg[lg] = null, ng = kg[--lg], kg[lg] = null;
  for (; a === qg; )
    qg = og[--pg], og[pg] = null, sg = og[--pg], og[pg] = null, rg = og[--pg], og[pg] = null;
}
var xg = null, yg = null, I = false, zg = null;
function Ag(a, b2) {
  var c2 = Bg(5, null, null, 0);
  c2.elementType = "DELETED";
  c2.stateNode = b2;
  c2.return = a;
  b2 = a.deletions;
  null === b2 ? (a.deletions = [c2], a.flags |= 16) : b2.push(c2);
}
function Cg(a, b2) {
  switch (a.tag) {
    case 5:
      var c2 = a.type;
      b2 = 1 !== b2.nodeType || c2.toLowerCase() !== b2.nodeName.toLowerCase() ? null : b2;
      return null !== b2 ? (a.stateNode = b2, xg = a, yg = Lf(b2.firstChild), true) : false;
    case 6:
      return b2 = "" === a.pendingProps || 3 !== b2.nodeType ? null : b2, null !== b2 ? (a.stateNode = b2, xg = a, yg = null, true) : false;
    case 13:
      return b2 = 8 !== b2.nodeType ? null : b2, null !== b2 ? (c2 = null !== qg ? { id: rg, overflow: sg } : null, a.memoizedState = { dehydrated: b2, treeContext: c2, retryLane: 1073741824 }, c2 = Bg(18, null, null, 0), c2.stateNode = b2, c2.return = a, a.child = c2, xg = a, yg = null, true) : false;
    default:
      return false;
  }
}
function Dg(a) {
  return 0 !== (a.mode & 1) && 0 === (a.flags & 128);
}
function Eg(a) {
  if (I) {
    var b2 = yg;
    if (b2) {
      var c2 = b2;
      if (!Cg(a, b2)) {
        if (Dg(a))
          throw Error(p$4(418));
        b2 = Lf(c2.nextSibling);
        var d2 = xg;
        b2 && Cg(a, b2) ? Ag(d2, c2) : (a.flags = a.flags & -4097 | 2, I = false, xg = a);
      }
    } else {
      if (Dg(a))
        throw Error(p$4(418));
      a.flags = a.flags & -4097 | 2;
      I = false;
      xg = a;
    }
  }
}
function Fg(a) {
  for (a = a.return; null !== a && 5 !== a.tag && 3 !== a.tag && 13 !== a.tag; )
    a = a.return;
  xg = a;
}
function Gg(a) {
  if (a !== xg)
    return false;
  if (!I)
    return Fg(a), I = true, false;
  var b2;
  (b2 = 3 !== a.tag) && !(b2 = 5 !== a.tag) && (b2 = a.type, b2 = "head" !== b2 && "body" !== b2 && !Ef(a.type, a.memoizedProps));
  if (b2 && (b2 = yg)) {
    if (Dg(a))
      throw Hg(), Error(p$4(418));
    for (; b2; )
      Ag(a, b2), b2 = Lf(b2.nextSibling);
  }
  Fg(a);
  if (13 === a.tag) {
    a = a.memoizedState;
    a = null !== a ? a.dehydrated : null;
    if (!a)
      throw Error(p$4(317));
    a: {
      a = a.nextSibling;
      for (b2 = 0; a; ) {
        if (8 === a.nodeType) {
          var c2 = a.data;
          if ("/$" === c2) {
            if (0 === b2) {
              yg = Lf(a.nextSibling);
              break a;
            }
            b2--;
          } else
            "$" !== c2 && "$!" !== c2 && "$?" !== c2 || b2++;
        }
        a = a.nextSibling;
      }
      yg = null;
    }
  } else
    yg = xg ? Lf(a.stateNode.nextSibling) : null;
  return true;
}
function Hg() {
  for (var a = yg; a; )
    a = Lf(a.nextSibling);
}
function Ig() {
  yg = xg = null;
  I = false;
}
function Jg(a) {
  null === zg ? zg = [a] : zg.push(a);
}
var Kg = ua.ReactCurrentBatchConfig;
function Lg(a, b2) {
  if (a && a.defaultProps) {
    b2 = A$1({}, b2);
    a = a.defaultProps;
    for (var c2 in a)
      void 0 === b2[c2] && (b2[c2] = a[c2]);
    return b2;
  }
  return b2;
}
var Mg = Uf(null), Ng = null, Og = null, Pg = null;
function Qg() {
  Pg = Og = Ng = null;
}
function Rg(a) {
  var b2 = Mg.current;
  E(Mg);
  a._currentValue = b2;
}
function Sg(a, b2, c2) {
  for (; null !== a; ) {
    var d2 = a.alternate;
    (a.childLanes & b2) !== b2 ? (a.childLanes |= b2, null !== d2 && (d2.childLanes |= b2)) : null !== d2 && (d2.childLanes & b2) !== b2 && (d2.childLanes |= b2);
    if (a === c2)
      break;
    a = a.return;
  }
}
function Tg(a, b2) {
  Ng = a;
  Pg = Og = null;
  a = a.dependencies;
  null !== a && null !== a.firstContext && (0 !== (a.lanes & b2) && (Ug = true), a.firstContext = null);
}
function Vg(a) {
  var b2 = a._currentValue;
  if (Pg !== a)
    if (a = { context: a, memoizedValue: b2, next: null }, null === Og) {
      if (null === Ng)
        throw Error(p$4(308));
      Og = a;
      Ng.dependencies = { lanes: 0, firstContext: a };
    } else
      Og = Og.next = a;
  return b2;
}
var Wg = null;
function Xg(a) {
  null === Wg ? Wg = [a] : Wg.push(a);
}
function Yg(a, b2, c2, d2) {
  var e2 = b2.interleaved;
  null === e2 ? (c2.next = c2, Xg(b2)) : (c2.next = e2.next, e2.next = c2);
  b2.interleaved = c2;
  return Zg(a, d2);
}
function Zg(a, b2) {
  a.lanes |= b2;
  var c2 = a.alternate;
  null !== c2 && (c2.lanes |= b2);
  c2 = a;
  for (a = a.return; null !== a; )
    a.childLanes |= b2, c2 = a.alternate, null !== c2 && (c2.childLanes |= b2), c2 = a, a = a.return;
  return 3 === c2.tag ? c2.stateNode : null;
}
var $g = false;
function ah(a) {
  a.updateQueue = { baseState: a.memoizedState, firstBaseUpdate: null, lastBaseUpdate: null, shared: { pending: null, interleaved: null, lanes: 0 }, effects: null };
}
function bh(a, b2) {
  a = a.updateQueue;
  b2.updateQueue === a && (b2.updateQueue = { baseState: a.baseState, firstBaseUpdate: a.firstBaseUpdate, lastBaseUpdate: a.lastBaseUpdate, shared: a.shared, effects: a.effects });
}
function ch(a, b2) {
  return { eventTime: a, lane: b2, tag: 0, payload: null, callback: null, next: null };
}
function dh(a, b2, c2) {
  var d2 = a.updateQueue;
  if (null === d2)
    return null;
  d2 = d2.shared;
  if (0 !== (K & 2)) {
    var e2 = d2.pending;
    null === e2 ? b2.next = b2 : (b2.next = e2.next, e2.next = b2);
    d2.pending = b2;
    return Zg(a, c2);
  }
  e2 = d2.interleaved;
  null === e2 ? (b2.next = b2, Xg(d2)) : (b2.next = e2.next, e2.next = b2);
  d2.interleaved = b2;
  return Zg(a, c2);
}
function eh(a, b2, c2) {
  b2 = b2.updateQueue;
  if (null !== b2 && (b2 = b2.shared, 0 !== (c2 & 4194240))) {
    var d2 = b2.lanes;
    d2 &= a.pendingLanes;
    c2 |= d2;
    b2.lanes = c2;
    Cc(a, c2);
  }
}
function fh(a, b2) {
  var c2 = a.updateQueue, d2 = a.alternate;
  if (null !== d2 && (d2 = d2.updateQueue, c2 === d2)) {
    var e2 = null, f2 = null;
    c2 = c2.firstBaseUpdate;
    if (null !== c2) {
      do {
        var g2 = { eventTime: c2.eventTime, lane: c2.lane, tag: c2.tag, payload: c2.payload, callback: c2.callback, next: null };
        null === f2 ? e2 = f2 = g2 : f2 = f2.next = g2;
        c2 = c2.next;
      } while (null !== c2);
      null === f2 ? e2 = f2 = b2 : f2 = f2.next = b2;
    } else
      e2 = f2 = b2;
    c2 = { baseState: d2.baseState, firstBaseUpdate: e2, lastBaseUpdate: f2, shared: d2.shared, effects: d2.effects };
    a.updateQueue = c2;
    return;
  }
  a = c2.lastBaseUpdate;
  null === a ? c2.firstBaseUpdate = b2 : a.next = b2;
  c2.lastBaseUpdate = b2;
}
function gh(a, b2, c2, d2) {
  var e2 = a.updateQueue;
  $g = false;
  var f2 = e2.firstBaseUpdate, g2 = e2.lastBaseUpdate, h2 = e2.shared.pending;
  if (null !== h2) {
    e2.shared.pending = null;
    var k2 = h2, l2 = k2.next;
    k2.next = null;
    null === g2 ? f2 = l2 : g2.next = l2;
    g2 = k2;
    var m2 = a.alternate;
    null !== m2 && (m2 = m2.updateQueue, h2 = m2.lastBaseUpdate, h2 !== g2 && (null === h2 ? m2.firstBaseUpdate = l2 : h2.next = l2, m2.lastBaseUpdate = k2));
  }
  if (null !== f2) {
    var q2 = e2.baseState;
    g2 = 0;
    m2 = l2 = k2 = null;
    h2 = f2;
    do {
      var r2 = h2.lane, y2 = h2.eventTime;
      if ((d2 & r2) === r2) {
        null !== m2 && (m2 = m2.next = {
          eventTime: y2,
          lane: 0,
          tag: h2.tag,
          payload: h2.payload,
          callback: h2.callback,
          next: null
        });
        a: {
          var n2 = a, t2 = h2;
          r2 = b2;
          y2 = c2;
          switch (t2.tag) {
            case 1:
              n2 = t2.payload;
              if ("function" === typeof n2) {
                q2 = n2.call(y2, q2, r2);
                break a;
              }
              q2 = n2;
              break a;
            case 3:
              n2.flags = n2.flags & -65537 | 128;
            case 0:
              n2 = t2.payload;
              r2 = "function" === typeof n2 ? n2.call(y2, q2, r2) : n2;
              if (null === r2 || void 0 === r2)
                break a;
              q2 = A$1({}, q2, r2);
              break a;
            case 2:
              $g = true;
          }
        }
        null !== h2.callback && 0 !== h2.lane && (a.flags |= 64, r2 = e2.effects, null === r2 ? e2.effects = [h2] : r2.push(h2));
      } else
        y2 = { eventTime: y2, lane: r2, tag: h2.tag, payload: h2.payload, callback: h2.callback, next: null }, null === m2 ? (l2 = m2 = y2, k2 = q2) : m2 = m2.next = y2, g2 |= r2;
      h2 = h2.next;
      if (null === h2)
        if (h2 = e2.shared.pending, null === h2)
          break;
        else
          r2 = h2, h2 = r2.next, r2.next = null, e2.lastBaseUpdate = r2, e2.shared.pending = null;
    } while (1);
    null === m2 && (k2 = q2);
    e2.baseState = k2;
    e2.firstBaseUpdate = l2;
    e2.lastBaseUpdate = m2;
    b2 = e2.shared.interleaved;
    if (null !== b2) {
      e2 = b2;
      do
        g2 |= e2.lane, e2 = e2.next;
      while (e2 !== b2);
    } else
      null === f2 && (e2.shared.lanes = 0);
    hh |= g2;
    a.lanes = g2;
    a.memoizedState = q2;
  }
}
function ih(a, b2, c2) {
  a = b2.effects;
  b2.effects = null;
  if (null !== a)
    for (b2 = 0; b2 < a.length; b2++) {
      var d2 = a[b2], e2 = d2.callback;
      if (null !== e2) {
        d2.callback = null;
        d2 = c2;
        if ("function" !== typeof e2)
          throw Error(p$4(191, e2));
        e2.call(d2);
      }
    }
}
var jh = new aa.Component().refs;
function kh(a, b2, c2, d2) {
  b2 = a.memoizedState;
  c2 = c2(d2, b2);
  c2 = null === c2 || void 0 === c2 ? b2 : A$1({}, b2, c2);
  a.memoizedState = c2;
  0 === a.lanes && (a.updateQueue.baseState = c2);
}
var nh = { isMounted: function(a) {
  return (a = a._reactInternals) ? Vb(a) === a : false;
}, enqueueSetState: function(a, b2, c2) {
  a = a._reactInternals;
  var d2 = L(), e2 = lh(a), f2 = ch(d2, e2);
  f2.payload = b2;
  void 0 !== c2 && null !== c2 && (f2.callback = c2);
  b2 = dh(a, f2, e2);
  null !== b2 && (mh(b2, a, e2, d2), eh(b2, a, e2));
}, enqueueReplaceState: function(a, b2, c2) {
  a = a._reactInternals;
  var d2 = L(), e2 = lh(a), f2 = ch(d2, e2);
  f2.tag = 1;
  f2.payload = b2;
  void 0 !== c2 && null !== c2 && (f2.callback = c2);
  b2 = dh(a, f2, e2);
  null !== b2 && (mh(b2, a, e2, d2), eh(b2, a, e2));
}, enqueueForceUpdate: function(a, b2) {
  a = a._reactInternals;
  var c2 = L(), d2 = lh(a), e2 = ch(c2, d2);
  e2.tag = 2;
  void 0 !== b2 && null !== b2 && (e2.callback = b2);
  b2 = dh(a, e2, d2);
  null !== b2 && (mh(b2, a, d2, c2), eh(b2, a, d2));
} };
function oh(a, b2, c2, d2, e2, f2, g2) {
  a = a.stateNode;
  return "function" === typeof a.shouldComponentUpdate ? a.shouldComponentUpdate(d2, f2, g2) : b2.prototype && b2.prototype.isPureReactComponent ? !Ie(c2, d2) || !Ie(e2, f2) : true;
}
function ph(a, b2, c2) {
  var d2 = false, e2 = Vf;
  var f2 = b2.contextType;
  "object" === typeof f2 && null !== f2 ? f2 = Vg(f2) : (e2 = Zf(b2) ? Xf : H.current, d2 = b2.contextTypes, f2 = (d2 = null !== d2 && void 0 !== d2) ? Yf(a, e2) : Vf);
  b2 = new b2(c2, f2);
  a.memoizedState = null !== b2.state && void 0 !== b2.state ? b2.state : null;
  b2.updater = nh;
  a.stateNode = b2;
  b2._reactInternals = a;
  d2 && (a = a.stateNode, a.__reactInternalMemoizedUnmaskedChildContext = e2, a.__reactInternalMemoizedMaskedChildContext = f2);
  return b2;
}
function qh(a, b2, c2, d2) {
  a = b2.state;
  "function" === typeof b2.componentWillReceiveProps && b2.componentWillReceiveProps(c2, d2);
  "function" === typeof b2.UNSAFE_componentWillReceiveProps && b2.UNSAFE_componentWillReceiveProps(c2, d2);
  b2.state !== a && nh.enqueueReplaceState(b2, b2.state, null);
}
function rh(a, b2, c2, d2) {
  var e2 = a.stateNode;
  e2.props = c2;
  e2.state = a.memoizedState;
  e2.refs = jh;
  ah(a);
  var f2 = b2.contextType;
  "object" === typeof f2 && null !== f2 ? e2.context = Vg(f2) : (f2 = Zf(b2) ? Xf : H.current, e2.context = Yf(a, f2));
  e2.state = a.memoizedState;
  f2 = b2.getDerivedStateFromProps;
  "function" === typeof f2 && (kh(a, b2, f2, c2), e2.state = a.memoizedState);
  "function" === typeof b2.getDerivedStateFromProps || "function" === typeof e2.getSnapshotBeforeUpdate || "function" !== typeof e2.UNSAFE_componentWillMount && "function" !== typeof e2.componentWillMount || (b2 = e2.state, "function" === typeof e2.componentWillMount && e2.componentWillMount(), "function" === typeof e2.UNSAFE_componentWillMount && e2.UNSAFE_componentWillMount(), b2 !== e2.state && nh.enqueueReplaceState(e2, e2.state, null), gh(a, c2, e2, d2), e2.state = a.memoizedState);
  "function" === typeof e2.componentDidMount && (a.flags |= 4194308);
}
function sh(a, b2, c2) {
  a = c2.ref;
  if (null !== a && "function" !== typeof a && "object" !== typeof a) {
    if (c2._owner) {
      c2 = c2._owner;
      if (c2) {
        if (1 !== c2.tag)
          throw Error(p$4(309));
        var d2 = c2.stateNode;
      }
      if (!d2)
        throw Error(p$4(147, a));
      var e2 = d2, f2 = "" + a;
      if (null !== b2 && null !== b2.ref && "function" === typeof b2.ref && b2.ref._stringRef === f2)
        return b2.ref;
      b2 = function(a2) {
        var b3 = e2.refs;
        b3 === jh && (b3 = e2.refs = {});
        null === a2 ? delete b3[f2] : b3[f2] = a2;
      };
      b2._stringRef = f2;
      return b2;
    }
    if ("string" !== typeof a)
      throw Error(p$4(284));
    if (!c2._owner)
      throw Error(p$4(290, a));
  }
  return a;
}
function th(a, b2) {
  a = Object.prototype.toString.call(b2);
  throw Error(p$4(31, "[object Object]" === a ? "object with keys {" + Object.keys(b2).join(", ") + "}" : a));
}
function uh(a) {
  var b2 = a._init;
  return b2(a._payload);
}
function vh(a) {
  function b2(b3, c3) {
    if (a) {
      var d3 = b3.deletions;
      null === d3 ? (b3.deletions = [c3], b3.flags |= 16) : d3.push(c3);
    }
  }
  function c2(c3, d3) {
    if (!a)
      return null;
    for (; null !== d3; )
      b2(c3, d3), d3 = d3.sibling;
    return null;
  }
  function d2(a2, b3) {
    for (a2 = /* @__PURE__ */ new Map(); null !== b3; )
      null !== b3.key ? a2.set(b3.key, b3) : a2.set(b3.index, b3), b3 = b3.sibling;
    return a2;
  }
  function e2(a2, b3) {
    a2 = wh(a2, b3);
    a2.index = 0;
    a2.sibling = null;
    return a2;
  }
  function f2(b3, c3, d3) {
    b3.index = d3;
    if (!a)
      return b3.flags |= 1048576, c3;
    d3 = b3.alternate;
    if (null !== d3)
      return d3 = d3.index, d3 < c3 ? (b3.flags |= 2, c3) : d3;
    b3.flags |= 2;
    return c3;
  }
  function g2(b3) {
    a && null === b3.alternate && (b3.flags |= 2);
    return b3;
  }
  function h2(a2, b3, c3, d3) {
    if (null === b3 || 6 !== b3.tag)
      return b3 = xh(c3, a2.mode, d3), b3.return = a2, b3;
    b3 = e2(b3, c3);
    b3.return = a2;
    return b3;
  }
  function k2(a2, b3, c3, d3) {
    var f3 = c3.type;
    if (f3 === ya)
      return m2(a2, b3, c3.props.children, d3, c3.key);
    if (null !== b3 && (b3.elementType === f3 || "object" === typeof f3 && null !== f3 && f3.$$typeof === Ha && uh(f3) === b3.type))
      return d3 = e2(b3, c3.props), d3.ref = sh(a2, b3, c3), d3.return = a2, d3;
    d3 = yh(c3.type, c3.key, c3.props, null, a2.mode, d3);
    d3.ref = sh(a2, b3, c3);
    d3.return = a2;
    return d3;
  }
  function l2(a2, b3, c3, d3) {
    if (null === b3 || 4 !== b3.tag || b3.stateNode.containerInfo !== c3.containerInfo || b3.stateNode.implementation !== c3.implementation)
      return b3 = zh(c3, a2.mode, d3), b3.return = a2, b3;
    b3 = e2(b3, c3.children || []);
    b3.return = a2;
    return b3;
  }
  function m2(a2, b3, c3, d3, f3) {
    if (null === b3 || 7 !== b3.tag)
      return b3 = Ah(c3, a2.mode, d3, f3), b3.return = a2, b3;
    b3 = e2(b3, c3);
    b3.return = a2;
    return b3;
  }
  function q2(a2, b3, c3) {
    if ("string" === typeof b3 && "" !== b3 || "number" === typeof b3)
      return b3 = xh("" + b3, a2.mode, c3), b3.return = a2, b3;
    if ("object" === typeof b3 && null !== b3) {
      switch (b3.$$typeof) {
        case va:
          return c3 = yh(b3.type, b3.key, b3.props, null, a2.mode, c3), c3.ref = sh(a2, null, b3), c3.return = a2, c3;
        case wa:
          return b3 = zh(b3, a2.mode, c3), b3.return = a2, b3;
        case Ha:
          var d3 = b3._init;
          return q2(a2, d3(b3._payload), c3);
      }
      if (eb(b3) || Ka(b3))
        return b3 = Ah(b3, a2.mode, c3, null), b3.return = a2, b3;
      th(a2, b3);
    }
    return null;
  }
  function r2(a2, b3, c3, d3) {
    var e3 = null !== b3 ? b3.key : null;
    if ("string" === typeof c3 && "" !== c3 || "number" === typeof c3)
      return null !== e3 ? null : h2(a2, b3, "" + c3, d3);
    if ("object" === typeof c3 && null !== c3) {
      switch (c3.$$typeof) {
        case va:
          return c3.key === e3 ? k2(a2, b3, c3, d3) : null;
        case wa:
          return c3.key === e3 ? l2(a2, b3, c3, d3) : null;
        case Ha:
          return e3 = c3._init, r2(
            a2,
            b3,
            e3(c3._payload),
            d3
          );
      }
      if (eb(c3) || Ka(c3))
        return null !== e3 ? null : m2(a2, b3, c3, d3, null);
      th(a2, c3);
    }
    return null;
  }
  function y2(a2, b3, c3, d3, e3) {
    if ("string" === typeof d3 && "" !== d3 || "number" === typeof d3)
      return a2 = a2.get(c3) || null, h2(b3, a2, "" + d3, e3);
    if ("object" === typeof d3 && null !== d3) {
      switch (d3.$$typeof) {
        case va:
          return a2 = a2.get(null === d3.key ? c3 : d3.key) || null, k2(b3, a2, d3, e3);
        case wa:
          return a2 = a2.get(null === d3.key ? c3 : d3.key) || null, l2(b3, a2, d3, e3);
        case Ha:
          var f3 = d3._init;
          return y2(a2, b3, c3, f3(d3._payload), e3);
      }
      if (eb(d3) || Ka(d3))
        return a2 = a2.get(c3) || null, m2(b3, a2, d3, e3, null);
      th(b3, d3);
    }
    return null;
  }
  function n2(e3, g3, h3, k3) {
    for (var l3 = null, m3 = null, u2 = g3, w2 = g3 = 0, x2 = null; null !== u2 && w2 < h3.length; w2++) {
      u2.index > w2 ? (x2 = u2, u2 = null) : x2 = u2.sibling;
      var n3 = r2(e3, u2, h3[w2], k3);
      if (null === n3) {
        null === u2 && (u2 = x2);
        break;
      }
      a && u2 && null === n3.alternate && b2(e3, u2);
      g3 = f2(n3, g3, w2);
      null === m3 ? l3 = n3 : m3.sibling = n3;
      m3 = n3;
      u2 = x2;
    }
    if (w2 === h3.length)
      return c2(e3, u2), I && tg(e3, w2), l3;
    if (null === u2) {
      for (; w2 < h3.length; w2++)
        u2 = q2(e3, h3[w2], k3), null !== u2 && (g3 = f2(u2, g3, w2), null === m3 ? l3 = u2 : m3.sibling = u2, m3 = u2);
      I && tg(e3, w2);
      return l3;
    }
    for (u2 = d2(e3, u2); w2 < h3.length; w2++)
      x2 = y2(u2, e3, w2, h3[w2], k3), null !== x2 && (a && null !== x2.alternate && u2.delete(null === x2.key ? w2 : x2.key), g3 = f2(x2, g3, w2), null === m3 ? l3 = x2 : m3.sibling = x2, m3 = x2);
    a && u2.forEach(function(a2) {
      return b2(e3, a2);
    });
    I && tg(e3, w2);
    return l3;
  }
  function t2(e3, g3, h3, k3) {
    var l3 = Ka(h3);
    if ("function" !== typeof l3)
      throw Error(p$4(150));
    h3 = l3.call(h3);
    if (null == h3)
      throw Error(p$4(151));
    for (var u2 = l3 = null, m3 = g3, w2 = g3 = 0, x2 = null, n3 = h3.next(); null !== m3 && !n3.done; w2++, n3 = h3.next()) {
      m3.index > w2 ? (x2 = m3, m3 = null) : x2 = m3.sibling;
      var t3 = r2(e3, m3, n3.value, k3);
      if (null === t3) {
        null === m3 && (m3 = x2);
        break;
      }
      a && m3 && null === t3.alternate && b2(e3, m3);
      g3 = f2(t3, g3, w2);
      null === u2 ? l3 = t3 : u2.sibling = t3;
      u2 = t3;
      m3 = x2;
    }
    if (n3.done)
      return c2(
        e3,
        m3
      ), I && tg(e3, w2), l3;
    if (null === m3) {
      for (; !n3.done; w2++, n3 = h3.next())
        n3 = q2(e3, n3.value, k3), null !== n3 && (g3 = f2(n3, g3, w2), null === u2 ? l3 = n3 : u2.sibling = n3, u2 = n3);
      I && tg(e3, w2);
      return l3;
    }
    for (m3 = d2(e3, m3); !n3.done; w2++, n3 = h3.next())
      n3 = y2(m3, e3, w2, n3.value, k3), null !== n3 && (a && null !== n3.alternate && m3.delete(null === n3.key ? w2 : n3.key), g3 = f2(n3, g3, w2), null === u2 ? l3 = n3 : u2.sibling = n3, u2 = n3);
    a && m3.forEach(function(a2) {
      return b2(e3, a2);
    });
    I && tg(e3, w2);
    return l3;
  }
  function J2(a2, d3, f3, h3) {
    "object" === typeof f3 && null !== f3 && f3.type === ya && null === f3.key && (f3 = f3.props.children);
    if ("object" === typeof f3 && null !== f3) {
      switch (f3.$$typeof) {
        case va:
          a: {
            for (var k3 = f3.key, l3 = d3; null !== l3; ) {
              if (l3.key === k3) {
                k3 = f3.type;
                if (k3 === ya) {
                  if (7 === l3.tag) {
                    c2(a2, l3.sibling);
                    d3 = e2(l3, f3.props.children);
                    d3.return = a2;
                    a2 = d3;
                    break a;
                  }
                } else if (l3.elementType === k3 || "object" === typeof k3 && null !== k3 && k3.$$typeof === Ha && uh(k3) === l3.type) {
                  c2(a2, l3.sibling);
                  d3 = e2(l3, f3.props);
                  d3.ref = sh(a2, l3, f3);
                  d3.return = a2;
                  a2 = d3;
                  break a;
                }
                c2(a2, l3);
                break;
              } else
                b2(a2, l3);
              l3 = l3.sibling;
            }
            f3.type === ya ? (d3 = Ah(f3.props.children, a2.mode, h3, f3.key), d3.return = a2, a2 = d3) : (h3 = yh(f3.type, f3.key, f3.props, null, a2.mode, h3), h3.ref = sh(a2, d3, f3), h3.return = a2, a2 = h3);
          }
          return g2(a2);
        case wa:
          a: {
            for (l3 = f3.key; null !== d3; ) {
              if (d3.key === l3)
                if (4 === d3.tag && d3.stateNode.containerInfo === f3.containerInfo && d3.stateNode.implementation === f3.implementation) {
                  c2(a2, d3.sibling);
                  d3 = e2(d3, f3.children || []);
                  d3.return = a2;
                  a2 = d3;
                  break a;
                } else {
                  c2(a2, d3);
                  break;
                }
              else
                b2(a2, d3);
              d3 = d3.sibling;
            }
            d3 = zh(f3, a2.mode, h3);
            d3.return = a2;
            a2 = d3;
          }
          return g2(a2);
        case Ha:
          return l3 = f3._init, J2(a2, d3, l3(f3._payload), h3);
      }
      if (eb(f3))
        return n2(a2, d3, f3, h3);
      if (Ka(f3))
        return t2(a2, d3, f3, h3);
      th(a2, f3);
    }
    return "string" === typeof f3 && "" !== f3 || "number" === typeof f3 ? (f3 = "" + f3, null !== d3 && 6 === d3.tag ? (c2(a2, d3.sibling), d3 = e2(d3, f3), d3.return = a2, a2 = d3) : (c2(a2, d3), d3 = xh(f3, a2.mode, h3), d3.return = a2, a2 = d3), g2(a2)) : c2(a2, d3);
  }
  return J2;
}
var Bh = vh(true), Ch = vh(false), Dh = {}, Eh = Uf(Dh), Fh = Uf(Dh), Gh = Uf(Dh);
function Hh(a) {
  if (a === Dh)
    throw Error(p$4(174));
  return a;
}
function Ih(a, b2) {
  G(Gh, b2);
  G(Fh, a);
  G(Eh, Dh);
  a = b2.nodeType;
  switch (a) {
    case 9:
    case 11:
      b2 = (b2 = b2.documentElement) ? b2.namespaceURI : lb(null, "");
      break;
    default:
      a = 8 === a ? b2.parentNode : b2, b2 = a.namespaceURI || null, a = a.tagName, b2 = lb(b2, a);
  }
  E(Eh);
  G(Eh, b2);
}
function Jh() {
  E(Eh);
  E(Fh);
  E(Gh);
}
function Kh(a) {
  Hh(Gh.current);
  var b2 = Hh(Eh.current);
  var c2 = lb(b2, a.type);
  b2 !== c2 && (G(Fh, a), G(Eh, c2));
}
function Lh(a) {
  Fh.current === a && (E(Eh), E(Fh));
}
var M = Uf(0);
function Mh(a) {
  for (var b2 = a; null !== b2; ) {
    if (13 === b2.tag) {
      var c2 = b2.memoizedState;
      if (null !== c2 && (c2 = c2.dehydrated, null === c2 || "$?" === c2.data || "$!" === c2.data))
        return b2;
    } else if (19 === b2.tag && void 0 !== b2.memoizedProps.revealOrder) {
      if (0 !== (b2.flags & 128))
        return b2;
    } else if (null !== b2.child) {
      b2.child.return = b2;
      b2 = b2.child;
      continue;
    }
    if (b2 === a)
      break;
    for (; null === b2.sibling; ) {
      if (null === b2.return || b2.return === a)
        return null;
      b2 = b2.return;
    }
    b2.sibling.return = b2.return;
    b2 = b2.sibling;
  }
  return null;
}
var Nh = [];
function Oh() {
  for (var a = 0; a < Nh.length; a++)
    Nh[a]._workInProgressVersionPrimary = null;
  Nh.length = 0;
}
var Ph = ua.ReactCurrentDispatcher, Qh = ua.ReactCurrentBatchConfig, Rh = 0, N = null, O = null, P = null, Sh = false, Th = false, Uh = 0, Vh = 0;
function Q() {
  throw Error(p$4(321));
}
function Wh(a, b2) {
  if (null === b2)
    return false;
  for (var c2 = 0; c2 < b2.length && c2 < a.length; c2++)
    if (!He(a[c2], b2[c2]))
      return false;
  return true;
}
function Xh(a, b2, c2, d2, e2, f2) {
  Rh = f2;
  N = b2;
  b2.memoizedState = null;
  b2.updateQueue = null;
  b2.lanes = 0;
  Ph.current = null === a || null === a.memoizedState ? Yh : Zh;
  a = c2(d2, e2);
  if (Th) {
    f2 = 0;
    do {
      Th = false;
      Uh = 0;
      if (25 <= f2)
        throw Error(p$4(301));
      f2 += 1;
      P = O = null;
      b2.updateQueue = null;
      Ph.current = $h;
      a = c2(d2, e2);
    } while (Th);
  }
  Ph.current = ai;
  b2 = null !== O && null !== O.next;
  Rh = 0;
  P = O = N = null;
  Sh = false;
  if (b2)
    throw Error(p$4(300));
  return a;
}
function bi() {
  var a = 0 !== Uh;
  Uh = 0;
  return a;
}
function ci() {
  var a = { memoizedState: null, baseState: null, baseQueue: null, queue: null, next: null };
  null === P ? N.memoizedState = P = a : P = P.next = a;
  return P;
}
function di() {
  if (null === O) {
    var a = N.alternate;
    a = null !== a ? a.memoizedState : null;
  } else
    a = O.next;
  var b2 = null === P ? N.memoizedState : P.next;
  if (null !== b2)
    P = b2, O = a;
  else {
    if (null === a)
      throw Error(p$4(310));
    O = a;
    a = { memoizedState: O.memoizedState, baseState: O.baseState, baseQueue: O.baseQueue, queue: O.queue, next: null };
    null === P ? N.memoizedState = P = a : P = P.next = a;
  }
  return P;
}
function ei(a, b2) {
  return "function" === typeof b2 ? b2(a) : b2;
}
function fi(a) {
  var b2 = di(), c2 = b2.queue;
  if (null === c2)
    throw Error(p$4(311));
  c2.lastRenderedReducer = a;
  var d2 = O, e2 = d2.baseQueue, f2 = c2.pending;
  if (null !== f2) {
    if (null !== e2) {
      var g2 = e2.next;
      e2.next = f2.next;
      f2.next = g2;
    }
    d2.baseQueue = e2 = f2;
    c2.pending = null;
  }
  if (null !== e2) {
    f2 = e2.next;
    d2 = d2.baseState;
    var h2 = g2 = null, k2 = null, l2 = f2;
    do {
      var m2 = l2.lane;
      if ((Rh & m2) === m2)
        null !== k2 && (k2 = k2.next = { lane: 0, action: l2.action, hasEagerState: l2.hasEagerState, eagerState: l2.eagerState, next: null }), d2 = l2.hasEagerState ? l2.eagerState : a(d2, l2.action);
      else {
        var q2 = {
          lane: m2,
          action: l2.action,
          hasEagerState: l2.hasEagerState,
          eagerState: l2.eagerState,
          next: null
        };
        null === k2 ? (h2 = k2 = q2, g2 = d2) : k2 = k2.next = q2;
        N.lanes |= m2;
        hh |= m2;
      }
      l2 = l2.next;
    } while (null !== l2 && l2 !== f2);
    null === k2 ? g2 = d2 : k2.next = h2;
    He(d2, b2.memoizedState) || (Ug = true);
    b2.memoizedState = d2;
    b2.baseState = g2;
    b2.baseQueue = k2;
    c2.lastRenderedState = d2;
  }
  a = c2.interleaved;
  if (null !== a) {
    e2 = a;
    do
      f2 = e2.lane, N.lanes |= f2, hh |= f2, e2 = e2.next;
    while (e2 !== a);
  } else
    null === e2 && (c2.lanes = 0);
  return [b2.memoizedState, c2.dispatch];
}
function gi(a) {
  var b2 = di(), c2 = b2.queue;
  if (null === c2)
    throw Error(p$4(311));
  c2.lastRenderedReducer = a;
  var d2 = c2.dispatch, e2 = c2.pending, f2 = b2.memoizedState;
  if (null !== e2) {
    c2.pending = null;
    var g2 = e2 = e2.next;
    do
      f2 = a(f2, g2.action), g2 = g2.next;
    while (g2 !== e2);
    He(f2, b2.memoizedState) || (Ug = true);
    b2.memoizedState = f2;
    null === b2.baseQueue && (b2.baseState = f2);
    c2.lastRenderedState = f2;
  }
  return [f2, d2];
}
function hi() {
}
function ii(a, b2) {
  var c2 = N, d2 = di(), e2 = b2(), f2 = !He(d2.memoizedState, e2);
  f2 && (d2.memoizedState = e2, Ug = true);
  d2 = d2.queue;
  ji(ki.bind(null, c2, d2, a), [a]);
  if (d2.getSnapshot !== b2 || f2 || null !== P && P.memoizedState.tag & 1) {
    c2.flags |= 2048;
    li(9, mi.bind(null, c2, d2, e2, b2), void 0, null);
    if (null === R)
      throw Error(p$4(349));
    0 !== (Rh & 30) || ni(c2, b2, e2);
  }
  return e2;
}
function ni(a, b2, c2) {
  a.flags |= 16384;
  a = { getSnapshot: b2, value: c2 };
  b2 = N.updateQueue;
  null === b2 ? (b2 = { lastEffect: null, stores: null }, N.updateQueue = b2, b2.stores = [a]) : (c2 = b2.stores, null === c2 ? b2.stores = [a] : c2.push(a));
}
function mi(a, b2, c2, d2) {
  b2.value = c2;
  b2.getSnapshot = d2;
  oi(b2) && pi(a);
}
function ki(a, b2, c2) {
  return c2(function() {
    oi(b2) && pi(a);
  });
}
function oi(a) {
  var b2 = a.getSnapshot;
  a = a.value;
  try {
    var c2 = b2();
    return !He(a, c2);
  } catch (d2) {
    return true;
  }
}
function pi(a) {
  var b2 = Zg(a, 1);
  null !== b2 && mh(b2, a, 1, -1);
}
function qi(a) {
  var b2 = ci();
  "function" === typeof a && (a = a());
  b2.memoizedState = b2.baseState = a;
  a = { pending: null, interleaved: null, lanes: 0, dispatch: null, lastRenderedReducer: ei, lastRenderedState: a };
  b2.queue = a;
  a = a.dispatch = ri.bind(null, N, a);
  return [b2.memoizedState, a];
}
function li(a, b2, c2, d2) {
  a = { tag: a, create: b2, destroy: c2, deps: d2, next: null };
  b2 = N.updateQueue;
  null === b2 ? (b2 = { lastEffect: null, stores: null }, N.updateQueue = b2, b2.lastEffect = a.next = a) : (c2 = b2.lastEffect, null === c2 ? b2.lastEffect = a.next = a : (d2 = c2.next, c2.next = a, a.next = d2, b2.lastEffect = a));
  return a;
}
function si() {
  return di().memoizedState;
}
function ti(a, b2, c2, d2) {
  var e2 = ci();
  N.flags |= a;
  e2.memoizedState = li(1 | b2, c2, void 0, void 0 === d2 ? null : d2);
}
function ui(a, b2, c2, d2) {
  var e2 = di();
  d2 = void 0 === d2 ? null : d2;
  var f2 = void 0;
  if (null !== O) {
    var g2 = O.memoizedState;
    f2 = g2.destroy;
    if (null !== d2 && Wh(d2, g2.deps)) {
      e2.memoizedState = li(b2, c2, f2, d2);
      return;
    }
  }
  N.flags |= a;
  e2.memoizedState = li(1 | b2, c2, f2, d2);
}
function vi(a, b2) {
  return ti(8390656, 8, a, b2);
}
function ji(a, b2) {
  return ui(2048, 8, a, b2);
}
function wi(a, b2) {
  return ui(4, 2, a, b2);
}
function xi(a, b2) {
  return ui(4, 4, a, b2);
}
function yi(a, b2) {
  if ("function" === typeof b2)
    return a = a(), b2(a), function() {
      b2(null);
    };
  if (null !== b2 && void 0 !== b2)
    return a = a(), b2.current = a, function() {
      b2.current = null;
    };
}
function zi(a, b2, c2) {
  c2 = null !== c2 && void 0 !== c2 ? c2.concat([a]) : null;
  return ui(4, 4, yi.bind(null, b2, a), c2);
}
function Ai() {
}
function Bi(a, b2) {
  var c2 = di();
  b2 = void 0 === b2 ? null : b2;
  var d2 = c2.memoizedState;
  if (null !== d2 && null !== b2 && Wh(b2, d2[1]))
    return d2[0];
  c2.memoizedState = [a, b2];
  return a;
}
function Ci(a, b2) {
  var c2 = di();
  b2 = void 0 === b2 ? null : b2;
  var d2 = c2.memoizedState;
  if (null !== d2 && null !== b2 && Wh(b2, d2[1]))
    return d2[0];
  a = a();
  c2.memoizedState = [a, b2];
  return a;
}
function Di(a, b2, c2) {
  if (0 === (Rh & 21))
    return a.baseState && (a.baseState = false, Ug = true), a.memoizedState = c2;
  He(c2, b2) || (c2 = yc(), N.lanes |= c2, hh |= c2, a.baseState = true);
  return b2;
}
function Ei(a, b2) {
  var c2 = C;
  C = 0 !== c2 && 4 > c2 ? c2 : 4;
  a(true);
  var d2 = Qh.transition;
  Qh.transition = {};
  try {
    a(false), b2();
  } finally {
    C = c2, Qh.transition = d2;
  }
}
function Fi() {
  return di().memoizedState;
}
function Gi(a, b2, c2) {
  var d2 = lh(a);
  c2 = { lane: d2, action: c2, hasEagerState: false, eagerState: null, next: null };
  if (Hi(a))
    Ii(b2, c2);
  else if (c2 = Yg(a, b2, c2, d2), null !== c2) {
    var e2 = L();
    mh(c2, a, d2, e2);
    Ji(c2, b2, d2);
  }
}
function ri(a, b2, c2) {
  var d2 = lh(a), e2 = { lane: d2, action: c2, hasEagerState: false, eagerState: null, next: null };
  if (Hi(a))
    Ii(b2, e2);
  else {
    var f2 = a.alternate;
    if (0 === a.lanes && (null === f2 || 0 === f2.lanes) && (f2 = b2.lastRenderedReducer, null !== f2))
      try {
        var g2 = b2.lastRenderedState, h2 = f2(g2, c2);
        e2.hasEagerState = true;
        e2.eagerState = h2;
        if (He(h2, g2)) {
          var k2 = b2.interleaved;
          null === k2 ? (e2.next = e2, Xg(b2)) : (e2.next = k2.next, k2.next = e2);
          b2.interleaved = e2;
          return;
        }
      } catch (l2) {
      } finally {
      }
    c2 = Yg(a, b2, e2, d2);
    null !== c2 && (e2 = L(), mh(c2, a, d2, e2), Ji(c2, b2, d2));
  }
}
function Hi(a) {
  var b2 = a.alternate;
  return a === N || null !== b2 && b2 === N;
}
function Ii(a, b2) {
  Th = Sh = true;
  var c2 = a.pending;
  null === c2 ? b2.next = b2 : (b2.next = c2.next, c2.next = b2);
  a.pending = b2;
}
function Ji(a, b2, c2) {
  if (0 !== (c2 & 4194240)) {
    var d2 = b2.lanes;
    d2 &= a.pendingLanes;
    c2 |= d2;
    b2.lanes = c2;
    Cc(a, c2);
  }
}
var ai = { readContext: Vg, useCallback: Q, useContext: Q, useEffect: Q, useImperativeHandle: Q, useInsertionEffect: Q, useLayoutEffect: Q, useMemo: Q, useReducer: Q, useRef: Q, useState: Q, useDebugValue: Q, useDeferredValue: Q, useTransition: Q, useMutableSource: Q, useSyncExternalStore: Q, useId: Q, unstable_isNewReconciler: false }, Yh = { readContext: Vg, useCallback: function(a, b2) {
  ci().memoizedState = [a, void 0 === b2 ? null : b2];
  return a;
}, useContext: Vg, useEffect: vi, useImperativeHandle: function(a, b2, c2) {
  c2 = null !== c2 && void 0 !== c2 ? c2.concat([a]) : null;
  return ti(
    4194308,
    4,
    yi.bind(null, b2, a),
    c2
  );
}, useLayoutEffect: function(a, b2) {
  return ti(4194308, 4, a, b2);
}, useInsertionEffect: function(a, b2) {
  return ti(4, 2, a, b2);
}, useMemo: function(a, b2) {
  var c2 = ci();
  b2 = void 0 === b2 ? null : b2;
  a = a();
  c2.memoizedState = [a, b2];
  return a;
}, useReducer: function(a, b2, c2) {
  var d2 = ci();
  b2 = void 0 !== c2 ? c2(b2) : b2;
  d2.memoizedState = d2.baseState = b2;
  a = { pending: null, interleaved: null, lanes: 0, dispatch: null, lastRenderedReducer: a, lastRenderedState: b2 };
  d2.queue = a;
  a = a.dispatch = Gi.bind(null, N, a);
  return [d2.memoizedState, a];
}, useRef: function(a) {
  var b2 = ci();
  a = { current: a };
  return b2.memoizedState = a;
}, useState: qi, useDebugValue: Ai, useDeferredValue: function(a) {
  return ci().memoizedState = a;
}, useTransition: function() {
  var a = qi(false), b2 = a[0];
  a = Ei.bind(null, a[1]);
  ci().memoizedState = a;
  return [b2, a];
}, useMutableSource: function() {
}, useSyncExternalStore: function(a, b2, c2) {
  var d2 = N, e2 = ci();
  if (I) {
    if (void 0 === c2)
      throw Error(p$4(407));
    c2 = c2();
  } else {
    c2 = b2();
    if (null === R)
      throw Error(p$4(349));
    0 !== (Rh & 30) || ni(d2, b2, c2);
  }
  e2.memoizedState = c2;
  var f2 = { value: c2, getSnapshot: b2 };
  e2.queue = f2;
  vi(ki.bind(
    null,
    d2,
    f2,
    a
  ), [a]);
  d2.flags |= 2048;
  li(9, mi.bind(null, d2, f2, c2, b2), void 0, null);
  return c2;
}, useId: function() {
  var a = ci(), b2 = R.identifierPrefix;
  if (I) {
    var c2 = sg;
    var d2 = rg;
    c2 = (d2 & ~(1 << 32 - oc(d2) - 1)).toString(32) + c2;
    b2 = ":" + b2 + "R" + c2;
    c2 = Uh++;
    0 < c2 && (b2 += "H" + c2.toString(32));
    b2 += ":";
  } else
    c2 = Vh++, b2 = ":" + b2 + "r" + c2.toString(32) + ":";
  return a.memoizedState = b2;
}, unstable_isNewReconciler: false }, Zh = {
  readContext: Vg,
  useCallback: Bi,
  useContext: Vg,
  useEffect: ji,
  useImperativeHandle: zi,
  useInsertionEffect: wi,
  useLayoutEffect: xi,
  useMemo: Ci,
  useReducer: fi,
  useRef: si,
  useState: function() {
    return fi(ei);
  },
  useDebugValue: Ai,
  useDeferredValue: function(a) {
    var b2 = di();
    return Di(b2, O.memoizedState, a);
  },
  useTransition: function() {
    var a = fi(ei)[0], b2 = di().memoizedState;
    return [a, b2];
  },
  useMutableSource: hi,
  useSyncExternalStore: ii,
  useId: Fi,
  unstable_isNewReconciler: false
}, $h = { readContext: Vg, useCallback: Bi, useContext: Vg, useEffect: ji, useImperativeHandle: zi, useInsertionEffect: wi, useLayoutEffect: xi, useMemo: Ci, useReducer: gi, useRef: si, useState: function() {
  return gi(ei);
}, useDebugValue: Ai, useDeferredValue: function(a) {
  var b2 = di();
  return null === O ? b2.memoizedState = a : Di(b2, O.memoizedState, a);
}, useTransition: function() {
  var a = gi(ei)[0], b2 = di().memoizedState;
  return [a, b2];
}, useMutableSource: hi, useSyncExternalStore: ii, useId: Fi, unstable_isNewReconciler: false };
function Ki(a, b2) {
  try {
    var c2 = "", d2 = b2;
    do
      c2 += Pa(d2), d2 = d2.return;
    while (d2);
    var e2 = c2;
  } catch (f2) {
    e2 = "\nError generating stack: " + f2.message + "\n" + f2.stack;
  }
  return { value: a, source: b2, stack: e2, digest: null };
}
function Li(a, b2, c2) {
  return { value: a, source: null, stack: null != c2 ? c2 : null, digest: null != b2 ? b2 : null };
}
function Mi(a, b2) {
  try {
    console.error(b2.value);
  } catch (c2) {
    setTimeout(function() {
      throw c2;
    });
  }
}
var Ni = "function" === typeof WeakMap ? WeakMap : Map;
function Oi(a, b2, c2) {
  c2 = ch(-1, c2);
  c2.tag = 3;
  c2.payload = { element: null };
  var d2 = b2.value;
  c2.callback = function() {
    Pi || (Pi = true, Qi = d2);
    Mi(a, b2);
  };
  return c2;
}
function Ri(a, b2, c2) {
  c2 = ch(-1, c2);
  c2.tag = 3;
  var d2 = a.type.getDerivedStateFromError;
  if ("function" === typeof d2) {
    var e2 = b2.value;
    c2.payload = function() {
      return d2(e2);
    };
    c2.callback = function() {
      Mi(a, b2);
    };
  }
  var f2 = a.stateNode;
  null !== f2 && "function" === typeof f2.componentDidCatch && (c2.callback = function() {
    Mi(a, b2);
    "function" !== typeof d2 && (null === Si ? Si = /* @__PURE__ */ new Set([this]) : Si.add(this));
    var c3 = b2.stack;
    this.componentDidCatch(b2.value, { componentStack: null !== c3 ? c3 : "" });
  });
  return c2;
}
function Ti(a, b2, c2) {
  var d2 = a.pingCache;
  if (null === d2) {
    d2 = a.pingCache = new Ni();
    var e2 = /* @__PURE__ */ new Set();
    d2.set(b2, e2);
  } else
    e2 = d2.get(b2), void 0 === e2 && (e2 = /* @__PURE__ */ new Set(), d2.set(b2, e2));
  e2.has(c2) || (e2.add(c2), a = Ui.bind(null, a, b2, c2), b2.then(a, a));
}
function Vi(a) {
  do {
    var b2;
    if (b2 = 13 === a.tag)
      b2 = a.memoizedState, b2 = null !== b2 ? null !== b2.dehydrated ? true : false : true;
    if (b2)
      return a;
    a = a.return;
  } while (null !== a);
  return null;
}
function Wi(a, b2, c2, d2, e2) {
  if (0 === (a.mode & 1))
    return a === b2 ? a.flags |= 65536 : (a.flags |= 128, c2.flags |= 131072, c2.flags &= -52805, 1 === c2.tag && (null === c2.alternate ? c2.tag = 17 : (b2 = ch(-1, 1), b2.tag = 2, dh(c2, b2, 1))), c2.lanes |= 1), a;
  a.flags |= 65536;
  a.lanes = e2;
  return a;
}
var Xi = ua.ReactCurrentOwner, Ug = false;
function Yi(a, b2, c2, d2) {
  b2.child = null === a ? Ch(b2, null, c2, d2) : Bh(b2, a.child, c2, d2);
}
function Zi(a, b2, c2, d2, e2) {
  c2 = c2.render;
  var f2 = b2.ref;
  Tg(b2, e2);
  d2 = Xh(a, b2, c2, d2, f2, e2);
  c2 = bi();
  if (null !== a && !Ug)
    return b2.updateQueue = a.updateQueue, b2.flags &= -2053, a.lanes &= ~e2, $i(a, b2, e2);
  I && c2 && vg(b2);
  b2.flags |= 1;
  Yi(a, b2, d2, e2);
  return b2.child;
}
function aj(a, b2, c2, d2, e2) {
  if (null === a) {
    var f2 = c2.type;
    if ("function" === typeof f2 && !bj(f2) && void 0 === f2.defaultProps && null === c2.compare && void 0 === c2.defaultProps)
      return b2.tag = 15, b2.type = f2, cj(a, b2, f2, d2, e2);
    a = yh(c2.type, null, d2, b2, b2.mode, e2);
    a.ref = b2.ref;
    a.return = b2;
    return b2.child = a;
  }
  f2 = a.child;
  if (0 === (a.lanes & e2)) {
    var g2 = f2.memoizedProps;
    c2 = c2.compare;
    c2 = null !== c2 ? c2 : Ie;
    if (c2(g2, d2) && a.ref === b2.ref)
      return $i(a, b2, e2);
  }
  b2.flags |= 1;
  a = wh(f2, d2);
  a.ref = b2.ref;
  a.return = b2;
  return b2.child = a;
}
function cj(a, b2, c2, d2, e2) {
  if (null !== a) {
    var f2 = a.memoizedProps;
    if (Ie(f2, d2) && a.ref === b2.ref)
      if (Ug = false, b2.pendingProps = d2 = f2, 0 !== (a.lanes & e2))
        0 !== (a.flags & 131072) && (Ug = true);
      else
        return b2.lanes = a.lanes, $i(a, b2, e2);
  }
  return dj(a, b2, c2, d2, e2);
}
function ej(a, b2, c2) {
  var d2 = b2.pendingProps, e2 = d2.children, f2 = null !== a ? a.memoizedState : null;
  if ("hidden" === d2.mode)
    if (0 === (b2.mode & 1))
      b2.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }, G(fj, gj), gj |= c2;
    else {
      if (0 === (c2 & 1073741824))
        return a = null !== f2 ? f2.baseLanes | c2 : c2, b2.lanes = b2.childLanes = 1073741824, b2.memoizedState = { baseLanes: a, cachePool: null, transitions: null }, b2.updateQueue = null, G(fj, gj), gj |= a, null;
      b2.memoizedState = { baseLanes: 0, cachePool: null, transitions: null };
      d2 = null !== f2 ? f2.baseLanes : c2;
      G(fj, gj);
      gj |= d2;
    }
  else
    null !== f2 ? (d2 = f2.baseLanes | c2, b2.memoizedState = null) : d2 = c2, G(fj, gj), gj |= d2;
  Yi(a, b2, e2, c2);
  return b2.child;
}
function hj(a, b2) {
  var c2 = b2.ref;
  if (null === a && null !== c2 || null !== a && a.ref !== c2)
    b2.flags |= 512, b2.flags |= 2097152;
}
function dj(a, b2, c2, d2, e2) {
  var f2 = Zf(c2) ? Xf : H.current;
  f2 = Yf(b2, f2);
  Tg(b2, e2);
  c2 = Xh(a, b2, c2, d2, f2, e2);
  d2 = bi();
  if (null !== a && !Ug)
    return b2.updateQueue = a.updateQueue, b2.flags &= -2053, a.lanes &= ~e2, $i(a, b2, e2);
  I && d2 && vg(b2);
  b2.flags |= 1;
  Yi(a, b2, c2, e2);
  return b2.child;
}
function ij(a, b2, c2, d2, e2) {
  if (Zf(c2)) {
    var f2 = true;
    cg(b2);
  } else
    f2 = false;
  Tg(b2, e2);
  if (null === b2.stateNode)
    jj(a, b2), ph(b2, c2, d2), rh(b2, c2, d2, e2), d2 = true;
  else if (null === a) {
    var g2 = b2.stateNode, h2 = b2.memoizedProps;
    g2.props = h2;
    var k2 = g2.context, l2 = c2.contextType;
    "object" === typeof l2 && null !== l2 ? l2 = Vg(l2) : (l2 = Zf(c2) ? Xf : H.current, l2 = Yf(b2, l2));
    var m2 = c2.getDerivedStateFromProps, q2 = "function" === typeof m2 || "function" === typeof g2.getSnapshotBeforeUpdate;
    q2 || "function" !== typeof g2.UNSAFE_componentWillReceiveProps && "function" !== typeof g2.componentWillReceiveProps || (h2 !== d2 || k2 !== l2) && qh(b2, g2, d2, l2);
    $g = false;
    var r2 = b2.memoizedState;
    g2.state = r2;
    gh(b2, d2, g2, e2);
    k2 = b2.memoizedState;
    h2 !== d2 || r2 !== k2 || Wf.current || $g ? ("function" === typeof m2 && (kh(b2, c2, m2, d2), k2 = b2.memoizedState), (h2 = $g || oh(b2, c2, h2, d2, r2, k2, l2)) ? (q2 || "function" !== typeof g2.UNSAFE_componentWillMount && "function" !== typeof g2.componentWillMount || ("function" === typeof g2.componentWillMount && g2.componentWillMount(), "function" === typeof g2.UNSAFE_componentWillMount && g2.UNSAFE_componentWillMount()), "function" === typeof g2.componentDidMount && (b2.flags |= 4194308)) : ("function" === typeof g2.componentDidMount && (b2.flags |= 4194308), b2.memoizedProps = d2, b2.memoizedState = k2), g2.props = d2, g2.state = k2, g2.context = l2, d2 = h2) : ("function" === typeof g2.componentDidMount && (b2.flags |= 4194308), d2 = false);
  } else {
    g2 = b2.stateNode;
    bh(a, b2);
    h2 = b2.memoizedProps;
    l2 = b2.type === b2.elementType ? h2 : Lg(b2.type, h2);
    g2.props = l2;
    q2 = b2.pendingProps;
    r2 = g2.context;
    k2 = c2.contextType;
    "object" === typeof k2 && null !== k2 ? k2 = Vg(k2) : (k2 = Zf(c2) ? Xf : H.current, k2 = Yf(b2, k2));
    var y2 = c2.getDerivedStateFromProps;
    (m2 = "function" === typeof y2 || "function" === typeof g2.getSnapshotBeforeUpdate) || "function" !== typeof g2.UNSAFE_componentWillReceiveProps && "function" !== typeof g2.componentWillReceiveProps || (h2 !== q2 || r2 !== k2) && qh(b2, g2, d2, k2);
    $g = false;
    r2 = b2.memoizedState;
    g2.state = r2;
    gh(b2, d2, g2, e2);
    var n2 = b2.memoizedState;
    h2 !== q2 || r2 !== n2 || Wf.current || $g ? ("function" === typeof y2 && (kh(b2, c2, y2, d2), n2 = b2.memoizedState), (l2 = $g || oh(b2, c2, l2, d2, r2, n2, k2) || false) ? (m2 || "function" !== typeof g2.UNSAFE_componentWillUpdate && "function" !== typeof g2.componentWillUpdate || ("function" === typeof g2.componentWillUpdate && g2.componentWillUpdate(d2, n2, k2), "function" === typeof g2.UNSAFE_componentWillUpdate && g2.UNSAFE_componentWillUpdate(d2, n2, k2)), "function" === typeof g2.componentDidUpdate && (b2.flags |= 4), "function" === typeof g2.getSnapshotBeforeUpdate && (b2.flags |= 1024)) : ("function" !== typeof g2.componentDidUpdate || h2 === a.memoizedProps && r2 === a.memoizedState || (b2.flags |= 4), "function" !== typeof g2.getSnapshotBeforeUpdate || h2 === a.memoizedProps && r2 === a.memoizedState || (b2.flags |= 1024), b2.memoizedProps = d2, b2.memoizedState = n2), g2.props = d2, g2.state = n2, g2.context = k2, d2 = l2) : ("function" !== typeof g2.componentDidUpdate || h2 === a.memoizedProps && r2 === a.memoizedState || (b2.flags |= 4), "function" !== typeof g2.getSnapshotBeforeUpdate || h2 === a.memoizedProps && r2 === a.memoizedState || (b2.flags |= 1024), d2 = false);
  }
  return kj(a, b2, c2, d2, f2, e2);
}
function kj(a, b2, c2, d2, e2, f2) {
  hj(a, b2);
  var g2 = 0 !== (b2.flags & 128);
  if (!d2 && !g2)
    return e2 && dg(b2, c2, false), $i(a, b2, f2);
  d2 = b2.stateNode;
  Xi.current = b2;
  var h2 = g2 && "function" !== typeof c2.getDerivedStateFromError ? null : d2.render();
  b2.flags |= 1;
  null !== a && g2 ? (b2.child = Bh(b2, a.child, null, f2), b2.child = Bh(b2, null, h2, f2)) : Yi(a, b2, h2, f2);
  b2.memoizedState = d2.state;
  e2 && dg(b2, c2, true);
  return b2.child;
}
function lj(a) {
  var b2 = a.stateNode;
  b2.pendingContext ? ag(a, b2.pendingContext, b2.pendingContext !== b2.context) : b2.context && ag(a, b2.context, false);
  Ih(a, b2.containerInfo);
}
function mj(a, b2, c2, d2, e2) {
  Ig();
  Jg(e2);
  b2.flags |= 256;
  Yi(a, b2, c2, d2);
  return b2.child;
}
var nj = { dehydrated: null, treeContext: null, retryLane: 0 };
function oj(a) {
  return { baseLanes: a, cachePool: null, transitions: null };
}
function pj(a, b2, c2) {
  var d2 = b2.pendingProps, e2 = M.current, f2 = false, g2 = 0 !== (b2.flags & 128), h2;
  (h2 = g2) || (h2 = null !== a && null === a.memoizedState ? false : 0 !== (e2 & 2));
  if (h2)
    f2 = true, b2.flags &= -129;
  else if (null === a || null !== a.memoizedState)
    e2 |= 1;
  G(M, e2 & 1);
  if (null === a) {
    Eg(b2);
    a = b2.memoizedState;
    if (null !== a && (a = a.dehydrated, null !== a))
      return 0 === (b2.mode & 1) ? b2.lanes = 1 : "$!" === a.data ? b2.lanes = 8 : b2.lanes = 1073741824, null;
    g2 = d2.children;
    a = d2.fallback;
    return f2 ? (d2 = b2.mode, f2 = b2.child, g2 = { mode: "hidden", children: g2 }, 0 === (d2 & 1) && null !== f2 ? (f2.childLanes = 0, f2.pendingProps = g2) : f2 = qj(g2, d2, 0, null), a = Ah(a, d2, c2, null), f2.return = b2, a.return = b2, f2.sibling = a, b2.child = f2, b2.child.memoizedState = oj(c2), b2.memoizedState = nj, a) : rj(b2, g2);
  }
  e2 = a.memoizedState;
  if (null !== e2 && (h2 = e2.dehydrated, null !== h2))
    return sj(a, b2, g2, d2, h2, e2, c2);
  if (f2) {
    f2 = d2.fallback;
    g2 = b2.mode;
    e2 = a.child;
    h2 = e2.sibling;
    var k2 = { mode: "hidden", children: d2.children };
    0 === (g2 & 1) && b2.child !== e2 ? (d2 = b2.child, d2.childLanes = 0, d2.pendingProps = k2, b2.deletions = null) : (d2 = wh(e2, k2), d2.subtreeFlags = e2.subtreeFlags & 14680064);
    null !== h2 ? f2 = wh(h2, f2) : (f2 = Ah(f2, g2, c2, null), f2.flags |= 2);
    f2.return = b2;
    d2.return = b2;
    d2.sibling = f2;
    b2.child = d2;
    d2 = f2;
    f2 = b2.child;
    g2 = a.child.memoizedState;
    g2 = null === g2 ? oj(c2) : { baseLanes: g2.baseLanes | c2, cachePool: null, transitions: g2.transitions };
    f2.memoizedState = g2;
    f2.childLanes = a.childLanes & ~c2;
    b2.memoizedState = nj;
    return d2;
  }
  f2 = a.child;
  a = f2.sibling;
  d2 = wh(f2, { mode: "visible", children: d2.children });
  0 === (b2.mode & 1) && (d2.lanes = c2);
  d2.return = b2;
  d2.sibling = null;
  null !== a && (c2 = b2.deletions, null === c2 ? (b2.deletions = [a], b2.flags |= 16) : c2.push(a));
  b2.child = d2;
  b2.memoizedState = null;
  return d2;
}
function rj(a, b2) {
  b2 = qj({ mode: "visible", children: b2 }, a.mode, 0, null);
  b2.return = a;
  return a.child = b2;
}
function tj(a, b2, c2, d2) {
  null !== d2 && Jg(d2);
  Bh(b2, a.child, null, c2);
  a = rj(b2, b2.pendingProps.children);
  a.flags |= 2;
  b2.memoizedState = null;
  return a;
}
function sj(a, b2, c2, d2, e2, f2, g2) {
  if (c2) {
    if (b2.flags & 256)
      return b2.flags &= -257, d2 = Li(Error(p$4(422))), tj(a, b2, g2, d2);
    if (null !== b2.memoizedState)
      return b2.child = a.child, b2.flags |= 128, null;
    f2 = d2.fallback;
    e2 = b2.mode;
    d2 = qj({ mode: "visible", children: d2.children }, e2, 0, null);
    f2 = Ah(f2, e2, g2, null);
    f2.flags |= 2;
    d2.return = b2;
    f2.return = b2;
    d2.sibling = f2;
    b2.child = d2;
    0 !== (b2.mode & 1) && Bh(b2, a.child, null, g2);
    b2.child.memoizedState = oj(g2);
    b2.memoizedState = nj;
    return f2;
  }
  if (0 === (b2.mode & 1))
    return tj(a, b2, g2, null);
  if ("$!" === e2.data) {
    d2 = e2.nextSibling && e2.nextSibling.dataset;
    if (d2)
      var h2 = d2.dgst;
    d2 = h2;
    f2 = Error(p$4(419));
    d2 = Li(f2, d2, void 0);
    return tj(a, b2, g2, d2);
  }
  h2 = 0 !== (g2 & a.childLanes);
  if (Ug || h2) {
    d2 = R;
    if (null !== d2) {
      switch (g2 & -g2) {
        case 4:
          e2 = 2;
          break;
        case 16:
          e2 = 8;
          break;
        case 64:
        case 128:
        case 256:
        case 512:
        case 1024:
        case 2048:
        case 4096:
        case 8192:
        case 16384:
        case 32768:
        case 65536:
        case 131072:
        case 262144:
        case 524288:
        case 1048576:
        case 2097152:
        case 4194304:
        case 8388608:
        case 16777216:
        case 33554432:
        case 67108864:
          e2 = 32;
          break;
        case 536870912:
          e2 = 268435456;
          break;
        default:
          e2 = 0;
      }
      e2 = 0 !== (e2 & (d2.suspendedLanes | g2)) ? 0 : e2;
      0 !== e2 && e2 !== f2.retryLane && (f2.retryLane = e2, Zg(a, e2), mh(d2, a, e2, -1));
    }
    uj();
    d2 = Li(Error(p$4(421)));
    return tj(a, b2, g2, d2);
  }
  if ("$?" === e2.data)
    return b2.flags |= 128, b2.child = a.child, b2 = vj.bind(null, a), e2._reactRetry = b2, null;
  a = f2.treeContext;
  yg = Lf(e2.nextSibling);
  xg = b2;
  I = true;
  zg = null;
  null !== a && (og[pg++] = rg, og[pg++] = sg, og[pg++] = qg, rg = a.id, sg = a.overflow, qg = b2);
  b2 = rj(b2, d2.children);
  b2.flags |= 4096;
  return b2;
}
function wj(a, b2, c2) {
  a.lanes |= b2;
  var d2 = a.alternate;
  null !== d2 && (d2.lanes |= b2);
  Sg(a.return, b2, c2);
}
function xj(a, b2, c2, d2, e2) {
  var f2 = a.memoizedState;
  null === f2 ? a.memoizedState = { isBackwards: b2, rendering: null, renderingStartTime: 0, last: d2, tail: c2, tailMode: e2 } : (f2.isBackwards = b2, f2.rendering = null, f2.renderingStartTime = 0, f2.last = d2, f2.tail = c2, f2.tailMode = e2);
}
function yj(a, b2, c2) {
  var d2 = b2.pendingProps, e2 = d2.revealOrder, f2 = d2.tail;
  Yi(a, b2, d2.children, c2);
  d2 = M.current;
  if (0 !== (d2 & 2))
    d2 = d2 & 1 | 2, b2.flags |= 128;
  else {
    if (null !== a && 0 !== (a.flags & 128))
      a:
        for (a = b2.child; null !== a; ) {
          if (13 === a.tag)
            null !== a.memoizedState && wj(a, c2, b2);
          else if (19 === a.tag)
            wj(a, c2, b2);
          else if (null !== a.child) {
            a.child.return = a;
            a = a.child;
            continue;
          }
          if (a === b2)
            break a;
          for (; null === a.sibling; ) {
            if (null === a.return || a.return === b2)
              break a;
            a = a.return;
          }
          a.sibling.return = a.return;
          a = a.sibling;
        }
    d2 &= 1;
  }
  G(M, d2);
  if (0 === (b2.mode & 1))
    b2.memoizedState = null;
  else
    switch (e2) {
      case "forwards":
        c2 = b2.child;
        for (e2 = null; null !== c2; )
          a = c2.alternate, null !== a && null === Mh(a) && (e2 = c2), c2 = c2.sibling;
        c2 = e2;
        null === c2 ? (e2 = b2.child, b2.child = null) : (e2 = c2.sibling, c2.sibling = null);
        xj(b2, false, e2, c2, f2);
        break;
      case "backwards":
        c2 = null;
        e2 = b2.child;
        for (b2.child = null; null !== e2; ) {
          a = e2.alternate;
          if (null !== a && null === Mh(a)) {
            b2.child = e2;
            break;
          }
          a = e2.sibling;
          e2.sibling = c2;
          c2 = e2;
          e2 = a;
        }
        xj(b2, true, c2, null, f2);
        break;
      case "together":
        xj(b2, false, null, null, void 0);
        break;
      default:
        b2.memoizedState = null;
    }
  return b2.child;
}
function jj(a, b2) {
  0 === (b2.mode & 1) && null !== a && (a.alternate = null, b2.alternate = null, b2.flags |= 2);
}
function $i(a, b2, c2) {
  null !== a && (b2.dependencies = a.dependencies);
  hh |= b2.lanes;
  if (0 === (c2 & b2.childLanes))
    return null;
  if (null !== a && b2.child !== a.child)
    throw Error(p$4(153));
  if (null !== b2.child) {
    a = b2.child;
    c2 = wh(a, a.pendingProps);
    b2.child = c2;
    for (c2.return = b2; null !== a.sibling; )
      a = a.sibling, c2 = c2.sibling = wh(a, a.pendingProps), c2.return = b2;
    c2.sibling = null;
  }
  return b2.child;
}
function zj(a, b2, c2) {
  switch (b2.tag) {
    case 3:
      lj(b2);
      Ig();
      break;
    case 5:
      Kh(b2);
      break;
    case 1:
      Zf(b2.type) && cg(b2);
      break;
    case 4:
      Ih(b2, b2.stateNode.containerInfo);
      break;
    case 10:
      var d2 = b2.type._context, e2 = b2.memoizedProps.value;
      G(Mg, d2._currentValue);
      d2._currentValue = e2;
      break;
    case 13:
      d2 = b2.memoizedState;
      if (null !== d2) {
        if (null !== d2.dehydrated)
          return G(M, M.current & 1), b2.flags |= 128, null;
        if (0 !== (c2 & b2.child.childLanes))
          return pj(a, b2, c2);
        G(M, M.current & 1);
        a = $i(a, b2, c2);
        return null !== a ? a.sibling : null;
      }
      G(M, M.current & 1);
      break;
    case 19:
      d2 = 0 !== (c2 & b2.childLanes);
      if (0 !== (a.flags & 128)) {
        if (d2)
          return yj(a, b2, c2);
        b2.flags |= 128;
      }
      e2 = b2.memoizedState;
      null !== e2 && (e2.rendering = null, e2.tail = null, e2.lastEffect = null);
      G(M, M.current);
      if (d2)
        break;
      else
        return null;
    case 22:
    case 23:
      return b2.lanes = 0, ej(a, b2, c2);
  }
  return $i(a, b2, c2);
}
var Aj, Bj, Cj, Dj;
Aj = function(a, b2) {
  for (var c2 = b2.child; null !== c2; ) {
    if (5 === c2.tag || 6 === c2.tag)
      a.appendChild(c2.stateNode);
    else if (4 !== c2.tag && null !== c2.child) {
      c2.child.return = c2;
      c2 = c2.child;
      continue;
    }
    if (c2 === b2)
      break;
    for (; null === c2.sibling; ) {
      if (null === c2.return || c2.return === b2)
        return;
      c2 = c2.return;
    }
    c2.sibling.return = c2.return;
    c2 = c2.sibling;
  }
};
Bj = function() {
};
Cj = function(a, b2, c2, d2) {
  var e2 = a.memoizedProps;
  if (e2 !== d2) {
    a = b2.stateNode;
    Hh(Eh.current);
    var f2 = null;
    switch (c2) {
      case "input":
        e2 = Ya(a, e2);
        d2 = Ya(a, d2);
        f2 = [];
        break;
      case "select":
        e2 = A$1({}, e2, { value: void 0 });
        d2 = A$1({}, d2, { value: void 0 });
        f2 = [];
        break;
      case "textarea":
        e2 = gb(a, e2);
        d2 = gb(a, d2);
        f2 = [];
        break;
      default:
        "function" !== typeof e2.onClick && "function" === typeof d2.onClick && (a.onclick = Bf);
    }
    ub(c2, d2);
    var g2;
    c2 = null;
    for (l2 in e2)
      if (!d2.hasOwnProperty(l2) && e2.hasOwnProperty(l2) && null != e2[l2])
        if ("style" === l2) {
          var h2 = e2[l2];
          for (g2 in h2)
            h2.hasOwnProperty(g2) && (c2 || (c2 = {}), c2[g2] = "");
        } else
          "dangerouslySetInnerHTML" !== l2 && "children" !== l2 && "suppressContentEditableWarning" !== l2 && "suppressHydrationWarning" !== l2 && "autoFocus" !== l2 && (ea.hasOwnProperty(l2) ? f2 || (f2 = []) : (f2 = f2 || []).push(l2, null));
    for (l2 in d2) {
      var k2 = d2[l2];
      h2 = null != e2 ? e2[l2] : void 0;
      if (d2.hasOwnProperty(l2) && k2 !== h2 && (null != k2 || null != h2))
        if ("style" === l2)
          if (h2) {
            for (g2 in h2)
              !h2.hasOwnProperty(g2) || k2 && k2.hasOwnProperty(g2) || (c2 || (c2 = {}), c2[g2] = "");
            for (g2 in k2)
              k2.hasOwnProperty(g2) && h2[g2] !== k2[g2] && (c2 || (c2 = {}), c2[g2] = k2[g2]);
          } else
            c2 || (f2 || (f2 = []), f2.push(
              l2,
              c2
            )), c2 = k2;
        else
          "dangerouslySetInnerHTML" === l2 ? (k2 = k2 ? k2.__html : void 0, h2 = h2 ? h2.__html : void 0, null != k2 && h2 !== k2 && (f2 = f2 || []).push(l2, k2)) : "children" === l2 ? "string" !== typeof k2 && "number" !== typeof k2 || (f2 = f2 || []).push(l2, "" + k2) : "suppressContentEditableWarning" !== l2 && "suppressHydrationWarning" !== l2 && (ea.hasOwnProperty(l2) ? (null != k2 && "onScroll" === l2 && D("scroll", a), f2 || h2 === k2 || (f2 = [])) : (f2 = f2 || []).push(l2, k2));
    }
    c2 && (f2 = f2 || []).push("style", c2);
    var l2 = f2;
    if (b2.updateQueue = l2)
      b2.flags |= 4;
  }
};
Dj = function(a, b2, c2, d2) {
  c2 !== d2 && (b2.flags |= 4);
};
function Ej(a, b2) {
  if (!I)
    switch (a.tailMode) {
      case "hidden":
        b2 = a.tail;
        for (var c2 = null; null !== b2; )
          null !== b2.alternate && (c2 = b2), b2 = b2.sibling;
        null === c2 ? a.tail = null : c2.sibling = null;
        break;
      case "collapsed":
        c2 = a.tail;
        for (var d2 = null; null !== c2; )
          null !== c2.alternate && (d2 = c2), c2 = c2.sibling;
        null === d2 ? b2 || null === a.tail ? a.tail = null : a.tail.sibling = null : d2.sibling = null;
    }
}
function S(a) {
  var b2 = null !== a.alternate && a.alternate.child === a.child, c2 = 0, d2 = 0;
  if (b2)
    for (var e2 = a.child; null !== e2; )
      c2 |= e2.lanes | e2.childLanes, d2 |= e2.subtreeFlags & 14680064, d2 |= e2.flags & 14680064, e2.return = a, e2 = e2.sibling;
  else
    for (e2 = a.child; null !== e2; )
      c2 |= e2.lanes | e2.childLanes, d2 |= e2.subtreeFlags, d2 |= e2.flags, e2.return = a, e2 = e2.sibling;
  a.subtreeFlags |= d2;
  a.childLanes = c2;
  return b2;
}
function Fj(a, b2, c2) {
  var d2 = b2.pendingProps;
  wg(b2);
  switch (b2.tag) {
    case 2:
    case 16:
    case 15:
    case 0:
    case 11:
    case 7:
    case 8:
    case 12:
    case 9:
    case 14:
      return S(b2), null;
    case 1:
      return Zf(b2.type) && $f(), S(b2), null;
    case 3:
      d2 = b2.stateNode;
      Jh();
      E(Wf);
      E(H);
      Oh();
      d2.pendingContext && (d2.context = d2.pendingContext, d2.pendingContext = null);
      if (null === a || null === a.child)
        Gg(b2) ? b2.flags |= 4 : null === a || a.memoizedState.isDehydrated && 0 === (b2.flags & 256) || (b2.flags |= 1024, null !== zg && (Gj(zg), zg = null));
      Bj(a, b2);
      S(b2);
      return null;
    case 5:
      Lh(b2);
      var e2 = Hh(Gh.current);
      c2 = b2.type;
      if (null !== a && null != b2.stateNode)
        Cj(a, b2, c2, d2, e2), a.ref !== b2.ref && (b2.flags |= 512, b2.flags |= 2097152);
      else {
        if (!d2) {
          if (null === b2.stateNode)
            throw Error(p$4(166));
          S(b2);
          return null;
        }
        a = Hh(Eh.current);
        if (Gg(b2)) {
          d2 = b2.stateNode;
          c2 = b2.type;
          var f2 = b2.memoizedProps;
          d2[Of] = b2;
          d2[Pf] = f2;
          a = 0 !== (b2.mode & 1);
          switch (c2) {
            case "dialog":
              D("cancel", d2);
              D("close", d2);
              break;
            case "iframe":
            case "object":
            case "embed":
              D("load", d2);
              break;
            case "video":
            case "audio":
              for (e2 = 0; e2 < lf.length; e2++)
                D(lf[e2], d2);
              break;
            case "source":
              D("error", d2);
              break;
            case "img":
            case "image":
            case "link":
              D(
                "error",
                d2
              );
              D("load", d2);
              break;
            case "details":
              D("toggle", d2);
              break;
            case "input":
              Za(d2, f2);
              D("invalid", d2);
              break;
            case "select":
              d2._wrapperState = { wasMultiple: !!f2.multiple };
              D("invalid", d2);
              break;
            case "textarea":
              hb(d2, f2), D("invalid", d2);
          }
          ub(c2, f2);
          e2 = null;
          for (var g2 in f2)
            if (f2.hasOwnProperty(g2)) {
              var h2 = f2[g2];
              "children" === g2 ? "string" === typeof h2 ? d2.textContent !== h2 && (true !== f2.suppressHydrationWarning && Af(d2.textContent, h2, a), e2 = ["children", h2]) : "number" === typeof h2 && d2.textContent !== "" + h2 && (true !== f2.suppressHydrationWarning && Af(
                d2.textContent,
                h2,
                a
              ), e2 = ["children", "" + h2]) : ea.hasOwnProperty(g2) && null != h2 && "onScroll" === g2 && D("scroll", d2);
            }
          switch (c2) {
            case "input":
              Va(d2);
              db(d2, f2, true);
              break;
            case "textarea":
              Va(d2);
              jb(d2);
              break;
            case "select":
            case "option":
              break;
            default:
              "function" === typeof f2.onClick && (d2.onclick = Bf);
          }
          d2 = e2;
          b2.updateQueue = d2;
          null !== d2 && (b2.flags |= 4);
        } else {
          g2 = 9 === e2.nodeType ? e2 : e2.ownerDocument;
          "http://www.w3.org/1999/xhtml" === a && (a = kb(c2));
          "http://www.w3.org/1999/xhtml" === a ? "script" === c2 ? (a = g2.createElement("div"), a.innerHTML = "<script><\/script>", a = a.removeChild(a.firstChild)) : "string" === typeof d2.is ? a = g2.createElement(c2, { is: d2.is }) : (a = g2.createElement(c2), "select" === c2 && (g2 = a, d2.multiple ? g2.multiple = true : d2.size && (g2.size = d2.size))) : a = g2.createElementNS(a, c2);
          a[Of] = b2;
          a[Pf] = d2;
          Aj(a, b2, false, false);
          b2.stateNode = a;
          a: {
            g2 = vb(c2, d2);
            switch (c2) {
              case "dialog":
                D("cancel", a);
                D("close", a);
                e2 = d2;
                break;
              case "iframe":
              case "object":
              case "embed":
                D("load", a);
                e2 = d2;
                break;
              case "video":
              case "audio":
                for (e2 = 0; e2 < lf.length; e2++)
                  D(lf[e2], a);
                e2 = d2;
                break;
              case "source":
                D("error", a);
                e2 = d2;
                break;
              case "img":
              case "image":
              case "link":
                D(
                  "error",
                  a
                );
                D("load", a);
                e2 = d2;
                break;
              case "details":
                D("toggle", a);
                e2 = d2;
                break;
              case "input":
                Za(a, d2);
                e2 = Ya(a, d2);
                D("invalid", a);
                break;
              case "option":
                e2 = d2;
                break;
              case "select":
                a._wrapperState = { wasMultiple: !!d2.multiple };
                e2 = A$1({}, d2, { value: void 0 });
                D("invalid", a);
                break;
              case "textarea":
                hb(a, d2);
                e2 = gb(a, d2);
                D("invalid", a);
                break;
              default:
                e2 = d2;
            }
            ub(c2, e2);
            h2 = e2;
            for (f2 in h2)
              if (h2.hasOwnProperty(f2)) {
                var k2 = h2[f2];
                "style" === f2 ? sb(a, k2) : "dangerouslySetInnerHTML" === f2 ? (k2 = k2 ? k2.__html : void 0, null != k2 && nb(a, k2)) : "children" === f2 ? "string" === typeof k2 ? ("textarea" !== c2 || "" !== k2) && ob(a, k2) : "number" === typeof k2 && ob(a, "" + k2) : "suppressContentEditableWarning" !== f2 && "suppressHydrationWarning" !== f2 && "autoFocus" !== f2 && (ea.hasOwnProperty(f2) ? null != k2 && "onScroll" === f2 && D("scroll", a) : null != k2 && ta(a, f2, k2, g2));
              }
            switch (c2) {
              case "input":
                Va(a);
                db(a, d2, false);
                break;
              case "textarea":
                Va(a);
                jb(a);
                break;
              case "option":
                null != d2.value && a.setAttribute("value", "" + Sa(d2.value));
                break;
              case "select":
                a.multiple = !!d2.multiple;
                f2 = d2.value;
                null != f2 ? fb(a, !!d2.multiple, f2, false) : null != d2.defaultValue && fb(
                  a,
                  !!d2.multiple,
                  d2.defaultValue,
                  true
                );
                break;
              default:
                "function" === typeof e2.onClick && (a.onclick = Bf);
            }
            switch (c2) {
              case "button":
              case "input":
              case "select":
              case "textarea":
                d2 = !!d2.autoFocus;
                break a;
              case "img":
                d2 = true;
                break a;
              default:
                d2 = false;
            }
          }
          d2 && (b2.flags |= 4);
        }
        null !== b2.ref && (b2.flags |= 512, b2.flags |= 2097152);
      }
      S(b2);
      return null;
    case 6:
      if (a && null != b2.stateNode)
        Dj(a, b2, a.memoizedProps, d2);
      else {
        if ("string" !== typeof d2 && null === b2.stateNode)
          throw Error(p$4(166));
        c2 = Hh(Gh.current);
        Hh(Eh.current);
        if (Gg(b2)) {
          d2 = b2.stateNode;
          c2 = b2.memoizedProps;
          d2[Of] = b2;
          if (f2 = d2.nodeValue !== c2) {
            if (a = xg, null !== a)
              switch (a.tag) {
                case 3:
                  Af(d2.nodeValue, c2, 0 !== (a.mode & 1));
                  break;
                case 5:
                  true !== a.memoizedProps.suppressHydrationWarning && Af(d2.nodeValue, c2, 0 !== (a.mode & 1));
              }
          }
          f2 && (b2.flags |= 4);
        } else
          d2 = (9 === c2.nodeType ? c2 : c2.ownerDocument).createTextNode(d2), d2[Of] = b2, b2.stateNode = d2;
      }
      S(b2);
      return null;
    case 13:
      E(M);
      d2 = b2.memoizedState;
      if (null === a || null !== a.memoizedState && null !== a.memoizedState.dehydrated) {
        if (I && null !== yg && 0 !== (b2.mode & 1) && 0 === (b2.flags & 128))
          Hg(), Ig(), b2.flags |= 98560, f2 = false;
        else if (f2 = Gg(b2), null !== d2 && null !== d2.dehydrated) {
          if (null === a) {
            if (!f2)
              throw Error(p$4(318));
            f2 = b2.memoizedState;
            f2 = null !== f2 ? f2.dehydrated : null;
            if (!f2)
              throw Error(p$4(317));
            f2[Of] = b2;
          } else
            Ig(), 0 === (b2.flags & 128) && (b2.memoizedState = null), b2.flags |= 4;
          S(b2);
          f2 = false;
        } else
          null !== zg && (Gj(zg), zg = null), f2 = true;
        if (!f2)
          return b2.flags & 65536 ? b2 : null;
      }
      if (0 !== (b2.flags & 128))
        return b2.lanes = c2, b2;
      d2 = null !== d2;
      d2 !== (null !== a && null !== a.memoizedState) && d2 && (b2.child.flags |= 8192, 0 !== (b2.mode & 1) && (null === a || 0 !== (M.current & 1) ? 0 === T && (T = 3) : uj()));
      null !== b2.updateQueue && (b2.flags |= 4);
      S(b2);
      return null;
    case 4:
      return Jh(), Bj(a, b2), null === a && sf(b2.stateNode.containerInfo), S(b2), null;
    case 10:
      return Rg(b2.type._context), S(b2), null;
    case 17:
      return Zf(b2.type) && $f(), S(b2), null;
    case 19:
      E(M);
      f2 = b2.memoizedState;
      if (null === f2)
        return S(b2), null;
      d2 = 0 !== (b2.flags & 128);
      g2 = f2.rendering;
      if (null === g2)
        if (d2)
          Ej(f2, false);
        else {
          if (0 !== T || null !== a && 0 !== (a.flags & 128))
            for (a = b2.child; null !== a; ) {
              g2 = Mh(a);
              if (null !== g2) {
                b2.flags |= 128;
                Ej(f2, false);
                d2 = g2.updateQueue;
                null !== d2 && (b2.updateQueue = d2, b2.flags |= 4);
                b2.subtreeFlags = 0;
                d2 = c2;
                for (c2 = b2.child; null !== c2; )
                  f2 = c2, a = d2, f2.flags &= 14680066, g2 = f2.alternate, null === g2 ? (f2.childLanes = 0, f2.lanes = a, f2.child = null, f2.subtreeFlags = 0, f2.memoizedProps = null, f2.memoizedState = null, f2.updateQueue = null, f2.dependencies = null, f2.stateNode = null) : (f2.childLanes = g2.childLanes, f2.lanes = g2.lanes, f2.child = g2.child, f2.subtreeFlags = 0, f2.deletions = null, f2.memoizedProps = g2.memoizedProps, f2.memoizedState = g2.memoizedState, f2.updateQueue = g2.updateQueue, f2.type = g2.type, a = g2.dependencies, f2.dependencies = null === a ? null : { lanes: a.lanes, firstContext: a.firstContext }), c2 = c2.sibling;
                G(M, M.current & 1 | 2);
                return b2.child;
              }
              a = a.sibling;
            }
          null !== f2.tail && B() > Hj && (b2.flags |= 128, d2 = true, Ej(f2, false), b2.lanes = 4194304);
        }
      else {
        if (!d2)
          if (a = Mh(g2), null !== a) {
            if (b2.flags |= 128, d2 = true, c2 = a.updateQueue, null !== c2 && (b2.updateQueue = c2, b2.flags |= 4), Ej(f2, true), null === f2.tail && "hidden" === f2.tailMode && !g2.alternate && !I)
              return S(b2), null;
          } else
            2 * B() - f2.renderingStartTime > Hj && 1073741824 !== c2 && (b2.flags |= 128, d2 = true, Ej(f2, false), b2.lanes = 4194304);
        f2.isBackwards ? (g2.sibling = b2.child, b2.child = g2) : (c2 = f2.last, null !== c2 ? c2.sibling = g2 : b2.child = g2, f2.last = g2);
      }
      if (null !== f2.tail)
        return b2 = f2.tail, f2.rendering = b2, f2.tail = b2.sibling, f2.renderingStartTime = B(), b2.sibling = null, c2 = M.current, G(M, d2 ? c2 & 1 | 2 : c2 & 1), b2;
      S(b2);
      return null;
    case 22:
    case 23:
      return Ij(), d2 = null !== b2.memoizedState, null !== a && null !== a.memoizedState !== d2 && (b2.flags |= 8192), d2 && 0 !== (b2.mode & 1) ? 0 !== (gj & 1073741824) && (S(b2), b2.subtreeFlags & 6 && (b2.flags |= 8192)) : S(b2), null;
    case 24:
      return null;
    case 25:
      return null;
  }
  throw Error(p$4(156, b2.tag));
}
function Jj(a, b2) {
  wg(b2);
  switch (b2.tag) {
    case 1:
      return Zf(b2.type) && $f(), a = b2.flags, a & 65536 ? (b2.flags = a & -65537 | 128, b2) : null;
    case 3:
      return Jh(), E(Wf), E(H), Oh(), a = b2.flags, 0 !== (a & 65536) && 0 === (a & 128) ? (b2.flags = a & -65537 | 128, b2) : null;
    case 5:
      return Lh(b2), null;
    case 13:
      E(M);
      a = b2.memoizedState;
      if (null !== a && null !== a.dehydrated) {
        if (null === b2.alternate)
          throw Error(p$4(340));
        Ig();
      }
      a = b2.flags;
      return a & 65536 ? (b2.flags = a & -65537 | 128, b2) : null;
    case 19:
      return E(M), null;
    case 4:
      return Jh(), null;
    case 10:
      return Rg(b2.type._context), null;
    case 22:
    case 23:
      return Ij(), null;
    case 24:
      return null;
    default:
      return null;
  }
}
var Kj = false, U = false, Lj = "function" === typeof WeakSet ? WeakSet : Set, V = null;
function Mj(a, b2) {
  var c2 = a.ref;
  if (null !== c2)
    if ("function" === typeof c2)
      try {
        c2(null);
      } catch (d2) {
        W(a, b2, d2);
      }
    else
      c2.current = null;
}
function Nj(a, b2, c2) {
  try {
    c2();
  } catch (d2) {
    W(a, b2, d2);
  }
}
var Oj = false;
function Pj(a, b2) {
  Cf = dd;
  a = Me();
  if (Ne(a)) {
    if ("selectionStart" in a)
      var c2 = { start: a.selectionStart, end: a.selectionEnd };
    else
      a: {
        c2 = (c2 = a.ownerDocument) && c2.defaultView || window;
        var d2 = c2.getSelection && c2.getSelection();
        if (d2 && 0 !== d2.rangeCount) {
          c2 = d2.anchorNode;
          var e2 = d2.anchorOffset, f2 = d2.focusNode;
          d2 = d2.focusOffset;
          try {
            c2.nodeType, f2.nodeType;
          } catch (F2) {
            c2 = null;
            break a;
          }
          var g2 = 0, h2 = -1, k2 = -1, l2 = 0, m2 = 0, q2 = a, r2 = null;
          b:
            for (; ; ) {
              for (var y2; ; ) {
                q2 !== c2 || 0 !== e2 && 3 !== q2.nodeType || (h2 = g2 + e2);
                q2 !== f2 || 0 !== d2 && 3 !== q2.nodeType || (k2 = g2 + d2);
                3 === q2.nodeType && (g2 += q2.nodeValue.length);
                if (null === (y2 = q2.firstChild))
                  break;
                r2 = q2;
                q2 = y2;
              }
              for (; ; ) {
                if (q2 === a)
                  break b;
                r2 === c2 && ++l2 === e2 && (h2 = g2);
                r2 === f2 && ++m2 === d2 && (k2 = g2);
                if (null !== (y2 = q2.nextSibling))
                  break;
                q2 = r2;
                r2 = q2.parentNode;
              }
              q2 = y2;
            }
          c2 = -1 === h2 || -1 === k2 ? null : { start: h2, end: k2 };
        } else
          c2 = null;
      }
    c2 = c2 || { start: 0, end: 0 };
  } else
    c2 = null;
  Df = { focusedElem: a, selectionRange: c2 };
  dd = false;
  for (V = b2; null !== V; )
    if (b2 = V, a = b2.child, 0 !== (b2.subtreeFlags & 1028) && null !== a)
      a.return = b2, V = a;
    else
      for (; null !== V; ) {
        b2 = V;
        try {
          var n2 = b2.alternate;
          if (0 !== (b2.flags & 1024))
            switch (b2.tag) {
              case 0:
              case 11:
              case 15:
                break;
              case 1:
                if (null !== n2) {
                  var t2 = n2.memoizedProps, J2 = n2.memoizedState, x2 = b2.stateNode, w2 = x2.getSnapshotBeforeUpdate(b2.elementType === b2.type ? t2 : Lg(b2.type, t2), J2);
                  x2.__reactInternalSnapshotBeforeUpdate = w2;
                }
                break;
              case 3:
                var u2 = b2.stateNode.containerInfo;
                1 === u2.nodeType ? u2.textContent = "" : 9 === u2.nodeType && u2.documentElement && u2.removeChild(u2.documentElement);
                break;
              case 5:
              case 6:
              case 4:
              case 17:
                break;
              default:
                throw Error(p$4(163));
            }
        } catch (F2) {
          W(b2, b2.return, F2);
        }
        a = b2.sibling;
        if (null !== a) {
          a.return = b2.return;
          V = a;
          break;
        }
        V = b2.return;
      }
  n2 = Oj;
  Oj = false;
  return n2;
}
function Qj(a, b2, c2) {
  var d2 = b2.updateQueue;
  d2 = null !== d2 ? d2.lastEffect : null;
  if (null !== d2) {
    var e2 = d2 = d2.next;
    do {
      if ((e2.tag & a) === a) {
        var f2 = e2.destroy;
        e2.destroy = void 0;
        void 0 !== f2 && Nj(b2, c2, f2);
      }
      e2 = e2.next;
    } while (e2 !== d2);
  }
}
function Rj(a, b2) {
  b2 = b2.updateQueue;
  b2 = null !== b2 ? b2.lastEffect : null;
  if (null !== b2) {
    var c2 = b2 = b2.next;
    do {
      if ((c2.tag & a) === a) {
        var d2 = c2.create;
        c2.destroy = d2();
      }
      c2 = c2.next;
    } while (c2 !== b2);
  }
}
function Sj(a) {
  var b2 = a.ref;
  if (null !== b2) {
    var c2 = a.stateNode;
    switch (a.tag) {
      case 5:
        a = c2;
        break;
      default:
        a = c2;
    }
    "function" === typeof b2 ? b2(a) : b2.current = a;
  }
}
function Tj(a) {
  var b2 = a.alternate;
  null !== b2 && (a.alternate = null, Tj(b2));
  a.child = null;
  a.deletions = null;
  a.sibling = null;
  5 === a.tag && (b2 = a.stateNode, null !== b2 && (delete b2[Of], delete b2[Pf], delete b2[of], delete b2[Qf], delete b2[Rf]));
  a.stateNode = null;
  a.return = null;
  a.dependencies = null;
  a.memoizedProps = null;
  a.memoizedState = null;
  a.pendingProps = null;
  a.stateNode = null;
  a.updateQueue = null;
}
function Uj(a) {
  return 5 === a.tag || 3 === a.tag || 4 === a.tag;
}
function Vj(a) {
  a:
    for (; ; ) {
      for (; null === a.sibling; ) {
        if (null === a.return || Uj(a.return))
          return null;
        a = a.return;
      }
      a.sibling.return = a.return;
      for (a = a.sibling; 5 !== a.tag && 6 !== a.tag && 18 !== a.tag; ) {
        if (a.flags & 2)
          continue a;
        if (null === a.child || 4 === a.tag)
          continue a;
        else
          a.child.return = a, a = a.child;
      }
      if (!(a.flags & 2))
        return a.stateNode;
    }
}
function Wj(a, b2, c2) {
  var d2 = a.tag;
  if (5 === d2 || 6 === d2)
    a = a.stateNode, b2 ? 8 === c2.nodeType ? c2.parentNode.insertBefore(a, b2) : c2.insertBefore(a, b2) : (8 === c2.nodeType ? (b2 = c2.parentNode, b2.insertBefore(a, c2)) : (b2 = c2, b2.appendChild(a)), c2 = c2._reactRootContainer, null !== c2 && void 0 !== c2 || null !== b2.onclick || (b2.onclick = Bf));
  else if (4 !== d2 && (a = a.child, null !== a))
    for (Wj(a, b2, c2), a = a.sibling; null !== a; )
      Wj(a, b2, c2), a = a.sibling;
}
function Xj(a, b2, c2) {
  var d2 = a.tag;
  if (5 === d2 || 6 === d2)
    a = a.stateNode, b2 ? c2.insertBefore(a, b2) : c2.appendChild(a);
  else if (4 !== d2 && (a = a.child, null !== a))
    for (Xj(a, b2, c2), a = a.sibling; null !== a; )
      Xj(a, b2, c2), a = a.sibling;
}
var X = null, Yj = false;
function Zj(a, b2, c2) {
  for (c2 = c2.child; null !== c2; )
    ak(a, b2, c2), c2 = c2.sibling;
}
function ak(a, b2, c2) {
  if (lc && "function" === typeof lc.onCommitFiberUnmount)
    try {
      lc.onCommitFiberUnmount(kc, c2);
    } catch (h2) {
    }
  switch (c2.tag) {
    case 5:
      U || Mj(c2, b2);
    case 6:
      var d2 = X, e2 = Yj;
      X = null;
      Zj(a, b2, c2);
      X = d2;
      Yj = e2;
      null !== X && (Yj ? (a = X, c2 = c2.stateNode, 8 === a.nodeType ? a.parentNode.removeChild(c2) : a.removeChild(c2)) : X.removeChild(c2.stateNode));
      break;
    case 18:
      null !== X && (Yj ? (a = X, c2 = c2.stateNode, 8 === a.nodeType ? Kf(a.parentNode, c2) : 1 === a.nodeType && Kf(a, c2), bd(a)) : Kf(X, c2.stateNode));
      break;
    case 4:
      d2 = X;
      e2 = Yj;
      X = c2.stateNode.containerInfo;
      Yj = true;
      Zj(a, b2, c2);
      X = d2;
      Yj = e2;
      break;
    case 0:
    case 11:
    case 14:
    case 15:
      if (!U && (d2 = c2.updateQueue, null !== d2 && (d2 = d2.lastEffect, null !== d2))) {
        e2 = d2 = d2.next;
        do {
          var f2 = e2, g2 = f2.destroy;
          f2 = f2.tag;
          void 0 !== g2 && (0 !== (f2 & 2) ? Nj(c2, b2, g2) : 0 !== (f2 & 4) && Nj(c2, b2, g2));
          e2 = e2.next;
        } while (e2 !== d2);
      }
      Zj(a, b2, c2);
      break;
    case 1:
      if (!U && (Mj(c2, b2), d2 = c2.stateNode, "function" === typeof d2.componentWillUnmount))
        try {
          d2.props = c2.memoizedProps, d2.state = c2.memoizedState, d2.componentWillUnmount();
        } catch (h2) {
          W(c2, b2, h2);
        }
      Zj(a, b2, c2);
      break;
    case 21:
      Zj(a, b2, c2);
      break;
    case 22:
      c2.mode & 1 ? (U = (d2 = U) || null !== c2.memoizedState, Zj(a, b2, c2), U = d2) : Zj(a, b2, c2);
      break;
    default:
      Zj(a, b2, c2);
  }
}
function bk(a) {
  var b2 = a.updateQueue;
  if (null !== b2) {
    a.updateQueue = null;
    var c2 = a.stateNode;
    null === c2 && (c2 = a.stateNode = new Lj());
    b2.forEach(function(b3) {
      var d2 = ck.bind(null, a, b3);
      c2.has(b3) || (c2.add(b3), b3.then(d2, d2));
    });
  }
}
function dk(a, b2) {
  var c2 = b2.deletions;
  if (null !== c2)
    for (var d2 = 0; d2 < c2.length; d2++) {
      var e2 = c2[d2];
      try {
        var f2 = a, g2 = b2, h2 = g2;
        a:
          for (; null !== h2; ) {
            switch (h2.tag) {
              case 5:
                X = h2.stateNode;
                Yj = false;
                break a;
              case 3:
                X = h2.stateNode.containerInfo;
                Yj = true;
                break a;
              case 4:
                X = h2.stateNode.containerInfo;
                Yj = true;
                break a;
            }
            h2 = h2.return;
          }
        if (null === X)
          throw Error(p$4(160));
        ak(f2, g2, e2);
        X = null;
        Yj = false;
        var k2 = e2.alternate;
        null !== k2 && (k2.return = null);
        e2.return = null;
      } catch (l2) {
        W(e2, b2, l2);
      }
    }
  if (b2.subtreeFlags & 12854)
    for (b2 = b2.child; null !== b2; )
      ek(b2, a), b2 = b2.sibling;
}
function ek(a, b2) {
  var c2 = a.alternate, d2 = a.flags;
  switch (a.tag) {
    case 0:
    case 11:
    case 14:
    case 15:
      dk(b2, a);
      fk(a);
      if (d2 & 4) {
        try {
          Qj(3, a, a.return), Rj(3, a);
        } catch (t2) {
          W(a, a.return, t2);
        }
        try {
          Qj(5, a, a.return);
        } catch (t2) {
          W(a, a.return, t2);
        }
      }
      break;
    case 1:
      dk(b2, a);
      fk(a);
      d2 & 512 && null !== c2 && Mj(c2, c2.return);
      break;
    case 5:
      dk(b2, a);
      fk(a);
      d2 & 512 && null !== c2 && Mj(c2, c2.return);
      if (a.flags & 32) {
        var e2 = a.stateNode;
        try {
          ob(e2, "");
        } catch (t2) {
          W(a, a.return, t2);
        }
      }
      if (d2 & 4 && (e2 = a.stateNode, null != e2)) {
        var f2 = a.memoizedProps, g2 = null !== c2 ? c2.memoizedProps : f2, h2 = a.type, k2 = a.updateQueue;
        a.updateQueue = null;
        if (null !== k2)
          try {
            "input" === h2 && "radio" === f2.type && null != f2.name && ab(e2, f2);
            vb(h2, g2);
            var l2 = vb(h2, f2);
            for (g2 = 0; g2 < k2.length; g2 += 2) {
              var m2 = k2[g2], q2 = k2[g2 + 1];
              "style" === m2 ? sb(e2, q2) : "dangerouslySetInnerHTML" === m2 ? nb(e2, q2) : "children" === m2 ? ob(e2, q2) : ta(e2, m2, q2, l2);
            }
            switch (h2) {
              case "input":
                bb(e2, f2);
                break;
              case "textarea":
                ib(e2, f2);
                break;
              case "select":
                var r2 = e2._wrapperState.wasMultiple;
                e2._wrapperState.wasMultiple = !!f2.multiple;
                var y2 = f2.value;
                null != y2 ? fb(e2, !!f2.multiple, y2, false) : r2 !== !!f2.multiple && (null != f2.defaultValue ? fb(
                  e2,
                  !!f2.multiple,
                  f2.defaultValue,
                  true
                ) : fb(e2, !!f2.multiple, f2.multiple ? [] : "", false));
            }
            e2[Pf] = f2;
          } catch (t2) {
            W(a, a.return, t2);
          }
      }
      break;
    case 6:
      dk(b2, a);
      fk(a);
      if (d2 & 4) {
        if (null === a.stateNode)
          throw Error(p$4(162));
        e2 = a.stateNode;
        f2 = a.memoizedProps;
        try {
          e2.nodeValue = f2;
        } catch (t2) {
          W(a, a.return, t2);
        }
      }
      break;
    case 3:
      dk(b2, a);
      fk(a);
      if (d2 & 4 && null !== c2 && c2.memoizedState.isDehydrated)
        try {
          bd(b2.containerInfo);
        } catch (t2) {
          W(a, a.return, t2);
        }
      break;
    case 4:
      dk(b2, a);
      fk(a);
      break;
    case 13:
      dk(b2, a);
      fk(a);
      e2 = a.child;
      e2.flags & 8192 && (f2 = null !== e2.memoizedState, e2.stateNode.isHidden = f2, !f2 || null !== e2.alternate && null !== e2.alternate.memoizedState || (gk = B()));
      d2 & 4 && bk(a);
      break;
    case 22:
      m2 = null !== c2 && null !== c2.memoizedState;
      a.mode & 1 ? (U = (l2 = U) || m2, dk(b2, a), U = l2) : dk(b2, a);
      fk(a);
      if (d2 & 8192) {
        l2 = null !== a.memoizedState;
        if ((a.stateNode.isHidden = l2) && !m2 && 0 !== (a.mode & 1))
          for (V = a, m2 = a.child; null !== m2; ) {
            for (q2 = V = m2; null !== V; ) {
              r2 = V;
              y2 = r2.child;
              switch (r2.tag) {
                case 0:
                case 11:
                case 14:
                case 15:
                  Qj(4, r2, r2.return);
                  break;
                case 1:
                  Mj(r2, r2.return);
                  var n2 = r2.stateNode;
                  if ("function" === typeof n2.componentWillUnmount) {
                    d2 = r2;
                    c2 = r2.return;
                    try {
                      b2 = d2, n2.props = b2.memoizedProps, n2.state = b2.memoizedState, n2.componentWillUnmount();
                    } catch (t2) {
                      W(d2, c2, t2);
                    }
                  }
                  break;
                case 5:
                  Mj(r2, r2.return);
                  break;
                case 22:
                  if (null !== r2.memoizedState) {
                    hk(q2);
                    continue;
                  }
              }
              null !== y2 ? (y2.return = r2, V = y2) : hk(q2);
            }
            m2 = m2.sibling;
          }
        a:
          for (m2 = null, q2 = a; ; ) {
            if (5 === q2.tag) {
              if (null === m2) {
                m2 = q2;
                try {
                  e2 = q2.stateNode, l2 ? (f2 = e2.style, "function" === typeof f2.setProperty ? f2.setProperty("display", "none", "important") : f2.display = "none") : (h2 = q2.stateNode, k2 = q2.memoizedProps.style, g2 = void 0 !== k2 && null !== k2 && k2.hasOwnProperty("display") ? k2.display : null, h2.style.display = rb("display", g2));
                } catch (t2) {
                  W(a, a.return, t2);
                }
              }
            } else if (6 === q2.tag) {
              if (null === m2)
                try {
                  q2.stateNode.nodeValue = l2 ? "" : q2.memoizedProps;
                } catch (t2) {
                  W(a, a.return, t2);
                }
            } else if ((22 !== q2.tag && 23 !== q2.tag || null === q2.memoizedState || q2 === a) && null !== q2.child) {
              q2.child.return = q2;
              q2 = q2.child;
              continue;
            }
            if (q2 === a)
              break a;
            for (; null === q2.sibling; ) {
              if (null === q2.return || q2.return === a)
                break a;
              m2 === q2 && (m2 = null);
              q2 = q2.return;
            }
            m2 === q2 && (m2 = null);
            q2.sibling.return = q2.return;
            q2 = q2.sibling;
          }
      }
      break;
    case 19:
      dk(b2, a);
      fk(a);
      d2 & 4 && bk(a);
      break;
    case 21:
      break;
    default:
      dk(
        b2,
        a
      ), fk(a);
  }
}
function fk(a) {
  var b2 = a.flags;
  if (b2 & 2) {
    try {
      a: {
        for (var c2 = a.return; null !== c2; ) {
          if (Uj(c2)) {
            var d2 = c2;
            break a;
          }
          c2 = c2.return;
        }
        throw Error(p$4(160));
      }
      switch (d2.tag) {
        case 5:
          var e2 = d2.stateNode;
          d2.flags & 32 && (ob(e2, ""), d2.flags &= -33);
          var f2 = Vj(a);
          Xj(a, f2, e2);
          break;
        case 3:
        case 4:
          var g2 = d2.stateNode.containerInfo, h2 = Vj(a);
          Wj(a, h2, g2);
          break;
        default:
          throw Error(p$4(161));
      }
    } catch (k2) {
      W(a, a.return, k2);
    }
    a.flags &= -3;
  }
  b2 & 4096 && (a.flags &= -4097);
}
function ik(a, b2, c2) {
  V = a;
  jk(a);
}
function jk(a, b2, c2) {
  for (var d2 = 0 !== (a.mode & 1); null !== V; ) {
    var e2 = V, f2 = e2.child;
    if (22 === e2.tag && d2) {
      var g2 = null !== e2.memoizedState || Kj;
      if (!g2) {
        var h2 = e2.alternate, k2 = null !== h2 && null !== h2.memoizedState || U;
        h2 = Kj;
        var l2 = U;
        Kj = g2;
        if ((U = k2) && !l2)
          for (V = e2; null !== V; )
            g2 = V, k2 = g2.child, 22 === g2.tag && null !== g2.memoizedState ? kk(e2) : null !== k2 ? (k2.return = g2, V = k2) : kk(e2);
        for (; null !== f2; )
          V = f2, jk(f2), f2 = f2.sibling;
        V = e2;
        Kj = h2;
        U = l2;
      }
      lk(a);
    } else
      0 !== (e2.subtreeFlags & 8772) && null !== f2 ? (f2.return = e2, V = f2) : lk(a);
  }
}
function lk(a) {
  for (; null !== V; ) {
    var b2 = V;
    if (0 !== (b2.flags & 8772)) {
      var c2 = b2.alternate;
      try {
        if (0 !== (b2.flags & 8772))
          switch (b2.tag) {
            case 0:
            case 11:
            case 15:
              U || Rj(5, b2);
              break;
            case 1:
              var d2 = b2.stateNode;
              if (b2.flags & 4 && !U)
                if (null === c2)
                  d2.componentDidMount();
                else {
                  var e2 = b2.elementType === b2.type ? c2.memoizedProps : Lg(b2.type, c2.memoizedProps);
                  d2.componentDidUpdate(e2, c2.memoizedState, d2.__reactInternalSnapshotBeforeUpdate);
                }
              var f2 = b2.updateQueue;
              null !== f2 && ih(b2, f2, d2);
              break;
            case 3:
              var g2 = b2.updateQueue;
              if (null !== g2) {
                c2 = null;
                if (null !== b2.child)
                  switch (b2.child.tag) {
                    case 5:
                      c2 = b2.child.stateNode;
                      break;
                    case 1:
                      c2 = b2.child.stateNode;
                  }
                ih(b2, g2, c2);
              }
              break;
            case 5:
              var h2 = b2.stateNode;
              if (null === c2 && b2.flags & 4) {
                c2 = h2;
                var k2 = b2.memoizedProps;
                switch (b2.type) {
                  case "button":
                  case "input":
                  case "select":
                  case "textarea":
                    k2.autoFocus && c2.focus();
                    break;
                  case "img":
                    k2.src && (c2.src = k2.src);
                }
              }
              break;
            case 6:
              break;
            case 4:
              break;
            case 12:
              break;
            case 13:
              if (null === b2.memoizedState) {
                var l2 = b2.alternate;
                if (null !== l2) {
                  var m2 = l2.memoizedState;
                  if (null !== m2) {
                    var q2 = m2.dehydrated;
                    null !== q2 && bd(q2);
                  }
                }
              }
              break;
            case 19:
            case 17:
            case 21:
            case 22:
            case 23:
            case 25:
              break;
            default:
              throw Error(p$4(163));
          }
        U || b2.flags & 512 && Sj(b2);
      } catch (r2) {
        W(b2, b2.return, r2);
      }
    }
    if (b2 === a) {
      V = null;
      break;
    }
    c2 = b2.sibling;
    if (null !== c2) {
      c2.return = b2.return;
      V = c2;
      break;
    }
    V = b2.return;
  }
}
function hk(a) {
  for (; null !== V; ) {
    var b2 = V;
    if (b2 === a) {
      V = null;
      break;
    }
    var c2 = b2.sibling;
    if (null !== c2) {
      c2.return = b2.return;
      V = c2;
      break;
    }
    V = b2.return;
  }
}
function kk(a) {
  for (; null !== V; ) {
    var b2 = V;
    try {
      switch (b2.tag) {
        case 0:
        case 11:
        case 15:
          var c2 = b2.return;
          try {
            Rj(4, b2);
          } catch (k2) {
            W(b2, c2, k2);
          }
          break;
        case 1:
          var d2 = b2.stateNode;
          if ("function" === typeof d2.componentDidMount) {
            var e2 = b2.return;
            try {
              d2.componentDidMount();
            } catch (k2) {
              W(b2, e2, k2);
            }
          }
          var f2 = b2.return;
          try {
            Sj(b2);
          } catch (k2) {
            W(b2, f2, k2);
          }
          break;
        case 5:
          var g2 = b2.return;
          try {
            Sj(b2);
          } catch (k2) {
            W(b2, g2, k2);
          }
      }
    } catch (k2) {
      W(b2, b2.return, k2);
    }
    if (b2 === a) {
      V = null;
      break;
    }
    var h2 = b2.sibling;
    if (null !== h2) {
      h2.return = b2.return;
      V = h2;
      break;
    }
    V = b2.return;
  }
}
var mk = Math.ceil, nk = ua.ReactCurrentDispatcher, ok = ua.ReactCurrentOwner, pk = ua.ReactCurrentBatchConfig, K = 0, R = null, Y = null, Z = 0, gj = 0, fj = Uf(0), T = 0, qk = null, hh = 0, rk = 0, sk = 0, tk = null, uk = null, gk = 0, Hj = Infinity, vk = null, Pi = false, Qi = null, Si = null, wk = false, xk = null, yk = 0, zk = 0, Ak = null, Bk = -1, Ck = 0;
function L() {
  return 0 !== (K & 6) ? B() : -1 !== Bk ? Bk : Bk = B();
}
function lh(a) {
  if (0 === (a.mode & 1))
    return 1;
  if (0 !== (K & 2) && 0 !== Z)
    return Z & -Z;
  if (null !== Kg.transition)
    return 0 === Ck && (Ck = yc()), Ck;
  a = C;
  if (0 !== a)
    return a;
  a = window.event;
  a = void 0 === a ? 16 : jd(a.type);
  return a;
}
function mh(a, b2, c2, d2) {
  if (50 < zk)
    throw zk = 0, Ak = null, Error(p$4(185));
  Ac(a, c2, d2);
  if (0 === (K & 2) || a !== R)
    a === R && (0 === (K & 2) && (rk |= c2), 4 === T && Dk(a, Z)), Ek(a, d2), 1 === c2 && 0 === K && 0 === (b2.mode & 1) && (Hj = B() + 500, fg && jg());
}
function Ek(a, b2) {
  var c2 = a.callbackNode;
  wc(a, b2);
  var d2 = uc(a, a === R ? Z : 0);
  if (0 === d2)
    null !== c2 && bc(c2), a.callbackNode = null, a.callbackPriority = 0;
  else if (b2 = d2 & -d2, a.callbackPriority !== b2) {
    null != c2 && bc(c2);
    if (1 === b2)
      0 === a.tag ? ig(Fk.bind(null, a)) : hg(Fk.bind(null, a)), Jf(function() {
        0 === (K & 6) && jg();
      }), c2 = null;
    else {
      switch (Dc(d2)) {
        case 1:
          c2 = fc;
          break;
        case 4:
          c2 = gc;
          break;
        case 16:
          c2 = hc;
          break;
        case 536870912:
          c2 = jc;
          break;
        default:
          c2 = hc;
      }
      c2 = Gk(c2, Hk.bind(null, a));
    }
    a.callbackPriority = b2;
    a.callbackNode = c2;
  }
}
function Hk(a, b2) {
  Bk = -1;
  Ck = 0;
  if (0 !== (K & 6))
    throw Error(p$4(327));
  var c2 = a.callbackNode;
  if (Ik() && a.callbackNode !== c2)
    return null;
  var d2 = uc(a, a === R ? Z : 0);
  if (0 === d2)
    return null;
  if (0 !== (d2 & 30) || 0 !== (d2 & a.expiredLanes) || b2)
    b2 = Jk(a, d2);
  else {
    b2 = d2;
    var e2 = K;
    K |= 2;
    var f2 = Kk();
    if (R !== a || Z !== b2)
      vk = null, Hj = B() + 500, Lk(a, b2);
    do
      try {
        Mk();
        break;
      } catch (h2) {
        Nk(a, h2);
      }
    while (1);
    Qg();
    nk.current = f2;
    K = e2;
    null !== Y ? b2 = 0 : (R = null, Z = 0, b2 = T);
  }
  if (0 !== b2) {
    2 === b2 && (e2 = xc(a), 0 !== e2 && (d2 = e2, b2 = Ok(a, e2)));
    if (1 === b2)
      throw c2 = qk, Lk(a, 0), Dk(a, d2), Ek(a, B()), c2;
    if (6 === b2)
      Dk(a, d2);
    else {
      e2 = a.current.alternate;
      if (0 === (d2 & 30) && !Pk(e2) && (b2 = Jk(a, d2), 2 === b2 && (f2 = xc(a), 0 !== f2 && (d2 = f2, b2 = Ok(a, f2))), 1 === b2))
        throw c2 = qk, Lk(a, 0), Dk(a, d2), Ek(a, B()), c2;
      a.finishedWork = e2;
      a.finishedLanes = d2;
      switch (b2) {
        case 0:
        case 1:
          throw Error(p$4(345));
        case 2:
          Qk(a, uk, vk);
          break;
        case 3:
          Dk(a, d2);
          if ((d2 & 130023424) === d2 && (b2 = gk + 500 - B(), 10 < b2)) {
            if (0 !== uc(a, 0))
              break;
            e2 = a.suspendedLanes;
            if ((e2 & d2) !== d2) {
              L();
              a.pingedLanes |= a.suspendedLanes & e2;
              break;
            }
            a.timeoutHandle = Ff(Qk.bind(null, a, uk, vk), b2);
            break;
          }
          Qk(a, uk, vk);
          break;
        case 4:
          Dk(a, d2);
          if ((d2 & 4194240) === d2)
            break;
          b2 = a.eventTimes;
          for (e2 = -1; 0 < d2; ) {
            var g2 = 31 - oc(d2);
            f2 = 1 << g2;
            g2 = b2[g2];
            g2 > e2 && (e2 = g2);
            d2 &= ~f2;
          }
          d2 = e2;
          d2 = B() - d2;
          d2 = (120 > d2 ? 120 : 480 > d2 ? 480 : 1080 > d2 ? 1080 : 1920 > d2 ? 1920 : 3e3 > d2 ? 3e3 : 4320 > d2 ? 4320 : 1960 * mk(d2 / 1960)) - d2;
          if (10 < d2) {
            a.timeoutHandle = Ff(Qk.bind(null, a, uk, vk), d2);
            break;
          }
          Qk(a, uk, vk);
          break;
        case 5:
          Qk(a, uk, vk);
          break;
        default:
          throw Error(p$4(329));
      }
    }
  }
  Ek(a, B());
  return a.callbackNode === c2 ? Hk.bind(null, a) : null;
}
function Ok(a, b2) {
  var c2 = tk;
  a.current.memoizedState.isDehydrated && (Lk(a, b2).flags |= 256);
  a = Jk(a, b2);
  2 !== a && (b2 = uk, uk = c2, null !== b2 && Gj(b2));
  return a;
}
function Gj(a) {
  null === uk ? uk = a : uk.push.apply(uk, a);
}
function Pk(a) {
  for (var b2 = a; ; ) {
    if (b2.flags & 16384) {
      var c2 = b2.updateQueue;
      if (null !== c2 && (c2 = c2.stores, null !== c2))
        for (var d2 = 0; d2 < c2.length; d2++) {
          var e2 = c2[d2], f2 = e2.getSnapshot;
          e2 = e2.value;
          try {
            if (!He(f2(), e2))
              return false;
          } catch (g2) {
            return false;
          }
        }
    }
    c2 = b2.child;
    if (b2.subtreeFlags & 16384 && null !== c2)
      c2.return = b2, b2 = c2;
    else {
      if (b2 === a)
        break;
      for (; null === b2.sibling; ) {
        if (null === b2.return || b2.return === a)
          return true;
        b2 = b2.return;
      }
      b2.sibling.return = b2.return;
      b2 = b2.sibling;
    }
  }
  return true;
}
function Dk(a, b2) {
  b2 &= ~sk;
  b2 &= ~rk;
  a.suspendedLanes |= b2;
  a.pingedLanes &= ~b2;
  for (a = a.expirationTimes; 0 < b2; ) {
    var c2 = 31 - oc(b2), d2 = 1 << c2;
    a[c2] = -1;
    b2 &= ~d2;
  }
}
function Fk(a) {
  if (0 !== (K & 6))
    throw Error(p$4(327));
  Ik();
  var b2 = uc(a, 0);
  if (0 === (b2 & 1))
    return Ek(a, B()), null;
  var c2 = Jk(a, b2);
  if (0 !== a.tag && 2 === c2) {
    var d2 = xc(a);
    0 !== d2 && (b2 = d2, c2 = Ok(a, d2));
  }
  if (1 === c2)
    throw c2 = qk, Lk(a, 0), Dk(a, b2), Ek(a, B()), c2;
  if (6 === c2)
    throw Error(p$4(345));
  a.finishedWork = a.current.alternate;
  a.finishedLanes = b2;
  Qk(a, uk, vk);
  Ek(a, B());
  return null;
}
function Rk(a, b2) {
  var c2 = K;
  K |= 1;
  try {
    return a(b2);
  } finally {
    K = c2, 0 === K && (Hj = B() + 500, fg && jg());
  }
}
function Sk(a) {
  null !== xk && 0 === xk.tag && 0 === (K & 6) && Ik();
  var b2 = K;
  K |= 1;
  var c2 = pk.transition, d2 = C;
  try {
    if (pk.transition = null, C = 1, a)
      return a();
  } finally {
    C = d2, pk.transition = c2, K = b2, 0 === (K & 6) && jg();
  }
}
function Ij() {
  gj = fj.current;
  E(fj);
}
function Lk(a, b2) {
  a.finishedWork = null;
  a.finishedLanes = 0;
  var c2 = a.timeoutHandle;
  -1 !== c2 && (a.timeoutHandle = -1, Gf(c2));
  if (null !== Y)
    for (c2 = Y.return; null !== c2; ) {
      var d2 = c2;
      wg(d2);
      switch (d2.tag) {
        case 1:
          d2 = d2.type.childContextTypes;
          null !== d2 && void 0 !== d2 && $f();
          break;
        case 3:
          Jh();
          E(Wf);
          E(H);
          Oh();
          break;
        case 5:
          Lh(d2);
          break;
        case 4:
          Jh();
          break;
        case 13:
          E(M);
          break;
        case 19:
          E(M);
          break;
        case 10:
          Rg(d2.type._context);
          break;
        case 22:
        case 23:
          Ij();
      }
      c2 = c2.return;
    }
  R = a;
  Y = a = wh(a.current, null);
  Z = gj = b2;
  T = 0;
  qk = null;
  sk = rk = hh = 0;
  uk = tk = null;
  if (null !== Wg) {
    for (b2 = 0; b2 < Wg.length; b2++)
      if (c2 = Wg[b2], d2 = c2.interleaved, null !== d2) {
        c2.interleaved = null;
        var e2 = d2.next, f2 = c2.pending;
        if (null !== f2) {
          var g2 = f2.next;
          f2.next = e2;
          d2.next = g2;
        }
        c2.pending = d2;
      }
    Wg = null;
  }
  return a;
}
function Nk(a, b2) {
  do {
    var c2 = Y;
    try {
      Qg();
      Ph.current = ai;
      if (Sh) {
        for (var d2 = N.memoizedState; null !== d2; ) {
          var e2 = d2.queue;
          null !== e2 && (e2.pending = null);
          d2 = d2.next;
        }
        Sh = false;
      }
      Rh = 0;
      P = O = N = null;
      Th = false;
      Uh = 0;
      ok.current = null;
      if (null === c2 || null === c2.return) {
        T = 1;
        qk = b2;
        Y = null;
        break;
      }
      a: {
        var f2 = a, g2 = c2.return, h2 = c2, k2 = b2;
        b2 = Z;
        h2.flags |= 32768;
        if (null !== k2 && "object" === typeof k2 && "function" === typeof k2.then) {
          var l2 = k2, m2 = h2, q2 = m2.tag;
          if (0 === (m2.mode & 1) && (0 === q2 || 11 === q2 || 15 === q2)) {
            var r2 = m2.alternate;
            r2 ? (m2.updateQueue = r2.updateQueue, m2.memoizedState = r2.memoizedState, m2.lanes = r2.lanes) : (m2.updateQueue = null, m2.memoizedState = null);
          }
          var y2 = Vi(g2);
          if (null !== y2) {
            y2.flags &= -257;
            Wi(y2, g2, h2, f2, b2);
            y2.mode & 1 && Ti(f2, l2, b2);
            b2 = y2;
            k2 = l2;
            var n2 = b2.updateQueue;
            if (null === n2) {
              var t2 = /* @__PURE__ */ new Set();
              t2.add(k2);
              b2.updateQueue = t2;
            } else
              n2.add(k2);
            break a;
          } else {
            if (0 === (b2 & 1)) {
              Ti(f2, l2, b2);
              uj();
              break a;
            }
            k2 = Error(p$4(426));
          }
        } else if (I && h2.mode & 1) {
          var J2 = Vi(g2);
          if (null !== J2) {
            0 === (J2.flags & 65536) && (J2.flags |= 256);
            Wi(J2, g2, h2, f2, b2);
            Jg(Ki(k2, h2));
            break a;
          }
        }
        f2 = k2 = Ki(k2, h2);
        4 !== T && (T = 2);
        null === tk ? tk = [f2] : tk.push(f2);
        f2 = g2;
        do {
          switch (f2.tag) {
            case 3:
              f2.flags |= 65536;
              b2 &= -b2;
              f2.lanes |= b2;
              var x2 = Oi(f2, k2, b2);
              fh(f2, x2);
              break a;
            case 1:
              h2 = k2;
              var w2 = f2.type, u2 = f2.stateNode;
              if (0 === (f2.flags & 128) && ("function" === typeof w2.getDerivedStateFromError || null !== u2 && "function" === typeof u2.componentDidCatch && (null === Si || !Si.has(u2)))) {
                f2.flags |= 65536;
                b2 &= -b2;
                f2.lanes |= b2;
                var F2 = Ri(f2, h2, b2);
                fh(f2, F2);
                break a;
              }
          }
          f2 = f2.return;
        } while (null !== f2);
      }
      Tk(c2);
    } catch (na) {
      b2 = na;
      Y === c2 && null !== c2 && (Y = c2 = c2.return);
      continue;
    }
    break;
  } while (1);
}
function Kk() {
  var a = nk.current;
  nk.current = ai;
  return null === a ? ai : a;
}
function uj() {
  if (0 === T || 3 === T || 2 === T)
    T = 4;
  null === R || 0 === (hh & 268435455) && 0 === (rk & 268435455) || Dk(R, Z);
}
function Jk(a, b2) {
  var c2 = K;
  K |= 2;
  var d2 = Kk();
  if (R !== a || Z !== b2)
    vk = null, Lk(a, b2);
  do
    try {
      Uk();
      break;
    } catch (e2) {
      Nk(a, e2);
    }
  while (1);
  Qg();
  K = c2;
  nk.current = d2;
  if (null !== Y)
    throw Error(p$4(261));
  R = null;
  Z = 0;
  return T;
}
function Uk() {
  for (; null !== Y; )
    Vk(Y);
}
function Mk() {
  for (; null !== Y && !cc(); )
    Vk(Y);
}
function Vk(a) {
  var b2 = Wk(a.alternate, a, gj);
  a.memoizedProps = a.pendingProps;
  null === b2 ? Tk(a) : Y = b2;
  ok.current = null;
}
function Tk(a) {
  var b2 = a;
  do {
    var c2 = b2.alternate;
    a = b2.return;
    if (0 === (b2.flags & 32768)) {
      if (c2 = Fj(c2, b2, gj), null !== c2) {
        Y = c2;
        return;
      }
    } else {
      c2 = Jj(c2, b2);
      if (null !== c2) {
        c2.flags &= 32767;
        Y = c2;
        return;
      }
      if (null !== a)
        a.flags |= 32768, a.subtreeFlags = 0, a.deletions = null;
      else {
        T = 6;
        Y = null;
        return;
      }
    }
    b2 = b2.sibling;
    if (null !== b2) {
      Y = b2;
      return;
    }
    Y = b2 = a;
  } while (null !== b2);
  0 === T && (T = 5);
}
function Qk(a, b2, c2) {
  var d2 = C, e2 = pk.transition;
  try {
    pk.transition = null, C = 1, Xk(a, b2, c2, d2);
  } finally {
    pk.transition = e2, C = d2;
  }
  return null;
}
function Xk(a, b2, c2, d2) {
  do
    Ik();
  while (null !== xk);
  if (0 !== (K & 6))
    throw Error(p$4(327));
  c2 = a.finishedWork;
  var e2 = a.finishedLanes;
  if (null === c2)
    return null;
  a.finishedWork = null;
  a.finishedLanes = 0;
  if (c2 === a.current)
    throw Error(p$4(177));
  a.callbackNode = null;
  a.callbackPriority = 0;
  var f2 = c2.lanes | c2.childLanes;
  Bc(a, f2);
  a === R && (Y = R = null, Z = 0);
  0 === (c2.subtreeFlags & 2064) && 0 === (c2.flags & 2064) || wk || (wk = true, Gk(hc, function() {
    Ik();
    return null;
  }));
  f2 = 0 !== (c2.flags & 15990);
  if (0 !== (c2.subtreeFlags & 15990) || f2) {
    f2 = pk.transition;
    pk.transition = null;
    var g2 = C;
    C = 1;
    var h2 = K;
    K |= 4;
    ok.current = null;
    Pj(a, c2);
    ek(c2, a);
    Oe(Df);
    dd = !!Cf;
    Df = Cf = null;
    a.current = c2;
    ik(c2);
    dc();
    K = h2;
    C = g2;
    pk.transition = f2;
  } else
    a.current = c2;
  wk && (wk = false, xk = a, yk = e2);
  f2 = a.pendingLanes;
  0 === f2 && (Si = null);
  mc(c2.stateNode);
  Ek(a, B());
  if (null !== b2)
    for (d2 = a.onRecoverableError, c2 = 0; c2 < b2.length; c2++)
      e2 = b2[c2], d2(e2.value, { componentStack: e2.stack, digest: e2.digest });
  if (Pi)
    throw Pi = false, a = Qi, Qi = null, a;
  0 !== (yk & 1) && 0 !== a.tag && Ik();
  f2 = a.pendingLanes;
  0 !== (f2 & 1) ? a === Ak ? zk++ : (zk = 0, Ak = a) : zk = 0;
  jg();
  return null;
}
function Ik() {
  if (null !== xk) {
    var a = Dc(yk), b2 = pk.transition, c2 = C;
    try {
      pk.transition = null;
      C = 16 > a ? 16 : a;
      if (null === xk)
        var d2 = false;
      else {
        a = xk;
        xk = null;
        yk = 0;
        if (0 !== (K & 6))
          throw Error(p$4(331));
        var e2 = K;
        K |= 4;
        for (V = a.current; null !== V; ) {
          var f2 = V, g2 = f2.child;
          if (0 !== (V.flags & 16)) {
            var h2 = f2.deletions;
            if (null !== h2) {
              for (var k2 = 0; k2 < h2.length; k2++) {
                var l2 = h2[k2];
                for (V = l2; null !== V; ) {
                  var m2 = V;
                  switch (m2.tag) {
                    case 0:
                    case 11:
                    case 15:
                      Qj(8, m2, f2);
                  }
                  var q2 = m2.child;
                  if (null !== q2)
                    q2.return = m2, V = q2;
                  else
                    for (; null !== V; ) {
                      m2 = V;
                      var r2 = m2.sibling, y2 = m2.return;
                      Tj(m2);
                      if (m2 === l2) {
                        V = null;
                        break;
                      }
                      if (null !== r2) {
                        r2.return = y2;
                        V = r2;
                        break;
                      }
                      V = y2;
                    }
                }
              }
              var n2 = f2.alternate;
              if (null !== n2) {
                var t2 = n2.child;
                if (null !== t2) {
                  n2.child = null;
                  do {
                    var J2 = t2.sibling;
                    t2.sibling = null;
                    t2 = J2;
                  } while (null !== t2);
                }
              }
              V = f2;
            }
          }
          if (0 !== (f2.subtreeFlags & 2064) && null !== g2)
            g2.return = f2, V = g2;
          else
            b:
              for (; null !== V; ) {
                f2 = V;
                if (0 !== (f2.flags & 2048))
                  switch (f2.tag) {
                    case 0:
                    case 11:
                    case 15:
                      Qj(9, f2, f2.return);
                  }
                var x2 = f2.sibling;
                if (null !== x2) {
                  x2.return = f2.return;
                  V = x2;
                  break b;
                }
                V = f2.return;
              }
        }
        var w2 = a.current;
        for (V = w2; null !== V; ) {
          g2 = V;
          var u2 = g2.child;
          if (0 !== (g2.subtreeFlags & 2064) && null !== u2)
            u2.return = g2, V = u2;
          else
            b:
              for (g2 = w2; null !== V; ) {
                h2 = V;
                if (0 !== (h2.flags & 2048))
                  try {
                    switch (h2.tag) {
                      case 0:
                      case 11:
                      case 15:
                        Rj(9, h2);
                    }
                  } catch (na) {
                    W(h2, h2.return, na);
                  }
                if (h2 === g2) {
                  V = null;
                  break b;
                }
                var F2 = h2.sibling;
                if (null !== F2) {
                  F2.return = h2.return;
                  V = F2;
                  break b;
                }
                V = h2.return;
              }
        }
        K = e2;
        jg();
        if (lc && "function" === typeof lc.onPostCommitFiberRoot)
          try {
            lc.onPostCommitFiberRoot(kc, a);
          } catch (na) {
          }
        d2 = true;
      }
      return d2;
    } finally {
      C = c2, pk.transition = b2;
    }
  }
  return false;
}
function Yk(a, b2, c2) {
  b2 = Ki(c2, b2);
  b2 = Oi(a, b2, 1);
  a = dh(a, b2, 1);
  b2 = L();
  null !== a && (Ac(a, 1, b2), Ek(a, b2));
}
function W(a, b2, c2) {
  if (3 === a.tag)
    Yk(a, a, c2);
  else
    for (; null !== b2; ) {
      if (3 === b2.tag) {
        Yk(b2, a, c2);
        break;
      } else if (1 === b2.tag) {
        var d2 = b2.stateNode;
        if ("function" === typeof b2.type.getDerivedStateFromError || "function" === typeof d2.componentDidCatch && (null === Si || !Si.has(d2))) {
          a = Ki(c2, a);
          a = Ri(b2, a, 1);
          b2 = dh(b2, a, 1);
          a = L();
          null !== b2 && (Ac(b2, 1, a), Ek(b2, a));
          break;
        }
      }
      b2 = b2.return;
    }
}
function Ui(a, b2, c2) {
  var d2 = a.pingCache;
  null !== d2 && d2.delete(b2);
  b2 = L();
  a.pingedLanes |= a.suspendedLanes & c2;
  R === a && (Z & c2) === c2 && (4 === T || 3 === T && (Z & 130023424) === Z && 500 > B() - gk ? Lk(a, 0) : sk |= c2);
  Ek(a, b2);
}
function Zk(a, b2) {
  0 === b2 && (0 === (a.mode & 1) ? b2 = 1 : (b2 = sc, sc <<= 1, 0 === (sc & 130023424) && (sc = 4194304)));
  var c2 = L();
  a = Zg(a, b2);
  null !== a && (Ac(a, b2, c2), Ek(a, c2));
}
function vj(a) {
  var b2 = a.memoizedState, c2 = 0;
  null !== b2 && (c2 = b2.retryLane);
  Zk(a, c2);
}
function ck(a, b2) {
  var c2 = 0;
  switch (a.tag) {
    case 13:
      var d2 = a.stateNode;
      var e2 = a.memoizedState;
      null !== e2 && (c2 = e2.retryLane);
      break;
    case 19:
      d2 = a.stateNode;
      break;
    default:
      throw Error(p$4(314));
  }
  null !== d2 && d2.delete(b2);
  Zk(a, c2);
}
var Wk;
Wk = function(a, b2, c2) {
  if (null !== a)
    if (a.memoizedProps !== b2.pendingProps || Wf.current)
      Ug = true;
    else {
      if (0 === (a.lanes & c2) && 0 === (b2.flags & 128))
        return Ug = false, zj(a, b2, c2);
      Ug = 0 !== (a.flags & 131072) ? true : false;
    }
  else
    Ug = false, I && 0 !== (b2.flags & 1048576) && ug(b2, ng, b2.index);
  b2.lanes = 0;
  switch (b2.tag) {
    case 2:
      var d2 = b2.type;
      jj(a, b2);
      a = b2.pendingProps;
      var e2 = Yf(b2, H.current);
      Tg(b2, c2);
      e2 = Xh(null, b2, d2, a, e2, c2);
      var f2 = bi();
      b2.flags |= 1;
      "object" === typeof e2 && null !== e2 && "function" === typeof e2.render && void 0 === e2.$$typeof ? (b2.tag = 1, b2.memoizedState = null, b2.updateQueue = null, Zf(d2) ? (f2 = true, cg(b2)) : f2 = false, b2.memoizedState = null !== e2.state && void 0 !== e2.state ? e2.state : null, ah(b2), e2.updater = nh, b2.stateNode = e2, e2._reactInternals = b2, rh(b2, d2, a, c2), b2 = kj(null, b2, d2, true, f2, c2)) : (b2.tag = 0, I && f2 && vg(b2), Yi(null, b2, e2, c2), b2 = b2.child);
      return b2;
    case 16:
      d2 = b2.elementType;
      a: {
        jj(a, b2);
        a = b2.pendingProps;
        e2 = d2._init;
        d2 = e2(d2._payload);
        b2.type = d2;
        e2 = b2.tag = $k(d2);
        a = Lg(d2, a);
        switch (e2) {
          case 0:
            b2 = dj(null, b2, d2, a, c2);
            break a;
          case 1:
            b2 = ij(null, b2, d2, a, c2);
            break a;
          case 11:
            b2 = Zi(null, b2, d2, a, c2);
            break a;
          case 14:
            b2 = aj(null, b2, d2, Lg(d2.type, a), c2);
            break a;
        }
        throw Error(p$4(
          306,
          d2,
          ""
        ));
      }
      return b2;
    case 0:
      return d2 = b2.type, e2 = b2.pendingProps, e2 = b2.elementType === d2 ? e2 : Lg(d2, e2), dj(a, b2, d2, e2, c2);
    case 1:
      return d2 = b2.type, e2 = b2.pendingProps, e2 = b2.elementType === d2 ? e2 : Lg(d2, e2), ij(a, b2, d2, e2, c2);
    case 3:
      a: {
        lj(b2);
        if (null === a)
          throw Error(p$4(387));
        d2 = b2.pendingProps;
        f2 = b2.memoizedState;
        e2 = f2.element;
        bh(a, b2);
        gh(b2, d2, null, c2);
        var g2 = b2.memoizedState;
        d2 = g2.element;
        if (f2.isDehydrated)
          if (f2 = { element: d2, isDehydrated: false, cache: g2.cache, pendingSuspenseBoundaries: g2.pendingSuspenseBoundaries, transitions: g2.transitions }, b2.updateQueue.baseState = f2, b2.memoizedState = f2, b2.flags & 256) {
            e2 = Ki(Error(p$4(423)), b2);
            b2 = mj(a, b2, d2, c2, e2);
            break a;
          } else if (d2 !== e2) {
            e2 = Ki(Error(p$4(424)), b2);
            b2 = mj(a, b2, d2, c2, e2);
            break a;
          } else
            for (yg = Lf(b2.stateNode.containerInfo.firstChild), xg = b2, I = true, zg = null, c2 = Ch(b2, null, d2, c2), b2.child = c2; c2; )
              c2.flags = c2.flags & -3 | 4096, c2 = c2.sibling;
        else {
          Ig();
          if (d2 === e2) {
            b2 = $i(a, b2, c2);
            break a;
          }
          Yi(a, b2, d2, c2);
        }
        b2 = b2.child;
      }
      return b2;
    case 5:
      return Kh(b2), null === a && Eg(b2), d2 = b2.type, e2 = b2.pendingProps, f2 = null !== a ? a.memoizedProps : null, g2 = e2.children, Ef(d2, e2) ? g2 = null : null !== f2 && Ef(d2, f2) && (b2.flags |= 32), hj(a, b2), Yi(a, b2, g2, c2), b2.child;
    case 6:
      return null === a && Eg(b2), null;
    case 13:
      return pj(a, b2, c2);
    case 4:
      return Ih(b2, b2.stateNode.containerInfo), d2 = b2.pendingProps, null === a ? b2.child = Bh(b2, null, d2, c2) : Yi(a, b2, d2, c2), b2.child;
    case 11:
      return d2 = b2.type, e2 = b2.pendingProps, e2 = b2.elementType === d2 ? e2 : Lg(d2, e2), Zi(a, b2, d2, e2, c2);
    case 7:
      return Yi(a, b2, b2.pendingProps, c2), b2.child;
    case 8:
      return Yi(a, b2, b2.pendingProps.children, c2), b2.child;
    case 12:
      return Yi(a, b2, b2.pendingProps.children, c2), b2.child;
    case 10:
      a: {
        d2 = b2.type._context;
        e2 = b2.pendingProps;
        f2 = b2.memoizedProps;
        g2 = e2.value;
        G(Mg, d2._currentValue);
        d2._currentValue = g2;
        if (null !== f2)
          if (He(f2.value, g2)) {
            if (f2.children === e2.children && !Wf.current) {
              b2 = $i(a, b2, c2);
              break a;
            }
          } else
            for (f2 = b2.child, null !== f2 && (f2.return = b2); null !== f2; ) {
              var h2 = f2.dependencies;
              if (null !== h2) {
                g2 = f2.child;
                for (var k2 = h2.firstContext; null !== k2; ) {
                  if (k2.context === d2) {
                    if (1 === f2.tag) {
                      k2 = ch(-1, c2 & -c2);
                      k2.tag = 2;
                      var l2 = f2.updateQueue;
                      if (null !== l2) {
                        l2 = l2.shared;
                        var m2 = l2.pending;
                        null === m2 ? k2.next = k2 : (k2.next = m2.next, m2.next = k2);
                        l2.pending = k2;
                      }
                    }
                    f2.lanes |= c2;
                    k2 = f2.alternate;
                    null !== k2 && (k2.lanes |= c2);
                    Sg(
                      f2.return,
                      c2,
                      b2
                    );
                    h2.lanes |= c2;
                    break;
                  }
                  k2 = k2.next;
                }
              } else if (10 === f2.tag)
                g2 = f2.type === b2.type ? null : f2.child;
              else if (18 === f2.tag) {
                g2 = f2.return;
                if (null === g2)
                  throw Error(p$4(341));
                g2.lanes |= c2;
                h2 = g2.alternate;
                null !== h2 && (h2.lanes |= c2);
                Sg(g2, c2, b2);
                g2 = f2.sibling;
              } else
                g2 = f2.child;
              if (null !== g2)
                g2.return = f2;
              else
                for (g2 = f2; null !== g2; ) {
                  if (g2 === b2) {
                    g2 = null;
                    break;
                  }
                  f2 = g2.sibling;
                  if (null !== f2) {
                    f2.return = g2.return;
                    g2 = f2;
                    break;
                  }
                  g2 = g2.return;
                }
              f2 = g2;
            }
        Yi(a, b2, e2.children, c2);
        b2 = b2.child;
      }
      return b2;
    case 9:
      return e2 = b2.type, d2 = b2.pendingProps.children, Tg(b2, c2), e2 = Vg(e2), d2 = d2(e2), b2.flags |= 1, Yi(a, b2, d2, c2), b2.child;
    case 14:
      return d2 = b2.type, e2 = Lg(d2, b2.pendingProps), e2 = Lg(d2.type, e2), aj(a, b2, d2, e2, c2);
    case 15:
      return cj(a, b2, b2.type, b2.pendingProps, c2);
    case 17:
      return d2 = b2.type, e2 = b2.pendingProps, e2 = b2.elementType === d2 ? e2 : Lg(d2, e2), jj(a, b2), b2.tag = 1, Zf(d2) ? (a = true, cg(b2)) : a = false, Tg(b2, c2), ph(b2, d2, e2), rh(b2, d2, e2, c2), kj(null, b2, d2, true, a, c2);
    case 19:
      return yj(a, b2, c2);
    case 22:
      return ej(a, b2, c2);
  }
  throw Error(p$4(156, b2.tag));
};
function Gk(a, b2) {
  return ac(a, b2);
}
function al(a, b2, c2, d2) {
  this.tag = a;
  this.key = c2;
  this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null;
  this.index = 0;
  this.ref = null;
  this.pendingProps = b2;
  this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null;
  this.mode = d2;
  this.subtreeFlags = this.flags = 0;
  this.deletions = null;
  this.childLanes = this.lanes = 0;
  this.alternate = null;
}
function Bg(a, b2, c2, d2) {
  return new al(a, b2, c2, d2);
}
function bj(a) {
  a = a.prototype;
  return !(!a || !a.isReactComponent);
}
function $k(a) {
  if ("function" === typeof a)
    return bj(a) ? 1 : 0;
  if (void 0 !== a && null !== a) {
    a = a.$$typeof;
    if (a === Da)
      return 11;
    if (a === Ga)
      return 14;
  }
  return 2;
}
function wh(a, b2) {
  var c2 = a.alternate;
  null === c2 ? (c2 = Bg(a.tag, b2, a.key, a.mode), c2.elementType = a.elementType, c2.type = a.type, c2.stateNode = a.stateNode, c2.alternate = a, a.alternate = c2) : (c2.pendingProps = b2, c2.type = a.type, c2.flags = 0, c2.subtreeFlags = 0, c2.deletions = null);
  c2.flags = a.flags & 14680064;
  c2.childLanes = a.childLanes;
  c2.lanes = a.lanes;
  c2.child = a.child;
  c2.memoizedProps = a.memoizedProps;
  c2.memoizedState = a.memoizedState;
  c2.updateQueue = a.updateQueue;
  b2 = a.dependencies;
  c2.dependencies = null === b2 ? null : { lanes: b2.lanes, firstContext: b2.firstContext };
  c2.sibling = a.sibling;
  c2.index = a.index;
  c2.ref = a.ref;
  return c2;
}
function yh(a, b2, c2, d2, e2, f2) {
  var g2 = 2;
  d2 = a;
  if ("function" === typeof a)
    bj(a) && (g2 = 1);
  else if ("string" === typeof a)
    g2 = 5;
  else
    a:
      switch (a) {
        case ya:
          return Ah(c2.children, e2, f2, b2);
        case za:
          g2 = 8;
          e2 |= 8;
          break;
        case Aa:
          return a = Bg(12, c2, b2, e2 | 2), a.elementType = Aa, a.lanes = f2, a;
        case Ea:
          return a = Bg(13, c2, b2, e2), a.elementType = Ea, a.lanes = f2, a;
        case Fa:
          return a = Bg(19, c2, b2, e2), a.elementType = Fa, a.lanes = f2, a;
        case Ia:
          return qj(c2, e2, f2, b2);
        default:
          if ("object" === typeof a && null !== a)
            switch (a.$$typeof) {
              case Ba:
                g2 = 10;
                break a;
              case Ca:
                g2 = 9;
                break a;
              case Da:
                g2 = 11;
                break a;
              case Ga:
                g2 = 14;
                break a;
              case Ha:
                g2 = 16;
                d2 = null;
                break a;
            }
          throw Error(p$4(130, null == a ? a : typeof a, ""));
      }
  b2 = Bg(g2, c2, b2, e2);
  b2.elementType = a;
  b2.type = d2;
  b2.lanes = f2;
  return b2;
}
function Ah(a, b2, c2, d2) {
  a = Bg(7, a, d2, b2);
  a.lanes = c2;
  return a;
}
function qj(a, b2, c2, d2) {
  a = Bg(22, a, d2, b2);
  a.elementType = Ia;
  a.lanes = c2;
  a.stateNode = { isHidden: false };
  return a;
}
function xh(a, b2, c2) {
  a = Bg(6, a, null, b2);
  a.lanes = c2;
  return a;
}
function zh(a, b2, c2) {
  b2 = Bg(4, null !== a.children ? a.children : [], a.key, b2);
  b2.lanes = c2;
  b2.stateNode = { containerInfo: a.containerInfo, pendingChildren: null, implementation: a.implementation };
  return b2;
}
function bl(a, b2, c2, d2, e2) {
  this.tag = b2;
  this.containerInfo = a;
  this.finishedWork = this.pingCache = this.current = this.pendingChildren = null;
  this.timeoutHandle = -1;
  this.callbackNode = this.pendingContext = this.context = null;
  this.callbackPriority = 0;
  this.eventTimes = zc(0);
  this.expirationTimes = zc(-1);
  this.entangledLanes = this.finishedLanes = this.mutableReadLanes = this.expiredLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0;
  this.entanglements = zc(0);
  this.identifierPrefix = d2;
  this.onRecoverableError = e2;
  this.mutableSourceEagerHydrationData = null;
}
function cl(a, b2, c2, d2, e2, f2, g2, h2, k2) {
  a = new bl(a, b2, c2, h2, k2);
  1 === b2 ? (b2 = 1, true === f2 && (b2 |= 8)) : b2 = 0;
  f2 = Bg(3, null, null, b2);
  a.current = f2;
  f2.stateNode = a;
  f2.memoizedState = { element: d2, isDehydrated: c2, cache: null, transitions: null, pendingSuspenseBoundaries: null };
  ah(f2);
  return a;
}
function dl(a, b2, c2) {
  var d2 = 3 < arguments.length && void 0 !== arguments[3] ? arguments[3] : null;
  return { $$typeof: wa, key: null == d2 ? null : "" + d2, children: a, containerInfo: b2, implementation: c2 };
}
function el(a) {
  if (!a)
    return Vf;
  a = a._reactInternals;
  a: {
    if (Vb(a) !== a || 1 !== a.tag)
      throw Error(p$4(170));
    var b2 = a;
    do {
      switch (b2.tag) {
        case 3:
          b2 = b2.stateNode.context;
          break a;
        case 1:
          if (Zf(b2.type)) {
            b2 = b2.stateNode.__reactInternalMemoizedMergedChildContext;
            break a;
          }
      }
      b2 = b2.return;
    } while (null !== b2);
    throw Error(p$4(171));
  }
  if (1 === a.tag) {
    var c2 = a.type;
    if (Zf(c2))
      return bg(a, c2, b2);
  }
  return b2;
}
function fl(a, b2, c2, d2, e2, f2, g2, h2, k2) {
  a = cl(c2, d2, true, a, e2, f2, g2, h2, k2);
  a.context = el(null);
  c2 = a.current;
  d2 = L();
  e2 = lh(c2);
  f2 = ch(d2, e2);
  f2.callback = void 0 !== b2 && null !== b2 ? b2 : null;
  dh(c2, f2, e2);
  a.current.lanes = e2;
  Ac(a, e2, d2);
  Ek(a, d2);
  return a;
}
function gl(a, b2, c2, d2) {
  var e2 = b2.current, f2 = L(), g2 = lh(e2);
  c2 = el(c2);
  null === b2.context ? b2.context = c2 : b2.pendingContext = c2;
  b2 = ch(f2, g2);
  b2.payload = { element: a };
  d2 = void 0 === d2 ? null : d2;
  null !== d2 && (b2.callback = d2);
  a = dh(e2, b2, g2);
  null !== a && (mh(a, e2, g2, f2), eh(a, e2, g2));
  return g2;
}
function hl(a) {
  a = a.current;
  if (!a.child)
    return null;
  switch (a.child.tag) {
    case 5:
      return a.child.stateNode;
    default:
      return a.child.stateNode;
  }
}
function il(a, b2) {
  a = a.memoizedState;
  if (null !== a && null !== a.dehydrated) {
    var c2 = a.retryLane;
    a.retryLane = 0 !== c2 && c2 < b2 ? c2 : b2;
  }
}
function jl(a, b2) {
  il(a, b2);
  (a = a.alternate) && il(a, b2);
}
function kl() {
  return null;
}
var ll = "function" === typeof reportError ? reportError : function(a) {
  console.error(a);
};
function ml(a) {
  this._internalRoot = a;
}
nl.prototype.render = ml.prototype.render = function(a) {
  var b2 = this._internalRoot;
  if (null === b2)
    throw Error(p$4(409));
  gl(a, b2, null, null);
};
nl.prototype.unmount = ml.prototype.unmount = function() {
  var a = this._internalRoot;
  if (null !== a) {
    this._internalRoot = null;
    var b2 = a.containerInfo;
    Sk(function() {
      gl(null, a, null, null);
    });
    b2[uf] = null;
  }
};
function nl(a) {
  this._internalRoot = a;
}
nl.prototype.unstable_scheduleHydration = function(a) {
  if (a) {
    var b2 = Hc();
    a = { blockedOn: null, target: a, priority: b2 };
    for (var c2 = 0; c2 < Qc.length && 0 !== b2 && b2 < Qc[c2].priority; c2++)
      ;
    Qc.splice(c2, 0, a);
    0 === c2 && Vc(a);
  }
};
function ol(a) {
  return !(!a || 1 !== a.nodeType && 9 !== a.nodeType && 11 !== a.nodeType);
}
function pl(a) {
  return !(!a || 1 !== a.nodeType && 9 !== a.nodeType && 11 !== a.nodeType && (8 !== a.nodeType || " react-mount-point-unstable " !== a.nodeValue));
}
function ql() {
}
function rl(a, b2, c2, d2, e2) {
  if (e2) {
    if ("function" === typeof d2) {
      var f2 = d2;
      d2 = function() {
        var a2 = hl(g2);
        f2.call(a2);
      };
    }
    var g2 = fl(b2, d2, a, 0, null, false, false, "", ql);
    a._reactRootContainer = g2;
    a[uf] = g2.current;
    sf(8 === a.nodeType ? a.parentNode : a);
    Sk();
    return g2;
  }
  for (; e2 = a.lastChild; )
    a.removeChild(e2);
  if ("function" === typeof d2) {
    var h2 = d2;
    d2 = function() {
      var a2 = hl(k2);
      h2.call(a2);
    };
  }
  var k2 = cl(a, 0, false, null, null, false, false, "", ql);
  a._reactRootContainer = k2;
  a[uf] = k2.current;
  sf(8 === a.nodeType ? a.parentNode : a);
  Sk(function() {
    gl(b2, k2, c2, d2);
  });
  return k2;
}
function sl(a, b2, c2, d2, e2) {
  var f2 = c2._reactRootContainer;
  if (f2) {
    var g2 = f2;
    if ("function" === typeof e2) {
      var h2 = e2;
      e2 = function() {
        var a2 = hl(g2);
        h2.call(a2);
      };
    }
    gl(b2, g2, a, e2);
  } else
    g2 = rl(c2, b2, a, e2, d2);
  return hl(g2);
}
Ec = function(a) {
  switch (a.tag) {
    case 3:
      var b2 = a.stateNode;
      if (b2.current.memoizedState.isDehydrated) {
        var c2 = tc(b2.pendingLanes);
        0 !== c2 && (Cc(b2, c2 | 1), Ek(b2, B()), 0 === (K & 6) && (Hj = B() + 500, jg()));
      }
      break;
    case 13:
      Sk(function() {
        var b3 = Zg(a, 1);
        if (null !== b3) {
          var c3 = L();
          mh(b3, a, 1, c3);
        }
      }), jl(a, 1);
  }
};
Fc = function(a) {
  if (13 === a.tag) {
    var b2 = Zg(a, 134217728);
    if (null !== b2) {
      var c2 = L();
      mh(b2, a, 134217728, c2);
    }
    jl(a, 134217728);
  }
};
Gc = function(a) {
  if (13 === a.tag) {
    var b2 = lh(a), c2 = Zg(a, b2);
    if (null !== c2) {
      var d2 = L();
      mh(c2, a, b2, d2);
    }
    jl(a, b2);
  }
};
Hc = function() {
  return C;
};
Ic = function(a, b2) {
  var c2 = C;
  try {
    return C = a, b2();
  } finally {
    C = c2;
  }
};
yb = function(a, b2, c2) {
  switch (b2) {
    case "input":
      bb(a, c2);
      b2 = c2.name;
      if ("radio" === c2.type && null != b2) {
        for (c2 = a; c2.parentNode; )
          c2 = c2.parentNode;
        c2 = c2.querySelectorAll("input[name=" + JSON.stringify("" + b2) + '][type="radio"]');
        for (b2 = 0; b2 < c2.length; b2++) {
          var d2 = c2[b2];
          if (d2 !== a && d2.form === a.form) {
            var e2 = Db(d2);
            if (!e2)
              throw Error(p$4(90));
            Wa(d2);
            bb(d2, e2);
          }
        }
      }
      break;
    case "textarea":
      ib(a, c2);
      break;
    case "select":
      b2 = c2.value, null != b2 && fb(a, !!c2.multiple, b2, false);
  }
};
Gb = Rk;
Hb = Sk;
var tl = { usingClientEntryPoint: false, Events: [Cb, ue, Db, Eb, Fb, Rk] }, ul = { findFiberByHostInstance: Wc, bundleType: 0, version: "18.2.0", rendererPackageName: "react-dom" };
var vl = { bundleType: ul.bundleType, version: ul.version, rendererPackageName: ul.rendererPackageName, rendererConfig: ul.rendererConfig, overrideHookState: null, overrideHookStateDeletePath: null, overrideHookStateRenamePath: null, overrideProps: null, overridePropsDeletePath: null, overridePropsRenamePath: null, setErrorHandler: null, setSuspenseHandler: null, scheduleUpdate: null, currentDispatcherRef: ua.ReactCurrentDispatcher, findHostInstanceByFiber: function(a) {
  a = Zb(a);
  return null === a ? null : a.stateNode;
}, findFiberByHostInstance: ul.findFiberByHostInstance || kl, findHostInstancesForRefresh: null, scheduleRefresh: null, scheduleRoot: null, setRefreshHandler: null, getCurrentFiber: null, reconcilerVersion: "18.2.0-next-9e3b772b8-20220608" };
if ("undefined" !== typeof __REACT_DEVTOOLS_GLOBAL_HOOK__) {
  var wl = __REACT_DEVTOOLS_GLOBAL_HOOK__;
  if (!wl.isDisabled && wl.supportsFiber)
    try {
      kc = wl.inject(vl), lc = wl;
    } catch (a) {
    }
}
reactDom_production_min.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = tl;
reactDom_production_min.createPortal = function(a, b2) {
  var c2 = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : null;
  if (!ol(b2))
    throw Error(p$4(200));
  return dl(a, b2, null, c2);
};
reactDom_production_min.createRoot = function(a, b2) {
  if (!ol(a))
    throw Error(p$4(299));
  var c2 = false, d2 = "", e2 = ll;
  null !== b2 && void 0 !== b2 && (true === b2.unstable_strictMode && (c2 = true), void 0 !== b2.identifierPrefix && (d2 = b2.identifierPrefix), void 0 !== b2.onRecoverableError && (e2 = b2.onRecoverableError));
  b2 = cl(a, 1, false, null, null, c2, false, d2, e2);
  a[uf] = b2.current;
  sf(8 === a.nodeType ? a.parentNode : a);
  return new ml(b2);
};
reactDom_production_min.findDOMNode = function(a) {
  if (null == a)
    return null;
  if (1 === a.nodeType)
    return a;
  var b2 = a._reactInternals;
  if (void 0 === b2) {
    if ("function" === typeof a.render)
      throw Error(p$4(188));
    a = Object.keys(a).join(",");
    throw Error(p$4(268, a));
  }
  a = Zb(b2);
  a = null === a ? null : a.stateNode;
  return a;
};
reactDom_production_min.flushSync = function(a) {
  return Sk(a);
};
reactDom_production_min.hydrate = function(a, b2, c2) {
  if (!pl(b2))
    throw Error(p$4(200));
  return sl(null, a, b2, true, c2);
};
reactDom_production_min.hydrateRoot = function(a, b2, c2) {
  if (!ol(a))
    throw Error(p$4(405));
  var d2 = null != c2 && c2.hydratedSources || null, e2 = false, f2 = "", g2 = ll;
  null !== c2 && void 0 !== c2 && (true === c2.unstable_strictMode && (e2 = true), void 0 !== c2.identifierPrefix && (f2 = c2.identifierPrefix), void 0 !== c2.onRecoverableError && (g2 = c2.onRecoverableError));
  b2 = fl(b2, null, a, 1, null != c2 ? c2 : null, e2, false, f2, g2);
  a[uf] = b2.current;
  sf(a);
  if (d2)
    for (a = 0; a < d2.length; a++)
      c2 = d2[a], e2 = c2._getVersion, e2 = e2(c2._source), null == b2.mutableSourceEagerHydrationData ? b2.mutableSourceEagerHydrationData = [c2, e2] : b2.mutableSourceEagerHydrationData.push(
        c2,
        e2
      );
  return new nl(b2);
};
reactDom_production_min.render = function(a, b2, c2) {
  if (!pl(b2))
    throw Error(p$4(200));
  return sl(null, a, b2, false, c2);
};
reactDom_production_min.unmountComponentAtNode = function(a) {
  if (!pl(a))
    throw Error(p$4(40));
  return a._reactRootContainer ? (Sk(function() {
    sl(null, null, a, false, function() {
      a._reactRootContainer = null;
      a[uf] = null;
    });
  }), true) : false;
};
reactDom_production_min.unstable_batchedUpdates = Rk;
reactDom_production_min.unstable_renderSubtreeIntoContainer = function(a, b2, c2, d2) {
  if (!pl(c2))
    throw Error(p$4(200));
  if (null == a || void 0 === a._reactInternals)
    throw Error(p$4(38));
  return sl(a, b2, c2, false, d2);
};
reactDom_production_min.version = "18.2.0-next-9e3b772b8-20220608";
function checkDCE() {
  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ === "undefined" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE !== "function") {
    return;
  }
  try {
    __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(checkDCE);
  } catch (err) {
    console.error(err);
  }
}
{
  checkDCE();
  reactDom.exports = reactDom_production_min;
}
var reactDomExports = reactDom.exports;
var m$3 = reactDomExports;
{
  client.createRoot = m$3.createRoot;
  client.hydrateRoot = m$3.hydrateRoot;
}
var shim = { exports: {} };
var useSyncExternalStoreShim_production_min = {};
/**
 * @license React
 * use-sync-external-store-shim.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var e$2 = reactExports;
function h$3(a, b2) {
  return a === b2 && (0 !== a || 1 / a === 1 / b2) || a !== a && b2 !== b2;
}
var k$2 = "function" === typeof Object.is ? Object.is : h$3, l$2 = e$2.useState, m$2 = e$2.useEffect, n$3 = e$2.useLayoutEffect, p$3 = e$2.useDebugValue;
function q$3(a, b2) {
  var d2 = b2(), f2 = l$2({ inst: { value: d2, getSnapshot: b2 } }), c2 = f2[0].inst, g2 = f2[1];
  n$3(function() {
    c2.value = d2;
    c2.getSnapshot = b2;
    r$2(c2) && g2({ inst: c2 });
  }, [a, d2, b2]);
  m$2(function() {
    r$2(c2) && g2({ inst: c2 });
    return a(function() {
      r$2(c2) && g2({ inst: c2 });
    });
  }, [a]);
  p$3(d2);
  return d2;
}
function r$2(a) {
  var b2 = a.getSnapshot;
  a = a.value;
  try {
    var d2 = b2();
    return !k$2(a, d2);
  } catch (f2) {
    return true;
  }
}
function t$3(a, b2) {
  return b2();
}
var u$2 = "undefined" === typeof window || "undefined" === typeof window.document || "undefined" === typeof window.document.createElement ? t$3 : q$3;
useSyncExternalStoreShim_production_min.useSyncExternalStore = void 0 !== e$2.useSyncExternalStore ? e$2.useSyncExternalStore : u$2;
{
  shim.exports = useSyncExternalStoreShim_production_min;
}
var shimExports = shim.exports;
var withSelector = { exports: {} };
var withSelector_production_min = {};
/**
 * @license React
 * use-sync-external-store-shim/with-selector.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var h$2 = reactExports, n$2 = shimExports;
function p$2(a, b2) {
  return a === b2 && (0 !== a || 1 / a === 1 / b2) || a !== a && b2 !== b2;
}
var q$2 = "function" === typeof Object.is ? Object.is : p$2, r$1 = n$2.useSyncExternalStore, t$2 = h$2.useRef, u$1 = h$2.useEffect, v$2 = h$2.useMemo, w$1 = h$2.useDebugValue;
withSelector_production_min.useSyncExternalStoreWithSelector = function(a, b2, e2, l2, g2) {
  var c2 = t$2(null);
  if (null === c2.current) {
    var f2 = { hasValue: false, value: null };
    c2.current = f2;
  } else
    f2 = c2.current;
  c2 = v$2(function() {
    function a2(a3) {
      if (!c3) {
        c3 = true;
        d3 = a3;
        a3 = l2(a3);
        if (void 0 !== g2 && f2.hasValue) {
          var b3 = f2.value;
          if (g2(b3, a3))
            return k2 = b3;
        }
        return k2 = a3;
      }
      b3 = k2;
      if (q$2(d3, a3))
        return b3;
      var e3 = l2(a3);
      if (void 0 !== g2 && g2(b3, e3))
        return b3;
      d3 = a3;
      return k2 = e3;
    }
    var c3 = false, d3, k2, m2 = void 0 === e2 ? null : e2;
    return [function() {
      return a2(b2());
    }, null === m2 ? void 0 : function() {
      return a2(m2());
    }];
  }, [b2, e2, l2, g2]);
  var d2 = r$1(a, c2[0], c2[1]);
  u$1(function() {
    f2.hasValue = true;
    f2.value = d2;
  }, [d2]);
  w$1(d2);
  return d2;
};
{
  withSelector.exports = withSelector_production_min;
}
var withSelectorExports = withSelector.exports;
function defaultNoopBatch(callback) {
  callback();
}
let batch = defaultNoopBatch;
const setBatch = (newBatch) => batch = newBatch;
const getBatch = () => batch;
const ContextKey = Symbol.for(`react-redux-context`);
const gT = typeof globalThis !== "undefined" ? globalThis : (
  /* fall back to a per-module scope (pre-8.1 behaviour) if `globalThis` is not available */
  {}
);
function getContext() {
  var _gT$ContextKey;
  if (!reactExports.createContext)
    return {};
  const contextMap = (_gT$ContextKey = gT[ContextKey]) != null ? _gT$ContextKey : gT[ContextKey] = /* @__PURE__ */ new Map();
  let realContext = contextMap.get(reactExports.createContext);
  if (!realContext) {
    realContext = reactExports.createContext(null);
    contextMap.set(reactExports.createContext, realContext);
  }
  return realContext;
}
const ReactReduxContext = /* @__PURE__ */ getContext();
function createReduxContextHook(context = ReactReduxContext) {
  return function useReduxContext2() {
    const contextValue = reactExports.useContext(context);
    return contextValue;
  };
}
const useReduxContext = /* @__PURE__ */ createReduxContextHook();
const notInitialized = () => {
  throw new Error("uSES not initialized!");
};
let useSyncExternalStoreWithSelector = notInitialized;
const initializeUseSelector = (fn) => {
  useSyncExternalStoreWithSelector = fn;
};
const refEquality = (a, b2) => a === b2;
function createSelectorHook(context = ReactReduxContext) {
  const useReduxContext$1 = context === ReactReduxContext ? useReduxContext : createReduxContextHook(context);
  return function useSelector2(selector, equalityFnOrOptions = {}) {
    const {
      equalityFn = refEquality,
      stabilityCheck = void 0,
      noopCheck = void 0
    } = typeof equalityFnOrOptions === "function" ? {
      equalityFn: equalityFnOrOptions
    } : equalityFnOrOptions;
    const {
      store: store2,
      subscription,
      getServerState,
      stabilityCheck: globalStabilityCheck,
      noopCheck: globalNoopCheck
    } = useReduxContext$1();
    reactExports.useRef(true);
    const wrappedSelector = reactExports.useCallback({
      [selector.name](state) {
        const selected = selector(state);
        return selected;
      }
    }[selector.name], [selector, globalStabilityCheck, stabilityCheck]);
    const selectedState = useSyncExternalStoreWithSelector(subscription.addNestedSub, store2.getState, getServerState || store2.getState, wrappedSelector, equalityFn);
    reactExports.useDebugValue(selectedState);
    return selectedState;
  };
}
const useSelector = /* @__PURE__ */ createSelectorHook();
var reactIs$1 = { exports: {} };
var reactIs_production_min$1 = {};
/** @license React v16.13.1
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var b$1 = "function" === typeof Symbol && Symbol.for, c$1 = b$1 ? Symbol.for("react.element") : 60103, d$1 = b$1 ? Symbol.for("react.portal") : 60106, e$1 = b$1 ? Symbol.for("react.fragment") : 60107, f$1 = b$1 ? Symbol.for("react.strict_mode") : 60108, g$1 = b$1 ? Symbol.for("react.profiler") : 60114, h$1 = b$1 ? Symbol.for("react.provider") : 60109, k$1 = b$1 ? Symbol.for("react.context") : 60110, l$1 = b$1 ? Symbol.for("react.async_mode") : 60111, m$1 = b$1 ? Symbol.for("react.concurrent_mode") : 60111, n$1 = b$1 ? Symbol.for("react.forward_ref") : 60112, p$1 = b$1 ? Symbol.for("react.suspense") : 60113, q$1 = b$1 ? Symbol.for("react.suspense_list") : 60120, r = b$1 ? Symbol.for("react.memo") : 60115, t$1 = b$1 ? Symbol.for("react.lazy") : 60116, v$1 = b$1 ? Symbol.for("react.block") : 60121, w = b$1 ? Symbol.for("react.fundamental") : 60117, x = b$1 ? Symbol.for("react.responder") : 60118, y = b$1 ? Symbol.for("react.scope") : 60119;
function z(a) {
  if ("object" === typeof a && null !== a) {
    var u2 = a.$$typeof;
    switch (u2) {
      case c$1:
        switch (a = a.type, a) {
          case l$1:
          case m$1:
          case e$1:
          case g$1:
          case f$1:
          case p$1:
            return a;
          default:
            switch (a = a && a.$$typeof, a) {
              case k$1:
              case n$1:
              case t$1:
              case r:
              case h$1:
                return a;
              default:
                return u2;
            }
        }
      case d$1:
        return u2;
    }
  }
}
function A(a) {
  return z(a) === m$1;
}
reactIs_production_min$1.AsyncMode = l$1;
reactIs_production_min$1.ConcurrentMode = m$1;
reactIs_production_min$1.ContextConsumer = k$1;
reactIs_production_min$1.ContextProvider = h$1;
reactIs_production_min$1.Element = c$1;
reactIs_production_min$1.ForwardRef = n$1;
reactIs_production_min$1.Fragment = e$1;
reactIs_production_min$1.Lazy = t$1;
reactIs_production_min$1.Memo = r;
reactIs_production_min$1.Portal = d$1;
reactIs_production_min$1.Profiler = g$1;
reactIs_production_min$1.StrictMode = f$1;
reactIs_production_min$1.Suspense = p$1;
reactIs_production_min$1.isAsyncMode = function(a) {
  return A(a) || z(a) === l$1;
};
reactIs_production_min$1.isConcurrentMode = A;
reactIs_production_min$1.isContextConsumer = function(a) {
  return z(a) === k$1;
};
reactIs_production_min$1.isContextProvider = function(a) {
  return z(a) === h$1;
};
reactIs_production_min$1.isElement = function(a) {
  return "object" === typeof a && null !== a && a.$$typeof === c$1;
};
reactIs_production_min$1.isForwardRef = function(a) {
  return z(a) === n$1;
};
reactIs_production_min$1.isFragment = function(a) {
  return z(a) === e$1;
};
reactIs_production_min$1.isLazy = function(a) {
  return z(a) === t$1;
};
reactIs_production_min$1.isMemo = function(a) {
  return z(a) === r;
};
reactIs_production_min$1.isPortal = function(a) {
  return z(a) === d$1;
};
reactIs_production_min$1.isProfiler = function(a) {
  return z(a) === g$1;
};
reactIs_production_min$1.isStrictMode = function(a) {
  return z(a) === f$1;
};
reactIs_production_min$1.isSuspense = function(a) {
  return z(a) === p$1;
};
reactIs_production_min$1.isValidElementType = function(a) {
  return "string" === typeof a || "function" === typeof a || a === e$1 || a === m$1 || a === g$1 || a === f$1 || a === p$1 || a === q$1 || "object" === typeof a && null !== a && (a.$$typeof === t$1 || a.$$typeof === r || a.$$typeof === h$1 || a.$$typeof === k$1 || a.$$typeof === n$1 || a.$$typeof === w || a.$$typeof === x || a.$$typeof === y || a.$$typeof === v$1);
};
reactIs_production_min$1.typeOf = z;
{
  reactIs$1.exports = reactIs_production_min$1;
}
var reactIsExports = reactIs$1.exports;
var reactIs = reactIsExports;
var FORWARD_REF_STATICS = {
  "$$typeof": true,
  render: true,
  defaultProps: true,
  displayName: true,
  propTypes: true
};
var MEMO_STATICS = {
  "$$typeof": true,
  compare: true,
  defaultProps: true,
  displayName: true,
  propTypes: true,
  type: true
};
var TYPE_STATICS = {};
TYPE_STATICS[reactIs.ForwardRef] = FORWARD_REF_STATICS;
TYPE_STATICS[reactIs.Memo] = MEMO_STATICS;
var reactIs_production_min = {};
/**
 * @license React
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var b = Symbol.for("react.element"), c = Symbol.for("react.portal"), d = Symbol.for("react.fragment"), e = Symbol.for("react.strict_mode"), f = Symbol.for("react.profiler"), g = Symbol.for("react.provider"), h = Symbol.for("react.context"), k = Symbol.for("react.server_context"), l = Symbol.for("react.forward_ref"), m = Symbol.for("react.suspense"), n = Symbol.for("react.suspense_list"), p = Symbol.for("react.memo"), q = Symbol.for("react.lazy"), t = Symbol.for("react.offscreen"), u;
u = Symbol.for("react.module.reference");
function v(a) {
  if ("object" === typeof a && null !== a) {
    var r2 = a.$$typeof;
    switch (r2) {
      case b:
        switch (a = a.type, a) {
          case d:
          case f:
          case e:
          case m:
          case n:
            return a;
          default:
            switch (a = a && a.$$typeof, a) {
              case k:
              case h:
              case l:
              case q:
              case p:
              case g:
                return a;
              default:
                return r2;
            }
        }
      case c:
        return r2;
    }
  }
}
reactIs_production_min.ContextConsumer = h;
reactIs_production_min.ContextProvider = g;
reactIs_production_min.Element = b;
reactIs_production_min.ForwardRef = l;
reactIs_production_min.Fragment = d;
reactIs_production_min.Lazy = q;
reactIs_production_min.Memo = p;
reactIs_production_min.Portal = c;
reactIs_production_min.Profiler = f;
reactIs_production_min.StrictMode = e;
reactIs_production_min.Suspense = m;
reactIs_production_min.SuspenseList = n;
reactIs_production_min.isAsyncMode = function() {
  return false;
};
reactIs_production_min.isConcurrentMode = function() {
  return false;
};
reactIs_production_min.isContextConsumer = function(a) {
  return v(a) === h;
};
reactIs_production_min.isContextProvider = function(a) {
  return v(a) === g;
};
reactIs_production_min.isElement = function(a) {
  return "object" === typeof a && null !== a && a.$$typeof === b;
};
reactIs_production_min.isForwardRef = function(a) {
  return v(a) === l;
};
reactIs_production_min.isFragment = function(a) {
  return v(a) === d;
};
reactIs_production_min.isLazy = function(a) {
  return v(a) === q;
};
reactIs_production_min.isMemo = function(a) {
  return v(a) === p;
};
reactIs_production_min.isPortal = function(a) {
  return v(a) === c;
};
reactIs_production_min.isProfiler = function(a) {
  return v(a) === f;
};
reactIs_production_min.isStrictMode = function(a) {
  return v(a) === e;
};
reactIs_production_min.isSuspense = function(a) {
  return v(a) === m;
};
reactIs_production_min.isSuspenseList = function(a) {
  return v(a) === n;
};
reactIs_production_min.isValidElementType = function(a) {
  return "string" === typeof a || "function" === typeof a || a === d || a === f || a === e || a === m || a === n || a === t || "object" === typeof a && null !== a && (a.$$typeof === q || a.$$typeof === p || a.$$typeof === g || a.$$typeof === h || a.$$typeof === l || a.$$typeof === u || void 0 !== a.getModuleId) ? true : false;
};
reactIs_production_min.typeOf = v;
function createListenerCollection() {
  const batch2 = getBatch();
  let first = null;
  let last = null;
  return {
    clear() {
      first = null;
      last = null;
    },
    notify() {
      batch2(() => {
        let listener = first;
        while (listener) {
          listener.callback();
          listener = listener.next;
        }
      });
    },
    get() {
      let listeners = [];
      let listener = first;
      while (listener) {
        listeners.push(listener);
        listener = listener.next;
      }
      return listeners;
    },
    subscribe(callback) {
      let isSubscribed = true;
      let listener = last = {
        callback,
        next: null,
        prev: last
      };
      if (listener.prev) {
        listener.prev.next = listener;
      } else {
        first = listener;
      }
      return function unsubscribe() {
        if (!isSubscribed || first === null)
          return;
        isSubscribed = false;
        if (listener.next) {
          listener.next.prev = listener.prev;
        } else {
          last = listener.prev;
        }
        if (listener.prev) {
          listener.prev.next = listener.next;
        } else {
          first = listener.next;
        }
      };
    }
  };
}
const nullListeners = {
  notify() {
  },
  get: () => []
};
function createSubscription(store2, parentSub) {
  let unsubscribe;
  let listeners = nullListeners;
  function addNestedSub(listener) {
    trySubscribe();
    return listeners.subscribe(listener);
  }
  function notifyNestedSubs() {
    listeners.notify();
  }
  function handleChangeWrapper() {
    if (subscription.onStateChange) {
      subscription.onStateChange();
    }
  }
  function isSubscribed() {
    return Boolean(unsubscribe);
  }
  function trySubscribe() {
    if (!unsubscribe) {
      unsubscribe = parentSub ? parentSub.addNestedSub(handleChangeWrapper) : store2.subscribe(handleChangeWrapper);
      listeners = createListenerCollection();
    }
  }
  function tryUnsubscribe() {
    if (unsubscribe) {
      unsubscribe();
      unsubscribe = void 0;
      listeners.clear();
      listeners = nullListeners;
    }
  }
  const subscription = {
    addNestedSub,
    notifyNestedSubs,
    handleChangeWrapper,
    isSubscribed,
    trySubscribe,
    tryUnsubscribe,
    getListeners: () => listeners
  };
  return subscription;
}
const canUseDOM = !!(typeof window !== "undefined" && typeof window.document !== "undefined" && typeof window.document.createElement !== "undefined");
const useIsomorphicLayoutEffect$1 = canUseDOM ? reactExports.useLayoutEffect : reactExports.useEffect;
function Provider({
  store: store2,
  context,
  children,
  serverState,
  stabilityCheck = "once",
  noopCheck = "once"
}) {
  const contextValue = reactExports.useMemo(() => {
    const subscription = createSubscription(store2);
    return {
      store: store2,
      subscription,
      getServerState: serverState ? () => serverState : void 0,
      stabilityCheck,
      noopCheck
    };
  }, [store2, serverState, stabilityCheck, noopCheck]);
  const previousState = reactExports.useMemo(() => store2.getState(), [store2]);
  useIsomorphicLayoutEffect$1(() => {
    const {
      subscription
    } = contextValue;
    subscription.onStateChange = subscription.notifyNestedSubs;
    subscription.trySubscribe();
    if (previousState !== store2.getState()) {
      subscription.notifyNestedSubs();
    }
    return () => {
      subscription.tryUnsubscribe();
      subscription.onStateChange = void 0;
    };
  }, [contextValue, previousState]);
  const Context = context || ReactReduxContext;
  return /* @__PURE__ */ reactExports.createElement(Context.Provider, {
    value: contextValue
  }, children);
}
function createStoreHook(context = ReactReduxContext) {
  const useReduxContext$1 = (
    // @ts-ignore
    context === ReactReduxContext ? useReduxContext : (
      // @ts-ignore
      createReduxContextHook(context)
    )
  );
  return function useStore2() {
    const {
      store: store2
    } = useReduxContext$1();
    return store2;
  };
}
const useStore = /* @__PURE__ */ createStoreHook();
function createDispatchHook(context = ReactReduxContext) {
  const useStore$1 = (
    // @ts-ignore
    context === ReactReduxContext ? useStore : createStoreHook(context)
  );
  return function useDispatch2() {
    const store2 = useStore$1();
    return store2.dispatch;
  };
}
const useDispatch = /* @__PURE__ */ createDispatchHook();
initializeUseSelector(withSelectorExports.useSyncExternalStoreWithSelector);
setBatch(reactDomExports.unstable_batchedUpdates);
function _typeof(obj) {
  "@babel/helpers - typeof";
  return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj2) {
    return typeof obj2;
  } : function(obj2) {
    return obj2 && "function" == typeof Symbol && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
  }, _typeof(obj);
}
function _toPrimitive(input, hint) {
  if (_typeof(input) !== "object" || input === null)
    return input;
  var prim = input[Symbol.toPrimitive];
  if (prim !== void 0) {
    var res = prim.call(input, hint || "default");
    if (_typeof(res) !== "object")
      return res;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (hint === "string" ? String : Number)(input);
}
function _toPropertyKey(arg) {
  var key = _toPrimitive(arg, "string");
  return _typeof(key) === "symbol" ? key : String(key);
}
function _defineProperty(obj, key, value) {
  key = _toPropertyKey(key);
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }
  return obj;
}
function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    enumerableOnly && (symbols = symbols.filter(function(sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    })), keys.push.apply(keys, symbols);
  }
  return keys;
}
function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = null != arguments[i] ? arguments[i] : {};
    i % 2 ? ownKeys(Object(source), true).forEach(function(key) {
      _defineProperty(target, key, source[key]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function(key) {
      Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
    });
  }
  return target;
}
function formatProdErrorMessage(code) {
  return "Minified Redux error #" + code + "; visit https://redux.js.org/Errors?code=" + code + " for the full message or use the non-minified dev environment for full errors. ";
}
var $$observable = function() {
  return typeof Symbol === "function" && Symbol.observable || "@@observable";
}();
var randomString = function randomString2() {
  return Math.random().toString(36).substring(7).split("").join(".");
};
var ActionTypes = {
  INIT: "@@redux/INIT" + randomString(),
  REPLACE: "@@redux/REPLACE" + randomString(),
  PROBE_UNKNOWN_ACTION: function PROBE_UNKNOWN_ACTION() {
    return "@@redux/PROBE_UNKNOWN_ACTION" + randomString();
  }
};
function isPlainObject(obj) {
  if (typeof obj !== "object" || obj === null)
    return false;
  var proto = obj;
  while (Object.getPrototypeOf(proto) !== null) {
    proto = Object.getPrototypeOf(proto);
  }
  return Object.getPrototypeOf(obj) === proto;
}
function createStore(reducer2, preloadedState, enhancer) {
  var _ref2;
  if (typeof preloadedState === "function" && typeof enhancer === "function" || typeof enhancer === "function" && typeof arguments[3] === "function") {
    throw new Error(formatProdErrorMessage(0));
  }
  if (typeof preloadedState === "function" && typeof enhancer === "undefined") {
    enhancer = preloadedState;
    preloadedState = void 0;
  }
  if (typeof enhancer !== "undefined") {
    if (typeof enhancer !== "function") {
      throw new Error(formatProdErrorMessage(1));
    }
    return enhancer(createStore)(reducer2, preloadedState);
  }
  if (typeof reducer2 !== "function") {
    throw new Error(formatProdErrorMessage(2));
  }
  var currentReducer = reducer2;
  var currentState = preloadedState;
  var currentListeners = [];
  var nextListeners = currentListeners;
  var isDispatching = false;
  function ensureCanMutateNextListeners() {
    if (nextListeners === currentListeners) {
      nextListeners = currentListeners.slice();
    }
  }
  function getState() {
    if (isDispatching) {
      throw new Error(formatProdErrorMessage(3));
    }
    return currentState;
  }
  function subscribe(listener) {
    if (typeof listener !== "function") {
      throw new Error(formatProdErrorMessage(4));
    }
    if (isDispatching) {
      throw new Error(formatProdErrorMessage(5));
    }
    var isSubscribed = true;
    ensureCanMutateNextListeners();
    nextListeners.push(listener);
    return function unsubscribe() {
      if (!isSubscribed) {
        return;
      }
      if (isDispatching) {
        throw new Error(formatProdErrorMessage(6));
      }
      isSubscribed = false;
      ensureCanMutateNextListeners();
      var index2 = nextListeners.indexOf(listener);
      nextListeners.splice(index2, 1);
      currentListeners = null;
    };
  }
  function dispatch(action) {
    if (!isPlainObject(action)) {
      throw new Error(formatProdErrorMessage(7));
    }
    if (typeof action.type === "undefined") {
      throw new Error(formatProdErrorMessage(8));
    }
    if (isDispatching) {
      throw new Error(formatProdErrorMessage(9));
    }
    try {
      isDispatching = true;
      currentState = currentReducer(currentState, action);
    } finally {
      isDispatching = false;
    }
    var listeners = currentListeners = nextListeners;
    for (var i = 0; i < listeners.length; i++) {
      var listener = listeners[i];
      listener();
    }
    return action;
  }
  function replaceReducer(nextReducer) {
    if (typeof nextReducer !== "function") {
      throw new Error(formatProdErrorMessage(10));
    }
    currentReducer = nextReducer;
    dispatch({
      type: ActionTypes.REPLACE
    });
  }
  function observable() {
    var _ref;
    var outerSubscribe = subscribe;
    return _ref = {
      /**
       * The minimal observable subscription method.
       * @param {Object} observer Any object that can be used as an observer.
       * The observer object should have a `next` method.
       * @returns {subscription} An object with an `unsubscribe` method that can
       * be used to unsubscribe the observable from the store, and prevent further
       * emission of values from the observable.
       */
      subscribe: function subscribe2(observer) {
        if (typeof observer !== "object" || observer === null) {
          throw new Error(formatProdErrorMessage(11));
        }
        function observeState() {
          if (observer.next) {
            observer.next(getState());
          }
        }
        observeState();
        var unsubscribe = outerSubscribe(observeState);
        return {
          unsubscribe
        };
      }
    }, _ref[$$observable] = function() {
      return this;
    }, _ref;
  }
  dispatch({
    type: ActionTypes.INIT
  });
  return _ref2 = {
    dispatch,
    subscribe,
    getState,
    replaceReducer
  }, _ref2[$$observable] = observable, _ref2;
}
function assertReducerShape(reducers) {
  Object.keys(reducers).forEach(function(key) {
    var reducer2 = reducers[key];
    var initialState2 = reducer2(void 0, {
      type: ActionTypes.INIT
    });
    if (typeof initialState2 === "undefined") {
      throw new Error(formatProdErrorMessage(12));
    }
    if (typeof reducer2(void 0, {
      type: ActionTypes.PROBE_UNKNOWN_ACTION()
    }) === "undefined") {
      throw new Error(formatProdErrorMessage(13));
    }
  });
}
function combineReducers(reducers) {
  var reducerKeys = Object.keys(reducers);
  var finalReducers = {};
  for (var i = 0; i < reducerKeys.length; i++) {
    var key = reducerKeys[i];
    if (typeof reducers[key] === "function") {
      finalReducers[key] = reducers[key];
    }
  }
  var finalReducerKeys = Object.keys(finalReducers);
  var shapeAssertionError;
  try {
    assertReducerShape(finalReducers);
  } catch (e2) {
    shapeAssertionError = e2;
  }
  return function combination(state, action) {
    if (state === void 0) {
      state = {};
    }
    if (shapeAssertionError) {
      throw shapeAssertionError;
    }
    var hasChanged = false;
    var nextState = {};
    for (var _i = 0; _i < finalReducerKeys.length; _i++) {
      var _key = finalReducerKeys[_i];
      var reducer2 = finalReducers[_key];
      var previousStateForKey = state[_key];
      var nextStateForKey = reducer2(previousStateForKey, action);
      if (typeof nextStateForKey === "undefined") {
        action && action.type;
        throw new Error(formatProdErrorMessage(14));
      }
      nextState[_key] = nextStateForKey;
      hasChanged = hasChanged || nextStateForKey !== previousStateForKey;
    }
    hasChanged = hasChanged || finalReducerKeys.length !== Object.keys(state).length;
    return hasChanged ? nextState : state;
  };
}
function compose() {
  for (var _len = arguments.length, funcs = new Array(_len), _key = 0; _key < _len; _key++) {
    funcs[_key] = arguments[_key];
  }
  if (funcs.length === 0) {
    return function(arg) {
      return arg;
    };
  }
  if (funcs.length === 1) {
    return funcs[0];
  }
  return funcs.reduce(function(a, b2) {
    return function() {
      return a(b2.apply(void 0, arguments));
    };
  });
}
function applyMiddleware() {
  for (var _len = arguments.length, middlewares = new Array(_len), _key = 0; _key < _len; _key++) {
    middlewares[_key] = arguments[_key];
  }
  return function(createStore2) {
    return function() {
      var store2 = createStore2.apply(void 0, arguments);
      var _dispatch = function dispatch() {
        throw new Error(formatProdErrorMessage(15));
      };
      var middlewareAPI = {
        getState: store2.getState,
        dispatch: function dispatch() {
          return _dispatch.apply(void 0, arguments);
        }
      };
      var chain = middlewares.map(function(middleware2) {
        return middleware2(middlewareAPI);
      });
      _dispatch = compose.apply(void 0, chain)(store2.dispatch);
      return _objectSpread2(_objectSpread2({}, store2), {}, {
        dispatch: _dispatch
      });
    };
  };
}
function createThunkMiddleware(extraArgument) {
  var middleware2 = function middleware3(_ref) {
    var dispatch = _ref.dispatch, getState = _ref.getState;
    return function(next) {
      return function(action) {
        if (typeof action === "function") {
          return action(dispatch, getState, extraArgument);
        }
        return next(action);
      };
    };
  };
  return middleware2;
}
var thunk = createThunkMiddleware();
thunk.withExtraArgument = createThunkMiddleware;
const thunk$1 = thunk;
function extensionComposeStub() {
  for (var _len = arguments.length, funcs = new Array(_len), _key = 0; _key < _len; _key++) {
    funcs[_key] = arguments[_key];
  }
  if (funcs.length === 0)
    return void 0;
  if (typeof funcs[0] === "object")
    return compose;
  return compose(...funcs);
}
const composeWithDevTools = typeof window !== "undefined" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : extensionComposeStub;
const MESSAGE_SHOW_SUCCESS = "MESSAGE_SHOW_SUCCESS";
const MESSAGE_SHOW_FAILURE = "MESSAGE_SHOW_FAILURE";
const showMessageReducer = (state = {}, action) => {
  switch (action.type) {
    case MESSAGE_SHOW_SUCCESS:
      return { message: action.payload };
    case MESSAGE_SHOW_FAILURE:
      return { error: action.payload };
    default:
      return state;
  }
};
const USER_LOGIN_REQUEST = "USER_LOGIN_REQUEST";
const USER_LOGIN_SUCCESS = "USER_LOGIN_SUCCESS";
const USER_LOGIN_FAILURE = "USER_LOGIN_FAILURE";
const USER_LOGIN_LOGOUT = "USER_LOGIN_LOGOUT";
const USER_LOGIN_CLEAR = "USER_LOGIN_CLEAR";
const USER_REGISTER_REQUEST = "USER_REGISTER_REQUEST";
const USER_REGISTER_SUCCESS = "USER_REGISTER_SUCCESS";
const USER_REGISTER_FAILURE = "USER_REGISTER_FAILURE";
const USER_VERIFY_REQUEST = "USER_VERIFY_REQUEST";
const USER_VERIFY_SUCCESS = "USER_VERIFY_SUCCESS";
const USER_VERIFY_FAILURE = "USER_VERIFY_FAILURE";
const USER_FORGOT_REQUEST = "USER_FORGOT_REQUEST";
const USER_FORGOT_SUCCESS = "USER_FORGOT_SUCCESS";
const USER_FORGOT_FAILURE = "USER_FORGOT_FAILURE";
const USER_RESET_REQUEST = "USER_RESET_REQUEST";
const USER_RESET_SUCCESS = "USER_RESET_SUCCESS";
const USER_RESET_FAILURE = "USER_RESET_FAILURE";
const USER_TOKEN_REQUEST = "USER_TOKEN_REQUEST";
const USER_TOKEN_SUCCESS = "USER_TOKEN_SUCCESS";
const USER_TOKEN_FAILURE = "USER_TOKEN_FAILURE";
const userResetReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_RESET_REQUEST:
      return { loading: true };
    case USER_RESET_SUCCESS:
      return { loading: false, ...action.payload };
    case USER_RESET_FAILURE:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
const userForgotReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_FORGOT_REQUEST:
      return { loading: true };
    case USER_FORGOT_SUCCESS:
      return { loading: false, success: action.payload };
    case USER_FORGOT_FAILURE:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
const userVerifyReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_VERIFY_REQUEST:
      return { loading: true };
    case USER_VERIFY_SUCCESS:
      return { loading: false, success: action.payload };
    case USER_VERIFY_FAILURE:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
const userRegisterReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_REGISTER_REQUEST:
      return { loading: true };
    case USER_REGISTER_SUCCESS:
      return { loading: false, ...action.payload };
    case USER_REGISTER_FAILURE:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
const userLoginReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      return { loading: true };
    case USER_LOGIN_SUCCESS:
      return { loading: false, ...action.payload };
    case USER_LOGIN_FAILURE:
      return { loading: false, error: action.payload };
    case USER_LOGIN_LOGOUT:
      return { loading: false, ...action.payload };
    case USER_LOGIN_CLEAR:
      return {};
    default:
      return state;
  }
};
const userTokenReducer = (state = { valid: false }, action) => {
  switch (action.type) {
    case USER_TOKEN_REQUEST:
      return { loading: true };
    case USER_TOKEN_SUCCESS:
      return { loading: false, valid: action.payload };
    case USER_TOKEN_FAILURE:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
const DASHBOARD_START_REQUEST = "DASHBOARD_START_REQUEST";
const DASHBOARD_START_SUCCESS = "DASHBOARD_START_SUCCESS";
const DASHBOARD_START_FAILURE = "DASHBOARD_START_FAILURE";
const DASHBOARD_PRICE_REQUEST = "DASHBOARD_PRICE_REQUEST";
const DASHBOARD_PRICE_SUCCESS = "DASHBOARD_PRICE_SUCCESS";
const DASHBOARD_PRICE_FAILURE = "DASHBOARD_PRICE_FAILURE";
const DASHBOARD_REPORT_REQUEST = "DASHBOARD_REPORT_REQUEST";
const DASHBOARD_REPORT_SUCCESS = "DASHBOARD_REPORT_SUCCESS";
const DASHBOARD_REPORT_FAILURE = "DASHBOARD_REPORT_FAILURE";
const DASHBOARD_DIVIDEND_REQUEST = "DASHBOARD_DIVIDEND_REQUEST";
const DASHBOARD_DIVIDEND_SUCCESS = "DASHBOARD_DIVIDEND_SUCCESS";
const DASHBOARD_DIVIDEND_FAILURE = "DASHBOARD_DIVIDEND_FAILURE";
const DASHBOARD_SECTOR_REQUEST = "DASHBOARD_SECTOR_REQUEST";
const DASHBOARD_SECTOR_SUCCESS = "DASHBOARD_SECTOR_SUCCESS";
const DASHBOARD_SECTOR_FAILURE = "DASHBOARD_SECTOR_FAILURE";
const DASHBOARD_LIST_REQUEST = "DASHBOARD_LIST_REQUEST";
const DASHBOARD_LIST_SUCCESS = "DASHBOARD_LIST_SUCCESS";
const DASHBOARD_LIST_FAILURE = "DASHBOARD_LIST_FAILURE";
const DASHBOARD_COMPANY_REQUEST = "DASHBOARD_COMPANY_REQUEST";
const DASHBOARD_COMPANY_SUCCESS = "DASHBOARD_COMPANY_SUCCESS";
const DASHBOARD_COMPANY_FAILURE = "DASHBOARD_COMPANY_FAILURE";
const DASHBOARD_BLUECHIP_REQUEST = "DASHBOARD_BLUECHIP_REQUEST";
const DASHBOARD_BLUECHIP_SUCCESS = "DASHBOARD_BLUECHIP_SUCCESS";
const DASHBOARD_BLUECHIP_FAILURE = "DASHBOARD_BLUECHIP_FAILURE";
const DASHBOARD_BLUECHIP_STORE_REQUEST = "DASHBOARD_BLUECHIP_STORE_REQUEST";
const DASHBOARD_BLUECHIP_STORE_SUCCESS = "DASHBOARD_BLUECHIP_STORE_SUCCESS";
const DASHBOARD_BLUECHIP_STORE_FAILURE = "DASHBOARD_BLUECHIP_STORE_FAILURE";
const DASHBOARD_BLUECHIP_DESTROY_REQUEST = "DASHBOARD_BLUECHIP_DESTROY_REQUEST";
const DASHBOARD_BLUECHIP_DESTROY_SUCCESS = "DASHBOARD_BLUECHIP_DESTROY_SUCCESS";
const DASHBOARD_BLUECHIP_DESTROY_FAILURE = "DASHBOARD_BLUECHIP_DESTROY_FAILURE";
const DASHBOARD_EDGE_REQUEST = "DASHBOARD_EDGE_REQUEST";
const DASHBOARD_EDGE_SUCCESS = "DASHBOARD_EDGE_SUCCESS";
const DASHBOARD_EDGE_FAILURE = "DASHBOARD_EDGE_FAILURE";
const DASHBOARD_EDGE_UPDATE_REQUEST = "DASHBOARD_EDGE_UPDATE_REQUEST";
const DASHBOARD_EDGE_UPDATE_SUCCESS = "DASHBOARD_EDGE_UPDATE_SUCCESS";
const DASHBOARD_EDGE_UPDATE_FAILURE = "DASHBOARD_EDGE_UPDATE_FAILURE";
const DASHBOARD_STOCK_GAINER_REQUEST = "DASHBOARD_STOCK_GAINER_REQUEST";
const DASHBOARD_STOCK_GAINER_SUCCESS = "DASHBOARD_STOCK_GAINER_SUCCESS";
const DASHBOARD_STOCK_GAINER_FAILURE = "DASHBOARD_STOCK_GAINER_FAILURE";
const DASHBOARD_STOCK_LOSSER_REQUEST = "DASHBOARD_STOCK_LOSSER_REQUEST";
const DASHBOARD_STOCK_LOSSER_SUCCESS = "DASHBOARD_STOCK_LOSSER_SUCCESS";
const DASHBOARD_STOCK_LOSSER_FAILURE = "DASHBOARD_STOCK_LOSSER_FAILURE";
const dashboardStartReducer = (state = {}, action) => {
  switch (action.type) {
    case DASHBOARD_START_REQUEST:
      return { loading: true };
    case DASHBOARD_START_SUCCESS:
      return { loading: false, success: action.payload };
    case DASHBOARD_START_FAILURE:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
const dashboardPriceReducer = (state = {}, action) => {
  switch (action.type) {
    case DASHBOARD_PRICE_REQUEST:
      return { loading: true };
    case DASHBOARD_PRICE_SUCCESS:
      return { loading: false, success: action.payload };
    case DASHBOARD_PRICE_FAILURE:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
const dashboardReportReducer = (state = {}, action) => {
  switch (action.type) {
    case DASHBOARD_REPORT_REQUEST:
      return { loading: true };
    case DASHBOARD_REPORT_SUCCESS:
      return { loading: false, success: action.payload };
    case DASHBOARD_REPORT_FAILURE:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
const dashboardDividendReducer = (state = {}, action) => {
  switch (action.type) {
    case DASHBOARD_DIVIDEND_REQUEST:
      return { loading: true };
    case DASHBOARD_DIVIDEND_SUCCESS:
      return { loading: false, success: action.payload };
    case DASHBOARD_DIVIDEND_FAILURE:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
const dashboardSectorReducer = (state = {}, action) => {
  switch (action.type) {
    case DASHBOARD_SECTOR_REQUEST:
      return { loading: true };
    case DASHBOARD_SECTOR_SUCCESS:
      return { loading: false, success: action.payload };
    case DASHBOARD_SECTOR_FAILURE:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
const dashboardListReducer = (state = {}, action) => {
  switch (action.type) {
    case DASHBOARD_LIST_REQUEST:
      return { loading: true };
    case DASHBOARD_LIST_SUCCESS:
      return { loading: false, success: action.payload };
    case DASHBOARD_LIST_FAILURE:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
const dashboardCompanyReducer = (state = {}, action) => {
  switch (action.type) {
    case DASHBOARD_COMPANY_REQUEST:
      return { loading: true };
    case DASHBOARD_COMPANY_SUCCESS:
      return { loading: false, success: action.payload };
    case DASHBOARD_COMPANY_FAILURE:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
const dashboardBluechipReducer = (state = {}, action) => {
  switch (action.type) {
    case DASHBOARD_BLUECHIP_REQUEST:
      return { loading: true };
    case DASHBOARD_BLUECHIP_SUCCESS:
      return { loading: false, bluechip: action.payload };
    case DASHBOARD_BLUECHIP_FAILURE:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
const dashboardBluechipStoreReducer = (state = {}, action) => {
  switch (action.type) {
    case DASHBOARD_BLUECHIP_STORE_REQUEST:
      return { loading: true };
    case DASHBOARD_BLUECHIP_STORE_SUCCESS:
      return { loading: false, success: action.payload };
    case DASHBOARD_BLUECHIP_STORE_FAILURE:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
const dashboardBluechipDestroyReducer = (state = {}, action) => {
  switch (action.type) {
    case DASHBOARD_BLUECHIP_DESTROY_REQUEST:
      return { loading: true };
    case DASHBOARD_BLUECHIP_DESTROY_SUCCESS:
      return { loading: false, success: action.payload };
    case DASHBOARD_BLUECHIP_DESTROY_FAILURE:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
const dashboardEdgeReducer = (state = {}, action) => {
  switch (action.type) {
    case DASHBOARD_EDGE_REQUEST:
      return { loading: true };
    case DASHBOARD_EDGE_SUCCESS:
      return { loading: false, edge: action.payload };
    case DASHBOARD_EDGE_FAILURE:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
const dashboardEdgeUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case DASHBOARD_EDGE_UPDATE_REQUEST:
      return { loading: true };
    case DASHBOARD_EDGE_UPDATE_SUCCESS:
      return { loading: false, success: action.payload };
    case DASHBOARD_EDGE_UPDATE_FAILURE:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
const dashboardStockGainerReducer = (state = {}, action) => {
  switch (action.type) {
    case DASHBOARD_STOCK_GAINER_REQUEST:
      return { loading: true };
    case DASHBOARD_STOCK_GAINER_SUCCESS:
      return { loading: false, stockgainer: action.payload };
    case DASHBOARD_STOCK_GAINER_FAILURE:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
const dashboardStockLosserReducer = (state = {}, action) => {
  switch (action.type) {
    case DASHBOARD_STOCK_LOSSER_REQUEST:
      return { loading: true };
    case DASHBOARD_STOCK_LOSSER_SUCCESS:
      return { loading: false, stocklosser: action.payload };
    case DASHBOARD_STOCK_LOSSER_FAILURE:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
const WATCHLIST_BUILD_REQUEST = "WATCHLIST_BUILD_REQUEST";
const WATCHLIST_BUILD_SUCCESS = "WATCHLIST_BUILD_SUCCESS";
const WATCHLIST_BUILD_FAILURE = "WATCHLIST_BUILD_FAILURE";
const WATCHLIST_FETCH_REQUEST = "WATCHLIST_FETCH_REQUEST";
const WATCHLIST_FETCH_SUCCESS = "WATCHLIST_FETCH_SUCCESS";
const WATCHLIST_FETCH_FAILURE = "WATCHLIST_FETCH_FAILURE";
const WATCHLIST_STORE_REQUEST = "WATCHLIST_STORE_REQUEST";
const WATCHLIST_STORE_SUCCESS = "WATCHLIST_STORE_SUCCESS";
const WATCHLIST_STORE_FAILURE = "WATCHLIST_STORE_FAILURE";
const WATCHLIST_DESTROY_REQUEST = "WATCHLIST_DESTROY_REQUEST";
const WATCHLIST_DESTROY_SUCCESS = "WATCHLIST_DESTROY_SUCCESS";
const WATCHLIST_DESTROY_FAILURE = "WATCHLIST_DESTROY_FAILURE";
const watchlistBuildReducer = (state = {}, action) => {
  switch (action.type) {
    case WATCHLIST_BUILD_REQUEST:
      return { loading: true };
    case WATCHLIST_BUILD_SUCCESS:
      return { loading: false, watchbuild: action.payload };
    case WATCHLIST_BUILD_FAILURE:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
const watchlistStoreReducer = (state = {}, action) => {
  switch (action.type) {
    case WATCHLIST_STORE_REQUEST:
      return { loading: true };
    case WATCHLIST_STORE_SUCCESS:
      return { loading: false, success: action.payload };
    case WATCHLIST_STORE_FAILURE:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
const watchlistFetchReducer = (state = {}, action) => {
  switch (action.type) {
    case WATCHLIST_FETCH_REQUEST:
      return { loading: true };
    case WATCHLIST_FETCH_SUCCESS:
      return { loading: false, watchlist: action.payload };
    case WATCHLIST_FETCH_FAILURE:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
const watchlistDestroyReducer = (state = {}, action) => {
  switch (action.type) {
    case WATCHLIST_FETCH_REQUEST:
      return { loading: true };
    case WATCHLIST_FETCH_SUCCESS:
      return { loading: false, success: action.payload };
    case WATCHLIST_FETCH_FAILURE:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
const TRADE_BLUECHIP_REQUEST = "TRADE_BLUECHIP_REQUEST";
const TRADE_BLUECHIP_SUCCESS = "TRADE_BLUECHIP_SUCCESS";
const TRADE_BLUECHIP_FAILURE = "TRADE_BLUECHIP_FAILURE";
const TRADE_COMMON_REQUEST = "TRADE_COMMON_REQUEST";
const TRADE_COMMON_SUCCESS = "TRADE_COMMON_SUCCESS";
const TRADE_COMMON_FAILURE = "TRADE_COMMON_FAILURE";
const TRADE_STORE_REQUEST = "TRADE_STORE_REQUEST";
const TRADE_STORE_SUCCESS = "TRADE_STORE_SUCCESS";
const TRADE_STORE_FAILURE = "TRADE_STORE_FAILURE";
const tradeBluechipReducer = (state = {}, action) => {
  switch (action.type) {
    case TRADE_BLUECHIP_REQUEST:
      return { loading: true };
    case TRADE_BLUECHIP_SUCCESS:
      return { loading: false, bluechip: action.payload };
    case TRADE_BLUECHIP_FAILURE:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
const tradeCommonReducer = (state = {}, action) => {
  switch (action.type) {
    case TRADE_COMMON_REQUEST:
      return { loading: true };
    case TRADE_COMMON_SUCCESS:
      return { loading: false, common: action.payload };
    case TRADE_COMMON_FAILURE:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
const tradeStoreReducer = (state = {}, action) => {
  switch (action.type) {
    case TRADE_STORE_REQUEST:
      return { loading: true };
    case TRADE_STORE_SUCCESS:
      return { loading: false, success: action.payload };
    case TRADE_STORE_FAILURE:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
const CHART_WATCHLIST_REQUEST = "CHART_WATCHLIST_REQUEST";
const CHART_WATCHLIST_SUCCESS = "CHART_WATCHLIST_SUCCESS";
const CHART_WATCHLIST_FAILURE = "CHART_WATCHLIST_FAILURE";
const chartWatchlistReducer = (state = {}, action) => {
  switch (action.type) {
    case CHART_WATCHLIST_REQUEST:
      return { loading: true };
    case CHART_WATCHLIST_SUCCESS:
      return { loading: false, watchbuild: action.payload };
    case CHART_WATCHLIST_FAILURE:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
const reducer = combineReducers({
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userVerify: userVerifyReducer,
  userForgot: userForgotReducer,
  userReset: userResetReducer,
  userToken: userTokenReducer,
  dashboardStart: dashboardStartReducer,
  dashboardPrice: dashboardPriceReducer,
  dashboardReport: dashboardReportReducer,
  dashboardDividend: dashboardDividendReducer,
  dashboardSector: dashboardSectorReducer,
  dashboardList: dashboardListReducer,
  dashboardCompany: dashboardCompanyReducer,
  dashboardBluechip: dashboardBluechipReducer,
  dashboardBluechipStore: dashboardBluechipStoreReducer,
  dashboardBluechipDestroy: dashboardBluechipDestroyReducer,
  dashboardEdge: dashboardEdgeReducer,
  dashboardEdgeUpdate: dashboardEdgeUpdateReducer,
  dashboardStockGainer: dashboardStockGainerReducer,
  dashboardStockLosser: dashboardStockLosserReducer,
  watchlistBuild: watchlistBuildReducer,
  watchlistStore: watchlistStoreReducer,
  watchlistFetch: watchlistFetchReducer,
  watchlistDestroy: watchlistDestroyReducer,
  tradeBluechip: tradeBluechipReducer,
  tradeCommon: tradeCommonReducer,
  tradeStore: tradeStoreReducer,
  chartWatchlist: chartWatchlistReducer,
  showMessage: showMessageReducer
});
const accountFromStorage = localStorage.getItem("account") ? JSON.parse(localStorage.getItem("account")) : {};
const tokenFromStorage = localStorage.getItem("token") ? JSON.parse(localStorage.getItem("token")) : { valid: false };
const dashboardBluechipFromStorage = localStorage.getItem("dashboardBluechip") ? JSON.parse(localStorage.getItem("dashboardBluechip")) : {};
const dashboardEdgeFromStorage = localStorage.getItem("dashboardEdge") ? JSON.parse(localStorage.getItem("dashboardEdge")) : {};
const dashboardStockGainerFromStorage = localStorage.getItem("dashboardStockGainer") ? JSON.parse(localStorage.getItem("dashboardStockGainer")) : {};
const dashboardStockLosserFromStorage = localStorage.getItem("dashboardStockLosser") ? JSON.parse(localStorage.getItem("dashboardStockLosser")) : {};
const watchlistBuildFromStorage = localStorage.getItem("watchlistBuild") ? JSON.parse(localStorage.getItem("watchlistBuild")) : {};
const watchlistFetchFromStorage = localStorage.getItem("watchlistFetch") ? JSON.parse(localStorage.getItem("watchlistFetch")) : {};
const tradeBluechipFromStorage = localStorage.getItem("tradeBluechip") ? JSON.parse(localStorage.getItem("tradeBluechip")) : {};
const tradeCommonFromStorage = localStorage.getItem("tradeCommon") ? JSON.parse(localStorage.getItem("tradeCommon")) : {};
const chartWatchlistFromStorage = localStorage.getItem("chartWatchlist") ? JSON.parse(localStorage.getItem("chartWatchlist")) : {};
const initialState = {
  userLogin: accountFromStorage,
  userToken: tokenFromStorage,
  dashboardBluechip: dashboardBluechipFromStorage,
  dashboardEdge: dashboardEdgeFromStorage,
  dashboardStockGainer: dashboardStockGainerFromStorage,
  dashboardStockLosser: dashboardStockLosserFromStorage,
  watchlistBuild: watchlistBuildFromStorage,
  watchlistFetch: watchlistFetchFromStorage,
  tradeBluechip: tradeBluechipFromStorage,
  tradeCommon: tradeCommonFromStorage,
  chartWatchlist: chartWatchlistFromStorage
};
const middleware = [thunk$1];
const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)));
/**
 * @remix-run/router v1.7.2
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */
function _extends$2() {
  _extends$2 = Object.assign ? Object.assign.bind() : function(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  return _extends$2.apply(this, arguments);
}
var Action;
(function(Action2) {
  Action2["Pop"] = "POP";
  Action2["Push"] = "PUSH";
  Action2["Replace"] = "REPLACE";
})(Action || (Action = {}));
const PopStateEventType = "popstate";
function createBrowserHistory(options) {
  if (options === void 0) {
    options = {};
  }
  function createBrowserLocation(window2, globalHistory) {
    let {
      pathname,
      search,
      hash
    } = window2.location;
    return createLocation(
      "",
      {
        pathname,
        search,
        hash
      },
      // state defaults to `null` because `window.history.state` does
      globalHistory.state && globalHistory.state.usr || null,
      globalHistory.state && globalHistory.state.key || "default"
    );
  }
  function createBrowserHref(window2, to) {
    return typeof to === "string" ? to : createPath(to);
  }
  return getUrlBasedHistory(createBrowserLocation, createBrowserHref, null, options);
}
function invariant(value, message) {
  if (value === false || value === null || typeof value === "undefined") {
    throw new Error(message);
  }
}
function warning(cond, message) {
  if (!cond) {
    if (typeof console !== "undefined")
      console.warn(message);
    try {
      throw new Error(message);
    } catch (e2) {
    }
  }
}
function createKey() {
  return Math.random().toString(36).substr(2, 8);
}
function getHistoryState(location, index2) {
  return {
    usr: location.state,
    key: location.key,
    idx: index2
  };
}
function createLocation(current, to, state, key) {
  if (state === void 0) {
    state = null;
  }
  let location = _extends$2({
    pathname: typeof current === "string" ? current : current.pathname,
    search: "",
    hash: ""
  }, typeof to === "string" ? parsePath(to) : to, {
    state,
    // TODO: This could be cleaned up.  push/replace should probably just take
    // full Locations now and avoid the need to run through this flow at all
    // But that's a pretty big refactor to the current test suite so going to
    // keep as is for the time being and just let any incoming keys take precedence
    key: to && to.key || key || createKey()
  });
  return location;
}
function createPath(_ref) {
  let {
    pathname = "/",
    search = "",
    hash = ""
  } = _ref;
  if (search && search !== "?")
    pathname += search.charAt(0) === "?" ? search : "?" + search;
  if (hash && hash !== "#")
    pathname += hash.charAt(0) === "#" ? hash : "#" + hash;
  return pathname;
}
function parsePath(path) {
  let parsedPath = {};
  if (path) {
    let hashIndex = path.indexOf("#");
    if (hashIndex >= 0) {
      parsedPath.hash = path.substr(hashIndex);
      path = path.substr(0, hashIndex);
    }
    let searchIndex = path.indexOf("?");
    if (searchIndex >= 0) {
      parsedPath.search = path.substr(searchIndex);
      path = path.substr(0, searchIndex);
    }
    if (path) {
      parsedPath.pathname = path;
    }
  }
  return parsedPath;
}
function getUrlBasedHistory(getLocation, createHref, validateLocation, options) {
  if (options === void 0) {
    options = {};
  }
  let {
    window: window2 = document.defaultView,
    v5Compat = false
  } = options;
  let globalHistory = window2.history;
  let action = Action.Pop;
  let listener = null;
  let index2 = getIndex();
  if (index2 == null) {
    index2 = 0;
    globalHistory.replaceState(_extends$2({}, globalHistory.state, {
      idx: index2
    }), "");
  }
  function getIndex() {
    let state = globalHistory.state || {
      idx: null
    };
    return state.idx;
  }
  function handlePop() {
    action = Action.Pop;
    let nextIndex = getIndex();
    let delta = nextIndex == null ? null : nextIndex - index2;
    index2 = nextIndex;
    if (listener) {
      listener({
        action,
        location: history.location,
        delta
      });
    }
  }
  function push(to, state) {
    action = Action.Push;
    let location = createLocation(history.location, to, state);
    if (validateLocation)
      validateLocation(location, to);
    index2 = getIndex() + 1;
    let historyState = getHistoryState(location, index2);
    let url = history.createHref(location);
    try {
      globalHistory.pushState(historyState, "", url);
    } catch (error) {
      if (error instanceof DOMException && error.name === "DataCloneError") {
        throw error;
      }
      window2.location.assign(url);
    }
    if (v5Compat && listener) {
      listener({
        action,
        location: history.location,
        delta: 1
      });
    }
  }
  function replace(to, state) {
    action = Action.Replace;
    let location = createLocation(history.location, to, state);
    if (validateLocation)
      validateLocation(location, to);
    index2 = getIndex();
    let historyState = getHistoryState(location, index2);
    let url = history.createHref(location);
    globalHistory.replaceState(historyState, "", url);
    if (v5Compat && listener) {
      listener({
        action,
        location: history.location,
        delta: 0
      });
    }
  }
  function createURL(to) {
    let base = window2.location.origin !== "null" ? window2.location.origin : window2.location.href;
    let href = typeof to === "string" ? to : createPath(to);
    invariant(base, "No window.location.(origin|href) available to create URL for href: " + href);
    return new URL(href, base);
  }
  let history = {
    get action() {
      return action;
    },
    get location() {
      return getLocation(window2, globalHistory);
    },
    listen(fn) {
      if (listener) {
        throw new Error("A history only accepts one active listener");
      }
      window2.addEventListener(PopStateEventType, handlePop);
      listener = fn;
      return () => {
        window2.removeEventListener(PopStateEventType, handlePop);
        listener = null;
      };
    },
    createHref(to) {
      return createHref(window2, to);
    },
    createURL,
    encodeLocation(to) {
      let url = createURL(to);
      return {
        pathname: url.pathname,
        search: url.search,
        hash: url.hash
      };
    },
    push,
    replace,
    go(n2) {
      return globalHistory.go(n2);
    }
  };
  return history;
}
var ResultType;
(function(ResultType2) {
  ResultType2["data"] = "data";
  ResultType2["deferred"] = "deferred";
  ResultType2["redirect"] = "redirect";
  ResultType2["error"] = "error";
})(ResultType || (ResultType = {}));
function matchRoutes(routes, locationArg, basename) {
  if (basename === void 0) {
    basename = "/";
  }
  let location = typeof locationArg === "string" ? parsePath(locationArg) : locationArg;
  let pathname = stripBasename(location.pathname || "/", basename);
  if (pathname == null) {
    return null;
  }
  let branches = flattenRoutes(routes);
  rankRouteBranches(branches);
  let matches = null;
  for (let i = 0; matches == null && i < branches.length; ++i) {
    matches = matchRouteBranch(
      branches[i],
      // Incoming pathnames are generally encoded from either window.location
      // or from router.navigate, but we want to match against the unencoded
      // paths in the route definitions.  Memory router locations won't be
      // encoded here but there also shouldn't be anything to decode so this
      // should be a safe operation.  This avoids needing matchRoutes to be
      // history-aware.
      safelyDecodeURI(pathname)
    );
  }
  return matches;
}
function flattenRoutes(routes, branches, parentsMeta, parentPath) {
  if (branches === void 0) {
    branches = [];
  }
  if (parentsMeta === void 0) {
    parentsMeta = [];
  }
  if (parentPath === void 0) {
    parentPath = "";
  }
  let flattenRoute = (route, index2, relativePath) => {
    let meta = {
      relativePath: relativePath === void 0 ? route.path || "" : relativePath,
      caseSensitive: route.caseSensitive === true,
      childrenIndex: index2,
      route
    };
    if (meta.relativePath.startsWith("/")) {
      invariant(meta.relativePath.startsWith(parentPath), 'Absolute route path "' + meta.relativePath + '" nested under path ' + ('"' + parentPath + '" is not valid. An absolute child route path ') + "must start with the combined path of all its parent routes.");
      meta.relativePath = meta.relativePath.slice(parentPath.length);
    }
    let path = joinPaths([parentPath, meta.relativePath]);
    let routesMeta = parentsMeta.concat(meta);
    if (route.children && route.children.length > 0) {
      invariant(
        // Our types know better, but runtime JS may not!
        // @ts-expect-error
        route.index !== true,
        "Index routes must not have child routes. Please remove " + ('all child routes from route path "' + path + '".')
      );
      flattenRoutes(route.children, branches, routesMeta, path);
    }
    if (route.path == null && !route.index) {
      return;
    }
    branches.push({
      path,
      score: computeScore(path, route.index),
      routesMeta
    });
  };
  routes.forEach((route, index2) => {
    var _route$path;
    if (route.path === "" || !((_route$path = route.path) != null && _route$path.includes("?"))) {
      flattenRoute(route, index2);
    } else {
      for (let exploded of explodeOptionalSegments(route.path)) {
        flattenRoute(route, index2, exploded);
      }
    }
  });
  return branches;
}
function explodeOptionalSegments(path) {
  let segments = path.split("/");
  if (segments.length === 0)
    return [];
  let [first, ...rest] = segments;
  let isOptional = first.endsWith("?");
  let required = first.replace(/\?$/, "");
  if (rest.length === 0) {
    return isOptional ? [required, ""] : [required];
  }
  let restExploded = explodeOptionalSegments(rest.join("/"));
  let result = [];
  result.push(...restExploded.map((subpath) => subpath === "" ? required : [required, subpath].join("/")));
  if (isOptional) {
    result.push(...restExploded);
  }
  return result.map((exploded) => path.startsWith("/") && exploded === "" ? "/" : exploded);
}
function rankRouteBranches(branches) {
  branches.sort((a, b2) => a.score !== b2.score ? b2.score - a.score : compareIndexes(a.routesMeta.map((meta) => meta.childrenIndex), b2.routesMeta.map((meta) => meta.childrenIndex)));
}
const paramRe = /^:\w+$/;
const dynamicSegmentValue = 3;
const indexRouteValue = 2;
const emptySegmentValue = 1;
const staticSegmentValue = 10;
const splatPenalty = -2;
const isSplat = (s) => s === "*";
function computeScore(path, index2) {
  let segments = path.split("/");
  let initialScore = segments.length;
  if (segments.some(isSplat)) {
    initialScore += splatPenalty;
  }
  if (index2) {
    initialScore += indexRouteValue;
  }
  return segments.filter((s) => !isSplat(s)).reduce((score, segment) => score + (paramRe.test(segment) ? dynamicSegmentValue : segment === "" ? emptySegmentValue : staticSegmentValue), initialScore);
}
function compareIndexes(a, b2) {
  let siblings = a.length === b2.length && a.slice(0, -1).every((n2, i) => n2 === b2[i]);
  return siblings ? (
    // If two routes are siblings, we should try to match the earlier sibling
    // first. This allows people to have fine-grained control over the matching
    // behavior by simply putting routes with identical paths in the order they
    // want them tried.
    a[a.length - 1] - b2[b2.length - 1]
  ) : (
    // Otherwise, it doesn't really make sense to rank non-siblings by index,
    // so they sort equally.
    0
  );
}
function matchRouteBranch(branch, pathname) {
  let {
    routesMeta
  } = branch;
  let matchedParams = {};
  let matchedPathname = "/";
  let matches = [];
  for (let i = 0; i < routesMeta.length; ++i) {
    let meta = routesMeta[i];
    let end = i === routesMeta.length - 1;
    let remainingPathname = matchedPathname === "/" ? pathname : pathname.slice(matchedPathname.length) || "/";
    let match = matchPath({
      path: meta.relativePath,
      caseSensitive: meta.caseSensitive,
      end
    }, remainingPathname);
    if (!match)
      return null;
    Object.assign(matchedParams, match.params);
    let route = meta.route;
    matches.push({
      // TODO: Can this as be avoided?
      params: matchedParams,
      pathname: joinPaths([matchedPathname, match.pathname]),
      pathnameBase: normalizePathname(joinPaths([matchedPathname, match.pathnameBase])),
      route
    });
    if (match.pathnameBase !== "/") {
      matchedPathname = joinPaths([matchedPathname, match.pathnameBase]);
    }
  }
  return matches;
}
function matchPath(pattern, pathname) {
  if (typeof pattern === "string") {
    pattern = {
      path: pattern,
      caseSensitive: false,
      end: true
    };
  }
  let [matcher, paramNames] = compilePath(pattern.path, pattern.caseSensitive, pattern.end);
  let match = pathname.match(matcher);
  if (!match)
    return null;
  let matchedPathname = match[0];
  let pathnameBase = matchedPathname.replace(/(.)\/+$/, "$1");
  let captureGroups = match.slice(1);
  let params = paramNames.reduce((memo, paramName, index2) => {
    if (paramName === "*") {
      let splatValue = captureGroups[index2] || "";
      pathnameBase = matchedPathname.slice(0, matchedPathname.length - splatValue.length).replace(/(.)\/+$/, "$1");
    }
    memo[paramName] = safelyDecodeURIComponent(captureGroups[index2] || "", paramName);
    return memo;
  }, {});
  return {
    params,
    pathname: matchedPathname,
    pathnameBase,
    pattern
  };
}
function compilePath(path, caseSensitive, end) {
  if (caseSensitive === void 0) {
    caseSensitive = false;
  }
  if (end === void 0) {
    end = true;
  }
  warning(path === "*" || !path.endsWith("*") || path.endsWith("/*"), 'Route path "' + path + '" will be treated as if it were ' + ('"' + path.replace(/\*$/, "/*") + '" because the `*` character must ') + "always follow a `/` in the pattern. To get rid of this warning, " + ('please change the route path to "' + path.replace(/\*$/, "/*") + '".'));
  let paramNames = [];
  let regexpSource = "^" + path.replace(/\/*\*?$/, "").replace(/^\/*/, "/").replace(/[\\.*+^$?{}|()[\]]/g, "\\$&").replace(/\/:(\w+)/g, (_, paramName) => {
    paramNames.push(paramName);
    return "/([^\\/]+)";
  });
  if (path.endsWith("*")) {
    paramNames.push("*");
    regexpSource += path === "*" || path === "/*" ? "(.*)$" : "(?:\\/(.+)|\\/*)$";
  } else if (end) {
    regexpSource += "\\/*$";
  } else if (path !== "" && path !== "/") {
    regexpSource += "(?:(?=\\/|$))";
  } else
    ;
  let matcher = new RegExp(regexpSource, caseSensitive ? void 0 : "i");
  return [matcher, paramNames];
}
function safelyDecodeURI(value) {
  try {
    return decodeURI(value);
  } catch (error) {
    warning(false, 'The URL path "' + value + '" could not be decoded because it is is a malformed URL segment. This is probably due to a bad percent ' + ("encoding (" + error + ")."));
    return value;
  }
}
function safelyDecodeURIComponent(value, paramName) {
  try {
    return decodeURIComponent(value);
  } catch (error) {
    warning(false, 'The value for the URL param "' + paramName + '" will not be decoded because' + (' the string "' + value + '" is a malformed URL segment. This is probably') + (" due to a bad percent encoding (" + error + ")."));
    return value;
  }
}
function stripBasename(pathname, basename) {
  if (basename === "/")
    return pathname;
  if (!pathname.toLowerCase().startsWith(basename.toLowerCase())) {
    return null;
  }
  let startIndex = basename.endsWith("/") ? basename.length - 1 : basename.length;
  let nextChar = pathname.charAt(startIndex);
  if (nextChar && nextChar !== "/") {
    return null;
  }
  return pathname.slice(startIndex) || "/";
}
function resolvePath(to, fromPathname) {
  if (fromPathname === void 0) {
    fromPathname = "/";
  }
  let {
    pathname: toPathname,
    search = "",
    hash = ""
  } = typeof to === "string" ? parsePath(to) : to;
  let pathname = toPathname ? toPathname.startsWith("/") ? toPathname : resolvePathname(toPathname, fromPathname) : fromPathname;
  return {
    pathname,
    search: normalizeSearch(search),
    hash: normalizeHash(hash)
  };
}
function resolvePathname(relativePath, fromPathname) {
  let segments = fromPathname.replace(/\/+$/, "").split("/");
  let relativeSegments = relativePath.split("/");
  relativeSegments.forEach((segment) => {
    if (segment === "..") {
      if (segments.length > 1)
        segments.pop();
    } else if (segment !== ".") {
      segments.push(segment);
    }
  });
  return segments.length > 1 ? segments.join("/") : "/";
}
function getInvalidPathError(char, field, dest, path) {
  return "Cannot include a '" + char + "' character in a manually specified " + ("`to." + field + "` field [" + JSON.stringify(path) + "].  Please separate it out to the ") + ("`to." + dest + "` field. Alternatively you may provide the full path as ") + 'a string in <Link to="..."> and the router will parse it for you.';
}
function getPathContributingMatches(matches) {
  return matches.filter((match, index2) => index2 === 0 || match.route.path && match.route.path.length > 0);
}
function resolveTo(toArg, routePathnames, locationPathname, isPathRelative) {
  if (isPathRelative === void 0) {
    isPathRelative = false;
  }
  let to;
  if (typeof toArg === "string") {
    to = parsePath(toArg);
  } else {
    to = _extends$2({}, toArg);
    invariant(!to.pathname || !to.pathname.includes("?"), getInvalidPathError("?", "pathname", "search", to));
    invariant(!to.pathname || !to.pathname.includes("#"), getInvalidPathError("#", "pathname", "hash", to));
    invariant(!to.search || !to.search.includes("#"), getInvalidPathError("#", "search", "hash", to));
  }
  let isEmptyPath = toArg === "" || to.pathname === "";
  let toPathname = isEmptyPath ? "/" : to.pathname;
  let from;
  if (isPathRelative || toPathname == null) {
    from = locationPathname;
  } else {
    let routePathnameIndex = routePathnames.length - 1;
    if (toPathname.startsWith("..")) {
      let toSegments = toPathname.split("/");
      while (toSegments[0] === "..") {
        toSegments.shift();
        routePathnameIndex -= 1;
      }
      to.pathname = toSegments.join("/");
    }
    from = routePathnameIndex >= 0 ? routePathnames[routePathnameIndex] : "/";
  }
  let path = resolvePath(to, from);
  let hasExplicitTrailingSlash = toPathname && toPathname !== "/" && toPathname.endsWith("/");
  let hasCurrentTrailingSlash = (isEmptyPath || toPathname === ".") && locationPathname.endsWith("/");
  if (!path.pathname.endsWith("/") && (hasExplicitTrailingSlash || hasCurrentTrailingSlash)) {
    path.pathname += "/";
  }
  return path;
}
const joinPaths = (paths) => paths.join("/").replace(/\/\/+/g, "/");
const normalizePathname = (pathname) => pathname.replace(/\/+$/, "").replace(/^\/*/, "/");
const normalizeSearch = (search) => !search || search === "?" ? "" : search.startsWith("?") ? search : "?" + search;
const normalizeHash = (hash) => !hash || hash === "#" ? "" : hash.startsWith("#") ? hash : "#" + hash;
function isRouteErrorResponse(error) {
  return error != null && typeof error.status === "number" && typeof error.statusText === "string" && typeof error.internal === "boolean" && "data" in error;
}
const validMutationMethodsArr = ["post", "put", "patch", "delete"];
new Set(validMutationMethodsArr);
const validRequestMethodsArr = ["get", ...validMutationMethodsArr];
new Set(validRequestMethodsArr);
/**
 * React Router v6.14.2
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */
function _extends$1() {
  _extends$1 = Object.assign ? Object.assign.bind() : function(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  return _extends$1.apply(this, arguments);
}
const DataRouterContext = /* @__PURE__ */ reactExports.createContext(null);
const DataRouterStateContext = /* @__PURE__ */ reactExports.createContext(null);
const NavigationContext = /* @__PURE__ */ reactExports.createContext(null);
const LocationContext = /* @__PURE__ */ reactExports.createContext(null);
const RouteContext = /* @__PURE__ */ reactExports.createContext({
  outlet: null,
  matches: [],
  isDataRoute: false
});
const RouteErrorContext = /* @__PURE__ */ reactExports.createContext(null);
function useHref(to, _temp) {
  let {
    relative
  } = _temp === void 0 ? {} : _temp;
  !useInRouterContext() ? invariant(false) : void 0;
  let {
    basename,
    navigator: navigator2
  } = reactExports.useContext(NavigationContext);
  let {
    hash,
    pathname,
    search
  } = useResolvedPath(to, {
    relative
  });
  let joinedPathname = pathname;
  if (basename !== "/") {
    joinedPathname = pathname === "/" ? basename : joinPaths([basename, pathname]);
  }
  return navigator2.createHref({
    pathname: joinedPathname,
    search,
    hash
  });
}
function useInRouterContext() {
  return reactExports.useContext(LocationContext) != null;
}
function useLocation() {
  !useInRouterContext() ? invariant(false) : void 0;
  return reactExports.useContext(LocationContext).location;
}
function useIsomorphicLayoutEffect(cb2) {
  let isStatic = reactExports.useContext(NavigationContext).static;
  if (!isStatic) {
    reactExports.useLayoutEffect(cb2);
  }
}
function useNavigate() {
  let {
    isDataRoute
  } = reactExports.useContext(RouteContext);
  return isDataRoute ? useNavigateStable() : useNavigateUnstable();
}
function useNavigateUnstable() {
  !useInRouterContext() ? invariant(false) : void 0;
  let dataRouterContext = reactExports.useContext(DataRouterContext);
  let {
    basename,
    navigator: navigator2
  } = reactExports.useContext(NavigationContext);
  let {
    matches
  } = reactExports.useContext(RouteContext);
  let {
    pathname: locationPathname
  } = useLocation();
  let routePathnamesJson = JSON.stringify(getPathContributingMatches(matches).map((match) => match.pathnameBase));
  let activeRef = reactExports.useRef(false);
  useIsomorphicLayoutEffect(() => {
    activeRef.current = true;
  });
  let navigate = reactExports.useCallback(function(to, options) {
    if (options === void 0) {
      options = {};
    }
    if (!activeRef.current)
      return;
    if (typeof to === "number") {
      navigator2.go(to);
      return;
    }
    let path = resolveTo(to, JSON.parse(routePathnamesJson), locationPathname, options.relative === "path");
    if (dataRouterContext == null && basename !== "/") {
      path.pathname = path.pathname === "/" ? basename : joinPaths([basename, path.pathname]);
    }
    (!!options.replace ? navigator2.replace : navigator2.push)(path, options.state, options);
  }, [basename, navigator2, routePathnamesJson, locationPathname, dataRouterContext]);
  return navigate;
}
const OutletContext = /* @__PURE__ */ reactExports.createContext(null);
function useOutlet(context) {
  let outlet = reactExports.useContext(RouteContext).outlet;
  if (outlet) {
    return /* @__PURE__ */ reactExports.createElement(OutletContext.Provider, {
      value: context
    }, outlet);
  }
  return outlet;
}
function useParams() {
  let {
    matches
  } = reactExports.useContext(RouteContext);
  let routeMatch = matches[matches.length - 1];
  return routeMatch ? routeMatch.params : {};
}
function useResolvedPath(to, _temp2) {
  let {
    relative
  } = _temp2 === void 0 ? {} : _temp2;
  let {
    matches
  } = reactExports.useContext(RouteContext);
  let {
    pathname: locationPathname
  } = useLocation();
  let routePathnamesJson = JSON.stringify(getPathContributingMatches(matches).map((match) => match.pathnameBase));
  return reactExports.useMemo(() => resolveTo(to, JSON.parse(routePathnamesJson), locationPathname, relative === "path"), [to, routePathnamesJson, locationPathname, relative]);
}
function useRoutes(routes, locationArg) {
  return useRoutesImpl(routes, locationArg);
}
function useRoutesImpl(routes, locationArg, dataRouterState) {
  !useInRouterContext() ? invariant(false) : void 0;
  let {
    navigator: navigator2
  } = reactExports.useContext(NavigationContext);
  let {
    matches: parentMatches
  } = reactExports.useContext(RouteContext);
  let routeMatch = parentMatches[parentMatches.length - 1];
  let parentParams = routeMatch ? routeMatch.params : {};
  routeMatch ? routeMatch.pathname : "/";
  let parentPathnameBase = routeMatch ? routeMatch.pathnameBase : "/";
  routeMatch && routeMatch.route;
  let locationFromContext = useLocation();
  let location;
  if (locationArg) {
    var _parsedLocationArg$pa;
    let parsedLocationArg = typeof locationArg === "string" ? parsePath(locationArg) : locationArg;
    !(parentPathnameBase === "/" || ((_parsedLocationArg$pa = parsedLocationArg.pathname) == null ? void 0 : _parsedLocationArg$pa.startsWith(parentPathnameBase))) ? invariant(false) : void 0;
    location = parsedLocationArg;
  } else {
    location = locationFromContext;
  }
  let pathname = location.pathname || "/";
  let remainingPathname = parentPathnameBase === "/" ? pathname : pathname.slice(parentPathnameBase.length) || "/";
  let matches = matchRoutes(routes, {
    pathname: remainingPathname
  });
  let renderedMatches = _renderMatches(matches && matches.map((match) => Object.assign({}, match, {
    params: Object.assign({}, parentParams, match.params),
    pathname: joinPaths([
      parentPathnameBase,
      // Re-encode pathnames that were decoded inside matchRoutes
      navigator2.encodeLocation ? navigator2.encodeLocation(match.pathname).pathname : match.pathname
    ]),
    pathnameBase: match.pathnameBase === "/" ? parentPathnameBase : joinPaths([
      parentPathnameBase,
      // Re-encode pathnames that were decoded inside matchRoutes
      navigator2.encodeLocation ? navigator2.encodeLocation(match.pathnameBase).pathname : match.pathnameBase
    ])
  })), parentMatches, dataRouterState);
  if (locationArg && renderedMatches) {
    return /* @__PURE__ */ reactExports.createElement(LocationContext.Provider, {
      value: {
        location: _extends$1({
          pathname: "/",
          search: "",
          hash: "",
          state: null,
          key: "default"
        }, location),
        navigationType: Action.Pop
      }
    }, renderedMatches);
  }
  return renderedMatches;
}
function DefaultErrorComponent() {
  let error = useRouteError();
  let message = isRouteErrorResponse(error) ? error.status + " " + error.statusText : error instanceof Error ? error.message : JSON.stringify(error);
  let stack = error instanceof Error ? error.stack : null;
  let lightgrey = "rgba(200,200,200, 0.5)";
  let preStyles = {
    padding: "0.5rem",
    backgroundColor: lightgrey
  };
  let devInfo = null;
  return /* @__PURE__ */ reactExports.createElement(reactExports.Fragment, null, /* @__PURE__ */ reactExports.createElement("h2", null, "Unexpected Application Error!"), /* @__PURE__ */ reactExports.createElement("h3", {
    style: {
      fontStyle: "italic"
    }
  }, message), stack ? /* @__PURE__ */ reactExports.createElement("pre", {
    style: preStyles
  }, stack) : null, devInfo);
}
const defaultErrorElement = /* @__PURE__ */ reactExports.createElement(DefaultErrorComponent, null);
class RenderErrorBoundary extends reactExports.Component {
  constructor(props) {
    super(props);
    this.state = {
      location: props.location,
      revalidation: props.revalidation,
      error: props.error
    };
  }
  static getDerivedStateFromError(error) {
    return {
      error
    };
  }
  static getDerivedStateFromProps(props, state) {
    if (state.location !== props.location || state.revalidation !== "idle" && props.revalidation === "idle") {
      return {
        error: props.error,
        location: props.location,
        revalidation: props.revalidation
      };
    }
    return {
      error: props.error || state.error,
      location: state.location,
      revalidation: props.revalidation || state.revalidation
    };
  }
  componentDidCatch(error, errorInfo) {
    console.error("React Router caught the following error during render", error, errorInfo);
  }
  render() {
    return this.state.error ? /* @__PURE__ */ reactExports.createElement(RouteContext.Provider, {
      value: this.props.routeContext
    }, /* @__PURE__ */ reactExports.createElement(RouteErrorContext.Provider, {
      value: this.state.error,
      children: this.props.component
    })) : this.props.children;
  }
}
function RenderedRoute(_ref) {
  let {
    routeContext,
    match,
    children
  } = _ref;
  let dataRouterContext = reactExports.useContext(DataRouterContext);
  if (dataRouterContext && dataRouterContext.static && dataRouterContext.staticContext && (match.route.errorElement || match.route.ErrorBoundary)) {
    dataRouterContext.staticContext._deepestRenderedBoundaryId = match.route.id;
  }
  return /* @__PURE__ */ reactExports.createElement(RouteContext.Provider, {
    value: routeContext
  }, children);
}
function _renderMatches(matches, parentMatches, dataRouterState) {
  var _dataRouterState2;
  if (parentMatches === void 0) {
    parentMatches = [];
  }
  if (dataRouterState === void 0) {
    dataRouterState = null;
  }
  if (matches == null) {
    var _dataRouterState;
    if ((_dataRouterState = dataRouterState) != null && _dataRouterState.errors) {
      matches = dataRouterState.matches;
    } else {
      return null;
    }
  }
  let renderedMatches = matches;
  let errors = (_dataRouterState2 = dataRouterState) == null ? void 0 : _dataRouterState2.errors;
  if (errors != null) {
    let errorIndex = renderedMatches.findIndex((m2) => m2.route.id && (errors == null ? void 0 : errors[m2.route.id]));
    !(errorIndex >= 0) ? invariant(false) : void 0;
    renderedMatches = renderedMatches.slice(0, Math.min(renderedMatches.length, errorIndex + 1));
  }
  return renderedMatches.reduceRight((outlet, match, index2) => {
    let error = match.route.id ? errors == null ? void 0 : errors[match.route.id] : null;
    let errorElement = null;
    if (dataRouterState) {
      errorElement = match.route.errorElement || defaultErrorElement;
    }
    let matches2 = parentMatches.concat(renderedMatches.slice(0, index2 + 1));
    let getChildren = () => {
      let children;
      if (error) {
        children = errorElement;
      } else if (match.route.Component) {
        children = /* @__PURE__ */ reactExports.createElement(match.route.Component, null);
      } else if (match.route.element) {
        children = match.route.element;
      } else {
        children = outlet;
      }
      return /* @__PURE__ */ reactExports.createElement(RenderedRoute, {
        match,
        routeContext: {
          outlet,
          matches: matches2,
          isDataRoute: dataRouterState != null
        },
        children
      });
    };
    return dataRouterState && (match.route.ErrorBoundary || match.route.errorElement || index2 === 0) ? /* @__PURE__ */ reactExports.createElement(RenderErrorBoundary, {
      location: dataRouterState.location,
      revalidation: dataRouterState.revalidation,
      component: errorElement,
      error,
      children: getChildren(),
      routeContext: {
        outlet: null,
        matches: matches2,
        isDataRoute: true
      }
    }) : getChildren();
  }, null);
}
var DataRouterHook$1;
(function(DataRouterHook2) {
  DataRouterHook2["UseBlocker"] = "useBlocker";
  DataRouterHook2["UseRevalidator"] = "useRevalidator";
  DataRouterHook2["UseNavigateStable"] = "useNavigate";
})(DataRouterHook$1 || (DataRouterHook$1 = {}));
var DataRouterStateHook$1;
(function(DataRouterStateHook2) {
  DataRouterStateHook2["UseBlocker"] = "useBlocker";
  DataRouterStateHook2["UseLoaderData"] = "useLoaderData";
  DataRouterStateHook2["UseActionData"] = "useActionData";
  DataRouterStateHook2["UseRouteError"] = "useRouteError";
  DataRouterStateHook2["UseNavigation"] = "useNavigation";
  DataRouterStateHook2["UseRouteLoaderData"] = "useRouteLoaderData";
  DataRouterStateHook2["UseMatches"] = "useMatches";
  DataRouterStateHook2["UseRevalidator"] = "useRevalidator";
  DataRouterStateHook2["UseNavigateStable"] = "useNavigate";
  DataRouterStateHook2["UseRouteId"] = "useRouteId";
})(DataRouterStateHook$1 || (DataRouterStateHook$1 = {}));
function useDataRouterContext(hookName) {
  let ctx = reactExports.useContext(DataRouterContext);
  !ctx ? invariant(false) : void 0;
  return ctx;
}
function useDataRouterState(hookName) {
  let state = reactExports.useContext(DataRouterStateContext);
  !state ? invariant(false) : void 0;
  return state;
}
function useRouteContext(hookName) {
  let route = reactExports.useContext(RouteContext);
  !route ? invariant(false) : void 0;
  return route;
}
function useCurrentRouteId(hookName) {
  let route = useRouteContext();
  let thisRoute = route.matches[route.matches.length - 1];
  !thisRoute.route.id ? invariant(false) : void 0;
  return thisRoute.route.id;
}
function useRouteError() {
  var _state$errors;
  let error = reactExports.useContext(RouteErrorContext);
  let state = useDataRouterState(DataRouterStateHook$1.UseRouteError);
  let routeId = useCurrentRouteId(DataRouterStateHook$1.UseRouteError);
  if (error) {
    return error;
  }
  return (_state$errors = state.errors) == null ? void 0 : _state$errors[routeId];
}
function useNavigateStable() {
  let {
    router
  } = useDataRouterContext(DataRouterHook$1.UseNavigateStable);
  let id2 = useCurrentRouteId(DataRouterStateHook$1.UseNavigateStable);
  let activeRef = reactExports.useRef(false);
  useIsomorphicLayoutEffect(() => {
    activeRef.current = true;
  });
  let navigate = reactExports.useCallback(function(to, options) {
    if (options === void 0) {
      options = {};
    }
    if (!activeRef.current)
      return;
    if (typeof to === "number") {
      router.navigate(to);
    } else {
      router.navigate(to, _extends$1({
        fromRouteId: id2
      }, options));
    }
  }, [router, id2]);
  return navigate;
}
function Navigate(_ref4) {
  let {
    to,
    replace,
    state,
    relative
  } = _ref4;
  !useInRouterContext() ? invariant(false) : void 0;
  let {
    matches
  } = reactExports.useContext(RouteContext);
  let {
    pathname: locationPathname
  } = useLocation();
  let navigate = useNavigate();
  let path = resolveTo(to, getPathContributingMatches(matches).map((match) => match.pathnameBase), locationPathname, relative === "path");
  let jsonPath = JSON.stringify(path);
  reactExports.useEffect(() => navigate(JSON.parse(jsonPath), {
    replace,
    state,
    relative
  }), [navigate, jsonPath, relative, replace, state]);
  return null;
}
function Outlet(props) {
  return useOutlet(props.context);
}
function Route(_props) {
  invariant(false);
}
function Router(_ref5) {
  let {
    basename: basenameProp = "/",
    children = null,
    location: locationProp,
    navigationType = Action.Pop,
    navigator: navigator2,
    static: staticProp = false
  } = _ref5;
  !!useInRouterContext() ? invariant(false) : void 0;
  let basename = basenameProp.replace(/^\/*/, "/");
  let navigationContext = reactExports.useMemo(() => ({
    basename,
    navigator: navigator2,
    static: staticProp
  }), [basename, navigator2, staticProp]);
  if (typeof locationProp === "string") {
    locationProp = parsePath(locationProp);
  }
  let {
    pathname = "/",
    search = "",
    hash = "",
    state = null,
    key = "default"
  } = locationProp;
  let locationContext = reactExports.useMemo(() => {
    let trailingPathname = stripBasename(pathname, basename);
    if (trailingPathname == null) {
      return null;
    }
    return {
      location: {
        pathname: trailingPathname,
        search,
        hash,
        state,
        key
      },
      navigationType
    };
  }, [basename, pathname, search, hash, state, key, navigationType]);
  if (locationContext == null) {
    return null;
  }
  return /* @__PURE__ */ reactExports.createElement(NavigationContext.Provider, {
    value: navigationContext
  }, /* @__PURE__ */ reactExports.createElement(LocationContext.Provider, {
    children,
    value: locationContext
  }));
}
function Routes(_ref6) {
  let {
    children,
    location
  } = _ref6;
  return useRoutes(createRoutesFromChildren(children), location);
}
var AwaitRenderStatus;
(function(AwaitRenderStatus2) {
  AwaitRenderStatus2[AwaitRenderStatus2["pending"] = 0] = "pending";
  AwaitRenderStatus2[AwaitRenderStatus2["success"] = 1] = "success";
  AwaitRenderStatus2[AwaitRenderStatus2["error"] = 2] = "error";
})(AwaitRenderStatus || (AwaitRenderStatus = {}));
new Promise(() => {
});
function createRoutesFromChildren(children, parentPath) {
  if (parentPath === void 0) {
    parentPath = [];
  }
  let routes = [];
  reactExports.Children.forEach(children, (element, index2) => {
    if (!/* @__PURE__ */ reactExports.isValidElement(element)) {
      return;
    }
    let treePath = [...parentPath, index2];
    if (element.type === reactExports.Fragment) {
      routes.push.apply(routes, createRoutesFromChildren(element.props.children, treePath));
      return;
    }
    !(element.type === Route) ? invariant(false) : void 0;
    !(!element.props.index || !element.props.children) ? invariant(false) : void 0;
    let route = {
      id: element.props.id || treePath.join("-"),
      caseSensitive: element.props.caseSensitive,
      element: element.props.element,
      Component: element.props.Component,
      index: element.props.index,
      path: element.props.path,
      loader: element.props.loader,
      action: element.props.action,
      errorElement: element.props.errorElement,
      ErrorBoundary: element.props.ErrorBoundary,
      hasErrorBoundary: element.props.ErrorBoundary != null || element.props.errorElement != null,
      shouldRevalidate: element.props.shouldRevalidate,
      handle: element.props.handle,
      lazy: element.props.lazy
    };
    if (element.props.children) {
      route.children = createRoutesFromChildren(element.props.children, treePath);
    }
    routes.push(route);
  });
  return routes;
}
/**
 * React Router DOM v6.14.2
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */
function _extends() {
  _extends = Object.assign ? Object.assign.bind() : function(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  return _extends.apply(this, arguments);
}
function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null)
    return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;
  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0)
      continue;
    target[key] = source[key];
  }
  return target;
}
function isModifiedEvent(event) {
  return !!(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey);
}
function shouldProcessLinkClick(event, target) {
  return event.button === 0 && // Ignore everything but left clicks
  (!target || target === "_self") && // Let browser handle "target=_blank" etc.
  !isModifiedEvent(event);
}
const _excluded = ["onClick", "relative", "reloadDocument", "replace", "state", "target", "to", "preventScrollReset"];
const START_TRANSITION = "startTransition";
const startTransitionImpl = React[START_TRANSITION];
function BrowserRouter(_ref) {
  let {
    basename,
    children,
    future,
    window: window2
  } = _ref;
  let historyRef = reactExports.useRef();
  if (historyRef.current == null) {
    historyRef.current = createBrowserHistory({
      window: window2,
      v5Compat: true
    });
  }
  let history = historyRef.current;
  let [state, setStateImpl] = reactExports.useState({
    action: history.action,
    location: history.location
  });
  let {
    v7_startTransition
  } = future || {};
  let setState = reactExports.useCallback((newState) => {
    v7_startTransition && startTransitionImpl ? startTransitionImpl(() => setStateImpl(newState)) : setStateImpl(newState);
  }, [setStateImpl, v7_startTransition]);
  reactExports.useLayoutEffect(() => history.listen(setState), [history, setState]);
  return /* @__PURE__ */ reactExports.createElement(Router, {
    basename,
    children,
    location: state.location,
    navigationType: state.action,
    navigator: history
  });
}
const isBrowser = typeof window !== "undefined" && typeof window.document !== "undefined" && typeof window.document.createElement !== "undefined";
const ABSOLUTE_URL_REGEX = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i;
const Link = /* @__PURE__ */ reactExports.forwardRef(function LinkWithRef(_ref4, ref) {
  let {
    onClick,
    relative,
    reloadDocument,
    replace,
    state,
    target,
    to,
    preventScrollReset
  } = _ref4, rest = _objectWithoutPropertiesLoose(_ref4, _excluded);
  let {
    basename
  } = reactExports.useContext(NavigationContext);
  let absoluteHref;
  let isExternal = false;
  if (typeof to === "string" && ABSOLUTE_URL_REGEX.test(to)) {
    absoluteHref = to;
    if (isBrowser) {
      try {
        let currentUrl = new URL(window.location.href);
        let targetUrl = to.startsWith("//") ? new URL(currentUrl.protocol + to) : new URL(to);
        let path = stripBasename(targetUrl.pathname, basename);
        if (targetUrl.origin === currentUrl.origin && path != null) {
          to = path + targetUrl.search + targetUrl.hash;
        } else {
          isExternal = true;
        }
      } catch (e2) {
      }
    }
  }
  let href = useHref(to, {
    relative
  });
  let internalOnClick = useLinkClickHandler(to, {
    replace,
    state,
    target,
    preventScrollReset,
    relative
  });
  function handleClick(event) {
    if (onClick)
      onClick(event);
    if (!event.defaultPrevented) {
      internalOnClick(event);
    }
  }
  return (
    // eslint-disable-next-line jsx-a11y/anchor-has-content
    /* @__PURE__ */ reactExports.createElement("a", _extends({}, rest, {
      href: absoluteHref || href,
      onClick: isExternal || reloadDocument ? onClick : handleClick,
      ref,
      target
    }))
  );
});
var DataRouterHook;
(function(DataRouterHook2) {
  DataRouterHook2["UseScrollRestoration"] = "useScrollRestoration";
  DataRouterHook2["UseSubmit"] = "useSubmit";
  DataRouterHook2["UseSubmitFetcher"] = "useSubmitFetcher";
  DataRouterHook2["UseFetcher"] = "useFetcher";
})(DataRouterHook || (DataRouterHook = {}));
var DataRouterStateHook;
(function(DataRouterStateHook2) {
  DataRouterStateHook2["UseFetchers"] = "useFetchers";
  DataRouterStateHook2["UseScrollRestoration"] = "useScrollRestoration";
})(DataRouterStateHook || (DataRouterStateHook = {}));
function useLinkClickHandler(to, _temp) {
  let {
    target,
    replace: replaceProp,
    state,
    preventScrollReset,
    relative
  } = _temp === void 0 ? {} : _temp;
  let navigate = useNavigate();
  let location = useLocation();
  let path = useResolvedPath(to, {
    relative
  });
  return reactExports.useCallback((event) => {
    if (shouldProcessLinkClick(event, target)) {
      event.preventDefault();
      let replace = replaceProp !== void 0 ? replaceProp : createPath(location) === createPath(path);
      navigate(to, {
        replace,
        state,
        preventScrollReset,
        relative
      });
    }
  }, [location, navigate, path, replaceProp, state, target, to, preventScrollReset, relative]);
}
const useScreen = () => {
  const getScreen = () => window.innerWidth <= 1024;
  const [isMobile, setMobile] = reactExports.useState(getScreen);
  reactExports.useEffect(() => {
    const onResize = () => {
      setMobile(getScreen());
    };
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
    };
  }, []);
  return { isMobile };
};
const removeIndex = (object, keys) => {
  const filtered = Object.keys(object).filter((key) => {
    const item = object[key];
    for (index in keys) {
      if (key !== keys[index]) {
        return item;
      }
    }
  }).reduce((filter2, key) => {
    filter2[key] = object[key];
    return filter2;
  }, {});
  return filtered;
};
const mapObject = (object) => {
  let stocks = [];
  if (object.hasOwnProperty("stock")) {
    for (let i = 0; i < object["stock"].length; i++) {
      stocks.push({
        name: object["stock"][i]["name"],
        change: object["stock"][i]["percent_change"],
        price: object["stock"][i]["price"]["amount"],
        symbol: object["stock"][i]["symbol"],
        volume: object["stock"][i]["volume"]
      });
    }
  }
  return stocks;
};
const chunkObject = ({ divide, data }) => {
  const converted = Object.values(data);
  const chunks = Array.from(
    { length: Math.ceil(converted.length / divide) },
    (_, index2) => converted.slice(index2 * divide, (index2 + 1) * divide)
  );
  const pages = Array(chunks.length).fill(null);
  return { chunks, pages };
};
const resendEmail = (token) => async (dispatch) => {
  try {
    const { data } = await axios$2({
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      method: "POST",
      url: "/api/resend",
      params: { token }
    });
    dispatch({ type: MESSAGE_SHOW_SUCCESS, payload: data.message });
  } catch (error) {
    dispatch({
      type: MESSAGE_SHOW_FAILURE,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message
    });
  }
};
const resetPassword = (token, email, password) => async (dispatch) => {
  try {
    dispatch({ type: USER_RESET_REQUEST });
    const { data } = await axios$2({
      headers: {
        "Content-Type": "application/json"
      },
      method: "POST",
      url: "/api/reset",
      params: { token, email, password }
    });
    const result = removeIndex(data, ["message"]);
    dispatch({ type: USER_LOGIN_SUCCESS, payload: result });
    dispatch({ type: MESSAGE_SHOW_SUCCESS, payload: data.message });
    if (result) {
      localStorage.setItem("account", JSON.stringify(result));
    }
  } catch (error) {
    dispatch({
      type: USER_RESET_FAILURE,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message
    });
    dispatch({
      type: MESSAGE_SHOW_FAILURE,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message
    });
  }
};
const forgotPassword = (email) => async (dispatch) => {
  try {
    dispatch({ type: USER_FORGOT_REQUEST });
    const { data } = await axios$2({
      headers: {
        "Content-Type": "application/json"
      },
      method: "POST",
      url: "/api/reset",
      params: { email }
    });
    dispatch({ type: USER_FORGOT_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: USER_FORGOT_FAILURE,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message
    });
    dispatch({
      type: MESSAGE_SHOW_FAILURE,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message
    });
  }
};
const verifyEmail = (token) => async (dispatch) => {
  try {
    dispatch({ type: USER_VERIFY_REQUEST });
    const { data } = await axios$2({
      headers: {
        "Content-Type": "application/json"
      },
      method: "POST",
      url: "/api/verify",
      params: { token }
    });
    dispatch({ type: USER_VERIFY_SUCCESS, payload: data.message });
  } catch (error) {
    dispatch({
      type: USER_VERIFY_FAILURE,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message
    });
    dispatch({
      type: MESSAGE_SHOW_FAILURE,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message
    });
  }
};
const registerUser = (username, firstname, lastname, email, password) => async (dispatch) => {
  try {
    dispatch({ type: USER_REGISTER_REQUEST });
    const { data } = await axios$2({
      headers: {
        "Content-Type": "application/json"
      },
      method: "POST",
      url: "/api/register",
      params: { username, firstname, lastname, email, password }
    });
    const result = removeIndex(data, ["message"]);
    dispatch({ type: USER_LOGIN_SUCCESS, payload: result });
    dispatch({ type: MESSAGE_SHOW_SUCCESS, payload: data.message });
    if (result) {
      localStorage.setItem("account", JSON.stringify(result));
    }
  } catch (error) {
    dispatch({
      type: USER_REGISTER_FAILURE,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message
    });
    dispatch({
      type: MESSAGE_SHOW_FAILURE,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message
    });
  }
};
const loginUser = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: USER_LOGIN_REQUEST });
    const { data } = await axios$2({
      headers: {
        "Content-Type": "application/json"
      },
      method: "POST",
      url: "/api/login",
      params: { email, password }
    });
    const result = removeIndex(data, ["message"]);
    dispatch({ type: USER_LOGIN_SUCCESS, payload: result });
    dispatch({ type: MESSAGE_SHOW_SUCCESS, payload: data.message });
    if (result) {
      localStorage.setItem("account", JSON.stringify(result));
    }
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAILURE,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message
    });
    dispatch({
      type: MESSAGE_SHOW_FAILURE,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message
    });
  }
};
const logoutUser = (token) => async (dispatch) => {
  try {
    const { data } = await axios$2({
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      method: "POST",
      url: "/api/logout",
      params: { token }
    });
    dispatch({ type: USER_LOGIN_LOGOUT, payload: data });
    dispatch({ type: MESSAGE_SHOW_SUCCESS, payload: data.message });
    if (data) {
      localStorage.removeItem("account");
      localStorage.removeItem("token");
      localStorage.removeItem("dashboardBluechip");
      localStorage.removeItem("dashboardEdge");
      localStorage.removeItem("dashboardStockGainer");
      localStorage.removeItem("dashboardStockLosser");
      localStorage.removeItem("watchlistBuild");
      localStorage.removeItem("watchlistFetch");
      localStorage.removeItem("tradeBluechip");
      localStorage.removeItem("tradeCommon");
      localStorage.removeItem("chartWatchlist");
    }
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAILURE,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message
    });
    dispatch({
      type: MESSAGE_SHOW_FAILURE,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message
    });
  }
};
const tokenUser = (token) => async (dispatch) => {
  try {
    dispatch({ type: USER_TOKEN_REQUEST });
    const { data } = await axios$2({
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      method: "GET",
      url: "/api/dashboard",
      params: { section: "sentinel" }
    });
    dispatch({ type: USER_TOKEN_SUCCESS, payload: data.valid });
    if (data) {
      localStorage.setItem("token", JSON.stringify(data));
    }
  } catch (error) {
    dispatch({ type: USER_LOGIN_CLEAR });
    localStorage.removeItem("account");
    localStorage.removeItem("token");
    localStorage.removeItem("dashboardBluechip");
    localStorage.removeItem("dashboardEdge");
    localStorage.removeItem("dashboardStockGainer");
    localStorage.removeItem("dashboardStockLosser");
    localStorage.removeItem("watchlistBuild");
    localStorage.removeItem("watchlistFetch");
    localStorage.removeItem("tradeBluechip");
    localStorage.removeItem("tradeCommon");
    localStorage.removeItem("chartWatchlist");
    dispatch({
      type: USER_TOKEN_FAILURE,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message
    });
    dispatch({
      type: MESSAGE_SHOW_FAILURE,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message
    });
  }
};
const Icon = ({ id: id2, width, height }) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "svg",
    {
      className: `${width ? width : "w-6"} ${height ? height : "h-6"} inline fill-current`,
      children: /* @__PURE__ */ jsxRuntimeExports.jsx("use", { href: `/public/icons/sprite.svg#${id2}` })
    }
  );
};
const Header = () => {
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { access_token } = userLogin;
  const userToken = useSelector((state) => state.userToken);
  const { valid } = userToken;
  const { isMobile } = useScreen();
  const [isBurger, setIsBurger] = reactExports.useState(false);
  const [isControl, setIsControl] = reactExports.useState(false);
  reactExports.useState(null);
  const burgerHandler = () => {
    setIsBurger(!isBurger);
    setIsControl(false);
  };
  const controlHandler = () => {
    setIsControl(!isControl);
    setIsBurger(false);
  };
  const logoutHandler = () => {
    if (access_token) {
      dispatch(logoutUser(access_token));
    }
  };
  reactExports.useEffect(() => {
    if (valid && !access_token) {
      dispatch(tokenUser(access_token));
    }
  }, [access_token]);
  const burgerClasses = isBurger ? "hamburger hamburger-elastic is-active" : "hamburger hamburger-elastic";
  const controlTemplate = /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "nav",
    {
      className: "flex flex-col flex-grow font-size shadow gradient-blue-purple text-slate-50 absolute w-full top-14 right-0 z-50",
      onClick: controlHandler,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "py-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { className: "px-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { children: "Stock" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { className: "px-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/dashboard/stock-portfolio", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "block border-bottom", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { id: "portfolio" }),
            " Portfolio"
          ] }) }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { className: "px-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/dashboard/stock-watchlist", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "block border-bottom", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { id: "watchlist" }),
            " Watchlist"
          ] }) }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { className: "px-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/dashboard/stock-trade", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "block border-bottom", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { id: "trade" }),
            " Trade"
          ] }) }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { className: "px-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/dashboard/stock-chart", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "block border-bottom", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { id: "chart" }),
            " Chart"
          ] }) }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "py-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { className: "px-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { children: "Crypto" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { className: "px-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/dashboard/crypto-portfolio", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "block border-bottom", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { id: "portfolio" }),
            " Portfolio"
          ] }) }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { className: "px-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/dashboard/crypto-screen", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "block border-bottom", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { id: "screen" }),
            " Screen"
          ] }) }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { className: "px-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/dashboard/crypto-moon", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "block border-bottom", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { id: "fund" }),
            " Moon"
          ] }) }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { className: "px-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/dashboard/crypto-game", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "block border-bottom", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { id: "game" }),
            " Game"
          ] }) }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { className: "px-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/dashboard/crypto-nft", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "block border-bottom", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { id: "nft" }),
            " NFT"
          ] }) }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "py-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { className: "px-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { children: "Extra" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { className: "px-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/dashboard/extra-note", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "block pt-2 pl-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { id: "note" }),
            " Note"
          ] }) }) })
        ] })
      ]
    }
  );
  return /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: isMobile ? /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "flex justify-between h-14 font-size gradient-blue-purple border-bottom text-slate-50 relative", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "block uppercase", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { id: "logo" }),
      " Orion"
    ] }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "hover:text-slate-300", children: valid && /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: controlHandler, type: "button", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "p-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { id: "control", width: "w-9", height: "h-9" }) }) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "hover:text-slate-300", children: /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: burgerClasses, onClick: burgerHandler, type: "button", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "hamburger-box", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "hamburger-inner" }) }) }) })
    ] }),
    isBurger && /* @__PURE__ */ jsxRuntimeExports.jsx(
      "nav",
      {
        className: "flex flex-col flex-grow shadow gradient-blue-purple text-slate-50 absolute w-full top-14 right-0 z-50",
        onClick: burgerHandler,
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "py-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { className: "px-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/stock-explorer", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "block border-bottom", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { id: "stock" }),
            " Stock Explorer"
          ] }) }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { className: "px-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/crypto-explorer", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "block border-bottom", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { id: "crypto" }),
            " Crypto Explorer"
          ] }) }) }),
          valid ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("li", { className: "px-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/dashboard", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "block border-bottom", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { id: "menu" }),
              " Dashboard"
            ] }) }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("li", { className: "px-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/profile", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "block border-bottom", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { id: "profile" }),
              " Profile"
            ] }) }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("li", { className: "px-2", onClick: logoutHandler, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "block pt-2 pl-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { id: "logout" }),
              " Logout"
            ] }) }) })
          ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("li", { className: "px-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/auth/login", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "block border-bottom", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { id: "login" }),
              " Login"
            ] }) }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("li", { className: "px-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/auth/register", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "block pt-2 pl-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { id: "register" }),
              " Register"
            ] }) }) })
          ] })
        ] })
      }
    ),
    isControl && controlTemplate
  ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "flex justify-between h-14 font-size gradient-blue-purple border-bottom text-slate-50 relative", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-2 md:text-xs", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/stock-explorer", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "hover:text-slate-300", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { id: "stock" }),
        " Stock Explorer"
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/crypto-explorer", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "ml-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { id: "crypto" }),
        " Crypto Explorer"
      ] }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-2 sm:text-xs md:text-base lg:text-base", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "uppercase text-yellow-500 hover:text-slate-200", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { id: "logo" }),
      " Orion Trade"
    ] }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-2", children: valid ? /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "grid grid-cols-4 auto-rows-min", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("li", { className: "md:text-xs", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "#", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "hover:text-slate-300", onClick: controlHandler, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { id: "control" }),
        " Control Panel"
      ] }) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("li", { className: "md:text-xs", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/dashboard", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "ml-6 hover:text-slate-300", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { id: "menu" }),
        "Dashboard"
      ] }) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("li", { className: "md:text-xs", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/profile", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "ml-6 hover:text-slate-300", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { id: "profile" }),
        " Profile"
      ] }) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("li", { className: "md:text-xs", onClick: logoutHandler, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "ml-6 hover:text-slate-300", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { id: "logout" }),
        " Logout"
      ] }) }) })
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "grid grid-cols-2 justify-end auto-rows-min", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("li", { className: "md:text-xs", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/auth/login", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "hover:text-slate-300", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { id: "login" }),
        " Login"
      ] }) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("li", { className: "md:text-xs", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/auth/register", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "ml-6 hover:text-slate-300", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { id: "register" }),
        " Register"
      ] }) }) })
    ] }) }),
    isControl && controlTemplate
  ] }) });
};
const Footer = () => {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("footer", { className: "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 auto-rows-min gradient-blue-purple font-size text-slate-50", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-2 mb-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "border-bottom pb-2 uppercase text-slate-100 hover:text-stone-200", children: "About" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "p-2", children: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-2 mb-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "border-bottom pb-2 uppercase text-slate-100 hover:text-stone-200", children: "Resources" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("li", { className: "border-bottom cursor-pointer hover:text-stone-200 hover:bg-stone-200 hover:bg-opacity-50", children: /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "#", children: "Home" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("li", { className: "border-bottom cursor-pointer hover:text-stone-200 hover:bg-stone-200 hover:bg-opacity-50", children: /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "#", children: "Stock Explorer" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("li", { className: "border-bottom cursor-pointer hover:text-stone-200 hover:bg-stone-200 hover:bg-opacity-50", children: /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "#", children: "Crypto Explorer" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("li", { className: "border-bottom cursor-pointer hover:text-stone-200 hover:bg-stone-200 hover:bg-opacity-50", children: /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "#", children: "Frequently Ask Questions" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("li", { className: "border-bottom cursor-pointer hover:text-stone-200 hover:bg-stone-200 hover:bg-opacity-50", children: /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "#", children: "Privacy Policy" }) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-2 mb-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "border-bottom pb-2 uppercase text-slate-100 hover:text-stone-200", children: "Socials" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("li", { className: "border-bottom cursor-pointer hover:text-stone-200 hover:bg-stone-200 hover:bg-opacity-50", children: /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "#", children: "Email" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("li", { className: "border-bottom cursor-pointer hover:text-stone-200 hover:bg-stone-300 hover:bg-opacity-50", children: /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "#", children: "Facebook" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("li", { className: "border-bottom cursor-pointer hover:text-stone-200 hover:bg-stone-300 hover:bg-opacity-50", children: /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "#", children: "Twitter" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("li", { className: "border-bottom cursor-pointer hover:text-stone-200 hover:bg-stone-300 hover:bg-opacity-50", children: /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "#", children: "Instagram" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("li", { className: "border-bottom cursor-pointer hover:text-stone-200 hover:bg-stone-300 hover:bg-opacity-50", children: /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "#", children: "Tiktok" }) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-2 mb-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "border-bottom pb-2 uppercase text-slate-100 hover:text-stone-200", children: "Contact" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "p-2", children: "Hire Me!" })
    ] })
  ] });
};
const Single = () => {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Header, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-screen", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Outlet, {}) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Footer, {})
  ] });
};
const Loader = () => {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full h-screen flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "alert-spinner", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", {})
  ] }) });
};
const Message = ({ variant, children }) => {
  const [message, setMessage] = reactExports.useState(true);
  const messageHandler = () => {
    setMessage(!message);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: message && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-size m-2 cursor-pointer hover:animate-pulse z-50", onClick: messageHandler, children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: variant ? variant : "alert-danger", children }) }) });
};
const Home = () => {
  const userLogin = useSelector((state) => state.userLogin);
  const { loading } = userLogin;
  const showMessage = useSelector((state) => state.showMessage);
  const { message } = showMessage;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: loading ? /* @__PURE__ */ jsxRuntimeExports.jsx(Loader, {}) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    message && /* @__PURE__ */ jsxRuntimeExports.jsx(Message, { variant: "alert-success", children: message }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "w-full h-fit sm:h-64 md:h-96 grid auto-rows-min content-center bg-stone-200 border-one bg-opacity-40 hover:bg-stone-300 hover:bg-opacity-40 mb-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-4 pt-6 uppercase text-purple-500 font-bold md:font-extrabold text-sm text-center sm:text-xl md:text-2xl", children: "At little cost, you can accomplish more." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-4 text-blue-500 text-sm font-thin sm:font-light text-center sm:text-md md:text-xl", children: "We help your money go further with no yearly fees and some of the most affordable prices in the sector." }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 grid auto-rows-min sm:grid-cols-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", className: "font-size btn btn-indigo", children: "Get Started" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", className: "font-size btn btn-green", children: "Learn More" }) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mb-2 grid auto-rows-min bg-stone-100 bg-opacity-70 border-b border-slate-50", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-2 mb-2 uppercase text-stone-700 bg-stone-200 bg-opacity-75", children: /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { children: "Why Orion Trade?" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-2 grid auto-rows-min gap-2 sm:grid-cols-2 md:grid-cols-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card-rounded", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "hover:grayscale", children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { className: "object-cover w-full rounded-t", src: "/public/images/tools.jpeg", alt: "Innovative Tools" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-2 font-size", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { id: "tool" }),
            " Innovative Tools"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-4 font-size bg-rose-800 bg-opacity-30 rounded-b", children: "Eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card-rounded", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "hover:grayscale", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            "img",
            {
              className: "object-cover w-full rounded-t",
              src: "/public/images/price.jpeg",
              alt: "Transparent Pricing"
            }
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-2 font-size", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { id: "price" }),
            " Transparent Pricing"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-4 font-size bg-green-800 bg-opacity-30 rounded-b", children: "Eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card-rounded", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "hover:grayscale", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            "img",
            {
              className: "object-cover w-full rounded-t",
              src: "/public/images/support.jpeg",
              alt: "Dedicated Support"
            }
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-2 font-size", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { id: "support" }),
            " Dedicated Support"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-4 font-size bg-purple-800 bg-opacity-30 rounded-b", children: "Eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo." })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "grid auto-rows-min bg-zinc-200 bg-opacity-50 border-b border-neutral-100", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-2 mb-2 uppercase text-right text-green-700 bg-green-200 bg-opacity-75", children: "Our Stories" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-2 grid auto-rows-min gap-2 sm:grid-cols-2 md:grid-cols-3 border-three bg-stone-200 bg-opacity-40 hover:bg-stone-300 hover:bg-opacity-40", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card flex bg-slate-50 flex-col", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "hover:graycale", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            "img",
            {
              className: "w-400 h-200 object-cover w-full",
              src: "/public/images/bitcoin.jpg",
              alt: "Placeholder Image"
            }
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-2 flex-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "pb-2", children: "Story Title" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-size", children: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-2 text-center sm:text-right", children: /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "btn btn-orange-outline", children: "Read More" }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card flex bg-slate-50 flex-col", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "hover:graycale", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            "img",
            {
              className: "w-400 h-200 object-cover w-full",
              src: "/public/images/boat.jpg",
              alt: "Placeholder Image"
            }
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-2 flex-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "pb-2", children: "Story Title" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-size", children: "Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-2 text-center sm:text-right", children: /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "btn btn-orange-outline", children: "Read More" }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card flex bg-slate-50 flex-col", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "hover:graycale", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            "img",
            {
              className: "w-400 h-200 object-cover w-full",
              src: "/public/images/marketing.jpg",
              alt: "Placeholder Image"
            }
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-2 flex-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "pb-2", children: "Story Title" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-size", children: "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-2 text-center sm:text-right", children: /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "btn btn-orange-outline", children: "Read More" }) })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mb-2 grid auto-rows-min bg-stone-100 bg-opacity-70 border-b border-slate-50", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-2 mb-2 uppercase text-center text-purple-700 bg-purple-200 bg-opacity-75", children: "Traditional Finance VS Cryptocurrency?" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-2 font-size", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "pb-2", children: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "pb-2", children: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "pb-2", children: "Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur." })
      ] })
    ] })
  ] }) });
};
const CryptoExplorer = () => {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { children: "Crypto explorer page." }) });
};
const StockExplorer = () => {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { children: "Stock explorer page." });
};
const useValidate = (validateValue) => {
  const [enteredValue, setEnteredValue] = reactExports.useState("");
  const [isTouched, setTouched] = reactExports.useState(false);
  const valueIsValid = validateValue(enteredValue);
  const hasError = !valueIsValid && isTouched;
  const valueChangeHandler = (event) => {
    setEnteredValue(event.target.value);
  };
  const inputBlurHandler = () => {
    setTouched(true);
  };
  const resetHandler = () => {
    setEnteredValue("");
    setTouched(false);
  };
  return {
    value: enteredValue,
    isValid: valueIsValid,
    hasError,
    valueChangeHandler,
    inputBlurHandler,
    resetHandler
  };
};
const Login = () => {
  const {
    value: email,
    hasError: emailHasError,
    isValid: emailIsValid,
    valueChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
    resetHandler: emailInputReset
  } = useValidate((value) => value.trim() !== "" && value.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/));
  const {
    value: password,
    hasError: passwordHasError,
    isValid: passwordIsValid,
    valueChangeHandler: passwordChangeHandler,
    inputBlurHandler: passwordBlurHandler,
    resetHandler: passwordInputReset
  } = useValidate((value) => value.trim() !== "" && value.match(/^[ A-Za-z0-9!@#$%^&*()_+]*$/));
  let formIsValid = false;
  if (emailIsValid && passwordIsValid) {
    formIsValid = true;
  }
  const emailInputClasses = emailHasError ? "alert-border-warning" : "alert-border-success";
  const passwordInputClasses = passwordHasError ? "alert-border-warning" : "alert-border-success";
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { loading, access_token } = userLogin;
  const userToken = useSelector((state) => state.userToken);
  const { valid } = userToken;
  const showMessage = useSelector((state) => state.showMessage);
  const { message, error } = showMessage;
  const navigate = useNavigate();
  reactExports.useEffect(() => {
    if (!valid && access_token) {
      dispatch(tokenUser(access_token));
    }
    if (valid && access_token) {
      navigate("/dashboard");
    } else {
      navigate("/auth/login");
    }
  }, [access_token, valid]);
  const submitHandler = (event) => {
    event.preventDefault();
    emailBlurHandler(true);
    passwordBlurHandler(true);
    if (!emailIsValid && !passwordIsValid) {
      return;
    }
    dispatch(loginUser(email, password));
    emailInputReset();
    passwordInputReset();
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    error && /* @__PURE__ */ jsxRuntimeExports.jsx(Message, { children: error, variant: "alert-danger" }),
    message && /* @__PURE__ */ jsxRuntimeExports.jsx(Message, { children: message, variant: "alert-success" }),
    loading ? /* @__PURE__ */ jsxRuntimeExports.jsx(Loader, {}) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "form-center-margin my-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { method: "post", onSubmit: submitHandler, className: "form-group screen-size font-size gradient-huckle-berry", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "form-header border-bottom", children: /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { children: "Login" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "form-control", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "form-label", htmlFor: "email", children: "Email" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            className: `form-input ${emailInputClasses}`,
            id: "email",
            name: "email",
            type: "email",
            value: email,
            onChange: emailChangeHandler,
            onBlur: emailBlurHandler,
            autoComplete: "off"
          }
        ),
        emailHasError && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "form-alert", children: "Please enter a valid email." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "form-control", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "form-label", htmlFor: "password", children: "Password" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            className: `form-input ${passwordInputClasses}`,
            id: "password",
            name: "password",
            type: "password",
            value: password,
            onChange: passwordChangeHandler,
            onBlur: passwordBlurHandler,
            autoComplete: "off"
          }
        ),
        passwordHasError && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "form-alert", children: "Please enter a valid password." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "form-notice", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "py-2 text-right", children: [
        "Password forgotten? Click this",
        " ",
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/auth/forgot", className: "text-orange-400", children: "link" }),
        " ",
        "to reset it."
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "form-button", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/dashboard", children: /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: submitHandler, className: "btn btn-green", type: "submit", disabled: !formIsValid, children: "Login" }) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/", children: /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "btn btn-stone", type: "button", children: "Cancel" }) }) })
      ] })
    ] }) })
  ] });
};
const Register = () => {
  const {
    value: userName,
    hasError: userNameHasError,
    isValid: userNameIsValid,
    valueChangeHandler: userNameChangeHandler,
    inputBlurHandler: userNameBlurHandler,
    resetHandler: userNameInputReset
  } = useValidate((value) => value.trim() !== "" && value.match(/^[ A-Za-z0-9!@#$%^&*()_+]*$/));
  const {
    value: firstName,
    hasError: firstNameHasError,
    isValid: firstNameIsValid,
    valueChangeHandler: firstNameChangeHandler,
    inputBlurHandler: firstNameBlurHandler,
    resetHandler: firstNameInputReset
  } = useValidate((value) => value.trim() !== "" && value.match(/^[ A-Za-z0-9!@#$%^&*()_+]*$/));
  const {
    value: lastName,
    hasError: lastNameHasError,
    isValid: lastNameIsValid,
    valueChangeHandler: lastNameChangeHandler,
    inputBlurHandler: lastNameBlurHandler,
    resetHandler: lastNameInputReset
  } = useValidate((value) => value.trim() !== "" && value.match(/^[ A-Za-z0-9!@#$%^&*()_+]*$/));
  const {
    value: email,
    hasError: emailHasError,
    isValid: emailIsValid,
    valueChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
    resetHandler: emailInputReset
  } = useValidate((value) => value.trim() !== "" && value.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/));
  const {
    value: password,
    hasError: passwordHasError,
    isValid: passwordIsValid,
    valueChangeHandler: passwordChangeHandler,
    inputBlurHandler: passwordBlurHandler,
    resetHandler: passwordInputReset
  } = useValidate((value) => value.trim() !== "" && value.match(/^[ A-Za-z0-9!@#$%^&*()_+]*$/));
  const {
    value: confirm,
    hasError: confirmHasError,
    isValid: confirmIsValid,
    valueChangeHandler: confirmChangeHandler,
    inputBlurHandler: confirmBlurHandler,
    resetHandler: confirmInputReset
  } = useValidate((value) => value.trim() !== "" && value.match(/^[ A-Za-z0-9!@#$%^&*()_+]*$/));
  const [passwordMatched, setPasswordMatched] = reactExports.useState(false);
  const [passwordLength, setpasswordLength] = reactExports.useState(false);
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { access_token } = userLogin;
  const userRegister = useSelector((state) => state.userRegister);
  const { loading, error } = userRegister;
  const userToken = useSelector((state) => state.userToken);
  const { valid } = userToken;
  const showMessage = useSelector((state) => state.showMessage);
  const { message } = showMessage;
  const navigate = useNavigate();
  reactExports.useEffect(() => {
    if (password.length != 0 && password.length < 10) {
      setpasswordLength(true);
    } else {
      setpasswordLength(false);
    }
    if (password !== confirm) {
      setPasswordMatched(true);
    } else {
      setPasswordMatched(false);
    }
    if (!valid && access_token) {
      dispatch(tokenUser(access_token));
    }
    if (valid && access_token) {
      navigate("/dashboard");
    } else {
      navigate("/auth/register");
    }
  }, [password, confirm, valid, access_token]);
  let formIsValid = false;
  if (userNameIsValid && firstNameIsValid && lastNameIsValid && emailIsValid && passwordIsValid && confirmIsValid) {
    formIsValid = true;
  }
  const userNameInputClasses = userNameHasError ? "invalid" : "valid";
  const firstNameInputClasses = firstNameHasError ? "invalid" : "valid";
  const lastNameInputClasses = lastNameHasError ? "invalid" : "valid";
  const emailInputClasses = emailHasError ? "invalid" : "valid";
  const passwordInputClasses = passwordHasError ? "invalid" : "valid";
  const confirmInputClasses = confirmHasError ? "invalid" : "valid";
  const submitHandler = (event) => {
    event.preventDefault();
    userNameBlurHandler(true);
    firstNameBlurHandler(true);
    lastNameBlurHandler(true);
    emailBlurHandler(true);
    passwordBlurHandler(true);
    confirmBlurHandler(true);
    if (!emailIsValid && !passwordIsValid) {
      return;
    }
    dispatch(registerUser(userName, firstName, lastName, email, password));
    userNameInputReset();
    firstNameInputReset();
    lastNameInputReset();
    emailInputReset();
    passwordInputReset();
    confirmInputReset();
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    error && /* @__PURE__ */ jsxRuntimeExports.jsx(Message, { children: error, variant: "alert-danger" }),
    message && /* @__PURE__ */ jsxRuntimeExports.jsx(Message, { children: message, variant: "alert-success" }),
    loading ? /* @__PURE__ */ jsxRuntimeExports.jsx(Loader, {}) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "form-center-margin my-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { method: "post", className: "form-group screen-size font-size gradient-huckle-berry", onSubmit: submitHandler, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "form-header border-bottom", children: /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { children: "Register" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "form-control", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "form-label", htmlFor: "username", children: "Username" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            className: `form-input ${userNameInputClasses}`,
            id: "username",
            name: "username",
            type: "text",
            value: userName,
            onChange: userNameChangeHandler,
            onBlur: userNameBlurHandler,
            autoComplete: "off"
          }
        ),
        userNameHasError && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "form-alert", children: "Please enter a valid username." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "form-control", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "form-label", htmlFor: "firstname", children: "First Name" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            className: `form-input ${firstNameInputClasses}`,
            id: "firstname",
            name: "firstname",
            type: "text",
            value: firstName,
            onChange: firstNameChangeHandler,
            onBlur: firstNameBlurHandler,
            autoComplete: "off"
          }
        ),
        firstNameHasError && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "form-alert", children: "Please enter a valid first name." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "form-control", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "form-label", htmlFor: "lastname", children: "Last Name" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            className: `form-input ${lastNameInputClasses}`,
            id: "lastname",
            name: "lastname",
            type: "text",
            value: lastName,
            onChange: lastNameChangeHandler,
            onBlur: lastNameBlurHandler,
            autoComplete: "off"
          }
        ),
        lastNameHasError && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "form-alert", children: "Please enter a valid last name." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "form-control", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "form-label", htmlFor: "email", children: "Email" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            className: `form-input ${emailInputClasses}`,
            id: "email",
            name: "email",
            type: "email",
            value: email,
            onChange: emailChangeHandler,
            onBlur: emailBlurHandler,
            autoComplete: "off"
          }
        ),
        emailHasError && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "form-alert", children: "Please enter a valid email." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "form-control", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "form-label", htmlFor: "password", children: "Password" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            className: `form-input ${passwordInputClasses}`,
            id: "password",
            name: "password",
            type: "password",
            value: password,
            onChange: passwordChangeHandler,
            onBlur: passwordBlurHandler,
            autoComplete: "off"
          }
        ),
        passwordHasError ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "form-alert", children: "Please enter a valid password." }) : passwordLength && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "form-alert", children: "Password must be 10 characters or more." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "form-control", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "form-label", htmlFor: "confirm", children: "Confirm Password" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            className: `form-input ${confirmInputClasses}`,
            id: "confirm",
            name: "confirm",
            type: "password",
            value: confirm,
            onChange: confirmChangeHandler,
            onBlur: confirmBlurHandler,
            autoComplete: "off"
          }
        ),
        confirmHasError ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "form-alert", children: "Please enter a valid confirm password." }) : passwordMatched && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "form-alert", children: "Password and confirm password do not match." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "form-notice", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "py-2 text-right", children: [
        "Already have an account? Click this",
        " ",
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/auth/login", className: "text-orange-400", children: "link" }),
        " ",
        "to login."
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "form-button", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "submit", onClick: submitHandler, className: "btn btn-green", disabled: !formIsValid, children: "Register" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/", children: /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "btn btn-stone", type: "button", children: "Cancel" }) }) })
      ] })
    ] }) })
  ] });
};
const Forgot = () => {
  const {
    value: email,
    hasError: emailHasError,
    isValid: emailIsValid,
    valueChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
    resetHandler: emailInputReset
  } = useValidate((value) => value.trim() !== "" && value.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/));
  let formIsValid = false;
  if (emailIsValid) {
    formIsValid = true;
  }
  const emailInputClasses = emailHasError ? "invalid" : "valid";
  const userForgot = useSelector((state) => state.userForgot);
  const { loading, error, success } = userForgot;
  const dispatch = useDispatch();
  const submitHandler = (event) => {
    event.preventDefault();
    emailBlurHandler(true);
    if (!emailIsValid) {
      return;
    }
    dispatch(forgotPassword(email));
    emailInputReset();
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    error && /* @__PURE__ */ jsxRuntimeExports.jsx(Message, { children: error, variant: "alert-danger" }),
    success && /* @__PURE__ */ jsxRuntimeExports.jsx(Message, { children: success.message, variant: "alert-success" }),
    loading ? /* @__PURE__ */ jsxRuntimeExports.jsx(Loader, {}) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "form-center-margin", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { method: "POST", className: "form-group screen-size font-size gradient-huckle-berry", onSubmit: submitHandler, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "form-header border-bottom", children: /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { children: "Forgot Password" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "form-control", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "form-label", htmlFor: "email", children: "Email" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            className: `form-input ${emailInputClasses}`,
            id: "email",
            name: "email",
            type: "email",
            value: email,
            onChange: emailChangeHandler,
            onBlur: emailBlurHandler,
            autoComplete: "off"
          }
        ),
        emailHasError ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "form-alert", children: "Please enter a valid email." }) : ""
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "form-button", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "submit", className: "btn btn-green", disabled: !formIsValid, children: "Submit" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/", children: /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "btn btn-stone", type: "button", children: "Cancel" }) }) })
      ] })
    ] }) })
  ] });
};
const Reset = () => {
  const {
    value: email,
    hasError: emailHasError,
    isValid: emailIsValid,
    valueChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
    resetHandler: emailInputReset
  } = useValidate((value) => value.trim() !== "" && value.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/));
  const {
    value: password,
    hasError: passwordHasError,
    isValid: passwordIsValid,
    valueChangeHandler: passwordChangeHandler,
    inputBlurHandler: passwordBlurHandler,
    resetHandler: passwordInputReset
  } = useValidate((value) => value.trim() !== "" && value.match(/^[ A-Za-z0-9!@#$%^&*()_+]*$/));
  const {
    value: confirm,
    hasError: confirmHasError,
    isValid: confirmIsValid,
    valueChangeHandler: confirmChangeHandler,
    inputBlurHandler: confirmBlurHandler,
    resetHandler: confirmInputReset
  } = useValidate((value) => value.trim() !== "" && value.match(/^[ A-Za-z0-9!@#$%^&*()_+]*$/));
  const [passwordMatched, setPasswordMatched] = reactExports.useState(false);
  const [passwordLength, setpasswordLength] = reactExports.useState(false);
  const { token } = useParams();
  const dispatch = useDispatch();
  const userReset = useSelector((state) => state.userReset);
  const { loading } = userReset;
  const userLogin = useSelector((state) => state.userLogin);
  const { access_token } = userLogin;
  const userToken = useSelector((state) => state.userToken);
  const { valid } = userToken;
  const showMessage = useSelector((state) => state.showMessage);
  const { message, error } = showMessage;
  const navigate = useNavigate();
  reactExports.useEffect(() => {
    if (password.length != 0 && password.length < 10) {
      setpasswordLength(true);
    } else {
      setpasswordLength(false);
    }
    if (password !== confirm) {
      setPasswordMatched(true);
    } else {
      setPasswordMatched(false);
    }
    if (!valid && access_token) {
      dispatch(tokenUser(access_token));
    }
    if (valid && access_token) {
      console.log("Continue resetting your password.");
    } else {
      navigate("/auth/login");
    }
  }, [password, confirm, valid, access_token]);
  let formIsValid = false;
  if (emailIsValid && passwordIsValid && confirmIsValid) {
    formIsValid = true;
  }
  const emailInputClasses = emailHasError ? "invalid" : "valid";
  const passwordInputClasses = passwordHasError ? "invalid" : "valid";
  const passwordMatchedClasses = passwordMatched ? "invalid" : "valid";
  const submitHandler = (event) => {
    event.preventDefault();
    emailBlurHandler(true);
    passwordBlurHandler(true);
    confirmBlurHandler(true);
    if (!emailIsValid && !passwordIsValid && !confirmIsValid) {
      return;
    }
    dispatch(resetPassword(token, email, password));
    emailInputReset();
    passwordInputReset();
    confirmInputReset();
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    error && /* @__PURE__ */ jsxRuntimeExports.jsx(Message, { children: error, variant: "alert-danger" }),
    message && /* @__PURE__ */ jsxRuntimeExports.jsx(Message, { children: message, variant: "alert-success" }),
    loading ? /* @__PURE__ */ jsxRuntimeExports.jsx(Loader, {}) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "form-center-margin", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { method: "POST", className: "form-group screen-size font-size gradient-huckle-berry", onSubmit: submitHandler, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "form-header border-bottom", children: /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { children: "Reset Password" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "form-control", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "form-label", htmlFor: "email", children: "Email" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            className: `form-input ${emailInputClasses}`,
            id: "email",
            name: "email",
            type: "email",
            value: email,
            onChange: emailChangeHandler,
            onBlur: emailBlurHandler,
            autoComplete: email
          }
        ),
        emailHasError && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "form-alert", children: "Please enter a valid email address." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "form-control", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "form-label", htmlFor: "password", children: "Password" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            className: `form-input ${passwordInputClasses}`,
            id: "password",
            name: "password",
            type: "password",
            value: password,
            onChange: passwordChangeHandler,
            onBlur: passwordBlurHandler,
            autoComplete: password
          }
        ),
        passwordHasError ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "form-alert", children: "Please enter a valid password." }) : passwordLength && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "form-alert", children: "Password must be 10 characters or more." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "form-control", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "form-label", htmlFor: "confirm", children: "Confirm Password" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            className: `form-input ${passwordMatchedClasses}`,
            id: "confirm",
            name: "confirm",
            type: "password",
            value: confirm,
            onChange: confirmChangeHandler,
            onBlur: confirmBlurHandler,
            autoComplete: confirm
          }
        ),
        confirmHasError ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "form-alert", children: "Please enter a valid confirm password." }) : passwordMatched && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "form-alert", children: "Password and confirm password do not match." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "form-button", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "submit", onClick: submitHandler, className: "btn btn-green", disabled: !formIsValid, children: "Reset" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/", children: /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "btn btn-stone", type: "button", children: "Cancel" }) }) })
      ] })
    ] }) })
  ] });
};
const Verify = () => {
  const { token } = useParams();
  const userVerify = useSelector((state) => state.userVerify);
  const { loading, error, success } = userVerify;
  const dispatch = useDispatch();
  reactExports.useEffect(() => {
    dispatch(verifyEmail(token));
  }, [dispatch]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    error && /* @__PURE__ */ jsxRuntimeExports.jsx(Message, { children: error, variant: "alert-danger" }),
    loading ? /* @__PURE__ */ jsxRuntimeExports.jsx(Loader, {}) : success ? /* @__PURE__ */ jsxRuntimeExports.jsx(Message, { children: success, variant: "alert-success" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-center items-center h-40 mt-6 m-2 shadow bg-slate-100 border-slate-50 border-opacity-100", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-center", children: "Request being process, just sit and wait for response from the server!" }) })
  ] });
};
const Client = () => {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { children: "Client page." });
};
const Modal = ({ children }) => {
  return reactDomExports.createPortal(
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "modal-container", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "modal-content", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "modal-scrollable", children }) }) }),
    document.getElementById("modal")
  );
};
const Notice = ({ variant, children, duration, show }) => {
  const [notice, setNotice] = reactExports.useState(show);
  reactExports.useEffect(() => {
    if (show) {
      setNotice(true);
    }
    if (children) {
      const timer = setTimeout(() => {
        setNotice(false);
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [show, duration, children]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: notice && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fixed top-0 right-0 m-2 cursor-pointer hover:animate-pulse z-50", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: variant ? variant : "alert-danger", children }) }) });
};
const Container = ({ header, children }) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "m-2 grid auto-rows-min h-fit", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-2 h-8 sm:10 uppercase", children: [
      " ",
      header
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-2", children })
  ] });
};
const modalEdgeTemplate = (props) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid auto-rows-min h-fit rounded-t-md bg-stone-100 uppercase", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-2 flex flex-row justify-between border-b border-stone-200", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-xl", children: props.header }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "sm:pl-2 cursor-pointer", onClick: props.close, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { id: "close" }),
        " ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "invisible sm:visible", children: "Close" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-2 flex flex-row items-center justify-center border-b border-stone-200 w-full hover:text-purple-500", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-4/12", children: "Index" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-4/12", children: "Symbol" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-4/12", children: "Action" })
    ] }),
    props.data && props.data.length != 0 ? props.data.map((item, index2) => {
      return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-2 flex flex-row items-center justify-center border-b border-stone-200 w-full hover:text-green-500", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-4/12", children: index2 + 1 }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-4/12", children: item.symbol }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-4/12", children: props.index === index2 && props.shown ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "span",
            {
              className: "uppercase cursor-pointer",
              onClick: () => {
                props.form(false);
              },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { id: "add" }),
                " ",
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "invisible sm:visible", children: "Close" })
              ]
            }
          ) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "span",
            {
              className: "uppercase cursor-pointer",
              onClick: () => {
                props.form(true);
                props.set(index2);
              },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { id: "add" }),
                " ",
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "invisible sm:visible cursor-pointer", children: "Update" })
              ]
            }
          ) })
        ] }),
        props.shown && props.index === index2 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-2 flex flex-col sm:flex-row items-center justify-center border-b border-stone-200 w-full hover:text-green-500", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grow sm:w-4/12", children: item.symbol }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grow sm:w-4/12", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                className: `p-2 rounded shadow ${props.error ? "border border-red-500 text-red" : "border border-green-500 text-green"}`,
                id: "edge",
                name: "edge",
                type: "text",
                placeholder: "Enter Edge ID",
                onBlur: props.blur,
                onChange: props.change,
                value: props.value,
                autoComplete: "off"
              }
            ),
            props.error && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "pt-1 text-red-500 text-[.50rem]", children: "Please enter a valid edge id." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grow sm:w-4/12", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              className: "uppercase cursor-pointer",
              onClick: () => {
                props.action({
                  symbol: item.symbol,
                  value: props.value
                });
                props.form(false);
                props.reset();
              },
              disabled: props.error,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { id: "submit" }),
                " ",
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "invisible sm:visible", children: "Submit" })
              ]
            }
          ) })
        ] })
      ] });
    }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "form-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "No record found." }) })
  ] });
};
const modalBlueTemplate = (props) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid auto-rows-min h-fit rounded-t-md bg-stone-100 uppercase", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-2 flex flex-row justify-between border-b border-stone-200", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-xl", children: props.header }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-0", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-right sm:pl-2 cursor-pointer", onClick: () => props.form(!props.shown), children: props.shown ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { id: "cancel" }),
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "invisible sm:visible cursor-pointer", children: "Cancel" })
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { id: "add" }),
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "invisible sm:visible cursor-pointer", children: "Add" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-right sm:pl-2", onClick: props.close, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { id: "close" }),
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "invisible sm:visible", children: "Close" })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-2 flex flex-row items-center justify-center border-b border-stone-200 w-full hover:text-purple-500", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-4/12", children: "Index" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-4/12", children: "Symbol" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-4/12", children: "Action" })
    ] }),
    props.shown ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-2 flex flex-col sm:flex-row items-center justify-center border-b border-stone-200 w-full hover:text-green-500", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grow sm:w-4/12 uppercase", children: "Add Bluechip" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grow sm:w-4/12", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            className: `p-2 rounded shadow ${props.error ? "border border-red-500 text-red" : "border border-green-500 text-green"}`,
            id: "bluechip",
            name: "bluechip",
            type: "text",
            placeholder: "Enter Symbol",
            onBlur: props.blur,
            onChange: props.change,
            value: props.value,
            autoComplete: "off"
          }
        ),
        props.error && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "pt-1 text-red-500 text-[.50rem]", children: "Please enter a valid symbol." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grow sm:w-4/12", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          className: "uppercase cursor-pointer",
          onClick: () => {
            props.action({
              statement: "store",
              value: props.value
            });
            props.form(false);
            props.reset();
          },
          disabled: props.error,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { id: "submit" }),
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "invisible sm:visible", children: "Submit" })
          ]
        }
      ) })
    ] }) : props.data && props.data.length != 0 ? props.data.map((item, index2) => {
      return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-2 flex flex-row items-center justify-center border-b border-stone-200 w-full hover:text-green-500", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-4/12", children: index2 + 1 }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-4/12", children: item.symbol }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-4/12", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            className: "uppercase cursor-pointer",
            onClick: () => {
              props.action({
                statement: "destroy",
                value: item.symbol
              });
              props.form(false);
              props.reset();
            },
            disabled: props.error,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { id: "destroy" }),
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "invisible sm:visible", children: "Delete" })
            ]
          }
        ) })
      ] });
    }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "form-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "No record found." }) })
  ] });
};
const stockLeaderBoard = (props) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-2 sm:row-start-2 card-rounded-scale h-fit hover:z-10", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-2 flex flex-row justify-between border-b border-stone-200", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "grow w-full text-center uppercase", children: props.header }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-2 flex flex-row justify-between border-b border-stone-200 text-green-500", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-2/12", children: "Symbol" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-2/12", children: "Price" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-2/12", children: "Change" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-2/12", children: "Range" })
    ] }),
    props.data && props.data.length != 0 ? props.data.map((item, index2) => {
      return /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          onClick: () => props.show(true),
          className: "p-2 flex flex-row justify-between border-b border-stone-200 hover:bg-stone-100 hover:text-purple-500",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-2/12 text-[.5rem] sm:text-[.65rem]", children: item.symbol }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-2/12 text-[.5rem] sm:text-[.65rem]", children: item.price }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-2/12 text-[.5rem] sm:text-[.65rem]", children: item.change }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-2/12 text-[.5rem] sm:text-[.65rem]", children: item.pricerange })
          ]
        },
        index2
      );
    }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "form-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "No record found." }) })
  ] });
};
const startDashboard = (token) => async (dispatch) => {
  try {
    dispatch({ type: DASHBOARD_START_REQUEST });
    const { data } = await axios({
      url: "https://phisix-api4.appspot.com/stocks.json",
      method: "GET"
    });
    let result = mapObject(data);
    result.map((item, index2) => {
      let end = result.length - 1;
      setTimeout(async function() {
        if (item) {
          const { data: data2 } = await axios({
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`
            },
            method: "POST",
            url: "/api/stock-trade-store",
            params: {
              input: item,
              table: "trade",
              statement: "store"
            }
          });
          dispatch({
            type: MESSAGE_SHOW_SUCCESS,
            payload: data2.message
          });
        }
        if (index2 === end) {
          console.log("Process Completed.");
        }
      }, 3e3 * index2);
    });
    dispatch({ type: DASHBOARD_START_SUCCESS, payload: data.message });
  } catch (error) {
    dispatch({
      type: DASHBOARD_START_FAILURE,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message
    });
    dispatch({
      type: MESSAGE_SHOW_FAILURE,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message
    });
  }
};
const priceDashboard = (token) => async (dispatch) => {
  try {
    dispatch({ type: DASHBOARD_PRICE_REQUEST });
    const { data } = await axios({
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      method: "GET",
      url: "/stock-reports-retrieve",
      params: { section: "stocks" }
    });
    let stocks = data.stocks;
    let message = data.message;
    dispatch({
      type: MESSAGE_SHOW_SUCCESS,
      payload: message
    });
    stocks.map((item, index2) => {
      let end = stocks.length - 1;
      setTimeout(async function() {
        if (item) {
          const { data: data2 } = await axios({
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`
            },
            method: "POST",
            url: "/stock-reports-store",
            params: {
              input: item,
              section: "prices"
            }
          });
          dispatch({
            type: MESSAGE_SHOW_SUCCESS,
            payload: data2.message
          });
        }
        if (index2 === end) {
          console.log("Process Completed.");
        }
      }, 3e3 * index2);
    });
    dispatch({ type: DASHBOARD_PRICE_SUCCESS, payload: data.message });
  } catch (error) {
    dispatch({
      type: DASHBOARD_PRICE_FAILURE,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message
    });
    dispatch({
      type: MESSAGE_SHOW_FAILURE,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message
    });
  }
};
const reportDashboard = (token) => async (dispatch) => {
  try {
    dispatch({ type: DASHBOARD_REPORT_REQUEST });
    const { data } = await axios({
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      method: "GET",
      url: "/stock-reports-retrieve",
      params: { section: "stocks" }
    });
    let stocks = data.stocks;
    let message = data.message;
    dispatch({
      type: MESSAGE_SHOW_SUCCESS,
      payload: message
    });
    stocks.map((item, index2) => {
      let end = stocks.length - 1;
      setTimeout(async function() {
        if (item) {
          const { data: data2 } = await axios({
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`
            },
            method: "POST",
            url: "/stock-reports-store",
            params: {
              input: item,
              section: "reports"
            }
          });
          dispatch({
            type: MESSAGE_SHOW_SUCCESS,
            payload: data2.message
          });
        }
        if (index2 === end) {
          console.log("Process Completed.");
        }
      }, 3e3 * index2);
    });
    dispatch({ type: DASHBOARD_REPORT_SUCCESS, payload: data.message });
  } catch (error) {
    dispatch({
      type: DASHBOARD_REPORT_FAILURE,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message
    });
    dispatch({
      type: MESSAGE_SHOW_FAILURE,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message
    });
  }
};
const dividendDashboard = (token) => async (dispatch) => {
  try {
    dispatch({ type: DASHBOARD_DIVIDEND_REQUEST });
    const { data } = await axios({
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      method: "GET",
      url: "/stock-reports-retrieve",
      params: { section: "stocks" }
    });
    let stocks = data.stocks;
    let message = data.message;
    dispatch({
      type: MESSAGE_SHOW_SUCCESS,
      payload: message
    });
    stocks.map((item, index2) => {
      let end = stocks.length - 1;
      setTimeout(async function() {
        if (item) {
          const { data: data2 } = await axios({
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`
            },
            method: "POST",
            url: "/stock-reports-store",
            params: {
              input: item,
              section: "dividends"
            }
          });
          dispatch({
            type: MESSAGE_SHOW_SUCCESS,
            payload: data2.message
          });
        }
        if (index2 === end) {
          console.log("Process Completed.");
        }
      }, 3e3 * index2);
    });
    dispatch({ type: DASHBOARD_DIVIDEND_SUCCESS, payload: data.message });
  } catch (error) {
    dispatch({
      type: DASHBOARD_DIVIDEND_FAILURE,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message
    });
    dispatch({
      type: MESSAGE_SHOW_FAILURE,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message
    });
  }
};
const sectorDashboard = (token) => async (dispatch) => {
  try {
    dispatch({ type: DASHBOARD_SECTOR_REQUEST });
    const { data } = await axios({
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      method: "GET",
      url: "/stock-reports-retrieve",
      params: { section: "stocks" }
    });
    let stocks = data.stocks;
    let message = data.message;
    dispatch({
      type: MESSAGE_SHOW_SUCCESS,
      payload: message
    });
    stocks.map((item, index2) => {
      let end = stocks.length - 1;
      setTimeout(async function() {
        if (item) {
          const { data: data2 } = await axios({
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`
            },
            method: "POST",
            url: "/stock-reports-store",
            params: {
              input: item,
              section: "sectors"
            }
          });
          dispatch({
            type: MESSAGE_SHOW_SUCCESS,
            payload: data2.message
          });
        }
        if (index2 === end) {
          console.log("Process Completed.");
        }
      }, 3e3 * index2);
    });
    dispatch({ type: DASHBOARD_SECTOR_SUCCESS, payload: data.message });
  } catch (error) {
    dispatch({
      type: DASHBOARD_SECTOR_FAILURE,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message
    });
    dispatch({
      type: MESSAGE_SHOW_FAILURE,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message
    });
  }
};
const listDashboard = (token) => async (dispatch) => {
  try {
    dispatch({ type: DASHBOARD_LIST_REQUEST });
    const { data } = await axios({
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      method: "GET",
      url: "/stock-reports-retrieve",
      params: { section: "lists" }
    });
    let message = data.message;
    dispatch({
      type: MESSAGE_SHOW_SUCCESS,
      payload: message
    });
    dispatch({ type: DASHBOARD_LIST_SUCCESS, payload: message });
    if (message) {
      console.log("Process Completed.");
    }
  } catch (error) {
    dispatch({
      type: DASHBOARD_LIST_FAILURE,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message
    });
    dispatch({
      type: MESSAGE_SHOW_FAILURE,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message
    });
  }
};
const companyDashboard = (token) => async (dispatch) => {
  try {
    dispatch({ type: DASHBOARD_COMPANY_REQUEST });
    const { data } = await axios({
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      method: "GET",
      url: "/stock-reports-retrieve",
      params: { section: "stocks" }
    });
    let stocks = data.stocks;
    let message = data.message;
    dispatch({
      type: MESSAGE_SHOW_SUCCESS,
      payload: message
    });
    stocks.map((item, index2) => {
      let end = stocks.length - 1;
      setTimeout(async function() {
        if (item) {
          const { data: data2 } = await axios({
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`
            },
            method: "POST",
            url: "/stock-reports-store",
            params: {
              symbol: item.symbol,
              section: "companies"
            }
          });
          dispatch({
            type: MESSAGE_SHOW_SUCCESS,
            payload: data2.message
          });
        }
        if (index2 === end) {
          console.log("Process Completed.");
        }
      }, 3e3 * index2);
    });
    dispatch({ type: DASHBOARD_COMPANY_SUCCESS, payload: data.message });
  } catch (error) {
    dispatch({
      type: DASHBOARD_COMPANY_FAILURE,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message
    });
    dispatch({
      type: MESSAGE_SHOW_FAILURE,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message
    });
  }
};
const bluechipDashboard = (token) => async (dispatch) => {
  try {
    dispatch({ type: DASHBOARD_BLUECHIP_REQUEST });
    const { data } = await axios({
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      method: "GET",
      url: "/api/dashboard",
      params: { section: "bluechip", statement: "select" }
    });
    let stocks = data.stocks;
    let message = data.message;
    dispatch({
      type: MESSAGE_SHOW_SUCCESS,
      payload: message
    });
    dispatch({ type: DASHBOARD_BLUECHIP_SUCCESS, payload: stocks });
    if (stocks) {
      localStorage.setItem("dashboardBluechip", JSON.stringify(stocks));
    }
  } catch (error) {
    dispatch({
      type: DASHBOARD_BLUECHIP_FAILURE,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message
    });
    dispatch({
      type: MESSAGE_SHOW_FAILURE,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message
    });
  }
};
const bluechipStoreDashboard = ({ token, symbol }) => async (dispatch) => {
  try {
    dispatch({ type: DASHBOARD_BLUECHIP_STORE_REQUEST });
    const { data } = await axios({
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      method: "POST",
      url: "/api/dashboard",
      params: {
        section: "bluechip",
        statement: "store",
        symbol
      }
    });
    let message = data.message;
    dispatch({ type: MESSAGE_SHOW_SUCCESS, payload: message });
    dispatch({ type: DASHBOARD_BLUECHIP_STORE_SUCCESS, payload: message });
  } catch (error) {
    dispatch({
      type: DASHBOARD_BLUECHIP_STORE_FAILURE,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message
    });
    dispatch({
      type: MESSAGE_SHOW_FAILURE,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message
    });
  }
};
const bluechipDestroyDashboard = ({ token, symbol }) => async (dispatch) => {
  try {
    dispatch({ type: DASHBOARD_BLUECHIP_DESTROY_REQUEST });
    const { data } = await axios({
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      method: "POST",
      url: "/api/dashboard",
      params: {
        section: "bluechip",
        statement: "destroy",
        symbol
      }
    });
    let message = data.message;
    dispatch({ type: MESSAGE_SHOW_SUCCESS, payload: message });
    dispatch({
      type: DASHBOARD_BLUECHIP_DESTROY_SUCCESS,
      payload: message
    });
  } catch (error) {
    dispatch({
      type: DASHBOARD_BLUECHIP_DESTROY_FAILURE,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message
    });
    dispatch({
      type: MESSAGE_SHOW_FAILURE,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message
    });
  }
};
const edgeDashboard = (token) => async (dispatch) => {
  try {
    dispatch({ type: DASHBOARD_EDGE_REQUEST });
    const { data } = await axios({
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      method: "GET",
      url: "/api/dashboard",
      params: { section: "edge", statement: "select" }
    });
    let stocks = data.stocks;
    let message = data.message;
    dispatch({
      type: MESSAGE_SHOW_SUCCESS,
      payload: message
    });
    dispatch({ type: DASHBOARD_EDGE_SUCCESS, payload: stocks });
    if (stocks) {
      localStorage.setItem("dashboardEdge", JSON.stringify(stocks));
    }
  } catch (error) {
    dispatch({
      type: DASHBOARD_EDGE_FAILURE,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message
    });
    dispatch({
      type: MESSAGE_SHOW_FAILURE,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message
    });
  }
};
const edgeUpdateDashboard = (props) => async (dispatch) => {
  try {
    dispatch({ type: DASHBOARD_EDGE_UPDATE_REQUEST });
    const { data } = await axios({
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${props.token}`
      },
      method: "POST",
      url: "/api/dashboard",
      params: {
        section: "edge",
        statement: "update",
        symbol: props.symbol,
        edge: props.edge
      }
    });
    let message = data.message;
    dispatch({ type: MESSAGE_SHOW_SUCCESS, payload: message });
    dispatch({ type: DASHBOARD_EDGE_UPDATE_SUCCESS, payload: message });
  } catch (error) {
    dispatch({
      type: DASHBOARD_EDGE_UPDATE_FAILURE,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message
    });
    dispatch({
      type: MESSAGE_SHOW_FAILURE,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message
    });
  }
};
const stockGainerDashboard = (token) => async (dispatch) => {
  try {
    dispatch({ type: DASHBOARD_STOCK_GAINER_REQUEST });
    const { data } = await axios({
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      method: "GET",
      url: "/api/dashboard",
      params: { section: "gainers" }
    });
    let stocks = data.stocks;
    let message = data.message;
    dispatch({
      type: MESSAGE_SHOW_SUCCESS,
      payload: message
    });
    dispatch({ type: DASHBOARD_STOCK_GAINER_SUCCESS, payload: stocks });
    if (stocks) {
      localStorage.setItem("dashboardStockGainer", JSON.stringify(stocks));
    }
  } catch (error) {
    dispatch({
      type: DASHBOARD_STOCK_GAINER_FAILURE,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message
    });
    dispatch({
      type: MESSAGE_SHOW_FAILURE,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message
    });
  }
};
const stockLosserDashboard = (token) => async (dispatch) => {
  try {
    dispatch({ type: DASHBOARD_STOCK_LOSSER_REQUEST });
    const { data } = await axios({
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      method: "GET",
      url: "/api/dashboard",
      params: { section: "lossers" }
    });
    let stocks = data.stocks;
    let message = data.message;
    dispatch({
      type: MESSAGE_SHOW_SUCCESS,
      payload: message
    });
    dispatch({ type: DASHBOARD_STOCK_LOSSER_SUCCESS, payload: stocks });
    if (stocks) {
      localStorage.setItem("dashboardStockLosser", JSON.stringify(stocks));
    }
  } catch (error) {
    dispatch({
      type: DASHBOARD_STOCK_LOSSER_FAILURE,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message
    });
    dispatch({
      type: MESSAGE_SHOW_FAILURE,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message
    });
  }
};
const Dashboard = () => {
  const userLogin = useSelector((state) => state.userLogin);
  const { loading, access_token, email_verified } = userLogin;
  const userToken = useSelector((state) => state.userToken);
  const { valid } = userToken;
  const dashboardBluechip = useSelector((state) => state.dashboardBluechip);
  const { loading: loadBluechip, bluechip } = dashboardBluechip;
  const dashboardEdge = useSelector((state) => state.dashboardEdge);
  const { loading: loadEdge, edge } = dashboardEdge;
  const dashboardStockGainer = useSelector((state) => state.dashboardStockGainer);
  const { loading: loadStockGainer, stockgainer } = dashboardStockGainer;
  const dashboardStockLosser = useSelector((state) => state.dashboardStockLosser);
  const { loading: loadStockLosser, stocklosser } = dashboardStockLosser;
  const showMessage = useSelector((state) => state.showMessage);
  const { message, error } = showMessage;
  const [modalBlue, setModalBlue] = reactExports.useState(false);
  const [modalEdge, setModalEdge] = reactExports.useState(false);
  const [modalForm, setModalForm] = reactExports.useState(false);
  const [modalIndex, setModalIndex] = reactExports.useState(0);
  const [notice, setNotice] = reactExports.useState(false);
  const [modalStock, setModalStock] = reactExports.useState(false);
  const {
    value: modalBlueInput,
    hasError: modalBlueInputHasError,
    isValid: modalBlueInputIsValid,
    valueChangeHandler: modalBlueInputChangeHandler,
    inputBlurHandler: modalBlueInputBlurHandler,
    resetHandler: modalBlueInputInputReset
  } = useValidate((value) => value.trim() !== "" && value.match(/^[ A-Za-z0-9!@#$%^&*()_+]*$/));
  const {
    value: modalEdgeInput,
    hasError: modalEdgeInputHasError,
    isValid: modalEdgeInputIsValid,
    valueChangeHandler: modalEdgeInputChangeHandler,
    inputBlurHandler: modalEdgeInputBlurHandler,
    resetHandler: modalEdgeInputInputReset
  } = useValidate((value) => value.trim() !== "" && value.match(/^[ A-Za-z0-9!@#$%^\-&*()_+]*$/));
  const navigate = useNavigate();
  const dispatch = useDispatch();
  reactExports.useEffect(() => {
    if (!valid && access_token) {
      dispatch(tokenUser(access_token));
    }
    if (valid && error) {
      dispatch(tokenUser(access_token));
    }
    if (!valid) {
      const timeout = setTimeout(() => {
        navigate("/auth/login");
      }, 2e3);
      return () => {
        clearTimeout(timeout);
      };
    }
    if (valid && !edge) {
      dispatch(edgeDashboard(access_token));
    }
    if (valid && !bluechip) {
      dispatch(bluechipDashboard(access_token));
    }
    if (valid && !stockgainer) {
      dispatch(stockGainerDashboard(access_token));
    }
    if (valid && !stockgainer) {
      dispatch(stockLosserDashboard(access_token));
    }
    if (message) {
      setNotice(true);
      setTimeout(() => {
        setNotice(false);
      }, 5e3);
    }
  }, [access_token, valid, error, message, bluechip, stockgainer, stocklosser]);
  const [verify, setVerify] = reactExports.useState(email_verified);
  const resendHandler = () => {
    setVerify(true);
    dispatch(resendEmail(access_token));
  };
  const dashboardStartHandler = () => {
    dispatch(startDashboard(access_token));
  };
  const dashboardPriceHandler = () => {
    dispatch(priceDashboard(access_token));
  };
  const dashboardReportHandler = () => {
    dispatch(reportDashboard(access_token));
  };
  const dashboardDividendHandler = () => {
    dispatch(dividendDashboard(access_token));
  };
  const dashboardSectorHandler = () => {
    dispatch(sectorDashboard(access_token));
  };
  const dashboardListHandler = () => {
    dispatch(listDashboard(access_token));
  };
  const dashboardCompanyHandler = () => {
    dispatch(companyDashboard(access_token));
  };
  const bluechipModalHandler = () => {
    setModalBlue(true);
  };
  const edgeModalHandler = () => {
    setModalEdge(true);
  };
  const updateBlueHandler = ({ statement, value }) => {
    if (value && statement === "store") {
      dispatch(bluechipStoreDashboard({ token: access_token, symbol: value }));
      const timeout = setTimeout(() => {
        dispatch(bluechipDashboard(access_token));
      }, 3e3);
      return () => {
        clearTimeout(timeout);
      };
    }
    if (value && statement === "destroy") {
      dispatch(bluechipDestroyDashboard({ token: access_token, symbol: value }));
      const timeout = setTimeout(() => {
        dispatch(bluechipDashboard(access_token));
      }, 3e3);
      return () => {
        clearTimeout(timeout);
      };
    }
  };
  const storeEdgeHandler = ({ symbol, value }) => {
    if (symbol && value) {
      dispatch(
        edgeUpdateDashboard({
          token: access_token,
          symbol,
          edge: value
        })
      );
      const timeout = setTimeout(() => {
        dispatch(edgeDashboard(access_token));
      }, 3e3);
      return () => {
        clearTimeout(timeout);
      };
    }
  };
  const closeModalHandler = () => {
    setModalBlue(false);
    setModalEdge(false);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: valid && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    error && /* @__PURE__ */ jsxRuntimeExports.jsx(Notice, { variant: "alert-warning", children: error, duration: 3e3, show: notice }),
    message && /* @__PURE__ */ jsxRuntimeExports.jsx(Notice, { variant: "alert-success", children: message, duration: 3e3, show: notice }),
    !verify && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "m-2 cursor-pointer hover:animate-pulse", onClick: resendHandler, children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "alert-info", children: "Your email address has not yet been verified. Click to resend your email verification code." }) }),
    loading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-screen h-screen form-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Loader, {}) }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Container, { header: "Fetch External Data", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "py-2 card-rounded-scale grid auto-rows-min sm:grid-cols-2 md:grid-cols-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "has-tooltip", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { class: "tooltip uppercase text-center", children: "Fetch the stock symbol from PSE Edge." }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: dashboardListHandler, className: "btn btn-green", type: "button", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { id: "start" }),
            " Stock Symbol"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "has-tooltip", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { class: "tooltip uppercase text-center", children: "Fetch company identification from PSE Edge." }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: dashboardCompanyHandler, className: "btn btn-orange", type: "button", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { id: "start" }),
            " Stock ID"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "has-tooltip", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { class: "tooltip uppercase text-center", children: "Get the symbol, name, price, volume, and change." }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: dashboardStartHandler, className: "btn btn-red", type: "button", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { id: "start" }),
            " Start"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "has-tooltip", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { class: "tooltip uppercase text-center", children: "Get value, year high and low prices." }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: dashboardPriceHandler, className: "btn btn-blue", type: "button", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { id: "price" }),
            " Price"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "has-tooltip", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { class: "tooltip uppercase text-center", children: "Get income after tax and earnings per share." }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: dashboardReportHandler, className: "btn btn-green", type: "button", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { id: "report" }),
            " Report"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "has-tooltip", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { class: "tooltip uppercase text-center", children: "Get the yearly dividend yield." }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: dashboardDividendHandler, className: "btn btn-emerald", type: "button", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { id: "dividend" }),
            " Dividend"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "has-tooltip", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { class: "tooltip uppercase text-center", children: "Get the sector to which stock belongs." }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: dashboardSectorHandler, className: "btn btn-indigo", type: "button", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { id: "sector" }),
            " Sector"
          ] })
        ] })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Container, { header: "Asset Allocation", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col flex-wrap sm:flex-row justify-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card-rounded-scale text-red-500", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-8 p-2 mb-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "uppercase", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { id: "stock" }),
            " Stock"
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-20", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "uppercase text-center mx-auto text-2xl sm:text-3xl md:text-4xl", children: "1000" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-8 p-2 mb-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "uppercase text-right", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/dashboard/stock-portfolio", children: "more" }) }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card-rounded-scale text-green-500", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-8 p-2 mb-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "uppercase", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { id: "crypto" }),
            " Crypto"
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-20", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "uppercase text-center mx-auto text-2xl sm:text-3xl md:text-4xl", children: "2000" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-8 p-2 mb-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "uppercase text-right", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/dashboard/crypto-portfolio", children: "more" }) }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card-rounded-scale text-blue-500", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-8 p-2 mb-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "uppercase", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { id: "fund" }),
            " Fund"
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-20", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "uppercase text-center mx-auto text-2xl sm:text-3xl md:text-4xl", children: "3000" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-8 p-2 mb-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "uppercase text-right", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/dashboard/stock-fund", children: "more" }) }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card-rounded-scale text-orange-500", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-8 p-2 mb-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "uppercase", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { id: "note" }),
            " Note"
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-20", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "uppercase text-center mx-auto text-2xl sm:text-3xl md:text-4xl", children: "4000" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-8 p-2 mb-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "uppercase text-right", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/dashboard/stock-note", children: "more" }) }) })
        ] })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Container, { header: "Account Information", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid sm:grid-cols-2 auto-rows-min gap-2 h-fit", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-20 sm:row-start-2 card-rounded-scale", children: "Account" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "sm:row-start-3 card-rounded-scale", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-2", children: "Data" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-2 grid auto-rows-min sm:grid-cols-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", className: "btn btn-orange", onClick: bluechipModalHandler, children: "Bluechip Stocks" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", className: "btn btn-emerald", onClick: edgeModalHandler, children: "Set Edge ID" }) })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-48 sm:h-full sm:row-start-2 sm:col-start-2 sm:row-span-2 card-rounded-scale", children: "Doughnut Chart" })
        ] }),
        modalBlue && /* @__PURE__ */ jsxRuntimeExports.jsx(Modal, { children: modalBlueTemplate({
          data: bluechip,
          header: "Bluechip",
          close: closeModalHandler,
          action: updateBlueHandler,
          form: setModalForm,
          shown: modalForm,
          value: modalBlueInput,
          change: modalBlueInputChangeHandler,
          blur: modalBlueInputBlurHandler,
          error: modalBlueInputHasError,
          reset: modalBlueInputInputReset
        }) }),
        modalEdge && /* @__PURE__ */ jsxRuntimeExports.jsx(Modal, { children: modalEdgeTemplate({
          data: edge,
          header: "Stocks",
          close: closeModalHandler,
          action: storeEdgeHandler,
          form: setModalForm,
          shown: modalForm,
          set: setModalIndex,
          index: modalIndex,
          value: modalEdgeInput,
          change: modalEdgeInputChangeHandler,
          blur: modalEdgeInputBlurHandler,
          error: modalEdgeInputHasError,
          reset: modalEdgeInputInputReset
        }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Container, { header: "Philippine Stock Exchange", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid sm:grid-cols-2 auto-rows-min gap-2 h-fit", children: [
        stockLeaderBoard({
          header: "Top Gainers",
          data: stockgainer,
          show: setModalStock
        }),
        stockLeaderBoard({
          header: "Top Lossers",
          data: stocklosser,
          show: setModalStock
        }),
        modalStock && /* @__PURE__ */ jsxRuntimeExports.jsx(Modal, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "form-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-right cursor-pointer", onClick: () => setModalStock(false), children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { id: "close" }),
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "invisible sm:visible", children: "Close" })
        ] }) }) })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Container, { header: "Crypto Currency", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid sm:grid-cols-2 auto-rows-min gap-2 h-fit", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-48 sm:h-full p-2 sm:row-start-2 card-rounded-scale", children: "Top Gainers" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-48 sm:h-full p-2 sm:row-start-2 sm:col-start-2 card-rounded-scale", children: "Top Lossers" })
      ] }) })
    ] })
  ] }) });
};
const Portfolio = () => {
  const [record, setRecord] = reactExports.useState(false);
  const recordHandler = () => {
    setRecord(!record);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border border-blue-500", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "account", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "board", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { id: "portfolio" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "name", children: "Account" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "items", children: "Bar Chart Here!" }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "asset", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "board", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { id: "portfolio" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "name", children: "Hold" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "", children: /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { children: "Hold section" }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "order", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "board", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "items", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "brand", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { id: "trade" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "name", children: "Order" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "record", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { onClick: recordHandler, className: "btn btn-gold-outline", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { id: "add" }),
          " Add"
        ] }) })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "", children: /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { children: "Order form " }) })
    ] })
  ] });
};
const Search = ({ close, items }) => {
  const [search, setSearch] = reactExports.useState();
  const [keyword, setKeyword] = reactExports.useState();
  const searchHandler = () => {
    if (keyword.trim() && items) {
      let find = items.filter((item) => item.symbol.toLowerCase().includes(keyword.toLowerCase()));
      if (find) {
        return setSearch(find);
      }
    }
  };
  const searchChange = (value) => {
    if (value) {
      setKeyword(value);
    } else {
      setKeyword("");
    }
  };
  reactExports.useEffect(() => {
    if (!keyword) {
      setSearch("");
    }
  }, [keyword, search]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col md:flex-row justify-center align-center gap-2 w-full rounded-t-md bg-slate-50", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-2 grow w-full md:w-1/4 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "p-2 block uppercase", htmlFor: "search", children: "Search" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-2 grow w-full md:w-2/4 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        "input",
        {
          className: "p-2 rounded shadow w-full uppercase",
          id: "search",
          name: "search",
          type: "search",
          autoComplete: "off",
          placeholder: "Type stock symbol",
          value: keyword,
          onChange: (e2) => searchChange(e2.target.value)
        }
      ) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-2 grow w-full md:w-1/4 text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { className: "p-2", type: "button", onClick: () => searchHandler(), children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { id: "search" }),
          " Search"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { className: "p-2", type: "button", onClick: () => close(), children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { id: "close" }),
          " Close"
        ] })
      ] })
    ] }),
    search ? search.map((item, index2) => {
      return /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: `p-2 flex flex-col sm:flex-row flex-wrap justify-center align-center gap-2 my-2 w-full bg-slate-50 shadow ${index2 & true ? "rounded-t-md" : "rounded-b-md"}`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grow w-full sm:w-1/2 md:w-1/4 border border-slate-100", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-2 uppercase text-green-500", children: "Edge" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-2 text-center pb-4", children: item.edge })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grow w-full sm:w-1/2 md:w-1/4 border border-slate-100", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-2 uppercase text-green-500", children: "Symbol" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-2 text-center pb-4", children: item.symbol })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grow w-full sm:w-1/2 md:w-1/4 border border-slate-100", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-2 uppercase text-green-500", children: "Price" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-2 text-center pb-4", children: item.price })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grow w-full sm:w-1/2 md:w-1/4 border border-slate-100", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-2 uppercase text-green-500", children: "Value" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-2 text-center pb-4", children: item.value })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grow w-full sm:w-1/2 md:w-1/4 border border-slate-100", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-2 uppercase text-green-500", children: "Price Range" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-2 text-center pb-4", children: item.pricerange })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grow w-full sm:w-1/2 md:w-1/4 border border-slate-100", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-2 uppercase text-green-500", children: "Total Assets" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-2 text-center pb-4", children: item.totalassets })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grow w-full sm:w-1/2 md:w-1/4 border border-slate-100", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-2 uppercase text-green-500", children: "Net Income" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-2 text-center pb-4", children: item.netincomeaftertax })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grow w-full sm:w-1/2 md:w-1/4 border border-slate-100", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-2 uppercase text-green-500", children: "Debt Asset Ratio" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-2 text-center pb-4", children: item.debtassetratio })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grow w-full sm:w-1/2 md:w-1/4 border border-slate-100", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-2 uppercase text-green-500", children: "Dividend Yield" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-2 text-center pb-4", children: item.dividendyield })
            ] })
          ]
        }
      );
    }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "form-center w-full", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "No record found." }) })
  ] });
};
const desktopHeader$1 = /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card grid auto-rows-min grid-cols-9 h-fit rounded-t-md bg-stone-100 uppercase", children: [
  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-green-500", children: "Symbol" }) }),
  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-green-500", children: "Price" }) }),
  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-green-500", children: "Value" }) }),
  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-green-500", children: "Price Range" }) }),
  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-green-500", children: "Total Assets" }) }),
  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-green-500", children: "Net Income" }) }),
  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-green-500", children: "Debt Asset Ratio" }) }),
  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-green-500", children: "Dividend Yield" }) }),
  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-green-500", children: "Action" }) })
] });
const desktopTemplate = ({ item, action, icon, text }) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card grid auto-rows-min grid-cols-9 h-fit border-b border-stone-100 bg-stone-50 hover:text-purple-500", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: `https://edge.pse.com.ph/companyPage/financial_reports_view.do?cmpy_id=${item.edge}`, target: "_blank", children: [
      " ",
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "uppercase", children: item.symbol })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "uppercase", children: item.price }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "uppercase", children: item.value }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "uppercase", children: item.pricerange }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "uppercase", children: item.totalassets }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "uppercase", children: item.netincomeaftertax }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "uppercase", children: item.debtassetratio }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "uppercase", children: item.dividendyield }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-2", onClick: () => action(item.symbol), children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "uppercase hover:text-red-500", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { id: icon }),
      " ",
      text
    ] }) })
  ] });
};
const mobileTemplate = ({ item, action, icon, text }) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-2 card-rounded grid auto-rows-min grid-cols-2 sm:grid-cols-3 md:grid-cols-4 hover:text-purple-500", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "p-2 rounded-t-md bg-stone-100 border-b border-stone-100 text-green-500", children: "Symbol" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "pt-2 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "a",
        {
          href: `https://edge.pse.com.ph/companyPage/financial_reports_view.do?cmpy_id=${item.edge}`,
          target: "_blank",
          children: [
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "uppercase", children: item.symbol })
          ]
        }
      ) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "p-2 rounded-t-md bg-stone-100 border-b border-stone-100 text-green-500", children: "Price" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "pt-2 text-center", children: item.price })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "p-2 rounded-t-md bg-stone-100 border-b border-stone-100 text-green-500", children: "Value" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "pt-2 text-center", children: item.value })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "p-2 rounded-t-md bg-stone-100 border-b border-stone-100 text-green-500", children: "Price Range" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "pt-2 text-center", children: item.pricerange })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "p-2 rounded-t-md bg-stone-100 border-b border-stone-100 text-green-500", children: "Total Assets" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "pt-2 text-center", children: item.totalassets })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "p-2 rounded-t-md bg-stone-100 border-b border-stone-100 text-green-500", children: "Net Income" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "pt-2 text-center", children: item.netincomeaftertax })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "p-2 rounded-t-md bg-stone-100 border-b border-stone-100 text-green-500", children: "Debt Asset Ratio" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "pt-2 text-center", children: item.debtassetratio })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "p-2 rounded-t-md bg-stone-100 border-b border-stone-100 text-green-500", children: "Dividend Yield" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "pt-2 text-center", children: item.dividendyield })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-2 col-span-2 sm:col-span-3 md:col-span-4 text-center", onClick: () => action(item.symbol), children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "p-2 rounded-t-md bg-stone-100 border-b border-stone-100 text-green-500", children: "Action" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "uppercase pt-2 hover:text-red-500", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { id: icon }),
        " ",
        text
      ] })
    ] })
  ] });
};
const paginationTemplate = ({ index: index2, turn }) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "button",
    {
      className: "p-2 hover:bg-slate-100 text-[.75rem] hover:text-green-500",
      type: "button",
      onClick: () => {
        turn(index2);
      },
      children: index2 + 1
    }
  );
};
const desktopModalTemplate = ({ item, action, close, icon, text }) => {
  const modalContainerHeader = (item2) => {
    let modalHeader2 = "";
    let modalIcon2 = "";
    switch (item2) {
      case "holdingfirms":
        modalHeader2 = "Holding Firms";
        modalIcon2 = "holding";
        break;
      case "services":
        modalHeader2 = "Services";
        modalIcon2 = "service";
        break;
      case "industrials":
        modalHeader2 = "Industrials";
        modalIcon2 = "industrial";
        break;
      case "properties":
        modalHeader2 = "Properties";
        modalIcon2 = "property";
        break;
      case "miningandoils":
        modalHeader2 = "Mining And Oils";
        modalIcon2 = "mining";
        break;
      case "financials":
        modalHeader2 = "Financials";
        modalIcon2 = "financial";
        break;
      case "smallmediumemergingboards":
        modalHeader2 = "Small Medium Emrging Boards";
        modalIcon2 = "board";
        break;
      case "exchangetradedfunds":
        modalHeader2 = "Exchange Traded Funds";
        modalIcon2 = "exchange";
        break;
      default:
        modalHeader2 = "Holding Firms";
        modalIcon2 = "holding";
        break;
    }
    return { modalHeader: modalHeader2, modalIcon: modalIcon2 };
  };
  const { modalHeader, modalIcon } = modalContainerHeader(item[0]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-row justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "uppercase", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { id: modalIcon }),
        " ",
        modalHeader
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "uppercase cursor-pointer", onClick: close, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { id: "close" }),
        " Close"
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid auto-rows-min grid-cols-9 h-fit rounded-t-md bg-stone-100 uppercase", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-green-500", children: "Symbol" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-green-500", children: "Price" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-green-500", children: "Value" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-green-500", children: "Price Range" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-green-500", children: "Total Assets" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-green-500", children: "Net Income" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-green-500", children: "Debt Asset Ratio" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-green-500", children: "Dividend Yield" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-green-500", children: "Action" }) })
      ] }),
      item && item[1].map((item2, index2) => {
        return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid auto-rows-min grid-cols-9 h-fit border-b border-stone-100 bg-stone-50 hover:text-purple-500", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "a",
            {
              href: `https://edge.pse.com.ph/companyPage/financial_reports_view.do?cmpy_id=${item2.edge}`,
              target: "_blank",
              children: [
                " ",
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "uppercase", children: item2.symbol })
              ]
            }
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "p-0", children: item2.price }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "p-0", children: item2.value }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "p-0", children: item2.pricerange }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "p-0", children: item2.totalassets }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "p-0", children: item2.netincomeaftertax }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "p-0", children: item2.debtassetratio }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "p-0", children: item2.dividendyield }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-2 ", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              className: "uppercase border border-stone-100 hover:text-green-500",
              onClick: () => {
                action(item2.symbol);
              },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { id: icon }),
                " ",
                text
              ]
            }
          ) })
        ] });
      })
    ] })
  ] });
};
const mobileModalTemplate = ({ item, action, close, icon, text }) => {
  const modalContainerHeader = (item2) => {
    let modalHeader2 = "";
    let modalIcon2 = "";
    switch (item2) {
      case "holdingfirms":
        modalHeader2 = "Holding Firms";
        modalIcon2 = "holding";
        break;
      case "services":
        modalHeader2 = "Services";
        modalIcon2 = "service";
        break;
      case "industrials":
        modalHeader2 = "Industrials";
        modalIcon2 = "industrial";
        break;
      case "properties":
        modalHeader2 = "Properties";
        modalIcon2 = "property";
        break;
      case "miningandoils":
        modalHeader2 = "Mining And Oils";
        modalIcon2 = "mining";
        break;
      case "financials":
        modalHeader2 = "Financials";
        modalIcon2 = "financial";
        break;
      case "smallmediumemergingboards":
        modalHeader2 = "Small Medium Emrging Boards";
        modalIcon2 = "board";
        break;
      case "exchangetradedfunds":
        modalHeader2 = "Exchange Traded Funds";
        modalIcon2 = "exchange";
        break;
      default:
        modalHeader2 = "Holding Firms";
        modalIcon2 = "holding";
        break;
    }
    return { modalHeader: modalHeader2, modalIcon: modalIcon2 };
  };
  const { modalHeader, modalIcon } = modalContainerHeader(item[0]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-row justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "p-0 uppercase", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { id: modalIcon }),
        " ",
        modalHeader
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "uppercase cursor-pointer", onClick: close, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { id: "close" }),
        " Close"
      ] })
    ] }) }),
    item && item[1].map((item2, index2) => {
      return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "m-2 card-rounded grid auto-rows-min grid-cols-2 sm:grid-cols-3 md:grid-cols-4 uppercase", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "block p-2 rounded-t-md bg-stone-100 border-b border-stone-100 text-green-500", children: "Symbol" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "block pt-2 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "a",
            {
              href: `https://edge.pse.com.ph/companyPage/financial_reports_view.do?cmpy_id=${item2.edge}`,
              target: "_blank",
              children: [
                " ",
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "uppercase", children: item2.symbol })
              ]
            }
          ) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "block p-2 rounded-t-md bg-stone-100 border-b border-stone-100 text-green-500", children: "Price" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "block pt-2 text-center", children: item2.price })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "block p-2 rounded-t-md bg-stone-100 border-b border-stone-100 text-green-500", children: "Value" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "block pt-2 text-center", children: item2.value })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "block p-2 rounded-t-md bg-stone-100 border-b border-stone-100 text-green-500", children: "Price Range" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "block pt-2 text-center", children: item2.pricerange })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "block p-2 rounded-t-md bg-stone-100 border-b border-stone-100 text-green-500", children: "Total Assets" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "block pt-2 text-center", children: item2.totalassets })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "block p-2 rounded-t-md bg-stone-100 border-b border-stone-100 text-green-500", children: "Net Income" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "block pt-2 text-center", children: item2.netincomeaftertax })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "block p-2 rounded-t-md bg-stone-100 border-b border-stone-100 text-green-500", children: "Debt Asset Ratio" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "block pt-2 text-center", children: item2.debtassetratio })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "block p-2 rounded-t-md bg-stone-100 border-b border-stone-100 text-green-500", children: "Dividend Yield" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "block pt-2 text-center", children: item2.dividendyield })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-2 col-span-2 sm:col-span-3 md:col-span-4 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            className: "uppercase border border-stone-100 hover:text-purple-500",
            onClick: () => {
              action(item2.symbol);
            },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { id: icon }),
              " ",
              text
            ]
          }
        ) })
      ] });
    })
  ] });
};
const buildWatchlist = (token) => async (dispatch) => {
  try {
    dispatch({ type: WATCHLIST_BUILD_REQUEST });
    const { data } = await axios$2({
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      method: "GET",
      url: "/api/stock-watchlist-retrieve",
      params: { section: "build" }
    });
    let stocks = data.stocks;
    let message = data.message;
    dispatch({
      type: MESSAGE_SHOW_SUCCESS,
      payload: message
    });
    dispatch({ type: WATCHLIST_BUILD_SUCCESS, payload: stocks });
    if (stocks) {
      localStorage.setItem("watchlistBuild", JSON.stringify(stocks));
    }
  } catch (error) {
    dispatch({
      type: WATCHLIST_BUILD_FAILURE,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message
    });
    dispatch({
      type: MESSAGE_SHOW_FAILURE,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message
    });
  }
};
const storeWatchlist = (token, input) => async (dispatch) => {
  try {
    dispatch({ type: WATCHLIST_STORE_REQUEST });
    const { data } = await axios$2({
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      method: "POST",
      url: "/api/stock-watchlist-store",
      params: { section: "store", symbol: input }
    });
    let message = data.message;
    dispatch({
      type: MESSAGE_SHOW_SUCCESS,
      payload: message
    });
    dispatch({ type: WATCHLIST_STORE_SUCCESS, payload: message });
  } catch (error) {
    dispatch({
      type: WATCHLIST_STORE_FAILURE,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message
    });
    dispatch({
      type: MESSAGE_SHOW_FAILURE,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message
    });
  }
};
const fetchWatchlist = (token) => async (dispatch) => {
  try {
    dispatch({ type: WATCHLIST_FETCH_REQUEST });
    const { data } = await axios$2({
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      method: "GET",
      url: "/api/stock-watchlist-retrieve",
      params: { section: "fetch" }
    });
    let stocks = data.stocks;
    let message = data.message;
    dispatch({
      type: MESSAGE_SHOW_SUCCESS,
      payload: message
    });
    dispatch({ type: WATCHLIST_FETCH_SUCCESS, payload: stocks });
    if (stocks) {
      localStorage.setItem("watchlistFetch", JSON.stringify(stocks));
    }
  } catch (error) {
    dispatch({
      type: WATCHLIST_FETCH_FAILURE,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message
    });
    dispatch({
      type: MESSAGE_SHOW_FAILURE,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message
    });
  }
};
const destroyWatchlist = (token, input) => async (dispatch) => {
  try {
    dispatch({ type: WATCHLIST_DESTROY_REQUEST });
    const { data } = await axios$2({
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      method: "POST",
      url: "/api/stock-watchlist-store",
      params: { section: "destroy", symbol: input }
    });
    let message = data.message;
    dispatch({
      type: MESSAGE_SHOW_SUCCESS,
      payload: message
    });
    dispatch({ type: WATCHLIST_DESTROY_SUCCESS, payload: message });
  } catch (error) {
    dispatch({
      type: WATCHLIST_DESTROY_FAILURE,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message
    });
    dispatch({
      type: MESSAGE_SHOW_FAILURE,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message
    });
  }
};
const Watchlist = () => {
  const [modalBuild, setModalBuild] = reactExports.useState(false);
  const [modalSearch, setModalSearch] = reactExports.useState(false);
  const [notice, setNotice] = reactExports.useState(false);
  const userLogin = useSelector((state) => state.userLogin);
  const { access_token } = userLogin;
  const userToken = useSelector((state) => state.userToken);
  const { valid } = userToken;
  const watchlistBuild = useSelector((state) => state.watchlistBuild);
  const { loading: loadBuild, watchbuild } = watchlistBuild;
  const watchlistFetch = useSelector((state) => state.watchlistFetch);
  const { loading: loadFetch, watchlist } = watchlistFetch;
  const showMessage = useSelector((state) => state.showMessage);
  const { message, error } = showMessage;
  const { isMobile } = useScreen();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const showModalBuildHandler = () => {
    setModalBuild(true);
  };
  const showModalSearchHandler = () => {
    setModalSearch(true);
  };
  const closeModalHandler = () => {
    setModalBuild(false);
    setModalSearch(false);
    const timeout = setTimeout(() => {
      dispatch(fetchWatchlist(access_token));
    }, 3e3);
    return () => {
      clearTimeout(timeout);
    };
  };
  const storeHandler = (symbol) => {
    dispatch(storeWatchlist(access_token, symbol));
  };
  const deleteHandler = (symbol) => {
    dispatch(destroyWatchlist(access_token, symbol));
    const timeout = setTimeout(() => {
      dispatch(fetchWatchlist(access_token));
    }, 3e3);
    return () => {
      clearTimeout(timeout);
    };
  };
  reactExports.useEffect(() => {
    if (!valid && access_token) {
      dispatch(tokenUser(access_token));
    }
    if (valid && access_token) {
      navigate("/dashboard/stock-watchlist");
    } else {
      navigate("/auth/login");
    }
    if (valid && !watchbuild) {
      dispatch(buildWatchlist(access_token));
    }
    if (valid && !watchlist) {
      dispatch(fetchWatchlist(access_token));
    }
    if (message) {
      setNotice(true);
      setTimeout(() => {
        setNotice(false);
      }, 3e3);
    }
  }, [access_token, valid, watchbuild, watchlist, message]);
  const containerWatchlistHeader = /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-row justify-between", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { clasName: "block p-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { id: "trade" }),
      " Watchlist"
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "block p-2 cursor-pointer -mt-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "mr-4", onClick: showModalSearchHandler, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { id: "search" }),
        " Search"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { onClick: showModalBuildHandler, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { id: "build" }),
        " Build"
      ] })
    ] })
  ] });
  const containerReminderHeader = /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { clasName: "block p-2", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { id: "support" }),
    " Reminder"
  ] });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    error && /* @__PURE__ */ jsxRuntimeExports.jsx(Notice, { variant: "alert-warning", children: error, duration: 3e3, show: notice }),
    message && /* @__PURE__ */ jsxRuntimeExports.jsx(Notice, { variant: "alert-success", children: message, duration: 3e3, show: notice }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Container, { header: containerReminderHeader, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-t-md bg-slate-50 cursor-pointer", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-2 border-b border-slate-100 hover:text-purple-500", children: "Debt Asset Ratio - Always try to find a company to invest which has debt equity ratio of less than one." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-2 border-b border-slate-100 hover:text-purple-500", children: "Price Range - Year low minus year high, when the range is getting near to zero or even turning positive, it indicates that the price is going down and that it is a good idea to add to your stack." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-2 border-b border-slate-100 hover:text-purple-500", children: "Total Assets - Total assets less total assets previously held If it's negative, either the company is having a cash flow problem or it's having a bad year." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-2 hover:text-purple-500", children: "Dividend Yield - Is the amount of money a company pays shareholders for owning a share of its stock divided by its current stock price." })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Container, { header: containerWatchlistHeader, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid auto-rows-min h-fit rounded", children: isMobile ? modalBuild && /* @__PURE__ */ jsxRuntimeExports.jsx(Modal, { children: loadBuild ? /* @__PURE__ */ jsxRuntimeExports.jsx(Loader, {}) : watchbuild && Object.entries(watchbuild).map((item) => {
        return mobileModalTemplate({
          item,
          text: "add",
          icon: "add",
          close: closeModalHandler,
          action: storeHandler
        });
      }) }) : modalBuild && /* @__PURE__ */ jsxRuntimeExports.jsx(Modal, { children: loadBuild ? /* @__PURE__ */ jsxRuntimeExports.jsx(Loader, {}) : watchbuild && Object.entries(watchbuild).map((item) => {
        return desktopModalTemplate({
          item,
          text: "add",
          icon: "add",
          close: closeModalHandler,
          action: storeHandler
        });
      }) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid auto-rows-min h-fit rounded", children: modalSearch && /* @__PURE__ */ jsxRuntimeExports.jsx(Modal, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { close: closeModalHandler, items: watchlist }) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid auto-rows-min h-fit rounded", children: isMobile ? loadFetch ? /* @__PURE__ */ jsxRuntimeExports.jsx(Loader, {}) : /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: watchlist && watchlist.map((item) => {
        return mobileTemplate({
          item,
          text: "del",
          icon: "destroy",
          action: deleteHandler
        });
      }) }) : loadFetch ? /* @__PURE__ */ jsxRuntimeExports.jsx(Loader, {}) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        desktopHeader$1,
        watchlist && watchlist.map((item) => {
          return desktopTemplate({
            item,
            text: "del",
            icon: "destroy",
            action: deleteHandler
          });
        })
      ] }) })
    ] })
  ] });
};
const bluechipTrade = (token) => async (dispatch) => {
  try {
    dispatch({ type: TRADE_BLUECHIP_REQUEST });
    const { data } = await axios$2({
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      method: "GET",
      url: "/api/stock-trade-retrieve",
      params: { section: "bluechip" }
    });
    let stocks = data.stocks;
    let message = data.message;
    dispatch({
      type: MESSAGE_SHOW_SUCCESS,
      payload: message
    });
    dispatch({ type: TRADE_BLUECHIP_SUCCESS, payload: stocks });
    if (stocks) {
      localStorage.setItem("tradeBluechip", JSON.stringify(stocks));
    }
  } catch (error) {
    dispatch({
      type: TRADE_BLUECHIP_FAILURE,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message
    });
    dispatch({
      type: MESSAGE_SHOW_FAILURE,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message
    });
  }
};
const commonTrade = (token) => async (dispatch) => {
  try {
    dispatch({ type: TRADE_COMMON_REQUEST });
    const { data } = await axios$2({
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      method: "GET",
      url: "/api/stock-trade-retrieve",
      params: { section: "common" }
    });
    let stocks = data.stocks;
    let message = data.message;
    dispatch({
      type: MESSAGE_SHOW_SUCCESS,
      payload: message
    });
    dispatch({ type: TRADE_COMMON_SUCCESS, payload: stocks });
    if (stocks) {
      localStorage.setItem("tradeCommon", JSON.stringify(stocks));
    }
  } catch (error) {
    dispatch({
      type: TRADE_COMMON_FAILURE,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message
    });
    dispatch({
      type: MESSAGE_SHOW_FAILURE,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message
    });
  }
};
const storeTrade = (token, input) => async (dispatch) => {
  try {
    dispatch({ type: TRADE_STORE_REQUEST });
    const { data } = await axios$2({
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      method: "POST",
      url: "/api/stock-watchlist-store",
      params: { section: "store", symbol: input }
    });
    let message = data.message;
    dispatch({
      type: MESSAGE_SHOW_SUCCESS,
      payload: message
    });
    dispatch({ type: TRADE_STORE_SUCCESS, payload: message });
  } catch (error) {
    dispatch({
      type: TRADE_STORE_FAILURE,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message
    });
    dispatch({
      type: MESSAGE_SHOW_FAILURE,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message
    });
  }
};
const Trade = () => {
  const userLogin = useSelector((state) => state.userLogin);
  const { access_token } = userLogin;
  const userToken = useSelector((state) => state.userToken);
  const { valid } = userToken;
  const tradeBluechip = useSelector((state) => state.tradeBluechip);
  const { loading: loadBlue, bluechip } = tradeBluechip;
  const tradeCommon = useSelector((state) => state.tradeCommon);
  const { loading: loadCommon, common } = tradeCommon;
  const showMessage = useSelector((state) => state.showMessage);
  const { message, error } = showMessage;
  const { isMobile } = useScreen();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [bluechipChunks, setBluechipChunks] = reactExports.useState();
  const [bluechipIndex, setBluechipIndex] = reactExports.useState();
  const [bluechipChunk, setBluechipChunk] = reactExports.useState();
  const [commonChunks, setCommonChunks] = reactExports.useState();
  const [commonIndex, setCommonIndex] = reactExports.useState();
  const [commonChunk, setCommonChunk] = reactExports.useState();
  const [notice, setNotice] = reactExports.useState(false);
  const [modalSearchBluechip, setModalSearchBluechip] = reactExports.useState(false);
  const [modalSearchCommon, setModalSearchCommon] = reactExports.useState(false);
  reactExports.useEffect(() => {
    if (!valid && access_token) {
      dispatch(tokenUser(access_token));
    }
    if (valid && access_token) {
      navigate("/dashboard/stock-trade");
    } else {
      navigate("/auth/login");
    }
    if (valid && !bluechip) {
      dispatch(bluechipTrade(access_token));
    }
    if (valid && !common) {
      dispatch(commonTrade(access_token));
    }
    if (valid && bluechip) {
      const { pages: bluechipPages, chunks: bluechipChunks2 } = chunkObject({
        divide: 10,
        data: bluechip
      });
      setBluechipChunks(bluechipChunks2);
      setBluechipIndex(bluechipPages);
    }
    if (valid && common) {
      const { pages: commonPages, chunks: commonChunks2 } = chunkObject({
        divide: 10,
        data: common
      });
      setCommonChunks(commonChunks2);
      setCommonIndex(commonPages);
    }
    if (message) {
      setNotice(true);
      setTimeout(() => {
        setNotice(false);
      }, 3e3);
    }
  }, [access_token, valid, bluechip, common, message]);
  const commonHandler = (index2) => {
    setCommonChunk(commonChunks[index2]);
  };
  const bluechipHandler = (index2) => {
    setBluechipChunk(bluechipChunks[index2]);
  };
  const storeHandler = (symbol) => {
    dispatch(storeTrade(access_token, symbol));
    const timeout = setTimeout(() => {
      dispatch(bluechipTrade(access_token));
      dispatch(commonTrade(access_token));
    }, 3e3);
    return () => {
      clearTimeout(timeout);
    };
  };
  const showModalSearchBluechipHandler = () => {
    setModalSearchBluechip(true);
  };
  const showModalSearchCommonHandler = () => {
    setModalSearchCommon(true);
  };
  const closeModalHandler = () => {
    setModalSearchBluechip(false);
    setModalSearchCommon(false);
  };
  const containerBluechipHeader = /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-row flex-wrap justify-between align-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-0", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { id: "trade" }),
      " Bluechip Stocks"
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-0", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "p-2", onClick: showModalSearchBluechipHandler, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { id: "search" }),
      " Search"
    ] }) })
  ] });
  const containerCommonHeader = /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-row flex-wrap justify-between align-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-0", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { id: "trade" }),
      " Common Stocks"
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-0", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "p-2", onClick: showModalSearchCommonHandler, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { id: "search" }),
      " Search"
    ] }) })
  ] });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    error && /* @__PURE__ */ jsxRuntimeExports.jsx(Notice, { variant: "alert-warning", children: error, duration: 3e3, show: notice }),
    message && /* @__PURE__ */ jsxRuntimeExports.jsx(Notice, { variant: "alert-success", children: message, duration: 3e3, show: notice }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Container, { header: containerBluechipHeader, children: [
      isMobile ? loadBlue ? /* @__PURE__ */ jsxRuntimeExports.jsx(Loader, {}) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        bluechipChunk && bluechipChunk ? /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: bluechipChunk.map((item) => {
          return mobileTemplate({
            item,
            action: storeHandler,
            text: "add",
            icon: "add"
          });
        }) }) : bluechipChunks && /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: bluechipChunks[0].map((item) => {
          return mobileTemplate({
            item,
            action: storeHandler,
            text: "add",
            icon: "add"
          });
        }) }),
        bluechipIndex && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid auto-rows-min h-fit text-right border border-slate-50 bg-slate-100 shadow rounded m-1", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { clasName: "flex flex-row gap-1 m-1", children: bluechipIndex.map((item, index2) => {
          return paginationTemplate({
            index: index2,
            turn: bluechipHandler
          });
        }) }) })
      ] }) : loadBlue ? /* @__PURE__ */ jsxRuntimeExports.jsx(Loader, {}) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        bluechipChunk && bluechipChunk ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          desktopHeader$1,
          bluechipChunk.map((item) => {
            return desktopTemplate({
              item,
              action: storeHandler,
              text: "add",
              icon: "add"
            });
          })
        ] }) : bluechipChunks && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          desktopHeader$1,
          bluechipChunks[0].map((item) => {
            return desktopTemplate({
              item,
              action: storeHandler,
              text: "add",
              icon: "add"
            });
          })
        ] }),
        bluechipIndex && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "card grid auto-rows-min col-span-8 h-fit border-b border-stone-100 bg-stone-50 text-right", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { clasName: "flex flex-row gap-2 m-2", children: bluechipIndex.map((item, index2) => {
          return paginationTemplate({
            index: index2,
            turn: bluechipHandler
          });
        }) }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid auto-rows-min h-fit rounded", children: modalSearchBluechip && /* @__PURE__ */ jsxRuntimeExports.jsx(Modal, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { close: closeModalHandler, items: bluechip }) }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Container, { header: containerCommonHeader, children: [
      isMobile ? loadCommon ? /* @__PURE__ */ jsxRuntimeExports.jsx(Loader, {}) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        commonChunk && commonChunk ? /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: commonChunk.map((item) => {
          return mobileTemplate({
            item,
            action: storeHandler,
            text: "add",
            icon: "add"
          });
        }) }) : commonChunks && /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: commonChunks[0].map((item) => {
          return mobileTemplate({
            item,
            action: storeHandler,
            text: "add",
            icon: "add"
          });
        }) }),
        commonIndex && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid auto-rows-min h-fit text-right border border-slate-50 bg-slate-100 shadow rounded m-1", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { clasName: "flex flex-row gap-1 m-1", children: commonIndex.map((item, index2) => {
          return paginationTemplate({
            index: index2,
            turn: commonHandler
          });
        }) }) })
      ] }) : loadCommon ? /* @__PURE__ */ jsxRuntimeExports.jsx(Loader, {}) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        commonChunk && commonChunk ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          desktopHeader$1,
          commonChunk.map((item) => {
            return desktopTemplate({
              item,
              action: storeHandler,
              text: "add",
              icon: "add"
            });
          })
        ] }) : commonChunks && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          desktopHeader$1,
          commonChunks[0].map((item) => {
            return desktopTemplate({
              item,
              action: storeHandler,
              text: "add",
              icon: "add"
            });
          })
        ] }),
        commonIndex && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "card grid auto-rows-min col-span-8 h-fit border-b border-stone-100 bg-stone-50 text-right", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { clasName: "flex flex-row gap-2 m-2", children: commonIndex.map((item, index2) => {
          return paginationTemplate({
            index: index2,
            turn: commonHandler
          });
        }) }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid auto-rows-min h-fit rounded", children: modalSearchCommon && /* @__PURE__ */ jsxRuntimeExports.jsx(Modal, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { close: closeModalHandler, items: common }) }) })
    ] })
  ] });
};
const desktopHeader = ({ items }) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid auto-rows-min grid-cols-9 h-fit rounded-t-md bg-stone-100 uppercase border-b border-stone-200", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-2 col-span-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-row flex-wrap justify-between h-full", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grow m-auto w-1/3", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-center text-green-500", children: "Symbol" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grow m-auto w-1/3", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-center text-green-500", children: "Price" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grow m-auto w-1/3", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-center text-green-500", children: "Volume" }) })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-2 col-span-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid auto-rows-min", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-row flex-wrap justify-between h-full", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grow m-auto w-1/3", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-center text-green-500", children: "Short" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grow m-auto w-1/3", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-center text-green-500", children: "Medium" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grow m-auto w-1/3", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-center text-green-500", children: "Long" }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-row flex-wrap justify-between h-full", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grow m-auto w-1/6", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-center text-purple-500 text-[.50rem]", children: "Price" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grow m-auto w-1/6", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-center text-purple-500 text-[.50rem]", children: "Volume" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grow m-auto w-1/6", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-center text-purple-500 text-[.50rem]", children: "Price" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grow m-auto w-1/6", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-center text-purple-500 text-[.50rem]", children: "Volume" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grow m-auto w-1/6", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-center text-purple-500 text-[.50rem]", children: "Price" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grow m-auto w-1/6", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-center text-purple-500 text-[.50rem]", children: "Volume" }) })
        ] })
      ] }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid auto-rows-min grid-cols-9 h-fit bg-stone-100", children: items != 0 && items ? items.map((item, key) => {
      return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "py-2 w-1/6 text-center", children: "Test 1" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "py-2 w-1/6 text-center", children: "Test 2" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "py-2 w-1/6 text-center", children: "Test 3" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "py-2 w-1/6 text-center", children: "Test 4" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "py-2 w-1/6 text-center", children: "Test 5" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "py-2 w-1/6 text-center", children: "Test 6" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "py-2 w-1/6 text-center", children: "Test 7" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "py-2 w-1/6 text-center", children: "Test 8" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "py-2 w-1/6 text-center", children: "Test 9" })
      ] });
    }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "form-center col-span-9", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "No record found." }) }) })
  ] });
};
const desktopModalContent = ({ header, close, action, disabled, items }) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid auto-rows-min h-fit rounded-t-md bg-stone-100 my-2", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-2 flex flex-row justify-between border-b border-stone-200", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "text-base uppercase", children: [
        header,
        " Fetch Moving Average"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "sm:pl-2 cursor-pointer", onClick: close, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { id: "close" }),
        " ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "invisible sm:visible", children: "Close" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-2 flex flex-row items-center justify-center border-b border-stone-200 w-full hover:text-purple-500", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-4/12", children: "Index" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-4/12", children: "Symbol" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-4/12", children: "Action" })
    ] }),
    items != 0 && items ? items.map((item, index2) => {
      return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-2 flex flex-row items-center justify-center border-b border-stone-200 w-full hover:text-purple-500", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-4/12", children: index2 }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-4/12", children: item.symbol }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-4/12", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            className: "uppercase cursor-pointer",
            onClick: () => {
              action({ symbol: item.symbol });
            },
            disabled,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { id: "submit" }),
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "invisible sm:visible", children: "Submit" })
            ]
          }
        ) })
      ] });
    }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "form-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "No record found." }) })
  ] });
};
const watchlistChart = (token) => async (dispatch) => {
  try {
    dispatch({ type: CHART_WATCHLIST_REQUEST });
    const { data } = await axios({
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      method: "GET",
      url: "/api/stock-chart-retrieve",
      params: { section: "build", table: "watchlist", statement: "select" }
    });
    let stocks = data.stocks;
    let message = data.message;
    dispatch({
      type: MESSAGE_SHOW_SUCCESS,
      payload: message
    });
    dispatch({ type: CHART_WATCHLIST_SUCCESS, payload: stocks });
    if (stocks) {
      localStorage.setItem("chartWatchlist", JSON.stringify(stocks));
    }
  } catch (error) {
    dispatch({
      type: CHART_WATCHLIST_FAILURE,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message
    });
    dispatch({
      type: MESSAGE_SHOW_FAILURE,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message
    });
  }
};
const StockChart = () => {
  const [modalSearch, setModalSearch] = reactExports.useState(false);
  const [modalBuild, setModalBuild] = reactExports.useState(false);
  const [disabled, setDisabled] = reactExports.useState(false);
  const userLogin = useSelector((state) => state.userLogin);
  const { access_token } = userLogin;
  const userToken = useSelector((state) => state.userToken);
  const { valid } = userToken;
  const chartWatchlist = useSelector((state) => state.chartWatchlist);
  const { watchbuild } = chartWatchlist;
  useSelector((state) => state.showMessage);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const showModalSearchHandler = () => {
    setModalSearch(true);
  };
  const showModalBuildHandler = () => {
    setModalBuild(true);
  };
  const closeModalHandler = () => {
    setModalSearch(false);
    setModalBuild(false);
  };
  reactExports.useEffect(() => {
    if (!valid && access_token) {
      dispatch(tokenUser(access_token));
    }
    if (valid && access_token) {
      navigate("/dashboard/stock-chart");
    } else {
      navigate("/auth/login");
    }
    if (valid && !watchbuild) {
      dispatch(watchlistChart(access_token));
    }
  }, [access_token, valid, disabled, watchbuild]);
  const storeHandler = ({ symbol }) => {
    console.log(symbol);
    setDisabled(true);
  };
  const containerChartHeader = /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-row justify-between", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { clasName: "block p-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { id: "trade" }),
      " Chart"
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "block p-2 cursor-pointer -mt-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "mr-4", onClick: showModalSearchHandler, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { id: "search" }),
        " Search"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "mr-4", onClick: showModalBuildHandler, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { id: "build" }),
        " Build"
      ] })
    ] })
  ] });
  return /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Container, { header: containerChartHeader, children: [
    desktopHeader({ items: [] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid auto-rows-min h-fit rounded", children: modalSearch && /* @__PURE__ */ jsxRuntimeExports.jsx(Modal, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { close: closeModalHandler }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid auto-rows-min h-fit rounded gap-2", children: modalBuild && /* @__PURE__ */ jsxRuntimeExports.jsxs(Modal, { children: [
      desktopModalContent({
        header: "Watchlist",
        close: closeModalHandler,
        action: storeHandler,
        disabled,
        items: watchbuild
      }),
      desktopModalContent({
        header: "Bluechip",
        close: closeModalHandler,
        action: storeHandler,
        disabled,
        items: []
      })
    ] }) })
  ] }) });
};
const CryptoPortfolio = () => {
  const [addRecord, setAddRecord] = reactExports.useState(false);
  const addRecordHandler = () => {
    setAddRecord(!addRecord);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { id: "crypto-portfolio", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "asset", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "board", children: "Assets" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "content", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "items color", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "item", children: "Item 1" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "item", children: "Item 2" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "item", children: "Item 3" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "item", children: "Item 4" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "items", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "item", children: "Item 1" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "item", children: "Item 2" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "item", children: "Item 3" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "item", children: "Item 4" })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "fund", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "board", children: "Fund" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "content", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "items color", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "item", children: "Item 1" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "item", children: "Item 2" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "items", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "item", children: "Item 1" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "item", children: "Item 2" })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "order", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "board", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "items", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "name", children: "Order" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "record", children: /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: addRecordHandler, className: "add", type: "button", children: "Add Record" }) })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "content", children: [
        addRecord && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "items", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "item", children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", {}) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "item", children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", {}) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "item", children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", {}) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "item", children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", {}) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "item", children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", {}) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "item", children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", {}) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "item", children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", {}) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "item", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", children: "Submit" }),
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", children: "Cancel" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "items color", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "item", children: "Item 1" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "item", children: "Item 2" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "item", children: "Item 3" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "item", children: "Item 4" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "item", children: "Item 5" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "item", children: "Item 6" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "item", children: "Item 7" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "item", children: "Item 8" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "items", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "item", children: "Item 1" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "item", children: "Item 2" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "item", children: "Item 3" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "item", children: "Item 4" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "item", children: "Item 5" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "item", children: "Item 6" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "item", children: "Item 7" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "item", children: "Item 8" })
        ] })
      ] })
    ] })
  ] });
};
const CryptoScreen = () => {
  const [addRecord, setAddRecord] = reactExports.useState(false);
  const addRecordHandler = () => {
    setAddRecord(!addRecord);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { id: "crypto-screen", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "screen", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "board", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "items", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "name", children: "Screen" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "record", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: addRecordHandler,
          className: "add",
          type: "button",
          children: "Add Record"
        }
      ) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "content", children: [
      addRecord && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "items", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "item", children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", {}) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "item", children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", {}) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "item", children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", {}) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "item", children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", {}) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "item", children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", {}) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "item", children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", {}) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "item", children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", {}) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "item", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", children: "Submit" }),
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", children: "Cancel" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "items color", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "item", children: "Item 1" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "item", children: "Item 2" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "item", children: "Item 3" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "item", children: "Item 4" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "item", children: "Item 5" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "item", children: "Item 6" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "item", children: "Item 7" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "items", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "item", children: "Item 1" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "item", children: "Item 2" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "item", children: "Item 3" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "item", children: "Item 4" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "item", children: "Item 5" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "item", children: "Item 6" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "item", children: "Item 7" })
      ] })
    ] })
  ] }) });
};
const CryptoMoon = () => {
  const [addRecord, setAddRecord] = reactExports.useState(false);
  const addRecordHandler = () => {
    setAddRecord(!addRecord);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { id: "crypto-moon", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "moon", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "board", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "items", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "name", children: "Moon" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "record", children: /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: addRecordHandler, className: "add", type: "button", children: "Add Record" }) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "content", children: [
      addRecord && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "items", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "item", children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", {}) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "item", children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", {}) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "item", children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", {}) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "item", children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", {}) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "item", children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", {}) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "item", children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", {}) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "item", children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", {}) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "item", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", children: "Submit" }),
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", children: "Cancel" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "items color", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "item", children: "Item 1" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "item", children: "Item 2" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "item", children: "Item 3" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "item", children: "Item 4" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "item", children: "Item 5" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "item", children: "Item 6" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "item", children: "Item 7" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "items", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "item", children: "Item 1" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "item", children: "Item 2" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "item", children: "Item 3" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "item", children: "Item 4" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "item", children: "Item 5" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "item", children: "Item 6" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "item", children: "Item 7" })
      ] })
    ] })
  ] }) });
};
const CryptoGame = () => {
  const [addRecord, setAddRecord] = reactExports.useState(false);
  const addRecordHandler = () => {
    setAddRecord(!addRecord);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { id: "crypto-game", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "game", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "board", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "items", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "name", children: "Game" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "record", children: /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: addRecordHandler, className: "add", type: "button", children: "Add Record" }) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "content", children: [
      addRecord && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "items", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "item", children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", {}) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "item", children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", {}) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "item", children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", {}) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "item", children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", {}) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "item", children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", {}) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "item", children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", {}) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "item", children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", {}) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "item", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", children: "Submit" }),
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", children: "Cancel" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "items color", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "item", children: "Item 1" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "item", children: "Item 2" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "item", children: "Item 3" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "item", children: "Item 4" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "item", children: "Item 5" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "item", children: "Item 6" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "item", children: "Item 7" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "items", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "item", children: "Item 1" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "item", children: "Item 2" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "item", children: "Item 3" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "item", children: "Item 4" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "item", children: "Item 5" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "item", children: "Item 6" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "item", children: "Item 7" })
      ] })
    ] })
  ] }) });
};
const CryptoNft = () => {
  const [addRecord, setAddRecord] = reactExports.useState(false);
  const addRecordHandler = () => {
    setAddRecord(!addRecord);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { id: "crypto-nft", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "nft", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "board", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "items", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "name", children: "NFT" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "record", children: /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: addRecordHandler, className: "add", type: "button", children: "Add Record" }) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "content", children: [
      addRecord && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "items", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "item", children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", {}) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "item", children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", {}) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "item", children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", {}) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "item", children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", {}) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "item", children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", {}) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "item", children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", {}) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "item", children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", {}) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "item", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", children: "Submit" }),
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", children: "Cancel" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "items color", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "item", children: "Item 1" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "item", children: "Item 2" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "item", children: "Item 3" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "item", children: "Item 4" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "item", children: "Item 5" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "item", children: "Item 6" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "item", children: "Item 7" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "items", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "item", children: "Item 1" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "item", children: "Item 2" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "item", children: "Item 3" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "item", children: "Item 4" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "item", children: "Item 5" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "item", children: "Item 6" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "item", children: "Item 7" })
      ] })
    ] })
  ] }) });
};
const StockNote = () => {
  const [search, setSearch] = reactExports.useState(false);
  const searchHandler = () => {
    setSearch(!search);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { id: "stock-note", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "note", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "board", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "items", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "name", children: "Note" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "record", children: /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: searchHandler, className: "search", type: "button", children: "Search" }) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "content", children: [
      search && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "items", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "item", children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", {}) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "item", children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", {}) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "item", children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", {}) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "item", children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", {}) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "item", children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", {}) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "item", children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", {}) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "item", children: /* @__PURE__ */ jsxRuntimeExports.jsx("input", {}) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "item", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", children: "Submit" }),
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", children: "Cancel" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "items color", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "item", children: "Item 1" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "item", children: "Item 2" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "item", children: "Item 3" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "item", children: "Item 4" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "item", children: "Item 5" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "item", children: "Item 6" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "item", children: "Item 7" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "item", children: "Item 8" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "items", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "item", children: "Item 1" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "item", children: "Item 2" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "item", children: "Item 3" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "item", children: "Item 4" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "item", children: "Item 5" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "item", children: "Item 6" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "item", children: "Item 7" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "item", children: "Item 8" })
      ] })
    ] })
  ] }) });
};
const Unccharted = () => {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { children: "Uncharted page." });
};
const App = () => {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(BrowserRouter, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Routes, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Route, { path: "/", element: /* @__PURE__ */ jsxRuntimeExports.jsx(Single, {}), children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Route, { path: "/", element: /* @__PURE__ */ jsxRuntimeExports.jsx(Home, {}) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Route, { path: "/crypto-explorer", element: /* @__PURE__ */ jsxRuntimeExports.jsx(CryptoExplorer, {}) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Route, { path: "/stock-explorer", element: /* @__PURE__ */ jsxRuntimeExports.jsx(StockExplorer, {}) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Route, { path: "/auth", element: /* @__PURE__ */ jsxRuntimeExports.jsx(Single, {}), children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Route, { path: "/auth/register", element: /* @__PURE__ */ jsxRuntimeExports.jsx(Register, {}) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Route, { path: "/auth/login", element: /* @__PURE__ */ jsxRuntimeExports.jsx(Login, {}) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Route, { path: "/auth/forgot", element: /* @__PURE__ */ jsxRuntimeExports.jsx(Forgot, {}) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Route, { path: "/auth/reset/:token", element: /* @__PURE__ */ jsxRuntimeExports.jsx(Reset, {}) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Route, { path: "/auth/verify/:token", element: /* @__PURE__ */ jsxRuntimeExports.jsx(Verify, {}) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Route, { path: "/profile", element: /* @__PURE__ */ jsxRuntimeExports.jsx(Single, {}), children: /* @__PURE__ */ jsxRuntimeExports.jsx(Route, { path: "/profile", element: /* @__PURE__ */ jsxRuntimeExports.jsx(Client, {}) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Route, { path: "/dashboard", element: /* @__PURE__ */ jsxRuntimeExports.jsx(Single, {}), children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Route, { path: "/dashboard", element: /* @__PURE__ */ jsxRuntimeExports.jsx(Dashboard, {}) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Route, { path: "/dashboard/stock-portfolio", element: /* @__PURE__ */ jsxRuntimeExports.jsx(Portfolio, {}) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Route, { path: "/dashboard/stock-watchlist", element: /* @__PURE__ */ jsxRuntimeExports.jsx(Watchlist, {}) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Route, { path: "/dashboard/stock-trade", element: /* @__PURE__ */ jsxRuntimeExports.jsx(Trade, {}) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Route, { path: "/dashboard/stock-chart", element: /* @__PURE__ */ jsxRuntimeExports.jsx(StockChart, {}) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Route, { path: "/dashboard/crypto-portfolio", element: /* @__PURE__ */ jsxRuntimeExports.jsx(CryptoPortfolio, {}) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Route, { path: "/dashboard/crypto-trade", element: /* @__PURE__ */ jsxRuntimeExports.jsx(CryptoScreen, {}) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Route, { path: "/dashboard/crypto-moon", element: /* @__PURE__ */ jsxRuntimeExports.jsx(CryptoMoon, {}) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Route, { path: "/dashboard/crypto-game", element: /* @__PURE__ */ jsxRuntimeExports.jsx(CryptoGame, {}) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Route, { path: "/dashboard/crypto-nft", element: /* @__PURE__ */ jsxRuntimeExports.jsx(CryptoNft, {}) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Route, { path: "/dashboard/extra-note", element: /* @__PURE__ */ jsxRuntimeExports.jsx(StockNote, {}) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Route, { path: "/", element: /* @__PURE__ */ jsxRuntimeExports.jsx(Single, {}), children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Route, { path: "*", element: /* @__PURE__ */ jsxRuntimeExports.jsx(Navigate, { replace: true, to: "/uncharted" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Route, { path: "/uncharted", element: /* @__PURE__ */ jsxRuntimeExports.jsx(Unccharted, {}) })
    ] })
  ] }) });
};
window.axios = axios$2;
window.axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
window.axios.defaults.withCredentials = true;
if (document.getElementById("root")) {
  const Index = client.createRoot(document.getElementById("root"));
  Index.render(
    /* @__PURE__ */ jsxRuntimeExports.jsx(Provider, { store, children: /* @__PURE__ */ jsxRuntimeExports.jsx(App, {}) })
  );
}
