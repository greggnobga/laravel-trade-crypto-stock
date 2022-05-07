/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/axios/index.js":
/*!*************************************!*\
  !*** ./node_modules/axios/index.js ***!
  \*************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__(/*! ./lib/axios */ "./node_modules/axios/lib/axios.js");

/***/ }),

/***/ "./node_modules/axios/lib/adapters/xhr.js":
/*!************************************************!*\
  !*** ./node_modules/axios/lib/adapters/xhr.js ***!
  \************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");
var settle = __webpack_require__(/*! ./../core/settle */ "./node_modules/axios/lib/core/settle.js");
var cookies = __webpack_require__(/*! ./../helpers/cookies */ "./node_modules/axios/lib/helpers/cookies.js");
var buildURL = __webpack_require__(/*! ./../helpers/buildURL */ "./node_modules/axios/lib/helpers/buildURL.js");
var buildFullPath = __webpack_require__(/*! ../core/buildFullPath */ "./node_modules/axios/lib/core/buildFullPath.js");
var parseHeaders = __webpack_require__(/*! ./../helpers/parseHeaders */ "./node_modules/axios/lib/helpers/parseHeaders.js");
var isURLSameOrigin = __webpack_require__(/*! ./../helpers/isURLSameOrigin */ "./node_modules/axios/lib/helpers/isURLSameOrigin.js");
var createError = __webpack_require__(/*! ../core/createError */ "./node_modules/axios/lib/core/createError.js");

module.exports = function xhrAdapter(config) {
  return new Promise(function dispatchXhrRequest(resolve, reject) {
    var requestData = config.data;
    var requestHeaders = config.headers;
    var responseType = config.responseType;

    if (utils.isFormData(requestData)) {
      delete requestHeaders['Content-Type']; // Let the browser set it
    }

    var request = new XMLHttpRequest();

    // HTTP basic authentication
    if (config.auth) {
      var username = config.auth.username || '';
      var password = config.auth.password ? unescape(encodeURIComponent(config.auth.password)) : '';
      requestHeaders.Authorization = 'Basic ' + btoa(username + ':' + password);
    }

    var fullPath = buildFullPath(config.baseURL, config.url);
    request.open(config.method.toUpperCase(), buildURL(fullPath, config.params, config.paramsSerializer), true);

    // Set the request timeout in MS
    request.timeout = config.timeout;

    function onloadend() {
      if (!request) {
        return;
      }
      // Prepare the response
      var responseHeaders = 'getAllResponseHeaders' in request ? parseHeaders(request.getAllResponseHeaders()) : null;
      var responseData = !responseType || responseType === 'text' ||  responseType === 'json' ?
        request.responseText : request.response;
      var response = {
        data: responseData,
        status: request.status,
        statusText: request.statusText,
        headers: responseHeaders,
        config: config,
        request: request
      };

      settle(resolve, reject, response);

      // Clean up request
      request = null;
    }

    if ('onloadend' in request) {
      // Use onloadend if available
      request.onloadend = onloadend;
    } else {
      // Listen for ready state to emulate onloadend
      request.onreadystatechange = function handleLoad() {
        if (!request || request.readyState !== 4) {
          return;
        }

        // The request errored out and we didn't get a response, this will be
        // handled by onerror instead
        // With one exception: request that using file: protocol, most browsers
        // will return status as 0 even though it's a successful request
        if (request.status === 0 && !(request.responseURL && request.responseURL.indexOf('file:') === 0)) {
          return;
        }
        // readystate handler is calling before onerror or ontimeout handlers,
        // so we should call onloadend on the next 'tick'
        setTimeout(onloadend);
      };
    }

    // Handle browser request cancellation (as opposed to a manual cancellation)
    request.onabort = function handleAbort() {
      if (!request) {
        return;
      }

      reject(createError('Request aborted', config, 'ECONNABORTED', request));

      // Clean up request
      request = null;
    };

    // Handle low level network errors
    request.onerror = function handleError() {
      // Real errors are hidden from us by the browser
      // onerror should only fire if it's a network error
      reject(createError('Network Error', config, null, request));

      // Clean up request
      request = null;
    };

    // Handle timeout
    request.ontimeout = function handleTimeout() {
      var timeoutErrorMessage = 'timeout of ' + config.timeout + 'ms exceeded';
      if (config.timeoutErrorMessage) {
        timeoutErrorMessage = config.timeoutErrorMessage;
      }
      reject(createError(
        timeoutErrorMessage,
        config,
        config.transitional && config.transitional.clarifyTimeoutError ? 'ETIMEDOUT' : 'ECONNABORTED',
        request));

      // Clean up request
      request = null;
    };

    // Add xsrf header
    // This is only done if running in a standard browser environment.
    // Specifically not if we're in a web worker, or react-native.
    if (utils.isStandardBrowserEnv()) {
      // Add xsrf header
      var xsrfValue = (config.withCredentials || isURLSameOrigin(fullPath)) && config.xsrfCookieName ?
        cookies.read(config.xsrfCookieName) :
        undefined;

      if (xsrfValue) {
        requestHeaders[config.xsrfHeaderName] = xsrfValue;
      }
    }

    // Add headers to the request
    if ('setRequestHeader' in request) {
      utils.forEach(requestHeaders, function setRequestHeader(val, key) {
        if (typeof requestData === 'undefined' && key.toLowerCase() === 'content-type') {
          // Remove Content-Type if data is undefined
          delete requestHeaders[key];
        } else {
          // Otherwise add header to the request
          request.setRequestHeader(key, val);
        }
      });
    }

    // Add withCredentials to request if needed
    if (!utils.isUndefined(config.withCredentials)) {
      request.withCredentials = !!config.withCredentials;
    }

    // Add responseType to request if needed
    if (responseType && responseType !== 'json') {
      request.responseType = config.responseType;
    }

    // Handle progress if needed
    if (typeof config.onDownloadProgress === 'function') {
      request.addEventListener('progress', config.onDownloadProgress);
    }

    // Not all browsers support upload events
    if (typeof config.onUploadProgress === 'function' && request.upload) {
      request.upload.addEventListener('progress', config.onUploadProgress);
    }

    if (config.cancelToken) {
      // Handle cancellation
      config.cancelToken.promise.then(function onCanceled(cancel) {
        if (!request) {
          return;
        }

        request.abort();
        reject(cancel);
        // Clean up request
        request = null;
      });
    }

    if (!requestData) {
      requestData = null;
    }

    // Send the request
    request.send(requestData);
  });
};


/***/ }),

/***/ "./node_modules/axios/lib/axios.js":
/*!*****************************************!*\
  !*** ./node_modules/axios/lib/axios.js ***!
  \*****************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var utils = __webpack_require__(/*! ./utils */ "./node_modules/axios/lib/utils.js");
var bind = __webpack_require__(/*! ./helpers/bind */ "./node_modules/axios/lib/helpers/bind.js");
var Axios = __webpack_require__(/*! ./core/Axios */ "./node_modules/axios/lib/core/Axios.js");
var mergeConfig = __webpack_require__(/*! ./core/mergeConfig */ "./node_modules/axios/lib/core/mergeConfig.js");
var defaults = __webpack_require__(/*! ./defaults */ "./node_modules/axios/lib/defaults.js");

/**
 * Create an instance of Axios
 *
 * @param {Object} defaultConfig The default config for the instance
 * @return {Axios} A new instance of Axios
 */
function createInstance(defaultConfig) {
  var context = new Axios(defaultConfig);
  var instance = bind(Axios.prototype.request, context);

  // Copy axios.prototype to instance
  utils.extend(instance, Axios.prototype, context);

  // Copy context to instance
  utils.extend(instance, context);

  return instance;
}

// Create the default instance to be exported
var axios = createInstance(defaults);

// Expose Axios class to allow class inheritance
axios.Axios = Axios;

// Factory for creating new instances
axios.create = function create(instanceConfig) {
  return createInstance(mergeConfig(axios.defaults, instanceConfig));
};

// Expose Cancel & CancelToken
axios.Cancel = __webpack_require__(/*! ./cancel/Cancel */ "./node_modules/axios/lib/cancel/Cancel.js");
axios.CancelToken = __webpack_require__(/*! ./cancel/CancelToken */ "./node_modules/axios/lib/cancel/CancelToken.js");
axios.isCancel = __webpack_require__(/*! ./cancel/isCancel */ "./node_modules/axios/lib/cancel/isCancel.js");

// Expose all/spread
axios.all = function all(promises) {
  return Promise.all(promises);
};
axios.spread = __webpack_require__(/*! ./helpers/spread */ "./node_modules/axios/lib/helpers/spread.js");

// Expose isAxiosError
axios.isAxiosError = __webpack_require__(/*! ./helpers/isAxiosError */ "./node_modules/axios/lib/helpers/isAxiosError.js");

module.exports = axios;

// Allow use of default import syntax in TypeScript
module.exports["default"] = axios;


/***/ }),

/***/ "./node_modules/axios/lib/cancel/Cancel.js":
/*!*************************************************!*\
  !*** ./node_modules/axios/lib/cancel/Cancel.js ***!
  \*************************************************/
/***/ ((module) => {

"use strict";


/**
 * A `Cancel` is an object that is thrown when an operation is canceled.
 *
 * @class
 * @param {string=} message The message.
 */
function Cancel(message) {
  this.message = message;
}

Cancel.prototype.toString = function toString() {
  return 'Cancel' + (this.message ? ': ' + this.message : '');
};

Cancel.prototype.__CANCEL__ = true;

module.exports = Cancel;


/***/ }),

/***/ "./node_modules/axios/lib/cancel/CancelToken.js":
/*!******************************************************!*\
  !*** ./node_modules/axios/lib/cancel/CancelToken.js ***!
  \******************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var Cancel = __webpack_require__(/*! ./Cancel */ "./node_modules/axios/lib/cancel/Cancel.js");

/**
 * A `CancelToken` is an object that can be used to request cancellation of an operation.
 *
 * @class
 * @param {Function} executor The executor function.
 */
function CancelToken(executor) {
  if (typeof executor !== 'function') {
    throw new TypeError('executor must be a function.');
  }

  var resolvePromise;
  this.promise = new Promise(function promiseExecutor(resolve) {
    resolvePromise = resolve;
  });

  var token = this;
  executor(function cancel(message) {
    if (token.reason) {
      // Cancellation has already been requested
      return;
    }

    token.reason = new Cancel(message);
    resolvePromise(token.reason);
  });
}

/**
 * Throws a `Cancel` if cancellation has been requested.
 */
CancelToken.prototype.throwIfRequested = function throwIfRequested() {
  if (this.reason) {
    throw this.reason;
  }
};

/**
 * Returns an object that contains a new `CancelToken` and a function that, when called,
 * cancels the `CancelToken`.
 */
CancelToken.source = function source() {
  var cancel;
  var token = new CancelToken(function executor(c) {
    cancel = c;
  });
  return {
    token: token,
    cancel: cancel
  };
};

module.exports = CancelToken;


/***/ }),

/***/ "./node_modules/axios/lib/cancel/isCancel.js":
/*!***************************************************!*\
  !*** ./node_modules/axios/lib/cancel/isCancel.js ***!
  \***************************************************/
/***/ ((module) => {

"use strict";


module.exports = function isCancel(value) {
  return !!(value && value.__CANCEL__);
};


/***/ }),

/***/ "./node_modules/axios/lib/core/Axios.js":
/*!**********************************************!*\
  !*** ./node_modules/axios/lib/core/Axios.js ***!
  \**********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");
var buildURL = __webpack_require__(/*! ../helpers/buildURL */ "./node_modules/axios/lib/helpers/buildURL.js");
var InterceptorManager = __webpack_require__(/*! ./InterceptorManager */ "./node_modules/axios/lib/core/InterceptorManager.js");
var dispatchRequest = __webpack_require__(/*! ./dispatchRequest */ "./node_modules/axios/lib/core/dispatchRequest.js");
var mergeConfig = __webpack_require__(/*! ./mergeConfig */ "./node_modules/axios/lib/core/mergeConfig.js");
var validator = __webpack_require__(/*! ../helpers/validator */ "./node_modules/axios/lib/helpers/validator.js");

var validators = validator.validators;
/**
 * Create a new instance of Axios
 *
 * @param {Object} instanceConfig The default config for the instance
 */
function Axios(instanceConfig) {
  this.defaults = instanceConfig;
  this.interceptors = {
    request: new InterceptorManager(),
    response: new InterceptorManager()
  };
}

/**
 * Dispatch a request
 *
 * @param {Object} config The config specific for this request (merged with this.defaults)
 */
