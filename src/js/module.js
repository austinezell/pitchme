'use strict';

import app from './app.js';

app.constant('localStorageKey', 'pitchMe-token');

app.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('home', {
      url: '/',
      templateUrl: '/html/general/home.html',
      controller: 'homeCtrl'
    })


  .state('users', {
      abstract: true,
      templateUrl: '/html/users/users.html'
    })
    .state('users.login', {
      url: '/login',
      templateUrl: '/html/users/login.html',
      controller: 'usersCtrl'
    })
    .state('users.register', {
      url: '/register',
      templateUrl: '/html/users/register.html',
      controller: 'usersCtrl'
    })
  $urlRouterProvider.otherwise('/');
});
