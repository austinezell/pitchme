/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/*!*************************!*\
  !*** ./src/js/index.js ***!
  \*************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	__webpack_require__(/*! ./module.js */ 1);

	__webpack_require__(/*! ./controllers/homeCtrl.js */ 2);

	__webpack_require__(/*! ./controllers/navCtrl.js */ 3);

	__webpack_require__(/*! ./controllers/usersCtrl.js */ 4);

	__webpack_require__(/*! ./services/auth.js */ 5);

/***/ },
/* 1 */
/*!**************************!*\
  !*** ./src/js/module.js ***!
  \**************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _app = __webpack_require__(/*! ./app.js */ 6);
	
	var _app2 = _interopRequireDefault(_app);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	_app2.default.constant('localStorageKey', 'pitchMe-token');
	
	_app2.default.config(function ($stateProvider, $urlRouterProvider) {
	  $stateProvider.state('home', {
	    url: '/',
	    templateUrl: '/html/general/home.html',
	    controller: 'homeCtrl'
	  }).state('users', {
	    abstract: true,
	    templateUrl: '/html/users/users.html'
	  }).state('users.login', {
	    url: '/login',
	    templateUrl: '/html/users/login.html',
	    controller: 'usersCtrl'
	  }).state('users.register', {
	    url: '/register',
	    templateUrl: '/html/users/register.html',
	    controller: 'usersCtrl'
	  });
	  $urlRouterProvider.otherwise('/');
	});

/***/ },
/* 2 */
/*!****************************************!*\
  !*** ./src/js/controllers/homeCtrl.js ***!
  \****************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _app = __webpack_require__(/*! ../app.js */ 6);
	
	var _app2 = _interopRequireDefault(_app);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	_app2.default.controller('homeCtrl', function ($scope) {});

/***/ },
/* 3 */
/*!***************************************!*\
  !*** ./src/js/controllers/navCtrl.js ***!
  \***************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _app = __webpack_require__(/*! ../app.js */ 6);
	
	var _app2 = _interopRequireDefault(_app);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	_app2.default.controller('navCtrl', function ($scope, Auth, $state) {
	  $scope.logout = function () {
	    Auth.logOut();
	  };
	});

/***/ },
/* 4 */
/*!*****************************************!*\
  !*** ./src/js/controllers/usersCtrl.js ***!
  \*****************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _app = __webpack_require__(/*! ../app.js */ 6);
	
	var _app2 = _interopRequireDefault(_app);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	_app2.default.controller('usersCtrl', function ($scope, $state, Auth) {
	  $scope.login = function (user) {
	    Auth.login(user);
	  };
	  $scope.register = function (user) {
	    if (user.password === $scope.confirm) {
	      Auth.register(user);
	    } else {
	      swal({
	        title: "Passwords do not match!",
	        text: "Please re-enter your passwords and try again",
	        type: "error",
	        showConfirmButton: true,
	        closeOnConfirm: true,
	        timer: 2500
	      });
	    }
	  };
	});

/***/ },
/* 5 */
/*!*********************************!*\
  !*** ./src/js/services/auth.js ***!
  \*********************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _app = __webpack_require__(/*! ../app.js */ 6);
	
	var _app2 = _interopRequireDefault(_app);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	_app2.default.service('Auth', ['$http', '$window', "localStorageKey", '$rootScope', '$state', function ($http, $window, localStorageKey, $rootScope, $state) {
	  var _this = this;
	
	  this.saveToken = function (token) {
	    $window.localStorage[localStorageKey] = token;
	  };
	
	  this.getToken = function () {
	    return $window.localStorage[localStorageKey];
	  };
	
	  this.isLoggedIn = function () {
	    var token = _this.getToken();
	    if (token) {
	      var payload = JSON.parse($window.atob(token.split('.')[1]));
	      return payload.exp > Date.now() / 1000;
	    } else {
	      return false;
	    }
	  };
	
	  this.currentUser = function () {
	    if (_this.isLoggedIn()) {
	      var token = _this.getToken();
	      var payload = JSON.parse($window.atob(token.split('.')[1]));
	
	      return payload.username;
	    }
	  };
	
	  this.register = function (user) {
	    $http.post('/users/register', user).then(function (res) {
	      _this.saveToken(res.data);
	      $rootScope.loggedIn = _this.isLoggedIn();
	      $state.go('home');
	    }).catch(function (err) {
	      console.log(err);
	    });
	  };
	
	  this.login = function (user) {
	    $http.post('/users/login', user).then(function (res) {
	      _this.saveToken(res.data);
	      $rootScope.loggedIn = _this.isLoggedIn();
	      $state.go('home');
	    }).catch(function (err) {
	      console.log(err);
	    });
	  };
	
	  this.logOut = function () {
	    $window.localStorage.removeItem(localStorageKey);
	    $rootScope.loggedIn = _this.isLoggedIn();
	    $state.go('home');
	  };
	
	  $rootScope.loggedIn = this.isLoggedIn();
	}]);

/***/ },
/* 6 */
/*!***********************!*\
  !*** ./src/js/app.js ***!
  \***********************/
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var app = angular.module('pitchMe', ['ui.router', 'ui.bootstrap']);
	
	exports.default = app;

/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map