Axios.prototype.request = function request(config) {
  /*eslint no-param-reassign:0*/
  // Allow for axios('example/url'[, config]) a la fetch API
  if (typeof config === 'string') {
    config = arguments[1] || {};
    config.url = arguments[0];
  } else {
    config = config || {};
  }

  config = mergeConfig(this.defaults, config);

  // Set config.method
  if (config.method) {
    config.method = config.method.toLowerCase();
  } else if (this.defaults.method) {
    config.method = this.defaults.method.toLowerCase();
  } else {
    config.method = 'get';
  }

  var transitional = config.transitional;

  if (transitional !== undefined) {
    validator.assertOptions(transitional, {
      silentJSONParsing: validators.transitional(validators.boolean, '1.0.0'),
      forcedJSONParsing: validators.transitional(validators.boolean, '1.0.0'),
      clarifyTimeoutError: validators.transitional(validators.boolean, '1.0.0')
    }, false);
  }

  // filter out skipped interceptors
  var requestInterceptorChain = [];
  var synchronousRequestInterceptors = true;
  this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
    if (typeof interceptor.runWhen === 'function' && interceptor.runWhen(config) === false) {
      return;
    }

    synchronousRequestInterceptors = synchronousRequestInterceptors && interceptor.synchronous;

    requestInterceptorChain.unshift(interceptor.fulfilled, interceptor.rejected);
  });

  var responseInterceptorChain = [];
  this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
    responseInterceptorChain.push(interceptor.fulfilled, interceptor.rejected);
  });

  var promise;

  if (!synchronousRequestInterceptors) {
    var chain = [dispatchRequest, undefined];

    Array.prototype.unshift.apply(chain, requestInterceptorChain);
    chain = chain.concat(responseInterceptorChain);

    promise = Promise.resolve(config);
    while (chain.length) {
      promise = promise.then(chain.shift(), chain.shift());
    }

    return promise;
  }


  var newConfig = config;
  while (requestInterceptorChain.length) {
    var onFulfilled = requestInterceptorChain.shift();
    var onRejected = requestInterceptorChain.shift();
    try {
      newConfig = onFulfilled(newConfig);
    } catch (error) {
      onRejected(error);
      break;
    }
  }

  try {
    promise = dispatchRequest(newConfig);
  } catch (error) {
    return Promise.reject(error);
  }

  while (responseInterceptorChain.length) {
    promise = promise.then(responseInterceptorChain.shift(), responseInterceptorChain.shift());
  }

  return promise;
};

Axios.prototype.getUri = function getUri(config) {
  config = mergeConfig(this.defaults, config);
  return buildURL(config.url, config.params, config.paramsSerializer).replace(/^\?/, '');
};

// Provide aliases for supported request methods
utils.forEach(['delete', 'get', 'head', 'options'], function forEachMethodNoData(method) {
  /*eslint func-names:0*/
  Axios.prototype[method] = function(url, config) {
    return this.request(mergeConfig(config || {}, {
      method: method,
      url: url,
      data: (config || {}).data
    }));
  };
});

utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  /*eslint func-names:0*/
  Axios.prototype[method] = function(url, data, config) {
    return this.request(mergeConfig(config || {}, {
      method: method,
      url: url,
      data: data
    }));
  };
});

module.exports = Axios;


/***/ }),

/***/ "./node_modules/axios/lib/core/InterceptorManager.js":
/*!***********************************************************!*\
  !*** ./node_modules/axios/lib/core/InterceptorManager.js ***!
  \***********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");

function InterceptorManager() {
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
InterceptorManager.prototype.use = function use(fulfilled, rejected, options) {
  this.handlers.push({
    fulfilled: fulfilled,
    rejected: rejected,
    synchronous: options ? options.synchronous : false,
    runWhen: options ? options.runWhen : null
  });
  return this.handlers.length - 1;
};

/**
 * Remove an interceptor from the stack
 *
 * @param {Number} id The ID that was returned by `use`
 */
InterceptorManager.prototype.eject = function eject(id) {
  if (this.handlers[id]) {
    this.handlers[id] = null;
  }
};

/**
 * Iterate over all the registered interceptors
 *
 * This method is particularly useful for skipping over any
 * interceptors that may have become `null` calling `eject`.
 *
 * @param {Function} fn The function to call for each interceptor
 */
InterceptorManager.prototype.forEach = function forEach(fn) {
  utils.forEach(this.handlers, function forEachHandler(h) {
    if (h !== null) {
      fn(h);
    }
  });
};

module.exports = InterceptorManager;


/***/ }),

/***/ "./node_modules/axios/lib/core/buildFullPath.js":
/*!******************************************************!*\
  !*** ./node_modules/axios/lib/core/buildFullPath.js ***!
  \******************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var isAbsoluteURL = __webpack_require__(/*! ../helpers/isAbsoluteURL */ "./node_modules/axios/lib/helpers/isAbsoluteURL.js");
var combineURLs = __webpack_require__(/*! ../helpers/combineURLs */ "./node_modules/axios/lib/helpers/combineURLs.js");

/**
 * Creates a new URL by combining the baseURL with the requestedURL,
 * only when the requestedURL is not already an absolute URL.
 * If the requestURL is absolute, this function returns the requestedURL untouched.
 *
 * @param {string} baseURL The base URL
 * @param {string} requestedURL Absolute or relative URL to combine
 * @returns {string} The combined full path
 */
module.exports = function buildFullPath(baseURL, requestedURL) {
  if (baseURL && !isAbsoluteURL(requestedURL)) {
    return combineURLs(baseURL, requestedURL);
  }
  return requestedURL;
};


/***/ }),

/***/ "./node_modules/axios/lib/core/createError.js":
/*!****************************************************!*\
  !*** ./node_modules/axios/lib/core/createError.js ***!
  \****************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var enhanceError = __webpack_require__(/*! ./enhanceError */ "./node_modules/axios/lib/core/enhanceError.js");

/**
 * Create an Error with the specified message, config, error code, request and response.
 *
 * @param {string} message The error message.
 * @param {Object} config The config.
 * @param {string} [code] The error code (for example, 'ECONNABORTED').
 * @param {Object} [request] The request.
 * @param {Object} [response] The response.
 * @returns {Error} The created error.
 */
module.exports = function createError(message, config, code, request, response) {
  var error = new Error(message);
  return enhanceError(error, config, code, request, response);
};


/***/ }),

/***/ "./node_modules/axios/lib/core/dispatchRequest.js":
/*!********************************************************!*\
  !*** ./node_modules/axios/lib/core/dispatchRequest.js ***!
  \********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");
var transformData = __webpack_require__(/*! ./transformData */ "./node_modules/axios/lib/core/transformData.js");
var isCancel = __webpack_require__(/*! ../cancel/isCancel */ "./node_modules/axios/lib/cancel/isCancel.js");
var defaults = __webpack_require__(/*! ../defaults */ "./node_modules/axios/lib/defaults.js");

/**
 * Throws a `Cancel` if cancellation has been requested.
 */
function throwIfCancellationRequested(config) {
  if (config.cancelToken) {
    config.cancelToken.throwIfRequested();
  }
}

/**
 * Dispatch a request to the server using the configured adapter.
 *
 * @param {object} config The config that is to be used for the request
 * @returns {Promise} The Promise to be fulfilled
 */
module.exports = function dispatchRequest(config) {
  throwIfCancellationRequested(config);

  // Ensure headers exist
  config.headers = config.headers || {};

  // Transform request data
  config.data = transformData.call(
    config,
    config.data,
    config.headers,
    config.transformRequest
  );

  // Flatten headers
  config.headers = utils.merge(
    config.headers.common || {},
    config.headers[config.method] || {},
    config.headers
  );

  utils.forEach(
    ['delete', 'get', 'head', 'post', 'put', 'patch', 'common'],
    function cleanHeaderConfig(method) {
      delete config.headers[method];
    }
  );

  var adapter = config.adapter || defaults.adapter;

  return adapter(config).then(function onAdapterResolution(response) {
    throwIfCancellationRequested(config);

    // Transform response data
    response.data = transformData.call(
      config,
      response.data,
      response.headers,
      config.transformResponse
    );

    return response;
  }, function onAdapterRejection(reason) {
    if (!isCancel(reason)) {
      throwIfCancellationRequested(config);

      // Transform response data
      if (reason && reason.response) {
        reason.response.data = transformData.call(
          config,
          reason.response.data,
          reason.response.headers,
          config.transformResponse
        );
      }
    }

    return Promise.reject(reason);
  });
};


/***/ }),

/***/ "./node_modules/axios/lib/core/enhanceError.js":
/*!*****************************************************!*\
  !*** ./node_modules/axios/lib/core/enhanceError.js ***!
  \*****************************************************/
/***/ ((module) => {

"use strict";


/**
 * Update an Error with the specified config, error code, and response.
 *
 * @param {Error} error The error to update.
 * @param {Object} config The config.
 * @param {string} [code] The error code (for example, 'ECONNABORTED').
 * @param {Object} [request] The request.
 * @param {Object} [response] The response.
 * @returns {Error} The error.
 */
module.exports = function enhanceError(error, config, code, request, response) {
  error.config = config;
  if (code) {
    error.code = code;
  }

  error.request = request;
  error.response = response;
  error.isAxiosError = true;

  error.toJSON = function toJSON() {
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
      config: this.config,
      code: this.code
    };
  };
  return error;
};


/***/ }),

/***/ "./node_modules/axios/lib/core/mergeConfig.js":
/*!****************************************************!*\
  !*** ./node_modules/axios/lib/core/mergeConfig.js ***!
  \****************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var utils = __webpack_require__(/*! ../utils */ "./node_modules/axios/lib/utils.js");

/**
 * Config-specific merge-function which creates a new config-object
 * by merging two configuration objects together.
 *
 * @param {Object} config1
 * @param {Object} config2
 * @returns {Object} New object resulting from merging config2 to config1
 */
module.exports = function mergeConfig(config1, config2) {
  // eslint-disable-next-line no-param-reassign
  config2 = config2 || {};
  var config = {};

  var valueFromConfig2Keys = ['url', 'method', 'data'];
  var mergeDeepPropertiesKeys = ['headers', 'auth', 'proxy', 'params'];
  var defaultToConfig2Keys = [
    'baseURL', 'transformRequest', 'transformResponse', 'paramsSerializer',
    'timeout', 'timeoutMessage', 'withCredentials', 'adapter', 'responseType', 'xsrfCookieName',
    'xsrfHeaderName', 'onUploadProgress', 'onDownloadProgress', 'decompress',
    'maxContentLength', 'maxBodyLength', 'maxRedirects', 'transport', 'httpAgent',
    'httpsAgent', 'cancelToken', 'socketPath', 'responseEncoding'
  ];
  var directMergeKeys = ['validateStatus'];

  function getMergedValue(target, source) {
    if (utils.isPlainObject(target) && utils.isPlainObject(source)) {
      return utils.merge(target, source);
    } else if (utils.isPlainObject(source)) {
      return utils.merge({}, source);
    } else if (utils.isArray(source)) {
      return source.slice();
    }
    return source;
  }

  function mergeDeepProperties(prop) {
    if (!utils.isUndefined(config2[prop])) {
      config[prop] = getMergedValue(config1[prop], config2[prop]);
    } else if (!utils.isUndefined(config1[prop])) {
      config[prop] = getMergedValue(undefined, config1[prop]);
    }
  }

  utils.forEach(valueFromConfig2Keys, function valueFromConfig2(prop) {
    if (!utils.isUndefined(config2[prop])) {
      config[prop] = getMergedValue(undefined, config2[prop]);
    }
  });

  utils.forEach(mergeDeepPropertiesKeys, mergeDeepProperties);

  utils.forEach(defaultToConfig2Keys, function defaultToConfig2(prop) {
    if (!utils.isUndefined(config2[prop])) {
      config[prop] = getMergedValue(undefined, config2[prop]);
    } else if (!utils.isUndefined(config1[prop])) {
      config[prop] = getMergedValue(undefined, config1[prop]);
    }
  });

  utils.forEach(directMergeKeys, function merge(prop) {
    if (prop in config2) {
      config[prop] = getMergedValue(config1[prop], config2[prop]);
    } else if (prop in config1) {
      config[prop] = getMergedValue(undefined, config1[prop]);
    }
  });

  var axiosKeys = valueFromConfig2Keys
    .concat(mergeDeepPropertiesKeys)
    .concat(defaultToConfig2Keys)
    .concat(directMergeKeys);

  var otherKeys = Object
    .keys(config1)
    .concat(Object.keys(config2))
    .filter(function filterAxiosKeys(key) {
      return axiosKeys.indexOf(key) === -1;
    });

  utils.forEach(otherKeys, mergeDeepProperties);

  return config;
};


/***/ }),

/***/ "./node_modules/axios/lib/core/settle.js":
/*!***********************************************!*\
  !*** ./node_modules/axios/lib/core/settle.js ***!
  \***********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var createError = __webpack_require__(/*! ./createError */ "./node_modules/axios/lib/core/createError.js");

/**
 * Resolve or reject a Promise based on response status.
 *
 * @param {Function} resolve A function that resolves the promise.
 * @param {Function} reject A function that rejects the promise.
 * @param {object} response The response.
 */
module.exports = function settle(resolve, reject, response) {
  var validateStatus = response.config.validateStatus;
  if (!response.status || !validateStatus || validateStatus(response.status)) {
    resolve(response);
  } else {
    reject(createError(
      'Request failed with status code ' + response.status,
      response.config,
      null,
      response.request,
      response
    ));
  }
};


/***/ }),

/***/ "./node_modules/axios/lib/core/transformData.js":
/*!******************************************************!*\
  !*** ./node_modules/axios/lib/core/transformData.js ***!
  \******************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");
var defaults = __webpack_require__(/*! ./../defaults */ "./node_modules/axios/lib/defaults.js");

