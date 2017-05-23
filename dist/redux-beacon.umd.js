(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var createMiddleware = __webpack_require__(1);
	var createMetaReducer = __webpack_require__(4);
	var createEvents = __webpack_require__(2);

	module.exports = {
	  createMiddleware: createMiddleware,
	  createMetaReducer: createMetaReducer,
	  createEvents: createEvents
	};

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var createEvents = __webpack_require__(2);
	var registerEvents = __webpack_require__(3);

	function createMiddleware(eventDefinitionsMap, target) {
	  var extensions = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

	  return function (store) {
	    return function (next) {
	      return function (action) {
	        if (!eventDefinitionsMap[action.type]) {
	          return next(action);
	        }

	        var prevState = store.getState();

	        var events = createEvents(eventDefinitionsMap[action.type], prevState, action);

	        registerEvents(events, target, extensions, prevState, action);

	        return next(action);
	      };
	    };
	  };
	}

	module.exports = createMiddleware;

/***/ },
/* 2 */
/***/ function(module, exports) {

	'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	function arrify(value) {
	  return Array.isArray(value) ? value : [value];
	}

	function createEvents(eventDefinitions, prevState, action) {
	  return arrify(eventDefinitions).map(function (_ref) {
	    var eventFields = _ref.eventFields,
	        eventSchema = _ref.eventSchema;

	    if (typeof eventFields !== 'function') {
	      return null;
	    }

	    var event = eventFields(action, prevState);

	    if (eventSchema !== undefined && (typeof event === 'undefined' ? 'undefined' : _typeof(event)) === 'object') {
	      var eventPropIsValid = function eventPropIsValid(prop) {
	        return eventSchema[prop](event[prop]);
	      };
	      var isValidEvent = Object.keys(eventSchema).every(eventPropIsValid);
	      return isValidEvent ? event : null;
	    }

	    return event;
	  }).filter(function (event) {
	    return event !== null && event !== undefined;
	  });
	}

	module.exports = createEvents;

/***/ },
/* 3 */
/***/ function(module, exports) {

	'use strict';

	function registerEvents(events, target, extensions, state, action) {
	  var logger = extensions.logger,
	      offlineStorage = extensions.offlineStorage;


	  var logEvents = function logEvents() {
	    if (typeof logger === 'function') {
	      logger.apply(undefined, arguments);
	    }
	  };

	  if (offlineStorage !== undefined) {
	    var isConnected = offlineStorage.isConnected(state);
	    if (!isConnected) {
	      offlineStorage.saveEvents(events);
	      logEvents(events, action, state, true, false);
	    } else {
	      target(events);
	      logEvents(events, action, state);
	      var onEventsPurged = function onEventsPurged(oldEvents) {
	        if (Array.isArray(oldEvents) && oldEvents.length > 0) {
	          target(oldEvents);
	          logEvents(oldEvents, null, null, false, true);
	        }
	      };
	      offlineStorage.purgeEvents(onEventsPurged);
	    }
	  } else {
	    target(events);
	    logEvents(events, action, state);
	  }
	}

	module.exports = registerEvents;

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var createEvents = __webpack_require__(2);
	var registerEvents = __webpack_require__(3);

	function createMetaReducer(eventDefinitionsMap, target) {
	  var extensions = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

	  /* eslint-disable func-names */
	  return function (reducer) {
	    return function (prevState, action) {
	      if (!eventDefinitionsMap[action.type]) {
	        return reducer(prevState, action);
	      }

	      var events = createEvents(eventDefinitionsMap[action.type], prevState, action);
	      registerEvents(events, target, extensions, prevState, action);

	      return reducer(prevState, action);
	    };
	  };
	}

	module.exports = createMetaReducer;

/***/ }
/******/ ])
});
;