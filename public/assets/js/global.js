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

"use strict";
/** strick mode on. */

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
      if (config.action === 'value') {
        var items = [];

        for (var i = 0; i < config.data.length; i++) {
          /** screen api. */
          if (config.data[i] === 'api') {
            items[config.data[i]] = document.querySelector(".".concat(config.target, " > .modal-form > .modal-group > .modal-gecko > .modal-").concat(config.data[i])).value;
          }
          /** screen edge. */
          else if (config.data[i] === 'edge') {
            items[config.data[i]] = document.querySelector(".".concat(config.target, " > .modal-form > .modal-group > .modal-gecko > .modal-").concat(config.data[i])).value;
          }
          /** the rest. */
          else {
            items[config.data[i]] = document.querySelector(".".concat(config.target, " > .modal-form > .modal-group > .modal-").concat(config.data[i])).value;
          }
        }

        return items;
      }
      /** clear input. */


      if (config.action === 'clear') {
        for (var key in config.data) {
          if (config.data.hasOwnProperty(key)) {
            /** screen api. */
            if (config.data[key] === 'api') {
              document.querySelector(".".concat(config.target, " > .modal-form > .modal-group > .modal-gecko > .modal-").concat(config.data[key])).value = '';
            }
            /** screen edge. */
            else if (config.data[key] === 'edge') {
              document.querySelector(".".concat(config.target, " > .modal-form > .modal-group > .modal-gecko > .modal-").concat(config.data[key])).value = '';
            }
            /** the rest. */
            else {
              document.querySelector(".".concat(config.target, " > .modal-form > .modal-group > .modal-").concat(config.data[key])).value = '';
            }
          }
        }
      }
      /** populate input. */


      if (config.action === 'populate') {
        /** loop through keys */
        for (var _i = 0; _i < config.data.length; _i++) {
          /** scavenge content. */
          var content = config.el.querySelector(".".concat(config.data[_i])).textContent;
          /** set id value. */

          if (config.data[_i] === 'id') {
            var id = config.el.querySelector(".".concat(config.data[_i])).dataset.id;
            document.querySelector(".".concat(config.target, " > .modal-form > .modal-group > .modal-").concat(config.data[_i])).setAttribute('value', id);
          }
          /** set api value. */
          else if (config.data[_i] === 'api') {
            document.querySelector(".".concat(config.target, " > .modal-form > .modal-group > .modal-gecko > .modal-").concat(config.data[_i])).value = content;
          }
          /** set edge value. */
          else if (config.data[_i] === 'edge') {
            document.querySelector(".".concat(config.target, " > .modal-form > .modal-group > .modal-gecko > .modal-").concat(config.data[_i])).value = content;
          }
          /** the rest. */
          else {
            document.querySelector(".".concat(config.target, " > .modal-form > .modal-group > .modal-").concat(config.data[_i])).value = content;
          }
        }
      }
      /** for destory modal. */


      if (config.action === 'destroy') {
        /** declare repository. */
        var _content = [];
        /** if to set content. */

        if (config['section'] === 'populate') {
          /** loop through keys */
          for (var _i2 = 0; _i2 < config.data.length; _i2++) {
            /** set id value. */
            if (config.data[_i2] === 'id') {
              var _id = config.el.querySelector(".".concat(config.data[_i2])).dataset.id;
              document.querySelector(".".concat(config.target, " > .modal-form > .modal-group > .modal-").concat(config.data[_i2])).setAttribute('value', _id);
            } else {
              var text = config.el.querySelector(".".concat(config.data[_i2])).textContent;
              document.querySelector(".".concat(config.target, " > .modal-form > .modal-group > .modal-").concat(config.data[_i2], "-question > .modal-").concat(config.data[_i2])).textContent = text;
            }
          }
        }
        /** if to get content. */


        if (config['section'] === 'content') {
          /** loop through keys */
          for (var _i3 = 0; _i3 < config.data.length; _i3++) {
            if (config.data[_i3] === 'id') {
              _content[config.data[_i3]] = document.querySelector(".".concat(config.target, " > .modal-form > .modal-group > .modal-").concat(config.data[_i3])).value;
            }
            /** the rest. */
            else {
              _content[config.data[_i3]] = document.querySelector(".".concat(config.target, " > .modal-form > .modal-group > .modal-").concat(config.data[_i3], "-question > .modal-").concat(config.data[_i3])).textContent;
            }
          }
        }
        /** return something. */


        return _content;
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

      if (config.status === true) {
        board.classList.add('success');
        board.textContent = config.message;
        setTimeout(function () {
          board.classList.remove('success');
        }, 3000);
      }
      /** display error message. */


      if (config.status === false) {
        board.classList.add('error');
        board.textContent = config.message;
        setTimeout(function () {
          board.classList.remove('error');
        }, 3000);
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
      if (config.statement === "select") {
        /** create parent element. */
        var parent = document.createElement("div");
        parent.classList.add("items");
        /** create child element. */

        for (var key in config.input) {
          /** create document node. */
          var child = document.createElement("div");
          child.classList.add(key);
          child.textContent = config.input[key];
          parent.appendChild(child);
          /** set style display to none. */

          if (key === "edge") {
            child.style.display = 'none';
          }
          /** set style display to none. */


          if (key === "sector") {
            child.style.display = 'none';
          }
          /** restructure id content. */


          if (key === "id") {
            child.classList.add(key);
            child.setAttribute("data-id", config.input[key]);
            child.textContent = config.id;
          }
          /** restructure action content. */


          if (key === "action") {
            var content = parent.querySelector(".action");
            content.textContent = "";
            var string = config.input[key];
            var action = string.split(" ");

            for (var k in action) {
              /** create inner element. */
              var inner = document.createElement("span");
              /** set class. */

              inner.classList.add(action[k].toLowerCase());
              /** evaluate value. */

              if (action[k] === "Show") {
                inner = document.createElement("a");
                inner.setAttribute("href", "https://edge.pse.com.ph/companyPage/financial_reports_view.do?cmpy_id=".concat(config.input.edge));
                inner.setAttribute("target", "_blank");
                inner.textContent = action[k];
                inner.classList.add(action[k].toLowerCase());
              } else {
                inner.textContent = action[k];
              }
              /** append to document node. */


              content.appendChild(inner);
            }
          }
        }
        /** append parent element. */


        var element = document.querySelector(".".concat(config.target));
        element.appendChild(parent);
      }
      /** update element. */


      if (config.statement === "update") {
        var _element = document.querySelector(".".concat(config.target, " > .items > [data-id='").concat(config.input.id, "']")).parentElement;
        /** run trough it all. */

        for (var _key in config.input) {
          if (_key === "edge") continue;
          if (_key === "action") continue;
          if (_key === "id") continue;

          var _child = _element.querySelector(".".concat(_key));

          _child.textContent = config.input[_key];
        }
      }
      /** destroy element. */


      if (config.statement === "destroy") {
        var _element2 = document.querySelector(".".concat(config.target, " > .items > [data-id='").concat(config.input, "']"));

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

/***/ "./resources/js/helpers/_sanitize.js":
/*!*******************************************!*\
  !*** ./resources/js/helpers/_sanitize.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

var sanitize = /*#__PURE__*/function () {
  function sanitize() {
    _classCallCheck(this, sanitize);
  }

  _createClass(sanitize, [{
    key: "init",
    value: function init(config) {
      var result = {};

      if (config.action === 'comma') {
        for (var y in config.data) {
          if (config.data.hasOwnProperty(y)) {
            for (var x in config.condition) {
              if (config.condition.hasOwnProperty(x)) {
                /** replace comma. */
                if (config.condition[x] === y) {
                  result[y] = config.data[config.condition[x]].replace(/,/g, '');
                }
                /** check if key undefined. */


                if (!result.hasOwnProperty(y)) {
                  /** the rest. */
                  result[y] = config.data[y];
                }
              }
            }
          }
        }
      }
      /** return. */


      return result;
    }
  }]);

  return sanitize;
}();

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (new sanitize());

/***/ }),

/***/ "./resources/js/helpers/_titlecase.js":
/*!********************************************!*\
  !*** ./resources/js/helpers/_titlecase.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

var titlecase = /*#__PURE__*/function () {
  function titlecase() {
    _classCallCheck(this, titlecase);
  }

  _createClass(titlecase, [{
    key: "init",
    value: function init(config) {
      var splitStr = config.string.toLowerCase().split(' ');

      for (var i = 0; i < splitStr.length; i++) {
        splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
      }

      return splitStr.join(' ');
    }
  }]);

  return titlecase;
}();

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (new titlecase());

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

      for (var key in config.data) {
        if (config.data[key] === '' || config.data[key].length === 0) {
          error[key] = 'This field is required.';
        } else {
          if (key === 'quantity' || key === 'capital') {
            config.data[key] = config.data[key].replace(',', '');
          }

          if (typeof key === 'string') {
            if (/^[a-zA-Z0-9\-&,. ]*$/i.test(config.data[key]) === true) {
              success[key] = config.data[key];
            } else {
              error[key] = 'Only letters and numbers are allowed.';
            }
          }
        }
      }

      return {
        error: error,
        success: success,
        message: 'Unable to proceed, some inputs are required.'
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
/* harmony import */ var _sanitize_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./_sanitize.js */ "./resources/js/helpers/_sanitize.js");
/* harmony import */ var _titlecase_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./_titlecase.js */ "./resources/js/helpers/_titlecase.js");
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
      /** run input. */

      if (config.type === 'input') {
        result = _input_js__WEBPACK_IMPORTED_MODULE_1__["default"].init(config);
      }
      /** run message. */


      if (config.type === 'message') {
        result = _message_js__WEBPACK_IMPORTED_MODULE_3__["default"].init(config);
      }
      /** run node. */


      if (config.type === 'node') {
        result = _node_js__WEBPACK_IMPORTED_MODULE_2__["default"].init(config);
      }
      /** run message. */


      if (config.type === 'sanitize') {
        result = _sanitize_js__WEBPACK_IMPORTED_MODULE_4__["default"].init(config);
      }
      /** run validator. */


      if (config.type === 'validate') {
        result = _validators_js__WEBPACK_IMPORTED_MODULE_0__["default"].init(config);
      }
      /** run titlecase. */


      if (config.type === 'titlecase') {
        result = _titlecase_js__WEBPACK_IMPORTED_MODULE_5__["default"].init(config);
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


var crypto_game = /*#__PURE__*/function () {
  function crypto_game() {
    _classCallCheck(this, crypto_game);

    this.event = document.querySelector(".speak-crypto-games");
    this.template = document.querySelector(".stage-crypto-games");
    this.element = document.querySelector(".perform");
    this.helper = _helpers_helpers_js__WEBPACK_IMPORTED_MODULE_0__["default"];
  }

  _createClass(crypto_game, [{
    key: "init",
    value: function init() {
      var _this = this;

      /** setup overview listener. */
      this.event.addEventListener("click", function (e) {
        if (e.target.dataset.sidebar === "crypto_games") {
          /** retrieve data .*/
          _this.request({
            method: "GET",
            table: "game"
          });
          /** clone template. */


          var content = _this.template.content.cloneNode(true);
          /** query document and do conditional statement base on the result. */


          var check = document.querySelector(".click-game");

          if (check === null || check === undefined) {
            /** clear element before appending new content. */
            _this.element.innerHTML = "";
            /** append template content. */

            _this.element.appendChild(content);
            /** query document so to insert record event listener. */


            var record = document.querySelector(".click-game-record");

            if (record) {
              record.addEventListener("click", function (e) {
                if (e.target.dataset.action === "crypto") {
                  /** show modal. */
                  _this.backdrop({
                    mode: "show",
                    action: "insert"
                  });
                  /** set submit event listener. */


                  var submit = document.querySelector(".crypto-game-insert > .modal-form > .modal-group > .modal-button > .button-submit > .modal-insert");

                  if (submit) {
                    var callback = function callback() {
                      _this.backdrop({
                        action: "insert",
                        mode: "submit",
                        element: submit,
                        callback: callback
                      });
                    };
                    /** add event listener. */


                    submit.addEventListener("click", callback, false);
                  }
                }
              });
              /** set close event listener. */

              var close = document.querySelector(".crypto-game-insert > .modal-form > .modal-group > .modal-close");

              if (close) {
                var callback = function callback() {
                  _this.backdrop({
                    action: "insert",
                    mode: "hide"
                  });
                };
                /** add event listener. */


                close.addEventListener("click", callback, false);
              }
              /** set cancel event listener. */


              var cancel = document.querySelector(".crypto-game-insert > .modal-form > .modal-group > .modal-button > .button-dismiss > .modal-cancel");

              if (cancel) {
                var _callback = function _callback() {
                  _this.backdrop({
                    action: "insert",
                    mode: "hide"
                  });
                };
                /** add event listener. */


                cancel.addEventListener("click", _callback, false);
              }
            }
            /** update modal code block. */


            setTimeout(function () {
              var update = document.querySelectorAll(".crypto-game > .items > .action > .update");

              if (update) {
                var _loop = function _loop(i) {
                  update[i].addEventListener("click", function () {
                    /** show modal. */
                    _this.backdrop({
                      mode: "show",
                      action: "update"
                    });
                    /** populate modal. */


                    var parent = update[i].parentElement.parentElement;

                    _this.helper.init({
                      type: "input",
                      action: "populate",
                      target: "crypto-game-update",
                      el: parent,
                      data: ["id", "title", "genre", "platform", "blockchain", "status", "earn", "free", "rating"]
                    });
                    /** set submit event listener. */


                    var submit = document.querySelector(".crypto-game-update > .modal-form > .modal-group > .modal-button > .button-submit > .modal-update");

                    if (submit) {
                      var _callback4 = function _callback4() {
                        _this.backdrop({
                          action: "update",
                          mode: "submit",
                          element: submit,
                          callback: _callback4
                        });
                      };
                      /** add event listener. */


                      submit.addEventListener("click", _callback4, false);
                    }
                  });
                };

                for (var i = 0; i < update.length; i++) {
                  _loop(i);
                }
                /** set close event listener. */


                var _close = document.querySelector(".crypto-game-update > .modal-form > .modal-group > .modal-close");

                if (_close) {
                  var _callback2 = function _callback2() {
                    _this.backdrop({
                      action: "update",
                      mode: "hide"
                    });
                  };
                  /** add event listener. */


                  _close.addEventListener("click", _callback2, false);
                }
                /** set cancel event listener. */


                var _cancel = document.querySelector(".crypto-game-update > .modal-form > .modal-group > .modal-button > .button-dismiss > .modal-cancel");

                if (_cancel) {
                  var _callback3 = function _callback3() {
                    _this.backdrop({
                      action: "update",
                      mode: "hide"
                    });
                  };
                  /** add event listener. */


                  _cancel.addEventListener("click", _callback3, false);
                }
              }
            }, 10000);
            /** destroy modal code block. */

            setTimeout(function () {
              var destroy = document.querySelectorAll(".crypto-game > .items > .action > .destroy");

              if (destroy) {
                var _loop2 = function _loop2(i) {
                  destroy[i].addEventListener("click", function () {
                    /** show modal. */
                    _this.backdrop({
                      mode: "show",
                      action: "destroy"
                    });
                    /** populate modal. */


                    var parent = destroy[i].parentElement.parentElement;

                    _this.helper.init({
                      type: "input",
                      action: "populate",
                      target: "crypto-game-destroy",
                      el: parent,
                      data: ["id", "title", "genre", "platform", "blockchain", "status", "earn", "free", "rating"]
                    });
                    /** set submit event listener. */


                    var submit = document.querySelector(".crypto-game-destroy > .modal-form > .modal-group > .modal-button > .button-submit > .modal-destroy");

                    if (submit) {
                      var _callback7 = function _callback7() {
                        _this.backdrop({
                          action: "destroy",
                          mode: "submit",
                          element: submit,
                          callback: _callback7
                        });
                      };
                      /** add event listener. */


                      submit.addEventListener("click", _callback7, false);
                    }
                  });
                };

                for (var i = 0; i < destroy.length; i++) {
                  _loop2(i);
                }
                /** set close event listener. */


                var _close2 = document.querySelector(".crypto-game-destroy > .modal-form > .modal-group > .modal-close");

                if (_close2) {
                  var _callback5 = function _callback5() {
                    _this.backdrop({
                      action: "destroy",
                      mode: "hide"
                    });
                  };
                  /** add event listener. */


                  _close2.addEventListener("click", _callback5, false);
                }
                /** set cancel event listener. */


                var _cancel2 = document.querySelector(".crypto-game-destroy > .modal-form > .modal-group > .modal-button > .button-dismiss > .modal-cancel");

                if (_cancel2) {
                  var _callback6 = function _callback6() {
                    _this.backdrop({
                      action: "destroy",
                      mode: "hide"
                    });
                  };
                  /** add event listener. */


                  _cancel2.addEventListener("click", _callback6, false);
                }
              }
            }, 10000);
            var info = document.querySelector(".card > .header > .meta > .right > .messenger");
            info.classList.add("info");
            info.textContent = "Update button enabled right after this message disappear.";
            setTimeout(function () {
              info.classList.remove("info");
            }, 9000);
          }
        }
      });
    }
    /** function on how backdrop behaves. */

  }, {
    key: "backdrop",
    value: function backdrop(config) {
      /** query modal. */
      var modal = document.querySelector(".crypto-game-".concat(config["action"]));

      if (config["mode"] === "show") {
        /** show backdrop. */
        modal.classList.add("backdrop");
        modal.style.display = "block";
        /** clear input if insert. */

        if (config["action"] === "insert") {
          this.helper.init({
            type: "input",
            target: "crypto-game-".concat(config["action"]),
            action: "clear",
            data: ["title", "genre", "platform", "blockchain", "status", "earn", "free", "rating"]
          });
        }
      }

      if (config["mode"] === "hide") {
        /** hide backdrop. */
        modal.classList.remove("backdrop");
        modal.style.display = "none";
      }

      if (config["mode"] === "submit") {
        /** collect all input for processing. */
        var collect = this.helper.init({
          type: "input",
          target: "crypto-game-".concat(config["action"]),
          action: "value",
          data: ["title", "genre", "platform", "blockchain", "status", "earn", "free", "rating"]
        });
        /** check if inputs are empty and valid. */

        var result = this.helper.init({
          type: "validate",
          data: collect
        });
        /** double check and then proceed. */

        if (Object.keys(result.error).length === 0) {
          /** request access token and then post to backend. */
          this.request({
            method: "POST",
            table: "game",
            statement: "".concat(config["action"]),
            input: result["success"]
          });
        } else {
          /** display user  message. */
          this.helper.init({
            type: "message",
            status: false,
            message: result["message"]
          });
        }
        /** remove listener. */


        config["element"].removeEventListener('click', config['callback']);
        /** hide modal. */

        modal.classList.remove("backdrop");
        modal.style.display = "none";
      }
    }
    /** function to process http request. */

  }, {
    key: "request",
    value: function request(config) {
      var _this2 = this;

      /** retrieve data. */
      if (config.method === "GET") {
        axios.get("/sanctum/csrf-cookie").then(function (response) {
          axios.get("/api/crypto-game-retrieve", {
            params: {
              "table": "game"
            }
          }).then(function (response) {
            if (response.data.status === true) {
              /** populate order element with data. */
              if (response.data.coin) {
                for (var i = 0; i < response.data.coin.length; i++) {
                  _this2.helper.init({
                    type: "node",
                    id: "".concat(i + 1),
                    target: "crypto-game",
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


      if (config.method === "POST") {
        axios.get("/sanctum/csrf-cookie").then(function (response) {
          axios.post("/api/crypto-game-store", {
            table: config.table,
            statement: config.statement,
            input: config.input
          }).then(function (response) {
            /** populate order element with data. */
            if (response.data.status === true) {
              /** add or update element in document tree. */
              if (response.data.sql === "select") {
                for (var key in response.data.coin) {
                  _this2.helper.init({
                    type: "node",
                    id: 0,
                    target: "crypto-game",
                    statement: response.data.sql,
                    input: response.data.coin[key]
                  });
                }
              }
              /** add or update element in document tree. */


              if (response.data.sql === "update") {
                for (var _key in response.data.coin) {
                  _this2.helper.init({
                    type: "node",
                    target: "crypto-game",
                    statement: response.data.sql,
                    input: response.data.coin[_key]
                  });
                }
              }
              /** remove element in document tree. */


              if (response.data.sql === "destroy") {
                _this2.helper.init({
                  type: "node",
                  target: "crypto-game",
                  statement: response.data.sql,
                  input: response.data.coin
                });
              }
              /** display success message. */


              _this2.helper.init({
                type: "message",
                status: response.data.status,
                message: response.data.message
              });
            }
            /** display error message. */


            if (response.data.status === false) {
              _this2.helper.init({
                type: "message",
                status: response.data.status,
                message: response.data.message
              });
            }
          });
        });
      }
    }
  }]);

  return crypto_game;
}();

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (new crypto_game());

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


var crypto_moon = /*#__PURE__*/function () {
  function crypto_moon() {
    _classCallCheck(this, crypto_moon);

    this.event = document.querySelector(".speak-crypto-moons");
    this.template = document.querySelector(".stage-crypto-moons");
    this.element = document.querySelector(".perform");
    this.helper = _helpers_helpers_js__WEBPACK_IMPORTED_MODULE_0__["default"];
  }

  _createClass(crypto_moon, [{
    key: "init",
    value: function init() {
      var _this = this;

      /** setup overview listener. */
      this.event.addEventListener("click", function (e) {
        if (e.target.dataset.sidebar === "crypto_moons") {
          /** retrieve data .*/
          _this.request({
            method: "GET",
            table: "moon"
          });
          /** clone template. */


          var content = _this.template.content.cloneNode(true);
          /** query document and do conditional statement base on the result. */


          var check = document.querySelector(".click-moon");

          if (check === null || check === undefined) {
            /** clear element before appending new content. */
            _this.element.innerHTML = "";
            /** append template content. */

            _this.element.appendChild(content);
            /** query document so to insert record event listener. */


            var record = document.querySelector(".click-moon-record");

            if (record) {
              record.addEventListener("click", function (e) {
                if (e.target.dataset.action === "crypto") {
                  /** show modal. */
                  _this.backdrop({
                    mode: "show",
                    action: "insert"
                  });
                  /** set submit event listener. */


                  var _submit = document.querySelector(".crypto-moon-insert > .modal-form > .modal-group > .modal-button > .button-submit > .modal-insert");

                  if (_submit) {
                    var callback = function callback() {
                      _this.backdrop({
                        action: "insert",
                        mode: "submit",
                        element: _submit,
                        callback: callback
                      });
                    };
                    /** add event listener. */


                    _submit.addEventListener("click", callback, false);
                  }
                }
              });
              /** set close event listener. */

              var close = document.querySelector(".crypto-moon-insert > .modal-form > .modal-group > .modal-close");

              if (close) {
                var callback = function callback() {
                  _this.backdrop({
                    action: "insert",
                    mode: "hide"
                  });
                };
                /** add event listener. */


                close.addEventListener("click", callback, false);
              }
              /** set cancel event listener. */


              var cancel = document.querySelector(".crypto-moon-insert > .modal-form > .modal-group > .modal-button > .button-dismiss > .modal-cancel");

              if (cancel) {
                var _callback = function _callback() {
                  _this.backdrop({
                    action: "insert",
                    mode: "hide"
                  });
                };
                /** add event listener. */


                cancel.addEventListener("click", _callback, false);
              }
            }
            /** update modal code block. */


            setTimeout(function () {
              var update = document.querySelectorAll(".crypto-moon > .items > .action > .update");

              if (update) {
                var _loop = function _loop(i) {
                  update[i].addEventListener("click", function () {
                    /** show modal. */
                    _this.backdrop({
                      mode: "show",
                      action: "update"
                    });
                    /** populate modal. */


                    var parent = update[i].parentElement.parentElement;

                    _this.helper.init({
                      type: "input",
                      action: "populate",
                      target: "crypto-moon-update",
                      el: parent,
                      data: ["id", "name", "coin", "description", "zone", "website"]
                    });
                    /** set submit event listener. */


                    var submit = document.querySelector(".crypto-moon-update > .modal-form > .modal-group > .modal-button > .button-submit > .modal-update");

                    if (submit) {
                      var _callback4 = function _callback4() {
                        _this.backdrop({
                          action: "update",
                          mode: "submit",
                          element: submit,
                          callback: _callback4
                        });
                      };
                      /** add event listener. */


                      submit.addEventListener("click", _callback4, false);
                    }
                  });
                };

                for (var i = 0; i < update.length; i++) {
                  _loop(i);
                }
                /** set close event listener. */


                var _close = document.querySelector(".crypto-moon-update > .modal-form > .modal-group > .modal-close");

                if (_close) {
                  var _callback2 = function _callback2() {
                    _this.backdrop({
                      action: "update",
                      mode: "hide"
                    });
                  };
                  /** add event listener. */


                  _close.addEventListener("click", _callback2, false);
                }
                /** set cancel event listener. */


                var _cancel = document.querySelector(".crypto-moon-update > .modal-form > .modal-group > .modal-button > .button-dismiss > .modal-cancel");

                if (_cancel) {
                  var _callback3 = function _callback3() {
                    _this.backdrop({
                      action: "update",
                      mode: "hide"
                    });
                  };
                  /** add event listener. */


                  _cancel.addEventListener("click", _callback3, false);
                }
              }
            }, 10000);
            /** destroy modal code block. */

            setTimeout(function () {
              var destroy = document.querySelectorAll(".crypto-moon > .items > .action > .destroy");

              if (destroy) {
                var _loop2 = function _loop2(i) {
                  destroy[i].addEventListener("click", function () {
                    /** show modal. */
                    _this.backdrop({
                      mode: "show",
                      action: "destroy"
                    });
                    /** populate modal. */


                    var parent = destroy[i].parentElement.parentElement;

                    _this.helper.init({
                      type: "input",
                      action: "populate",
                      target: "crypto-moon-destroy",
                      el: parent,
                      data: ["id", "name", "coin", "description", "zone", "website"]
                    });
                    /** set submit event listener. */


                    letsubmit = document.querySelector(".crypto-moon-destroy > .modal-form > .modal-group > .modal-button > .button-submit > .modal-destroy");

                    if (submit) {
                      var _callback7 = function _callback7() {
                        _this.backdrop({
                          action: "destroy",
                          mode: "submit",
                          element: submit,
                          callback: _callback7
                        });
                      };
                      /** add event listener. */


                      submit.addEventListener("click", _callback7, false);
                    }
                  });
                };

                for (var i = 0; i < destroy.length; i++) {
                  _loop2(i);
                }
                /** set close event listener. */


                var _close2 = document.querySelector(".crypto-moon-destroy > .modal-form > .modal-group > .modal-close");

                if (_close2) {
                  var _callback5 = function _callback5() {
                    _this.backdrop({
                      action: "destroy",
                      mode: "hide"
                    });
                  };
                  /** add event listener. */


                  _close2.addEventListener("click", _callback5, false);
                }
                /** set cancel event listener. */


                var _cancel2 = document.querySelector(".crypto-moon-destroy > .modal-form > .modal-group > .modal-button > .button-dismiss > .modal-cancel");

                if (_cancel2) {
                  var _callback6 = function _callback6() {
                    _this.backdrop({
                      action: "destroy",
                      mode: "hide"
                    });
                  };
                  /** add event listener. */


                  _cancel2.addEventListener("click", _callback6, false);
                }
              }
            }, 10000);
            var info = document.querySelector(".card > .header > .meta > .right > .messenger");
            info.classList.add("info");
            info.textContent = "Update button enabled right after this message disappear.";
            setTimeout(function () {
              info.classList.remove("info");
            }, 9000);
          }
        }
      });
    }
    /** function on how backdrop behaves. */

  }, {
    key: "backdrop",
    value: function backdrop(config) {
      /** query modal. */
      var modal = document.querySelector(".crypto-moon-".concat(config["action"]));

      if (config["mode"] === "show") {
        /** show backdrop. */
        modal.classList.add("backdrop");
        modal.style.display = "block";
        /** clear input if insert. */

        if (config["action"] === "insert") {
          this.helper.init({
            type: "input",
            target: "crypto-moon-".concat(config["action"]),
            action: "clear",
            data: ["name", "coin", "description", "zone", "website"]
          });
        }
      }

      if (config["mode"] === "hide") {
        /** hide backdrop. */
        modal.classList.add("backdrop");
        modal.style.display = "none";
      }

      if (config["mode"] === "submit") {
        /** collect all input for processing. */
        var collect = this.helper.init({
          type: "input",
          target: "crypto-moon-".concat(config["action"]),
          action: "value",
          data: ["id", "name", "coin", "description", "zone", "website"]
        });
        /** check if inputs are empty and valid. */

        var result = this.helper.init({
          type: "validate",
          data: collect
        });
        /** double check and then proceed. */

        if (Object.keys(result.error).length === 0) {
          /** request access token and then post to backend. */
          this.request({
            method: "POST",
            table: "moon",
            statement: "".concat(config["action"]),
            input: result["success"]
          });
        } else {
          /** display user  message. */
          this.helper.init({
            type: "message",
            status: false,
            message: result["message"]
          });
        }
        /** remove listener. */


        config["element"].removeEventListener('click', config['callback']);
        /** hide modal. */

        modal.classList.remove("backdrop");
        modal.style.display = "none";
      }
    }
    /** function to process http request. */

  }, {
    key: "request",
    value: function request(config) {
      var _this2 = this;

      /** retrieve data. */
      if (config.method === "GET") {
        axios.get("/sanctum/csrf-cookie").then(function (response) {
          axios.get("/api/crypto-moon-retrieve", {
            params: {
              "table": "moon"
            }
          }).then(function (response) {
            if (response.data.status === true) {
              /** populate order element with data. */
              if (response.data.coin) {
                for (var i = 0; i < response.data.coin.length; i++) {
                  _this2.helper.init({
                    type: "node",
                    id: "".concat(i + 1),
                    target: "crypto-moon",
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


      if (config.method === "POST") {
        axios.get("/sanctum/csrf-cookie").then(function (response) {
          axios.post("/api/crypto-moon-store", {
            table: config.table,
            statement: config.statement,
            input: config.input
          }).then(function (response) {
            /** populate order element with data. */
            if (response.data.status === true) {
              /** add or update element in document tree. */
              if (response.data.sql === "select") {
                for (var key in response.data.coin) {
                  _this2.helper.init({
                    type: "node",
                    id: 0,
                    target: "crypto-moon",
                    statement: response.data.sql,
                    input: response.data.coin[key]
                  });
                }
              }
              /** add or update element in document tree. */


              if (response.data.sql === "update") {
                for (var _key in response.data.coin) {
                  _this2.helper.init({
                    type: "node",
                    target: "crypto-moon",
                    statement: response.data.sql,
                    input: response.data.coin[_key]
                  });
                }
              }
              /** remove element in document tree. */


              if (response.data.sql === "destroy") {
                _this2.helper.init({
                  type: "node",
                  target: "crypto-moon",
                  statement: response.data.sql,
                  input: response.data.coin
                });
              }
              /** display success message. */


              _this2.helper.init({
                type: "message",
                status: response.data.status,
                message: response.data.message
              });
            }
            /** display error message. */


            if (response.data.status === false) {
              _this2.helper.init({
                type: "message",
                status: response.data.status,
                message: response.data.message
              });
            }
          });
        });
      }
    }
  }]);

  return crypto_moon;
}();

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (new crypto_moon());

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
/* harmony import */ var _helpers_helpers_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../helpers/helpers.js */ "./resources/js/helpers/helpers.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

/** import helper function. */


var crypto_overview = /*#__PURE__*/function () {
  function crypto_overview() {
    _classCallCheck(this, crypto_overview);

    this.event = document.querySelector(".speak-crypto-overviews");
    this.template = document.querySelector(".stage-crypto-overviews");
    this.element = document.querySelector(".perform");
    this.helper = _helpers_helpers_js__WEBPACK_IMPORTED_MODULE_0__["default"];
  }

  _createClass(crypto_overview, [{
    key: "init",
    value: function init() {
      var _this = this;

      /** fetch data. */
      this.request();
      /** setup overview listener. */

      this.event.addEventListener("click", function (e) {
        if (e.target.dataset.sidebar === 'crypto_overviews') {
          /** clone template. */
          var content = _this.template.content.cloneNode(true);
          /** clear content. */


          _this.element.innerHTML = '';
          /** inject content. */

          _this.element.appendChild(content);
          /** fetch data. */


          _this.request();
        }
      });
    }
  }, {
    key: "request",
    value: function request() {
      axios.get('/sanctum/csrf-cookie').then(function (response) {
        axios.get('/api/crypto-overview-retrieve').then(function (response) {
          /** populate portfolio box. */
          if (response.data.coin.portfolios) {
            /** query element. */
            var port = document.querySelector(".crypto-overview > .boxes > [data-section='".concat(response.data.coin.portfolios.section, "'] > .body"));
            /** loop through response. */

            for (var item in response.data.coin.portfolios) {
              /** create parent div. */
              var parent = document.createElement('div');
              parent.classList.add('two-column');

              if (response.data.coin.portfolios.hasOwnProperty(item)) {
                /** ignore section key. */
                if (item === 'section') {
                  continue;
                }
                /** create key div. */


                var one = document.createElement('div');
                one.classList.add('one');
                one.textContent = item.charAt(0).toUpperCase() + item.slice(1);
                /** append parent. */

                parent.appendChild(one);
                /** create value div. */

                var two = document.createElement('div');
                two.classList.add('two');
                two.textContent = response.data.coin.portfolios[item].toLocaleString('en');

                if (item === 'capital') {
                  two.textContent = response.data.coin.portfolios[item].toLocaleString('en', {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2
                  });
                }
                /** append parent. */


                parent.appendChild(two);
              }
              /** append port. */


              port.appendChild(parent);
            }
          }
          /** populate moon box. */


          if (response.data.coin.moons) {
            /** query element. */
            var moon = document.querySelector(".crypto-overview > .boxes > [data-section='".concat(response.data.coin.moons.section, "'] > .body"));
            /** loop through response. */

            for (var _item in response.data.coin.moons) {
              /** create parent div. */
              var _parent = document.createElement('div');

              _parent.classList.add('one-column');

              if (response.data.coin.moons.hasOwnProperty(_item)) {
                /** ignore section key. */
                if (_item === 'section') {
                  continue;
                }
                /** create key div. */


                var _one = document.createElement('h2');

                _one.classList.add('one');

                _one.textContent = response.data.coin.moons[_item];
                /** append parent. */

                _parent.appendChild(_one);
              }
              /** append port. */


              moon.appendChild(_parent);
            }
          }
          /** populate game box. */


          if (response.data.coin.games) {
            /** query element. */
            var game = document.querySelector(".crypto-overview > .boxes > [data-section='".concat(response.data.coin.games.section, "'] > .body"));
            /** loop through response. */

            for (var _item2 in response.data.coin.games) {
              /** create parent div. */
              var _parent2 = document.createElement('div');

              _parent2.classList.add('one-column');

              if (response.data.coin.games.hasOwnProperty(_item2)) {
                /** ignore section key. */
                if (_item2 === 'section') {
                  continue;
                }
                /** create key div. */


                var _one2 = document.createElement('h2');

                _one2.classList.add('one');

                _one2.textContent = response.data.coin.games[_item2];
                /** append parent. */

                _parent2.appendChild(_one2);
              }
              /** append port. */


              game.appendChild(_parent2);
            }
          }
          /** populate screen box. */


          if (response.data.coin.screens) {
            /** query element. */
            var screen = document.querySelector(".crypto-overview > .boxes > [data-section='".concat(response.data.coin.screens.section, "'] > .body"));
            /** loop through response. */

            for (var _item3 in response.data.coin.screens) {
              /** create parent div. */
              var _parent3 = document.createElement('div');

              _parent3.classList.add('one-column');

              if (response.data.coin.screens.hasOwnProperty(_item3)) {
                /** ignore section key. */
                if (_item3 === 'section') {
                  continue;
                }
                /** create key div. */


                var _one3 = document.createElement('h2');

                _one3.classList.add('one');

                _one3.textContent = response.data.coin.screens[_item3];
                /** append parent. */

                _parent3.appendChild(_one3);
              }
              /** append port. */


              screen.appendChild(_parent3);
            }
          }
        });
      });
    }
  }]);

  return crypto_overview;
}();

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (new crypto_overview());

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


var crypto_portfolio = /*#__PURE__*/function () {
  /** default actions. */
  function crypto_portfolio() {
    _classCallCheck(this, crypto_portfolio);

    this.event = document.querySelector(".speak-crypto-portfolios");
    this.template = document.querySelector(".stage-crypto-portfolios");
    this.element = document.querySelector(".perform");
    this.helper = _helpers_helpers_js__WEBPACK_IMPORTED_MODULE_0__["default"];
  }
  /** fire it on. */


  _createClass(crypto_portfolio, [{
    key: "init",
    value: function init() {
      var _this = this;

      /** setup initial listener. */
      this.event.addEventListener("click", function (e) {
        if (e.target.dataset.sidebar === 'crypto_portfolios') {
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


            var record = document.querySelector('.click-crypto-record');

            if (record) {
              record.addEventListener("click", function (e) {
                /** show insert modal. */
                if (e.target.dataset.action === 'crypto') {
                  /** show modal. */
                  _this.backdrop({
                    mode: 'show',
                    action: 'insert'
                  });
                  /** set submit event listener. */


                  var submit = document.querySelector('.crypto-portfolio-insert > .modal-form > .modal-group > .modal-button > .button-submit > .modal-insert');

                  if (submit) {
                    var callback = function callback() {
                      _this.backdrop({
                        action: "insert",
                        mode: "submit",
                        element: submit,
                        callback: callback
                      });
                    };
                    /** add event listener. */


                    submit.addEventListener("click", callback, false);
                  }
                }
                /** set insert event listener. */


                var cancel = document.querySelector('.crypto-portfolio-insert > .modal-form > .modal-group > .modal-close');

                if (cancel) {
                  var _callback = function _callback() {
                    _this.backdrop({
                      action: "insert",
                      mode: "hide"
                    });
                  };
                  /** add event listener. */


                  cancel.addEventListener("click", _callback, false);
                }
                /** set close event listener. */


                var close = document.querySelector('.crypto-portfolio-insert > .modal-form > .modal-group > .modal-button > .button-dismiss > .modal-cancel');

                if (close) {
                  var _callback2 = function _callback2() {
                    _this.backdrop({
                      action: "insert",
                      mode: "hide"
                    });
                  };
                  /** add event listener. */


                  close.addEventListener("click", _callback2, false);
                }
              });
            }
            /** update modal code block. */


            setTimeout(function () {
              var update = document.querySelectorAll('.crypto-order > .items > .action > .update');

              if (update) {
                var _loop = function _loop(i) {
                  /* jshint -W083 */
                  update[i].addEventListener("click", function () {
                    /** show update modal. */
                    _this.backdrop({
                      mode: 'show',
                      action: 'update'
                    });
                    /** populate modal. */


                    var parent = update[i].parentElement.parentElement;

                    _this.helper.init({
                      type: 'input',
                      action: 'populate',
                      target: 'crypto-portfolio-update',
                      el: parent,
                      data: ['id', 'order', 'wallet', 'name', 'coin', 'quantity', 'capital']
                    });
                    /** set submit event listener. */


                    var submit = document.querySelector('.crypto-portfolio-update > .modal-form > .modal-group > .modal-button > .button-submit > .modal-update');

                    if (submit) {
                      var _callback4 = function _callback4() {
                        _this.backdrop({
                          action: "update",
                          mode: "submit",
                          element: submit,
                          callback: _callback4
                        });
                      };
                      /** add event listener. */


                      submit.addEventListener("click", _callback4, false);
                    }
                  });
                  /* jshint +W083 */
                };

                for (var i = 0; i < update.length; i++) {
                  _loop(i);
                }
                /** query document close button. */


                var close = document.querySelector('.crypto-portfolio-update > .modal-form > .modal-group > .modal-close');

                if (close) {
                  var callback = function callback() {
                    _this.backdrop({
                      action: "update",
                      mode: "hide"
                    });
                  };
                  /** add event listener. */


                  close.addEventListener("click", callback, false);
                }
                /** query document update button. */


                var cancel = document.querySelector('.crypto-portfolio-update > .modal-form > .modal-group > .modal-button > .button-dismiss > .modal-cancel');

                if (cancel) {
                  var _callback3 = function _callback3() {
                    _this.backdrop({
                      action: "update",
                      mode: "hide"
                    });
                  };
                  /** add event listener. */


                  cancel.addEventListener("click", _callback3, false);
                }
              }
            }, 10000);
            /** destroy modal code block. */

            setTimeout(function () {
              var destroy = document.querySelectorAll('.crypto-order > .items > .action > .destroy');

              if (destroy) {
                var _loop2 = function _loop2(i) {
                  /* jshint -W083 */
                  destroy[i].addEventListener("click", function () {
                    /** show destroy modal. */
                    _this.backdrop({
                      mode: 'show',
                      action: 'destroy'
                    });
                    /** populate modal. */


                    var parent = destroy[i].parentElement.parentElement;

                    _this.helper.init({
                      type: 'input',
                      action: 'populate',
                      target: 'crypto-portfolio-destroy',
                      el: parent,
                      data: ['id', 'order', 'wallet', 'name', 'coin', 'quantity', 'capital']
                    });
                    /** set destroy event listener. */


                    var submit = document.querySelector('.crypto-portfolio-destroy > .modal-form > .modal-group > .modal-button > .button-submit > .modal-destroy');

                    if (submit) {
                      var callback = function callback() {
                        _this.backdrop({
                          action: "destroy",
                          mode: "submit",
                          element: submit,
                          callback: callback
                        });
                      };
                      /** add event listener. */


                      submit.addEventListener("click", callback, false);
                    }
                  });
                  /** set cancel event listener. */

                  var close = document.querySelector('.crypto-portfolio-destroy > .modal-form > .modal-group > .modal-close');

                  if (close) {
                    var callback = function callback() {
                      _this.backdrop({
                        action: "destroy",
                        mode: "hide"
                      });
                    };
                    /** add event listener. */


                    close.addEventListener("click", callback, false);
                  }
                  /** set cancel event listener. */


                  var cancel = document.querySelector('.crypto-portfolio-destroy > .modal-form > .modal-group > .modal-button > .button-dismiss > .modal-cancel');

                  if (cancel) {
                    var _callback5 = function _callback5() {
                      _this.backdrop({
                        action: "destroy",
                        mode: "hide"
                      });
                    };
                    /** add event listener. */


                    cancel.addEventListener("click", _callback5, false);
                  }
                };

                for (var i = 0; i < destroy.length; i++) {
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
      /** query document to pinpoint modal element. */
      var modal = document.querySelector(".crypto-portfolio-".concat(config.action));

      if (config["mode"] === 'show') {
        /** show modal. */
        modal.classList.add('backdrop');
        modal.style.display = 'block';
        /** clear input. */

        if (config["action"] === 'insert') {
          this.helper.init({
            type: 'input',
            section: 'portfolio',
            target: "crypto-portfolio-".concat(config.action),
            action: 'clear',
            data: ['wallet', 'name', 'coin', 'quantity', 'capital']
          });
        }
      }

      if (config["mode"] === 'hide') {
        /** hide modal. */
        modal.classList.remove('backdrop');
        modal.style.display = 'none';
      }

      if (config["mode"] === 'submit') {
        /** collect all input for processing. */
        var collect = this.helper.init({
          type: 'input',
          section: 'portfolio',
          target: "crypto-portfolio-".concat(config.action),
          action: 'value',
          data: ['id', 'wallet', 'order', 'name', 'coin', 'quantity', 'capital']
        });
        /** check if inputs are empty and valid. */

        var result = this.helper.init({
          type: 'validate',
          data: collect
        });
        /** double check and then proceed. */

        if (Object.keys(result.error).length === 0) {
          /** sanitize input. */
          var sanitize = this.helper.init({
            type: "sanitize",
            action: "comma",
            condition: ['wallet', 'name', 'coin', 'quantity', 'capital'],
            data: result["success"]
          });
          /** request access token and then post to backend. */

          this.request({
            method: 'POST',
            table: 'portfolio',
            statement: config["action"],
            input: sanitize
          });
        } else {
          /** display user  message. */
          this.helper.init({
            type: "message",
            status: false,
            message: result["message"]
          });
        }
        /** remove listener. */


        config["element"].removeEventListener('click', config['callback']);
        /** hide modal. */

        modal.classList.remove("backdrop");
        modal.style.display = "none";
      }
    }
    /** function to process http request. */

  }, {
    key: "request",
    value: function request(config) {
      var _this2 = this;

      /** retrieve data. */
      if (config.method === 'GET') {
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


      if (config.method === 'POST') {
        axios.get('/sanctum/csrf-cookie').then(function () {
          axios.post('/api/crypto-portfolio-store', {
            table: config.table,
            order: config.input.order.toLowerCase(),
            statement: config.statement,
            input: config.input
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
              /** display success message. */


              _this2.helper.init({
                type: 'message',
                status: response.data.status,
                message: response.data.message
              });
            }
            /** display error message. */


            if (response.data.status === false) {
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
  }]);

  return crypto_portfolio;
}();

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (new crypto_portfolio());

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
/* harmony import */ var _helpers_helpers_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../helpers/helpers.js */ "./resources/js/helpers/helpers.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

/** import helper function. */


var crypto_screen = /*#__PURE__*/function () {
  function crypto_screen() {
    _classCallCheck(this, crypto_screen);

    this.event = document.querySelector(".speak-crypto-screens");
    this.template = document.querySelector(".stage-crypto-screens");
    this.element = document.querySelector(".perform");
    this.helper = _helpers_helpers_js__WEBPACK_IMPORTED_MODULE_0__["default"];
  }

  _createClass(crypto_screen, [{
    key: "init",
    value: function init() {
      var _this = this;

      /** setup overview listener. */
      this.event.addEventListener("click", function (e) {
        if (e.target.dataset.sidebar === "crypto_screens") {
          /** retrieve data .*/
          _this.request({
            method: "GET",
            table: "screen",
            provider: "local"
          });

          var content = _this.template.content.cloneNode(true);
          /** clear element before appending new content. */


          _this.element.innerHTML = "";
          /** append template content. */

          _this.element.appendChild(content);
          /** query document so to insert record event listener. */


          var record = document.querySelector(".click-screen-record");

          if (record) {
            record.addEventListener("click", function (e) {
              if (e.target.dataset.action === "crypto") {
                /** show modal. */
                _this.backdrop({
                  mode: "show",
                  action: "insert"
                });
                /** set submit event listener. */


                var submit = document.querySelector(".crypto-screen-insert > .modal-form > .modal-group > .modal-button > .button-submit > .modal-insert");

                if (submit) {
                  var callback = function callback() {
                    _this.backdrop({
                      action: "insert",
                      mode: "submit",
                      element: submit,
                      callback: callback
                    });
                  };
                  /** add event listener. */


                  submit.addEventListener("click", callback, {
                    once: true
                  });
                  /** disable after clicked. */

                  submit.disabled = true;
                }
                /** disable after clicked. */


                submit.disabled = false;
              }
            });
            /** set close event listener. */

            var close = document.querySelector(".crypto-screen-insert > .modal-form > .modal-group > .modal-close");

            if (close) {
              var callback = function callback() {
                _this.backdrop({
                  action: "insert",
                  mode: "hide"
                });
              };
              /** add event listener. */


              close.addEventListener("click", callback, false);
            }
            /** set cancel event listener. */


            var cancel = document.querySelector(".crypto-screen-insert > .modal-form > .modal-group > .modal-button > .button-dismiss > .modal-cancel");

            if (cancel) {
              var _callback = function _callback() {
                _this.backdrop({
                  action: "insert",
                  mode: "hide"
                });
              };
              /** add event listener. */


              cancel.addEventListener("click", _callback, false);
            }
          }
          /** update modal code block. */


          setTimeout(function () {
            var update = document.querySelectorAll(".crypto-screen > .items > .action > .update");

            if (update) {
              var _loop = function _loop(i) {
                update[i].addEventListener("click", function () {
                  /** show update modal. */
                  _this.backdrop({
                    mode: "show",
                    action: "update"
                  });
                  /** populate modal. */


                  var parent = update[i].parentElement.parentElement;

                  _this.helper.init({
                    type: "input",
                    action: "populate",
                    target: "crypto-screen-update",
                    el: parent,
                    data: ["id", "api", "coin", "price", "market", "volume", "change"]
                  });
                  /** set submit event listener. */


                  var submit = document.querySelector(".crypto-screen-update > .modal-form > .modal-group > .modal-button > .button-submit > .modal-update");

                  if (submit) {
                    var _callback4 = function _callback4() {
                      _this.backdrop({
                        action: "update",
                        mode: "submit",
                        element: submit,
                        callback: _callback4
                      });
                      /** disable after clicked. */


                      submit.disabled = true;
                    };
                    /** add event listener. */


                    submit.addEventListener("click", _callback4, {
                      once: true
                    });
                  }
                  /** disable after clicked. */


                  submit.disabled = false;
                });
              };

              for (var i = 0; i < update.length; i++) {
                _loop(i);
              }
              /** query document close button. */


              var _close = document.querySelector(".crypto-screen-update > .modal-form > .modal-group > .modal-close");

              if (_close) {
                var _callback2 = function _callback2() {
                  _this.backdrop({
                    action: "update",
                    mode: "hide"
                  });
                };
                /** add event listener. */


                _close.addEventListener("click", _callback2, false);
              }
              /** query document update button. */


              var _cancel = document.querySelector(".crypto-screen-update > .modal-form > .modal-group > .modal-button > .button-dismiss > .modal-cancel");

              if (_cancel) {
                var _callback3 = function _callback3() {
                  _this.backdrop({
                    action: "update",
                    mode: "hide"
                  });
                };
                /** add event listener. */


                _cancel.addEventListener("click", _callback3, false);
              }
            }
          }, 10000);
          /** destroy modal code block. */

          setTimeout(function () {
            var destroy = document.querySelectorAll(".crypto-screen > .items > .action > .destroy");

            if (destroy) {
              var _loop2 = function _loop2(i) {
                /* jshint -W083 */
                destroy[i].addEventListener("click", function () {
                  /** show destroy modal. */
                  _this.backdrop({
                    mode: "show",
                    action: "destroy"
                  });
                  /** populate modal. */


                  var parent = destroy[i].parentElement.parentElement;

                  _this.helper.init({
                    type: "input",
                    action: "populate",
                    target: "crypto-screen-destroy",
                    el: parent,
                    data: ["id", "api", "coin", "price", "market", "volume", "change"]
                  });
                  /** set destroy event listener. */


                  var submit = document.querySelector(".crypto-screen-destroy > .modal-form > .modal-group > .modal-button > .button-submit > .modal-destroy");

                  if (submit) {
                    var _callback5 = function _callback5() {
                      _this.backdrop({
                        action: "destroy",
                        mode: "submit",
                        element: submit,
                        callback: _callback5
                      });
                    };
                    /** add event listener. */


                    submit.addEventListener("click", _callback5, false);
                  }
                });
                /* jshint +W083 */

                /** set cancel event listener. */

                var close = document.querySelector(".crypto-screen-destroy > .modal-form > .modal-group > .modal-close");

                if (close) {
                  var _callback6 = function _callback6() {
                    _this.backdrop({
                      action: "destroy",
                      mode: "hide"
                    });
                  };
                  /** add event listener. */


                  close.addEventListener("click", _callback6, false);
                }
                /** set cancel event listener. */


                var cancel = document.querySelector(".crypto-screen-destroy > .modal-form > .modal-group > .modal-button > .button-dismiss > .modal-cancel");

                if (cancel) {
                  var _callback7 = function _callback7() {
                    _this.backdrop({
                      action: "destroy",
                      mode: "hide"
                    });
                  };
                  /** add event listener. */


                  cancel.addEventListener("click", _callback7, false);
                }
              };

              for (var i = 0; i < destroy.length; i++) {
                _loop2(i);
              }
            }
          }, 10000);
          var info = document.querySelector(".card > .header > .meta > .right > .messenger");
          info.classList.add("info");
          info.textContent = "Update button enabled right after this message disappear.";
          setTimeout(function () {
            info.classList.remove("info");
          }, 9000);
        }
      });
    }
    /** function on how backdrop behaves. */

  }, {
    key: "backdrop",
    value: function backdrop(config) {
      var _this2 = this;

      /** query document to pinpoint modal element. */
      var modal = document.querySelector(".crypto-screen-".concat(config["action"]));

      if (config["mode"] === "show") {
        /** show backdrop. */
        modal.classList.add("backdrop");
        modal.style.display = "block";
        /** clear input if insert. */

        if (config["action"] === "insert") {
          this.helper.init({
            type: "input",
            target: "crypto-screen-".concat(config["action"]),
            action: "clear",
            data: ["coin", "api", "price", "market", "volume", "change"]
          });
        }
        /** insert fetch gecko. */


        if (config["action"] === "insert" || config["action"] === "update") {
          var fetch = document.querySelector(".crypto-screen-".concat(config["action"], " > .modal-form > .modal-group > .modal-gecko > .modal-fetch"));

          if (fetch) {
            var callback = function callback() {
              var api = document.querySelector(".crypto-screen-".concat(config["action"], " > .modal-form > .modal-group > .modal-gecko > .modal-api")).value;

              if (api) {
                /** retrieve data .*/
                _this2.request({
                  method: "GET",
                  provider: "gecko",
                  action: config["action"],
                  data: api
                });
                /** disable after clicked. */


                fetch.disabled = true;
                /** remove event listener. */

                fetch.removeEventListener("click", callback);
              }
            };
            /** add event listener. */


            fetch.addEventListener("click", callback, {
              once: true
            });
          }
          /** disable after clicked. */


          fetch.disabled = false;
        }
      }

      if (config["mode"] === "hide") {
        /** hide backdrop. */
        modal.classList.remove("backdrop");
        modal.style.display = "none";
      }

      if (config["mode"] === "submit") {
        /** disable after clicked. */
        config["element"].disabled = true;
        /** collect all input for processing. */

        var collect = this.helper.init({
          type: "input",
          target: "crypto-screen-".concat(config["action"]),
          action: "value",
          data: ["id", "coin", "api", "price", "market", "volume", "change"]
        });
        /** check if inputs are empty and valid. */

        var result = this.helper.init({
          type: "validate",
          data: collect
        });
        /** double check and then proceed. */

        if (Object.keys(result["error"]).length === 0) {
          /** sanitize input. */
          var sanitize = this.helper.init({
            type: "sanitize",
            action: "comma",
            condition: ["price", "market", "volume", "change"],
            data: result["success"]
          });
          /** request access token and then post to backend. */

          this.request({
            method: "POST",
            table: "screen",
            statement: "".concat(config["action"]),
            input: sanitize
          });
          /** disable after clicked. */

          config["element"].disabled = false;
        } else {
          /** display user  message. */
          this.helper.init({
            type: "message",
            status: false,
            message: result["message"]
          });
        }
        /** remove listener. */


        config["element"].removeEventListener('click', config['callback']);
        /** hide modal. */

        modal.classList.remove("backdrop");
        modal.style.display = "none";
      }
    }
  }, {
    key: "request",
    value: function request(config) {
      var _this3 = this;

      if (config.method === "GET") {
        /** fetch local data. */
        if (config.provider === "local") {
          axios.get("/sanctum/csrf-cookie").then(function (response) {
            axios.get("/api/crypto-screen-retrieve", {
              params: {
                "table": "screen"
              }
            }).then(function (response) {
              /** populate order element with data. */
              if (response.data.coin) {
                for (var i = 0; i < response.data.coin.length; i++) {
                  _this3.helper.init({
                    type: "node",
                    id: "".concat(i + 1),
                    target: "crypto-screen",
                    statement: response.data.sql,
                    input: response.data.coin[i]
                  });
                }
              }
            });
          });
        }
        /** fetch coingecko data. */


        if (config.provider === "gecko") {
          axios.get("https://api.coingecko.com/api/v3/simple/price?ids=".concat(config.data, "&vs_currencies=usd&include_market_cap=true&include_24hr_vol=true&include_24hr_change=true"), {
            headers: {
              "Access-Control-Allow-Origin": "*",
              "Content-Type": "application/json"
            },
            withCredentials: false,
            credentials: "same-origin"
          }).then(function (response) {
            if (response.status === 200) {
              var coin = [];

              for (var key in response.data) {
                if (response.data.hasOwnProperty(key)) {
                  for (var val in response.data[key]) {
                    if (response.data[key].hasOwnProperty(val)) {
                      switch (val) {
                        case "usd":
                          coin.price = response.data[key][val];
                          break;

                        case "usd_market_cap":
                          coin.market = response.data[key][val];
                          break;

                        case "usd_24h_vol":
                          coin.volume = response.data[key][val];
                          break;

                        case "usd_24h_change":
                          coin.change = response.data[key][val];
                          break;

                        default:
                          coin = [];
                      }
                    }
                  }
                }
              }
              /** append to element. */


              if (coin) {
                for (var x in coin) {
                  document.querySelector(".crypto-screen-".concat(config["action"], " > .modal-form > .modal-group > .modal-").concat(x)).value = coin[x].toLocaleString("en");
                }
              }
            }
          });
        }
      }
      /** store data. */


      if (config.method === "POST") {
        axios.get("/sanctum/csrf-cookie").then(function (response) {
          axios.post("/api/crypto-screen-store", {
            table: config.table,
            statement: config.statement,
            input: config.input
          }).then(function (response) {
            /** populate order element with data. */
            if (response.data.status === true) {
              /** add or update element in document tree. */
              if (response.data.sql === "select") {
                for (var key in response.data.coin) {
                  _this3.helper.init({
                    type: "node",
                    id: 0,
                    target: "crypto-screen",
                    statement: response.data.sql,
                    input: response.data.coin[key]
                  });
                }
              }
              /** add or update element in document tree. */


              if (response.data.sql === "update") {
                for (var _key in response.data.coin) {
                  _this3.helper.init({
                    type: "node",
                    target: "crypto-screen",
                    statement: response.data.sql,
                    input: response.data.coin[_key]
                  });
                }
              }
              /** remove element in document tree. */


              if (response.data.sql === "destroy") {
                _this3.helper.init({
                  type: "node",
                  target: "crypto-screen",
                  statement: response.data.sql,
                  input: response.data.coin
                });
              }
              /** display success message. */


              _this3.helper.init({
                type: "message",
                status: response.data.status,
                message: response.data.message
              });
            }
            /** display error message. */


            if (response.data.status === false) {
              _this3.helper.init({
                type: "message",
                status: response.data.status,
                message: response.data.message
              });
            }
          });
        });
      }
    }
  }]);

  return crypto_screen;
}();

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (new crypto_screen());

/***/ }),

/***/ "./resources/js/listener/dashboard/stock/_notes.js":
/*!*********************************************************!*\
  !*** ./resources/js/listener/dashboard/stock/_notes.js ***!
  \*********************************************************/
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


var stock_note = /*#__PURE__*/function () {
  /** default actions. */
  function stock_note() {
    _classCallCheck(this, stock_note);

    this.event = document.querySelector(".speak-stock-notes");
    this.template = document.querySelector(".stage-stock-notes");
    this.element = document.querySelector(".perform");
    this.helper = _helpers_helpers_js__WEBPACK_IMPORTED_MODULE_0__["default"];
  }
  /** fire it on. */


  _createClass(stock_note, [{
    key: "init",
    value: function init() {
      var _this = this;

      /** setup initial listener. */
      this.event.addEventListener("click", function (e) {
        if (e.target.dataset.sidebar === 'stock_notes') {
          console.log('Clicked Stock Notes');
          axios.get("/sanctum/csrf-cookie").then(function (response) {
            axios.get("/api/stock-trade-retrieve", {
              params: {
                table: 'note',
                statement: 'select'
              }
            }).then(function (response) {
              if (response.data.status === true) {
                console.log(response.data);
                /** populate order element with data. */
                // if (response.data.watchlist) {
                //     /** sort debt equity ratio. */
                //     let watchlist = response.data.watchlist.sort((a, b) => {
                //         return a.debtequityratio - b.debtequityratio;
                //     })
                //     /** loop me up. */
                //     for (let i = 0; i < watchlist.length; i++) {
                //         this.helper.init({ type: "node", id: `${i + 1}`, target: `stock-${config["table"]}`, statement: response.data.sql, input: watchlist[i] });
                //     }
                // }
              }
            });
          });
          /** retrieve data .*/
          // this.request({method: 'GET', table:'portfolio'});

          /** clone template. */

          var content = _this.template.content.cloneNode(true); // /** query document and do conditional statement base on the result. */


          var check = document.querySelector('.stock-note');

          if (check === null || check === undefined) {
            /** clear element before appending. */
            _this.element.innerHTML = '';
            /** append template content. */

            _this.element.appendChild(content);
            /** insert modal code block. */
            // let record = document.querySelector('.click-order-record');
            // if (record) {
            //     record.addEventListener("click", (e) => {
            //         /** show insert modal. */
            //         if (e.target.dataset.action === 'crypto') {
            //             /** show modal. */
            //             this.backdrop({mode:'show', action:'insert'});
            //
            //             /** set submit event listener. */
            //             let portfolioSubmit = document.querySelector('.crypto-portfolio-insert > .crypto-modal > .modal-group > .modal-button > .button-submit > .modal-insert');
            //             if (portfolioSubmit) {
            //                 portfolioSubmit.addEventListener('click', (e) => {
            //                     this.backdrop({mode:'hide', action:'insert', trigger: 'submit', input: portfolioSubmit});
            //                 });
            //             }
            //         }
            //
            //         /** set insert event listener. */
            //         let portfolioCancel = document.querySelector('.crypto-portfolio-insert > .crypto-modal > .modal-group > .modal-close');
            //         if (portfolioCancel) {
            //             portfolioCancel.addEventListener('click', (e) => {
            //                 this.backdrop({mode:'hide', action:'insert'});
            //             });
            //         }
            //
            //         /** set close event listener. */
            //         let portfolioClose = document.querySelector('.crypto-portfolio-insert > .crypto-modal > .modal-group > .modal-button > .button-dismiss > .modal-cancel');
            //         if (portfolioClose) {
            //             portfolioClose.addEventListener('click', (e) => {
            //                 this.backdrop({mode:'hide', action:'insert'});
            //             });
            //         }
            //     });
            // }

            /** update modal code block. */
            // setTimeout( () => {
            //     let update = document.querySelectorAll('.crypto-order > .items > .action > .update');
            //     if (update) {
            //         for (let i = 0; i < update.length; i++) {
            //             update[i].addEventListener("click", () => {
            //                 /** show update modal. */
            //                 this.backdrop({mode:'show', action:'update'});
            //
            //                 /** populate modal. */
            //                 let parent = update[i].parentElement.parentElement;
            //                 this.helper.init({type: 'input', action: 'populate', target: 'crypto-portfolio-update', el: parent, data: ['id', 'order', 'wallet', 'name', 'coin', 'quantity', 'capital']});
            //
            //                 /** set submit event listener. */
            //                 let portfolioSubmit = document.querySelector('.crypto-portfolio-update > .crypto-modal > .modal-group > .modal-button > .button-submit > .modal-update');
            //                 if (portfolioSubmit) {
            //                     portfolioSubmit.addEventListener('click', (e) => {
            //                         this.backdrop({mode:'hide', action:'update', trigger: 'submit', input: portfolioSubmit});
            //                     });
            //                 }
            //             });
            //         }
            //         /** query document close button. */
            //         let portfolioClose = document.querySelector('.crypto-portfolio-update > .crypto-modal > .modal-group > .modal-close');
            //         if (portfolioClose) {
            //             portfolioClose.addEventListener('click', (e) => {
            //                 this.backdrop({mode:'hide', action:'update'});
            //             });
            //         }
            //
            //         /** query document update button. */
            //         let portfolioCancel = document.querySelector('.crypto-portfolio-update > .crypto-modal > .modal-group > .modal-button > .button-dismiss > .modal-cancel');
            //         if (portfolioCancel) {
            //             portfolioCancel.addEventListener('click', (e) => {
            //                 this.backdrop({mode:'hide', action:'update'});
            //             });
            //         }
            //     }
            // }, 10000);

            /** destroy modal code block. */
            // setTimeout( () => {
            //     let destroy = document.querySelectorAll('.crypto-order > .items > .action > .destroy');
            //     if (destroy) {
            //         for (let i = 0; i < destroy.length; i++) {
            //             destroy[i].addEventListener("click", () => {
            //                 /** show destroy modal. */
            //                 this.backdrop({mode:'show', action:'destroy'});
            //
            //                 /** populate modal. */
            //                 let parent = destroy[i].parentElement.parentElement;
            //                 this.helper.init({type: 'input', action: 'populate', target: 'crypto-portfolio-destroy', el: parent, data: ['id', 'order', 'wallet', 'name', 'coin', 'quantity', 'capital']});
            //
            //                 /** set destroy event listener. */
            //                 let portfolioSubmit = document.querySelector('.crypto-portfolio-destroy > .crypto-modal > .modal-group > .modal-button > .button-submit > .modal-destroy');
            //                 if (portfolioSubmit) {
            //                     portfolioSubmit.addEventListener('click', (e) => {
            //                         this.backdrop({mode:'hide', action:'destroy', trigger: 'submit', input: portfolioSubmit});
            //                     });
            //                 }
            //             });
            //
            //             /** set cancel event listener. */
            //             let portfolioClose = document.querySelector('.crypto-portfolio-destroy > .crypto-modal > .modal-group > .modal-close');
            //             if (portfolioClose) {
            //                 portfolioClose.addEventListener('click', (e) => {
            //                     this.backdrop({mode:'hide', action:'destroy'});
            //                 });
            //             }
            //
            //             /** set cancel event listener. */
            //             let portfolioCancel = document.querySelector('.crypto-portfolio-destroy > .crypto-modal > .modal-group > .modal-button > .button-dismiss > .modal-cancel');
            //             if (portfolioCancel) {
            //                 portfolioCancel.addEventListener('click', (e) => {
            //                     this.backdrop({mode:'hide', action:'destroy'});
            //                 });
            //             }
            //         }
            //     }
            // }, 10000);
            //
            // let info = document.querySelector('.card > .header > .meta > .right > .messenger');
            // info.classList.add('info');
            // info.textContent = 'Update button enabled right after this message disappear.';
            // setTimeout(() => { info.classList.remove('info'); }, 9000);

          }
        }
      });
    }
    /** function on how backdrop behaves. */
    // backdrop(config) {
    //     /** query document to pinpoint modal element. */
    //     let modal = document.querySelector(`.crypto-portfolio-${config['action']}`);
    //
    //     if (config['mode'] === 'show') {
    //         /** show modal. */
    //         modal.classList.add('backdrop');
    //         modal.style.display = 'block';
    //     }
    //
    //     if (config['mode'] === 'hide') {
    //         /** hide modal. */
    //         modal.classList.remove('backdrop');
    //         modal.style.display = 'none';
    //
    //         if (config['trigger'] === 'submit') {
    //             /** collect all input for processing. */
    //             let collect = this.helper.init({type:'input', section: 'portfolio', target: `crypto-portfolio-${config['action']}`, action: 'value', data: ['id', 'wallet', 'order', 'name', 'coin', 'quantity', 'capital']});
    //
    //             /** check if inputs are empty and valid. */
    //             let result = this.helper.init({type: 'validate', data: collect});
    //
    //             /** double check and then proceed. */
    //             if (Object.keys(result['error']).length === 0) {
    //                 /** hide modal. */
    //                 modal.classList.remove('backdrop');
    //                 modal.style.display = 'none';
    //
    //                 /** request access token and then post to backend. */
    //                 this.request({method: 'POST', table:'portfolio', statement:config['action'], input:result['success']});
    //
    //                 /** clear input. */
    //                 if (config['action'] === 'insert') {
    //                     this.helper.init({type:'input', section: 'portfolio', target: `crypto-portfolio-${config['action']}`, action: 'clear', data: ['wallet', 'name', 'coin', 'quantity', 'capital']});
    //                 }
    //             } else {
    //                 /** display error. */
    //                 this.error({target: `crypto-portfolio-${config['action']}`, data:result['error']});
    //
    //                 /** show modal. */
    //                 modal.classList.add('backdrop');
    //                 modal.style.display = 'block';
    //             }
    //         }
    //     }
    // }

    /** function to process http request. */
    // request(config) {
    //     /** retrieve data. */
    //     if (config['method'] === 'GET') {
    //         axios.get('/sanctum/csrf-cookie').then(response => {
    //             axios.get('/api/crypto-portfolio-retrieve', {
    //                 params: {table: 'portfolio'}
    //             }).then(response => {
    //                 if (response.data.status === true) {
    //                     /** populate order element with data. */
    //                     if (response.data.order) {
    //                         for (let i=0; i<response.data.order.length; i++) {
    //                             this.helper.init({type:'node', id:`${i+1}`, target:'crypto-order', statement: response.data.sql, input: response.data.order[i]});
    //                         }
    //                     }
    //                     /** populate hold element with data. */
    //                     if (response.data.hold.total) {
    //                         for (let key in response.data.hold.total) {
    //                             this.helper.init({type:'node', target:'crypto-hold', statement: response.data.sql, input: response.data.hold.total[key]});
    //                         }
    //                     }
    //                     /** populate fund element with data. */
    //                     if (response.data.fund.total) {
    //                         for (let key in response.data.fund.total) {
    //                             this.helper.init({type:'node', target:'crypto-fund', statement: response.data.sql, input: response.data.fund.total[key]});
    //                         }
    //                     }
    //                 }
    //             });
    //         });
    //     }
    //
    //     /** store data. */
    //     if (config['method'] === 'POST') {
    //         axios.get('/sanctum/csrf-cookie').then( () => {
    //             axios.post('/api/crypto-portfolio-store', {
    //                 table: config['table'],
    //                 order: config['input']['order'].toLowerCase(),
    //                 statement: config['statement'],
    //                 input: config['input']
    //             }).then(response => {
    //                 /** populate order element with data. */
    //                 if (response.data.status === true) {
    //                     /** add or update element in document tree. */
    //                     if (response.data.sql === 'select') {
    //                         for (let key in response.data.coin) {
    //                             this.helper.init({type:'node', id: 0, target:'crypto-order', statement: response.data.sql, input: response.data.coin[key]});
    //                         }
    //                     }
    //                     /** add or update element in document tree. */
    //                     if (response.data.sql === 'update') {
    //                         for (let key in response.data.coin) {
    //                             this.helper.init({type:'node', target:'crypto-order', statement: response.data.sql, input: response.data.coin[key]});
    //                         }
    //                     }
    //                     /** remove element in document tree. */
    //                     if (response.data.sql === 'destroy') {
    //                         this.helper.init({type:'node', target:'crypto-order', statement: response.data.sql, input: response.data.coin});
    //                     }
    //
    //                     /** display success message. */
    //                     this.helper.init({type: 'message', status: response.data.status, message: response.data.message});
    //                 }
    //
    //                 /** display error message. */
    //                 if (response.data.status === false) {
    //                     this.helper.init({type: 'message', status: response.data.status, message: response.data.message});
    //                 }
    //             })
    //         });
    //     }
    // }

    /** function to display error. */
    // error(config) {
    //     /** run trough it all. */
    //     for (let key in config['data']) {
    //         let display = document.querySelector(`.${config['target']} > .crypto-modal > .modal-group > .modal-${key}-error`);
    //         display.textContent = config['data'][key];
    //     }
    //     /** clear all error messages after five seconds. */
    //     setTimeout( () => {
    //         for (let key in config['data']) {
    //             let display = document.querySelector(`.${config['target']} > .crypto-modal > .modal-group > .modal-${key}-error`);
    //             display.textContent = '';
    //         }
    //     }, 5000);
    // }

  }]);

  return stock_note;
}();

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (new stock_note());

/***/ }),

/***/ "./resources/js/listener/dashboard/stock/_overviews.js":
/*!*************************************************************!*\
  !*** ./resources/js/listener/dashboard/stock/_overviews.js ***!
  \*************************************************************/
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


var stock_overview = /*#__PURE__*/function () {
  /** default actions. */
  function stock_overview() {
    _classCallCheck(this, stock_overview);

    this.event = document.querySelector(".speak-stock-overviews");
    this.template = document.querySelector(".stage-stock-overviews");
    this.element = document.querySelector(".perform");
    this.helper = _helpers_helpers_js__WEBPACK_IMPORTED_MODULE_0__["default"];
  }
  /** fire it on. */


  _createClass(stock_overview, [{
    key: "init",
    value: function init() {
      var _this = this;

      /** setup initial listener. */
      this.event.addEventListener("click", function (e) {
        if (e.target.dataset.sidebar === 'stock_overviews') {
          console.log('Clicked Stock Overviews');
          /** retrieve data .*/
          // this.request({method: 'GET', table:'portfolio'});

          /** clone template. */

          var content = _this.template.content.cloneNode(true); // /** query document and do conditional statement base on the result. */


          var check = document.querySelector('.stock-overview');

          if (check === null || check === undefined) {
            /** clear element before appending. */
            _this.element.innerHTML = '';
            /** append template content. */

            _this.element.appendChild(content);
            /** insert modal code block. */
            // let record = document.querySelector('.click-order-record');
            // if (record) {
            //     record.addEventListener("click", (e) => {
            //         /** show insert modal. */
            //         if (e.target.dataset.action === 'crypto') {
            //             /** show modal. */
            //             this.backdrop({mode:'show', action:'insert'});
            //
            //             /** set submit event listener. */
            //             let portfolioSubmit = document.querySelector('.crypto-portfolio-insert > .crypto-modal > .modal-group > .modal-button > .button-submit > .modal-insert');
            //             if (portfolioSubmit) {
            //                 portfolioSubmit.addEventListener('click', (e) => {
            //                     this.backdrop({mode:'hide', action:'insert', trigger: 'submit', input: portfolioSubmit});
            //                 });
            //             }
            //         }
            //
            //         /** set insert event listener. */
            //         let portfolioCancel = document.querySelector('.crypto-portfolio-insert > .crypto-modal > .modal-group > .modal-close');
            //         if (portfolioCancel) {
            //             portfolioCancel.addEventListener('click', (e) => {
            //                 this.backdrop({mode:'hide', action:'insert'});
            //             });
            //         }
            //
            //         /** set close event listener. */
            //         let portfolioClose = document.querySelector('.crypto-portfolio-insert > .crypto-modal > .modal-group > .modal-button > .button-dismiss > .modal-cancel');
            //         if (portfolioClose) {
            //             portfolioClose.addEventListener('click', (e) => {
            //                 this.backdrop({mode:'hide', action:'insert'});
            //             });
            //         }
            //     });
            // }

            /** update modal code block. */
            // setTimeout( () => {
            //     let update = document.querySelectorAll('.crypto-order > .items > .action > .update');
            //     if (update) {
            //         for (let i = 0; i < update.length; i++) {
            //             update[i].addEventListener("click", () => {
            //                 /** show update modal. */
            //                 this.backdrop({mode:'show', action:'update'});
            //
            //                 /** populate modal. */
            //                 let parent = update[i].parentElement.parentElement;
            //                 this.helper.init({type: 'input', action: 'populate', target: 'crypto-portfolio-update', el: parent, data: ['id', 'order', 'wallet', 'name', 'coin', 'quantity', 'capital']});
            //
            //                 /** set submit event listener. */
            //                 let portfolioSubmit = document.querySelector('.crypto-portfolio-update > .crypto-modal > .modal-group > .modal-button > .button-submit > .modal-update');
            //                 if (portfolioSubmit) {
            //                     portfolioSubmit.addEventListener('click', (e) => {
            //                         this.backdrop({mode:'hide', action:'update', trigger: 'submit', input: portfolioSubmit});
            //                     });
            //                 }
            //             });
            //         }
            //         /** query document close button. */
            //         let portfolioClose = document.querySelector('.crypto-portfolio-update > .crypto-modal > .modal-group > .modal-close');
            //         if (portfolioClose) {
            //             portfolioClose.addEventListener('click', (e) => {
            //                 this.backdrop({mode:'hide', action:'update'});
            //             });
            //         }
            //
            //         /** query document update button. */
            //         let portfolioCancel = document.querySelector('.crypto-portfolio-update > .crypto-modal > .modal-group > .modal-button > .button-dismiss > .modal-cancel');
            //         if (portfolioCancel) {
            //             portfolioCancel.addEventListener('click', (e) => {
            //                 this.backdrop({mode:'hide', action:'update'});
            //             });
            //         }
            //     }
            // }, 10000);

            /** destroy modal code block. */
            // setTimeout( () => {
            //     let destroy = document.querySelectorAll('.crypto-order > .items > .action > .destroy');
            //     if (destroy) {
            //         for (let i = 0; i < destroy.length; i++) {
            //             destroy[i].addEventListener("click", () => {
            //                 /** show destroy modal. */
            //                 this.backdrop({mode:'show', action:'destroy'});
            //
            //                 /** populate modal. */
            //                 let parent = destroy[i].parentElement.parentElement;
            //                 this.helper.init({type: 'input', action: 'populate', target: 'crypto-portfolio-destroy', el: parent, data: ['id', 'order', 'wallet', 'name', 'coin', 'quantity', 'capital']});
            //
            //                 /** set destroy event listener. */
            //                 let portfolioSubmit = document.querySelector('.crypto-portfolio-destroy > .crypto-modal > .modal-group > .modal-button > .button-submit > .modal-destroy');
            //                 if (portfolioSubmit) {
            //                     portfolioSubmit.addEventListener('click', (e) => {
            //                         this.backdrop({mode:'hide', action:'destroy', trigger: 'submit', input: portfolioSubmit});
            //                     });
            //                 }
            //             });
            //
            //             /** set cancel event listener. */
            //             let portfolioClose = document.querySelector('.crypto-portfolio-destroy > .crypto-modal > .modal-group > .modal-close');
            //             if (portfolioClose) {
            //                 portfolioClose.addEventListener('click', (e) => {
            //                     this.backdrop({mode:'hide', action:'destroy'});
            //                 });
            //             }
            //
            //             /** set cancel event listener. */
            //             let portfolioCancel = document.querySelector('.crypto-portfolio-destroy > .crypto-modal > .modal-group > .modal-button > .button-dismiss > .modal-cancel');
            //             if (portfolioCancel) {
            //                 portfolioCancel.addEventListener('click', (e) => {
            //                     this.backdrop({mode:'hide', action:'destroy'});
            //                 });
            //             }
            //         }
            //     }
            // }, 10000);
            //
            // let info = document.querySelector('.card > .header > .meta > .right > .messenger');
            // info.classList.add('info');
            // info.textContent = 'Update button enabled right after this message disappear.';
            // setTimeout(() => { info.classList.remove('info'); }, 9000);

          }
        }
      });
    }
    /** function on how backdrop behaves. */
    // backdrop(config) {
    //     /** query document to pinpoint modal element. */
    //     let modal = document.querySelector(`.crypto-portfolio-${config['action']}`);
    //
    //     if (config['mode'] === 'show') {
    //         /** show modal. */
    //         modal.classList.add('backdrop');
    //         modal.style.display = 'block';
    //     }
    //
    //     if (config['mode'] === 'hide') {
    //         /** hide modal. */
    //         modal.classList.remove('backdrop');
    //         modal.style.display = 'none';
    //
    //         if (config['trigger'] === 'submit') {
    //             /** collect all input for processing. */
    //             let collect = this.helper.init({type:'input', section: 'portfolio', target: `crypto-portfolio-${config['action']}`, action: 'value', data: ['id', 'wallet', 'order', 'name', 'coin', 'quantity', 'capital']});
    //
    //             /** check if inputs are empty and valid. */
    //             let result = this.helper.init({type: 'validate', data: collect});
    //
    //             /** double check and then proceed. */
    //             if (Object.keys(result['error']).length === 0) {
    //                 /** hide modal. */
    //                 modal.classList.remove('backdrop');
    //                 modal.style.display = 'none';
    //
    //                 /** request access token and then post to backend. */
    //                 this.request({method: 'POST', table:'portfolio', statement:config['action'], input:result['success']});
    //
    //                 /** clear input. */
    //                 if (config['action'] === 'insert') {
    //                     this.helper.init({type:'input', section: 'portfolio', target: `crypto-portfolio-${config['action']}`, action: 'clear', data: ['wallet', 'name', 'coin', 'quantity', 'capital']});
    //                 }
    //             } else {
    //                 /** display error. */
    //                 this.error({target: `crypto-portfolio-${config['action']}`, data:result['error']});
    //
    //                 /** show modal. */
    //                 modal.classList.add('backdrop');
    //                 modal.style.display = 'block';
    //             }
    //         }
    //     }
    // }

    /** function to process http request. */
    // request(config) {
    //     /** retrieve data. */
    //     if (config['method'] === 'GET') {
    //         axios.get('/sanctum/csrf-cookie').then(response => {
    //             axios.get('/api/crypto-portfolio-retrieve', {
    //                 params: {table: 'portfolio'}
    //             }).then(response => {
    //                 if (response.data.status === true) {
    //                     /** populate order element with data. */
    //                     if (response.data.order) {
    //                         for (let i=0; i<response.data.order.length; i++) {
    //                             this.helper.init({type:'node', id:`${i+1}`, target:'crypto-order', statement: response.data.sql, input: response.data.order[i]});
    //                         }
    //                     }
    //                     /** populate hold element with data. */
    //                     if (response.data.hold.total) {
    //                         for (let key in response.data.hold.total) {
    //                             this.helper.init({type:'node', target:'crypto-hold', statement: response.data.sql, input: response.data.hold.total[key]});
    //                         }
    //                     }
    //                     /** populate fund element with data. */
    //                     if (response.data.fund.total) {
    //                         for (let key in response.data.fund.total) {
    //                             this.helper.init({type:'node', target:'crypto-fund', statement: response.data.sql, input: response.data.fund.total[key]});
    //                         }
    //                     }
    //                 }
    //             });
    //         });
    //     }
    //
    //     /** store data. */
    //     if (config['method'] === 'POST') {
    //         axios.get('/sanctum/csrf-cookie').then( () => {
    //             axios.post('/api/crypto-portfolio-store', {
    //                 table: config['table'],
    //                 order: config['input']['order'].toLowerCase(),
    //                 statement: config['statement'],
    //                 input: config['input']
    //             }).then(response => {
    //                 /** populate order element with data. */
    //                 if (response.data.status === true) {
    //                     /** add or update element in document tree. */
    //                     if (response.data.sql === 'select') {
    //                         for (let key in response.data.coin) {
    //                             this.helper.init({type:'node', id: 0, target:'crypto-order', statement: response.data.sql, input: response.data.coin[key]});
    //                         }
    //                     }
    //                     /** add or update element in document tree. */
    //                     if (response.data.sql === 'update') {
    //                         for (let key in response.data.coin) {
    //                             this.helper.init({type:'node', target:'crypto-order', statement: response.data.sql, input: response.data.coin[key]});
    //                         }
    //                     }
    //                     /** remove element in document tree. */
    //                     if (response.data.sql === 'destroy') {
    //                         this.helper.init({type:'node', target:'crypto-order', statement: response.data.sql, input: response.data.coin});
    //                     }
    //
    //                     /** display success message. */
    //                     this.helper.init({type: 'message', status: response.data.status, message: response.data.message});
    //                 }
    //
    //                 /** display error message. */
    //                 if (response.data.status === false) {
    //                     this.helper.init({type: 'message', status: response.data.status, message: response.data.message});
    //                 }
    //             })
    //         });
    //     }
    // }

    /** function to display error. */
    // error(config) {
    //     /** run trough it all. */
    //     for (let key in config['data']) {
    //         let display = document.querySelector(`.${config['target']} > .crypto-modal > .modal-group > .modal-${key}-error`);
    //         display.textContent = config['data'][key];
    //     }
    //     /** clear all error messages after five seconds. */
    //     setTimeout( () => {
    //         for (let key in config['data']) {
    //             let display = document.querySelector(`.${config['target']} > .crypto-modal > .modal-group > .modal-${key}-error`);
    //             display.textContent = '';
    //         }
    //     }, 5000);
    // }

  }]);

  return stock_overview;
}();

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (new stock_overview());

/***/ }),

/***/ "./resources/js/listener/dashboard/stock/_portfolios.js":
/*!**************************************************************!*\
  !*** ./resources/js/listener/dashboard/stock/_portfolios.js ***!
  \**************************************************************/
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


var stock_portfolio = /*#__PURE__*/function () {
  /** default actions. */
  function stock_portfolio() {
    _classCallCheck(this, stock_portfolio);

    this.event = document.querySelector(".speak-stock-portfolios");
    this.template = document.querySelector(".stage-stock-portfolios");
    this.element = document.querySelector(".perform");
    this.helper = _helpers_helpers_js__WEBPACK_IMPORTED_MODULE_0__["default"];
  }
  /** fire it on. */


  _createClass(stock_portfolio, [{
    key: "init",
    value: function init() {
      var _this = this;

      /** setup initial listener. */
      this.event.addEventListener("click", function (e) {
        if (e.target.dataset.sidebar === "stock_portfolios") {
          /** retrieve data .*/
          _this.request({
            method: "GET",
            table: "portfolio"
          });
          /** clone template. */


          var content = _this.template.content.cloneNode(true); // /** query document and do conditional statement base on the result. */


          var check = document.querySelector(".stock-portfolio");

          if (check === null || check === undefined) {
            /** clear element before appending. */
            _this.element.innerHTML = "";
            /** append template content. */

            _this.element.appendChild(content);
            /** insert modal code block. */


            var record = document.querySelector(".click-stock-record");

            if (record) {
              record.addEventListener("click", function (e) {
                /** show insert modal. */
                if (e.target.dataset.action === "stock") {
                  /** show modal. */
                  _this.backdrop({
                    mode: "show",
                    action: "insert"
                  });
                  /** set submit event listener. */


                  var submit = document.querySelector(".stock-portfolio-insert > .modal-form > .modal-group > .modal-button > .button-submit > .modal-insert");

                  if (submit) {
                    var callback = function callback() {
                      _this.backdrop({
                        action: "insert",
                        mode: "submit",
                        element: submit,
                        callback: callback
                      });
                    };
                    /** add event listener. */


                    submit.addEventListener("click", callback, false);
                  }
                }
                /** set cancel event listener. */


                var cancel = document.querySelector(".stock-portfolio-insert > .modal-form > .modal-group > .modal-close");

                if (cancel) {
                  var _callback = function _callback() {
                    _this.backdrop({
                      action: "insert",
                      mode: "hide"
                    });
                  };
                  /** add event listener. */


                  cancel.addEventListener("click", _callback, false);
                }
                /** set close event listener. */


                var close = document.querySelector(".stock-portfolio-insert > .modal-form > .modal-group > .modal-button > .button-dismiss > .modal-cancel");

                if (close) {
                  var _callback2 = function _callback2() {
                    _this.backdrop({
                      action: "insert",
                      mode: "hide"
                    });
                  };
                  /** add event listener. */


                  close.addEventListener("click", _callback2, false);
                }
              });
            }
            /** update modal code block. */


            setTimeout(function () {
              var update = document.querySelectorAll(".stock-order > .items > .action > .update");

              if (update) {
                var _loop = function _loop(i) {
                  update[i].addEventListener("click", function () {
                    /** show update modal. */
                    _this.backdrop({
                      mode: "show",
                      action: "update"
                    });
                    /** populate modal. */


                    var parent = update[i].parentElement.parentElement;

                    _this.helper.init({
                      type: "input",
                      action: "populate",
                      target: "stock-portfolio-update",
                      el: parent,
                      data: ["id", "order", "symbol", "name", "fee", "share", "capital"]
                    });
                    /** set submit event listener. */


                    var submit = document.querySelector(".stock-portfolio-update > .modal-form > .modal-group > .modal-button > .button-submit > .modal-update");

                    if (submit) {
                      var _callback4 = function _callback4() {
                        _this.backdrop({
                          action: "update",
                          mode: "submit",
                          element: submit,
                          callback: _callback4
                        });
                      };
                      /** add event listener. */


                      submit.addEventListener("click", _callback4, false);
                    }
                  });
                };

                for (var i = 0; i < update.length; i++) {
                  _loop(i);
                }
                /** query document close button. */


                var close = document.querySelector(".stock-portfolio-update > .modal-form > .modal-group > .modal-close");

                if (close) {
                  var callback = function callback() {
                    _this.backdrop({
                      action: "update",
                      mode: "hide"
                    });
                  };
                  /** add event listener. */


                  close.addEventListener("click", callback, false);
                }
                /** query document update button. */


                var cancel = document.querySelector(".stock-portfolio-update > .modal-form > .modal-group > .modal-button > .button-dismiss > .modal-cancel");

                if (cancel) {
                  var _callback3 = function _callback3() {
                    _this.backdrop({
                      action: "update",
                      mode: "hide"
                    });
                  };
                  /** add event listener. */


                  cancel.addEventListener("click", _callback3, false);
                }
              }
            }, 10000);
            /** destroy modal code block. */

            setTimeout(function () {
              var destroy = document.querySelectorAll(".stock-order > .items > .action > .destroy");

              if (destroy) {
                var _loop2 = function _loop2(i) {
                  destroy[i].addEventListener("click", function () {
                    /** show destroy modal. */
                    _this.backdrop({
                      mode: "show",
                      action: "destroy"
                    });
                    /** populate modal. */


                    var parent = destroy[i].parentElement.parentElement;

                    _this.helper.init({
                      type: "input",
                      action: "populate",
                      target: "stock-portfolio-destroy",
                      el: parent,
                      data: ["id", "order", "symbol", "name", "fee", "share", "capital"]
                    });
                    /** set destroy event listener. */


                    var submit = document.querySelector(".stock-portfolio-destroy > .modal-form > .modal-group > .modal-button > .button-submit > .modal-destroy");

                    if (submit) {
                      var callback = function callback() {
                        _this.backdrop({
                          action: "destroy",
                          mode: "submit",
                          element: submit,
                          callback: callback
                        });
                      };
                      /** add event listener. */


                      submit.addEventListener("click", callback, false);
                    }
                  });
                  /** set cancel event listener. */

                  var close = document.querySelector(".stock-portfolio-destroy > .modal-form > .modal-group > .modal-close");

                  if (close) {
                    var callback = function callback() {
                      _this.backdrop({
                        action: "destroy",
                        mode: "hide"
                      });
                    };
                    /** add event listener. */


                    close.addEventListener("click", callback, false);
                  }
                  /** set cancel event listener. */


                  var cancel = document.querySelector(".stock-portfolio-destroy > .modal-form > .modal-group > .modal-button > .button-dismiss > .modal-cancel");

                  if (cancel) {
                    var _callback5 = function _callback5() {
                      _this.backdrop({
                        action: "destroy",
                        mode: "hide"
                      });
                    };
                    /** add event listener. */


                    cancel.addEventListener("click", _callback5, false);
                  }
                };

                for (var i = 0; i < destroy.length; i++) {
                  _loop2(i);
                }
              }
            }, 10000);
            var info = document.querySelector(".card > .header > .meta > .right > .messenger");
            info.classList.add("info");
            info.textContent = "Update button enabled right after this message disappear.";
            setTimeout(function () {
              info.classList.remove("info");
            }, 9000);
          }
        }
      });
    }
    /** function on how backdrop behaves. */

  }, {
    key: "backdrop",
    value: function backdrop(config) {
      /** query document to pinpoint modal element. */
      var modal = document.querySelector(".stock-portfolio-".concat(config["action"]));

      if (config["mode"] === "show") {
        /** show modal. */
        modal.classList.add("backdrop");
        modal.style.display = "block";
        /** clear input. */

        if (config["action"] === "insert") {
          this.helper.init({
            type: "input",
            section: "portfolio",
            target: "stock-portfolio-".concat(config["action"]),
            action: "clear",
            data: ["order", "symbol", "name", "fee", "share", "capital"]
          });
        }
      }

      if (config["mode"] === "hide") {
        /** hide modal. */
        modal.classList.remove("backdrop");
        modal.style.display = "none";
      }

      if (config["mode"] === "submit") {
        /** collect all input for processing. */
        var collect = this.helper.init({
          type: "input",
          section: "portfolio",
          target: "stock-portfolio-".concat(config["action"]),
          action: "value",
          data: ["id", "order", "symbol", "name", "fee", "share", "capital"]
        });
        /** check if inputs are empty and valid. */

        var result = this.helper.init({
          type: "validate",
          data: collect
        });
        /** double check and then proceed. */

        if (Object.keys(result.error).length === 0) {
          /** request access token and then post to backend. */
          this.request({
            method: "POST",
            table: "portfolio",
            order: result["success"]["order"],
            statement: config["action"],
            input: result.success
          });
        } else {
          /** display user  message. */
          this.helper.init({
            type: "message",
            status: false,
            message: result["message"]
          });
        }
        /** remove listener. */


        config["element"].removeEventListener('click', config['callback']);
        /** hide modal. */

        modal.classList.remove("backdrop");
        modal.style.display = "none";
      }
    }
    /** function to process http request. */

  }, {
    key: "request",
    value: function request(config) {
      var _this2 = this;

      /** retrieve data. */
      if (config.method === "GET") {
        axios.get("/sanctum/csrf-cookie").then(function (response) {
          axios.get("/api/stock-portfolio-retrieve", {
            params: {
              table: "portfolio"
            }
          }).then(function (response) {
            if (response.data.status === true) {
              /** populate order element with data. */
              if (response.data.order) {
                for (var i = 0; i < response.data.order.length; i++) {
                  _this2.helper.init({
                    type: "node",
                    id: "".concat(i + 1),
                    target: "stock-order",
                    statement: response.data.sql,
                    input: response.data.order[i]
                  });
                }
              }
              /** populate hold element with data. */


              if (response.data.hold.total) {
                for (var _i = 0; _i < response.data.hold.total.length; _i++) {
                  _this2.helper.init({
                    type: "node",
                    id: "".concat(_i + 1),
                    target: "stock-hold",
                    statement: response.data.sql,
                    input: response.data.hold.total[_i]
                  });
                }
              }
            }
          });
        });
      }
      /** store data. */


      if (config.method === "POST") {
        axios.get("/sanctum/csrf-cookie").then(function () {
          axios.post("/api/stock-portfolio-store", {
            table: config.table,
            order: config.input.order.toLowerCase(),
            statement: config.statement,
            input: config.input
          }).then(function (response) {
            /** populate order element with data. */
            if (response.data.status === true) {
              /** add or update element in document tree. */
              if (response.data.sql === "select") {
                for (var key in response.data.stock) {
                  _this2.helper.init({
                    type: "node",
                    id: 0,
                    target: "stock-order",
                    statement: response.data.sql,
                    input: response.data.stock[key]
                  });
                }
              }
              /** add or update element in document tree. */


              if (response.data.sql === "update") {
                for (var _key in response.data.stock) {
                  _this2.helper.init({
                    type: "node",
                    target: "stock-order",
                    statement: response.data.sql,
                    input: response.data.stock[_key]
                  });
                }
              }
              /** remove element in document tree. */


              if (response.data.sql === "destroy") {
                _this2.helper.init({
                  type: "node",
                  target: "stock-order",
                  statement: response.data.sql,
                  input: response.data.stock
                });
              }
              /** display success message. */


              _this2.helper.init({
                type: "message",
                status: response.data.status,
                message: response.data.message
              });
            }
            /** display error message. */


            if (response.data.status === false) {
              _this2.helper.init({
                type: "message",
                status: response.data.status,
                message: response.data.message
              });
            }
          });
        });
      }
    }
  }]);

  return stock_portfolio;
}();

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (new stock_portfolio());

/***/ }),

/***/ "./resources/js/listener/dashboard/stock/_trades.js":
/*!**********************************************************!*\
  !*** ./resources/js/listener/dashboard/stock/_trades.js ***!
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


var stock_trade = /*#__PURE__*/function () {
  /** default actions. */
  function stock_trade() {
    _classCallCheck(this, stock_trade);

    this.event = document.querySelector(".speak-stock-trades");
    this.template = document.querySelector(".stage-stock-trades");
    this.element = document.querySelector(".perform");
    this.helper = _helpers_helpers_js__WEBPACK_IMPORTED_MODULE_0__["default"];
  }
  /** fire it on. */


  _createClass(stock_trade, [{
    key: "init",
    value: function init() {
      var _this = this;

      /** setup initial listener. */
      this.event.addEventListener("click", function (e) {
        if (e.target.dataset.sidebar === "stock_trades") {
          /** clone template. */
          var content = _this.template.content.cloneNode(true); // /** query document and do conditional statement base on the result. */


          var trade = document.querySelector(".stock-trade");

          if (trade === null || trade === undefined) {
            /** retrieve data .*/
            _this.request({
              method: "GET",
              provider: "local",
              table: "trade"
            });
            /** clear element before appending. */


            _this.element.innerHTML = "";
            /** append template content. */

            _this.element.appendChild(content);
            /** start button. */


            var start = document.querySelector(".card > .header > .meta > .right > .click-trade-fetch");

            if (start) {
              var callback = function callback() {
                _this.request({
                  method: "POST",
                  provider: "start"
                });
                /** remove event listener after firing once. */


                start.removeEventListener("click", callback);
                /** disabled when no listener around. */

                start.disabled = true;
              };
              /** add event listener. */


              start.addEventListener("click", callback, false);
            }
            /** price button. */


            var price = document.querySelector(".card > .header > .meta > .right > .click-trade-price");

            if (price) {
              var _callback = function _callback() {
                _this.request({
                  method: "POST",
                  provider: "prices"
                });
                /** remove event listener after firing once. */


                price.removeEventListener("click", _callback);
                /** disabled when no listener around. */

                price.disabled = true;
              };
              /** add event listener. */


              price.addEventListener("click", _callback, false);
            }
            /** finance button. */


            var finance = document.querySelector(".card > .header > .meta > .right > .click-trade-finance");

            if (finance) {
              var _callback2 = function _callback2() {
                _this.request({
                  method: "POST",
                  provider: "reports"
                });
                /** remove event listener after firing once. */


                finance.removeEventListener("click", _callback2);
                /** disabled when no listener around. */

                finance.disabled = true;
              };
              /** add event listener. */


              finance.addEventListener("click", _callback2, false);
            }
            /** finance button. */


            var sector = document.querySelector(".card > .header > .meta > .right > .click-trade-sector");

            if (sector) {
              var _callback3 = function _callback3() {
                _this.request({
                  method: "POST",
                  provider: "sector"
                });
                /** remove event listener after firing once. */


                sector.removeEventListener("click", _callback3);
                /** disabled when no listener around. */

                sector.disabled = true;
              };
              /** add event listener. */


              sector.addEventListener("click", _callback3, false);
            }
            /** add modal code block. */


            setTimeout(function () {
              var watch = document.querySelectorAll(".stock-trade > .items > .action > .watch");

              if (watch) {
                var _loop = function _loop(i) {
                  watch[i].addEventListener("click", function () {
                    /** show update modal. */
                    _this.backdrop({
                      action: "insert",
                      mode: "show",
                      provider: "edge"
                    }); // /** populate modal. */


                    var parent = watch[i].parentElement.parentElement;

                    _this.helper.init({
                      type: "input",
                      action: "populate",
                      target: "stock-trade-insert",
                      el: parent,
                      data: ["id", "symbol", "sector", "edge"]
                    });
                    /** set event listener. */


                    var submit = document.querySelector(".stock-trade-insert > .modal-form > .modal-group > .modal-button > .button-submit > .modal-insert");

                    if (submit) {
                      var _callback6 = function _callback6() {
                        _this.backdrop({
                          action: "insert",
                          mode: "submit",
                          element: submit,
                          callback: _callback6
                        });
                      };
                      /** add event listener. */


                      submit.addEventListener("click", _callback6, {
                        once: true
                      });
                    }
                  });
                };

                for (var i = 0; i < watch.length; i++) {
                  _loop(i);
                }
                /** query document close button. */


                var close = document.querySelector(".stock-trade-insert > .modal-form > .modal-group > .modal-close");

                if (close) {
                  var _callback4 = function _callback4() {
                    _this.backdrop({
                      action: "insert",
                      mode: "hide"
                    });
                  };
                  /** add event listener. */


                  close.addEventListener("click", _callback4, false);
                }
                /** query document cancel button. */


                var cancel = document.querySelector(".stock-trade-insert > .modal-form > .modal-group > .modal-button > .button-dismiss > .modal-cancel");

                if (cancel) {
                  var _callback5 = function _callback5() {
                    _this.backdrop({
                      action: "insert",
                      mode: "hide"
                    });
                  };
                  /** add event listener. */


                  cancel.addEventListener("click", _callback5, false);
                }
              }
            }, 10000);
            var info = document.querySelector(".card > .header > .meta > .right > .messenger");
            info.classList.add("info");
            info.textContent = "Watch button enabled right after this message disappear.";
            setTimeout(function () {
              info.classList.remove("info");
            }, 9000);
          }
        }
      });
    }
    /** function on how backdrop behaves. */

  }, {
    key: "backdrop",
    value: function backdrop(config) {
      var _this2 = this;

      /** query document to pinpoint modal element. */
      var modal = document.querySelector(".stock-trade-".concat(config["action"]));

      if (config["mode"] === "show") {
        /** show modal. */
        modal.classList.add("backdrop");
        modal.style.display = "block";
        /** clear input if insert. */

        if (config["action"] === "insert") {
          this.helper.init({
            type: "input",
            section: "watchlist",
            target: "stock-trade-".concat(config["action"]),
            action: "clear",
            data: ["liabilities", "equity", "price", "earning", "income", "gross"]
          });
        }
        /** insert fetch edge. */


        if (config["provider"] === "edge") {
          var fetch = document.querySelector(".stock-trade-".concat(config["action"], " > .modal-form > .modal-group > .modal-gecko > .modal-fetch"));

          if (fetch) {
            var callback = function callback() {
              var edge = document.querySelector(".stock-trade-".concat(config["action"], " > .modal-form > .modal-group > .modal-gecko > .modal-edge")).value;

              if (edge) {
                /** retrieve data .*/
                _this2.request({
                  method: "GET",
                  provider: "edge",
                  action: "insert",
                  section: "watches",
                  caller: "trade",
                  input: edge
                });
                /** disable after clicked. */


                fetch.disabled = true;
                /** remove event listener. */

                fetch.removeEventListener("click", callback);
              }
            };
            /** add event listener. */


            fetch.addEventListener("click", callback, {
              once: true
            });
          }
          /** disable after clicked. */


          fetch.disabled = false;
        }
      }

      if (config["mode"] === "hide") {
        /** hide modal. */
        modal.classList.remove("backdrop");
        modal.style.display = "none";
      }

      if (config["mode"] === "submit") {
        /** disable after clicked. */
        config["element"].disabled = true;
        /** collect all input for processing. */

        var collect = this.helper.init({
          type: "input",
          section: "watchlist",
          target: "stock-trade-".concat(config["action"]),
          action: "value",
          data: ["id", "symbol", "sector", "edge", "symbol", "edge", "liabilities", "equity", "price", "earning", "income", "gross"]
        });
        /** check if inputs are empty and valid. */

        var result = this.helper.init({
          type: "validate",
          data: collect
        });
        /** double check and then proceed. */

        if (Object.keys(result["error"]).length === 0) {
          /** sanitize input. */
          var sanitize = this.helper.init({
            type: "sanitize",
            action: "comma",
            condition: ["symbol", "sector", "edge", "liabilities", "equity", "price", "earning", "income", "gross"],
            data: result["success"]
          });
          /** request access token and then post to backend. */

          this.request({
            method: "POST",
            provider: "watches",
            table: "watchlist",
            statement: config["action"],
            input: sanitize
          });
          /** disable after clicked. */

          config["element"].disabled = false;
        } else {
          /** remove listener. */
          config["element"].removeEventListener('click', config['callback']);
        }
        /** remove listener. */


        config["element"].removeEventListener('click', config['callback']);
        /** hide modal. */

        modal.classList.remove("backdrop");
        modal.style.display = "none";
      }
    }
    /** function to process http request. */

  }, {
    key: "request",
    value: function request(config) {
      var _this3 = this;

      /** retrieve data. */
      if (config["method"] === "GET") {
        if (config["provider"] === "local") {
          axios.get("/sanctum/csrf-cookie").then(function (response) {
            axios.get("/api/stock-trade-retrieve", {
              params: {
                table: config["table"]
              }
            }).then(function (response) {
              if (response.data.status === true) {
                if (response.data.indexes.length != 0) {
                  /** populate indexes element with data. */
                  if (response.data.indexes) {
                    for (var i = 0; i < response.data.indexes.length; i++) {
                      /** add item to document. */
                      _this3.helper.init({
                        type: "node",
                        id: "".concat(i + 1),
                        target: "stock-index",
                        statement: response.data.sql,
                        input: response.data.indexes[i]
                      });
                    }
                  }
                  /** populate trade element with data. */


                  if (response.data.stocks) {
                    for (var x = 0; x < response.data.stocks.length; x++) {
                      /** add item to document. */
                      _this3.helper.init({
                        type: "node",
                        id: "".concat(x + 1),
                        target: "stock-trade",
                        statement: response.data.sql,
                        input: response.data.stocks[x]
                      });
                    }
                  }
                }
              }
            });
          });
        }
        /** fetch stock information. */


        if (config["provider"] === "edge") {
          axios.get("/sanctum/csrf-cookie").then(function (response) {
            axios.get("/stock-reports-retrieve", {
              params: {
                section: config["section"],
                id: config["input"],
                caller: config["caller"]
              }
            }).then(function (response) {
              if (response.data.status === true) {
                /** populate modal. */
                if (response.data.reports) {
                  for (var x in response.data.reports) {
                    document.querySelector(".stock-trade-".concat(config["action"], " > .modal-form > .modal-group > .modal-").concat(x)).value = response.data.reports[x].toLocaleString("en");
                  }
                }
              }
            });
          });
        }
      }
      /** store data. */


      if (config["method"] === "POST") {
        /** fetch stock list. */
        if (config["provider"] === "start") {
          axios.get("https://phisix-api4.appspot.com/stocks.json", {
            headers: {
              "Access-Control-Allow-Origin": "*",
              "Content-Type": "application/json"
            },
            withCredentials: false,
            credentials: "same-origin"
          }).then(function (response) {
            if (response.data.stock.length != 0) {
              var push = setInterval(function () {
                /** remove first array element. */
                var stock = response.data.stock[0];
                /** format item data */

                var input = {
                  name: _this3.helper.init({
                    type: "titlecase",
                    string: stock.name
                  }),
                  symbol: stock.symbol,
                  price: stock.price.amount,
                  change: stock.percent_change,
                  volume: stock.volume
                };
                /** get csrf token and send post request. */

                axios.get("/sanctum/csrf-cookie").then(function (response) {
                  axios.post("/api/stock-trade-store", {
                    table: "trade",
                    statement: "fetch",
                    input: input
                  }).then(function (response) {
                    /** send user a message. */
                    _this3.helper.init({
                      type: "message",
                      status: response.data.status,
                      message: response.data.message
                    });
                  });
                });
                /** remove first array element. */

                response.data.stock.shift();
                /** clear interval when array reach zero. */

                if (response.data.stock.length === 0) {
                  /** send user a message. */
                  _this3.helper.init({
                    type: "message",
                    status: true,
                    message: "Processed completed."
                  });
                  /** clear interval. */


                  clearInterval(push);
                  /** chat console. */

                  console.log("Processed completed.");
                }
              }, 5000);
            } else {
              console.log("All records are up to date.");
            }
          });
        }
        /** fetch financial information */


        if (config["provider"] === "reports") {
          axios.get("/sanctum/csrf-cookie").then(function (response) {
            axios.get("/stock-reports-retrieve", {
              params: {
                section: "stocks"
              }
            }).then(function (response) {
              if (response.data.status === true) {
                if (response.data.stocks.length !== 0) {
                  var stocks = setInterval(function () {
                    /** remove first array element. */
                    var stock = response.data.stocks[0];
                    /** get csrf token and send post request. */

                    axios.get("/sanctum/csrf-cookie").then(function (response) {
                      axios.post("/stock-reports-store", {
                        section: "reports",
                        id: stock.edge
                      }).then(function (response) {
                        /** send user a message. */
                        _this3.helper.init({
                          type: "message",
                          status: response.data.status,
                          message: response.data.message
                        });
                      });
                    });
                    /** remove first array element. */

                    response.data.stocks.shift();
                    /** clear interval when array reach zero. */

                    if (response.data.stocks.length === 0) {
                      /** send user a message. */
                      _this3.helper.init({
                        type: "message",
                        status: true,
                        message: "Processed completed."
                      });
                      /** clear interval. */


                      clearInterval(stocks);
                      /** chat console. */

                      console.log("Processed completed.");
                    }
                  }, 5000);
                } else {
                  console.log("All records are up to date.");
                }
              }
              /** send user a message. */


              _this3.helper.init({
                type: "message",
                status: response.data.status,
                message: response.data.message
              });
            });
          });
        }
        /** fetch financial information */


        if (config["provider"] === "prices") {
          axios.get("/sanctum/csrf-cookie").then(function (response) {
            axios.get("/stock-reports-retrieve", {
              params: {
                section: "stocks"
              }
            }).then(function (response) {
              if (response.data.status === true) {
                if (response.data.stocks.length !== 0) {
                  var stocks = setInterval(function () {
                    /** remove first array element. */
                    var stock = response.data.stocks[0];
                    /** get csrf token and send post request. */

                    axios.get("/sanctum/csrf-cookie").then(function (response) {
                      axios.post("/stock-reports-store", {
                        section: "prices",
                        id: stock.edge
                      }).then(function (response) {
                        /** send user a message. */
                        _this3.helper.init({
                          type: "message",
                          status: response.data.status,
                          message: response.data.message
                        });
                      });
                    });
                    /** remove first array element. */

                    response.data.stocks.shift();
                    /** clear interval when array reach zero. */

                    if (response.data.stocks.length === 0) {
                      /** send user a message. */
                      _this3.helper.init({
                        type: "message",
                        status: true,
                        message: "Processed completed."
                      });
                      /** clear interval. */


                      clearInterval(stocks);
                      /** chat console. */

                      console.log("Processed completed.");
                    }
                  }, 5000);
                } else {
                  console.log("All records are up to date.");
                }
              }
              /** send user a message. */


              _this3.helper.init({
                type: "message",
                status: response.data.status,
                message: response.data.message
              });
            });
          });
        }
        /** fetch financial information */


        if (config["provider"] === "sector") {
          axios.get("/sanctum/csrf-cookie").then(function (response) {
            axios.get("/stock-reports-retrieve", {
              params: {
                section: "stocks"
              }
            }).then(function (response) {
              if (response.data.status === true) {
                if (response.data.stocks.length !== 0) {
                  var stocks = setInterval(function () {
                    /** get first array element. */
                    var stock = response.data.stocks[0];
                    /** get csrf token and send post request. */

                    axios.get("/sanctum/csrf-cookie").then(function (response) {
                      axios.post("/stock-reports-store", {
                        section: "sectors",
                        id: stock.edge
                      }).then(function (response) {
                        /** send user a message. */
                        _this3.helper.init({
                          type: "message",
                          status: response.data.status,
                          message: response.data.message
                        });
                      });
                    });
                    /** remove first array element. */

                    response.data.stocks.shift();
                    /** clear interval when array reach zero. */

                    if (response.data.stocks.length === 0) {
                      /** send user a message. */
                      _this3.helper.init({
                        type: "message",
                        status: true,
                        message: "Processed completed."
                      });
                      /** clear interval. */


                      clearInterval(stocks);
                      /** chat console. */

                      console.log("Processed completed.");
                    }
                  }, 5000);
                } else {
                  console.log("All records are up to date.");
                }
              }
              /** send user a message. */


              _this3.helper.init({
                type: "message",
                status: response.data.status,
                message: response.data.message
              });
            });
          });
        }
        /** post watchlist. */


        if (config["provider"] === "watches") {
          axios.get("/sanctum/csrf-cookie").then(function () {
            axios.post("/api/stock-watchlist-store", {
              table: config["table"],
              statement: config["statement"],
              input: config["input"]
            }).then(function (response) {
              /** display success message. */
              _this3.helper.init({
                type: "message",
                status: response.data.status,
                message: response.data.message
              });
            });
          });
        }
      }
    }
  }]);

  return stock_trade;
}();

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (new stock_trade());

/***/ }),

/***/ "./resources/js/listener/dashboard/stock/_watchlists.js":
/*!**************************************************************!*\
  !*** ./resources/js/listener/dashboard/stock/_watchlists.js ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _helpers_helpers_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../helpers/helpers.js */ "./resources/js/helpers/helpers.js");
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

/** import helper function. */


var stock_watchlist = /*#__PURE__*/function () {
  /** default actions. */
  function stock_watchlist() {
    _classCallCheck(this, stock_watchlist);

    this.event = document.querySelector(".speak-stock-watchlists");
    this.template = document.querySelector(".stage-stock-watchlists");
    this.element = document.querySelector(".perform");
    this.helper = _helpers_helpers_js__WEBPACK_IMPORTED_MODULE_0__["default"];
  }
  /** fire it on. */


  _createClass(stock_watchlist, [{
    key: "init",
    value: function init() {
      var _this = this;

      /** setup initial listener. */
      this.event.addEventListener("click", function (e) {
        if (e.target.dataset.sidebar === "stock_watchlists") {
          /** retrieve data .*/
          _this.request({
            method: "GET",
            provider: "local",
            table: "watchlist",
            statement: "select"
          });
          /** clone template. */


          var content = _this.template.content.cloneNode(true); // /** query document and do conditional statement base on the result. */


          var check = document.querySelector(".stock-watchlist");

          if (check === null || check === undefined) {
            /** clear element before appending. */
            _this.element.innerHTML = "";
            /** append template content. */

            _this.element.appendChild(content);
            /** auto build watchlist. */


            var build = document.querySelector(".card > .header > .meta > .right > .click-watchlist-build");

            if (build) {
              var callback = function callback() {
                _this.request({
                  method: "GET",
                  provider: "edge",
                  statement: "build",
                  table: "watchlist"
                });
                /** remove event listener after firing once. */


                build.removeEventListener("click", callback);
              };
              /** add event listener. */


              build.addEventListener("click", callback, false);
            }
            /** destroy modal code block. */


            setTimeout(function () {
              /** define sectors. */
              var sectors = ["minings", "holdings", "services", "industrials", "properties", "financials", "boards", "funds"];
              /** run through each. */

              sectors.forEach(function (sector) {
                /** define modal. */
                var index = document.querySelectorAll(".stock-".concat(sector, " > .items > .action > .destroy"));

                if (index) {
                  var _loop = function _loop(i) {
                    index[i].addEventListener("click", function () {
                      /** show destroy modal. */
                      _this.backdrop({
                        mode: "show",
                        action: "destroy"
                      });
                      /** populate modal. */


                      var parent = index[i].parentElement.parentElement;

                      _this.helper.init({
                        type: "input",
                        action: "destroy",
                        target: "stock-watchlist-destroy",
                        section: 'populate',
                        el: parent,
                        data: ["id", "symbol"]
                      });
                      /** set event listener. */


                      var submit = document.querySelector(".stock-watchlist-destroy > .modal-form > .modal-group > .modal-button > .button-submit > .modal-destroy");

                      if (submit) {
                        var _callback = function _callback() {
                          _this.backdrop({
                            action: "destroy",
                            mode: "submit",
                            sector: "".concat(sector),
                            element: submit,
                            callback: _callback
                          });
                        };
                        /** add event listener. */


                        submit.addEventListener("click", _callback, false);
                      }
                    });
                    /** set cancel event listener. */

                    var close = document.querySelector(".stock-watchlist-destroy > .modal-form > .modal-group > .modal-close");

                    if (close) {
                      var _callback2 = function _callback2() {
                        _this.backdrop({
                          action: "destroy",
                          mode: "hide"
                        });
                      };
                      /** add event listener. */


                      close.addEventListener("click", _callback2, false);
                    }
                    /** set cancel event listener. */


                    var cancel = document.querySelector(".stock-watchlist-destroy > .modal-form > .modal-group > .modal-button > .button-dismiss > .modal-cancel");

                    if (cancel) {
                      var _callback3 = function _callback3() {
                        _this.backdrop({
                          action: "destroy",
                          mode: "hide"
                        });
                      };
                      /** add event listener. */


                      cancel.addEventListener("click", _callback3, false);
                    }
                  };

                  for (var i = 0; i < index.length; i++) {
                    _loop(i);
                  }
                }
              });
            }, 10000);
            var info = document.querySelector(".card > .header > .meta > .right > .messenger");
            info.classList.add("info");
            info.textContent = "Destroy button enabled right after this message disappear.";
            setTimeout(function () {
              info.classList.remove("info");
            }, 9000);
          }
        }
      });
    }
    /** function on how backdrop behaves. */

  }, {
    key: "backdrop",
    value: function backdrop(config) {
      /** query document to pinpoint modal element. */
      var modal = document.querySelector(".stock-watchlist-".concat(config["action"]));

      if (config["mode"] === "show") {
        /** show modal. */
        modal.classList.add("backdrop");
        modal.style.display = "block";
      }

      if (config["mode"] === "hide") {
        /** hide modal. */
        modal.classList.remove("backdrop");
        modal.style.display = "none";
      }

      if (config["mode"] === "submit") {
        var _this$helper$init;

        /** collect all input for processing. */
        var collect = this.helper.init((_this$helper$init = {
          type: "input",
          section: "watchlist",
          target: "stock-watchlist-".concat(config["action"]),
          action: "destroy"
        }, _defineProperty(_this$helper$init, "section", 'content'), _defineProperty(_this$helper$init, "data", ["id", "symbol"]), _this$helper$init));
        /** check if inputs are empty and valid. */

        var result = this.helper.init({
          type: "validate",
          data: collect
        });
        /** double check and then proceed. */

        if (Object.keys(result["error"]).length === 0) {
          /** request access token and then post to backend. */
          this.request({
            method: "POST",
            provider: "local",
            table: "watchlist",
            sector: config["sector"],
            statement: config["action"],
            input: result["success"]
          });
        } else {
          /** display user  message. */
          this.helper.init({
            type: "message",
            status: false,
            message: result["message"]
          });
        }
        /** remove listener. */


        config["element"].removeEventListener("click", config["callback"]);
        /** hide modal. */

        modal.classList.remove("backdrop");
        modal.style.display = "none";
      }
    }
    /** function to process http request. */

  }, {
    key: "request",
    value: function request(config) {
      var _this2 = this;

      /** retrieve data. */
      if (config["method"] === "GET") {
        if (config['provider'] === 'local') {
          axios.get("/sanctum/csrf-cookie").then(function (response) {
            axios.get("/api/stock-watchlist-retrieve", {
              params: {
                table: config["table"],
                statement: config["statement"]
              }
            }).then(function (response) {
              if (response.data.status === true) {
                /** populate holdings element with data. */
                if (response.data.sectors.miningandoil) {
                  /** sort debt equity ratio. */
                  var minings = response.data.sectors.miningandoil.sort(function (a, b) {
                    return a.debtequityratio - b.debtequityratio;
                  });
                  /** loop me up. */

                  for (var i = 0; i < minings.length; i++) {
                    _this2.helper.init({
                      type: "node",
                      id: "".concat(i + 1),
                      target: "stock-minings",
                      statement: response.data.sql,
                      input: minings[i]
                    });
                  }
                }
              }
              /** populate holdings element with data. */


              if (response.data.sectors.holdingfirms) {
                /** sort debt equity ratio. */
                var holdings = response.data.sectors.holdingfirms.sort(function (a, b) {
                  return a.debtequityratio - b.debtequityratio;
                });
                /** loop me up. */

                for (var _i = 0; _i < holdings.length; _i++) {
                  _this2.helper.init({
                    type: "node",
                    id: "".concat(_i + 1),
                    target: "stock-holdings",
                    statement: response.data.sql,
                    input: holdings[_i]
                  });
                }
              }
              /** populate holdings element with data. */


              if (response.data.sectors.services) {
                /** sort debt equity ratio. */
                var services = response.data.sectors.services.sort(function (a, b) {
                  return a.debtequityratio - b.debtequityratio;
                });
                /** loop me up. */

                for (var _i2 = 0; _i2 < services.length; _i2++) {
                  _this2.helper.init({
                    type: "node",
                    id: "".concat(_i2 + 1),
                    target: "stock-services",
                    statement: response.data.sql,
                    input: services[_i2]
                  });
                }
              }
              /** populate holdings element with data. */


              if (response.data.sectors.industrial) {
                /** sort debt equity ratio. */
                var industrials = response.data.sectors.industrial.sort(function (a, b) {
                  return a.debtequityratio - b.debtequityratio;
                });
                /** loop me up. */

                for (var _i3 = 0; _i3 < industrials.length; _i3++) {
                  _this2.helper.init({
                    type: "node",
                    id: "".concat(_i3 + 1),
                    target: "stock-industrials",
                    statement: response.data.sql,
                    input: industrials[_i3]
                  });
                }
              }
              /** populate holdings element with data. */


              if (response.data.sectors.property) {
                /** sort debt equity ratio. */
                var properties = response.data.sectors.property.sort(function (a, b) {
                  return a.debtequityratio - b.debtequityratio;
                });
                /** loop me up. */

                for (var _i4 = 0; _i4 < properties.length; _i4++) {
                  _this2.helper.init({
                    type: "node",
                    id: "".concat(_i4 + 1),
                    target: "stock-properties",
                    statement: response.data.sql,
                    input: properties[_i4]
                  });
                }
              }
              /** populate holdings element with data. */


              if (response.data.sectors.financials) {
                /** sort debt equity ratio. */
                var financials = response.data.sectors.financials.sort(function (a, b) {
                  return a.debtequityratio - b.debtequityratio;
                });
                /** loop me up. */

                for (var _i5 = 0; _i5 < financials.length; _i5++) {
                  _this2.helper.init({
                    type: "node",
                    id: "".concat(_i5 + 1),
                    target: "stock-financials",
                    statement: response.data.sql,
                    input: financials[_i5]
                  });
                }
              }
              /** populate holdings element with data. */


              if (response.data.sectors.smallmediumemergingboard) {
                /** sort debt equity ratio. */
                var boards = response.data.sectors.smallmediumemergingboard.sort(function (a, b) {
                  return a.debtequityratio - b.debtequityratio;
                });
                /** loop me up. */

                for (var _i6 = 0; _i6 < boards.length; _i6++) {
                  _this2.helper.init({
                    type: "node",
                    id: "".concat(_i6 + 1),
                    target: "stock-boards",
                    statement: response.data.sql,
                    input: boards[_i6]
                  });
                }
              }
              /** populate holdings element with data. */


              if (response.data.sectors.funds) {
                /** sort debt equity ratio. */
                var funds = response.data.sectors.funds.sort(function (a, b) {
                  return a.debtequityratio - b.debtequityratio;
                });
                /** loop me up. */

                for (var _i7 = 0; _i7 < funds.length; _i7++) {
                  _this2.helper.init({
                    type: "node",
                    id: "".concat(_i7 + 1),
                    target: "stock-funds",
                    statement: response.data.sql,
                    input: funds[_i7]
                  });
                }
              }
              /** display  message. */


              _this2.helper.init({
                type: "message",
                status: response.data.status,
                message: response.data.message
              });
            });
          });
        }

        if (config["provider"] === "edge") {
          axios.get("/sanctum/csrf-cookie").then(function () {
            axios.get("/api/stock-watchlist-retrieve", {
              params: {
                table: config["table"],
                statement: config["statement"]
              }
            }).then(function (response) {
              if (response.data.status === true) {
                if (response.data.stocks.length !== 0) {
                  var stocks = setInterval(function () {
                    /** remove first array element. */
                    var stock = response.data.stocks[0];
                    /** get csrf token and send post request. */

                    axios.get("/sanctum/csrf-cookie").then(function (response) {
                      axios.get("/stock-reports-retrieve", {
                        params: {
                          section: 'watches',
                          id: stock["edge"],
                          symbol: stock["symbol"],
                          sector: stock["sector"],
                          caller: "watchlist"
                        }
                      }).then(function (response) {
                        /** send user a message. */
                        _this2.helper.init({
                          type: "message",
                          status: response.data.status,
                          message: response.data.message
                        });
                      });
                    });
                    /** remove first array element. */

                    response.data.stocks.shift();
                    /** clear interval when array reach zero. */

                    if (response.data.stocks.length === 0) {
                      /** send user a message. */
                      _this2.helper.init({
                        type: "message",
                        status: true,
                        message: "Processed completed."
                      });
                      /** clear interval. */


                      clearInterval(stocks);
                      /** chat console. */

                      console.log("Processed completed.");
                    }
                  }, 10000);
                }
                /** display  message. */


                _this2.helper.init({
                  type: "message",
                  status: response.data.status,
                  message: response.data.message
                });
              }
            });
          });
        }
      }
      /** store data. */


      if (config["method"] === "POST") {
        if (config["provider"] === "local") {
          axios.get("/sanctum/csrf-cookie").then(function () {
            axios.post("/api/stock-watchlist-store", {
              table: config["table"],
              statement: config["statement"],
              input: config["input"]
            }).then(function (response) {
              /** populate order element with data. */
              if (response.data.status === true) {
                /** remove element in document tree. */
                if (response.data.sql === "destroy") {
                  _this2.helper.init({
                    type: "node",
                    target: "stock-".concat(config["sector"]),
                    statement: response.data.sql,
                    input: response.data.stock
                  });
                }
              }
              /** display  message. */


              _this2.helper.init({
                type: "message",
                status: response.data.status,
                message: response.data.message
              });
            });
          });
        }
      }
    }
  }]);

  return stock_watchlist;
}();

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (new stock_watchlist());

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
/* harmony import */ var _dashboard_stock_overviews_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./dashboard/stock/_overviews.js */ "./resources/js/listener/dashboard/stock/_overviews.js");
/* harmony import */ var _dashboard_stock_watchlists_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./dashboard/stock/_watchlists.js */ "./resources/js/listener/dashboard/stock/_watchlists.js");
/* harmony import */ var _dashboard_stock_portfolios_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./dashboard/stock/_portfolios.js */ "./resources/js/listener/dashboard/stock/_portfolios.js");
/* harmony import */ var _dashboard_stock_trades_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./dashboard/stock/_trades.js */ "./resources/js/listener/dashboard/stock/_trades.js");
/* harmony import */ var _dashboard_stock_notes_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./dashboard/stock/_notes.js */ "./resources/js/listener/dashboard/stock/_notes.js");
/** sidebar modules.*/

_dashboard_sidebar_js__WEBPACK_IMPORTED_MODULE_0__["default"].init();
/** crypto modules.*/


_dashboard_crypto_overviews_js__WEBPACK_IMPORTED_MODULE_1__["default"].init();

_dashboard_crypto_screens_js__WEBPACK_IMPORTED_MODULE_2__["default"].init();

_dashboard_crypto_games_js__WEBPACK_IMPORTED_MODULE_3__["default"].init();

_dashboard_crypto_moons_js__WEBPACK_IMPORTED_MODULE_4__["default"].init();

_dashboard_crypto_portfolios_js__WEBPACK_IMPORTED_MODULE_5__["default"].init();
/** stock modules.*/


_dashboard_stock_overviews_js__WEBPACK_IMPORTED_MODULE_6__["default"].init();

_dashboard_stock_watchlists_js__WEBPACK_IMPORTED_MODULE_7__["default"].init();

_dashboard_stock_portfolios_js__WEBPACK_IMPORTED_MODULE_8__["default"].init();

_dashboard_stock_trades_js__WEBPACK_IMPORTED_MODULE_9__["default"].init();

_dashboard_stock_notes_js__WEBPACK_IMPORTED_MODULE_10__["default"].init();

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