/**
 * Transform the data for a request or a response
 *
 * @param {Object|String} data The data to be transformed
 * @param {Array} headers The headers for the request or response
 * @param {Array|Function} fns A single function or Array of functions
 * @returns {*} The resulting transformed data
 */
module.exports = function transformData(data, headers, fns) {
  var context = this || defaults;
  /*eslint no-param-reassign:0*/
  utils.forEach(fns, function transform(fn) {
    data = fn.call(context, data, headers);
  });

  return data;
};


/***/ }),

/***/ "./node_modules/axios/lib/defaults.js":
/*!********************************************!*\
  !*** ./node_modules/axios/lib/defaults.js ***!
  \********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/* provided dependency */ var process = __webpack_require__(/*! process/browser.js */ "./node_modules/process/browser.js");


var utils = __webpack_require__(/*! ./utils */ "./node_modules/axios/lib/utils.js");
var normalizeHeaderName = __webpack_require__(/*! ./helpers/normalizeHeaderName */ "./node_modules/axios/lib/helpers/normalizeHeaderName.js");
var enhanceError = __webpack_require__(/*! ./core/enhanceError */ "./node_modules/axios/lib/core/enhanceError.js");

var DEFAULT_CONTENT_TYPE = {
  'Content-Type': 'application/x-www-form-urlencoded'
};

function setContentTypeIfUnset(headers, value) {
  if (!utils.isUndefined(headers) && utils.isUndefined(headers['Content-Type'])) {
    headers['Content-Type'] = value;
  }
}

function getDefaultAdapter() {
  var adapter;
  if (typeof XMLHttpRequest !== 'undefined') {
    // For browsers use XHR adapter
    adapter = __webpack_require__(/*! ./adapters/xhr */ "./node_modules/axios/lib/adapters/xhr.js");
  } else if (typeof process !== 'undefined' && Object.prototype.toString.call(process) === '[object process]') {
    // For node use HTTP adapter
    adapter = __webpack_require__(/*! ./adapters/http */ "./node_modules/axios/lib/adapters/xhr.js");
  }
  return adapter;
}

function stringifySafely(rawValue, parser, encoder) {
  if (utils.isString(rawValue)) {
    try {
      (parser || JSON.parse)(rawValue);
      return utils.trim(rawValue);
    } catch (e) {
      if (e.name !== 'SyntaxError') {
        throw e;
      }
    }
  }

  return (encoder || JSON.stringify)(rawValue);
}

var defaults = {

  transitional: {
    silentJSONParsing: true,
    forcedJSONParsing: true,
    clarifyTimeoutError: false
  },

  adapter: getDefaultAdapter(),

  transformRequest: [function transformRequest(data, headers) {
    normalizeHeaderName(headers, 'Accept');
    normalizeHeaderName(headers, 'Content-Type');

    if (utils.isFormData(data) ||
      utils.isArrayBuffer(data) ||
      utils.isBuffer(data) ||
      utils.isStream(data) ||
      utils.isFile(data) ||
      utils.isBlob(data)
    ) {
      return data;
    }
    if (utils.isArrayBufferView(data)) {
      return data.buffer;
    }
    if (utils.isURLSearchParams(data)) {
      setContentTypeIfUnset(headers, 'application/x-www-form-urlencoded;charset=utf-8');
      return data.toString();
    }
    if (utils.isObject(data) || (headers && headers['Content-Type'] === 'application/json')) {
      setContentTypeIfUnset(headers, 'application/json');
      return stringifySafely(data);
    }
    return data;
  }],

  transformResponse: [function transformResponse(data) {
    var transitional = this.transitional;
    var silentJSONParsing = transitional && transitional.silentJSONParsing;
    var forcedJSONParsing = transitional && transitional.forcedJSONParsing;
    var strictJSONParsing = !silentJSONParsing && this.responseType === 'json';

    if (strictJSONParsing || (forcedJSONParsing && utils.isString(data) && data.length)) {
      try {
        return JSON.parse(data);
      } catch (e) {
        if (strictJSONParsing) {
          if (e.name === 'SyntaxError') {
            throw enhanceError(e, this, 'E_JSON_PARSE');
          }
          throw e;
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

  xsrfCookieName: 'XSRF-TOKEN',
  xsrfHeaderName: 'X-XSRF-TOKEN',

  maxContentLength: -1,
  maxBodyLength: -1,

  validateStatus: function validateStatus(status) {
    return status >= 200 && status < 300;
  }
};

defaults.headers = {
  common: {
    'Accept': 'application/json, text/plain, */*'
  }
};

utils.forEach(['delete', 'get', 'head'], function forEachMethodNoData(method) {
  defaults.headers[method] = {};
});

utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  defaults.headers[method] = utils.merge(DEFAULT_CONTENT_TYPE);
});

module.exports = defaults;


/***/ }),

/***/ "./node_modules/axios/lib/helpers/bind.js":
/*!************************************************!*\
  !*** ./node_modules/axios/lib/helpers/bind.js ***!
  \************************************************/
/***/ ((module) => {

"use strict";


module.exports = function bind(fn, thisArg) {
  return function wrap() {
    var args = new Array(arguments.length);
    for (var i = 0; i < args.length; i++) {
      args[i] = arguments[i];
    }
    return fn.apply(thisArg, args);
  };
};


/***/ }),

/***/ "./node_modules/axios/lib/helpers/buildURL.js":
/*!****************************************************!*\
  !*** ./node_modules/axios/lib/helpers/buildURL.js ***!
  \****************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");

function encode(val) {
  return encodeURIComponent(val).
    replace(/%3A/gi, ':').
    replace(/%24/g, '$').
    replace(/%2C/gi, ',').
    replace(/%20/g, '+').
    replace(/%5B/gi, '[').
    replace(/%5D/gi, ']');
}

/**
 * Build a URL by appending params to the end
 *
 * @param {string} url The base of the url (e.g., http://www.google.com)
 * @param {object} [params] The params to be appended
 * @returns {string} The formatted url
 */
module.exports = function buildURL(url, params, paramsSerializer) {
  /*eslint no-param-reassign:0*/
  if (!params) {
    return url;
  }

  var serializedParams;
  if (paramsSerializer) {
    serializedParams = paramsSerializer(params);
  } else if (utils.isURLSearchParams(params)) {
    serializedParams = params.toString();
  } else {
    var parts = [];

    utils.forEach(params, function serialize(val, key) {
      if (val === null || typeof val === 'undefined') {
        return;
      }

      if (utils.isArray(val)) {
        key = key + '[]';
      } else {
        val = [val];
      }

      utils.forEach(val, function parseValue(v) {
        if (utils.isDate(v)) {
          v = v.toISOString();
        } else if (utils.isObject(v)) {
          v = JSON.stringify(v);
        }
        parts.push(encode(key) + '=' + encode(v));
      });
    });

    serializedParams = parts.join('&');
  }

  if (serializedParams) {
    var hashmarkIndex = url.indexOf('#');
    if (hashmarkIndex !== -1) {
      url = url.slice(0, hashmarkIndex);
    }

    url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams;
  }

  return url;
};


/***/ }),

/***/ "./node_modules/axios/lib/helpers/combineURLs.js":
/*!*******************************************************!*\
  !*** ./node_modules/axios/lib/helpers/combineURLs.js ***!
  \*******************************************************/
/***/ ((module) => {

"use strict";


/**
 * Creates a new URL by combining the specified URLs
 *
 * @param {string} baseURL The base URL
 * @param {string} relativeURL The relative URL
 * @returns {string} The combined URL
 */
module.exports = function combineURLs(baseURL, relativeURL) {
  return relativeURL
    ? baseURL.replace(/\/+$/, '') + '/' + relativeURL.replace(/^\/+/, '')
    : baseURL;
};


/***/ }),

/***/ "./node_modules/axios/lib/helpers/cookies.js":
/*!***************************************************!*\
  !*** ./node_modules/axios/lib/helpers/cookies.js ***!
  \***************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");

module.exports = (
  utils.isStandardBrowserEnv() ?

  // Standard browser envs support document.cookie
    (function standardBrowserEnv() {
      return {
        write: function write(name, value, expires, path, domain, secure) {
          var cookie = [];
          cookie.push(name + '=' + encodeURIComponent(value));

          if (utils.isNumber(expires)) {
            cookie.push('expires=' + new Date(expires).toGMTString());
          }

          if (utils.isString(path)) {
            cookie.push('path=' + path);
          }

          if (utils.isString(domain)) {
            cookie.push('domain=' + domain);
          }

          if (secure === true) {
            cookie.push('secure');
          }

          document.cookie = cookie.join('; ');
        },

        read: function read(name) {
          var match = document.cookie.match(new RegExp('(^|;\\s*)(' + name + ')=([^;]*)'));
          return (match ? decodeURIComponent(match[3]) : null);
        },

        remove: function remove(name) {
          this.write(name, '', Date.now() - 86400000);
        }
      };
    })() :

  // Non standard browser env (web workers, react-native) lack needed support.
    (function nonStandardBrowserEnv() {
      return {
        write: function write() {},
        read: function read() { return null; },
        remove: function remove() {}
      };
    })()
);


/***/ }),

/***/ "./node_modules/axios/lib/helpers/isAbsoluteURL.js":
/*!*********************************************************!*\
  !*** ./node_modules/axios/lib/helpers/isAbsoluteURL.js ***!
  \*********************************************************/
/***/ ((module) => {

"use strict";


/**
 * Determines whether the specified URL is absolute
 *
 * @param {string} url The URL to test
 * @returns {boolean} True if the specified URL is absolute, otherwise false
 */
module.exports = function isAbsoluteURL(url) {
  // A URL is considered absolute if it begins with "<scheme>://" or "//" (protocol-relative URL).
  // RFC 3986 defines scheme name as a sequence of characters beginning with a letter and followed
  // by any combination of letters, digits, plus, period, or hyphen.
  return /^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(url);
};


/***/ }),

/***/ "./node_modules/axios/lib/helpers/isAxiosError.js":
/*!********************************************************!*\
  !*** ./node_modules/axios/lib/helpers/isAxiosError.js ***!
  \********************************************************/
/***/ ((module) => {

"use strict";


/**
 * Determines whether the payload is an error thrown by Axios
 *
 * @param {*} payload The value to test
 * @returns {boolean} True if the payload is an error thrown by Axios, otherwise false
 */
module.exports = function isAxiosError(payload) {
  return (typeof payload === 'object') && (payload.isAxiosError === true);
};


/***/ }),

/***/ "./node_modules/axios/lib/helpers/isURLSameOrigin.js":
/*!***********************************************************!*\
  !*** ./node_modules/axios/lib/helpers/isURLSameOrigin.js ***!
  \***********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");

module.exports = (
  utils.isStandardBrowserEnv() ?

  // Standard browser envs have full support of the APIs needed to test
  // whether the request URL is of the same origin as current location.
    (function standardBrowserEnv() {
      var msie = /(msie|trident)/i.test(navigator.userAgent);
      var urlParsingNode = document.createElement('a');
      var originURL;

      /**
    * Parse a URL to discover it's components
    *
    * @param {String} url The URL to be parsed
    * @returns {Object}
    */
      function resolveURL(url) {
        var href = url;

        if (msie) {
        // IE needs attribute set twice to normalize properties
          urlParsingNode.setAttribute('href', href);
          href = urlParsingNode.href;
        }

        urlParsingNode.setAttribute('href', href);

        // urlParsingNode provides the UrlUtils interface - http://url.spec.whatwg.org/#urlutils
        return {
          href: urlParsingNode.href,
          protocol: urlParsingNode.protocol ? urlParsingNode.protocol.replace(/:$/, '') : '',
          host: urlParsingNode.host,
          search: urlParsingNode.search ? urlParsingNode.search.replace(/^\?/, '') : '',
          hash: urlParsingNode.hash ? urlParsingNode.hash.replace(/^#/, '') : '',
          hostname: urlParsingNode.hostname,
          port: urlParsingNode.port,
          pathname: (urlParsingNode.pathname.charAt(0) === '/') ?
            urlParsingNode.pathname :
            '/' + urlParsingNode.pathname
        };
      }

      originURL = resolveURL(window.location.href);

      /**
    * Determine if a URL shares the same origin as the current location
    *
    * @param {String} requestURL The URL to test
    * @returns {boolean} True if URL shares the same origin, otherwise false
    */
      return function isURLSameOrigin(requestURL) {
        var parsed = (utils.isString(requestURL)) ? resolveURL(requestURL) : requestURL;
        return (parsed.protocol === originURL.protocol &&
            parsed.host === originURL.host);
      };
    })() :

  // Non standard browser envs (web workers, react-native) lack needed support.
    (function nonStandardBrowserEnv() {
      return function isURLSameOrigin() {
        return true;
      };
    })()
);


/***/ }),

/***/ "./node_modules/axios/lib/helpers/normalizeHeaderName.js":
/*!***************************************************************!*\
  !*** ./node_modules/axios/lib/helpers/normalizeHeaderName.js ***!
  \***************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var utils = __webpack_require__(/*! ../utils */ "./node_modules/axios/lib/utils.js");

module.exports = function normalizeHeaderName(headers, normalizedName) {
  utils.forEach(headers, function processHeader(value, name) {
    if (name !== normalizedName && name.toUpperCase() === normalizedName.toUpperCase()) {
      headers[normalizedName] = value;
      delete headers[name];
    }
  });
};


/***/ }),

/***/ "./node_modules/axios/lib/helpers/parseHeaders.js":
/*!********************************************************!*\
  !*** ./node_modules/axios/lib/helpers/parseHeaders.js ***!
  \********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");

// Headers whose duplicates are ignored by node
// c.f. https://nodejs.org/api/http.html#http_message_headers
var ignoreDuplicateOf = [
  'age', 'authorization', 'content-length', 'content-type', 'etag',
  'expires', 'from', 'host', 'if-modified-since', 'if-unmodified-since',
  'last-modified', 'location', 'max-forwards', 'proxy-authorization',
  'referer', 'retry-after', 'user-agent'
];

/**
 * Parse headers into an object
 *
 * ```
 * Date: Wed, 27 Aug 2014 08:58:49 GMT
 * Content-Type: application/json
 * Connection: keep-alive
 * Transfer-Encoding: chunked
 * ```
 *
 * @param {String} headers Headers needing to be parsed
 * @returns {Object} Headers parsed into an object
 */
module.exports = function parseHeaders(headers) {
  var parsed = {};
  var key;
  var val;
  var i;

  if (!headers) { return parsed; }

  utils.forEach(headers.split('\n'), function parser(line) {
    i = line.indexOf(':');
    key = utils.trim(line.substr(0, i)).toLowerCase();
    val = utils.trim(line.substr(i + 1));

    if (key) {
      if (parsed[key] && ignoreDuplicateOf.indexOf(key) >= 0) {
        return;
      }
      if (key === 'set-cookie') {
        parsed[key] = (parsed[key] ? parsed[key] : []).concat([val]);
      } else {
        parsed[key] = parsed[key] ? parsed[key] + ', ' + val : val;
      }
    }
  });

  return parsed;
};


/***/ }),

/***/ "./node_modules/axios/lib/helpers/spread.js":
/*!**************************************************!*\
  !*** ./node_modules/axios/lib/helpers/spread.js ***!
  \**************************************************/
/***/ ((module) => {

"use strict";


/**
 * Syntactic sugar for invoking a function and expanding an array for arguments.
 *
 * Common use case would be to use `Function.prototype.apply`.
 *
 *  ```js
 *  function f(x, y, z) {}
 *  var args = [1, 2, 3];
 *  f.apply(null, args);
 *  ```
 *
 * With `spread` this example can be re-written.
 *
 *  ```js
 *  spread(function(x, y, z) {})([1, 2, 3]);
 *  ```
 *
 * @param {Function} callback
 * @returns {Function}
 */
module.exports = function spread(callback) {
  return function wrap(arr) {
    return callback.apply(null, arr);
  };
};


/***/ }),

/***/ "./node_modules/axios/lib/helpers/validator.js":
/*!*****************************************************!*\
  !*** ./node_modules/axios/lib/helpers/validator.js ***!
  \*****************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var pkg = __webpack_require__(/*! ./../../package.json */ "./node_modules/axios/package.json");

var validators = {};

// eslint-disable-next-line func-names
['object', 'boolean', 'number', 'function', 'string', 'symbol'].forEach(function(type, i) {
  validators[type] = function validator(thing) {
    return typeof thing === type || 'a' + (i < 1 ? 'n ' : ' ') + type;
  };
});

var deprecatedWarnings = {};
var currentVerArr = pkg.version.split('.');

/**
 * Compare package versions
 * @param {string} version
 * @param {string?} thanVersion
 * @returns {boolean}
 */
function isOlderVersion(version, thanVersion) {
  var pkgVersionArr = thanVersion ? thanVersion.split('.') : currentVerArr;
  var destVer = version.split('.');
  for (var i = 0; i < 3; i++) {
    if (pkgVersionArr[i] > destVer[i]) {
      return true;
    } else if (pkgVersionArr[i] < destVer[i]) {
      return false;
    }
  }
  return false;
}

/**
 * Transitional option validator
 * @param {function|boolean?} validator
 * @param {string?} version
 * @param {string} message
 * @returns {function}
 */
validators.transitional = function transitional(validator, version, message) {
  var isDeprecated = version && isOlderVersion(version);

  function formatMessage(opt, desc) {
    return '[Axios v' + pkg.version + '] Transitional option \'' + opt + '\'' + desc + (message ? '. ' + message : '');
  }

  // eslint-disable-next-line func-names
  return function(value, opt, opts) {
    if (validator === false) {
      throw new Error(formatMessage(opt, ' has been removed in ' + version));
    }

    if (isDeprecated && !deprecatedWarnings[opt]) {
      deprecatedWarnings[opt] = true;
      // eslint-disable-next-line no-console
      console.warn(
        formatMessage(
          opt,
          ' has been deprecated since v' + version + ' and will be removed in the near future'
        )
      );
    }

    return validator ? validator(value, opt, opts) : true;
  };
};

/**
 * Assert object's properties type
 * @param {object} options
 * @param {object} schema
 * @param {boolean?} allowUnknown
 */

function assertOptions(options, schema, allowUnknown) {
  if (typeof options !== 'object') {
    throw new TypeError('options must be an object');
  }
  var keys = Object.keys(options);
  var i = keys.length;
  while (i-- > 0) {
    var opt = keys[i];
    var validator = schema[opt];
    if (validator) {
      var value = options[opt];
      var result = value === undefined || validator(value, opt, options);
      if (result !== true) {
        throw new TypeError('option ' + opt + ' must be ' + result);
      }
      continue;
    }
    if (allowUnknown !== true) {
      throw Error('Unknown option ' + opt);
    }
  }
}

module.exports = {
  isOlderVersion: isOlderVersion,
  assertOptions: assertOptions,
  validators: validators
};


/***/ }),

/***/ "./node_modules/axios/lib/utils.js":
/*!*****************************************!*\
  !*** ./node_modules/axios/lib/utils.js ***!
  \*****************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var bind = __webpack_require__(/*! ./helpers/bind */ "./node_modules/axios/lib/helpers/bind.js");

// utils is a library of generic helper functions non-specific to axios

var toString = Object.prototype.toString;

/**
 * Determine if a value is an Array
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Array, otherwise false
 */
function isArray(val) {
  return toString.call(val) === '[object Array]';
}

/**
 * Determine if a value is undefined
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if the value is undefined, otherwise false
 */
function isUndefined(val) {
  return typeof val === 'undefined';
}

/**
 * Determine if a value is a Buffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Buffer, otherwise false
 */
function isBuffer(val) {
  return val !== null && !isUndefined(val) && val.constructor !== null && !isUndefined(val.constructor)
    && typeof val.constructor.isBuffer === 'function' && val.constructor.isBuffer(val);
}

/**
 * Determine if a value is an ArrayBuffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an ArrayBuffer, otherwise false
 */
function isArrayBuffer(val) {
  return toString.call(val) === '[object ArrayBuffer]';
}

/**
 * Determine if a value is a FormData
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an FormData, otherwise false
 */
function isFormData(val) {
  return (typeof FormData !== 'undefined') && (val instanceof FormData);
}

/**
 * Determine if a value is a view on an ArrayBuffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a view on an ArrayBuffer, otherwise false
 */
function isArrayBufferView(val) {
  var result;
  if ((typeof ArrayBuffer !== 'undefined') && (ArrayBuffer.isView)) {
    result = ArrayBuffer.isView(val);
  } else {
    result = (val) && (val.buffer) && (val.buffer instanceof ArrayBuffer);
  }
  return result;
}

/**
 * Determine if a value is a String
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a String, otherwise false
 */
function isString(val) {
  return typeof val === 'string';
}

/**
 * Determine if a value is a Number
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Number, otherwise false
 */
function isNumber(val) {
  return typeof val === 'number';
}

/**
 * Determine if a value is an Object
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Object, otherwise false
 */
function isObject(val) {
  return val !== null && typeof val === 'object';
}

/**
 * Determine if a value is a plain Object
 *
 * @param {Object} val The value to test
 * @return {boolean} True if value is a plain Object, otherwise false
 */
function isPlainObject(val) {
  if (toString.call(val) !== '[object Object]') {
    return false;
  }

  var prototype = Object.getPrototypeOf(val);
  return prototype === null || prototype === Object.prototype;
}

/**
 * Determine if a value is a Date
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Date, otherwise false
 */
function isDate(val) {
  return toString.call(val) === '[object Date]';
}

/**
 * Determine if a value is a File
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a File, otherwise false
 */
function isFile(val) {
  return toString.call(val) === '[object File]';
}

/**
 * Determine if a value is a Blob
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Blob, otherwise false
 */
function isBlob(val) {
  return toString.call(val) === '[object Blob]';
}

/**
 * Determine if a value is a Function
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Function, otherwise false
 */
function isFunction(val) {
  return toString.call(val) === '[object Function]';
}

/**
 * Determine if a value is a Stream
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Stream, otherwise false
 */
function isStream(val) {
  return isObject(val) && isFunction(val.pipe);
}

/**
 * Determine if a value is a URLSearchParams object
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a URLSearchParams object, otherwise false
 */
function isURLSearchParams(val) {
  return typeof URLSearchParams !== 'undefined' && val instanceof URLSearchParams;
}

/**
 * Trim excess whitespace off the beginning and end of a string
 *
 * @param {String} str The String to trim
 * @returns {String} The String freed of excess whitespace
 */
function trim(str) {
  return str.trim ? str.trim() : str.replace(/^\s+|\s+$/g, '');
}

/**
 * Determine if we're running in a standard browser environment
 *
 * This allows axios to run in a web worker, and react-native.
 * Both environments support XMLHttpRequest, but not fully standard globals.
 *
 * web workers:
 *  typeof window -> undefined
 *  typeof document -> undefined
 *
 * react-native:
 *  navigator.product -> 'ReactNative'
 * nativescript
 *  navigator.product -> 'NativeScript' or 'NS'
 */
function isStandardBrowserEnv() {
  if (typeof navigator !== 'undefined' && (navigator.product === 'ReactNative' ||
                                           navigator.product === 'NativeScript' ||
                                           navigator.product === 'NS')) {
    return false;
  }
  return (
    typeof window !== 'undefined' &&
    typeof document !== 'undefined'
  );
}

/**
 * Iterate over an Array or an Object invoking a function for each item.
 *
 * If `obj` is an Array callback will be called passing
 * the value, index, and complete array for each item.
 *
 * If 'obj' is an Object callback will be called passing
 * the value, key, and complete object for each property.
 *
 * @param {Object|Array} obj The object to iterate
 * @param {Function} fn The callback to invoke for each item
 */
function forEach(obj, fn) {
  // Don't bother if no value provided
  if (obj === null || typeof obj === 'undefined') {
    return;
  }

  // Force an array if not already something iterable
  if (typeof obj !== 'object') {
    /*eslint no-param-reassign:0*/
    obj = [obj];
  }

  if (isArray(obj)) {
    // Iterate over array values
    for (var i = 0, l = obj.length; i < l; i++) {
      fn.call(null, obj[i], i, obj);
    }
  } else {
    // Iterate over object keys
    for (var key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        fn.call(null, obj[key], key, obj);
      }
    }
  }
}

/**
 * Accepts varargs expecting each argument to be an object, then
 * immutably merges the properties of each object and returns result.
 *
 * When multiple objects contain the same key the later object in
 * the arguments list will take precedence.
 *
 * Example:
 *
 * ```js
 * var result = merge({foo: 123}, {foo: 456});
 * console.log(result.foo); // outputs 456
 * ```
 *
 * @param {Object} obj1 Object to merge
 * @returns {Object} Result of all merge properties
 */
function merge(/* obj1, obj2, obj3, ... */) {
  var result = {};
  function assignValue(val, key) {
    if (isPlainObject(result[key]) && isPlainObject(val)) {
      result[key] = merge(result[key], val);
    } else if (isPlainObject(val)) {
      result[key] = merge({}, val);
    } else if (isArray(val)) {
      result[key] = val.slice();
    } else {
      result[key] = val;
    }
  }

  for (var i = 0, l = arguments.length; i < l; i++) {
    forEach(arguments[i], assignValue);
  }
  return result;
}

/**
 * Extends object a by mutably adding to it the properties of object b.
 *
 * @param {Object} a The object to be extended
 * @param {Object} b The object to copy properties from
 * @param {Object} thisArg The object to bind function to
 * @return {Object} The resulting value of object a
 */
function extend(a, b, thisArg) {
  forEach(b, function assignValue(val, key) {
    if (thisArg && typeof val === 'function') {
      a[key] = bind(val, thisArg);
    } else {
      a[key] = val;
    }
  });
  return a;
}

/**
 * Remove byte order marker. This catches EF BB BF (the UTF-8 BOM)
 *
 * @param {string} content with BOM
 * @return {string} content value without BOM
 */
function stripBOM(content) {
  if (content.charCodeAt(0) === 0xFEFF) {
    content = content.slice(1);
  }
  return content;
}

module.exports = {
  isArray: isArray,
  isArrayBuffer: isArrayBuffer,
  isBuffer: isBuffer,
  isFormData: isFormData,
  isArrayBufferView: isArrayBufferView,
  isString: isString,
  isNumber: isNumber,
  isObject: isObject,
  isPlainObject: isPlainObject,
  isUndefined: isUndefined,
  isDate: isDate,
  isFile: isFile,
  isBlob: isBlob,
  isFunction: isFunction,
  isStream: isStream,
  isURLSearchParams: isURLSearchParams,
  isStandardBrowserEnv: isStandardBrowserEnv,
  forEach: forEach,
  merge: merge,
  extend: extend,
  trim: trim,
  stripBOM: stripBOM
};


/***/ }),

/***/ "./resources/js/global.js":
/*!********************************!*\
  !*** ./resources/js/global.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

/** initialize javascript vendors. */
__webpack_require__(/*! ./vendors/vendors.js */ "./resources/js/vendors/vendors.js");
/** import javascript modules. */


__webpack_require__(/*! ./listener/listener.js */ "./resources/js/listener/listener.js");
/** import javascript helpers. */


__webpack_require__(/*! ./helpers/helpers.js */ "./resources/js/helpers/helpers.js");

/***/ }),

/***/ "./resources/js/helpers/_input.js":
/*!****************************************!*\
  !*** ./resources/js/helpers/_input.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

var input = /*#__PURE__*/function () {
  function input() {
    _classCallCheck(this, input);
  }

  _createClass(input, [{
    key: "init",
    value: function init(config) {
      /** fetch value. */
      if (config['action'] === 'value') {
        var items = {};

        for (var key in config['data']) {
          items[config['data'][key]] = document.querySelector(".".concat(config['target'], " > .crypto-modal > .modal-group > .modal-").concat(config['data'][key])).value;
        }

        return items;
      }
      /** clear input. */


      if (config['action'] === 'clear') {
        for (var _key in config['data']) {
          document.querySelector(".".concat(config['target'], " > .crypto-modal > .modal-group > .modal-").concat(config['data'][_key])).value = '';
        }
      }
      /** populate input. */


      if (config['action'] === 'populate') {
        /** loop through keys */
        for (var i = 0; i < config['data'].length; i++) {
          var content = config['el'].querySelector(".".concat(config['data'][i])).textContent;

          if (config['data'][i] === 'id') {
            var id = config['el'].querySelector(".".concat(config['data'][i])).dataset.id;
            document.querySelector(".".concat(config['target'], " > .crypto-modal > .modal-group > .modal-").concat(config['data'][i])).setAttribute('value', id);
          } else {
            document.querySelector(".".concat(config['target'], " > .crypto-modal > .modal-group > .modal-").concat(config['data'][i])).value = content;
          }
        }
      }
    }
  }]);

  return input;
}();

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (new input());

/***/ }),

/***/ "./resources/js/helpers/_message.js":
/*!******************************************!*\
  !*** ./resources/js/helpers/_message.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

var message = /*#__PURE__*/function () {
  function message() {
    _classCallCheck(this, message);
  }

  _createClass(message, [{
    key: "init",
    value: function init(config) {
      /** display success message and clear after moments. */
      var board = document.querySelector('.card > .header > .meta > .right > .messenger');
      /** display success message. */

      if (config['status'] === true) {
        board.classList.add('success');
        board.textContent = config['message'];
        setTimeout(function () {
          board.classList.remove('success');
        }, 10000);
      }
      /** display error message. */


      if (config['status'] === false) {
        board.classList.add('error');
        board.textContent = config['message'];
        setTimeout(function () {
          board.classList.remove('error');
        }, 10000);
      }
      /** return. */


      return true;
    }
  }]);

  return message;
}();

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (new message());

/***/ }),

/***/ "./resources/js/helpers/_node.js":
/*!***************************************!*\
  !*** ./resources/js/helpers/_node.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

var node = /*#__PURE__*/function () {
  function node() {
    _classCallCheck(this, node);
  }

  _createClass(node, [{
    key: "init",
    value: function init(config) {
      /** create base element. */
      if (config['statement'] === 'select') {
        /** create parent element. */
        var parent = document.createElement('div');
        parent.classList.add('items');
        /** create child element. */

        for (var key in config['input']) {
          var child = document.createElement('div');
          child.classList.add(key);
          child.textContent = config['input'][key];
          parent.appendChild(child);
          /** restructure id content. */

          if (key === 'id') {
            child.classList.add(key);
            child.setAttribute('data-id', config['input'][key]);
            child.textContent = config['id'];
          }
          /** restructure action content. */


          if (key === 'action') {
            var content = parent.querySelector('.action');
            content.textContent = '';
            var string = config['input'][key];
            var action = string.split(' ');

            for (var k in action) {
              /** create inner element. */
              var inner = document.createElement('span');
              inner.classList.add(action[k].toLowerCase());
              inner.textContent = action[k];
              content.appendChild(inner);
            }
          }
        }
        /** append parent element. */


        var element = document.querySelector(".".concat(config['target']));
        element.appendChild(parent);
      }
      /** update element. */


      if (config['statement'] === 'update') {
        var _element = document.querySelector(".".concat(config['target'], " > .items > [data-id='").concat(config['input']['id'], "']")).parentElement;
        /** run trough it all. */

        for (var _key in config['input']) {
          if (_key === 'action') continue;
          if (_key === 'id') continue;

          var _child = _element.querySelector(".".concat(_key));

          _child.textContent = config['input'][_key];
        }
      }
      /** destroy element. */


      if (config['statement'] === 'destroy') {
        var _element2 = document.querySelector(".".concat(config['target'], " > .items > [data-id='").concat(config['input'], "']"));

        _element2.parentElement.remove();
      }
      /** return. */


      return true;
    }
  }]);

  return node;
}();

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (new node());

/***/ }),

/***/ "./resources/js/helpers/_validators.js":
/*!*********************************************!*\
  !*** ./resources/js/helpers/_validators.js ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

var validator = /*#__PURE__*/function () {
  function validator() {
    _classCallCheck(this, validator);
  }

  _createClass(validator, [{
    key: "init",
    value: function init(config) {
      var success = {};
      var error = {};

      for (var key in config['data']) {
        if (config['data'][key] === '' || config['data'][key].length === 0) {
          error[key] = 'This field is required.';
        } else {
          if (key === 'quantity' || key === 'capital') {
            config['data'][key] = config['data'][key].replace(',', '');
          }

          if (typeof key === 'string') {
            if (/^[a-zA-Z0-9,. ]*$/i.test(config['data'][key]) === true) {
              success[key] = config['data'][key];
            } else {
              error[key] = 'Only letters and numbers are allowed.';
            }
          }
        }
      }

      return {
        error: error,
        success: success
      };
    }
  }]);

  return validator;
}();

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (new validator());

/***/ }),

/***/ "./resources/js/helpers/helpers.js":
/*!*****************************************!*\
  !*** ./resources/js/helpers/helpers.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _validators_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_validators.js */ "./resources/js/helpers/_validators.js");
/* harmony import */ var _input_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./_input.js */ "./resources/js/helpers/_input.js");
/* harmony import */ var _node_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./_node.js */ "./resources/js/helpers/_node.js");
/* harmony import */ var _message_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./_message.js */ "./resources/js/helpers/_message.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

/** import javascript helpers. */




/** define class. */

var helpers = /*#__PURE__*/function () {
  function helpers() {
    _classCallCheck(this, helpers);
  }

  _createClass(helpers, [{
    key: "init",
    value: function init(config) {
      var result;
      /** run validator. */

      if (config['type'] === 'validate') {
        result = _validators_js__WEBPACK_IMPORTED_MODULE_0__["default"].init(config);
      }
      /** run input. */


      if (config['type'] === 'input') {
        result = _input_js__WEBPACK_IMPORTED_MODULE_1__["default"].init(config);
      }
      /** run node. */


      if (config['type'] === 'node') {
        result = _node_js__WEBPACK_IMPORTED_MODULE_2__["default"].init(config);
      }
      /** run message. */


      if (config['type'] === 'message') {
        result = _message_js__WEBPACK_IMPORTED_MODULE_3__["default"].init(config);
      }

      return result;
    }
  }]);

  return helpers;
}();
/** export class. */


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (new helpers());

/***/ }),

/***/ "./resources/js/listener/dashboard/_sidebar.js":
/*!*****************************************************!*\
  !*** ./resources/js/listener/dashboard/_sidebar.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

var sidebar = /*#__PURE__*/function () {
  function sidebar() {
    _classCallCheck(this, sidebar);

    this.jcrypto = document.querySelector(".js-crypto");
    this.dcrypto = document.querySelector(".dm-crypto");
    this.jstock = document.querySelector(".js-stock");
    this.dstock = document.querySelector(".dm-stock");
  }

  _createClass(sidebar, [{
    key: "init",
    value: function init() {
      var _this = this;

      /** setup sidebar listener. */
      this.jcrypto.addEventListener("click", function (e) {
        if (e.target.dataset.sidebar === 'crypto') {
          if (_this.dcrypto.style.display === "none") {
            _this.dcrypto.style.display = "block";
            _this.dstock.style.display = "none";
          } else {
            _this.dcrypto.style.display = "none";
          }
        }
      });
      this.jstock.addEventListener("click", function (e) {
        if (e.target.dataset.sidebar === 'stock') {
          if (_this.dstock.style.display === "none") {
            _this.dstock.style.display = "block";
            _this.dcrypto.style.display = "none";
          } else {
            _this.dstock.style.display = "none";
          }
        }
      });
    }
  }]);

  return sidebar;
}();

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (new sidebar());

/***/ }),

/***/ "./resources/js/listener/dashboard/crypto/_games.js":
/*!**********************************************************!*\
  !*** ./resources/js/listener/dashboard/crypto/_games.js ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _helpers_helpers_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../helpers/helpers.js */ "./resources/js/helpers/helpers.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

/** import helper function. */


var games = /*#__PURE__*/function () {
  function games() {
    _classCallCheck(this, games);

    this.event = document.querySelector(".speak-crypto-games");
    this.template = document.querySelector(".stage-crypto-games");
    this.element = document.querySelector(".perform");
    this.helper = _helpers_helpers_js__WEBPACK_IMPORTED_MODULE_0__["default"];
  }

  _createClass(games, [{
    key: "init",
    value: function init() {
      var _this = this;

      /** setup overview listener. */
      this.event.addEventListener("click", function (e) {
        if (e.target.dataset.sidebar === 'games') {
          /** retrieve data .*/
          _this.request({
            method: 'GET',
            table: 'game'
          });
          /** clone template. */


          var content = _this.template.content.cloneNode(true);
          /** clear element before appending. */


          _this.element.innerHTML = '';
          /** append template content. */

          _this.element.appendChild(content);
          /** insert modal code block. */


          var record = document.querySelector('.click-game-record');

          if (record) {
            record.addEventListener("click", function (e) {
              /** show insert modal. */
              if (e.target.dataset.modal === 'insert') {
                _this.backdrop({
                  mode: 'show',
                  action: 'insert',
                  trigger: 'submit'
                });
              }
            });
          }
          /** update modal code block. */


          setTimeout(function () {
            var update = document.querySelectorAll('.crypto-game > .items > .action > .update');

            if (update) {
              var _loop = function _loop(i) {
                update[i].addEventListener("click", function () {
                  var grand = update[i].parentElement.parentElement;
                  /** show update modal. */

                  _this.backdrop({
                    mode: 'show',
                    action: 'update',
                    trigger: 'submit',
                    input: grand
                  });
                });
              };

              for (var i = 0; i < update.length; i++) {
                _loop(i);
              }
            }
          }, 10000);
          var info = document.querySelector('.card > .header > .meta > .right > .messenger');
          info.classList.add('info');
          info.textContent = 'Update button enabled right after this message disappear.';
          setTimeout(function () {
            info.classList.remove('info');
          }, 9000);
        }
      });
    }
  }, {
    key: "backdrop",
    value: function backdrop(config) {
      var _this2 = this;

      if (config['mode'] === 'show') {
        (function () {
          /** show modal. */
          var modal = document.querySelector(".crypto-game-wrapper");
          modal.classList.add('backdrop');
          modal.style.display = 'block';
          /** change insert header. */

          if (config['action'] === 'insert') {
            var header = document.querySelector('.modal-header');
            header.textContent = 'Add Game';
          }
          /** change update header. */


          if (config['action'] === 'update') {
            var _header = document.querySelector('.modal-header');

            _header.textContent = 'Update Game';
            /** extrapolate content into input value. */

            var items = ['id', 'title', 'genre', 'platform', 'blockchain', 'status', 'earn', 'free', 'rating'];

            for (var i = 0; i < items.length; i++) {
              var txt = config['input'].querySelector(".items > .".concat(items[i])).textContent;

              if (items[i] === 'id') {
                var id = config['input'].querySelector(".items > .".concat(items[i])).dataset.id;
                document.querySelector(".crypto-modal > .modal-group > .modal-".concat(items[i])).setAttribute('value', id);
              } else {
                document.querySelector(".crypto-modal > .modal-group > .modal-".concat(items[i])).setAttribute('value', txt);
              }
            }
          }
          /** set dismiss button listener. */


          var dismiss = document.querySelectorAll(".modal-dismiss");

          for (var _i = 0; _i < dismiss.length; _i++) {
            dismiss[_i].addEventListener('click', function () {
              /** hide modal. */
              modal.classList.remove('backdrop');
              modal.style.display = 'none';
            });
          }
          /** set submit button listener. */


          var submit = document.querySelector(".modal-submit");
          submit.addEventListener('click', function () {
            if (config['trigger'] === 'submit') {
              /** collect all input for processing. */
              var collect = _this2.helper.init({
                type: 'input',
                target: "crypto-game-wrapper",
                action: 'value',
                data: ['id', 'title', 'genre', 'platform', 'blockchain', 'status', 'earn', 'free', 'rating']
              });
              /** check if inputs are valid. */


              var result = _this2.helper.init({
                type: 'validate',
                data: collect
              });
              /** if no errors. */


              if (Object.keys(result['error']).length === 0) {
                /** hide modal. */
                modal.classList.remove('backdrop');
                modal.style.display = 'none';
                /** forward to backend. */

                _this2.request({
                  method: 'POST',
                  table: 'game',
                  statement: config['action'],
                  input: result['success']
                });
                /** clear input. */


                if (config['action'] === 'insert') {
                  _this2.helper.init({
                    type: 'input',
                    target: "crypto-game-wrapper",
                    action: 'clear',
                    data: ['id', 'title', 'genre', 'platform', 'blockchain', 'status', 'earn', 'free', 'rating']
                  });
                }
              } else {
                _this2.error({
                  target: "crypto-game-wrapper",
                  data: result['error']
                });
                /** show modal. */


                modal.classList.add('backdrop');
                modal.style.display = 'block';
              }
            }
          });
        })();
      }
    }
    /** function to process http request. */

  }, {
    key: "request",
    value: function request(config) {
      var _this3 = this;

      if (config['method'] === 'GET') {
        axios.get('/sanctum/csrf-cookie').then(function (response) {
          axios.get('/api/crypto-game-retrieve', {
            params: {
              'table': 'game'
            }
          }).then(function (response) {
            if (response.data.status === true) {
              /** populate order element with data. */
              if (response.data.coin) {
                for (var i = 0; i < response.data.coin.length; i++) {
                  _this3.helper.init({
                    type: 'node',
                    id: "".concat(i + 1),
                    target: 'crypto-game',
                    statement: response.data.sql,
                    input: response.data.coin[i]
                  });
                }
              }
            }
          });
        });
      }

      if (config['method'] === 'POST') {
        if (config['statement'] === 'insert') {
          axios.get('/sanctum/csrf-cookie').then(function (response) {
            axios.post('/api/crypto-game-store', {
              table: config['table'],
              statement: config['statement'],
              input: config['input']
            }).then(function (response) {
              /** populate order element with data. */
              if (response.data.status === true) {
                /** add or update element in document tree. */
                if (response.data.sql === 'select') {
                  for (var key in response.data.coin) {
                    _this3.helper.init({
                      type: 'node',
                      id: 0,
                      target: 'crypto-game',
                      statement: response.data.sql,
                      input: response.data.coin[key]
                    });
                  }
                }
              }
            });
          });
        }

        if (config['statement'] === 'update') {
          axios.get('/sanctum/csrf-cookie').then(function (response) {
            axios.post('/api/crypto-game-store', {
              table: config['table'],
              statement: config['statement'],
              input: config['input']
            }).then(function (response) {
              /** populate order element with data. */
              if (response.data.status === true) {
                /** add or update element in document tree. */
                if (response.data.sql === 'update') {
                  for (var key in response.data.coin) {
                    _this3.helper.init({
                      type: 'node',
                      id: 0,
                      target: 'crypto-game',
                      statement: response.data.sql,
                      input: response.data.coin[key]
                    });
                  }
                }
              }
              /** display message. */


              if (response.data.status) {
                _this3.helper.init({
                  type: 'message',
                  status: response.data.status,
                  message: response.data.message
                });
              }
            });
          });
        }
      }
    }
    /** function to display error. */

  }, {
    key: "error",
    value: function error(config) {
      /** run trough it all. */
      for (var key in config['data']) {
        var display = document.querySelector(".".concat(config['target'], " > .crypto-modal > .modal-group > .modal-").concat(key, "-error"));
        display.textContent = config['data'][key];
      }
      /** clear all error messages after five seconds. */


      setTimeout(function () {
        for (var _key in config['data']) {
          if (_key === 'id') continue;

          var _display = document.querySelector(".".concat(config['target'], " > .crypto-modal > .modal-group > .modal-").concat(_key, "-error"));

          _display.textContent = '';
        }
      }, 5000);
    }
  }]);

  return games;
}();

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (new games());

/***/ }),

/***/ "./resources/js/listener/dashboard/crypto/_moons.js":
/*!**********************************************************!*\
  !*** ./resources/js/listener/dashboard/crypto/_moons.js ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _helpers_helpers_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../helpers/helpers.js */ "./resources/js/helpers/helpers.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

/** import helper function. */


var moons = /*#__PURE__*/function () {
  function moons() {
    _classCallCheck(this, moons);

    this.event = document.querySelector(".speak-crypto-moons");
    this.template = document.querySelector(".stage-crypto-moons");
    this.element = document.querySelector(".perform");
    this.helper = _helpers_helpers_js__WEBPACK_IMPORTED_MODULE_0__["default"];
  }

  _createClass(moons, [{
    key: "init",
    value: function init() {
      var _this = this;

      /** setup overview listener. */
      this.event.addEventListener("click", function (e) {
        if (e.target.dataset.sidebar === 'moons') {
          /** retrieve data .*/
          _this.request({
            method: 'GET',
            table: 'moon'
          });
          /** clone template. */


          var content = _this.template.content.cloneNode(true);
          /** query document and do conditional statement base on the result. */


          var check = document.querySelector(".click-moon");

          if (check === null || check === undefined) {
            /** clear element before appending new content. */
            _this.element.innerHTML = '';
            /** append template content. */

            _this.element.appendChild(content);
            /** query document so to insert record event listener. */


            var record = document.querySelector(".click-moon-record");

            if (record) {
              record.addEventListener("click", function (e) {
                if (e.target.dataset.action === 'crypto') {
                  /** show insert modal. */
                  _this.backdrop({
                    mode: 'show',
                    action: 'insert'
                  });
                }
              });
              /** query close button. */

              var insertClose = document.querySelector('.crypto-moon-insert > .crypto-modal > .modal-group > .modal-close');

              if (insertClose) {
                insertClose.addEventListener('click', function (e) {
                  _this.backdrop({
                    mode: 'hide',
                    action: 'insert'
                  });
                });
              }
              /** query cancel button. */


              var insertCancel = document.querySelector('.crypto-moon-insert > .crypto-modal > .modal-group > .modal-button > .button-dismiss > .modal-cancel');

              if (insertCancel) {
                insertCancel.addEventListener('click', function (e) {
                  _this.backdrop({
                    mode: 'hide',
                    action: 'insert'
                  });
                });
              }
              /** query submit button. */


              var insertSubmit = document.querySelector('.crypto-moon-insert > .crypto-modal > .modal-group > .modal-button > .button-submit > .modal-insert');

              if (insertSubmit) {
                /** set event listener. */
                insertSubmit.addEventListener('click', function (e) {
                  _this.backdrop({
                    mode: 'hide',
                    action: 'insert',
                    trigger: 'submit',
                    input: insertSubmit
                  });
                });
              }
            }
            /** update modal code block. */


            setTimeout(function () {
              var update = document.querySelectorAll('.crypto-moon > .items > .action > .update');

              if (update) {
                var _loop = function _loop(i) {
                  update[i].addEventListener("click", function () {
                    /** show modal. */
                    _this.backdrop({
                      mode: 'show',
                      action: 'update'
                    });
                    /** populate modal. */


                    var parent = update[i].parentElement.parentElement;

                    _this.helper.init({
                      type: 'input',
                      action: 'populate',
                      target: 'crypto-moon-update',
                      el: parent,
                      data: ['id', 'name', 'coin', 'description', 'zone', 'website']
                    });
                    /** query submit button. */


                    var updateSubmit = document.querySelector('.crypto-moon-update > .crypto-modal > .modal-group > .modal-button > .button-submit > .modal-update');

                    if (updateSubmit) {
                      /** set event listener. */
                      updateSubmit.addEventListener('click', function (e) {
                        _this.backdrop({
                          mode: 'hide',
                          action: 'update',
                          trigger: 'submit',
                          input: updateSubmit
                        });
                      });
                    }
                  });
                };

                for (var i = 0; i < update.length; i++) {
                  _loop(i);
                }
                /** query document close button. */


                var updateClose = document.querySelector('.crypto-moon-update > .crypto-modal > .modal-group > .modal-close');

                if (updateClose) {
                  updateClose.addEventListener('click', function (e) {
                    _this.backdrop({
                      mode: 'hide',
                      action: 'update'
                    });
                  });
                }
                /** query document update button. */


                var updateCancel = document.querySelector('.crypto-moon-update > .crypto-modal > .modal-group > .modal-button > .button-dismiss > .modal-cancel');

                if (updateCancel) {
                  updateCancel.addEventListener('click', function (e) {
                    _this.backdrop({
                      mode: 'hide',
                      action: 'update'
                    });
                  });
                }
              }
            }, 10000);
            /** destroy modal code block. */

            setTimeout(function () {
              var destroy = document.querySelectorAll('.crypto-moon > .items > .action > .destroy');

              if (destroy) {
                var _loop2 = function _loop2(i) {
                  destroy[i].addEventListener("click", function () {
                    /** show modal. */
                    _this.backdrop({
                      mode: 'show',
                      action: 'destroy'
                    });
                    /** populate modal. */


                    var parent = destroy[i].parentElement.parentElement;

                    _this.helper.init({
                      type: 'input',
                      action: 'populate',
                      target: 'crypto-moon-destroy',
                      el: parent,
                      data: ['id', 'name', 'coin', 'description', 'zone', 'website']
                    });
                    /** query submit button. */


                    var destroySubmit = document.querySelector('.crypto-moon-destroy > .crypto-modal > .modal-group > .modal-button > .button-submit > .modal-destroy');

                    if (destroySubmit) {
                      /** set event listener. */
                      destroySubmit.addEventListener('click', function (e) {
                        _this.backdrop({
                          mode: 'hide',
                          action: 'destroy',
                          trigger: 'submit',
                          input: destroySubmit
                        });
                      });
                    }
                  });
                };

                for (var i = 0; i < destroy.length; i++) {
                  _loop2(i);
                }
                /** query document close button. */


                var destroyClose = document.querySelector('.crypto-moon-destroy > .crypto-modal > .modal-group > .modal-close');

                if (destroyClose) {
                  destroyClose.addEventListener('click', function (e) {
                    _this.backdrop({
                      mode: 'hide',
                      action: 'destroy'
                    });
                  });
                }
                /** query document update button. */


                var destroyCancel = document.querySelector('.crypto-moon-destroy > .crypto-modal > .modal-group > .modal-button > .button-dismiss > .modal-cancel');

                if (destroyCancel) {
                  destroyCancel.addEventListener('click', function (e) {
                    _this.backdrop({
                      mode: 'hide',
                      action: 'destroy'
                    });
                  });
                }
              }
            }, 10000);
            var info = document.querySelector('.card > .header > .meta > .right > .messenger');
            info.classList.add('info');
            info.textContent = 'Update button enabled right after this message disappear.';
            setTimeout(function () {
              info.classList.remove('info');
            }, 9000);
          }
        }
      });
    }
    /** function on how backdrop behaves. */

  }, {
    key: "backdrop",
    value: function backdrop(config) {
      if (config['mode'] === 'show') {
        /** query document to pinpoint modal element. */
        var show = document.querySelector(".crypto-moon-".concat(config['action']));
        /** remove and hide backdrop. */

        show.classList.add('backdrop');
        show.style.display = 'block';
      }

      if (config['mode'] === 'hide') {
        /** query document to pinpoint modal element. */
        var hide = document.querySelector(".crypto-moon-".concat(config['action']));
        /** remove and hide backdrop. */

        hide.classList.add('backdrop');
        hide.style.display = 'none';

        if (config['trigger'] === 'submit') {
          /** collect all input for processing. */
          var collect = this.helper.init({
            type: 'input',
            target: "crypto-moon-".concat(config['action']),
            action: 'value',
            data: ['id', 'name', 'coin', 'description', 'zone', 'website']
          });
          /** check if inputs are empty and valid. */

          var result = this.helper.init({
            type: 'validate',
            data: collect
          });
          /** double check and then proceed. */

          if (Object.keys(result['error']).length === 0) {
            /** hide backdrop. */
            this.backdrop({
              mode: 'hide',
              action: config['action']
            });
            /** request access token and then post to backend. */

            this.request({
              method: 'POST',
              table: 'moon',
              statement: "".concat(config['action']),
              input: result['success']
            });
            /** clear input if insert. */

            if (config['action'] === 'insert') {
              this.helper.init({
                type: 'input',
                target: "crypto-moon-".concat(config['action']),
                action: 'clear',
                data: ['name', 'coin', 'description', 'zone', 'website']
              });
            }
          } else {
            this.backdrop({
              mode: 'show',
              action: config['action']
            });
            this.error({
              target: "crypto-moon-".concat(config['action']),
              data: result['error']
            });
          }
        }
      }
    }
    /** function to process http request. */

  }, {
    key: "request",
    value: function request(config) {
      var _this2 = this;

      /** retrieve data. */
      if (config['method'] === 'GET') {
        axios.get('/sanctum/csrf-cookie').then(function (response) {
          axios.get('/api/crypto-moon-retrieve', {
            params: {
              'table': 'moon'
            }
          }).then(function (response) {
            if (response.data.status === true) {
              /** populate order element with data. */
              if (response.data.coin) {
                for (var i = 0; i < response.data.coin.length; i++) {
                  _this2.helper.init({
                    type: 'node',
                    id: "".concat(i + 1),
                    target: 'crypto-moon',
                    statement: response.data.sql,
                    input: response.data.coin[i]
                  });
                }
              }
            }
          });
        });
      }
      /** store data. */


      if (config['method'] === 'POST') {
        axios.get('/sanctum/csrf-cookie').then(function (response) {
          axios.post('/api/crypto-moon-store', {
            table: config['table'],
            statement: config['statement'],
            input: config['input']
          }).then(function (response) {
            /** populate order element with data. */
            if (response.data.status === true) {
              /** add or update element in document tree. */
              if (response.data.sql === 'select') {
                for (var key in response.data.coin) {
                  _this2.helper.init({
                    type: 'node',
                    id: 0,
                    target: 'crypto-moon',
                    statement: response.data.sql,
                    input: response.data.coin[key]
                  });
                }
              }
              /** add or update element in document tree. */


              if (response.data.sql === 'update') {
                for (var _key in response.data.coin) {
                  _this2.helper.init({
                    type: 'node',
                    target: 'crypto-moon',
                    statement: response.data.sql,
                    input: response.data.coin[_key]
                  });
                }
              }
              /** remove element in document tree. */


              if (response.data.sql === 'destroy') {
                _this2.helper.init({
                  type: 'node',
                  target: 'crypto-moon',
                  statement: response.data.sql,
                  input: response.data.coin
                });
              }
            }
            /** display message. */


            if (response.data.status) {
              _this2.helper.init({
                type: 'message',
                status: response.data.status,
                message: response.data.message
              });
            }
          });
        });
      }
    }
    /** function to display error. */

  }, {
    key: "error",
    value: function error(config) {
      /** run trough it all. */
      for (var key in config['data']) {
        var display = document.querySelector(".".concat(config['target'], " > .crypto-modal > .modal-group > .modal-").concat(key, "-error"));
        display.textContent = config['data'][key];
      }
      /** clear all error messages after five seconds. */


      setTimeout(function () {
        for (var _key2 in config['data']) {
          var _display = document.querySelector(".".concat(config['target'], " > .crypto-modal > .modal-group > .modal-").concat(_key2, "-error"));

          _display.textContent = '';
        }
      }, 5000);
    }
  }]);

  return moons;
}();

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (new moons());

/***/ }),

/***/ "./resources/js/listener/dashboard/crypto/_overviews.js":
/*!**************************************************************!*\
  !*** ./resources/js/listener/dashboard/crypto/_overviews.js ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

var overview = /*#__PURE__*/function () {
  function overview() {
    _classCallCheck(this, overview);

    this.event = document.querySelector(".speak-crypto-overviews");
    this.template = document.querySelector(".stage-crypto-overviews");
    this.element = document.querySelector(".perform");
  }

  _createClass(overview, [{
    key: "init",
    value: function init() {
      var _this = this;

      /** setup overview listener. */
      this.event.addEventListener("click", function (e) {
        if (e.target.dataset.sidebar === 'overviews') {
          console.log(e.target.dataset.sidebar);

          var content = _this.template.content.cloneNode(true);
          /** clear content*/


          _this.element.innerHTML = '';
          /** inject content */

          _this.element.appendChild(content);
        }

        _this.request();
      });
    }
  }, {
    key: "request",
    value: function request() {
      axios.get('/sanctum/csrf-cookie').then(function (response) {
        axios.get('/api/user').then(function (response) {
          console.log(response.data);
        });
        axios.get('/api/test').then(function (response) {
          console.log(response.data);
        });
      });
    }
  }]);

  return overview;
}();

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (new overview());

/***/ }),

/***/ "./resources/js/listener/dashboard/crypto/_portfolios.js":
/*!***************************************************************!*\
  !*** ./resources/js/listener/dashboard/crypto/_portfolios.js ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _helpers_helpers_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../helpers/helpers.js */ "./resources/js/helpers/helpers.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

/** import helper function. */


var portfolio = /*#__PURE__*/function () {
  /** default actions. */
  function portfolio() {
    _classCallCheck(this, portfolio);

    this.event = document.querySelector(".speak-crypto-portfolios");
    this.template = document.querySelector(".stage-crypto-portfolios");
    this.element = document.querySelector(".perform");
    this.helper = _helpers_helpers_js__WEBPACK_IMPORTED_MODULE_0__["default"];
  }
  /** fire it on. */


  _createClass(portfolio, [{
    key: "init",
    value: function init() {
      var _this = this;

      /** setup initial listener. */
      this.event.addEventListener("click", function (e) {
        if (e.target.dataset.sidebar === 'portfolios') {
          /** retrieve data .*/
          _this.request({
            method: 'GET',
            table: 'portfolio'
          });
          /** clone template. */


          var content = _this.template.content.cloneNode(true);
          /** query document and do conditional statement base on the result. */


          var check = document.querySelector('.crypto-order');

          if (check === null || check === undefined) {
            /** clear element before appending. */
            _this.element.innerHTML = '';
            /** append template content. */

            _this.element.appendChild(content);
            /** insert modal code block. */


            var record = document.querySelector('.click-order-record');

            if (record) {
              record.addEventListener("click", function (e) {
                /** show insert modal. */
                if (e.target.dataset.action === 'crypto') {
                  _this.backdrop({
                    mode: 'show',
                    action: 'insert'
                  });
                }
                /** query document to cancel button. */


                var insertCancel = document.querySelector(".crypto-portfolio-insert > .crypto-portfolio-modal > .insert-cancel");
                /** set insert event listener. */

                insertCancel.addEventListener('click', function (e) {
                  _this.backdrop({
                    mode: 'hide',
                    action: 'insert'
                  });
                });
                /** query document to close button. */

                var insertClose = document.querySelector(".crypto-portfolio-insert > .crypto-portfolio-modal > .insert-close");
                /** set close event listener. */

                insertClose.addEventListener('click', function (e) {
                  _this.backdrop({
                    mode: 'hide',
                    action: 'insert'
                  });
                });
                /** query document add button. */

                var insertSubmit = document.querySelector(".crypto-portfolio-insert > .crypto-portfolio-modal > .insert-submit");
                /** set submit event listener. */

                insertSubmit.addEventListener('click', function (e) {
                  _this.backdrop({
                    mode: 'hide',
                    action: 'insert',
                    trigger: 'submit',
                    input: insertSubmit
                  });
                });
              });
            }
            /** update modal code block. */


            setTimeout(function () {
              var update = document.querySelectorAll('.crypto-order > .items > .action > .update');

              if (update) {
                var _loop = function _loop(i) {
                  update[i].addEventListener("click", function () {
                    /** show update modal. */
                    _this.backdrop({
                      mode: 'show',
                      action: 'update'
                    });
                    /** populate modal form on load. */


                    var modal = document.querySelector(".crypto-portfolio-update > .crypto-portfolio-modal");
                    var cl = ['id', 'order', 'wallet', 'name', 'coin', 'quantity', 'capital'];

                    for (var key in cl) {
                      var text = update[i].parentElement.parentElement.querySelector(".".concat(cl[key])).textContent;

                      if (cl[key] === 'id') {
                        var id = update[i].parentElement.parentElement.querySelector(".".concat(cl[key])).dataset.id;
                        modal.querySelector(".modal-".concat(cl[key])).value = id;
                      } else {
                        modal.querySelector(".modal-".concat(cl[key])).value = text;
                      }
                    }
                    /** query document element. */


                    var updateSubmit = modal.querySelector(".update-submit");
                    /** set submit event listener. */

                    updateSubmit.addEventListener('click', function (e) {
                      _this.backdrop({
                        mode: 'hide',
                        action: 'update',
                        trigger: 'submit',
                        input: updateSubmit
                      });
                    });
                  });
                };

                for (var i = 0; i < update.length; i++) {
                  _loop(i);
                }
                /** query document close button. */


                var updateClose = document.querySelector(".crypto-portfolio-update > .crypto-portfolio-modal > .update-close");
                updateClose.addEventListener('click', function (e) {
                  _this.backdrop({
                    mode: 'hide',
                    action: 'update'
                  });
                });
                /** query document update button. */

                var updateCancel = document.querySelector(".crypto-portfolio-update > .crypto-portfolio-modal > .update-cancel");
                updateCancel.addEventListener('click', function (e) {
                  _this.backdrop({
                    mode: 'hide',
                    action: 'update'
                  });
                });
              }
            }, 10000);
            /** destroy modal code block. */

            setTimeout(function () {
              var trash = document.querySelectorAll('.crypto-order > .items > .action > .destroy');

              if (trash) {
                var _loop2 = function _loop2(i) {
                  trash[i].addEventListener("click", function () {
                    /** show destroy modal. */
                    _this.backdrop({
                      mode: 'show',
                      action: 'destroy'
                    });
                    /** populate modal form on load. */


                    var modal = document.querySelector(".crypto-portfolio-destroy > .crypto-portfolio-modal");
                    var cl = ['id', 'order', 'wallet', 'name', 'coin', 'quantity', 'capital'];

                    for (var key in cl) {
                      var text = trash[i].parentElement.parentElement.querySelector(".".concat(cl[key])).textContent;

                      if (cl[key] === 'id') {
                        var id = trash[i].parentElement.parentElement.querySelector(".".concat(cl[key])).dataset.id;
                        modal.querySelector(".modal-".concat(cl[key])).value = id;
                      } else {
                        modal.querySelector(".modal-".concat(cl[key])).value = text;
                      }
                    }
                    /** query document element. */


                    var destroySubmit = modal.querySelector(".destroy-submit");
                    /** set destroy event listener. */

                    destroySubmit.addEventListener('click', function (e) {
                      _this.backdrop({
                        mode: 'hide',
                        action: 'destroy',
                        trigger: 'submit',
                        input: destroySubmit
                      });
                    });
                  });
                  /** query document close button. */

                  var destroyClose = document.querySelector(".crypto-portfolio-destroy > .crypto-portfolio-modal > .destroy-close");
                  /** set cancel event listener. */

                  destroyClose.addEventListener('click', function (e) {
                    _this.backdrop({
                      mode: 'hide',
                      action: 'destroy'
                    });
                  });
                  /** query document destroy button. */

                  var destroyCancel = document.querySelector(".crypto-portfolio-destroy > .crypto-portfolio-modal > .destroy-cancel");
                  /** set cancel event listener. */

                  destroyCancel.addEventListener('click', function (e) {
                    _this.backdrop({
                      mode: 'hide',
                      action: 'destroy'
                    });
                  });
                };

                for (var i = 0; i < trash.length; i++) {
                  _loop2(i);
                }
              }
            }, 10000);
            var info = document.querySelector('.card > .header > .meta > .right > .messenger');
            info.classList.add('info');
            info.textContent = 'Update button enabled right after this message disappear.';
            setTimeout(function () {
              info.classList.remove('info');
            }, 9000);
          }
        }
      });
    }
    /** function on how backdrop behaves. */

  }, {
    key: "backdrop",
    value: function backdrop(config) {
      if (config['mode'] === 'show') {
        /** query document to pinpoint modal element. */
        var show = document.querySelector(".crypto-portfolio-".concat(config['action'], "-wrapper"));
        /** show modal. */

        show.classList.add('backdrop');
        show.style.display = 'block';
      }

      if (config['mode'] === 'hide') {
        /** query document to pinpoint modal element. */
        var modal = document.querySelector(".crypto-portfolio-".concat(config['action'], "-wrapper"));
        /** hide modal. */

        modal.classList.remove('backdrop');
        modal.style.display = 'none';

        if (config['trigger'] === 'submit') {
          /** collect all input for processing. */
          var collect = this.helper.init({
            type: 'input',
            section: 'portfolio',
            target: "crypto-portfolio-".concat(config['action']),
            action: 'value',
            data: ['id', 'wallet', 'order', 'name', 'coin', 'quantity', 'capital']
          });
          ;
          /** check if inputs are empty and valid. */

          var result = this.helper.init({
            type: 'validate',
            data: collect
          });
          /** double check and then proceed. */

          if (Object.keys(result['error']).length === 0) {
            /** request access token and then post to backend. */
            this.request({
              method: 'POST',
              table: 'portfolio',
              statement: config['action'],
              input: result['success']
            });
            /** clear input. */

            if (config['action'] === 'insert') {
              this.helper.init({
                type: 'input',
                section: 'portfolio',
                target: "crypto-portfolio-".concat(config['action']),
                action: 'clear',
                data: ['wallet', 'name', 'coin', 'quantity', 'capital']
              });
            }
          } else {
            this.error({
              target: "crypto-portfolio-".concat(config['action']),
              data: result['error']
            });
            /** show modal. */

            modal.classList.add('backdrop');
            modal.style.display = 'block';
          }
        }
      }
    }
    /** function to process http request. */

  }, {
    key: "request",
    value: function request(config) {
      var _this2 = this;

      /** retrieve data. */
      if (config['method'] === 'GET') {
        axios.get('/sanctum/csrf-cookie').then(function (response) {
          axios.get('/api/crypto-portfolio-retrieve', {
            params: {
              table: 'portfolio'
            }
          }).then(function (response) {
            if (response.data.status === true) {
              /** populate order element with data. */
              if (response.data.order) {
                for (var i = 0; i < response.data.order.length; i++) {
                  _this2.helper.init({
                    type: 'node',
                    id: "".concat(i + 1),
                    target: 'crypto-order',
                    statement: response.data.sql,
                    input: response.data.order[i]
                  });
                }
              }
              /** populate hold element with data. */


              if (response.data.hold.total) {
                for (var key in response.data.hold.total) {
                  _this2.helper.init({
                    type: 'node',
                    target: 'crypto-hold',
                    statement: response.data.sql,
                    input: response.data.hold.total[key]
                  });
                }
              }
              /** populate fund element with data. */


              if (response.data.fund.total) {
                for (var _key in response.data.fund.total) {
                  _this2.helper.init({
                    type: 'node',
                    target: 'crypto-fund',
                    statement: response.data.sql,
                    input: response.data.fund.total[_key]
                  });
                }
              }
            }
          });
        });
      }
      /** store data. */


      if (config['method'] === 'POST') {
        axios.get('/sanctum/csrf-cookie').then(function () {
          axios.post('/api/crypto-portfolio-store', {
            table: config['table'],
            statement: config['statement'],
            input: config['input']
          }).then(function (response) {
            /** populate order element with data. */
            if (response.data.status === true) {
              /** add or update element in document tree. */
              if (response.data.sql === 'select') {
                for (var key in response.data.coin) {
                  _this2.helper.init({
                    type: 'node',
                    id: 0,
                    target: 'crypto-order',
                    statement: response.data.sql,
                    input: response.data.coin[key]
                  });
                }
              }
              /** add or update element in document tree. */


              if (response.data.sql === 'update') {
                for (var _key2 in response.data.coin) {
                  _this2.helper.init({
                    type: 'node',
                    target: 'crypto-order',
                    statement: response.data.sql,
                    input: response.data.coin[_key2]
                  });
                }
              }
              /** remove element in document tree. */


              if (response.data.sql === 'destroy') {
                _this2.helper.init({
                  type: 'node',
                  target: 'crypto-order',
                  statement: response.data.sql,
                  input: response.data.coin
                });
              }
            }
            /** display message. */


            if (response.data.status) {
              _this2.helper.init({
                type: 'message',
                status: response.data.status,
                message: response.data.message
              });
            }
          });
        });
      }
    }
    /** function to display error. */

  }, {
    key: "error",
    value: function error(config) {
      /** run trough it all. */
      for (var key in config['data']) {
        var display = document.querySelector(".".concat(config['target'], " > .crypto-portfolio-modal > .modal-").concat(key, "-error"));
        display.textContent = config['data'][key];
      }
      /** clear all error messages after five seconds. */


      setTimeout(function () {
        for (var _key3 in config['data']) {
          var _display = document.querySelector(".".concat(config['target'], " > .crypto-portfolio-modal > .modal-").concat(_key3, "-error"));

          _display.textContent = '';
        }
      }, 5000);
    }
  }]);

  return portfolio;
}();

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (new portfolio());

/***/ }),

/***/ "./resources/js/listener/dashboard/crypto/_screens.js":
/*!************************************************************!*\
  !*** ./resources/js/listener/dashboard/crypto/_screens.js ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

var screen = /*#__PURE__*/function () {
  function screen() {
    _classCallCheck(this, screen);

    this.event = document.querySelector(".speak-crypto-screens");
    this.template = document.querySelector(".stage-crypto-screens");
    this.element = document.querySelector(".perform");
  }

  _createClass(screen, [{
    key: "init",
    value: function init() {
      var _this = this;

      /** setup overview listener. */
      this.event.addEventListener("click", function (e) {
        if (e.target.dataset.sidebar === 'screens') {
          console.log(e.target.dataset.sidebar);

          var content = _this.template.content.cloneNode(true);
          /** clear content*/


          _this.element.innerHTML = '';
          /** inject content*/

          _this.element.appendChild(content);
        }

        _this.request();
      });
    }
  }, {
    key: "request",
    value: function request() {
      axios.get('/sanctum/csrf-cookie').then(function (response) {
        axios.get('/api/user').then(function (response) {
          console.log(response.data);
        });
      });
    }
  }]);

  return screen;
}();

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (new screen());

/***/ }),

/***/ "./resources/js/listener/listener.js":
/*!*******************************************!*\
  !*** ./resources/js/listener/listener.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _dashboard_sidebar_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dashboard/_sidebar.js */ "./resources/js/listener/dashboard/_sidebar.js");
/* harmony import */ var _dashboard_crypto_overviews_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./dashboard/crypto/_overviews.js */ "./resources/js/listener/dashboard/crypto/_overviews.js");
/* harmony import */ var _dashboard_crypto_screens_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./dashboard/crypto/_screens.js */ "./resources/js/listener/dashboard/crypto/_screens.js");
/* harmony import */ var _dashboard_crypto_games_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./dashboard/crypto/_games.js */ "./resources/js/listener/dashboard/crypto/_games.js");
/* harmony import */ var _dashboard_crypto_moons_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./dashboard/crypto/_moons.js */ "./resources/js/listener/dashboard/crypto/_moons.js");
/* harmony import */ var _dashboard_crypto_portfolios_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./dashboard/crypto/_portfolios.js */ "./resources/js/listener/dashboard/crypto/_portfolios.js");
/** import javascript modules.*/

_dashboard_sidebar_js__WEBPACK_IMPORTED_MODULE_0__["default"].init();

_dashboard_crypto_overviews_js__WEBPACK_IMPORTED_MODULE_1__["default"].init();

_dashboard_crypto_screens_js__WEBPACK_IMPORTED_MODULE_2__["default"].init();

_dashboard_crypto_games_js__WEBPACK_IMPORTED_MODULE_3__["default"].init();

_dashboard_crypto_moons_js__WEBPACK_IMPORTED_MODULE_4__["default"].init();

_dashboard_crypto_portfolios_js__WEBPACK_IMPORTED_MODULE_5__["default"].init();

/***/ }),

/***/ "./resources/js/vendors/_axios.js":
/*!****************************************!*\
  !*** ./resources/js/vendors/_axios.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

var axios = /*#__PURE__*/function () {
  function axios() {
    _classCallCheck(this, axios);

    window.axios = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
  }

  _createClass(axios, [{
    key: "init",
    value: function init() {
      window.axios.defaults.withCredentials = true;
      window.axios.defaults.baseURL = "http://trade.poseidon.local/";
      window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
    }
  }]);

  return axios;
}();

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (new axios());

/***/ }),

/***/ "./resources/js/vendors/vendors.js":
/*!*****************************************!*\
  !*** ./resources/js/vendors/vendors.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _axios_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_axios.js */ "./resources/js/vendors/_axios.js");
/** require javascript vendor packages. */

_axios_js__WEBPACK_IMPORTED_MODULE_0__["default"].init();

/***/ }),

/***/ "./resources/css/scss/global.scss":
/*!****************************************!*\
  !*** ./resources/css/scss/global.scss ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./node_modules/process/browser.js":
/*!*****************************************!*\
  !*** ./node_modules/process/browser.js ***!
  \*****************************************/
/***/ ((module) => {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),

/***/ "./node_modules/axios/package.json":
/*!*****************************************!*\
  !*** ./node_modules/axios/package.json ***!
  \*****************************************/
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"name":"axios","version":"0.21.4","description":"Promise based HTTP client for the browser and node.js","main":"index.js","scripts":{"test":"grunt test","start":"node ./sandbox/server.js","build":"NODE_ENV=production grunt build","preversion":"npm test","version":"npm run build && grunt version && git add -A dist && git add CHANGELOG.md bower.json package.json","postversion":"git push && git push --tags","examples":"node ./examples/server.js","coveralls":"cat coverage/lcov.info | ./node_modules/coveralls/bin/coveralls.js","fix":"eslint --fix lib/**/*.js"},"repository":{"type":"git","url":"https://github.com/axios/axios.git"},"keywords":["xhr","http","ajax","promise","node"],"author":"Matt Zabriskie","license":"MIT","bugs":{"url":"https://github.com/axios/axios/issues"},"homepage":"https://axios-http.com","devDependencies":{"coveralls":"^3.0.0","es6-promise":"^4.2.4","grunt":"^1.3.0","grunt-banner":"^0.6.0","grunt-cli":"^1.2.0","grunt-contrib-clean":"^1.1.0","grunt-contrib-watch":"^1.0.0","grunt-eslint":"^23.0.0","grunt-karma":"^4.0.0","grunt-mocha-test":"^0.13.3","grunt-ts":"^6.0.0-beta.19","grunt-webpack":"^4.0.2","istanbul-instrumenter-loader":"^1.0.0","jasmine-core":"^2.4.1","karma":"^6.3.2","karma-chrome-launcher":"^3.1.0","karma-firefox-launcher":"^2.1.0","karma-jasmine":"^1.1.1","karma-jasmine-ajax":"^0.1.13","karma-safari-launcher":"^1.0.0","karma-sauce-launcher":"^4.3.6","karma-sinon":"^1.0.5","karma-sourcemap-loader":"^0.3.8","karma-webpack":"^4.0.2","load-grunt-tasks":"^3.5.2","minimist":"^1.2.0","mocha":"^8.2.1","sinon":"^4.5.0","terser-webpack-plugin":"^4.2.3","typescript":"^4.0.5","url-search-params":"^0.10.0","webpack":"^4.44.2","webpack-dev-server":"^3.11.0"},"browser":{"./lib/adapters/http.js":"./lib/adapters/xhr.js"},"jsdelivr":"dist/axios.min.js","unpkg":"dist/axios.min.js","typings":"./index.d.ts","dependencies":{"follow-redirects":"^1.14.0"},"bundlesize":[{"path":"./dist/axios.min.js","threshold":"5kB"}]}');

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/chunk loaded */
/******/ 	(() => {
/******/ 		var deferred = [];
/******/ 		__webpack_require__.O = (result, chunkIds, fn, priority) => {
/******/ 			if(chunkIds) {
/******/ 				priority = priority || 0;
/******/ 				for(var i = deferred.length; i > 0 && deferred[i - 1][2] > priority; i--) deferred[i] = deferred[i - 1];
/******/ 				deferred[i] = [chunkIds, fn, priority];
/******/ 				return;
/******/ 			}
/******/ 			var notFulfilled = Infinity;
/******/ 			for (var i = 0; i < deferred.length; i++) {
/******/ 				var [chunkIds, fn, priority] = deferred[i];
/******/ 				var fulfilled = true;
/******/ 				for (var j = 0; j < chunkIds.length; j++) {
/******/ 					if ((priority & 1 === 0 || notFulfilled >= priority) && Object.keys(__webpack_require__.O).every((key) => (__webpack_require__.O[key](chunkIds[j])))) {
/******/ 						chunkIds.splice(j--, 1);
/******/ 					} else {
/******/ 						fulfilled = false;
/******/ 						if(priority < notFulfilled) notFulfilled = priority;
/******/ 					}
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferred.splice(i--, 1)
/******/ 					var r = fn();
/******/ 					if (r !== undefined) result = r;
/******/ 				}
/******/ 			}
/******/ 			return result;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"/assets/js/global": 0,
/******/ 			"assets/css/global": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		__webpack_require__.O.j = (chunkId) => (installedChunks[chunkId] === 0);
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
/******/ 			var [chunkIds, moreModules, runtime] = data;
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			if(chunkIds.some((id) => (installedChunks[id] !== 0))) {
/******/ 				for(moduleId in moreModules) {
/******/ 					if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 						__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 					}
/******/ 				}
/******/ 				if(runtime) var result = runtime(__webpack_require__);
/******/ 			}
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkId] = 0;
/******/ 			}
/******/ 			return __webpack_require__.O(result);
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = self["webpackChunk"] = self["webpackChunk"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module depends on other loaded chunks and execution need to be delayed
/******/ 	__webpack_require__.O(undefined, ["assets/css/global"], () => (__webpack_require__("./resources/js/global.js")))
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["assets/css/global"], () => (__webpack_require__("./resources/css/scss/global.scss")))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;